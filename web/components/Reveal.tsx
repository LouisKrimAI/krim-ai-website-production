'use client'

/**
 * Reveal — the site's one entrance: fade + 14px rise on ease-out-soft,
 * once, on scroll into view. `dark` only changes nothing here (kept for
 * call-site clarity). Reduced motion: framer respects the user setting via
 * the MotionConfig-free fallback — we render with no transform when reduced.
 */

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Reveal({
  children,
  className = '',
  delay = 0,
  dark = false, // eslint-disable-line @typescript-eslint/no-unused-vars
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  dark?: boolean
}) {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
