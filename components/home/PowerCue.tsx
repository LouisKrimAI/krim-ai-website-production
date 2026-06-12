'use client'

/**
 * PowerCue — the homepage's signature idea, made small: the cyan
 * "blocked" cue from §2 resolves to a mint check as each answer card
 * enters in §3. Two glyphs crossfade once, in view, staggered.
 */

import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.65, 0, 0.35, 1] as const

export function BlockedCue({ className = '' }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden className={className}>
      <circle cx="9" cy="9" r="7.4" fill="none" stroke="rgba(57,214,255,0.55)" strokeWidth="1.3" />
      <line x1="4.4" y1="13.6" x2="13.6" y2="4.4" stroke="rgba(57,214,255,0.55)" strokeWidth="1.3" />
    </svg>
  )
}

export function ResolvedCue({ delay = 0 }: { delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <span className="relative inline-block h-[18px] w-[18px]" aria-hidden>
      {/* cyan blocked state, fading out */}
      <motion.span
        className="absolute inset-0"
        initial={reduce ? { opacity: 0 } : { opacity: 1 }}
        whileInView={{ opacity: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: EASE, delay: delay + 0.35 }}
      >
        <BlockedCue />
      </motion.span>
      {/* mint check, fading in */}
      <motion.span
        className="absolute inset-0"
        initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: EASE, delay: delay + 0.45 }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18">
          <circle cx="9" cy="9" r="7.4" fill="rgba(0,255,178,0.08)" stroke="rgba(0,255,178,0.7)" strokeWidth="1.3" />
          <path d="M5.6 9.3l2.3 2.3 4.5-4.8" fill="none" stroke="#00FFB2" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.span>
    </span>
  )
}
