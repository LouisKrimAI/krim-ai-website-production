/**
 * Advanced Service Worker for Krim AI
 * Implements offline-first caching strategies, intelligent prefetching,
 * and performance optimization for the 2035 web experience
 */

// Cache configuration with strategic naming
const CACHE_CONFIG = {
  // Static assets cache (long-term, immutable)
  STATIC: {
    name: 'krim-static-v1',
    maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
    maxEntries: 100,
    patterns: [/\.(js|css|woff2|ico)$/]
  },
  
  // Image cache (long-term with size limits)
  IMAGES: {
    name: 'krim-images-v1',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    maxEntries: 50,
    maxSize: 50 * 1024 * 1024, // 50MB
    patterns: [/\.(png|jpg|jpeg|webp|avif|svg)$/]
  },
  
  // API cache (short-term, networkFirst)
  API: {
    name: 'krim-api-v1',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    maxEntries: 100,
    patterns: [/\/api\//]
  },
  
  // Font cache (long-term, critical for performance)
  FONTS: {
    name: 'krim-fonts-v1',
    maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
    maxEntries: 20,
    patterns: [/fonts\.googleapis\.com/, /fonts\.gstatic\.com/]
  },
  
  // Page cache (strategy: stale-while-revalidate)
  PAGES: {
    name: 'krim-pages-v1',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    maxEntries: 30,
    patterns: [/^https?:\/\/[^\/]+\/$/, /\/[^.]*$/]
  }
} as const

// Performance tracking
interface PerformanceMetric {
  timestamp: number
  cacheHit: boolean
  responseTime: number
  url: string
  strategy: string
}

class AdvancedServiceWorker {
  private performanceMetrics: PerformanceMetric[] = []
  private prefetchQueue: string[] = []
  private networkFirst: Set<RegExp> = new Set()
  private cacheFirst: Set<RegExp> = new Set()
  private staleWhileRevalidate: Set<RegExp> = new Set()

  constructor() {
    this.initializeCachingStrategies()
    this.setupEventListeners()
  }

  /**
   * Initialize caching strategies based on resource types
   */
  private initializeCachingStrategies(): void {
    // Network First: API calls, fresh data required
    this.networkFirst.add(/\/api\//)
    this.networkFirst.add(/\/auth\//)
    this.networkFirst.add(/analytics/)

    // Cache First: Static assets, immutable resources
    this.cacheFirst.add(/\.(js|css|woff2|ico|png|jpg|jpeg|webp|avif)$/)
    this.cacheFirst.add(/fonts\.googleapis\.com/)
    this.cacheFirst.add(/fonts\.gstatic\.com/)

    // Stale While Revalidate: HTML pages, dynamic content
    this.staleWhileRevalidate.add(/^https?:\/\/[^\/]+\/$/)
    this.staleWhileRevalidate.add(/\/[^.]*$/) // Routes without extensions
  }

  /**
   * Setup event listeners for service worker lifecycle
   */
  private setupEventListeners(): void {
    self.addEventListener('install', this.handleInstall.bind(this))
    self.addEventListener('activate', this.handleActivate.bind(this))
    self.addEventListener('fetch', this.handleFetch.bind(this))
    self.addEventListener('message', this.handleMessage.bind(this))
    
    // Background sync for offline actions
    if ('serviceWorker' in self) {
      self.addEventListener('sync', this.handleBackgroundSync.bind(this))
    }

    // Push notifications for performance alerts
    self.addEventListener('push', this.handlePush.bind(this))
  }

  /**
   * Handle service worker installation
   */
  private async handleInstall(event: any): Promise<void> {
    console.log('🔧 Krim AI Service Worker installing...')
    
    event.waitUntil(
      this.precacheResources()
    )

    // Skip waiting to activate immediately
    ;(self as any).skipWaiting()
  }

  /**
   * Handle service worker activation
   */
  private async handleActivate(event: any): Promise<void> {
    console.log('🚀 Krim AI Service Worker activated')
    
    event.waitUntil(
      this.cleanupOldCaches()
    )

    // Claim all clients immediately
    ;(self as any).clients.claim()
  }

  /**
   * Precache critical resources for instant loading
   */
  private async precacheResources(): Promise<void> {
    const criticalResources = [
      '/',
      '/manifest.json',
      '/assets/fonts/inter-var.woff2', // Assuming variable font
      '/assets/images/logo.svg',
      '/assets/css/main.css'
    ]

    try {
      const cache = await caches.open(CACHE_CONFIG.STATIC.name)
      await cache.addAll(criticalResources.filter(Boolean))
      console.log('✅ Critical resources precached')
    } catch (error) {
      console.warn('⚠️ Failed to precache some resources:', error)
    }
  }

  /**
   * Cleanup old cache versions
   */
  private async cleanupOldCaches(): Promise<void> {
    const currentCaches = Object.values(CACHE_CONFIG).map(config => config.name)
    const cacheNames = await caches.keys()
    
    const deletionPromises = cacheNames
      .filter(cacheName => !currentCaches.includes(cacheName as any))
      .map(cacheName => {
        console.log(`🗑️ Deleting old cache: ${cacheName}`)
        return caches.delete(cacheName)
      })

    await Promise.all(deletionPromises)
  }

  /**
   * Main fetch handler with intelligent caching strategies
   */
  private handleFetch(event: any): void {
    const { request } = event
    const url = new URL(request.url)

    // Skip non-GET requests and chrome-extension URLs
    if (request.method !== 'GET' || url.protocol.startsWith('chrome-extension')) {
      return
    }

    // Apply appropriate caching strategy
    if (this.shouldUseNetworkFirst(request)) {
      event.respondWith(this.networkFirstStrategy(request))
    } else if (this.shouldUseCacheFirst(request)) {
      event.respondWith(this.cacheFirstStrategy(request))
    } else {
      event.respondWith(this.staleWhileRevalidateStrategy(request))
    }
  }

  /**
   * Determine if request should use Network First strategy
   */
  private shouldUseNetworkFirst(request: Request): boolean {
    return Array.from(this.networkFirst).some(pattern => pattern.test(request.url))
  }

  /**
   * Determine if request should use Cache First strategy
   */
  private shouldUseCacheFirst(request: Request): boolean {
    return Array.from(this.cacheFirst).some(pattern => pattern.test(request.url))
  }

  /**
   * Network First strategy: Try network, fallback to cache
   */
  private async networkFirstStrategy(request: Request): Promise<Response> {
    const startTime = performance.now()
    
    try {
      const networkResponse = await fetch(request)
      const responseTime = performance.now() - startTime
      
      // Cache successful responses
      if (networkResponse.ok) {
        const cache = await this.getCacheForRequest(request)
        if (cache) {
          cache.put(request, networkResponse.clone())
        }
      }

      this.recordPerformanceMetric({
        timestamp: Date.now(),
        cacheHit: false,
        responseTime,
        url: request.url,
        strategy: 'networkFirst'
      })

      return networkResponse
    } catch (error) {
      // Network failed, try cache
      const cache = await this.getCacheForRequest(request)
      if (cache) {
        const cachedResponse = await cache.match(request)
        if (cachedResponse) {
          const responseTime = performance.now() - startTime
          this.recordPerformanceMetric({
            timestamp: Date.now(),
            cacheHit: true,
            responseTime,
            url: request.url,
            strategy: 'networkFirst'
          })

          // Add offline indicator header
          const headers = new Headers(cachedResponse.headers)
          headers.set('X-Served-From', 'cache')
          headers.set('X-Cache-Status', 'offline')
          
          return new Response(cachedResponse.body, {
            status: cachedResponse.status,
            statusText: cachedResponse.statusText,
            headers
          })
        }
      }

      // Return offline fallback
      return this.getOfflineFallback(request)
    }
  }

  /**
   * Cache First strategy: Try cache, fallback to network
   */
  private async cacheFirstStrategy(request: Request): Promise<Response> {
    const startTime = performance.now()
    const cache = await this.getCacheForRequest(request)
    
    if (cache) {
      const cachedResponse = await cache.match(request)
      if (cachedResponse) {
        const responseTime = performance.now() - startTime
        this.recordPerformanceMetric({
          timestamp: Date.now(),
          cacheHit: true,
          responseTime,
          url: request.url,
          strategy: 'cacheFirst'
        })

        // Check if cache entry is stale
        const cacheDate = new Date(cachedResponse.headers.get('date') || '').getTime()
        const maxAge = this.getCacheMaxAge(request)
        
        if (Date.now() - cacheDate > maxAge) {
          // Refresh in background
          this.refreshCacheInBackground(request, cache)
        }

        return cachedResponse
      }
    }

    // Cache miss, fetch from network
    try {
      const networkResponse = await fetch(request)
      const responseTime = performance.now() - startTime
      
      if (networkResponse.ok && cache) {
        cache.put(request, networkResponse.clone())
      }

      this.recordPerformanceMetric({
        timestamp: Date.now(),
        cacheHit: false,
        responseTime,
        url: request.url,
        strategy: 'cacheFirst'
      })

      return networkResponse
    } catch (error) {
      return this.getOfflineFallback(request)
    }
  }

  /**
   * Stale While Revalidate strategy: Serve from cache, update in background
   */
  private async staleWhileRevalidateStrategy(request: Request): Promise<Response> {
    const startTime = performance.now()
    const cache = await this.getCacheForRequest(request)
    
    // Start network request immediately
    const networkResponsePromise = fetch(request).catch(() => null)
    
    let cachedResponse: Response | undefined
    if (cache) {
      cachedResponse = await cache.match(request)
    }

    if (cachedResponse) {
      const responseTime = performance.now() - startTime
      this.recordPerformanceMetric({
        timestamp: Date.now(),
        cacheHit: true,
        responseTime,
        url: request.url,
        strategy: 'staleWhileRevalidate'
      })

      // Update cache in background
      networkResponsePromise.then(networkResponse => {
        if (networkResponse?.ok && cache) {
          cache.put(request, networkResponse.clone())
        }
      })

      return cachedResponse
    }

    // No cached response, wait for network
    try {
      const networkResponse = await networkResponsePromise
      if (networkResponse?.ok) {
        const responseTime = performance.now() - startTime
        this.recordPerformanceMetric({
          timestamp: Date.now(),
          cacheHit: false,
          responseTime,
          url: request.url,
          strategy: 'staleWhileRevalidate'
        })

        if (cache) {
          cache.put(request, networkResponse.clone())
        }
        return networkResponse
      }
    } catch (error) {
      // Network failed
    }

    return this.getOfflineFallback(request)
  }

  /**
   * Get appropriate cache for request
   */
  private async getCacheForRequest(request: Request): Promise<Cache | null> {
    const url = request.url

    if (CACHE_CONFIG.FONTS.patterns.some(pattern => pattern.test(url))) {
      return caches.open(CACHE_CONFIG.FONTS.name as string)
    }
    if (CACHE_CONFIG.IMAGES.patterns.some(pattern => pattern.test(url))) {
      return caches.open(CACHE_CONFIG.IMAGES.name as string)
    }
    if (CACHE_CONFIG.API.patterns.some(pattern => pattern.test(url))) {
      return caches.open(CACHE_CONFIG.API.name as string)
    }
    if (CACHE_CONFIG.STATIC.patterns.some(pattern => pattern.test(url))) {
      return caches.open(CACHE_CONFIG.STATIC.name as string)
    }
    if (CACHE_CONFIG.PAGES.patterns.some(pattern => pattern.test(url))) {
      return caches.open(CACHE_CONFIG.PAGES.name as string)
    }

    return null
  }

  /**
   * Get cache max age for request
   */
  private getCacheMaxAge(request: Request): number {
    const url = request.url

    if (CACHE_CONFIG.FONTS.patterns.some(pattern => pattern.test(url))) {
      return CACHE_CONFIG.FONTS.maxAge
    }
    if (CACHE_CONFIG.IMAGES.patterns.some(pattern => pattern.test(url))) {
      return CACHE_CONFIG.IMAGES.maxAge
    }
    if (CACHE_CONFIG.API.patterns.some(pattern => pattern.test(url))) {
      return CACHE_CONFIG.API.maxAge
    }
    if (CACHE_CONFIG.STATIC.patterns.some(pattern => pattern.test(url))) {
      return CACHE_CONFIG.STATIC.maxAge
    }
    
    return CACHE_CONFIG.PAGES.maxAge
  }

  /**
   * Refresh cache entry in background
   */
  private async refreshCacheInBackground(request: Request, cache: Cache): Promise<void> {
    try {
      const networkResponse = await fetch(request)
      if (networkResponse.ok) {
        await cache.put(request, networkResponse)
      }
    } catch (error) {
      console.warn('Background refresh failed:', error)
    }
  }

  /**
   * Get offline fallback response
   */
  private getOfflineFallback(request: Request): Response {
    const url = new URL(request.url)
    
    // Return different fallbacks based on request type
    if (request.headers.get('accept')?.includes('text/html')) {
      return new Response(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Offline - Krim AI</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, sans-serif;
              background: linear-gradient(135deg, #0f172a, #1e293b);
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
              text-align: center;
            }
            .container {
              max-width: 400px;
              padding: 2rem;
              border-radius: 12px;
              background: rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(10px);
            }
            h1 { margin: 0 0 1rem 0; color: #06b6d4; }
            p { opacity: 0.8; line-height: 1.5; }
            .retry-btn {
              background: #06b6d4;
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 8px;
              cursor: pointer;
              margin-top: 1rem;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🔌 You're Offline</h1>
            <p>The future of debt collection is temporarily unavailable. Check your connection and try again.</p>
            <button class="retry-btn" onclick="location.reload()">Retry</button>
          </div>
        </body>
        </html>
      `, {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
          'X-Served-From': 'offline-fallback'
        }
      })
    }

    if (request.headers.get('accept')?.includes('application/json')) {
      return new Response(JSON.stringify({
        error: 'Offline',
        message: 'No network connection available'
      }), {
        status: 503,
        headers: {
          'Content-Type': 'application/json',
          'X-Served-From': 'offline-fallback'
        }
      })
    }

    // Generic fallback
    return new Response('Offline', {
      status: 503,
      headers: { 'X-Served-From': 'offline-fallback' }
    })
  }

  /**
   * Handle messages from main thread
   */
  private handleMessage(event: any): void {
    const { data } = event

    switch (data.type) {
      case 'PREFETCH_ROUTES':
        this.prefetchRoutes(data.routes)
        break

      case 'CLEAR_CACHE':
        this.clearCache(data.cacheType)
        break

      case 'GET_PERFORMANCE_METRICS':
        event.ports[0].postMessage({
          type: 'PERFORMANCE_METRICS',
          metrics: this.performanceMetrics.slice(-100) // Last 100 metrics
        })
        break

      case 'SKIP_WAITING':
        (self as any).skipWaiting()
        break
    }
  }

  /**
   * Prefetch routes for faster navigation
   */
  private async prefetchRoutes(routes: string[]): Promise<void> {
    const cache = await caches.open(CACHE_CONFIG.PAGES.name)
    
    const prefetchPromises = routes.map(async route => {
      try {
        const response = await fetch(route)
        if (response.ok) {
          await cache.put(route, response)
          console.log(`✅ Prefetched: ${route}`)
        }
      } catch (error) {
        console.warn(`❌ Failed to prefetch: ${route}`, error)
      }
    })

    await Promise.allSettled(prefetchPromises)
  }

  /**
   * Clear specific cache
   */
  private async clearCache(cacheType?: string): Promise<void> {
    if (cacheType) {
      const cacheConfig = Object.values(CACHE_CONFIG).find(config => 
        config.name.includes(cacheType)
      )
      if (cacheConfig) {
        await caches.delete(cacheConfig.name)
        console.log(`🗑️ Cleared cache: ${cacheConfig.name}`)
      }
    } else {
      const cacheNames = await caches.keys()
      await Promise.all(cacheNames.map(name => caches.delete(name)))
      console.log('🗑️ Cleared all caches')
    }
  }

  /**
   * Handle background sync
   */
  private handleBackgroundSync(event: any): void {
    if (event.tag === 'performance-metrics') {
      event.waitUntil(this.syncPerformanceMetrics())
    }
  }

  /**
   * Handle push notifications
   */
  private handlePush(event: any): void {
    const options = {
      body: event.data?.text() || 'Performance alert from Krim AI',
      icon: '/assets/images/icon-192x192.png',
      badge: '/assets/images/badge-72x72.png',
      tag: 'performance-alert',
      requireInteraction: false
    }

    event.waitUntil(
      (self as any).registration.showNotification('Krim AI Performance Alert', options)
    )
  }

  /**
   * Record performance metric
   */
  private recordPerformanceMetric(metric: PerformanceMetric): void {
    this.performanceMetrics.push(metric)
    
    // Keep only last 1000 metrics to avoid memory issues
    if (this.performanceMetrics.length > 1000) {
      this.performanceMetrics = this.performanceMetrics.slice(-1000)
    }

    // Log slow responses
    if (metric.responseTime > 2000) {
      console.warn(`🐌 Slow response: ${metric.url} (${metric.responseTime.toFixed(2)}ms)`)
    }
  }

  /**
   * Sync performance metrics to server
   */
  private async syncPerformanceMetrics(): Promise<void> {
    if (this.performanceMetrics.length === 0) return

    try {
      await fetch('/api/performance-metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metrics: this.performanceMetrics.slice(-50), // Send last 50 metrics
          timestamp: Date.now(),
          userAgent: navigator.userAgent
        })
      })

      console.log('📊 Performance metrics synced')
    } catch (error) {
      console.warn('Failed to sync performance metrics:', error)
    }
  }
}

// Initialize the service worker
const advancedSW = new AdvancedServiceWorker()

// Export for client-side registration
export const registerServiceWorker = async (): Promise<void> => {
  // Skip on iOS < 14.5 where Service Workers are unreliable
  const isOldIOS = /iPhone OS (1[0-3]|[0-9])_/.test(navigator.userAgent)

  if ('serviceWorker' in navigator && !import.meta.env.DEV && !isOldIOS) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      })

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New version available
              if (confirm('New version available! Reload to update?')) {
                newWorker.postMessage({ type: 'SKIP_WAITING' })
                window.location.reload()
              }
            }
          })
        }
      })

      console.log('✅ Service Worker registered')
      
      // Prefetch critical routes
      const messageChannel = new MessageChannel()
      registration.active?.postMessage({
        type: 'PREFETCH_ROUTES',
        routes: ['/', '/agents', '/platform', '/pricing']
      }, [messageChannel.port2])

    } catch (error) {
      console.error('❌ Service Worker registration failed:', error)
    }
  }
}

// Client-side utility functions
export const serviceWorkerUtils = {
  /**
   * Get performance metrics from service worker
   */
  getPerformanceMetrics: (): Promise<PerformanceMetric[]> => {
    return new Promise((resolve) => {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        const messageChannel = new MessageChannel()
        messageChannel.port1.onmessage = (event) => {
          if (event.data.type === 'PERFORMANCE_METRICS') {
            resolve(event.data.metrics)
          }
        }
        
        navigator.serviceWorker.controller.postMessage({
          type: 'GET_PERFORMANCE_METRICS'
        }, [messageChannel.port2])
      } else {
        resolve([])
      }
    })
  },

  /**
   * Clear service worker cache
   */
  clearCache: (cacheType?: string): void => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'CLEAR_CACHE',
        cacheType
      })
    }
  },

  /**
   * Prefetch routes for faster navigation
   */
  prefetchRoutes: (routes: string[]): void => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'PREFETCH_ROUTES',
        routes
      })
    }
  }
}

export default advancedSW