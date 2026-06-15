'use client'

/**
 * PlatformBackdrop — the KrimOS cluster's living ground.
 *
 * The Layershq render, scaled large and held faint, breathing on a slow loop
 * and feathered into the canvas, with a scrim that keeps the nav, hero and
 * footer fully legible. Fixed behind every platform page so the whole cluster
 * shares one atmosphere — the brand's orb, traded for the stack itself.
 * Reduced motion holds it still. GPU-only (transform/opacity).
 */

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

export default function PlatformBackdrop() {
  const reduce = useReducedMotion()

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-bg">
      {/* faint cyan ground glow — the brand's living light, behind the render */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(58% 48% at 50% 38%, rgba(57,214,255,0.09), rgba(4,6,12,0) 70%)' }}
      />

      {/* the layers render, large + faint, breathing slowly */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: 0.28, willChange: 'transform' }}
        initial={false}
        animate={reduce ? { scale: 1.06, y: 0 } : { scale: [1.05, 1.12, 1.05], y: ['0%', '-1.8%', '0%'] }}
        transition={reduce ? { duration: 0 } : { duration: 30, ease: 'easeInOut', repeat: Infinity }}
      >
        <Image
          src="/images/krimos/layers.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: '50% 36%', filter: 'blur(1.5px)' }}
        />
      </motion.div>

      {/* feather the render's rectangle into the canvas */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(76% 70% at 50% 42%, transparent 44%, #09090C 100%)' }}
      />

      {/* vertical scrim — keeps the nav, hero and footer legible over the render */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(9,9,12,0.68) 0%, rgba(9,9,12,0.2) 24%, rgba(9,9,12,0.2) 64%, rgba(9,9,12,0.74) 100%)',
        }}
      />
    </div>
  )
}
