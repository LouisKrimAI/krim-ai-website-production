/**
 * /platform/karta — the co-workers. From docs/copy/platform-karta.md.
 * Karta are intelligent co-workers, not bots: compositions of validated Kriya
 * primitives that run inside the Kendra runtime and learn from every
 * interaction. A small utility set configures to almost any operation.
 *
 * Server component (metadata + JSON-LD + static substance). The three signature
 * devices live in _client.tsx:
 *   · Roster        — the eight co-workers as a scannable glass register, with
 *                     the two operational-boundary caveats marked subtly in gold.
 *   · AutonomyDial  — the page's interactive centrepiece: a four-stop dial whose
 *                     selection changes a small who-acts diagram.
 *   · Composition   — primitives snapping together into a co-worker.
 * The hard-boundary panel (the one gold moment) is built here, statically.
 * Facts only; invent nothing.
 */

import type { Metadata } from 'next'
import LayerShell from '@/components/platform/LayerShell'
import ArchGlyph from '@/components/platform/ArchGlyph'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard } from '@/components/ui'
import { Composition, Roster, AutonomyDial } from './_client'

export const metadata: Metadata = {
  title: 'Karta — the co-workers',
  description:
    'Intelligent co-workers, not bots. Karta are composed from validated Kriya primitives, run inside the Kendra runtime, and learn from every interaction — operating, never underwriting.',
  alternates: { canonical: 'https://krim.ai/platform/karta' },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Platform', item: 'https://krim.ai/platform' },
    { '@type': 'ListItem', position: 3, name: 'Karta', item: 'https://krim.ai/platform/karta' },
  ],
}

export default function KartaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <LayerShell slug="karta">
        {/* ---- 1 · Hero ---- */}
        <Section className="!pt-12 md:!pt-16">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Reveal>
                <Eyebrow>Karta — the co-workers</Eyebrow>
                <h1 className="mt-5 font-serif text-display-hero text-ink">
                  Intelligent co-workers,
                  <br />
                  not bots.
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-7 max-w-[55ch] font-sans text-body-lg text-ink-2">
                  Karta are built from <span className="text-ink">Kriya primitives</span>, run inside
                  the <span className="text-ink">Kendra runtime</span>, and learn from every
                  interaction. A small set of utility co-workers configures to almost any operation.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <GlassCard className="p-7 md:p-9">
                <ArchGlyph active="karta" />
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
                  Composed from the vocabulary — running inside the core that governs them.
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · Built, not coded ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>How they&rsquo;re made</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] font-serif text-display-1 text-ink">
              Assembled from the vocabulary.
            </h2>
            <p className="mt-7 max-w-[62ch] font-sans text-body-lg text-ink-2">
              A co-worker is a composition of validated primitives, not a one-off script. Change what
              it does by recomposing it — no rebuild. The same handful covers voice, documents,
              decisions, risk, audit and reporting.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-12">
              <Composition />
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-8 max-w-[74ch] font-sans text-[14.5px] leading-relaxed text-ink-3">
              Each co-worker is defined by eleven attributes — including its purpose, capabilities,
              primitives, inputs, outputs, metrics, KWU cost, governance, learning loops,
              human-in-the-loop triggers and availability. Recompose the attributes; the co-worker
              changes with them.
            </p>
          </Reveal>
        </Section>

        {/* ---- 3 · The roster ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>The roster</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">A small, utility set.</h2>
            <p className="mt-7 max-w-[62ch] font-sans text-body-lg text-ink-2">
              Eight co-workers cover the operation end to end — voice in both directions, the
              paper, the operational calls, the cure journeys, and the review that keeps it all
              accountable. Configured, not coded, to your institution.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12">
              <Roster />
            </div>
          </Reveal>
        </Section>

        {/* ---- 4 · You set the autonomy ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Operating modes</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">From hands-off to hands-on.</h2>
            <p className="mt-7 max-w-[62ch] font-sans text-body-lg text-ink-2">
              Every co-worker runs in one of four modes — fully autonomous, with oversight, as a
              copilot, or human-in-the-loop. Set it per workflow, per segment, per risk band, and
              move along the dial as confidence grows. The risk stays yours to control.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12">
              <AutonomyDial />
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-8 max-w-[60ch] font-sans text-[15px] leading-relaxed text-ink-3">
              Co-workers run operations; they don&rsquo;t make the credit decision — that stays with
              you.
            </p>
          </Reveal>
        </Section>

        {/* ---- 5 · The hard boundary — the one gold moment ---- */}
        <Section hairline>
          <Reveal>
            <div className="relative mx-auto max-w-[860px] overflow-hidden rounded-xl border border-[rgba(200,161,74,0.42)] bg-[rgba(200,161,74,0.045)] p-8 md:p-12">
              {/* gold rule along the leading edge */}
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-gold to-transparent opacity-70"
              />

              <Eyebrow tone="gold">The hard boundary</Eyebrow>
              <h2 className="mt-4 max-w-[20ch] font-serif text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.08] text-ink">
                Operational decisioning.
                <br />
                Never underwriting.
              </h2>

              <p className="mt-7 max-w-[64ch] font-sans text-body text-ink-2">
                Karta-Risk and Karta-Decide segment portfolios, suggest the next best action, resolve
                conflicts, and gate actions on the institution&rsquo;s own risk and fraud flags — that
                is the whole of their authority.
              </p>

              <div className="mt-9">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-gold">
                  What they will never do
                </p>
                <ul className="mt-5 grid gap-x-10 gap-y-3.5 sm:grid-cols-2">
                  {[
                    'Approve or deny loans',
                    'Price credit',
                    'Override your credit or risk engines',
                    'Touch underwriting authority',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="mt-[7px] grid h-4 w-4 shrink-0 place-items-center rounded-full border border-gold/60"
                      >
                        <span className="block h-[1.5px] w-2 rounded-full bg-gold" />
                      </span>
                      <span className="font-sans text-[15px] leading-snug text-ink-2">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-10 max-w-[60ch] border-t border-[rgba(200,161,74,0.28)] pt-7 font-serif text-[clamp(1.15rem,2vw,1.45rem)] leading-snug text-ink">
                Underwriting authority stays exactly where the regulator expects it — with you.
              </p>
            </div>
          </Reveal>
        </Section>

        {/* ---- 6 · Close ---- */}
        <Section hairline>
          <Reveal>
            <div className="mx-auto max-w-[760px] text-center">
              <h2 className="font-serif text-[clamp(1.7rem,3.2vw,2.5rem)] leading-tight text-ink">
                Your workforce, composed.
              </h2>
              <p className="mx-auto mt-5 max-w-[50ch] font-sans text-body text-ink-2">
                Built from the vocabulary, governed by the runtime, steered by you. Next, the people
                who steer them.
              </p>
            </div>
          </Reveal>
        </Section>
      </LayerShell>
    </>
  )
}
