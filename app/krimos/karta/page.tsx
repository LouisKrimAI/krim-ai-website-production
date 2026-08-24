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
import AgentMarketplace from '@/components/krimos/AgentMarketplace'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard, CTA } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Karta — the co-workers',
  description:
    'Karta are the autonomous co-workers of KrimOS. They run the lending operation across the contact centre and the back office, in the customer’s own language, with every action cleared by the validation gate before it fires.',
  alternates: { canonical: 'https://www.krim.ai/krimos/karta' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Karta — the co-workers',
    description:
      'Karta are the autonomous co-workers of KrimOS, running the lending operation across the contact centre and the back office. Built and tuned in Agent Studio — persona, voice, video avatar, workflow and limits — with no engineering cycle.',
    url: 'https://www.krim.ai/krimos/karta',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'KrimOS', item: 'https://www.krim.ai/krimos' },
    { '@type': 'ListItem', position: 3, name: 'Karta', item: 'https://www.krim.ai/krimos/karta' },
  ],
}

// what every co-worker can do — [title, body, highlighted word]
const CAPABILITIES: [string, string, string][] = [
  ['Take action', 'They complete the task itself: calls answered, documents produced, payments taken and reconciled.', 'action'],
  ['Across channels', 'Voice, SMS, WhatsApp, email and chat, in one thread that remembers.', 'channels'],
  ['In the customer’s language', 'They meet people in their own language.', 'language'],
  ['Within the rules', 'Every action clears the validation gate before it fires.', 'rules'],
  ['Hand off to a person', 'A warm transfer with full context, the moment it’s needed.', 'person'],
  ['At any scale', 'Contact-centre scale, around the clock, without a queue.', 'scale'],
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
                A workforce for the <span className="text-grad-carved">whole loan</span>.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[44ch] font-sans text-body-lg text-ink-2">
                They run the lending operation end to end, in the{' '}
                <span className="text-mint">customer&rsquo;s own language</span>.
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
                Autonomous co-workers. <span className="text-mint">You set the limits.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-[62ch] font-sans text-body-lg text-ink-2">
                Karta are the autonomous co-workers of KrimOS, composed from validated primitives and
                configured in plain language, never coded by hand. You set how far each one runs on
                its own, in one of four modes: autonomous, oversight, copilot or human-in-the-loop,
                per workflow and per segment. A workflow shifts toward autonomy only as measured
                outcomes earn it.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ---- The agent marketplace — the hiring floor: filterable specialist
                profiles with persona avatars; ends on "Compose your own" ---- */}
        <Section hairline>
          <Reveal>
            <div className="mx-auto max-w-[760px] text-center">
              <Eyebrow>The agent marketplace</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">
                A <span className="text-mint">specialist</span> for every part of the operation.
              </h2>
              <p className="mx-auto mt-6 max-w-[58ch] font-sans text-body-lg text-ink-2">
                Browse the floor by stage. Each specialist is composed from validated primitives and
                runs in the mode you set. If the one you need isn&rsquo;t here,{' '}
                <span className="text-mint">compose it in Agent Studio</span>.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mx-auto mt-12 max-w-[1040px]">
              <AgentMarketplace />
            </div>
          </Reveal>
        </Section>

        {/* ---- Agent Studio — build and tune your own co-workers, no code ---- */}
        <Section hairline id="agent-studio">
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
              <h2 className="mt-4 font-serif text-display-1 text-ink">Every co-worker takes real action.</h2>
              <p className="mx-auto mt-6 font-sans text-body-lg text-ink-2">
                The same core abilities, whichever co-worker you put to work.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:auto-rows-fr lg:grid-cols-3">
            {CAPABILITIES.map(([title, line, hiWord], i) => (
              <Reveal key={title} delay={(i % 3) * 0.06} className="h-full">
                <div className="glass lume flex h-full flex-col rounded-lg p-7">
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
                <div className="glass lume flex h-full flex-col rounded-lg p-8">
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
                A workforce that <span className="text-grad">compounds</span>.
              </h2>
              <p className="mx-auto mt-5 max-w-[50ch] font-sans text-body-lg text-ink-2">
                Configured by you, governed by the runtime, and sharper with every interaction, so
                the operation improves the more it runs.
              </p>
              <div className="mt-8 flex justify-center">
                <CTA href="/research/safe-agent-harness" variant="secondary">
                  Explore the safe agent harness
                </CTA>
              </div>
            </Reveal>
          </div>
        </Section>
      </LayerShell>
    </>
  )
}
