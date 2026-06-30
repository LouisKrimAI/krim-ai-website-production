/**
 * /research/safe-agent-harness
 *
 * The Safe Agent Harness — the operational control layer that wraps every AI
 * co-worker Krim deploys. Three integrated controls: constrained action space
 * (Kriya), pre-execution gate (Krim-Nyāya), and human-in-command oversight
 * (Kupa). Together they make autonomous lending agents safe enough to ship
 * inside a regulated bank.
 *
 * VOICE: expert-facing, confident, architectural. Not a sales pitch — a clear
 * technical argument for why the harness is the precondition, not a feature.
 * No invented customers, metrics, or deployment claims.
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Reveal from '@/components/Reveal'
import HarnessGraphic from '@/components/home/HarnessGraphic'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Safe Agent Harness',
  description:
    'A safe agent harness is the operational control layer that wraps autonomous AI agents with three integrated controls: a constrained action space, a pre-execution validation gate, and a human-in-command oversight surface. It is the architectural precondition for deploying autonomous AI in a regulated bank — and it is what Krim builds around every Karta co-worker.',
  alternates: { canonical: 'https://krim.ai/research/safe-agent-harness' },
  openGraph: {
    title: 'Safe Agent Harness · Krim Research',
    description:
      'The operational control layer that wraps autonomous AI agents — constraining what they can do, gating what they propose, recording what they did. The precondition for deploying AI agents inside a regulated bank.',
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
    body: 'Agents operate only through Kriya — 500+ credit-native primitives: pull a bureau report, send a Reg-B adverse-action notice, schedule a collections call within FDCPA hours, price a facility to policy. Each primitive is the smallest unit that can be independently validated and attributed. Agents cannot call arbitrary tools, invoke raw APIs, or compose novel action types. The vocabulary is the boundary.',
    insight: 'The constrained action space is not a limitation on agent capability — it is what makes agent capability provable. An agent that can do anything cannot be validated. An agent that can only do things the bank has pre-approved can be.',
  },
  {
    n: '02',
    name: 'Pre-execution gate',
    label: 'Krim-Nyāya',
    tint: 'mint' as const,
    body: 'Before any Kriya action fires, it passes through Krim-Nyāya: 33 validators check the proposed action against your policy, fair-lending rules, consent records, regulatory context, and data quality. The gate runs synchronously in the action path. Deny by default. If a rule is violated, the action is blocked — not retried, not routed to a slower queue, not allowed with a warning. Blocked. If the gate is uncertain, it escalates to a human with the rule and reason in plain language.',
    insight: '"Validated before it acts" is an architectural claim, not a model claim. Krim-Nyāya does not depend on the LLM making good choices. It enforces that the wrong choice cannot execute — regardless of what the model proposes.',
  },
  {
    n: '03',
    name: 'Human always in command',
    label: 'Kupa',
    tint: 'cyan' as const,
    body: 'Kupa is the command surface the institution’s operations, compliance, and risk teams own. See every in-flight action live. Set policies, contact strategies, and escalation rules. Step in: pause any agent or campaign in one click, reroute blocked actions, override individual decisions. Prove: audit any action in the ledger — the policy it applied, the features that drove it, the validation result, the outcome. Your independent second line owns this surface. Krim does not.',
    insight: 'The human is not a reviewer of last resort. The human is the authority. The harness is the mechanism that makes that authority real in practice — not aspirational in governance documents.',
  },
]

const FAILURES = [
  {
    title: 'Hallucinated reasons',
    body: 'An agent declines a borrower and, when asked why, generates a post-hoc explanation that contradicts the loan file. No structured decision trail. No attributed rationale. The regulator asks; the bank has no answer. ECOA / Reg B adverse-action obligation: violated.',
  },
  {
    title: 'Consent violations',
    body: 'An agent calls a borrower at 11 PM on a Saturday. The FDCPA calling-hours constraint was in the rulebook but not in the action path. No pre-execution check; the call went through. One statutory damages award: $500–$1,500. At scale: class action.',
  },
  {
    title: 'Emergent strategy harm',
    body: 'A collections agent optimises for fastest cure-rate. Over six months, it systematically under-contacts borrowers in minority neighborhoods. Each individual action is compliant. The population-level pattern is a fair-lending finding. Post-hoc audit discovers it; the violation has already accumulated.',
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
          <div className="mx-auto max-w-[860px] text-center">
            <Reveal>
              <Eyebrow>Research — Safe Agent Harness</Eyebrow>
              <h1 className="mt-5 font-serif text-display-hero leading-[1.04] text-ink">
                The harness that makes autonomous agents safe to deploy.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[54ch] font-sans text-body-lg text-ink-2">
                An AI agent without a harness can call anything, do anything. In a regulated
                bank, that is not autonomy — it is liability. The safe agent harness is the
                operational control layer that wraps every AI co-worker:{' '}
                <span className="text-mint">constraining what they can do, gating what they
                propose, recording what they did, and keeping a human in command.</span>
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                <CTA href={DEMO_HREF}>Book a demo</CTA>
                <CTA href="/krimos/kendra" variant="secondary">
                  See it in the runtime
                </CTA>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · The bare agent problem ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow>The problem</Eyebrow>
                <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
                  A bare agent in a regulated bank is a liability, not a feature.
                </h2>
                <p className="mt-7 font-sans text-body-lg text-ink-2">
                  A bare agent — built from a raw model and a toolkit — operates without
                  operational boundaries. It can call any tool, in any sequence, with any
                  parameters. In a test environment, that is versatility. In a live lending
                  operation, it means an agent can{' '}
                  <span className="text-ink">
                    send a collection message outside FDCPA contact hours, disclose a balance
                    to a third party, quote a rate that contradicts agreed terms, or decline
                    an applicant without a legible reason.
                  </span>
                </p>
                <p className="mt-5 font-sans text-body-lg text-ink-2">
                  None of these need to be intentional. They just need to be{' '}
                  <span className="text-mint">structurally possible</span> — and without a
                  harness, they are.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="flex flex-col gap-4">
                {FAILURES.map((f) => (
                  <GlassCard key={f.title} className="p-6 md:p-7">
                    <span aria-hidden className="block h-[2px] w-10 rounded-full bg-cyan/50" />
                    <h3 className="mt-5 font-serif text-[1.2rem] leading-tight text-ink">{f.title}</h3>
                    <p className="mt-2.5 font-sans text-[14px] leading-relaxed text-ink-2">{f.body}</p>
                  </GlassCard>
                ))}
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ---- 3 · The three layers ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1.1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow>The harness</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  Three integrated controls. Each necessary. None sufficient alone.
                </h2>
                <p className="mt-6 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  Not a single rule engine or a single audit log. Three controls that compose:
                  a constrained action space, a pre-execution gate, and a human authority
                  surface. Remove any one and the others break.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="relative mx-auto aspect-square w-full max-w-[460px]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(57,214,255,0.10) 0%, rgba(0,255,178,0.04) 42%, transparent 70%)' }}
                />
                <HarnessGraphic className="relative h-full w-full" />
              </div>
            </Reveal>
          </div>

          <div className="mt-14 flex flex-col gap-8">
            {LAYERS.map((l, i) => (
              <Reveal key={l.n} delay={i * 0.1}>
                <div className="glass lume relative overflow-hidden rounded-xl p-8 md:p-10">
                  {/* colour rail */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute inset-y-4 left-0 w-[3px] rounded-full ${
                      l.tint === 'mint' ? 'bg-mint/70' : 'bg-cyan/70'
                    }`}
                  />
                  <div className="grid gap-8 pl-2 md:grid-cols-[auto_1fr_1fr] md:items-start">
                    {/* number + name */}
                    <div className="min-w-[160px]">
                      <p className={`font-mono text-[10px] uppercase tracking-[0.2em] ${l.tint === 'mint' ? 'text-mint' : 'text-cyan'}`}>
                        {l.n}
                      </p>
                      <h3 className="mt-2 font-serif text-[1.4rem] leading-tight text-ink">
                        {l.name}
                      </h3>
                      <p className={`mt-1 font-mono text-[11px] uppercase tracking-[0.14em] ${l.tint === 'mint' ? 'text-mint/70' : 'text-cyan/70'}`}>
                        {l.label}
                      </p>
                    </div>
                    {/* body */}
                    <p className="font-sans text-body text-ink-2 md:max-w-[42ch]">
                      {l.body}
                    </p>
                    {/* insight */}
                    <p className="border-l border-white/[0.08] pl-6 font-serif text-[1.05rem] italic leading-snug text-ink-2">
                      {l.insight}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 4 · Model safety vs harness safety ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow>Model safety vs. harness safety</Eyebrow>
                <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
                  The model decides. The harness controls whether it can act.
                </h2>
                <p className="mt-7 font-sans text-body-lg text-ink-2">
                  Constitutional AI, RLHF, and instruction-following make a model{' '}
                  <span className="text-ink">less likely</span> to propose a harmful action.
                  But "less likely" is not "structurally impossible." A safe agent harness
                  operates at a different layer: it does not depend on the model making
                  the right choice. It enforces that{' '}
                  <span className="text-mint">the wrong choice cannot execute</span>.
                </p>
                <p className="mt-5 font-sans text-body-lg text-ink-2">
                  Belt and braces. The model is the intelligence. The harness is the control.
                  In a regulated bank, you need both — and most vendors only have the first.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard accent className="p-8 md:p-10">
                <p className="font-serif text-[clamp(1.25rem,2.2vw,1.6rem)] leading-snug text-ink">
                  The harness doesn’t make the agent smarter. It makes the agent safe. Those
                  are different problems, solved at different layers. Conflating them is how
                  AI deployments fail their risk committee.
                </p>
                <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
                  Architecture, not model quality
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 5 · Regulatory alignment ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Regulatory alignment</Eyebrow>
            <h2 className="mt-4 max-w-[26ch] font-serif text-display-1 text-ink">
              The combined regulatory regime already describes a harness.
            </h2>
            <p className="mt-6 max-w-[58ch] font-sans text-body-lg text-ink-2">
              No single rule mandates a pre-execution harness by name. But SR 11-7, ECOA,
              FCA Consumer Duty, EU AI Act, and RBI FREE-AI collectively demand ex-ante
              control, per-decision explainability, ongoing monitoring, and human oversight.
              A safe agent harness is the operational implementation most cleanly aligned
              with that combined requirement.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { reg: 'SR 11-7 (US)', point: 'Models validated before use + effective challenge. The gate is a control on the output path — complementary to, not a discharge of, independent model validation.' },
              { reg: 'ECOA / Reg B (US)', point: 'Adverse-action reasons required. "The model said no" is not a reason (CFPB Circular 2022-03). The ledger carries the structured decision rationale with every decline.' },
              { reg: 'FDCPA / TCPA (US)', point: 'Contact hours, consent status, DNC compliance — all must be checked before the call is made. Pre-execution is the only architecture that reliably enforces this at scale.' },
              { reg: 'FCA Consumer Duty (UK)', point: 'Outcomes-based regulation: banks must evidence good outcomes. The audit ledger is the evidence — action, reasoning, result, on record.' },
              { reg: 'EU AI Act (2024–2026)', point: 'Credit decisioning is high-risk (Art. 6). Art. 12 requires logging every decision; Art. 14 requires meaningful human oversight. Penalties: up to €35M or 7% of global turnover.' },
              { reg: 'RBI FREE-AI (India, 2025)', point: '7 Sutras, 6 Pillars, 26 recommendations covering responsible AI in lending, with data localisation expectations and explainability requirements.' },
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

        {/* ---- 6 · How Krim implements it ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow tone="dim">The implementation</Eyebrow>
                <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
                  Three controls. Integrated. Running the whole lifecycle.
                </h2>
                <p className="mt-7 font-sans text-body-lg text-ink-2">
                  Kriya is the vocabulary every Karta co-worker operates within — 500+
                  credit-native actions, each pre-validated and attributed. Krim-Nyāya is the
                  gate that clears each action before it fires — 33 validators, deny by
                  default. Kupa is the command surface that keeps your teams in authority
                  over the AI workforce, at every moment.
                </p>
                <p className="mt-5 font-sans text-body-lg text-ink-2">
                  These are not three products. They are three layers of one control system.
                  The gate makes the ledger worth reading. The ledger makes Kupa’s oversight
                  meaningful. Kupa makes the gate’s rules tuneable and owned by the right people.
                </p>
                <div className="mt-9 flex flex-wrap gap-4">
                  <CTA href="/krimos/kriya" variant="secondary">
                    Explore Kriya
                  </CTA>
                  <CTA href="/krimos/kendra" variant="secondary">
                    Explore Kendra
                  </CTA>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard className="p-8 md:p-10">
                <p className="font-serif text-[clamp(1.25rem,2.2vw,1.6rem)] leading-snug text-ink">
                  Most systems implement one of these three controls. Incumbents audit after.
                  Point tools validate their own actions. Research systems log choices
                  offline. Krim implements all three, integrated, across the whole lifecycle
                  — from origination to collections.
                </p>
                <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-cyan">
                  Integration is the design
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 7 · The frontier ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow tone="dim">The frontier</Eyebrow>
                <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
                  The harness is the precondition. The World Lending Model is the dividend.
                </h2>
                <p className="mt-7 font-sans text-body-lg text-ink-2">
                  A pre-execution harness on a validated runtime produces something that
                  doesn’t exist anywhere else: a complete, attributed, cross-lifecycle
                  record of every action, the choice set it was selected from, the reasoning,
                  and the outcome. That substrate is what a model of how lending actually
                  behaves can be built from.
                </p>
                <p className="mt-5 font-sans text-body-lg text-ink-2">
                  The harness makes the World Lending Model possible. And the World Lending
                  Model is what makes the harness more than a compliance tool — it makes it
                  a{' '}
                  <span className="text-mint">competitive intelligence engine</span>.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard className="p-8 md:p-10">
                <p className="font-sans text-body-lg text-ink-2">
                  The open questions on this frontier: how a learned model of an operation
                  and a formal validator compose without drifting from the rules; how a
                  population-level fairness harness gates model versions (not just individual
                  actions); how pre-execution proof stays fast enough to sit in front of
                  every action at scale. These are the hard problems we are building on.
                </p>
                <div className="mt-8">
                  <CTA href="/research/world-lending-model" variant="secondary">
                    The World Lending Model
                  </CTA>
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 8 · Close ---- */}
        <Section hairline>
          <Reveal>
            <div className="glass mx-auto max-w-[760px] p-10 text-center md:p-14">
              <span aria-hidden className="mx-auto block h-[2px] w-12 rounded-full bg-gradient-to-r from-mint to-cyan" />
              <h2 className="mt-8 font-serif text-display-3 leading-tight text-ink">
                See the harness run on your data.
              </h2>
              <p className="mx-auto mt-5 max-w-[48ch] font-sans text-body text-ink-2">
                A 30-day proof-of-value on your collections book shows you exactly what
                the gate blocks, why, and what the audit trail looks like under examiner
                scrutiny.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-5">
                <CTA href={DEMO_HREF}>Book a demo</CTA>
                <CTA href="/krimos" variant="secondary">Explore KrimOS</CTA>
              </div>
            </div>
          </Reveal>
        </Section>

      </main>
      <SiteFooter />
    </>
  )
}
