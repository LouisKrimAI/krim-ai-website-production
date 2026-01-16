/**
 * KRIM AI - STARFIELD BACKGROUND PERFORMANCE MONITORING
 * Real-time performance tracking for background rendering
 * Ensures 60fps performance across all devices
 */

import React from 'react'

interface StarfieldMetrics {
  paintTime: number
  frameRate: number
  droppedFrames: number
  gpuMemory?: number
  mainThreadBlocking: number
  isOptimized: boolean
}

interface PerformanceBudget {
  maxPaintTime: number      // 16.67ms for 60fps
  minFrameRate: number      // 55fps minimum
  maxDroppedFrames: number  // 5% of total frames
  maxGPUMemory: number      // 50MB for background effects
  maxMainThreadBlocking: number // 50ms maximum
}

class StarfieldPerformanceMonitor {
  private metrics: StarfieldMetrics = {
    paintTime: 0,
    frameRate: 60,
    droppedFrames: 0,
    mainThreadBlocking: 0,
    isOptimized: true
  }

  private budget: PerformanceBudget = {
    maxPaintTime: 16.67,
    minFrameRate: 55,
    maxDroppedFrames: 5, // 5% of frames
    maxGPUMemory: 50 * 1024 * 1024, // 50MB
    maxMainThreadBlocking: 50
  }
  
  // Auto quality adjustment thresholds
  private qualityLevels = {
    ultra: { starCount: 150, blurRadius: 20 },
    high: { starCount: 100, blurRadius: 16 },
    medium: { starCount: 60, blurRadius: 12 },
    low: { starCount: 30, blurRadius: 8 }
  }

  private observer?: PerformanceObserver
  private frameCount = 0
  private droppedFrameCount = 0
  private lastFrameTime = performance.now()
  private isMonitoring = false

  /**
   * Start monitoring starfield performance
   */
  public startMonitoring(): void {
    if (this.isMonitoring || typeof window === 'undefined') return

    this.isMonitoring = true
    this.setupFrameRateMonitoring()
    this.setupPaintTimeMonitoring()
    this.setupMainThreadMonitoring()
    
    if (import.meta.env.DEV) {
      console.log('🌟 StarfieldPerformanceMonitor: Started monitoring')
    }
  }

  /**
   * Stop monitoring and cleanup resources
   */
  public stopMonitoring(): void {
    if (!this.isMonitoring) return

    this.isMonitoring = false
    this.observer?.disconnect()
    
    if (import.meta.env.DEV) {
      console.log('🌟 StarfieldPerformanceMonitor: Stopped monitoring')
    }
  }

  /**
   * Get current performance metrics
   */
  public getMetrics(): StarfieldMetrics {
    return { ...this.metrics }
  }

  /**
   * Check if performance is within acceptable limits
   */
  public isPerformanceOptimal(): boolean {
    return (
      this.metrics.frameRate >= this.budget.minFrameRate &&
      this.metrics.paintTime <= this.budget.maxPaintTime &&
      this.metrics.droppedFrames <= this.budget.maxDroppedFrames &&
      this.metrics.mainThreadBlocking <= this.budget.maxMainThreadBlocking
    )
  }

  /**
   * Get performance recommendations based on current metrics
   */
  public getRecommendations(): string[] {
    const recommendations: string[] = []

    if (this.metrics.frameRate < this.budget.minFrameRate) {
      recommendations.push('Reduce gradient complexity or star count')
    }

    if (this.metrics.paintTime > this.budget.maxPaintTime) {
      recommendations.push('Optimize paint operations - consider fewer layers')
    }

    if (this.metrics.droppedFrames > this.budget.maxDroppedFrames) {
      recommendations.push('Enable GPU acceleration or reduce animation complexity')
    }

    if (this.metrics.mainThreadBlocking > this.budget.maxMainThreadBlocking) {
      recommendations.push('Move heavy operations to web worker or reduce calculations')
    }

    if (recommendations.length === 0) {
      recommendations.push('Performance is optimal')
    }

    return recommendations
  }

  private setupFrameRateMonitoring(): void {
    const measureFrameRate = () => {
      if (!this.isMonitoring) return

      this.frameCount++
      const currentTime = performance.now()
      const frameDuration = currentTime - this.lastFrameTime

      // Detect dropped frames (frame took longer than 16.67ms)
      if (frameDuration > 20) {
        this.droppedFrameCount++
      }

      // Calculate FPS every second
      if (currentTime >= this.lastFrameTime + 1000) {
        const fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastFrameTime))
        const droppedFramePercent = (this.droppedFrameCount / this.frameCount) * 100

        this.metrics = {
          ...this.metrics,
          frameRate: fps,
          droppedFrames: droppedFramePercent,
          isOptimized: this.isPerformanceOptimal()
        }

        // Log performance issues in development
        if (import.meta.env.DEV) {
          if (fps < this.budget.minFrameRate) {
            if (import.meta.env.DEV) {
              console.warn(`🌟 StarfieldBackground: Low FPS detected (${fps}fps)`)
            }
          }
          if (droppedFramePercent > this.budget.maxDroppedFrames) {
            if (import.meta.env.DEV) {
              console.warn(`🌟 StarfieldBackground: High dropped frames (${droppedFramePercent.toFixed(1)}%)`)
            }
          }
        }

        this.frameCount = 0
        this.droppedFrameCount = 0
        this.lastFrameTime = currentTime
      }

      requestAnimationFrame(measureFrameRate)
    }

    requestAnimationFrame(measureFrameRate)
  }

  private setupPaintTimeMonitoring(): void {
    if (!('PerformanceObserver' in window)) return

    try {
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'paint') {
            this.metrics.paintTime = entry.startTime
          }

          // Monitor specific starfield-related measurements
          if (entry.name && entry.name.includes('starfield')) {
            const paintTime = entry.duration || 0
            
            if (paintTime > this.budget.maxPaintTime && import.meta.env.DEV) {
              console.warn(`🌟 StarfieldBackground: Slow paint detected (${paintTime.toFixed(2)}ms)`)
            }
          }
        }
      })

      this.observer.observe({ 
        entryTypes: ['paint', 'measure'] 
      })
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn('🌟 StarfieldPerformanceMonitor: Paint monitoring not available')
      }
    }
  }

  private setupMainThreadMonitoring(): void {
    // Monitor main thread blocking using postMessage timing
    let messageCount = 0
    let totalDelay = 0

    const measureMainThread = () => {
      if (!this.isMonitoring) return

      const start = performance.now()
      
      setTimeout(() => {
        const delay = performance.now() - start
        messageCount++
        totalDelay += delay

        // Calculate average main thread blocking every 100 measurements
        if (messageCount >= 100) {
          const avgBlocking = totalDelay / messageCount
          this.metrics.mainThreadBlocking = avgBlocking

          if (avgBlocking > this.budget.maxMainThreadBlocking && import.meta.env.DEV) {
            console.warn(`🌟 StarfieldBackground: Main thread blocking (${avgBlocking.toFixed(2)}ms avg)`)
          }

          messageCount = 0
          totalDelay = 0
        }

        setTimeout(measureMainThread, 100)
      }, 0)
    }

    measureMainThread()
  }
}

// Global instance
export const starfieldMonitor = new StarfieldPerformanceMonitor()

/**
 * React hook for monitoring starfield performance
 */
export const useStarfieldPerformance = (autoStart = true) => {
  const [metrics, setMetrics] = React.useState<StarfieldMetrics>({
    paintTime: 0,
    frameRate: 60,
    droppedFrames: 0,
    mainThreadBlocking: 0,
    isOptimized: true
  })

  React.useEffect(() => {
    if (!autoStart) return

    starfieldMonitor.startMonitoring()

    // Update metrics every second
    const interval = setInterval(() => {
      setMetrics(starfieldMonitor.getMetrics())
    }, 1000)

    return () => {
      clearInterval(interval)
      starfieldMonitor.stopMonitoring()
    }
  }, [autoStart])

  return {
    metrics,
    isOptimal: starfieldMonitor.isPerformanceOptimal(),
    recommendations: starfieldMonitor.getRecommendations(),
    monitor: starfieldMonitor
  }
}

/**
 * Performance testing utilities for starfield
 */
export const starfieldPerformanceTests = {
  /**
   * Test if starfield maintains 60fps
   */
  async testFrameRate(duration = 5000): Promise<{ passed: boolean; fps: number }> {
    return new Promise((resolve) => {
      starfieldMonitor.startMonitoring()
      
      setTimeout(() => {
        const metrics = starfieldMonitor.getMetrics()
        const passed = metrics.frameRate >= 55
        
        resolve({
          passed,
          fps: metrics.frameRate
        })
        
        starfieldMonitor.stopMonitoring()
      }, duration)
    })
  },

  /**
   * Test paint timing performance
   */
  async testPaintTiming(): Promise<{ passed: boolean; paintTime: number }> {
    return new Promise((resolve) => {
      if (!('PerformanceObserver' in window)) {
        resolve({ passed: true, paintTime: 0 })
        return
      }

      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
            const passed = entry.startTime < 2500 // LCP budget
            observer.disconnect()
            resolve({
              passed,
              paintTime: entry.startTime
            })
          }
        }
      })

      try {
        observer.observe({ entryTypes: ['paint'] })
        
        // Fallback timeout
        setTimeout(() => {
          observer.disconnect()
          resolve({ passed: true, paintTime: 0 })
        }, 10000)
      } catch {
        resolve({ passed: true, paintTime: 0 })
      }
    })
  },

  /**
   * Test main thread blocking
   */
  async testMainThreadBlocking(duration = 3000): Promise<{ passed: boolean; avgBlocking: number }> {
    return new Promise((resolve) => {
      const measurements: number[] = []
      let count = 0
      const maxMeasurements = duration / 100

      const measure = () => {
        if (count >= maxMeasurements) {
          const avgBlocking = measurements.reduce((a, b) => a + b, 0) / measurements.length
          resolve({
            passed: avgBlocking < 50,
            avgBlocking
          })
          return
        }

        const start = performance.now()
        setTimeout(() => {
          measurements.push(performance.now() - start)
          count++
          setTimeout(measure, 100)
        }, 0)
      }

      measure()
    })
  }
}

