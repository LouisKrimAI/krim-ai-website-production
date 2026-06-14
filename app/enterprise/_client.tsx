'use client'

/**
 * /enterprise — the animated pieces. Every device is GPU-only (opacity ·
 * transform · colour) and reduced-motion-safe: useReducedMotion settles each to
 * its final, meaningful state instantly, with no CLS — every device reserves its
 * space.
 *
 *   HeroFrame    — § 1: the enterprise.png domain image held inside a fine glass
 *                  frame; a hairline edge draws itself in once — the single layer
 *                  that closes over the estate.
 *   Unification  — § 1, THE SIGNATURE DEVICE: a field of scattered system-nodes,
 *                  each adrift on its own, drawn together onto one coherent line —
 *                  fragmentation resolving into one stack. The nodes settle from
 *                  ink-3 to cyan as they align, then the unified bar seals mint.
 *                  Reused, pre-settled, as the spine of the "Why Krim" cards.
 *
 * Grammar: cyan = proposed/thinking · mint = validated · gold = exception.
 */

import { useRef } from 'react'
import Image from 'next/image'
import {
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
const INK3 = '#828791'

/* ═══════════════════════════ 1 · Hero frame ════════════════════════════════ */
/* The domain image, held inside a fine glass frame whose hairline edge draws
   itself in once — the single layer closing over the estate. Still, not flashy. */

export function HeroFrame() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4, margin: VIEW_MARGIN })
  const play = inView && !reduce

  return (
    <div ref={ref} className="relative">
      <div className="glass overflow-hidden p-2.5 md:p-3">
        <div className="relative overflow-hidden rounded-[12px]">
          <Image
            src="/images/domains/enterprise.png"
            alt="A dark, abstract field of system towers and a connecting grid drawing together into one coherent layer."
            width={896}
            height={1200}
            priority
            sizes="(min-width: 1024px) 42vw, 90vw"
            className="h-auto w-full select-none"
          />
          {/* a soft floor wash so the image settles into the canvas */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(9,9,12,0) 50%, rgba(9,9,12,0.46) 100%)',
            }}
          />
          {/* the drawn edge — a hairline tracing the frame once: one layer over all */}
          <svg
            aria-hidden
            viewBox="0 0 100 134"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <m.rect
              x="2.2"
              y="2.2"
              width="95.6"
              height="129.6"
              rx="3"
              fill="none"
              stroke={MINT}
              strokeWidth="0.5"
              strokeOpacity="0.5"
              initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
              animate={play ? { pathLength: 1 } : reduce ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.8, ease: EASE }}
            />
          </svg>
        </div>
      </div>
      <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
        One layer, closing over the estate
      </p>
    </div>
  )
}

/* ═══════════════════════════ 2 · Unification ═══════════════════════════════ */
/* THE SIGNATURE DEVICE. A field of scattered system-nodes, each adrift, is drawn
   together onto one coherent line: fragmentation resolving into one stack. The
   nodes drift in from their own positions, settle onto the spine and turn from
   ink-3 to cyan as they align, then the unified bar seals mint — validated, one.

   `settled` renders the resolved end-state directly (no motion) so the same
   device can sit beneath the "Why Krim" cards as a quiet, finished motif. */

// scattered start positions (viewBox 0..200 × 0..120) → all resolve onto y=60,
// evenly spaced across x. Hand-placed to read as genuine disorder, not a grid.
const NODES = [
  { sx: 18, sy: 22 },
  { sx: 52, sy: 96 },
  { sx: 33, sy: 64 },
  { sx: 88, sy: 14 },
  { sx: 121, sy: 102 },
  { sx: 76, sy: 78 },
  { sx: 154, sy: 30 },
  { sx: 169, sy: 88 },
  { sx: 138, sy: 52 },
  { sx: 184, sy: 18 },
]
const COUNT = NODES.length
const SPINE_X0 = 16
const SPINE_X1 = 184
const SPINE_Y = 60
const slotX = (i: number) => SPINE_X0 + (i / (COUNT - 1)) * (SPINE_X1 - SPINE_X0)

export function Unification({ settled = false }: { settled?: boolean }) {
  const reduce = useReducedMotion()
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5, margin: VIEW_MARGIN })
  // settled / reduced motion both show the resolved end-state with no animation
  const resolved = settled || reduce
  const play = inView && !resolved

  // moment the unified bar seals mint, after the nodes have aligned
  const seal = 1.5
  const settle: Transition = { duration: 0.55, ease: EASE }

  return (
    <LazyMotion features={domAnimation}>
      <svg
        ref={ref}
        viewBox="0 0 200 120"
        className="w-full"
        fill="none"
        aria-label="Scattered system-nodes drawing together into one coherent layer — fragmentation resolving into one stack."
        role="img"
      >
        {/* the unified spine — drawn under the nodes once they have aligned */}
        <line
          x1={SPINE_X0}
          y1={SPINE_Y}
          x2={SPINE_X1}
          y2={SPINE_Y}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
        <m.line
          x1={SPINE_X0}
          y1={SPINE_Y}
          x2={SPINE_X1}
          y2={SPINE_Y}
          stroke={MINT}
          strokeWidth="1.4"
          strokeLinecap="round"
          initial={resolved ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0.6 }}
          animate={play ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ pathLength: { duration: 0.9, ease: EASE, delay: 1.0 }, opacity: settle }}
        />

        {/* the system-nodes — adrift, then drawn onto the spine */}
        {NODES.map((n, i) => {
          const tx = slotX(i)
          return (
            <m.circle
              key={i}
              r="4"
              cx={resolved ? tx : n.sx}
              cy={resolved ? SPINE_Y : n.sy}
              fill={resolved ? 'rgba(0,255,178,0.16)' : 'rgba(255,255,255,0.05)'}
              stroke={resolved ? MINT : INK3}
              strokeWidth="1.1"
              initial={
                resolved
                  ? false
                  : { cx: n.sx, cy: n.sy, fill: 'rgba(255,255,255,0.05)', stroke: INK3 }
              }
              animate={
                play
                  ? {
                      cx: tx,
                      cy: SPINE_Y,
                      stroke: [INK3, CYAN, MINT],
                      fill: [
                        'rgba(255,255,255,0.05)',
                        'rgba(57,214,255,0.16)',
                        'rgba(0,255,178,0.16)',
                      ],
                    }
                  : undefined
              }
              transition={{
                cx: { duration: 1.0, ease: EASE, delay: 0.1 + i * 0.05 },
                cy: { duration: 1.0, ease: EASE, delay: 0.1 + i * 0.05 },
                stroke: { duration: 1.1, ease: EASE, delay: 0.1 + i * 0.05, times: [0, 0.55, 1] },
                fill: { duration: 1.1, ease: EASE, delay: 0.1 + i * 0.05, times: [0, 0.55, 1] },
              }}
              style={{ willChange: 'transform' }}
            />
          )
        })}

        {/* the seal — a soft mint glow blooming along the unified bar */}
        {!resolved && (
          <m.rect
            x={SPINE_X0}
            y={SPINE_Y - 9}
            width={SPINE_X1 - SPINE_X0}
            height="18"
            rx="9"
            fill={MINT}
            initial={{ opacity: 0 }}
            animate={play ? { opacity: [0, 0.1, 0] } : undefined}
            transition={{ duration: 0.9, ease: EASE, delay: seal, times: [0, 0.4, 1] }}
            style={{ filter: 'blur(6px)' }}
          />
        )}
      </svg>
    </LazyMotion>
  )
}
