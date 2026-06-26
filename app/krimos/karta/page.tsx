/**
 * /krimos/karta — Karta, the AI co-workers (a core KrimOS layer).
 *
 * Standard layer-page shape: hero → what they are → the co-workers by surface
 * (contact centre + back office) → Agent Studio → capabilities → impacts →
 * close. Grounded in the canonical eight (docs/krim-content.md), not the
 * deeper platform list. Agent Studio is a real, shipped feature (platform
 * docs: AGENT-STUDIO-MULTI-TENANCY, 4-Studio architecture): the no-code place
 * you build a co-worker — persona, voice, video avatar, flow, skills, limits.
 */

import type { Metadata } from 'next'
import LayerShell from '@/components/krimos/LayerShell'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Karta — the co-workers',
  description:
    'Karta are the autonomous co-workers of KrimOS. They run the lending operation across the contact centre and the back office, in the customer’s own language, with every action cleared by the validation gate before it fires.',
  alternates: { canonical: 'https://krim.ai/krimos/karta' },
  openGraph: {
    title: 'Karta — the co-workers',
    description:
      'Karta are the autonomous co-workers of KrimOS, running the lending operation across the contact centre and the back office. Built and tuned in Agent Studio — persona, voice, video avatar, workflow and limits — with no engineering cycle.',
    url: 'https://krim.ai/krimos/karta',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'KrimOS', item: 'https://krim.ai/krimos' },
    { '@type': 'ListItem', position: 3, name: 'Karta', item: 'https://krim.ai/krimos/karta' },
  ],
}

// The roster — by operational segment of the bank, each split across the
// customer-facing contact centre and the operational back office. Grounded in the
// specialised Karta agents (krim-content.md / capability map), generalised for a
// global audience (no jurisdiction-specific statute names). Each card is one
// focused co-worker, named by the work it owns.
type Agent = { name: string; blurb: string }
type Segment = { n: string; name: string; desc: string; cc: Agent[]; bo: Agent[] }
// Three specialist co-workers per surface, per segment — an even 3×3 lattice so
// every column carries the same count and the cards tile uniformly.
const ROSTER: Segment[] = [
  {
    n: '01',
    name: 'Origination',
    desc: 'From first enquiry to funds released.',
    cc: [
      { name: 'Application concierge', blurb: 'Walks applicants through applying, by voice or chat, in their language.' },
      { name: 'Lead follow-up', blurb: 'Re-engages started-but-unfinished applications across every channel.' },
      { name: 'Decision updates', blurb: 'Keeps the applicant informed through each step, in plain language.' },
    ],
    bo: [
      { name: 'Application processing', blurb: 'Intakes the application, captures the documents, assembles the file.' },
      { name: 'Identity & onboarding checks', blurb: 'Verifies identity and clears screening before anything proceeds.' },
      { name: 'Agreements & disbursement', blurb: 'Generates the agreement, captures e-signature, releases the funds.' },
    ],
  },
  {
    n: '02',
    name: 'Underwriting & risk',
    desc: 'The credit call, and the picture behind it.',
    cc: [
      { name: 'Information requests', blurb: 'Asks for the documents or details the decision still needs.' },
      { name: 'Offer & terms', blurb: 'Presents the offer and explains the terms, by voice or chat.' },
      { name: 'Decline support', blurb: 'Delivers the outcome with reasons, and the route to reconsider.' },
    ],
    bo: [
      { name: 'Borrower profiling', blurb: 'Builds the single borrower picture the decision rests on.' },
      { name: 'Credit scoring', blurb: 'Scores risk and creditworthiness to inform the underwriting call.' },
      { name: 'Underwriting assembly', blurb: 'Pulls income and bureau signals into a decision-ready case.' },
    ],
  },
  {
    n: '03',
    name: 'Servicing',
    desc: 'Keeping every account current.',
    cc: [
      { name: 'Servicing support', blurb: 'Answers balances, payments and account changes, or hands to a person.' },
      { name: 'Proactive reminders', blurb: 'Pre-due nudges on the channel and timing each borrower responds to.' },
      { name: 'Self-service guidance', blurb: 'Walks borrowers through statements, payoffs and account changes.' },
    ],
    bo: [
      { name: 'Account maintenance', blurb: 'Processes changes, plans and account updates, end to end.' },
      { name: 'Payments & mandates', blurb: 'Runs billing, recurring debits and refunds across every rail.' },
      { name: 'Reconciliation', blurb: 'Matches payments to accounts and clears the breaks.' },
    ],
  },
  {
    n: '04',
    name: 'Collections & recovery',
    desc: 'From the first missed payment to resolution.',
    cc: [
      { name: 'Early-stage collections', blurb: 'Reaches borrowers as they slip and follows each promise to payment.' },
      { name: 'Late-stage collections', blurb: 'Works deeper arrears with negotiated plans, within authority.' },
      { name: 'Payment arrangements', blurb: 'Sets up and tracks plans the borrower can actually keep.' },
    ],
    bo: [
      { name: 'Recovery & settlement', blurb: 'Negotiates settlements and works payoff and recovery, end to end.' },
      { name: 'Legal coordination', blurb: 'Coordinates legal and field recovery, every step inside the rules.' },
      { name: 'Closure & write-off', blurb: 'Closes the account: final payoff, security release and write-off.' },
    ],
  },
  {
    n: '05',
    name: 'Disputes, hardship & retention',
    desc: 'The sensitive cases, and the ones worth keeping.',
    cc: [
      { name: 'Grievances & disputes', blurb: 'Takes in complaints and disputes and keeps the customer informed.' },
      { name: 'Hardship support', blurb: 'Handles hardship conversations with care, by voice or chat.' },
      { name: 'Retention & win-back', blurb: 'Renewals and win-back, where a customer is worth keeping.' },
    ],
    bo: [
      { name: 'Dispute resolution', blurb: 'Investigates the case, applies policy, resolves it on the record.' },
      { name: 'Hardship & restructuring', blurb: 'Models restructures and concessions that genuinely fit.' },
      { name: 'Escalation handling', blurb: 'Routes complex and high-value cases to the right reviewer.' },
    ],
  },
  {
    n: '06',
    name: 'Risk & oversight',
    desc: 'Watching the whole book, and proving it.',
    cc: [
      { name: 'Quality & QA', blurb: 'Reviews conversations for tone, compliance and outcome, and coaches.' },
      { name: 'Consent & preferences', blurb: 'Captures and honours contact consent on every channel.' },
      { name: 'Outcome follow-through', blurb: 'Confirms commitments landed and closes the loop with the customer.' },
    ],
    bo: [
      { name: 'Portfolio monitoring', blurb: 'Watches delinquency, roll-rate drift, anomalies and fraud, flags early.' },
      { name: 'Compliance & audit', blurb: 'Keeps every action traceable and the operation ready for examination.' },
      { name: 'Reporting', blurb: 'Turns the record into reporting for ops, risk, compliance and the board.' },
    ],
  },
]

// what every co-worker can do — [title, body, highlighted word]
const CAPABILITIES: [string, string, string][] = [
  ['Take action', 'They complete the task itself: calls answered, documents produced, payments taken and reconciled.', 'action'],
  ['Across channels', 'Voice, SMS, WhatsApp, email and chat, in one thread that remembers.', 'channels'],
  ['In the customer’s language', 'They meet people in their own language.', 'language'],
  ['Within the rules', 'Every action clears the validation gate before it fires.', 'rules'],
  ['Hand off to a person', 'A warm transfer with full context, the moment it’s needed.', 'person'],
  ['At any scale', 'Millions of interactions a day, around the clock, without a queue.', 'scale'],
]

// the outcomes — qualitative, not promised numbers — [title, body, highlighted word]
const IMPACTS: [string, string, string][] = [
  ['Scale without the headcount', 'The book can grow without the cost line growing with it.', 'Scale'],
  ['Faster, every time', 'Applications, queries and resolutions move at digital speed.', 'Faster'],
  ['Consistent and compliant', 'The same standard on every contact, and on the record.', 'compliant'],
  ['Better recovery', 'More right-party contact and more cures, always within the rules.', 'recovery'],
]

// what you set in Agent Studio — build and tune a co-worker, no code. Grounded
// in the platform's Agent Studio (persona, voice + video avatar, flow, skills,
// authority); generalised for a global audience (no vendor names).
const STUDIO: string[] = [
  'Create a new co-worker: from scratch, or by cloning one and adapting it.',
  'Give it a persona: tone, manner and escalation style.',
  'Give it a voice, and a video avatar: how it sounds, and how it shows up.',
  'Design its conversation flow: the steps it follows, with branches and checks.',
  'Bind its skills and knowledge: the actions it can take and the policies it knows.',
  'Set its authority: how far it can act on its own before it hands to a person.',
]

// one specialist co-worker — a uniform tile. A full-height accent rail (cyan in the
// contact centre, mint in the back office) carries the column identity over the busy
// backdrop better than a dot. h-full + min-h + line-clamp keep every tile identical
// size: it fills its `auto-rows-fr` row, floored so short blurbs don't shrink it.
function AgentCard({ name, blurb, accent }: Agent & { accent: 'cyan' | 'mint' }) {
  const tint = accent === 'cyan' ? 'glass-peak-cyan' : 'glass-peak-mint'
  const rail = accent === 'cyan' ? 'bg-cyan' : 'bg-mint'
  return (
    <div className={`glass-peak ${tint} relative flex h-full min-h-[8rem] flex-col justify-center p-6 pl-7`}>
      <span aria-hidden className={`absolute inset-y-4 left-0 w-[3px] rounded-full ${rail}`} />
      <p className="font-serif text-[1.2rem] leading-snug text-ink">{name}</p>
      <p className="mt-2 line-clamp-3 font-sans text-[13px] leading-relaxed text-ink-2">{blurb}</p>
    </div>
  )
}

// highlight one key word in a heading (the classy replacement for the accent dots)
function hl(title: string, word: string) {
  const i = title.indexOf(word)
  if (i < 0) return title
  return (
    <>
      {title.slice(0, i)}
      <span className="text-mint">{word}</span>
      {title.slice(i + word.length)}
    </>
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
                AI co-workers that run the lending operation end to end, from origination to
                collections, in the <span className="text-mint">customer&rsquo;s own language</span>,
                and you set how far each one goes.
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

        {/* ---- The roster — by operational segment, contact centre × back office ---- */}
        <Section hairline>
          <Reveal>
            <div className="mx-auto max-w-[760px] text-center">
              <Eyebrow>The roster</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">
                A specialist for <span className="text-mint">every part</span> of the operation.
              </h2>
              <p className="mx-auto mt-6 font-sans text-body-lg text-ink-2">
                Across the whole lending lifecycle, focused co-workers run every part of the operation,
                split between the customer-facing contact centre and the operational back office.
              </p>
            </div>
          </Reveal>

          {/* Large surface headers — Contact centre (left, cyan) · Back office (right, mint).
              They bookend and name the two columns; the accent rails carry the coding down.
              Desktop only; on mobile each segment carries its own surface labels. */}
          <Reveal delay={0.06}>
            <div className="mx-auto mt-14 hidden max-w-[1040px] grid-cols-2 gap-x-8 md:grid">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan/55">Customer-facing</p>
                <h3 className="mt-2.5 font-serif text-[clamp(1.7rem,2.8vw,2.3rem)] leading-none text-cyan">
                  Contact centre
                </h3>
              </div>
              <div className="text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-mint/55">Operational</p>
                <h3 className="mt-2.5 font-serif text-[clamp(1.7rem,2.8vw,2.3rem)] leading-none text-mint">
                  Back office
                </h3>
              </div>
            </div>
          </Reveal>

          {/* Segments — vertical stack, a luminous divider above each, CC left / BO right.
              Rhythm: 80px between segments → 48px to header → 40px to grid → 24px in-column. */}
          <div className="mx-auto mt-10 max-w-[1040px] space-y-20">
            {ROSTER.map((seg) => (
              <Reveal key={seg.n} delay={0.04}>
                <div
                  aria-hidden
                  className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent"
                />
                <div className="pt-12">
                  <div className="mx-auto max-w-[640px] text-center">
                    <h3 className="font-serif text-[clamp(1.6rem,2.8vw,2.1rem)] leading-tight text-ink">
                      {seg.name}
                    </h3>
                    <p className="mt-3 font-sans text-body text-ink-2">{seg.desc}</p>
                  </div>

                  <div className="relative mt-10 grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
                    {/* an intentional seam down the centre, instead of a raw backdrop bleed */}
                    <div
                      aria-hidden
                      className="absolute inset-y-2 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent md:block"
                    />
                    {/* Contact centre — own grid so the three tiles share equal rows */}
                    <div className="grid gap-6 md:auto-rows-fr">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan md:hidden">
                        Contact centre
                      </p>
                      {seg.cc.map((a) => (
                        <AgentCard key={a.name} {...a} accent="cyan" />
                      ))}
                    </div>
                    {/* Back office */}
                    <div className="grid gap-6 md:auto-rows-fr">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mint md:hidden">
                        Back office
                      </p>
                      {seg.bo.map((a) => (
                        <AgentCard key={a.name} {...a} accent="mint" />
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- Agent Studio — build and tune your own co-workers, no code ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[0.95fr_1.05fr]">
            <Reveal>
              <div>
                <Eyebrow>Agent Studio</Eyebrow>
                <h2 className="mt-4 max-w-[16ch] font-serif text-display-1 text-ink">
                  Build a co-worker, <span className="text-mint">no code</span>.
                </h2>
                <p className="mt-6 max-w-[48ch] font-sans text-body-lg text-ink-2">
                  Your team builds and tunes every co-worker in{' '}
                  <span className="text-mint">Agent Studio</span> — its persona, its voice, even a
                  video avatar, its workflow and its limits. No engineering ticket, no release cycle.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard className="p-8 md:p-9">
                <span aria-hidden className="block h-[3px] w-12 rounded-full bg-mint/70" />
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
                  In Agent Studio
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
            {CAPABILITIES.map(([title, line, hiWord], i) => (
              <Reveal key={title} delay={(i % 3) * 0.06} className="h-full">
                <div className="glass lume flex h-full flex-col justify-center rounded-lg p-7">
                  <h3 className="font-serif text-[1.3rem] leading-tight text-ink">{hl(title, hiWord)}</h3>
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
            {IMPACTS.map(([title, line, hiWord], i) => (
              <Reveal key={title} delay={(i % 2) * 0.08} className="h-full">
                <div className="glass lume flex h-full flex-col justify-center rounded-lg p-8">
                  <h3 className="font-serif text-[1.5rem] leading-tight text-ink">{hl(title, hiWord)}</h3>
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
