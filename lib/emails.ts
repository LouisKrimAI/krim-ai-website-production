/**
 * Demo-booking emails — server-only. Each builder returns { subject, html, text }.
 *
 * Design: light, deliverable-friendly (table layout, inline styles, bulletproof
 * CTA) with the Krim mint accent — robust across Outlook/Gmail/Apple Mail.
 * Voice: confident and concrete (docs/POSITIONING.md). No invented claims.
 *
 * Drip cadence is enforced by app/api/cron/drip; this file only renders.
 */

import type { DemoLead } from './supabase-admin'

// --- brand (mirrors docs/design-tokens.md; inlined because email CSS can't use vars)
const INK = '#09090C'
const INK_2 = '#44474F'
const INK_3 = '#6B6F78'
const MINT = '#00FFB2'
const MINT_DEEP = '#0A6B4E'
const ON_MINT = '#04130D'
const PAGE = '#F2F3F1'
const CARD = '#FFFFFF'
const HAIR = '#E4E6E2'

function siteUrl(): string {
  return (process.env.SITE_URL || 'https://krim.ai').replace(/\/$/, '')
}

export function calendlyUrl(): string {
  return process.env.NEXT_PUBLIC_CALENDLY_URL || `${siteUrl()}/contact`
}

function unsubscribeUrl(token: string): string {
  return `${siteUrl()}/api/unsubscribe?token=${encodeURIComponent(token)}`
}

function firstName(lead: Pick<DemoLead, 'name'>): string {
  const n = (lead.name || '').trim().split(/\s+/)[0]
  return n || 'there'
}

function button(href: string, label: string): string {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0;">
    <tr><td align="center" bgcolor="${MINT}" style="border-radius:6px;">
      <a href="${href}" target="_blank"
         style="display:inline-block;padding:14px 30px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;font-weight:600;line-height:1;color:${ON_MINT};text-decoration:none;border-radius:6px;">
        ${label}&nbsp;&rarr;
      </a>
    </td></tr>
  </table>`
}

/** Shared shell. `preheader` is the inbox-preview snippet (hidden in body). */
function wrap(preheader: string, inner: string, opts: { unsubscribeToken?: string } = {}): string {
  const unsub = opts.unsubscribeToken
    ? `<a href="${unsubscribeUrl(opts.unsubscribeToken)}" style="color:${INK_3};text-decoration:underline;">unsubscribe</a> from these reminders.`
    : ''
  return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>Krim</title>
</head>
<body style="margin:0;padding:0;background:${PAGE};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${PAGE};">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;margin:0 auto;">
      <tr><td style="padding:0 4px 18px;">
        <span style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:18px;font-weight:700;letter-spacing:0.04em;color:${INK};">Krim</span>
      </td></tr>
      <tr><td style="background:${CARD};border:1px solid ${HAIR};border-radius:12px;padding:36px 34px;">
        ${inner}
      </td></tr>
      <tr><td style="padding:22px 8px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;line-height:1.6;color:${INK_3};">
        Krim — the operating system for banking that acts only after it has proved it should.<br>
        ${unsub}
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`
}

const H = (t: string) =>
  `<h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.25;font-weight:600;color:${INK};">${t}</h1>`
const P = (t: string) =>
  `<p style="margin:0 0 16px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:1.65;color:${INK_2};">${t}</p>`

// ---------------------------------------------------------------- 1 · confirmation

export function confirmationEmail(lead: DemoLead) {
  const name = firstName(lead)
  const cal = calendlyUrl()
  const subject = 'Your Krim demo — pick a time'
  const html = wrap(
    'Pick a time that suits you and we’ll come prepared.',
    [
      H('Thanks for reaching out.'),
      P(`Hi ${name} — we’ve got your details${lead.organisation ? ` for <strong>${esc(lead.organisation)}</strong>` : ''} and a team member will reply within one business day.`),
      P('The fastest way forward is to grab a time now. Pick whatever suits you and we’ll come prepared to show KrimOS running on a problem like yours.'),
      button(cal, 'Pick a time'),
      lead.automate
        ? P(`You mentioned you’re looking to automate <strong>${esc(lead.automate)}</strong> — we’ll tailor the walkthrough to exactly that.`)
        : P('We’ll tailor the walkthrough to where you are today and what you’re trying to move.'),
      P(`Prefer email? Just reply here, or reach us at <a href="mailto:sales@krim.ai" style="color:${MINT_DEEP};">sales@krim.ai</a>.`),
    ].join(''),
    { unsubscribeToken: lead.unsubscribe_token },
  )
  const text = [
    `Hi ${name} — thanks for reaching out to Krim.`,
    ``,
    `We’ve got your details and a team member will reply within one business day.`,
    `The fastest way forward is to pick a time now:`,
    cal,
    ``,
    lead.automate ? `You mentioned automating "${lead.automate}" — we’ll tailor the walkthrough to that.` : `We’ll tailor the walkthrough to where you are today.`,
    ``,
    `Prefer email? Reply here or write to sales@krim.ai.`,
    ``,
    `Unsubscribe from reminders: ${unsubscribeUrl(lead.unsubscribe_token)}`,
  ].join('\n')
  return { subject, html, text }
}

// ---------------------------------------------------------------- 2 · nudge (+2 days)

export function nudgeEmail1(lead: DemoLead) {
  const name = firstName(lead)
  const cal = calendlyUrl()
  const subject = 'Still want to see KrimOS run?'
  const html = wrap(
    'A 30-minute walkthrough, tailored to your operation.',
    [
      H('Want to grab 30 minutes?'),
      P(`Hi ${name} — circling back on your demo request. The walkthrough is short and concrete: we point KrimOS at a real workflow and show you how every AI action is validated <em>before</em> it happens — the proof an auditor can read after.`),
      button(cal, 'Pick a time'),
      P('If now isn’t the moment, no problem — reply and tell us roughly when, and we’ll reach back out then.'),
    ].join(''),
    { unsubscribeToken: lead.unsubscribe_token },
  )
  const text = [
    `Hi ${name} — circling back on your Krim demo request.`,
    ``,
    `The walkthrough is short and concrete: we point KrimOS at a real workflow and show how every AI action is validated before it happens.`,
    ``,
    `Pick a time: ${cal}`,
    ``,
    `Not the right moment? Reply and tell us when, and we’ll reach back out.`,
    ``,
    `Unsubscribe: ${unsubscribeUrl(lead.unsubscribe_token)}`,
  ].join('\n')
  return { subject, html, text }
}

// ---------------------------------------------------------------- 3 · nudge (+5 days, last)

export function nudgeEmail2(lead: DemoLead) {
  const name = firstName(lead)
  const cal = calendlyUrl()
  const subject = 'Last nudge — your Krim demo'
  const html = wrap(
    'We’ll leave it here unless you’d like to talk.',
    [
      H('One last note.'),
      P(`Hi ${name} — we won’t keep filling your inbox. If seeing KrimOS run on your operation is still useful, the door’s open and a slot takes a minute to book.`),
      button(cal, 'Book a demo'),
      P(`If the timing’s just off, keep us in mind — reach out any time at <a href="mailto:sales@krim.ai" style="color:${MINT_DEEP};">sales@krim.ai</a>. Thanks for the interest in Krim.`),
    ].join(''),
    { unsubscribeToken: lead.unsubscribe_token },
  )
  const text = [
    `Hi ${name} — last note, we won’t keep filling your inbox.`,
    ``,
    `If seeing KrimOS run on your operation is still useful, a slot takes a minute to book:`,
    cal,
    ``,
    `If the timing’s off, reach us any time at sales@krim.ai. Thanks for the interest in Krim.`,
    ``,
    `Unsubscribe: ${unsubscribeUrl(lead.unsubscribe_token)}`,
  ].join('\n')
  return { subject, html, text }
}

// ---------------------------------------------------------------- 4 · sales notification (internal)

export function salesNotificationEmail(lead: DemoLead) {
  const subject = `New demo request — ${lead.organisation || lead.email}`
  const rows: Array<[string, string | null]> = [
    ['Name', lead.name],
    ['Email', lead.email],
    ['Organisation', lead.organisation],
    ['Role', lead.role],
    ['Market', lead.market],
    ['Wants to automate', lead.automate],
    ['Message', lead.message],
  ]
  const tableRows = rows
    .filter(([, v]) => v && v.trim())
    .map(
      ([k, v]) =>
        `<tr>
          <td style="padding:8px 14px 8px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:${INK_3};white-space:nowrap;vertical-align:top;">${k}</td>
          <td style="padding:8px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:${INK};">${esc(v as string).replace(/\n/g, '<br>')}</td>
        </tr>`,
    )
    .join('')
  const html = wrap(
    `New lead: ${lead.organisation || lead.email}`,
    [
      H('New demo request'),
      `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-top:1px solid ${HAIR};margin-top:4px;">${tableRows}</table>`,
      `<p style="margin:20px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;color:${INK_3};">Captured in Supabase · drip sequence started. Reply directly to <a href="mailto:${esc(lead.email)}" style="color:${MINT_DEEP};">${esc(lead.email)}</a>.</p>`,
    ].join(''),
  )
  const text = rows
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')
  return { subject, html, text: `New demo request\n\n${text}` }
}

// ---------------------------------------------------------------- util

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
