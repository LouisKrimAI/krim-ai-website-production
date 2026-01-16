/**
 * KRIM AI - Advanced Visual Effects Pipeline
 * High-performance post-processing effects inspired by huly.io
 * NOTE: Postprocessing effects commented out for build compatibility
 */
import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { 
  EffectComposer,
  Bloom, 
  ChromaticAberration,
  Vignette,
  GodRays,
  SMAA
} from '@react-three/postprocessing'
import {
  BlendFunction,
  KernelSize,
  Resolution
} from 'postprocessing'
import { Mesh, Vector2, HalfFloatType } from 'three'

interface VisualEffectsProps {
  bloomIntensity?: number
  godRaysIntensity?: number
  vignetteIntensity?: number
  chromaticAberrationIntensity?: number
  enabled?: boolean
  quality?: 'low' | 'medium' | 'high'
}

export const VisualEffects: React.FC<VisualEffectsProps> = ({
  bloomIntensity = 0.8,
  godRaysIntensity = 0.6,
  vignetteIntensity = 0.3,
  chromaticAberrationIntensity = 0.02,
  enabled = true,
  quality = 'high'
}) => {
  const { viewport, camera } = useThree()
  const sunRef = useRef<Mesh>(null)
  
  // Performance-aware settings based on device capabilities
  const settings = useMemo(() => {
    const isLowEnd = typeof window !== 'undefined' && window.navigator.hardwareConcurrency <= 4
    const baseQuality = isLowEnd ? 'low' : quality
    
    return {
      bloom: {
        intensity: baseQuality === 'low' ? bloomIntensity * 0.6 : bloomIntensity,
        kernelSize: baseQuality === 'low' ? KernelSize.SMALL : KernelSize.LARGE,
        luminanceThreshold: 0.9,
        luminanceSmoothing: 0.025,
        mipmapBlur: true
      },
      godRays: {
        intensity: baseQuality === 'low' ? godRaysIntensity * 0.5 : godRaysIntensity,
        density: baseQuality === 'low' ? 0.8 : 0.96,
        decay: 0.92,
        weight: 0.4,
        samples: baseQuality === 'low' ? 60 : 100
      },
      resolution: baseQuality === 'low' 
        ? new Resolution(typeof window !== 'undefined' ? window : {} as any, typeof window !== 'undefined' ? window.innerWidth * 0.5 : 1024, typeof window !== 'undefined' ? window.innerHeight * 0.5 : 768)
        : new Resolution(typeof window !== 'undefined' ? window : {} as any, typeof window !== 'undefined' ? window.innerWidth : 1920, typeof window !== 'undefined' ? window.innerHeight : 1080)
    }
  }, [quality, bloomIntensity, godRaysIntensity])

  // Animated light source for god rays
  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 5
      sunRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 3 + 2
    }
  })

  if (!enabled) return null

  return (
    <>
      {/* Light source for visual effects */}
      <mesh ref={sunRef} position={[0, 2, -5]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#16FFBB" />
        <pointLight intensity={2} color="#16FFBB" distance={10} />
      </mesh>

      {/* Postprocessing effects restored for visual fidelity */}
      <EffectComposer
        multisampling={settings.resolution.width > 1920 ? 4 : 0}
        frameBufferType={HalfFloatType}
      >
        <SMAA />
        <Bloom
          intensity={settings.bloom.intensity}
          kernelSize={settings.bloom.kernelSize}
          luminanceThreshold={settings.bloom.luminanceThreshold}
          luminanceSmoothing={settings.bloom.luminanceSmoothing}
          mipmapBlur={settings.bloom.mipmapBlur}
          blendFunction={BlendFunction.SCREEN}
        />
        <GodRays
          sun={sunRef.current}
          blendFunction={BlendFunction.SCREEN}
          samples={settings.godRays.samples}
          density={settings.godRays.density}
          decay={settings.godRays.decay}
          weight={settings.godRays.weight}
          exposure={settings.godRays.intensity}
        />
        <Vignette
          eskil={false}
          offset={0.1}
          darkness={vignetteIntensity}
          blendFunction={BlendFunction.NORMAL}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new Vector2(chromaticAberrationIntensity, chromaticAberrationIntensity)}
          radialModulation={false}
          modulationOffset={0.15}
        />
      </EffectComposer>
    </>
  )
}

// Performance-optimized shader material for custom effects
export const KrimShaderMaterial = {
  // Animated gradient background similar to huly.io
  animatedGradient: {
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      
      varying vec2 vUv;
      varying vec3 vPosition;
      
      // Noise function for organic movement
      float noise(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }
      
      void main() {
        vec2 st = vUv;
        
        // Create flowing gradient
        float t = uTime * 0.1;
        float x = st.x + sin(t + st.y * 3.0) * 0.1;
        float y = st.y + cos(t + st.x * 2.0) * 0.1;
        
        // Multi-layered color mixing
        vec3 color1 = mix(uColor1, uColor2, smoothstep(0.0, 1.0, x));
        vec3 color2 = mix(uColor2, uColor3, smoothstep(0.0, 1.0, y));
        vec3 finalColor = mix(color1, color2, 0.5);
        
        // Add subtle noise for texture
        float n = noise(st * 100.0) * 0.03;
        finalColor += n;
        
        gl_FragColor = vec4(finalColor, 0.8);
      }
    `
  },

  // Particle field shader for background effects
  particleField: {
    vertexShader: `
      attribute float size;
      attribute vec3 color;
      
      varying vec3 vColor;
      uniform float uTime;
      
      void main() {
        vColor = color;
        
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        
        // Animate particles
        float pulse = sin(uTime + position.x * 0.01) * 0.5 + 0.5;
        gl_PointSize = size * pulse * (300.0 / -mvPosition.z);
        
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      
      void main() {
        // Create circular particles
        float distanceToCenter = length(gl_PointCoord - 0.5);
        float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
        
        gl_FragColor = vec4(vColor, alpha * 0.6);
      }
    `
  }
}