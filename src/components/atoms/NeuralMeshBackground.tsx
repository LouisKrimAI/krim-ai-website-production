/**
 * KRIM AI - NEURAL MESH BACKGROUND COMPONENT
 * Animated interconnected network of nodes forming a data mesh pattern
 * Features: Pulsing nodes, connection lines, subtle movement, opacity variations
 */

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface NeuralMeshBackgroundProps {
  className?: string
  nodeCount?: number
  opacity?: number
}

export default function NeuralMeshBackground({
  className = '',
  nodeCount = 20,
  opacity = 0.4
}: NeuralMeshBackgroundProps) {
  const prefersReducedMotion = useReducedMotion()

  // Generate random node positions (memoized to prevent re-renders)
  const nodes = useMemo(() => {
    const generatedNodes = []
    for (let i = 0; i < nodeCount; i++) {
      generatedNodes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2
      })
    }
    return generatedNodes
  }, [nodeCount])

  // Generate connection lines between nearby nodes
  const connections = useMemo(() => {
    const generatedConnections: Array<{ from: number; to: number }> = []
    const maxDistance = 25 // Maximum distance to draw connections

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance) {
          generatedConnections.push({ from: i, to: j })
        }
      }
    }

    return generatedConnections
  }, [nodes])

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradient for nodes */}
          <radialGradient id="node-gradient">
            <stop offset="0%" stopColor="#32FFC7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00FFF7" stopOpacity="0.2" />
          </radialGradient>

          {/* Glow filter for nodes */}
          <filter id="node-glow">
            <feGaussianBlur stdDeviation="0.3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradient for connection lines */}
          <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#32FFC7" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#00FFF7" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#32FFC7" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Connection Lines */}
        <g opacity={opacity * 0.3}>
          {connections.map((connection, index) => {
            const fromNode = nodes[connection.from]
            const toNode = nodes[connection.to]

            return (
              <motion.line
                key={`connection-${index}`}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="url(#connection-gradient)"
                strokeWidth="0.1"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  pathLength: {
                    duration: prefersReducedMotion ? 0 : 2,
                    delay: index * 0.02,
                    ease: 'easeInOut'
                  },
                  opacity: {
                    duration: 0.5,
                    delay: index * 0.02
                  }
                }}
              />
            )
          })}
        </g>

        {/* Nodes */}
        <g opacity={opacity}>
          {nodes.map((node) => (
            <g key={`node-${node.id}`}>
              {/* Node core */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="0.4"
                fill="url(#node-gradient)"
                filter="url(#node-glow)"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        scale: [1, 1.2, 1],
                        opacity: [0.6, 1, 0.6]
                      }
                }
                transition={
                  prefersReducedMotion
                    ? { duration: 0.5, delay: node.delay }
                    : {
                        scale: {
                          duration: node.duration,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: node.delay
                        },
                        opacity: {
                          duration: node.duration,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: node.delay
                        }
                      }
                }
              />

              {/* Outer ring pulse */}
              {!prefersReducedMotion && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="0.8"
                  fill="none"
                  stroke="#32FFC7"
                  strokeWidth="0.05"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{
                    duration: node.duration,
                    repeat: Infinity,
                    ease: 'easeOut',
                    delay: node.delay
                  }}
                />
              )}
            </g>
          ))}
        </g>

        {/* Data pulse effects (traveling particles) */}
        {!prefersReducedMotion && connections.slice(0, 5).map((connection, index) => {
          const fromNode = nodes[connection.from]
          const toNode = nodes[connection.to]

          return (
            <motion.circle
              key={`pulse-${index}`}
              r="0.3"
              fill="#00FFF7"
              filter="url(#node-glow)"
              initial={{ opacity: 0 }}
              animate={{
                cx: [fromNode.x, toNode.x, fromNode.x],
                cy: [fromNode.y, toNode.y, fromNode.y],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
                delay: index * 0.8
              }}
            />
          )
        })}
      </svg>
    </div>
  )
}
