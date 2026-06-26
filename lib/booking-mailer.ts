/**
 * Booking mailer — the one place a drip email is sent. Server-only.
 *
 * Every send: tags the message with lead_id + template (so the Resend webhook can
 * map an open/click/bounce back to the lead), attaches RFC-8058 List-Unsubscribe
 * headers (one-click, POST — safe from link prefetchers), and logs an
 * `email_sent` activity row. Returns the Resend email id, or null on failure.
 */

import type { SupabaseClient } from '@supabase/supabase-js'
import { getResend, emailFrom } from './resend'
import { buildDripEmail, type DripTemplate } from './emails'
import { siteUrl, salesInbox } from './booking-config'
import { recordActivity } from './leads'
import type { DemoLead } from './supabase-admin'

function unsubHeaders(token: string) {
  const url = `${siteUrl()}/api/unsubscribe?token=${encodeURIComponent(token)}`
  return {
    'List-Unsubscribe': `<mailto:${salesInbox()}?subject=unsubscribe>, <${url}>`,
    'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
  }
}

/**
 * Send one drip email to a lead and log it. `supabase` is used for activity
 * logging; pass it so the dashboard timeline stays complete.
 */
export async function sendDripEmail(
  supabase: SupabaseClient,
  lead: DemoLead,
  template: DripTemplate,
): Promise<string | null> {
  const resend = getResend()
  if (!resend) {
    console.warn('[mailer] RESEND_API_KEY unset — skipping send.')
    return null
  }

  const mail = buildDripEmail(template, lead)
  try {
    const res = await resend.emails.send({
      from: emailFrom(),
      to: lead.email,
      replyTo: salesInbox(),
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
      headers: unsubHeaders(lead.unsubscribe_token),
      tags: [
        { name: 'lead_id', value: lead.id },
        { name: 'template', value: template },
      ],
    })
    if (res.error) {
      console.error(`[mailer] ${template} failed for ${lead.id}:`, res.error)
      return null
    }
    const id = res.data?.id ?? null
    await recordActivity(supabase, {
      lead_id: lead.id,
      kind: 'email_sent',
      detail: template,
      resend_email_id: id,
    })
    return id
  } catch (e) {
    console.error(`[mailer] ${template} threw for ${lead.id}:`, e)
    return null
  }
}
