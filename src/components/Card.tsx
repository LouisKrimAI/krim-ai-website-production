/**
 * KRIM AI - DEPTH CARD COMPONENT V3.0
 * Performance-first card with glassmorphism and 3D effects
 */
import React, { useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'glass' | 'glass-strong' | 'elevated'
  size?: 'small' | 'medium' | 'large'
  hover3D?: boolean
  glow?: boolean
  interactive?: boolean
  padding?: boolean
}

export default function Card({
  children,
  className = '',
  variant = 'glass',
  size = 'medium',
  hover3D = true,
  glow = false,
  interactive = true,
  padding = true
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  
  // 3D tilt effect handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!hover3D || !cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    
    // Reduced tilt for better UX
    setRotation({ 
      x: y * -10, // Negative for natural tilt
      y: x * 10 
    })
  }, [hover3D])
  
  const handleMouseLeave = useCallback(() => {
    setRotation({ x: 0, y: 0 })
    setIsHovered(false)
  }, [])
  
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])
  
  // Variant styles
  const variantClasses = {
    default: 'bg-surface border border-surface-elevated',
    glass: 'glass',
    'glass-strong': 'glass-strong', 
    elevated: 'bg-surface-elevated border border-primary/10 shadow-xl'
  }
  
  // Size styles
  const sizeClasses = {
    small: padding ? 'p-4' : '',
    medium: padding ? 'p-6' : '',
    large: padding ? 'p-8' : ''
  }
  
  const baseClasses = [
    'rounded-2xl transition-all duration-normal transform-gpu',
    interactive && 'cursor-pointer',
    glow && 'hover:shadow-glow',
    variantClasses[variant],
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ')
  
  return (
    <motion.div
      ref={cardRef}
      className={clsx(baseClasses)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
        scale: isHovered && interactive ? 1.02 : 1
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30
      }}
      style={{
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Glow overlay on hover */}
      {(glow || isHovered) && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-krim-mint/10 to-krim-cyan/10 opacity-0 hover:opacity-100 transition-opacity duration-normal pointer-events-none" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* 3D depth indicator (development mode) */}
      {process.env.NODE_ENV === 'development' && hover3D && isHovered && (
        <div className="absolute -inset-1 border border-primary/20 rounded-2xl pointer-events-none" />
      )}
    </motion.div>
  )
}

// Specialized card variants
export const GlassCard = (props: Omit<CardProps, 'variant'>) => (
  <Card variant="glass" {...props} />
)

export const StrongGlassCard = (props: Omit<CardProps, 'variant'>) => (
  <Card variant="glass-strong" {...props} />
)

export const ElevatedCard = (props: Omit<CardProps, 'variant'>) => (
  <Card variant="elevated" {...props} />
)

// Metric card with built-in animations
interface MetricCardProps extends Omit<CardProps, 'children'> {
  value: string | number
  label: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  icon?: React.ReactNode
}

export function MetricCard({
  value,
  label,
  trend,
  trendValue,
  icon,
  ...cardProps
}: MetricCardProps) {
  const trendColors = {
    up: 'text-krim-mint',
    down: 'text-krim-coral', 
    neutral: 'text-white'
  }
  
  return (
    <Card {...cardProps} glow>
      <div className="text-center">
        {icon && (
          <div className="flex justify-center mb-3 text-primary">
            {icon}
          </div>
        )}
        
        <div className="text-4xl md:text-5xl font-bold font-display text-gradient mb-2">
          {value}
        </div>
        
        <div className="text-white font-medium mb-1">
          {label}
        </div>
        
        {trend && trendValue && (
          <div className={`text-sm font-semibold ${trendColors[trend]}`}>
            {trendValue}
          </div>
        )}
      </div>
    </Card>
  )
}
