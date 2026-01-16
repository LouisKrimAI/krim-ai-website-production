/**
 * KRIM AI - DYNAMIC CONTENT MANAGEMENT SYSTEM
 * Enterprise-grade content management with real-time updates
 * Integrates with Claims Registry for consistent messaging
 */

// Note: gtag type is declared globally in ContactForm.tsx

import { useState, useEffect } from 'react'
import { 
  getMetric, 
  getFormattedMetric, 
  getContent, 
  getBusinessClaim,
  performanceMetrics,
  contentBlocks,
  validateMetricFreshness
} from '../data/claimsRegistry'

export interface ContentContext {
  page: string
  section: string
  variant?: string
  audience?: 'enterprise' | 'smb' | 'general'
  urgency?: 'high' | 'medium' | 'low'
}

export interface DynamicContent {
  id: string
  content: string
  metrics: Array<{
    id: string
    value: string
    confidence: string
  }>
  lastUpdated: Date
  isStale: boolean
}

/**
 * Content Management Class
 * Handles dynamic content generation and caching
 */
export class ContentManager {
  private cache: Map<string, DynamicContent> = new Map()
  private cacheTimeout = 5 * 60 * 1000 // 5 minutes
  
  /**
   * Get dynamic content with metric interpolation
   */
  public getDynamicContent(
    contentId: string, 
    context: ContentContext = { page: 'home', section: 'hero' }
  ): DynamicContent {
    const cacheKey = `${contentId}_${JSON.stringify(context)}`
    
    // Check cache first
    const cached = this.cache.get(cacheKey)
    if (cached && !this.isCacheStale(cached)) {
      return cached
    }
    
    // Generate fresh content
    const baseContent = getContent(contentId, context.variant)
    const interpolatedContent = this.interpolateMetrics(baseContent)
    const relevantMetrics = this.extractRelevantMetrics(baseContent)
    
    const dynamicContent: DynamicContent = {
      id: contentId,
      content: interpolatedContent,
      metrics: relevantMetrics,
      lastUpdated: new Date(),
      isStale: relevantMetrics.some(m => !validateMetricFreshness(m.id))
    }
    
    // Cache for future use
    this.cache.set(cacheKey, dynamicContent)
    
    return dynamicContent
  }
  
  /**
   * Interpolate metrics into content using template syntax
   * Example: "Achieve {{collection_lift}} improvement" -> "Achieve 35% improvement"
   */
  private interpolateMetrics(content: string): string {
    return content.replace(/\{\{([^}]+)\}\}/g, (match, metricId) => {
      const formattedValue = getFormattedMetric(metricId.trim())
      return formattedValue || match // Fallback to original if not found
    })
  }
  
  /**
   * Extract metric IDs referenced in content
   */
  private extractRelevantMetrics(content: string): Array<{
    id: string
    value: string
    confidence: string
  }> {
    const metricIds: string[] = []
    const matches = content.matchAll(/\{\{([^}]+)\}\}/g)
    
    for (const match of matches) {
      metricIds.push(match[1].trim())
    }
    
    return metricIds.map(id => {
      const metric = getMetric(id)
      return {
        id,
        value: getFormattedMetric(id),
        confidence: metric?.confidenceLevel || 'unknown'
      }
    }).filter(m => m.value !== 'N/A')
  }
  
  /**
   * Check if cached content is stale
   */
  private isCacheStale(content: DynamicContent): boolean {
    const now = new Date().getTime()
    const contentTime = content.lastUpdated.getTime()
    return (now - contentTime) > this.cacheTimeout
  }
  
  /**
   * Clear cache (useful for testing or forced refreshes)
   */
  public clearCache(): void {
    this.cache.clear()
  }
  
  /**
   * Get cache statistics (for monitoring)
   */
  public getCacheStats() {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys()),
      staleEntries: Array.from(this.cache.values())
        .filter(content => this.isCacheStale(content))
        .length
    }
  }
}

// Singleton instance for global use
export const contentManager = new ContentManager()

/**
 * React Hook for dynamic content
 * Provides reactive updates when content changes
 */
export const useDynamicContent = (
  contentId: string, 
  context?: ContentContext
) => {
  const [content, setContent] = useState<DynamicContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    try {
      setLoading(true)
      const dynamicContent = contentManager.getDynamicContent(contentId, context)
      setContent(dynamicContent)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load content')
      console.error('Content loading error:', err)
    } finally {
      setLoading(false)
    }
  }, [contentId, JSON.stringify(context)])
  
  return { content, loading, error }
}

/**
 * Prebuilt content templates for common sections
 */
export const contentTemplates = {
  heroHeadline: {
    enterprise: 'Multi-agentic AI infrastructure for Autonomous Credit Servicing',
    smb: 'AI-Powered Credit Servicing That Actually Works',
    general: 'Transform Your Loan Operations with AI'
  },
  
  heroSubheading: {
    enterprise: 'Transform a ${{cost_center_transformation}}B cost center into an AI-native profit driver. Complete loan lifecycle management with {{collection_lift}} collection lift.',
    smb: 'Automate {{automation_rate}} of your loan processes and see {{collection_lift}} better collections in {{roi_timeframe}} days.',
    general: 'See {{collection_lift}} improvement in collections with our AI-powered platform trusted by {{financial_institutions}} institutions.'
  },
  
  socialProof: {
    scale: '{{financial_institutions}} Financial Institutions • ${{monthly_debt_managed}} Total Debt Managed • {{ai_calls_processed}} AI Calls Processed',
    performance: '{{collection_lift}} Collection Lift • {{automation_rate}} Automation Rate • {{roi_timeframe}} Day ROI',
    enterprise: 'Trusted by Fortune 500 • SOC 2 Compliant • {{uptime_sla}} Uptime SLA'
  }
}

/**
 * Content validation utilities
 */
export const validateContent = (contentId: string): {
  isValid: boolean
  issues: string[]
  recommendations: string[]
} => {
  const content = getContent(contentId)
  const issues: string[] = []
  const recommendations: string[] = []
  
  if (!content) {
    issues.push('Content not found')
    return { isValid: false, issues, recommendations }
  }
  
  // Check for metric references
  const metricRefs = content.match(/\{\{([^}]+)\}\}/g) || []
  for (const ref of metricRefs) {
    const metricId = ref.replace(/[{}]/g, '').trim()
    const metric = getMetric(metricId)
    
    if (!metric) {
      issues.push(`Referenced metric '${metricId}' not found`)
    } else if (!validateMetricFreshness(metricId)) {
      issues.push(`Referenced metric '${metricId}' is stale`)
      recommendations.push(`Update metric '${metricId}' data`)
    }
  }
  
  // Check content length
  if (content.length > 200) {
    recommendations.push('Consider shorter version for mobile')
  }
  
  // Check for enterprise terminology
  const enterpriseTerms = ['Fortune 500', 'enterprise-grade', 'SOC 2', 'compliance']
  const hasEnterpriseTerms = enterpriseTerms.some(term => 
    content.toLowerCase().includes(term.toLowerCase())
  )
  
  if (!hasEnterpriseTerms && contentId.includes('enterprise')) {
    recommendations.push('Consider adding enterprise credibility indicators')
  }
  
  return {
    isValid: issues.length === 0,
    issues,
    recommendations
  }
}

/**
 * Performance monitoring for content system
 */
export const contentPerformanceMonitor = {
  trackContentLoad: (contentId: string, loadTime: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'content_load', {
        content_id: contentId,
        load_time: loadTime,
        event_category: 'Content Performance'
      })
    }
  },
  
  trackContentInteraction: (contentId: string, action: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'content_interaction', {
        content_id: contentId,
        action,
        event_category: 'Content Engagement'
      })
    }
  },
  
  trackStaleContent: (contentId: string, staleMetrics: string[]) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'content_stale', {
        content_id: contentId,
        stale_metrics: staleMetrics.join(','),
        event_category: 'Content Quality'
      })
    }
    
    // Also log for internal monitoring
    console.warn(`Stale content detected: ${contentId}`, {
      contentId,
      staleMetrics,
      timestamp: new Date().toISOString()
    })
  }
}

/**
 * A/B Testing utilities for content
 */
export const contentTesting = {
  getVariant: (contentId: string, userId?: string): string => {
    // Simple hash-based variant assignment
    if (!userId) userId = 'anonymous'
    
    const hash = userId.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0)
    }, 0)
    
    const variants = ['default', 'urgent', 'consultative', 'direct']
    return variants[hash % variants.length]
  },
  
  trackConversion: (contentId: string, variant: string, conversionType: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'content_conversion', {
        content_id: contentId,
        variant,
        conversion_type: conversionType,
        event_category: 'A/B Testing'
      })
    }
  }
}