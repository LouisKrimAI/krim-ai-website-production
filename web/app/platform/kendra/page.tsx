/**
 * /platform/kendra — the runtime layer, on the ONE CANVAS (BUILD-BRIEF v3).
 * Kendra is where BOTH powers live, at full weight:
 *   — the first power: Krim-Nyāya, the 33-validator gate every action clears
 *     before it fires (the convergence exhibit + the pipeline in _client);
 *   — the second power: the world model, where Krim-Ledger's complete reasoning
 *     chain is compounded by Krim-Learn into a connected model of the operation.
 * Mirrored movements: the gate clears the action; the ledger remembers it;
 * Learn compounds it. "Validated before it acts. Smarter after it acts."
 * Deeper engineering lives at /architecture (page ships later — named, not linked).
 */

import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Reveal from '@/components/Reveal'
import { Eyebrow, PageH1, H2, Lede, Body, Section, MonoNote } from '@/components/ui'
import LayerShell from '@/components/platform/LayerShell'
import ValidationPipeline from './_client'

export const metadata: Metadata = {
  title: 'Kendra — the Krim runtime, in seven modules | Krim',
  description:
    'Kendra is the KrimOS runtime: seven modules — Core, Fabric, Govern, Nyāya, Learn, Ledger, Sense. Krim-Nyāya gates every action before it fires; Krim-Learn compounds the ledger into a world model after.',
  alternates: { canonical: 'https://krim.ai/platform/kendra' },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Platform', item: 'https://krim.ai/platform' },
    { '@type': 'ListItem', position: 3, name: 'Kendra', item: 'https://krim.ai/platform/kendra' },
  ],
}

// the six modules that converge on the validator — three above the gate, three below,
// so the six-feed-one geometry reads spatially (the gate is seated between the rows).
const TOP = [
  { n: '01', name: 'Krim-Core', role: 'Orchestration', body: 'Routes each request to the right Karta — sequential, parallel and hierarchical work — holding context, retries, fallbacks and human-in-the-loop. Emits events as it goes.' },
  { n: '02', name: 'Krim-Fabric', role: 'Knowledge', body: 'The per-jurisdiction regulatory calendar and rule set, an anonymised cross-tenant pattern library, and each tenant’s own policies and product rules.' },
  { n: '03', name: 'Krim-Govern', role: 'Policy', body: 'A seven-level policy hierarchy — law, regulator guidance, internal rules, operational guardrails — encoded and enforced per tenant.' },
] as const

const BOTTOM = [
  { n: '05', name: 'Krim-Learn', role: 'Learning', body: 'Ten learning loops — outcome feedback, error and pattern analysis, temporal and semantic learning — running across the whole workforce.' },
  { n: '06', name: 'Krim-Ledger', role: 'Record', body: 'Logs every action immutably and meters it in Krim Work Units. Audit trail and usage-based billing from a single source.' },
  { n: '07', name: 'Krim-Sense', role: 'Telemetry', body: 'Metrics, logs, alerts and dashboards across the stack — feeding Kupa and internal monitoring.' },
] as const

const JURISDICTIONS = [
  { place: 'United States', rules: 'FDCPA · TCPA · Reg F · FCRA · SCRA · GLBA · ECOA · CFPB' },
  { place: 'United Kingdom', rules: 'FCA Consumer Duty · CONC · Consumer Credit Act' },
  { place: 'India', rules: 'RBI circulars · Fair Practices Code' },
] as const

// the four memory tiers — named in the canonical world-model block
const TIERS = ['Working', 'Short-term', 'Long-term', 'Episodic'] as const

function ModuleCard({ m }: { m: { n: string; name: string; role: string; body: string } }) {
  return (
    <div className="glass-quiet h-full p-7">
      <div className="flex items-baseline justify-between mb-4">
        <p className="font-serif text-[1.35rem] text-rtext">{m.name}</p>
        <p className="font-mono text-[12px] text-rtext-3">{m.n}</p>
      </div>
      <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-mint mb-3">{m.role}</p>
      <p className="font-sans text-[14px] leading-[1.65] text-rtext-2">{m.body}</p>
    </div>
  )
}

export default function KendraPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <SiteHeader />
      <main>
        <LayerShell slug="kendra">
          {/* ---- hero: the substrate ---- */}
          <Section className="md:py-28">
            <Reveal>
              <Eyebrow>Inside the runtime · Kendra</Eyebrow>
              <PageH1 className="max-w-[15ch]">Seven modules make the guarantees hold.</PageH1>
              <Lede className="mt-7">
                Kendra is the intelligence substrate — the layer co-workers run inside.
                Not a framework they call, but the ground they stand on: one engine routes the work,
                one gate clears it, one ledger remembers it.
              </Lede>
              <Body className="mt-6">
                Above it, primitives compose into co-workers. Beneath it, nothing. Two powers live here,
                co-equal: a gate that validates every action before it fires, and a world model that grows
                smarter from every action after.
              </Body>
              <p className="mt-6 font-sans text-[14px] leading-[1.7] text-rtext-3 max-w-measure">
                The runtime runs where you do: on-prem, hybrid, or managed in a sovereign region.
              </p>
            </Reveal>
          </Section>

          {/* ---- the convergence exhibit: six modules feed one gate ----
               geometry argues the copy: three modules, then the gate, then three more.
               hairline risers connect each row into the gate so six-feed-one reads spatially. */}
          <Section className="md:py-24" hairline>
            <Reveal>
              <MonoNote className="mb-3">THE SUBSTRATE · SEVEN MODULES, ONE GATE</MonoNote>
              <H2 className="max-w-[18ch]">Six modules feed the runtime. One guards it.</H2>
              <Body className="mt-6">
                Core orchestrates, Fabric remembers, Govern rules, Learn improves, Ledger seals,
                Sense watches. Every action they set in motion converges on a single checkpoint
                before it touches the world.
              </Body>
            </Reveal>

            {/* top row — three modules feeding down */}
            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TOP.map((m, i) => (
                <Reveal key={m.name} delay={0.04 + i * 0.04}>
                  <ModuleCard m={m} />
                </Reveal>
              ))}
            </div>

            {/* risers down into the gate */}
            <div className="hidden lg:grid grid-cols-3 h-8" aria-hidden>
              {TOP.map((m) => (
                <div key={m.n} className="flex justify-center">
                  <span className="w-px h-full bg-gradient-to-b from-rline to-mint/40" />
                </div>
              ))}
            </div>

            {/* the gate — the page's ONE mint-edged accent panel, seated between the rows */}
            <Reveal delay={0.05}>
              <div className="glass glass-mint p-8 md:p-10 grid md:grid-cols-[auto_1fr] gap-x-10 gap-y-5 items-baseline">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-mint mb-2">04 · The gate</p>
                  <p className="font-serif text-[2rem] leading-tight text-rtext">Krim-Nyāya</p>
                  <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-rtext-3 mt-1">Validator</p>
                </div>
                <div>
                  <p className="font-serif text-[1.3rem] leading-[1.5] text-rtext-2 max-w-[46ch]">
                    A staged, pre-execution pipeline of 33 validators across three Navya-Nyāya families —
                    each returning pass, amber or fail. It gates every action before it fires.
                  </p>
                  <p className="font-mono text-[11px] tracking-[0.08em] text-rtext-3 mt-4">
                    Pramāṇa · sources of knowledge → Doṣa · classes of error → Yogyatā · fitness for action
                  </p>
                </div>
              </div>
            </Reveal>

            {/* risers up from the gate into the lower row */}
            <div className="hidden lg:grid grid-cols-3 h-8" aria-hidden>
              {BOTTOM.map((m) => (
                <div key={m.n} className="flex justify-center">
                  <span className="w-px h-full bg-gradient-to-t from-rline to-mint/40" />
                </div>
              ))}
            </div>

            {/* bottom row — three more modules feeding up */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {BOTTOM.map((m, i) => (
                <Reveal key={m.name} delay={0.04 + i * 0.04}>
                  <ModuleCard m={m} />
                </Reveal>
              ))}
            </div>
          </Section>

          {/* ---- a single quiet idea, full width ---- */}
          <Section className="md:py-28">
            <Reveal>
              <p className="font-serif font-light text-rtext text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.18] tracking-[-0.012em] max-w-[20ch]">
                The runtime cannot escape its own validation.
              </p>
              <Body className="mt-8">
                There is no privileged path, no admin door, no fast lane that skips the gate. Krim-Nyāya
                sits inside the execution loop, not beside it — so safety is the architecture, not an add-on.
                What the runtime does, it can prove it was allowed to do.
              </Body>
            </Reveal>
          </Section>

          {/* ---- FIRST POWER · the validation pipeline (judgment) ---- */}
          <Section className="md:py-28" hairline>
            <Reveal>
              <ValidationPipeline />
            </Reveal>
          </Section>

          {/* ---- SECOND POWER · the world model (intelligence) ----
               co-equal full-weight movement, mirrored against the gate:
               the gate clears the action; the ledger remembers it; Learn compounds it. */}
          <Section id="world-model" className="md:py-28" hairline>
            <Reveal>
              <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-mint mb-6">
                The second power · the world model
              </p>
              <H2 className="max-w-[22ch]">It sees the operation whole — and learns how it behaves.</H2>
              <Lede className="mt-7">
                One runtime runs the whole lending lifecycle, so it sees the operation whole — every call,
                document, decision and outcome, on one ledger with its complete reasoning chain. Krim-Learn
                turns that record into a connected model of how the operation actually behaves: which sequence
                cures a delinquency, which channel reaches which segment, where borrowers stall and why.
              </Lede>
              <Body className="mt-6">
                What Krim-Learn surfaces changes production only through the same doors as everything else —
                versioned primitives and strategies, routed through Krim-Govern and Krim-Nyāya, signed off in Kupa.
              </Body>
            </Reveal>

            {/* mirrored geometry: ledger → learn → fabric, the action's afterlife */}
            <div className="mt-14 grid lg:grid-cols-3 gap-4">
              <Reveal delay={0.04}>
                <div className="glass-quiet h-full p-7">
                  <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-mint mb-3">The record</p>
                  <p className="font-serif text-[1.3rem] text-rtext mb-3">Krim-Ledger remembers it.</p>
                  <p className="font-sans text-[14px] leading-[1.65] text-rtext-2">
                    Every action lands on one immutable ledger with its complete reasoning chain — not just
                    what happened, but why it was allowed to. The full operation, on one record.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="glass-quiet h-full p-7">
                  <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-mint mb-3">The loops</p>
                  <p className="font-serif text-[1.3rem] text-rtext mb-3">Krim-Learn compounds it.</p>
                  <p className="font-sans text-[14px] leading-[1.65] text-rtext-2">
                    Ten learning loops attribute outcomes to decisions, reading the complete reasoning chain
                    back into the institution’s own intelligence — optimisation on every decision.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="glass-quiet h-full p-7">
                  <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-mint mb-3">The moat</p>
                  <p className="font-serif text-[1.3rem] text-rtext mb-3">Krim-Fabric keeps it.</p>
                  <p className="font-sans text-[14px] leading-[1.65] text-rtext-2">
                    Patterns above the effectiveness threshold (≈80%) enter Krim-Fabric’s library — anonymised
                    and federated, so no tenant’s secrets leak, with per-tenant opt-out.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* four memory tiers — what one co-worker learns, all of them inherit */}
            <Reveal delay={0.06}>
              <div className="mt-12 glass-quiet p-7 md:p-8">
                <MonoNote className="mb-5">FOUR MEMORY TIERS · SHARED ACROSS THE WORKFORCE</MonoNote>
                <div className="flex flex-wrap items-center gap-3">
                  {TIERS.map((t, i) => (
                    <span key={t} className="flex items-center gap-3">
                      <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-rtext-2 border border-rline-soft rounded-[6px] px-4 py-2">
                        {t}
                      </span>
                      {i < TIERS.length - 1 && <span className="text-rtext-3" aria-hidden>·</span>}
                    </span>
                  ))}
                </div>
                <p className="mt-6 font-sans text-[14px] leading-[1.7] text-rtext-2 max-w-measure">
                  A pattern learned by one Karta is available to the others without retraining — what one
                  co-worker learns, all of them inherit.
                </p>
              </div>
            </Reveal>

            {/* the close — the two powers named together, verbatim from the canonical block */}
            <Reveal delay={0.05}>
              <p className="mt-14 font-serif font-light text-rtext text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.16] tracking-[-0.012em] max-w-[18ch]">
                Validated before it acts. Smarter after it acts.
              </p>
              <Body className="mt-7">
                The expected curve: a first-quarter baseline, measurable gains by Q2, materially better
                than go-live by year two — improvement from the runtime, not additional engineering. The gate
                makes it safe to act; the world model makes each action smarter than the last.
              </Body>
            </Reveal>
          </Section>

          {/* ---- the record, the queue, the live rules ---- */}
          <Section className="md:py-24" hairline>
            <Reveal>
              <Eyebrow>On the record</Eyebrow>
              <H2 className="max-w-[20ch]">Every decision is kept — including the ones that passed.</H2>
              <Lede className="mt-7">
                Rejected actions land in an exception queue with the blocking rule and its reasoning.
                Operators see what stopped and why. Auditors see every validation decision in Krim-Ledger —
                not only the refusals, but the approvals too.
              </Lede>
            </Reveal>

            {/* jurisdictions — the law as encoded data, three rule sets on one architecture */}
            <Reveal delay={0.05}>
              <div className="mt-14">
                <MonoNote className="mb-2">THE LAW, ENCODED IN KRIM-FABRIC</MonoNote>
                <p className="font-sans text-[15px] leading-[1.7] text-rtext-2 max-w-measure mb-8">
                  One architecture, three rule sets. Rule sets are encoded data, not code — a new regime is
                  added, not rebuilt. Govern updates them in real time, with no restart of the runtime, and
                  existing Karta inherit the new constraints immediately.
                </p>
                <dl className="border-y border-rline-soft divide-y divide-rline-soft">
                  {JURISDICTIONS.map((j) => (
                    <div key={j.place} className="grid sm:grid-cols-[200px_1fr] gap-x-8 gap-y-1 py-5">
                      <dt className="font-serif text-[1.2rem] text-rtext">{j.place}</dt>
                      <dd className="font-mono text-[12px] leading-[1.8] tracking-[0.04em] text-rtext-2 sm:pt-1">{j.rules}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="mt-12 font-sans text-[15px] leading-[1.7] text-rtext-3 max-w-measure">
                Memory tiers, Temporal-class durable orchestration, the fifteen-entity domain model —
                the full engineering story lives on the architecture page.
              </p>
            </Reveal>
          </Section>
        </LayerShell>
      </main>
      <SiteFooter />
    </>
  )
}
