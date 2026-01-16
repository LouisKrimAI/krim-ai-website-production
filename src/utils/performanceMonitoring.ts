/**
 * Comprehensive Performance Monitoring System for Krim AI
 * Tracks Web Vitals, custom metrics, and provides real-time performance insights
 */

import { useEffect, useLayoutEffect, memo, createElement } from 'react'
import { onCLS, onFCP, onINP, onLCP, onTTFB, Metric } from 'web-vitals'

// Performance thresholds based on Krim AI targets
export const PERFORMANCE_THRESHOLDS = {
  LCP: { good: 2000, needsImprovement: 4000 }, // Target: ≤2.0s
  FID: { good: 100, needsImprovement: 300 },   // Target: ≤100ms
  INP: { good: 200, needsImprovement: 500 },   // Target: ≤200ms
  CLS: { good: 0.1, needsImprovement: 0.25 },  // Target: ≤0.1
  FCP: { good: 1800, needsImprovement: 3000 }, // Target: ≤1.8s
  TTFB: { good: 800, needsImprovement: 1800 }  // Target: ≤800ms
} as const

// Custom performance metrics
export interface CustomMetric {
  name: string
  value: number
  timestamp: number
  tags?: Record<string, string>
}

export interface PerformanceBudget {
  jsBundle: number      // Max JS bundle size (KB)
  cssBundle: number     // Max CSS bundle size (KB)
  images: number        // Max image size (KB)
  fonts: number         // Max font size (KB)
  totalAssets: number   // Max total asset size (KB)
}

// Performance budget for Krim AI (all sizes in KB)
export const PERFORMANCE_BUDGET: PerformanceBudget = {
  jsBundle: 200,     // 200KB target
  cssBundle: 50,     // 50KB target
  images: 100,       // 100KB per image
  fonts: 100,        // 100KB total fonts
  totalAssets: 500   // 500KB total
}

class PerformanceMonitor {
  private metrics: Map<string, Metric> = new Map()
  private customMetrics: CustomMetric[] = []
  private observers: PerformanceObserver[] = []
  private startTime = Date.now()
  
  constructor() {
    this.initWebVitals()
    this.initCustomObservers()
    this.initBudgetMonitoring()
  }

  /**
   * Initialize Web Vitals monitoring
   */
  private initWebVitals(): void {
    // Core Web Vitals
    onLCP(this.handleMetric.bind(this))
    onCLS(this.handleMetric.bind(this))
    
    // Other important metrics
    onFCP(this.handleMetric.bind(this))
    onINP(this.handleMetric.bind(this))
    onTTFB(this.handleMetric.bind(this))
  }

  /**
   * Initialize custom performance observers
   */
  private initCustomObservers(): void {
    // Navigation timing
    if ('PerformanceObserver' in window) {
      // Long task monitoring for FID optimization
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) { // Tasks longer than 50ms
              this.recordCustomMetric('longTask', entry.duration, {
                name: entry.name,
                startTime: String(entry.startTime)
              })
            }
          }
        })
        longTaskObserver.observe({ entryTypes: ['longtask'] })
        this.observers.push(longTaskObserver)
      } catch (e) {
        console.warn('Long task observer not supported')
      }

      // Layout shift monitoring
      try {
        const layoutShiftObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const layoutShiftEntry = entry as any
            if (!layoutShiftEntry.hadRecentInput) {
              this.recordCustomMetric('layoutShift', layoutShiftEntry.value, {
                sources: String(layoutShiftEntry.sources?.length || 0)
              })
            }
          }
        })
        layoutShiftObserver.observe({ entryTypes: ['layout-shift'] })
        this.observers.push(layoutShiftObserver)
      } catch (e) {
        console.warn('Layout shift observer not supported')
      }

      // Resource timing for bundle monitoring
      try {
        const resourceObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const resource = entry as PerformanceResourceTiming
            this.analyzeResourcePerformance(resource)
          }
        })
        resourceObserver.observe({ entryTypes: ['resource'] })
        this.observers.push(resourceObserver)
      } catch (e) {
        console.warn('Resource observer not supported')
      }

      // Memory monitoring (Chrome only)
      if ('memory' in performance) {
        this.monitorMemoryUsage()
      }
    }
  }

  /**
   * Initialize performance budget monitoring
   */
  private initBudgetMonitoring(): void {
    // Monitor bundle sizes on load
    window.addEventListener('load', () => {
      this.checkPerformanceBudget()
    })
  }

  /**
   * Handle Web Vitals metrics
   */
  private handleMetric(metric: Metric): void {
    this.metrics.set(metric.name, metric)
    
    // Check against thresholds
    const threshold = PERFORMANCE_THRESHOLDS[metric.name as keyof typeof PERFORMANCE_THRESHOLDS]
    if (threshold) {
      const status = metric.value <= threshold.good ? 'good' : 
                    metric.value <= threshold.needsImprovement ? 'needs-improvement' : 'poor'
      
      if (import.meta.env.DEV) {
        console.log(`📊 ${metric.name}: ${metric.value.toFixed(2)}${metric.name === 'CLS' ? '' : 'ms'} (${status})`)
      }
      
      // Record custom metric with status
      this.recordCustomMetric(`webvital_${metric.name}`, metric.value, {
        status,
        rating: metric.rating || 'unknown'
      })
    }

    // Send to analytics (implement your analytics service)
    this.sendToAnalytics(metric)
  }

  /**
   * Record custom performance metric
   */
  recordCustomMetric(name: string, value: number, tags?: Record<string, string>): void {
    const metric: CustomMetric = {
      name,
      value,
      timestamp: Date.now(),
      tags
    }
    
    this.customMetrics.push(metric)
    
    // Optional: Send to analytics
    this.sendCustomMetricToAnalytics(metric)
  }

  /**
   * Analyze resource performance
   */
  private analyzeResourcePerformance(resource: PerformanceResourceTiming): void {
    const url = new URL(resource.name)
    const extension = url.pathname.split('.').pop()?.toLowerCase()
    
    // Categorize resources
    let category = 'other'
    if (['js', 'mjs'].includes(extension || '')) category = 'javascript'
    else if (['css'].includes(extension || '')) category = 'stylesheet'
    else if (['png', 'jpg', 'jpeg', 'webp', 'avif', 'svg'].includes(extension || '')) category = 'image'
    else if (['woff', 'woff2', 'ttf', 'eot'].includes(extension || '')) category = 'font'

    // Record load time
    this.recordCustomMetric('resourceLoadTime', resource.duration, {
      category,
      url: url.pathname,
      size: String(resource.transferSize || 0)
    })

    // Check for slow resources
    if (resource.duration > 1000) { // Slower than 1s
      console.warn(`🐌 Slow resource: ${url.pathname} (${resource.duration.toFixed(2)}ms)`)
    }
  }

  /**
   * Monitor memory usage (Chrome only)
   */
  private monitorMemoryUsage(): void {
    const checkMemory = () => {
      const memory = (performance as any).memory
      if (memory) {
        this.recordCustomMetric('memoryUsed', memory.usedJSHeapSize / 1024 / 1024, {
          total: String(Math.round(memory.totalJSHeapSize / 1024 / 1024)),
          limit: String(Math.round(memory.jsHeapSizeLimit / 1024 / 1024))
        })
      }
    }

    // Check memory every 30 seconds
    setInterval(checkMemory, 30000)
    checkMemory() // Initial check
  }

  /**
   * Check performance budget compliance
   */
  checkPerformanceBudget(): Record<string, { size: number; budget: number; status: 'pass' | 'warn' | 'fail' }> {
    if (!('PerformanceObserver' in window)) return {}

    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
    const budgetReport: Record<string, { size: number; budget: number; status: 'pass' | 'warn' | 'fail' }> = {}

    // Calculate bundle sizes
    let jsSize = 0
    let cssSize = 0
    let imageSize = 0
    let fontSize = 0
    let totalSize = 0

    resources.forEach(resource => {
      const size = resource.transferSize || 0
      const url = new URL(resource.name)
      const extension = url.pathname.split('.').pop()?.toLowerCase()

      totalSize += size

      if (['js', 'mjs'].includes(extension || '')) jsSize += size
      else if (['css'].includes(extension || '')) cssSize += size
      else if (['png', 'jpg', 'jpeg', 'webp', 'avif', 'svg'].includes(extension || '')) imageSize += size
      else if (['woff', 'woff2', 'ttf', 'eot'].includes(extension || '')) fontSize += size
    })

    // Convert to KB and check against budget
    const checks = [
      { name: 'JavaScript', size: jsSize / 1024, budget: PERFORMANCE_BUDGET.jsBundle },
      { name: 'CSS', size: cssSize / 1024, budget: PERFORMANCE_BUDGET.cssBundle },
      { name: 'Images', size: imageSize / 1024, budget: PERFORMANCE_BUDGET.images },
      { name: 'Fonts', size: fontSize / 1024, budget: PERFORMANCE_BUDGET.fonts },
      { name: 'Total Assets', size: totalSize / 1024, budget: PERFORMANCE_BUDGET.totalAssets }
    ]

    checks.forEach(({ name, size, budget }) => {
      const ratio = size / budget
      let status: 'pass' | 'warn' | 'fail' = 'pass'
      
      if (ratio > 1) status = 'fail'
      else if (ratio > 0.8) status = 'warn'

      budgetReport[name] = { size: Math.round(size), budget, status }

      // Log budget status (skip in development mode due to large unoptimized bundles)
      if (!import.meta.env.DEV) {
        const emoji = status === 'pass' ? '✅' : status === 'warn' ? '⚠️' : '❌'
        console.log(`${emoji} ${name}: ${Math.round(size)}KB / ${budget}KB (${Math.round(ratio * 100)}%)`)
      }

      // Record as custom metric
      this.recordCustomMetric('budgetCompliance', ratio, {
        category: name.toLowerCase().replace(' ', '_'),
        status
      })
    })

    return budgetReport
  }

  /**
   * Get performance summary
   */
  getPerformanceSummary(): {
    webVitals: Record<string, Metric>
    customMetrics: CustomMetric[]
    recommendations: string[]
  } {
    const recommendations: string[] = []
    
    // Analyze Web Vitals and provide recommendations
    this.metrics.forEach((metric, name) => {
      const threshold = PERFORMANCE_THRESHOLDS[name as keyof typeof PERFORMANCE_THRESHOLDS]
      if (threshold && metric.value > threshold.good) {
        switch (name) {
          case 'LCP':
            recommendations.push('Optimize images, preload critical resources, use CDN')
            break
          case 'FID':
            recommendations.push('Reduce JavaScript execution time, split code, use web workers')
            break
          case 'INP':
            recommendations.push('Optimize event handlers, reduce DOM complexity')
            break
          case 'CLS':
            recommendations.push('Set image/video dimensions, avoid dynamic content insertion')
            break
          case 'FCP':
            recommendations.push('Optimize critical rendering path, inline critical CSS')
            break
          case 'TTFB':
            recommendations.push('Optimize server response time, use faster hosting')
            break
        }
      }
    })

    return {
      webVitals: Object.fromEntries(this.metrics),
      customMetrics: this.customMetrics,
      recommendations
    }
  }

  /**
   * Send metric to analytics service
   */
  private sendToAnalytics(metric: Metric): void {
    // Implement your analytics service here
    // Example: Google Analytics 4, DataDog, New Relic, etc.
    
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'web_vitals', {
        event_category: 'performance',
        event_label: metric.name,
        value: Math.round(metric.value),
        custom_parameter_rating: metric.rating
      })
    }
  }

  /**
   * Send custom metric to analytics
   */
  private sendCustomMetricToAnalytics(metric: CustomMetric): void {
    // Implement custom metric tracking
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'custom_metric', {
        event_category: 'performance',
        event_label: metric.name,
        value: Math.round(metric.value),
        ...metric.tags
      })
    }
  }

  /**
   * Start performance measurement
   */
  mark(name: string): void {
    performance.mark(`${name}-start`)
  }

  /**
   * End performance measurement and record metric
   */
  measure(name: string, tags?: Record<string, string>): number {
    const endMark = `${name}-end`
    const startMark = `${name}-start`
    
    performance.mark(endMark)
    performance.measure(name, startMark, endMark)
    
    const measure = performance.getEntriesByName(name, 'measure')[0]
    const duration = measure?.duration || 0
    
    this.recordCustomMetric(`custom_${name}`, duration, tags)
    
    // Cleanup
    performance.clearMarks(startMark)
    performance.clearMarks(endMark)
    performance.clearMeasures(name)
    
    return duration
  }

  /**
   * Record React component render time
   */
  recordComponentRender(componentName: string, renderTime: number): void {
    this.recordCustomMetric('componentRender', renderTime, {
      component: componentName
    })

    // Warn about slow renders
    if (renderTime > 16.67) { // Slower than 60fps
      console.warn(`🐌 Slow render: ${componentName} (${renderTime.toFixed(2)}ms)`)
    }
  }

  /**
   * Record route change performance
   */
  recordRouteChange(from: string, to: string, duration: number): void {
    this.recordCustomMetric('routeChange', duration, {
      from: from.replace(/^\//, '') || 'home',
      to: to.replace(/^\//, '') || 'home'
    })
  }

  /**
   * Record API call performance
   */
  recordAPICall(endpoint: string, method: string, duration: number, status: number): void {
    this.recordCustomMetric('apiCall', duration, {
      endpoint,
      method,
      status: String(status)
    })

    // Warn about slow API calls
    if (duration > 2000) {
      console.warn(`🐌 Slow API call: ${method} ${endpoint} (${duration.toFixed(2)}ms)`)
    }
  }

  /**
   * Cleanup observers
   */
  dispose(): void {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor()

// React hook for component-level performance monitoring
export const usePerformanceMonitor = () => {
  return {
    mark: performanceMonitor.mark.bind(performanceMonitor),
    measure: performanceMonitor.measure.bind(performanceMonitor),
    recordComponentRender: performanceMonitor.recordComponentRender.bind(performanceMonitor),
    recordCustomMetric: performanceMonitor.recordCustomMetric.bind(performanceMonitor)
  }
}

// HOC for automatic component render time tracking
export function withPerformanceMonitoring<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName?: string
) {
  return memo((props: P) => {
    const displayName = componentName || WrappedComponent.displayName || WrappedComponent.name
    
    useEffect(() => {
      performanceMonitor.mark(`${displayName}-mount`)
      return () => {
        const mountTime = performanceMonitor.measure(`${displayName}-mount`)
        if (mountTime > 100) { // Log mounts slower than 100ms
          console.log(`📊 Component mount: ${displayName} (${mountTime.toFixed(2)}ms)`)
        }
      }
    }, [])

    const renderStart = performance.now()
    const result = createElement(WrappedComponent, props)
    const renderTime = performance.now() - renderStart
    
    useLayoutEffect(() => {
      performanceMonitor.recordComponentRender(displayName, renderTime)
    })

    return result
  })
}

// Global performance monitoring initialization
if (typeof window !== 'undefined') {
  // Monitor route changes
  let lastRoute = location.pathname
  const routeChangeStart = Date.now()
  
  const handleRouteChange = () => {
    const currentRoute = location.pathname
    if (currentRoute !== lastRoute) {
      const duration = Date.now() - routeChangeStart
      performanceMonitor.recordRouteChange(lastRoute, currentRoute, duration)
      lastRoute = currentRoute
    }
  }

  // Use both popstate and a MutationObserver for SPA route changes
  window.addEventListener('popstate', handleRouteChange)
  
  // Monitor DOM changes for SPA navigation
  const observer = new MutationObserver(() => {
    if (location.pathname !== lastRoute) {
      handleRouteChange()
    }
  })
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    performanceMonitor.dispose()
    observer.disconnect()
  })
}

export default performanceMonitor