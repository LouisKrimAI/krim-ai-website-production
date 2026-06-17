'use client'

/**
 * Reveal — the site's one scroll-entrance: a gentle 16px rise into place on
 * --ease-out-soft, once, when ~18% visible. NO opacity fade — glass cards hold
 * their transparency as they enter (no "solidifying" on scroll-in), per the
 * fixed-opacity direction. GPU-only (transform). Reduced motion: instant. Pair
 * with a per-item `delay` (e.g. i * 0.08) so cards arrive one after another.
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
      initial={reduce ? false : { y: 16 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
