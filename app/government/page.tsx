/**
 * /government — the government domain. Standalone page (its own header /
 * backdrop / footer). Civic, serious, still — a touch more formal and
 * restrained than the other domains. Server component: metadata + JSON-LD
 * live here; the two animated pieces (the hero perimeter frame and the
 * lawful-basis signature device) live in _client.tsx.
 *
 * HONESTY GUARD: capability framing only. "Built for / designed for" — never
 * claimed deployments, customers, figures or track record. Copy: docs/copy/
 * government.md. Grammar: cyan = proposed · mint = validated/lawful · gold =
 * exception.
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OrbBackdrop from '@/components/OrbBackdrop'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'
import { PerimeterFrame, LawfulBasis } from './_client'

export const metadata: Metadata = {
  title: 'Government — public service that can answer for every action',
  description:
    'The runtime trusted to satisfy banking regulators, built for the public sector — automating citizen-facing and back-office work, with a lawful basis and a clear record behind every action.',
  alternates: { canonical: 'https://krim.ai/government' },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Government', item: 'https://krim.ai/government' },
  ],
}

const CTA_HREF =
  'mailto:sales@krim.ai?subject=Starting%20a%20conversation%20%E2%80%94%20Krim%20for%20government'

// the three constraints generic AI fails — set against the perimeter
const CONSTRAINTS = [
  {
    name: 'Legal basis',
    body: 'Every action must rest on a rule that permits it.',
  },
  {
    name: 'Scrutiny',
    body: 'Every action must withstand inspection, after the fact.',
  },
  {
    name: 'Sovereignty',
    body: "Citizens' data must stay within the nation's borders.",
  },
]

// the four public-sector co-workers — framing is "designed for," capability
const USE_CASES = [
  {
    name: 'Citizen communication',
    body: 'Answers, reminders and updates across channels and languages — always within the rules.',
  },
  {
    name: 'Receivables',
    body: 'Taxes, fees and dues, collected lawfully and humanely.',
  },
  {
    name: 'Casework & documents',
    body: 'Applications and filings processed, checked and moved — faster.',
  },
  {
    name: 'Service & benefits',
    body: 'Eligibility and servicing handled; escalations routed to officials with full context.',
  },
]

export default function GovernmentPage() {
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
          <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <Reveal>
                <Eyebrow tone="dim">Government</Eyebrow>
                <h1 className="mt-4 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.06] tracking-[-0.02em] text-ink">
                  Public service that can answer for every action.
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-7 max-w-[54ch] font-sans text-body-lg text-ink-2">
                  The same runtime trusted to satisfy banking regulators, brought to the public
                  sector — automating citizen-facing and back-office work, with a lawful basis and a
                  clear record behind everything it does.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-9">
                  <CTA href={CTA_HREF}>Start a conversation</CTA>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <PerimeterFrame />
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · The challenge ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow tone="dim">The public-sector bar</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              Citizens expect more. Accountability allows no shortcuts.
            </h2>
            <p className="mt-7 max-w-[64ch] font-sans text-body-lg text-ink-2">
              Agencies carry rising demand on ageing systems — backlogs in casework, queues for
              every service. AI could help. But in government every action must rest on a legal
              basis, withstand scrutiny, and keep citizens&rsquo; data within the nation&rsquo;s
              borders. Generic AI manages none of these.
            </p>
          </Reveal>

          {/* three quiet constraint-markers — set against the perimeter */}
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {CONSTRAINTS.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.08}>
                <div className="glass-quiet flex h-full flex-col p-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-serif text-[1.35rem] leading-none text-ink">{c.name}</h3>
                  <p className="mt-3 font-sans text-[14.5px] leading-relaxed text-ink-2">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 3 · Why Krim fits ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Why Krim</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">
              Built for the bar government sets.
            </h2>
            <p className="mt-7 max-w-[60ch] font-sans text-body-lg text-ink-2">
              Three properties, by construction — not bolted on. The middle one is the heart of it:
              the lawful basis, made visible.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:items-start">
            {/* sovereign */}
            <Reveal>
              <GlassCard className="flex h-full flex-col p-7 md:p-8">
                <h3 className="font-serif text-[1.5rem] leading-none text-ink">
                  Sovereign by construction
                </h3>
                <p className="mt-4 flex-1 font-sans text-[15px] leading-relaxed text-ink-2">
                  Runs inside your infrastructure, in your jurisdiction. Citizens&rsquo; data never
                  leaves.
                </p>
              </GlassCard>
            </Reveal>

            {/* lawful — the signature card, spanning two columns to carry the device */}
            <Reveal delay={0.1} className="lg:col-span-2">
              <GlassCard accent className="flex h-full flex-col p-7 md:p-8">
                <h3 className="font-serif text-[1.5rem] leading-none text-ink">Lawful by design</h3>
                <p className="mt-4 max-w-[60ch] font-sans text-[15px] leading-relaxed text-ink-2">
                  Every action is checked against the rules that govern it before it happens. Nothing
                  acts without a basis.
                </p>
                <div className="mt-7">
                  <LawfulBasis />
                </div>
              </GlassCard>
            </Reveal>

            {/* accountable */}
            <Reveal delay={0.16}>
              <GlassCard className="flex h-full flex-col p-7 md:p-8">
                <h3 className="font-serif text-[1.5rem] leading-none text-ink">
                  Accountable by record
                </h3>
                <p className="mt-4 flex-1 font-sans text-[15px] leading-relaxed text-ink-2">
                  Every decision sealed to an immutable trail. The answer to &ldquo;why did this
                  happen?&rdquo; is always there.
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 4 · Where it helps ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Use cases</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">
              The same co-workers, in public-sector form.
            </h2>
            <p className="mt-7 max-w-[58ch] font-sans text-body-lg text-ink-2">
              Designed for the work the public sector actually carries — capability built to the
              bar, not a claim of deployment.
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
                  <p className="mt-4 font-sans text-[14.5px] leading-relaxed text-ink-2">{u.body}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 5 · Impact ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow tone="dim">What changes</Eyebrow>
            <h2 className="mt-4 max-w-[26ch] font-serif text-display-1 text-ink">
              Faster service. Lawful by construction. Every action on the record.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12">
              <GlassCard accent className="p-8 md:p-12">
                <p className="max-w-[58ch] font-serif text-[clamp(1.5rem,2.8vw,2.15rem)] leading-[1.3] text-ink">
                  Shorter queues and cleared backlogs, citizens answered in their own language, and —
                  for the first time — an automated operation where every action carries both its
                  authority and its audit trail.
                </p>
              </GlassCard>
            </div>
          </Reveal>
        </Section>

        {/* ---- 6 · Close ---- */}
        <Section hairline>
          <Reveal>
            <h2 className="max-w-[18ch] font-serif text-display-1 text-ink">
              Let&rsquo;s talk about your mandate.
            </h2>
            <p className="mt-6 max-w-[52ch] font-sans text-body-lg text-ink-2">
              Every public body has its own rules, systems and constraints. Tell us yours.
            </p>
            <div className="mt-9">
              <CTA href={CTA_HREF}>Start a conversation</CTA>
            </div>
          </Reveal>
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}
