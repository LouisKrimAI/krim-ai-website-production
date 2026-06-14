/**
 * /msme — the MSME / mid-market domain. Standalone page (its own header /
 * backdrop / footer). A touch warmer and more approachable than the regulated
 * domains: confidence framing, not compliance. The same trustworthy automation
 * built for banks and governments, sized for a growing business.
 *
 * Server component — metadata + JSON-LD + static substance. The two animated
 * pieces live in _client.tsx:
 *   · HeroFrame      — the msme.png in a warm glass frame.
 *   · ValidatedTasks — THE SIGNATURE DEVICE: rigor made approachable. Ordinary
 *                      business tasks each receiving the mint "validated" check.
 *
 * Copy: docs/copy/msme.md — facts only, prose original.
 * Grammar: cyan = proposed · mint = validated · gold = exception.
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'
import { HeroFrame, ValidatedTasks } from './_client'

const DEMO = 'mailto:sales@krim.ai?subject=Demo%20request%20%E2%80%94%20KrimOS'

export const metadata: Metadata = {
  title: 'MSME — regulation-grade AI workers for everyday operations',
  description:
    'The same trustworthy automation built for banks and governments, sized for a growing business — every action validated before it acts, and kept on the record.',
  alternates: { canonical: 'https://krim.ai/msme' },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'MSME', item: 'https://krim.ai/msme' },
  ],
}

// ---------------------------------------------------------------- content

// section 4 — why Krim fits. The middle pair carries the "regulation-grade,
// made accessible" idea: validated, and on the record.
const REASONS = [
  {
    name: 'Validated before it acts',
    body: 'Every action is checked first, so mistakes don&rsquo;t reach your customers.',
  },
  {
    name: 'On the record',
    body: 'Everything it does is logged and reviewable — nothing happens in the dark.',
  },
  {
    name: 'Fast to start',
    body: 'Fully managed, with no infrastructure to stand up. You don&rsquo;t run it; we do.',
  },
  {
    name: 'Better as it works',
    body: 'It learns your operation and sharpens over time — the more it runs, the more it knows.',
  },
]

// section 5 — where it helps. The work that eats the week.
const USE_CASES = [
  {
    name: 'Customer support',
    body: 'Answers and servicing across channels, day and night — without the queue.',
  },
  {
    name: 'Follow-ups',
    body: 'Reminders, renewals and re-engagement, on time — nothing slips.',
  },
  {
    name: 'Receivables',
    body: 'Collections handled steadily and fairly, in a tone you&rsquo;d stand behind.',
  },
  {
    name: 'Back office',
    body: 'Documents, data and routine workflows, done — the paperwork that piles up.',
  },
]

export default function MsmePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <SiteHeader />
      <OrbBackdrop />
      <main className="relative z-10">
        {/* ════════════════════ 1 · Hero ════════════════════ */}
        <Section className="!pt-12 md:!pt-16">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Reveal>
                <Eyebrow>MSME</Eyebrow>
                <h1 className="mt-5 font-serif text-display-hero text-ink">
                  Regulation-grade AI workers, for everyday operations.
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-7 max-w-[54ch] font-sans text-body-lg text-ink-2">
                  The same trustworthy automation built for banks and governments —{' '}
                  <span className="text-ink">sized for a growing business</span>. Automate
                  customer and back-office work with AI you can actually rely on.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                  <CTA href={DEMO}>Book a demo</CTA>
                  <CTA href="#why" variant="secondary">
                    See why it&rsquo;s different
                  </CTA>
                </div>
              </Reveal>
              {/* the signature device — rigor made approachable, up front */}
              <Reveal delay={0.24}>
                <div className="mt-12">
                  <ValidatedTasks />
                </div>
              </Reveal>
            </div>

            {/* the modular-cubes motif, framed in warm glass */}
            <Reveal delay={0.15}>
              <HeroFrame />
            </Reveal>
          </div>
        </Section>

        {/* ════════════════════ 2 · Who it's for ════════════════════ */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Who it&rsquo;s for</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">
              Built for the bar, available to the rest.
            </h2>
            <p className="mt-7 max-w-[62ch] font-sans text-body-lg text-ink-2">
              Medium-sized enterprises in any industry, automating customer service and
              back-office work. You may not have a regulator looking over your shoulder — but you{' '}
              <span className="text-ink">
                still can&rsquo;t afford AI that gets it wrong
              </span>{' '}
              in front of customers, or with money.
            </p>
          </Reveal>
        </Section>

        {/* ════════════════════ 3 · The challenge ════════════════════ */}
        <Section hairline>
          <Reveal>
            <Eyebrow tone="gold">The challenge</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">Growth outruns the team.</h2>
            <p className="mt-7 max-w-[62ch] font-sans text-body-lg text-ink-2">
              Customer questions, follow-ups, collections and paperwork pile up faster than you
              can hire. Off-the-shelf AI is quick to start and{' '}
              <span className="text-ink">impossible to trust</span> — it makes things up, and no
              one&rsquo;s checking. So the work stays manual.
            </p>
          </Reveal>
        </Section>

        {/* ════════════════════ 4 · Why Krim fits ════════════════════ */}
        <Section id="why" hairline>
          <Reveal>
            <Eyebrow tone="mint">Why Krim</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">
              Automation you can trust, without the enterprise price.
            </h2>
            <p className="mt-7 max-w-[58ch] font-sans text-body-lg text-ink-2">
              Four properties, built in. The first two are the heart of it — the rigor banks rely
              on, made accessible: <span className="text-ink">validated, and on the record</span>.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {REASONS.map((r, i) => (
              <Reveal key={r.name} delay={(i % 2) * 0.08}>
                <GlassCard
                  hover
                  accent={i === 0}
                  className="flex h-full flex-col p-7 md:p-8"
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif text-[1.5rem] leading-none text-ink">{r.name}</h3>
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p
                    className="mt-4 font-sans text-[15px] leading-relaxed text-ink-2"
                    dangerouslySetInnerHTML={{ __html: r.body }}
                  />
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ════════════════════ 5 · Where it helps ════════════════════ */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Use cases</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">
              The work that eats your week.
            </h2>
            <p className="mt-7 max-w-[58ch] font-sans text-body-lg text-ink-2">
              The same co-workers that run regulated operations, pointed at the everyday jobs
              that never quite get done.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {USE_CASES.map((u, i) => (
              <Reveal key={u.name} delay={(i % 2) * 0.08}>
                <GlassCard className="flex h-full flex-col p-7">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif text-[1.4rem] leading-none text-ink">{u.name}</h3>
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p
                    className="mt-4 font-sans text-[14.5px] leading-relaxed text-ink-2"
                    dangerouslySetInnerHTML={{ __html: u.body }}
                  />
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ════════════════════ 6 · Impact ════════════════════ */}
        <Section hairline>
          <Reveal>
            <Eyebrow tone="dim">What changes</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              Do more, without doing it all yourself.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12">
              <GlassCard accent className="p-8 md:p-12">
                <p className="max-w-[58ch] font-serif text-[clamp(1.5rem,2.8vw,2.15rem)] leading-[1.3] text-ink">
                  Automate the operations that scale your business — with the confidence that
                  every action was checked first. Enterprise-grade capability, at a size that
                  fits.
                </p>
              </GlassCard>
            </div>
          </Reveal>
        </Section>

        {/* ════════════════════ 7 · Close ════════════════════ */}
        <Section hairline>
          <Reveal>
            <div className="mx-auto max-w-[760px] text-center">
              <h2 className="font-serif text-[clamp(1.8rem,3.4vw,2.7rem)] leading-tight text-ink">
                See what it can take off your plate.
              </h2>
              <p className="mx-auto mt-5 max-w-[52ch] font-sans text-body-lg text-ink-2">
                Tell us the work that eats your week — we&rsquo;ll show you the same automation
                banks trust, sized for you.
              </p>
              <div className="mt-9 flex justify-center">
                <CTA href={DEMO}>Book a demo</CTA>
              </div>
            </div>
          </Reveal>
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}
