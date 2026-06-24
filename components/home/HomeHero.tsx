'use client'

/**
 * HomeHero — the first-load choreography and the persistent orb backdrop.
 *
 * Sequence (once, GPU-only): orb alone, centred, bright → shrinks inward and
 * dims → the animated Krim logo fades up large in its place → the hero lines
 * TYPE in, one after another, with a blinking caret → the orb settles as the
 * faded living backdrop; the CTAs fade up once the lines finish.
 *
 * No layout shift: each line reserves its full box via an invisible copy (which
 * also keeps the full hero text in the server-rendered HTML for search/answer
 * engines). Reduced motion: jump straight to the resolved, fully-typed state.
 */

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import WaveOrb from '../WaveOrb'
import KrimLogoAnimated from '../KrimLogoAnimated'
import { CTA } from '../ui'

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
    timers.push(setTimeout(step, 4200)) // begin once the logo has arrived
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
  const { shown, done } = useTyped(!!reduce)

  // resolved (final) orb state — also the reduced-motion state. Held faint so it
  // never competes with content.
  const orbResolved = { scale: 1.5, opacity: 0.18 }
  // After the arrival choreography settles, the orb breathes perpetually: a gentle,
  // seamless swell and ease back, forever (start === end, easeInOut, GPU transform
  // only) — calm, never a jump. Reduced motion holds it still.
  const [breathing, setBreathing] = useState(false)

  return (
    <>
      {/* ---- the orb: fixed, behind the whole page ---- */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-bg">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(56% 50% at 50% 40%, #04060C 0%, rgba(4,6,12,0.55) 55%, rgba(9,9,12,0) 100%)',
          }}
        />
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <motion.div
            initial={reduce ? orbResolved : { scale: 0.3, opacity: 0 }}
            animate={
              reduce
                ? orbResolved
                : breathing
                  ? { scale: [1.5, 1.62, 1.5], opacity: [0.18, 0.26, 0.18] }
                  : { scale: 1.5, opacity: 0.18 }
            }
            transition={
              reduce
                ? { duration: 0 }
                : breathing
                  ? { duration: 42, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop', times: [0, 0.5, 1] }
                  : { duration: 4.6, ease: [0.6, 0, 0.3, 1] }
            }
            onAnimationComplete={() => {
              if (!reduce && !breathing) setBreathing(true)
            }}
            style={{ transformOrigin: 'center', willChange: 'transform, opacity' }}
          >
            <WaveOrb size="min(88vmin, 880px)" speed={0.36} density={0.6} />
          </motion.div>
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(9,9,12,0.38) 0%, rgba(9,9,12,0) 26%, rgba(9,9,12,0) 70%, rgba(9,9,12,0.5) 100%)',
          }}
        />
      </div>

      {/* ---- hero content ---- */}
      <section className="relative z-10 flex min-h-[92vh] items-center">
        <div className="mx-auto w-full max-w-site px-6 md:px-10">
          <div className="mx-auto flex max-w-[860px] flex-col items-center text-center">
            <motion.div
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 1.5, delay: 3.8, ease: OUT_SOFT }}
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
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={reduce ? { duration: 0 } : { duration: 1.0, ease: OUT_SOFT }}
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
