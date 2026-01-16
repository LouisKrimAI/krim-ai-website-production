/**
 * KRIM AI - MOVING STARFIELD BACKGROUND
 * Classic "flying through space" effect with stars moving toward the camera
 * Performance-optimized CSS animations creating motion and depth
 */

import React, { useMemo, useEffect, useState, useCallback } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { getDeviceCapability } from '../utils/performance'

interface MovingStarfieldProps {
  className?: string
  speed?: 'slow' | 'normal' | 'fast' | 'warp'
  intensity?: 'minimal' | 'normal' | 'intense'
}

interface StarField {
  id: number
  x: number // Percentage position
  y: number // Percentage position
  size: number // Star size in pixels
  layer: 'slow' | 'medium' | 'fast' // Movement speed layer
  color: 'white' | 'blue' | 'purple' | 'mint' // Star color
  brightness: number // Opacity multiplier
  twinkle: boolean // Whether star twinkles
}

export default function MovingStarfieldBackground({ 
  className = '',
  speed = 'normal',
  intensity = 'normal'
}: MovingStarfieldProps) {
  const prefersReducedMotion = useReducedMotion()
  const deviceCapability = getDeviceCapability()
  const [isVisible, setIsVisible] = useState(true)

  // Configuration based on device and user preferences
  const config = useMemo(() => {
    if (prefersReducedMotion) {
      return {
        show: false,
        starCount: 0,
        layers: { slow: 0, medium: 0, fast: 0 }
      }
    }

    // Base configuration by intensity
    const intensityConfigs = {
      minimal: { total: 80, slow: 30, medium: 30, fast: 20 },
      normal: { total: 150, slow: 50, medium: 60, fast: 40 },
      intense: { total: 250, slow: 80, medium: 100, fast: 70 }
    }

    const baseConfig = intensityConfigs[intensity]

    // Adapt to device capability
    const deviceMultiplier = {
      low: 0.5,
      medium: 0.75,
      high: 1.0
    }[deviceCapability]

    return {
      show: true,
      starCount: Math.floor(baseConfig.total * deviceMultiplier),
      layers: {
        slow: Math.floor(baseConfig.slow * deviceMultiplier),
        medium: Math.floor(baseConfig.medium * deviceMultiplier),
        fast: Math.floor(baseConfig.fast * deviceMultiplier)
      }
    }
  }, [prefersReducedMotion, intensity, deviceCapability])

  // Speed configuration for animations
  const speedConfig = useMemo(() => {
    const configs = {
      slow: { slow: 12, medium: 8, fast: 5 },
      normal: { slow: 8, medium: 5, fast: 3 },
      fast: { slow: 6, medium: 3.5, fast: 2 },
      warp: { slow: 4, medium: 2.5, fast: 1.5 }
    }
    return configs[speed]
  }, [speed])

  // Generate star field with multiple layers
  const starField = useMemo(() => {
    if (!config.show) return []

    const stars: StarField[] = []
    const layers: Array<{ layer: 'slow' | 'medium' | 'fast', count: number }> = [
      { layer: 'slow', count: config.layers.slow },
      { layer: 'medium', count: config.layers.medium },
      { layer: 'fast', count: config.layers.fast }
    ]

    let starId = 0

    layers.forEach(({ layer, count }) => {
      for (let i = 0; i < count; i++) {
        const star: StarField = {
          id: starId++,
          x: Math.random() * 100, // Random X position across viewport
          y: Math.random() * 100, // Random Y position across viewport
          size: getStarSize(layer),
          layer,
          color: getStarColor(),
          brightness: 0.6 + Math.random() * 0.4, // 0.6 to 1.0 brightness
          twinkle: Math.random() < 0.3 // 30% of stars twinkle
        }
        stars.push(star)
      }
    })

    return stars
  }, [config])

  // Helper function to determine star size based on layer
  function getStarSize(layer: 'slow' | 'medium' | 'fast'): number {
    const baseSizes = { slow: 1, medium: 1.5, fast: 2 }
    const variance = Math.random() * 1.5 // Add 0-1.5px variance
    return baseSizes[layer] + variance
  }

  // Helper function to get star color
  function getStarColor(): 'white' | 'blue' | 'purple' | 'mint' {
    const rand = Math.random()
    if (rand < 0.7) return 'white' // 70% white stars
    if (rand < 0.85) return 'blue' // 15% blue stars
    if (rand < 0.95) return 'mint' // 10% mint stars
    return 'purple' // 5% purple stars
  }

  // Color mapping for stars
  const getStarStyle = useCallback((star: StarField) => {
    const colors = {
      white: 'rgba(255, 255, 255, 1)',
      blue: 'rgba(137, 196, 244, 1)', // Light blue
      mint: 'rgba(0, 255, 136, 0.9)', // Krim mint
      purple: 'rgba(139, 92, 246, 0.8)' // Krim purple
    }

    const baseColor = colors[star.color]
    
    return {
      '--star-opacity': star.brightness,
      '--animation-duration': `${speedConfig[star.layer]}s`,
      '--animation-delay': `${Math.random() * speedConfig[star.layer]}s`,
      '--twinkle-delay': `${Math.random() * 2}s`,
      left: `${star.x}%`,
      top: `${star.y}%`,
      width: `${star.size}px`,
      height: `${star.size}px`,
      background: `radial-gradient(circle, ${baseColor} 0%, ${baseColor.replace('1)', '0.8)')} 30%, transparent 70%)`,
      opacity: star.brightness
    } as React.CSSProperties
  }, [speedConfig])

  // Performance monitoring for development
  useEffect(() => {
    if (import.meta.env.DEV && config.show) {
      console.log(`🌟 MovingStarfield: Rendering ${config.starCount} moving stars`, {
        device: deviceCapability,
        speed: speed,
        intensity: intensity,
        layers: config.layers,
        prefersReducedMotion
      })
    }
  }, [config, deviceCapability, speed, intensity, prefersReducedMotion])

  // Don't render if disabled or reduced motion
  if (!config.show || !isVisible) {
    return null
  }

  return (
    <div
      aria-hidden="true"
      className={`moving-starfield-container pointer-events-none fixed inset-0 ${className}`}
      style={{
        zIndex: 1,
        perspective: '1000px',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
    >
      {/* Deep space background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at center, rgba(10, 8, 27, 0.95) 0%, rgba(10, 8, 27, 1) 100%),
            linear-gradient(135deg, rgba(10, 8, 27, 1) 0%, rgba(5, 5, 15, 1) 50%, rgba(10, 8, 27, 1) 100%)
          `
        }}
      />

      {/* Moving stars */}
      <div className="absolute inset-0">
        {starField.map((star) => (
          <div
            key={star.id}
            className={`
              star-moving 
              star-layer-${star.layer}
              ${star.twinkle ? 'star-twinkle' : ''}
              ${star.layer === 'fast' ? 'star-motion-blur' : ''}
            `}
            style={getStarStyle(star)}
          />
        ))}
      </div>

      {/* Atmospheric nebula effects */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 1600px 1000px at 20% 30%, rgba(0, 255, 136, 0.03) 0%, transparent 60%),
            radial-gradient(ellipse 1200px 800px at 80% 70%, rgba(0, 212, 255, 0.025) 0%, transparent 60%),
            radial-gradient(ellipse 800px 500px at 60% 20%, rgba(139, 92, 246, 0.02) 0%, transparent 60%)
          `,
          opacity: 0.6,
          mixBlendMode: 'lighten'
        }}
      />

      {/* Development debug info */}
      {import.meta.env.DEV && (
        <div 
          className="absolute top-4 right-4 bg-black/60 text-white text-xs font-mono p-3 rounded backdrop-blur-sm border border-white/10"
          style={{ zIndex: 1000 }}
        >
          <div className="text-emerald-400 font-semibold">Moving Starfield Active</div>
          <div>Device: {deviceCapability}</div>
          <div>Stars: {config.starCount}</div>
          <div>Speed: {speed}</div>
          <div>Intensity: {intensity}</div>
          <div>Layers: {config.layers.slow}/{config.layers.medium}/{config.layers.fast}</div>
          <div>Motion: {prefersReducedMotion ? 'REDUCED' : 'NORMAL'}</div>
          <div className="text-cyan-400 mt-1">Flying through space ✨</div>
        </div>
      )}
    </div>
  )
}

/**
 * Hook for controlling starfield speed dynamically
 */
export const useStarfieldSpeed = () => {
  const [speed, setSpeed] = useState<'slow' | 'normal' | 'fast' | 'warp'>('normal')
  
  const accelerate = useCallback(() => {
    setSpeed(current => {
      switch (current) {
        case 'slow': return 'normal'
        case 'normal': return 'fast'
        case 'fast': return 'warp'
        default: return 'warp'
      }
    })
  }, [])

  const decelerate = useCallback(() => {
    setSpeed(current => {
      switch (current) {
        case 'warp': return 'fast'
        case 'fast': return 'normal'
        case 'normal': return 'slow'
        default: return 'slow'
      }
    })
  }, [])

  const setWarpSpeed = useCallback(() => setSpeed('warp'), [])
  const setNormalSpeed = useCallback(() => setSpeed('normal'), [])

  return {
    speed,
    setSpeed,
    accelerate,
    decelerate,
    setWarpSpeed,
    setNormalSpeed
  }
}

/**
 * Starfield control component for user interaction
 */
interface StarfieldControlsProps {
  speed: 'slow' | 'normal' | 'fast' | 'warp'
  onSpeedChange: (speed: 'slow' | 'normal' | 'fast' | 'warp') => void
  className?: string
}

export function StarfieldControls({ speed, onSpeedChange, className = '' }: StarfieldControlsProps) {
  const prefersReducedMotion = useReducedMotion()
  
  if (prefersReducedMotion) return null

  return (
    <div className={`fixed bottom-4 left-4 bg-black/40 backdrop-blur-sm rounded-lg p-2 ${className}`}>
      <div className="text-white text-xs font-mono mb-2">Warp Speed</div>
      <div className="flex space-x-1">
        {(['slow', 'normal', 'fast', 'warp'] as const).map((s) => (
          <button
            key={s}
            onClick={() => onSpeedChange(s)}
            className={`
              px-2 py-1 text-xs rounded font-mono transition-all
              ${s === speed 
                ? 'bg-krim-mint text-krim-deep-space' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
              }
            `}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  )
}