/**
 * KRIM AI - PARTICLE UNIVERSE V3.0
 * Advanced 10,000 GPU-Accelerated Particle System
 * Visualizes Multi-agentic AI infrastructure with Behavior AI
 */

import React, { useRef, useMemo, useEffect, useState, useCallback } from 'react'

// CRITICAL POLYFILL: Must execute BEFORE any R3F code
// TREESHAKE-PROOF: Multiple undeniable side effects + no exports
function applyReactCurrentBatchConfigPolyfill() {
  if (typeof window === 'undefined') return false

  const react = (window as any).React || React
  if (!react) return false

  const SECRET_KEY = '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED'
  let internals = react[SECRET_KEY]

  if (!internals) {
    react[SECRET_KEY] = internals = {}
  }

  if (!internals.ReactCurrentBatchConfig) {
    internals.ReactCurrentBatchConfig = { transition: null }

    // AGGRESSIVE SIDE EFFECTS - Undeniably visible mutations to prevent tree-shaking
    const timestamp = Date.now()

    // Multiple global mutations
    ;(window as any).KRIM_POLYFILL_SUCCESS = true
    ;(window as any).KRIM_POLYFILL_TIMESTAMP = timestamp
    ;(window as any).KRIM_POLYFILL_COUNT = ((window as any).KRIM_POLYFILL_COUNT || 0) + 1
    ;(window as any).__KRIM_REACT_INTERNALS_PATCHED__ = timestamp

    // DOM mutations - visible side effects
    document.body.setAttribute('data-krim-polyfill', 'applied')
    document.body.setAttribute('data-krim-timestamp', timestamp.toString())
    document.documentElement.setAttribute('data-react-polyfill', 'active')

    // Console mutations - side effects with observer pattern (development only)
    if (import.meta.env.DEV) {
      console.log('[CRITICAL] ReactCurrentBatchConfig polyfill applied at', timestamp)
      console.warn('[KRIM] React internals patched - DO NOT REMOVE')
    }

    // Storage side effect
    try {
      sessionStorage.setItem('krim-polyfill-applied', timestamp.toString())
    } catch {
      // Silently ignore storage errors in environments where sessionStorage is not available
    }

    return true
  }

  return false
}

// Execute polyfill immediately - MUST be at module top level
// Store result in global to prevent elimination
;(window as any).__KRIM_POLYFILL_RESULT__ = applyReactCurrentBatchConfigPolyfill()

// Additional treeshake prevention - touch window object
if (typeof window !== 'undefined') {
  ;(window as any).__KRIM_MODULE_LOADED__ = 'ParticleUniverse'
  ;(window as any).__KRIM_BUNDLE_INTEGRITY__ = Date.now()
}

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { Vector3, Matrix4, AdditiveBlending } from 'three'
import { ThreeJSErrorBoundary, withClientOnly } from '../utils/safeThreeJS'


// Client-side only check to prevent SSR issues
const isClient = typeof window !== 'undefined'

// Performance monitoring hook
const usePerformanceMonitor = () => {
  const [fps, setFps] = useState(60)
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('high')
  
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())
  
  useFrame(() => {
    frameCount.current++
    const currentTime = performance.now()
    
    if (currentTime >= lastTime.current + 1000) {
      const currentFps = frameCount.current
      setFps(currentFps)
      frameCount.current = 0
      lastTime.current = currentTime
      
      // Adaptive quality based on FPS
      if (currentFps < 30) {
        setQuality('low')
      } else if (currentFps < 50) {
        setQuality('medium')
      } else {
        setQuality('high')
      }
    }
  })
  
  return { fps, quality }
}

// Device capability detection
const getDeviceCapability = () => {
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
  if (!gl) return 'low'
  
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
  const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : ''
  
  // Enhanced GPU tier detection
  const isHighEnd = /RTX|GTX 16|GTX 20|GTX 30|GTX 40|Radeon RX|Apple M[1-9]|Mali-G78|Adreno 6|PowerVR/.test(renderer)
  const isMidTier = /GTX 10|GTX 9|Radeon R|Intel Iris|UHD Graphics 6/.test(renderer)
  const isMobile = /Mobile|Android|iPhone|iPad/.test(navigator.userAgent)
  
  // Memory and core detection for better classification
  const memory = (navigator as any).deviceMemory || 4
  const cores = navigator.hardwareConcurrency || 4
  
  if (isMobile && memory < 6) return 'low'
  if (isMobile && memory >= 6) return 'medium'
  if (isHighEnd && memory >= 8 && cores >= 6) return 'high'
  if (isMidTier || (memory >= 6 && cores >= 4)) return 'medium'
  return 'low'
}

// Advanced behavior types for particles
interface ParticleBehavior {
  attraction: boolean
  repulsion: boolean
  flow: boolean
  connections: boolean
  clustering: boolean
  emergence: boolean
}

// Particle system component with GPU instancing
function ParticleSystem() {
  const meshRef = useRef<any>(null)
  const { mouse, viewport, camera } = useThree()
  const { quality } = usePerformanceMonitor() // Move this OUTSIDE useFrame - CRITICAL FIX
  
  // Adaptive particle count based on device capability - Enhanced for 10K particles
  const getParticleCount = useCallback(() => {
    const deviceCapability = getDeviceCapability()
    const qualityMultiplier = quality === 'high' ? 1 : quality === 'medium' ? 0.7 : 0.4

    // Enhanced adaptive counts to prevent GPU stalls
    const baseCounts = {
      low: 1000,     // Reduced for older devices
      medium: 4000,  // Optimized for mid-tier
      high: 8000     // Conservative high-end to prevent warnings
    }

    // Additional throttling based on available GPU memory
    const memoryFactor = (navigator as any).deviceMemory > 4 ? 1 : 0.7

    return Math.floor(baseCounts[deviceCapability] * qualityMultiplier * memoryFactor)
  }, [quality])
  
  // CRITICAL FIX: Use fixed particle count to prevent buffer resize errors
  // Dynamic particle count was causing "buffer attribute's array buffer does not match original size" errors
  const particleCount = useMemo(() => {
    const deviceCapability = getDeviceCapability()
    // Use maximum count and handle performance via other means (size, update frequency)
    const fixedCounts = {
      low: 2000,
      medium: 6000,
      high: 10000
    }
    return fixedCounts[deviceCapability]
  }, []) // Remove getParticleCount dependency to prevent dynamic changes
  
  // Generate particle data with emergence patterns - FIXED BUFFER ALLOCATION
  const { positions, colors, sizes, velocities, positionArrayRef, cleanupRef } = useMemo(() => {
    // CRITICAL FIX: Pre-allocate buffers with fixed size to prevent resize errors
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    const velocities = new Float32Array(particleCount * 3)

    // Create refs for proper cleanup
    const positionArrayRef = { current: positions }
    const cleanupRef = { current: () => {
      // Buffer cleanup - prevent memory leaks
      if (positionArrayRef.current) {
        positionArrayRef.current = null
      }
    }}
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Positions - Create galaxy-like distribution
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const radius = Math.random() * 15 + 5
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) 
      positions[i3 + 2] = radius * Math.cos(phi)
      
      // Colors - Multi-Agentic spectrum (mint, cyan, purple, coral)
      const colorType = Math.floor(Math.random() * 4)
      const intensity = 0.5 + Math.random() * 0.5
      
      switch (colorType) {
        case 0: // Krim Mint
          colors[i3] = 0.0 * intensity
          colors[i3 + 1] = 1.0 * intensity
          colors[i3 + 2] = 0.53 * intensity
          break
        case 1: // Krim Cyan
          colors[i3] = 0.0 * intensity
          colors[i3 + 1] = 0.83 * intensity
          colors[i3 + 2] = 1.0 * intensity
          break
        case 2: // Krim Purple
          colors[i3] = 0.55 * intensity
          colors[i3 + 1] = 0.36 * intensity
          colors[i3 + 2] = 0.96 * intensity
          break
        case 3: // Krim Coral
          colors[i3] = 1.0 * intensity
          colors[i3 + 1] = 0.3 * intensity
          colors[i3 + 2] = 0.38 * intensity
          break
      }
      
      // Sizes - Agent hierarchy
      const agentType = Math.random()
      if (agentType < 0.1) {
        sizes[i] = 3 + Math.random() * 2 // Core agents
      } else if (agentType < 0.3) {
        sizes[i] = 2 + Math.random() * 1 // Staff agents
      } else {
        sizes[i] = 1 + Math.random() * 0.5 // Data particles
      }
      
      // Velocities - Orbital motion
      velocities[i3] = (Math.random() - 0.5) * 0.02
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01
    }
    
    return { positions, colors, sizes, velocities, positionArrayRef, cleanupRef }
  }, [particleCount])

  // CRITICAL FIX: Add proper cleanup to prevent buffer leaks
  useEffect(() => {
    return () => {
      // Cleanup buffers when component unmounts
      if (cleanupRef?.current) {
        cleanupRef.current()
      }
    }
  }, [cleanupRef])
  
  // Advanced animation with behavior AI - FIXED BUFFER MANAGEMENT
  useFrame((state, delta) => {
    if (!meshRef.current) return

    const { geometry } = meshRef.current
    const positionAttribute = geometry.attributes.position

    // CRITICAL FIX: Validate buffer integrity before updates
    if (!positionAttribute?.array || positionAttribute.array.length !== particleCount * 3) {
      console.warn('Buffer size mismatch detected, skipping frame to prevent crash')
      return
    }

    // PERFORMANCE: Throttle updates to prevent GPU stalls
    const time = state.clock.elapsedTime
    const frameThrottle = quality === 'high' ? 60 : quality === 'medium' ? 30 : 15
    if (Math.floor(time * frameThrottle) % 2 !== 0) return
    
    // Mouse interaction force
    const mouseForce = new Vector3(
      (mouse.x * viewport.width) / 2,
      (mouse.y * viewport.height) / 2,
      0
    )
    
    // PERFORMANCE FIX: Use quality value from component scope (not from hook call inside useFrame)
    const updateFrequency = quality === 'high' ? 1 : quality === 'medium' ? 2 : 3

    // Use time-based frame skipping instead of frameCount
    const shouldSkipFrame = quality !== 'high' && Math.floor(time * 60) % updateFrequency !== 0

    if (shouldSkipFrame) {
      return // Skip animation updates for performance
    }

    // Update particle positions with complex behaviors
    const activeParticleCount = quality === 'high' ? particleCount : quality === 'medium' ? Math.floor(particleCount * 0.7) : Math.floor(particleCount * 0.4)
    for (let i = 0; i < activeParticleCount; i++) {
      const i3 = i * 3
      
      // SAFETY CHECK: Ensure array bounds
      if (i3 + 2 >= positionAttribute.array.length) {
        break // Prevent buffer overflow
      }

      // Get current position
      const position = new Vector3(
        positionAttribute.array[i3],
        positionAttribute.array[i3 + 1],
        positionAttribute.array[i3 + 2]
      )

      // 1. Orbital rotation (Multi-Agent coordination)
      const radius = position.length()
      const rotationSpeed = 0.1 / (radius * 0.5 + 1)
      const rotation = new Matrix4().makeRotationY(rotationSpeed * delta)
      position.applyMatrix4(rotation)
      
      // 2. Mouse attraction/repulsion
      const distance = position.distanceTo(mouseForce)
      if (distance < 8) {
        const direction = position.clone().sub(mouseForce).normalize()
        const force = Math.max(0, 8 - distance) * 0.05
        position.add(direction.multiplyScalar(force))
      }
      
      // 3. Breathing motion (AI processing cycles)
      const breathingForce = Math.sin(time * 2 + i * 0.01) * 0.02
      position.multiplyScalar(1 + breathingForce)
      
      // 4. Agent emergence patterns
      if (i < particleCount * 0.1) { // Core agents
        const emergenceWave = Math.sin(time * 0.5 + position.x * 0.1) * 0.1
        position.y += emergenceWave
      }
      
      // 5. Data flow streams
      if (i % 10 === 0) { // Every 10th particle is part of data flow
        const flowDirection = new Vector3(
          Math.sin(time * 0.3 + i * 0.1),
          Math.cos(time * 0.2 + i * 0.1),
          Math.sin(time * 0.1 + i * 0.05)
        ).normalize()
        position.add(flowDirection.multiplyScalar(0.01))
      }
      
      // SAFETY CHECK: Update position with bounds checking
      if (i3 + 2 < positionAttribute.array.length) {
        positionAttribute.array[i3] = position.x
        positionAttribute.array[i3 + 1] = position.y
        positionAttribute.array[i3 + 2] = position.z
      }
    }
    
    positionAttribute.needsUpdate = true
    
    // Rotate entire system slowly
    meshRef.current.rotation.y += delta * 0.05
  })
  
  return (
    <Points ref={meshRef} positions={positions} colors={colors} sizes={sizes}>
      <PointMaterial
        transparent
        vertexColors
        size={quality === 'high' ? 0.02 : quality === 'medium' ? 0.015 : 0.01}
        sizeAttenuation={true}
        depthWrite={false}
        blending={AdditiveBlending}
        fog={false}
        alphaTest={0.1}
      />
    </Points>
  )
}

// Connection lines between particles (for high-end devices)
function ParticleConnections() {
  const { quality } = usePerformanceMonitor()
  const lineRef = useRef<any>(null)
  
  if (quality !== 'high') return null
  
  // This would create connection lines between nearby particles
  // Implementation would be computationally expensive, so only on high-end
  return null
}

// Main Particle Universe component
interface ParticleUniverseProps {
  count?: number
  behavior?: Partial<ParticleBehavior>
  adaptive?: boolean
  className?: string
}

export default function ParticleUniverse({
  count,
  behavior = {},
  adaptive = true,
  className = ''
}: ParticleUniverseProps) {
  // Prevent SSR issues with Three.js
  if (!isClient) {
    return (
      <div className={`particle-universe-fallback ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-krim-mint/5 via-transparent to-krim-cyan/5" />
      </div>
    )
  }

  // Reduced motion support
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  if (prefersReducedMotion) {
    return (
      <div className={`particle-universe-fallback ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-krim-mint/5 via-transparent to-krim-cyan/5" />
      </div>
    )
  }
  
  return (
    <div className={`particle-container fixed inset-0 pointer-events-none z-void ${className}`}>
      <ThreeJSErrorBoundary>
        <Canvas
        camera={{ 
          position: [0, 0, 20], 
          fov: 60,
          near: 0.1,
          far: 100
        }}
        gl={{
          antialias: false,
          alpha: true, // Enable transparency for layering fix
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
          stencil: false,
          depth: true,
          failIfMajorPerformanceCaveat: false,
          premultipliedAlpha: false
        }}
        dpr={[1, Math.min(window.devicePixelRatio, 2)]} // Limit pixel ratio
        frameloop="always"
        onCreated={({ gl }) => {
          // Basic performance settings only
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
          // Fix white flash: Set transparent clear (alpha 0) to prevent white flashes
          gl.setClearColor(0x000000, 0)
        }}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.3} />
        <pointLight position={[-10, -10, -10]} intensity={0.2} color="#00D4FF" />
        
        <ParticleSystem />
        <ParticleConnections />
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#0A081B', 30, 80]} />
        </Canvas>
      </ThreeJSErrorBoundary>
      
      {/* Performance indicator (dev mode) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 text-xs text-white font-mono">
          Particles: {getDeviceCapability() === 'high' ? '10K' : getDeviceCapability() === 'medium' ? '5K' : '1K'}
        </div>
      )}
    </div>
  )
}

// Utility hook for media queries
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)
  
  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [matches, query])
  
  return matches
}

// Export additional components for use in different contexts
export { ParticleSystem, usePerformanceMonitor, getDeviceCapability }