/**
 * KRIM AI - VIEWPORT SIZE HOOK
 * Performance-optimized viewport tracking
 */
import { useState, useEffect } from 'react'
import { throttle } from '../utils/performance'

interface ViewportSize {
  width: number
  height: number
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

export const useViewportSize = (): ViewportSize => {
  const [viewport, setViewport] = useState<ViewportSize>(() => {
    if (typeof window === 'undefined') {
      return {
        width: 1024,
        height: 768,
        isMobile: false,
        isTablet: false,
        isDesktop: true
      }
    }
    
    const width = window.innerWidth
    const height = window.innerHeight
    
    return {
      width,
      height,
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024
    }
  })
  
  useEffect(() => {
    const handleResize = throttle(() => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      setViewport({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024
      })
    }, 150)
    
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return viewport
}

export default useViewportSize