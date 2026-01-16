/**
 * KRIM AI - 3D CARD COMPONENT
 * Enhanced card with 3D hover effects, neural glow, and micro-interactions
 * Performance-optimized with GPU acceleration
 */

import React, { useRef, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface Card3DProps {
  children: React.ReactNode
  className?: string
  glowColor?: 'mint' | 'cyan' | 'violet' | 'coral' | 'multi'
  intensity?: 'subtle' | 'medium' | 'strong'
  enableTilt?: boolean
  enableGlow?: boolean
  onClick?: () => void
}

export default function Card3D({
  children,
  className = '',
  glowColor = 'mint',
  intensity = 'medium',
  enableTilt = true,
  enableGlow = true,
  onClick
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Motion values for smooth 3D tilt
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  // Spring configurations for smooth, responsive motion
  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })

  // Glow color configurations
  const glowColors = {
    mint: 'rgba(0, 255, 136, 0.4)',
    cyan: 'rgba(0, 212, 255, 0.4)',
    violet: 'rgba(139, 92, 246, 0.4)',
    coral: 'rgba(255, 76, 97, 0.4)',
    multi: 'rgba(0, 255, 136, 0.3), rgba(0, 212, 255, 0.3), rgba(139, 92, 246, 0.2)'
  }

  // Intensity scale factors
  const intensityScale = {
    subtle: { tilt: 2, glow: 15, lift: 1.01 },
    medium: { tilt: 5, glow: 25, lift: 1.02 },
    strong: { tilt: 8, glow: 35, lift: 1.05 }
  }

  const scale = intensityScale[intensity]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion || !enableTilt) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    mouseX.set(x)
    mouseY.set(y)

    // Calculate rotation based on mouse position
    const rotX = (y - 0.5) * -scale.tilt
    const rotY = (x - 0.5) * scale.tilt

    rotateX.set(rotX)
    rotateY.set(rotY)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    rotateX.set(0)
    rotateY.set(0)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  // Base hover animation without tilt (for reduced motion)
  const baseHoverAnimation = prefersReducedMotion ? {} : {
    scale: scale.lift,
    transition: { duration: 0.3, ease: 'easeOut' }
  }

  // Enhanced glow effect
  const glowStyle = enableGlow && isHovered ? {
    boxShadow: `
      0 0 ${scale.glow}px ${glowColors[glowColor]},
      0 0 ${scale.glow * 2}px ${glowColors[glowColor]},
      inset 0 0 ${scale.glow}px ${glowColors[glowColor]}
    `
  } : {}

  return (
    <motion.div
      ref={cardRef}
      className={`
        relative rounded-xl overflow-hidden
        backdrop-blur-xl
        transition-all duration-300
        ${className}
      `}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        ...glowStyle
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={baseHoverAnimation}
      animate={enableTilt && !prefersReducedMotion ? {
        rotateX: rotateX.get(),
        rotateY: rotateY.get()
      } : {}}
    >
      {/* Neural glow border */}
      {enableGlow && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: `linear-gradient(135deg,
              rgba(0, 255, 136, ${isHovered ? '0.3' : '0.1'}),
              rgba(0, 212, 255, ${isHovered ? '0.3' : '0.1'}),
              rgba(139, 92, 246, ${isHovered ? '0.2' : '0.05'})
            )`,
            opacity: isHovered ? 1 : 0.5,
            transition: 'opacity 0.3s ease'
          }}
        />
      )}

      {/* Content */}
      <div
        className="relative z-10"
        style={{ transform: 'translateZ(20px)' }}
      >
        {children}
      </div>

      {/* Shine effect on hover */}
      {isHovered && !prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            background: `radial-gradient(
              circle at ${mouseX.get() * 100}% ${mouseY.get() * 100}%,
              rgba(255, 255, 255, 0.2) 0%,
              transparent 50%
            )`
          }}
        />
      )}
    </motion.div>
  )
}
