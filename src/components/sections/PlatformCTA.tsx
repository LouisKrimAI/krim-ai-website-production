/**
 * KRIM AI - PLATFORM CTA SECTION
 * Final call-to-action for Platform page with magnetic button effect
 * Features: Magnetic button, floating geometric shapes, gradient background, smooth animations
 */

import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function PlatformCTA() {
  const prefersReducedMotion = useReducedMotion()
  const navigate = useNavigate()

  // Magnetic button effect
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 300 })
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 300 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !buttonRef.current) return

    const button = buttonRef.current
    const rect = button.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

    // Magnetic effect within 150px radius
    if (distance < 150) {
      mouseX.set(distanceX * 0.3)
      mouseY.set(distanceY * 0.3)
    } else {
      mouseX.set(0)
      mouseY.set(0)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  const handleClick = () => {
    navigate('/contact', { state: { source: 'platform-cta' } })
  }

  // Floating shapes data
  const floatingShapes = [
    { id: 1, size: 120, x: 10, y: 20, delay: 0 },
    { id: 2, size: 80, x: 85, y: 15, delay: 1 },
    { id: 3, size: 100, x: 15, y: 75, delay: 2 },
    { id: 4, size: 60, x: 80, y: 80, delay: 1.5 }
  ]

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E1F] via-[#050816] to-[#0A0E1F]" />

      {/* Radial glow overlays */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-krim-mint/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-krim-cyan/10 rounded-full blur-[120px]" />

      {/* Floating geometric shapes */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none">
          {floatingShapes.map((shape) => (
            <motion.div
              key={shape.id}
              className="absolute rounded-full border-2 border-krim-mint/20"
              style={{
                width: shape.size,
                height: shape.size,
                left: `${shape.x}%`,
                top: `${shape.y}%`
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                rotate: [0, 180, 360],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 8 + shape.id,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: shape.delay
              }}
            />
          ))}
        </div>
      )}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(50, 255, 199, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(50, 255, 199, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Content container */}
      <div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        >
          From Strategy to Execution —{' '}
          <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">
            Instantly
          </span>
          .
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Experience autonomous credit servicing in action. See how Krim AI transforms operations with real-time intelligence.
        </motion.p>

        {/* Magnetic CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center"
        >
          <motion.button
            ref={buttonRef}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={
              prefersReducedMotion
                ? {}
                : {
                    x: smoothX,
                    y: smoothY
                  }
            }
            className="relative group"
          >
            {/* Button glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-krim-mint to-krim-cyan opacity-50 blur-xl"
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: isHovered ? 1.2 : 1,
                      opacity: isHovered ? 0.7 : 0.5
                    }
              }
              transition={{ duration: 0.3 }}
            />

            {/* Button main */}
            <motion.div
              className="relative px-10 py-5 rounded-full bg-gradient-to-r from-krim-mint to-krim-cyan text-black font-bold text-lg flex items-center gap-3 shadow-lg"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <span>Request a Demo</span>
              <motion.div
                animate={
                  prefersReducedMotion
                    ? {}
                    : isHovered
                    ? { x: 5 }
                    : { x: 0 }
                }
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="w-6 h-6" weight="bold" />
              </motion.div>

              {/* Shine effect on hover */}
              {!prefersReducedMotion && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30"
                  animate={
                    isHovered
                      ? {
                          x: ['-100%', '100%']
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.6,
                    ease: 'easeInOut'
                  }}
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
                  }}
                />
              )}
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-8 text-white/50 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-krim-mint" />
            <span>SOC 2 Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-krim-cyan" />
            <span>99.99% Uptime SLA</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-krim-purple" />
            <span>Enterprise-Grade Security</span>
          </div>
        </motion.div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mt-16 h-px w-full max-w-md mx-auto bg-gradient-to-r from-transparent via-krim-mint/50 to-transparent"
          style={{ originX: 0.5 }}
        />
      </div>
    </section>
  )
}
