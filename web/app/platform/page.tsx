/**
 * /platform — the KrimOS hub on the ONE CANVAS (BUILD-BRIEF v3 §3/§4).
 * Five layers, one confident screen each, linking down. Glass panels float
 * above the deep Krim ground; cyan = proposed/thinking · mint = validated/
 * learned · gold = exceptions only. The hub spine carries BOTH powers:
 * the 33-gate (judgment) and the world model (intelligence).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Reveal from '@/components/Reveal'
import { Eyebrow, PageH1, Lede, Body, H2, Section, Glass, CTAGroup, MonoNote } from '@/components/ui'
import { LAYERS } from '@/components/platform/layers'

export const metadata: Metadata = {
  title: 'Platform — KrimOS, the agent-native operating system | Krim',
  description:
    'AI co-workers for regulated operations — lending first. KrimOS in five layers: Kriya primitives, Karta co-workers, the Kendra runtime, the Kupa command center and the Krimkar consumer surface. Validated before it acts; smarter after it acts.',
  alternates: { canonical: 'https://krim.ai/platform' },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Platform', item: 'https://krim.ai/platform' },
  ],
}

// the hub's facts-per-layer (krim-content.md, condensed to one screen each)
const DETAIL: Record<string, string[]> = {
  kendra: ['Seven modules: Core · Fabric · Govern · Nyāya · Learn · Ledger · Sense', 'The 33-validator gate runs here — pre-execution, always', 'Durable orchestration; every action sealed and metered'],
  kriya: ['250+ primitives across ten categories — MAKE_CALL to REG_F_LIMIT', 'Uniform by construction: validated, metered, versioned', 'The library is finite; the workflows composed from it are not'],
  karta: ['Vox-Out · Vox-In · Doc · Risk · Decide · Cure · Audit · Report', 'Configured to any lifecycle function — not re-coded', 'Operational decisioning only; underwriting stays with you'],
  kupa: ['Kula: intent in plain language → governed strategy', 'Live queues, review gates, one-click kill switches', 'The audit workspace — what happened, why, under which rules'],
  krimkar: ['One thread from application to payoff, context preserved', 'WhatsApp, voice, IVR, chat, email, SMS — 50+ Indian languages', 'Acts only within consent and contact-window rules'],
}

export default function PlatformPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <SiteHeader />
      <main>
        {/* ---- hub hero ---- */}
        <Section className="md:py-28">
          <Reveal>
            <Eyebrow>The platform · KrimOS</Eyebrow>
            <PageH1 className="max-w-[16ch]">Five layers. One operating system.</PageH1>
            <Lede className="mt-7">
              AI co-workers for regulated operations — lending first. Each one is composed from
              validated primitives, runs inside a governed runtime, and is supervised from a single
              command center while one advisor faces the customer. Nothing executes unvalidated, at any layer —
              and the system learns from everything it executes.
            </Lede>
            <CTAGroup className="mt-9" secondaryHref="/platform/kendra" secondaryLabel="Start at the runtime" />
          </Reveal>
        </Section>

        {/* ---- the stack: five confident screens, glass panels on one canvas ---- */}
        <Section hairline className="md:py-20">
          <MonoNote className="mb-8">THE STACK · READ BOTTOM-UP — CAPABILITY COMPOSES FROM THE FOUNDATION</MonoNote>
          <div className="space-y-4">
            {[...LAYERS].reverse().map((l, idx) => {
              const n = LAYERS.length - idx // 5..1, bottom-up numbering
              return (
                <Reveal key={l.slug} delay={idx * 0.06}>
                  <Link
                    href={`/platform/${l.slug}`}
                    className="group glass-quiet grid md:grid-cols-[88px_260px_1fr_auto] gap-x-8 gap-y-3 items-start border-rline-soft hover:border-mint/30 transition-colors p-7 md:p-9"
                  >
                    <p className="font-mono text-[13px] text-rtext-3 group-hover:text-mint/70 transition-colors pt-1">{String(n).padStart(2, '0')}</p>
                    <div>
                      <p className="font-serif text-[1.7rem] leading-tight text-rtext group-hover:text-mint transition-colors">{l.sanskrit}</p>
                      <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-rtext-3 mt-1">{l.english}</p>
                    </div>
                    <div>
                      <p className="font-serif text-[1.08rem] leading-[1.5] text-rtext-2 max-w-[52ch] mb-3">{l.one}</p>
                      <ul className="space-y-1">
                        {DETAIL[l.slug].map((d) => (
                          <li key={d} className="font-sans text-[13px] leading-relaxed text-rtext-3">— {d}</li>
                        ))}
                      </ul>
                    </div>
                    <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-rtext-3 group-hover:text-mint group-focus-visible:text-mint transition-colors pt-1">
                      Enter →
                    </p>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </Section>

        {/* ---- the two powers: judgment + intelligence (the hub spine) ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow tone="cyan">How it composes</Eyebrow>
            <H2 className="max-w-[20ch]">One runtime. Two powers.</H2>
            <p className="font-serif text-rtext text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.5] max-w-[46ch] mt-7">
              Kriya primitives compose into Karta co-workers; Karta execute through the Kendra
              runtime; every action passes Krim-Nyāya before it fires; outcomes are metered into
              Krim-Ledger and feed Krim-Learn — surfaced through Kira in Krimkar and Kula in Kupa.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5 mt-12">
            <Reveal delay={0.06}>
              <Glass quiet className="p-8 md:p-10 h-full">
                <Eyebrow tone="cyan" className="mb-4">Judgment · the 33-validator gate</Eyebrow>
                <p className="font-serif text-[1.25rem] leading-[1.5] text-rtext-2">
                  Every action clears 33 validators before it executes — policy, jurisdiction,
                  consent, contact window, exposure. The gate is pre-execution and unconditional:
                  it makes acting safe.
                </p>
                <MonoNote className="mt-6">VALIDATED BEFORE IT ACTS</MonoNote>
              </Glass>
            </Reveal>

            <Reveal delay={0.12}>
              <Glass accent className="p-8 md:p-10 h-full">
                <Eyebrow tone="mint" className="mb-4">Intelligence · the world model</Eyebrow>
                <p className="font-serif text-[1.25rem] leading-[1.5] text-rtext-2">
                  One runtime runs the whole lifecycle, so it sees the operation whole — every call,
                  document, decision and outcome on one ledger. Krim-Learn compounds that record into
                  a connected model of how the operation actually behaves: Q1 baseline, measurable
                  gains by Q2.
                </p>
                <MonoNote className="mt-6 text-mint">SMARTER AFTER IT ACTS</MonoNote>
              </Glass>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <Body className="mt-10">
              The dependency is the insight: validation without learning is a compliance tool;
              learning without validation is a liability no bank can deploy. Judgment makes acting safe;
              intelligence makes each action compound. KrimOS is not software
              in the static sense — it is an operating system for intelligence. The runtime is the
              product; the workflows that run inside it are how value is delivered.
            </Body>
          </Reveal>
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}
