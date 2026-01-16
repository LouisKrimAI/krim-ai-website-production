/**
 * Performance monitoring utility for debugging render issues
 * Use this in development to track FPS and identify performance bottlenecks
 */

export class PerformanceMonitor {
  private frameCount = 0
  private lastTime = performance.now()
  private fps = 60
  private animationId: number | null = null
  
  start(callback?: (fps: number) => void) {
    if (this.animationId) return
    
    const measure = () => {
      this.frameCount++
      const currentTime = performance.now()
      
      if (currentTime >= this.lastTime + 1000) {
        this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime))
        this.frameCount = 0
        this.lastTime = currentTime
        
        if (callback) {
          callback(this.fps)
        }
        
        // Log warnings in development
        if (process.env.NODE_ENV === 'development') {
          if (this.fps < 30) {
            console.warn(`⚠️ Low FPS detected: ${this.fps} FPS`)
          } else if (this.fps < 50) {
            console.info(`ℹ️ Moderate FPS: ${this.fps} FPS`)
          }
        }
      }
      
      this.animationId = requestAnimationFrame(measure)
    }
    
    this.animationId = requestAnimationFrame(measure)
  }
  
  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
  }
  
  getFPS() {
    return this.fps
  }
  
  // Helper to measure component render time
  static measureRender(componentName: string, fn: () => void) {
    if (process.env.NODE_ENV === 'development') {
      const start = performance.now()
      fn()
      const end = performance.now()
      const duration = end - start
      
      if (duration > 16.67) { // More than one frame (60fps = 16.67ms per frame)
        console.warn(`⚠️ Slow render in ${componentName}: ${duration.toFixed(2)}ms`)
      }
    } else {
      fn()
    }
  }
  
  // Helper to detect layout thrashing
  static detectLayoutThrashing(fn: () => void) {
    if (process.env.NODE_ENV === 'development') {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const layoutCount = entries.filter(e => 
          e.entryType === 'measure' && e.name.includes('layout')
        ).length
        
        if (layoutCount > 3) {
          console.warn(`⚠️ Potential layout thrashing detected: ${layoutCount} layout recalculations`)
        }
      })
      
      observer.observe({ entryTypes: ['measure'] })
      fn()
      observer.disconnect()
    } else {
      fn()
    }
  }
}

// Export singleton instance for easy use
export const performanceMonitor = new PerformanceMonitor()

// React hook for monitoring FPS
import { useEffect, useState } from 'react'

export function useFPSMonitor() {
  const [fps, setFPS] = useState(60)
  
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      performanceMonitor.start(setFPS)
      return () => performanceMonitor.stop()
    }
  }, [])
  
  return fps
}

// React hook for detecting slow renders
export function useRenderMonitor(componentName: string) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const start = performance.now()
      
      return () => {
        const duration = performance.now() - start
        if (duration > 100) {
          console.info(`ℹ️ ${componentName} total render cycle: ${duration.toFixed(2)}ms`)
        }
      }
    }
  }, [componentName])
}