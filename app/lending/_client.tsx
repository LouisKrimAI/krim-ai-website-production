'use client'

/**
 * /lending — the animated pieces. Every device is GPU-only (opacity · transform ·
 * colour) and reduced-motion-safe: useReducedMotion settles each to its final,
 * meaningful state instantly, with no CLS — every device reserves its space.
 *
 *   HeroTrace      — § 1: a single fine line of light traces from "application"
 *                    toward "payoff", foreshadowing the spine below. One pass.
 *   ProblemWall    — § 2: two tall glass columns (front office / back office)
 *                    split by one luminous seam; "40–60%" large in the gap.
 *   JourneySpine   — § 3, the CENTREPIECE: a steppable spine Application → Payoff
 *                    with six stage-nodes; two threads (Kira above, Karta below)
 *                    converge at each node where a cyan→mint pulse marks the
 *                    action clearing validation; the active stage rises as a glass
 *                    card; the spine fills mint as the loan completes. Clickable
 *                    nodes + prev/next + gentle auto-advance the reader can pause.
 *                    Mobile: vertical spine, threads either side. Reduced motion:
 *                    full spine + every stage static, last stage open.
 *   MarketSelector — § 4: India · UK · US switch one glass panel of that market's
 *                    frameworks; cyan→mint on each switch.
 *   RoleSelector   — § 5: a quiet row of titles surfaces each twin's promise in a
 *                    single glass panel.
 *   ImpactCurve    — § 6: four stat cards over a slim rising curve drawn on view,
 *                    Q1 → Q2 → Year two.
 *   PerimeterMotif — § 7: a small drawn perimeter under "sovereign by construction".
 *
 * Grammar: cyan = proposed/thinking · mint = validated · gold = exception.
 */

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useInView,
  useReducedMotion,
  type Transition,
} from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const
const VIEW_MARGIN = '-10% 0px -10% 0px'

const MINT = '#00FFB2'
const CYAN = '#39D6FF'
const GOLD = '#C8A14A'

/* ═══════════════════════════ 1 · Hero trace ════════════════════════════════ */
/* A single fine line of light from "Application" toward "Payoff" — the journey,
   foreshadowed. Draws once on view; reduced motion shows it complete. */

export function HeroTrace() {
  const reduce = useReducedMotion()
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6, margin: VIEW_MARGIN })
  const draw = reduce || inView

  return (
    <LazyMotion features={domAnimation}>
      <div className="max-w-[460px]">
        <div className="mb-2.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
          <span>Application</span>
          <span>Payoff</span>
        </div>
        <svg
          ref={ref}
          viewBox="0 0 460 40"
          className="w-full"
          fill="none"
          aria-hidden
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="hero-trace" x1="0" y1="0" x2="460" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor={CYAN} />
              <stop offset="1" stopColor={MINT} />
            </linearGradient>
          </defs>
          {/* the ground line */}
          <line x1="6" y1="20" x2="454" y2="20" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          {/* the traced line of light */}
          <m.path
            d="M6 20 C 120 20, 160 12, 230 20 S 360 28, 454 20"
            stroke="url(#hero-trace)"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0, opacity: 0.4 }}
            animate={draw ? { pathLength: 1, opacity: 1 } : undefined}
            transition={{ duration: 1.6, ease: EASE, delay: 0.1 }}
          />
          {/* endpoints */}
          <circle cx="6" cy="20" r="3" fill={CYAN} />
          <m.circle
            cx="454"
            cy="20"
            r="3"
            fill={MINT}
            initial={reduce ? false : { opacity: 0, scale: 0 }}
            animate={draw ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.5, ease: EASE, delay: reduce ? 0 : 1.6 }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        </svg>
      </div>
    </LazyMotion>
  )
}

/* ═══════════════════════════ 2 · The wall ══════════════════════════════════ */
/* Two tall glass columns held apart by one luminous seam — the wall. The cost
   figure sits large in the gap; the seam glows faintly, foreshadowing its
   dissolve in the lifecycle below. Static composition, one quiet seam pulse. */

const FRONT = ['Greet & qualify', 'Set expectations', 'Walk through signing', 'Answer, always on']
const BACK = ['KYC & documents', 'Credit picture', 'Compliance & funds', 'Reconcile & report']

export function ProblemWall() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4, margin: VIEW_MARGIN })
  const on = reduce || inView

  const column = (
    title: string,
    sub: string,
    items: string[],
    tone: 'cyan' | 'mint',
    side: 'left' | 'right',
  ) => (
    <div className="glass-quiet flex h-full flex-col p-6 md:p-7">
      <p
        className="font-mono text-[10px] uppercase tracking-[0.16em]"
        style={{ color: tone === 'cyan' ? 'var(--cyan)' : 'var(--mint)' }}
      >
        {sub}
      </p>
      <h3 className="mt-2 font-serif text-[1.45rem] leading-tight text-ink">{title}</h3>
      <ul className="mt-5 grid gap-2.5">
        {items.map((it, i) => (
          <m.li
            key={it}
            initial={reduce ? false : { opacity: 0, x: side === 'left' ? -8 : 8 }}
            animate={on ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.06 }}
            className="flex items-center gap-2.5 font-sans text-[14px] text-ink-2"
          >
            <span
              aria-hidden
              className="h-1 w-1 shrink-0 rounded-full"
              style={{ background: tone === 'cyan' ? CYAN : MINT, opacity: 0.7 }}
            />
            {it}
          </m.li>
        ))}
      </ul>
    </div>
  )

  return (
    <LazyMotion features={domAnimation}>
      <div ref={ref}>
        {/* desktop: two columns split by the seam; mobile: stacked with the seam between */}
        <div className="relative grid items-stretch gap-5 md:grid-cols-[1fr_auto_1fr] md:gap-0">
          <div className="md:pr-10">
            {column('Front office', 'The people who speak to customers', FRONT, 'cyan', 'left')}
          </div>

          {/* the wall — one luminous seam, the cost figure in the gap */}
          <div className="relative flex items-center justify-center py-2 md:w-px md:py-0">
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 hidden h-full w-px -translate-x-1/2 -translate-y-1/2 md:block"
              style={{
                background:
                  'linear-gradient(180deg, transparent, rgba(255,255,255,0.10) 12%, rgba(255,255,255,0.10) 88%, transparent)',
              }}
            />
            <m.span
              aria-hidden
              className="absolute left-1/2 top-1/2 hidden h-2/3 w-px -translate-x-1/2 -translate-y-1/2 md:block"
              style={{ background: `linear-gradient(180deg, transparent, ${MINT}, transparent)` }}
              initial={reduce ? { opacity: 0.25 } : { opacity: 0.1 }}
              animate={reduce ? undefined : { opacity: [0.1, 0.5, 0.1] }}
              transition={reduce ? undefined : { duration: 4.5, ease: 'easeInOut', repeat: Infinity }}
            />
            {/* mobile seam */}
            <span
              aria-hidden
              className="block h-px w-2/3 md:hidden"
              style={{ background: `linear-gradient(90deg, transparent, ${MINT}66, transparent)` }}
            />
            {/* the cost figure, large in the gap */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="rounded-xl border border-soft bg-bg/70 px-4 py-3 backdrop-blur-md">
                <p className="whitespace-nowrap font-serif text-[clamp(1.6rem,3.2vw,2.4rem)] leading-none text-ink">
                  40&ndash;60%
                </p>
                <p className="mt-1.5 font-mono text-[9px] uppercase leading-tight tracking-[0.12em] text-ink-3">
                  of what every
                  <br />
                  loan costs
                </p>
              </div>
            </div>
          </div>

          <div className="md:pl-10">
            {column('Back office', 'The people who keep the books', BACK, 'mint', 'right')}
          </div>
        </div>

        <p className="mt-6 text-center font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-3">
          Held apart by tickets, spreadsheets &amp; hand-offs
        </p>
      </div>
    </LazyMotion>
  )
}

/* ═══════════════════════════ 3 · Journey spine — CENTREPIECE ════════════════ */
/* A steppable spine from Application → Payoff with six stage-nodes. Two threads
   travel in parallel — Kira (the customer line) above, Karta (the back office)
   below — and meet at each node, where a cyan→mint pulse marks the action
   clearing validation. The active stage rises as a glass card; the spine fills
   mint as the loan completes. Driven by real controls: click any node, step
   prev/next, a gentle auto-advance the reader can pause. Mobile: vertical spine.
   Reduced motion: full spine, all stages clear, last stage open. */

type Stage = {
  key: string
  name: string
  kira: string
  karta: string
  note?: string
}

const STAGES: Stage[] = [
  {
    key: 'onboarding',
    name: 'Onboarding',
    kira: 'Greets, qualifies, guides.',
    karta: 'Scores the lead, runs KYC, reads the documents.',
  },
  {
    key: 'decision',
    name: 'Decision',
    kira: 'Gathers what&rsquo;s missing, sets expectations.',
    karta: 'Assembles the credit picture, checks policy, preps the sanction.',
    note: 'Krim builds the picture — the credit decision stays with you.',
  },
  {
    key: 'disbursal',
    name: 'Disbursal',
    kira: 'Walks the borrower through signing.',
    karta: 'Drafts the agreement, clears compliance, releases funds.',
  },
  {
    key: 'servicing',
    name: 'Servicing',
    kira: 'Payments, statements, questions — always on.',
    karta: 'Maintains accounts, reconciles, monitors.',
  },
  {
    key: 'collections',
    name: 'Collections',
    kira: 'Reminders and plans, hardship handled gently.',
    karta: 'Segments risk, flags early, escalates.',
  },
  {
    key: 'closure',
    name: 'Closure',
    kira: 'Payoff, the NOC, the next conversation.',
    karta: 'Settles, reports, feeds the learning back.',
  },
]

const LAST = STAGES.length - 1

export function JourneySpine() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, amount: 0.3, margin: VIEW_MARGIN })
  const groupId = useId()

  // active = how far the loan has progressed (the current open stage).
  const [active, setActive] = useState(reduce ? LAST : 0)
  const [paused, setPaused] = useState(false)
  const [touched, setTouched] = useState(false) // user took manual control

  // gentle auto-advance — walks the journey while on screen, then holds.
  useEffect(() => {
    if (reduce || paused || touched || !inView) return
    if (active >= LAST) return
    const id = window.setTimeout(() => setActive((a) => Math.min(a + 1, LAST)), 2600)
    return () => window.clearTimeout(id)
  }, [active, paused, touched, inView, reduce])

  const go = useCallback((idx: number) => {
    setTouched(true)
    setActive(Math.max(0, Math.min(idx, LAST)))
  }, [])

  const replay = useCallback(() => {
    setTouched(false)
    setPaused(false)
    setActive(0)
  }, [])

  const settle: Transition = reduce ? { duration: 0 } : { duration: 0.5, ease: EASE }
  const stage = STAGES[active]
  // spine fill: fraction of the journey cleared (validated mint behind the marker)
  const fillPct = (active / LAST) * 100
  const complete = active >= LAST

  return (
    <LazyMotion features={domAnimation}>
      <div ref={ref} className="glass overflow-hidden p-5 md:p-8">
        {/* ── header: the two threads, named ── */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-soft pb-5">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
            <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-cyan">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: CYAN }} />
              Kira · the customer line
            </span>
            <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-mint">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: MINT }} />
              Karta · the back office
            </span>
          </div>
          <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-3">
            Application → Payoff · every action validated as it passes
          </span>
        </div>

        {/* ════ THE SPINE — horizontal on desktop, vertical on mobile ════ */}

        {/* desktop spine */}
        <div className="mt-8 hidden md:block">
          <SpineHorizontal active={active} fillPct={fillPct} reduce={!!reduce} onSelect={go} groupId={groupId} />
        </div>
        {/* mobile spine */}
        <div className="mt-7 md:hidden">
          <SpineVertical active={active} reduce={!!reduce} onSelect={go} />
        </div>

        {/* ════ the active stage, risen as a glass card ════ */}
        <div className="mt-8">
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={stage.key}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={settle}
              className="glass-mint relative overflow-hidden rounded-[14px] p-6 md:p-7"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-serif text-[1.7rem] leading-none text-ink">{stage.name}</h3>
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-mint">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: MINT, boxShadow: `0 0 8px ${MINT}aa` }} />
                  Action cleared validation
                </span>
              </div>

              {/* the two lines, met at this step */}
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <ThreadLine tone="cyan" who="Kira · with the customer" text={stage.kira} />
                <ThreadLine tone="mint" who="Karta · in the back office" text={stage.karta} />
              </div>

              {stage.note && (
                <p className="mt-5 flex items-start gap-2.5 border-t border-[rgba(0,255,178,0.16)] pt-4 font-sans text-[13px] italic leading-relaxed text-ink-2">
                  <span
                    aria-hidden
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: GOLD }}
                  />
                  {stage.note}
                </p>
              )}
            </m.div>
          </AnimatePresence>
        </div>

        {/* ════ crawlable mirror — every stage's full text in static HTML ════
           The interactive card above shows only the active stage. This block
           keeps all six stages (both threads each), and the Decision boundary
           caption, unconditionally in the DOM for SEO / answer-engines. It is
           visually hidden (sr-only) and aria-hidden so it never affects layout,
           the active state, or the accessibility tree the controls drive. */}
        <div className="sr-only" aria-hidden>
          <h3>Application to Payoff — the full journey</h3>
          <ol>
            {STAGES.map((s) => (
              <li key={s.key}>
                <h4>{s.name}</h4>
                <p>
                  Kira · with the customer:{' '}
                  <span dangerouslySetInnerHTML={{ __html: s.kira }} />
                </p>
                <p>
                  Karta · in the back office:{' '}
                  <span dangerouslySetInnerHTML={{ __html: s.karta }} />
                </p>
                {s.note && <p>{s.note}</p>}
              </li>
            ))}
          </ol>
        </div>

        {/* ════ footer controls — prev/next, progress, pause, replay ════ */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-soft pt-5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(active - 1)}
              disabled={active === 0}
              aria-label="Previous stage"
              className="grid h-8 w-8 place-items-center rounded-lg border border-soft text-ink-2 transition-colors hover:border-strong hover:text-ink disabled:opacity-35 disabled:hover:border-soft"
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
                <path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="min-w-[120px] text-center font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
              Stage {active + 1} / {STAGES.length}
            </span>
            <button
              type="button"
              onClick={() => go(active + 1)}
              disabled={active === LAST}
              aria-label="Next stage"
              className="grid h-8 w-8 place-items-center rounded-lg border border-soft text-ink-2 transition-colors hover:border-strong hover:text-ink disabled:opacity-35 disabled:hover:border-soft"
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
                <path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.12em] transition-colors duration-500"
              style={{ color: complete ? MINT : 'var(--text-3)' }}
            >
              {complete ? 'Loan complete · spine filled' : 'Loan in progress'}
            </span>
            {!reduce && (
              <>
                {!touched && active < LAST && (
                  <button
                    type="button"
                    onClick={() => setPaused((p) => !p)}
                    aria-pressed={paused}
                    className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3 underline-offset-4 transition-colors hover:text-ink-2 hover:underline"
                  >
                    {paused ? 'Resume' : 'Pause'}
                  </button>
                )}
                <button
                  type="button"
                  onClick={replay}
                  className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3 underline-offset-4 transition-colors hover:text-ink-2 hover:underline"
                >
                  Replay
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </LazyMotion>
  )
}

// One side of the meeting at a stage — Kira (cyan) or Karta (mint).
function ThreadLine({ tone, who, text }: { tone: 'cyan' | 'mint'; who: string; text: string }) {
  const c = tone === 'cyan' ? CYAN : MINT
  return (
    <div
      className="rounded-xl border p-4"
      style={{
        borderColor: tone === 'cyan' ? 'rgba(57,214,255,0.22)' : 'rgba(0,255,178,0.22)',
        background: tone === 'cyan' ? 'rgba(57,214,255,0.04)' : 'rgba(0,255,178,0.04)',
      }}
    >
      <p className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.14em]" style={{ color: c }}>
        <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
        {who}
      </p>
      <p
        className="mt-2 font-sans text-[14px] leading-relaxed text-ink"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  )
}

// ── desktop spine: a horizontal rail, six nodes, two threads converging ──
function SpineHorizontal({
  active,
  fillPct,
  reduce,
  onSelect,
  groupId,
}: {
  active: number
  fillPct: number
  reduce: boolean
  onSelect: (i: number) => void
  groupId: string
}) {
  return (
    <div className="relative">
      {/* the two travelling threads — Kira above, Karta below, converging at the rail */}
      <svg viewBox="0 0 1000 120" className="w-full" fill="none" aria-hidden preserveAspectRatio="none">
        <defs>
          <linearGradient id={`${groupId}-fill`} x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor={MINT} />
            <stop offset="1" stopColor={MINT} />
          </linearGradient>
        </defs>
        {(() => {
          const N = STAGES.length
          const pad = 60
          const span = 1000 - pad * 2
          const xs = STAGES.map((_, i) => pad + (span * i) / (N - 1))
          return (
            <>
              {/* base rail */}
              <line x1={pad} y1="60" x2={1000 - pad} y2="60" stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" />
              {/* mint fill — the loan completing */}
              <m.path
                d={`M${pad} 60 L${1000 - pad} 60`}
                stroke={`url(#${groupId}-fill)`}
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={false}
                animate={{ pathLength: fillPct / 100 }}
                transition={reduce ? { duration: 0 } : { duration: 0.6, ease: EASE }}
                style={{ filter: `drop-shadow(0 0 4px ${MINT}66)` }}
              />
              {/* converging threads at each node */}
              {xs.map((x, i) => {
                const reached = i <= active
                const on = i === active
                const c = reached ? MINT : 'rgba(255,255,255,0.16)'
                return (
                  <g key={i}>
                    {/* Kira thread from above */}
                    <path d={`M${x} 16 C ${x} 38, ${x} 42, ${x} 56`} stroke={reached ? CYAN : 'rgba(57,214,255,0.18)'} strokeWidth="1.2" strokeLinecap="round" opacity={reached ? 0.85 : 0.4} />
                    {/* Karta thread from below */}
                    <path d={`M${x} 104 C ${x} 82, ${x} 78, ${x} 64`} stroke={reached ? MINT : 'rgba(0,255,178,0.18)'} strokeWidth="1.2" strokeLinecap="round" opacity={reached ? 0.85 : 0.4} />
                    {/* the node where they meet */}
                    <circle cx={x} cy="60" r={on ? 6.5 : 5} fill="var(--bg)" stroke={c} strokeWidth="1.6" />
                    {on && !reduce && (
                      <m.circle
                        cx={x}
                        cy="60"
                        r="5"
                        fill="none"
                        stroke={MINT}
                        strokeWidth="1.4"
                        initial={{ r: 5, opacity: 0.7 }}
                        animate={{ r: [5, 16], opacity: [0.7, 0] }}
                        transition={{ duration: 1.8, ease: 'easeOut', repeat: Infinity }}
                      />
                    )}
                    {reached && <circle cx={x} cy="60" r="2.2" fill={MINT} />}
                  </g>
                )
              })}
            </>
          )
        })()}
      </svg>

      {/* clickable stage labels, aligned under each node */}
      <div className="mt-1 grid" style={{ gridTemplateColumns: `repeat(${STAGES.length}, minmax(0, 1fr))` }}>
        {STAGES.map((s, i) => {
          const reached = i <= active
          const on = i === active
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => onSelect(i)}
              aria-current={on ? 'step' : undefined}
              className="group flex flex-col items-center gap-1 px-1 py-1 text-center focus-visible:outline-none"
            >
              <span
                className="font-mono text-[10px] uppercase tracking-[0.1em] transition-colors duration-300 group-hover:text-ink"
                style={{ color: on ? MINT : reached ? 'var(--text-2)' : 'var(--text-3)' }}
              >
                {s.name}
              </span>
              <span
                className="h-px w-5 transition-all duration-300"
                style={{ background: on ? MINT : 'transparent' }}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── mobile spine: a vertical rail, threads either side ──
function SpineVertical({
  active,
  reduce,
  onSelect,
}: {
  active: number
  reduce: boolean
  onSelect: (i: number) => void
}) {
  return (
    <ol className="relative grid gap-0 pl-1">
      {/* the rail */}
      <span aria-hidden className="absolute left-[14px] top-2 bottom-2 w-px" style={{ background: 'rgba(255,255,255,0.10)' }} />
      <m.span
        aria-hidden
        className="absolute left-[14px] top-2 w-px origin-top"
        style={{ background: MINT, boxShadow: `0 0 6px ${MINT}66`, bottom: 8 }}
        initial={false}
        animate={{ scaleY: LAST === 0 ? 1 : active / LAST }}
        transition={reduce ? { duration: 0 } : { duration: 0.5, ease: EASE }}
      />
      {STAGES.map((s, i) => {
        const reached = i <= active
        const on = i === active
        return (
          <li key={s.key} className="relative">
            <button
              type="button"
              onClick={() => onSelect(i)}
              aria-current={on ? 'step' : undefined}
              className="flex w-full items-center gap-3.5 py-2 text-left focus-visible:outline-none"
            >
              <span
                aria-hidden
                className="relative z-10 grid h-[14px] w-[14px] shrink-0 place-items-center rounded-full border transition-colors duration-300"
                style={{
                  borderColor: reached ? MINT : 'rgba(255,255,255,0.18)',
                  background: 'var(--bg)',
                }}
              >
                {reached && <span className="h-1.5 w-1.5 rounded-full" style={{ background: MINT }} />}
              </span>
              <span
                className="font-mono text-[12px] uppercase tracking-[0.1em] transition-colors duration-300"
                style={{ color: on ? MINT : reached ? 'var(--text-2)' : 'var(--text-3)' }}
              >
                {s.name}
              </span>
            </button>
          </li>
        )
      })}
    </ol>
  )
}

/* ═══════════════════════════ 4 · Market selector ═══════════════════════════ */
/* India · UK · US switch a single glass panel of that market's frameworks. Each
   switch runs a brief cyan→mint motif — the rulebook re-validated for the new
   market. Reduced motion: instant swap, no sweep. */

type Market = { key: string; label: string; frameworks: string[] }

const MARKETS: Market[] = [
  { key: 'in', label: 'India', frameworks: ['RBI circulars', 'Fair Practices Code', 'DPDP'] },
  {
    key: 'uk',
    label: 'UK',
    frameworks: ['FCA Consumer Duty', 'CONC', 'Consumer Credit Act', 'UK GDPR'],
  },
  {
    key: 'us',
    label: 'US',
    frameworks: ['FDCPA', 'TCPA', 'Reg F', 'FCRA', 'SCRA', 'ECOA'],
  },
]

export function MarketSelector() {
  const reduce = useReducedMotion()
  const [idx, setIdx] = useState(0)
  const market = MARKETS[idx]
  const settle: Transition = reduce ? { duration: 0 } : { duration: 0.45, ease: EASE }

  return (
    <LazyMotion features={domAnimation}>
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        {/* the market selector — a real control */}
        <div className="flex flex-col gap-4">
          <div role="tablist" aria-label="Lending market" className="flex flex-wrap gap-2">
            {MARKETS.map((mk, i) => {
              const on = i === idx
              return (
                <button
                  key={mk.key}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setIdx(i)}
                  className="rounded-lg border px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.12em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                  style={{
                    borderColor: on ? 'rgba(0,255,178,0.45)' : 'rgba(255,255,255,0.10)',
                    background: on ? 'rgba(0,255,178,0.06)' : 'transparent',
                    color: on ? MINT : 'var(--text-2)',
                  }}
                >
                  {mk.label}
                </button>
              )
            })}
          </div>
          <div className="glass-quiet flex-1 p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
              One system · three markets
            </p>
            <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink-2">
              Krim-Ny&#257;ya checks every action against the law where you lend — before it
              executes. Switch the market; only the rulebook changes.
            </p>
          </div>
        </div>

        {/* the single panel — frameworks for the chosen market */}
        <div className="glass relative overflow-hidden p-6 md:p-7">
          <div className="flex items-center justify-between gap-3 border-b border-soft pb-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-mint">
              {market.label} · frameworks applied
            </span>
            <span className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.12em] text-mint">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: MINT }} />
              Pre-validated
            </span>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <m.ul
              key={market.key}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={settle}
              className="mt-5 flex flex-wrap gap-2.5"
            >
              {market.frameworks.map((f, i) => (
                <m.li
                  key={f}
                  initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: EASE, delay: reduce ? 0 : i * 0.05 }}
                  className="rounded-lg border border-[rgba(0,255,178,0.22)] bg-[rgba(0,255,178,0.05)] px-3.5 py-2 font-mono text-[12.5px] tracking-[0.02em] text-ink"
                >
                  {f}
                </m.li>
              ))}
            </m.ul>
          </AnimatePresence>

          {/* ════ crawlable mirror — every market's frameworks in static HTML ════
             The interactive list above shows only the selected market. This block
             keeps all three markets' framework lists unconditionally in the DOM
             for SEO / answer-engines. Visually hidden (sr-only) and aria-hidden,
             so it never affects layout, the selected state, or the tab semantics. */}
          <div className="sr-only" aria-hidden>
            {MARKETS.map((mk) => (
              <section key={mk.key}>
                <h3>{mk.label} · frameworks applied</h3>
                <ul>
                  {mk.frameworks.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-7 rounded-[12px] border border-[rgba(0,255,178,0.3)] bg-[rgba(0,255,178,0.04)] p-5">
            <p className="font-serif text-[1.3rem] leading-snug text-ink">
              Every regulated action, pre-validated.
            </p>
            <p className="mt-1 font-sans text-[15px] text-ink-2">Audit-ready by default.</p>
          </div>
        </div>
      </div>
    </LazyMotion>
  )
}

/* ═══════════════════════════ 5 · Role selector ═════════════════════════════ */
/* A quiet row of titles; choose one and its twin's promise surfaces in a single
   glass panel — compact, never eight stacked rows. Reduced motion: instant. */

type Role = { key: string; title: string; promise: string }

const ROLES: Role[] = [
  { key: 'clo', title: 'CLO', promise: 'What changed, and what to do.' },
  { key: 'cro', title: 'CRO', promise: 'Live exposure, audit-ready evidence.' },
  { key: 'collections', title: 'Collections', promise: 'Governed journeys, breaches made impossible.' },
  { key: 'servicing', title: 'Servicing', promise: 'Routine self-serves; people take the hard cases.' },
  { key: 'compliance', title: 'Compliance', promise: 'Inspection answers in minutes.' },
  { key: 'credit-ops', title: 'Credit Ops', promise: 'Bureau, KYC, scoring at machine speed.' },
  { key: 'analytics', title: 'Analytics', promise: 'One queryable truth.' },
  { key: 'contact-centre', title: 'Contact Centre', promise: 'The right next step, in the moment.' },
]

export function RoleSelector() {
  const reduce = useReducedMotion()
  const [idx, setIdx] = useState(0)
  const role = ROLES[idx]
  const settle: Transition = reduce ? { duration: 0 } : { duration: 0.4, ease: EASE }

  return (
    <LazyMotion features={domAnimation}>
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        {/* the quiet row of titles */}
        <div role="tablist" aria-label="Role" className="flex flex-wrap content-start gap-2">
          {ROLES.map((r, i) => {
            const on = i === idx
            return (
              <button
                key={r.key}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setIdx(i)}
                className="rounded-lg border px-4 py-2.5 font-sans text-[14px] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                style={{
                  borderColor: on ? 'rgba(0,255,178,0.45)' : 'rgba(255,255,255,0.10)',
                  background: on ? 'rgba(0,255,178,0.06)' : 'transparent',
                  color: on ? 'var(--text-1)' : 'var(--text-2)',
                }}
              >
                {r.title}
              </button>
            )
          })}
        </div>

        {/* the twin's promise — one panel */}
        <div className="glass relative flex min-h-[220px] flex-col justify-between overflow-hidden p-7 md:p-8">
          <div>
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-mint">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: MINT }} />
              Digital twin · {role.title}
            </p>
            <AnimatePresence mode="wait" initial={false}>
              <m.p
                key={role.key}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={settle}
                className="mt-5 font-serif text-[clamp(1.5rem,2.6vw,2rem)] leading-snug text-ink"
              >
                {role.promise}
              </m.p>
            </AnimatePresence>
          </div>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
            One source of truth · seen from where you sit
          </p>
        </div>
      </div>
    </LazyMotion>
  )
}

/* ═══════════════════════════ 6 · Impact + rising curve ═════════════════════ */
/* Four stat cards over a slim rising curve drawn on view: Q1 → Q2 → Year two,
   the system improving with use. Numbers are ranges, against your own baseline.
   Reduced motion: the curve shown complete, no draw. */

type Impact = { area: string; a: string; b: string }

const IMPACT: Impact[] = [
  { area: 'Origination', a: '5–10×', b: 'document throughput · days → hours onboarding' },
  { area: 'Servicing', a: '40–70%', b: 'self-serve · 30–50% less handling time' },
  { area: 'Collections', a: '1–3 pp', b: 'lower roll-rate (1–30 DPD) · 25–40% more right-party contact' },
  { area: 'Compliance', a: 'minutes', b: 'reporting · 100% of regulated actions pre-validated' },
]

export function ImpactCurve() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4, margin: VIEW_MARGIN })
  const draw = reduce || inView

  return (
    <LazyMotion features={domAnimation}>
      <div ref={ref}>
        {/* four stat cards, big mint figures */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {IMPACT.map((it, i) => (
            <m.div
              key={it.area}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={draw ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
              className="glass flex h-full flex-col p-6"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">{it.area}</p>
              <p className="mt-3 font-serif text-[clamp(2.1rem,3.4vw,2.7rem)] leading-none text-mint">
                {it.a}
              </p>
              <p className="mt-3 font-sans text-[13.5px] leading-relaxed text-ink-2">{it.b}</p>
            </m.div>
          ))}
        </div>

        {/* the slim rising curve — Q1 → Q2 → Year two */}
        <div className="glass-quiet mt-5 p-6 md:p-7">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
              Improving with use
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
              Against your own baseline
            </p>
          </div>
          <svg viewBox="0 0 600 160" className="mt-4 w-full" fill="none" aria-hidden preserveAspectRatio="none">
            <defs>
              <linearGradient id="curve-stroke" x1="0" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor={CYAN} />
                <stop offset="1" stopColor={MINT} />
              </linearGradient>
              <linearGradient id="curve-fill" x1="0" y1="0" x2="0" y2="160" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor={MINT} stopOpacity="0.16" />
                <stop offset="1" stopColor={MINT} stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* baseline */}
            <line x1="20" y1="140" x2="580" y2="140" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            {/* gridline at top */}
            <line x1="20" y1="28" x2="580" y2="28" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            {/* area fill */}
            <m.path
              d="M20 124 C 170 116, 250 86, 320 70 S 480 34, 580 24 L580 140 L20 140 Z"
              fill="url(#curve-fill)"
              initial={reduce ? false : { opacity: 0 }}
              animate={draw ? { opacity: 1 } : undefined}
              transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
            />
            {/* the rising curve */}
            <m.path
              d="M20 124 C 170 116, 250 86, 320 70 S 480 34, 580 24"
              stroke="url(#curve-stroke)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={reduce ? false : { pathLength: 0 }}
              animate={draw ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
            />
            {/* the three milestone points */}
            {[
              { x: 20, y: 124, c: CYAN },
              { x: 320, y: 70, c: MINT },
              { x: 580, y: 24, c: MINT },
            ].map((p, i) => (
              <m.circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="3.5"
                fill="var(--bg)"
                stroke={p.c}
                strokeWidth="1.8"
                initial={reduce ? false : { opacity: 0, scale: 0 }}
                animate={draw ? { opacity: 1, scale: 1 } : undefined}
                transition={{ duration: 0.4, ease: EASE, delay: reduce ? 0 : 0.6 + i * 0.35 }}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              />
            ))}
          </svg>
          <div className="mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
            <span>Q1</span>
            <span>Q2</span>
            <span>Year two</span>
          </div>
        </div>
      </div>
    </LazyMotion>
  )
}

/* ═══════════════════════════ 7 · Perimeter motif ═══════════════════════════ */
/* A small drawn perimeter under "sovereign by construction" — the line you draw,
   nothing crossing it. Draws once on view; reduced motion shows it complete. */

export function PerimeterMotif() {
  const reduce = useReducedMotion()
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6, margin: VIEW_MARGIN })
  const draw = reduce || inView

  return (
    <LazyMotion features={domAnimation}>
      <div className="flex items-center justify-center gap-4">
        <svg ref={ref} viewBox="0 0 220 80" className="h-[72px] w-[200px]" fill="none" aria-hidden>
          {/* the perimeter */}
          <m.rect
            x="14"
            y="14"
            width="192"
            height="52"
            rx="10"
            stroke={MINT}
            strokeWidth="1.4"
            strokeDasharray="4 5"
            initial={reduce ? false : { pathLength: 0, opacity: 0.4 }}
            animate={draw ? { pathLength: 1, opacity: 1 } : undefined}
            transition={{ duration: 1.4, ease: EASE }}
          />
          {/* what stays inside — three nodes, contained */}
          {[70, 110, 150].map((x, i) => (
            <m.circle
              key={x}
              cx={x}
              cy="40"
              r="3.5"
              fill={MINT}
              initial={reduce ? false : { opacity: 0, scale: 0 }}
              animate={draw ? { opacity: 1, scale: 1 } : undefined}
              transition={{ duration: 0.4, ease: EASE, delay: reduce ? 0 : 0.8 + i * 0.12 }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          ))}
          <line x1="73" y1="40" x2="107" y2="40" stroke={`${MINT}55`} strokeWidth="1" />
          <line x1="113" y1="40" x2="147" y2="40" stroke={`${MINT}55`} strokeWidth="1" />
        </svg>
        <p className="max-w-[20ch] font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.14em] text-ink-3">
          Sovereign by construction · no foreign API in the loop
        </p>
      </div>
    </LazyMotion>
  )
}
