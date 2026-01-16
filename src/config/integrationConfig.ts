/**
 * KRIM AI - INTEGRATION CONFIGURATION
 * Environment-based configuration for all advanced integrations
 */

export interface IntegrationConfig {
  firecrawl: {
    apiKey: string
    enabled: boolean
    rateLimitMs: number
  }
  supabase: {
    url: string
    anonKey: string
    enabled: boolean
    realtimeEnabled: boolean
  }
  imageGeneration: {
    provider: 'openai' | 'stability' | 'midjourney'
    apiKey: string
    enabled: boolean
    defaultModel: string
    maxResolution: string
  }
  playwright: {
    enabled: boolean
    headless: boolean
    timeout: number
    viewportWidth: number
    viewportHeight: number
  }
  analytics: {
    enabled: boolean
    trackingId?: string
    privacyMode: boolean
  }
  performance: {
    monitoring: boolean
    budgetAlert: boolean
    realTimeTracking: boolean
  }
}

// Development configuration
const developmentConfig: IntegrationConfig = {
  firecrawl: {
    apiKey: process.env.VITE_FIRECRAWL_API_KEY || 'dev-key-placeholder',
    enabled: !!process.env.VITE_FIRECRAWL_API_KEY,
    rateLimitMs: 1000
  },
  supabase: {
    url: process.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co',
    anonKey: process.env.VITE_SUPABASE_ANON_KEY || 'dev-key-placeholder',
    enabled: !!(process.env.VITE_SUPABASE_URL && process.env.VITE_SUPABASE_ANON_KEY),
    realtimeEnabled: true
  },
  imageGeneration: {
    provider: 'openai',
    apiKey: process.env.VITE_OPENAI_API_KEY || 'dev-key-placeholder',
    enabled: !!process.env.VITE_OPENAI_API_KEY,
    defaultModel: 'dall-e-3',
    maxResolution: '1024x1024'
  },
  playwright: {
    enabled: true,
    headless: true,
    timeout: 30000,
    viewportWidth: 1920,
    viewportHeight: 1080
  },
  analytics: {
    enabled: false, // Disabled in development
    privacyMode: true
  },
  performance: {
    monitoring: true,
    budgetAlert: true,
    realTimeTracking: true
  }
}

// Production configuration
const productionConfig: IntegrationConfig = {
  firecrawl: {
    apiKey: process.env.VITE_FIRECRAWL_API_KEY || '',
    enabled: !!process.env.VITE_FIRECRAWL_API_KEY,
    rateLimitMs: 2000 // More conservative in production
  },
  supabase: {
    url: process.env.VITE_SUPABASE_URL || '',
    anonKey: process.env.VITE_SUPABASE_ANON_KEY || '',
    enabled: !!(process.env.VITE_SUPABASE_URL && process.env.VITE_SUPABASE_ANON_KEY),
    realtimeEnabled: true
  },
  imageGeneration: {
    provider: 'openai',
    apiKey: process.env.VITE_OPENAI_API_KEY || '',
    enabled: !!process.env.VITE_OPENAI_API_KEY,
    defaultModel: 'dall-e-3',
    maxResolution: '1792x1024'
  },
  playwright: {
    enabled: true,
    headless: true,
    timeout: 60000,
    viewportWidth: 1920,
    viewportHeight: 1080
  },
  analytics: {
    enabled: true,
    trackingId: process.env.VITE_GA_TRACKING_ID,
    privacyMode: false
  },
  performance: {
    monitoring: true,
    budgetAlert: true,
    realTimeTracking: true
  }
}

// Get current environment configuration
export const getIntegrationConfig = (): IntegrationConfig => {
  const isProduction = process.env.NODE_ENV === 'production'
  return isProduction ? productionConfig : developmentConfig
}

// Validate configuration
export const validateConfig = (config: IntegrationConfig): { valid: boolean; errors: string[] } => {
  const errors: string[] = []
  
  // Firecrawl validation
  if (config.firecrawl.enabled && !config.firecrawl.apiKey) {
    errors.push('Firecrawl API key is required when enabled')
  }
  
  // Supabase validation
  if (config.supabase.enabled) {
    if (!config.supabase.url) {
      errors.push('Supabase URL is required when enabled')
    }
    if (!config.supabase.anonKey) {
      errors.push('Supabase anonymous key is required when enabled')
    }
  }
  
  // Image generation validation
  if (config.imageGeneration.enabled && !config.imageGeneration.apiKey) {
    errors.push('Image generation API key is required when enabled')
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

// Feature flags for conditional functionality
export const featureFlags = {
  // Advanced integrations
  enableFirecrawl: getIntegrationConfig().firecrawl.enabled,
  enableSupabase: getIntegrationConfig().supabase.enabled,
  enableImageGeneration: getIntegrationConfig().imageGeneration.enabled,
  enablePlaywright: getIntegrationConfig().playwright.enabled,
  
  // Performance features
  enableWebVitalsTracking: getIntegrationConfig().performance.monitoring,
  enableRealTimeMetrics: getIntegrationConfig().performance.realTimeTracking,
  enablePerformanceBudgets: getIntegrationConfig().performance.budgetAlert,
  
  // UI enhancements
  enableAdvancedParticles: true, // Always enabled for visual impact
  enableHolographicEffects: true,
  enableRiveAnimations: true,
  enableGSAPAnimations: true,
  
  // Experimental features
  enableAIImageGeneration: getIntegrationConfig().imageGeneration.enabled,
  enableCompetitorIntelligence: getIntegrationConfig().firecrawl.enabled,
  enableAutomatedScreenshots: getIntegrationConfig().playwright.enabled,
  
  // Compliance and analytics
  enableUserTracking: getIntegrationConfig().analytics.enabled,
  enablePrivacyMode: getIntegrationConfig().analytics.privacyMode,
  enableRealTimeUpdates: getIntegrationConfig().supabase.realtimeEnabled
}

// Integration status checker
export const checkIntegrationHealth = async () => {
  const config = getIntegrationConfig()
  const health = {
    timestamp: new Date().toISOString(),
    services: {
      firecrawl: { status: 'unknown', enabled: config.firecrawl.enabled },
      supabase: { status: 'unknown', enabled: config.supabase.enabled },
      imageGeneration: { status: 'unknown', enabled: config.imageGeneration.enabled },
      playwright: { status: 'unknown', enabled: config.playwright.enabled }
    },
    overall: 'unknown' as 'healthy' | 'degraded' | 'unhealthy' | 'unknown'
  }
  
  let healthyServices = 0
  let totalEnabledServices = 0
  
  // Check each enabled service
  Object.entries(health.services).forEach(([serviceName, service]) => {
    if (service.enabled) {
      totalEnabledServices++
      // In a real implementation, you would make actual health check calls
      service.status = 'healthy' // Placeholder - would be actual health check
      if (service.status === 'healthy') {
        healthyServices++
      }
    } else {
      service.status = 'disabled'
    }
  })
  
  // Determine overall health
  if (totalEnabledServices === 0) {
    health.overall = 'unknown'
  } else if (healthyServices === totalEnabledServices) {
    health.overall = 'healthy'
  } else if (healthyServices > 0) {
    health.overall = 'degraded'
  } else {
    health.overall = 'unhealthy'
  }
  
  return health
}

// Export default configuration
export default getIntegrationConfig()