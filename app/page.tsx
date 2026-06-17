/**
 * / — the homepage: the argument, Krim in 30 seconds.
 * Nine sections per docs/copy/homepage.md; presentation notes honoured.
 * Hero choreography + persistent orb live in HomeHero. Signature pieces
 * (orb, platform layers, proof surface, integration marquee) are their own
 * components. Facts: docs/krim-content.md.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Reveal from '@/components/Reveal'
import Image from 'next/image'
import HomeHero from '@/components/home/HomeHero'
import PowerCards from '@/components/home/PowerCards'
import PlatformLayers from '@/components/home/PlatformLayers'
import PolicyChecks from '@/components/home/PolicyChecks'
import IntegrationsMarquee from '@/components/home/IntegrationsMarquee'
import Recognition from '@/components/home/Recognition'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

export const metadata: Metadata = {
  alternates: { canonical: 'https://krim.ai' },
  openGraph: {
    description:
      'KrimOS is the operating system for regulated operations: AI co-workers whose every action is validated before it executes — and that learn from everything they do, inside your own walls.',
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
    'Krim is a technology research, product and services company operating across the US, UK and India. Its product, KrimOS, is the operating system for regulated operations, where every action is validated before it executes.',
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
    heading: 'Advice, not action',
    body: 'AI can recommend, but few institutions will let it act — in regulated work, one wrong move can become a compliance event.',
  },
  {
    heading: 'Data that can’t leave',
    body: 'Sensitive records often can’t go to a third-party cloud, which rules out most off-the-shelf AI.',
  },
  {
    heading: 'Stuck in manual',
    body: 'So much of the work stays manual — slow, costly, and hard to scale.',
  },
]

const POWERS = [
  {
    name: 'Validation',
    tagline: 'Validated before it acts.',
    body: 'Every action passes 33 checks against law, policy and context before it can execute. Now AI can act in regulated work.',
  },
  {
    name: 'Sovereignty',
    tagline: 'Never leaves your walls.',
    body: 'The whole system runs inside your perimeter. No data leaves.',
  },
  {
    name: 'Intelligence',
    tagline: 'Smarter after it acts.',
    body: 'Every action teaches the system, building a model of your whole operation. Automation that compounds.',
  },
]

const DOORS = [
  ['Lending', 'The whole loan lifecycle, validated and learning.', '/lending'],
  ['Government', 'Public services that must answer for every action.', '/government'],
  ['Large Enterprise', 'Regulated operations at scale, compliance built in.', '/enterprise'],
  ['MSME', 'Regulation-grade AI workers for everyday customer and back-office operations.', '/msme'],
] as const

/** faint geometric motifs for the four doors — barely-there, top-right */
function DoorMotif({ kind }: { kind: string }) {
  const stroke = 'rgba(255,255,255,0.09)'
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden className="absolute right-4 top-4">
      {kind === 'Lending' && (
        <g stroke={stroke} strokeWidth="1" fill="none">
          {/* an amortising curve */}
          <path d="M6 10 C 18 38, 34 46, 50 48" />
          <path d="M6 10 L6 48 L50 48" />
        </g>
      )}
      {kind === 'Government' && (
        <g stroke={stroke} strokeWidth="1" fill="none">
          {/* a portico */}
          <path d="M8 18 L28 8 L48 18" />
          <line x1="14" y1="22" x2="14" y2="46" />
          <line x1="28" y1="22" x2="28" y2="46" />
          <line x1="42" y1="22" x2="42" y2="46" />
          <line x1="10" y1="48" x2="46" y2="48" />
        </g>
      )}
      {kind === 'Large Enterprise' && (
        <g stroke={stroke} strokeWidth="1" fill="none">
          {/* a tower grid */}
          {[14, 26, 38].map((x) =>
            [12, 24, 36].map((y) => <rect key={`${x}${y}`} x={x} y={y} width="8" height="8" />),
          )}
        </g>
      )}
      {kind === 'MSME' && (
        <g stroke={stroke} strokeWidth="1" fill="none">
          {/* one small unit beside the larger outline it grows into */}
          <rect x="10" y="30" width="14" height="14" />
          <rect x="28" y="14" width="20" height="30" strokeDasharray="3 3" />
        </g>
      )}
    </svg>
  )
}

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

        {/* ---- 2 · The challenge ---- */}
        <Section hairline id="challenge">
          <Reveal>
            <Eyebrow tone="gold">The challenge</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">Regulated work is stuck.</h2>
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

        {/* ---- 3 · The three powers — the heart of the page ---- */}
        <Section hairline id="powers">
          <Reveal>
            <Eyebrow>What Krim changes</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">Three things, locked together.</h2>
          </Reveal>
          <div className="mt-12">
            <PowerCards powers={POWERS} />
          </div>
          <Reveal delay={0.2}>
            <p className="mt-10 text-center font-serif text-[1.15rem] italic text-ink-2">
              Not features you choose between — each makes the others possible.
            </p>
          </Reveal>
        </Section>

        {/* ---- 4 · The flywheel ---- */}
        <Section hairline id="flywheel">
          <div className="grid items-center gap-12 md:grid-cols-[1.15fr_1fr]">
            <div>
              <Reveal>
                <Eyebrow>Why it compounds</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  Safety and intelligence build each other.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  Validation lets the co-workers act. Every action leaves a complete record, and that
                  record makes them sharper — so more of what they propose clears the gate. They do
                  more, safely, the longer they run.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <GlassCard className="mt-9 inline-block px-8 py-6">
                  <p className="font-serif text-[clamp(1.3rem,2.2vw,1.7rem)] text-ink">
                    The longer it runs, the better it gets.
                  </p>
                </GlassCard>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              {/* the flywheel render, floated into the canvas — edges feathered, no hard rectangle */}
              <div className="relative mx-auto aspect-square w-full max-w-[440px]">
                <Image
                  src="/images/krimos/flywheel.png"
                  alt="The KrimOS flywheel — a glass ring of light turning through validate, act, record and learn, cyan warming to mint as the cycle compounds."
                  width={1400}
                  height={1400}
                  sizes="(max-width: 768px) 84vw, 440px"
                  className="h-full w-full object-contain"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{ background: 'radial-gradient(82% 82% at 50% 50%, transparent 60%, #09090C 100%)' }}
                />
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ---- 5 · The platform ---- */}
        <Section hairline id="platform">
          <div className="mx-auto max-w-[760px] text-center">
            <Reveal>
              <Eyebrow>One operating system</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">
                KrimOS — one core, across regulated operations.
              </h2>
              <p className="mx-auto mt-6 max-w-[48ch] font-sans text-body-lg text-ink-2">
                The same brain, vocabulary and co-workers wherever the work is regulated. Only the
                rules and use cases change.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="mt-14">
              <PlatformLayers />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 text-center">
              <CTA href="/platform" variant="secondary">
                Explore the platform
              </CTA>
            </div>
          </Reveal>
        </Section>

        {/* ---- 6 · The domains ---- */}
        <Section hairline id="domains">
          <Reveal>
            <Eyebrow>Who it&rsquo;s for</Eyebrow>
            <h2 className="mt-4 max-w-[26ch] font-serif text-display-1 text-ink">
              Built for the operations that can&rsquo;t afford to be wrong.
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
              One core, across regulated operations. The rules and use cases change; the proof and
              the learning do not.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DOORS.map(([name, line, href], i) => (
              <Reveal key={href} delay={i * 0.08}>
                <Link href={href} className="block h-full">
                  <GlassCard hover className="relative flex h-full flex-col overflow-hidden p-7">
                    <DoorMotif kind={name} />
                    <h3 className="font-serif text-[1.35rem] text-ink">{name}</h3>
                    <p className="mt-3 flex-1 font-sans text-[14px] leading-relaxed text-ink-2">{line}</p>
                    <p className="mt-6 font-mono text-[13px] text-mint" aria-hidden>
                      →
                    </p>
                  </GlassCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 7 · Intelligence by policy — what Kendra checks ---- */}
        <Section hairline id="intelligence">
          <Reveal>
            <Eyebrow>Intelligence by policy</Eyebrow>
            <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
              Every action has to earn its execution.
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
              Before a co-worker acts, Kendra puts the proposed action through Krim-Nyāya — a gate
              built on a formal logic tradition. Three questions decide it, every time.
            </p>
          </Reveal>
          <div className="mt-12">
            <PolicyChecks />
          </div>
        </Section>

        {/* ---- 8 · Fits the stack you already run ---- */}
        <Section hairline id="integrations">
          <Reveal>
            <p className="text-center font-serif text-[clamp(1.6rem,2.8vw,2.2rem)] leading-tight text-ink">
              It layers onto the systems you already run.
            </p>
            <p className="mx-auto mt-4 max-w-[50ch] text-center font-sans text-body text-ink-2">
              KrimOS is the decision layer your existing systems report into.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12">
              <IntegrationsMarquee />
            </div>
          </Reveal>
        </Section>

        {/* ---- 9 · Recognition — slim honest credibility strip ---- */}
        <Section hairline id="recognition">
          <Reveal>
            <Recognition />
          </Reveal>
        </Section>

        {/* ---- 10 · Close ---- */}
        <Section hairline id="close">
          <Reveal>
            <GlassCard className="mx-auto max-w-[720px] p-10 text-center md:p-14">
              {/* the faint perimeter motif — the sovereign boundary */}
              <div className="rounded-lg border border-soft px-6 py-10 md:px-10">
                <h2 className="font-serif text-display-3 leading-tight text-ink">
                  The operating system for regulated operations.
                </h2>
                <p className="mt-5 font-sans text-body text-ink-2">
                  Sovereign by default. Auditable by design.
                </p>
                <div className="mt-9">
                  <CTA href={DEMO_HREF}>Book a demo</CTA>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </Section>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
