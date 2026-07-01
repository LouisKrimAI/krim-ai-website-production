'use client'

/**
 * LoanMeridian — homepage §8 "The lending lifecycle".
 *
 * One continuous current. The cyan→mint line is the loan's life — it enters
 * cyan (in-flow) and resolves toward mint (validated) as KrimOS clears each
 * stage. Gold is the one point the light is held back: underwriting, where the
 * decision stays with the institution; and the oversight layer beneath, which
 * watches every step and never decides.
 *
 * The horizon is HOVER-ACTIVATED: hovering a waypoint pre-highlights it instantly
 * and commits ~90ms later, so a fast cursor sweep settles on the stage you rest on
 * rather than strobing through all eight (click + keyboard bypass the debounce).
 * Selecting a stage glides a CSS traveller, fires a one-shot validation pulse, and
 * cross-fades the CONSOLE — a glass "runtime surface" where the stage's operations
 * render as a uniform matrix of responsive glass cells (groups flattened to a tag,
 * so the panel never reflows). SSR-safe: framer only for opacity/stagger with an
 * explicit initial; all position glides are CSS. Colours are token values.
 * Facts: krim-content.md.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import Reveal from '@/components/Reveal'
import { Section, Eyebrow } from '@/components/ui'

const EASE_CSS = 'cubic-bezier(0.16,1,0.3,1)'
const GOLD = '200,161,74' // amber/gold token — oversight / boundary
const MINT = '0,255,178'
const HOVER_DEBOUNCE = 90 // ms — commit the stage the cursor settles on, skip a fast sweep

// The current: cyan (in-flow) warming to mint (validated) across the lifecycle.
const CURRENT = 'linear-gradient(90deg, rgba(57,214,255,0.9) 0%, rgba(0,255,178,0.95) 100%)'

type Group = { label: string; items: readonly string[] }
type Stage = {
  n: string; area: string; rgb: string; role: string
  impact: string; hint: string; groups: readonly Group[]; boundary?: boolean
}

// Eight stages, lifecycle order. `rgb` samples the cyan→mint current; underwriting
// is gold (boundary). Every group carries exactly three items — so the console
// never reflows when you switch stages.
const STAGES: Stage[] = [
  { n: '01', area: 'Acquisition', rgb: '57,214,255', role: 'Growth & contact centre', impact: 'Every enquiry answered, in their language.', hint: 'Enquiry · Eligibility',
    groups: [
      { label: 'Reach', items: ['Enquiry handling', 'Eligibility pre-check', 'Multilingual outreach'] },
      { label: 'Convert', items: ['Application invite', 'Abandoned re-engagement', 'Channel routing'] },
    ] },
  { n: '02', area: 'Origination', rgb: '49,220,244', role: 'Credit operations', impact: 'Onboarded at digital speed.', hint: 'KYC · Bureau',
    groups: [
      { label: 'Intake & identity', items: ['Application capture', 'KYC / KYB', 'Sanctions screening'] },
      { label: 'Documents & data', items: ['Document capture', 'OCR & extraction', 'Bureau pulls'] },
      { label: 'Routing', items: ['Triage & prioritise', 'Stalled-file chase', 'Hand-off to underwriting'] },
    ] },
  { n: '03', area: 'Underwriting support', rgb: '41,226,233', role: 'Credit risk', impact: 'Underwriters see only the judgment cases.', hint: 'Policy · Evidence',
    groups: [
      { label: 'Prepare', items: ['File assembly', 'Affordability evidence', 'Income & employment'] },
      { label: 'Check', items: ['Policy & eligibility', 'Adverse-action notices', 'Exception flags'] },
    ] },
  { n: '04', area: 'Disbursal', rgb: '33,232,222', role: 'Loan operations', impact: 'Agreement to funds, fully checked.', hint: 'E-sign · Funding',
    groups: [
      { label: 'Contract', items: ['Agreement generation', 'E-sign', 'Compliance pre-checks'] },
      { label: 'Fund', items: ['Disbursal', 'Autopay enrolment', 'Welcome & first payment'] },
    ] },
  { n: '05', area: 'Servicing', rgb: '24,237,211', role: 'Servicing & support', impact: 'Every customer, in the language they speak.', hint: 'Payments · Self-serve',
    groups: [
      { label: 'Money', items: ['Payments & autopay', 'Statements', 'Reconciliation'] },
      { label: 'Care', items: ['Queries & changes', 'Self-serve resolution', 'Multilingual support'] },
      { label: 'Lifecycle', items: ['Renewals & top-ups', 'Account maintenance', 'Human hand-off'] },
    ] },
  { n: '06', area: 'Collections', rgb: '16,243,200', role: 'Collections & cure', impact: 'Every contact, validated before it fires.', hint: 'Right-party · Plans',
    groups: [
      { label: 'Contact', items: ['Right-party contact', 'Consent & hours checks', 'Frequency caps'] },
      { label: 'Cure', items: ['Payment plans', 'Promise-to-pay', 'Settlement'] },
      { label: 'Stages', items: ['DPD 1–30', 'DPD 31+', 'Early-warning'] },
    ] },
  { n: '07', area: 'Hardship', rgb: '8,249,189', role: 'Care & complaints', impact: 'Handled with care, inside the rules.', hint: 'Restructure · Disputes',
    groups: [
      { label: 'Support', items: ['Hardship signposting', 'Restructuring', 'Forbearance'] },
      { label: 'Resolve', items: ['Disputes & complaints', 'Vulnerable routing', 'Case handover'] },
    ] },
  { n: '08', area: 'Closure', rgb: MINT, role: 'Retention', impact: 'A clean close, and the next conversation.', hint: 'Payoff · Win-back',
    groups: [
      { label: 'Close', items: ['Payoff & settlement', 'NOC / lien release', 'Account closure'] },
      { label: 'Grow', items: ['Win-back', 'Cross-sell', 'Next-product offer'] },
    ] },
]

// The oversight layer — the operational areas KrimOS covers, shown equally.
const OVERSIGHT = [
  { name: 'Risk & portfolio', note: 'early-warning, strategy testing' },
  { name: 'Compliance & audit', note: 'evidence by construction' },
  { name: 'Fraud & crime', note: 'anomalies surfaced' },
  { name: 'Kupa command', note: 'see, set, step in, prove' },
  { name: 'Reporting & MI', note: 'one source of truth' },
] as const

const INSTITUTION = [
  { impact: 'Scale without the headcount.', hi: 'Scale', tag: 'Acquisition to closure.' },
  { impact: 'Audit evidence in minutes.', hi: 'minutes', tag: 'Assembled on demand.' },
  { impact: 'Sharper with every loan.', hi: 'Sharper', tag: 'Kovida learns.' },
] as const

// A small node sitting on the current — repeated at each band's eyebrow.
function Node({ rgb }: { rgb: string }) {
  return (
    <span aria-hidden className="relative block h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: `rgb(${rgb})`, boxShadow: `0 0 10px rgba(${rgb},0.7)` }} />
  )
}

export default function LoanMeridian() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(1)
  const [hovered, setHovered] = useState<number | null>(null)
  const pending = useRef<number | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([])
  const s = STAGES[active]

  // commit a stage now (click / keyboard) — clears any pending hover commit
  const commit = useCallback((i: number) => {
    if (timer.current) { clearTimeout(timer.current); timer.current = null }
    pending.current = null
    setActive(i)
  }, [])

  // hover: pre-highlight instantly, commit the LATEST hovered stage after a beat
  const queueHover = useCallback((i: number) => {
    setHovered(i)
    if (i === active) {
      if (timer.current) { clearTimeout(timer.current); timer.current = null }
      return
    }
    pending.current = i
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      if (pending.current !== null) setActive(pending.current)
      timer.current = null
    }, reduce ? 0 : HOVER_DEBOUNCE)
  }, [active, reduce])

  const clearHover = useCallback(() => {
    setHovered(null)
    if (timer.current) { clearTimeout(timer.current); timer.current = null }
    pending.current = null
  }, [])

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  const onKey = (e: React.KeyboardEvent) => {
    const last = STAGES.length - 1
    let n = active
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = Math.min(active + 1, last)
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = Math.max(active - 1, 0)
    else if (e.key === 'Home') n = 0
    else if (e.key === 'End') n = last
    else return
    e.preventDefault()
    commit(n)
    btnRefs.current[n]?.focus()
  }

  return (
    <Section hairline id="who">
      <Reveal>
        <Eyebrow>The lending lifecycle</Eyebrow>
        <h2 className="mt-4 max-w-[26ch] font-serif text-display-1 text-ink">
          One runtime, from first enquiry to final payoff.
        </h2>
        <p className="mt-5 max-w-[56ch] font-sans text-body-lg text-ink-2">
          AI co-workers run the whole loan as <span className="text-mint">one current</span>, every
          action validated before it fires, with risk and compliance under every step.
        </p>
      </Reveal>

      {/* ===== the horizon — hover or select a stage ===== */}
      <Reveal delay={0.12}>
        <div
          className="mt-16 hidden lg:block"
          role="tablist"
          aria-label="Lending lifecycle stages"
          onKeyDown={onKey}
          onMouseLeave={clearHover}
        >
          <div className="relative">
            {/* the current — channelled: bed (always legible) · bloom · core (gold dip at underwriting) · flow */}
            <div aria-hidden className="absolute left-[6.25%] right-[6.25%] top-[7px] h-px -translate-y-px opacity-[0.18]" style={{ background: 'linear-gradient(90deg, rgba(57,214,255,0.5), rgba(0,255,178,0.5))' }} />
            <div aria-hidden className="absolute left-[6.25%] right-[6.25%] top-[7px] h-[2px] -translate-y-px opacity-40 blur-[6px]" style={{ background: CURRENT }} />
            <div aria-hidden className="absolute left-[6.25%] right-[6.25%] top-[7px] h-px -translate-y-px opacity-90" style={{ background: CURRENT }} />
            {!reduce && (
              <div aria-hidden className="meridian-flow absolute left-[6.25%] top-[6px] h-px w-[22%] opacity-70" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)', mixBlendMode: 'screen' }} />
            )}
            {/* the traveller — a comet of light that runs to the active node (CSS, SSR-safe) */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-[7px] h-[3px] w-[12.5%] -translate-x-1/2 -translate-y-px"
              style={{
                left: `calc(6.25% + ${active * 12.5}%)`,
                background: `radial-gradient(closest-side, rgba(${s.rgb},0.95), rgba(${s.rgb},0) 60%)`,
                filter: 'blur(1px)',
                mixBlendMode: 'screen',
                transition: reduce ? 'none' : `left 0.55s ${EASE_CSS}, background 0.55s ease`,
              }}
            />
            <div className="relative grid grid-cols-8 gap-x-3 pt-[2px]">
              {STAGES.map((st, i) => {
                const on = i === active
                const pre = i === hovered && i !== active
                return (
                  <button
                    key={st.n}
                    ref={(el) => { btnRefs.current[i] = el }}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-label={st.area}
                    tabIndex={on ? 0 : -1}
                    onClick={() => commit(i)}
                    onMouseEnter={() => queueHover(i)}
                    onFocus={() => queueHover(i)}
                    className="group relative flex min-h-[44px] flex-col items-center px-2 py-1 text-center outline-none focus-visible:!outline-none"
                  >
                    {/* fixed dot row — the node sits on the rail (the keel) */}
                    <span className="relative grid h-[14px] w-full place-items-center">
                      {/* seat ring — every node sits in a faint setting */}
                      <span aria-hidden className="absolute h-[14px] w-[14px] rounded-full transition-all duration-200" style={{ border: `1px solid rgba(${st.rgb},${on ? 0.5 : pre ? 0.35 : 0.18})` }} />
                      {/* active aura — wide soft bloom (opacity only) */}
                      <span aria-hidden className="absolute h-[28px] w-[28px] rounded-full blur-[6px] transition-opacity duration-300" style={{ background: `radial-gradient(closest-side, rgba(${st.rgb},0.5), rgba(${st.rgb},0) 70%)`, opacity: on ? 1 : 0 }} />
                      {/* active halo + inner ring — a double setting */}
                      <span aria-hidden className="absolute h-[22px] w-[22px] rounded-full transition-opacity duration-300" style={{ border: `1px solid rgba(${st.rgb},0.55)`, boxShadow: `0 0 18px 1px rgba(${st.rgb},0.5)`, opacity: on ? 1 : 0 }} />
                      <span aria-hidden className="absolute h-[15px] w-[15px] rounded-full transition-opacity delay-75 duration-300" style={{ border: `1px solid rgba(${st.rgb},0.35)`, opacity: on ? 1 : 0 }} />
                      {/* one-shot validation pulse, fired on each commit (CSS) */}
                      {on && !reduce && (
                        <span key={`pulse-${active}`} aria-hidden className="absolute h-[14px] w-[14px] rounded-full" style={{ border: `1px solid rgba(${st.rgb},0.6)`, animation: 'pulseRing 0.62s cubic-bezier(0.16,1,0.3,1) both' }} />
                      )}
                      {/* keyboard focus ring (replaces the global mint outline) */}
                      <span aria-hidden className="absolute h-[21px] w-[21px] rounded-full opacity-0 transition-opacity group-focus-visible:opacity-100" style={{ boxShadow: '0 0 0 2px rgba(255,255,255,0.6)' }} />
                      {/* the jewel core — glass highlight + glow */}
                      <span
                        aria-hidden
                        className="block rounded-full transition-all duration-200"
                        style={{
                          width: on ? '12px' : pre ? '8px' : '6px', height: on ? '12px' : pre ? '8px' : '6px',
                          background: `radial-gradient(circle at 50% 35%, rgba(255,255,255,${on ? 0.8 : 0.55}), rgba(255,255,255,0) 42%), rgba(${st.rgb},${on ? 1 : pre ? 0.9 : 0.6})`,
                          boxShadow: on ? `0 0 16px rgba(${st.rgb},0.9)` : pre ? `0 0 9px rgba(${st.rgb},0.55)` : 'none',
                        }}
                      />
                    </span>
                    {/* glass waypoint tile — the label sits inside a translucent lozenge that
                        shimmers on hover and is lit-from-within when active. Rail meets the tile
                        at its top edge (the keel). */}
                    <span
                      className="wp mt-4 flex min-h-[3.4em] w-full items-center justify-center px-2.5 py-2.5"
                      data-active={on ? 'true' : 'false'}
                      style={{ ['--rgb' as string]: st.rgb } as React.CSSProperties}
                    >
                      <span className={`relative font-serif text-[1.05rem] leading-tight transition-all duration-200 ${on ? 'text-ink tracking-[-0.01em]' : pre ? 'text-ink' : 'text-ink-2 group-hover:text-ink'}`}>
                        {st.area}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </Reveal>

      {/* ===== mobile — vertical current (tap to select) ===== */}
      <div className="relative mt-12 lg:hidden" role="tablist" aria-label="Lending lifecycle stages" onKeyDown={onKey}>
        <div aria-hidden className="absolute bottom-5 left-[5px] top-5 w-px" style={{ background: 'linear-gradient(180deg, rgba(57,214,255,0.7), rgba(0,255,178,0.7))' }} />
        <div className="flex flex-col">
          {STAGES.map((st, i) => {
            const on = i === active
            return (
              <button
                key={st.n}
                ref={(el) => { btnRefs.current[i] = el }}
                type="button"
                role="tab"
                aria-selected={on}
                tabIndex={on ? 0 : -1}
                onClick={() => commit(i)}
                className="relative flex items-center py-3.5 pl-8 text-left outline-none focus-visible:bg-white/[0.02]"
              >
                <span aria-hidden className="absolute left-0 top-1/2 block -translate-y-1/2 rounded-full transition-all" style={{ width: on ? '11px' : '7px', height: on ? '11px' : '7px', background: on ? `rgb(${st.rgb})` : `rgba(${st.rgb},0.5)`, boxShadow: on ? `0 0 12px rgba(${st.rgb},0.9)` : 'none' }} />
                <span className={`font-serif text-[1.2rem] leading-tight transition-colors ${on ? 'text-ink' : 'text-ink-3'}`}>{st.area}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ===== the stack: console → oversight → payoff, one current down the left ===== */}
      <div className="relative mt-12 pl-7 sm:pl-9">
        {/* the vertical current, tracking the active stage → gold → mint */}
        <span
          aria-hidden
          className="absolute bottom-2 left-[5.5px] top-2 w-px"
          style={{ background: `linear-gradient(180deg, rgb(${s.rgb}) 0%, rgba(${GOLD},0.6) 60%, rgb(${MINT}) 100%)`, transition: reduce ? 'none' : 'background 600ms ease' }}
        />

        {/* ---- console — the runtime surface ---- */}
        <Reveal delay={0.16}>
          <div className="relative">
            <span aria-hidden className="absolute -left-[27px] top-[5px] sm:-left-[35px]"><Node rgb={s.rgb} /></span>
            <div
              className="relative overflow-hidden rounded-[20px] border p-7 md:p-10"
              style={{
                borderColor: 'rgba(255,255,255,0.14)',
                background: `radial-gradient(120% 120% at 0% 0%, rgba(${s.rgb},0.08), transparent 45%), linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.014)), rgba(10,11,15,0.66)`,
                backdropFilter: 'blur(26px) saturate(115%)', WebkitBackdropFilter: 'blur(26px) saturate(115%)',
                boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.10), inset 0 -40px 80px -60px rgba(${s.rgb},0.2), 0 30px 70px -30px rgba(0,0,0,0.7)`,
                transition: reduce ? 'none' : 'background 600ms ease, box-shadow 600ms ease',
              }}
            >
              {/* HUD — top status strip + corner ticks (the active colour signs the panel) */}
              <span aria-hidden className="pointer-events-none absolute inset-x-6 top-1 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${s.rgb},0.4) 12%, rgba(${s.rgb},0.4) 88%, transparent)` }} />
              <span aria-hidden className="pointer-events-none absolute left-4 top-4 h-3 w-3 border-l border-t" style={{ borderColor: `rgba(${s.rgb},0.55)` }} />
              <span aria-hidden className="pointer-events-none absolute right-4 top-4 h-3 w-3 border-r border-t border-white/[0.12]" />
              <span aria-hidden className="pointer-events-none absolute bottom-4 left-4 h-3 w-3 border-b border-l border-white/[0.12]" />
              <span aria-hidden className="pointer-events-none absolute bottom-4 right-4 h-3 w-3 border-b border-r border-white/[0.12]" />

              {/* keyed remount → CSS fade (no AnimatePresence state machine to stall) */}
              <div
                key={s.area}
                className="relative grid grid-cols-1 items-stretch gap-x-14 gap-y-10 lg:min-h-[200px] lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-y-0"
                style={{ animation: reduce ? undefined : 'panelIn 0.32s cubic-bezier(0.16,1,0.3,1) both' }}
              >
                  {/* left rail — the stage identity, top-aligned so the id sits in the same place every stage */}
                  <div className="flex flex-col">
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: `rgba(${s.rgb},0.92)` }}>
                      {s.n} · {s.area}
                    </p>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">{s.role}</p>
                    <p className="mt-6 max-w-[15ch] font-serif text-[clamp(1.7rem,2.6vw,2.4rem)] leading-[1.08] tracking-[-0.015em] text-ink">
                      {s.impact}
                    </p>
                  </div>

                  {/* right field — operations as titled columns of glass chips. Every group is
                      one column of exactly 3 chips, so 2-group and 3-group stages reserve the
                      SAME height (identical card); the group count only changes the column count
                      (horizontal). Names never wrap: wide columns + a 14/15px floor. */}
                  <div className={`grid gap-x-5 self-start ${s.groups.length === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
                    {s.groups.map((g, gi) => (
                      <div key={g.label} className="flex flex-col" style={{ animation: reduce ? undefined : `cellIn 0.45s cubic-bezier(0.16,1,0.3,1) ${gi * 70}ms both` }}>
                        {/* column header */}
                        <div className="flex items-center gap-2">
                          <span aria-hidden className="h-1 w-1 shrink-0 rounded-full" style={{ background: `rgb(${s.rgb})`, boxShadow: `0 0 8px rgba(${s.rgb},0.7)` }} />
                          <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: `rgba(${s.rgb},0.74)` }}>{g.label}</p>
                        </div>
                        <span aria-hidden className="mt-2 h-px w-full rounded-full" style={{ background: `linear-gradient(90deg, rgba(${s.rgb},0.5), transparent)` }} />
                        {/* the glass chips */}
                        <div className="mt-3.5 flex flex-col gap-2">
                          {g.items.map((name) => (
                            <div key={name} className="op-chip" style={{ ['--rgb' as string]: s.rgb } as React.CSSProperties}>
                              <span aria-hidden className="op-chip__edge" />
                              <span className={`block font-sans leading-[1.2] tracking-[-0.005em] text-ink ${s.groups.length === 3 ? 'text-[14px]' : 'text-[15px]'}`} style={{ whiteSpace: 'nowrap' }}>{name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ---- oversight (the riverbed, gold) ---- */}
        <Reveal delay={0.2}>
          <div className="relative mt-16">
            <span aria-hidden className="absolute -left-[27px] top-[5px] sm:-left-[35px]"><Node rgb={GOLD} /></span>
            <div
              className="relative overflow-hidden rounded-[20px] border p-8 md:p-10"
              style={{
                borderColor: 'rgba(255,255,255,0.10)',
                background: `radial-gradient(130% 120% at 50% 0%, rgba(${GOLD},0.10) 0%, transparent 55%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.012)), rgba(10,11,15,0.55)`,
                backdropFilter: 'blur(26px) saturate(115%)', WebkitBackdropFilter: 'blur(26px) saturate(115%)',
                boxShadow: `inset 0 1px 0 0 rgba(${GOLD},0.22), 0 24px 60px -24px rgba(0,0,0,0.6)`,
              }}
            >
              {/* gold horizon scanline — signs the band as the oversight layer */}
              <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${GOLD},0.35), transparent)` }} />

              {/* thesis — single column, headline runs wide and confident */}
              <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: `rgba(${GOLD},0.92)` }}>The oversight layer</p>
              <h3 className="mt-3 max-w-[20ch] font-serif text-[clamp(1.75rem,3vw,2.6rem)] leading-[1.05] tracking-[-0.02em] text-ink">
                Your team stays in control.
              </h3>
              <p className="mt-5 max-w-[60ch] font-sans text-body-lg leading-relaxed text-ink-2">
                Everything above runs on the record, monitored and evidenced. KrimOS proves what happened.{' '}
                <span style={{ color: `rgb(${GOLD})` }}>It never makes the credit decision.</span>
              </p>

              {/* divider → the coverage areas KrimOS runs, shown equally */}
              <div className="mt-9 grid grid-cols-2 gap-x-10 gap-y-8 border-t pt-8 sm:grid-cols-3 lg:grid-cols-5" style={{ borderColor: `rgba(${GOLD},0.16)` }}>
                {OVERSIGHT.map((b, i) => (
                  <div key={b.name} style={{ animation: reduce ? undefined : `cellIn 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 50}ms both` }}>
                    <span aria-hidden className="block h-[3px] w-8 rounded-full" style={{ background: `rgba(${GOLD},0.6)` }} />
                    <p className="mt-4 font-serif text-[1.15rem] leading-tight text-ink">{b.name}</p>
                    <p className="mt-2 font-sans text-[13px] leading-relaxed text-ink-2">{b.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ---- payoff (where the current resolves, mint) ---- */}
        <Reveal delay={0.24}>
          <div className="relative mt-12">
            <span aria-hidden className="absolute -left-[27px] top-[5px] sm:-left-[35px]"><Node rgb={MINT} /></span>
            <div
              className="relative overflow-hidden rounded-[20px] border p-8 md:p-10"
              style={{
                borderColor: 'rgba(255,255,255,0.10)',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.012)), rgba(10,11,15,0.55)',
                backdropFilter: 'blur(26px) saturate(115%)', WebkitBackdropFilter: 'blur(26px) saturate(115%)',
                boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.07), 0 24px 60px -24px rgba(0,0,0,0.6)',
              }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3">What it adds up to</p>
              <div className="mt-7 grid gap-x-8 gap-y-8 md:grid-cols-3">
                {INSTITUTION.map(({ impact, hi, tag }, i) => {
                  const [pre, post] = impact.split(hi)
                  return (
                    <div key={impact} className={`md:px-8 ${i > 0 ? 'md:border-l md:border-white/[0.08]' : 'md:pl-0'}`}>
                      <span aria-hidden className="block h-[3px] w-9 rounded-full" style={{ background: 'linear-gradient(90deg, var(--cyan), var(--mint))' }} />
                      <h3 className="mt-5 min-h-[2.3em] font-serif text-[clamp(1.45rem,2.3vw,1.9rem)] leading-[1.12] text-ink">
                        {pre}<span className="text-mint">{hi}</span>{post}
                      </h3>
                      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">{tag}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
