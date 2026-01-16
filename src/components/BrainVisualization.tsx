/**
 * Enhanced Brain Visualization Component
 * Advanced animated neural network with depth, parallax, and intelligent pulsation
 * Features: 3D parallax, flowing particles, staggered pulses, breathing core, light sweeps
 */

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Brain, Command, Cpu, Users } from '@phosphor-icons/react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface BrainVisualizationProps {
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export default function BrainVisualization({
  size = 'large',
  className = ''
}: BrainVisualizationProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Smooth parallax with spring physics
  const parallaxY = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]),
    { stiffness: 100, damping: 30 }
  )

  // Scroll-triggered scale (1 → 1.05 → 1)
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95])

  const handleHover = useCallback(() => setIsHovered(true), [])
  const handleLeave = useCallback(() => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
  }, [])

  // Mouse proximity glow effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    setMousePosition({ x: x * 20, y: y * 20 })
  }, [])

  const sizeClasses = {
    small: 'w-32 h-32',
    medium: 'w-48 h-48',
    large: 'w-80 h-80'
  }

  const iconSizes = {
    small: 'w-12 h-12',
    medium: 'w-16 h-16',
    large: 'w-24 h-24'
  }

  // Node positions for neural network
  const nodes = [
    { id: 1, x: '50%', y: '20%', delay: 0, color: '#32FFC7' }, // Top
    { id: 2, x: '80%', y: '50%', delay: 0.3, color: '#00FFF7' }, // Right
    { id: 3, x: '50%', y: '80%', delay: 0.6, color: '#9A67FF' }, // Bottom
    { id: 4, x: '20%', y: '50%', delay: 0.9, color: '#00FFF7' }, // Left
    { id: 5, x: '35%', y: '35%', delay: 1.2, color: '#32FFC7' }, // Top-left
    { id: 6, x: '65%', y: '35%', delay: 1.5, color: '#9A67FF' }, // Top-right
    { id: 7, x: '65%', y: '65%', delay: 1.8, color: '#00FFF7' }, // Bottom-right
    { id: 8, x: '35%', y: '65%', delay: 2.1, color: '#32FFC7' }  // Bottom-left
  ]

  // Connection lines between nodes
  const connections = [
    { from: 0, to: 1, delay: 0 },
    { from: 1, to: 2, delay: 1 },
    { from: 2, to: 3, delay: 2 },
    { from: 3, to: 0, delay: 3 },
    { from: 4, to: 6, delay: 4 },
    { from: 5, to: 7, delay: 5 }
  ]

  return (
    <motion.div
      ref={containerRef}
      className={`relative ${sizeClasses[size]} ${className} cursor-pointer`}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onMouseMove={handleMouseMove}
      style={{
        y: prefersReducedMotion ? 0 : parallaxY,
        scale: prefersReducedMotion ? 1 : scale
      }}
    >
      {/* Deep gradient background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#050816] via-[#0E1424] to-[#050816]" />

      {/* Main Brain Container with breathing effect */}
      <motion.div
        className="relative w-full h-full rounded-full bg-gradient-to-br from-white/5 to-white/10 border border-white/20"
        animate={{
          opacity: prefersReducedMotion ? 1 : [0.85, 1, 0.85],
          borderColor: [
            "rgba(255, 255, 255, 0.2)",
            "rgba(255, 255, 255, 0.3)",
            "rgba(255, 255, 255, 0.2)"
          ],
          boxShadow: [
            "0 0 15px rgba(255, 255, 255, 0.1)",
            "0 0 20px rgba(255, 255, 255, 0.15)",
            "0 0 15px rgba(255, 255, 255, 0.1)"
          ]
        }}
        transition={{
          opacity: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
          borderColor: { duration: 12, repeat: Infinity, ease: "linear" },
          boxShadow: { duration: 12, repeat: Infinity, ease: "linear" }
        }}
        style={{
          rotateX: isHovered ? mousePosition.y * 0.5 : 0,
          rotateY: isHovered ? mousePosition.x * 0.5 : 0,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Core Brain Icon with enhanced glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative"
            animate={{
              rotate: prefersReducedMotion ? 0 : 360,
              scale: isHovered ? [1, 1.15, 1.1] : [1, 1.05, 1]
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            {/* Icon glow bloom */}
            <motion.div
              className="absolute inset-0 blur-md"
              animate={{
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Brain
                className={`${iconSizes[size]} text-krim-mint`}
                style={{ filter: 'drop-shadow(0 0 15px rgba(50, 255, 199, 0.6))' }}
              />
            </motion.div>

            {/* Main icon */}
            <Brain
              className={`${iconSizes[size]} relative ${isHovered ? 'text-krim-cyan' : 'text-krim-mint'} transition-colors duration-500`}
              style={{ filter: 'drop-shadow(0 0 10px currentColor)' }}
            />
          </motion.div>
        </div>

        {/* Enhanced Orbital Rings with gradient flow */}
        <motion.div
          className="absolute inset-0 rounded-full border border-krim-cyan/30"
          animate={{
            rotate: prefersReducedMotion ? 0 : -360,
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{
            background: 'conic-gradient(from 0deg, transparent 0%, rgba(0, 255, 247, 0.2) 50%, transparent 100%)'
          }}
        />

        <motion.div
          className="absolute inset-4 rounded-full border border-krim-mint/30"
          animate={{
            rotate: prefersReducedMotion ? 0 : 360,
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            opacity: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
          }}
          style={{
            background: 'conic-gradient(from 90deg, transparent 0%, rgba(50, 255, 199, 0.2) 50%, transparent 100%)'
          }}
        />

        <motion.div
          className="absolute inset-8 rounded-full border border-krim-purple/30"
          animate={{
            rotate: prefersReducedMotion ? 0 : -360,
            opacity: [0.25, 0.45, 0.25]
          }}
          transition={{
            rotate: { duration: 35, repeat: Infinity, ease: "linear" },
            opacity: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
          style={{
            background: 'conic-gradient(from 180deg, transparent 0%, rgba(154, 103, 255, 0.2) 50%, transparent 100%)'
          }}
        />

        {/* Neural Network Nodes - Staggered pulsation */}
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: node.x,
              top: node.y,
              transform: 'translate(-50%, -50%)',
              backgroundColor: node.color,
              boxShadow: `0 0 15px ${node.color}`
            }}
            animate={{
              scale: prefersReducedMotion ? 1 : [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: node.delay
            }}
          />
        ))}

        {/* Flowing Data Particles along connections */}
        {!prefersReducedMotion && connections.map((conn, idx) => {
          const fromNode = nodes[conn.from]
          const toNode = nodes[conn.to]

          return (
            <motion.div
              key={`particle-${idx}`}
              className="absolute w-1.5 h-1.5 rounded-full bg-krim-mint"
              style={{
                left: fromNode?.x || '50%',
                top: fromNode?.y || '50%',
                boxShadow: '0 0 8px rgba(50, 255, 199, 0.8)'
              }}
              animate={{
                left: [fromNode?.x || '50%', toNode?.x || '50%', fromNode?.x || '50%'],
                top: [fromNode?.y || '50%', toNode?.y || '50%', fromNode?.y || '50%'],
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1, 1, 0.5]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
                delay: conn.delay
              }}
            />
          )
        })}

        {/* Light Sweeps - Directional flow every 6s */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(50, 255, 199, 0.4) 50%, transparent 100%)'
          }}
          animate={{
            rotate: prefersReducedMotion ? 0 : [0, 360],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            rotate: { duration: 6, repeat: Infinity, ease: "linear" },
            opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Orbital Concept Icons with depth */}
        {/* AI Copilot - Top */}
        <motion.div
          className="absolute -top-16"
          animate={{
            y: prefersReducedMotion ? 0 : [0, -5, 0],
            x: '-50%',
            rotateX: isHovered ? 15 : 0
          }}
          transition={{
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            rotateX: { duration: 0.5 }
          }}
          style={{
            transformStyle: 'preserve-3d',
            left: '50%'
          }}
        >
          <motion.div
            className={`${isHovered ? 'bg-krim-cyan/20' : 'bg-krim-mint/20'} p-3 rounded-full border ${isHovered ? 'border-krim-cyan/40' : 'border-krim-mint/30'} transition-all duration-500`}
            animate={{
              boxShadow: [
                '0 0 10px rgba(50, 255, 199, 0.3)',
                '0 0 20px rgba(0, 255, 247, 0.4)',
                '0 0 10px rgba(50, 255, 199, 0.3)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Command className={`w-6 h-6 ${isHovered ? 'text-krim-cyan' : 'text-krim-mint'} transition-colors duration-500`} />
          </motion.div>
        </motion.div>

        {/* Multi Agentic OS - Bottom Left */}
        <motion.div
          className="absolute -bottom-12 -left-8"
          animate={{
            x: prefersReducedMotion ? 0 : [-2, 2, -2],
            y: prefersReducedMotion ? 0 : [0, -3, 0]
          }}
          transition={{
            x: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.div
            className={`${isHovered ? 'bg-krim-mint/20' : 'bg-krim-cyan/20'} p-3 rounded-full border ${isHovered ? 'border-krim-mint/40' : 'border-krim-cyan/30'} transition-all duration-500`}
            animate={{
              boxShadow: [
                '0 0 10px rgba(0, 255, 247, 0.3)',
                '0 0 20px rgba(50, 255, 199, 0.4)',
                '0 0 10px rgba(0, 255, 247, 0.3)'
              ]
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <Cpu className={`w-6 h-6 ${isHovered ? 'text-krim-mint' : 'text-krim-cyan'} transition-colors duration-500`} />
          </motion.div>
        </motion.div>

        {/* Agentic AI Workforce - Bottom Right */}
        <motion.div
          className="absolute -bottom-12 -right-8"
          animate={{
            x: prefersReducedMotion ? 0 : [2, -2, 2],
            y: prefersReducedMotion ? 0 : [0, -4, 0]
          }}
          transition={{
            x: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.div
            className={`${isHovered ? 'bg-krim-purple/20' : 'bg-krim-mint/20'} p-3 rounded-full border ${isHovered ? 'border-krim-purple/40' : 'border-krim-mint/30'} transition-all duration-500`}
            animate={{
              boxShadow: [
                '0 0 10px rgba(154, 103, 255, 0.3)',
                '0 0 20px rgba(154, 103, 255, 0.5)',
                '0 0 10px rgba(154, 103, 255, 0.3)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Users className={`w-6 h-6 ${isHovered ? 'text-krim-purple' : 'text-krim-mint'} transition-colors duration-500`} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Neural Network Lines with flowing gradients */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Horizontal connections */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-16 h-px"
          style={{
            background: 'linear-gradient(90deg, rgba(50, 255, 199, 0.6) 0%, transparent 100%)'
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            backgroundPosition: ['0% 0%', '100% 0%']
          }}
          transition={{
            opacity: { duration: 2, repeat: Infinity },
            backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" }
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-16 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(0, 255, 247, 0.6) 100%)'
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            backgroundPosition: ['0% 0%', '100% 0%']
          }}
          transition={{
            opacity: { duration: 2.2, repeat: Infinity, delay: 0.5 },
            backgroundPosition: { duration: 3.2, repeat: Infinity, ease: "linear" }
          }}
        />

        {/* Vertical connections */}
        <motion.div
          className="absolute top-1/2 left-1/6 w-px h-16"
          style={{
            background: 'linear-gradient(180deg, rgba(154, 103, 255, 0.6) 0%, transparent 100%)'
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            backgroundPosition: ['0% 0%', '0% 100%']
          }}
          transition={{
            opacity: { duration: 1.8, repeat: Infinity, delay: 1 },
            backgroundPosition: { duration: 2.8, repeat: Infinity, ease: "linear" }
          }}
        />

        <motion.div
          className="absolute top-1/3 right-1/6 w-px h-16"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(50, 255, 199, 0.6) 100%)'
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            backgroundPosition: ['0% 0%', '0% 100%']
          }}
          transition={{
            opacity: { duration: 2.5, repeat: Infinity, delay: 1.5 },
            backgroundPosition: { duration: 3.5, repeat: Infinity, ease: "linear" }
          }}
        />
      </div>

      {/* Mouse proximity reactive glow */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${50 + mousePosition.x}% ${50 + mousePosition.y}%, rgba(50, 255, 199, 0.3) 0%, transparent 60%)`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  )
}
