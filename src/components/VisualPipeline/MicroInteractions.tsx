/**
 * KRIM AI - Advanced Micro-interactions System
 * Framer Motion powered interactions inspired by huly.io
 */
import React, { useState, useRef, useEffect, useCallback, PropsWithChildren } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useInView, MotionValue } from 'framer-motion'

// Enhanced Button with multiple interaction states
interface InteractiveButtonProps extends PropsWithChildren {
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  glow?: boolean
  magnetic?: boolean
  onClick?: () => void
  disabled?: boolean
}

export const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  glow = true,
  magnetic = true,
  onClick,
  disabled = false
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  // Mouse position tracking for magnetic effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Spring animations for smooth magnetic effect
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 })

  // Handle mouse movement for magnetic effect
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!magnetic || !buttonRef.current) return
    
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * 0.25
    const deltaY = (e.clientY - centerY) * 0.25
    
    mouseX.set(deltaX)
    mouseY.set(deltaY)
  }, [magnetic, mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  // Style variants
  const variants = {
    primary: 'bg-gradient-to-r from-krim-mint to-krim-cyan text-krim-dark',
    secondary: 'bg-white/10 text-white border border-white/20',
    ghost: 'text-white hover:bg-white/10'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <motion.button
      ref={buttonRef}
      className={`
        relative overflow-hidden rounded-lg font-medium transition-all duration-200
        ${variants[variant]} ${sizes[size]} ${className}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      style={{
        x: springX,
        y: springY
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={disabled ? undefined : onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow effect */}
      {glow && (
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            background: variant === 'primary' 
              ? 'linear-gradient(45deg, #16FFBB, #00D4FF)'
              : 'rgba(255, 255, 255, 0.1)',
            filter: 'blur(8px)',
            opacity: 0
          }}
          animate={{
            opacity: isHovered ? 0.6 : 0,
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>

      {/* Ripple effect on click */}
      <AnimatePresence>
        {isPressed && (
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-lg"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  )
}

// Advanced Card with hover effects
interface InteractiveCardProps extends PropsWithChildren {
  className?: string
  variant?: 'default' | 'glass' | 'elevated'
  hoverable?: boolean
  clickable?: boolean
  tiltEffect?: boolean
  glowEffect?: boolean
  onClick?: () => void
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  className = '',
  variant = 'default',
  hoverable = true,
  clickable = false,
  tiltEffect = true,
  glowEffect = false,
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  // Mouse position for tilt effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Transform values for 3D tilt
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15])
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!tiltEffect || !cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const rotateXValue = (e.clientY - centerY) / (rect.height / 2)
    const rotateYValue = (e.clientX - centerX) / (rect.width / 2)
    
    mouseX.set(rotateYValue)
    mouseY.set(rotateXValue)
  }, [tiltEffect, mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  // Style variants
  const variants = {
    default: 'bg-white/5 border border-white/10',
    glass: 'bg-white/10 backdrop-blur-md border border-white/20',
    elevated: 'bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-2xl'
  }

  return (
    <motion.div
      ref={cardRef}
      className={`
        relative rounded-xl overflow-hidden transition-all duration-300
        ${variants[variant]} ${className}
        ${clickable ? 'cursor-pointer' : ''}
      `}
      style={tiltEffect ? {
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      } : undefined}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={clickable ? onClick : undefined}
      whileHover={hoverable ? { 
        scale: 1.02,
        transition: { duration: 0.2 }
      } : undefined}
      whileTap={clickable ? { scale: 0.98 } : undefined}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Glow effect */}
      {glowEffect && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0"
          style={{
            background: 'linear-gradient(45deg, #16FFBB22, #00D4FF22)',
            filter: 'blur(20px)'
          }}
          animate={{
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Shimmer effect on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 0.6 }}
            style={{ transform: 'skewX(-20deg)' }}
          />
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
    </motion.div>
  )
}

// Cursor follower effect
interface CursorFollowerProps {
  children?: React.ReactNode
  showDot?: boolean
  showRing?: boolean
  mixBlendMode?: string
}

export const CursorFollower: React.FC<CursorFollowerProps> = ({
  children,
  showDot = true,
  showRing = true,
  mixBlendMode = 'difference'
}) => {
  const cursorDot = useRef<HTMLDivElement>(null)
  const cursorRing = useRef<HTMLDivElement>(null)
  
  const [isHoveringClickable, setIsHoveringClickable] = useState(false)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e

      if (cursorDot.current) {
        cursorDot.current.style.left = `${clientX}px`
        cursorDot.current.style.top = `${clientY}px`
      }

      if (cursorRing.current) {
        cursorRing.current.style.left = `${clientX}px`
        cursorRing.current.style.top = `${clientY}px`
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('a, button, [role="button"], .cursor-pointer')) {
        setIsHoveringClickable(true)
      } else {
        setIsHoveringClickable(false)
      }
    }

    document.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <>
      {showDot && (
        <div
          ref={cursorDot}
          className="cursor-dot fixed w-2 h-2 rounded-full pointer-events-none z-[9999] transition-transform duration-100"
          style={{
            backgroundColor: '#16FFBB',
            transform: 'translate(-50%, -50%)',
            mixBlendMode: mixBlendMode as any,
            scale: isHoveringClickable ? 2 : 1
          }}
        />
      )}
      
      {showRing && (
        <div
          ref={cursorRing}
          className="cursor-ring fixed w-8 h-8 rounded-full border border-white/30 pointer-events-none z-[9998] transition-all duration-300"
          style={{
            transform: 'translate(-50%, -50%)',
            mixBlendMode: mixBlendMode as any,
            scale: isHoveringClickable ? 1.5 : 1
          }}
        />
      )}
      
      {children}
    </>
  )
}

// Staggered text animation
interface AnimatedTextProps {
  text: string
  className?: string
  staggerDelay?: number
  animation?: 'fadeIn' | 'slideUp' | 'typewriter'
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  staggerDelay = 0.1,
  animation = 'slideUp'
}) => {
  const isInView = useInView(useRef(null), { once: true, margin: '-100px' })
  const words = text.split(' ')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay
      }
    }
  }

  const wordVariants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 }
    },
    typewriter: {
      hidden: { width: 0 },
      visible: { width: 'auto' }
    }
  }[animation]

  return (
    <motion.div
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
          variants={wordVariants}
          transition={{
            duration: 0.6,
            ease: [0.0, 0.0, 0.2, 1]
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Loading spinner with advanced animations
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'dots' | 'spinner' | 'pulse' | 'bars'
  color?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'spinner',
  color = '#16FFBB'
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const dotSizes = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  }

  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={`${dotSizes[size]} rounded-full`}
                style={{ backgroundColor: color }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        )

      case 'pulse':
        return (
          <motion.div
            className={`${sizes[size]} rounded-full border-2`}
            style={{ borderColor: color }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        )

      case 'bars':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-1 rounded-full"
                style={{ 
                  backgroundColor: color,
                  height: size === 'sm' ? '16px' : size === 'md' ? '24px' : '32px'
                }}
                animate={{
                  scaleY: [1, 0.4, 1]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        )

      case 'spinner':
      default:
        return (
          <motion.div
            className={`${sizes[size]} border-2 rounded-full`}
            style={{ 
              borderColor: `${color}33`,
              borderTopColor: color
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        )
    }
  }

  return (
    <div className="flex items-center justify-center">
      {renderSpinner()}
    </div>
  )
}

// Parallax scroll effect
interface ParallaxScrollProps extends PropsWithChildren {
  offset?: number
  className?: string
}

export const ParallaxScroll: React.FC<ParallaxScrollProps> = ({
  children,
  offset = 50,
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useMotionValue(0) as any
  const y = useTransform(scrollYProgress, [0, 1], [0, -offset])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y }}
    >
      {children}
    </motion.div>
  )
}

export default {
  InteractiveButton,
  InteractiveCard,
  CursorFollower,
  AnimatedText,
  LoadingSpinner,
  ParallaxScroll
}