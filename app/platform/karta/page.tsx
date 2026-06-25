/**
 * /platform/karta — Karta, the AI co-workers (a core KrimOS layer).
 *
 * Standard layer-page shape: hero → what they are → the co-workers by surface
 * (contact centre + back office) → Agent Studio → capabilities → impacts →
 * close. Grounded in the canonical eight (docs/krim-content.md), not the
 * deeper platform list.
 */

import type { Metadata } from 'next'
import LayerShell from '@/components/platform/LayerShell'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Karta — the co-workers',
  description:
    'Karta are the autonomous co-workers of KrimOS. They run the lending operation across the contact centre and the back office, in the customer’s own language, with every action cleared by the validation gate before it fires.',
  alternates: { canonical: 'https://krim.ai/platform/karta' },
  openGraph: {
    title: 'Karta — the co-workers',
    description:
      'Karta are the autonomous co-workers of KrimOS, running the lending operation across the contact centre and the back office. Configured in the studio in plain language, without an engineering cycle.',
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

// where they run — two surfaces. Each card is a focused co-worker described at
// the altitude of what it owns end to end, not a checklist of micro-tasks.
type Op = { op: string; blurb: string }
const CONTACT_CENTRE: Op[] = [
  { op: 'Inbound support', blurb: 'Answers the calls, chats and messages customers start. It resolves balances, payments and complaints, or hands off to a person with the full context attached.' },
  { op: 'Outbound voice', blurb: 'Carries the voice relationship across the whole lifecycle: welcome and onboarding, servicing, reminders, collections and retention.' },
  { op: 'Reminders & dunning', blurb: 'Keeps accounts current with pre-due nudges and missed-payment notices, on the channel and at the timing each borrower actually responds to.' },
  { op: 'Onboarding', blurb: 'Takes a new applicant from first touch to a decision, guiding them through application, identity, documents and eligibility the whole way.' },
  { op: 'Collections', blurb: 'Recovers arrears through every stage of delinquency. It reaches borrowers across channels, negotiates within your authority, and follows each promise through to payment.' },
  { op: 'Disputes & hardship', blurb: 'Handles the sensitive cases with care: grievances investigated, hardship assessed, and restructuring offered where it genuinely fits.' },
]
const BACK_OFFICE: Op[] = [
  { op: 'Documentation', blurb: 'Produces the paperwork a loan runs on, from agreements and key-fact statements to repayment schedules and statutory notices, all generated and tracked.' },
  { op: 'Payments & reconciliation', blurb: 'Runs the money end to end: billing, mandates, payment plans and refunds, reconciled across every rail, with failed payments retried automatically.' },
  { op: 'Risk & decisioning', blurb: 'Segments the book and chooses the next best action, gating on your own risk and fraud engines and never overriding the credit decision.' },
  { op: 'Cure & recovery', blurb: 'Brings the hard cases home through multi-step cure journeys, settlements, statutory recovery, payoff and write-off.' },
  { op: 'Monitoring', blurb: 'Watches the whole portfolio for delinquency, roll-rate drift, anomalies and fraud, and raises the flag early.' },
  { op: 'Audit & reporting', blurb: 'Makes the operation explainable. Every action is audited, traced, and reported to ops, risk, compliance and the board.' },
]

// what every co-worker can do
const CAPABILITIES: [string, string][] = [
  ['Take action', 'They complete the task itself: calls answered, documents produced, payments taken and reconciled.'],
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
  ['Consistent and compliant', 'The same standard on every contact, and on the record.'],
  ['Better recovery', 'More right-party contact and more cures, always within the rules.'],
]

// what you do in Agent Studio — build and tune a co-worker, no code
const STUDIO: string[] = [
  'Create a new co-worker: from scratch, or by cloning one and adapting it.',
  'Program its voice: a custom sound, and how it speaks.',
  'Set its personality: tone, manner and escalation style.',
  'Design its workflow: the steps it follows, with branches and checks.',
  'Bind its skills and knowledge: the actions it can take and the policies it knows.',
  'Set its limits: authority, autonomy, and when to hand to a person.',
]

// a surface sub-section header (contact centre / back office)
function SurfaceHeader({
  accent,
  kicker,
  title,
  blurb,
}: {
  accent: 'cyan' | 'mint'
  kicker: string
  title: string
  blurb: string
}) {
  const bar = accent === 'cyan' ? 'bg-cyan/70' : 'bg-mint/70'
  return (
    <div className="max-w-[620px]">
      <span aria-hidden className={`block h-[3px] w-12 rounded-full ${bar}`} />
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">{kicker}</p>
      <h3 className="mt-2 font-serif text-[1.7rem] leading-tight text-ink">{title}</h3>
      <p className="mt-2 font-sans text-body-lg text-ink-2">{blurb}</p>
    </div>
  )
}

// one operation card — a focused co-worker and the capability it owns
function OpCard({ op, blurb, accent }: Op & { accent: 'cyan' | 'mint' }) {
  const bar = accent === 'cyan' ? 'bg-cyan/70' : 'bg-mint/70'
  return (
    <div className="glass lume h-full rounded-lg p-6 md:p-7">
      <span aria-hidden className={`block h-[3px] w-8 rounded-full ${bar}`} />
      <p className="mt-4 font-serif text-[1.3rem] leading-tight text-ink">{op}</p>
      <p className="mt-3 font-sans text-body text-ink-2">{blurb}</p>
    </div>
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
                The AI co-workers that do the operation&rsquo;s work across the whole lending
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
                <span className="text-mint">Autonomous</span> co-workers.
              </h2>
              <p className="mx-auto mt-6 max-w-[58ch] font-sans text-body-lg text-ink-2">
                Each one runs a real part of your operation. You set what it can do and how far it
                goes, without an engineering cycle, and every action it takes clears the validation
                gate before it fires.
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
                A specialist for <span className="text-mint">every part</span> of the operation.
              </h2>
              <p className="mx-auto mt-6 font-sans text-body-lg text-ink-2">
                From a borrower&rsquo;s first touch to final closure, focused co-workers run the whole
                lending operation across the customer-facing contact centre and the operational back
                office.
              </p>
            </div>
          </Reveal>
          {/* Contact centre — its operations as cards */}
          <div className="mt-14">
            <Reveal>
              <SurfaceHeader
                accent="cyan"
                kicker="Contact centre"
                title="The customer-facing surface."
                blurb="Inbound and outbound, across voice, SMS, WhatsApp, email and chat, in one conversation that remembers."
              />
            </Reveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:auto-rows-fr lg:grid-cols-3">
              {CONTACT_CENTRE.map((o, i) => (
                <Reveal key={o.op} delay={(i % 3) * 0.06} className="h-full">
                  <OpCard {...o} accent="cyan" />
                </Reveal>
              ))}
            </div>
          </div>

          {/* Back office — its operations as cards */}
          <div className="mt-16">
            <Reveal>
              <SurfaceHeader
                accent="mint"
                kicker="Back office"
                title="The operational engine."
                blurb="Everything behind every loan: documents, money, risk and the record, all handled and kept straight."
              />
            </Reveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:auto-rows-fr lg:grid-cols-3">
              {BACK_OFFICE.map((o, i) => (
                <Reveal key={o.op} delay={(i % 3) * 0.06} className="h-full">
                  <OpCard {...o} accent="mint" />
                </Reveal>
              ))}
            </div>
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
                  <span className="text-mint">Agent Studio</span>, the same place every Karta is
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
                    const [lead, ...rest] = item.split(': ')
                    const restText = rest.join(': ')
                    return (
                      <li key={item} className="flex gap-3.5">
                        <span aria-hidden className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
                        <span className="font-sans text-body text-ink-2">
                          <span className="text-ink">{lead}</span>
                          {restText ? `: ${restText}` : ''}
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
                Configured by you, governed by the runtime, and sharper with every interaction, so
                the operation improves the more it runs.
              </p>
            </Reveal>
          </div>
        </Section>
      </LayerShell>
    </>
  )
}
