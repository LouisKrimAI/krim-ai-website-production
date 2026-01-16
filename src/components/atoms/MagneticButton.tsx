/**
 * MAGNETIC BUTTON - Revolutionary Conversion Architecture
 * Creates gravitational pull that makes clicking inevitable
 * Part of Krim AI's Depth System for loan servicing transformation
 */

import React, { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Lightning } from '@phosphor-icons/react'

interface MagneticButtonProps {
  children: React.ReactNode
  size?: 'small' | 'medium' | 'large' | 'hero'
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  magnetic?: boolean
  particles?: boolean
  glow?: boolean
  pulse?: boolean
  disabled?: boolean
  loading?: boolean
  icon?: 'arrow' | 'zap' | 'none'
  onClick?: () => void
  className?: string
}

export default function MagneticButton({
  children,
  size = 'medium',
  variant = 'primary',
  magnetic = true,
  particles = false,
  glow = false,
  pulse = false,
  disabled = false,
  loading = false,
  icon = 'arrow',
  onClick,
  className = ''
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  // Magnetic field physics
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.8 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  // Size configurations
  const sizeConfig = {
    small: {
      padding: 'px-4 py-2',
      text: 'text-sm',
      height: 'h-10',
      scale: 1.02,
      magnetRadius: 100,
      magnetStrength: 0.15
    },
    medium: {
      padding: 'px-6 py-3',
      text: 'text-base',
      height: 'h-12',
      scale: 1.03,
      magnetRadius: 120,
      magnetStrength: 0.2
    },
    large: {
      padding: 'px-8 py-4',
      text: 'text-lg',
      height: 'h-14',
      scale: 1.04,
      magnetStrength: 0.25,
      magnetRadius: 150
    },
    hero: {
      padding: 'px-12 py-6',
      text: 'text-xl font-semibold',
      height: 'h-20',
      scale: 1.06,
      magnetRadius: 200,
      magnetStrength: 0.3
    }
  }

  // Variant styles
  const variantStyles = {
    primary: {
      base: 'bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-size-200 text-depth-space font-semibold shadow-lg',
      hover: 'hover:bg-pos-100 hover:shadow-2xl',
      glow: 'hover:shadow-[0_0_40px_rgba(0,255,136,0.5)]'
    },
    secondary: {
      base: 'glass-medium border border-white/20 text-white hover:glass-strong',
      hover: 'hover:border-krim-mint/40 hover:text-krim-mint',
      glow: 'hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]'
    },
    ghost: {
      base: 'text-white hover:text-krim-mint border border-white/10 hover:border-krim-mint/30',
      hover: 'hover:bg-krim-mint/10',
      glow: 'hover:shadow-[0_0_20px_rgba(0,255,136,0.2)]'
    },
    danger: {
      base: 'bg-krim-coral text-white font-semibold',
      hover: 'hover:bg-krim-coral/90',
      glow: 'hover:shadow-[0_0_30px_rgba(255,76,97,0.4)]'
    }
  }

  const config = sizeConfig[size]
  const styles = variantStyles[variant]

  // Magnetic field effect
  useEffect(() => {
    if (!magnetic || !buttonRef.current) return

    const button = buttonRef.current

    const handleMouseMove = (e: MouseEvent) => {
      if (disabled || loading) return

      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      )

      if (distance < config.magnetRadius) {
        const strength = (config.magnetRadius - distance) / config.magnetRadius
        const deltaX = (e.clientX - centerX) * strength * config.magnetStrength
        const deltaY = (e.clientY - centerY) * strength * config.magnetStrength
        
        x.set(deltaX)
        y.set(deltaY)
      } else {
        x.set(0)
        y.set(0)
      }
    }

    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
    }

    document.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [magnetic, x, y, config, disabled, loading])

  // Icon component
  const IconComponent = () => {
    if (icon === 'none' || loading) return null
    
    const iconProps = {
      size: size === 'hero' ? 24 : size === 'large' ? 20 : 16,
      className: 'transition-transform duration-300 group-hover:translate-x-1'
    }
    
    return (
      <motion.span
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 10, opacity: 0 }}
        className="ml-2"
      >
        {icon === 'arrow' ? <ArrowRight {...iconProps} /> : <Lightning {...iconProps} />}
      </motion.span>
    )
  }

  // Loading spinner
  const LoadingSpinner = () => (
    <motion.div
      className="w-5 h-5 border-2 border-current border-t-transparent rounded-full mr-2"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  )

  // Particle effect (simplified for performance)
  const ParticleEffect = () => {
    if (!particles || !isHovered) return null
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-krim-mint rounded-full"
            initial={{ 
              x: '50%', 
              y: '50%', 
              scale: 0, 
              opacity: 1 
            }}
            animate={{
              x: `${50 + (Math.random() - 0.5) * 200}%`,
              y: `${50 + (Math.random() - 0.5) * 200}%`,
              scale: [0, 1, 0],
              opacity: [1, 0.8, 0]
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.1,
              repeat: Infinity,
              repeatDelay: 2
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <motion.button
      ref={buttonRef}
      className={`
        group relative overflow-hidden rounded-xl transition-all duration-300 
        ${config.padding} ${config.text} ${config.height}
        ${styles.base} ${styles.hover}
        ${glow ? styles.glow : ''}
        ${pulse ? 'animate-pulse' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
        transform-gpu will-change-transform
      `}
      style={{
        x: springX,
        y: springY,
        backgroundSize: '200% 100%',
        backgroundPosition: isHovered ? '100% 0' : '0% 0'
      }}
      disabled={disabled || loading}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        scale: disabled || loading ? 1 : config.scale,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: disabled || loading ? 1 : 0.98,
        transition: { duration: 0.1 }
      }}
    >
      {/* Background aurora effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
        animate={{
          background: [
            'linear-gradient(45deg, transparent, rgba(0,255,136,0.1), transparent)',
            'linear-gradient(225deg, transparent, rgba(0,212,255,0.1), transparent)',
            'linear-gradient(45deg, transparent, rgba(0,255,136,0.1), transparent)'
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Particle system */}
      <ParticleEffect />

      {/* Content */}
      <div className="relative flex items-center justify-center">
        {loading && <LoadingSpinner />}
        <span>{children}</span>
        <IconComponent />
      </div>

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        initial={false}
        whileTap={{
          background: [
            'transparent',
            'rgba(255,255,255,0.1)',
            'transparent'
          ]
        }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  )
}

// Export utilities for magnetic field calculations
export const useMagneticEffect = (strength: number = 0.3, radius: number = 150) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 400 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)
  
  return { x, y, springX, springY, strength, radius }
}