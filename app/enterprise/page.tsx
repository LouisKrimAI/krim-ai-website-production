/**
 * /enterprise — the Large Enterprise domain. Lighter than lending: honest
 * capability framing for regulated operations at scale — insurers, telecoms,
 * utilities, healthcare payers and large financial groups running millions of
 * regulated interactions across systems that never quite talk to each other.
 *
 * Standalone page (not a LayerShell): SiteHeader · OrbBackdrop · main · SiteFooter.
 * Server component — metadata + JSON-LD + static substance live here. The two
 * animated pieces live in _client.tsx:
 *   · HeroFrame   — the enterprise.png domain image in a fine glass frame whose
 *                   hairline edge draws in once: one layer over the estate.
 *   · Unification — THE SIGNATURE DEVICE: scattered system-nodes drawing together
 *                   onto one coherent line — fragmentation resolving into one
 *                   stack. Reused, pre-settled, beneath the "Why Krim" cards.
 *
 * HONESTY GUARD: capability framing only — never claimed customers, figures,
 * logos or deployments. Copy: docs/copy/enterprise.md; prose original.
 * Grammar: cyan = proposed/thinking · mint = validated · gold = exception.
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'
import { HeroFrame, Unification } from './_client'

const DEMO = 'mailto:sales@krim.ai?subject=Demo%20request%20%E2%80%94%20KrimOS'

export const metadata: Metadata = {
  title: 'Large Enterprise — regulated operations, at scale',
  description:
    'One operating system over your whole estate: automating regulated customer and back-office work, safely, across every region and system at once.',
  alternates: { canonical: 'https://krim.ai/enterprise' },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Large Enterprise',
      item: 'https://krim.ai/enterprise',
    },
  ],
}

// § 2 — the sectors where compliance meets volume (quiet markers, not claims)
const SECTORS = ['Insurers', 'Telecoms', 'Utilities', 'Healthcare payers', 'Financial groups']

// § 4 — why Krim fits: one safe layer over everything they run
const FITS = [
  {
    name: 'Safe to automate',
    body: 'Every regulated action is validated before it executes — so AI can finally act at scale.',
  },
  {
    name: 'One stack, many systems',
    body: 'Sits over your existing estate. No rip, no replace.',
  },
  {
    name: 'Sovereign where it matters',
    body: 'Sensitive data stays inside your perimeter.',
  },
  {
    name: 'Smarter over time',
    body: 'The world model lifts performance across the whole operation.',
  },
]

// § 5 — where it helps: across customer and back office
const USE_CASES = [
  {
    name: 'Customer servicing',
    body: 'Queries, changes and support across every channel.',
  },
  {
    name: 'Compliant outbound',
    body: 'Collections, renewals and notices — always within the rules.',
  },
  {
    name: 'Back-office processing',
    body: 'Documents, data and reconciliation, at volume.',
  },
  {
    name: 'Disputes & complaints',
    body: 'Handled, tracked, resolved.',
  },
  {
    name: 'Compliance reporting',
    body: 'Evidence assembled by construction.',
  },
]

export default function EnterprisePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <SiteHeader />
      <OrbBackdrop />
      <main className="relative z-10">
        {/* ---- 1 · Hero ---- */}
        <Section className="!pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.06fr_0.94fr]">
            <div>
              <Reveal>
                <Eyebrow tone="dim">Large Enterprise</Eyebrow>
                <h1 className="mt-4 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.06] tracking-[-0.02em] text-ink">
                  Regulated operations, at scale.
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-7 max-w-[56ch] font-sans text-body-lg text-ink-2">
                  For enterprises running millions of regulated interactions across systems that
                  never quite talk to each other — one operating system that automates customer and
                  back-office work, safely, everywhere at once.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-9">
                  <CTA href={DEMO}>Book a demo</CTA>
                </div>
              </Reveal>

              {/* the signature device — fragmentation resolving into one stack */}
              <Reveal delay={0.28}>
                <div className="mt-12 glass-quiet p-6 md:p-7">
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
                      Scattered systems, drawn into one stack
                    </p>
                    <div className="flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.12em]">
                      <span className="flex items-center gap-1.5 text-ink-3">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-ink-3" /> adrift
                      </span>
                      <span className="flex items-center gap-1.5 text-mint">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-mint" /> unified
                      </span>
                    </div>
                  </div>
                  <Unification />
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <HeroFrame />
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · Who it's for ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow tone="dim">Who it&rsquo;s for</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">Where compliance meets volume.</h2>
            <p className="mt-7 max-w-[64ch] font-sans text-body-lg text-ink-2">
              Insurers, telecoms, utilities, healthcare payers and large financial groups — any
              enterprise where regulated customer and back-office operations run at huge volume,
              across regions and systems that don&rsquo;t connect.
            </p>
          </Reveal>

          {/* a quiet row of sector markers */}
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap gap-3">
              {SECTORS.map((s) => (
                <span
                  key={s}
                  className="glass-quiet px-4 py-2 font-mono text-[12.5px] uppercase tracking-[0.12em] text-ink-2"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ---- 3 · The challenge ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow tone="dim">The challenge</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
              Scale multiplies every problem.
            </h2>
            <p className="mt-7 max-w-[64ch] font-sans text-body-lg text-ink-2">
              Dozens of systems, several jurisdictions, thousands of agents — and an audit
              obligation behind all of it. Generic AI can&rsquo;t be trusted in regulated
              communications, and bolting it onto each system one at a time never ends.
            </p>
          </Reveal>
        </Section>

        {/* ---- 4 · Why Krim fits ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Why Krim</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">
              One safe layer over everything you run.
            </h2>
            <p className="mt-7 max-w-[58ch] font-sans text-body-lg text-ink-2">
              The same unification — scattered systems drawn into one stack — carried into four
              properties you can build an operation on.
            </p>
          </Reveal>

          {/* the four cards, set over a quiet, pre-settled instance of the device */}
          <div className="relative mt-12">
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 px-2 opacity-40">
              <Unification settled />
            </div>
            <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {FITS.map((f, i) => (
                <Reveal key={f.name} delay={(i % 4) * 0.07}>
                  <GlassCard accent={i === 0} hover className="flex h-full flex-col p-7">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-3 font-serif text-[1.35rem] leading-tight text-ink">
                      {f.name}
                    </h3>
                    <p className="mt-3 font-sans text-[14.5px] leading-relaxed text-ink-2">
                      {f.body}
                    </p>
                  </GlassCard>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* ---- 5 · Where it helps ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Use cases</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">
              Across customer and back office.
            </h2>
            <p className="mt-7 max-w-[58ch] font-sans text-body-lg text-ink-2">
              The work an enterprise actually carries, at volume — capability built to the bar, not
              a claim of deployment.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((u, i) => (
              <Reveal key={u.name} delay={(i % 3) * 0.07}>
                <GlassCard hover className="flex h-full flex-col p-7">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif text-[1.35rem] leading-tight text-ink">{u.name}</h3>
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="mt-4 font-sans text-[14.5px] leading-relaxed text-ink-2">
                    {u.body}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 6 · Impact ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow tone="dim">What changes</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              Lower cost to serve. Consistent compliance. Scale without the headcount.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12">
              <GlassCard accent className="p-8 md:p-12">
                <p className="max-w-[58ch] font-serif text-[clamp(1.5rem,2.8vw,2.15rem)] leading-[1.3] text-ink">
                  One way of working across regions and systems, every action audit-ready, and an
                  operation that grows without growing the team in step.
                </p>
              </GlassCard>
            </div>
          </Reveal>
        </Section>

        {/* ---- 7 · Close ---- */}
        <Section hairline>
          <Reveal>
            <h2 className="max-w-[16ch] font-serif text-display-1 text-ink">
              See it run across your estate.
            </h2>
            <p className="mt-6 max-w-[52ch] font-sans text-body-lg text-ink-2">
              Every enterprise has its own systems, regions and rules. Tell us yours.
            </p>
            <div className="mt-9">
              <CTA href={DEMO}>Book a demo</CTA>
            </div>
          </Reveal>
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}
