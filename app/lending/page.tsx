/**
 * /lending — the flagship domain page. From docs/copy/lending.md.
 * The whole loan, start to finish: one system that carries the customer line
 * (Kira) and the back-office line (Karta) through the entire lifecycle, every
 * action validated before it executes, the rulebook switched per market.
 *
 * Standalone page (not a LayerShell): SiteHeader · OrbBackdrop · main · SiteFooter.
 * Server component — metadata + JSON-LD + static substance. The four signature
 * devices live in _client.tsx:
 *   · JourneySpine   — section 3, the CENTREPIECE: a steppable spine from
 *                      Application → Payoff, two threads (Kira above, Karta
 *                      below) converging at each stage where a cyan→mint pulse
 *                      marks the action clearing validation; the spine fills mint.
 *   · MarketSelector — section 4: India · UK · US switch one glass panel of that
 *                      market's frameworks, cyan→mint on each switch.
 *   · RoleSelector   — section 5: a quiet row of titles surfaces each twin's
 *                      promise in a single glass panel.
 *   · ImpactCurve    — section 6: four stat cards over a slim rising curve,
 *                      Q1 → Q2 → Year two, drawn on view.
 * Facts only, per the deck; impact numbers are ranges, measured against your
 * own baseline — never promises.
 *
 * Grammar: cyan = proposed/thinking · mint = validated · gold = exception.
 */

import type { Metadata } from 'next'
import Image from 'next/image'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard, CTA, Stat } from '@/components/ui'
import {
  HeroTrace,
  ProblemWall,
  JourneySpine,
  MarketSelector,
  RoleSelector,
  ImpactCurve,
  PerimeterMotif,
} from './_client'

const DEMO = 'mailto:sales@krim.ai?subject=Demo%20request%20%E2%80%94%20KrimOS'

export const metadata: Metadata = {
  title: 'Lending — the whole loan, start to finish',
  description:
    'KrimOS runs the whole loan, start to finish — every customer conversation and every back-office task on one system that validates each action before it executes, across India, the UK and the US.',
  alternates: { canonical: 'https://krim.ai/lending' },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Lending', item: 'https://krim.ai/lending' },
  ],
}

// ---------------------------------------------------------------- content

const DEPLOYMENTS = [
  {
    name: 'On-premise',
    body: 'Entirely inside your own data centre — the model, the data and every action never leave the walls you already trust.',
  },
  {
    name: 'Hybrid',
    body: 'A line drawn where you want it: sensitive records stay in, the rest runs where it is most efficient — the split is yours to set.',
  },
  {
    name: 'Fully managed',
    body: 'Run for you inside a perimeter you define — sovereign by construction, with no foreign API anywhere in the loop.',
  },
]

export default function LendingPage() {
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
                <Eyebrow>Lending</Eyebrow>
                <h1 className="mt-5 font-serif text-display-hero text-ink">
                  The whole loan,
                  <br />
                  start to finish.
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-7 max-w-[54ch] font-sans text-body-lg text-ink-2">
                  Every customer conversation and every back-office task —{' '}
                  <span className="text-ink">on one system that validates each action</span> before
                  it happens, and learns the operation as it runs.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                  <CTA href={DEMO}>Book a demo</CTA>
                  <CTA href="#lifecycle" variant="secondary">
                    See it run a loan
                  </CTA>
                </div>
              </Reveal>
              {/* the fine line of light — application → payoff, foreshadowing the spine */}
              <Reveal delay={0.24}>
                <div className="mt-12">
                  <HeroTrace />
                </div>
              </Reveal>
            </div>

            {/* the lending-lifecycle motif, framed in glass */}
            <Reveal delay={0.15}>
              <GlassCard className="overflow-hidden p-2.5 md:p-3">
                <div className="relative aspect-[1792/2400] overflow-hidden rounded-[10px]">
                  <Image
                    src="/images/domains/lending.png"
                    alt="An abstract rendering of a lending lifecycle — a single curve of light running from application through to payoff."
                    fill
                    priority
                    sizes="(max-width: 1024px) 92vw, 44vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(9,9,12,0.12) 0%, rgba(9,9,12,0) 30%, rgba(9,9,12,0) 70%, rgba(9,9,12,0.35) 100%)',
                    }}
                  />
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ════════════════════ 2 · The problem ════════════════════ */}
        <Section hairline>
          <Reveal>
            <Eyebrow tone="gold">Why lending stalls</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">Two teams, one wall.</h2>
            <p className="mt-7 max-w-[64ch] font-sans text-body-lg text-ink-2">
              Lending is run by two workforces — the people who speak to customers, and the people
              who keep the books — held apart by tickets, spreadsheets and hand-offs. Together
              they&rsquo;re <span className="text-ink">40&ndash;60% of what every loan costs</span>.
              AI could close the gap, but a regulated action you can&rsquo;t explain is a risk no
              lender will take. So the work stays manual.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-12">
              <ProblemWall />
            </div>
          </Reveal>
        </Section>

        {/* ════════════════════ 3 · The lifecycle — CENTREPIECE ════════════════════ */}
        <Section id="lifecycle" hairline>
          <Reveal>
            <Eyebrow tone="cyan">End to end</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">Two threads. One journey.</h2>
            <p className="mt-7 max-w-[64ch] font-sans text-body-lg text-ink-2">
              The same system carries both sides of the wall through the whole loan —{' '}
              <span className="text-ink">Kira with the customer, Karta in the back office</span> —
              meeting at every step, every action validated as it passes.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-12">
              <JourneySpine />
            </div>
          </Reveal>
        </Section>

        {/* ════════════════════ 4 · Compliance ════════════════════ */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Compliance, built in</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">
              Your market&rsquo;s rules, applied before each action.
            </h2>
            <p className="mt-7 max-w-[64ch] font-sans text-body-lg text-ink-2">
              <span className="text-ink">Krim-Ny&#257;ya</span> checks every action against the law
              where you lend — before it executes, not after. One system, three markets; only the
              rulebook changes.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-12">
              <MarketSelector />
            </div>
          </Reveal>
        </Section>

        {/* ════════════════════ 5 · By role ════════════════════ */}
        <Section hairline>
          <Reveal>
            <Eyebrow>For every desk</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">A twin tuned to the job.</h2>
            <p className="mt-7 max-w-[64ch] font-sans text-body-lg text-ink-2">
              Through <span className="text-ink">Kula</span>, each leader works with a digital twin
              shaped to their role — one source of truth, seen from where they sit.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-12">
              <RoleSelector />
            </div>
          </Reveal>
        </Section>

        {/* ════════════════════ 6 · Impact ════════════════════ */}
        <Section hairline>
          <Reveal>
            <Eyebrow tone="mint">What changes</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">
              Measured against your own baseline.
            </h2>
            <p className="mt-7 max-w-[64ch] font-sans text-body-lg text-ink-2">
              Ranges, not promises — scoped with you and{' '}
              <span className="text-ink">proven on your data in a 30-day pilot</span>, before
              anything goes live.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-12">
              <ImpactCurve />
            </div>
          </Reveal>
        </Section>

        {/* ════════════════════ 7 · Deployment ════════════════════ */}
        <Section hairline>
          <Reveal>
            <Eyebrow>How it runs</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">
              Where you want it, how you want it.
            </h2>
            <p className="mt-7 max-w-[64ch] font-sans text-body-lg text-ink-2">
              KrimOS deploys three ways — on-premise, hybrid, or fully managed. Which one is your
              decision, set by your data, your regulator and your preference. Whichever you choose,
              it&rsquo;s <span className="text-ink">sovereign by construction</span>: inside the
              perimeter you define, with no foreign API in the loop.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {DEPLOYMENTS.map((d, i) => (
              <Reveal key={d.name} delay={0.04 * i}>
                <GlassCard hover className="flex h-full flex-col p-7">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
                    Deployment
                  </p>
                  <h3 className="mt-3 font-serif text-[1.5rem] leading-tight text-ink">{d.name}</h3>
                  <p className="mt-4 font-sans text-[15px] leading-relaxed text-ink-2">{d.body}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>

          {/* the perimeter motif under "sovereign by construction" */}
          <Reveal delay={0.12}>
            <div className="mt-10">
              <PerimeterMotif />
            </div>
          </Reveal>
        </Section>

        {/* ════════════════════ 8 · Close ════════════════════ */}
        <Section hairline>
          <Reveal>
            <div className="mx-auto max-w-[760px] text-center">
              <h2 className="font-serif text-[clamp(1.8rem,3.4vw,2.7rem)] leading-tight text-ink">
                See it run a loan, end to end.
              </h2>
              <p className="mx-auto mt-5 max-w-[52ch] font-sans text-body-lg text-ink-2">
                One conversation, one validated action, one clean trail — application to payoff.
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
