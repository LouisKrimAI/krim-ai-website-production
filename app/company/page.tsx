/**
 * /company — who Krim is: the thesis, the name, the markets.
 * STANDALONE pattern (like app/page.tsx + app/platform/page.tsx):
 * SiteHeader + OrbBackdrop + <main className="relative z-10"> + SiteFooter,
 * metadata + BreadcrumbList JSON-LD. NOT LayerShell.
 * Content-first, calm, premium. No team/leadership section (by decision).
 * No hero image, no devices. Facts: docs/krim-content.md (Global · Contact).
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Company',
  description:
    'Krim is a technology research, product and services company operating across the US, UK and India. We made proof the runtime and keep the system inside your perimeter — so machines can finally act in regulated work, and the system compounds.',
  alternates: { canonical: 'https://krim.ai/company' },
  openGraph: {
    title: 'Company — Krim',
    description:
      'Krim is a technology research, product and services company operating across the US, UK and India. We made proof the runtime and keep the system inside your perimeter — so machines can finally act in regulated work, and the system compounds.',
    url: 'https://krim.ai/company',
  },
}

const DEMO_HREF = '/contact'

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Company', item: 'https://krim.ai/company' },
  ],
}

const RECOGNITION = ['NVIDIA Inception', 'DPIIT · Startup India', 'STPI-incubated']

const MARKETS = [
  { region: 'United States', note: 'FDCPA · TCPA · Reg F encoded' },
  { region: 'United Kingdom', note: 'FCA Consumer Duty · CONC encoded' },
  { region: 'India', note: 'RBI circulars · Fair Practices Code encoded' },
]

// Monogram avatar — placeholder until real headshots are supplied. When they
// land, swap the initials span for a next/image fill inside the same circle.
function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  return ((parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase()
}

function Avatar({ name, size = 'md' }: { name: string; size?: 'md' | 'lg' }) {
  const dim = size === 'lg' ? 'h-20 w-20 text-[1.45rem]' : 'h-16 w-16 text-[1.15rem]'
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-full border border-strong bg-white/[0.03] font-serif tracking-[0.02em] text-mint ${dim}`}
    >
      {initials(name)}
    </span>
  )
}

export default function CompanyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <SiteHeader />
      <OrbBackdrop />
      <main className="relative z-10">
        {/* ---- 1 · Hero ---- */}
        <Section className="!pt-24">
          <div className="mx-auto max-w-[860px] text-center">
            <Reveal>
              <Eyebrow>Company · US · UK · India</Eyebrow>
              <h1 className="mt-5 font-serif text-display-hero text-ink">
                We build the proof that lets machines act.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[56ch] font-sans text-body-lg text-ink-2">
                Krim is a technology research, product and services company. We make one thing:{' '}
                <span className="text-ink">KrimOS</span>, the operating system for regulated
                operations — built and run across the US, UK and India.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · The thesis — the spine, one literary passage ---- */}
        <Section hairline>
          <div className="mx-auto max-w-[820px]">
            <Reveal>
              <Eyebrow>The thesis</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <GlassCard accent className="mt-6 p-9 md:p-14">
                <p className="font-serif text-[clamp(1.5rem,3vw,2.15rem)] leading-[1.32] text-ink">
                  The institutions that move the world&rsquo;s money and serve its citizens could
                  never run on AI they couldn&rsquo;t prove, or risk what left their walls. So the
                  most consequential work stayed manual — too important to automate, too costly to
                  leave alone.
                </p>
                <p className="mt-7 font-serif text-[clamp(1.5rem,3vw,2.15rem)] leading-[1.32] text-ink-2">
                  Krim made <span className="text-mint">proof the runtime</span> — every action
                  validated before it can execute — and kept the whole system{' '}
                  <span className="text-ink">inside the perimeter</span>, where the data already
                  lives. With those two settled, the machines can finally act. And because they act
                  on a single record, the system learns the operation and{' '}
                  <span className="text-mint">compounds</span> with every action it takes.
                </p>
                <p className="mt-9 font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
                  Validated before it acts · Smarter after it acts · Never leaves your walls
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 3 · The name ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow>The name</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  Judgment, made checkable.
                </h2>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  Our validator is <span className="text-ink">Krim-Nyāya</span>. It draws on{' '}
                  <span className="text-ink">Navya-Nyāya</span> — the formal-logic tradition of
                  Mithila, two thousand years of rigorous reasoning about what follows from what.
                </p>
                <p className="mt-5 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  Substance, not mysticism. It gives us a precise grammar for turning a regulation
                  into a check a machine can run, and a decision into something an auditor can read.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard className="p-9 md:p-11">
                <p className="font-serif text-[clamp(1.3rem,2.4vw,1.75rem)] leading-snug text-ink">
                  A two-thousand-year discipline of formal logic, put to work as the runtime that
                  decides whether an action is allowed to happen at all.
                </p>
                <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
                  Navya-Nyāya · Mithila → Krim-Nyāya
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 3.5 · Team — founder + founding team (monogram placeholders until headshots land) ---- */}
        <Section hairline>
          <div className="mx-auto max-w-[820px] text-center">
            <Reveal>
              <Eyebrow>Team</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">The people behind the proof.</h2>
              <p className="mx-auto mt-6 max-w-[48ch] font-sans text-body-lg text-ink-2">
                A research-and-engineering team building KrimOS across the US, UK and India.
              </p>
            </Reveal>
          </div>

          {/* Founder */}
          <Reveal delay={0.08}>
            <div className="mx-auto mt-12 max-w-[520px]">
              <div className="glass lume flex items-center gap-6 p-7 md:p-8">
                <Avatar name="Vishwa Nath Jha" size="lg" />
                <div>
                  <h3 className="font-serif text-[1.5rem] leading-none text-ink">Vishwa Nath Jha</h3>
                  <p className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
                    CEO &amp; Founder
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Founding team */}
          <Reveal delay={0.12}>
            <p className="mt-14 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
              Founding team
            </p>
          </Reveal>
          <div className="mx-auto mt-8 grid max-w-[880px] grid-cols-2 gap-5 sm:grid-cols-3">
            {['Om Mishra', 'Nachiketa Jha', 'Nakshatra Kanchan', 'Mohit Singh', 'Devansh Jindal', 'Divyansh Gupta'].map(
              (name, i) => (
                <Reveal key={name} delay={0.04 * i}>
                  <div className="glass flex h-full flex-col items-center gap-4 p-6 text-center">
                    <Avatar name={name} size="md" />
                    <p className="font-serif text-[1.15rem] leading-tight text-ink">{name}</p>
                  </div>
                </Reveal>
              ),
            )}
          </div>
        </Section>

        {/* ---- 4 · Recognition — modest, honest text strip (no badge images) ---- */}
        <Section hairline>
          <div className="mx-auto max-w-[760px] text-center">
            <Reveal>
              <Eyebrow tone="dim">Recognition</Eyebrow>
              <p className="mt-5 font-serif text-[clamp(1.3rem,2.4vw,1.7rem)] leading-snug text-ink-2">
                Recognised by{' '}
                <span className="text-ink">NVIDIA Inception</span>,{' '}
                <span className="text-ink">DPIIT (Startup India)</span> and{' '}
                <span className="text-ink">STPI</span>.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-3">
                {RECOGNITION.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>

        {/* ---- 5 · Markets & contact ---- */}
        <Section hairline>
          <Reveal>
            <div className="mx-auto max-w-[760px] text-center">
              <Eyebrow>Markets</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">
                Three jurisdictions, one runtime.
              </h2>
              <p className="mx-auto mt-6 max-w-[52ch] font-sans text-body-lg text-ink-2">
                We build and deploy across three regulatory worlds. The same system runs in each —
                only the rules it enforces change.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {MARKETS.map((m, i) => (
              <Reveal key={m.region} delay={i * 0.08}>
                <div className="glass lume h-full p-7">
                  <span aria-hidden className="block h-[3px] w-12 rounded-full bg-mint/70" />
                  <h3 className="mt-6 font-serif text-[1.4rem] leading-tight text-ink">{m.region}</h3>
                  <p className="mt-3 font-sans text-body text-ink-2">{m.note}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <GlassCard className="mx-auto mt-14 max-w-[720px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-3 leading-tight text-ink">
                See it on the stack you already run.
              </h2>
              <p className="mx-auto mt-5 max-w-[48ch] font-sans text-body text-ink-2">
                Talk to us about a pilot, or write to{' '}
                <a
                  href="mailto:sales@krim.ai"
                  className="text-mint underline-offset-4 transition-colors hover:underline"
                >
                  sales@krim.ai
                </a>
                .
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-6">
                <CTA href={DEMO_HREF}>Book a demo</CTA>
                <CTA href="/platform" variant="secondary">
                  Explore KrimOS
                </CTA>
              </div>
            </GlassCard>
          </Reveal>
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}
