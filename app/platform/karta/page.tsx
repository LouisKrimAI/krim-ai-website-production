/**
 * /platform/karta — Karta, the AI co-workers (a core KrimOS layer).
 * Built to the house standard: content-first, homepage glass, no devices.
 * Shape: what they are (hero) → how they're made → the roster of eight →
 *   the hard boundary (the one gold moment) → how control works → impact.
 * Facts: docs/krim-content.md (Karta — the AI co-workers). Invent nothing.
 */

import type { Metadata } from 'next'
import LayerShell from '@/components/platform/LayerShell'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Karta — the co-workers',
  description:
    'Karta are the AI co-workers of KrimOS: composed from validated Kriya primitives, configured not coded, and run under pre-execution validation with humans in the loop. Operational decisioning today, as Krim builds toward the full lending stack — a safe AI underwriter included, via the World Lending Model.',
  alternates: { canonical: 'https://krim.ai/platform/karta' },
  openGraph: { title: 'Karta — the co-workers', url: 'https://krim.ai/platform/karta' },
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

// what defines a co-worker (docs/krim-content.md · Karta)
const MAKEUP = [
  {
    title: 'Composed, not coded',
    body: 'Each co-worker is a composition of validated Kriya primitives — the same handful covering voice, documents, decisions, risk, audit and reporting. Change what one does by recomposing it, not by writing new code.',
  },
  {
    title: 'Defined by its attributes',
    body: 'Every co-worker is set by eleven attributes — purpose, capabilities, primitives, inputs, outputs, metrics, KWU cost, governance, learning loops, human-in-the-loop triggers and availability. Configure the attributes; the co-worker changes with them.',
  },
  {
    title: 'Validated before it acts',
    body: 'Nothing a co-worker proposes fires until it passes pre-execution validation, with humans in the loop wherever the institution sets them. Compliance is the runtime they run inside, not a check bolted on after.',
  },
]

// the roster — exactly EIGHT (docs/krim-content.md · Karta table)
const ROSTER = [
  { name: 'Vox-Out', line: 'Outbound voice across the lifecycle — acquisition, onboarding, servicing, collections, hardship, retention and cross-sell.' },
  { name: 'Vox-In', line: 'Inbound voice — servicing and payment queries, disputes, hardship signposting, and warm transfer to a human.' },
  { name: 'Doc', line: 'Documents and notices — arrears notices, restructuring offers, regulatory letters and payment confirmations.' },
  { name: 'Risk', line: 'Operational risk segmentation and gating by the institution’s own external risk flags.' },
  { name: 'Decide', line: 'Next-best-action and conflict resolution across competing strategies.' },
  { name: 'Cure', line: 'Delinquency cure — multi-step journeys that bring borrowers back to good standing.' },
  { name: 'Audit', line: 'Interaction review, pattern detection and anomaly surfacing for compliance and audit teams.' },
  { name: 'Report', line: 'Operational reporting, aggregated for ops, risk, compliance and executive stakeholders.' },
]

// what today's co-workers don't do — operations, not the credit decision (docs/krim-content.md)
const NOT_TODAY = [
  'Approve or deny loans',
  'Price credit',
  'Override the institution’s credit or risk engines',
  'Make the credit decision',
]

export default function KartaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <LayerShell slug="karta">
        {/* ---- Hero: what they are ---- */}
        <Section className="!pt-10">
          <div className="mx-auto max-w-[820px] text-center">
            <Reveal>
              <Eyebrow>The co-workers</Eyebrow>
              <h1 className="mt-4 font-serif text-display-hero text-ink">
                Intelligent co-workers, not bots.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[58ch] font-sans text-body-lg text-ink-2">
                Karta are the AI co-workers that run your operation — composed from validated
                primitives, configured to your institution, and held to every rule before they act.
                A small, capable team that does the work while you stay in control.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ---- How they're made ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>How they&rsquo;re made</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
              Assembled from the vocabulary, not written from scratch.
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
              A co-worker is a composition, not a one-off script. The same validated parts cover
              the whole operation, so a new capability is a configuration — and it inherits the
              compliance scaffolding everything else already runs on.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {MAKEUP.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 0.08}>
                <div className="glass lume h-full p-7">
                  <span aria-hidden className="block h-[3px] w-12 rounded-full bg-mint/70" />
                  <h3 className="mt-6 font-serif text-[1.4rem] leading-tight text-ink">{c.title}</h3>
                  <p className="mt-3 font-sans text-body text-ink-2">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- The roster of eight ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>The roster</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              Eight co-workers cover the operation end to end.
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
              Voice in both directions, the paperwork, the operational calls, the cure journeys,
              and the review that keeps it all accountable — each configured to your segments,
              scripts and policies.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {ROSTER.map((c, i) => (
              <Reveal key={c.name} delay={(i % 2) * 0.08}>
                <div className="glass lume h-full p-7">
                  <h3 className="font-serif text-[1.5rem] leading-tight text-ink">
                    <span className="text-ink-3">Karta-</span>
                    {c.name}
                  </h3>
                  <p className="mt-3 font-sans text-body text-ink-2">{c.line}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- The hard boundary — the one gold moment ---- */}
        <Section hairline>
          <Reveal>
            <GlassCard className="relative mx-auto max-w-[860px] overflow-hidden p-10 md:p-14">
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-gold to-transparent opacity-70"
              />
              <Eyebrow tone="gold">Today&rsquo;s line</Eyebrow>
              <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
                Today, the credit decision is yours.
              </h2>
              <p className="mt-6 max-w-[64ch] font-sans text-body-lg text-ink-2">
                Karta-Risk and Karta-Decide segment portfolios, suggest the next best action,
                resolve conflicts and gate actions on the institution&rsquo;s own risk and fraud
                flags. That is the whole of their authority today.
              </p>

              <p className="mt-10 font-mono text-[10.5px] uppercase tracking-[0.18em] text-gold">
                What today&rsquo;s co-workers don&rsquo;t do
              </p>
              <ul className="mt-5 grid gap-x-10 gap-y-3.5 sm:grid-cols-2">
                {NOT_TODAY.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-[7px] grid h-4 w-4 shrink-0 place-items-center rounded-full border border-gold/60"
                    >
                      <span className="block h-[1.5px] w-2 rounded-full bg-gold" />
                    </span>
                    <span className="font-sans text-body leading-snug text-ink-2">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-10 max-w-[64ch] border-t border-[rgba(200,161,74,0.28)] pt-7 font-serif text-[clamp(1.15rem,2vw,1.45rem)] leading-snug text-ink">
                Today, the credit decision stays with you. The AI underwriter we are building — the
                evolving, self-learning World Lending Model — earns its place by clearing the{' '}
                <span className="text-mint">same validation gate</span> as every other action.
              </p>
            </GlassCard>
          </Reveal>
        </Section>

        {/* ---- How control works ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow>Who&rsquo;s in control</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  You set how far they go.
                </h2>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  Autonomy is a setting, not a default. The institution decides how much each
                  co-worker does on its own — per workflow, per segment, per risk band — and moves
                  the line as confidence grows. The risk profile stays yours to control.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard className="p-8 md:p-10">
                <ul className="grid gap-5">
                  {[
                    ['Configured, not coded', 'Every co-worker is set by its attributes — no engineering cycle to change behaviour.'],
                    ['Autonomy you choose', 'Run a co-worker hands-off, with oversight, as a copilot, or fully human-in-the-loop.'],
                    ['Humans in the loop', 'Low-confidence and high-risk actions route to a person before anything executes.'],
                  ].map(([title, body]) => (
                    <li key={title} className="flex items-start gap-4">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
                      <div>
                        <p className="font-serif text-[1.25rem] leading-tight text-ink">{title}</p>
                        <p className="mt-1.5 font-sans text-body text-ink-2">{body}</p>
                      </div>
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
              <h2 className="font-serif text-display-2 text-ink">A workforce that compounds.</h2>
              <p className="mx-auto mt-5 max-w-[52ch] font-sans text-body-lg text-ink-2">
                Built from the vocabulary, governed by the runtime, steered by you — and learning
                from every interaction, so the operation gets better the more it runs.
              </p>
            </GlassCard>
          </Reveal>
        </Section>
      </LayerShell>
    </>
  )
}
