/**
 * KRIM AI - MAGNETIC BUTTON COMPONENT V3.0
 * Performance-first button with magnetic attraction and aurora gradients
 */
import React, { useRef, useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size' | 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onAnimationStart' | 'onAnimationEnd'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'hero'
  shape?: 'standard' | 'pill'
  glow?: boolean
  magnetic?: boolean
  pulse?: boolean
  loading?: boolean
  icon?: React.ReactNode
  fullWidth?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  shape = 'standard',
  glow = false,
  magnetic = true,
  pulse = false,
  loading = false,
  disabled = false,
  icon,
  fullWidth = false,
  className,
  onMouseMove,
  onMouseLeave,
  type = 'button',
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [magneticTransform, setMagneticTransform] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  
  // Magnetic effect handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !buttonRef.current) return
    
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    // Apply magnetic strength (reduced for better UX)
    const magneticStrength = size === 'hero' ? 0.4 : 0.25
    setMagneticTransform({
      x: x * magneticStrength,
      y: y * magneticStrength
    })
    
    onMouseMove?.(e)
  }, [magnetic, size, onMouseMove])
  
  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setMagneticTransform({ x: 0, y: 0 })
    setIsHovered(false)
    onMouseLeave?.(e)
  }, [onMouseLeave])
  
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])
  
  // Performance optimization: Cleanup on unmount
  useEffect(() => {
    return () => {
      setMagneticTransform({ x: 0, y: 0 })
    }
  }, [])
  
  // Size configurations with mobile optimizations
  const sizeClasses = {
    sm: 'px-3 py-2.5 text-sm',
    md: 'px-4 py-[0.8rem] text-base', // py-3.2 to ensure 44px min height
    lg: 'px-5 py-4 text-base',
    hero: 'px-6 py-4 text-lg md:text-xl mobile-cta-hero'
  }

  // Shape configurations
  const shapeClasses = {
    standard: 'rounded-[12px]',
    pill: 'rounded-full'
  }
  
  // Variant configurations
  const variantClasses = {
    primary: [
      'bg-gradient-to-r from-krim-mint to-krim-cyan',
      'text-krim-deep-space font-bold',
      'hover:from-krim-cyan hover:to-krim-mint',
      'shadow-lg hover:shadow-glow',
      'border-0'
    ].join(' '),
    
    secondary: [
      'bg-transparent border-2 border-krim-mint',
      'text-krim-mint font-semibold',
      'hover:bg-krim-mint hover:text-krim-deep-space',
      'hover:shadow-glow'
    ].join(' '),
    
    ghost: [
      'bg-transparent text-white',
      'hover:bg-surface-elevated',
      'border border-transparent',
      'hover:border-primary/20'
    ].join(' '),
    
    danger: [
      'bg-gradient-to-r from-krim-coral to-red-500',
      'text-white font-bold',
      'hover:from-red-500 hover:to-krim-coral',
      'shadow-lg hover:shadow-lg'
    ].join(' ')
  }
  
  const baseClasses = [
    'relative inline-flex items-center justify-center',
    'transition-all duration-normal',
    'font-display font-semibold tracking-wide',
    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50',
    'transform-gpu', // GPU acceleration
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'disabled:transform-none disabled:shadow-none',
    'max-w-[85vw] md:max-w-none', // Mobile width constraint
    'min-h-[48px]', // Minimum tap target (WCAG AAA)
    'truncate', // Prevent text overflow
    fullWidth && 'w-full',
    // REMOVED: glow && 'animate-pulse-glow' - animates box-shadow (expensive)
    pulse && !loading && 'animate-pulse',
    loading && 'cursor-wait'
  ].filter(Boolean).join(' ')
  
  return (
    <motion.button
      ref={buttonRef}
      type={type}
      className={clsx(
        baseClasses,
        sizeClasses[size],
        shapeClasses[shape],
        variantClasses[variant],
        className
      )}
      disabled={disabled || loading}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      animate={{
        x: magneticTransform.x,
        y: magneticTransform.y,
        scale: isHovered ? (size === 'hero' ? 1.05 : 1.02) : 1
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 1
      }}
      whileTap={{
        scale: isHovered ? 0.98 : 1,
        transition: { duration: 0.1 }
      }}
      {...props}
    >
      {/* Aurora background for primary buttons (static - removed animation for performance) */}
      {variant === 'primary' && (
        <div className="absolute inset-0 rounded-full bg-aurora-primary opacity-20" />
      )}
      
      {/* Glow effect overlay */}
      {(glow || isHovered) && (
        <div className="absolute inset-0 rounded-full bg-current opacity-10 blur-sm" />
      )}
      
      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* Button content */}
      <span className={clsx(
        'relative flex items-center gap-2 transition-opacity duration-fast',
        loading && 'opacity-0'
      )}>
        {icon && (
          <span className="flex-shrink-0">
            {icon}
          </span>
        )}
        {children}
        
        {/* Arrow for primary CTA buttons */}
        {variant === 'primary' && size === 'hero' && (
          <motion.span
            className="ml-2 text-xl"
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            →
          </motion.span>
        )}
      </span>
      
      {/* Magnetic field visualization (dev mode only) */}
      {process.env.NODE_ENV === 'development' && magnetic && isHovered && (
        <div className="absolute inset-0 border border-primary/20 rounded-full animate-ping" />
      )}
    </motion.button>
  )
}

// Export variants as separate components for convenience
export const PrimaryButton = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="primary" {...props} />
)

export const SecondaryButton = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="secondary" {...props} />
)

export const HeroButton = (props: Omit<ButtonProps, 'size'>) => (
  <Button size="hero" shape="standard" glow magnetic pulse {...props} />
)
