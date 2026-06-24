/**
 * GET /api/unsubscribe?token=… — one-click opt-out from the drip emails.
 * Flips the lead to status='unsubscribed' (the cron skips it) and redirects to a
 * confirmation page. Token is the per-lead unsubscribe_token, not the email, so
 * the link can't be guessed or used to enumerate addresses.
 */

import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get('token')?.trim()
  const site = (process.env.SITE_URL || new URL(req.url).origin).replace(/\/$/, '')

  if (token) {
    const supabase = getSupabaseAdmin()
    if (supabase) {
      const { error } = await supabase
        .from('demo_leads')
        .update({ status: 'unsubscribed' })
        .eq('unsubscribe_token', token)
        .neq('status', 'booked') // don't undo a confirmed booking
      if (error) console.error('[unsubscribe] update failed:', error.message)
    }
  }

  return NextResponse.redirect(`${site}/contact/unsubscribed`, { status: 302 })
}
