/**
 * KRIM AI - ATOMIC. COMPOSABLE. GOVERNED. VISUAL
 * Modern minimalist visualization of three core concepts
 * Clean geometry with neon gradients and subtle motion
 */

import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface AtomicComposableGovernedVisualProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function AtomicComposableGovernedVisual({
  className = '',
  size = 'md'
}: AtomicComposableGovernedVisualProps) {
  const prefersReducedMotion = useReducedMotion()

  const sizeClasses = {
    sm: { container: 'h-64', sphere: 60 },
    md: { container: 'h-96', sphere: 80 },
    lg: { container: 'h-[500px]', sphere: 100 }
  }

  const { container, sphere } = sizeClasses[size]

  // Sphere positions forming a triangle
  const spheres = [
    {
      id: 'atomic',
      label: 'Atomic',
      description: 'Independent units',
      x: -120,
      y: -60,
      gradient: 'from-cyan-400 via-cyan-500 to-blue-500',
      glow: 'rgba(6, 182, 212, 0.6)',
      pulseColor: 'rgba(6, 182, 212, 0.3)'
    },
    {
      id: 'composable',
      label: 'Composable',
      description: 'Dynamic assembly',
      x: 120,
      y: -60,
      gradient: 'from-purple-400 via-purple-500 to-violet-500',
      glow: 'rgba(168, 85, 247, 0.6)',
      pulseColor: 'rgba(168, 85, 247, 0.3)'
    },
    {
      id: 'governed',
      label: 'Governed',
      description: 'Controlled orchestration',
      x: 0,
      y: 80,
      gradient: 'from-blue-400 via-cyan-400 to-teal-400',
      glow: 'rgba(56, 189, 248, 0.6)',
      pulseColor: 'rgba(56, 189, 248, 0.3)'
    }
  ]

  // Connection lines between spheres
  const connections = [
    { from: 0, to: 1, color: 'from-cyan-400 to-purple-400' },
    { from: 1, to: 2, color: 'from-purple-400 to-blue-400' },
    { from: 2, to: 0, color: 'from-blue-400 to-cyan-400' }
  ]

  return (
    <div className={`relative ${container} ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* SVG for connection lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Gradients for connection lines */}
            {connections.map((conn, i) => (
              <linearGradient
                key={`gradient-${i}`}
                id={`connection-gradient-${i}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor={conn.color.includes('cyan') ? '#22d3ee' : conn.color.includes('purple') ? '#a855f7' : '#3b82f6'} stopOpacity="0.4" />
                <stop offset="100%" stopColor={conn.color.includes('purple') ? '#a855f7' : conn.color.includes('blue') ? '#3b82f6' : '#22d3ee'} stopOpacity="0.4" />
              </linearGradient>
            ))}
          </defs>

          {/* Connection Lines */}
          {connections.map((conn, i) => {
            const from = spheres[conn.from]
            const to = spheres[conn.to]
            const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 960
            const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 400

            return (
              <motion.line
                key={`line-${i}`}
                x1={from.x + centerX}
                y1={from.y + centerY}
                x2={to.x + centerX}
                y2={to.y + centerY}
                stroke={`url(#connection-gradient-${i})`}
                strokeWidth="2"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: 0.6,
                  strokeDashoffset: prefersReducedMotion ? 0 : [0, -8]
                }}
                transition={{
                  pathLength: { duration: 1.5, delay: i * 0.2 },
                  opacity: { duration: 0.8, delay: i * 0.2 },
                  strokeDashoffset: { duration: 3, repeat: Infinity, ease: 'linear' }
                }}
              />
            )
          })}
        </svg>

        {/* Central composition indicator */}
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-white/40"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 1],
            opacity: [0, 0.6, 0.6]
          }}
          transition={{ duration: 1, delay: 0.8 }}
        />

        {/* Three spheres */}
        {spheres.map((sphere, index) => (
          <motion.div
            key={sphere.id}
            className="absolute flex flex-col items-center"
            style={{ x: sphere.x, y: sphere.y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              type: 'spring',
              stiffness: 200,
              damping: 20
            }}
          >
            {/* Sphere container */}
            <div className="relative">
              {/* Pulsing glow rings */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  width: sphere.id === 'atomic' ? 80 : 100,
                  height: sphere.id === 'atomic' ? 80 : 100,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: `radial-gradient(circle, ${sphere.pulseColor}, transparent 70%)`
                }}
                animate={{
                  scale: prefersReducedMotion ? 1 : [1, 1.3, 1],
                  opacity: prefersReducedMotion ? 0.3 : [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.3,
                  ease: 'easeInOut'
                }}
              />

              {/* Main sphere */}
              <motion.div
                className={`relative rounded-full bg-gradient-to-br ${sphere.gradient}`}
                style={{
                  width: sphere.id === 'atomic' ? 50 : 60,
                  height: sphere.id === 'atomic' ? 50 : 60,
                  boxShadow: `0 0 30px ${sphere.glow}, inset 0 0 20px rgba(255, 255, 255, 0.2)`
                }}
                animate={{
                  boxShadow: prefersReducedMotion
                    ? `0 0 30px ${sphere.glow}, inset 0 0 20px rgba(255, 255, 255, 0.2)`
                    : [
                        `0 0 30px ${sphere.glow}, inset 0 0 20px rgba(255, 255, 255, 0.2)`,
                        `0 0 50px ${sphere.glow}, inset 0 0 30px rgba(255, 255, 255, 0.3)`,
                        `0 0 30px ${sphere.glow}, inset 0 0 20px rgba(255, 255, 255, 0.2)`
                      ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.4,
                  ease: 'easeInOut'
                }}
              >
                {/* Inner glow */}
                <div className="absolute inset-2 rounded-full bg-white/20" />

                {/* Atomic: Show smaller particles */}
                {sphere.id === 'atomic' && (
                  <>
                    {[...Array(3)].map((_, i) => {
                      const angle = (i / 3) * Math.PI * 2
                      const radius = 30
                      return (
                        <motion.div
                          key={`particle-${i}`}
                          className="absolute w-1.5 h-1.5 rounded-full bg-cyan-200"
                          style={{
                            left: '50%',
                            top: '50%'
                          }}
                          animate={{
                            x: [0, Math.cos(angle) * radius, 0],
                            y: [0, Math.sin(angle) * radius, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: 'easeInOut'
                          }}
                        />
                      )
                    })}
                  </>
                )}

                {/* Composable: Show connection nodes */}
                {sphere.id === 'composable' && (
                  <>
                    {[...Array(4)].map((_, i) => {
                      const positions = [
                        { x: -15, y: -15 },
                        { x: 15, y: -15 },
                        { x: -15, y: 15 },
                        { x: 15, y: 15 }
                      ]
                      return (
                        <motion.div
                          key={`node-${i}`}
                          className="absolute w-2 h-2 rounded-full bg-purple-200"
                          style={{
                            left: `calc(50% + ${positions[i].x}px)`,
                            top: `calc(50% + ${positions[i].y}px)`,
                            transform: 'translate(-50%, -50%)'
                          }}
                          animate={{
                            scale: prefersReducedMotion ? 1 : [1, 1.5, 1],
                            opacity: prefersReducedMotion ? 0.8 : [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: 'easeInOut'
                          }}
                        />
                      )
                    })}
                  </>
                )}

                {/* Governed: Show grid overlay */}
                {sphere.id === 'governed' && (
                  <motion.div
                    className="absolute inset-0 rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ duration: 1, delay: 1 }}
                  >
                    {/* Vertical lines */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={`v-${i}`}
                        className="absolute w-px h-full bg-white/30"
                        style={{ left: `${25 + i * 25}%` }}
                        animate={{
                          opacity: prefersReducedMotion ? 0.3 : [0.2, 0.5, 0.2]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                    {/* Horizontal lines */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={`h-${i}`}
                        className="absolute w-full h-px bg-white/30"
                        style={{ top: `${25 + i * 25}%` }}
                        animate={{
                          opacity: prefersReducedMotion ? 0.3 : [0.2, 0.5, 0.2]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>

              {/* Rotating ring for governed */}
              {sphere.id === 'governed' && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-blue-400/30"
                  style={{
                    width: 70,
                    height: 70,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                  animate={{
                    rotate: prefersReducedMotion ? 0 : 360
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              )}
            </div>

            {/* Label */}
            <motion.div
              className="mt-4 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
            >
              <div className="text-sm font-bold text-white mb-1">{sphere.label}</div>
              <div className="text-xs text-white/50">{sphere.description}</div>
            </motion.div>
          </motion.div>
        ))}

        {/* Data flow particles between spheres */}
        {!prefersReducedMotion && (
          <>
            {connections.map((conn, i) => {
              const from = spheres[conn.from]
              const to = spheres[conn.to]

              return (
                <motion.div
                  key={`flow-${i}`}
                  className="absolute w-1.5 h-1.5 rounded-full bg-white"
                  style={{
                    boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)'
                  }}
                  animate={{
                    x: [from.x, to.x],
                    y: [from.y, to.y],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.7,
                    ease: 'linear'
                  }}
                />
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}
