/**
 * KRIM AI - GOVERNANCE CIRCULAR VISUAL
 * Modern circular visualization representing orchestrated autonomy
 * Dotted outer ring (Governance) with inner triangle (Atomic, Composable, Governed)
 */

import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { ShieldCheck, Atom, Network, Lock } from '@phosphor-icons/react'

interface GovernanceCircularVisualProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function GovernanceCircularVisual({
  className = '',
  size = 'lg'
}: GovernanceCircularVisualProps) {
  const prefersReducedMotion = useReducedMotion()

  // Size configurations
  const sizeConfig = {
    sm: { diameter: 300, dotCount: 40, nodeSize: 40 },
    md: { diameter: 400, dotCount: 50, nodeSize: 50 },
    lg: { diameter: 500, dotCount: 60, nodeSize: 60 }
  }

  const { diameter, dotCount, nodeSize } = sizeConfig[size]
  const radius = diameter / 2

  // Generate dotted ring positions
  const dottedRing = Array.from({ length: dotCount }, (_, i) => {
    const angle = (i / dotCount) * Math.PI * 2
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      angle,
      delay: (i / dotCount) * 2 // Stagger animation
    }
  })

  // Three inner nodes forming a triangle (Atomic, Composable, Governed)
  const innerNodes = [
    {
      id: 'atomic',
      label: 'Atomic',
      icon: Atom,
      x: -radius * 0.35,
      y: -radius * 0.25,
      gradient: 'from-cyan-400 via-cyan-500 to-blue-500',
      glowColor: 'rgba(0, 212, 255, 0.6)',
      pulseColor: 'rgba(0, 212, 255, 0.3)'
    },
    {
      id: 'composable',
      label: 'Composable',
      icon: Network,
      x: radius * 0.35,
      y: -radius * 0.25,
      gradient: 'from-krim-mint via-green-500 to-teal-500',
      glowColor: 'rgba(0, 255, 136, 0.6)',
      pulseColor: 'rgba(0, 255, 136, 0.3)'
    },
    {
      id: 'governed',
      label: 'Governed',
      icon: Lock,
      x: 0,
      y: radius * 0.35,
      gradient: 'from-purple-400 via-purple-500 to-violet-500',
      glowColor: 'rgba(139, 92, 246, 0.6)',
      pulseColor: 'rgba(139, 92, 246, 0.3)'
    }
  ]

  // Connection lines between nodes
  const connections = [
    { from: 0, to: 1, gradient: 'from-cyan-400 to-krim-mint' },
    { from: 1, to: 2, gradient: 'from-krim-mint to-purple-400' },
    { from: 2, to: 0, gradient: 'from-purple-400 to-cyan-400' }
  ]

  return (
    <div className={`relative flex flex-col items-center ${className}`} style={{ minHeight: diameter + 200 }}>
      {/* Main Circular Visualization */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: diameter + 100, height: diameter + 100 }}
      >
        {/* Dotted Outer Ring - Governance Layer */}
        <div className="absolute inset-0 flex items-center justify-center">
          {dottedRing.map((dot, index) => (
            <motion.div
              key={`dot-${index}`}
              className="absolute rounded-full"
              style={{
                width: 6,
                height: 6,
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate(${dot.x}px, ${dot.y}px)`
              }}
              initial={{
                opacity: 0,
                scale: 0,
                background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.6), rgba(0, 255, 136, 0.6), rgba(139, 92, 246, 0.6))'
              }}
              animate={{
                opacity: prefersReducedMotion ? 0.6 : [0.3, 1, 0.3],
                scale: prefersReducedMotion ? 1 : [1, 1.5, 1],
                boxShadow: prefersReducedMotion
                  ? '0 0 8px rgba(0, 212, 255, 0.4)'
                  : [
                      '0 0 8px rgba(0, 212, 255, 0.4)',
                      '0 0 20px rgba(0, 255, 136, 0.8)',
                      '0 0 8px rgba(139, 92, 246, 0.4)'
                    ]
              }}
              transition={{
                duration: 3,
                delay: dot.delay,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>

        {/* Pulsing Glow Ring Effect */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: diameter + 20,
            height: diameter + 20,
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1), rgba(0, 255, 136, 0.05), transparent 70%)'
          }}
          animate={{
            scale: prefersReducedMotion ? 1 : [1, 1.1, 1],
            opacity: prefersReducedMotion ? 0.3 : [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* SVG for Connection Lines */}
        <svg
          className="absolute"
          width={diameter}
          height={diameter}
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            overflow: 'visible'
          }}
        >
          <defs>
            {connections.map((conn, i) => (
              <linearGradient
                key={`gradient-${i}`}
                id={`connection-gradient-${i}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor={conn.gradient.includes('cyan') ? '#22d3ee' : conn.gradient.includes('mint') ? '#00FF88' : '#a855f7'} stopOpacity="0.6" />
                <stop offset="100%" stopColor={conn.gradient.includes('mint') ? '#00FF88' : conn.gradient.includes('purple') ? '#a855f7' : '#22d3ee'} stopOpacity="0.6" />
              </linearGradient>
            ))}
          </defs>

          {/* Draw connection lines */}
          {connections.map((conn, i) => {
            const from = innerNodes[conn.from]
            const to = innerNodes[conn.to]
            return (
              <motion.line
                key={`line-${i}`}
                x1={from.x + radius}
                y1={from.y + radius}
                x2={to.x + radius}
                y2={to.y + radius}
                stroke={`url(#connection-gradient-${i})`}
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: 0.6
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.3
                }}
              />
            )
          })}
        </svg>

        {/* Three Inner Nodes */}
        {innerNodes.map((node, index) => (
          <motion.div
            key={node.id}
            className="absolute flex flex-col items-center z-10"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) translate(${node.x}px, ${node.y}px)`
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              type: 'spring',
              stiffness: 200
            }}
          >
            {/* Pulsing Glow Background */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: nodeSize + 40,
                height: nodeSize + 40,
                background: `radial-gradient(circle, ${node.pulseColor}, transparent 70%)`
              }}
              animate={{
                scale: prefersReducedMotion ? 1 : [1, 1.4, 1],
                opacity: prefersReducedMotion ? 0.3 : [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.4,
                ease: 'easeInOut'
              }}
            />

            {/* Node Circle */}
            <motion.div
              className={`relative rounded-full bg-gradient-to-br ${node.gradient} flex items-center justify-center`}
              style={{
                width: nodeSize,
                height: nodeSize,
                boxShadow: `0 0 30px ${node.glowColor}`
              }}
              animate={{
                boxShadow: prefersReducedMotion
                  ? `0 0 30px ${node.glowColor}`
                  : [
                      `0 0 30px ${node.glowColor}`,
                      `0 0 50px ${node.glowColor}`,
                      `0 0 30px ${node.glowColor}`
                    ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.5,
                ease: 'easeInOut'
              }}
            >
              {/* Icon */}
              <node.icon size={nodeSize * 0.5} className="text-white" weight="fill" />
            </motion.div>

            {/* Label */}
            <motion.p
              className="text-white text-xs md:text-sm font-semibold mt-2 whitespace-nowrap"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
            >
              {node.label}
            </motion.p>
          </motion.div>
        ))}

        {/* Data Flow Particles along connection lines */}
        {!prefersReducedMotion && connections.map((conn, i) => {
          const from = innerNodes[conn.from]
          const to = innerNodes[conn.to]
          return (
            <motion.div
              key={`flow-${i}`}
              className="absolute w-2 h-2 rounded-full bg-white z-20"
              style={{
                left: '50%',
                top: '50%',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
              }}
              animate={{
                x: [from.x, to.x],
                y: [from.y, to.y],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.8,
                ease: 'linear'
              }}
            />
          )
        })}
      </div>

      {/* Bottom Label - Governance & Compliance Layer */}
      <motion.div
        className="mt-12 flex items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="w-5 h-5 rounded-full bg-purple-400/20 border-2 border-purple-400/60 flex items-center justify-center">
          <ShieldCheck size={12} className="text-purple-400" weight="fill" />
        </div>
        <p className="text-purple-400 text-sm md:text-base font-semibold">
          Governance & Compliance Layer
        </p>
      </motion.div>
    </div>
  )
}
