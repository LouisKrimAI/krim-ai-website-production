/**
 * KRIM AI - ENTERPRISE STARFIELD BACKGROUND V4.0
 * Pure linear drift with no central convergence
 * Stars appear randomly and drift naturally through space
 * No scaling, no radial patterns, no focal points
 */

import React, { useMemo, useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { getDeviceCapability } from '../utils/performance'

interface StarfieldBackgroundProps {
  className?: string
  continuityMode?: boolean
  intensity?: 'minimal' | 'standard' | 'premium' | 'adaptive'
}

interface StarfieldConfig {
  show: boolean
  starCount: number
  opacity: number
  animationEnabled: boolean
  intensity: 'minimal' | 'standard' | 'premium'
  driftSpeed: number // seconds for full traversal
  edgeFadeZone: number // percentage from edges where stars fade
}

interface Star {
  id: number
  x: number // Current X position (0-100)
  y: number // Current Y position (0-100)
  vx: number // X velocity (-1 to 1)
  vy: number // Y velocity (-1 to 1)
  size: number // Star size in pixels
  opacity: number // Base opacity
  depth: number // Z-depth for parallax (0.3 to 1)
  twinkleOffset: number // Offset for twinkle animation
}

export default function StarfieldBackground({ 
  className = '',
  continuityMode = false,
  intensity = 'adaptive'
}: StarfieldBackgroundProps) {
  const prefersReducedMotion = useReducedMotion()
  const deviceCapability = getDeviceCapability()
  const [isVisible, setIsVisible] = useState(true)

  // Configuration based on device and preferences
  const config = useMemo((): StarfieldConfig => {
    if (prefersReducedMotion) {
      return {
        show: true,
        starCount: 20,
        opacity: 0.8,
        animationEnabled: false,
        intensity: 'minimal',
        driftSpeed: 0,
        edgeFadeZone: 10
      }
    }

    if (intensity !== 'adaptive') {
      const intensityConfigs = {
        minimal: {
          show: true,
          starCount: 30,
          opacity: 0.9,
          animationEnabled: !continuityMode,
          intensity: 'minimal' as const,
          driftSpeed: 120, // Very slow drift
          edgeFadeZone: 10 // Fade near edges
        },
        standard: {
          show: true,
          starCount: 50,
          opacity: 0.95,
          animationEnabled: !continuityMode && !prefersReducedMotion,
          intensity: 'standard' as const,
          driftSpeed: 90,
          edgeFadeZone: 10
        },
        premium: {
          show: true,
          starCount: 80,
          opacity: 1.0,
          animationEnabled: !continuityMode && !prefersReducedMotion,
          intensity: 'premium' as const,
          driftSpeed: 60,
          edgeFadeZone: 10
        }
      }
      return intensityConfigs[intensity]
    }

    // Adaptive mode
    switch (deviceCapability) {
      case 'low':
        return {
          show: true,
          starCount: 30,
          opacity: 0.9,
          animationEnabled: !continuityMode && !prefersReducedMotion,
          intensity: 'minimal',
          driftSpeed: 120,
          edgeFadeZone: 10
        }
      case 'medium':
        return {
          show: true,
          starCount: 50,
          opacity: 0.95,
          animationEnabled: !continuityMode && !prefersReducedMotion,
          intensity: 'standard',
          driftSpeed: 90,
          edgeFadeZone: 10
        }
      default:
        return {
          show: true,
          starCount: 80,
          opacity: 1.0,
          animationEnabled: !continuityMode && !prefersReducedMotion,
          intensity: 'premium',
          driftSpeed: 60,
          edgeFadeZone: 10
        }
    }
  }, [deviceCapability, prefersReducedMotion, continuityMode, intensity])

  // Generate initial star positions with completely random distribution
  const stars = useMemo((): Star[] => {
    const starArray: Star[] = []
    
    for (let i = 0; i < config.starCount; i++) {
      // Completely random positioning across entire viewport
      const x = Math.random() * 100
      const y = Math.random() * 100
      
      // Random drift direction - primarily horizontal with slight vertical component
      const baseAngle = Math.random() < 0.5 ? 0 : Math.PI // Left or right
      const angleVariation = (Math.random() - 0.5) * Math.PI * 0.3 // ±27 degrees
      const driftAngle = baseAngle + angleVariation
      const speed = 0.01 + Math.random() * 0.03 // Slower, more natural drift
      
      starArray.push({
        id: i,
        x: x,
        y: y,
        vx: Math.cos(driftAngle) * speed,
        vy: Math.sin(driftAngle) * speed,
        size: 1 + Math.random() * 3, // Smaller, more realistic
        opacity: 0.4 + Math.random() * 0.6,
        depth: 0.3 + Math.random() * 0.7, // For parallax
        twinkleOffset: Math.random() * 10 // Spread out animation start times
      })
    }
    
    return starArray
  }, [config.starCount])

  // Calculate star opacity based on distance from edges
  const calculateOpacity = (x: number, y: number, baseOpacity: number): number => {
    if (!config.animationEnabled || config.edgeFadeZone === 0) {
      return baseOpacity * config.opacity
    }
    
    // Calculate distance from nearest edge
    const distFromLeft = x
    const distFromRight = 100 - x
    const distFromTop = y
    const distFromBottom = 100 - y
    
    // Find minimum distance to any edge
    const minEdgeDist = Math.min(distFromLeft, distFromRight, distFromTop, distFromBottom)
    
    // Apply fade if near edge
    if (minEdgeDist < config.edgeFadeZone) {
      // Smooth fade using ease-in-out curve
      const fadeFactor = minEdgeDist / config.edgeFadeZone
      const smoothFade = fadeFactor * fadeFactor * (3 - 2 * fadeFactor)
      return baseOpacity * config.opacity * smoothFade
    }
    
    return baseOpacity * config.opacity
  }

  // Render static stars for reduced motion
  const renderStaticStars = () => {
    return stars.map((star) => {
      const opacity = calculateOpacity(star.x, star.y, star.opacity)
      
      return (
        <div
          key={star.id}
          className="absolute pointer-events-none"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, 
              rgba(255, 255, 255, 1) 0%, 
              rgba(255, 255, 255, 0.8) 30%, 
              rgba(255, 255, 255, 0.3) 60%, 
              transparent 100%)`,
            borderRadius: '50%',
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${opacity * 0.5})`
          }}
        />
      )
    })
  }

  // Render animated drifting stars
  const renderAnimatedStars = () => {
    return stars.map((star) => {
      // Simple linear drift animation
      const keyframes = `
        @keyframes drift-${star.id} {
          from {
            transform: translate(-50%, -50%) 
                      translate3d(0px, 0px, 0);
          }
          to {
            transform: translate(-50%, -50%) 
                      translate3d(${star.vx * 2000}px, ${star.vy * 2000}px, 0);
          }
        }
      `
      
      // Calculate current opacity based on position
      const currentOpacity = calculateOpacity(star.x, star.y, star.opacity)
      
      return (
        <React.Fragment key={star.id}>
          <style dangerouslySetInnerHTML={{ __html: keyframes }} />
          <div
            className="absolute pointer-events-none"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: currentOpacity,
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, 
                rgba(255, 255, 255, 1) 0%, 
                rgba(255, 255, 255, 0.6) 40%, 
                transparent 100%)`,
              borderRadius: '50%',
              boxShadow: `0 0 ${star.size}px rgba(255, 255, 255, ${star.opacity * 0.3})`,
              animation: config.animationEnabled 
                ? `drift-${star.id} ${config.driftSpeed / star.depth}s linear infinite`
                : undefined,
              animationDelay: `${star.twinkleOffset}s`,
              willChange: 'transform',
              backfaceVisibility: 'hidden'
            }}
          />
        </React.Fragment>
      )
    })
  }

  // Performance monitoring
  useEffect(() => {
    if (import.meta.env.DEV && config.show) {
      console.log(`Starfield V4.0: Rendering ${config.starCount} drifting stars`)
      console.log(`Edge fade zone: ${config.edgeFadeZone}%`)
      console.log(`Animation: ${config.animationEnabled ? 'LINEAR DRIFT' : 'STATIC'}`)
    }
  }, [config])

  if (!config.show || !isVisible) {
    return null
  }

  return (
    <div
      aria-hidden="true"
      className={`starfield-container pointer-events-none fixed inset-0 ${className}`}
      style={{
        zIndex: 1,
        transform: 'translateZ(0)',
        willChange: config.animationEnabled ? 'transform' : 'auto',
        backfaceVisibility: 'hidden',
        contain: 'layout style paint'
      }}
    >
      {/* Deep space gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 25% 25%, 
              rgba(15, 10, 35, 0.95) 0%, 
              rgba(10, 8, 27, 1) 50%),
            radial-gradient(ellipse at 75% 75%, 
              rgba(10, 12, 40, 0.9) 0%, 
              rgba(10, 8, 27, 1) 50%),
            linear-gradient(180deg, 
              rgba(10, 8, 27, 1) 0%, 
              rgba(12, 10, 32, 1) 50%, 
              rgba(10, 8, 27, 1) 100%)
          `
        }}
      />

      {/* Star field layer */}
      <div className="absolute inset-0 overflow-hidden">
        {config.animationEnabled ? renderAnimatedStars() : renderStaticStars()}
      </div>

      {/* Subtle nebula atmosphere */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 1400px 900px at 20% 30%, 
              rgba(0, 255, 136, 0.04) 0%, transparent 50%),
            radial-gradient(ellipse 1200px 800px at 80% 70%, 
              rgba(0, 212, 255, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse 800px 600px at 60% 10%, 
              rgba(139, 92, 246, 0.02) 0%, transparent 40%)
          `,
          opacity: config.opacity * 0.6,
        }}
      />

    </div>
  )
}

/**
 * Performance monitoring hook for starfield V4.0
 */
export const useStarfieldPerformance = () => {
  const [metrics, setMetrics] = React.useState({
    paintTime: 0,
    frameRate: 60,
    starCount: 0,
    isOptimized: true,
    renderMode: 'css-linear-drift'
  })

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    let frameCount = 0
    let lastTime = performance.now()
    let rafId: number
    
    const measurePerformance = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        
        setMetrics(prev => ({
          ...prev,
          frameRate: fps,
          isOptimized: fps >= 50
        }))
        
        frameCount = 0
        lastTime = currentTime
        
        if (import.meta.env.DEV && fps < 45) {
          console.warn(`Starfield V4.0: Low FPS (${fps}fps)`)
        }
      }
      
      rafId = requestAnimationFrame(measurePerformance)
    }
    
    rafId = requestAnimationFrame(measurePerformance)
    
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return metrics
}