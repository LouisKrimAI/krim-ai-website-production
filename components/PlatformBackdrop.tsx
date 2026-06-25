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
      {/* cyan ground glow — widened to fill the side gutters, so the field (not
          black) sits beside the stack on widescreen; plus a faint mint glow under
          the crown to give the recoloured brain's mint highlights something to sit in */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(88% 66% at 50% 44%, rgba(57,214,255,0.10), rgba(4,6,12,0) 72%)' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(42% 30% at 50% 24%, rgba(0,255,178,0.06), transparent 70%)' }}
      />

      {/* the layers render — a widescreen bake (stack centred, bottom feathered to
          transparent, rainbow brain recoloured cyan→mint) shown object-cover so it
          fills the viewport edge to edge, held faint and breathing slowly */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: 0.32, willChange: 'transform' }}
        initial={false}
        animate={reduce ? { scale: 1.0, y: 0 } : { scale: [0.99, 1.025, 0.99], y: ['0%', '-1.0%', '0%'] }}
        transition={reduce ? { duration: 0 } : { duration: 38, ease: 'easeInOut', repeat: Infinity }}
      >
        <Image
          src="/images/krimos/layers-wide.png"
          alt=""
          fill
          priority
          quality={62}
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: '50% 50%' }}
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
