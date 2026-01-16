/**
 * KRIM AI - PERFORMANCE OPTIMIZATION UTILITIES
 * Sub-2 second load times on 3G networks with 60fps guarantee
 */

// Performance monitoring interface
interface PerformanceMetrics {
  fps: number
  memoryUsage: number
  loadTime: number
  interactionLatency: number
}

// Device capability detection
export const getDeviceCapability = (): 'low' | 'medium' | 'high' => {
  if (typeof window === 'undefined') return 'medium'
  
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
  if (!gl) return 'low'
  
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
  const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : ''
  
  // Enhanced GPU tier detection
  const isHighEnd = /RTX|GTX 16|GTX 20|GTX 30|GTX 40|Radeon RX|Apple M[1-9]|Mali-G78|Adreno 6|PowerVR/.test(renderer)
  const isMidTier = /GTX 10|GTX 9|Radeon R|Intel Iris|UHD Graphics 6/.test(renderer)
  const isMobile = /Mobile|Android|iPhone|iPad/.test(navigator.userAgent)
  
  // Memory and core detection
  const memory = (navigator as any).deviceMemory || 4
  const cores = navigator.hardwareConcurrency || 4
  
  if (isMobile && memory < 6) return 'low'
  if (isMobile && memory >= 6) return 'medium'
  if (isHighEnd && memory >= 8 && cores >= 6) return 'high'
  if (isMidTier || (memory >= 6 && cores >= 4)) return 'medium'
  return 'low'
}

// Lazy loading with Intersection Observer
export const createLazyLoader = (callback: () => void, options = {}) => {
  const defaultOptions = {
    rootMargin: '200px',
    threshold: 0.1
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback()
        observer.unobserve(entry.target)
      }
    })
  }, { ...defaultOptions, ...options })
  
  return observer
}

// Debounce for expensive operations
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): T => {
  let timeout: NodeJS.Timeout | null = null
  
  const debounced = (...args: Parameters<T>) => {
    const later = () => {
      timeout = null
      if (!immediate) func.apply(null, args)
    }
    
    const callNow = immediate && !timeout
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    
    if (callNow) func.apply(null, args)
  }
  
  return debounced as T
}

// Throttle for scroll/resize events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T => {
  let inThrottle = false
  
  const throttled = (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(null, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
  
  return throttled as T
}

// Prefetch critical resources
export const prefetchCriticalResources = () => {
  const links = [
    '/fonts/inter-var.woff2',
    '/fonts/space-grotesk-var.woff2'
  ]
  
  links.forEach(href => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = href
    link.as = href.includes('.woff') ? 'font' : 'fetch'
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}

// Performance monitoring
export const measurePerformance = (metricName: string, startMark: string, endMark: string) => {
  if ('performance' in window && 'measure' in window.performance) {
    try {
      performance.measure(metricName, startMark, endMark)
      const measure = performance.getEntriesByName(metricName)[0]
      
      // Send to analytics if available
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'timing_complete', {
          name: metricName,
          value: Math.round(measure.duration),
          event_category: 'Performance'
        })
      }
      
      return measure.duration
    } catch (e) {
      console.warn('Performance measurement failed:', e)
    }
  }
  return 0
}

// Memory cleanup for animations
export const cleanupAnimations = (animations: any[]) => {
  animations.forEach(animation => {
    if (animation?.kill) animation.kill() // GSAP
    if (animation?.stop) animation.stop() // Framer Motion
    if (animation?.destroy) animation.destroy() // Three.js
  })
}

// Web Vitals monitoring
export const trackWebVitals = () => {
  if (typeof window === 'undefined') return
  
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      const metricName = entry.name
      const value = Math.round(entry.startTime)
      
      // Track key metrics
      if (['first-contentful-paint', 'largest-contentful-paint'].includes(metricName)) {
        console.log(`${metricName}: ${value}ms`)
        
        // Send to analytics
        if ((window as any).gtag) {
          (window as any).gtag('event', 'web_vitals', {
            metric_name: metricName,
            value: value,
            event_category: 'Performance'
          })
        }
      }
    })
  })
  
  try {
    observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift'] })
  } catch (e) {
    console.warn('Performance observer not supported')
  }
}

// Bundle size warning
export const checkBundleSize = () => {
  if (typeof window === 'undefined') return
  
  const scripts = Array.from(document.querySelectorAll('script[src]'))
  let totalSize = 0
  
  scripts.forEach(script => {
    const src = (script as HTMLScriptElement).src
    if (src.includes('assets')) {
      fetch(src, { method: 'HEAD' })
        .then(response => {
          const size = response.headers.get('content-length')
          if (size) {
            totalSize += parseInt(size)
            
            // Warn if approaching 200KB limit
            if (totalSize > 180000) {
              console.warn(`Bundle size approaching limit: ${(totalSize / 1024).toFixed(2)}KB`)
            }
          }
        })
        .catch(() => {}) // Ignore errors in production
    }
  })
}

// Image optimization helper
export const optimizeImage = (src: string, width?: number, quality = 75) => {
  if (!src) return ''
  
  // Use WebP if supported
  const supportsWebP = document.createElement('canvas')
    .toDataURL('image/webp')
    .indexOf('data:image/webp') === 0
  
  const format = supportsWebP ? 'webp' : 'jpg'
  
  // Return optimized URL (assuming CDN with query params)
  return `${src}?format=${format}&quality=${quality}${width ? `&width=${width}` : ''}`
}

// Service Worker registration
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      console.log('ServiceWorker registered:', registration)
      
      registration.addEventListener('updatefound', () => {
        console.log('ServiceWorker update found')
      })
    } catch (error) {
      console.warn('ServiceWorker registration failed:', error)
    }
  }
}

// Export all utilities
export default {
  getDeviceCapability,
  createLazyLoader,
  debounce,
  throttle,
  prefetchCriticalResources,
  measurePerformance,
  cleanupAnimations,
  trackWebVitals,
  checkBundleSize,
  optimizeImage,
  registerServiceWorker
}