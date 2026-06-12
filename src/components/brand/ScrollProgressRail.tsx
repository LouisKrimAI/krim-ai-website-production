/**
 * ScrollProgressRail — 1px right-edge rail that fills with scroll position.
 *
 * V2 primitive. Cheap, on-brand felt-sense of page length without
 * costing the ornament budget. Respects reduced motion.
 */

import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgressRail() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 })

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 right-0 h-screen w-px origin-top z-[5] motion-reduce:hidden"
      style={{
        scaleY,
        backgroundColor: 'rgba(200, 151, 59, 0.18)', // ochre at 18%
      }}
    />
  )
}
