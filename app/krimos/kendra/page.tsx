/**
 * /krimos/kendra — Kendra, the runtime (the brain of KrimOS).
 * Built to the house standard: content-first, homepage glass, a real image,
 * no hand-built device graphics (HOUSE-STYLE §0, §7). Server component — no
 * client island. Shape: what it is (hero) → the two powers → the seven
 * modules → the ledger → impact. Facts: docs/krim-content.md (Kendra · the
 * seven runtime modules · Krim-Nyāya · Krim-Learn · Krim-Ledger).
 */

import type { Metadata } from 'next'
import LayerShell from '@/components/krimos/LayerShell'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Kendra — the runtime',
  description:
    'Kendra is the runtime of KrimOS, the brain the co-workers think in. Krim-Nyāya validates every action before it executes; Krim-Learn turns every recorded outcome into intelligence. The runtime your regulator can read.',
  alternates: { canonical: 'https://krim.ai/krimos/kendra' },
  openGraph: {
    title: 'Kendra — the runtime',
    description:
      'Kendra is the runtime of KrimOS, the brain the co-workers think in. Krim-Nyāya validates every action before it executes; Krim-Learn turns every recorded outcome into intelligence. The runtime your regulator can read.',
    url: 'https://krim.ai/krimos/kendra',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'KrimOS', item: 'https://krim.ai/krimos' },
    { '@type': 'ListItem', position: 3, name: 'Kendra', item: 'https://krim.ai/krimos/kendra' },
  ],
}

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
                Kendra is the runtime of KrimOS, where every co-worker reasons. It{' '}
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
                  Before any action fires, it clears Krim-Nyāya: 33 validators that decide, in formal
                  logic, whether it is allowed at all. The few that don’t pass go straight to a
                  person, with the rule that stopped them in plain words.
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
                  Every action and its result land on one record, so Krim-Learn sees what actually
                  worked and feeds it back through ten learning loops. Only patterns that prove out
                  are shared, always anonymised and opt-out. The system compounds: this quarter’s
                  baseline is well behind where it sits a year on.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <GlassCard accent className="mt-5 p-7 md:px-10 md:py-8">
              <div className="grid items-center gap-4 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.45fr)] md:gap-12">
                <p className="font-serif text-[clamp(1.4rem,2.4vw,1.9rem)] leading-tight text-ink">
                  The AI your regulator can read.
                </p>
                <p className="font-sans text-body text-ink-2">
                  Safety and intelligence aren’t traded off here. The validation that keeps every
                  action accountable is the same complete record the system learns from, so proof and
                  improvement come from one source of truth.
                </p>
              </div>
            </GlassCard>
          </Reveal>
        </Section>

        {/* ---- One runtime, many parts — the full component breakdown lives on
               the architecture page (this layer page tells the runtime's story,
               not its parts list, so the two pages don't repeat each other) ---- */}
        <Section>
          <div className="mx-auto max-w-[720px] text-center">
            <Reveal>
              <Eyebrow tone="dim">Inside the runtime</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">
                Specialised parts, working as one runtime.
              </h2>
              <p className="mx-auto mt-6 max-w-[58ch] font-sans text-body-lg text-ink-2">
                Validation, learning, scheduling, policy and the record each do one job, and Kendra
                composes them into the single runtime your co-workers think in.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-9 flex justify-center">
                <CTA href="/architecture" variant="secondary">
                  See the full architecture
                </CTA>
              </div>
            </Reveal>
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
                  cryptographically sealed trail, and meters it in the same pass, in Krim Work
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
                    ['Evidence', 'text-mint', 'The audit trail a regulator can replay: what happened, why, and under which rule.'],
                    ['Intelligence', 'text-cyan', 'The same record Krim-Learn learns from, proof and improvement from one source.'],
                    ['Meter', 'text-gold', 'Every action measured in Krim Work Units, a clear view of what the operation costs.'],
                  ].map(([name, tone, body]) => (
                    <li key={name}>
                      <p className={`font-serif text-[1.1rem] leading-none ${tone}`}>{name}</p>
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
                every outcome compounding into the next, all inside your own perimeter.
              </p>
            </GlassCard>
          </Reveal>
        </Section>
      </LayerShell>
    </>
  )
}
