/**
 * /api/unsubscribe — drip opt-out.
 *
 * POST does the actual opt-out (status='unsubscribed'). It serves two callers:
 *   • the email client's native one-click button (RFC 8058 List-Unsubscribe-Post)
 *   • the "Confirm" button on /unsubscribe
 * Using POST (not a bare GET link) means security scanners and Apple/Outlook link
 * prefetch can't accidentally unsubscribe people.
 *
 * GET just redirects to the human confirmation page.
 */

import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { siteUrl } from '@/lib/booking-config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function unsubscribe(token: string | undefined | null): Promise<boolean> {
  if (!token) return false
  const supabase = getSupabaseAdmin()
  if (!supabase) return false
  const { error } = await supabase
    .from('demo_leads')
    .update({ status: 'unsubscribed' })
    .eq('unsubscribe_token', token.trim())
    .neq('status', 'booked') // don't undo a confirmed booking
  if (error) console.error('[unsubscribe] update failed:', error.message)
  return !error
}

export async function POST(req: Request) {
  const token = new URL(req.url).searchParams.get('token')
  await unsubscribe(token)
  // One-click (RFC 8058) expects a 200; the confirm page reads the JSON.
  return NextResponse.json({ ok: true })
}

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get('token') || ''
  return NextResponse.redirect(
    `${siteUrl()}/unsubscribe?token=${encodeURIComponent(token)}`,
    { status: 302 },
  )
}
