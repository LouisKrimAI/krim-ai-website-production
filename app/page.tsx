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
import HomeHero from '@/components/home/HomeHero'
import PowerCards from '@/components/home/PowerCards'
import PlatformLayers from '@/components/home/PlatformLayers'
import ProofPanel from '@/components/home/ProofPanel'
import IntegrationsMarquee from '@/components/home/IntegrationsMarquee'
import Recognition from '@/components/home/Recognition'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

export const metadata: Metadata = {
  alternates: { canonical: 'https://krim.ai' },
}

const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Krim',
  url: 'https://krim.ai',
  description:
    'Krim is a technology research, product and services company operating across the US, UK and India. Its product, KrimOS, is the agent-native operating system for regulated operations, where every action is validated before it executes.',
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
  "AI can suggest, but it can't be trusted to act. One wrong move is a compliance breach.",
  "Sensitive data can't leave the building. Cloud AI is off the table.",
  'So the work stays manual — slow, costly, hard to scale.',
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

const DEMO_HREF = 'mailto:sales@krim.ai?subject=Demo%20request%20%E2%80%94%20KrimOS'

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      <SiteHeader />
      <main>
        {/* ---- 1 · Hero — orb choreography + persistent fixed orb backdrop ---- */}
        <HomeHero />

        {/* everything below sits above the fixed orb (z-0) */}
        <div className="relative z-10">

        {/* ---- 2 · The problem ---- */}
        <Section hairline id="problem">
          <Reveal>
            <Eyebrow tone="gold">The problem</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">Regulated work is stuck.</h2>
          </Reveal>
          <div className="mt-12 max-w-[660px] space-y-6">
            {PROBLEMS.map((p, i) => (
              <Reveal key={p} delay={i * 0.1}>
                <div className="flex items-stretch gap-5">
                  {/* a quiet cyan "blocked" rule — the grammar that resolves to mint below */}
                  <span aria-hidden className="mt-1 w-px shrink-0 self-stretch bg-cyan/45" />
                  <p className="font-sans text-body-lg text-ink-2">{p}</p>
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
                <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
                  Most AI trades safety for power. This one builds both.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  Validation lets the machines act. Acting creates a record. The record makes them
                  smarter. And smarter actions clear the gate more often — so they do more, safely,
                  the longer they run.
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
              {/* PLACEHOLDER: flywheel visual is being made in Gemini.
                  Drop the asset at /public/images/flywheel.* (square, ~1000×1000)
                  and replace this block with the <Image>. Sequence to depict:
                  Validate → Act → Record → Learn, each lighting cyan then mint. */}
              <div className="glass-quiet relative mx-auto flex aspect-square w-full max-w-[420px] items-center justify-center overflow-hidden">
                <div className="absolute inset-5 rounded-[12px] border border-dashed border-soft" aria-hidden />
                <div className="px-8 text-center">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3">Flywheel visual</p>
                  <p className="mt-4 font-mono text-[12px] leading-relaxed tracking-[0.14em] text-ink-2">
                    VALIDATE → ACT →<br />RECORD → LEARN
                  </p>
                  <p className="mt-5 font-sans text-[12px] text-ink-3">image slot · /images/flywheel</p>
                </div>
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
                KrimOS — one core, every regulated domain.
              </h2>
              <p className="mx-auto mt-6 max-w-[48ch] font-sans text-body-lg text-ink-2">
                The same brain, vocabulary and co-workers across every industry. Only the rules and
                use cases change.
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
              One core, every regulated industry. The rules and use cases change; the proof and the
              learning do not.
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

        {/* ---- 7 · Proof & fit ---- */}
        <Section hairline id="proof">
          <Reveal>
            <Eyebrow>See it, slot it in</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              Every action on the record. Every system still in place.
            </h2>
            <p className="mt-6 max-w-[58ch] font-sans text-body-lg text-ink-2">
              Watch one action get checked, cleared and receipted — including the one that&rsquo;s
              refused and handed to a person. And Krim sits on what you already run: no rip, no
              replace.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-12">
              <ProofPanel />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-20">
              <IntegrationsMarquee />
            </div>
          </Reveal>
        </Section>

        {/* ---- 8 · Recognition — slim honest credibility strip ---- */}
        <Section hairline id="recognition">
          <Reveal>
            <Recognition />
          </Reveal>
        </Section>

        {/* ---- 9 · Close ---- */}
        <Section hairline id="close">
          <Reveal>
            <GlassCard className="mx-auto max-w-[720px] p-10 text-center md:p-14">
              {/* the faint perimeter motif — the sovereign boundary */}
              <div className="rounded-lg border border-soft px-6 py-10 md:px-10">
                <h2 className="font-serif text-[clamp(1.85rem,3.4vw,2.6rem)] leading-tight text-ink">
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
