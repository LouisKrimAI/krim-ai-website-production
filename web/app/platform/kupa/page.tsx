/**
 * /platform/kupa — the command center layer (BUILD-BRIEF v3 §4).
 * One canvas: the glass cockpit sits directly on the deep ground as the
 * page's hero artifact. Two co-equal powers run through it — Judgment
 * (the gate, amber human sign-off) and Intelligence (Kula's Learn beat,
 * outcomes feeding the world model). Humans supervise, configure, audit.
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import LayerShell from '@/components/platform/LayerShell'
import Reveal from '@/components/Reveal'
import KupaCockpit from '@/components/KupaCockpit'
import {
  Eyebrow,
  PageH1,
  H2,
  Lede,
  Body,
  Section,
  Glass,
  CTAGroup,
  MonoNote,
} from '@/components/ui'

export const metadata: Metadata = {
  title: 'Kupa — the glass cockpit | Krim',
  description:
    'Kupa is the command center for Krim-powered operations: one operational view, human-in-the-loop review, strategy console, one-click kill switches and an audit workspace.',
  alternates: { canonical: 'https://krim.ai/platform/kupa' },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Platform', item: 'https://krim.ai/platform' },
    { '@type': 'ListItem', position: 3, name: 'Kupa', item: 'https://krim.ai/platform/kupa' },
  ],
}

// The five things Kupa provides (krim-content.md §Kupa) — verbatim register,
// recast as a 2 + 3 asymmetric glass mosaic (not the mono-№ roster shared by
// karta/krimkar). Large serif figures, staggered, evidentiary tone intact.
const CAPABILITIES: Array<{ n: string; title: string; body: React.ReactNode }> = [
  {
    n: 'i',
    title: 'Unified operational view',
    body: (
      <>
        Dashboards and queues across every stage and segment — sales and activation,
        servicing, collections and restructuring, retention — with SLAs and bucket
        performance read off one trail.
      </>
    ),
  },
  {
    n: 'ii',
    title: 'Human-in-the-loop controls',
    body: (
      <>
        Review queues for low-confidence or high-risk decisions; supervisor sign-off on
        every script and strategy change before it reaches a customer.
      </>
    ),
  },
  {
    n: 'iii',
    title: 'Strategy & configuration console',
    body: (
      <>
        Which Karta are active for which segments. Contact windows, frequency caps and
        channels per jurisdiction. Offer libraries, A/B tests, exposure ramps — all
        configured, none re-coded.
      </>
    ),
  },
  {
    n: 'iv',
    title: 'Real-time monitoring & kill switches',
    body: (
      <>
        Live volumes, outcomes, error and complaint rates, anomaly alerts — and one-click
        pause or rollback of a Karta, campaign, jurisdiction or segment.
      </>
    ),
  },
  {
    n: 'v',
    title: 'Audit & investigation workspace',
    body: (
      <>
        Every interaction linked to the policies that applied, the validation results, and
        the decisions and escalations. What happened, why, and under which rules.
      </>
    ),
  },
]

export default function KupaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <SiteHeader />
      <main>
        {/* Layer shell wraps: breadcrumb · stack rail · prev/next · CTA band */}
        <LayerShell slug="kupa">
          {/* ---- hero: plain meaning, first screen. cadence break — no counting ---- */}
          <Section className="md:py-28">
            <Reveal>
              <Eyebrow>Kupa · the command center</Eyebrow>
              <PageH1 className="max-w-[18ch]">The glass cockpit for Krim-powered operations.</PageH1>
              <Lede className="mt-7">
                Co-workers do the work in the runtime. Kupa is where people watch it, shape it,
                stop it and account for it — full lifecycle visibility across sales and
                activation, servicing, collections and restructuring, and retention.
              </Lede>
              <CTAGroup className="mt-9" secondaryHref="/platform/karta" secondaryLabel="Meet the co-workers it supervises" />
            </Reveal>
          </Section>

          {/* ---- the cockpit: hero artifact directly on the canvas ---- */}
          <Section hairline className="md:py-20">
            <Reveal>
              <Eyebrow tone="cyan">The cockpit · what an operator sees</Eyebrow>
              <H2 className="max-w-[24ch]">This is what an operator sees.</H2>
              <Body className="mt-7 max-w-[56ch]">
                One screen, three reads: the queues with their backlogs, the validated-action
                rate as it clears the 33-validator gate, and the exception queue where
                low-confidence and high-risk decisions wait for a person. The amber action
                held for review here is the same one a supervisor approves on the same ledger
                the auditor reads.
              </Body>
            </Reveal>

            <Reveal delay={0.08} className="mt-12">
              <KupaCockpit />
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-8 font-mono text-[10.5px] tracking-[0.08em] text-rtext-3 max-w-[64ch]">
                Top-left: <span className="text-rtext-2">one-click kill switches</span> — pause or roll
                back any Karta, campaign, jurisdiction or segment without restarting the runtime.
                Right: the <span className="text-rtext-2">audit workspace</span> — each exception
                carries the blocking rule and its reasoning, ready to investigate.
              </p>
            </Reveal>
          </Section>

          {/* ---- the five capabilities: a 2 + 3 asymmetric glass mosaic ---- */}
          <Section hairline className="md:py-24">
            <Reveal>
              <Eyebrow>What the cockpit gives you</Eyebrow>
              <H2 className="max-w-[20ch]">The instruments on the panel.</H2>
            </Reveal>

            {/* top row: two broad panels; bottom row: three. serif numerals, staggered. */}
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
              {CAPABILITIES.map((c, i) => {
                // first two span half-width (3/6); last three span a third (2/6)
                const span = i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'
                // staggered vertical offset, breaking the gridline
                const offset = i === 1 ? 'lg:mt-8' : i === 3 ? 'lg:mt-6' : i === 4 ? 'lg:mt-10' : ''
                return (
                  <Reveal key={c.title} delay={i * 0.05} className={`${span} ${offset}`}>
                    <Glass quiet className="group h-full p-6 md:p-8 transition-colors hover:border-mint/25">
                      <div className="flex items-baseline gap-4">
                        <span className="font-serif italic font-light text-[2.6rem] leading-none text-mint/30 group-hover:text-mint/55 transition-colors tabular-nums">
                          {c.n}
                        </span>
                        <h3 className="font-serif text-[1.35rem] leading-tight text-rtext">{c.title}</h3>
                      </div>
                      <p className="mt-4 font-sans text-[15px] leading-[1.7] text-rtext-2">{c.body}</p>
                    </Glass>
                  </Reveal>
                )
              })}
            </div>

            <Reveal delay={0.1}>
              <MonoNote className="mt-8">
                EVIDENTIARY REGISTER — EVERY READING ABOVE IS DRAWN FROM THE SAME LEDGER THE AUDITOR READS
              </MonoNote>
            </Reveal>
          </Section>

          {/* ---- Kula, Ask → Suggest → Act → Learn: the page's intelligence beat ---- */}
          <Section hairline className="md:py-24">
            <Reveal>
              <Eyebrow tone="cyan">Kula · the strategy copilot, surfaced in Kupa</Eyebrow>
              <H2 className="max-w-[22ch]">Kula turns intent into governed strategy.</H2>
              <Body className="mt-6 max-w-[54ch]">
                An operator writes a goal in plain language. Kula proposes the way there —
                then routes the whole proposal through governance and into Kupa, where a human
                decides.
              </Body>
            </Reveal>

            {/* the four-beat loop, typeset: human in serif, machine in mono (PROTECTED) */}
            <Reveal delay={0.08}>
              <Glass className="mt-12 p-7 md:p-12">
                {/* ASK — the operator's sentence, in serif (human) */}
                <div className="grid md:grid-cols-[120px_1fr] gap-x-8 gap-y-3 items-baseline">
                  <MonoNote className="text-cyan">01 · ASK</MonoNote>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-rtext-3 mb-3">Operator, in their own words</p>
                    <p className="font-serif text-rtext text-[clamp(1.35rem,2.8vw,2rem)] leading-[1.4]">
                      &ldquo;Increase on-time payments in 1&ndash;30&nbsp;DPD by 5% next quarter.&rdquo;
                    </p>
                  </div>
                </div>

                <div className="my-9 hairline" aria-hidden />

                {/* SUGGEST — Kula's proposals, in mono (machine · proposed = cyan) */}
                <div className="grid md:grid-cols-[120px_1fr] gap-x-8 gap-y-3 items-baseline">
                  <MonoNote className="text-rtext-3">02 · SUGGEST</MonoNote>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-rtext-3 mb-3">Kula proposes</p>
                    <ul className="space-y-2.5">
                      {[
                        'segment  →  1–30 DPD · on-time-history high · no active hardship',
                        'flow     →  reminder cadence + early-settlement nudge, capped',
                        'karta    →  Vox-Out · Cure, contact-window aware',
                        'policy   →  freq-cap 3/wk · quiet-hours IN · script v4 pending sign-off',
                      ].map((line) => (
                        <li key={line} className="font-mono text-[12.5px] leading-relaxed text-rtext-2 whitespace-pre-wrap">
                          <span className="text-cyan">›</span> {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="my-9 hairline" aria-hidden />

                {/* THE GATE — marked, unmissable. amber human sign-off (PROTECTED) */}
                <div className="grid md:grid-cols-[120px_1fr] gap-x-8 gap-y-3 items-baseline">
                  <MonoNote className="text-amber-dark">⎯ GATE ⎯</MonoNote>
                  <div className="border border-amber-dark/40 bg-amber-dark/[0.06] rounded-[12px] p-5 md:p-6">
                    <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-amber-dark mb-3">
                      Krim-Govern · Krim-Nyāya · human sign-off
                    </p>
                    <p className="font-serif text-rtext text-[clamp(1.15rem,2.2vw,1.55rem)] leading-[1.45] max-w-[40ch]">
                      Every proposal is checked against policy and waits for a person to approve it.
                      It never bypasses human sign-off or policy checks.
                    </p>
                  </div>
                </div>

                <div className="my-9 hairline" aria-hidden />

                {/* ACT → LEARN — the close of the loop. Learn carries the world model. */}
                <div className="grid md:grid-cols-[120px_1fr] gap-x-8 gap-y-6 items-start">
                  <MonoNote className="text-rtext-3">03–04</MonoNote>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-rtext-3 mb-2">Act</p>
                      <Body className="max-w-none">
                        Approved, the strategy runs as validated primitives — every action gated
                        before it fires, every outcome metered on the ledger.
                      </Body>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-mint mb-2">Learn</p>
                      <Body className="max-w-none">
                        Outcomes feed back into the world model — what this operation learns, the
                        next strategy already knows. Kula refines the next proposal, and the next
                        ask starts from evidence, not a blank page.
                      </Body>
                    </div>
                  </div>
                </div>
              </Glass>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-7 font-serif italic text-[1.05rem] text-rtext-2 max-w-[46ch]">
                The other ask Kula handles just as readily: &ldquo;Run a win-back for auto-loan
                customers who paid off last year and took no further product.&rdquo;
              </p>
            </Reveal>
          </Section>
        </LayerShell>
      </main>
      <SiteFooter />
    </>
  )
}
