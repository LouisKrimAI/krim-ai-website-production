/**
 * Demo-booking config — the knobs you'll actually tune. Server-only.
 *
 * Sender identity, the drip cadence/stage machine, and the downloadable-resource
 * registry all live here so copy and timing changes don't mean hunting through
 * route code. Secrets stay in env; this is the non-secret shape of the program.
 */

const DAY = 24 * 60 * 60 * 1000

// ── Sender identity ───────────────────────────────────────────────────────────
// Emails sign off as a real person (named senders out-open "the Krim team").
// Override via env without a code change.
export const sender = {
  name: process.env.EMAIL_SIGNATURE_NAME || 'Louis',
  title: process.env.EMAIL_SIGNATURE_TITLE || 'Krim',
}

// One-line tagline in every email footer.
export const TAGLINE = 'The intelligence runtime for lending.'

export function siteUrl(): string {
  return (process.env.SITE_URL || 'https://www.krim.ai').replace(/\/$/, '')
}

export function calendlyUrl(): string {
  return process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/louis-oliphant-parkinson/krim-demo'
}

export function salesInbox(): string {
  return process.env.EMAIL_SALES || 'sales@krim.ai'
}

// ── Drip cadence (stage machine) ──────────────────────────────────────────────
// drip_stage on a lead: 0=none 1=confirm 2=value 3=resource 4=breakup(done).
// `gapMs` is the wait AFTER the previous send before this one fires. The daily
// cron enforces these; granularity is ±1 day, which is intentional for a
// two-week sequence. Edit timings/emails here.
export type DripStep = {
  stage: number // the drip_stage value AFTER this email sends
  template: 'confirmation' | 'valueNudge' | 'resource' | 'breakup'
  gapMs: number // wait since last_emailed_at before sending
  label: string
}

export const DRIP: DripStep[] = [
  { stage: 1, template: 'confirmation', gapMs: 0, label: 'Confirmation (immediate)' },
  { stage: 2, template: 'valueNudge', gapMs: 2 * DAY, label: 'Value nudge (+2 days)' },
  { stage: 3, template: 'resource', gapMs: 4 * DAY, label: 'Resource (+6 days)' },
  { stage: 4, template: 'breakup', gapMs: 6 * DAY, label: 'Breakup (+12 days)' },
]

export const DRIP_DONE_STAGE = 4

/** The next drip step for a lead at `currentStage`, or null if finished. */
export function nextDripStep(currentStage: number): DripStep | null {
  return DRIP.find((s) => s.stage === currentStage + 1) || null
}

// ── Downloadable resources (for the +6d email + download tracking) ─────────────
// Map a short key → a file under /public or an absolute URL. The +6d email links
// to /api/download?token=…&doc=<key>, which logs the download then redirects here.
// Leave `featured` pointing at a real asset; swap in a gated PDF when ready.
export const RESOURCES: Record<string, { url: string; title: string }> = {
  'krimos-brief': { url: '/collateral/krimos-capabilities-brief.pdf', title: 'the two-page KrimOS brief' },
  'krimos-overview-8pp': { url: '/collateral/krimos-product-overview.pdf', title: 'the KrimOS product overview' },
  'krimos-introduction': { url: '/collateral/krimos-introduction.pdf', title: 'the KrimOS introduction' },
  'krimos-roles': { url: '/collateral/krimos-roles-and-use-cases.pdf', title: 'KrimOS roles and use cases' },
  'krimos-a4-overview': { url: '/collateral/krimos-overview.pdf', title: 'the KrimOS overview (A4)' },
  'krimos-rbi-alignment': { url: '/collateral/krimos-rbi-alignment.pdf', title: 'KrimOS and the RBI draft' },
  // Legacy alias — links already sent in earlier drip emails must keep working.
  'krim-deck': { url: '/collateral/krimos-product-overview.pdf', title: 'the KrimOS product overview' },
  // Deeper read — an existing page, always live.
  'world-lending-model': {
    url: `${siteUrl()}/research/world-lending-model`,
    title: 'The World Lending Model',
  },
}

/** Resource linked in the immediate confirmation email (60-second read). */
export const BRIEF_RESOURCE_KEY = 'krimos-brief'
/** Resource sent in the +2d email (the flagship 8-page overview). */
export const DECK_RESOURCE_KEY = 'krimos-overview-8pp'
/** Resource sent in the +6d email (the RBI alignment 2-pager). */
export const FEATURED_RESOURCE_KEY = 'krimos-rbi-alignment'
/** Deeper-read PS link in the +6d email. */
export const RESEARCH_RESOURCE_KEY = 'world-lending-model'
