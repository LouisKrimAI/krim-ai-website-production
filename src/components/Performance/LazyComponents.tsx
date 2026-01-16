/**
 * Advanced Lazy Loading System for Krim AI
 * Implements intelligent component lazy loading with intersection observer,
 * preloading strategies, and fallback handling for optimal performance
 */

import React, { Suspense, lazy, ComponentType, ReactElement, useState, useEffect, useRef } from 'react'
import { performanceMonitor } from '../../utils/performanceMonitoring'

// Lazy loading configuration
interface LazyLoadConfig {
  rootMargin?: string
  threshold?: number | number[]
  preload?: boolean
  timeout?: number
  fallback?: ReactElement | 'seamless' | 'skeleton' | 'spinner' | 'dots' | 'minimal' | null
  errorBoundary?: boolean
  priority?: 'low' | 'normal' | 'high'
  prefetch?: boolean
}

// Default configuration optimized for seamless transitions
const DEFAULT_CONFIG: LazyLoadConfig = {
  rootMargin: '200px', // Increased for earlier loading
  threshold: 0.01, // Lower threshold for faster trigger
  preload: true,
  timeout: 10000,
  priority: 'normal',
  prefetch: true, // Enable prefetching by default
  errorBoundary: true
}

// Enhanced loading states - SEAMLESS TRANSITIONS (no full-screen blocks)
const LoadingFallbacks = {
  // Invisible placeholder - maintains layout without visual disruption
  skeleton: (
    <div className="opacity-0 pointer-events-none">
      {/* Invisible placeholder to prevent layout shift */}
    </div>
  ),

  // Subtle inline spinner for forms/components only
  spinner: (
    <div className="inline-flex items-center justify-center p-2">
      <div className="animate-spin rounded-full h-4 w-4 border border-krim-mint/30 border-t-krim-mint"></div>
    </div>
  ),

  // Small inline dots for inline loading states
  dots: (
    <div className="inline-flex items-center justify-center space-x-1 p-2">
      <div className="animate-pulse h-1 w-1 bg-krim-mint/50 rounded-full"></div>
      <div className="animate-pulse h-1 w-1 bg-krim-mint/50 rounded-full" style={{ animationDelay: '0.1s' }}></div>
      <div className="animate-pulse h-1 w-1 bg-krim-mint/50 rounded-full" style={{ animationDelay: '0.2s' }}></div>
    </div>
  ),

  // Completely invisible - for seamless page transitions
  minimal: (
    <div className="opacity-0">
      {/* Invisible placeholder */}
    </div>
  ),

  // New: Seamless transition placeholder
  seamless: null // Return nothing, let React handle it
}

// Error boundary for lazy loaded components
class LazyErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: ReactElement },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Lazy component error:', error, errorInfo)
    performanceMonitor.recordCustomMetric('lazyLoadError', 1, {
      error: error.message,
      component: errorInfo.componentStack?.split('\n')[1] || 'unknown'
    })
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen bg-krim-deep-space flex items-center justify-center p-4">
          <div className="text-center text-red-400 max-w-2xl">
            <div className="text-sm font-medium">Something went wrong</div>
            <div className="mt-2 text-xs bg-red-900/20 p-2 rounded border border-red-500/20">
              <div className="font-mono text-left text-red-300">
                ERROR: {this.state.error?.message || 'Unknown error'}
              </div>
              <div className="font-mono text-left mt-1 text-red-400/70 text-xs">
                {this.state.error?.stack?.split('\n').slice(0, 3).join('\n')}
              </div>
            </div>
            <button
              className="mt-2 text-xs underline text-krim-mint hover:text-krim-cyan"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Intersection Observer hook for visibility detection
function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
): boolean {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      {
        rootMargin: '50px',
        threshold: 0.1,
        ...options
      }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [options.rootMargin, options.threshold])

  return isIntersecting
}

// Preloader for lazy components
class ComponentPreloader {
  private static cache = new Map<string, Promise<any>>()
  private static prefetchQueue: Array<{ loader: () => Promise<any>; priority: number }> = []
  private static isProcessing = false

  static preload<T extends ComponentType<any>>(
    loader: () => Promise<{ default: T }>,
    key: string,
    priority: number = 0
  ): Promise<{ default: T }> {
    if (this.cache.has(key)) {
      return this.cache.get(key)!
    }

    const loadPromise = loader().then(module => {
      performanceMonitor.recordCustomMetric('componentPreload', Date.now(), {
        component: key,
        priority: String(priority)
      })
      return module
    })

    this.cache.set(key, loadPromise)
    return loadPromise
  }

  static prefetch<T extends ComponentType<any>>(
    loader: () => Promise<{ default: T }>,
    key: string,
    priority: 'low' | 'normal' | 'high' = 'normal'
  ): void {
    if (this.cache.has(key)) return

    const priorityValue = { low: 0, normal: 1, high: 2 }[priority]
    this.prefetchQueue.push({ loader: () => this.preload(loader, key, priorityValue), priority: priorityValue })
    this.prefetchQueue.sort((a, b) => b.priority - a.priority)

    this.processPrefetchQueue()
  }

  private static async processPrefetchQueue(): Promise<void> {
    if (this.isProcessing || this.prefetchQueue.length === 0) return

    this.isProcessing = true

    // Process high priority items immediately
    const highPriority = this.prefetchQueue.filter(item => item.priority === 2)
    for (const item of highPriority) {
      await item.loader().catch(() => {}) // Silent fail for prefetch
      this.prefetchQueue = this.prefetchQueue.filter(i => i !== item)
    }

    // Process normal/low priority items when idle
    if ('requestIdleCallback' in window) {
      const processIdle = (deadline: IdleDeadline) => {
        while (deadline.timeRemaining() > 0 && this.prefetchQueue.length > 0) {
          const item = this.prefetchQueue.shift()!
          item.loader().catch(() => {}) // Silent fail for prefetch
        }

        if (this.prefetchQueue.length > 0) {
          requestIdleCallback(processIdle)
        } else {
          this.isProcessing = false
        }
      }
      requestIdleCallback(processIdle)
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        Promise.all(this.prefetchQueue.map(item => item.loader().catch(() => {})))
          .finally(() => {
            this.prefetchQueue = []
            this.isProcessing = false
          })
      }, 100)
    }
  }
}

// Main lazy loading wrapper component
interface LazyWrapperProps {
  children: React.ReactNode
  config?: LazyLoadConfig
  fallback?: keyof typeof LoadingFallbacks | ReactElement | 'seamless' | null
  className?: string
}

function LazyWrapper({ children, config = {}, fallback = null, className = '' }: LazyWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mergedConfig = { ...DEFAULT_CONFIG, ...config }
  const isVisible = useIntersectionObserver(ref, {
    rootMargin: mergedConfig.rootMargin,
    threshold: mergedConfig.threshold
  })

  const [shouldRender, setShouldRender] = useState(false)
  const [hasTimedOut, setHasTimedOut] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true)
    }
  }, [isVisible])

  // Timeout fallback
  useEffect(() => {
    if (mergedConfig.timeout && !shouldRender) {
      const timer = setTimeout(() => {
        setHasTimedOut(true)
        setShouldRender(true)
      }, mergedConfig.timeout)

      return () => clearTimeout(timer)
    }
  }, [mergedConfig.timeout, shouldRender])

  const getFallbackElement = () => {
    // For seamless transitions, return null instead of loading UI
    if (fallback === 'seamless' || fallback === null) {
      return null
    }
    if (typeof fallback === 'string') {
      return LoadingFallbacks[fallback as keyof typeof LoadingFallbacks] || null
    }
    return fallback
  }

  const content = shouldRender ? children : getFallbackElement()

  const wrappedContent = mergedConfig.errorBoundary ? (
    <LazyErrorBoundary>
      {content}
    </LazyErrorBoundary>
  ) : content

  return (
    <div ref={ref} className={className}>
      {/* Remove timeout warning for seamless experience */}
      {wrappedContent}
    </div>
  )
}

// Enhanced lazy component creator
export function createLazyComponent<T extends ComponentType<any>>(
  loader: () => Promise<{ default: T }>,
  config: LazyLoadConfig & { 
    displayName?: string
    prefetchTrigger?: 'hover' | 'focus' | 'immediate'
  } = {}
): React.FC<React.ComponentProps<T>> {
  const componentKey = config.displayName || `LazyComponent_${Date.now()}_${Math.random()}`
  
  // Create the lazy component
  const LazyComponent = lazy(() => {
    const startTime = performance.now()
    return loader().then(module => {
      const loadTime = performance.now() - startTime
      performanceMonitor.recordCustomMetric('lazyComponentLoad', loadTime, {
        component: componentKey
      })
      return module
    })
  })

  // Set display name for debugging
  ;(LazyComponent as any).displayName = componentKey

  // Handle prefetch strategies
  if (config.prefetch || config.prefetchTrigger) {
    if (config.prefetchTrigger === 'immediate') {
      ComponentPreloader.prefetch(loader, componentKey, config.priority)
    }
  }

  const EnhancedLazyComponent: React.FC<React.ComponentProps<T>> = (props) => {
    const [shouldPreload, setShouldPreload] = useState(false)

    const handleMouseEnter = () => {
      if (config.prefetchTrigger === 'hover' && !shouldPreload) {
        setShouldPreload(true)
        ComponentPreloader.prefetch(loader, componentKey, config.priority)
      }
    }

    const handleFocus = () => {
      if (config.prefetchTrigger === 'focus' && !shouldPreload) {
        setShouldPreload(true)
        ComponentPreloader.prefetch(loader, componentKey, config.priority)
      }
    }

    // Determine the fallback to use
    const fallbackComponent = config.fallback === 'seamless' || config.fallback === null 
      ? null 
      : typeof config.fallback === 'string'
        ? LoadingFallbacks[config.fallback as keyof typeof LoadingFallbacks]
        : config.fallback

    return (
      <div 
        onMouseEnter={handleMouseEnter} 
        onFocus={handleFocus}
        className="lazy-component-wrapper"
      >
        <LazyWrapper config={config} fallback={config.fallback || null}>
          <Suspense fallback={fallbackComponent}>
            <LazyComponent {...props as any} />
          </Suspense>
        </LazyWrapper>
      </div>
    )
  }

  EnhancedLazyComponent.displayName = `Enhanced${componentKey}`
  return EnhancedLazyComponent
}

// Pre-built lazy components for common use cases
export const LazyComponents = {
  // NOTE: Heavy 3D components removed to prevent eager R3F loading
  // Use Heavy3DWrapper component with effect-driven loading instead

  // Form components
  ContactForm: createLazyComponent(
    () => import('../forms/ContactForm'),
    {
      displayName: 'ContactForm',
      priority: 'normal',
      prefetchTrigger: 'hover',
      fallback: null
    }
  ),

  // Secondary pages - Truly seamless loading (no fallbacks)
  AgentsPage: createLazyComponent(
    () => import('../../pages/Agents'),
    { displayName: 'AgentsPage', priority: 'normal', fallback: null }
  ),

  AgentDetailPage: createLazyComponent(
    () => import('../../pages/AgentDetail'),
    { displayName: 'AgentDetailPage', priority: 'normal', fallback: null }
  ),

  PricingPage: createLazyComponent(
    () => import('../../pages/Pricing'),
    { displayName: 'PricingPage', priority: 'normal', fallback: null }
  ),

  // Note: PlatformPage, ContactPage moved to direct imports - remove these
  CaseStudiesPage: createLazyComponent(
    () => import('../../pages/CaseStudies'),
    { displayName: 'CaseStudiesPage', priority: 'normal', fallback: null }
  ),

  NewsPage: createLazyComponent(
    () => import('../../pages/News'),
    { displayName: 'NewsPage', priority: 'normal', fallback: null }
  ),

  // Legal pages - Low priority, seamless loading
  PrivacyPage: createLazyComponent(
    () => import('../../pages/legal/Privacy'),
    { displayName: 'PrivacyPage', priority: 'low', fallback: null }
  ),

  TermsPage: createLazyComponent(
    () => import('../../pages/legal/Terms'),
    { displayName: 'TermsPage', priority: 'low', fallback: null }
  ),

  SecurityPage: createLazyComponent(
    () => import('../../pages/legal/Security'),
    { displayName: 'SecurityPage', priority: 'low', fallback: null }
  ),

  AboutPage: createLazyComponent(
    () => import('../../pages/About'),
    { displayName: 'AboutPage', priority: 'normal', fallback: null }
  ),

  // New enterprise-grade homepage for comparison
  HomePageNew: createLazyComponent(
    () => import('../../pages/HomePageNew'),
    { displayName: 'HomePageNew', priority: 'high', fallback: null }
  ),

  // Fixed homepage with precision and rebuilt visuals
  HomePageNewFixed: createLazyComponent(
    () => import('../../pages/HomePageNewFixed'),
    { displayName: 'HomePageNewFixed', priority: 'high', fallback: null }
  ),

  // Note: Product pages (Karta, Kriya, Kupa, Kula, SafeSuperintelligence) moved to direct imports
  
  TextReadabilityTestPage: createLazyComponent(
    () => import('../../pages/TextReadabilityTest'),
    { displayName: 'TextReadabilityTestPage', priority: 'low', fallback: null }
  )
}

// Route-based preloading hook - DISABLED to prevent eager R3F loading
// Agents and Platform pages contain 3D components that would create eager paths to R3F
export function useRoutePreloading() {
  // No-op to prevent ReactCurrentBatchConfig crashes
  // Pages will load on-demand via React Router instead
}

// Component for preloading on demand
export function PreloadTrigger({ 
  components, 
  trigger = 'hover',
  children 
}: {
  components: string[]
  trigger?: 'hover' | 'focus' | 'click'
  children: React.ReactNode
}) {
  const [hasPreloaded, setHasPreloaded] = useState(false)

  const handlePreload = () => {
    if (hasPreloaded) return
    setHasPreloaded(true)

    components.forEach(componentName => {
      // Map component names to their loaders
      const loaderMap: Record<string, () => Promise<any>> = {
        // ParticleField removed to prevent eager R3F loading
        ContactForm: () => import('../forms/ContactForm'),
        // AgentsPage removed - contains 3D components
        PricingPage: () => import('../../pages/Pricing'),
        // Add more as needed (non-3D components only)
      }

      const loader = loaderMap[componentName]
      if (loader) {
        ComponentPreloader.prefetch(loader, componentName, 'normal')
      }
    })
  }

  const triggerProps = {
    [trigger === 'hover' ? 'onMouseEnter' : trigger === 'focus' ? 'onFocus' : 'onClick']: handlePreload
  }

  return <div {...triggerProps}>{children}</div>
}

// Performance-aware lazy loading for lists
export function LazyList<T>({
  items,
  renderItem,
  itemHeight = 100,
  overscan = 5,
  threshold = 0.1
}: {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  itemHeight?: number
  overscan?: number
  threshold?: number
}) {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: Math.min(20, items.length) })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt((entry.target as HTMLElement).dataset.index || '0')
            setVisibleRange(prev => ({
              start: Math.min(prev.start, Math.max(0, index - overscan)),
              end: Math.max(prev.end, Math.min(items.length, index + overscan))
            }))
          }
        })
      },
      { threshold, rootMargin: `${itemHeight * overscan}px` }
    )

    // Observe sentinel elements
    const sentinels = container.querySelectorAll('[data-index]')
    sentinels.forEach(sentinel => observer.observe(sentinel))

    return () => observer.disconnect()
  }, [items.length, itemHeight, overscan, threshold])

  return (
    <div ref={containerRef} style={{ height: items.length * itemHeight }}>
      {items.slice(visibleRange.start, visibleRange.end).map((item, index) => (
        <div
          key={visibleRange.start + index}
          data-index={visibleRange.start + index}
          style={{
            position: 'absolute',
            top: (visibleRange.start + index) * itemHeight,
            height: itemHeight
          }}
        >
          {renderItem(item, visibleRange.start + index)}
        </div>
      ))}
    </div>
  )
}

export { LazyWrapper, LoadingFallbacks, ComponentPreloader }