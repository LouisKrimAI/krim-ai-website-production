/**
 * KRIM AI - CLAIMS REGISTRY VALIDATION UTILITY
 * Development mode validation and monitoring for Claims Registry integration
 * Ensures 100% compliance with RTF requirements
 */

import { 
  performanceMetrics, 
  CUSTOMER_METRICS, 
  FORMATTED_METRICS,
  getMetric,
  validateMetricFreshness,
  getStaleMetrics
} from '../data/claimsRegistry'

// Development mode configuration
const DEV_MODE = process.env.NODE_ENV === 'development'
const CONSOLE_PREFIX = '[Claims Registry Validator]'

// Tracking system for usage analytics
class ClaimsUsageTracker {
  private usedMetrics = new Set<string>()
  private hardcodedNumbers = new Map<string, string[]>()
  private validationErrors = new Array<{ type: string; message: string; location?: string }>()
  private performanceIssues = new Array<{ type: string; message: string; impact: 'low' | 'medium' | 'high' }>()
  
  /**
   * Track metric usage across components
   */
  trackMetricUsage(key: string, location?: string) {
    if (!DEV_MODE) return
    
    this.usedMetrics.add(key)
    
    // Validate metric exists
    if (!FORMATTED_METRICS[key as keyof typeof FORMATTED_METRICS] && !getMetric(key)) {
      this.validationErrors.push({
        type: 'MISSING_METRIC',
        message: `Metric key "${key}" not found in Claims Registry`,
        location
      })
    }
    
    // Check metric freshness
    const metric = getMetric(key)
    if (metric && !validateMetricFreshness(key)) {
      this.validationErrors.push({
        type: 'STALE_METRIC',
        message: `Metric "${key}" is stale (last updated: ${metric.validatedAt})`,
        location
      })
    }
  }
  
  /**
   * Report hardcoded number found in code
   */
  reportHardcodedNumber(number: string, location: string) {
    if (!DEV_MODE) return
    
    if (!this.hardcodedNumbers.has(number)) {
      this.hardcodedNumbers.set(number, [])
    }
    this.hardcodedNumbers.get(number)!.push(location)
    
    console.warn(`${CONSOLE_PREFIX} Hardcoded number detected: "${number}" in ${location}`)
  }
  
  /**
   * Track performance issues
   */
  trackPerformanceIssue(type: string, message: string, impact: 'low' | 'medium' | 'high') {
    if (!DEV_MODE) return
    
    this.performanceIssues.push({ type, message, impact })
    
    if (impact === 'high') {
      console.error(`${CONSOLE_PREFIX} Performance Issue (HIGH): ${message}`)
    } else if (impact === 'medium') {
      console.warn(`${CONSOLE_PREFIX} Performance Issue (MEDIUM): ${message}`)
    }
  }
  
  /**
   * Generate comprehensive integration report
   */
  generateIntegrationReport() {
    if (!DEV_MODE) return
    
    const totalMetrics = Object.keys(FORMATTED_METRICS).length
    const usedMetrics = this.usedMetrics.size
    const integrationRate = ((usedMetrics / totalMetrics) * 100).toFixed(1)
    
    console.group(`${CONSOLE_PREFIX} Integration Status Report`)
    
    // Usage Statistics
    console.log('📊 Usage Statistics:')
    console.log(`   • Metrics Used: ${usedMetrics}/${totalMetrics} (${integrationRate}%)`)
    console.log(`   • Integration Status: ${integrationRate === '100.0' ? '✅ Complete' : '⚠️ Incomplete'}`)
    
    // Unused Metrics
    const unusedMetrics = Object.keys(FORMATTED_METRICS).filter(key => !this.usedMetrics.has(key))
    if (unusedMetrics.length > 0) {
      console.log('📝 Unused Metrics:')
      unusedMetrics.forEach(key => console.log(`   • ${key}`))
    }
    
    // Validation Errors
    if (this.validationErrors.length > 0) {
      console.log('❌ Validation Errors:')
      this.validationErrors.forEach(error => {
        console.log(`   • [${error.type}] ${error.message}${error.location ? ` (${error.location})` : ''}`)
      })
    }
    
    // Hardcoded Numbers
    if (this.hardcodedNumbers.size > 0) {
      console.log('🔢 Hardcoded Numbers Found:')
      this.hardcodedNumbers.forEach((locations, number) => {
        console.log(`   • "${number}" in:`)
        locations.forEach(location => console.log(`     - ${location}`))
      })
    }
    
    // Performance Issues
    if (this.performanceIssues.length > 0) {
      console.log('⚡ Performance Issues:')
      this.performanceIssues.forEach(issue => {
        const icon = issue.impact === 'high' ? '🔴' : issue.impact === 'medium' ? '🟡' : '🟢'
        console.log(`   • ${icon} [${issue.type}] ${issue.message}`)
      })
    }
    
    // Stale Metrics
    const staleMetrics = getStaleMetrics()
    if (staleMetrics.length > 0) {
      console.log('⏰ Stale Metrics:')
      staleMetrics.forEach(metric => {
        console.log(`   • ${metric.id} (last updated: ${metric.validatedAt})`)
      })
    }
    
    // RTF Compliance Check
    const rtfCompliant = integrationRate === '100.0' && 
                        this.validationErrors.length === 0 && 
                        this.hardcodedNumbers.size === 0
    
    console.log(`🎯 RTF Compliance: ${rtfCompliant ? '✅ COMPLIANT' : '❌ NON-COMPLIANT'}`)
    
    console.groupEnd()
    
    return {
      integrationRate: parseFloat(integrationRate),
      usedMetrics,
      totalMetrics,
      unusedMetrics,
      validationErrors: this.validationErrors.length,
      hardcodedNumbers: this.hardcodedNumbers.size,
      performanceIssues: this.performanceIssues.length,
      rtfCompliant
    }
  }
  
  /**
   * Clear all tracking data
   */
  reset() {
    this.usedMetrics.clear()
    this.hardcodedNumbers.clear()
    this.validationErrors.length = 0
    this.performanceIssues.length = 0
  }
  
  /**
   * Get current usage statistics
   */
  getUsageStats() {
    const totalMetrics = Object.keys(FORMATTED_METRICS).length
    const usedMetrics = this.usedMetrics.size
    
    return {
      totalMetrics,
      usedMetrics,
      integrationRate: (usedMetrics / totalMetrics) * 100,
      unusedMetrics: Object.keys(FORMATTED_METRICS).filter(key => !this.usedMetrics.has(key))
    }
  }
}

// Global tracker instance
export const claimsUsageTracker = new ClaimsUsageTracker()

/**
 * Validate component metric usage
 */
export function validateComponentMetrics(componentName: string, metricsUsed: string[]) {
  if (!DEV_MODE) return
  
  metricsUsed.forEach(metric => {
    claimsUsageTracker.trackMetricUsage(metric, componentName)
  })
}

/**
 * Scan text content for hardcoded numbers
 */
export function scanForHardcodedNumbers(content: string, location: string) {
  if (!DEV_MODE) return
  
  // Regex patterns for common hardcoded number formats
  const patterns = [
    /\b\d+%\b/g,           // Percentages: 35%, 90%
    /\$\d+[KMB]?\b/g,      // Currency: $47B, $150K
    /\b\d+[KMB]\+?\b/g,    // Scale numbers: 50+, 2B+, 200M+
    /\b\d+\.\d+[KMB]?\b/g, // Decimals: 99.9%, 8.85M
    /\b\d{2,}\b/g          // Large numbers: 10000, 200000
  ]
  
  patterns.forEach(pattern => {
    const matches = content.match(pattern)
    if (matches) {
      matches.forEach(match => {
        // Skip common non-metric numbers
        if (!['100', '200', '300', '400', '500', '1000'].includes(match)) {
          claimsUsageTracker.reportHardcodedNumber(match, location)
        }
      })
    }
  })
}

/**
 * Monitor performance of Claims Registry operations
 */
export function monitorClaimsPerformance<T>(operation: () => T, operationName: string): T {
  if (!DEV_MODE) return operation()
  
  const startTime = performance.now()
  const result = operation()
  const endTime = performance.now()
  const duration = endTime - startTime
  
  // Track slow operations
  if (duration > 10) { // 10ms threshold
    claimsUsageTracker.trackPerformanceIssue(
      'SLOW_OPERATION',
      `Claims Registry operation "${operationName}" took ${duration.toFixed(2)}ms`,
      duration > 50 ? 'high' : duration > 25 ? 'medium' : 'low'
    )
  }
  
  return result
}

/**
 * Initialize Claims Registry monitoring
 */
export function initializeClaimsMonitoring() {
  if (!DEV_MODE) return
  
  console.log(`${CONSOLE_PREFIX} Monitoring initialized`)
  
  // Report on page unload
  window.addEventListener('beforeunload', () => {
    claimsUsageTracker.generateIntegrationReport()
  })
  
  // Periodic reporting during development
  const reportInterval = setInterval(() => {
    const stats = claimsUsageTracker.getUsageStats()
    if (stats.usedMetrics > 0) {
      console.log(`${CONSOLE_PREFIX} Live Stats: ${stats.usedMetrics}/${stats.totalMetrics} metrics used (${stats.integrationRate.toFixed(1)}%)`)
    }
  }, 60000) // Every minute
  
  // Clean up interval on navigation
  window.addEventListener('beforeunload', () => {
    clearInterval(reportInterval)
  })
  
  return () => {
    clearInterval(reportInterval)
    claimsUsageTracker.reset()
  }
}

/**
 * Assert metric exists (throws in development)
 */
export function assertMetricExists(key: string, location?: string): void {
  if (!DEV_MODE) return
  
  const hasFormatted = key in FORMATTED_METRICS
  const hasMetric = getMetric(key) !== undefined
  
  if (!hasFormatted && !hasMetric) {
    const error = `Claims Registry assertion failed: Metric "${key}" does not exist${location ? ` (used in ${location})` : ''}`
    console.error(`${CONSOLE_PREFIX} ${error}`)
    throw new Error(error)
  }
}

/**
 * Type guard for metric keys
 */
export function isValidMetricKey(key: string): key is keyof typeof FORMATTED_METRICS {
  return key in FORMATTED_METRICS
}

/**
 * Development mode middleware for metric access
 */
export function withClaimsValidation<T extends (...args: any[]) => any>(
  fn: T,
  operationName: string
): T {
  if (!DEV_MODE) return fn
  
  return ((...args: Parameters<T>) => {
    return monitorClaimsPerformance(() => fn(...args), operationName)
  }) as T
}

export default claimsUsageTracker