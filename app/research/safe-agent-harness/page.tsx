/**
 * /research/safe-agent-harness
 *
 * Reads as an ease-in explainer, top to bottom:
 * — hero: the promise
 * — what is an agent harness? plain definition + the three things it does
 * — the problem: why a bare agent is a liability (consequence-led descent)
 * — how it works: the three controls in depth (Kriya · Krim-Nyāya · Kupa)
 * — the distinction: why a better model is not enough
 * — regulatory ledger table, further reading, close
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Reveal from '@/components/Reveal'
import HarnessVideo from '@/components/HarnessVideo'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'
import { IMAGE_MANIFEST } from '@/lib/image-manifest'

const GATE = IMAGE_MANIFEST['/images/harness/harness-gate.webp']

export const metadata: Metadata = {
  // Plain title — the layout template appends "— Krim · Safe Superintelligence";
  // the old "· Krim Research" suffix double-branded the tab.
  title: 'Safe Agent Harness',
  description:
    'A safe agent harness is the control layer around an autonomous AI agent: a constrained action vocabulary, a pre-execution validation gate, and a human command surface, so every action is checked before it can fire.',
  alternates: { canonical: 'https://www.krim.ai/research/safe-agent-harness' },
  openGraph: {
    title: 'Safe Agent Harness · Krim Research',
    description:
      'The operational control layer that wraps AI agents — constraining what they can do, gating what they propose, and keeping a human in command.',
    url: 'https://www.krim.ai/research/safe-agent-harness',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Research', item: 'https://www.krim.ai/research' },
    { '@type': 'ListItem', position: 3, name: 'Safe Agent Harness', item: 'https://www.krim.ai/research/safe-agent-harness' },
  ],
}

const DEMO_HREF = '/contact'

type Tint = 'mint' | 'cyan'

// ── Data ─────────────────────────────────────────────────────────────────────

const HARNESS_PARTS = [
  {
    k: 'Constrain', tint: 'mint' as Tint,
    title: 'It limits what the agent can do.',
    body: 'The agent can only take actions you have approved in advance. Anything outside that set is not possible.',
  },
  {
    k: 'Check', tint: 'mint' as Tint,
    title: 'It checks every action first.',
    body: 'Each action is tested against your policy and the law before it happens. If it breaks a rule, it is stopped before it can fire.',
  },
  {
    k: 'Command', tint: 'cyan' as Tint,
    title: 'It keeps a person in command.',
    body: 'Your team watches every action live and can pause or overrule any agent in one click.',
  },
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
    insight: 'The vocabulary is the boundary, and that boundary is what makes each action provable before it runs.',
  },
  {
    n: '02', name: 'Pre-execution gate', label: 'Krim-Nyāya', tint: 'mint' as Tint,
    verdict: 'Every action clears the gate before it executes, or it does not execute.',
    points: [
      '33 validators clear every action before it fires: policy compliance, consent, regulatory context, and data quality.',
      'A violated rule blocks outright, with no retry and no warn-through.',
      'Uncertainty escalates to a human with the rule and reason in plain language.',
    ],
    insight: 'Built on Navya-Nyāya predicate logic. Whatever the model proposes, an action that fails the gate does not execute on the Krim action path.',
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
    body: 'An agent calls a borrower at 11 PM. The FDCPA contact-hours rule lived in the rulebook but never in the action path. One late-night call is a statutory violation; at portfolio scale it is a class action.',
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
    meaning: 'Contact rules must clear before the call is placed.',
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
              <h1 className="mt-5 font-serif text-display-hero text-ink">
                The harness that makes AI agents <span className="text-grad-carved">provable</span> to deploy.
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

        {/* ── 2 · What is an agent harness? — the ease-in definition ── */}
        <Section hairline>
          <div className="mx-auto max-w-[760px] text-center">
            <Reveal>
              <Eyebrow>Start here</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">
                First, what is an agent harness?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-7 max-w-[60ch] font-sans text-body-lg text-ink-2">
                An AI agent does not just answer questions. It takes actions on its own.
                It pulls a credit file, messages a borrower, places a call, records a
                decision. That autonomy is what makes it useful, and what makes it risky
                to put inside a regulated bank.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mx-auto mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
                An agent harness is the{' '}
                <span className="text-mint">control layer around that agent</span>. The
                model supplies the intelligence. The harness decides what that
                intelligence is allowed to do.
              </p>
            </Reveal>
          </div>

          {/* The three things every harness does — the concept, before the components */}
          <Reveal delay={0.22}>
            <div className="mx-auto mt-16 grid max-w-[980px] gap-4 md:grid-cols-3">
              {HARNESS_PARTS.map((h) => {
                const rgb = h.tint === 'mint' ? '0,255,178' : '57,214,255'
                return (
                  <div
                    key={h.k}
                    className="rounded-2xl border border-white/[0.07] p-7 md:p-8"
                    style={{
                      background: `radial-gradient(ellipse at 15% 0%, rgba(${rgb},0.06) 0%, transparent 60%), rgba(10,11,15,0.55)`,
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span aria-hidden className="block h-3 w-[2px] shrink-0 rounded-full" style={{ background: `rgb(${rgb})` }} />
                      <p className={`font-mono text-[11px] uppercase tracking-[0.2em] ${h.tint === 'mint' ? 'text-mint/70' : 'text-cyan/70'}`}>{h.k}</p>
                    </div>
                    <p className="mt-5 font-serif text-[1.3rem] leading-tight text-ink">{h.title}</p>
                    <p className="mt-3 font-sans text-[14px] leading-relaxed text-ink-2">{h.body}</p>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </Section>

        {/* ── 3 · The problem — full-width consequence-led descent ── */}
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

        {/* ── 4 · How it works — vertical numbered journey ── */}
        <Section hairline>
          {/* Section intro + gate image */}
          <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div>
                <Eyebrow>How it works</Eyebrow>
                <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
                  The three controls, up close.
                </h2>
                <p className="mt-6 max-w-[50ch] font-sans text-body-lg text-ink-2">
                  Each control is a working part of KrimOS. Kriya sets what an agent can
                  do, Krim-Nyāya clears every action before it fires, and Kupa keeps your
                  team in command. Remove any one and the other two stop working.
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
                  src="/images/harness/harness-gate.webp"
                  alt="An AI agent sends action proposals through a luminous validation gate panel: compliant actions pass, non-compliant are blocked."
                  width={GATE.w}
                  height={GATE.h}
                  placeholder="blur"
                  blurDataURL={GATE.blur}
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

        {/* ── 5 · The distinction — why a better model is not enough ── */}
        <Section hairline>
          <Reveal>
            <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
              <Eyebrow>The distinction</Eyebrow>
              <h2
                className="mt-8 font-serif text-ink"
                style={{ fontSize: 'clamp(2.2rem,5.5vw,4.2rem)', lineHeight: 1.06, maxWidth: '16ch' }}
              >
                The model decides.{' '}
                <span className="text-mint">The harness controls whether it can act.</span>
              </h2>
              <p className="mx-auto mt-8 max-w-[46ch] font-sans text-body-lg leading-relaxed text-ink-2">
                A better model is less likely to propose a bad action. A harness stops a bad
                action from executing at all. Different problems, solved at different layers.
              </p>
            </div>
          </Reveal>

          <div className="mt-4 grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div>
                <p className="max-w-[50ch] font-sans text-body-lg text-ink-2">
                  Constitutional AI, RLHF, and instruction-following all work on the
                  model&rsquo;s judgment. A harness works below it. It does not depend on the
                  model choosing well, and because the record is written before the action
                  rather than reconstructed after it, it is the record a regulator can trust.
                </p>
                <GlassCard accent className="mt-8 p-7">
                  <p className="font-serif text-[clamp(1.1rem,1.8vw,1.35rem)] leading-snug text-ink">
                    The harness does not make the agent smarter. It{' '}
                    <span className="text-mint">controls what the agent can act on</span>.
                    Conflating those two is how AI deployments fail their risk committee.
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

        {/* ── 6 · Regulatory alignment — ledger table ── */}
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

          {/* Statement cards — each regulation reduced to the argument it makes
              (big serif pull-quote), sourced by a mono kicker with its region chip.
              Reader can scan all five arguments in seconds; drop into the proof
              line beneath any that matter. */}
          <Reveal delay={0.1}>
            <ol className="mt-14 flex flex-col gap-5">
              {REGS.map((r, i) => {
                // Region → colour: US=cyan, UK=mint, IN=gold. Ties the card to a
                // jurisdictional identity without shouting.
                const rgb =
                  r.region === 'UK' ? '0,255,178' :
                  r.region === 'IN' ? '200,161,74' :
                  '57,214,255'
                return (
                  <Reveal key={r.reg} delay={i * 0.05}>
                    <li
                      className="relative overflow-hidden rounded-2xl border p-8 md:p-10"
                      style={{
                        borderColor: `rgba(${rgb},0.16)`,
                        background: `radial-gradient(120% 100% at 0% 0%, rgba(${rgb},0.06) 0%, transparent 45%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.012)), rgba(10,11,15,0.55)`,
                        backdropFilter: 'blur(20px) saturate(130%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(130%)',
                        boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.06), 0 20px 50px -30px rgba(0,0,0,0.55)`,
                      }}
                    >
                      {/* left accent bar — a coloured spine that anchors each card to
                          its jurisdiction */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-y-6 left-0 w-[3px] rounded-r-full"
                        style={{ background: `linear-gradient(180deg, rgba(${rgb},0.85), rgba(${rgb},0.15))` }}
                      />

                      {/* kicker — regulation name + region chip, compact and small so
                          the pull-quote below owns the visual weight */}
                      <div className="flex flex-wrap items-center gap-3">
                        <p
                          className="font-mono text-[12px] font-medium uppercase tracking-[0.16em]"
                          style={{ color: `rgb(${rgb})` }}
                        >
                          {r.reg}
                        </p>
                        <span
                          className="rounded-full border px-2.5 py-[3px] font-mono text-[10px] tracking-[0.14em] text-ink-3"
                          style={{ borderColor: `rgba(${rgb},0.28)` }}
                        >
                          {r.region}
                        </span>
                      </div>

                      {/* the argument — big, quotable, first thing you read */}
                      <p className="mt-5 max-w-[46ch] font-serif leading-[1.14] tracking-[-0.01em] text-ink"
                         style={{ fontSize: 'clamp(1.4rem,2.2vw,1.85rem)' }}>
                        {r.meaning}
                      </p>

                      {/* the proof — one line, second-order, for when a reader wants
                          more than the headline */}
                      <p className="mt-5 max-w-[68ch] font-sans text-[14.5px] leading-relaxed text-ink-2">
                        {r.point}
                      </p>
                    </li>
                  </Reveal>
                )
              })}
            </ol>
          </Reveal>
        </Section>

        {/* ── 7 · Further reading ── */}
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

        {/* ── 8 · Close ── */}
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
                  See Kovida — the world lending model
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
