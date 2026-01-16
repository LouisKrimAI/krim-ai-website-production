/**
 * UNIVERSAL ENVIRONMENT CONFIGURATION
 * Works across all deployment providers: Vercel, Netlify, Railway, CloudFlare, etc.
 */

export interface Environment {
  SUPABASE_URL: string
  SUPABASE_ANON_KEY: string
  SUPABASE_SERVICE_ROLE_KEY?: string
  NODE_ENV: string
  DEPLOYMENT_PROVIDER: string
  BUILD_TIME: string
}

/**
 * Detects the deployment provider based on environment variables
 */
export function detectDeploymentProvider(): string {
  // Check for various deployment provider indicators
  if (typeof window !== 'undefined') {
    // Client-side detection
    const hostname = window.location.hostname

    if (hostname.includes('vercel.app') || hostname.includes('vercel.com')) return 'vercel'
    if (hostname.includes('netlify.app') || hostname.includes('netlify.com')) return 'netlify'
    if (hostname.includes('railway.app')) return 'railway'
    if (hostname.includes('pages.dev')) return 'cloudflare-pages'
    if (hostname.includes('github.io')) return 'github-pages'
    if (hostname.includes('surge.sh')) return 'surge'
    if (hostname.includes('herokuapp.com')) return 'heroku'
    if (hostname.includes('digitaloceanspaces.com')) return 'digitalocean'

    if (hostname === 'localhost' || hostname.startsWith('127.0.0.1')) return 'local'

    return 'unknown'
  }

  // Server-side detection via environment variables
  if (process.env.VERCEL) return 'vercel'
  if (process.env.NETLIFY) return 'netlify'
  if (process.env.RAILWAY_ENVIRONMENT) return 'railway'
  if (process.env.CF_PAGES) return 'cloudflare-pages'
  if (process.env.GITHUB_ACTIONS) return 'github-pages'
  if (process.env.SURGE_LOGIN) return 'surge'
  if (process.env.HEROKU_APP_NAME) return 'heroku'
  if (process.env.DIGITALOCEAN_TOKEN) return 'digitalocean'

  return 'unknown'
}

/**
 * Universal environment variable getter
 * Works in both browser and Node.js environments
 */
function getEnvVar(key: string): string | undefined {
  // Try browser environment (Vite injects these at build time)
  if (typeof window !== 'undefined' && (import.meta as any)?.env) {
    const value = (import.meta as any).env[key]
    if (value) return value
  }

  // Try Node.js environment
  if (typeof process !== 'undefined' && process.env) {
    const value = process.env[key]
    if (value) return value
  }

  // Try global environment (some bundlers inject here)
  if (typeof globalThis !== 'undefined' && (globalThis as any).__ENV__) {
    const value = (globalThis as any).__ENV__[key]
    if (value) return value
  }

  return undefined
}

/**
 * Validates that all required environment variables are present
 */
export function validateEnvironment(): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = []
  const warnings: string[] = []

  const requiredVars = {
    VITE_SUPABASE_URL: 'Supabase project URL',
    VITE_SUPABASE_ANON_KEY: 'Supabase anonymous key'
  }

  const optionalVars = {
    SUPABASE_SERVICE_ROLE_KEY: 'Supabase service role key (for server-side operations)',
    VITE_GA_TRACKING_ID: 'Google Analytics tracking ID',
    SLACK_WEBHOOK_URL: 'Slack notification webhook'
  }

  // Check required variables
  for (const [key, description] of Object.entries(requiredVars)) {
    const value = getEnvVar(key)
    if (!value || value.includes('placeholder') || value.includes('your_')) {
      errors.push(`Missing required environment variable: ${key} (${description})`)
    }
  }

  // Check optional variables
  for (const [key, description] of Object.entries(optionalVars)) {
    const value = getEnvVar(key)
    if (!value || value.includes('placeholder') || value.includes('your_')) {
      warnings.push(`Optional environment variable not configured: ${key} (${description})`)
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

/**
 * Gets all environment variables with proper fallbacks
 */
export function getEnvironment(): Environment {
  const provider = detectDeploymentProvider()

  return {
    SUPABASE_URL: getEnvVar('VITE_SUPABASE_URL') || 'https://placeholder.supabase.co',
    SUPABASE_ANON_KEY: getEnvVar('VITE_SUPABASE_ANON_KEY') || 'placeholder-key',
    SUPABASE_SERVICE_ROLE_KEY: getEnvVar('SUPABASE_SERVICE_ROLE_KEY'),
    NODE_ENV: getEnvVar('NODE_ENV') || 'development',
    DEPLOYMENT_PROVIDER: provider,
    BUILD_TIME: getEnvVar('VITE_BUILD_TIME') || new Date().toISOString()
  }
}

/**
 * Checks if we're running in production
 */
export function isProduction(): boolean {
  const env = getEnvironment()
  return env.NODE_ENV === 'production' ||
         env.DEPLOYMENT_PROVIDER !== 'local' &&
         env.DEPLOYMENT_PROVIDER !== 'unknown'
}

/**
 * Checks if we're running locally
 */
export function isDevelopment(): boolean {
  const env = getEnvironment()
  return env.NODE_ENV === 'development' || env.DEPLOYMENT_PROVIDER === 'local'
}

/**
 * Gets provider-specific configuration
 */
export function getProviderConfig() {
  const provider = detectDeploymentProvider()

  const configs = {
    vercel: {
      supportsServerlessFunctions: true,
      envVarPrefix: '',
      buildCommand: 'npm run build',
      staticDir: 'dist'
    },
    netlify: {
      supportsServerlessFunctions: true,
      envVarPrefix: '',
      buildCommand: 'npm run build',
      staticDir: 'dist'
    },
    railway: {
      supportsServerlessFunctions: false,
      envVarPrefix: '',
      buildCommand: 'npm run build',
      staticDir: 'dist'
    },
    'cloudflare-pages': {
      supportsServerlessFunctions: true,
      envVarPrefix: '',
      buildCommand: 'npm run build',
      staticDir: 'dist'
    },
    'github-pages': {
      supportsServerlessFunctions: false,
      envVarPrefix: '',
      buildCommand: 'npm run build',
      staticDir: 'dist'
    },
    local: {
      supportsServerlessFunctions: true,
      envVarPrefix: '',
      buildCommand: 'npm run dev',
      staticDir: 'dist'
    },
    unknown: {
      supportsServerlessFunctions: false,
      envVarPrefix: '',
      buildCommand: 'npm run build',
      staticDir: 'dist'
    }
  }

  return configs[provider as keyof typeof configs] || configs.unknown
}

/**
 * Logs environment information for debugging
 */
export function logEnvironmentInfo() {
  if (import.meta.env.DEV) {
    const env = getEnvironment()
    const validation = validateEnvironment()

    console.group('🌍 Environment Configuration')
    console.log('Provider:', env.DEPLOYMENT_PROVIDER)
    console.log('Environment:', env.NODE_ENV)
    console.log('Build Time:', env.BUILD_TIME)
    console.log('Supabase URL:', env.SUPABASE_URL.replace(/.*\/\/([^.]+).*/, '$1.supabase.co'))
    console.log('Supabase Key:', env.SUPABASE_ANON_KEY ? '✅ Configured' : '❌ Missing')

    if (validation.errors.length > 0) {
      console.error('❌ Configuration Errors:', validation.errors)
    }

    if (validation.warnings.length > 0) {
      console.warn('⚠️ Configuration Warnings:', validation.warnings)
    }

    if (validation.isValid) {
      console.log('✅ Environment is properly configured')
    }

    console.groupEnd()
  }
}

/**
 * Runtime environment validation with helpful error messages
 */
export function assertEnvironmentValid(): void {
  const validation = validateEnvironment()

  if (!validation.isValid) {
    const errorMessage = [
      '❌ Environment Configuration Error',
      '',
      'The following required environment variables are missing or invalid:',
      ...validation.errors.map(error => `  • ${error}`),
      '',
      'To fix this:',
      '1. Copy .env.example to .env',
      '2. Fill in your actual Supabase credentials',
      '3. Restart your development server',
      '',
      'For production deployments, ensure these variables are set in your deployment provider.',
      ''
    ].join('\n')

    console.error(errorMessage)

    if (isProduction()) {
      // In production, we might want to show a user-friendly error
      throw new Error('Application configuration error. Please contact support.')
    } else {
      // In development, show the detailed error
      throw new Error(errorMessage)
    }
  }

  // Log warnings but don't fail
  if (validation.warnings.length > 0) {
    console.warn('⚠️ Environment warnings:', validation.warnings)
  }
}

// Export commonly used environment variables
export const ENV = getEnvironment()
export const IS_PRODUCTION = isProduction()
export const IS_DEVELOPMENT = isDevelopment()
export const PROVIDER_CONFIG = getProviderConfig()