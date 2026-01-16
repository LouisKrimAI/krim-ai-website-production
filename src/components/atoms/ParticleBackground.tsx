/**
 * KRIM AI - LIGHTWEIGHT PARTICLE BACKGROUND
 * Performance-optimized CSS-based particle system
 * <50 particles, GPU-accelerated transforms
 */

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { getDeviceCapability } from '../../utils/performance'

interface ParticleBackgroundProps {
  density?: 'low' | 'medium' | 'high'
  color?: string
  opacity?: number
  speed?: 'slow' | 'medium' | 'fast'
}

export default function ParticleBackground({
  density = 'low',
  color = '#00FF88',
  opacity = 0.3,
  speed = 'slow'
}: ParticleBackgroundProps) {
  const prefersReducedMotion = useReducedMotion()
  const deviceCapability = getDeviceCapability()

  // Particle count based on density and device capability
  const particleCount = useMemo(() => {
    const baseCounts = { low: 15, medium: 30, high: 45 }
    const count = baseCounts[density]

    // Reduce particles on low-end devices
    if (deviceCapability === 'low') return Math.floor(count * 0.5)
    if (deviceCapability === 'medium') return Math.floor(count * 0.75)
    return count
  }, [density, deviceCapability])

  // Speed configurations
  const speedConfig = {
    slow: { duration: [25, 35], ease: 'linear' },
    medium: { duration: [15, 25], ease: 'linear' },
    fast: { duration: [8, 15], ease: 'linear' }
  }

  const config = speedConfig[speed]

  // Don't render on reduced motion
  if (prefersReducedMotion) return null

  // Generate particles with random properties
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1, // 1-4px
      duration: Math.random() * (config.duration[1] - config.duration[0]) + config.duration[0],
      delay: Math.random() * 5,
      opacity: Math.random() * opacity + opacity * 0.3
    }))
  }, [particleCount, config.duration, opacity])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
            opacity: particle.opacity,
            filter: `blur(${particle.size * 0.3}px)`,
            willChange: 'transform'
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            scale: [1, 1.2, 1],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  )
}

interface ConnectionLineProps {
  from: { x: number; y: number }
  to: { x: number; y: number }
  color?: string
  opacity?: number
  duration?: number
}

export function ConnectionLine({
  from,
  to,
  color = '#00FF88',
  opacity = 0.3,
  duration = 2
}: ConnectionLineProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <line
          x1={`${from.x}%`}
          y1={`${from.y}%`}
          x2={`${to.x}%`}
          y2={`${to.y}%`}
          stroke={color}
          strokeWidth="1"
          opacity={opacity}
        />
      </svg>
    )
  }

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      <motion.line
        x1={`${from.x}%`}
        y1={`${from.y}%`}
        x2={`${to.x}%`}
        y2={`${to.y}%`}
        stroke={color}
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: [0, 1, 0],
          opacity: [0, opacity, 0]
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </svg>
  )
}

interface FlowingParticleProps {
  path: string
  color?: string
  size?: number
  duration?: number
}

export function FlowingParticle({
  path,
  color = '#00FF88',
  size = 3,
  duration = 3
}: FlowingParticleProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) return null

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <motion.circle
        r={size}
        fill={color}
        filter="url(#glow)"
        animate={{
          offsetDistance: ['0%', '100%']
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{
          offsetPath: `path('${path}')`,
          offsetRotate: '0deg'
        }}
      />
    </svg>
  )
}
