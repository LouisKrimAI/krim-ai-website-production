/**
 * Site navigation — the SINGLE source of truth for the banner mega-panel AND
 * the footer. Both import from here so the two can never drift apart again.
 *
 * One spine, four columns. Each column head links to that section's landing
 * page (its overview); the rows are its children. Descriptors (`role`) appear
 * only where a name needs translating — KrimOS layers and the Research work.
 * Column order (owner-set 2026-08-31): KrimOS, Research, Domains, Company —
 * the product, the science behind it, who it's for, then who we are. The
 * KrimOS column's ROWS must match the order of the stack on /krimos —
 * components/krimos/layers.ts and components/home/PlatformLayers.tsx (deck
 * order, apps → foundation). A visitor who opens the banner and then looks at
 * the stack must read the same sequence. Kovida is the stack's foundation but
 * its page lives under Research, so it is listed there (once — never twice in
 * one panel). Lending first among Domains (the wedge); Architecture last in
 * Research (the substrate the science sits on); Trust first among the Company
 * rows (the proof, right behind identity).
 */

export type NavRow = { label: string; role?: string; href: string }
export type NavColumn = { title: string; href: string; rows: readonly NavRow[] }

export const NAV_COLUMNS: readonly NavColumn[] = [
  {
    title: 'KrimOS',
    href: '/krimos',
    rows: [
      { label: 'Kupa & Kula', role: 'for your teams', href: '/krimos/kupa' },
      { label: 'Krimkar & Kira', role: 'for your customers', href: '/krimkar' },
      { label: 'Karta', role: 'the AI co-workers', href: '/krimos/karta' },
      { label: 'Kendra', role: 'the engine & the gate', href: '/krimos/kendra' },
      { label: 'Kriya', role: 'the action library', href: '/krimos/kriya' },
    ],
  },
  {
    title: 'Research',
    href: '/research',
    rows: [
      { label: 'Epistemic AI', href: '/epistemic-ai' },
      { label: 'Kovida', role: 'the world lending model', href: '/research/world-lending-model' },
      { label: 'Safe Agent Harness', href: '/research/safe-agent-harness' },
      { label: 'Architecture', role: 'the substrate', href: '/architecture' },
    ],
  },
  {
    title: 'Domains',
    href: '/lending',
    rows: [
      { label: 'Lending', href: '/lending' },
      { label: 'Enterprise', href: '/enterprise' },
      { label: 'Government', href: '/government' },
    ],
  },
  {
    title: 'Company',
    href: '/company',
    rows: [
      { label: 'Trust', href: '/trust' },
      { label: 'Services', href: '/services' },
      { label: 'Insights', href: '/insights' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

// The top bar IS the four column heads — nothing else. Each opens the one
// shared sheet, with its own column highlighted. `match` drives the
// current-section mark.
export const NAV_TOP: readonly { label: string; href: string; match: string[] }[] = [
  { label: 'KrimOS', href: '/krimos', match: ['/krimos'] },
  { label: 'Research', href: '/research', match: ['/research', '/epistemic-ai', '/architecture'] },
  { label: 'Domains', href: '/lending', match: ['/lending', '/government', '/enterprise'] },
  { label: 'Company', href: '/company', match: ['/company', '/contact', '/trust', '/services', '/insights'] },
]
