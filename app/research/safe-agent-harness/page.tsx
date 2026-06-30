/**
 * /research/safe-agent-harness
 *
 * Redesigned for scannability and depth:
 * — snapshot strip (3-col "at a glance" below hero)
 * — gold consequence tags on failure cards
 * — 4-zone control cards: identity → verdict → proof bullets → insight
 * — inline article links woven into copy
 * — "what this means" scan line on each regulatory card
 * — "From the research" door strip before close
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Reveal from '@/components/Reveal'
import HarnessVideo from '@/components/HarnessVideo'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Safe Agent Harness · Krim Research',
  description:
    'A safe agent harness is the operational control layer that wraps an autonomous AI agent with three integrated controls: a constrained action vocabulary, a pre-execution validation gate, and a human command surface. The architecture the combined regulatory regime most cleanly rewards for deploying AI in a regulated bank.',
  alternates: { canonical: 'https://krim.ai/research/safe-agent-harness' },
  openGraph: {
    title: 'Safe Agent Harness · Krim Research',
    description:
      'The operational control layer that wraps AI agents — constraining what they can do, gating what they propose, and keeping a human in command. The precondition for deploying AI inside a regulated bank.',
    url: 'https://krim.ai/research/safe-agent-harness',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Research', item: 'https://krim.ai/research' },
    { '@type': 'ListItem', position: 3, name: 'Safe Agent Harness', item: 'https://krim.ai/research/safe-agent-harness' },
  ],
}

const DEMO_HREF = '/contact'

type Tint = 'mint' | 'cyan'

// ── Data ─────────────────────────────────────────────────────────────────────

const SNAPSHOT = [
  { n: '01', name: 'Constrained action space', label: 'Kriya',      tint: 'mint' as Tint, stat: '500+',    statLabel: 'validated primitives'    },
  { n: '02', name: 'Pre-execution gate',        label: 'Krim-Nyāya', tint: 'mint' as Tint, stat: '33',      statLabel: 'pre-execution validators' },
  { n: '03', name: 'Human in command',          label: 'Kupa',       tint: 'cyan' as Tint, stat: '1-click', statLabel: 'agent pause'              },
]

const LAYERS = [
  {
    n: '01', name: 'Constrained action space', label: 'Kriya', tint: 'mint' as Tint,
    verdict: 'If it is not in the vocabulary, it cannot fire.',
    points: [
      '500+ credit-native primitives across 20+ domains.',
      'Each primitive is the smallest validatable unit: bureau pulls, Reg-B notices, FDCPA-safe collections calls.',
      'No path exists for an action outside the vocabulary.',
    ],
    insight: 'The vocabulary is the boundary, and the boundary is what makes the capability provable.',
  },
  {
    n: '02', name: 'Pre-execution gate', label: 'Krim-Nyāya', tint: 'mint' as Tint,
    verdict: 'Every action clears the gate before it executes, or it does not execute.',
    points: [
      '33 validators gate every action before it fires: policy compliance, consent, regulatory context, and data quality.',
      'A violated rule blocks outright — not retried, not warned through.',
      'Uncertainty escalates to a human with the rule and reason in plain language.',
    ],
    insight: 'Built on Navya-Nyāya predicate logic: the wrong choice cannot execute, whatever the model proposes.',
  },
  {
    n: '03', name: 'Human always in command', label: 'Kupa', tint: 'cyan' as Tint,
    verdict: 'Your risk and compliance teams hold the authority, and can pause any agent in one click.',
    points: [
      'Live view of every in-flight action across the workforce.',
      'Set policies, contact strategies, and escalation rules. Change them without redeploying.',
      'Every decision permanently auditable, with its reasoning attached.',
    ],
    insight: 'The human holds the authority. The harness makes that real, not a line in a governance document.',
  },
]

const FAILURES = [
  {
    title: 'Hallucinated reasons',
    consequence: 'ECOA / Reg B violation',
    body: 'An agent declines a borrower and writes a reason that contradicts the loan file. No structured decision trail means no answer when the regulator asks. "The model is too complex" is not a defence.',
  },
  {
    title: 'Consent violations',
    consequence: 'Class-action exposure',
    body: 'An agent calls a borrower at 11 PM. The FDCPA contact-hours rule lived in the rulebook but never in the action path. One case: $500 to $1,500. At portfolio scale, it is a class action.',
  },
  {
    title: 'Emergent strategy harm',
    consequence: 'Fair-lending finding',
    body: 'A collections agent optimises for fastest cure rate. Over six months it under-contacts borrowers in minority neighbourhoods. Every individual action is compliant; the population-level pattern is not. The per-action gate catches individual violations. Emergent harm lives at the population level. That is what Kupa\'s live workforce view is for.',
  },
]

const REGS = [
  {
    reg: 'SR 11-7', region: 'US',
    meaning: 'The gate is a control, not a shortcut around model validation.',
    point: 'Models must be validated before use with effective challenge. The pre-execution gate sits on the output path as a control that complements independent model validation rather than discharging it.',
  },
  {
    reg: 'ECOA / Reg B', region: 'US',
    meaning: '"The model said no" is not a reason a regulator accepts.',
    point: 'CFPB Circular 2022-03 is explicit that complexity is no defence for a missing reason. Krim-Ledger carries structured decision rationale — policy applied and features used — with every decline.',
  },
  {
    reg: 'FDCPA / TCPA', region: 'US',
    meaning: 'Contact rules must be checked before the call, not after.',
    point: 'Contact hours, consent status, and DNC compliance must be confirmed before the call is placed. Pre-execution is the architecture that enforces this by design at scale, not as an after-the-fact check.',
  },
  {
    reg: 'FCA Consumer Duty', region: 'UK',
    meaning: 'You must evidence good outcomes, and the ledger is the evidence.',
    point: 'The Duty is outcomes-based and puts the burden on the firm to show good outcomes. The audit ledger records the action, the reasoning, and the result permanently.',
  },
  {
    reg: 'RBI FREE-AI', region: 'IN',
    meaning: 'Explainability, localisation, and ongoing monitoring, built in.',
    point: '7 Sutras, 6 Pillars, and 26 recommendations on responsible AI in lending, covering data-localisation and ongoing monitoring requirements throughout.',
  },
]

const ARTICLES = [
  { slug: 'the-cost-of-being-wrong',              title: 'The cost of being wrong',              category: 'Risk',         tint: 'gold' as const },
  { slug: 'the-automation-gap',                   title: 'The automation gap',                   category: 'Problem',      tint: 'gold' as const },
  { slug: 'audit-after-the-fact-is-a-confession', title: 'Audit after the fact is a confession', category: 'Method',       tint: 'mint' as const },
  { slug: 'sovereignty-is-not-optional',          title: 'Sovereignty is not optional',          category: 'Architecture', tint: 'cyan' as const },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SafeAgentHarnessPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <SiteHeader />
      <main className="relative z-10">

        {/* ---- 1 · Hero ---- */}
        <Section className="!pt-24">
          <div className="mx-auto max-w-[820px] text-center">
            <Reveal>
              <Eyebrow>Research — Safe Agent Harness</Eyebrow>
              <h1 className="mt-5 font-serif text-display-hero leading-[1.04] text-ink">
                The harness that makes AI agents provable to deploy.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[48ch] font-sans text-body-lg text-ink-2">
                The control layer that wraps every AI agent: constraining what it can do,
                validating every action before it fires, keeping{' '}
                <span className="text-mint">a human in command</span>.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
                <CTA href={DEMO_HREF}>Book a demo</CTA>
                <CTA href="/krimos/kendra" variant="secondary">See it in the runtime</CTA>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ---- 1b · Snapshot strip — "at a glance" ---- */}
        <Section>
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">The harness, at a glance</p>
            <div className="mt-5 overflow-hidden rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}>
              <div className="grid divide-y divide-white/[0.06] md:grid-cols-3 md:divide-x md:divide-y-0">
                {SNAPSHOT.map((s) => (
                  <div key={s.n} className="p-7 md:p-9">
                    <p className={`font-mono text-[10px] uppercase tracking-[0.22em] ${s.tint === 'mint' ? 'text-mint' : 'text-cyan'}`}>{s.n}</p>
                    <h3 className="mt-3 font-serif text-[1.05rem] leading-tight text-ink">{s.name}</h3>
                    <p className={`mt-1 font-mono text-[10px] uppercase tracking-[0.14em] ${s.tint === 'mint' ? 'text-mint/60' : 'text-cyan/60'}`}>{s.label}</p>
                    <p className={`mt-6 font-mono text-[clamp(1.8rem,3.5vw,2.4rem)] font-medium leading-none ${s.tint === 'mint' ? 'text-mint' : 'text-cyan'}`}>{s.stat}</p>
                    <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">{s.statLabel}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ---- 2 · The bare-agent problem ---- */}
        <Section hairline>
          <div className="grid items-start gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow>The problem</Eyebrow>
                <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
                  A bare agent in a regulated bank is a liability before it is a feature.
                </h2>
                <p className="mt-7 font-sans text-body-lg text-ink-2">
                  A raw model with a toolkit can message a borrower outside{' '}
                  <span className="text-ink">FDCPA</span> hours, disclose a balance to the
                  wrong party, or decline an applicant with no legible reason. None of this
                  needs intent — it only needs the wrong action to be{' '}
                  <span className="text-mint">structurally possible</span>.{' '}
                  <Link
                    href="/insights/the-cost-of-being-wrong"
                    className="text-mint/70 underline underline-offset-2 transition-colors hover:text-mint"
                  >
                    Statutory exposure scales with volume
                  </Link>{' '}
                  and compounds rather than caps.
                </p>
                <p className="mt-5 font-sans text-body text-ink-2">
                  The three failures below are not edge cases. They are what capable AI does
                  when it ships without operational controls. The pattern repeats wherever the{' '}
                  <Link
                    href="/insights/the-automation-gap"
                    className="text-mint/70 underline underline-offset-2 transition-colors hover:text-mint"
                  >
                    compliance ceiling
                  </Link>{' '}
                  meets unconstrained automation.
                </p>
              </div>
            </Reveal>

            {/* Failure cards — consequence tag as scan hook */}
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-4">
                {FAILURES.map((f) => (
                  <div key={f.title} className="glass lume rounded-xl p-6">
                    <h3 className="font-serif text-[1.15rem] leading-tight text-ink">{f.title}</h3>
                    <p className="mt-2.5 font-sans text-[14px] leading-relaxed text-ink-2">{f.body}</p>
                    <div className="mt-4 border-t border-gold/15 pt-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">{f.consequence}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ---- 3 · Three controls — 4-zone scan cards ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <div>
                <Eyebrow>Control by design</Eyebrow>
                <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
                  Controls that compose: each necessary, none enough alone.
                </h2>
                <p className="mt-6 max-w-[50ch] font-sans text-body-lg text-ink-2">
                  A constrained action vocabulary, a pre-execution gate, and a human command
                  surface that{' '}
                  <span className="text-ink">compose</span>:{' '}
                  <span className="text-mint">remove any one and the others break.</span>{' '}
                  The harness runs inside the institution's own perimeter — which is what lets
                  a regulated bank{' '}
                  <Link
                    href="/insights/sovereignty-is-not-optional"
                    className="text-mint/70 underline underline-offset-2 transition-colors hover:text-mint"
                  >
                    run it at all
                  </Link>.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="relative mx-auto w-full max-w-[460px]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(57,214,255,0.10) 0%, rgba(0,255,178,0.04) 42%, transparent 72%)' }}
                />
                <Image
                  src="/images/harness/harness-gate.png"
                  alt="An AI agent sends action proposals through a luminous validation gate panel — compliant actions pass, non-compliant are blocked."
                  width={2048}
                  height={2048}
                  sizes="(max-width: 768px) 88vw, 460px"
                  className="relative w-full"
                  style={{
                    filter: 'drop-shadow(0 0 28px rgba(57,214,255,0.28))',
                    maskImage: 'radial-gradient(ellipse 82% 80% at 48% 50%, black 48%, transparent 86%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 82% 80% at 48% 50%, black 48%, transparent 86%)',
                  }}
                />
              </div>
            </Reveal>
          </div>

          {/* 4-zone control cards */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {LAYERS.map((l, i) => (
              <Reveal key={l.n} delay={i * 0.08}>
                <div className="glass lume relative flex h-full flex-col overflow-hidden rounded-xl p-7 md:p-8">
                  {/* colour rail */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute inset-y-0 left-0 w-[3px] ${
                      l.tint === 'mint' ? 'bg-mint/70' : 'bg-cyan/70'
                    }`}
                  />
                  <div className="flex flex-1 flex-col pl-4">

                    {/* Zone A — Identity */}
                    <p className={`font-mono text-[10px] uppercase tracking-[0.22em] ${l.tint === 'mint' ? 'text-mint' : 'text-cyan'}`}>{l.n}</p>
                    <h3 className="mt-3 font-serif text-[1.25rem] leading-tight text-ink">{l.name}</h3>
                    <p className={`mt-1 font-mono text-[10px] uppercase tracking-[0.14em] ${l.tint === 'mint' ? 'text-mint/60' : 'text-cyan/60'}`}>{l.label}</p>

                    {/* Zone B — Verdict (the scan hook) */}
                    <p className={`mt-5 font-sans text-[15px] font-medium leading-snug ${l.tint === 'mint' ? 'text-mint' : 'text-cyan'}`}>
                      {l.verdict}
                    </p>

                    {/* Zone C — Proof bullets */}
                    <div className={`mt-4 flex-1 rounded-lg border px-4 py-3.5 ${
                      l.tint === 'mint' ? 'border-mint/15 bg-mint/[0.04]' : 'border-cyan/15 bg-cyan/[0.04]'
                    }`}>
                      <ul className="space-y-2.5">
                        {l.points.map((pt, pi) => (
                          <li key={pi} className="flex items-start gap-2.5">
                            <span
                              aria-hidden
                              className={`mt-[5px] block h-1 w-1 shrink-0 rounded-full ${l.tint === 'mint' ? 'bg-mint/70' : 'bg-cyan/70'}`}
                            />
                            <span className="font-mono text-[12px] leading-relaxed text-ink-2">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Zone D — Insight */}
                    <p className={`mt-5 border-t pt-5 font-serif text-[0.95rem] italic leading-snug ${
                      l.tint === 'mint' ? 'border-mint/15 text-mint/80' : 'border-cyan/15 text-cyan/80'
                    }`}>
                      {l.insight}
                    </p>

                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 4 · Model safety vs. harness safety ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div>
                <Eyebrow>Architecture, not model quality</Eyebrow>
                <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
                  The model decides. The harness controls whether it can act.
                </h2>
                <p className="mt-3 font-serif text-[1.05rem] italic text-mint/90">
                  "Less likely" is not "impossible." A harness is what closes that gap.
                </p>
                <p className="mt-6 max-w-[50ch] font-sans text-body-lg text-ink-2">
                  Constitutional AI, RLHF, and instruction-following make a model{' '}
                  <span className="text-ink">less likely</span> to propose a harmful action.
                  But "less likely" is not{' '}
                  <span className="text-mint">"structurally impossible."</span>{' '}
                  A harness operates at a different layer. It does not depend on the model
                  making the right choice; it enforces that the{' '}
                  <span className="text-ink">wrong choice cannot execute</span>. That is also
                  why a record written before the action, rather than{' '}
                  <Link
                    href="/insights/audit-after-the-fact-is-a-confession"
                    className="text-mint/70 underline underline-offset-2 transition-colors hover:text-mint"
                  >
                    reconstructed after it
                  </Link>
                  , is the one a regulator can trust.
                </p>
                <Reveal delay={0.1}>
                  <GlassCard accent className="mt-8 p-7">
                    <p className="font-serif text-[clamp(1.1rem,1.8vw,1.35rem)] leading-snug text-ink">
                      The harness does not make the agent smarter. It{' '}
                      <span className="text-mint">controls what the agent can act on</span>.
                      Those are different problems, solved at different layers. Conflating
                      them is how AI deployments fail their risk committee.
                    </p>
                    <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
                      Architecture, not model quality
                    </p>
                  </GlassCard>
                </Reveal>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <HarnessVideo maxWidth="440px" />
            </Reveal>
          </div>
        </Section>

        {/* ---- 5 · Regulatory alignment ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Regulatory alignment</Eyebrow>
            <h2 className="mt-4 max-w-[26ch] font-serif text-display-1 text-ink">
              The combined regime points toward a harness.
            </h2>
            <p className="mt-6 max-w-[56ch] font-sans text-body-lg text-ink-2">
              No single rule names one by name. But SR 11-7, ECOA, FCA Consumer Duty,
              FDCPA, and RBI FREE-AI collectively demand{' '}
              <span className="text-ink">ex-ante control</span>,{' '}
              <span className="text-ink">per-decision explainability</span>, and{' '}
              <span className="text-mint">human oversight</span>.{' '}
              <Link
                href="/insights/audit-after-the-fact-is-a-confession"
                className="text-mint/70 underline underline-offset-2 transition-colors hover:text-mint"
              >
                Pre-execution validation is the discipline that answers this
              </Link>
              {' '}— audit after the fact only confesses to the harm.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REGS.map((r) => (
              <Reveal key={r.reg}>
                <div className="glass-quiet lume h-full rounded-lg p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-mint">{r.reg}</h3>
                    <span className="shrink-0 rounded border border-white/10 px-2 py-0.5 font-mono text-[10px] text-ink-3">{r.region}</span>
                  </div>
                  <p className="mt-3 font-sans text-[14px] font-medium leading-snug text-ink">{r.meaning}</p>
                  <p className="mt-2.5 font-sans text-[13px] leading-relaxed text-ink-2">{r.point}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 6 · From the research ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>From the research</Eyebrow>
            <h2 className="mt-4 font-serif text-display-3 text-ink">The thinking behind the harness.</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {ARTICLES.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.07}>
                <Link href={`/insights/${a.slug}`} className="group block h-full">
                  <div className="glass lume h-full rounded-xl p-7 transition-all duration-fast group-hover:-translate-y-0.5">
                    <p className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
                      a.tint === 'mint' ? 'text-mint' : a.tint === 'cyan' ? 'text-cyan' : 'text-gold'
                    }`}>{a.category}</p>
                    <h3 className="mt-3 font-serif text-[1.15rem] leading-tight text-ink">
                      {a.title}
                    </h3>
                    <p className="mt-5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3 transition-colors duration-fast group-hover:text-mint">
                      Read
                      <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-1">→</span>
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 7 · Close ---- */}
        <Section hairline>
          <Reveal>
            <div className="glass mx-auto max-w-[720px] p-10 text-center md:p-14">
              <span aria-hidden className="mx-auto block h-[2px] w-12 rounded-full bg-gradient-to-r from-mint to-cyan" />
              <h2 className="mt-8 font-serif text-display-3 leading-tight text-ink">
                See the harness run on your data.
              </h2>
              <p className="mt-3 font-serif text-[1.05rem] italic text-mint/90">
                A 30-day proof-of-value on your collections book.
              </p>
              <p className="mx-auto mt-4 max-w-[44ch] font-sans text-body text-ink-2">
                What the gate blocks, why it blocks it, and what the audit trail looks like
                under examiner scrutiny. And the foundation it lays for an intelligence
                that sharpens with every validated action.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-5">
                <CTA href={DEMO_HREF}>Book a demo</CTA>
                <CTA href="/research/world-lending-model" variant="secondary">
                  See the World Lending Model
                </CTA>
              </div>
            </div>
          </Reveal>
        </Section>

      </main>
      <SiteFooter />
    </>
  )
}
