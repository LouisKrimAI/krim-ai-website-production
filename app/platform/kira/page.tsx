/**
 * /platform/kira — Kira & Krimkar, the customer-facing layer of KrimOS.
 * The house-standard layer page: content-first, homepage glass, no devices.
 * Covers BOTH Kira (the AI customer advisor) and Krimkar (the consumer app +
 * public site Kira lives in). Shape: what it is (hero) → one thread across every
 * channel → acts within the rules → the dignified hand-off → the Krimkar app →
 * closing impact. Facts: docs/krim-content.md (Kira · Krimkar, consumer).
 * Server component — no client devices, no inline SVG/JSX contraptions.
 */

import type { Metadata } from 'next'
import LayerShell from '@/components/platform/LayerShell'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Kira & Krimkar — for your customers',
  description:
    'Kira is the AI customer advisor your customers meet in the Krimkar app and across every channel — WhatsApp, voice, chat, SMS and email. One conversation that remembers, in the customer’s own language, always within the rules.',
  alternates: { canonical: 'https://krim.ai/platform/kira' },
  openGraph: {
    title: 'Kira & Krimkar — for your customers',
    description:
      'Kira is the AI customer advisor your customers meet in the Krimkar app and across every channel — WhatsApp, voice, chat, SMS and email. One conversation that remembers, in the customer’s own language, always within the rules.',
    url: 'https://krim.ai/platform/kira',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'KrimOS', item: 'https://krim.ai/platform' },
    { '@type': 'ListItem', position: 3, name: 'Kira & Krimkar', item: 'https://krim.ai/platform/kira' },
  ],
}

// one thread across every channel (docs/krim-content.md · Kira · Krimkar)
const CHANNELS = [
  {
    title: 'Wherever they reach you',
    body: 'WhatsApp, a phone call, IVR, web chat, SMS or email — the same advisor answers, with the whole history already in hand. The channel changes; the conversation does not.',
  },
  {
    title: 'It carries the whole story',
    body: 'A customer can start on WhatsApp, call in, then pick up on your site — and Kira remembers. Context is preserved from application to payoff, never restarted at the door.',
  },
  {
    title: 'In their own words',
    body: 'Kira speaks the customer’s language, including 50+ Indian languages — and clarifies an ambiguous answer mid-conversation rather than failing the form or routing them away.',
  },
]

export default function KiraPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <LayerShell slug="kira">
        {/* ---- Hero: what it is ---- */}
        <Section className="!pt-10">
          <div className="mx-auto max-w-[840px] text-center">
            <Reveal>
              <Eyebrow>For your customers</Eyebrow>
              <h1 className="mt-4 font-serif text-display-hero text-ink">
                One relationship, the whole way through.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-7 max-w-[58ch] font-sans text-body-lg text-ink-2">
                Kira is the AI customer advisor your customers actually meet — in the Krimkar app, on
                your public site, and across every channel they already use. One conversation that
                remembers, in their own language, always within the rules.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ---- One thread across every channel ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>One thread, every channel</Eyebrow>
            <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
              The same advisor, no matter how they get in touch.
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-body-lg text-ink-2">
              Most customers tell their story over and over — a new agent, a new channel, a fresh
              start each time. Kira holds a single thread across all of them, so nobody has to begin
              again.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {CHANNELS.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 0.08}>
                <div className="glass lume h-full p-7">
                  <span aria-hidden className="block h-[3px] w-12 rounded-full bg-mint/70" />
                  <h3 className="mt-6 font-serif text-[1.4rem] leading-tight text-ink">{c.title}</h3>
                  <p className="mt-3 font-sans text-body text-ink-2">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- Acts, within the rules ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow>Within the rules</Eyebrow>
                <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
                  Helpful, and never out of line.
                </h2>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  Kira does more than answer — it moves a due date, sets up a plan, sends a
                  statement. Every one of those actions runs only inside consent and the
                  contact-window rules. It reaches out when it&rsquo;s allowed to, stays quiet when
                  it isn&rsquo;t, and never oversteps to get the job done.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard className="p-8 md:p-10">
                <p className="font-sans text-body-lg leading-relaxed text-ink-2">
                  The result is an advisor your customers can trust and your compliance team can
                  stand behind &mdash;{' '}
                  <span className="text-ink">
                    warm enough to feel like a person, bounded enough to be safe.
                  </span>
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- The dignified hand-off ---- */}
        <Section hairline>
          <Reveal>
            <div className="mx-auto max-w-[760px] text-center">
              <Eyebrow tone="gold">When a moment needs a person</Eyebrow>
              <h2 className="mt-4 font-serif text-display-1 text-ink">
                Knowing when to step back is part of the job.
              </h2>
              <p className="mx-auto mt-7 max-w-[56ch] font-sans text-body-lg text-ink-2">
                A dispute, a hardship, a sensitive segment — some moments deserve a human, and Kira
                hands them over without hesitation. The whole conversation travels with the
                hand-off, so the person picks up exactly where the customer left off. Nothing to
                repeat, no story to retell. The hand-off is a feature, not a failure.
              </p>
            </div>
          </Reveal>
        </Section>

        {/* ---- The Krimkar app ---- */}
        <Section hairline>
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow>Krimkar — where they meet</Eyebrow>
                <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
                  A place customers come to, not just hear from.
                </h2>
                <p className="mt-7 max-w-[52ch] font-sans text-body-lg text-ink-2">
                  Krimkar is the consumer app and public site your customers use to check a balance,
                  make a payment or sort something out on their own time. It&rsquo;s also where they
                  meet Kira — so self-service and a real conversation live in the same place, under
                  one roof.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <GlassCard className="p-8 md:p-10">
                <p className="font-sans text-body-lg leading-relaxed text-ink-2">
                  The same relationship, whether they tap through the app or simply ask &mdash;{' '}
                  <span className="text-ink">
                    one front door for your customers, carried by one advisor.
                  </span>
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- Closing impact ---- */}
        <Section hairline>
          <Reveal>
            <GlassCard className="mx-auto max-w-[820px] p-10 text-center md:p-14">
              <h2 className="font-serif text-display-2 text-ink">Every customer, treated like the only one.</h2>
              <p className="mx-auto mt-5 max-w-[54ch] font-sans text-body-lg text-ink-2">
                One advisor who remembers, speaks their language and always stays inside the rules —
                from the first application to the final payment. That is the relationship Kira and
                Krimkar give every customer you serve.
              </p>
            </GlassCard>
          </Reveal>
        </Section>
      </LayerShell>
    </>
  )
}
