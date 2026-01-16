/**
 * KRIM AI - PERFORMANCE HOOKS
 * Optimized Intersection Observer Hook
 */
import { useEffect, useRef, useState } from 'react'

interface IntersectionOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  triggerOnce?: boolean
  skip?: boolean
}

export const useIntersection = (
  options: IntersectionOptions = {}
) => {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    triggerOnce = true,
    skip = false
  } = options
  
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const elementRef = useRef<Element | null>(null)
  
  useEffect(() => {
    if (skip || !elementRef.current) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting
        
        if (isElementIntersecting && !hasIntersected) {
          setIsIntersecting(true)
          setHasIntersected(true)
          
          if (triggerOnce) {
            observer.unobserve(entry.target)
          }
        } else if (!triggerOnce) {
          setIsIntersecting(isElementIntersecting)
        }
      },
      {
        threshold,
        root,
        rootMargin
      }
    )
    
    observer.observe(elementRef.current)
    
    return () => observer.disconnect()
  }, [threshold, root, rootMargin, triggerOnce, skip, hasIntersected])
  
  return [elementRef, isIntersecting, hasIntersected] as const
}

export default useIntersection