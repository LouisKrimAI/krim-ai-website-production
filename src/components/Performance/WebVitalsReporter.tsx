/**
 * Web Vitals Performance Reporter
 * Enterprise-grade performance monitoring for real-time metrics tracking
 * Automatically reports Core Web Vitals to analytics when available
 */

import { useEffect } from 'react'
import { onCLS, onFCP, onLCP, onTTFB, type Metric } from 'web-vitals'

interface PerformanceMetrics {
  CLS: number | null
  FCP: number | null
  LCP: number | null
  TTFB: number | null
}

const performanceThresholds = {
  // Google-recommended thresholds for Core Web Vitals
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 }, // milliseconds
  LCP: { good: 2500, poor: 4000 }, // milliseconds
  TTFB: { good: 800, poor: 1800 } // milliseconds
} as const

const metrics: PerformanceMetrics = {
  CLS: null,
  FCP: null,
  LCP: null,
  TTFB: null
}

function getPerformanceRating(metricName: keyof PerformanceMetrics, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = performanceThresholds[metricName]
  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}

function reportMetric(metric: Metric) {
  const rating = getPerformanceRating(metric.name as keyof PerformanceMetrics, metric.value)
  
  // Update local metrics store
  metrics[metric.name as keyof PerformanceMetrics] = metric.value
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`🚀 ${metric.name}: ${metric.value} (${rating})`, metric)
  }
  
  // Report to analytics in production
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    try {
      // Google Analytics 4 (if available)
      if ((window as any).gtag) {
        (window as any).gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          custom_map: {
            metric_rating: rating,
            metric_delta: metric.delta
          }
        })
      }
      
      // Performance monitoring service (if configured)
      if (window.performance && window.performance.mark) {
        window.performance.mark(`${metric.name}-${metric.value}-${rating}`)
      }
      
    } catch (error) {
      console.warn('Performance reporting failed:', error)
    }
  }
}

export const WebVitalsReporter = () => {
  useEffect(() => {
    // Initialize performance monitoring
    onCLS(reportMetric)
    onFCP(reportMetric)
    onLCP(reportMetric)
    onTTFB(reportMetric)
    
    // Performance budget alerts (development only)
    if (process.env.NODE_ENV === 'development') {
      const checkPerformanceBudget = () => {
        const alerts: string[] = []
        
        Object.entries(metrics).forEach(([metricName, value]) => {
          if (value !== null) {
            const rating = getPerformanceRating(metricName as keyof PerformanceMetrics, value)
            if (rating === 'poor') {
              alerts.push(`${metricName}: ${value} (${rating})`)
            }
          }
        })
        
        if (alerts.length > 0) {
          console.warn('⚠️  Performance Budget Exceeded:', alerts)
        }
      }
      
      // Check budget after 5 seconds
      setTimeout(checkPerformanceBudget, 5000)
    }
    
  }, [])
  
  return null // This is a monitoring component with no UI
}

export const getPerformanceMetrics = (): PerformanceMetrics => metrics

export const logPerformanceSummary = () => {
  if (process.env.NODE_ENV === 'development') {
    console.group('🚀 Performance Summary')
    Object.entries(metrics).forEach(([name, value]) => {
      if (value !== null) {
        const rating = getPerformanceRating(name as keyof PerformanceMetrics, value)
        console.log(`${name}: ${value} (${rating})`)
      }
    })
    console.groupEnd()
  }
}

// Remove global gtag declaration to avoid conflicts

export default WebVitalsReporter