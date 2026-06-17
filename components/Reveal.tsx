'use client'

/**
 * Reveal — the site's one scroll-entrance: a deliberate "settle into place" —
 * fade + 20px rise + a 1% scale-up on --ease-out-soft, once, when ~18% visible.
 * GPU-only (transform/opacity). Reduced motion: instant. Pair with a per-item
 * `delay` (e.g. i * 0.08) so cards in a grid arrive one after another.
 */

import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

export default function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20, scale: 0.99 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.78, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
