/**
 * Critical Resource Loader for Krim AI
 * Intelligent preloading and prioritization system
 */

interface ResourcePriority {
  url: string
  type: 'font' | 'css' | 'js' | 'image'
  priority: 'critical' | 'high' | 'medium' | 'low'
  crossOrigin?: boolean
  media?: string
}

// Critical resources that must be loaded immediately
const CRITICAL_RESOURCES: ResourcePriority[] = [
  // Fonts - highest priority for text rendering
  {
    url: '/fonts/inter-var.woff2',
    type: 'font',
    priority: 'critical',
    crossOrigin: true
  },
  {
    url: '/fonts/space-grotesk-var.woff2', 
    type: 'font',
    priority: 'critical',
    crossOrigin: true
  },
  
  // Critical CSS - above the fold styling
  {
    url: '/assets/css/critical.css',
    type: 'css',
    priority: 'critical'
  },
  
  // Removed /images/hero-bg.webp - file doesn't exist
]

// High-priority resources for immediate user experience
const HIGH_PRIORITY_RESOURCES: ResourcePriority[] = [
  // Vendor JS files only exist in production builds
  // Remove for dev mode to prevent 404s
  
  // Favicon as main logo since /images/logo.svg doesn't exist
  {
    url: '/favicon.svg',
    type: 'image', 
    priority: 'high'
  }
]

// Medium priority - loaded after critical path
const MEDIUM_PRIORITY_RESOURCES: ResourcePriority[] = [
  // Vendor JS files removed - only exist in production builds
]

class CriticalResourceLoader {
  private loadedResources = new Set<string>()
  private loadingPromises = new Map<string, Promise<void>>()
  
  /**
   * Load critical resources immediately
   */
  async loadCriticalResources(): Promise<void> {
    const criticalPromises = CRITICAL_RESOURCES.map(resource => 
      this.preloadResource(resource)
    )
    
    await Promise.all(criticalPromises)
    console.log('✅ Critical resources loaded')
  }
  
  /**
   * Load high-priority resources with RequestIdleCallback
   */
  loadHighPriorityResources(): void {
    const loadHigh = () => {
      HIGH_PRIORITY_RESOURCES.forEach(resource => {
        this.preloadResource(resource)
      })
    }
    
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadHigh, { timeout: 1000 })
    } else {
      setTimeout(loadHigh, 100)
    }
  }
  
  /**
   * Load medium/low priority resources when network is idle
   */
  loadSecondaryResources(): void {
    const loadSecondary = () => {
      MEDIUM_PRIORITY_RESOURCES.forEach(resource => {
        this.preloadResource(resource)
      })
    }
    
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadSecondary, { timeout: 5000 })
    } else {
      setTimeout(loadSecondary, 2000)
    }
  }
  
  /**
   * Preload a single resource
   */
  private async preloadResource(resource: ResourcePriority): Promise<void> {
    if (this.loadedResources.has(resource.url)) {
      return
    }
    
    if (this.loadingPromises.has(resource.url)) {
      return this.loadingPromises.get(resource.url)!
    }
    
    const loadPromise = this.createPreloadPromise(resource)
    this.loadingPromises.set(resource.url, loadPromise)
    
    try {
      await loadPromise
      this.loadedResources.add(resource.url)
      console.log(`✅ Preloaded ${resource.type}: ${resource.url}`)
    } catch (error) {
      console.warn(`⚠️ Failed to preload ${resource.url}:`, error)
    } finally {
      this.loadingPromises.delete(resource.url)
    }
  }
  
  /**
   * Create preload promise based on resource type
   */
  private createPreloadPromise(resource: ResourcePriority): Promise<void> {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link')
      
      switch (resource.type) {
        case 'font':
          link.rel = 'preload'
          link.as = 'font'
          link.type = 'font/woff2'
          if (resource.crossOrigin) link.crossOrigin = 'anonymous'
          break
          
        case 'css':
          link.rel = 'preload'
          link.as = 'style'
          if (resource.media) link.media = resource.media
          break
          
        case 'js':
          link.rel = 'modulepreload'
          break
          
        case 'image':
          link.rel = 'preload'
          link.as = 'image'
          break
      }
      
      link.href = resource.url
      
      // Set fetchpriority for supported browsers
      if ('fetchPriority' in link) {
        const priorityMap = {
          critical: 'high',
          high: 'high', 
          medium: 'low',
          low: 'low'
        }
        ;(link as any).fetchPriority = priorityMap[resource.priority]
      }
      
      link.onload = () => resolve()
      link.onerror = () => reject(new Error(`Failed to load ${resource.url}`))
      
      document.head.appendChild(link)
    })
  }
  
  /**
   * Intelligent prefetch based on user behavior
   */
  prefetchByUserIntent(routes: string[]): void {
    if (!('requestIdleCallback' in window)) return
    
    requestIdleCallback(() => {
      routes.forEach(route => {
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.href = route
        document.head.appendChild(link)
      })
    })
  }
  
  /**
   * Preconnect to external domains
   */
  preconnectExternalDomains(): void {
    const domains = [
      'https://api.krim.ai' // Add your API domain
    ]
    
    domains.forEach(domain => {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = domain
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    })
  }
  
  /**
   * Check if resource is already loaded
   */
  isResourceLoaded(url: string): boolean {
    return this.loadedResources.has(url)
  }
  
  /**
   * Get loading status
   */
  getLoadingStatus(): {
    loaded: number
    total: number
    critical: number
    high: number
  } {
    const total = CRITICAL_RESOURCES.length + HIGH_PRIORITY_RESOURCES.length + MEDIUM_PRIORITY_RESOURCES.length
    const loaded = this.loadedResources.size
    const critical = CRITICAL_RESOURCES.filter(r => this.loadedResources.has(r.url)).length
    const high = HIGH_PRIORITY_RESOURCES.filter(r => this.loadedResources.has(r.url)).length
    
    return { loaded, total, critical, high }
  }
}

// Singleton instance
export const criticalResourceLoader = new CriticalResourceLoader()

/**
 * Initialize critical resource loading
 */
export const initializeCriticalResourceLoading = (): void => {
  // Start loading critical resources immediately
  criticalResourceLoader.loadCriticalResources()
  
  // Preconnect to external domains
  criticalResourceLoader.preconnectExternalDomains()
  
  // Load high priority resources when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      criticalResourceLoader.loadHighPriorityResources()
    })
  } else {
    criticalResourceLoader.loadHighPriorityResources()
  }
  
  // Load secondary resources when page is fully loaded
  window.addEventListener('load', () => {
    criticalResourceLoader.loadSecondaryResources()
  })
}

/**
 * Hook for React components (import React in components that use this)
 */
export const useCriticalResourceStatus = () => {
  // This hook should be used in React components that import React
  // Example usage:
  // import React from 'react'
  // const status = useCriticalResourceStatus()
  return criticalResourceLoader.getLoadingStatus()
}

export default criticalResourceLoader