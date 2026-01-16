import { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { AdditiveBlending } from 'three'
import { getDeviceCapability } from '../utils/performance'

interface ParticleField3DProps {
  particleCount?: number
  colorPrimary?: string
  colorSecondary?: string
}

// Performance-aware particle counts based on device capability
const getOptimalParticleCount = (requestedCount: number): number => {
  const deviceCapability = getDeviceCapability()
  const multipliers = { low: 0.3, medium: 0.6, high: 1.0 }
  return Math.floor(requestedCount * multipliers[deviceCapability])
}

function ParticleCloud({ 
  count = 1000, 
  colorPrimary = '#00FF88', 
  colorSecondary = '#00D4FF' 
}: { 
  count: number
  colorPrimary: string
  colorSecondary: string
}) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [count])

  return (
    <Points positions={points}>
      <PointMaterial
        size={0.02}
        color={colorPrimary}
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </Points>
  )
}

const ParticleField3D: React.FC<ParticleField3DProps> = ({
  particleCount = 1000,
  colorPrimary = '#00FF88',
  colorSecondary = '#00D4FF'
}) => {
  const optimizedParticleCount = useMemo(() => 
    getOptimalParticleCount(particleCount), [particleCount]
  )

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      performance={{ min: 0.5 }} // Allow frame rate to drop to maintain performance
      dpr={[1, 2]} // Limit pixel ratio on high-DPI displays
      gl={{
        powerPreference: "high-performance",
        antialias: false, // Disable for better performance
        alpha: false, // Fix white flash
        stencil: false,
        depth: true
      }}
      onCreated={({ gl }) => {
        // Fix white flash: Set clear color to brand dark
        gl.setClearColor('#0A081B', 1)
      }}
    >
      <ParticleCloud 
        count={optimizedParticleCount} 
        colorPrimary={colorPrimary}
        colorSecondary={colorSecondary}
      />
    </Canvas>
  )
}

export default ParticleField3D