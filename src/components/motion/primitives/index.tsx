/**
 * KRIM AI - MOTION PRIMITIVES
 * Reusable motion components for consistent animation patterns
 */

import React, { ReactNode, useRef, useEffect, useState } from 'react'
import { motion, useInView, useAnimation, AnimatePresence, MotionProps } from 'framer-motion'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import { duration, distance, glass, glow, viewport } from '../tokens'
import * as variants from '../variants'

interface BaseMotionProps extends MotionProps {
  children: ReactNode
  className?: string
}

/**
 * Reveal - Fade + slide + blur reveal animation
 * Primary primitive for content appearance
 */
export const Reveal: React.FC<BaseMotionProps & {
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  once?: boolean
  amount?: number
}> = ({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up',
  once = true,
  amount = viewport.amountStandard,
  ...props 
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount })
  const prefersReducedMotion = useReducedMotion()
  
  const getVariant = () => {
    if (prefersReducedMotion) return variants.reducedReveal
    
    switch (direction) {
      case 'left': return variants.slideLeft
      case 'right': return variants.slideRight
      case 'down': return {
        hidden: { opacity: 0, y: -distance.base },
        visible: { opacity: 1, y: 0, transition: { duration: duration.moderate / 1000, ease: 'easeOut', delay } }
      }
      default: return {
        hidden: { opacity: 0, y: distance.base },
        visible: { opacity: 1, y: 0, transition: { duration: duration.moderate / 1000, ease: 'easeOut', delay } }
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getVariant()}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/**
 * StaggerGrid - Orchestrated grid/list reveal
 * For multiple items appearing in sequence
 */
export const StaggerGrid: React.FC<BaseMotionProps & {
  staggerDelay?: number
  once?: boolean
}> = ({ 
  children, 
  className = '',
  staggerDelay = 60,
  once = true,
  ...props 
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: 0.1 })
  const prefersReducedMotion = useReducedMotion()
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={prefersReducedMotion ? variants.reducedReveal : {
        visible: {
          opacity: 1,
          transition: { staggerChildren: staggerDelay / 1000 }
        },
        hidden: { opacity: 0 }
      }}
      {...props}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div
          variants={prefersReducedMotion ? variants.reducedReveal : variants.reveal}
          custom={i}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

/**
 * HoverLiftCard - Subtle lift + glow on hover
 * For interactive cards and clickable elements
 */
export const HoverLiftCard: React.FC<BaseMotionProps & {
  glowColor?: string
  liftDistance?: number
}> = ({ 
  children, 
  className = '',
  glowColor = 'rgba(0, 255, 136, 0.2)',
  liftDistance = distance.tiny,
  ...props 
}) => {
  const prefersReducedMotion = useReducedMotion()
  
  return (
    <motion.div
      className={className}
      whileHover={prefersReducedMotion ? {} : {
        y: -liftDistance,
        boxShadow: `0 ${liftDistance * 2}px ${liftDistance * 4}px ${glowColor}`,
        transition: { duration: duration.fast / 1000, ease: 'easeOut' }
      }}
      whileTap={prefersReducedMotion ? {} : {
        scale: 0.98,
        transition: { duration: duration.micro / 1000 }
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/**
 * MetricCount - Animated number counter
 * Only for meaningful metrics, not decoration
 */
export const MetricCount: React.FC<{
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
  once?: boolean
}> = ({ 
  value, 
  suffix = '', 
  prefix = '',
  duration: customDuration,
  className = '',
  once = true
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once })
  const [count, setCount] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  
  useEffect(() => {
    if (isInView) {
      if (prefersReducedMotion) {
        setCount(value)
        return
      }
      
      const animationDuration = customDuration || duration.slow
      const steps = 60
      const increment = value / steps
      let current = 0
      
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, animationDuration / steps)
      
      return () => clearInterval(timer)
    }
  }, [isInView, value, prefersReducedMotion, customDuration])
  
  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

/**
 * PathDraw - SVG path drawing animation
 * For flow diagrams and connections
 */
export const PathDraw: React.FC<{
  d: string
  strokeColor?: string
  strokeWidth?: number
  duration?: number
  delay?: number
  className?: string
}> = ({ 
  d, 
  strokeColor = '#00FF88',
  strokeWidth = 2,
  duration: customDuration = duration.slow,
  delay = 0,
  className = ''
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const prefersReducedMotion = useReducedMotion()
  
  return (
    <svg ref={ref} className={className}>
      <motion.path
        d={d}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill="none"
        initial={prefersReducedMotion ? { opacity: 0 } : { pathLength: 0, opacity: 0 }}
        animate={isInView ? 
          (prefersReducedMotion ? { opacity: 1 } : { pathLength: 1, opacity: 1 }) : 
          (prefersReducedMotion ? { opacity: 0 } : { pathLength: 0, opacity: 0 })
        }
        transition={{
          pathLength: { duration: customDuration / 1000, ease: 'easeOut', delay },
          opacity: { duration: duration.fast / 1000, delay }
        }}
      />
    </svg>
  )
}

/**
 * PulseNode - Minimal pulse for active states
 * Maximum 2 loops to avoid distraction
 */
export const PulseNode: React.FC<BaseMotionProps & {
  pulseColor?: string
  pulseScale?: number
  loops?: number
}> = ({ 
  children, 
  className = '',
  pulseColor = 'rgba(0, 255, 136, 0.4)',
  pulseScale = 1.05,
  loops = 2,
  ...props 
}) => {
  const prefersReducedMotion = useReducedMotion()
  const [animationComplete, setAnimationComplete] = useState(false)
  
  return (
    <motion.div
      className={className}
      animate={!prefersReducedMotion && !animationComplete ? {
        scale: [1, pulseScale, 1],
        boxShadow: [
          `0 0 0 0 ${pulseColor}`,
          `0 0 20px 10px ${pulseColor}`,
          `0 0 0 0 ${pulseColor}`
        ]
      } : {}}
      transition={{
        duration: 1.5,
        repeat: loops - 1,
        ease: 'easeInOut'
      }}
      onAnimationComplete={() => setAnimationComplete(true)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/**
 * StepFlow - Sequential flow with moving indicator
 * For process flows and pipelines
 */
export const StepFlow: React.FC<{
  steps: Array<{ id: string; content: ReactNode }>
  className?: string
  activeStep?: number
}> = ({ 
  steps, 
  className = '',
  activeStep = 0
}) => {
  const [currentStep, setCurrentStep] = useState(activeStep)
  const prefersReducedMotion = useReducedMotion()
  
  useEffect(() => {
    if (!prefersReducedMotion && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [currentStep, steps.length, prefersReducedMotion])
  
  return (
    <div className={className}>
      {steps.map((step, index) => (
        <motion.div
          key={step.id}
          initial={{ opacity: 0.3 }}
          animate={{
            opacity: index <= currentStep ? 1 : 0.3,
            scale: index === currentStep ? 1.05 : 1
          }}
          transition={{ duration: duration.moderate / 1000 }}
        >
          {step.content}
        </motion.div>
      ))}
    </div>
  )
}

/**
 * LayerStack - Cards assembling into stack
 * For showing depth and hierarchy
 */
export const LayerStack: React.FC<{
  layers: Array<{ id: string; content: ReactNode; color?: string }>
  className?: string
  spacing?: number
}> = ({ 
  layers, 
  className = '',
  spacing = 20
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const prefersReducedMotion = useReducedMotion()
  
  return (
    <div ref={ref} className={`relative ${className}`}>
      {layers.map((layer, index) => (
        <motion.div
          key={layer.id}
          className="absolute inset-0"
          style={{
            zIndex: layers.length - index,
            backgroundColor: layer.color || 'transparent'
          }}
          initial={prefersReducedMotion ? { opacity: 0 } : {
            opacity: 0,
            y: spacing * (index + 1),
            rotateX: -15
          }}
          animate={isInView ? (prefersReducedMotion ? { opacity: 1 } : {
            opacity: 1,
            y: spacing * index,
            rotateX: 0
          }) : {}}
          transition={{
            duration: duration.slow / 1000,
            delay: index * (duration.fast / 1000),
            ease: 'easeOut'
          }}
        >
          {layer.content}
        </motion.div>
      ))}
    </div>
  )
}

/**
 * GlassContainer - Content with glass morphism
 * Wraps any content with appropriate glass effect
 */
export const GlassContainer: React.FC<BaseMotionProps & {
  glassLevel?: keyof typeof glass
  glowOnHover?: boolean
}> = ({ 
  children, 
  className = '',
  glassLevel = 'standard',
  glowOnHover = false,
  ...props 
}) => {
  const glassStyle = glass[glassLevel]
  const prefersReducedMotion = useReducedMotion()
  
  return (
    <motion.div
      className={`rounded-xl ${className}`}
      style={{
        backgroundColor: glassStyle.bg,
        border: `1px solid ${glassStyle.border}`,
        backdropFilter: `${glassStyle.blur} ${glassStyle.saturate}`,
        WebkitBackdropFilter: `${glassStyle.blur} ${glassStyle.saturate}`,
      }}
      whileHover={glowOnHover && !prefersReducedMotion ? {
        boxShadow: glow.soft,
        transition: { duration: duration.fast / 1000 }
      } : {}}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Export all primitives
export default {
  Reveal,
  StaggerGrid,
  HoverLiftCard,
  MetricCount,
  PathDraw,
  PulseNode,
  StepFlow,
  LayerStack,
  GlassContainer
}