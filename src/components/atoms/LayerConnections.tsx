/**
 * KRIM AI - LAYER CONNECTIONS COMPONENT
 * Animated SVG lines connecting three-layer architecture cards
 * Features: Gradient transitions, flowing particles, responsive design
 */

import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface LayerConnectionsProps {
  className?: string
}

export default function LayerConnections({ className = '' }: LayerConnectionsProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className={`hidden lg:block absolute inset-0 pointer-events-none ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          {/* Gradient from mint to cyan */}
          <linearGradient id="layer-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#32FFC7" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00FFF7" stopOpacity="0.3" />
          </linearGradient>

          {/* Gradient from cyan to purple */}
          <linearGradient id="layer-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00FFF7" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#9A67FF" stopOpacity="0.3" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="layer-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connection Line 1: Card 1 → Card 2 */}
        <motion.path
          d="M 380 200 L 440 200"
          stroke="url(#layer-gradient-1)"
          strokeWidth="2"
          fill="none"
          filter="url(#layer-glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            pathLength: { duration: prefersReducedMotion ? 0.5 : 1.2, delay: 0.8 },
            opacity: { duration: 0.3, delay: 0.8 }
          }}
        />

        {/* Flowing particle 1a */}
        {!prefersReducedMotion && (
          <motion.circle
            r="3"
            fill="#32FFC7"
            filter="url(#layer-glow)"
            animate={{
              cx: [380, 440],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
              delay: 2
            }}
            cy="200"
          />
        )}

        {/* Flowing particle 1b (delayed) */}
        {!prefersReducedMotion && (
          <motion.circle
            r="2"
            fill="#00FFF7"
            filter="url(#layer-glow)"
            animate={{
              cx: [380, 440],
              opacity: [0, 0.8, 0.8, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
              delay: 3
            }}
            cy="200"
          />
        )}

        {/* Connection Line 2: Card 2 → Card 3 */}
        <motion.path
          d="M 760 200 L 820 200"
          stroke="url(#layer-gradient-2)"
          strokeWidth="2"
          fill="none"
          filter="url(#layer-glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            pathLength: { duration: prefersReducedMotion ? 0.5 : 1.2, delay: 1.2 },
            opacity: { duration: 0.3, delay: 1.2 }
          }}
        />

        {/* Flowing particle 2a */}
        {!prefersReducedMotion && (
          <motion.circle
            r="3"
            fill="#00FFF7"
            filter="url(#layer-glow)"
            animate={{
              cx: [760, 820],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
              delay: 2.5
            }}
            cy="200"
          />
        )}

        {/* Flowing particle 2b (delayed) */}
        {!prefersReducedMotion && (
          <motion.circle
            r="2"
            fill="#9A67FF"
            filter="url(#layer-glow)"
            animate={{
              cx: [760, 820],
              opacity: [0, 0.8, 0.8, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
              delay: 3.5
            }}
            cy="200"
          />
        )}

        {/* Arrow indicators */}
        <motion.path
          d="M 435 195 L 440 200 L 435 205"
          stroke="#00FFF7"
          strokeWidth="2"
          fill="none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 2 }}
        />
        <motion.path
          d="M 815 195 L 820 200 L 815 205"
          stroke="#9A67FF"
          strokeWidth="2"
          fill="none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 2.4 }}
        />
      </svg>
    </div>
  )
}
