'use client'

/**
 * HomeHero — the first-load choreography.
 *
 * Sequence (once, GPU-only): the global Woven Ring forms behind the hero, then
 * the animated Krim logo fades up large as the ring takes shape (~5s), then the
 * hero lines TYPE in one after another with a blinking caret, then the CTAs fade
 * up once the lines finish. The living background is the global Woven Ring
 * backdrop (see WovenRingBackdrop); the timings below are tuned to its morph.
 *
 * No layout shift: each line reserves its full box via an invisible copy (which
 * also keeps the full hero text in the server-rendered HTML for search/answer
 * engines). Reduced motion: jump straight to the resolved, fully-typed state.
 */

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import KrimLogoAnimated from '../KrimLogoAnimated'
import { CTA } from '../ui'
import { isFreshArrival } from '@/lib/arrival'

const OUT_SOFT = [0.16, 1, 0.3, 1] as const
const DEMO_HREF = '/contact'

// Two serif headline lines, then the sans subline — typed in this order.
const LINES = [
  'Safe Superintelligence for',
  'Autonomous Banking',
  'Sovereign world model & governed agent harness.',
  'Banking has a new foundation.',
]

function useTyped(disabled: boolean) {
  const [shown, setShown] = useState<string[]>(disabled ? LINES : ['', '', '', ''])
  const [done, setDone] = useState(disabled)

  // Frame-aligned, time-based reveal: each frame computes the exact slice from
  // elapsed time, so characters land at an even cadence regardless of frame rate
  // (no setTimeout jitter). Pace is 2× the previous, deliberate speed.
  useEffect(() => {
    if (disabled) return
    let raf = 0
    let cancelled = false
    const START = 6000 // begin once the ring has formed and the logo has arrived
    const BEAT = 360 // a beat between lines
    const rate = (li: number) => (li >= 2 ? 29 : 43) // ms per char — 20% slower than the prior midway setting
    const starts: number[] = []
    let acc = START
    LINES.forEach((line, li) => {
      starts[li] = acc
      acc += line.length * rate(li) + BEAT
    })
    const endAll = acc
    const t0 = performance.now()
    let lastKey = ''
    const frame = (now: number) => {
      if (cancelled) return
      const e = now - t0
      const next = LINES.map((line, li) => {
        if (e <= starts[li]) return ''
        const n = Math.min(line.length, Math.floor((e - starts[li]) / rate(li)))
        return line.slice(0, n)
      })
      const key = next.join('')
      if (key !== lastKey) {
        lastKey = key
        setShown(next)
      }
      if (e >= endAll) {
        setDone(true)
        return
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [disabled])

  return { shown, done }
}

function TypedLine({ full, shown }: { full: string; shown: string }) {
  return (
    <span className="relative block">
      {/* invisible full copy reserves the exact box (no layout shift) and keeps the text in SSR HTML */}
      <span className="invisible" aria-hidden>{full || ' '}</span>
      <span className="sr-only">{full}</span>
      <span aria-hidden className="absolute inset-0">
        {shown}
      </span>
    </span>
  )
}

export default function HomeHero() {
  const reduce = useReducedMotion()
  // Settle instantly (no choreography) when the homepage is reached by in-site
  // navigation — only a fresh document load of the homepage plays the build-up,
  // in step with the woven ring (lib/arrival). Computed in a useState initialiser
  // so an in-site mount renders fully in place on its first frame (no blank-then-
  // fill flash); SSR + first load fall through to the animated path.
  const [settled] = useState(() => typeof window !== 'undefined' && !isFreshArrival())
  const disabled = !!reduce || settled
  const { shown, done } = useTyped(disabled)

  return (
    <>
      {/* ---- hero content (the living background is the global Woven Ring) ---- */}
      <section className="relative z-10 flex min-h-[92vh] items-center">
        <div className="mx-auto w-full max-w-site px-6 md:px-10">
          <div className="mx-auto flex max-w-[860px] flex-col items-center text-center">
            <motion.div
              initial={disabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={disabled ? { duration: 0 } : { duration: 1.4, delay: 5.0, ease: OUT_SOFT }}
            >
              <KrimLogoAnimated className="h-auto w-[clamp(300px,48vw,600px)]" />
            </motion.div>

            <h1 className="mt-10 font-serif text-[clamp(2.5rem,5.2vw,4.25rem)] leading-[1.06] tracking-[-0.02em] text-ink">
              <TypedLine full={LINES[0]} shown={shown[0]} />
              <TypedLine full={LINES[1]} shown={shown[1]} />
            </h1>

            <p className="mt-7 max-w-[60ch] font-sans text-body-lg text-ink-2">
              <TypedLine full={LINES[2]} shown={shown[2]} />
              <TypedLine full={LINES[3]} shown={shown[3]} />
            </p>

            <motion.div
              className="mt-11 flex flex-wrap items-center justify-center gap-6"
              initial={disabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={disabled ? { duration: 0 } : { duration: 1.0, ease: OUT_SOFT }}
            >
              <CTA href={DEMO_HREF}>Book a demo</CTA>
              <CTA href="#intelligence" variant="secondary">
                See how it works
              </CTA>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
