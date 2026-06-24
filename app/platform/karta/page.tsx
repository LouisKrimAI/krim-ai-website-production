/**
 * /platform/karta — Karta, the AI co-workers (a core KrimOS layer).
 *
 * Designed as one bound dossier: six numbered spreads (01–06) on a shared left
 * grid line, threaded by IBM Plex Mono ordinals on hairline rules. No accent
 * bars, no pill chips — the parts manifest and the staffed spine ARE the visual.
 * Glass is spent exactly once (channels); mint is load-bearing; cyan appears
 * once. Motion budget = two earned beats: the lifecycle spine staffing the loan
 * (cyan→mint), and the closing rule drawing in. Everything else is the shared
 * Reveal. Reduced-motion-safe, responsive, accessible.
 *
 * Facts: docs/krim-content.md + KRIMOS_CAPABILITIES_OVERVIEW.md.
 */

import type { Metadata } from 'next'
import LayerShell from '@/components/platform/LayerShell'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard } from '@/components/ui'
import KartaLifecycleSpine, { type Stage } from '@/components/platform/KartaLifecycleSpine'
import KartaClosingRule from '@/components/platform/KartaClosingRule'

export const metadata: Metadata = {
  title: 'Karta — the co-workers',
  description:
    'Karta are the AI co-workers of KrimOS: a workforce that runs the lending operation end to end — composed from validated primitives, configured not coded, on the channels customers use, with the autonomy you set.',
  alternates: { canonical: 'https://krim.ai/platform/karta' },
  openGraph: {
    title: 'Karta — the co-workers',
    description:
      'Karta are the AI co-workers of KrimOS: a workforce that runs the lending operation end to end — composed from validated primitives, configured not coded, with the autonomy you set.',
    url: 'https://krim.ai/platform/karta',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'KrimOS', item: 'https://krim.ai/platform' },
    { '@type': 'ListItem', position: 3, name: 'Karta', item: 'https://krim.ai/platform/karta' },
  ],
}

// what defines a co-worker — its attributes (the anatomy).
// `gloss` is rendered as JSX so a couple of load-bearing phrases can be lit in
// mint (validated/metered) without changing the copy.
type Attribute = { label: string; gloss: React.ReactNode }
const ANATOMY: Attribute[] = [
  { label: 'Purpose', gloss: 'the job it owns' },
  { label: 'Capabilities', gloss: 'what it can do' },
  {
    label: 'Primitives',
    gloss: (
      <>
        the <span className="text-mint">validated actions</span> it composes
      </>
    ),
  },
  { label: 'Governance', gloss: 'the policies it runs inside' },
  { label: 'Autonomy', gloss: 'how far it goes alone' },
  { label: 'Human-in-the-loop', gloss: 'when it defers to a person' },
  { label: 'Learning', gloss: 'how it sharpens from outcomes' },
  {
    label: 'Cost',
    gloss: (
      <>
        <span className="text-mint">metered per action</span>, in work units
      </>
    ),
  },
]

// the lending lifecycle, staffed — a representative set, configured per institution
const STAGES: Stage[] = [
  { stage: 'Origination', role: 'Bring a loan to life.', workers: ['Onboard', 'Doc'] },
  { stage: 'Servicing', role: 'Keep it healthy.', workers: ['Vox-In', 'Account', 'Pay'] },
  { stage: 'Collections', role: 'Keep it on track.', workers: ['Vox-Out', 'Cure', 'Collect'] },
  { stage: 'Recovery', role: 'Resolve the hard cases.', workers: ['Hardship', 'Legal', 'Closure'] },
  { stage: 'Oversight', role: 'Keep it accountable.', workers: ['Risk', 'Monitor', 'Audit'] },
]

const CHANNELS: [string, string][] = [
  ['Voice', 'IN · OUT'],
  ['SMS', 'IN · OUT'],
  ['WhatsApp', 'IN · OUT'],
  ['Email', 'IN · OUT'],
  ['Web chat', 'IN'],
]

const AUTONOMY = ['Manual', 'Supervised', 'Autonomous']

// the ledger numeral that opens each spread, on a hairline rule
function LedgerHead({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-4 border-t border-soft pt-4" aria-hidden>
      <span className="font-mono text-[11px] tabular-nums tracking-[0.2em] text-ink-3">{n}</span>
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">{label}</span>
    </div>
  )
}

export default function KartaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <LayerShell slug="karta">
        {/* ============================================================
            01 — HERO · oversized type as the device, broken off-centre
            ============================================================ */}
        <Section className="!pt-10">
          <div className="grid grid-cols-12 gap-x-6">
            <div className="col-span-12">
              <LedgerHead n="01" label="Karta" />
            </div>

            <div className="col-span-12 lg:col-span-10">
              <Reveal>
                <Eyebrow className="mt-8">The co-workers</Eyebrow>
                <h1 className="mt-5 font-serif text-display-hero text-ink">
                  A workforce for the whole loan.
                </h1>
              </Reveal>
            </div>

            <div className="col-span-12 mt-8 lg:col-span-6 lg:col-start-1 lg:mt-10">
              <Reveal delay={0.12}>
                <p className="max-w-[46ch] font-sans text-body-lg text-ink-2">
                  The AI co-workers that do the operation&rsquo;s work — across the lending lifecycle,
                  in the <span className="text-mint">customer&rsquo;s own language</span>, with you
                  setting how far each one goes.
                </p>
              </Reveal>
            </div>
          </div>
        </Section>

        {/* ============================================================
            02 — HOW THEY'RE MADE + ANATOMY · text left, spec ledger right
            ============================================================ */}
        <Section hairline>
          <div className="grid grid-cols-12 items-start gap-x-6 gap-y-10">
            <div className="col-span-12 lg:col-span-5">
              <Reveal>
                <LedgerHead n="02" label="How they’re made" />
                <h2 className="mt-6 max-w-[16ch] font-serif text-display-1 text-ink">
                  Assembled, not written from scratch.
                </h2>
                <p className="mt-6 max-w-[44ch] font-sans text-body-lg text-ink-2">
                  A co-worker is a composition of validated primitives, described by a handful of
                  attributes. Change the attributes and the co-worker changes with them —{' '}
                  <span className="text-mint">no engineering cycle</span>, and the same gate every
                  action clears before it fires.
                </p>
              </Reveal>
            </div>

            {/* the spec ledger — a parts manifest, not a card, not chips */}
            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
                The anatomy of a co-worker
              </p>
              <Reveal>
                <ul className="mt-4 divide-y divide-soft border-t border-soft">
                  {ANATOMY.map(({ label, gloss }, i) => (
                    <li key={label} className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4 py-5">
                      <span aria-hidden className="font-mono text-[11px] tabular-nums text-ink-3">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="block">
                        <span className="flex items-baseline gap-2 font-serif text-[1.25rem] leading-tight text-ink">
                          {label === 'Primitives' && (
                            <span
                              aria-hidden
                              className="inline-block h-1.5 w-1.5 translate-y-[-0.12em] bg-mint/80"
                            />
                          )}
                          {label}
                        </span>
                        <span className="mt-1.5 block font-sans text-body text-ink-2">{gloss}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Section>

        {/* ============================================================
            03 — ACROSS THE LIFECYCLE · the signature: the staffed spine
            ============================================================ */}
        <Section hairline>
          <Reveal>
            <LedgerHead n="03" label="Across the lifecycle" />
            <Eyebrow className="mt-8">Across the lifecycle</Eyebrow>
            <h2 className="mt-5 max-w-[24ch] font-serif text-display-1 text-ink">
              Every stage of the loan, already staffed.
            </h2>
            <p className="mt-6 max-w-[58ch] font-sans text-body-lg text-ink-2">
              From first application to final closure, each stage has co-workers that own its work —
              tuned to your products, segments and policies.
            </p>
          </Reveal>
          <KartaLifecycleSpine stages={STAGES} />
        </Section>

        {/* ============================================================
            04 — CHANNELS & LANGUAGES · mirrored facing page; the ONE glass
            ============================================================ */}
        <Section hairline>
          <div className="grid grid-cols-12 items-center gap-x-6 gap-y-10">
            {/* glass left */}
            <div className="col-span-12 lg:col-span-6 lg:order-1 order-2">
              <Reveal delay={0.12}>
                <GlassCard className="relative overflow-hidden p-8 md:p-10">
                  {/* the page's one cyan touch — a faint live-channel core glow */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full"
                    style={{
                      background:
                        'radial-gradient(closest-side, rgba(57,214,255,0.10), rgba(57,214,255,0))',
                    }}
                  />
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">Channels</p>
                  <ul className="mt-5 divide-y divide-soft border-t border-soft">
                    {CHANNELS.map(([name, dir]) => (
                      <li key={name} className="flex items-baseline justify-between py-3">
                        <span className="font-serif text-[1.1rem] leading-tight text-ink">{name}</span>
                        <span aria-hidden className="font-mono text-[11px] tracking-[0.16em] text-ink-3">
                          {dir}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 border-t border-soft pt-6 font-serif text-[1.15rem] leading-snug text-ink">
                    One conversation, in <span className="text-mint">their language</span> — never a
                    cold restart.
                  </p>
                </GlassCard>
              </Reveal>
            </div>

            {/* text right */}
            <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:order-2 order-1">
              <Reveal>
                <LedgerHead n="04" label="Where they work" />
                <h2 className="mt-6 max-w-[20ch] font-serif text-display-1 text-ink">
                  They meet customers where they already are.
                </h2>
                <p className="mt-7 max-w-[48ch] font-sans text-body-lg text-ink-2">
                  Inbound and outbound, across the channels people actually use — one thread that
                  remembers, with a <span className="text-mint">warm hand-off to a person</span> the
                  moment it&rsquo;s needed. In real time, across the whole book.
                </p>
              </Reveal>
            </div>
          </div>
        </Section>

        {/* ============================================================
            05 — CONTROL · the one centred breath; a static autonomy scale
            ============================================================ */}
        <Section hairline>
          <Reveal>
            <div className="mx-auto max-w-[760px] text-center">
              <div className="mx-auto flex w-fit items-center gap-4 border-t border-soft pt-4" aria-hidden>
                <span className="font-mono text-[11px] tabular-nums tracking-[0.2em] text-ink-3">05</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
                  Who’s in control
                </span>
              </div>
              <h2 className="mt-6 font-serif text-display-1 text-ink">You set how far they go.</h2>
              <p className="mx-auto mt-6 max-w-[56ch] font-sans text-body-lg text-ink-2">
                Autonomy is a setting, not a default. Run each co-worker{' '}
                <span className="text-mint">manual, supervised or autonomous</span> — per workflow,
                per segment — and move the line as confidence grows. Low-confidence and high-risk
                actions wait for a person.
              </p>

              {/* the static autonomy scale — a settled position, not a live dial */}
              <div className="mx-auto mt-12 max-w-[520px]" aria-hidden>
                <div className="relative h-px w-full bg-gradient-to-r from-white/10 via-white/15 to-mint/60">
                  <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-mint" />
                </div>
                <div className="mt-4 grid grid-cols-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
                  <span className="text-left">{AUTONOMY[0]}</span>
                  <span className="text-center">{AUTONOMY[1]}</span>
                  <span className="text-right">{AUTONOMY[2]}</span>
                </div>
                <p className="mt-5 font-mono text-caption text-ink-3">
                  Move the line per workflow, per segment.
                </p>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ============================================================
            06 — IMPACT · the closer; pure type, bookends 01, closes the ledger
            ============================================================ */}
        <Section hairline>
          <div className="grid grid-cols-12 gap-x-6">
            <div className="col-span-12 lg:col-span-9">
              <Reveal>
                <LedgerHead n="06" label="The compounding workforce" />
                <h2 className="mt-8 max-w-[18ch] font-serif text-display-1 text-ink">
                  A workforce that compounds.
                </h2>
                <p className="mt-6 max-w-[50ch] font-sans text-body-lg text-ink-2">
                  Built from the vocabulary, governed by the runtime, steered by you — and{' '}
                  <span className="text-mint">sharper with every interaction</span>, so the operation
                  improves the more it runs.
                </p>
                <KartaClosingRule />
              </Reveal>
            </div>
          </div>
        </Section>
      </LayerShell>
    </>
  )
}
