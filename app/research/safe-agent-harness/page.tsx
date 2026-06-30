/**
 * /research/safe-agent-harness
 *
 * Editorial research report layout:
 * — raw oversized stat strip (no glass box)
 * — consequence-led failure descent (gold label first, staggered)
 * — vertical control journey (giant outlined numerals, alternating)
 * — full-viewport distinction moment (one sentence, silence)
 * — regulatory ledger table (not card grid)
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
    'A safe agent harness is the operational control layer that wraps an autonomous AI agent with three integrated controls: a constrained action vocabulary, a pre-execution validation gate, and a human command surface. This is the architecture the combined regulatory regime most cleanly rewards for deploying AI in a regulated bank.',
  alternates: { canonical: 'https://krim.ai/research/safe-agent-harness' },
  openGraph: {
    title: 'Safe Agent Harness · Krim Research',
    description:
      'The operational control layer that wraps AI agents — constraining what they can do, gating what they propose, and keeping a human in command.',
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
  { n: '01', name: 'Constrained vocabulary', label: 'Kriya',       tint: 'mint' as Tint, fact: '500+ credit-native primitives across 20+ domains'            },
  { n: '02', name: 'Pre-execution gate',     label: 'Krim-Nyāya', tint: 'mint' as Tint, fact: '33 validators clear every action before it fires'            },
  { n: '03', name: 'Human command surface',  label: 'Kupa',        tint: 'cyan' as Tint, fact: 'One screen to view, pause, or override any in-flight action' },
]

const LAYERS = [
  {
    n: '01', name: 'Constrained action space', label: 'Kriya', tint: 'mint' as Tint,
    verdict: 'If it is not in the vocabulary, it cannot fire.',
    points: [
      '500+ credit-native primitives across 20+ domains.',
      'Each primitive is the smallest validatable unit: bureau pulls, Reg-B adverse-action notices, collections calls checked against FDCPA.',
      'No path exists for an action outside the vocabulary.',
    ],
    insight: 'The vocabulary is the boundary, and the boundary is what makes the capability provable.',
  },
  {
    n: '02', name: 'Pre-execution gate', label: 'Krim-Nyāya', tint: 'mint' as Tint,
    verdict: 'Every action clears the gate before it executes, or it does not execute.',
    points: [
      '33 validators clear every action before it fires: policy compliance, consent, regulatory context, and data quality. Fast-path checks run inline; signals requiring external verification are pre-fetched before the action is enqueued.',
      'A violated rule blocks outright — not retried, not warned through.',
      'Uncertainty escalates to a human with the rule and reason in plain language.',
    ],
    insight: 'Built on Navya-Nyāya predicate logic. Whatever the model proposes, no non-compliant action can execute on the Krim action path. The gate handles individual legality — Kupa\'s workforce view handles the population-level picture.',
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
    body: 'A collections agent optimises for fastest cure rate. Over six months it under-contacts borrowers in minority neighbourhoods. Every individual action is compliant; the population-level pattern is not. That is what Kupa\'s workforce view catches.',
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
    point: 'Contact hours, consent status, and DNC compliance must be confirmed before the call is placed. Pre-execution is the architecture best aligned with this requirement — the check happens before the call, not as an after-the-fact audit.',
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
  {
    slug: 'the-cost-of-being-wrong',
    title: 'The cost of being wrong',
    sub: 'Why statutory exposure at portfolio scale compounds rather than caps.',
  },
  {
    slug: 'audit-after-the-fact-is-a-confession',
    title: 'Audit after the fact is a confession',
    sub: 'A record written after the harm is evidence for the regulator, not for you.',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SafeAgentHarnessPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <SiteHeader />
      <main className="relative z-10">

        {/* ── 1 · Hero ── */}
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
                Constrains what agents can do, gates every action before it fires, and keeps{' '}
                <span className="text-mint">your risk team in command</span>.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
                <CTA href={DEMO_HREF}>Book a demo</CTA>
                <CTA href="/krimos/kendra" variant="secondary">See it inside Kendra</CTA>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ── 1b · Architecture index — three glass cards ── */}
        <Section>
          <Reveal>
            <p className="mb-7 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3">The three controls</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {SNAPSHOT.map((s) => {
                const rgb = s.tint === 'mint' ? '0,255,178' : '57,214,255'
                return (
                  <div
                    key={s.n}
                    className="overflow-hidden rounded-[18px] p-px"
                    style={{
                      background: `linear-gradient(145deg, rgba(${rgb},0.40) 0%, rgba(${rgb},0.08) 50%, rgba(255,255,255,0.04) 100%)`,
                    }}
                  >
                    <div
                      className="h-full rounded-[17px] p-7"
                      style={{
                        background: `radial-gradient(ellipse at 20% 0%, rgba(${rgb},0.09) 0%, transparent 60%), rgba(10,11,15,0.88)`,
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                      }}
                    >
                      <p className={`font-mono text-[10px] uppercase tracking-[0.22em] ${s.tint === 'mint' ? 'text-mint/55' : 'text-cyan/55'}`}>{s.n}</p>
                      <p className="mt-5 font-serif text-[1.35rem] leading-tight text-ink">{s.name}</p>
                      <p className={`mt-1.5 font-mono text-[9px] uppercase tracking-[0.18em] ${s.tint === 'mint' ? 'text-mint/50' : 'text-cyan/50'}`}>{s.label}</p>
                      <p className="mt-5 border-t border-white/[0.06] pt-5 font-sans text-[13px] leading-relaxed text-ink-2">{s.fact}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </Section>

        {/* ── 2 · The problem — full-width consequence-led descent ── */}
        <Section hairline>
          <Reveal>
            <Eyebrow>The problem</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
              A bare agent in a regulated bank is a liability before it is a feature.
            </h2>
            <p className="mt-7 max-w-[58ch] font-sans text-body-lg text-ink-2">
              A raw model with a toolkit can message a borrower outside FDCPA hours,
              disclose a balance to the wrong party, or decline an applicant with no
              legible reason. None of this needs intent. It only needs the wrong action
              to be structurally possible. Statutory exposure scales with volume and
              compounds rather than caps.
            </p>
          </Reveal>

          {/* Failure bands — consequence FIRST, staggered descent */}
          <div className="mt-14 space-y-4">
            {FAILURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1}>
                <div
                  className="rounded-xl border border-white/[0.07] p-7 md:p-9"
                  style={{
                    background: 'rgba(10,11,15,0.6)',
                    backdropFilter: 'blur(12px)',
                    marginLeft: `${i * 4}%`,
                  }}
                >
                  {/* Consequence label — the first thing you read */}
                  <p className="flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.2em] text-gold">
                    <span aria-hidden className="block h-3 w-[2px] shrink-0 rounded-full bg-gold" />
                    {f.consequence}
                  </p>
                  {/* Title */}
                  <h3 className="mt-4 font-serif text-[1.35rem] leading-tight text-ink">{f.title}</h3>
                  {/* Body */}
                  <p className="mt-3 max-w-[70ch] font-sans text-[15px] leading-relaxed text-ink-2">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ── Pull quote transition ── */}
        <Section>
          <Reveal>
            <figure className="mx-auto max-w-[46ch] text-center">
              <span aria-hidden className="mx-auto mb-8 block h-[2px] w-10 rounded-full bg-gold/50" />
              <p
                className="font-serif leading-[1.2] text-ink"
                style={{ fontSize: 'clamp(1.5rem,2.8vw,2.2rem)' }}
              >
                An agent without a harness is a liability.
              </p>
            </figure>
          </Reveal>
        </Section>

        {/* ── 3 · Control by design — vertical numbered journey ── */}
        <Section hairline>
          {/* Section intro + gate image */}
          <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div>
                <Eyebrow>Control by design</Eyebrow>
                <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
                  Three controls. Remove one and the architecture fails.
                </h2>
                <p className="mt-6 max-w-[50ch] font-sans text-body-lg text-ink-2">
                  Three controls that only work as one. A constrained vocabulary limits
                  what the agent can propose. The validation gate clears it before it
                  fires. The command surface keeps authority with your risk team.
                  Remove any one and the others break.
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
                  priority
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

          {/* Vertical journey — three numbered bands */}
          <div className="mt-20">
            {LAYERS.map((l, i) => {
              const isFlipped = i === 1
              const rgb = l.tint === 'mint' ? '0,255,178' : '57,214,255'

              const numberEl = (
                <div className="flex items-start justify-center md:justify-start">
                  <span
                    aria-hidden
                    className="select-none font-mono font-light leading-[0.85] text-transparent pointer-events-none"
                    style={{
                      fontSize: 'clamp(5rem,11vw,9rem)',
                      WebkitTextStroke: `1.5px rgba(${rgb},0.38)`,
                    }}
                  >
                    {l.n}
                  </span>
                </div>
              )

              const contentEl = (
                <div
                  className="rounded-xl border border-white/[0.07] p-7 md:p-9"
                  style={{
                    background: `radial-gradient(ellipse at 10% 0%, rgba(${rgb},0.07) 0%, transparent 55%), rgba(10,11,15,0.78)`,
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                  }}
                >
                  {/* Identity */}
                  <div className="flex items-baseline gap-3">
                    <p className="font-serif text-[1.1rem] leading-tight text-ink">{l.name}</p>
                    <p className={`font-mono text-[10px] uppercase tracking-[0.18em] ${l.tint === 'mint' ? 'text-mint/60' : 'text-cyan/60'}`}>{l.label}</p>
                  </div>

                  {/* Verdict */}
                  <p
                    className={`mt-5 border-l-[3px] pl-6 font-serif leading-[1.15] text-ink ${l.tint === 'mint' ? 'border-mint/35' : 'border-cyan/35'}`}
                    style={{ fontSize: 'clamp(1.35rem,2.2vw,1.85rem)' }}
                  >
                    {l.verdict}
                  </p>

                  {/* Proof bullets */}
                  <ul className="mt-7 space-y-4">
                    {l.points.map((pt, pi) => (
                      <li key={pi} className="flex items-start gap-3.5">
                        <span
                          aria-hidden
                          className={`mt-[7px] block h-[10px] w-[2px] shrink-0 rounded-full ${l.tint === 'mint' ? 'bg-mint/55' : 'bg-cyan/55'}`}
                        />
                        <span className="font-sans text-[15px] leading-relaxed text-ink-2">{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Insight */}
                  <p className={`mt-7 font-serif text-[1rem] italic leading-relaxed ${l.tint === 'mint' ? 'text-mint/65' : 'text-cyan/65'}`}>
                    {l.insight}
                  </p>
                </div>
              )

              return (
                <Reveal key={l.n} delay={0}>
                  <div
                    className={`grid items-start gap-8 border-t border-white/[0.06] py-14 md:gap-12 md:py-16 ${
                      isFlipped ? 'md:grid-cols-[1fr_0.32fr]' : 'md:grid-cols-[0.32fr_1fr]'
                    }`}
                  >
                    {isFlipped ? <>{contentEl}{numberEl}</> : <>{numberEl}{contentEl}</>}
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Section>

        {/* ── 4 · The distinction — full-viewport silence ── */}
        <Section hairline>
          <Reveal>
            <div className="flex min-h-[78vh] flex-col items-center justify-center text-center">
              <Eyebrow>The layer below the model</Eyebrow>
              <h2
                className="mt-8 font-serif text-ink"
                style={{ fontSize: 'clamp(2.2rem,5.5vw,4.2rem)', lineHeight: 1.06, maxWidth: '16ch' }}
              >
                The model decides.{' '}
                <span className="text-mint">The harness controls whether it can act.</span>
              </h2>
              <p className="mt-8 max-w-[32ch] font-serif italic text-[1.15rem] leading-relaxed text-mint/80">
                Better is not the same as safe.
              </p>
            </div>
          </Reveal>
        </Section>

        {/* ── 4b · The distinction — explanatory ── */}
        <Section hairline>
          <Reveal>
            <Eyebrow>The distinction</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              What a better model does not fix.
            </h2>
          </Reveal>
          <div className="mt-12 grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div>
                <p className="max-w-[50ch] font-sans text-body-lg text-ink-2">
                  Constitutional AI, RLHF, and instruction-following make a model less
                  likely to propose a harmful action. A harness operates at a different
                  layer entirely. It does not depend on the model making the right choice;
                  it enforces that no non-compliant action can execute on the Krim action
                  path. That is also why a record written before the action, rather than
                  reconstructed after it, is the one a regulator can trust.
                </p>
                <GlassCard accent className="mt-8 p-7">
                  <p className="font-serif text-[clamp(1.1rem,1.8vw,1.35rem)] leading-snug text-ink">
                    The harness does not make the agent smarter. It{' '}
                    <span className="text-mint">controls what the agent can act on</span>.
                    Those are different problems, solved at different layers. Conflating
                    them is how AI deployments fail their risk committee.
                  </p>
                  <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
                    The layer below the model
                  </p>
                </GlassCard>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <HarnessVideo maxWidth="440px" />
            </Reveal>
          </div>
        </Section>

        {/* ── 5 · Regulatory alignment — ledger table ── */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Regulatory alignment</Eyebrow>
            <h2 className="mt-4 max-w-[26ch] font-serif text-display-1 text-ink">
              The combined regime points toward a harness.
            </h2>
            <p className="mt-6 max-w-[56ch] font-sans text-body-lg text-ink-2">
              No single rule names one by name. But SR 11-7, ECOA, FCA Consumer Duty,
              FDCPA, and RBI FREE-AI collectively demand ex-ante control, per-decision
              explainability, and human oversight. Pre-execution validation is the
              discipline that answers all three. Audit after the fact only confesses to
              the harm.
            </p>
          </Reveal>

          {/* Ledger table */}
          <Reveal delay={0.1}>
            <div
              className="mt-12 overflow-hidden rounded-xl border border-white/[0.08]"
              style={{
                background: 'rgba(10,11,15,0.80)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              <div className="hidden grid-cols-[180px_60px_1fr] gap-x-8 border-b border-white/[0.06] px-7 py-4 md:grid">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">Regulation</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">Jur.</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">What it demands · What the harness provides</p>
              </div>
              <div className="divide-y divide-white/[0.06]">
                {REGS.map((r) => (
                  <Reveal key={r.reg}>
                    <div className="group grid grid-cols-1 gap-3 px-7 py-7 transition-colors hover:bg-white/[0.018] md:grid-cols-[180px_60px_1fr] md:gap-x-8 md:items-start">
                      {/* Regulation */}
                      <div>
                        <p className="font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-mint">{r.reg}</p>
                        <span className="mt-1.5 inline-block rounded border border-white/10 px-2 py-0.5 font-mono text-[10px] text-ink-3">{r.region}</span>
                      </div>
                      {/* Jurisdiction spacer on mobile — hidden, handled above */}
                      <div className="hidden md:block" />
                      {/* Verdict + detail */}
                      <div>
                        <p className="font-serif text-[1.1rem] leading-snug text-ink">{r.meaning}</p>
                        <p className="mt-2 font-sans text-[13px] leading-relaxed text-ink-2">{r.point}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ── 6 · Further reading ── */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Further reading</Eyebrow>
          </Reveal>
          <div className="mt-8 divide-y divide-white/[0.06]">
            {ARTICLES.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.07}>
                <Link href={`/insights/${a.slug}`} className="group block py-6 transition-colors hover:opacity-80">
                  <h3 className="font-serif text-[1.2rem] leading-snug text-ink">{a.title}</h3>
                  <p className="mt-2 font-sans text-[13px] leading-relaxed text-ink-3">{a.sub}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ── 7 · Close ── */}
        <Section hairline>
          <Reveal>
            <div className="glass mx-auto max-w-[680px] p-10 text-center md:p-12">
              <span aria-hidden className="mx-auto block h-[2px] w-10 rounded-full bg-gradient-to-r from-mint to-cyan" />
              <h2 className="mt-7 font-serif text-display-3 leading-tight text-ink">
                See the harness run on your data.
              </h2>
              <div className="mt-8 flex flex-wrap justify-center gap-5">
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
