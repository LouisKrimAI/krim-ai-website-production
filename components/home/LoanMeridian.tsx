'use client'

/**
 * LoanMeridian — homepage §8 "Impact for your business".
 *
 * The lending operation as one luminous horizon. Up front: just the journey —
 * a cyan→mint line of the loan life (acquisition → closure) with eight glowing
 * waypoints, each hinting its coverage. SELECT a waypoint and a HUD console
 * boots up below: the stage identity, a one-line payoff, and — the hero — a
 * grouped grid of the operations KrimOS runs there, cascading online.
 *
 * Hierarchy is deliberately inverted from prose-first to operations-first: the
 * impact is a caption, the operations grid is the body. Copy stays trimmed
 * (items + small group labels); the deepest version lives on /krimos.
 *
 * Beneath: the gold OVERSIGHT layer (risk & compliance watch every step, never
 * decide credit) and the payoff. Underwriting is gold — the boundary where the
 * decision stays with the institution. No pills. Colours are token values.
 * Facts: docs/krim-content.md. Interaction grammar mirrors TrustPillars.
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow, GlassCard } from '@/components/ui'

const EASE = [0.16, 1, 0.3, 1] as const
const LINE = 'linear-gradient(90deg, rgba(57,214,255,0.75) 0%, rgba(0,255,178,0.75) 100%)'
const VLINE = 'linear-gradient(180deg, rgba(57,214,255,0.75) 0%, rgba(0,255,178,0.75) 100%)'
const GOLD = '200,161,74' // amber/gold token — oversight / boundary

type Group = { label: string; items: readonly string[] }
type Stage = {
  n: string; area: string; rgb: string; role: string
  impact: string; hint: readonly string[]; groups: readonly Group[]; boundary?: boolean
}

// The eight customer-facing stages, in lifecycle order. `rgb` samples the cyan→mint
// horizon; underwriting is gold (boundary). `groups` = the operations, organised.
const STAGES: Stage[] = [
  {
    n: '01', area: 'Acquisition', rgb: '57,214,255', role: 'Growth & contact centre', impact: 'Every enquiry answered.', hint: ['Enquiry', 'Eligibility'],
    groups: [
      { label: 'Reach', items: ['Enquiry handling', 'Eligibility pre-check', 'Multilingual outreach'] },
      { label: 'Convert', items: ['Application invite', 'Abandoned re-engagement', 'Channel routing'] },
    ],
  },
  {
    n: '02', area: 'Origination', rgb: '49,220,244', role: 'Credit operations', impact: 'Onboarded at digital speed.', hint: ['KYC', 'Bureau'],
    groups: [
      { label: 'Intake & identity', items: ['Application capture', 'KYC / KYB', 'Sanctions screening'] },
      { label: 'Documents & data', items: ['Document capture', 'OCR & extraction', 'Bureau pulls'] },
      { label: 'Routing', items: ['Triage & prioritise', 'Stalled-file chase', 'Hand-off to underwriting'] },
    ],
  },
  {
    n: '03', area: 'Underwriting support', rgb: GOLD, role: 'Underwriting', impact: 'Only the judgment cases.', hint: ['Policy checks', 'Evidence'], boundary: true,
    groups: [
      { label: 'Prepare', items: ['File assembly', 'Affordability evidence', 'Income & employment checks'] },
      { label: 'Check', items: ['Policy & eligibility checks', 'Adverse-action reasons', 'Exception flags'] },
    ],
  },
  {
    n: '04', area: 'Disbursal', rgb: '33,232,222', role: 'Loan operations', impact: 'Funds, fully checked.', hint: ['E-sign', 'Funding'],
    groups: [
      { label: 'Contract', items: ['Agreement generation', 'E-sign', 'Compliance pre-checks'] },
      { label: 'Fund', items: ['Disbursal', 'Autopay enrolment', 'Welcome & first payment'] },
    ],
  },
  {
    n: '05', area: 'Servicing', rgb: '24,237,211', role: 'Servicing & support', impact: 'In the language they speak.', hint: ['Payments', 'Self-serve'],
    groups: [
      { label: 'Money', items: ['Payments & autopay', 'Statements', 'Reconciliation'] },
      { label: 'Care', items: ['Queries & changes', 'Self-serve resolution', 'Multilingual support'] },
      { label: 'Lifecycle', items: ['Renewals & top-ups', 'Account maintenance', 'Human hand-off'] },
    ],
  },
  {
    n: '06', area: 'Collections', rgb: '16,243,200', role: 'Collections & cure', impact: 'Every contact, validated.', hint: ['Right-party', 'Plans'],
    groups: [
      { label: 'Contact', items: ['Right-party contact', 'Consent & hours checks', 'Frequency caps'] },
      { label: 'Cure', items: ['Payment plans', 'Promise-to-pay', 'Settlement'] },
      { label: 'Stages', items: ['DPD 1–30', 'DPD 31+', 'Early-warning'] },
    ],
  },
  {
    n: '07', area: 'Hardship', rgb: '8,249,189', role: 'Care & complaints', impact: 'Handled inside the rules.', hint: ['Restructuring', 'Disputes'],
    groups: [
      { label: 'Support', items: ['Hardship signposting', 'Restructuring', 'Forbearance'] },
      { label: 'Resolve', items: ['Disputes & complaints', 'Vulnerable routing', 'Case handover'] },
    ],
  },
  {
    n: '08', area: 'Closure', rgb: '0,255,178', role: 'Retention', impact: 'A clean close, next product.', hint: ['Payoff', 'Win-back'],
    groups: [
      { label: 'Close', items: ['Payoff & settlement', 'NOC / lien release', 'Account closure'] },
      { label: 'Grow', items: ['Win-back', 'Cross-sell', 'Next-product offer'] },
    ],
  },
]

const BACKOFFICE = [
  { name: 'Risk & portfolio', note: 'early-warning, strategy testing' },
  { name: 'Compliance & audit', note: 'evidence by construction' },
  { name: 'Fraud & financial crime', note: 'anomalies surfaced' },
  { name: 'Ops command (Kupa)', note: 'see, set, step in, prove' },
  { name: 'Reporting & MI', note: 'one source of truth' },
] as const

const INSTITUTION = [
  { impact: 'Scale without the headcount.', tag: 'Acquisition to closure, automated.' },
  { impact: 'Audit evidence in minutes.', tag: 'Assembled on demand.' },
  { impact: 'Intelligence that compounds.', tag: 'Better with every outcome.' },
] as const

const opsCount = (s: Stage) => s.groups.reduce((n, g) => n + g.items.length, 0)

export default function LoanMeridian() {
  const [active, setActive] = useState(1)
  const s = STAGES[active]

  return (
    <Section hairline id="who">
      <Reveal>
        <Eyebrow>Impact for your business</Eyebrow>
        <h2 className="mt-4 max-w-[24ch] font-serif text-display-1 text-ink">
          Every operation, from application to audit.
        </h2>
        <p className="mt-5 max-w-[58ch] font-sans text-body-lg text-ink-2">
          The customer’s whole journey on <span className="text-mint">one runtime</span>, with risk
          and compliance under every step.
        </p>
      </Reveal>

      {/* ===== DESKTOP — the horizon, select a waypoint ===== */}
      <Reveal delay={0.12}>
        <div className="mt-16 hidden lg:block">
          <div className="relative">
            <div aria-hidden className="absolute left-[6.25%] right-[6.25%] top-[7px] h-px" style={{ background: LINE }} />
            <div aria-hidden className="absolute left-[6.25%] right-[6.25%] top-[7px] h-[3px] -translate-y-px blur-[5px] opacity-60" style={{ background: LINE }} />
            <div className="relative grid grid-cols-8">
              {STAGES.map((st, i) => {
                const on = i === active
                return (
                  <button
                    key={st.n}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className="group flex flex-col items-center px-1 text-center outline-none"
                  >
                    <span
                      aria-hidden
                      className="block rounded-full ring-4 ring-bg transition-all duration-300"
                      style={{
                        width: on ? '15px' : '9px',
                        height: on ? '15px' : '9px',
                        background: `rgb(${st.rgb})`,
                        boxShadow: on ? `0 0 16px rgba(${st.rgb},0.95)` : `0 0 6px rgba(${st.rgb},0.45)`,
                      }}
                    />
                    <span
                      className={`mt-5 font-serif leading-tight transition-all duration-300 ${on ? 'text-ink' : 'text-ink-3 group-hover:text-ink-2'}`}
                      style={{ fontSize: on ? '1.14rem' : '1rem' }}
                    >
                      {st.area}
                    </span>
                    <span className={`mt-1.5 font-mono text-[9.5px] uppercase tracking-[0.1em] transition-colors duration-300 ${on ? 'text-ink-2' : 'text-ink-3/70'}`}>
                      {st.hint.join(' · ')}
                    </span>
                    {on && (
                      <span aria-hidden className="mt-2.5 h-2 w-2 rotate-45 border-b border-r" style={{ borderColor: `rgba(${st.rgb},0.55)` }} />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </Reveal>

      {/* ===== MOBILE / TABLET — vertical selector ===== */}
      <div className="relative mt-12 lg:hidden">
        <div aria-hidden className="absolute bottom-4 left-[5px] top-4 w-px" style={{ background: VLINE }} />
        <div className="flex flex-col">
          {STAGES.map((st, i) => {
            const on = i === active
            return (
              <button
                key={st.n}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={on}
                className="relative flex flex-col items-start gap-0.5 py-2.5 pl-8 text-left outline-none"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-[14px] block -translate-y-1/2 rounded-full ring-4 ring-bg transition-all"
                  style={{ width: on ? '13px' : '8px', height: on ? '13px' : '8px', background: `rgb(${st.rgb})`, boxShadow: on ? `0 0 12px rgba(${st.rgb},0.9)` : 'none' }}
                />
                <span className={`font-serif transition-colors ${on ? 'text-ink' : 'text-ink-3'}`} style={{ fontSize: on ? '1.18rem' : '1.05rem' }}>
                  {st.area}
                </span>
                <span className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink-3/70">{st.hint.join(' · ')}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ===== the console — operations are the hero ===== */}
      <Reveal delay={0.16}>
        <div
          className="relative mt-9 overflow-hidden rounded-[22px] p-px"
          style={{
            background: `linear-gradient(145deg, rgba(${s.rgb},0.55) 0%, rgba(${s.rgb},0.14) 45%, rgba(255,255,255,0.06) 100%)`,
            transition: 'background 0.5s ease',
          }}
        >
          <div
            className="relative overflow-hidden rounded-[21px]"
            style={{
              background: `radial-gradient(ellipse at 15% 0%, rgba(${s.rgb},0.13) 0%, transparent 55%), rgba(10,11,15,0.92)`,
              backdropFilter: 'blur(22px)',
              WebkitBackdropFilter: 'blur(22px)',
              transition: 'background 0.5s ease',
            }}
          >
            {/* HUD corner brackets */}
            <span aria-hidden className="pointer-events-none absolute left-4 top-4 h-4 w-4 border-l border-t" style={{ borderColor: `rgba(${s.rgb},0.4)` }} />
            <span aria-hidden className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 border-b border-r" style={{ borderColor: `rgba(${s.rgb},0.4)` }} />

            <AnimatePresence mode="wait">
              <motion.div key={s.area} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.38, ease: EASE }} className="p-8 md:p-10 lg:p-12">
                {/* identity + one-line payoff (demoted) */}
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: `rgba(${s.rgb},0.9)` }}>
                    {s.n} · {s.area}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">{s.role}</p>
                </div>
                <p className="mt-3 font-serif text-[clamp(1.35rem,2vw,1.7rem)] leading-tight text-ink">
                  {s.impact}
                </p>
                {s.boundary && (
                  <p className="mt-4 inline-flex w-fit items-center rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: `rgba(${GOLD},0.9)`, border: `1px solid rgba(${GOLD},0.3)`, background: `rgba(${GOLD},0.06)` }}>
                    The credit decision stays with you
                  </p>
                )}

                {/* OPERATIONS COVERED — the hero grid */}
                <div className="mt-9 flex items-center gap-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-2">Operations covered</p>
                  <span aria-hidden className="h-px flex-1" style={{ background: `linear-gradient(90deg, rgba(${s.rgb},0.3), transparent)` }} />
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">{opsCount(s)} operations</p>
                </div>
                <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                  {s.groups.map((g) => (
                    <div key={g.label}>
                      <span aria-hidden className="block h-[3px] w-8 rounded-full" style={{ background: `rgba(${s.rgb},0.65)` }} />
                      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">{g.label}</p>
                      <ul className="mt-3.5 space-y-2.5">
                        {g.items.map((it) => (
                          <li key={it} className="flex items-center gap-3">
                            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: `rgb(${s.rgb})` }} />
                            <span className="font-sans text-[15px] leading-snug text-ink">{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>

      {/* ===== Act 2 — the oversight layer: visible, confident, gold-keyed ===== */}
      <Reveal delay={0.2}>
        <div
          className="relative mt-12 overflow-hidden rounded-[20px] border border-white/[0.07] p-8 md:p-10"
          style={{
            background: `radial-gradient(ellipse 85% 130% at 50% 0%, rgba(${GOLD},0.085) 0%, transparent 62%), rgba(10,11,15,0.55)`,
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          <span aria-hidden className="absolute inset-x-0 top-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent 0%, rgba(${GOLD},0.65) 50%, transparent 100%)` }} />
          <div className="md:flex md:items-end md:justify-between md:gap-12">
            <div className="max-w-[26ch]">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: `rgba(${GOLD},0.92)` }}>
                The oversight layer
              </p>
              <h3 className="mt-3 font-serif text-[clamp(1.6rem,2.6vw,2.15rem)] leading-[1.12] text-ink">
                Risk and compliance, watching every step.
              </h3>
            </div>
            <p className="mt-5 max-w-[44ch] font-sans text-body-lg leading-relaxed text-ink-2 md:mt-0">
              Everything above runs on the record, monitored and evidenced, owned by your risk and
              compliance teams. KrimOS proves what happened.{' '}
              <span style={{ color: `rgba(${GOLD},0.95)` }}>It never makes the credit decision.</span>
            </p>
          </div>
          <div className="mt-9 grid gap-x-8 gap-y-7 border-t border-white/[0.07] pt-8 sm:grid-cols-2 lg:grid-cols-5">
            {BACKOFFICE.map((b) => (
              <div key={b.name}>
                <span aria-hidden className="block h-[3px] w-7 rounded-full" style={{ background: `rgba(${GOLD},0.6)` }} />
                <p className="mt-3.5 font-serif text-[1.12rem] leading-tight text-ink">{b.name}</p>
                <p className="mt-1.5 font-sans text-[13px] leading-relaxed text-ink-3">{b.note}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ===== the business-level payoff ===== */}
      <Reveal delay={0.24}>
        <GlassCard className="mt-10 p-8 md:p-10">
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
