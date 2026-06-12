/**
 * /platform/karta — Karta, the AI co-workers layer. ONE CANVAS (BUILD-BRIEF v3).
 * Two co-equal powers thread through the spine: JUDGMENT (the gate — the one gold
 * moment, the hard boundary that does not move) and INTELLIGENCE (the world model
 * — what one co-worker learns, all of them know, through four memory tiers).
 * Two signatures: the EIGHT-ROSTER as a glass register, and the FOUR OPERATING
 * MODES as an interactive dial. Facts: docs/krim-content.md.
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import LayerShell from '@/components/platform/LayerShell'
import Reveal from '@/components/Reveal'
import { Eyebrow, PageH1, H2, Lede, Body, Section, CTAGroup, MonoNote } from '@/components/ui'
import OperatingModeDial from './_client'

export const metadata: Metadata = {
  title: 'Karta — AI co-workers, not bots | Krim',
  description:
    'Eight utility co-workers composed from validated primitives — Vox-Out, Vox-In, Doc, Risk, Decide, Cure, Audit, Report. Operational decisioning across the lifecycle — never underwriting.',
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

// The eight — verbatim roles (krim-content.md). `bound` flags the two that carry
// the underwriting caveat, so the register can mark them without inventing copy.
type Coworker = {
  no: string
  name: string
  channel: string
  role: string
  bound?: string
}

const ROSTER: Coworker[] = [
  {
    no: '01',
    name: 'Vox-Out',
    channel: 'Outbound voice',
    role: 'Across the lifecycle — acquisition, onboarding, servicing, collections, hardship, retention, cross-sell.',
  },
  {
    no: '02',
    name: 'Vox-In',
    channel: 'Inbound voice',
    role: 'Servicing and payment queries, disputes, hardship signposting, warm transfer to humans.',
  },
  {
    no: '03',
    name: 'Doc',
    channel: 'Documents & notices',
    role: 'Arrears notices, restructuring offers, regulatory letters, payment confirmations.',
  },
  {
    no: '04',
    name: 'Risk',
    channel: 'Operational risk',
    role: 'Segmentation and gating by external risk flags.',
    bound: 'Not underwriting.',
  },
  {
    no: '05',
    name: 'Decide',
    channel: 'Next-best-action',
    role: 'Conflict resolution across competing strategies.',
    bound: 'Not credit approval or pricing.',
  },
  {
    no: '06',
    name: 'Cure',
    channel: 'Delinquency cure',
    role: 'Orchestrates multi-step journeys to bring borrowers back to good standing.',
  },
  {
    no: '07',
    name: 'Audit',
    channel: 'Interaction review',
    role: 'Pattern detection and anomaly surfacing for compliance and audit teams.',
  },
  {
    no: '08',
    name: 'Report',
    channel: 'Operational reporting',
    role: 'Aggregated for ops, risk, compliance and executive stakeholders.',
  },
]

// The lifecycle band the templates span — used as a quiet coverage rail, not a claim.
const LIFECYCLE = [
  'Acquisition / onboarding',
  'Activation',
  'Servicing',
  'Collections · Early DPD 1–30',
  'Collections · Mid/Late DPD 31+',
  'Hardship / restructuring',
  'Retention / cross-sell',
]

export default function KartaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <SiteHeader />
      <main>
        <LayerShell slug="karta">
          {/* ---- 1 · hero: plain meaning, first screen ---- */}
          <Section className="md:py-28">
            <Reveal>
              <Eyebrow>The co-workers · Karta</Eyebrow>
              <PageH1 className="max-w-[15ch]">Intelligent co-workers, not bots.</PageH1>
              <Lede className="mt-7">
                Karta live inside the runtime, compose primitives into capability, and learn from
                every interaction. The same small catalog configures to any function across the
                lifecycle — so what one co-worker learns, the others inherit.
              </Lede>
              <Body className="mt-6">
                A bot follows a script. A co-worker is given a purpose and a set of validated
                actions, then held to measured outcomes. There are eight of them. None of them
                writes a loan.
              </Body>
              <CTAGroup className="mt-9" secondaryHref="/platform/kriya" secondaryLabel="See the primitives they’re built from" />
            </Reveal>
          </Section>

          {/* ---- 2 · signature graphic 1: THE EIGHT-ROSTER (glass register) ---- */}
          <Section className="md:py-20">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <Eyebrow>The roster</Eyebrow>
                  <H2 className="max-w-[20ch]">Eight on the books.</H2>
                </div>
                <MonoNote className="mb-1">CATALOG · UTILITY-BASED · COMPOSED FROM PRIMITIVES</MonoNote>
              </div>
            </Reveal>

            {/* register: a glass artifact, each co-worker an entry */}
            <div className="mt-10 glass overflow-hidden">
              {/* column header — the evidentiary frame */}
              <div className="hidden grid-cols-[44px_180px_1fr] gap-6 border-b border-rline-soft px-6 py-3.5 md:grid md:px-8">
                <p className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-rtext-3">№</p>
                <p className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-rtext-3">Co-worker · channel</p>
                <p className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-rtext-3">Remit</p>
              </div>

              {ROSTER.map((c, idx) => (
                <Reveal key={c.name} delay={Math.min(idx * 0.04, 0.24)}>
                  <div className="grid grid-cols-[44px_1fr] gap-x-6 gap-y-2 border-b border-rline-soft px-6 py-5 last:border-b-0 md:grid-cols-[44px_180px_1fr] md:px-8 md:py-6">
                    <p className="font-mono text-[12px] text-rtext-3 md:pt-1">{c.no}</p>
                    <div>
                      <p className="font-serif text-[1.35rem] leading-tight text-rtext">{c.name}</p>
                      <p className="mt-1 font-mono text-[10px] tracking-[0.12em] uppercase text-mint">{c.channel}</p>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <p className="font-sans text-[14.5px] leading-[1.6] text-rtext-2">{c.role}</p>
                      {c.bound && (
                        <p className="mt-1.5 font-mono text-[10.5px] tracking-[0.08em] uppercase text-amber-dark">
                          ▸ {c.bound}
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <Body className="mt-7">
                Each co-worker is defined by twelve attributes — including purpose, capabilities,
                primitives, inputs, outputs, metrics, KWU cost, governance, learning loops,
                human-in-the-loop triggers and availability. Specialised templates extend every one
                across the lifecycle: same primitives, same compliance scaffolding, different
                policies, scripts and segments.
              </Body>
            </Reveal>

            {/* lifecycle coverage rail — quiet, evidentiary */}
            <Reveal>
              <div className="mt-8">
                <MonoNote className="mb-3">ONE CATALOG · CONFIGURED ACROSS THE LIFECYCLE</MonoNote>
                <div className="flex flex-wrap gap-x-2 gap-y-2">
                  {LIFECYCLE.map((stage) => (
                    <span
                      key={stage}
                      className="glass-quiet px-3 py-1.5 font-mono text-[10.5px] tracking-[0.06em] text-rtext-2"
                    >
                      {stage}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </Section>

          {/* ---- 3 · THE SECOND POWER: the world model (register → shared memory) ---- */}
          <Section className="md:py-20">
            <Reveal>
              <Eyebrow tone="mint">The second power · intelligence</Eyebrow>
              <H2 className="max-w-[22ch]">What one co-worker learns, all of them know.</H2>
              <Lede className="mt-6">
                The catalog stays small because it shares one mind. Ten learning loops attribute
                outcomes to decisions; four memory tiers — working, short-term, long-term and
                episodic — share what one co-worker learns with all of them, so a pattern learned
                by one co-worker transfers to adjacent workflows — within governance constraints —
                without retraining anyone.
              </Lede>
              <Body className="mt-6">
                And nothing a co-worker learns changes production behaviour except through the same
                validated, signed-off doors as everything else: learning ships as versioned
                primitives, cleared by Krim-Nyāya and signed off in Kupa before it ever runs.
              </Body>
            </Reveal>
          </Section>

          {/* ---- 4 · THE HARD BOUNDARY: the one gold moment, the page's most arresting panel ---- */}
          <Section>
            <Reveal>
              <div className="glass overflow-hidden border-amber-dark/45 shadow-[0_0_0_1px_rgba(200,161,74,0.1),0_24px_64px_rgba(2,3,8,0.55)]">
                {/* the gold spine of the panel — judgment, the boundary that does not move */}
                <div className="grid md:grid-cols-[3px_1fr]">
                  <div aria-hidden className="hidden md:block bg-gradient-to-b from-amber-dark/80 via-amber-dark/40 to-transparent" />
                  <div className="border-l-2 border-amber-dark/70 px-7 py-11 md:border-l-0 md:px-12 md:py-16">
                    <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-amber-dark">
                      The first power · judgment — the boundary that does not move
                    </p>
                    <p className="mt-6 max-w-[24ch] font-serif text-[clamp(1.9rem,3.6vw,2.8rem)] font-light leading-[1.08] tracking-[-0.012em] text-rtext">
                      Operational decisioning. Never underwriting.
                    </p>
                    <p className="mt-7 max-w-measure font-sans text-[15.5px] leading-[1.7] text-rtext-2">
                      Karta-Risk and Karta-Decide segment portfolios, suggest the next best action,
                      resolve conflicts between competing strategies, and gate actions on the
                      institution&rsquo;s own risk and fraud flags. That is the whole of their
                      authority.
                    </p>

                    {/* the explicit ledger of what they will not do */}
                    <ul className="mt-8 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                      {[
                        'Do not approve or deny loans',
                        'Do not price credit',
                        'Do not override your credit or risk engines',
                        'Do not touch underwriting authority',
                      ].map((line) => (
                        <li key={line} className="flex items-start gap-3">
                          <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-amber-dark" />
                          <span className="font-sans text-[14.5px] leading-[1.6] text-rtext-2">{line}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="mt-9 border-t border-rline-soft pt-6 font-serif text-[1.2rem] italic leading-[1.5] text-rtext">
                      Underwriting authority stays exactly where the regulator expects it — with you.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </Section>

          {/* ---- 5 · signature graphic 2: FOUR OPERATING MODES (interactive dial) ---- */}
          <Section className="md:py-20">
            <Reveal>
              <Eyebrow>The control you keep</Eyebrow>
              <H2 className="max-w-[20ch]">Autonomy is not a property of the model — it is a setting.</H2>
              <Lede className="mt-6">
                Four operating modes, from fully autonomous to human-in-the-loop, applied per
                workflow, per segment, per risk band. Begin cautious; move toward autonomy only as
                the outcomes earn it.
              </Lede>
            </Reveal>

            <Reveal>
              <div className="mt-10">
                <OperatingModeDial />
              </div>
            </Reveal>
          </Section>

          {/* ---- 6 · closing: compounding, in one breath ---- */}
          <Section>
            <Reveal>
              <Eyebrow>Why a catalog, not an army</Eyebrow>
              <p className="max-w-[40ch] font-serif text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.5] text-rtext">
                Eight co-workers, configured rather than re-coded, sharing one memory across the
                whole workforce — so what collections learned in March, the adjacent servicing
                workflow knows in April.
              </p>
              <Body className="mt-7">
                That is the difference between hiring more bots and growing a workforce. The
                catalog stays small and legible; the capability compounds. Above it sits the
                command center, where humans configure, supervise and audit every one of them.
              </Body>
            </Reveal>
          </Section>
        </LayerShell>
      </main>
      <SiteFooter />
    </>
  )
}
