/**
 * KRIM AI - CLASSIC STARFIELD BACKGROUND
 * Simple white dots moving radially outward from center - the classic "flying through space" effect
 * Like Windows screensaver or Star Wars hyperspace
 */

import React, { useMemo, useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { getDeviceCapability } from '../utils/performance'

interface ClassicStarfieldProps {
  className?: string
  starCount?: number
  speed?: 'slow' | 'normal' | 'fast'
  enableDepthLayers?: boolean
}

interface Star {
  id: number
  angle: number // Radial angle in degrees
  endX: number // Final X position in pixels from center
  endY: number // Final Y position in pixels from center
  duration: number // Animation duration in seconds
  delay: number // Animation delay in seconds
  size: 'small' | 'medium' | 'large'
  layer: 'far' | 'medium' | 'near' // Depth layer for parallax
}

export default function ClassicStarfieldBackground({ 
  className = '',
  starCount,
  speed = 'normal',
  enableDepthLayers = true
}: ClassicStarfieldProps) {
  const prefersReducedMotion = useReducedMotion()
  const deviceCapability = getDeviceCapability()

  // Don't render if user prefers reduced motion
  if (prefersReducedMotion) {
    return null
  }

  // Determine star count based on device capability and user preference
  const finalStarCount = useMemo(() => {
    const defaultCounts = {
      low: 80,
      medium: 120,
      high: 150
    }

    return starCount || defaultCounts[deviceCapability]
  }, [starCount, deviceCapability])

  // Speed configuration (slowed by 15% for more elegant motion)
  const speedConfig = useMemo(() => {
    const configs = {
      slow: { baseTime: 5.18, variance: 1.73 },    // 4.5s * 1.15 = 5.18s
      normal: { baseTime: 3.45, variance: 1.15 },  // 3.0s * 1.15 = 3.45s
      fast: { baseTime: 2.3, variance: 0.92 }      // 2.0s * 1.15 = 2.3s
    }
    return configs[speed]
  }, [speed])

  // Generate stars with radial positions
  const stars = useMemo(() => {
    const starArray: Star[] = []
    
    // Calculate viewport dimensions for proper scaling
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1080
    const maxDistance = Math.sqrt(viewportWidth * viewportWidth + viewportHeight * viewportHeight) / 2

    for (let i = 0; i < finalStarCount; i++) {
      // Random angle for radial direction (0-360 degrees)
      const angle = Math.random() * 360
      const angleRad = (angle * Math.PI) / 180

      // Calculate end position (beyond viewport edge)
      const distance = maxDistance * 1.2 // Go beyond viewport edge
      const endX = Math.cos(angleRad) * distance
      const endY = Math.sin(angleRad) * distance

      // Random properties
      const duration = speedConfig.baseTime + (Math.random() - 0.5) * speedConfig.variance
      const delay = Math.random() * duration * 2 // Stagger spawning
      
      // Size distribution: 70% small, 20% medium, 10% large
      const sizeRand = Math.random()
      const size = sizeRand < 0.7 ? 'small' : sizeRand < 0.9 ? 'medium' : 'large'

      // Layer distribution for depth: 40% far, 40% medium, 20% near
      const layerRand = Math.random()
      const layer = layerRand < 0.4 ? 'far' : layerRand < 0.8 ? 'medium' : 'near'

      const star: Star = {
        id: i,
        angle,
        endX,
        endY,
        duration: layer === 'far' ? duration * 1.5 : layer === 'medium' ? duration * 1.2 : duration,
        delay,
        size,
        layer
      }

      starArray.push(star)
    }

    return starArray
  }, [finalStarCount, speedConfig])

  // Performance monitoring for development
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log(`🌟 ClassicStarfield: ${finalStarCount} white stars flying radially outward`, {
        device: deviceCapability,
        speed: speed,
        prefersReducedMotion
      })
    }
  }, [finalStarCount, deviceCapability, speed, prefersReducedMotion])

  return (
    <div
      aria-hidden="true"
      className={`classic-starfield-container pointer-events-none fixed inset-0 ${className}`}
      style={{
        zIndex: 1,
        background: `
          radial-gradient(ellipse at center, rgba(10, 8, 27, 0.98) 0%, rgba(0, 0, 0, 1) 100%)
        `,
        overflow: 'hidden'
      }}
    >
      {/* Stars grouped by depth layers for parallax effect */}
      {enableDepthLayers ? (
        <>
          {/* Far layer - slowest, smallest */}
          <div className="starfield-layer depth-far" style={{ opacity: 0.6 }}>
            {stars.filter(s => s.layer === 'far').map((star) => (
              <div
                key={star.id}
                className={`classic-star size-${star.size}`}
                style={{
                  '--end-x': star.endX,
                  '--end-y': star.endY,
                  '--duration': `${star.duration}s`,
                  '--delay': `${star.delay}s`,
                } as React.CSSProperties}
              />
            ))}
          </div>
          {/* Medium layer */}
          <div className="starfield-layer depth-medium" style={{ opacity: 0.8 }}>
            {stars.filter(s => s.layer === 'medium').map((star) => (
              <div
                key={star.id}
                className={`classic-star size-${star.size}`}
                style={{
                  '--end-x': star.endX,
                  '--end-y': star.endY,
                  '--duration': `${star.duration}s`,
                  '--delay': `${star.delay}s`,
                } as React.CSSProperties}
              />
            ))}
          </div>
          {/* Near layer - fastest, brightest */}
          <div className="starfield-layer depth-near" style={{ opacity: 1 }}>
            {stars.filter(s => s.layer === 'near').map((star) => (
              <div
                key={star.id}
                className={`classic-star size-${star.size}`}
                style={{
                  '--end-x': star.endX,
                  '--end-y': star.endY,
                  '--duration': `${star.duration}s`,
                  '--delay': `${star.delay}s`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        </>
      ) : (
        /* Single layer fallback */
        stars.map((star) => (
          <div
            key={star.id}
            className={`classic-star size-${star.size}`}
            style={{
              '--end-x': star.endX,
              '--end-y': star.endY,
              '--duration': `${star.duration}s`,
              '--delay': `${star.delay}s`,
            } as React.CSSProperties}
          />
        ))
      )}

      {/* Development debug info */}
      {import.meta.env.DEV && (
        <div 
          className="absolute top-4 right-4 bg-black/70 text-white text-xs font-mono p-3 rounded backdrop-blur-sm border border-white/20"
          style={{ zIndex: 1000 }}
        >
          <div className="text-white font-semibold">Classic Starfield Active</div>
          <div>Device: {deviceCapability}</div>
          <div>Stars: {finalStarCount}</div>
          <div>Speed: {speed}</div>
          <div>Motion: {prefersReducedMotion ? 'REDUCED' : 'NORMAL'}</div>
          <div className="text-cyan-400 mt-1">Flying through space ⭐</div>
        </div>
      )}
    </div>
  )
}

/**
 * Alternative implementation using Canvas for better performance with many stars
 * (Can be used for high-end devices wanting >200 stars)
 */
export class CanvasStarfield {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private stars: Array<{
    x: number
    y: number
    vx: number
    vy: number
    life: number
    maxLife: number
    size: number
  }> = []
  private animationId?: number

  constructor(canvas: HTMLCanvasElement, starCount = 200) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.setupCanvas()
    this.generateStars(starCount)
    this.animate()
  }

  private setupCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.ctx.fillStyle = '#000000'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  private generateStars(count: number) {
    const centerX = this.canvas.width / 2
    const centerY = this.canvas.height / 2

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 1 + Math.random() * 2

      this.stars.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 100 + Math.random() * 100,
        size: 1 + Math.random() * 2
      })
    }
  }

  private animate = () => {
    // Clear with fade effect
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    // Update and draw stars
    this.ctx.fillStyle = '#ffffff'
    this.stars.forEach((star, index) => {
      // Update position
      star.x += star.vx
      star.y += star.vy
      star.life++

      // Accelerate
      star.vx *= 1.01
      star.vy *= 1.01

      // Draw star
      const opacity = Math.min(1, (star.maxLife - star.life) / 20)
      if (opacity > 0) {
        this.ctx.globalAlpha = opacity
        this.ctx.beginPath()
        this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        this.ctx.fill()
      }

      // Reset star when it goes off screen or dies
      if (star.life > star.maxLife || 
          star.x < 0 || star.x > this.canvas.width ||
          star.y < 0 || star.y > this.canvas.height) {
        // Respawn at center
        const angle = Math.random() * Math.PI * 2
        const speed = 1 + Math.random() * 2
        star.x = this.canvas.width / 2
        star.y = this.canvas.height / 2
        star.vx = Math.cos(angle) * speed
        star.vy = Math.sin(angle) * speed
        star.life = 0
        star.maxLife = 100 + Math.random() * 100
      }
    })

    this.ctx.globalAlpha = 1
    this.animationId = requestAnimationFrame(this.animate)
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
  }
}