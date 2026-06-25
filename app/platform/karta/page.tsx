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

// where they run — two surfaces, each operation run by specific co-workers
// (the canonical eight plus the logical agents each operation needs)
type Op = { op: string; desc: string; agents: string[] }
const CONTACT_CENTRE: Op[] = [
  { op: 'Inbound support', desc: 'Calls, chats and messages answered — or warm-transferred to a person.', agents: ['Vox-In', 'Chat'] },
  { op: 'Outbound voice', desc: 'Acquisition, servicing and collections calls across the lifecycle.', agents: ['Vox-Out'] },
  { op: 'Reminders & dunning', desc: 'Pre-due nudges and missed-payment notices, on smart timing.', agents: ['Nudge'] },
  { op: 'Onboarding & KYC', desc: 'New applications taken, identity verified, and guided to a decision.', agents: ['Onboard', 'KYC'] },
  { op: 'Collections & promises', desc: 'Right-party contact and promise-to-pay captured, inside the rules.', agents: ['Collect'] },
  { op: 'Disputes & hardship', desc: 'Grievances and hardship logged, assessed and resolved.', agents: ['Dispute', 'Hardship'] },
]
const BACK_OFFICE: Op[] = [
  { op: 'Documentation', desc: 'Agreements, statements, schedules and notices — generated and tracked.', agents: ['Doc'] },
  { op: 'Payments & reconciliation', desc: 'Billing, mandates, payment plans and reconciliation across rails.', agents: ['Pay', 'Recon'] },
  { op: 'Risk & decisioning', desc: 'Segmentation, gating and next-best-action on your own flags.', agents: ['Risk', 'Decide'] },
  { op: 'Cure journeys', desc: 'Multi-step journeys that bring delinquent borrowers back to current.', agents: ['Cure'] },
  { op: 'Recovery & closure', desc: 'Statutory recovery, settlement, payoff and write-off.', agents: ['Legal', 'Close'] },
  { op: 'Monitoring & reporting', desc: 'The portfolio watched for early warnings; every action audited and reported.', agents: ['Monitor', 'Audit', 'Report'] },
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

// what you do in Agent Studio — build and tune a co-worker, no code
const STUDIO: string[] = [
  'Create a new co-worker — from scratch, or clone one and adapt it.',
  'Program its voice — a custom voice, and how it speaks.',
  'Set its personality — tone, manner and escalation style.',
  'Design its workflow — the steps it follows, with branches and checks.',
  'Bind its skills and knowledge — the actions it can take, the policies it knows.',
  'Set its limits — authority, autonomy, and when to hand to a person.',
]

function AreaPanel({
  kicker,
  title,
  blurb,
  accent,
  ops,
}: {
  kicker: string
  title: string
  blurb: string
  accent: 'cyan' | 'mint'
  ops: Op[]
}) {
  const bar = accent === 'cyan' ? 'bg-cyan/70' : 'bg-mint/70'
  const chip = accent === 'cyan' ? 'border-cyan/25 bg-cyan/[0.06]' : 'border-mint/25 bg-mint/[0.06]'
  return (
    <GlassCard className="h-full p-8 md:p-10">
      <span aria-hidden className={`block h-[3px] w-12 rounded-full ${bar}`} />
      <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">{kicker}</p>
      <h3 className="mt-2 font-serif text-[1.7rem] leading-tight text-ink">{title}</h3>
      <p className="mt-3 max-w-[42ch] font-sans text-body text-ink-2">{blurb}</p>
      <ul className="mt-8 divide-y divide-soft border-t border-soft">
        {ops.map(({ op, desc, agents }) => (
          <li key={op} className="py-6 first:pt-7">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
              <p className="font-serif text-[1.25rem] leading-tight text-ink">{op}</p>
              <div className="flex flex-wrap gap-1.5">
                {agents.map((a) => (
                  <span
                    key={a}
                    className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink ${chip}`}
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-2 font-sans text-body text-ink-2">{desc}</p>
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
                A workforce for the <span className="text-mint">whole loan</span>.
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
                Software <span className="text-mint">co-workers</span>, not chatbots.
              </h2>
              <p className="mx-auto mt-6 max-w-[58ch] font-sans text-body-lg text-ink-2">
                Each one runs a real part of your operation. You configure what it can do and its
                limits — no engineering cycle — and every action it takes clears the validation gate
                first.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ---- The co-workers, by surface — contact centre + back office ---- */}
        <Section hairline>
          <Reveal>
            <div className="mx-auto max-w-[720px] text-center">
              <Eyebrow>The co-workers</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">
                Across the <span className="text-cyan">contact centre</span> and the{' '}
                <span className="text-mint">back office</span>.
              </h2>
              <p className="mx-auto mt-6 font-sans text-body-lg text-ink-2">
                Every operation has the co-workers that run it — the customer-facing surface, and the
                operational engine behind it.
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
                ops={CONTACT_CENTRE}
              />
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <AreaPanel
                kicker="Back office"
                title="The operational engine."
                blurb="The work behind every loan — documents, money, risk and the record, handled and kept straight."
                accent="mint"
                ops={BACK_OFFICE}
              />
            </Reveal>
          </div>
        </Section>

        {/* ---- Agent Studio — build your own co-worker ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[0.95fr_1.05fr]">
            <Reveal>
              <div>
                <Eyebrow>Agent Studio</Eyebrow>
                <h2 className="mt-4 max-w-[16ch] font-serif text-display-1 text-ink">
                  Build a co-worker, <span className="text-mint">no code</span>.
                </h2>
                <p className="mt-6 max-w-[46ch] font-sans text-body-lg text-ink-2">
                  Your team creates and tunes co-workers in{' '}
                  <span className="text-mint">Agent Studio</span> — the same place every Karta is
                  configured. No engineering ticket, no release cycle.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard className="p-8 md:p-9">
                <span aria-hidden className="block h-[3px] w-12 rounded-full bg-mint/70" />
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
                  In the studio
                </p>
                <ul className="mt-6 space-y-5 border-t border-soft pt-6">
                  {STUDIO.map((item) => {
                    const [lead, rest] = item.split(' — ')
                    return (
                      <li key={item} className="flex gap-3.5">
                        <span aria-hidden className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
                        <span className="font-sans text-body text-ink-2">
                          <span className="text-ink">{lead}</span>
                          {rest ? ` — ${rest}` : ''}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </GlassCard>
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
              <h2 className="mt-4 font-serif text-display-1 text-ink">
                What <span className="text-mint">changes</span> when they run it.
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 md:auto-rows-fr md:grid-cols-2">
            {IMPACTS.map(([title, line], i) => (
              <Reveal key={title} delay={(i % 2) * 0.08} className="h-full">
                <div className="glass lume h-full rounded-lg p-8">
                  <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-mint" />
                  <h3 className="mt-5 font-serif text-[1.5rem] leading-tight text-ink">{title}</h3>
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
              <h2 className="font-serif text-display-2 text-ink">
                A workforce that <span className="text-mint">compounds</span>.
              </h2>
              <p className="mx-auto mt-5 max-w-[50ch] font-sans text-body-lg text-ink-2">
                Configured by you, governed by the runtime, and sharper with every interaction — so
                the operation improves the more it runs.
              </p>
            </Reveal>
          </div>
        </Section>
      </LayerShell>
    </>
  )
}
