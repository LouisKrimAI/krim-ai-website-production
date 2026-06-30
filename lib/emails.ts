/**
 * Demo-booking emails — server-only. Each builder returns { subject, html, text }.
 *
 * Design: light, deliverable-friendly (table layout, inline styles, bulletproof
 * CTA) with the Krim mint accent — robust across Outlook/Gmail/Apple Mail.
 * Voice: confident and concrete (docs/POSITIONING.md), one CTA each, signed by a
 * named person. No invented claims.
 *
 * Click tracking is handled by Resend (it wraps links). The resource link points
 * at our own /api/download route so a download is logged even if Resend doesn't
 * wrap it. Cadence lives in lib/booking-config.ts; this file only renders.
 */

import type { DemoLead } from './supabase-admin'
import {
  sender,
  siteUrl,
  calendlyUrl,
  RESOURCES,
  FEATURED_RESOURCE_KEY,
  DECK_RESOURCE_KEY,
  TAGLINE,
} from './booking-config'

// brand (mirrors docs/design-tokens.md; inlined because email CSS can't use vars)
const INK = '#09090C'
const INK_2 = '#44474F'
const INK_3 = '#6B6F78'
const MINT = '#00FFB2'
const MINT_DEEP = '#0A6B4E'
const ON_MINT = '#04130D'
const PAGE = '#F2F3F1'
const CARD = '#FFFFFF'
const HAIR = '#E4E6E2'

export type BuiltEmail = { subject: string; html: string; text: string }
export type DripTemplate = 'confirmation' | 'valueNudge' | 'resource' | 'breakup'

function unsubscribeUrl(token: string): string {
  return `${siteUrl()}/unsubscribe?token=${encodeURIComponent(token)}`
}

function downloadUrl(token: string, key: string): string {
  return `${siteUrl()}/api/download?token=${encodeURIComponent(token)}&doc=${encodeURIComponent(key)}`
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

function signoff(): string {
  return `<p style="margin:22px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:1.6;color:${INK_2};">
    Best,<br>${esc(sender.name)} - ${esc(sender.title)}
  </p>`
}

const SIGNOFF_TEXT = `Best,\n${sender.name} - ${sender.title}`

/** Shared shell. `preheader` is the inbox-preview snippet (hidden in body). */
function wrap(preheader: string, inner: string, unsubscribeToken?: string): string {
  const unsub = unsubscribeToken
    ? `<a href="${unsubscribeUrl(unsubscribeToken)}" style="color:${INK_3};text-decoration:underline;">Unsubscribe</a> from these reminders.`
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
        Krim — ${TAGLINE}<br>
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

// ── 1 · confirmation (T0) ─────────────────────────────────────────────────────
export function confirmationEmail(lead: DemoLead): BuiltEmail {
  const name = firstName(lead)
  const cal = calendlyUrl()
  const collab = lead.organisation
    ? `between Krim and <strong>${esc(lead.organisation)}</strong>`
    : 'with Krim'
  const focus = lead.automate
    ? `, with particular focus on your requirements in <strong>${esc(lead.automate)}</strong>`
    : ''
  const subject = 'Your Krim demo — The OS for safe agentic banking'
  const html = wrap(
    "Pick a time and we'll come prepared for your demo.",
    [
      H('Thanks for reaching out.'),
      P(`Hi ${name} — Pleased to see your interest in exploring a collaboration ${collab}.`),
      P(`Pick a time for your demo session, where we'll showcase how KrimOS can transform your operations and outcomes${focus}.`),
      button(cal, 'Pick a time'),
      P('Prefer email? Just reply — it comes straight to me.'),
      signoff(),
    ].join(''),
    lead.unsubscribe_token,
  )
  const focusText = lead.automate
    ? `, with particular focus on your requirements in ${lead.automate}`
    : ''
  const text = [
    `Hi ${name} — Pleased to see your interest in exploring a collaboration ${lead.organisation ? `between Krim and ${lead.organisation}` : 'with Krim'}.`,
    ``,
    `Pick a time for your demo session, where we'll showcase how KrimOS can transform your operations and outcomes${focusText}.`,
    ``,
    cal,
    ``,
    `Prefer email? Just reply — it comes straight to me.`,
    ``,
    SIGNOFF_TEXT,
    `Unsubscribe: ${unsubscribeUrl(lead.unsubscribe_token)}`,
  ].join('\n')
  return { subject, html, text }
}

// ── 2 · the deck (+2 days) ────────────────────────────────────────────────────
export function valueNudgeEmail(lead: DemoLead): BuiltEmail {
  const name = firstName(lead)
  const cal = calendlyUrl()
  const deckLink = downloadUrl(lead.unsubscribe_token, DECK_RESOURCE_KEY)
  const focusSuffix = lead.automate
    ? ` We've included how that applies to <strong>${esc(lead.automate)}</strong>.`
    : ''
  const subject = 'The Krim deck'
  const html = wrap(
    'Five arguments. Short and direct.',
    [
      H('Five arguments.'),
      P(`Hi ${name} — We distilled how we think about safe AI in banking into five arguments. The deck is short and direct.${focusSuffix}`),
      button(deckLink, 'Download the deck'),
      P(`If you'd like to talk through any of it live, just <a href="${cal}" style="color:${MINT_DEEP};font-weight:600;">pick a time →</a>`),
      signoff(),
    ].join(''),
    lead.unsubscribe_token,
  )
  const focusText = lead.automate ? ` We've included how that applies to ${lead.automate}.` : ''
  const text = [
    `Hi ${name} — We distilled how we think about safe AI in banking into five arguments. The deck is short and direct.${focusText}`,
    deckLink,
    ``,
    `If you'd like to talk through any of it live, just pick a time: ${cal}`,
    ``,
    SIGNOFF_TEXT,
    `Unsubscribe: ${unsubscribeUrl(lead.unsubscribe_token)}`,
  ].join('\n')
  return { subject, html, text }
}

// ── 3 · resource (+6 days) ────────────────────────────────────────────────────
export function resourceEmail(lead: DemoLead): BuiltEmail {
  const name = firstName(lead)
  const cal = calendlyUrl()
  const res = RESOURCES[FEATURED_RESOURCE_KEY]
  const link = downloadUrl(lead.unsubscribe_token, FEATURED_RESOURCE_KEY)
  const subject = 'The thinking behind Krim'
  const html = wrap(
    'The clearest account of how we make AI safe enough to act.',
    [
      H('The thinking behind Krim.'),
      P(`Hi ${name} — No rush on the demo. If you'd like the deeper context, this is the clearest account we've written of how we make AI safe enough to act inside a regulated bank:`),
      button(link, `Read: ${esc(res?.title || 'the overview')}`),
      P(`And whenever it suits, I'd be glad to walk you through it live — <a href="${cal}" style="color:${MINT_DEEP};font-weight:600;">pick a time →</a>`),
      signoff(),
    ].join(''),
    lead.unsubscribe_token,
  )
  const text = [
    `Hi ${name} — No rush on the demo. If you'd like the deeper context, this is the clearest account we've written of how we make AI safe enough to act inside a regulated bank:`,
    link,
    ``,
    `And whenever it suits, I'd be glad to walk you through it live — pick a time: ${cal}`,
    ``,
    SIGNOFF_TEXT,
    `Unsubscribe: ${unsubscribeUrl(lead.unsubscribe_token)}`,
  ].join('\n')
  return { subject, html, text }
}

// ── 4 · breakup (+12 days) ────────────────────────────────────────────────────
export function breakupEmail(lead: DemoLead): BuiltEmail {
  const name = firstName(lead)
  const cal = calendlyUrl()
  const subject = 'Should I close your file?'
  const html = wrap(
    "Last note — I won't crowd your inbox further.",
    [
      H('Should I close your file?'),
      P(`Hi ${name} — I've reached out a few times regarding a Krim demo, and I don't want to crowd your inbox.`),
      P("If the timing isn't right, that's no problem at all — I'll leave it here, and you're welcome back any time. Should it still be of interest:"),
      button(cal, 'Book a demo'),
      P('Either way, thank you for your interest in Krim.'),
      signoff(),
    ].join(''),
    lead.unsubscribe_token,
  )
  const text = [
    `Hi ${name} — I've reached out a few times regarding a Krim demo, and I don't want to crowd your inbox.`,
    ``,
    `If the timing isn't right, that's no problem at all — I'll leave it here, and you're welcome back any time. Should it still be of interest:`,
    cal,
    ``,
    `Either way, thank you for your interest in Krim.`,
    ``,
    SIGNOFF_TEXT,
    `Unsubscribe: ${unsubscribeUrl(lead.unsubscribe_token)}`,
  ].join('\n')
  return { subject, html, text }
}

// ── dispatcher (used by the cron) ─────────────────────────────────────────────
const BUILDERS: Record<DripTemplate, (lead: DemoLead) => BuiltEmail> = {
  confirmation: confirmationEmail,
  valueNudge: valueNudgeEmail,
  resource: resourceEmail,
  breakup: breakupEmail,
}

export function buildDripEmail(template: DripTemplate, lead: DemoLead): BuiltEmail {
  return BUILDERS[template](lead)
}

// ── sales notification (internal) ─────────────────────────────────────────────
export function salesNotificationEmail(lead: DemoLead): BuiltEmail {
  const subject = `New demo request — ${lead.organisation || lead.email}`
  const rows: Array<[string, string | null]> = [
    ['Name', lead.name],
    ['Email', lead.email],
    ['Organisation', lead.organisation],
    ['Role', lead.role],
    ['Sector', lead.sector],
    ['Region / market', lead.market],
    ['Primary use case', lead.automate],
    ['Timeline', lead.timeline],
    ['Phone', lead.phone],
    ['AI maturity', lead.ai_stage],
    ['How did you hear', lead.heard_about],
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
      `<p style="margin:20px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;color:${INK_3};">In Supabase · drip started · <a href="${siteUrl()}/admin" style="color:${MINT_DEEP};">open dashboard</a>. Reply to <a href="mailto:${esc(lead.email)}" style="color:${MINT_DEEP};">${esc(lead.email)}</a>.</p>`,
    ].join(''),
  )
  const text = rows
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')
  return { subject, html, text: `New demo request\n\n${text}` }
}

// ── util ──────────────────────────────────────────────────────────────────────
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
