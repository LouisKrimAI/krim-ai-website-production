'use client'

/**
 * Kendra — the animated pieces. Five client components, all whileInView /
 * once, all GPU-only (opacity · transform · colour) and reduced-motion-safe:
 * useReducedMotion settles each to its final, meaningful state instantly.
 *
 *   OrbBrainCard    — the hero's verbatim card; the two power-names settle in.
 *   LoopFlow        — the five-step path; an action clears the Validate gate,
 *                     cyan resolving to mint. (signature)
 *   ValidationGate  — three families check an action; pass glows mint, one
 *                     amber peels off to an exception lane. (signature)
 *   WorldModelField — a point field that accrues + a rising curve. (signature)
 *   LedgerStreams   — one sealed record, three streams flowing out. (signature)
 *
 * Grammar: cyan = proposed/thinking · mint = validated/learned · gold = amber.
 */

import { useRef } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  type Transition,
} from 'framer-motion'

// ---- shared motion language -------------------------------------------------

const EASE = [0.16, 1, 0.3, 1] as const
const VIEW_MARGIN = '-12% 0px -12% 0px'

const MINT = '#00FFB2'
const CYAN = '#39D6FF'
const GOLD = '#C8A14A'
const INK3 = '#828791'
const LINE = 'rgba(255,255,255,0.13)'

// =============================================================================
// OrbBrainCard — hero verbatim card; the two power-names emerge as it settles
// =============================================================================

export function OrbBrainCard() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })

  const nameT: Transition = { duration: 0.55, ease: EASE }

  return (
    <div ref={ref} className="glass max-w-[440px] p-7 md:p-8">
      <p className="font-serif text-[clamp(1.35rem,2.4vw,1.7rem)] leading-tight text-ink">
        Validated before it acts.
        <br />
        Smarter after it acts.
      </p>
      <div className="mt-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em]">
        <motion.span
          initial={reduce ? false : { opacity: 0, y: 4 }}
          animate={inView || reduce ? { opacity: 1, y: 0 } : undefined}
          transition={{ ...nameT, delay: reduce ? 0 : 0.15 }}
          style={{ color: CYAN }}
        >
          Krim-Nyāya
        </motion.span>
        <span className="text-ink-3" aria-hidden>
          ·
        </span>
        <motion.span
          initial={reduce ? false : { opacity: 0, y: 4 }}
          animate={inView || reduce ? { opacity: 1, y: 0 } : undefined}
          transition={{ ...nameT, delay: reduce ? 0 : 0.3 }}
          style={{ color: MINT }}
        >
          Krim-Learn
        </motion.span>
      </div>
    </div>
  )
}

// =============================================================================
// LoopFlow — Perceive · Reason · Plan · Validate · Act. An action travels the
// path and clears the luminous Validate gate; cyan resolves to mint. Signature.
// =============================================================================

const LOOP_STEPS = ['Perceive', 'Reason', 'Plan', 'Validate', 'Act'] as const
// x-centres on a 0..1000 viewBox, evenly spaced
const LOOP_X = [110, 305, 500, 695, 890]
const GATE_I = 3 // Validate

export function LoopFlow() {
  const reduce = useReducedMotion()
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5, margin: VIEW_MARGIN })
  const play = inView && !reduce

  // travelling token: cyan until it reaches the gate, mint after
  const gateX = LOOP_X[GATE_I]
  return (
    <div className="glass overflow-hidden p-6 md:p-8">
      <svg
        ref={ref}
        viewBox="0 0 1000 180"
        className="w-full"
        role="img"
        aria-label="The action loop: Perceive, Reason, Plan, Validate, Act — the action clears the Validate gate."
      >
        {/* the rail */}
        <line x1={LOOP_X[0]} y1="70" x2={LOOP_X[4]} y2="70" stroke={LINE} strokeWidth="1" />

        {/* progress overlay — cyan up to the gate, mint past it */}
        <motion.line
          x1={LOOP_X[0]}
          y1="70"
          x2={gateX}
          y2="70"
          stroke={CYAN}
          strokeWidth="1.4"
          strokeOpacity="0.55"
          initial={reduce ? false : { pathLength: 0 }}
          animate={play ? { pathLength: 1 } : reduce ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.2, ease: 'linear' }}
        />
        <motion.line
          x1={gateX}
          y1="70"
          x2={LOOP_X[4]}
          y2="70"
          stroke={MINT}
          strokeWidth="1.4"
          strokeOpacity="0.6"
          initial={reduce ? false : { pathLength: 0 }}
          animate={play ? { pathLength: 1 } : reduce ? { pathLength: 1 } : undefined}
          transition={{ duration: 0.9, ease: 'linear', delay: play ? 1.25 : 0 }}
        />

        {/* the gate — a luminous frame the others lead into */}
        <g>
          <motion.rect
            x={gateX - 34}
            y="32"
            width="68"
            height="76"
            rx="8"
            fill="none"
            stroke={MINT}
            strokeWidth="1.1"
            initial={reduce ? { strokeOpacity: 0.5 } : { strokeOpacity: 0.22 }}
            animate={
              play
                ? { strokeOpacity: [0.22, 0.85, 0.4] }
                : reduce
                ? { strokeOpacity: 0.5 }
                : undefined
            }
            transition={{ duration: 0.9, ease: EASE, delay: play ? 1.05 : 0 }}
          />
          <rect
            x={gateX - 34}
            y="32"
            width="68"
            height="76"
            rx="8"
            fill={MINT}
            fillOpacity="0.04"
          />
        </g>

        {/* nodes + labels */}
        {LOOP_STEPS.map((label, i) => {
          const x = LOOP_X[i]
          const isGate = i === GATE_I
          const settled = isGate ? MINT : INK3
          return (
            <g key={label}>
              <motion.circle
                cx={x}
                cy="70"
                r={isGate ? 5 : 3.5}
                fill={settled}
                initial={reduce ? false : { opacity: 0 }}
                animate={play ? { opacity: 1 } : reduce ? { opacity: 1 } : undefined}
                transition={{ duration: 0.4, ease: EASE, delay: play ? 0.1 + i * 0.12 : 0 }}
              />
              <motion.text
                x={x}
                y="132"
                textAnchor="middle"
                fontSize="13"
                fontFamily="var(--font-mono)"
                letterSpacing="0.04em"
                fill={isGate ? MINT : 'var(--text-2)'}
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={
                  play ? { opacity: 1, y: 0 } : reduce ? { opacity: 1, y: 0 } : undefined
                }
                transition={{ duration: 0.5, ease: EASE, delay: play ? 0.1 + i * 0.12 : 0 }}
              >
                {label}
              </motion.text>
              {isGate && (
                <text
                  x={x}
                  y="152"
                  textAnchor="middle"
                  fontSize="10"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.14em"
                  fill={INK3}
                >
                  THE GATE
                </text>
              )}
            </g>
          )
        })}

        {/* the travelling action token */}
        {!reduce && (
          <motion.circle
            r="6"
            cy="70"
            fill={CYAN}
            initial={{ cx: LOOP_X[0], opacity: 0 }}
            animate={
              play
                ? {
                    cx: LOOP_X,
                    fill: [CYAN, CYAN, CYAN, CYAN, MINT],
                    opacity: [0, 1, 1, 1, 1],
                  }
                : undefined
            }
            transition={{ duration: 2.1, ease: EASE, times: [0, 0.25, 0.5, 0.62, 1] }}
            style={{ filter: 'drop-shadow(0 0 6px rgba(0,255,178,0.5))' }}
          />
        )}
      </svg>
    </div>
  )
}

// =============================================================================
// ValidationGate — the page's most important moment. An action approaches the
// gate; the three families check it in turn (pass glows mint); an amber one
// peels off to an exception lane handed to a person. Signature.
// =============================================================================

const GATE_FAMILIES = [
  { name: 'Pramāṇa', q: 'grounded?' },
  { name: 'Doṣa', q: 'sound?' },
  { name: 'Yogyatā', q: 'fit?' },
]

export function ValidationGate() {
  const reduce = useReducedMotion()
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4, margin: VIEW_MARGIN })
  const play = inView && !reduce

  // three lanes; the third family flags amber and the token peels to exception
  const laneY = [56, 96, 136]
  const checkX = [330, 520, 710]
  const exceptionY = 200

  return (
    <div className="glass overflow-hidden p-6 md:p-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
          Watch it refuse
        </p>
        <div className="flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.12em]">
          <span className="flex items-center gap-1.5 text-pass">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-pass" /> pass
          </span>
          <span className="flex items-center gap-1.5 text-amber">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber" /> amber
          </span>
        </div>
      </div>

      <svg
        ref={ref}
        viewBox="0 0 920 260"
        className="w-full"
        role="img"
        aria-label="An action is checked by three validator families; two pass to mint, the third flags amber and peels off to an exception lane handed to a person."
      >
        {/* incoming action */}
        <text
          x="60"
          y="100"
          textAnchor="middle"
          fontSize="11"
          fontFamily="var(--font-mono)"
          letterSpacing="0.1em"
          fill={INK3}
        >
          ACTION
        </text>
        <line x1="60" y1="112" x2="60" y2="184" stroke={LINE} strokeWidth="1" />

        {/* the three family checkpoints */}
        {GATE_FAMILIES.map((f, i) => {
          const isAmber = i === 2
          const cx = checkX[i]
          const colour = isAmber ? GOLD : MINT
          return (
            <g key={f.name}>
              {/* lane line into the gate */}
              <line
                x1="60"
                y1="96"
                x2={cx}
                y2="96"
                stroke={LINE}
                strokeWidth="1"
                strokeDasharray="2 4"
              />
              {/* checkpoint marker */}
              <motion.circle
                cx={cx}
                cy="96"
                r="6"
                fill="none"
                stroke={colour}
                strokeWidth="1.4"
                initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.6 }}
                animate={
                  play
                    ? { opacity: 1, scale: 1 }
                    : reduce
                    ? { opacity: 1, scale: 1 }
                    : undefined
                }
                transition={{ duration: 0.4, ease: EASE, delay: play ? 0.6 + i * 0.5 : 0 }}
                style={{ transformOrigin: `${cx}px 96px` }}
              />
              <motion.circle
                cx={cx}
                cy="96"
                r="2.5"
                fill={colour}
                initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                animate={play ? { opacity: 1 } : reduce ? { opacity: 1 } : undefined}
                transition={{ duration: 0.3, ease: EASE, delay: play ? 0.7 + i * 0.5 : 0 }}
              />
              {/* family label */}
              <text
                x={cx}
                y="68"
                textAnchor="middle"
                fontSize="13"
                fontFamily="var(--font-serif)"
                fill={isAmber ? GOLD : 'var(--text)'}
              >
                {f.name}
              </text>
              <text
                x={cx}
                y="124"
                textAnchor="middle"
                fontSize="10.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.04em"
                fill={INK3}
              >
                {f.q}
              </text>
            </g>
          )
        })}

        {/* pass rail continues to mint "executes"; exception lane drops to person */}
        <line x1={checkX[2]} y1="96" x2="820" y2="96" stroke={LINE} strokeWidth="1" />

        {/* mint outcome */}
        <motion.g
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={play ? { opacity: 1 } : reduce ? { opacity: 1 } : undefined}
          transition={{ duration: 0.5, ease: EASE, delay: play ? 2.0 : 0 }}
        >
          <circle cx="850" cy="96" r="4" fill={MINT} style={{ filter: 'drop-shadow(0 0 6px rgba(0,255,178,0.5))' }} />
          <text x="850" y="74" textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.1em" fill={MINT}>
            EXECUTES
          </text>
        </motion.g>

        {/* exception lane — peels down from the amber checkpoint */}
        <motion.path
          d={`M ${checkX[2]} 96 C ${checkX[2] + 70} 96, 760 ${exceptionY}, 830 ${exceptionY}`}
          fill="none"
          stroke={GOLD}
          strokeWidth="1.4"
          strokeOpacity="0.6"
          initial={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          animate={
            play
              ? { pathLength: 1, opacity: 1 }
              : reduce
              ? { pathLength: 1, opacity: 1 }
              : undefined
          }
          transition={{ duration: 0.8, ease: EASE, delay: play ? 1.75 : 0 }}
        />
        <motion.g
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={play ? { opacity: 1 } : reduce ? { opacity: 1 } : undefined}
          transition={{ duration: 0.5, ease: EASE, delay: play ? 2.3 : 0 }}
        >
          <circle cx="850" cy={exceptionY} r="4" fill={GOLD} />
          <text x="838" y={exceptionY - 14} textAnchor="end" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.1em" fill={GOLD}>
            FLAGGED — TO A PERSON
          </text>
        </motion.g>

        {/* the travelling token: rides the rail, then peels to the exception lane */}
        {!reduce && (
          <motion.circle
            r="5.5"
            fill={CYAN}
            initial={{ cx: 60, cy: 96, opacity: 0 }}
            animate={
              play
                ? {
                    cx: [60, checkX[0], checkX[1], checkX[2], 830],
                    cy: [96, 96, 96, 96, exceptionY],
                    fill: [CYAN, MINT, MINT, GOLD, GOLD],
                    opacity: [0, 1, 1, 1, 1],
                  }
                : undefined
            }
            transition={{ duration: 2.7, ease: EASE, times: [0, 0.28, 0.5, 0.72, 1] }}
            style={{ filter: 'drop-shadow(0 0 5px rgba(0,255,178,0.4))' }}
          />
        )}
      </svg>

      <p className="mt-5 font-sans text-[13.5px] leading-relaxed text-ink-2">
        Two families pass, one flags amber — so the action waits, with the rule that stopped it and
        the reason in plain words, handed to a person.
      </p>
    </div>
  )
}

// =============================================================================
// WorldModelField — a point field that accrues (points connect, brighten) as
// actions feed it, paired with a rising curve. Accrual, not fireworks. Signature.
// =============================================================================

// a small, hand-placed scatter so it reads as structure, not noise
const FIELD_POINTS = [
  [40, 120], [92, 64], [120, 150], [168, 96], [210, 48],
  [232, 138], [276, 84], [300, 168], [344, 116], [372, 56],
  [60, 188], [148, 196], [256, 196], [330, 200], [196, 154],
]
// the few connections that "snap in" as the model enriches
const FIELD_LINKS: [number, number][] = [
  [1, 3], [3, 4], [3, 6], [6, 9], [6, 8], [8, 5], [0, 2], [2, 14], [14, 7], [7, 8],
]

export function WorldModelField() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4, margin: VIEW_MARGIN })
  const play = inView && !reduce

  // rising curve points (a calm accrual, not a hockey stick)
  const curve = 'M 12 156 C 70 150, 120 132, 170 110 S 280 60, 340 30'

  const pointT = (i: number): Transition => ({
    duration: 0.5,
    ease: EASE,
    delay: play ? 0.1 + (i % 6) * 0.08 : 0,
  })

  return (
    <div ref={ref} className="glass p-6 md:p-7">
      {/* the field */}
      <svg
        viewBox="0 0 400 220"
        className="w-full"
        role="img"
        aria-label="A model of the operation that enriches as actions feed it: points connect and brighten over time."
      >
        {/* links snap in after the points */}
        {FIELD_LINKS.map(([a, b], i) => {
          const [x1, y1] = FIELD_POINTS[a]
          const [x2, y2] = FIELD_POINTS[b]
          return (
            <motion.line
              key={`l-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={MINT}
              strokeWidth="1"
              strokeOpacity="0.28"
              initial={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              animate={
                play
                  ? { pathLength: 1, opacity: 1 }
                  : reduce
                  ? { pathLength: 1, opacity: 1 }
                  : undefined
              }
              transition={{ duration: 0.7, ease: EASE, delay: play ? 0.7 + i * 0.07 : 0 }}
            />
          )
        })}
        {/* points brighten as they "accrue" */}
        {FIELD_POINTS.map(([x, y], i) => (
          <motion.circle
            key={`p-${i}`}
            cx={x}
            cy={y}
            r="2.6"
            fill={i % 4 === 0 ? MINT : CYAN}
            initial={reduce ? { opacity: 0.85, scale: 1 } : { opacity: 0, scale: 0.5 }}
            animate={
              play
                ? { opacity: i % 4 === 0 ? 0.95 : 0.6, scale: 1 }
                : reduce
                ? { opacity: 0.8, scale: 1 }
                : undefined
            }
            transition={pointT(i)}
            style={{ transformOrigin: `${x}px ${y}px` }}
          />
        ))}
      </svg>

      {/* the rising curve, in its own framed band */}
      <div className="mt-5 border-t border-soft pt-5">
        <svg
          viewBox="0 0 360 170"
          className="w-full"
          role="img"
          aria-label="A rising curve: a baseline in quarter one, measurably better by quarter two, materially beyond by year two."
        >
          {/* baseline */}
          <line x1="12" y1="156" x2="348" y2="156" stroke={LINE} strokeWidth="1" />
          <motion.path
            d={curve}
            fill="none"
            stroke={MINT}
            strokeWidth="1.6"
            initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
            animate={play ? { pathLength: 1 } : reduce ? { pathLength: 1 } : undefined}
            transition={{ duration: 1.6, ease: EASE, delay: play ? 0.4 : 0 }}
            style={{ filter: 'drop-shadow(0 0 6px rgba(0,255,178,0.28))' }}
          />
          {/* quarter markers */}
          {[
            { x: 12, y: 156, t: 'Q1 · baseline' },
            { x: 170, y: 110, t: 'Q2 · better' },
            { x: 340, y: 30, t: 'Y2 · beyond' },
          ].map((m, i) => (
            <motion.g
              key={m.t}
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              animate={play ? { opacity: 1 } : reduce ? { opacity: 1 } : undefined}
              transition={{ duration: 0.5, ease: EASE, delay: play ? 0.8 + i * 0.45 : 0 }}
            >
              <circle cx={m.x} cy={m.y} r="3.2" fill={MINT} />
              <text
                x={i === 2 ? m.x - 6 : m.x + 6}
                y={i === 0 ? m.y - 10 : m.y - 8}
                textAnchor={i === 2 ? 'end' : 'start'}
                fontSize="10.5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.04em"
                fill={INK3}
              >
                {m.t}
              </text>
            </motion.g>
          ))}
        </svg>
        <p className="mt-4 font-sans text-[13.5px] leading-relaxed text-ink-2">
          Quarter one, a baseline. Quarter two, measurably better. By year two, materially beyond
          where it began.
        </p>
      </div>
    </div>
  )
}

// =============================================================================
// LedgerStreams — one sealed record at the centre; three streams flow out
// (evidence · intelligence · meter). The elegance is the single source. Signature.
// =============================================================================

type Job = { name: string; body: string }

export function LedgerStreams({ jobs }: { jobs: Job[] }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4, margin: VIEW_MARGIN })
  const play = inView && !reduce

  // stream endpoints on the right; the sealed record sits at the left-centre
  const recordX = 150
  const recordY = 150
  const targets = [
    { y: 56, name: jobs[0]?.name ?? 'Evidence' },
    { y: 150, name: jobs[1]?.name ?? 'Intelligence' },
    { y: 244, name: jobs[2]?.name ?? 'Meter' },
  ]
  const endX = 540

  const streamPath = (y: number) =>
    `M ${recordX} ${recordY} C ${recordX + 130} ${recordY}, ${endX - 150} ${y}, ${endX} ${y}`

  return (
    <div ref={ref} className="glass overflow-hidden p-6 md:p-8">
      <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_1fr]">
        <svg
          viewBox="0 0 600 300"
          className="w-full"
          role="img"
          aria-label="One sealed, immutable record at the centre; three streams flow out of it — evidence, intelligence and meter."
        >
          {/* the three streams */}
          {targets.map((t, i) => (
            <g key={t.name}>
              <motion.path
                d={streamPath(t.y)}
                fill="none"
                stroke={i === 1 ? MINT : 'rgba(255,255,255,0.3)'}
                strokeWidth="1.3"
                strokeOpacity={i === 1 ? 0.7 : 0.5}
                initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                animate={play ? { pathLength: 1 } : reduce ? { pathLength: 1 } : undefined}
                transition={{ duration: 1.1, ease: EASE, delay: play ? 0.6 + i * 0.18 : 0 }}
              />
              {/* travelling pulse along each stream */}
              {!reduce && play && (
                <motion.circle
                  r="3"
                  fill={i === 1 ? MINT : INK3}
                  initial={{ offsetDistance: '0%', opacity: 0 }}
                  animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.4, ease: 'linear', delay: 1.4 + i * 0.18 }}
                  style={{ offsetPath: `path("${streamPath(t.y)}")`, offsetRotate: '0deg' }}
                />
              )}
              <motion.g
                initial={reduce ? { opacity: 1 } : { opacity: 0, x: -6 }}
                animate={
                  play ? { opacity: 1, x: 0 } : reduce ? { opacity: 1, x: 0 } : undefined
                }
                transition={{ duration: 0.5, ease: EASE, delay: play ? 1.0 + i * 0.18 : 0 }}
              >
                <circle cx={endX} cy={t.y} r="4" fill={i === 1 ? MINT : 'var(--text-2)'} />
                <text
                  x={endX + 12}
                  y={t.y + 4}
                  fontSize="13.5"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.06em"
                  fill={i === 1 ? MINT : 'var(--text-2)'}
                >
                  {t.name}
                </text>
              </motion.g>
            </g>
          ))}

          {/* the sealed record at the centre */}
          <motion.g
            initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            animate={
              play ? { opacity: 1, scale: 1 } : reduce ? { opacity: 1, scale: 1 } : undefined
            }
            transition={{ duration: 0.6, ease: EASE }}
            style={{ transformOrigin: `${recordX}px ${recordY}px` }}
          >
            <rect
              x={recordX - 46}
              y={recordY - 54}
              width="92"
              height="108"
              rx="8"
              fill="rgba(0,255,178,0.05)"
              stroke={MINT}
              strokeWidth="1.1"
              strokeOpacity="0.55"
            />
            {/* the "sealed" ledger lines */}
            {[-30, -16, -2, 12, 26].map((dy, i) => (
              <line
                key={i}
                x1={recordX - 30}
                y1={recordY + dy}
                x2={recordX + (i === 4 ? 14 : 30)}
                y2={recordY + dy}
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1"
              />
            ))}
            <text
              x={recordX}
              y={recordY + 76}
              textAnchor="middle"
              fontSize="10.5"
              fontFamily="var(--font-mono)"
              letterSpacing="0.14em"
              fill={INK3}
            >
              SEALED RECORD
            </text>
          </motion.g>
        </svg>

        {/* the three jobs, in prose */}
        <ul className="space-y-5">
          {jobs.map((j, i) => (
            <motion.li
              key={j.name}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={
                play ? { opacity: 1, y: 0 } : reduce ? { opacity: 1, y: 0 } : undefined
              }
              transition={{ duration: 0.5, ease: EASE, delay: play ? 1.0 + i * 0.18 : 0 }}
            >
              <p className={`font-serif text-[1.15rem] leading-none ${i === 1 ? 'text-mint' : 'text-ink'}`}>
                {j.name}
              </p>
              <p className="mt-2 font-sans text-[14px] leading-relaxed text-ink-2">{j.body}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  )
}
