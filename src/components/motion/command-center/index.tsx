/**
 * KRIM AI - COMMAND CENTER MOTION COMPONENTS
 * Premium, futuristic animations for Kupa Command Centers
 * Enterprise-grade motion that communicates serious financial infrastructure
 */

'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import { duration, easing, distance, glass, glow } from '../tokens'
import * as variants from '../variants'

/**
 * Terminal Typer - Boot sequence text effect
 * Creates a terminal-style typing animation
 */
export const TerminalTyper: React.FC<{
  text: string
  delay?: number
  speed?: number
  className?: string
  cursor?: boolean
}> = ({ text, delay = 0, speed = 30, className = '', cursor = true }) => {
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(text)
      return
    }

    const timeout = setTimeout(() => {
      let index = 0
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index))
          index++
        } else {
          clearInterval(interval)
          setTimeout(() => setShowCursor(false), 500)
        }
      }, speed)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, delay, speed, prefersReducedMotion])

  return (
    <span className={`font-mono ${className}`}>
      {displayText}
      {cursor && showCursor && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="inline-block w-2 h-4 bg-cyan-400 ml-1"
        />
      )}
    </span>
  )
}

/**
 * DataStreamVisualizer - Real-time metric animation
 * Creates animated data bars that update in real-time
 */
export const DataStreamVisualizer: React.FC<{
  dataPoints?: number
  updateInterval?: number
  className?: string
  barColor?: string
  height?: number
}> = ({ 
  dataPoints = 8, 
  updateInterval = 2000, 
  className = '',
  barColor = 'from-cyan-400/80 to-emerald-400/40',
  height = 32
}) => {
  const [data, setData] = useState(() => Array(dataPoints).fill(0))
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setData(Array(dataPoints).fill(50))
      return
    }

    const interval = setInterval(() => {
      setData(Array(dataPoints).fill(0).map(() => Math.random() * 100))
    }, updateInterval)

    return () => clearInterval(interval)
  }, [dataPoints, updateInterval, prefersReducedMotion])

  return (
    <div className={`flex items-end gap-1 ${className}`} style={{ height }}>
      {data.map((value, i) => (
        <motion.div
          key={i}
          className={`flex-1 bg-gradient-to-t ${barColor} rounded-t`}
          initial={{ height: 0 }}
          animate={{ height: `${value}%` }}
          transition={{ 
            duration: duration.slow / 1000, 
            ease: easing.easeOut 
          }}
        />
      ))}
    </div>
  )
}

/**
 * ScanningLine - Mission control scanner effect
 * Creates a scanning line that traverses the container
 */
export const ScanningLine: React.FC<{
  color?: string
  duration?: number
  loops?: number
  className?: string
}> = ({ 
  color = 'cyan-400', 
  duration: scanDuration = 3,
  loops = 2,
  className = ''
}) => {
  const [loopCount, setLoopCount] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion || loopCount >= loops) return null

  return (
    <motion.div
      className={`absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-${color} to-transparent opacity-60 ${className}`}
      initial={{ top: 0 }}
      animate={{ top: '100%' }}
      transition={{ 
        duration: scanDuration, 
        ease: 'linear',
        repeat: loops - 1,
        repeatType: 'loop'
      }}
      onAnimationComplete={() => setLoopCount(prev => prev + 1)}
    />
  )
}

/**
 * NetworkOrbitSystem - 3D orbital visualization
 * Creates an orbital network with central core and satellite nodes
 */
export const NetworkOrbitSystem: React.FC<{
  nodes: Array<{
    id: string
    icon: React.ComponentType<any>
    status: 'online' | 'alert' | 'offline'
    label: string
  }>
  radius?: number
  rotationDuration?: number
  className?: string
}> = ({ 
  nodes, 
  radius = 180,
  rotationDuration = 20,
  className = ''
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const prefersReducedMotion = useReducedMotion()
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const getNodePosition = (index: number) => {
    const angle = (index / nodes.length) * Math.PI * 2
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    }
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Central Core */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        animate={!prefersReducedMotion ? { rotate: 360 } : {}}
        transition={{ 
          duration: rotationDuration, 
          repeat: Infinity, 
          ease: 'linear' 
        }}
      >
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full blur-3xl opacity-60" />
          <div className="absolute inset-0 bg-slate-900 rounded-full border-2 border-cyan-400/60 flex items-center justify-center">
            <motion.div
              animate={!prefersReducedMotion ? { 
                scale: [1, 1.1, 1],
                opacity: [0.6, 1, 0.6]
              } : {}}
              transition={{ 
                duration: 2, 
                repeat: Infinity 
              }}
              className="text-cyan-400"
            >
              <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
            animate={!prefersReducedMotion ? { scale: [1, 1.5, 1] } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Orbital Nodes */}
      {nodes.map((node, index) => {
        const position = getNodePosition(index)
        const statusColors = {
          online: 'from-cyan-400 to-emerald-400',
          alert: 'from-amber-400 to-orange-400',
          offline: 'from-gray-400 to-gray-500'
        }

        return (
          <motion.div
            key={node.id}
            className="absolute top-1/2 left-1/2 z-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? {
              opacity: 1,
              scale: 1,
              x: position.x,
              y: position.y
            } : {}}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 200,
              delay: index * 0.1
            }}
          >
            {/* Connection Line */}
            <svg 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ 
                width: Math.abs(position.x) * 2 + 100,
                height: Math.abs(position.y) * 2 + 100,
                marginLeft: -position.x,
                marginTop: -position.y
              }}
            >
              <motion.line
                x1={position.x + Math.abs(position.x) + 50}
                y1={position.y + Math.abs(position.y) + 50}
                x2={Math.abs(position.x) + 50}
                y2={Math.abs(position.y) + 50}
                stroke={node.status === 'alert' ? '#f59e0b' : '#06b6d4'}
                strokeWidth="1"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.3 } : {}}
                transition={{ 
                  duration: duration.slow / 1000, 
                  delay: index * 0.1 
                }}
              />
            </svg>

            {/* Node */}
            <motion.div
              className="relative -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              whileHover={{ scale: 1.2 }}
              onHoverStart={() => setHoveredNode(node.id)}
              onHoverEnd={() => setHoveredNode(null)}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${statusColors[node.status]} rounded-xl blur-xl opacity-40 group-hover:opacity-60`} />
              <div className="relative bg-slate-900 rounded-xl p-3 border border-cyan-400/30 group-hover:border-cyan-400/60">
                <node.icon className="w-6 h-6 text-cyan-400" />
              </div>
              
              {/* Label */}
              <AnimatePresence>
                {hoveredNode === node.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                  >
                    <span className="text-xs text-white font-medium bg-slate-800/90 px-2 py-1 rounded">
                      {node.label}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )
      })}

      {/* Data Flow Particles */}
      {!prefersReducedMotion && Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          initial={{ 
            left: '50%',
            top: '50%',
            opacity: 0 
          }}
          animate={{
            left: ['50%', `${50 + (Math.random() - 0.5) * 40}%`, '50%'],
            top: ['50%', `${50 + (Math.random() - 0.5) * 40}%`, '50%'],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: i * 0.3,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  )
}

/**
 * CommandPanelReveal - Hexagonal grid materialization
 * Creates a futuristic panel reveal effect
 */
export const CommandPanelReveal: React.FC<{
  children: React.ReactNode
  index?: number
  className?: string
}> = ({ children, index = 0, className = '' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={prefersReducedMotion ? variants.reducedReveal : variants.commandPanelReveal}
      custom={index}
    >
      {children}
    </motion.div>
  )
}

/**
 * StatusIndicator - Animated status light
 * Creates a pulsing status indicator
 */
export const StatusIndicator: React.FC<{
  status: 'online' | 'alert' | 'offline'
  size?: 'sm' | 'md' | 'lg'
  pulse?: boolean
  className?: string
}> = ({ status, size = 'md', pulse = true, className = '' }) => {
  const prefersReducedMotion = useReducedMotion()
  
  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  }

  const colors = {
    online: 'bg-emerald-400',
    alert: 'bg-amber-400',
    offline: 'bg-gray-400'
  }

  const glowColors = {
    online: 'rgba(52, 211, 153, 0.4)',
    alert: 'rgba(251, 191, 36, 0.4)',
    offline: 'rgba(156, 163, 175, 0.2)'
  }

  return (
    <motion.div
      className={`${sizes[size]} ${colors[status]} rounded-full ${className}`}
      animate={pulse && !prefersReducedMotion ? {
        scale: [1, 1.2, 1],
        boxShadow: [
          `0 0 0 0 ${glowColors[status]}`,
          `0 0 0 8px ${glowColors[status]}`,
          `0 0 0 0 ${glowColors[status]}`
        ]
      } : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: easing.gentle
      }}
    />
  )
}

/**
 * MetricPulse - Animated metric display
 * Shows a metric with pulsing animation on update
 */
export const MetricPulse: React.FC<{
  value: string | number
  label?: string
  trend?: 'up' | 'down' | 'stable'
  className?: string
}> = ({ value, label, trend, className = '' }) => {
  const [shouldPulse, setShouldPulse] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const prevValue = useRef(value)

  useEffect(() => {
    if (prevValue.current !== value) {
      setShouldPulse(true)
      const timer = setTimeout(() => setShouldPulse(false), 600)
      prevValue.current = value
      return () => clearTimeout(timer)
    }
  }, [value])

  const trendIcons = {
    up: '↑',
    down: '↓',
    stable: '→'
  }

  const trendColors = {
    up: 'text-emerald-400',
    down: 'text-red-400',
    stable: 'text-gray-400'
  }

  return (
    <motion.div
      className={className}
      animate={shouldPulse && !prefersReducedMotion ? {
        scale: [1, 1.05, 1],
        filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)']
      } : {}}
      transition={{ duration: duration.moderate / 1000 }}
    >
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-white font-mono">
          {value}
        </span>
        {trend && (
          <span className={`text-sm ${trendColors[trend]}`}>
            {trendIcons[trend]}
          </span>
        )}
      </div>
      {label && (
        <div className="text-xs text-gray-400 mt-1">{label}</div>
      )}
    </motion.div>
  )
}

// Export all command center components
export default {
  TerminalTyper,
  DataStreamVisualizer,
  ScanningLine,
  NetworkOrbitSystem,
  CommandPanelReveal,
  StatusIndicator,
  MetricPulse
}