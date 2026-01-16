/**
 * KRIM AI - MICRO-INTERACTIONS LIBRARY
 * Ripple effects, pulse animations, and intelligent hover feedback
 * Performance-optimized with requestAnimationFrame
 */

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface RippleProps {
  children: React.ReactNode
  className?: string
  color?: string
  duration?: number
  onClick?: (e: React.MouseEvent) => void
  style?: React.CSSProperties
}

export function RippleButton({
  children,
  className = '',
  color = 'rgba(0, 255, 136, 0.4)',
  duration = 600,
  onClick,
  style = {}
}: RippleProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])
  const containerRef = useRef<HTMLButtonElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion) {
      onClick?.(e)
      return
    }

    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()

    setRipples((prev) => [...prev, { x, y, id }])

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id))
    }, duration)

    onClick?.(e)
  }

  return (
    <button
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      style={style}
    >
      {children}

      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              backgroundColor: color,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ width: 0, height: 0, opacity: 0.8 }}
            animate={{
              width: 500,
              height: 500,
              opacity: 0
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration / 1000, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </button>
  )
}

interface PulseGlowProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  pulseSpeed?: number
  enabled?: boolean
}

export function PulseGlow({
  children,
  className = '',
  glowColor = 'rgba(0, 255, 136, 0.6)',
  pulseSpeed = 2,
  enabled = true
}: PulseGlowProps) {
  const prefersReducedMotion = useReducedMotion()

  if (!enabled || prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      animate={{
        boxShadow: [
          `0 0 10px ${glowColor}`,
          `0 0 30px ${glowColor}`,
          `0 0 10px ${glowColor}`
        ]
      }}
      transition={{
        duration: pulseSpeed,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  )
}

interface HoverGlowProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  intensity?: number
}

export function HoverGlow({
  children,
  className = '',
  glowColor = 'rgba(0, 255, 136, 0.5)',
  intensity = 30
}: HoverGlowProps) {
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const glowStyle = isHovered && !prefersReducedMotion ? {
    boxShadow: `0 0 ${intensity}px ${glowColor}`,
    transition: 'box-shadow 0.3s ease'
  } : {
    transition: 'box-shadow 0.3s ease'
  }

  return (
    <div
      className={className}
      style={glowStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  )
}

interface FloatingElementProps {
  children: React.ReactNode
  className?: string
  amplitude?: number
  duration?: number
  delay?: number
}

export function FloatingElement({
  children,
  className = '',
  amplitude = 10,
  duration = 3,
  delay = 0
}: FloatingElementProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      animate={{
        y: [-amplitude, amplitude, -amplitude],
        rotate: [-2, 2, -2]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay
      }}
    >
      {children}
    </motion.div>
  )
}

interface ShimmerProps {
  children: React.ReactNode
  className?: string
  duration?: number
}

export function Shimmer({
  children,
  className = '',
  duration = 3
}: ShimmerProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          transform: 'translateX(-100%)'
        }}
        animate={{
          transform: ['translateX(-100%)', 'translateX(100%)']
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </div>
  )
}

interface GlowBorderProps {
  children: React.ReactNode
  className?: string
  colors?: string[]
  speed?: number
}

export function GlowBorder({
  children,
  className = '',
  colors = ['#00FF88', '#00D4FF', '#8B5CF6'],
  speed = 4
}: GlowBorderProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className={`relative ${className}`}>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-krim-mint/30 to-krim-cyan/30 blur-sm" />
        <div className="relative">{children}</div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-xl opacity-50 blur-sm"
        style={{
          background: `linear-gradient(135deg, ${colors.join(', ')})`
        }}
        animate={{
          background: [
            `linear-gradient(135deg, ${colors.join(', ')})`,
            `linear-gradient(225deg, ${colors.join(', ')})`,
            `linear-gradient(315deg, ${colors.join(', ')})`,
            `linear-gradient(135deg, ${colors.join(', ')})`
          ]
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}

interface ScaleOnHoverProps {
  children: React.ReactNode
  className?: string
  scale?: number
}

export function ScaleOnHover({
  children,
  className = '',
  scale = 1.05
}: ScaleOnHoverProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      whileHover={prefersReducedMotion ? {} : {
        scale,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      whileTap={prefersReducedMotion ? {} : {
        scale: scale * 0.95
      }}
    >
      {children}
    </motion.div>
  )
}
