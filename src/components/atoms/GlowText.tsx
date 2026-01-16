/**
 * GLOW TEXT - Revolutionary Typography System
 * Typography that breathes, morphs, and creates emotional resonance
 * Transforms static text into living brand messaging
 */

import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface GlowTextProps {
  children: React.ReactNode
  variant?: 'hero' | 'heading' | 'subheading' | 'body' | 'caption'
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'black' | 'kinetic'
  gradient?: 'aurora' | 'mint' | 'cyan' | 'coral' | 'rainbow' | 'none'
  glow?: boolean
  shimmer?: boolean
  morphing?: boolean
  typewriter?: boolean
  reveal?: 'fade' | 'slide' | 'scale' | 'split' | 'none'
  stagger?: number
  className?: string
  style?: React.CSSProperties
  animate?: boolean
}

export default function GlowText({
  children,
  variant = 'body',
  size,
  weight = 'normal',
  gradient = 'none',
  glow = false,
  shimmer = false,
  morphing = false,
  typewriter = false,
  reveal = 'none',
  stagger = 0.1,
  className = '',
  style = {},
  animate = true
}: GlowTextProps) {
  const textRef = useRef<HTMLElement>(null)
  const isInView = useInView(textRef, { once: true, margin: '-100px' })
  const controls = useAnimation()
  const [morphWeight, setMorphWeight] = useState(300)

  // Variant configurations
  const variantConfig = {
    hero: {
      baseSize: 'text-4xl sm:text-5xl lg:text-6xl',
      weight: 'font-black',
      lineHeight: 'leading-none',
      tracking: 'tracking-tight'
    },
    heading: {
      baseSize: 'text-3xl md:text-4xl lg:text-5xl',
      weight: 'font-bold',
      lineHeight: 'leading-tight',
      tracking: 'tracking-tight'
    },
    subheading: {
      baseSize: 'text-xl md:text-2xl',
      weight: 'font-semibold',
      lineHeight: 'leading-snug',
      tracking: 'tracking-normal'
    },
    body: {
      baseSize: 'text-lg md:text-xl',
      weight: 'font-normal',
      lineHeight: 'leading-relaxed',
      tracking: 'tracking-normal'
    },
    caption: {
      baseSize: 'text-sm',
      weight: 'font-medium',
      lineHeight: 'leading-normal',
      tracking: 'tracking-wide'
    }
  }

  // Size mappings
  const sizeMap = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl'
  }

  // Weight mappings
  const weightMap = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    black: 'font-black',
    kinetic: 'kinetic-text'
  }

  // Gradient styles
  const gradientStyles = {
    aurora: {
      background: 'linear-gradient(135deg, #00FF88 0%, #00D4FF 50%, #0099FF 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundSize: '200% 200%'
    },
    mint: {
      background: 'linear-gradient(135deg, #00FF88 0%, #16FFBB 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    cyan: {
      background: 'linear-gradient(135deg, #00D4FF 0%, #0099FF 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    coral: {
      background: 'linear-gradient(135deg, #FF4C61 0%, #FF6B7A 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    rainbow: {
      background: 'linear-gradient(135deg, #00FF88 0%, #00D4FF 25%, #8B5CF6 50%, #FF4C61 75%, #00FF88 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundSize: '300% 300%'
    },
    none: {}
  }

  // Glow effects
  const glowStyles = gradient !== 'none' ? {
    filter: 'drop-shadow(0 0 20px rgba(0,255,136,0.3))',
    textShadow: glow ? '0 0 40px rgba(0,255,136,0.5)' : 'none'
  } : {
    textShadow: glow ? '0 0 20px rgba(255,255,255,0.5)' : 'none'
  }

  const config = variantConfig[variant]
  const finalSize = size ? sizeMap[size] : config.baseSize

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    fade: {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' }
      }
    },
    slide: {
      hidden: { opacity: 0, x: -50 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.8, ease: 'easeOut' }
      }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.6, ease: 'easeOut' }
      }
    },
    split: {
      hidden: { opacity: 0, rotateX: -90 },
      visible: { 
        opacity: 1, 
        rotateX: 0,
        transition: { duration: 0.8, ease: 'easeOut' }
      }
    },
    none: {}
  }

  // Typewriter effect
  const [displayText, setDisplayText] = useState('')
  const text = typeof children === 'string' ? children : ''
  
  useEffect(() => {
    if (!typewriter || !text) return
    
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i))
        i++
      } else {
        clearInterval(timer)
      }
    }, 50)
    
    return () => clearInterval(timer)
  }, [typewriter, text])

  // Kinetic weight morphing
  useEffect(() => {
    if (!morphing) return
    
    const interval = setInterval(() => {
      setMorphWeight(prev => prev === 300 ? 900 : 300)
    }, 2000)
    
    return () => clearInterval(interval)
  }, [morphing])

  // Scroll-triggered animations
  useEffect(() => {
    if (animate && isInView) {
      controls.start('visible')
    }
  }, [isInView, controls, animate])

  // Animation classes
  const animationClasses = [
    shimmer ? 'text-shimmer' : '',
    gradient !== 'none' ? 'aurora-background' : '',
    morphing ? 'transition-all duration-1000' : '',
  ].filter(Boolean).join(' ')

  const combinedStyle = {
    ...style,
    ...gradientStyles[gradient],
    ...glowStyles,
    ...(morphing && { fontWeight: morphWeight }),
    ...(gradient === 'aurora' && {
      animation: 'aurora-flow 10s ease-in-out infinite'
    }),
    ...(gradient === 'rainbow' && {
      animation: 'aurora-flow 15s ease-in-out infinite'
    })
  }

  // Text content
  const textContent = typewriter ? displayText : children

  // Split text for character-by-character animation
  const splitText = () => {
    if (reveal === 'split' && typeof children === 'string') {
      return children.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={itemVariants.split}
          className="inline-block"
          style={{ transformOrigin: 'center bottom' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))
    }
    return textContent
  }

  return (
    <motion.span
      ref={textRef}
      className={`
        ${finalSize}
        ${config.lineHeight}
        ${config.tracking}
        ${weight !== 'kinetic' ? weightMap[weight] : ''}
        ${animationClasses}
        ${className}
      `}
      style={combinedStyle}
      variants={reveal !== 'none' && reveal !== 'split' ? containerVariants : undefined}
      initial={animate ? 'hidden' : undefined}
      animate={animate && isInView ? controls : undefined}
      custom={reveal !== 'none' ? itemVariants[reveal] : undefined}
      whileHover={morphing ? { fontWeight: 900 } : undefined}
    >
      {reveal === 'split' ? (
        <motion.span variants={containerVariants} initial="hidden" animate={animate && isInView ? 'visible' : 'hidden'}>
          {splitText()}
        </motion.span>
      ) : (
        <motion.span
          variants={
            reveal === 'fade' || reveal === 'slide' || reveal === 'scale'
              ? itemVariants[reveal] 
              : undefined
          }
        >
          {textContent}
        </motion.span>
      )}
      
      {/* Typewriter cursor */}
      {typewriter && (
        <motion.span
          className="inline-block w-1 h-[1em] bg-krim-mint ml-1"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </motion.span>
  )
}

// Utility component for multi-line text with staggered reveals
interface GlowTextLinesProps {
  lines: string[]
  variant?: GlowTextProps['variant']
  gradient?: GlowTextProps['gradient']
  glow?: boolean
  stagger?: number
  className?: string
}

export function GlowTextLines({
  lines,
  variant = 'body',
  gradient = 'none',
  glow = false,
  stagger = 0.2,
  className = ''
}: GlowTextLinesProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: stagger,
            delayChildren: 0.1
          }
        }
      }}
      initial="hidden"
      animate="visible"
    >
      {lines.map((line, index) => (
        <GlowText
          key={index}
          variant={variant}
          gradient={gradient}
          glow={glow}
          reveal="fade"
          animate={false} // Controlled by parent
          className="block"
        >
          {line}
        </GlowText>
      ))}
    </motion.div>
  )
}