/**
 * /platform/karta — Karta, the AI co-workers (a core KrimOS layer).
 *
 * Deliberately simple and clear: hero → what they are (one statement) → the
 * lifecycle in plain language (the main event) → channels → control → close.
 * No dossier numbering, no spine, no attribute manifest — restraint is the design.
 * Facts: docs/krim-content.md + KRIMOS_CAPABILITIES_OVERVIEW.md.
 */

import type { Metadata } from 'next'
import LayerShell from '@/components/platform/LayerShell'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Karta — the co-workers',
  description:
    'Karta are the AI co-workers of KrimOS — software co-workers that run the lending operation across its whole lifecycle, configured not coded, on the channels customers use, with the autonomy you set.',
  alternates: { canonical: 'https://krim.ai/platform/karta' },
  openGraph: {
    title: 'Karta — the co-workers',
    description:
      'Karta are the AI co-workers of KrimOS — software co-workers that run the lending operation across its whole lifecycle, configured not coded, with the autonomy you set.',
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

// the lending lifecycle in plain language — what the co-workers do at each stage
const LIFECYCLE: [string, string][] = [
  ['Origination', 'Take the application, verify identity, prepare the documents, and disburse.'],
  ['Servicing', 'Answer questions, take payments, and make changes — by voice or chat, day or night.'],
  ['Collections', 'Remind, negotiate, and set up payment plans — every step inside the rules.'],
  ['Recovery', 'Work hardship, disputes, legal steps and closure for the difficult cases.'],
  ['Oversight', 'Score risk, watch the portfolio, and keep every action audited and explainable.'],
]

const CHANNELS = ['Voice', 'SMS', 'WhatsApp', 'Email', 'Web chat']
const MODES: [string, string][] = [
  ['Manual', 'it drafts; a person sends'],
  ['Supervised', 'it acts; a person can step in'],
  ['Autonomous', 'it runs on its own, inside the rules'],
]

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

        {/* ---- What they are — one clear statement ---- */}
        <Section hairline>
          <div className="mx-auto max-w-[760px] text-center">
            <Reveal>
              <Eyebrow>What they are</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">
                Software co-workers, not chatbots.
              </h2>
              <p className="mx-auto mt-6 max-w-[58ch] font-sans text-body-lg text-ink-2">
                Each one runs a real part of your operation. You{' '}
                <span className="text-mint">configure</span> what it can do, its limits, and how far
                it acts on its own — no engineering cycle. And every action it takes clears the same
                validation gate first.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ---- The lifecycle, in plain language — the main event ---- */}
        <Section hairline>
          <div className="mx-auto max-w-[940px]">
            <Reveal>
              <div className="max-w-[640px]">
                <Eyebrow>Across the lifecycle</Eyebrow>
                <h2 className="mt-4 font-serif text-display-1 text-ink">
                  A co-worker for every stage of the loan.
                </h2>
                <p className="mt-6 font-sans text-body-lg text-ink-2">
                  From the first application to final closure — each stage handled, configured to
                  your products and policies.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 border-t border-soft">
              {LIFECYCLE.map(([stage, does], i) => (
                <Reveal key={stage} delay={(i % 5) * 0.05}>
                  <div className="grid items-baseline gap-x-10 gap-y-1.5 border-b border-soft py-7 md:grid-cols-[260px_1fr] md:py-8">
                    <h3 className="font-serif text-[clamp(1.5rem,2.4vw,1.9rem)] leading-tight text-ink">
                      {stage}
                    </h3>
                    <p className="max-w-[52ch] font-sans text-body-lg text-ink-2">{does}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* ---- Channels ---- */}
        <Section hairline>
          <div className="mx-auto max-w-[760px] text-center">
            <Reveal>
              <Eyebrow>Where they work</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">
                They meet customers where they are.
              </h2>
              <p className="mx-auto mt-6 max-w-[54ch] font-sans text-body-lg text-ink-2">
                One conversation that remembers — inbound and outbound, in the customer&rsquo;s own
                language, handed to a person the moment it&rsquo;s needed.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
                {CHANNELS.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-white/12 bg-white/[0.03] px-5 py-2 font-sans text-body text-ink"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ---- Control ---- */}
        <Section hairline>
          <div className="mx-auto max-w-[940px]">
            <Reveal>
              <div className="mx-auto max-w-[640px] text-center">
                <Eyebrow>In your control</Eyebrow>
                <h2 className="mt-4 font-serif text-display-1 text-ink">You decide how far they go.</h2>
                <p className="mx-auto mt-6 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  Set the autonomy of each co-worker, and move the line as confidence grows.
                </p>
              </div>
            </Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {MODES.map(([mode, gloss], i) => (
                <Reveal key={mode} delay={i * 0.08}>
                  <div className="h-full rounded-lg border border-soft bg-white/[0.015] p-7 text-center">
                    <p className="font-serif text-[1.5rem] leading-tight text-ink">{mode}</p>
                    <p className="mt-2 font-sans text-body text-ink-2">{gloss}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-8 max-w-[52ch] text-center font-sans text-body text-ink-3">
                Low-confidence or high-risk actions always wait for a person.
              </p>
            </Reveal>
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
