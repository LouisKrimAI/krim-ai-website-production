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
  const [active, setActive] = useState(disabled ? LINES.length : -1)
  const [done, setDone] = useState(disabled)

  useEffect(() => {
    if (disabled) return
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []
    let li = 0
    let ci = 0
    const step = () => {
      if (cancelled) return
      if (li >= LINES.length) {
        setActive(LINES.length)
        setDone(true)
        return
      }
      setActive(li)
      const line = LINES[li]
      if (ci < line.length) {
        ci += 1
        const slice = line.slice(0, ci)
        setShown((prev) => {
          const next = [...prev]
          next[li] = slice
          return next
        })
        const ch = line[ci - 1]
        const delay = ch === ' ' ? 20 : li >= 2 ? 32 : 48 // 0.5× speed — slow, deliberate typing
        timers.push(setTimeout(step, delay))
      } else {
        li += 1
        ci = 0
        timers.push(setTimeout(step, 400)) // a beat between lines
      }
    }
    timers.push(setTimeout(step, 6000)) // begin once the ring has formed and the logo has arrived
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [disabled])

  return { shown, active, done }
}

function TypedLine({ full, shown }: { full: string; shown: string }) {
  return (
    <span className="relative block">
      {/* invisible full copy reserves the exact box (no layout shift) and keeps the text in SSR HTML */}
      <span className="invisible">{full || ' '}</span>
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
