/**
 * KRIM AI - CLAIMS REGISTRY INTEGRATION HOOKS
 * Type-safe, performance-optimized Claims Registry integration
 * Development validation, caching, and centralized metric access
 */

import { useMemo, useEffect, useRef } from 'react'
import { 
  performanceMetrics, 
  getMetric, 
  getFormattedMetric, 
  getContent,
  validateMetricFreshness,
  CUSTOMER_METRICS,
  FORMATTED_METRICS,
  MetricClaim 
} from '../data/claimsRegistry'

// Type-safe metric keys
export type MetricKey = keyof typeof CUSTOMER_METRICS
export type FormattedMetricKey = keyof typeof FORMATTED_METRICS
export type MetricFormat = 'currency' | 'percentage' | 'number' | 'default'

// Development mode configuration
const DEV_MODE = process.env.NODE_ENV === 'development'
const CONSOLE_PREFIX = '[Claims Registry]'

// Performance cache for frequently accessed metrics
const metricCache = new Map<string, { value: string; timestamp: number }>()
const CACHE_TTL = 60000 // 1 minute cache

/**
 * Enhanced Claims Registry Hook
 * Provides type-safe access to all metrics with performance optimization
 */
export function useClaimsRegistry() {
  const metricsUsageRef = useRef(new Set<string>())
  
  /**
   * Get display metric with type safety and caching
   */
  const getDisplayMetric = useMemo(() => {
    return (key: FormattedMetricKey): string => {
      const cacheKey = `formatted_${key}`
      const now = Date.now()
      
      // Check cache first
      const cached = metricCache.get(cacheKey)
      if (cached && (now - cached.timestamp) < CACHE_TTL) {
        return cached.value
      }
      
      // Get formatted value
      const value = FORMATTED_METRICS[key] || 'N/A'
      
      // Cache result
      metricCache.set(cacheKey, { value, timestamp: now })
      
      // Track usage in development
      if (DEV_MODE) {
        metricsUsageRef.current.add(key)
        if (!FORMATTED_METRICS[key]) {
          console.warn(`${CONSOLE_PREFIX} Missing metric key: "${key}"`)
        }
      }
      
      return value
    }
  }, [])
  
  /**
   * Get formatted value with custom format
   */
  const getFormattedValue = useMemo(() => {
    return (key: MetricKey, format: MetricFormat = 'default'): string => {
      const rawValue = CUSTOMER_METRICS[key]
      if (!rawValue) {
        if (DEV_MODE) {
          console.warn(`${CONSOLE_PREFIX} Missing raw metric: "${key}"`)
        }
        return 'N/A'
      }
      
      // Track usage
      if (DEV_MODE) {
        metricsUsageRef.current.add(key)
      }
      
      switch (format) {
        case 'currency':
          return `$${rawValue}`
        case 'percentage':
          return `${rawValue}%`
        case 'number':
          return rawValue.toString()
        default:
          return FORMATTED_METRICS[key as FormattedMetricKey] || rawValue.toString()
      }
    }
  }, [])
  
  /**
   * Validate metric exists and is fresh
   */
  const validateMetric = useMemo(() => {
    return (key: string): { exists: boolean; fresh: boolean; metric?: MetricClaim } => {
      const metric = getMetric(key)
      const exists = !!metric
      const fresh = exists ? validateMetricFreshness(key) : false
      
      if (DEV_MODE && !exists) {
        console.warn(`${CONSOLE_PREFIX} Metric validation failed for: "${key}"`)
      }
      
      if (DEV_MODE && exists && !fresh) {
        console.warn(`${CONSOLE_PREFIX} Stale metric detected: "${key}" (last updated: ${metric?.validatedAt})`)
      }
      
      return { exists, fresh, metric }
    }
  }, [])
  
  /**
   * Get metric by performanceMetrics ID with validation
   */
  const getValidatedMetric = useMemo(() => {
    return (id: string): string => {
      const validation = validateMetric(id)
      if (!validation.exists || !validation.metric) {
        return 'N/A'
      }
      
      return getFormattedMetric(id)
    }
  }, [validateMetric])
  
  // Development mode usage tracking
  useEffect(() => {
    if (DEV_MODE) {
      const cleanup = () => {
        const usedMetrics = Array.from(metricsUsageRef.current)
        const allMetricKeys = Object.keys(FORMATTED_METRICS)
        const unusedMetrics = allMetricKeys.filter(key => !usedMetrics.includes(key))
        
        if (usedMetrics.length > 0) {
          console.log(`${CONSOLE_PREFIX} Used metrics:`, usedMetrics)
        }
        
        if (unusedMetrics.length > 0) {
          console.log(`${CONSOLE_PREFIX} Unused metrics available:`, unusedMetrics)
        }
        
        console.log(`${CONSOLE_PREFIX} Integration health: ${usedMetrics.length}/${allMetricKeys.length} metrics utilized`)
      }
      
      // Log usage on unmount or page change
      window.addEventListener('beforeunload', cleanup)
      return () => window.removeEventListener('beforeunload', cleanup)
    }
  }, [])
  
  return {
    getDisplayMetric,
    getFormattedValue,
    validateMetric,
    getValidatedMetric,
    // Direct access to formatted metrics for inline usage
    metrics: FORMATTED_METRICS,
    // Performance utilities
    clearCache: () => metricCache.clear(),
    getCacheStats: () => ({ size: metricCache.size, entries: Array.from(metricCache.keys()) })
  }
}

/**
 * Lightweight hook for component-specific metric access
 * Optimized for components that only need a few metrics
 */
export function useMetric(key: FormattedMetricKey) {
  const { getDisplayMetric, validateMetric } = useClaimsRegistry()
  
  return useMemo(() => {
    const value = getDisplayMetric(key)
    const validation = validateMetric(key)
    
    return {
      value,
      isValid: validation.exists,
      isFresh: validation.fresh,
      metric: validation.metric
    }
  }, [key, getDisplayMetric, validateMetric])
}

/**
 * Hook for batch metric access
 * Optimized for components displaying multiple metrics
 */
export function useMetrics(keys: FormattedMetricKey[]) {
  const { getDisplayMetric, validateMetric } = useClaimsRegistry()
  
  return useMemo(() => {
    return keys.reduce((acc, key) => {
      const value = getDisplayMetric(key)
      const validation = validateMetric(key)
      
      acc[key] = {
        value,
        isValid: validation.exists,
        isFresh: validation.fresh,
        metric: validation.metric
      }
      
      return acc
    }, {} as Record<FormattedMetricKey, {
      value: string
      isValid: boolean
      isFresh: boolean
      metric?: MetricClaim
    }>)
  }, [keys, getDisplayMetric, validateMetric])
}

/**
 * Performance monitoring hook
 * Tracks Claims Registry usage and performance
 */
export function useClaimsPerformance() {
  const performanceRef = useRef({
    accessCount: 0,
    cacheHits: 0,
    cacheMisses: 0
  })
  
  useEffect(() => {
    if (DEV_MODE) {
      const interval = setInterval(() => {
        const stats = performanceRef.current
        if (stats.accessCount > 0) {
          const hitRate = (stats.cacheHits / stats.accessCount) * 100
          console.log(`${CONSOLE_PREFIX} Performance stats:`, {
            totalAccess: stats.accessCount,
            cacheHitRate: `${hitRate.toFixed(1)}%`,
            cacheSize: metricCache.size
          })
        }
      }, 30000) // Log every 30 seconds
      
      return () => clearInterval(interval)
    }
  }, [])
  
  return performanceRef.current
}

export default useClaimsRegistry