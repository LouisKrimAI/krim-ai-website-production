/**
 * / — the homepage: the argument, Krim in 30 seconds.
 * Nine sections per docs/copy/homepage.md; presentation notes honoured.
 * Hero choreography + persistent orb live in HomeHero. Signature pieces
 * (orb, platform layers, proof surface, integration marquee) are their own
 * components. Facts: docs/krim-content.md.
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Reveal from '@/components/Reveal'
import Image from 'next/image'
import HomeHero from '@/components/home/HomeHero'
import PlatformExplorer from '@/components/home/PlatformExplorer'
import AgentHarness from '@/components/home/AgentHarness'
import PolicyChecks from '@/components/home/PolicyChecks'
import TrustPillars from '@/components/home/TrustPillars'
import IntegrationsMarquee from '@/components/home/IntegrationsMarquee'
import Recognition from '@/components/home/Recognition'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

export const metadata: Metadata = {
  alternates: { canonical: 'https://krim.ai' },
  openGraph: {
    description:
      'KrimOS is the operating system for banking and financial services: a world model for lending with AI co-workers that run the whole lifecycle, every action validated before it acts, inside your own walls.',
    url: 'https://krim.ai',
    siteName: 'Krim',
    type: 'website',
  },
}

const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Krim',
  url: 'https://krim.ai',
  logo: 'https://krim.ai/brand-logo',
  description:
    'Krim is a technology research, product and services company. Its product, KrimOS, is the operating system for banking and lending, where every action is validated before it executes.',
  areaServed: ['US', 'GB', 'IN'],
  email: 'sales@krim.ai',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-510-345-5686',
    email: 'sales@krim.ai',
    contactType: 'sales',
  },
  sameAs: ['https://www.linkedin.com/company/krim/', 'https://x.com/TheKrimAI'],
}

// ---------------------------------------------------------------- content

const PROBLEMS = [
  {
    heading: 'Hallucinations lead to violations.',
    body: 'In lending, errors carry real consequences. A wrong call, a misquoted term, a non-compliant contact with no rollback is a costly compliance event waiting to be filed.',
  },
  {
    heading: "AI makes decisions. But you can't explain them.",
    body: "Every credit action, every automated contact carries the bank's signature. When an examiner asks to see the reasoning, most AI has no audit trail a human can follow.",
  },
  {
    heading: 'Many point-solutions. No unified intelligence.',
    body: 'Each tool handles a slice: origination here, collections there, servicing somewhere else. No single system builds understanding from the whole. The intelligence your operation should be generating never forms.',
  },
]

// Impact for users — the lending operation, stage by stage across the lifecycle.
// Each card leads with the major impact (bright serif) so the win reads at a glance.
const LIFECYCLE = [
  { stage: 'Origination', impact: 'Applications move at digital speed.', body: 'Intake, KYC and document work run on validated co-workers, so underwriters see only the judgment cases, and every step is auditable.' },
  { stage: 'Credit & risk', impact: 'Every action on the record, credit calls included.', body: 'Model-risk and fair-lending exposure stay contained: the credit decision stays yours, and every action around it is provable to a reviewer.' },
  { stage: 'Servicing', impact: 'Serve every customer, in their language.', body: 'At scale, inside the rules, without adding headcount to keep up with the book.' },
  { stage: 'Collections', impact: 'Every contact, validated before it fires.', body: 'Right-party contact at scale, each call cleared against FDCPA, Reg F and TCPA rules before it dials, every step on the record.' },
  { stage: 'Hardship & retention', impact: 'Restructure and retain, inside the rules.', body: 'Hardship, restructure and cross-sell journeys run as validated actions, on the record for your reviewer.' },
  { stage: 'Compliance & audit', impact: 'Any action, reconstructed in minutes.', body: 'In plain words a reviewer can read, the audit pack assembled on demand instead of pieced together over weeks.' },
] as const

// And the impact one level up — what it adds up to for the institution.
const INSTITUTION = [
  { impact: 'Scale without the headcount.', body: 'The manual backlog from origination to collections runs on validated co-workers.' },
  { impact: 'Audit evidence in minutes, not weeks.', body: 'One immutable record of every action and its reasoning, the evidence pack assembled on demand, not reconstructed after the fact.' },
  { impact: 'Intelligence that compounds.', body: 'Every outcome sharpens the operation, measurably better through the first year and beyond, learning from a record no one else has.' },
] as const

const DEMO_HREF = '/contact'

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      <SiteHeader scrollReveal />
      <main>
        {/* ---- 1 · Hero — orb choreography + persistent fixed orb backdrop ---- */}
        <HomeHero />

        {/* everything below sits above the fixed orb (z-0) */}
        <div className="relative z-10">

        {/* ---- 2 · The platform ---- */}
        <Section hairline id="platform">
          <div className="mx-auto max-w-[760px] text-center">
            <Reveal>
              <Eyebrow>Meet KrimOS</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">
                Agent-native OS for lending operations.
              </h2>
              <p className="mx-auto mt-6 max-w-[56ch] font-sans text-body-lg text-ink-2">
                AI co-workers run the whole operation, origination to collections, with{' '}
                <span className="text-mint">every action validated before it executes</span> and
                every outcome learned from — inside your own walls.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="mt-14">
              <PlatformExplorer />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 text-center">
              <CTA href="/krimos" variant="secondary">
                Explore KrimOS
              </CTA>
            </div>
          </Reveal>
        </Section>

        {/* ---- 3 · The flywheel ---- */}
        <Section hairline id="flywheel">
          <div className="grid items-center gap-12 md:grid-cols-[1.15fr_1fr]">
            <div>
              <Reveal>
                <Eyebrow>The world model</Eyebrow>
                <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
                  One model for your whole lending operation.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  One runtime runs the whole lifecycle and records every action with its reasoning on
                  one ledger, so KrimOS builds a connected model of how lending actually behaves, and{' '}
                  <span className="text-mint">sharpens with every outcome</span>. Validation lets it
                  act; the record, kept inside your walls, lets it learn.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <GlassCard className="mt-9 inline-block px-8 py-6">
                  <p className="font-serif text-[clamp(1.3rem,2.2vw,1.7rem)] text-ink">
                    Fragmented flows transformed into a unified intelligence.
                  </p>
                </GlassCard>
                <div className="mt-8">
                  <CTA href="/research/world-lending-model" variant="secondary">
                    Explore the World Lending Model
                  </CTA>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              {/* the flywheel render — a backgroundless cutout floating in the canvas, turning slowly */}
              <div className="relative mx-auto aspect-square w-full max-w-[520px]">
                {/* faint cyan→mint ground glow behind the ring */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(57,214,255,0.10) 0%, rgba(0,255,178,0.04) 40%, transparent 70%)' }}
                />
                <Image
                  src="/images/krimos/flywheel-clear.png"
                  alt="The KrimOS flywheel, a glass ring of light turning through validate, act, record and learn, cyan warming to mint as the cycle compounds."
                  width={1196}
                  height={1196}
                  sizes="(max-width: 768px) 88vw, 520px"
                  className="krim-flywheel relative h-full w-full object-contain"
                />
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ---- 4 · Safe Agent Harness ---- */}
        <AgentHarness />

        {/* ---- 5 · The challenge ---- */}
        <Section hairline id="challenge">
          <Reveal>
            <Eyebrow tone="gold">The challenge</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">What&rsquo;s stopping AI from running banking?</h2>
            <p className="mt-3 font-sans text-body-lg italic text-ink-3">AI in banking: the pilot that never lands.</p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {PROBLEMS.map((p, i) => (
              <Reveal key={p.heading} delay={i * 0.1}>
                <div className="glass lume h-full p-7 md:p-8">
                  <span aria-hidden className="block h-[3px] w-12 rounded-full bg-cyan/70" />
                  <h3 className="mt-6 font-serif text-[1.4rem] leading-tight text-ink">{p.heading}</h3>
                  <p className="mt-3 font-sans text-body text-ink-2">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 5 · Trust pillars — the safety properties every action carries ---- */}
        <TrustPillars />

        {/* ---- 6 · The gate in action — one live example of the validation path ---- */}
        <Section hairline id="intelligence">
          <Reveal>
            <Eyebrow>Intelligence by policy</Eyebrow>
            <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
              One action, meeting the gate.
            </h2>
            <p className="mt-6 max-w-[54ch] font-sans text-body-lg text-ink-2">
              Not a diagram. Every action a co-worker takes runs this path before it can fire.
              Watch one reach the gate, clear its validators, and carry its verdict into the record.
            </p>
          </Reveal>
          <div className="mt-12">
            <PolicyChecks />
          </div>
        </Section>

        {/* ---- 7 · Impact for users — across the lending lifecycle, then the institution ---- */}
        <Section hairline id="who">
          <Reveal>
            <Eyebrow>Impact for users</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
              What changes for every team that runs lending.
            </h2>
            <p className="mt-6 max-w-[56ch] font-sans text-body-lg text-ink-2">
              From the first application to the final cure, the lending lifecycle runs on validated
              co-workers, and the upside lands at every step.
            </p>
          </Reveal>

          {/* team by team, across the flow */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LIFECYCLE.map(({ stage, impact, body }, i) => (
              <Reveal key={stage} delay={(i % 3) * 0.06}>
                <div className="glass-quiet lume flex h-full flex-col rounded-lg p-6">
                  <span aria-hidden className="block h-[3px] w-10 rounded-full bg-mint/70" />
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">{stage}</p>
                  <h3 className="mt-2 font-serif text-[1.3rem] leading-[1.16] text-ink">{impact}</h3>
                  <p className="mt-2.5 font-sans text-[14px] leading-relaxed text-ink-2">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* one level up — what it adds up to for the institution */}
          <Reveal delay={0.1}>
            <GlassCard className="mt-8 p-8 md:p-10">
              <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
                And for the institution
              </p>
              <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-0">
                {INSTITUTION.map(({ impact, body }, i) => (
                  <div
                    key={impact}
                    className={`text-center md:px-8 ${i > 0 ? 'md:border-l md:border-white/[0.08]' : ''}`}
                  >
                    <h3 className="font-serif text-[clamp(1.35rem,2.2vw,1.7rem)] leading-[1.16]">
                      <span className="text-grad">{impact}</span>
                    </h3>
                    <p className="mx-auto mt-3 max-w-[34ch] font-sans text-[14px] leading-relaxed text-ink-2">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </Section>

        {/* ---- 8 · Trust strip — fits your stack + recognition (merged: was §8 + §9) ---- */}
        <Section hairline id="integrations">
          <div className="mx-auto max-w-[760px] text-center">
            <Reveal>
              <h2 className="font-serif text-display-2 leading-tight text-ink">
                Works with the systems you already run.
              </h2>
              <p className="mx-auto mt-5 max-w-[48ch] font-sans text-body-lg text-ink-2">
                <span className="block">40+ connectors into your core, LOS and LMS.</span>
                <span className="block">Nothing to tear out.</span>
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="mt-12">
              <IntegrationsMarquee />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10">
              <Recognition />
            </div>
          </Reveal>
        </Section>

        {/* ---- 9 · Close — open, tight, confident (no heavy box) ---- */}
        <Section hairline id="close">
          <Reveal>
            <div className="mx-auto max-w-[940px] text-center">
              <span aria-hidden className="mx-auto block h-[3px] w-16 rounded-full bg-gradient-to-r from-mint to-cyan" />
              <h2 className="mt-9 font-serif text-display-1 leading-[1.06] text-ink">
                <span className="block">Watch your operations</span>
                <span className="block">come <span className="text-grad">alive</span>.</span>
              </h2>
              <p className="mt-6 font-sans text-[clamp(16px,1.9vw,20px)] leading-snug text-ink-2">
                Powered by sovereign superintelligence.
              </p>
            </div>
          </Reveal>
        </Section>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
