'use client'

/**
 * KartaClosingRule — Beat 2 (the only other earned motion): a single hairline
 * draws left → right once on view, echoing the lifecycle spine and closing the
 * ledger system that opened at 01. Transform-origin left, ~0.6s. Reduced motion:
 * present at full width instantly. Reserves its box (zero CLS).
 */

import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

export default function KartaClosingRule() {
  const reduce = useReducedMotion()
  return (
    <motion.span
      aria-hidden
      className="mt-12 block h-px w-full bg-white/10"
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={reduce ? undefined : { scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: EASE }}
      style={{ transformOrigin: 'left' }}
    />
  )
}
