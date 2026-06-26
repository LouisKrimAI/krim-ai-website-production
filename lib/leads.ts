/**
 * Lead helpers — server-only. Activity logging + lookups shared by the routes.
 */

import type { SupabaseClient } from '@supabase/supabase-js'
import type { LeadActivity } from './supabase-admin'

/**
 * Append a row to lead_activity. Best-effort: a logging failure must never break
 * the user-facing action, so we swallow + console.error. The unique index on
 * (resend_email_id, kind, detail) makes replayed webhook events idempotent.
 */
export async function recordActivity(
  supabase: SupabaseClient,
  row: {
    lead_id: string
    kind: LeadActivity['kind']
    detail?: string | null
    resend_email_id?: string | null
  },
): Promise<void> {
  const { error } = await supabase.from('lead_activity').insert({
    lead_id: row.lead_id,
    kind: row.kind,
    detail: row.detail ?? null,
    resend_email_id: row.resend_email_id ?? null,
  })
  // 23505 = unique_violation → a duplicate (replayed) event; that's expected.
  if (error && error.code !== '23505') {
    console.error(`[activity] insert failed (${row.kind}):`, error.message)
  }
}
