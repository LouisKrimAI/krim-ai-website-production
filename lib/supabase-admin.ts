/**
 * Server-only Supabase client (service-role). Never import from a client component.
 *
 * Lazy + graceful: returns null when SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are
 * unset, so local dev and previews without secrets don't crash — callers decide
 * how to degrade (see app/api/demo/route.ts). The service-role key bypasses RLS,
 * which is why this must stay on the server.
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let cached: SupabaseClient | null | undefined

export function getSupabaseAdmin(): SupabaseClient | null {
  if (cached !== undefined) return cached

  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    cached = null
    return cached
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return cached
}

/** The lead row we read/write. Mirrors supabase/schema.sql. */
export type DemoLead = {
  id: string
  created_at: string
  name: string | null
  email: string
  organisation: string | null
  role: string | null
  market: string | null
  automate: string | null
  message: string | null
  status: 'new' | 'booked' | 'unsubscribed'
  booked_at: string | null
  drip_stage: number
  last_emailed_at: string | null
  calendly_event_uri: string | null
  source: string | null
  unsubscribe_token: string
}
