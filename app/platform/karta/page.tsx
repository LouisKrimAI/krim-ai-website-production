/**
 * /platform/karta — Karta, the AI co-workers (a core KrimOS layer).
 * Content-first, homepage glass, no devices. Tight + design-driven.
 * Shape: hero → how they're made (+ anatomy) → the lifecycle spine →
 *   channels & languages → control → impact. No disclaimer panel.
 * Facts: docs/krim-content.md + KRIMOS_CAPABILITIES_OVERVIEW.md.
 */

import type { Metadata } from 'next'
import LayerShell from '@/components/platform/LayerShell'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard } from '@/components/ui'

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

// what defines a co-worker — its attributes (the anatomy)
const ANATOMY = [
  ['Purpose', 'the job it owns'],
  ['Capabilities', 'what it can do'],
  ['Primitives', 'the validated actions it composes'],
  ['Governance', 'the policies it runs inside'],
  ['Autonomy', 'how far it goes alone'],
  ['Human-in-the-loop', 'when it defers to a person'],
  ['Learning', 'how it sharpens from outcomes'],
  ['Cost', 'metered per action, in work units'],
]

// the lending lifecycle, staffed — a representative set, configured per institution
const STAGES = [
  { stage: 'Origination', role: 'Bring a loan to life.', workers: ['Onboard', 'Doc'] },
  { stage: 'Servicing', role: 'Keep it healthy.', workers: ['Vox-In', 'Account', 'Pay'] },
  { stage: 'Collections', role: 'Keep it on track.', workers: ['Vox-Out', 'Cure', 'Collect'] },
  { stage: 'Recovery', role: 'Resolve the hard cases.', workers: ['Hardship', 'Legal', 'Closure'] },
  { stage: 'Oversight', role: 'Keep it accountable.', workers: ['Risk', 'Monitor', 'Audit'] },
]

const CHANNELS = ['Voice', 'SMS', 'WhatsApp', 'Email', 'Web chat']

export default function KartaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <LayerShell slug="karta">
        {/* ---- Hero ---- */}
        <Section className="!pt-10">
          <div className="mx-auto max-w-[820px] text-center">
            <Reveal>
              <Eyebrow>The co-workers</Eyebrow>
              <h1 className="mt-4 font-serif text-display-hero text-ink">
                A workforce for the whole loan.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[54ch] font-sans text-body-lg text-ink-2">
                The AI co-workers that do the operation&rsquo;s work — across the lending lifecycle,
                in the <span className="text-mint">customer&rsquo;s own language</span>, with you
                setting how far each one goes.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ---- How they're made + the anatomy ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div>
                <Eyebrow>How they&rsquo;re made</Eyebrow>
                <h2 className="mt-4 max-w-[18ch] font-serif text-display-1 text-ink">
                  Assembled, not written from scratch.
                </h2>
                <p className="mt-6 max-w-[46ch] font-sans text-body-lg text-ink-2">
                  A co-worker is a composition of validated primitives, described by a handful of
                  attributes. Change the attributes and the co-worker changes with them —{' '}
                  <span className="text-mint">no engineering cycle</span>, and the same gate every
                  action clears before it fires.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard className="p-7 md:p-8">
                <span aria-hidden className="block h-[3px] w-12 rounded-full bg-mint/70" />
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
                  The anatomy of a co-worker
                </p>
                <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3.5 sm:grid-cols-2">
                  {ANATOMY.map(([label, gloss]) => (
                    <div key={label} className="flex items-baseline gap-2.5">
                      <span className="shrink-0 font-serif text-[1.1rem] leading-tight text-ink">{label}</span>
                      <span className="font-sans text-body text-ink-2">— {gloss}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- The lifecycle, staffed — a spine, not a roster ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Across the lifecycle</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              Every stage of the loan, already staffed.
            </h2>
            <p className="mt-6 max-w-[58ch] font-sans text-body-lg text-ink-2">
              From first application to final closure, each stage has co-workers that own its work —
              tuned to your products, segments and policies.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
            {STAGES.map((s, i) => (
              <Reveal key={s.stage} delay={(i % 5) * 0.06}>
                <div>
                  <span aria-hidden className="block h-[3px] w-10 rounded-full bg-mint/70" />
                  <h3 className="mt-5 font-serif text-[1.35rem] leading-tight text-ink">{s.stage}</h3>
                  <p className="mt-1.5 font-sans text-body text-ink-3">{s.role}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.workers.map((w) => (
                      <span
                        key={w}
                        className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-2"
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- Channels & languages ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow>Where they work</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  They meet customers where they already are.
                </h2>
                <p className="mt-7 max-w-[50ch] font-sans text-body-lg text-ink-2">
                  Inbound and outbound, across the channels people actually use — one thread that
                  remembers, with a <span className="text-mint">warm hand-off to a person</span> the
                  moment it&rsquo;s needed. In real time, across the whole book.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard className="p-8 md:p-10">
                <span aria-hidden className="block h-[3px] w-12 rounded-full bg-mint/70" />
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">Channels</p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {CHANNELS.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-mint/25 bg-mint/[0.04] px-4 py-1.5 font-sans text-body text-ink"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <p className="mt-7 border-t border-soft pt-6 font-serif text-[1.15rem] leading-snug text-ink">
                  One conversation, in their language — never a cold restart.
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- Control ---- */}
        <Section hairline>
          <div className="mx-auto max-w-[760px] text-center">
            <Reveal>
              <Eyebrow>Who&rsquo;s in control</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">You set how far they go.</h2>
              <p className="mx-auto mt-6 max-w-[56ch] font-sans text-body-lg text-ink-2">
                Autonomy is a setting, not a default. Run each co-worker{' '}
                <span className="text-mint">manual, supervised or autonomous</span> — per workflow,
                per segment — and move the line as confidence grows. Low-confidence and high-risk
                actions wait for a person.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ---- Impact ---- */}
        <Section hairline>
          <Reveal>
            <GlassCard className="mx-auto max-w-[820px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-2 text-ink">A workforce that compounds.</h2>
              <p className="mx-auto mt-5 max-w-[50ch] font-sans text-body-lg text-ink-2">
                Built from the vocabulary, governed by the runtime, steered by you — and{' '}
                <span className="text-mint">sharper with every interaction</span>, so the operation
                improves the more it runs.
              </p>
            </GlassCard>
          </Reveal>
        </Section>
      </LayerShell>
    </>
  )
}
