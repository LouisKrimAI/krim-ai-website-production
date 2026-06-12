'use client'

/**
 * HeroArrival — the signature moment (design-tokens.md hero timeline).
 *
 *   0.0–1.2s  orb appears full-screen centred on runtime-deep, animating
 *   1.2–2.0s  orb eases down to a single point — a pinhead
 *   2.0–2.2s  seamless handoff: the Krim mark emerges from that point,
 *             cyan resolving to mint (the ignition beat)
 *   2.2–3.8s  mark scales up from pinhead to full size, centred
 *   3.8–4.4s  mark translates + settles into the header slot
 *   4.4–5.0s  tagline + CTA rise; the gate artifact begins to live
 *
 * Once per session (sessionStorage). prefers-reduced-motion or repeat visit:
 * final state immediately. GPU transforms only; the header slot is laid out
 * from first paint (zero CLS — only opacity swaps at settle).
 *
 * Then the page develops downward into the light: the hero's foot is paper —
 * the cleared serif sentence + its ledger line, synced to the action that
 * just crossed the membrane.
 */

import { useEffect, useRef, useState } from 'react'
import { motion, useAnimate, AnimatePresence } from 'framer-motion'
import WaveOrb from './WaveOrb'

const EASE = [0.16, 1, 0.3, 1] as const

// ---------------------------------------------------------------------------
// The actions that cross the gate (krim-content.md primitives, three markets)
// ---------------------------------------------------------------------------
export const ACTIONS = [
  {
    proposed: 'MAKE_CALL · acct ··4421 · DPD 12 · US',
    checks: 'TCPA · HOURS · REG F · DNC',
    cleared: 'Call placed — within consent, within hours, within contact limits.',
    ledger: 'LN 205113 · 09:41:07 · MAKE_CALL · PASS · 142 KWU',
  },
  {
    proposed: 'GENERATE_NOTICE · arrears · UK',
    checks: 'CONSUMER DUTY · CONC 7.3 · TEMPLATE v41',
    cleared: 'Notice issued — Consumer Duty wording, correct version, on record.',
    ledger: 'LN 205114 · 09:41:09 · GENERATE_NOTICE · PASS · 36 KWU',
  },
  {
    proposed: 'PROCESS_PAYMENT · plan 3/6 · IN',
    checks: 'RBI FPC · MANDATE · AMOUNT MATCH',
    cleared: 'Payment processed — mandate verified, amount matched, receipted.',
    ledger: 'LN 205115 · 09:41:12 · PROCESS_PAYMENT · PASS · 18 KWU',
  },
] as const

// ---------------------------------------------------------------------------
// The Krim mark — inverted triangle + wordmark; stroke follows currentColor
// so the cyan→mint resolve is a single colour animation.
// ---------------------------------------------------------------------------
export function KrimMark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 48 44" fill="none" className="h-[1.55em] w-auto" aria-hidden>
        <path d="M4 4 H44 L24 40 Z" stroke="currentColor" strokeWidth="3.4" strokeLinejoin="round" />
        <circle cx="24" cy="17" r="2.6" fill="currentColor" />
      </svg>
      <span className="font-sans font-bold tracking-[0.34em] text-[1em] leading-none translate-y-[0.04em]">KRIM</span>
    </span>
  )
}

// ---------------------------------------------------------------------------
// The gate crossing — a proposed action travels the membrane, cyan → mint
// ---------------------------------------------------------------------------
function GateCrossing({ index, live }: { index: number; live: boolean }) {
  const a = ACTIONS[index]
  return (
    <div className="w-full max-w-[480px]" aria-label="A proposed action crossing pre-execution validation">
      <div className="relative grid grid-cols-[1fr_auto_1fr] items-stretch gap-0 min-h-[148px]">
        {/* proposed side */}
        <div className="pr-6 flex flex-col justify-center">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-rtext-3 mb-3">Proposed</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={`p-${index}`}
              initial={live ? { opacity: 0, x: -10 } : false}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <p className="font-mono text-[13px] leading-relaxed text-cyan">{a.proposed}</p>
              <p className="font-mono text-[10px] tracking-[0.08em] text-rtext-3 mt-2">{a.checks}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* the membrane */}
        <div className="relative w-px" aria-hidden>
          <div
            className="absolute inset-y-0 w-px"
            style={{
              background: 'linear-gradient(180deg, transparent, rgba(0,255,178,0.8) 30%, rgba(0,255,178,0.8) 70%, transparent)',
            }}
          />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-runtime-deep px-1.5 py-2 font-mono text-[9px] tracking-[0.26em] uppercase text-mint [writing-mode:vertical-rl]">
            Validate · 33
          </span>
          {live && (
            <motion.span
              key={`pulse-${index}`}
              className="absolute top-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full"
              initial={{ left: -190, background: '#39D6FF', opacity: 0 }}
              animate={{ left: 130, background: ['#39D6FF', '#39D6FF', '#00FFB2', '#00FFB2'], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.2, delay: 0.9, ease: 'easeInOut', times: [0, 0.45, 0.52, 1] }}
              aria-hidden
            />
          )}
        </div>

        {/* validated side */}
        <div className="pl-6 flex flex-col justify-center">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-rtext-3 mb-3">Validated</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={`v-${index}`}
              initial={live ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, delay: live ? 2.2 : 0 }}
            >
              <p className="font-mono text-[13px] text-mint">33 of 33 · pass</p>
              <p className="font-mono text-[10px] tracking-[0.08em] text-rtext-3 mt-2">→ cleared to the record ↓</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// ===========================================================================
export default function HeroArrival() {
  const [scope, animate] = useAnimate()
  // 'arriving' plays the 5s sequence; 'live' is the settled hero
  const [stage, setStage] = useState<'pending' | 'arriving' | 'live'>('pending')
  const [actionIdx, setActionIdx] = useState(0)
  const [arrived, setArrived] = useState(false) // true once mark sits in header
  const slotRef = useRef<HTMLDivElement>(null)
  const markRef = useRef<HTMLDivElement>(null)

  // decide once, on the client
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const seen = sessionStorage.getItem('krim-arrival') === '1'
    if (reduce || seen) {
      setStage('live'); setArrived(true)
    } else {
      setStage('arriving')
    }
  }, [])

  // the 5-second timeline
  useEffect(() => {
    if (stage !== 'arriving') return
    let cancelled = false
    sessionStorage.setItem('krim-arrival', '1')

    const run = async () => {
      // Phase 1 — orb arrives (0 → 1.2s)
      await animate('[data-orb]', { opacity: 1, scale: 1 }, { duration: 1.2, ease: EASE })
      if (cancelled) return
      // Phase 2 — orb eases to a pinhead (1.2 → 2.0s)
      await animate('[data-orb]', { scale: 0.012, opacity: 0.95 }, { duration: 0.8, ease: [0.65, 0, 0.35, 1] })
      if (cancelled) return
      // Phase 3+4 — handoff: mark emerges from the point, cyan→mint (2.0 → 3.8s)
      animate('[data-orb]', { opacity: 0 }, { duration: 0.25 })
      await animate(
        '[data-mark]',
        { opacity: 1, scale: 1, color: ['#39D6FF', '#39D6FF', '#00FFB2'] },
        { duration: 1.6, ease: EASE },
      )
      if (cancelled) return
      // Phase 5 — settle into the header slot (3.8 → 4.4s)
      const slot = slotRef.current?.getBoundingClientRect()
      const mark = markRef.current?.getBoundingClientRect()
      if (slot && mark) {
        const sc = slot.height / mark.height
        const dx = slot.left + slot.width / 2 - (mark.left + mark.width / 2)
        const dy = slot.top + slot.height / 2 - (mark.top + mark.height / 2)
        await animate('[data-mark]', { x: dx, y: dy, scale: sc }, { duration: 0.6, ease: [0.65, 0, 0.35, 1] })
      }
      if (cancelled) return
      setArrived(true)
      animate('[data-mark]', { opacity: 0 }, { duration: 0.12 })
      // Phase 6 — the page comes alive (4.4 → 5.0s)
      animate('[data-orb]', { opacity: 0.15, scale: 1 }, { duration: 1.4, ease: EASE })
      setStage('live')
    }
    run()
    return () => { cancelled = true }
  }, [stage, animate])

  // cycle the gate actions once live
  useEffect(() => {
    if (stage !== 'live') return
    const t = setInterval(() => setActionIdx((v) => (v + 1) % ACTIONS.length), 6400)
    return () => clearInterval(t)
  }, [stage])

  const live = stage === 'live'
  const a = ACTIONS[actionIdx]

  return (
    <section ref={scope} className="relative bg-runtime-deep overflow-hidden">
      {/* ---- header (laid out from first paint; logo slot swaps by opacity) ---- */}
      <header className="relative z-30 mx-auto max-w-site flex items-center justify-between px-6 md:px-10 h-16">
        <div ref={slotRef} className={`text-mint text-[15px] transition-opacity duration-150 ${arrived ? 'opacity-100' : 'opacity-0'}`}>
          <KrimMark />
        </div>
        <nav className={`hidden md:flex items-center gap-8 transition-opacity duration-700 ${live ? 'opacity-100' : 'opacity-0'}`} aria-hidden={!live}>
          {([['The runtime', '#runtime'], ['Epistemic AI', '#epistemic'], ['The record', '#record'], ['Trust', '#pilot']] as const).map(([l, href]) => (
            <a key={l} href={href} className="font-mono text-[11px] tracking-[0.18em] uppercase text-rtext-2 hover:text-mint transition-colors">{l}</a>
          ))}
          <a href="#pilot" className="font-sans text-[13px] font-medium px-4 py-2 bg-mint text-mint-on hover:-translate-y-px transition-transform">
            Request a pilot
          </a>
        </nav>
      </header>

      {/* ---- the arrival stage ---- */}
      <div className="relative mx-auto max-w-site px-6 md:px-10">
        {/* orb — full-bleed behind, centred on the stage */}
        <div
          data-orb
          className="pointer-events-none absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[min(120vh,1100px)] aspect-square"
          // settled backdrop = 0.15 — the arrival timeline animates through
          // brighter values and lands on this same number (no clobber on re-render)
          style={{ opacity: arrived ? 0.15 : 0, transform: 'translate(-50%,-50%) scale(1.06)' }}
          aria-hidden
        >
          <WaveOrb />
        </div>

        {/* emerging mark — sits dead-centre of the stage until it settles */}
        <div
          data-mark
          ref={markRef}
          className="pointer-events-none absolute left-1/2 top-[46%] z-20 text-[42px] md:text-[56px]"
          style={{ opacity: 0, transform: 'translate(-50%,-50%) scale(0.012)', color: '#39D6FF' }}
          aria-hidden
        >
          <KrimMark />
        </div>

        {/* ---- hero content (rises at phase 6) ---- */}
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center pt-16 pb-20 md:pt-24 md:pb-28 min-h-[calc(100svh-4rem)]">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={live ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-mono text-[11px] tracking-[0.24em] uppercase text-mint mb-7"
            >
              The agent-native operating system for lending
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={live ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="font-serif font-normal text-rtext text-[clamp(2.75rem,6vw,4.9rem)] leading-[1.02] tracking-[-0.015em] mb-7"
            >
              The AI your regulator can&nbsp;read.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={live ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.22 }}
              className="font-sans text-[1.1rem] leading-[1.65] text-rtext-2 max-w-[46ch] mb-10"
            >
              End-to-end lending operations on one runtime — where every action is
              validated <em className="font-serif text-rtext">before</em> it executes, not audited after.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={live ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.32 }}
              className="flex flex-wrap items-center gap-5"
            >
              <a href="#pilot" className="font-sans text-[15px] font-medium px-7 py-3.5 bg-mint text-mint-on transition-transform hover:-translate-y-0.5">
                Request a pilot
              </a>
              <a href="#runtime" className="font-mono text-[12px] tracking-[0.16em] uppercase text-rtext-2 hover:text-rtext underline-offset-4 hover:underline">
                Watch an action clear ↓
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={live ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
            className="lg:col-span-5 flex lg:justify-end"
          >
            <GateCrossing index={actionIdx} live={live} />
          </motion.div>
        </div>
      </div>

      {/* ---- the world seam: dark gives way to the record ---- */}
      <div className="world-seam" aria-hidden />

      {/* ---- the record begins (paper foot, synced to the crossing) ---- */}
      <div className="bg-paper">
        <div className="mx-auto max-w-site px-6 md:px-10 py-10 md:py-12 grid md:grid-cols-[1fr_auto] gap-6 items-end">
          <div>
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-seal mb-4">Cleared · on the record</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={`c-${actionIdx}`}
                initial={live ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: live ? 3.2 : 0 }}
                className="font-serif text-ink text-[clamp(1.3rem,2.4vw,1.8rem)] leading-snug max-w-[38ch]"
              >
                {a.cleared}
              </motion.p>
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={`l-${actionIdx}`}
              initial={live ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: live ? 3.4 : 0 }}
              className="font-mono text-[11px] tracking-[0.06em] text-ink-3 pb-1"
            >
              {a.ledger} · <span className="text-seal">sealed</span>
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
