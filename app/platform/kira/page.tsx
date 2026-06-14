/**
 * /platform/kira — the customer advisor. From docs/copy/platform-kira.md.
 * Kira is the advisor your customers meet — on the public consumer site and in
 * the Krimkar app, across WhatsApp, voice, IVR, chat, SMS and email. One thread
 * with context preserved, in 50+ Indian languages; it acts only within consent
 * and contact-window rules, and hands off to a person — with the full story
 * attached — for disputes, hardship or sensitive moments.
 *
 * This is the last layer in the cluster: it is one of the two human-facing
 * faces (Kula for teams, Kira for customers); the mind is Kendra, behind it.
 *
 * Server component (metadata + JSON-LD + static substance). The two signature
 * devices live in _client.tsx:
 *   · OneThread  — section 2: a single conversation thread that persists while
 *                  the channel badge swaps (WhatsApp → voice → web → SMS → email).
 *                  Context is preserved across the switch. Reduced-motion shows
 *                  the thread with every channel marker, static.
 *   · ActsWithin — section 3: inside a conversation an action clears validation
 *                  mid-thread (cyan → mint), then a dignified hand-off routes a
 *                  sensitive moment to a person (gold), context attached.
 * Facts only; invent nothing.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import LayerShell from '@/components/platform/LayerShell'
import ArchGlyph from '@/components/platform/ArchGlyph'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard } from '@/components/ui'
import { OneThread, ActsWithin } from './_client'

export const metadata: Metadata = {
  title: 'Kira — one relationship, the whole lifecycle',
  description:
    'Kira is the advisor your customers meet — across WhatsApp, voice, chat, SMS and email, on your site and in the Krimkar app. One conversation that remembers, in 50+ Indian languages, always within the rules.',
  alternates: { canonical: 'https://krim.ai/platform/kira' },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Platform', item: 'https://krim.ai/platform' },
    { '@type': 'ListItem', position: 3, name: 'Kira', item: 'https://krim.ai/platform/kira' },
  ],
}

export default function KiraPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <LayerShell slug="kira">
        {/* ---- 1 · Hero ---- */}
        <Section className="!pt-12 md:!pt-16">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Reveal>
                <Eyebrow>Kira — for your customers</Eyebrow>
                <h1 className="mt-5 font-serif text-display-hero text-ink">
                  One relationship,
                  <br />
                  the whole way through.
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-7 max-w-[55ch] font-sans text-body-lg text-ink-2">
                  Kira is the advisor your customers meet — on your app and your site, across every
                  channel. <span className="text-ink">One conversation that remembers</span>, in
                  their language, always within the rules.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <GlassCard className="p-7 md:p-9">
                <ArchGlyph active="kira" />
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
                  The face your customers meet · the mind is Kendra, behind it.
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · One thread, every channel ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow tone="cyan">Always on</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">
              WhatsApp to voice to chat — one conversation.
            </h2>
            <p className="mt-7 max-w-[64ch] font-sans text-body-lg text-ink-2">
              A customer can start on WhatsApp, call in, then pick up on your website — and{' '}
              <span className="text-ink">Kira remembers</span>. One thread, day and night, in 50+
              Indian languages and counting.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-12">
              <OneThread />
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-8 max-w-[62ch] font-sans text-body leading-relaxed text-ink-3">
              The channel changes; the context does not. Wherever the customer reaches you — the
              public site, the Krimkar app, a missed-call IVR — it is the same conversation, carried
              forward, never restarted.
            </p>
          </Reveal>
        </Section>

        {/* ---- 3 · Acts, within the rules ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Trusted to act</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">It does things — safely.</h2>
            <p className="mt-7 max-w-[64ch] font-sans text-body-lg text-ink-2">
              Kira doesn&rsquo;t just answer. It takes payments, sends statements, sets up plans —{' '}
              <span className="text-ink">each action validated before it happens</span>. And when
              something needs a person — a dispute, hardship, a sensitive moment — it hands over,
              with the full story attached.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-12">
              <ActsWithin />
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-8 max-w-[62ch] font-sans text-body leading-relaxed text-ink-3">
              Every action runs only within consent and the contact-window rules. The hand-off is a
              feature, not a failure — the moments that deserve a human reach one, with the whole
              conversation already in hand.
            </p>
          </Reveal>
        </Section>

        {/* ---- 4 · Close ---- */}
        <Section hairline>
          <Reveal>
            <div className="mx-auto max-w-[760px] text-center">
              <h2 className="font-serif text-display-3 leading-tight text-ink">
                The face your customers trust.
              </h2>
              <p className="mx-auto mt-5 max-w-[52ch] font-sans text-body text-ink-2">
                One relationship across every channel — warm, in their language, always within the
                rules. The brain behind it is Kendra.
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  href="/platform/kendra"
                  className="group inline-flex items-baseline gap-2 font-sans text-body text-ink-2 transition-colors hover:text-mint"
                >
                  <span className="underline-offset-4 group-hover:underline">
                    See the brain behind it
                  </span>
                  <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </Reveal>
        </Section>
      </LayerShell>
    </>
  )
}
