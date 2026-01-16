/**
 * KRIM AI - DATA FLOW LINE COMPONENT
 * Animated SVG connection line with flowing particles for data flow visualization
 * Features: Path animation, flowing particles, gradient colors, glow effect
 */

import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface DataFlowLineProps {
  from: { x: number; y: number }
  to: { x: number; y: number }
  color: 'mint' | 'cyan' | 'purple' | 'coral'
  delay?: number
  className?: string
  style?: 'straight' | 'curved'
}

const colorMap = {
  mint: {
    hex: '#32FFC7',
    rgb: '50, 255, 199',
    gradientId: 'data-mint-gradient'
  },
  cyan: {
    hex: '#00FFF7',
    rgb: '0, 255, 247',
    gradientId: 'data-cyan-gradient'
  },
  purple: {
    hex: '#9A67FF',
    rgb: '154, 103, 255',
    gradientId: 'data-purple-gradient'
  },
  coral: {
    hex: '#FF6B9D',
    rgb: '255, 107, 157',
    gradientId: 'data-coral-gradient'
  }
}

export default function DataFlowLine({
  from,
  to,
  color,
  delay = 0,
  className = '',
  style = 'straight'
}: DataFlowLineProps) {
  const prefersReducedMotion = useReducedMotion()
  const colorConfig = colorMap[color]

  // Calculate path based on style
  let pathData: string

  if (style === 'curved') {
    // Calculate control points for smooth Bezier curve
    const controlPoint1 = {
      x: from.x + (to.x - from.x) * 0.4,
      y: from.y
    }
    const controlPoint2 = {
      x: from.x + (to.x - from.x) * 0.6,
      y: to.y
    }
    pathData = `M ${from.x} ${from.y} C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${to.x} ${to.y}`
  } else {
    // Straight line
    pathData = `M ${from.x} ${from.y} L ${to.x} ${to.y}`
  }

  return (
    <svg
      className={`absolute inset-0 pointer-events-none overflow-visible ${className}`}
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        {/* Gradient definition for line */}
        <linearGradient
          id={colorConfig.gradientId}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor={colorConfig.hex} stopOpacity="0.2" />
          <stop offset="50%" stopColor={colorConfig.hex} stopOpacity="0.8" />
          <stop offset="100%" stopColor={colorConfig.hex} stopOpacity="0.2" />
        </linearGradient>

        {/* Glow filter */}
        <filter id={`data-glow-${color}`}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main connection line with path animation */}
      <motion.path
        d={pathData}
        stroke={`url(#${colorConfig.gradientId})`}
        strokeWidth="2"
        fill="none"
        filter={`url(#data-glow-${color})`}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          pathLength: {
            duration: prefersReducedMotion ? 0 : 1.5,
            ease: 'easeInOut',
            delay
          },
          opacity: {
            duration: 0.3,
            delay
          }
        }}
      />

      {/* Flowing particles (only if motion enabled) */}
      {!prefersReducedMotion && (
        <>
          {/* Particle 1 - Main bright particle */}
          <motion.circle
            r="3"
            fill={colorConfig.hex}
            filter={`url(#data-glow-${color})`}
            initial={{ opacity: 0 }}
            animate={{
              offsetDistance: ['0%', '100%'],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
              delay: delay + 1.5
            }}
            style={{
              offsetPath: `path('${pathData}')`,
              offsetRotate: '0deg'
            }}
          />

          {/* Particle 2 - Delayed smaller particle */}
          <motion.circle
            r="2"
            fill={colorConfig.hex}
            opacity="0.7"
            filter={`url(#data-glow-${color})`}
            initial={{ opacity: 0 }}
            animate={{
              offsetDistance: ['0%', '100%'],
              opacity: [0, 0.7, 0.7, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
              delay: delay + 2.2
            }}
            style={{
              offsetPath: `path('${pathData}')`,
              offsetRotate: '0deg'
            }}
          />

          {/* Particle 3 - Third staggered particle */}
          <motion.circle
            r="2.5"
            fill={colorConfig.hex}
            opacity="0.5"
            filter={`url(#data-glow-${color})`}
            initial={{ opacity: 0 }}
            animate={{
              offsetDistance: ['0%', '100%'],
              opacity: [0, 0.5, 0.5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
              delay: delay + 2.9
            }}
            style={{
              offsetPath: `path('${pathData}')`,
              offsetRotate: '0deg'
            }}
          />
        </>
      )}

      {/* Endpoint pulse (at destination) */}
      <motion.circle
        cx={to.x}
        cy={to.y}
        r="5"
        fill="none"
        stroke={colorConfig.hex}
        strokeWidth="1.5"
        opacity="0.5"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{
          scale: prefersReducedMotion ? 1 : [1, 1.4, 1],
          opacity: prefersReducedMotion ? 0.5 : [0.5, 0.3, 0.5]
        }}
        viewport={{ once: true }}
        transition={{
          scale: {
            duration: prefersReducedMotion ? 0.5 : 2,
            delay: delay + 1,
            ease: 'easeInOut',
            repeat: prefersReducedMotion ? 0 : Infinity
          },
          opacity: {
            duration: prefersReducedMotion ? 0.5 : 2,
            delay: delay + 1,
            repeat: prefersReducedMotion ? 0 : Infinity,
            ease: 'easeInOut'
          }
        }}
      />

      {/* Arrow indicator at endpoint */}
      <motion.path
        d={`M ${to.x - 8} ${to.y - 4} L ${to.x} ${to.y} L ${to.x - 8} ${to.y + 4}`}
        stroke={colorConfig.hex}
        strokeWidth="2"
        fill="none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 1.5 }}
      />
    </svg>
  )
}
