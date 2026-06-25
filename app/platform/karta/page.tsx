/**
 * /platform/karta — Karta, the AI co-workers (a core KrimOS layer).
 *
 * Standard layer-page shape: hero → what they are → the co-workers (named
 * cards) → where they run (contact centre + back office) → close. Grounded in
 * the canonical eight (docs/krim-content.md), not the deeper platform list.
 */

import type { Metadata } from 'next'
import LayerShell from '@/components/platform/LayerShell'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Karta — the co-workers',
  description:
    'Karta are the AI co-workers of KrimOS — software co-workers that run the lending operation across the contact centre and the back office, configured not coded, in the customer’s own language.',
  alternates: { canonical: 'https://krim.ai/platform/karta' },
  openGraph: {
    title: 'Karta — the co-workers',
    description:
      'Karta are the AI co-workers of KrimOS — software co-workers that run the lending operation across the contact centre and the back office, configured not coded.',
    url: 'https://krim.ai/platform/karta',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'KrimOS', item: 'https://krim.ai/platform' },
    { '@type': 'ListItem', position: 3, name: 'Karta', item: 'https://krim.ai/platform/karta' },
  ],
}

// the co-workers — the canonical eight (docs/krim-content.md · Karta)
const TYPES: [string, string][] = [
  ['Vox-Out', 'Outbound voice — reminders, negotiation, retention, across the lifecycle.'],
  ['Vox-In', 'Inbound voice — servicing and payment queries, disputes, warm transfer to a person.'],
  ['Doc', 'Documents and notices — agreements, statements, arrears notices, confirmations.'],
  ['Risk', 'Operational risk — segments and gates actions on your own risk and fraud flags.'],
  ['Decide', 'Next-best-action — resolves conflicts across competing strategies.'],
  ['Cure', 'Delinquency cure — journeys that bring borrowers back to good standing.'],
  ['Audit', 'Interaction review — pattern detection and anomaly surfacing for compliance.'],
  ['Report', 'Operational reporting — aggregated for ops, risk, compliance and the board.'],
]

// where they run — two operational surfaces
const CONTACT_CENTRE: [string, string][] = [
  ['Inbound support', 'Queries, payments and disputes — answered, or handed to a person.'],
  ['Outbound campaigns', 'Reminders, collections and retention, on the right channel.'],
  ['Onboarding', 'Applications taken and customers guided to a decision.'],
  ['Retention', 'Renewals, cross-sell and win-back, at the right moment.'],
]
const BACK_OFFICE: [string, string][] = [
  ['Documentation', 'Agreements, statements, schedules and notices, generated and tracked.'],
  ['Payments & reconciliation', 'Billing, mandates, plans and reconciliation across rails.'],
  ['Risk & monitoring', 'The portfolio watched for delinquency, drift and fraud.'],
  ['Compliance & reporting', 'Every action audited, explained and reported.'],
]

// what every co-worker can do
const CAPABILITIES: [string, string][] = [
  ['Act, not just answer', 'They complete real work — calls, documents, payments — not just replies.'],
  ['Across channels', 'Voice, SMS, WhatsApp, email and chat, in one thread that remembers.'],
  ['In the customer’s language', 'They meet people in their own language.'],
  ['Within the rules', 'Every action clears the validation gate before it fires.'],
  ['Hand off to a person', 'A warm transfer with full context, the moment it’s needed.'],
  ['Around the clock', 'Every hour, at any volume, without a queue.'],
]

// the outcomes — qualitative, not promised numbers
const IMPACTS: [string, string][] = [
  ['Scale without the headcount', 'The book can grow without the cost line growing with it.'],
  ['Faster, every time', 'Applications, queries and resolutions move at digital speed.'],
  ['Consistent and compliant', 'The same standard on every contact — and on the record.'],
  ['Better recovery', 'More right-party contact and more cures — always within the rules.'],
]

function AreaPanel({
  kicker,
  title,
  blurb,
  accent,
  areas,
}: {
  kicker: string
  title: string
  blurb: string
  accent: 'cyan' | 'mint'
  areas: [string, string][]
}) {
  return (
    <GlassCard className="h-full p-8 md:p-9">
      <span
        aria-hidden
        className={`block h-[3px] w-12 rounded-full ${accent === 'cyan' ? 'bg-cyan/70' : 'bg-mint/70'}`}
      />
      <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">{kicker}</p>
      <h3 className="mt-2 font-serif text-[1.6rem] leading-tight text-ink">{title}</h3>
      <p className="mt-3 font-sans text-body text-ink-2">{blurb}</p>
      <ul className="mt-7 space-y-5 border-t border-soft pt-7">
        {areas.map(([name, line]) => (
          <li key={name} className="flex gap-3.5">
            <span
              aria-hidden
              className={`mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full ${accent === 'cyan' ? 'bg-cyan' : 'bg-mint'}`}
            />
            <span className="font-sans text-body text-ink-2">
              <span className="text-ink">{name}</span> — {line}
            </span>
          </li>
        ))}
      </ul>
    </GlassCard>
  )
}

export default function KartaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <LayerShell slug="karta">
        {/* ---- Hero ---- */}
        <Section className="!pt-10">
          <div className="mx-auto max-w-[820px] text-center">
            <Reveal>
              <Eyebrow>The co-workers</Eyebrow>
              <h1 className="mt-4 font-serif text-display-hero text-ink">
                A workforce for the whole loan.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                The AI co-workers that do the operation&rsquo;s work — across the whole lending
                lifecycle, in the <span className="text-mint">customer&rsquo;s own language</span>,
                with you setting how far each one goes.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ---- What they are ---- */}
        <Section hairline>
          <div className="mx-auto max-w-[760px] text-center">
            <Reveal>
              <Eyebrow>What they are</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">
                Software co-workers, not chatbots.
              </h2>
              <p className="mx-auto mt-6 max-w-[58ch] font-sans text-body-lg text-ink-2">
                Each one runs a real part of your operation. You{' '}
                <span className="text-mint">configure</span> what it can do and its limits — no
                engineering cycle — and every action it takes clears the validation gate first.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ---- The co-workers — named cards ---- */}
        <Section hairline>
          <Reveal>
            <div className="mx-auto max-w-[640px] text-center">
              <Eyebrow>The co-workers</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">Meet the team.</h2>
              <p className="mx-auto mt-6 font-sans text-body-lg text-ink-2">
                A set of specialised co-workers, each owning one kind of work — configured to your
                segments, scripts and policies.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {TYPES.map(([name, line], i) => (
              <Reveal key={name} delay={(i % 2) * 0.08}>
                <div className="glass lume flex h-full items-baseline gap-5 rounded-lg p-6 md:p-7">
                  <span className="shrink-0 font-serif text-[1.4rem] leading-none text-ink">{name}</span>
                  <span className="font-sans text-body text-ink-2">{line}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- Where they run — contact centre + back office ---- */}
        <Section hairline>
          <Reveal>
            <div className="mx-auto max-w-[680px] text-center">
              <Eyebrow>Where they run</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">
                Across the contact centre and the back office.
              </h2>
              <p className="mx-auto mt-6 font-sans text-body-lg text-ink-2">
                The same co-workers cover the customer-facing surface and the operational engine
                behind it — one workforce, end to end.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid items-stretch gap-5 md:grid-cols-2 md:gap-6">
            <Reveal className="h-full">
              <AreaPanel
                kicker="Contact centre"
                title="The customer-facing surface."
                blurb="Inbound and outbound, across voice, SMS, WhatsApp, email and chat — one conversation that remembers."
                accent="cyan"
                areas={CONTACT_CENTRE}
              />
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <AreaPanel
                kicker="Back office"
                title="The operational engine."
                blurb="The work behind every loan — documents, money, risk and the record, handled and kept straight."
                accent="mint"
                areas={BACK_OFFICE}
              />
            </Reveal>
          </div>
        </Section>

        {/* ---- Capabilities ---- */}
        <Section hairline>
          <Reveal>
            <div className="mx-auto max-w-[640px] text-center">
              <Eyebrow>Capabilities</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">What every co-worker can do.</h2>
              <p className="mx-auto mt-6 font-sans text-body-lg text-ink-2">
                The same core abilities, whichever co-worker you put to work.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:auto-rows-fr lg:grid-cols-3">
            {CAPABILITIES.map(([title, line], i) => (
              <Reveal key={title} delay={(i % 3) * 0.06} className="h-full">
                <div className="glass lume h-full rounded-lg p-7">
                  <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-mint" />
                  <h3 className="mt-5 font-serif text-[1.3rem] leading-tight text-ink">{title}</h3>
                  <p className="mt-2.5 font-sans text-body text-ink-2">{line}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- Impacts ---- */}
        <Section hairline>
          <Reveal>
            <div className="mx-auto max-w-[640px] text-center">
              <Eyebrow>The impact</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">What changes when they run it.</h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 md:auto-rows-fr md:grid-cols-2">
            {IMPACTS.map(([title, line], i) => (
              <Reveal key={title} delay={(i % 2) * 0.08} className="h-full">
                <div className="glass lume h-full rounded-lg p-8">
                  <h3 className="font-serif text-[1.5rem] leading-tight text-ink">{title}</h3>
                  <p className="mt-3 font-sans text-body-lg text-ink-2">{line}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- Close ---- */}
        <Section hairline>
          <div className="mx-auto max-w-[720px] text-center">
            <Reveal>
              <h2 className="font-serif text-display-2 text-ink">A workforce that compounds.</h2>
              <p className="mx-auto mt-5 max-w-[50ch] font-sans text-body-lg text-ink-2">
                Configured by you, governed by the runtime, and{' '}
                <span className="text-mint">sharper with every interaction</span> — so the operation
                improves the more it runs.
              </p>
            </Reveal>
          </div>
        </Section>
      </LayerShell>
    </>
  )
}
