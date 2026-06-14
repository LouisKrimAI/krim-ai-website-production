/**
 * /platform/kriya — the vocabulary. From docs/copy/platform-kriya.md.
 * A finite set of 250+ validated primitives — the atomic operations of
 * regulated work. Server component (metadata + JSON-LD + static substance);
 * the two interactive devices — the ten-category progressive index and the
 * MAKE_CALL receipt — live in _client.tsx. Facts only; invent nothing.
 */

import type { Metadata } from 'next'
import LayerShell from '@/components/platform/LayerShell'
import ArchGlyph from '@/components/platform/ArchGlyph'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard } from '@/components/ui'
import { CategoryIndex, MakeCallReceipt, PrimitiveUnit } from './_client'

export const metadata: Metadata = {
  title: 'Kriya — the vocabulary',
  description:
    'A finite vocabulary of 250+ validated primitives — the atomic operations of regulated work. The list is finite; what you build from it isn’t.',
  alternates: { canonical: 'https://krim.ai/platform/kriya' },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Platform', item: 'https://krim.ai/platform' },
    { '@type': 'ListItem', position: 3, name: 'Kriya', item: 'https://krim.ai/platform/kriya' },
  ],
}

export default function KriyaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <LayerShell slug="kriya">
        {/* ---- 1 · Hero ---- */}
        <Section className="!pt-12 md:!pt-16">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Reveal>
                <Eyebrow>Kriya — the vocabulary</Eyebrow>
                <h1 className="mt-5 font-serif text-display-hero text-ink">
                  A finite vocabulary.
                  <br />
                  Endless combinations.
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-7 max-w-[54ch] font-sans text-body-lg text-ink-2">
                  Every action a co-worker can take is one of{' '}
                  <span className="text-ink">250+ validated primitives</span> — the atomic
                  operations of regulated work. The list is finite; what you build from it isn&rsquo;t.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <GlassCard className="p-7 md:p-9">
                <ArchGlyph active="kriya" />
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
                  Kriya feeds the core — the vocabulary every co-worker is built from.
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · Why primitives ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Why it matters</Eyebrow>
            <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
              Small, validated, accountable.
            </h2>
            <p className="mt-7 max-w-[62ch] font-sans text-body-lg text-ink-2">
              Each primitive does one thing — with its checks built in, metered as it runs, and
              logged when it&rsquo;s done. Because the building blocks are validated, everything built
              from them inherits that safety. No loose ends to audit later.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-12">
              <PrimitiveUnit />
            </div>
          </Reveal>
        </Section>

        {/* ---- 3 · The ten categories ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>The library</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">The whole grammar of regulated work.</h2>
            <p className="mt-7 max-w-[62ch] font-sans text-body-lg text-ink-2">
              The vocabulary covers the operations regulated work actually needs — voice, documents,
              compliance checks, data, payments, decisions, analytics, integration, and your own.
              Open a category to glimpse a few of the primitives inside.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12">
              <CategoryIndex />
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-8 max-w-[74ch] font-sans text-[14.5px] leading-relaxed text-ink-3">
              Every primitive is uniform by construction — explicit inputs and outputs, built-in
              validation hooks, self-metering in KWUs, logged, and versioned. Counts are approximate;
              the library passed <span className="text-ink-2">250+</span> and keeps growing.
            </p>
          </Reveal>
        </Section>

        {/* ---- 4 · One primitive, end to end ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>A closer look</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">Watch one fire.</h2>
            <p className="mt-7 max-w-[62ch] font-sans text-body-lg text-ink-2">
              Take a single outbound call. Before it dials, it clears consent, calling hours, contact
              limits and do-not-call. It returns a transcript, an outcome, a record — and meters
              itself as it goes. One small action, fully governed.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12">
              <MakeCallReceipt />
            </div>
          </Reveal>
        </Section>

        {/* ---- 5 · Close ---- */}
        <Section hairline>
          <Reveal>
            <div className="mx-auto max-w-[760px] text-center">
              <h2 className="font-serif text-display-3 leading-tight text-ink">
                The vocabulary your co-workers speak.
              </h2>
              <p className="mx-auto mt-5 max-w-[48ch] font-sans text-body text-ink-2">
                Finite, validated, accountable. Next, the co-workers that put it to work.
              </p>
            </div>
          </Reveal>
        </Section>
      </LayerShell>
    </>
  )
}
