/**
 * POST /api/admin/lead — dashboard actions (behind Basic auth via middleware).
 * Body: { id, action: 'book'|'unsubscribe'|'reactivate'|'note', value? }.
 * Manual 'book' is the $0 path when the Calendly webhook isn't wired.
 */

import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { recordActivity } from '@/lib/leads'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return NextResponse.json({ error: 'Not configured.' }, { status: 503 })

  let body: { id?: string; action?: string; value?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
  const { id, action } = body
  if (!id || !action) return NextResponse.json({ error: 'Missing id/action.' }, { status: 400 })

  let patch: Record<string, unknown> | null = null
  switch (action) {
    case 'book':
      patch = { status: 'booked', booked_at: new Date().toISOString() }
      break
    case 'unsubscribe':
      patch = { status: 'unsubscribed' }
      break
    case 'reactivate':
      patch = { status: 'new' }
      break
    case 'note':
      patch = { notes: (body.value ?? '').slice(0, 4000) || null }
      break
    default:
      return NextResponse.json({ error: 'Unknown action.' }, { status: 400 })
  }

  const { error } = await supabase.from('demo_leads').update(patch).eq('id', id)
  if (error) {
    console.error('[admin] update failed:', error.message)
    return NextResponse.json({ error: 'Update failed.' }, { status: 500 })
  }

  if (action === 'book') await recordActivity(supabase, { lead_id: id, kind: 'booked', detail: 'manual' })
  if (action === 'note' && body.value)
    await recordActivity(supabase, { lead_id: id, kind: 'note', detail: body.value.slice(0, 200) })

  return NextResponse.json({ ok: true })
}
