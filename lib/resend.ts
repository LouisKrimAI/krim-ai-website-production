/**
 * Server-only Resend client. Lazy + graceful: returns null when RESEND_API_KEY
 * is unset so submissions still succeed (lead is captured) even if email is off.
 */

import { Resend } from 'resend'

let cached: Resend | null | undefined

export function getResend(): Resend | null {
  if (cached !== undefined) return cached
  const key = process.env.RESEND_API_KEY
  cached = key ? new Resend(key) : null
  return cached
}

/** Verified sender, e.g. "Krim <hello@krim.ai>". */
export function emailFrom(): string {
  return process.env.EMAIL_FROM || 'Krim <onboarding@resend.dev>'
}
