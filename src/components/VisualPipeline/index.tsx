/**
 * KRIM AI - Complete Visual Pipeline Integration
 * Main export file for the advanced visual pipeline system
 */

// Core pipeline components
export { VisualEffects, KrimShaderMaterial } from './EffectComposer'
export { ScrollSystem, ScrollController, useScrollController } from './ScrollSystem'
export { Scene3D } from './Scene3D'
export { 
  InteractiveButton,
  InteractiveCard,
  CursorFollower,
  AnimatedText,
  LoadingSpinner,
  ParallaxScroll
} from './MicroInteractions'

// Usage examples and complete pipeline implementation
import React, { Suspense } from 'react'
import { ScrollSystem } from './ScrollSystem'
import { CursorFollower, LoadingSpinner } from './MicroInteractions'
import { Scene3D } from './Scene3D'

// Complete visual pipeline wrapper
interface VisualPipelineProps {
  children: React.ReactNode
  enableScrollEffects?: boolean
  enableCursor?: boolean
  enable3D?: boolean
  performanceMode?: 'low' | 'medium' | 'high'
}

export const VisualPipeline: React.FC<VisualPipelineProps> = ({
  children,
  enableScrollEffects = true,
  enableCursor = true,
  enable3D = true,
  performanceMode = 'high'
}) => {
  return (
    <div className="visual-pipeline-wrapper">
      {/* Custom cursor */}
      {enableCursor && <CursorFollower />}
      
      {/* 3D background scene */}
      {enable3D && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Suspense fallback={<LoadingSpinner variant="pulse" />}>
            <Scene3D 
              adaptivePerformance={true}
              enableControls={false}
              enableEffects={performanceMode !== 'low'}
            />
          </Suspense>
        </div>
      )}
      
      {/* Scroll system wrapper */}
      {enableScrollEffects ? (
        <ScrollSystem
          smoothScroll={performanceMode !== 'low'}
          enableParallax={performanceMode === 'high'}
        >
          <div className="relative z-10">
            {children}
          </div>
        </ScrollSystem>
      ) : (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  )
}

// Quick setup for common use cases
export const HulyInspiredScene = () => (
  <div 
    className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800"
    style={{
      background: 'radial-gradient(ellipse at center, rgba(22, 255, 187, 0.1) 0%, rgba(0, 0, 0, 0.9) 50%, rgba(0, 0, 0, 1) 100%)'
    }}
  >
    <VisualPipeline>
      {/* Your content here */}
      <div className="container mx-auto px-6 py-20">
        <div 
          data-scroll 
          data-text-reveal
          className="text-center"
        >
          <h1 className="text-6xl font-bold text-white mb-6 text-white">
            Next-Generation Visual Experience
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Powered by Three.js, GSAP, and Framer Motion with performance optimizations
          </p>
        </div>
      </div>
    </VisualPipeline>
  </div>
)

export default VisualPipeline