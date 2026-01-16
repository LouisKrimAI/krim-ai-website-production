/**
 * BULLETPROOF SUPABASE CONFIGURATION
 * Universal deployment support with comprehensive error handling and retry logic
 */
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { ENV, assertEnvironmentValid, logEnvironmentInfo, IS_PRODUCTION } from './environment'

// Database Types
export interface ContactFormData {
  id?: string
  created_at?: string
  first_name: string
  last_name: string
  email: string
  company: string
  title: string
  phone?: string
  industry_segment?: string
  aum?: string
  active_borrowers?: string
  ai_readiness?: string
  monthly_debt?: string
  current_system?: string
  pain_point?: string
  timeline?: string
  message?: string
  hear_about_us?: string
  source?: string
  user_agent?: string
  referrer?: string
  ip_address?: string
  status?: 'new' | 'contacted' | 'qualified' | 'closed'
}

export interface NewsletterSignup {
  id?: string
  created_at?: string
  email: string
  source?: string
  user_agent?: string
  ip_address?: string
  status?: 'active' | 'unsubscribed'
}

export interface DemoRequest {
  id?: string
  created_at?: string
  email: string
  company: string
  name: string
  title?: string
  phone?: string
  use_case?: string
  company_size?: string
  source?: string
  status?: 'new' | 'scheduled' | 'completed' | 'cancelled'
}

// Connection health tracking
interface ConnectionHealth {
  isHealthy: boolean
  lastCheck: Date
  consecutiveFailures: number
  lastError?: string
}

// Standard database operation result
interface DatabaseResult<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

// Analytics result type
interface FormAnalytics {
  date: string
  form_type: string
  submissions: number
  source?: string
}

class SupabaseManager {
  private client: SupabaseClient | null = null
  private health: ConnectionHealth = {
    isHealthy: false,
    lastCheck: new Date(),
    consecutiveFailures: 0
  }
  private initialized = false

  constructor() {
    this.initialize()
  }

  private initialize() {
    try {
      // Validate environment on startup
      if (!IS_PRODUCTION) {
        logEnvironmentInfo()
      }

      assertEnvironmentValid()

      // Create client with robust configuration
      this.client = createClient(
        ENV.SUPABASE_URL,
        ENV.SUPABASE_ANON_KEY,
        {
          auth: {
            persistSession: false, // No user authentication needed for forms
            autoRefreshToken: false,
            detectSessionInUrl: false
          },
          global: {
            headers: {
              'X-Client-Source': 'krim-ai-website',
              'X-Client-Version': '2.0.0',
              'X-Deployment-Provider': ENV.DEPLOYMENT_PROVIDER
            },
          },
          db: {
            schema: 'public',
          },
          realtime: {
            // Disable realtime for better performance
            params: {
              eventsPerSecond: 10,
            },
          },
        }
      )

      this.initialized = true
      this.performHealthCheck()

      if (import.meta.env.DEV) {
        console.log('✅ Supabase client initialized successfully')
      }

    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('❌ Failed to initialize Supabase client:', error)
      }
      this.health.isHealthy = false
      this.health.lastError = error instanceof Error ? error.message : 'Unknown error'
    }
  }

  /**
   * Performs a health check on the database connection
   */
  async performHealthCheck(): Promise<boolean> {
    if (!this.client || !this.initialized) {
      this.health.isHealthy = false
      this.health.lastError = 'Client not initialized'
      return false
    }

    try {
      // Simple query to test connection
      const { data, error } = await this.client
        .from('contact_forms')
        .select('count', { count: 'exact', head: true })

      if (error) {
        throw error
      }

      this.health.isHealthy = true
      this.health.lastCheck = new Date()
      this.health.consecutiveFailures = 0
      this.health.lastError = undefined

      if (import.meta.env.DEV) {
        console.log('💚 Supabase health check passed')
      }
      return true

    } catch (error) {
      this.health.isHealthy = false
      this.health.lastCheck = new Date()
      this.health.consecutiveFailures += 1
      this.health.lastError = error instanceof Error ? error.message : 'Health check failed'

      if (import.meta.env.DEV) {
        console.error('💔 Supabase health check failed:', this.health.lastError)
      }
      return false
    }
  }

  /**
   * Executes a database operation with retry logic and error handling
   */
  async executeWithRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delayMs: number = 1000
  ): Promise<{ success: boolean; data?: T; error?: string }> {

    if (!this.client || !this.initialized) {
      return {
        success: false,
        error: 'Database client not initialized. Please check your configuration.'
      }
    }

    let lastError: Error | unknown = null

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        if (import.meta.env.DEV) {
          console.log(`🔄 Database operation attempt ${attempt}/${maxRetries}`)
        }

        const result = await operation()

        // Reset failure count on success
        this.health.consecutiveFailures = 0
        this.health.isHealthy = true

        if (import.meta.env.DEV) {
          console.log('✅ Database operation successful')
        }
        return { success: true, data: result }

      } catch (error) {
        lastError = error
        this.health.consecutiveFailures += 1

        if (import.meta.env.DEV) {
          console.error(`❌ Database operation failed (attempt ${attempt}):`, error)
        }

        // Don't retry on certain types of errors
        if (error instanceof Error) {
          const message = error.message.toLowerCase()

          // Don't retry validation errors or auth errors
          if (message.includes('duplicate') ||
              message.includes('validation') ||
              message.includes('auth') ||
              message.includes('permission')) {
            break
          }
        }

        // Wait before retrying (exponential backoff)
        if (attempt < maxRetries) {
          const delay = delayMs * Math.pow(2, attempt - 1)
          if (import.meta.env.DEV) {
            console.log(`⏳ Retrying in ${delay}ms...`)
          }
          await new Promise(resolve => setTimeout(resolve, delay))
        }
      }
    }

    const errorMessage = lastError instanceof Error
      ? lastError.message
      : 'Database operation failed after multiple attempts'

    this.health.isHealthy = false
    this.health.lastError = errorMessage

    return {
      success: false,
      error: errorMessage
    }
  }

  /**
   * Gets the current health status
   */
  getHealth(): ConnectionHealth {
    return { ...this.health }
  }

  /**
   * Gets the Supabase client (for direct access if needed)
   */
  getClient(): SupabaseClient | null {
    return this.client
  }

  /**
   * Checks if the client is properly configured
   */
  isConfigured(): boolean {
    // Allow the invalid/reset Supabase project to still attempt connections
    // The database might be recreated with the same URL
    return this.initialized &&
           this.client !== null &&
           ENV.SUPABASE_URL !== 'https://placeholder.supabase.co' &&
           ENV.SUPABASE_ANON_KEY !== 'placeholder-key'
  }
}

// Create singleton instance
const supabaseManager = new SupabaseManager()

// Export the client for backward compatibility
export const supabase = supabaseManager.getClient()

// Export manager functions
export const isSupabaseConfigured = () => supabaseManager.isConfigured()
export const getSupabaseHealth = () => supabaseManager.getHealth()
export const performHealthCheck = () => supabaseManager.performHealthCheck()

/**
 * Database Schema Creation SQL
 * Run these commands in your Supabase SQL Editor
 */
export const DATABASE_SCHEMA = `
-- Enable Row Level Security
ALTER TABLE IF EXISTS contact_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS newsletter_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS demo_requests ENABLE ROW LEVEL SECURITY;

-- Contact Forms Table
CREATE TABLE IF NOT EXISTS contact_forms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  title TEXT NOT NULL,
  phone TEXT,
  monthly_debt TEXT,
  current_system TEXT,
  pain_point TEXT,
  timeline TEXT,
  message TEXT,
  source TEXT DEFAULT 'website',
  user_agent TEXT,
  referrer TEXT,
  ip_address TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Newsletter Signups Table
CREATE TABLE IF NOT EXISTS newsletter_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT UNIQUE NOT NULL,
  source TEXT DEFAULT 'website',
  user_agent TEXT,
  ip_address TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Demo Requests Table
CREATE TABLE IF NOT EXISTS demo_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  name TEXT NOT NULL,
  title TEXT,
  phone TEXT,
  use_case TEXT,
  company_size TEXT,
  source TEXT DEFAULT 'website',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'scheduled', 'completed', 'cancelled')),
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- RLS Policies (Allow inserts from website)
CREATE POLICY "Allow contact form submissions" ON contact_forms
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow newsletter signups" ON newsletter_signups
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow demo requests" ON demo_requests
  FOR INSERT WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_contact_forms_created_at ON contact_forms(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_forms_email ON contact_forms(email);
CREATE INDEX IF NOT EXISTS idx_contact_forms_status ON contact_forms(status);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_signups(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_created_at ON newsletter_signups(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_demo_requests_created_at ON demo_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_demo_requests_email ON demo_requests(email);
CREATE INDEX IF NOT EXISTS idx_demo_requests_status ON demo_requests(status);

-- Optional: Create a view for analytics
CREATE OR REPLACE VIEW form_analytics AS
SELECT 
  'contact' as form_type,
  COUNT(*) as total_submissions,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '24 hours') as last_24h,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days') as last_7d,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '30 days') as last_30d
FROM contact_forms
UNION ALL
SELECT 
  'newsletter' as form_type,
  COUNT(*) as total_submissions,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '24 hours') as last_24h,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days') as last_7d,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '30 days') as last_30d
FROM newsletter_signups
UNION ALL
SELECT 
  'demo' as form_type,
  COUNT(*) as total_submissions,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '24 hours') as last_24h,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days') as last_7d,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '30 days') as last_30d
FROM demo_requests;
`

/**
 * Test database connection (backward compatibility)
 */
export const testConnection = async (): Promise<boolean> => {
  return await performHealthCheck()
}

/**
 * Database service functions with bulletproof error handling
 */
export const DatabaseService = {
  // Contact Form Operations
  async submitContactForm(formData: Omit<ContactFormData, 'id' | 'created_at'>): Promise<DatabaseResult<ContactFormData>> {
    if (!supabaseManager.isConfigured()) {
      return {
        success: false,
        error: 'Database not properly configured. Please check your environment variables.'
      }
    }

    return await supabaseManager.executeWithRetry(async () => {
      const client = supabaseManager.getClient()
      if (!client) throw new Error('Database client unavailable')

      const { data, error } = await client
        .from('contact_forms')
        .insert([{
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          company: formData.company,
          title: formData.title,
          phone: formData.phone,
          industry_segment: formData.industry_segment,
          aum: formData.aum,
          active_borrowers: formData.active_borrowers,
          ai_readiness: formData.ai_readiness,
          monthly_debt: formData.monthly_debt,
          current_system: formData.current_system,
          pain_point: formData.pain_point,
          timeline: formData.timeline,
          message: formData.message,
          hear_about_us: formData.hear_about_us,
          source: formData.source || 'website',
          user_agent: formData.user_agent,
          referrer: formData.referrer,
          ip_address: formData.ip_address,
        }])
        .select()
        .single()

      if (error) throw error
      return data
    })
  },

  // Newsletter Signup Operations
  async submitNewsletter(email: string, metadata?: { source?: string; user_agent?: string; ip_address?: string }): Promise<DatabaseResult<NewsletterSignup>> {
    if (!supabaseManager.isConfigured()) {
      return {
        success: false,
        error: 'Database not properly configured. Please check your environment variables.'
      }
    }

    return await supabaseManager.executeWithRetry(async () => {
      const client = supabaseManager.getClient()
      if (!client) throw new Error('Database client unavailable')

      // Use upsert to handle duplicate emails gracefully
      const { data, error } = await client
        .from('newsletter_signups')
        .upsert([{
          email,
          source: metadata?.source || 'website',
          user_agent: metadata?.user_agent,
          ip_address: metadata?.ip_address,
        }], {
          onConflict: 'email',
          ignoreDuplicates: false
        })
        .select()
        .single()

      if (error) throw error
      return data
    })
  },

  // Demo Request Operations
  async submitDemoRequest(demoData: Omit<DemoRequest, 'id' | 'created_at'>): Promise<DatabaseResult<DemoRequest>> {
    if (!supabaseManager.isConfigured()) {
      return {
        success: false,
        error: 'Database not properly configured. Please check your environment variables.'
      }
    }

    return await supabaseManager.executeWithRetry(async () => {
      const client = supabaseManager.getClient()
      if (!client) throw new Error('Database client unavailable')

      const { data, error } = await client
        .from('demo_requests')
        .insert([{
          email: demoData.email,
          company: demoData.company,
          name: demoData.name,
          title: demoData.title,
          phone: demoData.phone,
          use_case: demoData.use_case,
          company_size: demoData.company_size,
          source: demoData.source || 'website',
        }])
        .select()
        .single()

      if (error) throw error
      return data
    })
  },

  // Analytics
  async getFormAnalytics(): Promise<FormAnalytics[]> {
    if (!supabaseManager.isConfigured()) {
      if (import.meta.env.DEV) {
        console.warn('Database not configured, returning empty analytics')
      }
      return []
    }

    const result = await supabaseManager.executeWithRetry(async () => {
      const client = supabaseManager.getClient()
      if (!client) throw new Error('Database client unavailable')

      const { data, error } = await client
        .from('form_analytics')
        .select('*')

      if (error) throw error
      return data || []
    })

    return result.success ? (result.data || []) : []
  }
}

// Utility function to get user's IP (client-side detection)
export const getUserMetadata = () => {
  const sessionStart = performance.timeOrigin || Date.now()
  const timeOnSite = Date.now() - sessionStart

  return {
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    referrer: typeof document !== 'undefined' ? document.referrer : undefined,
    // Additional qualification metrics
    viewport_size: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : undefined,
    time_on_site: Math.round(timeOnSite / 1000), // seconds
    timestamp: new Date().toISOString(),
    page_url: typeof window !== 'undefined' ? window.location.href : undefined,
    // IP will be detected server-side
  }
}