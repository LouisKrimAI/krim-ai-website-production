/**
 * / — the homepage: the argument, Krim in 30 seconds.
 * Nine sections per docs/copy/homepage.md; presentation notes honoured.
 * Hero choreography + persistent orb live in HomeHero. Signature pieces
 * (orb, platform layers, proof surface, integration marquee) are their own
 * components. Facts: docs/krim-content.md.
 */

import type { Metadata } from 'next'
import { Fragment } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Reveal from '@/components/Reveal'
import Image from 'next/image'
import HomeHero from '@/components/home/HomeHero'
import PlatformExplorer from '@/components/home/PlatformExplorer'
import AgentHarness from '@/components/home/AgentHarness'
import LifecycleOverview from '@/components/home/LifecycleOverview'
import LoanMeridian from '@/components/home/LoanMeridian'
import PolicyChecks from '@/components/home/PolicyChecks'
import TrustPillars from '@/components/home/TrustPillars'
import IntegrationsMarquee from '@/components/home/IntegrationsMarquee'
import Recognition from '@/components/home/Recognition'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.krim.ai' },
  openGraph: {
    description:
      'KrimOS is the operating system for lending: a world model with AI co-workers that run the whole lifecycle, every action validated before it executes, inside your own walls.',
    url: 'https://www.krim.ai',
    siteName: 'Krim',
    type: 'website',
  },
}

const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Krim',
  url: 'https://www.krim.ai',
  logo: 'https://www.krim.ai/brand-logo',
  // Formal descriptor per docs/POSITIONING.md §11; areaServed = the five
  // encoded markets (lib/jurisdictions.ts is the single source).
  description:
    'Krim is a technology research, product and services company. Its product, KrimOS, is the operating system for lending, where every action is validated before it executes.',
  legalName: 'Krim AI Inc.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '169 Madison Ave STE 15775',
    addressLocality: 'New York',
    addressRegion: 'NY',
    postalCode: '10016',
    addressCountry: 'US',
  },
  areaServed: ['US', 'GB', 'IN', 'NG', 'BR'],
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
    heading: 'Hallucinations become violations.',
    body: 'A wrong call with no rollback is a compliance event waiting to be filed.',
  },
  {
    heading: "Decisions you can't explain.",
    body: "Every action carries the bank's signature, and most AI leaves no reasoning an examiner can read.",
  },
  {
    heading: 'A stack that\nnever learns.',
    body: 'Each tool sees one slice, so the intelligence your operation should build never forms.',
  },
]

const DEMO_HREF = '/contact'

// How you start — the pilot ladder (docs/krim-content.md): deep-dive → proof
// → live. Three glass steps running cyan → mint: the journey arrives at
// validated, the same colour grammar as the horizon in §2.
const START_STEPS = [
  { n: '01', label: 'Two-week deep-dive', rgb: '57,214,255' },
  { n: '02', label: '30-day proof on your data', rgb: '29,235,217' },
  { n: '03', label: 'Live in a quarter', rgb: '0,255,178' },
] as const

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

        {/* ---- 2 · The lending lifecycle at a glance — scope first, five seconds,
                no detail. The full instrument lives at §9 (#who). ---- */}
        <LifecycleOverview />

        {/* ---- 3 · Safe Agent Harness — who does the work, and why it's safe to let them ---- */}
        <AgentHarness />

        {/* ---- 4 · Kovida — the world lending model (the flywheel) ---- */}
        <Section hairline id="flywheel">
          {/* centered header — the homepage convention */}
          <Reveal>
            <div className="mx-auto max-w-[760px] text-center">
              <Eyebrow>Kovida — the world lending model</Eyebrow>
              <h2 className="mx-auto mt-4 max-w-[26ch] font-serif text-display-1 text-ink">
                One model for your whole lending operation.
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 grid items-center gap-12 md:grid-cols-[1.15fr_1fr]">
            <div>
              <Reveal delay={0.12}>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  One runtime runs the whole lifecycle and records every action with its reasoning on
                  one ledger, so <span className="text-ink">Kovida</span> builds a connected model of
                  how lending actually behaves, and{' '}
                  <span className="text-mint">sharpens with every outcome</span>. Validation lets it
                  act; the record, kept inside your walls, lets it learn.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                {/* open-air pull-quote (mint bar, no card) — §3 next door already
                    plays the inline-GlassCard move; consecutive viewports shouldn't
                    repeat the same device */}
                <div className="mt-9 max-w-[34ch]">
                  <span aria-hidden className="block h-[3px] w-16 rounded-full bg-gradient-to-r from-cyan to-mint" />
                  <p className="mt-5 font-serif text-display-2 text-ink">
                    Fragmented flows become one intelligence that compounds.
                  </p>
                </div>
                <div className="mt-8">
                  <CTA href="/research/world-lending-model" variant="secondary">
                    Explore Kovida
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

        {/* ---- 5 · Meet KrimOS — the synthesis: the three powers, shipped as one OS ---- */}
        <Section hairline id="platform">
          <div className="mx-auto max-w-[760px] text-center">
            <Reveal>
              <Eyebrow>Inside KrimOS</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">
                The operating system for lending.
              </h2>
              <p className="mx-auto mt-6 max-w-[56ch] font-sans text-body-lg text-ink-2">
                AI co-workers run the whole operation, origination to collections,{' '}
                <span className="text-mint">every action on one record with its reasoning</span> —
                inside your own walls.
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

        {/* ---- 6 · The challenge ---- */}
        <Section hairline id="challenge">
          <Reveal>
            <div className="mx-auto max-w-[760px] text-center">
              <Eyebrow tone="gold">The challenge</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">What&rsquo;s stopping AI from running banking?</h2>
              <p className="mt-3 font-sans text-body-lg italic text-ink-3">AI in banking: the pilot that never lands.</p>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-3">
            {PROBLEMS.map((p, i) => (
              <Reveal key={p.heading} delay={i * 0.1}>
                <div>
                  <span aria-hidden className="block h-[3px] w-10 rounded-full bg-amber/70" />
                  <h3 className="mt-6 whitespace-pre-line font-serif text-display-2 text-ink">{p.heading}</h3>
                  <p className="mt-4 max-w-[34ch] font-sans text-body-lg text-ink-2">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 7 · Trust pillars — the answer to the challenge ---- */}
        <TrustPillars />

        {/* ---- 8 · The gate in action — one live example of the validation path ---- */}
        <Section hairline id="intelligence">
          <Reveal>
            <div className="mx-auto max-w-[760px] text-center">
              <Eyebrow>Intelligence by policy</Eyebrow>
              <h2 className="mx-auto mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                One action, meeting the gate.
              </h2>
              <p className="mx-auto mt-6 max-w-[54ch] font-sans text-body-lg text-ink-2">
                This is the path every action runs. Watch one reach the gate, clear its
                validators, and carry its verdict into the record.
              </p>
            </div>
          </Reveal>
          <div className="mt-12">
            <PolicyChecks />
          </div>
        </Section>

        {/* ---- 9 · Inside the lifecycle — the deep instrument, for readers who
                have scrolled through the argument and want the proof of depth ---- */}
        <LoanMeridian />

        {/* ---- 10 · Trust strip — fits your stack + recognition ---- */}
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
              {/* the systems-buyer's door — how it actually deploys */}
              <p className="mt-5 font-sans text-[14px] text-ink-3">
                How it runs inside your walls:{' '}
                <Link href="/architecture" className="text-ink-2 transition-colors duration-fast hover:text-mint">
                  the architecture →
                </Link>
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

        {/* ---- 11 · How you start + Close. The start line is deliberately
                one breath — three steps, no cards, no section of its own
                weight. The close is the reinstated original: the page opens
                on Sovereign Superintelligence and closes powered by it. ---- */}
        <Section hairline id="close">
          <Reveal>
            <div className="mx-auto max-w-[860px] text-center">
              <Eyebrow>How you start</Eyebrow>
              {/* three glass steps, cyan → mint — the same chip glass as §2's
                  horizon, so the page's beads visibly belong to one system */}
              <div className="mt-8 flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-0">
                {START_STEPS.map((s, i) => (
                  <Fragment key={s.n}>
                    <div
                      className="lc-chip relative flex items-baseline gap-3 px-5 py-3"
                      style={{ ['--rgb' as string]: s.rgb } as React.CSSProperties}
                    >
                      <span
                        aria-hidden
                        className="font-mono text-[10px] leading-none tracking-[0.24em]"
                        style={{ color: `rgba(${s.rgb},0.85)` }}
                      >
                        {s.n}
                      </span>
                      <span className="font-serif text-[1.05rem] leading-tight text-ink">{s.label}</span>
                    </div>
                    {i < START_STEPS.length - 1 && (
                      <span aria-hidden className="rotate-90 text-mint/50 md:mx-4 md:rotate-0">→</span>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mx-auto mt-20 max-w-[940px] text-center">
              <span aria-hidden className="mx-auto block h-[3px] w-16 rounded-full bg-gradient-to-r from-mint to-cyan" />
              {/* display-1, deliberately: the hero owns the page's single
                  display-hero voice — the close is its echo, not a rival */}
              <h2 className="mt-9 font-serif text-display-1 text-ink">
                Watch your operations come <span className="text-grad">alive</span>.
              </h2>
              <p className="mt-6 font-sans text-body-lg text-ink-2">
                Powered by sovereign superintelligence.
              </p>
              <div className="mt-10 flex justify-center">
                <CTA href={DEMO_HREF}>Book a demo</CTA>
              </div>
              {/* the one door for readers who validate by reading, not booking */}
              <p className="mt-8 font-sans text-[14px] text-ink-3">
                Prefer to read first?{' '}
                <Link href="/epistemic-ai" className="text-ink-2 transition-colors duration-fast hover:text-mint">
                  The thinking behind KrimOS →
                </Link>
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
