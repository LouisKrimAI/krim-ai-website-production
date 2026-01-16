/**
 * KRIM AI - Advanced 3D Scene Component
 * High-performance Three.js/R3F implementation with adaptive quality
 */
import { Suspense, useRef, useMemo, useCallback, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  OrbitControls, 
  PerspectiveCamera,
  Environment,
  ContactShadows,
  AdaptiveDpr,
  AdaptiveEvents,
  BakeShadows,
  Preload
} from '@react-three/drei'
import { VisualEffects, KrimShaderMaterial } from './EffectComposer'
import { Color, Vector2, AdditiveBlending, PerspectiveCamera as ThreePerspectiveCamera, DoubleSide } from 'three'

interface Scene3DProps {
  className?: string
  enableEffects?: boolean
  enableControls?: boolean
  adaptivePerformance?: boolean
  autoRotate?: boolean
  children?: React.ReactNode
}

// Performance-optimized particle system
const ParticleSystem: React.FC<{
  count?: number
  colors?: string[]
  speed?: number
  radius?: number
}> = ({ 
  count = 1000, 
  colors = ['#16FFBB', '#00D4FF', '#4F46E5'],
  speed = 0.5,
  radius = 10
}) => {
  const meshRef = useRef<any>(null)
  const materialRef = useRef<any>(null)

  // Generate particle positions and attributes
  const [positions, colorArray, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colorArray = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    const colorObjects = colors.map(color => new Color(color))

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Spherical distribution
      const radius3d = radius * Math.cbrt(Math.random())
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i3] = radius3d * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius3d * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius3d * Math.cos(phi)

      // Random color from palette
      const color = colorObjects[Math.floor(Math.random() * colorObjects.length)]
      colorArray[i3] = color.r
      colorArray[i3 + 1] = color.g
      colorArray[i3 + 2] = color.b

      // Varied particle sizes
      sizes[i] = Math.random() * 2 + 0.5
    }

    return [positions, colorArray, sizes]
  }, [count, colors, radius])

  // Animate particles
  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      // Update shader time uniform
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * speed

      // Gentle rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colorArray.length / 3}
          array={colorArray}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={KrimShaderMaterial.particleField.vertexShader}
        fragmentShader={KrimShaderMaterial.particleField.fragmentShader}
        uniforms={{
          uTime: { value: 0 }
        }}
        vertexColors
        transparent
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

// Animated background geometry
const BackgroundGeometry: React.FC = () => {
  const meshRef = useRef<any>(null)
  const materialRef = useRef<any>(null)

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <planeGeometry args={[20, 20, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={KrimShaderMaterial.animatedGradient.vertexShader}
        fragmentShader={KrimShaderMaterial.animatedGradient.fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uResolution: {
            value: new Vector2(
              typeof window !== 'undefined' ? window.innerWidth : 1920,
              typeof window !== 'undefined' ? window.innerHeight : 1080
            )
          },
          uColor1: { value: new Color('#16FFBB') },
          uColor2: { value: new Color('#00D4FF') },
          uColor3: { value: new Color('#4F46E5') }
        }}
        transparent
        side={DoubleSide}
      />
    </mesh>
  )
}

// Adaptive camera with smooth controls
const AdaptiveCamera: React.FC<{ enableControls: boolean; autoRotate: boolean }> = ({ 
  enableControls, 
  autoRotate
}) => {
  const { viewport } = useThree()
  const cameraRef = useRef<ThreePerspectiveCamera>(null)

  // Responsive camera positioning
  const cameraPosition = useMemo(() => {
    const isMobile = viewport.width < 768
    return isMobile ? [0, 0, 8] : [0, 0, 6]
  }, [viewport.width])

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={cameraPosition as [number, number, number]}
        fov={75}
        near={0.1}
        far={100}
      />
      {enableControls && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2.5}
        />
      )}
    </>
  )
}

// Performance monitoring component
const PerformanceMonitor: React.FC<{ 
  onPerformanceChange?: (fps: number) => void 
}> = ({ onPerformanceChange }) => {
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())

  useFrame(() => {
    frameCount.current++
    const now = performance.now()
    
    if (now - lastTime.current >= 1000) {
      const fps = (frameCount.current * 1000) / (now - lastTime.current)
      onPerformanceChange?.(fps)
      
      frameCount.current = 0
      lastTime.current = now
    }
  })

  return null
}

// Main 3D Scene component
export const Scene3D: React.FC<Scene3DProps> = ({
  className = '',
  enableEffects = true,
  enableControls = true,
  adaptivePerformance = true,
  autoRotate = false,
  children
}) => {
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('high')
  
  // Performance callback
  const handlePerformanceChange = useCallback((fps: number) => {
    if (!adaptivePerformance) return
    
    if (fps < 30 && quality !== 'low') {
      setQuality('low')
      console.log('🎮 Switching to low quality mode for better performance')
    } else if (fps > 50 && quality !== 'high') {
      setQuality('high')
      console.log('🎮 Switching to high quality mode')
    } else if (fps > 40 && fps <= 50 && quality !== 'medium') {
      setQuality('medium')
      console.log('🎮 Switching to medium quality mode')
    }
  }, [quality, adaptivePerformance])

  // Canvas settings based on quality
  const canvasSettings = useMemo(() => {
    const baseSettings = {
      antialias: quality !== 'low',
      alpha: true,
      powerPreference: 'high-performance' as const,
      stencil: false,
      depth: true
    }

    switch (quality) {
      case 'low':
        return {
          ...baseSettings,
          dpr: 0.75,
          performance: { min: 0.2, max: 0.5 },
          shadows: false
        }
      case 'medium':
        return {
          ...baseSettings,
          dpr: 1,
          performance: { min: 0.5, max: 0.8 },
          shadows: true
        }
      case 'high':
      default:
        return {
          ...baseSettings,
          dpr: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2),
          performance: { min: 0.8, max: 1 },
          shadows: true
        }
    }
  }, [quality])

  return (
    <div className={`scene-3d ${className}`} style={{ 
      width: '100%', 
      height: '100%',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Canvas
        dpr={canvasSettings.dpr}
        performance={canvasSettings.performance}
        gl={{
          antialias: canvasSettings.antialias,
          alpha: false,
          powerPreference: canvasSettings.powerPreference,
          stencil: canvasSettings.stencil,
          depth: canvasSettings.depth
        }}
        onCreated={({ gl }) => {
          // Fix white flash: Set clear color to brand dark
          gl.setClearColor('#0A081B', 1)
        }}
        shadows={canvasSettings.shadows}
        style={{ 
          background: 'transparent',
          zIndex: 1
        }}
      >
        {/* Adaptive performance optimizations */}
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        
        {/* Performance monitoring */}
        <PerformanceMonitor onPerformanceChange={handlePerformanceChange} />
        
        {/* Camera setup */}
        <AdaptiveCamera 
          enableControls={enableControls} 
          autoRotate={autoRotate} 
        />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={0.8} 
          castShadow={canvasSettings.shadows}
          shadow-mapSize-width={quality === 'high' ? 2048 : 1024}
          shadow-mapSize-height={quality === 'high' ? 2048 : 1024}
        />
        <pointLight position={[-5, -5, -5]} intensity={0.4} color="#16FFBB" />

        {/* Environment */}
        <Environment preset="dawn" />
        
        {/* Scene content */}
        <Suspense fallback={null}>
          {/* Background animated geometry */}
          <BackgroundGeometry />
          
          {/* Particle system */}
          <ParticleSystem 
            count={quality === 'low' ? 500 : quality === 'medium' ? 750 : 1000}
            speed={0.3}
          />
          
          {/* Contact shadows for depth */}
          {canvasSettings.shadows && (
            <ContactShadows
              position={[0, -2, 0]}
              opacity={0.3}
              scale={10}
              blur={2}
              far={2}
            />
          )}
          
          {/* Custom children */}
          {children}
        </Suspense>

        {/* Post-processing effects */}
        {enableEffects && (
          <VisualEffects 
            quality={quality}
            enabled={quality !== 'low'}
            bloomIntensity={quality === 'high' ? 0.8 : 0.5}
            godRaysIntensity={quality === 'high' ? 0.6 : 0.3}
          />
        )}

        {/* Preload resources */}
        <Preload all />
        
        {/* Bake shadows for better performance */}
        {canvasSettings.shadows && <BakeShadows />}
      </Canvas>

      {/* Quality indicator (dev mode only) */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'absolute',
          top: 10,
          left: 10,
          color: 'white',
          fontSize: '12px',
          background: 'rgba(0,0,0,0.5)',
          padding: '4px 8px',
          borderRadius: '4px',
          fontFamily: 'monospace',
          zIndex: 1000
        }}>
          Quality: {quality}
        </div>
      )}
    </div>
  )
}

export default Scene3D