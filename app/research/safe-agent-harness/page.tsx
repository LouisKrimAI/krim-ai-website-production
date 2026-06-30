/**
 * /research/safe-agent-harness
 *
 * The Safe Agent Harness research page.
 * Three integrated controls: Kriya (constrained action space),
 * Krim-Nyāya (pre-execution gate), Kupa (human command surface).
 */

import type { Metadata } from 'next'
import Image from 'next/image'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Reveal from '@/components/Reveal'
import HarnessVideo from '@/components/HarnessVideo'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Safe Agent Harness',
  description:
    'A safe agent harness is the operational control layer that wraps an autonomous AI agent with three integrated controls: a constrained action vocabulary, a pre-execution validation gate, and a human command surface. The architectural precondition for deploying AI agents in a regulated bank.',
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

const LAYERS = [
  {
    n: '01',
    name: 'Constrained action space',
    label: 'Kriya',
    tint: 'mint' as const,
    body: 'Agents act only through Kriya — 500+ credit-native primitives across 20+ domains: pull a bureau report, send a Reg-B adverse-action notice, schedule a collections call within FDCPA hours, price a facility to policy. Nothing outside the vocabulary can fire.',
    insight: 'The vocabulary is the boundary. The boundary is what makes the capability provable.',
  },
  {
    n: '02',
    name: 'Pre-execution gate',
    label: 'Krim-Nyāya',
    tint: 'mint' as const,
    body: 'Before any action fires, Krim-Nyāya runs 33 validators synchronously: policy, fair-lending rules, consent records, regulatory context, data quality. A violated rule blocks outright — not retried, not warned. Uncertainty escalates to a human with the rule and reason in plain language.',
    insight: '"Validated before it acts" is an architectural claim, not a model claim. It enforces that the wrong choice cannot execute — regardless of what the model proposes.',
  },
  {
    n: '03',
    name: 'Human always in command',
    label: 'Kupa',
    tint: 'cyan' as const,
    body: 'Kupa is the command surface your operations, compliance, and risk teams own. Live view of every in-flight action. Set policies, contact strategies, and escalation rules. Pause any agent in one click. Every decision permanently auditable.',
    insight: 'The human is the authority. The harness is the mechanism that makes that real in practice — not aspirational in a governance document.',
  },
]

const FAILURES = [
  {
    title: 'Hallucinated reasons',
    body: 'An agent declines a borrower and generates a post-hoc explanation that contradicts the loan file. No structured decision trail. The regulator asks; the bank has no answer. ECOA / Reg B adverse-action obligation: violated.',
  },
  {
    title: 'Consent violations',
    body: 'An agent calls a borrower at 11 PM. The FDCPA hours constraint was in the rulebook but not in the action path. No pre-execution check; the call went through. One case: $500–$1,500. At scale: class action.',
  },
  {
    title: 'Emergent strategy harm',
    body: 'A collections agent optimises for fastest cure-rate. Over six months it systematically under-contacts borrowers in minority neighbourhoods. Each action is individually compliant. The population-level pattern is a fair-lending finding.',
  },
]

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
                The harness that makes AI agents safe to deploy.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[48ch] font-sans text-body-lg text-ink-2">
                The control layer that wraps every AI agent — constraining what it can do,
                validating every proposed action before it fires, keeping{' '}
                <span className="text-mint">a human in authority</span> over both.
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

        {/* ---- 2 · The bare agent problem ---- */}
        <Section hairline>
          <div className="grid items-start gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow>The problem</Eyebrow>
                <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
                  A bare agent in a regulated bank is a liability, not a feature.
                </h2>
                <p className="mt-7 font-sans text-body-lg text-ink-2">
                  A raw model with a toolkit can send a collection message outside FDCPA
                  hours, disclose a balance to a third party, or decline an applicant
                  without a legible reason. None of these require intent. They just require
                  that the wrong action was{' '}
                  <span className="text-mint">structurally possible</span> — and without a
                  harness, it always is.
                </p>
                <p className="mt-5 font-sans text-body text-ink-2">
                  The three failures below are not edge cases. They are the natural
                  consequence of deploying capable AI without operational controls.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-4">
                {FAILURES.map((f) => (
                  <div key={f.title} className="glass lume rounded-xl p-6">
                    <span aria-hidden className="block h-[2px] w-10 rounded-full bg-cyan/50" />
                    <h3 className="mt-5 font-serif text-[1.15rem] leading-tight text-ink">{f.title}</h3>
                    <p className="mt-2 font-sans text-[14px] leading-relaxed text-ink-2">{f.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ---- 3 · Three controls ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <div>
                <Eyebrow>The harness</Eyebrow>
                <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
                  Three integrated controls. Each necessary. None sufficient alone.
                </h2>
                <p className="mt-6 max-w-[50ch] font-sans text-body-lg text-ink-2">
                  Not a rule engine. Not an audit log. Three controls that{' '}
                  <span className="text-ink">compose</span>: a constrained action
                  vocabulary, a pre-execution gate, and a human authority surface.{' '}
                  <span className="text-mint">Remove any one and the others break.</span>
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
                  alt="An AI agent node on the left sends action proposals through a luminous validation gate panel — three pass through, one is blocked in orange."
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

          {/* Three control cards */}
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
                    <p className={`font-mono text-[10px] uppercase tracking-[0.22em] ${l.tint === 'mint' ? 'text-mint' : 'text-cyan'}`}>
                      {l.n}
                    </p>
                    <h3 className="mt-3 font-serif text-[1.25rem] leading-tight text-ink">{l.name}</h3>
                    <p className={`mt-1 font-mono text-[10px] uppercase tracking-[0.14em] ${l.tint === 'mint' ? 'text-mint/60' : 'text-cyan/60'}`}>
                      {l.label}
                    </p>
                    <p className="mt-5 flex-1 font-sans text-body text-ink-2">{l.body}</p>
                    <p className={`mt-5 border-t pt-5 font-serif text-[1rem] italic leading-snug ${l.tint === 'mint' ? 'border-mint/15 text-mint/80' : 'border-cyan/15 text-cyan/80'}`}>
                      {l.insight}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 4 · Model safety vs. harness safety (sphere appears here) ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div>
                <Eyebrow>The distinction</Eyebrow>
                <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
                  The model decides. The harness controls whether it can act.
                </h2>
                <p className="mt-7 max-w-[50ch] font-sans text-body-lg text-ink-2">
                  Constitutional AI, RLHF, and instruction-following make a model{' '}
                  <span className="text-ink">less likely</span> to propose a harmful action.
                  But "less likely" is not{' '}
                  <span className="text-mint">"structurally impossible."</span>{' '}
                  A harness operates at a different layer entirely — it does not depend on
                  the model making the right choice. It enforces that the{' '}
                  <span className="text-ink">wrong choice cannot execute</span>.
                </p>
                <Reveal delay={0.1}>
                  <GlassCard accent className="mt-8 p-7">
                    <p className="font-serif text-[clamp(1.1rem,1.8vw,1.35rem)] leading-snug text-ink">
                      The harness doesn't make the agent smarter. It{' '}
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
              The combined regulatory regime points toward a harness.
            </h2>
            <p className="mt-6 max-w-[56ch] font-sans text-body-lg text-ink-2">
              No single rule mandates one by name. But SR 11-7, ECOA, FCA Consumer Duty,
              EU AI Act, and RBI FREE-AI collectively require{' '}
              <span className="text-ink">ex-ante control</span>,{' '}
              <span className="text-ink">per-decision explainability</span>, and{' '}
              <span className="text-mint">human oversight</span>. A safe agent harness
              is the architecture most cleanly aligned with what that combined regime demands.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                reg: 'SR 11-7 (US)',
                point: 'Models validated before use + effective challenge. The pre-execution gate is a control on the output path — complementary to, not a discharge of, independent model validation.',
              },
              {
                reg: 'ECOA / Reg B (US)',
                point: '"The model said no" is not an adverse-action reason (CFPB Circular 2022-03). Krim-Ledger carries structured decision rationale — policy applied, features used — with every decline.',
              },
              {
                reg: 'FDCPA / TCPA (US)',
                point: 'Contact hours, consent status, DNC compliance must be checked before the call is made. Pre-execution is the only architecture that enforces this reliably at scale.',
              },
              {
                reg: 'FCA Consumer Duty (UK)',
                point: 'Outcomes-based regulation: banks must evidence good outcomes. The audit ledger is the evidence — action, reasoning, and result permanently on record.',
              },
              {
                reg: 'EU AI Act (2024–2026)',
                point: 'Credit decisioning is high-risk (Art. 6). Art. 12 requires decision logging; Art. 14 requires meaningful human oversight. Penalties: up to €35M or 7% of global turnover.',
              },
              {
                reg: 'RBI FREE-AI (India, 2025)',
                point: '7 Sutras, 6 Pillars, 26 recommendations on responsible AI in lending — explainability, data localisation, and ongoing monitoring requirements throughout.',
              },
            ].map((r) => (
              <Reveal key={r.reg}>
                <div className="glass-quiet lume h-full rounded-lg p-6">
                  <span aria-hidden className="block h-[2px] w-10 rounded-full bg-mint/50" />
                  <h3 className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-mint">{r.reg}</h3>
                  <p className="mt-2.5 font-sans text-[14px] leading-relaxed text-ink-2">{r.point}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 6 · Close ---- */}
        <Section hairline>
          <Reveal>
            <div className="glass mx-auto max-w-[720px] p-10 text-center md:p-14">
              <span aria-hidden className="mx-auto block h-[2px] w-12 rounded-full bg-gradient-to-r from-mint to-cyan" />
              <h2 className="mt-8 font-serif text-display-3 leading-tight text-ink">
                See the harness run on your data.
              </h2>
              <p className="mx-auto mt-5 max-w-[44ch] font-sans text-body text-ink-2">
                A 30-day proof-of-value on your collections book: what the gate blocks,
                why, and what the audit trail looks like under examiner scrutiny.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-5">
                <CTA href={DEMO_HREF}>Book a demo</CTA>
                <CTA href="/research/world-lending-model" variant="secondary">
                  The World Lending Model
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
