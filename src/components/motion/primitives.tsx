/**
 * KRIM AI - MOTION PRIMITIVES
 * Reusable animation components for consistent motion design
 */

import React, { ReactNode, useRef } from 'react'
import { motion, useInView, MotionProps } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { glass, duration, easing } from './tokens'
import clsx from 'clsx'

interface BaseMotionProps {
  children: ReactNode
  className?: string
}

/**
 * Reveal Animation - Reveal content on scroll with directional entrance
 */
interface RevealProps extends BaseMotionProps {
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  once?: boolean
  distance?: number
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  once = false,
  distance = 30,
  className = ''
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-50px' })
  const prefersReducedMotion = useReducedMotion()

  const directionOffsets = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={prefersReducedMotion ? {} : { 
        opacity: 0, 
        ...directionOffsets[direction]
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        y: 0 
      } : {}}
      transition={{
        duration: duration.base / 1000,
        delay,
        ease: easing.premium
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * StaggerGrid - Stagger children animations in a grid layout
 */
interface StaggerGridProps extends BaseMotionProps {
  staggerDelay?: number
  animateOnce?: boolean
}

export const StaggerGrid: React.FC<StaggerGridProps> = ({
  children,
  staggerDelay = 50,
  animateOnce = true,
  className = ''
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: animateOnce, margin: '-50px' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={prefersReducedMotion ? {} : {
        visible: {
          transition: {
            staggerChildren: staggerDelay / 1000
          }
        }
      }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={prefersReducedMotion ? {} : {
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: {
                duration: duration.base / 1000,
                ease: easing.premium
              }
            }
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

/**
 * HoverLiftCard - Card that lifts on hover with optional glow
 */
interface HoverLiftCardProps extends BaseMotionProps {
  liftDistance?: number
  glowColor?: string
  scale?: number
}

export const HoverLiftCard: React.FC<HoverLiftCardProps & MotionProps> = ({
  children,
  liftDistance = 4,
  glowColor = 'rgba(0, 255, 136, 0.1)',
  scale = 1.02,
  className = '',
  ...motionProps
}) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={clsx('relative cursor-pointer', className)}
      whileHover={prefersReducedMotion ? {} : {
        y: -liftDistance,
        scale,
        boxShadow: `0 20px 40px ${glowColor}`
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}

/**
 * PulseNode - Node with pulsing animation
 */
interface PulseNodeProps extends BaseMotionProps {
  pulseColor?: string
  pulseScale?: number
  loops?: number | 'infinite'
}

export const PulseNode: React.FC<PulseNodeProps> = ({
  children,
  pulseColor = 'rgba(0, 255, 136, 0.3)',
  pulseScale = 1.1,
  loops = 'infinite',
  className = ''
}) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={clsx('relative', className)}
      animate={prefersReducedMotion ? {} : {
        scale: [1, pulseScale, 1]
      }}
      transition={{
        duration: 2,
        repeat: loops === 'infinite' ? Infinity : loops,
        ease: "easeInOut"
      }}
      style={{
        filter: `drop-shadow(0 0 20px ${pulseColor})`
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * GlassContainer - Glassmorphism container with levels
 */
interface GlassContainerProps extends BaseMotionProps {
  glassLevel?: keyof typeof glass
  style?: React.CSSProperties
}

export const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  glassLevel = 'standard',
  className = '',
  style = {}
}) => {
  const glassStyles = glass[glassLevel]
  
  return (
    <div
      className={clsx('relative', className)}
      style={{
        ...glassStyles,
        ...style
      }}
    >
      {children}
    </div>
  )
}

/**
 * FloatingElement - Element that floats with subtle animation
 */
interface FloatingElementProps extends BaseMotionProps {
  floatDistance?: number
  duration?: number
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  floatDistance = 10,
  duration: customDuration = 4,
  className = ''
}) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      animate={prefersReducedMotion ? {} : {
        y: [-floatDistance, floatDistance, -floatDistance]
      }}
      transition={{
        duration: customDuration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * ParallaxContainer - Container with parallax scrolling effect
 */
interface ParallaxContainerProps extends BaseMotionProps {
  speed?: number
}

export const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  children,
  speed = 0.5,
  className = ''
}) => {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        willChange: prefersReducedMotion ? 'auto' : 'transform'
      }}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 100
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * ScaleOnScroll - Scale element based on scroll position
 */
interface ScaleOnScrollProps extends BaseMotionProps {
  minScale?: number
  maxScale?: number
}

export const ScaleOnScroll: React.FC<ScaleOnScrollProps> = ({
  children,
  minScale = 0.8,
  maxScale = 1,
  className = ''
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: '-100px' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={prefersReducedMotion ? {} : {
        scale: isInView ? maxScale : minScale
      }}
      transition={{
        duration: duration.slow / 1000,
        ease: easing.premium
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * MetricCount - Animated metric counter
 */
interface MetricCountProps {
  value: number | string
  label: string
  suffix?: string
  className?: string
}

export const MetricCount: React.FC<MetricCountProps> = ({
  value,
  label,
  suffix = '',
  className = ''
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={clsx('text-center', className)}
      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: duration.base / 1000,
        ease: easing.premium
      }}
    >
      <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
        {value}{suffix}
      </div>
      <div className="text-sm text-gray-400 uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  )
}

/**
 * PathDraw - SVG path drawing animation
 */
interface PathDrawProps {
  d: string
  stroke?: string
  strokeWidth?: number
  fill?: string
  duration?: number
  delay?: number
  className?: string
}

export const PathDraw: React.FC<PathDrawProps> = ({
  d,
  stroke = 'currentColor',
  strokeWidth = 2,
  fill = 'none',
  duration: customDuration = 2,
  delay = 0,
  className = ''
}) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.path
      d={d}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      className={className}
      initial={prefersReducedMotion ? {} : { pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        pathLength: {
          duration: customDuration,
          delay,
          ease: "easeInOut"
        },
        opacity: {
          duration: 0.3,
          delay
        }
      }}
    />
  )
}