/**
 * /government — the government domain. Standalone page (its own header /
 * backdrop / footer), built to docs/HOUSE-STYLE.md: calm glass + type, no
 * hand-built devices. Rhythm: hero → the challenge → why Krim fits → use
 * cases → impact → deployment → close.
 *
 * HONESTY GUARD: capability framing ONLY. "Krim fits because…" / "built for /
 * designed for" — never claimed deployments, customers, agencies, figures or
 * track record. Facts: docs/krim-content.md.
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Government',
  description:
    'KrimOS fits public-sector work: AI co-workers that automate citizen-facing and back-office operations inside your own jurisdiction, every action resting on a lawful basis, every action kept on an immutable record.',
  alternates: { canonical: 'https://www.krim.ai/government' },
  openGraph: {
    title: 'Government — Krim',
    description:
      'KrimOS fits public-sector work: AI co-workers that automate citizen-facing and back-office operations inside your own jurisdiction, every action resting on a lawful basis, every action kept on an immutable record.',
    url: 'https://www.krim.ai/government',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Government', item: 'https://www.krim.ai/government' },
  ],
}

const CTA_HREF =
  '/contact'

// the public-sector bar — what makes generic AI a non-starter here
const CHALLENGES = [
  {
    name: 'Legacy systems, rising demand',
    body: 'Casework backlogs and service queues sit on ageing systems that can’t flex with the load.',
  },
  {
    name: 'A lawful basis for everything',
    body: 'Every action a public body takes must rest on a rule that permits it, and survive scrutiny after the fact.',
  },
  {
    name: 'Citizen trust',
    body: 'Service has to be fair, explainable and consistent. Citizens are owed an answer for every decision.',
  },
  {
    name: 'Data can’t leave',
    body: 'Citizens’ records can’t cross into a foreign cloud. Any AI that needs data egress is the wrong tool.',
  },
]

// why Krim fits — three properties by construction (middle one is the heart)
const FITS = [
  {
    title: 'It runs inside your perimeter',
    body: 'KrimOS runs in your jurisdiction, behind your walls. Model weights, orchestration and citizens’ data never leave. For a public body, that sovereignty is the whole basis for using AI at all.',
  },
  {
    title: 'Every action has a lawful basis',
    body: 'Before any co-worker acts, KrimOS checks the proposed action against the rules that govern it. Nothing executes without a basis recorded, so the law is enforced by the runtime itself.',
    accent: true,
  },
  {
    title: 'Every action answers for itself',
    body: 'Each action is sealed to an immutable record: what was done, the rule that applied, and the validation result. “Why did this happen?” always has an answer on file.',
  },
]

// the same co-workers, in public-sector form — capability, not deployment
const USE_CASES = [
  {
    name: 'Citizen communication',
    body: 'Answers, reminders and status updates across channels and languages, always within the rules.',
  },
  {
    name: 'Receivables',
    body: 'Taxes, fees and dues pursued lawfully and humanely, each step resting on the statute that permits it.',
  },
  {
    name: 'Casework & documents',
    body: 'Applications and filings processed, checked and moved along, with officials kept in the loop.',
  },
  {
    name: 'Benefits servicing',
    body: 'Eligibility and servicing handled; exceptions routed to a human with the full context attached.',
  },
]

// what the capability makes possible — framed as fit, never as claimed results
const IMPACT = [
  ['Faster response', 'Routine work runs continuously, so citizens wait less.'],
  ['Cleared backlogs', 'Casework moves at machine pace, not queue pace.'],
  ['Lawful by construction', 'No action proceeds without a basis behind it.'],
  ['Every action auditable', 'A complete trail stands ready for inspection.'],
]

export default function GovernmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <SiteHeader />
      <main className="relative z-10">
        {/* ---- 1 · Hero ---- */}
        <Section className="!pt-24 !pb-24 min-h-[85vh] flex items-center [&>div]:w-full">
          <div className="mx-auto max-w-[860px] text-center">
            <Reveal>
              <Eyebrow tone="dim">Government</Eyebrow>
              <h1 className="mt-5 font-serif text-display-hero text-ink">
                Public service that can <span className="text-grad">answer for every action</span>.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[54ch] font-sans text-body-lg text-ink-2">
                AI co-workers for citizen-facing and back-office work, inside your own jurisdiction,
                with a <span className="text-mint">lawful basis</span> behind every action.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex justify-center">
                <CTA href={CTA_HREF}>Start a conversation</CTA>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · The challenge ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow tone="gold">The public-sector bar</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              Citizens expect more. Accountability allows no shortcuts.
            </h2>
            <p className="mt-6 max-w-[62ch] font-sans text-body-lg text-ink-2">
              AI could carry the load, but in government every action has to rest on a rule,
              withstand scrutiny, and keep citizens’ data within the nation’s borders. Generic AI
              clears none of these.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CHALLENGES.map((c, i) => (
              <Reveal key={c.name} delay={(i % 4) * 0.08}>
                <div className="glass lume h-full p-7">
                  <span aria-hidden className="block h-[3px] w-12 rounded-full bg-cyan/70" />
                  <h3 className="mt-6 font-serif text-[1.3rem] leading-tight text-ink">{c.name}</h3>
                  <p className="mt-3 font-sans text-[14.5px] leading-relaxed text-ink-2">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 3 · Why Krim fits ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Built for the public sector</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
              Adopt AI without bending a rule.
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
              Sovereignty, a lawful basis for every action, and a record that answers for it. The
              things public-sector work can’t compromise on are{' '}
              <span className="text-ink">how KrimOS is built</span>.
            </p>
          </Reveal>

          <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
            {FITS.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.08} className="h-full">
                <GlassCard accent={f.accent} className="flex h-full flex-col p-7 md:p-8">
                  <span
                    aria-hidden
                    className={`block h-[3px] w-12 rounded-full ${f.accent ? 'bg-mint' : 'bg-mint/45'}`}
                  />
                  <h3 className="mt-6 font-serif text-[1.45rem] leading-tight text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-4 flex-1 font-sans text-[15px] leading-relaxed text-ink-2">
                    {f.body}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 4 · Use cases ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Use cases</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              The same co-workers, in public-sector form.
            </h2>
            <p className="mt-6 max-w-[58ch] font-sans text-body-lg text-ink-2">
              Capability built to the work the public sector actually carries.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {USE_CASES.map((u, i) => (
              <Reveal key={u.name} delay={(i % 2) * 0.08}>
                <GlassCard className="flex h-full flex-col p-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-[1.4rem] leading-tight text-ink">{u.name}</h3>
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
          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal>
              <div>
                <Eyebrow tone="dim">What it makes possible</Eyebrow>
                <h2 className="mt-4 max-w-[18ch] font-serif text-display-1 text-ink">
                  Faster service, lawful by construction, all on the record.
                </h2>
                <p className="mt-7 max-w-[50ch] font-sans text-body-lg text-ink-2">
                  The capability is the point: an automated operation where every action carries{' '}
                  <span className="text-mint">both its authority and its audit trail</span>.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="grid gap-4 sm:grid-cols-2">
                {IMPACT.map(([title, body], i) => (
                  <div
                    key={title}
                    className={`glass lume h-full bg-bg p-7 ${i === 0 ? 'glass-mint' : ''}`}
                  >
                    <span
                      aria-hidden
                      className={`block h-[3px] w-12 rounded-full ${i === 0 ? 'bg-mint' : 'bg-mint/45'}`}
                    />
                    <h3 className="mt-6 font-serif text-[1.2rem] leading-tight text-ink">{title}</h3>
                    <p className="mt-3 font-sans text-[14px] leading-relaxed text-ink-2">{body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ---- 6 · Deployment ---- */}
        <Section hairline>
          <Reveal>
            <GlassCard className="mx-auto flex max-w-[860px] flex-col items-center gap-6 p-8 text-center md:flex-row md:items-center md:gap-10 md:p-10 md:text-left">
              <div className="flex-1">
                <Eyebrow>Deployment</Eyebrow>
                <h2 className="mt-3 font-serif text-display-3 leading-tight text-ink">
                  Sovereign, on your own infrastructure.
                </h2>
              </div>
              <p className="flex-1 font-sans text-body text-ink-2">
                The default for the public sector is the full stack inside your data centre.
                Nothing leaves the perimeter. Sovereignty is a commitment we hold to by default.
              </p>
            </GlassCard>
          </Reveal>
        </Section>

        {/* ---- 7 · Close ---- */}
        <Section hairline>
          <Reveal>
            <div className="mx-auto max-w-[680px] text-center">
              <h2 className="font-serif text-display-2 text-ink">
                Public service, finally at the pace of public life.
              </h2>
              <p className="mx-auto mt-5 max-w-[54ch] font-sans text-body-lg text-ink-2">
                Citizens answered in minutes, casework cleared in days, and{' '}
                <span className="text-mint">every action on a record the law can read</span> —
                inside walls that never let it leave.
              </p>
            </div>
          </Reveal>
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}
