'use client'

/**
 * OperationalMap — homepage §7 "Impact for your business".
 *
 * The only place on the homepage the whole operational map appears, so it has to
 * read in one glance: WHICH segments of lending KrimOS covers, in lifecycle order.
 *
 * Structure encodes the real model (not six peer cards):
 *   • a 4-stage CUSTOMER JOURNEY spine — Origination → Servicing → Collections →
 *     Hardship & retention — on a cyan→mint rail with numbered nodes (the journey
 *     warms cyan→mint as it validates), and
 *   • a recessed OVERSIGHT substrate beneath it — Credit & risk support +
 *     Compliance & audit run UNDER every stage. The substrate placement does the
 *     claim-floor work for free: oversight watches the flow, it never steps in it
 *     (KrimOS does not make the credit decision — monitoring/evidence only).
 *   • the business-level payoff band closes it.
 *
 * Distinct from TrustPillars (tabs) and the flat glass grids elsewhere. On-system:
 * reuses the chip vocabulary, glass utilities, and the cyan→mint ignition motif.
 * Facts: docs/krim-content.md. Colours are token values (design-tokens.md).
 */

import { motion } from 'framer-motion'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard } from '@/components/ui'

const EASE = [0.16, 1, 0.3, 1] as const

// The four customer-journey stages, in order. `rgb` warms cyan → mint along the journey.
const LIFECYCLE = [
  { n: '01', rgb: '57,214,255', area: 'Origination', uses: ['Intake', 'KYC', 'Documents', 'Triage'], outcome: 'Applications at digital speed.' },
  { n: '02', rgb: '38,227,229', area: 'Servicing', uses: ['Payments', 'Statements', 'Queries', 'Multilingual'], outcome: 'Every customer, in the language they speak.' },
  { n: '03', rgb: '19,240,204', area: 'Collections', uses: ['Right-party contact', 'Payment plans', 'Early & late DPD'], outcome: 'Every contact, validated.' },
  { n: '04', rgb: '0,255,178', area: 'Hardship & retention', uses: ['Restructuring', 'Hardship', 'Cross-sell', 'Retention'], outcome: 'Retain, inside the rules.' },
] as const

// Cross-cutting oversight — runs UNDER every stage. Monitoring and evidence only.
const OVERSIGHT = [
  { area: 'Credit & risk support', uses: ['Model-risk evidence', 'Fair-lending monitoring', 'Decision trail'], outcome: 'Every action you take, on the record.' },
  { area: 'Compliance & audit', uses: ['Audit trail', 'Exam prep', 'Reporting'], outcome: 'Every platform action, reconstructed in minutes.' },
] as const

// The business-level payoff — what it all adds up to.
const INSTITUTION = [
  { impact: 'Scale without the headcount.', tag: 'Origination to collections, automated.' },
  { impact: 'Audit evidence in minutes.', tag: 'Assembled on demand.' },
  { impact: 'Intelligence that compounds.', tag: 'Better with every outcome.' },
] as const

const GOLD = '200,161,74' // amber/gold token #C8A14A — oversight/governance accent

export default function OperationalMap() {
  return (
    <Section hairline id="who">
      <Reveal>
        <Eyebrow>Impact for your business</Eyebrow>
        <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
          Every operation, from application to audit.
        </h2>
        <p className="mt-5 max-w-[56ch] font-sans text-body-lg text-ink-2">
          The customer&rsquo;s whole journey on <span className="text-mint">one runtime</span>, with
          risk and compliance under every step.
        </p>
      </Reveal>

      {/* ---- the customer-journey spine ---- */}
      <div className="relative mt-14">
        {/* journey rail (desktop) — a cyan→mint line threading four glowing nodes */}
        <div aria-hidden className="relative mb-7 hidden h-3 lg:block">
          <motion.div
            className="absolute left-[12.5%] right-[12.5%] top-1/2 h-px -translate-y-1/2 origin-left"
            style={{ background: 'linear-gradient(90deg, rgba(57,214,255,0.7) 0%, rgba(0,255,178,0.7) 100%)' }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, ease: EASE }}
          />
          <div className="absolute inset-0 grid grid-cols-4">
            {LIFECYCLE.map((s) => (
              <div key={s.n} className="flex items-center justify-center">
                <span
                  className="block h-2.5 w-2.5 rounded-full"
                  style={{ background: `rgb(${s.rgb})`, boxShadow: `0 0 10px rgba(${s.rgb},0.8)` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* stage cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LIFECYCLE.map((s, i) => (
            <Reveal key={s.area} delay={i * 0.1}>
              <div className="glass-quiet lume relative flex h-full flex-col rounded-xl p-6 md:p-7">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[12px] tracking-[0.18em]" style={{ color: `rgb(${s.rgb})` }}>
                    {s.n}
                  </span>
                  <span className="h-[3px] flex-1 rounded-full" style={{ background: `rgba(${s.rgb},0.4)` }} />
                </div>
                <h3 className="mt-5 font-serif text-[clamp(1.35rem,1.7vw,1.6rem)] leading-tight text-ink">
                  {s.area}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.uses.map((u) => (
                    <span
                      key={u}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3"
                    >
                      {u}
                    </span>
                  ))}
                </div>
                <p className="mt-auto pt-6 font-serif text-[1.1rem] leading-snug text-mint">{s.outcome}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ---- oversight substrate — runs under every stage ---- */}
      <Reveal delay={0.15}>
        <div className="mt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
            Across every stage — monitoring and evidence, not credit decisions
          </p>
          <div className="mt-3 space-y-3">
            {OVERSIGHT.map((o) => (
              <div
                key={o.area}
                className="relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.015] px-6 py-5 backdrop-blur-[10px]"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px"
                  style={{ background: `linear-gradient(90deg, rgba(${GOLD},0.35) 0%, rgba(${GOLD},0.08) 45%, transparent 100%)` }}
                />
                <div className="grid items-center gap-4 lg:grid-cols-[minmax(190px,auto)_1fr_auto] lg:gap-6">
                  <div>
                    <h3 className="font-serif text-[1.15rem] leading-tight text-ink">{o.area}</h3>
                    <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: `rgba(${GOLD},0.78)` }}>
                      Watches every stage
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {o.uses.map((u) => (
                      <span
                        key={u}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3"
                      >
                        {u}
                      </span>
                    ))}
                  </div>
                  <p className="font-serif text-[1.05rem] leading-snug text-ink-2 lg:text-right">{o.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ---- business-level payoff ---- */}
      <Reveal delay={0.1}>
        <GlassCard className="mt-8 p-8 md:p-10">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
            And what it all adds up to
          </p>
          <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-0">
            {INSTITUTION.map(({ impact, tag }, i) => (
              <div key={impact} className={`text-center md:px-8 ${i > 0 ? 'md:border-l md:border-white/[0.08]' : ''}`}>
                <h3 className="font-serif text-[clamp(1.4rem,2.3vw,1.85rem)] leading-[1.12]">
                  <span className="text-grad">{impact}</span>
                </h3>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">{tag}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </Reveal>
    </Section>
  )
}
