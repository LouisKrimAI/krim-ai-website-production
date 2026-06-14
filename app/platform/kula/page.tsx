/**
 * /platform/kula — the enterprise interface. From docs/copy/platform-kula.md.
 * Kula is how your people work with KrimOS in plain language; each user meets a
 * digital twin tuned to their role. Kula is the INTERFACE — never the mind. The
 * thinking happens in the Kendra runtime behind it; Kula never bypasses human
 * sign-off or policy checks.
 *
 * Server component (metadata + JSON-LD + static substance). The three signature
 * devices live in _client.tsx:
 *   · PlanAssembly — section 2: an intent becomes a governed plan in four beats,
 *                    Ask → Suggest → Act → Learn, with an explicit approval gate
 *                    before Act (cyan proposed → mint approved). Never skips the
 *                    human; never an un-skippable typewriter.
 *   · RoleTwin     — section 3: the same interface re-skinning per role, over one
 *                    shared source of truth.
 *   · KupaCockpit  — section 4: one calm cockpit surface — operational view,
 *                    human-in-the-loop review, live monitoring with kill switches,
 *                    audit workspace. Stamped "illustrative · simulated data".
 * Facts only; invent nothing.
 */

import type { Metadata } from 'next'
import LayerShell from '@/components/platform/LayerShell'
import ArchGlyph from '@/components/platform/ArchGlyph'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard } from '@/components/ui'
import { PlanAssembly, RoleTwin, KupaCockpit } from './_client'

export const metadata: Metadata = {
  title: 'Kula — talk to your operation',
  description:
    'Kula is how your teams work with KrimOS in plain language — each user meets a digital twin tuned to their role, while the thinking happens in the runtime behind it. It never bypasses human sign-off.',
  alternates: { canonical: 'https://krim.ai/platform/kula' },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://krim.ai' },
    { '@type': 'ListItem', position: 2, name: 'Platform', item: 'https://krim.ai/platform' },
    { '@type': 'ListItem', position: 3, name: 'Kula', item: 'https://krim.ai/platform/kula' },
  ],
}

export default function KulaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <LayerShell slug="kula">
        {/* ---- 1 · Hero ---- */}
        <Section className="!pt-12 md:!pt-16">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Reveal>
                <Eyebrow>Kula — for your teams</Eyebrow>
                <h1 className="mt-5 font-serif text-display-hero text-ink">
                  Talk to your
                  <br />
                  operation.
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-7 max-w-[55ch] font-sans text-body-lg text-ink-2">
                  Kula is how your people work with <span className="text-ink">KrimOS</span> — in
                  plain language. Each user meets a digital twin tuned to their role; the thinking
                  happens in the <span className="text-ink">runtime</span> behind it.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <GlassCard className="p-7 md:p-9">
                <ArchGlyph active="kula" />
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
                  The interface · the mind is Kendra, behind it.
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {/* ---- 2 · Intent becomes a governed plan ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow tone="cyan">How it works</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">Ask. Suggest. Act. Learn.</h2>
            <p className="mt-7 max-w-[64ch] font-sans text-body-lg text-ink-2">
              Describe what you want — &ldquo;bring down missed payments next quarter.&rdquo; Kula
              proposes a plan: segments, steps, co-workers, guardrails.{' '}
              <span className="text-ink">Nothing has happened yet.</span> You review it; on approval
              it runs, every action validated. What it learns sharpens the next plan.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-12">
              <PlanAssembly />
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-8 max-w-[62ch] font-sans text-[15px] leading-relaxed text-ink-3">
              It never skips the human. Act is locked until you approve — and the runtime validates
              each action against policy before it fires. Kula is the way in; the governance lives
              behind it.
            </p>
          </Reveal>
        </Section>

        {/* ---- 3 · A twin for every role ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Tailored</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">
              One operation, seen from your seat.
            </h2>
            <p className="mt-7 max-w-[62ch] font-sans text-body-lg text-ink-2">
              A risk lead, a collections head and a service manager each meet a different Kula — the
              same source of truth, shaped to their job. Switch the seat below; the labels and the
              view re-skin, the data underneath stays one and the same.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-12">
              <RoleTwin />
            </div>
          </Reveal>
        </Section>

        {/* ---- 4 · The command centre ---- */}
        <Section hairline>
          <Reveal>
            <Eyebrow>Kupa</Eyebrow>
            <h2 className="mt-4 font-serif text-display-1 text-ink">Where humans stay in control.</h2>
            <p className="mt-7 max-w-[62ch] font-sans text-body-lg text-ink-2">
              Kula lives in <span className="text-ink">Kupa</span> — the cockpit where teams watch
              the operation, approve the high-stakes calls, and pause anything with a click. One
              surface: live queues, the review queue, the kill switches, the audit trail.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-12">
              <KupaCockpit />
            </div>
          </Reveal>
        </Section>

        {/* ---- 5 · Close ---- */}
        <Section hairline>
          <Reveal>
            <div className="mx-auto max-w-[760px] text-center">
              <h2 className="font-serif text-[clamp(1.7rem,3.2vw,2.5rem)] leading-tight text-ink">
                Your teams&rsquo; way in.
              </h2>
              <p className="mx-auto mt-5 max-w-[52ch] font-sans text-body text-ink-2">
                Plain language in, a governed plan out — with your people watching, approving, and
                in control. Next, the face your customers meet.
              </p>
            </div>
          </Reveal>
        </Section>
      </LayerShell>
    </>
  )
}
