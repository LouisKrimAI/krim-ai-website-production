/**
 * /platform/kriya — the action-primitives layer, on the ONE CANVAS (v3).
 *
 * One ground throughout; glass panels float above it. The ten-category index is a
 * glass artifact; the MAKE_CALL receipt is the page's single glass-mint accent.
 * Five movements, one idea per screen —
 *   1. what a primitive is (a stranger should get it on the first screen)
 *   2. the ten categories, as a glass index with progressive disclosure
 *   3. uniform by construction — the six-part contract + five action modes
 *   4. MAKE_CALL, worked end to end (the one mint accent)
 *   5. the second power — every execution is also a lesson
 *
 * Colour grammar: mint = validated/learned, cyan = proposed/thinking. No gold
 * on this page — gold is reserved for exception states elsewhere.
 *
 * Rhythm deliberately differs from the register hub: that page is a list of
 * rooms; this one is a reference manual you can open.
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Reveal from '@/components/Reveal'
import { Eyebrow, PageH1, Lede, Body, H2, Section, CTAGroup, MonoNote, Glass } from '@/components/ui'
import LayerShell from '@/components/platform/LayerShell'
import { PrimitiveIndex, MakeCallReceipt } from './_client'

export const metadata: Metadata = {
  title: 'Kriya — 250+ credit-native primitives | Krim',
  description:
    'Kriya is the metered vocabulary of KrimOS: 250+ validated, credit-native primitives in ten categories — the atomic operations of regulated lending, each one cleared before it runs and recorded after.',
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

// the six-part contract every primitive honours (krim-content.md: uniform by construction)
const CONTRACT: Array<[string, string]> = [
  ['One operation', 'A primitive does a single thing — not a workflow in disguise.'],
  ['Explicit I/O', 'Named inputs, named outputs. Nothing implied, nothing hidden.'],
  ['Validation hooks', 'The clearances run inside the primitive, before the work, every time.'],
  ['Self-metering', 'It counts its own consumption in Krim Work Units as it runs.'],
  ['Ledger-logged', 'Each call is written to Krim-Ledger — what ran, why, under which rule.'],
  ['Versioned', 'Behaviour is pinned to a version, so a workflow means the same thing tomorrow.'],
]

const MODES: Array<[string, string]> = [
  ['Sensing', 'reading the world'],
  ['Processing', 'shaping what was read'],
  ['Intelligence', 'judging the next move'],
  ['Action', 'changing something real'],
  ['Control', 'holding the guardrails'],
]

export default function KriyaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <SiteHeader />
      <main>
        <LayerShell slug="kriya">
          {/* ---- 1 · what a primitive is ---- */}
          <Section className="md:py-28">
            <Reveal>
              <Eyebrow>Action primitives · Kriya</Eyebrow>
              <PageH1 className="max-w-[18ch]">250+ validated, credit-native primitives.</PageH1>
              <Lede className="mt-7">
                A primitive is the smallest thing the system can do — place a call, run a
                bankruptcy check, move a payment. Every co-worker is built only from these.
                None of them is a generic tool an integrator has to wire up; each is an
                atomic operation of regulated lending, shipped ready to govern.
              </Lede>
              <CTAGroup className="mt-9" secondaryHref="/platform/karta" secondaryLabel="See them composed into co-workers" />
            </Reveal>
          </Section>

          {/* ---- 2 · the index ---- */}
          <Section hairline className="md:py-24">
            <div className="grid lg:grid-cols-[300px_1fr] gap-10 lg:gap-16 items-start">
              <Reveal>
                <div className="lg:sticky lg:top-24">
                  <Eyebrow>The library</Eyebrow>
                  <H2 className="max-w-[12ch]">Ten categories. A finite vocabulary.</H2>
                  <Body className="mt-6">
                    Read it like the contents page of a reference manual: every category, its
                    size, and — when you open one — the operations a lender will recognise by
                    name. The library is finite; the workflows composed from it are not.
                  </Body>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <PrimitiveIndex />
              </Reveal>
            </div>
          </Section>

          {/* ---- 3 · uniform by construction ---- */}
          <Section className="md:py-24">
            <Reveal>
              <Eyebrow>Uniform by construction</Eyebrow>
              <H2 className="max-w-[20ch]">Different jobs, one shape.</H2>
              <Body className="mt-6 mb-12">
                Whatever a primitive does, it honours the same six-part contract. That
                sameness is what lets the runtime trust them, meter them and seal them
                without bespoke handling for each one.
              </Body>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-9">
              {CONTRACT.map(([title, desc], i) => (
                <Reveal key={title} delay={i * 0.05}>
                  <div className="border-t border-rline pt-4">
                    <MonoNote className="mb-2">{String(i + 1).padStart(2, '0')}</MonoNote>
                    <p className="font-serif text-[1.3rem] leading-tight text-rtext mb-2">{title}</p>
                    <p className="font-sans text-[14px] leading-relaxed text-rtext-2 max-w-[34ch]">{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* five action modes — a quiet coda to the contract */}
            <Reveal delay={0.1}>
              <div className="mt-16 pt-8 border-t border-rline-soft">
                <MonoNote className="mb-5">Every primitive realises one of five action modes</MonoNote>
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                  {MODES.map(([mode, gloss]) => (
                    <p key={mode} className="font-serif text-[1.05rem] text-rtext">
                      {mode}
                      <span className="font-sans text-[13px] text-rtext-3"> — {gloss}</span>
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          </Section>

          {/* ---- 4 · MAKE_CALL, worked end to end ---- */}
          <Section hairline className="md:py-24">
            <div className="grid lg:grid-cols-[1fr_480px] gap-12 lg:gap-16 items-start">
              <Reveal>
                <Eyebrow>Worked example</Eyebrow>
                <H2 className="max-w-[16ch]">One primitive, all the way through.</H2>
                <Body className="mt-6">
                  Take <span className="font-mono text-[13px] text-mint">MAKE_CALL</span>. It accepts an account,
                  a number, a caller ID and a duration cap, plus an optional script. It returns a call ID,
                  a status, a transcript, a recording, a read on sentiment and a right-party-contact flag.
                </Body>
                <Body className="mt-5">
                  But before it dials, four clearances run inside the primitive — TCPA consent, calling hours,
                  the Reg F contact limit and the DNC registry. They are part of the operation, not a wrapper
                  around it, so the same scaffolding rides along whether the call is a collections reminder,
                  a retention offer or an onboarding welcome.
                </Body>
                <Body className="mt-5">
                  It meters itself as it goes — about ten Krim Work Units a minute. An eight-minute call
                  typically lands between 120 and 150 KWU once validation is counted. The receipt is
                  generated, not assembled after the fact — and the same record feeds the world model.
                </Body>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="flex lg:justify-end">
                  <MakeCallReceipt />
                </div>
              </Reveal>
            </div>
          </Section>

          {/* ---- 5 · the second power — every execution is also a lesson ---- */}
          <Section hairline className="md:py-28">
            <Reveal>
              <div className="max-w-[46ch]">
                <MonoNote className="mb-6">The second power · the world model</MonoNote>
                <p className="font-serif font-light text-rtext text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.3]">
                  Every execution is also a lesson.
                  <span className="text-rtext-2"> Each primitive logs to Krim-Ledger with the reasoning behind
                  it</span> — and that record is what Krim-Learn compounds into the world model.
                </p>
                <Body className="mt-8">
                  Validation is the gate that makes each call safe; the ledger is how each call makes the next
                  one smarter. The same act that does the work records why it ran — so improvement comes from
                  the runtime itself, not a second model bolted on.
                </Body>
                <Body className="mt-5">
                  The metering rides the same pass. Every primitive counts its own consumption in Krim Work
                  Units as it runs, so Krim earns when validated work executes — not as a tax on the assets you
                  hold — with no reconciliation gap between what governance saw and what the invoice says.
                </Body>
              </div>
            </Reveal>
          </Section>
        </LayerShell>
      </main>
      <SiteFooter />
    </>
  )
}
