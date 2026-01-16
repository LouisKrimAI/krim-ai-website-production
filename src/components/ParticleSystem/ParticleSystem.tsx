/**
 * KRIM AI - ADVANCED 10K PARTICLE SYSTEM
 * GPU-accelerated WebGL with behavior AI and device adaptation
 */
import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, Color, Vector3, BufferGeometry, BufferAttribute, ShaderMaterial } from 'three'
import { getDeviceCapability } from '../../utils/performance'
import { useViewportSize } from '../../hooks/useViewportSize'
import { useReducedMotion } from '../../hooks/useReducedMotion'

// GPU Particle Shader
const particleVertexShader = `
  attribute float size;
  attribute vec3 customColor;
  attribute float alpha;
  attribute float time;
  
  varying vec3 vColor;
  varying float vAlpha;
  
  void main() {
    vColor = customColor;
    vAlpha = alpha;
    
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const particleFragmentShader = `
  uniform sampler2D pointTexture;
  uniform float time;
  
  varying vec3 vColor;
  varying float vAlpha;
  
  void main() {
    vec2 coords = gl_PointCoord;
    float dist = distance(coords, vec2(0.5));
    
    if (dist > 0.5) discard;
    
    // Glow effect
    float intensity = 1.0 - (dist * 2.0);
    intensity = pow(intensity, 2.0);
    
    // Pulsing effect
    float pulse = sin(time * 2.0) * 0.2 + 0.8;
    
    gl_FragColor = vec4(vColor * intensity * pulse, vAlpha * intensity);
  }
`

interface Particle {
  position: Vector3
  velocity: Vector3
  size: number
  color: Color
  alpha: number
  life: number
  maxLife: number
  behavior: 'float' | 'orbit' | 'spiral' | 'magnetic' | 'wave'
  energy: number
}

const ParticleSystem: React.FC = () => {
  const meshRef = useRef<Points>(null)
  const materialRef = useRef<ShaderMaterial>(null)
  const { width, height, isMobile } = useViewportSize()
  const prefersReducedMotion = useReducedMotion()
  
  // Device-adaptive particle count
  const particleCount = useMemo(() => {
    const capability = getDeviceCapability()
    if (prefersReducedMotion) return Math.floor(capability === 'high' ? 1000 : 500)
    
    switch (capability) {
      case 'high': return 10000
      case 'medium': return 5000
      case 'low': return isMobile ? 2000 : 3000
      default: return 5000
    }
  }, [isMobile, prefersReducedMotion])
  
  // Initialize particles with AI behavior
  const particles = useMemo(() => {
    const particleArray: Particle[] = []
    
    for (let i = 0; i < particleCount; i++) {
      const behaviors = ['float', 'orbit', 'spiral', 'magnetic', 'wave'] as const
      const behavior = behaviors[Math.floor(Math.random() * behaviors.length)]
      
      particleArray.push({
        position: new Vector3(
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20
        ),
        velocity: new Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.01
        ),
        size: Math.random() * 0.8 + 0.2,
        color: new Color().setHSL(
          Math.random() * 0.3 + 0.5, // Green to cyan range
          0.8,
          0.6
        ),
        alpha: Math.random() * 0.8 + 0.2,
        life: 0,
        maxLife: Math.random() * 1000 + 500,
        behavior,
        energy: Math.random() * 2 + 0.5
      })
    }
    
    return particleArray
  }, [particleCount])
  
  // Create geometry and attributes
  const geometry = useMemo(() => {
    const geo = new BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    const colors = new Float32Array(particleCount * 3)
    const alphas = new Float32Array(particleCount)
    const times = new Float32Array(particleCount)
    
    particles.forEach((particle, i) => {
      positions[i * 3] = particle.position.x
      positions[i * 3 + 1] = particle.position.y
      positions[i * 3 + 2] = particle.position.z
      
      sizes[i] = particle.size
      colors[i * 3] = particle.color.r
      colors[i * 3 + 1] = particle.color.g
      colors[i * 3 + 2] = particle.color.b
      alphas[i] = particle.alpha
      times[i] = Math.random() * 1000
    })
    
    geo.setAttribute('position', new BufferAttribute(positions, 3))
    geo.setAttribute('size', new BufferAttribute(sizes, 1))
    geo.setAttribute('customColor', new BufferAttribute(colors, 3))
    geo.setAttribute('alpha', new BufferAttribute(alphas, 1))
    geo.setAttribute('time', new BufferAttribute(times, 1))
    
    return geo
  }, [particles, particleCount])
  
  // Animation loop with AI behaviors
  useFrame((state) => {
    if (!meshRef.current || prefersReducedMotion) return
    
    const time = state.clock.elapsedTime
    const positions = geometry.attributes.position.array as Float32Array
    const sizes = geometry.attributes.size.array as Float32Array
    const colors = geometry.attributes.customColor.array as Float32Array
    const alphas = geometry.attributes.alpha.array as Float32Array
    
    particles.forEach((particle, i) => {
      // Update particle life
      particle.life++
      
      // Respawn if needed
      if (particle.life > particle.maxLife) {
        particle.life = 0
        particle.position.set(
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20
        )
        particle.velocity.set(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.01
        )
      }
      
      // AI Behavior Logic
      const mouse = state.mouse
      const mousePos = new Vector3(mouse.x * 25, mouse.y * 15, 0)
      
      switch (particle.behavior) {
        case 'magnetic':
          // Attract to mouse with electromagnetic simulation
          const distance = particle.position.distanceTo(mousePos)
          if (distance < 15) {
            const force = mousePos.clone().sub(particle.position).normalize().multiplyScalar(0.001 * particle.energy)
            particle.velocity.add(force)
          }
          break
          
        case 'orbit':
          // Orbital mechanics around center
          const center = new Vector3(0, 0, 0)
          const radius = particle.position.distanceTo(center)
          const angle = Math.atan2(particle.position.y, particle.position.x)
          particle.position.x = Math.cos(angle + 0.01 * particle.energy) * radius
          particle.position.y = Math.sin(angle + 0.01 * particle.energy) * radius
          break
          
        case 'spiral':
          // Fibonacci spiral pattern
          const spiralAngle = time * 0.5 + i * 0.1
          particle.position.x += Math.cos(spiralAngle) * 0.01 * particle.energy
          particle.position.y += Math.sin(spiralAngle) * 0.01 * particle.energy
          particle.position.z += Math.sin(time * 2 + i) * 0.005
          break
          
        case 'wave':
          // Sine wave motion
          particle.position.y += Math.sin(time * 2 + particle.position.x * 0.1) * 0.01 * particle.energy
          particle.position.x += particle.velocity.x
          break
          
        default:
          // Default floating behavior
          particle.position.add(particle.velocity)
          break
      }
      
      // Boundary wrapping
      if (Math.abs(particle.position.x) > 30) particle.position.x *= -0.8
      if (Math.abs(particle.position.y) > 20) particle.position.y *= -0.8
      if (Math.abs(particle.position.z) > 15) particle.position.z *= -0.8
      
      // Update attributes
      positions[i * 3] = particle.position.x
      positions[i * 3 + 1] = particle.position.y
      positions[i * 3 + 2] = particle.position.z
      
      // Dynamic sizing based on energy
      const lifeFactor = 1 - (particle.life / particle.maxLife)
      sizes[i] = particle.size * (0.5 + lifeFactor) * particle.energy
      
      // Color evolution
      const hue = (time * 0.1 + i * 0.001) % 1
      const color = new Color().setHSL(hue * 0.3 + 0.5, 0.8, 0.6)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
      
      // Alpha breathing
      alphas[i] = particle.alpha * (0.5 + 0.5 * Math.sin(time * 3 + i * 0.1))
    })
    
    // Mark attributes for update
    geometry.attributes.position.needsUpdate = true
    geometry.attributes.size.needsUpdate = true
    geometry.attributes.customColor.needsUpdate = true
    geometry.attributes.alpha.needsUpdate = true
    
    // Update material time
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = time
    }
  })
  
  return (
    <points ref={meshRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={{
          time: { value: 0 },
          pointTexture: { value: null }
        }}
        transparent
        depthWrite={false}
        blending={2} // AdditiveBlending
      />
    </points>
  )
}

// Main Canvas Wrapper
const ParticleCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
  const prefersReducedMotion = useReducedMotion()
  
  if (prefersReducedMotion) {
    return (
      <div className={`${className} depth-void`} style={{ opacity: 0.3 }}>
        <div className="aurora-background" />
      </div>
    )
  }
  
  return (
    <div className={`${className} depth-void`}>
      <Canvas
        camera={{ position: [0, 0, 30], fov: 60 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance'
        }}
        performance={{ min: 0.5 }}
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
      >
        <ParticleSystem />
      </Canvas>
      <div className="aurora-background" />
    </div>
  )
}

export default ParticleCanvas