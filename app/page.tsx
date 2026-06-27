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
import PowerCards from '@/components/home/PowerCards'
import PlatformExplorer from '@/components/home/PlatformExplorer'
import PolicyChecks from '@/components/home/PolicyChecks'
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

const POWERS = [
  {
    name: 'Safer & Auditable',
    tagline: 'Every action validated before it reaches a borrower.',
    body: 'Compliance breaches de-risked. Every decision leaves a trail regulators can understand.',
  },
  {
    name: 'Faster & Scalable',
    tagline: 'Co-workers that do the work, not just advise on it.',
    body: "Agents execute across the full lending lifecycle, without manual handoffs. As your book grows, the operation keeps pace. The headcount doesn't have to.",
  },
  {
    name: 'Evolving & Predictive',
    tagline: 'Gets sharper with every decision your operation makes.',
    body: 'A world model that learns from every action and outcome. The longer it runs, the more precisely it performs.',
  },
]

// Who actually uses KrimOS — the lending roles, and what changes for each.
// `hl` = the load-bearing phrase, lit in mint so each card reads at a glance.
const USERS = [
  { role: 'Origination', impact: 'Underwriters and analysts onboard in hours, not days. Every decision auditable, applications moving at digital speed.', hl: 'in hours, not days' },
  { role: 'Risk & Credit', impact: 'Every AI decision is provable and on the record, so model risk and fair-lending exposure stay contained.', hl: 'provable and on the record' },
  { role: 'Servicing', impact: 'Cure and serve at scale: every contact, in the customer’s own language, inside the rules and without adding headcount.', hl: 'inside the rules' },
  { role: 'Collections', impact: 'Right-party contact at scale and better recovery: collections flow into the operation as validated actions.', hl: 'validated actions' },
  { role: 'Compliance & Audit', impact: 'Reconstruct any action, any time, in plain words your examiner can read. Inspections close in hours, not weeks.', hl: 'your examiner can read' },
  { role: 'Operations', impact: 'The manual backlog from origination to collections runs on validated co-workers. The team scales without the headcount.', hl: 'without the headcount' },
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

        {/* ---- 4 · The challenge ---- */}
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
                  {/* the cyan "blocked" cue — resolves to mint in the powers below */}
                  <span aria-hidden className="block h-[3px] w-12 rounded-full bg-cyan/70" />
                  <h3 className="mt-6 font-serif text-[1.4rem] leading-tight text-ink">{p.heading}</h3>
                  <p className="mt-3 font-sans text-body text-ink-2">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 5 · Powers that transform ---- */}
        <Section hairline id="powers">
          <Reveal>
            <Eyebrow>What Krim changes</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">When validation, execution and intelligence run as one.</h2>
            <p className="mt-4 max-w-[52ch] font-sans text-body-lg text-ink-2">
              Lending doesn&rsquo;t improve. It transforms.
            </p>
          </Reveal>
          <div className="mt-12">
            <PowerCards powers={POWERS} />
          </div>
        </Section>

        {/* ---- 6 · Intelligence by policy — what Kendra checks ---- */}
        <Section hairline id="intelligence">
          <Reveal>
            <Eyebrow>Intelligence by policy</Eyebrow>
            <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
              Every action is checked before it happens.
            </h2>
            <p className="mt-6 max-w-[54ch] font-sans text-body-lg text-ink-2">
              Before a co-worker acts, Kendra runs it through Krim-Nyāya, a gate of 33 validators in
              three families: grounding, soundness, permission. Here is one action meeting the gate.
            </p>
          </Reveal>
          <div className="mt-12">
            <PolicyChecks />
          </div>
        </Section>

        {/* ---- 7 · Who uses it — lending roles + the impact on each ---- */}
        <Section hairline id="who">
          <Reveal>
            <Eyebrow>Who uses it</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
              Built for the teams who run lending.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {USERS.map(({ role, impact, hl }, i) => {
              const [before, after] = impact.split(hl)
              return (
                <Reveal key={role} delay={i * 0.06}>
                  <div className="glass-quiet lume h-full rounded-lg p-6">
                    <h3 className="font-serif text-[1.2rem] leading-tight text-ink">{role}</h3>
                    <p className="mt-2.5 font-sans text-[14px] leading-relaxed text-ink-2">
                      {before}
                      <span className="text-mint">{hl}</span>
                      {after}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Section>

        {/* ---- 8 · Trust strip — fits your stack + recognition (merged: was §8 + §9) ---- */}
        <Section hairline id="integrations">
          <div className="mx-auto max-w-[760px] text-center">
            <Reveal>
              <h2 className="font-serif text-display-2 leading-tight text-ink">
                On your stack, or as the stack.
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
            <div className="mx-auto max-w-[680px] text-center">
              <span aria-hidden className="mx-auto block h-[3px] w-14 rounded-full bg-mint" />
              <h2 className="mt-8 font-serif text-display-2 leading-[1.05] text-ink">
                Watch your operations come alive.
              </h2>
              <p className="mt-5 font-sans text-body-lg text-ink-2">
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
