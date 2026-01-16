/**
 * KRIM AI - STARFIELD LAYOUT WRAPPER
 * Universal page wrapper ensuring seamless starfield continuity
 * Every page floats in the same cosmic space
 */

import React, { ReactNode, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { duration, glass, depth, easing } from './tokens'
import { pageTransition } from './variants'
import { GlassContainer } from './primitives'

interface StarfieldLayoutProps {
  children: ReactNode
  pageType: 'hero' | 'product' | 'sales' | 'information' | 'legal' | 'landing'
  contentDensity?: 'sparse' | 'moderate' | 'dense'
  heroSection?: boolean
  className?: string
}

// Glass morphism levels by page type
const GLASS_LEVELS = {
  hero: {
    sparse: 'ultraLight',
    moderate: 'light',
    dense: 'standard'
  },
  product: {
    sparse: 'light',
    moderate: 'standard',
    dense: 'medium'
  },
  sales: {
    sparse: 'standard',
    moderate: 'medium',
    dense: 'medium'
  },
  information: {
    sparse: 'standard',
    moderate: 'medium',
    dense: 'dense'
  },
  legal: {
    sparse: 'dense',
    moderate: 'dense',
    dense: 'solid'
  },
  landing: {
    sparse: 'ultraLight',
    moderate: 'light',
    dense: 'standard'
  }
} as const

// Content elevation strategies by page type
const ELEVATION_STRATEGY = {
  hero: {
    mainContent: 20,
    cards: 30,
    cta: 40
  },
  product: {
    mainContent: 15,
    cards: 25,
    cta: 35
  },
  sales: {
    mainContent: 10,
    cards: 20,
    cta: 50
  },
  information: {
    mainContent: 10,
    cards: 15,
    cta: 25
  },
  legal: {
    mainContent: 5,
    cards: 10,
    cta: 15
  },
  landing: {
    mainContent: 25,
    cards: 35,
    cta: 45
  }
}

export const StarfieldLayout: React.FC<StarfieldLayoutProps> = ({
  children,
  pageType,
  contentDensity = 'moderate',
  heroSection = false,
  className = ''
}) => {
  const location = useLocation()
  const prefersReducedMotion = useReducedMotion()
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // Get appropriate glass level
  const glassLevel = GLASS_LEVELS[pageType][contentDensity] as keyof typeof glass
  const elevation = ELEVATION_STRATEGY[pageType]
  
  // Handle page transitions - reduced for seamless experience
  useEffect(() => {
    setIsTransitioning(true)
    const timer = setTimeout(() => {
      setIsTransitioning(false)
    }, duration.fast) // Reduced from glacial to fast for seamless transitions
    return () => clearTimeout(timer)
  }, [location.pathname])
  
  // Starfield continuity class
  const starfieldContinuityClass = `starfield-page starfield-${pageType}`
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        className={`relative min-h-screen ${starfieldContinuityClass} ${className}`}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={prefersReducedMotion ? {} : pageTransition}
        style={{
          // Ensure content floats above starfield
          position: 'relative',
          zIndex: depth.content
        }}
      >
        {/* Page transition overlay - subtle and quick */}
        {isTransitioning && !prefersReducedMotion && (
          <motion.div
            className="fixed inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }} // Reduced opacity for subtlety
            exit={{ opacity: 0 }}
            transition={{ duration: duration.instant / 1000 }} // Much faster transition
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0, 255, 136, 0.02) 0%, transparent 70%)',
              zIndex: depth.modal - 1
            }}
          />
        )}
        
        {/* Main content wrapper with glass morphism */}
        <div 
          className="relative"
          style={{
            // Content elevation
            transform: heroSection ? 'translateZ(0)' : `translateZ(${elevation.mainContent}px)`,
            transformStyle: 'preserve-3d'
          }}
        >
          {children}
        </div>
        
        {/* Depth cues - subtle shadows */}
        {!prefersReducedMotion && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                linear-gradient(180deg, 
                  transparent 0%, 
                  rgba(0, 0, 0, 0.02) 50%, 
                  rgba(0, 0, 0, 0.05) 100%
                )
              `,
              zIndex: depth.background,
              mixBlendMode: 'multiply'
            }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}

// Content section wrapper with automatic glass morphism
export const StarfieldSection: React.FC<{
  children: ReactNode
  glassLevel?: keyof typeof glass
  elevated?: boolean
  className?: string
}> = ({
  children,
  glassLevel = 'standard',
  elevated = false,
  className = ''
}) => {
  const prefersReducedMotion = useReducedMotion()
  
  return (
    <GlassContainer
      glassLevel={glassLevel}
      className={`relative ${className}`}
      style={{
        transform: elevated && !prefersReducedMotion ? 'translateY(-4px)' : undefined,
        transition: `transform ${duration.base}ms ${easing.premium.join(' ')}`
      }}
    >
      {children}
    </GlassContainer>
  )
}

// Floating card component
export const FloatingCard: React.FC<{
  children: ReactNode
  elevation?: 'low' | 'medium' | 'high'
  glassLevel?: keyof typeof glass
  className?: string
}> = ({
  children,
  elevation = 'medium',
  glassLevel = 'light',
  className = ''
}) => {
  const elevationMap = {
    low: 10,
    medium: 20,
    high: 30
  }
  
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -4,
        boxShadow: '0 20px 40px rgba(0, 255, 136, 0.1)'
      }}
      transition={{
        duration: duration.base / 1000,
        ease: easing.premium
      }}
      style={{
        transform: `translateZ(${elevationMap[elevation]}px)`,
        transformStyle: 'preserve-3d'
      }}
    >
      <GlassContainer glassLevel={glassLevel}>
        {children}
      </GlassContainer>
    </motion.div>
  )
}

// Hero content wrapper with ultra-transparent glass
export const HeroContent: React.FC<{
  children: ReactNode
  className?: string
}> = ({ children, className = '' }) => {
  return (
    <StarfieldSection
      glassLevel="ultraLight"
      elevated
      className={`hero-content ${className}`}
    >
      {children}
    </StarfieldSection>
  )
}

// Form wrapper with appropriate density
export const FormContainer: React.FC<{
  children: ReactNode
  className?: string
}> = ({ children, className = '' }) => {
  return (
    <StarfieldSection
      glassLevel="medium"
      className={`form-container ${className}`}
    >
      {children}
    </StarfieldSection>
  )
}

// Legal text wrapper with maximum readability
export const LegalContent: React.FC<{
  children: ReactNode
  className?: string
}> = ({ children, className = '' }) => {
  return (
    <StarfieldSection
      glassLevel="solid"
      className={`legal-content ${className}`}
    >
      {children}
    </StarfieldSection>
  )
}

export default StarfieldLayout