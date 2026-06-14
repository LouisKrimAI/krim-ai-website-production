'use client'

/**
 * Karta — the animated pieces. Three client components, all GPU-only
 * (opacity · transform · colour) and reduced-motion-safe: useReducedMotion
 * settles each to its final, meaningful state instantly. No CLS.
 *
 *   Composition  — section 2: a handful of validated primitives snap together
 *                  into a single co-worker, on scroll-in. "Built, not coded."
 *   Roster       — section 3 signature device: the eight co-workers as a clean,
 *                  scannable glass register. Risk and Decide carry a subtle gold
 *                  caveat (the operational-boundary grammar).
 *   AutonomyDial — section 4 signature device + page centrepiece: a four-stop
 *                  dial. Selecting a stop slides the indicator and redraws a
 *                  small who-acts diagram — more or less human involvement.
 *
 * Grammar: cyan = proposed/thinking · mint = validated/learned · gold = boundary.
 */

import { useId, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, type Transition } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const
const VIEW_MARGIN = '-12% 0px -12% 0px'

const MINT = '#00FFB2'
const CYAN = '#39D6FF'
const GOLD = '#C8A14A'

/* ═══════════════════════════ 2 · Composition ═══════════════════════════════ */
/* A few validated primitives (cyan, proposed) draw in, then snap together into
   one co-worker that settles mint (validated). Recomposition, made visible. */

const PIECES = [
  'MAKE_CALL',
  'CHECK_TCPA',
  'FETCH_ACCOUNT',
  'GENERATE_NOTICE',
  'EVALUATE_POLICY',
  'LOG_RECORD',
] as const

export function Composition() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.45, margin: VIEW_MARGIN })
  const play = reduce ? true : inView

  return (
    <div ref={ref} className="glass-quiet mx-auto max-w-[880px] p-6 md:p-9">
      <div className="grid items-center gap-8 md:grid-cols-[1fr_auto_auto] md:gap-10">
        {/* the validated primitives — they snap inward */}
        <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-2">
          {PIECES.map((p, i) => (
            <motion.li
              key={p}
              initial={reduce ? false : { opacity: 0, x: -10 }}
              animate={play ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.5, ease: EASE, delay: play ? i * 0.08 : 0 }}
              className="inline-flex items-center gap-2 rounded border border-[rgba(57,214,255,0.26)] bg-[rgba(57,214,255,0.04)] px-2.5 py-1.5 font-mono text-[11.5px] tracking-[0.02em] text-ink-2"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden />
              {p}
            </motion.li>
          ))}
        </ul>

        {/* the snap arrow */}
        <motion.span
          aria-hidden
          initial={reduce ? false : { opacity: 0 }}
          animate={play ? { opacity: 1 } : undefined}
          transition={{ duration: 0.5, ease: EASE, delay: play ? 0.55 : 0 }}
          className="hidden font-mono text-lg text-ink-3 md:block"
        >
          →
        </motion.span>

        {/* the assembled co-worker — settles mint */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          animate={play ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.6, ease: EASE, delay: play ? 0.7 : 0 }}
          className="glass-mint rounded-xl px-6 py-7 text-center"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mint">Co-worker</p>
          <p className="mt-2.5 font-serif text-display-2 leading-none text-ink">Karta-Cure</p>
          <p className="mt-3 max-w-[22ch] font-sans text-[12.5px] leading-relaxed text-ink-3">
            Six validated primitives, composed — not a line of new code.
          </p>
        </motion.div>
      </div>

      <p className="mt-7 border-t border-soft pt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
        Recompose to change what it does — no rebuild. Illustrative.
      </p>
    </div>
  )
}

/* ═══════════════════════════ 3 · The roster ════════════════════════════════ */
/* The eight co-workers as a scannable register. Two carry a gold operational-
   boundary caveat. Facts from the build contract; nothing invented. */

type CoWorker = {
  name: string
  group: string
  body: string
  caveat?: string
}

const ROSTER: CoWorker[] = [
  {
    name: 'Vox-Out',
    group: 'Voice',
    body:
      'Outbound voice across the lifecycle — acquisition, onboarding, servicing, collections, hardship, retention and cross-sell.',
  },
  {
    name: 'Vox-In',
    group: 'Voice',
    body:
      'Inbound voice — servicing and payment queries, disputes, hardship signposting, and warm transfer to humans.',
  },
  {
    name: 'Doc',
    group: 'Documents',
    body:
      'Documents and notices — arrears notices, restructuring offers, regulatory letters and payment confirmations.',
  },
  {
    name: 'Risk',
    group: 'Operational',
    body:
      'Operational risk segmentation and gating by external risk flags.',
    caveat: 'Not underwriting.',
  },
  {
    name: 'Decide',
    group: 'Operational',
    body:
      'Next-best-action and conflict resolution across competing strategies.',
    caveat: 'Not credit approval or pricing.',
  },
  {
    name: 'Cure',
    group: 'Journeys',
    body:
      'Delinquency cure — orchestrates multi-step journeys to bring borrowers back to good standing.',
  },
  {
    name: 'Audit',
    group: 'Oversight',
    body:
      'Interaction review, pattern detection and anomaly surfacing for compliance and audit teams.',
  },
  {
    name: 'Report',
    group: 'Oversight',
    body:
      'Operational reporting, aggregated for ops, risk, compliance and executive stakeholders.',
  },
]

export function Roster() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {ROSTER.map((c) => (
        <li key={c.name}>
          <RosterRow co={c} />
        </li>
      ))}
    </ul>
  )
}

function RosterRow({ co }: { co: CoWorker }) {
  return (
    <div className="glass-quiet h-full p-5 md:p-6">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-serif text-display-2 leading-tight text-ink">
          <span className="text-ink-3">Karta-</span>
          {co.name}
        </span>
        <span className="shrink-0 font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-3">
          {co.group}
        </span>
      </div>
      <p className="mt-2.5 font-sans text-[13.5px] leading-relaxed text-ink-2">{co.body}</p>
      {co.caveat && (
        <p className="mt-3 inline-flex items-center gap-2 rounded border border-[rgba(200,161,74,0.32)] bg-[rgba(200,161,74,0.05)] px-2.5 py-1">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
          <span className="font-mono text-eyebrow uppercase text-gold">
            {co.caveat}
          </span>
        </p>
      )}
    </div>
  )
}

/* ═══════════════════════════ 4 · The autonomy dial ═════════════════════════ */
/* The page's signature interactive device. Four stops along a dial; selecting
   one slides the indicator and redraws a small who-acts diagram — the balance
   of machine and human shifting from hands-off to hands-on. Accessible: a real
   radiogroup, arrow-key navigable. */

type Mode = {
  key: string
  label: string
  short: string
  /** machine share, 0..1 — drives the who-acts split bar */
  machine: number
  who: string
  desc: string
}

const MODES: Mode[] = [
  {
    key: 'auto',
    label: 'Fully autonomous',
    short: 'Autonomous',
    machine: 1,
    who: 'Karta acts',
    desc:
      'The co-worker runs the workflow end to end. People are notified, and every action is logged for review.',
  },
  {
    key: 'oversight',
    label: 'With oversight',
    short: 'Oversight',
    machine: 0.75,
    who: 'Karta acts · a person spot-checks',
    desc:
      'The co-worker runs the workflow; a reviewer samples and can intervene. Exceptions route to a person automatically.',
  },
  {
    key: 'copilot',
    label: 'As a copilot',
    short: 'Copilot',
    machine: 0.45,
    who: 'A person acts · Karta assists',
    desc:
      'A person leads. The co-worker drafts the next action, surfaces context and handles the busywork beside them.',
  },
  {
    key: 'hitl',
    label: 'Human-in-the-loop',
    short: 'Human-in-the-loop',
    machine: 0.2,
    who: 'A person approves every step',
    desc:
      'The co-worker proposes; nothing executes until a person approves it. The tightest setting on the dial.',
  },
]

export function AutonomyDial() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const groupId = useId()
  const active = MODES[i]

  const move = (delta: number) =>
    setI((prev) => Math.min(MODES.length - 1, Math.max(0, prev + delta)))

  const settle: Transition = reduce
    ? { duration: 0 }
    : { duration: 0.45, ease: EASE }

  return (
    <div className="glass overflow-hidden p-6 md:p-9">
      <div className="grid gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        {/* ── the dial ── */}
        <div>
          <p
            id={`${groupId}-label`}
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3"
          >
            Autonomy dial · set per workflow, segment, risk band
          </p>

          {/* the rail */}
          <div className="relative mt-7 pb-1">
            <div className="absolute left-0 right-0 top-[9px] h-px bg-gradient-to-r from-mint/45 via-cyan/35 to-white/15" />
            <div
              role="radiogroup"
              aria-labelledby={`${groupId}-label`}
              className="relative flex items-start justify-between"
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                  e.preventDefault()
                  move(1)
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                  e.preventDefault()
                  move(-1)
                }
              }}
            >
              {MODES.map((m, idx) => {
                const on = idx === i
                return (
                  <button
                    key={m.key}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setI(idx)}
                    className="group flex basis-0 flex-1 flex-col items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                  >
                    {/* stop marker */}
                    <span className="relative grid h-[18px] w-[18px] place-items-center">
                      {on && (
                        <motion.span
                          layoutId={reduce ? undefined : `${groupId}-halo`}
                          className="absolute inset-0 rounded-full"
                          style={{ border: `1px solid ${MINT}`, opacity: 0.55 }}
                          transition={settle}
                        />
                      )}
                      <span
                        className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                          on
                            ? 'bg-mint'
                            : 'bg-ink-3/70 group-hover:bg-ink-2'
                        }`}
                        style={on ? { boxShadow: '0 0 8px rgba(0,255,178,0.55)' } : undefined}
                      />
                    </span>
                    {/* stop label */}
                    <span
                      className={`mt-3 max-w-[12ch] text-center font-mono text-[10.5px] uppercase leading-tight tracking-[0.08em] transition-colors duration-300 ${
                        on ? 'text-mint' : 'text-ink-3 group-hover:text-ink-2'
                      }`}
                    >
                      {m.short}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
            Hands-off
            <span className="float-right">Hands-on</span>
          </p>
        </div>

        {/* ── the who-acts diagram + description ── */}
        <div className="rounded-xl border border-soft bg-white/[0.015] p-6 md:p-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">Who acts</p>

          {/* the split bar: machine share vs human share */}
          <div className="mt-4">
            <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-white/[0.04]">
              <motion.span
                className="block h-full"
                style={{ background: `linear-gradient(90deg, ${MINT}, ${CYAN})` }}
                initial={false}
                animate={{ width: `${active.machine * 100}%` }}
                transition={settle}
              />
              <span className="block h-full flex-1 bg-white/[0.07]" />
            </div>
            <div className="mt-2.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em]">
              <span className="text-mint">Karta</span>
              <span className="text-ink-3">Your people</span>
            </div>
          </div>

          {/* the who-acts line, re-stated in words */}
          <motion.p
            key={active.key}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={settle}
            className="mt-6 font-serif text-display-2 leading-snug text-ink"
          >
            {active.who}
          </motion.p>
          <motion.p
            key={`${active.key}-d`}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...settle, delay: reduce ? 0 : 0.06 }}
            className="mt-3 font-sans text-[14px] leading-relaxed text-ink-2"
          >
            {active.desc}
          </motion.p>

          <p className="mt-6 border-t border-soft pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
            {active.label} · move along the dial as confidence grows
          </p>
        </div>
      </div>
    </div>
  )
}
