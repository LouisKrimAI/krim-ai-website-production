/**
 * /platform/kendra — the runtime, the brain. The deepest page of the
 * platform cluster: the loop every action runs, the two powers (Krim-Nyāya
 * validates, Krim-Learn learns), the five quieter modules, and the ledger.
 * Server component: metadata + JSON-LD live here; every animated piece is in
 * _client.tsx. Wrapped in the shared LayerShell. Facts: docs/krim-content.md
 * · copy: docs/copy/platform-kendra.md. Grammar: cyan = proposed/thinking ·
 * mint = validated/learned · gold = amber/exception.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import LayerShell from '@/components/platform/LayerShell'
import ArchGlyph from '@/components/platform/ArchGlyph'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard } from '@/components/ui'
import {
  LoopFlow,
  ValidationGate,
  WorldModelField,
  LedgerStreams,
  OrbBrainCard,
} from './_client'

export const metadata: Metadata = {
  title: 'Kendra — the runtime',
  description:
    'Kendra is the mind of KrimOS: Krim-Nyāya validates every action before it executes, Krim-Learn turns every outcome into intelligence.',
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

// the three Krim-Nyāya validator families
const FAMILIES = [
  {
    name: 'Pramāṇa',
    q: 'Is it grounded?',
    body: 'Every premise the action rests on has to hold. Unverifiable, it doesn’t proceed.',
  },
  {
    name: 'Doṣa',
    q: 'Is it sound?',
    body: 'Checked against every known way this kind of thing goes wrong.',
  },
  {
    name: 'Yogyatā',
    q: 'Is it fit?',
    body: 'Right moment, right person, right channel, right purpose — wrong on any, and it waits.',
  },
]

// the five quieter modules of the runtime
const MODULES = [
  { name: 'Krim-Core', role: 'orchestration', body: 'Routes each task, runs the workflows, handles retries and hand-offs.' },
  { name: 'Krim-Fabric', role: 'knowledge', body: 'The rules of each jurisdiction, each institution’s policies, the shared pattern library.' },
  { name: 'Krim-Govern', role: 'policy', body: 'A seven-level hierarchy of law, regulation and house rules, enforced per tenant.' },
  { name: 'Krim-Ledger', role: 'the record', body: 'Every action logged, sealed and metered — detailed just below.' },
  { name: 'Krim-Sense', role: 'telemetry', body: 'The metrics, alerts and dashboards that show what’s happening.' },
]

// the ledger's three jobs from one record
const LEDGER_JOBS = [
  {
    name: 'Evidence',
    body: 'The audit trail a regulator can replay — inspection responses in minutes, not days.',
  },
  {
    name: 'Intelligence',
    body: 'The same record is what Krim-Learn learns from. Proof and improvement, one source.',
  },
  {
    name: 'Meter',
    body: 'Every action measured in Krim Work Units — your own clear view of what the operation costs.',
  },
]

export default function KendraPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <LayerShell slug="kendra">
        {/* ---- 1 · Hero ---- */}
        <Section className="!pt-14 md:!pt-16">
          <div className="grid items-center gap-12 lg:grid-cols-[1.04fr_1fr]">
            <div>
              <Reveal>
                <Eyebrow>Kendra — the runtime</Eyebrow>
                <h1 className="mt-4 font-serif text-display-hero text-ink">
                  The mind of the operation.
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-7 max-w-[54ch] font-sans text-body-lg text-ink-2">
                  Kendra is where KrimOS reasons — the runtime that decides what every co-worker is
                  allowed to do. Two parts define it. <span className="text-ink">Krim-Nyāya</span>{' '}
                  validates every action before it executes; <span className="text-ink">Krim-Learn</span>{' '}
                  turns every outcome into intelligence.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-9">
                  <OrbBrainCard />
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <GlassCard className="p-7 md:p-9">
                <ArchGlyph active="kendra" />
                <p className="mt-5 font-mono text-eyebrow uppercase text-ink-3">
                  The brain that runs the rest — lit on the map.
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · The loop ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>The loop</Eyebrow>
            <h2 className="mt-4 max-w-[20ch] font-serif text-display-1 text-ink">
              One path for every action.
            </h2>
            <p className="mt-7 max-w-[62ch] font-sans text-body-lg text-ink-2">
              Perceive. Reason. Plan. Validate. Act. Every co-worker, every task runs the same five
              steps — and the fourth is the one the others serve. Validation isn&rsquo;t a review
              after the work; it&rsquo;s the gate the work must pass to become real.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-12 md:mt-16">
              <LoopFlow />
            </div>
          </Reveal>
        </Section>

        {/* ---- 3 · Power one — judgment ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow tone="cyan">Power one · judgment</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">Krim-Nyāya: the gate.</h2>
            <p className="mt-7 max-w-[64ch] font-sans text-body-lg text-ink-2">
              Before anything fires, it goes to Krim-Nyāya — thirty-three validators that ask, in
              formal logic, whether this action is allowed to happen at all. They work in three
              families, each returning <span className="text-pass">pass</span>,{' '}
              <span className="text-amber">amber</span> or <span className="text-fail">fail</span>.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {FAMILIES.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.08}>
                <GlassCard className="flex h-full flex-col p-7">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif text-[1.5rem] leading-none text-ink">{f.name}</h3>
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="mt-3 font-sans text-body text-cyan">{f.q}</p>
                  <p className="mt-3 flex-1 font-sans text-caption leading-relaxed text-ink-2">
                    {f.body}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>

          {/* signature device — the validation gate with amber exception lane */}
          <Reveal delay={0.1}>
            <div className="mt-12 md:mt-16">
              <ValidationGate />
            </div>
          </Reveal>

          <div className="mt-12 grid items-end gap-10 lg:grid-cols-[1.1fr_1fr]">
            <Reveal>
              <p className="max-w-[58ch] font-sans text-body-lg text-ink-2">
                Most actions clear. Some don&rsquo;t — and that&rsquo;s the point. A blocked action
                doesn&rsquo;t vanish; it&rsquo;s flagged{' '}
                <span className="text-amber">amber</span> and handed to a person, with the rule that
                stopped it and the reason in plain words.{' '}
                <span className="text-ink">A system you can trust is one you can watch refuse.</span>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <GlassCard accent className="p-8 md:p-10">
                <p className="font-serif text-[clamp(1.4rem,2.4vw,1.9rem)] leading-tight text-ink">
                  33 validators. Nothing executes unvalidated.
                </p>
              </GlassCard>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <p className="mt-10 max-w-[70ch] font-sans text-caption leading-relaxed text-ink-3">
              The logic is Navya-Nyāya — a formal tradition of valid inference refined over
              centuries in Mithila — applied now to machine action. The full story lives on{' '}
              <Link href="/epistemic-ai" className="text-ink-2 underline-offset-4 transition-colors hover:text-mint hover:underline">
                Epistemic AI
              </Link>
              .
            </p>
          </Reveal>
        </Section>

        {/* ---- 4 · Power two — intelligence ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Power two · intelligence</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">Krim-Learn: the mind.</h2>
          </Reveal>

          <div className="mt-7 grid gap-12 lg:grid-cols-[1fr_1.02fr] lg:items-center">
            <div className="space-y-6">
              <Reveal>
                <p className="max-w-[58ch] font-sans text-body-lg text-ink-2">
                  Validation makes the system safe to run; Krim-Learn makes it worth running twice.
                  Because every action and its outcome land on one record, Krim-Learn sees what
                  actually worked and feeds it back — ten learning loops turn a day of operations
                  into a sharper next day.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="max-w-[58ch] font-sans text-body text-ink-2">
                  Over time this becomes a connected model of how the whole operation behaves — what
                  works, what doesn&rsquo;t, where things stall and why. In lending, say: which
                  sequence brings a late account back to good standing.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="max-w-[58ch] font-sans text-body text-ink-2">
                  It&rsquo;s disciplined, not magic. A pattern only joins the shared library once it
                  clears an effectiveness threshold — around 80%; what&rsquo;s shared is anonymised
                  and aggregated; any institution can opt out. The improvement comes from the
                  runtime, not more engineering.
                </p>
              </Reveal>
            </div>

            {/* static diagram — world-model field with the rising curve */}
            <Reveal delay={0.1}>
              <WorldModelField />
            </Reveal>
          </div>
        </Section>

        {/* ---- 5 · The rest of the runtime ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow tone="dim">The runtime, in full</Eyebrow>
            <h2 className="mt-4 max-w-[26ch] font-serif text-display-1 text-ink">
              Five quieter modules hold it together.
            </h2>
            <p className="mt-7 max-w-[60ch] font-sans text-body-lg text-ink-2">
              Nyāya and Learn get the attention; these make them possible. Kendra is seven modules
              in all — these five, plus the two powers above.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MODULES.map((m, i) => (
              <Reveal key={m.name} delay={(i % 3) * 0.07}>
                <div className="glass-quiet flex h-full flex-col p-6">
                  <div className="flex items-baseline gap-2.5">
                    <h3 className="font-serif text-[1.25rem] leading-none text-ink">{m.name}</h3>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
                      {m.role}
                    </span>
                  </div>
                  <p className="mt-3 flex-1 font-sans text-[13.5px] leading-relaxed text-ink-2">
                    {m.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- 6 · The ledger ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>One record</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">Three jobs, one record.</h2>
            <p className="mt-7 max-w-[64ch] font-sans text-body-lg text-ink-2">
              Krim-Ledger writes everything — every action, decision and validation — to an
              immutable, sealed trail. From that single source it does three jobs at once.
            </p>
          </Reveal>

          {/* signature device — one sealed record, three streams flowing out */}
          <Reveal delay={0.1}>
            <div className="mt-12 md:mt-16">
              <LedgerStreams jobs={LEDGER_JOBS} />
            </div>
          </Reveal>

          <div className="mt-12 grid items-end gap-10 lg:grid-cols-[1fr_0.92fr]">
            <Reveal>
              <GlassCard accent className="p-8 md:p-10">
                <p className="font-serif text-[clamp(1.4rem,2.4vw,1.9rem)] leading-tight text-ink">
                  Compliance, intelligence and cost — from one immutable record.
                </p>
              </GlassCard>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="max-w-[46ch] font-sans text-body text-ink-2">
                The elegance isn&rsquo;t three systems kept in sync. It&rsquo;s one trail, read three
                ways — proof, learning and meter from the same source of truth.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ---- 7 · Close ---- */}
        <Section hairline>
          <Reveal>
            <h2 className="max-w-[18ch] font-serif text-display-1 text-ink">
              This is the part that earns the trust.
            </h2>
            <p className="mt-6 max-w-[54ch] font-sans text-body-lg text-ink-2">
              See Kendra run an action end to end — validated, executed, recorded, learned from.
            </p>
            <p className="mt-7">
              <Link
                href="/architecture"
                className="group inline-flex items-baseline gap-2 font-sans text-body text-ink-2 transition-colors hover:text-mint"
              >
                <span className="underline-offset-4 group-hover:underline">See the architecture</span>
                <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </p>
          </Reveal>
        </Section>
      </LayerShell>
    </>
  )
}
