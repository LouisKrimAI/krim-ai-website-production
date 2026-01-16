/**
 * KRIM AI - ENHANCED CTA BUTTON
 * Intelligent button with ripple, glow, and magnetic effects
 * Built for the AI brand identity
 */

import React, { useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { RippleButton } from './MicroInteractions'

interface EnhancedCTAProps {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  icon?: React.ReactNode
  magneticEffect?: boolean
  glowEffect?: boolean
  disabled?: boolean
}

export default function EnhancedCTA({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  magneticEffect = true,
  glowEffect = true,
  disabled = false
}: EnhancedCTAProps) {
  const [isHovered, setIsHovered] = useState(false)
  const buttonRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Magnetic effect motion values
  const x = useSpring(0, { stiffness: 150, damping: 15 })
  const y = useSpring(0, { stiffness: 150, damping: 15 })

  // Size configurations
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg'
  }

  // Variant styles
  const variantStyles = {
    primary: {
      base: 'bg-gradient-to-r from-krim-mint to-krim-cyan text-black font-bold',
      glow: 'shadow-lg shadow-krim-mint/40',
      hoverGlow: 'shadow-krim-mint/60'
    },
    secondary: {
      base: 'bg-gradient-to-r from-krim-cyan to-krim-purple text-white font-bold',
      glow: 'shadow-lg shadow-krim-cyan/40',
      hoverGlow: 'shadow-krim-cyan/60'
    },
    outline: {
      base: 'bg-transparent border-2 border-krim-mint text-krim-mint font-bold hover:bg-krim-mint/10',
      glow: 'shadow-md shadow-krim-mint/20',
      hoverGlow: 'shadow-krim-mint/40'
    }
  }

  const variantConfig = variantStyles[variant]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current || prefersReducedMotion || !magneticEffect || disabled) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = (e.clientX - centerX) * 0.3
    const deltaY = (e.clientY - centerY) * 0.3

    x.set(deltaX)
    y.set(deltaY)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  const handleMouseEnter = () => {
    if (!disabled) setIsHovered(true)
  }

  const glowStyles = glowEffect && isHovered && !disabled ? {
    boxShadow: `0 0 30px ${variant === 'primary' ? 'rgba(0, 255, 136, 0.6)' : 'rgba(0, 212, 255, 0.6)'}`
  } : {}

  return (
    <motion.div
      ref={buttonRef}
      className="inline-block"
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={!disabled && !prefersReducedMotion ? { scale: 1.05 } : {}}
      whileTap={!disabled && !prefersReducedMotion ? { scale: 0.95 } : {}}
    >
      <RippleButton
        className={`
          ${sizeClasses[size]}
          ${variantConfig.base}
          ${glowEffect ? variantConfig.glow : ''}
          rounded-lg
          transition-all duration-300
          flex items-center gap-2 justify-center
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${className}
        `}
        style={glowStyles}
        onClick={onClick}
        color={variant === 'primary' ? 'rgba(0, 255, 136, 0.4)' : 'rgba(0, 212, 255, 0.4)'}
      >
        {children}
        {icon && <span className="inline-flex">{icon}</span>}

        {/* Animated border shine */}
        {isHovered && !disabled && !prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                transform: 'translateX(-100%)'
              }}
              animate={{
                transform: ['translateX(-100%)', 'translateX(100%)']
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </motion.div>
        )}
      </RippleButton>
    </motion.div>
  )
}

interface PulsingCTAProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export function PulsingCTA({
  children,
  onClick,
  className = ''
}: PulsingCTAProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.button
      className={`
        px-8 py-4 rounded-lg
        bg-gradient-to-r from-krim-mint to-krim-cyan
        text-black font-bold text-lg
        relative overflow-hidden
        ${className}
      `}
      onClick={onClick}
      whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
      whileTap={!prefersReducedMotion ? { scale: 0.95 } : {}}
    >
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 rounded-lg"
          animate={{
            boxShadow: [
              '0 0 20px rgba(0, 255, 136, 0.5)',
              '0 0 40px rgba(0, 255, 136, 0.8)',
              '0 0 20px rgba(0, 255, 136, 0.5)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
