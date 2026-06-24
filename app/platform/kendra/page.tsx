/**
 * /platform/kendra — Kendra, the runtime (the brain of KrimOS).
 * Built to the house standard: content-first, homepage glass, a real image,
 * no hand-built device graphics (HOUSE-STYLE §0, §7). Server component — no
 * client island. Shape: what it is (hero) → the two powers → the seven
 * modules → the ledger → impact. Facts: docs/krim-content.md (Kendra · the
 * seven runtime modules · Krim-Nyāya · Krim-Learn · Krim-Ledger).
 */

import type { Metadata } from 'next'
import LayerShell from '@/components/platform/LayerShell'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Kendra — the runtime',
  description:
    'Kendra is the runtime of KrimOS — the brain the co-workers think in. Krim-Nyāya validates every action before it executes; Krim-Learn turns every recorded outcome into intelligence. Eight engineering modules make the guarantees hold.',
  alternates: { canonical: 'https://krim.ai/platform/kendra' },
  openGraph: {
    title: 'Kendra — the runtime',
    description:
      'Kendra is the runtime of KrimOS — the brain the co-workers think in. Krim-Nyāya validates every action before it executes; Krim-Learn turns every recorded outcome into intelligence. Eight engineering modules make the guarantees hold.',
    url: 'https://krim.ai/platform/kendra',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'KrimOS', item: 'https://krim.ai/platform' },
    { '@type': 'ListItem', position: 3, name: 'Kendra', item: 'https://krim.ai/platform/kendra' },
  ],
}

// the eight engineering modules of the runtime (docs/krim-content.md · the runtime modules)
const MODULES = [
  { name: 'Krim-Core', role: 'orchestration', body: 'Routes each task to the right co-worker and runs the workflow — sequential, parallel or hand-off — with retries and graceful fallbacks.' },
  { name: 'Krim-Karya', role: 'scheduling', body: 'Owns when work runs — recurring tasks, deferred actions, and time-window rules like contact hours and regulatory deadlines, so nothing fires before it is allowed to.' },
  { name: 'Krim-Fabric', role: 'knowledge', body: 'The regulatory rule set for each jurisdiction, each institution’s own policies, and the shared, anonymised pattern library.' },
  { name: 'Krim-Govern', role: 'policy', body: 'A seven-level hierarchy of law, regulator guidance and house rules, enforced per tenant and updated as the rules change.' },
  { name: 'Krim-Nyāya', role: 'validation', body: 'The pre-execution gate — 33 validators that decide whether a proposed action is allowed to happen at all.' },
  { name: 'Krim-Learn', role: 'learning', body: 'Ten learning loops that read every recorded outcome and feed back what actually worked across the workforce.' },
  { name: 'Krim-Ledger', role: 'the record', body: 'Every action logged immutably and metered in the same pass — one trail that serves both audit and billing.' },
  { name: 'Krim-Sense', role: 'telemetry', body: 'The metrics, logs, alerts and dashboards that show what is happening across the whole stack.' },
]

// The eight modules laid out as a lattice around a single core — the parts that
// compose into one runtime. 'core' is the centre cell of the 3×3 grid (lg+).
const LATTICE: Array<(typeof MODULES)[number] | 'core'> = [
  MODULES[0], MODULES[1], MODULES[2],
  MODULES[3], 'core', MODULES[4],
  MODULES[5], MODULES[6], MODULES[7],
]

export default function KendraPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <LayerShell slug="kendra">
        {/* ---- Hero: what it is ---- */}
        <Section className="!pt-10">
          <div className="mx-auto max-w-[820px] text-center">
            <Reveal>
              <Eyebrow>The runtime</Eyebrow>
              <h1 className="mt-4 font-serif text-display-hero text-ink">
                The brain your co-workers think in.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[54ch] font-sans text-body-lg text-ink-2">
                Kendra is the runtime of KrimOS — where every co-worker reasons. It{' '}
                <span className="text-mint">validates each action before it acts</span>, and{' '}
                <span className="text-ink">gets sharper with every outcome</span> it records.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ---- The two powers ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Why it earns trust</Eyebrow>
            <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
              Validated before it acts. Smarter after it acts.
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
              Two powers live inside Kendra, and each makes the other possible. One keeps the system
              safe to run; the other makes it worth running for years.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Reveal>
              <div className="glass lume h-full p-8 md:p-9">
                <span aria-hidden className="block h-[3px] w-12 rounded-full bg-cyan/70" />
                <p className="mt-6 font-mono text-eyebrow uppercase text-cyan">Krim-Nyāya</p>
                <h3 className="mt-3 font-serif text-[1.55rem] leading-tight text-ink">
                  Nothing runs until it clears the gate.
                </h3>
                <p className="mt-4 font-sans text-body text-ink-2">
                  Before any action fires, it passes through Krim-Nyāya — 33 validators that ask, in
                  formal logic, whether this action is allowed to happen at all. Validation is not a
                  review after the work; it is the gate the work must pass to become real. Most
                  actions clear. The ones that don’t are flagged and handed to a person, with the
                  rule that stopped them in plain words.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glass lume h-full p-8 md:p-9">
                <span aria-hidden className="block h-[3px] w-12 rounded-full bg-mint/70" />
                <p className="mt-6 font-mono text-eyebrow uppercase text-mint">Krim-Learn</p>
                <h3 className="mt-3 font-serif text-[1.55rem] leading-tight text-ink">
                  Every recorded outcome makes the next one sharper.
                </h3>
                <p className="mt-4 font-sans text-body text-ink-2">
                  Because every action and its result land on one record, Krim-Learn sees what
                  actually worked and feeds it back through ten learning loops. It is disciplined,
                  not magic — a pattern only joins the shared library once it clears an effectiveness
                  threshold of around 80%, and what is shared is anonymised, aggregated and
                  opt-out. The system compounds; a baseline in the first quarter is materially beyond
                  it by year two.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <GlassCard accent className="mt-5 p-8 md:p-10">
              <p className="font-serif text-[clamp(1.4rem,2.4vw,1.9rem)] leading-tight text-ink">
                The AI your regulator can read.
              </p>
              <p className="mt-5 max-w-[60ch] font-sans text-body text-ink-2">
                Safety and intelligence aren’t traded off here. The validation that keeps every
                action accountable is the same complete record the system learns from — proof and
                improvement from one source of truth.
              </p>
            </GlassCard>
          </Reveal>
        </Section>

        {/* ---- The runtime modules — eight parts around one core ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow tone="dim">Inside the runtime</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              The machinery that makes the guarantees hold.
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
              Nyāya and Learn get the attention; these are the engineering that makes them possible.
              Each does one job — together they are the runtime.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LATTICE.map((cell, i) =>
              cell === 'core' ? (
                // the centre of the lattice — the parts compose into one runtime
                <Reveal key="core" delay={0.07}>
                  <div className="glass glass-cyan relative flex h-full min-h-[210px] flex-col items-center justify-center overflow-hidden rounded-lg p-7 text-center">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{ background: 'radial-gradient(60% 60% at 50% 50%, rgba(57,214,255,0.16) 0%, rgba(57,214,255,0) 70%)' }}
                    />
                    <span className="relative font-serif text-[2.6rem] leading-none text-ink" aria-hidden>
                      कृ
                    </span>
                    <p className="relative mt-4 font-serif text-[1.35rem] leading-none text-ink">Kendra</p>
                    <p className="relative mt-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan/80">
                      One runtime
                    </p>
                  </div>
                </Reveal>
              ) : (
                <Reveal key={cell.name} delay={(i % 3) * 0.07}>
                  <div className="glass lume flex h-full min-h-[210px] flex-col p-7">
                    <span aria-hidden className="block h-[3px] w-12 rounded-full bg-mint/70" />
                    <div className="mt-6 flex items-baseline gap-2.5">
                      <h3 className="font-serif text-[1.3rem] leading-none text-ink">{cell.name}</h3>
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
                        {cell.role}
                      </span>
                    </div>
                    <p className="mt-3 flex-1 font-sans text-[14px] leading-relaxed text-ink-2">
                      {cell.body}
                    </p>
                  </div>
                </Reveal>
              )
            )}
          </div>
        </Section>

        {/* ---- The ledger ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow>The record</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  Every action and its reasoning, on one record.
                </h2>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  Krim-Ledger streams every action, decision, output and validation to an immutable,
                  cryptographically sealed trail — and meters it in the same pass, in Krim Work
                  Units. Because the evidence is complete by construction, an inspection response
                  that took a compliance team three days is generated in minutes.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard className="p-8 md:p-10">
                <p className="font-serif text-[1.45rem] leading-tight text-ink">
                  One trail, read three ways.
                </p>
                <ul className="mt-6 space-y-4">
                  {[
                    ['Evidence', 'The audit trail a regulator can replay — what happened, why, and under which rule.'],
                    ['Intelligence', 'The same record Krim-Learn learns from — proof and improvement from one source.'],
                    ['Meter', 'Every action measured in Krim Work Units — a clear view of what the operation costs.'],
                  ].map(([name, body]) => (
                    <li key={name}>
                      <p className="font-serif text-[1.1rem] leading-none text-ink">{name}</p>
                      <p className="mt-1.5 font-sans text-caption leading-relaxed text-ink-2">{body}</p>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- Impact ---- */}
        <Section hairline>
          <Reveal>
            <GlassCard className="mx-auto max-w-[820px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-2 text-ink">
                Validated as it runs, sharper for having run.
              </h2>
              <p className="mx-auto mt-5 max-w-[54ch] font-sans text-body-lg text-ink-2">
                Kendra is the part that earns the trust: every action accountable before it fires,
                every outcome compounding into the next — all inside your own perimeter.
              </p>
            </GlassCard>
          </Reveal>
        </Section>
      </LayerShell>
    </>
  )
}
