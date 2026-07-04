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
      'KrimOS is the operating system for banking and financial services: a world model for lending with AI co-workers that run the whole lifecycle, every action validated before it acts, inside your own walls.',
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
    'Krim is a technology research, product and services company. Its product, KrimOS, is the operating system for banking and financial services, lending first, where every action is validated before it executes.',
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
    heading: 'Point tools,\nnever a whole.',
    body: 'Each tool sees one slice, so the intelligence your operation should build never forms.',
  },
]

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
                <Eyebrow>Kovida — the world lending model</Eyebrow>
                <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
                  One model for your whole lending operation.
                </h2>
              </Reveal>
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
                <GlassCard className="mt-9 inline-block px-8 py-6">
                  <p className="font-serif text-[clamp(1.3rem,2.2vw,1.7rem)] text-ink">
                    Fragmented flows transformed into a unified intelligence.
                  </p>
                </GlassCard>
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

        {/* ---- 4 · Safe Agent Harness ---- */}
        <AgentHarness />

        {/* ---- 5 · The challenge ---- */}
        <Section hairline id="challenge">
          <Reveal>
            <Eyebrow tone="gold">The challenge</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">What&rsquo;s stopping AI from running banking?</h2>
            <p className="mt-3 font-sans text-body-lg italic text-ink-3">AI in banking: the pilot that never lands.</p>
          </Reveal>
          <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-3">
            {PROBLEMS.map((p, i) => (
              <Reveal key={p.heading} delay={i * 0.1}>
                <div>
                  <span aria-hidden className="block h-[3px] w-10 rounded-full bg-amber/70" />
                  <h3 className="mt-6 whitespace-pre-line font-serif text-[clamp(1.5rem,2.1vw,1.95rem)] leading-[1.12] text-ink">{p.heading}</h3>
                  <p className="mt-4 max-w-[34ch] font-sans text-body-lg text-ink-2">{p.body}</p>
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

        {/* ---- 7 · Impact for your business — the Loan Meridian (operational coverage) ---- */}
        <LoanMeridian />

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
