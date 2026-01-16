/**
 * DEPTH HERO - Revolutionary Homepage Experience
 * Multi-layered hero section with 10K particle universe
 * The portal that transforms visitors into believers
 */

import { useRef, useEffect, useState, Suspense, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import GlowText from '../atoms/GlowText'
import MagneticButton from '../atoms/MagneticButton'
import { MetricGrid } from '../molecules/DepthCard'

interface DepthHeroProps {
  headline?: string
  subheadline?: string
  primaryCTA?: string
  secondaryCTA?: string
  onPrimaryCTA?: () => void
  onSecondaryCTA?: () => void
  particles?: number
  enableParallax?: boolean
  className?: string
}

// 10K Particle Universe Component
function ParticleUniverse({ count = 10000 }: { count: number }) {
  const meshRef = useRef<THREE.Points>(null)
  const { viewport, camera } = useThree()
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    // Create depth layers with different densities
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Create depth layers
      const layer = Math.floor(i / (count / 6)) // 6 layers
      const radius = (layer + 1) * viewport.width * 0.5
      const depth = layer * -2 - 1
      
      // Distribute particles in spherical coordinates
      const phi = Math.random() * Math.PI * 2
      const theta = Math.random() * Math.PI
      
      positions[i3] = Math.cos(phi) * Math.sin(theta) * radius
      positions[i3 + 1] = Math.cos(theta) * radius
      positions[i3 + 2] = Math.sin(phi) * Math.sin(theta) * radius + depth
      
      // Color based on depth (closer = brighter)
      const brightness = 1 - (layer / 6) * 0.7
      
      // Krim AI brand colors with variations
      if (Math.random() > 0.7) {
        // Electric mint (#00FF88)
        colors[i3] = 0.0 * brightness
        colors[i3 + 1] = 1.0 * brightness
        colors[i3 + 2] = 0.53 * brightness
      } else if (Math.random() > 0.4) {
        // Cyan (#00D4FF)
        colors[i3] = 0.0 * brightness
        colors[i3 + 1] = 0.83 * brightness
        colors[i3 + 2] = 1.0 * brightness
      } else {
        // White particles for depth
        colors[i3] = 1.0 * brightness
        colors[i3 + 1] = 1.0 * brightness
        colors[i3 + 2] = 1.0 * brightness
      }
    }
    
    return [positions, colors]
  }, [count, viewport])

  // Animate particles
  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.elapsedTime
    
    // Rotate entire universe
    meshRef.current.rotation.y = time * 0.02
    meshRef.current.rotation.x = Math.sin(time * 0.01) * 0.1
    
    // Pulsating effect
    const scale = 1 + Math.sin(time * 0.5) * 0.05
    meshRef.current.scale.setScalar(scale)
    
    // Update individual particles
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Floating motion
      positions[i3 + 1] += Math.sin(time + i * 0.01) * 0.002
      
      // Orbital motion around center
      const angle = time * 0.001 + i * 0.01
      const radius = Math.sqrt(positions[i3] ** 2 + positions[i3 + 2] ** 2)
      positions[i3] = Math.cos(angle) * radius
      positions[i3 + 2] = Math.sin(angle) * radius
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <Points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        size={0.01}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Floating agent preview (simplified for now)
function FloatingAgents() {
  const agentPositions = [
    { x: -4, y: 2, z: -2 },
    { x: 4, y: 1, z: -1 },
    { x: 0, y: -2, z: -3 }
  ]

  return (
    <>
      {agentPositions.map((pos, index) => (
        <mesh key={index} position={[pos.x, pos.y, pos.z]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial 
            color={index === 0 ? '#00FF88' : index === 1 ? '#00D4FF' : '#FF4C61'}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </>
  )
}

// Main DepthHero component
export default function DepthHero({
  headline = "DEBT BECOMES OPPORTUNITY",
  subheadline = "The world's first multi-agentic AI infrastructure for autonomous credit servicing. Transform your $47B cost center into an AI-native profit driver.",
  primaryCTA = "Experience the Multi-Agent OS",
  secondaryCTA = "Calculate 3.2 Month Payback",
  onPrimaryCTA,
  onSecondaryCTA,
  particles = 10000,
  enableParallax = true,
  className = ''
}: DepthHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Performance optimization - reduce particles on mobile
  const [optimizedParticleCount, setOptimizedParticleCount] = useState(particles)
  
  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4
    
    if (isMobile || isLowEnd) {
      setOptimizedParticleCount(Math.min(2000, particles))
    }
  }, [particles])

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Urgency messages rotation
  const urgencyMessages = [
    "50+ Financial Institutions Already Transforming",
    "200M+ Calls Processed with Zero Violations", 
    "3.2 Month Payback Period Proven at Scale",
    "$200M+ Debt Managed Monthly",
    "10M Calls in 11 Hours"
  ]
  
  const [currentMessage, setCurrentMessage] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % urgencyMessages.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [urgencyMessages.length])

  // Hero metrics
  const heroMetrics = [
    {
      value: "35%",
      label: "Collection Lift",
      unit: "",
      trend: "up" as const,
      trendValue: "+12% vs Q3",
      icon: "trending" as const,
      description: "Multi-Agentic OS behavioral intelligence"
    },
    {
      value: "65%",
      label: "Contact Rate",
      unit: "+",
      trend: "up" as const,
      trendValue: "2.5× industry",
      icon: "target" as const,
      description: "Omnichannel orchestration at perfect timing"
    },
    {
      value: "200M",
      label: "Calls Processed",
      unit: "+",
      trend: "up" as const,
      trendValue: "Zero violations",
      icon: "shield" as const,
      description: "Perfect FDCPA/TCPA compliance at scale"
    },
    {
      value: "3.2",
      label: "Payback Period",
      unit: "mo",
      trend: "up" as const,
      trendValue: "Proven ROI",
      icon: "dollar" as const,
      description: "$2.4M annual savings per customer"
    }
  ]

  return (
    <div ref={containerRef} className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Z0: Deep Space Background with Particle Universe */}
      <motion.div 
        className="absolute inset-0 depth-void"
        style={{ y: enableParallax ? y1 : undefined, opacity }}
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{ 
            antialias: false, 
            alpha: true,
            powerPreference: "high-performance"
          }}
          dpr={Math.min(window.devicePixelRatio, 2)}
        >
          <Suspense fallback={null}>
            <ParticleUniverse count={optimizedParticleCount} />
            <FloatingAgents />
          </Suspense>
        </Canvas>
        
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-depth-space/20 to-depth-space/80" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-depth-space/40" />
      </motion.div>

      {/* Z1: Data Flow Layer (will add flowing metrics later) */}
      <motion.div 
        className="absolute inset-0 depth-data pointer-events-none"
        style={{ y: enableParallax ? y2 : undefined }}
      >
        {/* Subtle data streams - placeholder for now */}
        <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gradient-to-b from-krim-mint/30 to-transparent animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-px h-24 bg-gradient-to-t from-krim-cyan/30 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
      </motion.div>

      {/* Z2: Main Content Plane */}
      <motion.div 
        className="relative depth-content flex items-center min-h-screen"
        style={{ opacity }}
      >
        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10 w-full">
          
          {/* Urgency ticker */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 glass-subtle rounded-full border border-krim-mint/20">
              <div className="w-2 h-2 bg-krim-mint rounded-full animate-pulse mr-3" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentMessage}
                  className="text-sm text-krim-mint font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {urgencyMessages[currentMessage]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Main headline */}
          <div className="text-center mb-12">
            <GlowText
              variant="hero"
              gradient="aurora"
              morphing
              shimmer
              reveal="split"
              className="block mb-6"
              style={{ fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)' }}
            >
              {headline}
            </GlowText>
            
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <GlowText
                variant="body"
                size="xl"
                reveal="fade"
                className="text-white leading-relaxed"
              >
                {subheadline}
              </GlowText>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <MagneticButton
              size="hero"
              variant="primary"
              magnetic
              particles
              glow
              icon="zap"
              onClick={onPrimaryCTA}
            >
              {primaryCTA}
            </MagneticButton>
            
            <MagneticButton
              size="large"
              variant="secondary"
              magnetic
              glow
              icon="arrow"
              onClick={onSecondaryCTA}
            >
              {secondaryCTA}
            </MagneticButton>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {['SOC2', 'ISO 27001', 'GDPR/CCPA', 'TCPA Compliant', '99.99% Uptime'].map((badge, index) => (
              <div key={index} className="px-3 py-1 text-xs text-white border border-white/20 rounded-full">
                {badge}
              </div>
            ))}
          </motion.div>

          {/* Hero Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <MetricGrid 
              metrics={heroMetrics}
              size="large"
              depth="deep"
              className="max-w-6xl mx-auto"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Z3: Agent preview layer (placeholder for future AgentOrchestra) */}
      <div className="absolute bottom-20 right-20 depth-agents pointer-events-none">
        <motion.div
          className="w-16 h-16 rounded-full glass-medium border border-krim-mint/30 flex items-center justify-center"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-krim-mint to-krim-cyan opacity-80" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 depth-interaction"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.div
          className="flex flex-col items-center text-white"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs mb-2">Scroll to explore</span>
          <div className="w-px h-16 bg-gradient-to-b from-krim-mint to-transparent" />
        </motion.div>
      </motion.div>
    </div>
  )
}