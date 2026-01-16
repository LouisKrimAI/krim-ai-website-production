/**
 * KRIM AI - Advanced Scroll System
 * GSAP + ScrollTrigger + Lenis smooth scroll implementation
 * Inspired by huly.io's fluid scroll interactions
 * NOTE: Lenis import commented out for build compatibility
 */
import React, { useEffect, useRef, useCallback, PropsWithChildren } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

interface ScrollSystemProps extends PropsWithChildren {
  smoothScroll?: boolean
  scrollSpeed?: number
  gestureDirection?: 'vertical' | 'horizontal' | 'both'
  enableParallax?: boolean
  refreshRate?: number
}

interface ScrollElementOptions {
  trigger?: string | Element
  start?: string
  end?: string
  scrub?: boolean | number
  pin?: boolean
  anticipatePin?: number
  animation?: gsap.core.Timeline
  onEnter?: () => void
  onLeave?: () => void
  onEnterBack?: () => void
  onLeaveBack?: () => void
}

export class ScrollController {
  private lenis: any | null = null
  private isDestroyed = false
  private scrollTriggers: ScrollTrigger[] = []

  constructor(options: {
    smoothScroll?: boolean
    scrollSpeed?: number
    gestureDirection?: 'vertical' | 'horizontal' | 'both'
  } = {}) {
    this.init(options)
  }

  private init({
    smoothScroll = true,
    scrollSpeed = 1,
    gestureDirection = 'vertical'
  }: {
    smoothScroll?: boolean
    scrollSpeed?: number
    gestureDirection?: 'vertical' | 'horizontal' | 'both'
  }) {
    if (smoothScroll && typeof window !== 'undefined') {
      // Lenis smooth scroll restored for enhanced user experience
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      })

      // Update ScrollTrigger on scroll
      this.lenis.on('scroll', () => {
        ScrollTrigger.update()
      })

      // Start the animation loop
      this.raf()
    }

    // Configure ScrollTrigger defaults
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true
    })

    ScrollTrigger.defaults({
      scroller: smoothScroll ? document.body : window
    })
  }

  private raf = () => {
    if (this.isDestroyed) return
    this.lenis?.raf()
    requestAnimationFrame(this.raf)
  }

  // Animate elements on scroll with performance optimization
  animateOnScroll(
    elements: string | Element | Element[],
    options: ScrollElementOptions = {}
  ): ScrollTrigger {
    const {
      trigger,
      start = 'top 80%',
      end = 'bottom 20%',
      scrub = false,
      pin = false,
      anticipatePin = 1,
      animation,
      onEnter,
      onLeave,
      onEnterBack,
      onLeaveBack
    } = options

    const triggerElement = trigger || elements
    const targetElements = Array.isArray(elements) ? elements : [elements]

    // Create default animation if none provided
    const tl = animation || gsap.timeline()
    
    if (!animation) {
      // Default reveal animation
      gsap.set(targetElements, { 
        opacity: 0, 
        y: 100,
        rotationX: 45,
        transformPerspective: 1000
      })
      
      tl.to(targetElements, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.1
      })
    }

    const scrollTrigger = ScrollTrigger.create({
      trigger: triggerElement,
      start,
      end,
      scrub,
      pin,
      anticipatePin,
      animation: tl,
      onEnter,
      onLeave,
      onEnterBack,
      onLeaveBack,
      toggleActions: 'play none none reverse'
    })

    this.scrollTriggers.push(scrollTrigger)
    return scrollTrigger
  }

  // Parallax effect for background elements
  createParallax(
    element: string | Element,
    speed: number = 0.5,
    direction: 'vertical' | 'horizontal' = 'vertical'
  ): ScrollTrigger {
    const yPercent = direction === 'vertical' ? speed * 100 : 0
    const xPercent = direction === 'horizontal' ? speed * 100 : 0

    return this.animateOnScroll(element, {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      animation: gsap.timeline().to(element, {
        yPercent,
        xPercent,
        ease: 'none'
      })
    })
  }

  // Text reveal animation similar to huly.io
  animateTextReveal(
    element: string | Element,
    options: {
      splitBy?: 'lines' | 'words' | 'chars'
      stagger?: number
      duration?: number
      ease?: string
    } = {}
  ): ScrollTrigger {
    const {
      splitBy = 'lines',
      stagger = 0.1,
      duration = 0.8,
      ease = 'power3.out'
    } = options

    const targetElement = typeof element === 'string' 
      ? document.querySelector(element) as HTMLElement
      : element as HTMLElement

    if (!targetElement) return this.animateOnScroll(element)

    // Split text into spans
    const text = targetElement.textContent || ''
    const splitText = this.splitTextByType(text, splitBy)
    targetElement.innerHTML = splitText

    const spans = targetElement.querySelectorAll('span')
    
    // Set initial state
    gsap.set(spans, {
      opacity: 0,
      y: 100,
      rotationX: 90,
      transformOrigin: 'center bottom'
    })

    const tl = gsap.timeline()
    tl.to(spans, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration,
      ease,
      stagger
    })

    return this.animateOnScroll(targetElement, {
      animation: tl
    })
  }

  private splitTextByType(text: string, splitBy: 'lines' | 'words' | 'chars'): string {
    switch (splitBy) {
      case 'chars':
        return text.split('').map(char => 
          char === ' ' ? ' ' : `<span>${char}</span>`
        ).join('')
      case 'words':
        return text.split(' ').map(word => 
          `<span>${word}</span>`
        ).join(' ')
      case 'lines':
      default:
        return text.split('\n').map(line => 
          `<span style="display: block">${line}</span>`
        ).join('')
    }
  }

  // Magnetic cursor effect for interactive elements
  createMagneticEffect(
    element: string | Element,
    strength: number = 0.3
  ): void {
    const targetElement = typeof element === 'string' 
      ? document.querySelector(element) as HTMLElement
      : element as HTMLElement

    if (!targetElement) return

    let bounds: DOMRect
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      if (!bounds) bounds = targetElement.getBoundingClientRect()
      
      const centerX = bounds.left + bounds.width / 2
      const centerY = bounds.top + bounds.height / 2
      
      mouseX = (e.clientX - centerX) * strength
      mouseY = (e.clientY - centerY) * strength

      gsap.to(targetElement, {
        x: mouseX,
        y: mouseY,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(targetElement, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      })
    }

    const handleMouseEnter = () => {
      bounds = targetElement.getBoundingClientRect()
    }

    targetElement.addEventListener('mouseenter', handleMouseEnter)
    targetElement.addEventListener('mousemove', handleMouseMove)
    targetElement.addEventListener('mouseleave', handleMouseLeave)
  }

  // Scroll to element with smooth animation
  scrollTo(target: string | Element | number, options: {
    duration?: number
    offset?: number
    easing?: (t: number) => number
  } = {}) {
    const { duration = 1, offset = 0 } = options

    if (this.lenis) {
      this.lenis.scrollTo(target, {
        duration,
        offset,
        immediate: false
      })
    } else {
      // Fallback for native scroll
      const element = typeof target === 'string' 
        ? document.querySelector(target) 
        : target as Element
      
      if (element && 'scrollIntoView' in element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  // Cleanup
  destroy(): void {
    this.isDestroyed = true
    this.lenis?.destroy()
    this.scrollTriggers.forEach(trigger => trigger.kill())
    ScrollTrigger.killAll()
  }

  // Refresh ScrollTrigger (useful for dynamic content)
  refresh(): void {
    ScrollTrigger.refresh()
  }

  // Get scroll progress (0 to 1)
  getScrollProgress(): number {
    return this.lenis?.progress || window.scrollY / (document.body.scrollHeight - window.innerHeight)
  }
}

// React component wrapper
export const ScrollSystem: React.FC<ScrollSystemProps> = ({
  children,
  smoothScroll = true,
  scrollSpeed = 1,
  gestureDirection = 'vertical',
  enableParallax = true,
  refreshRate = 60
}) => {
  const scrollControllerRef = useRef<ScrollController | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollControllerRef.current = new ScrollController({
      smoothScroll,
      scrollSpeed,
      gestureDirection
    })

    // Auto-animate elements with data attributes
    const elements = document.querySelectorAll('[data-scroll]')
    elements.forEach((element) => {
      const trigger = element.getAttribute('data-scroll-trigger') || element
      const speed = parseFloat(element.getAttribute('data-scroll-speed') || '1')
      const delay = parseFloat(element.getAttribute('data-scroll-delay') || '0')

      if (element.hasAttribute('data-parallax') && enableParallax) {
        scrollControllerRef.current?.createParallax(element, speed)
      } else if (element.hasAttribute('data-text-reveal')) {
        setTimeout(() => {
          scrollControllerRef.current?.animateTextReveal(element)
        }, delay * 1000)
      } else {
        setTimeout(() => {
          scrollControllerRef.current?.animateOnScroll(element, {
            trigger: typeof trigger === 'string' ? trigger : element
          })
        }, delay * 1000)
      }

      // Add magnetic effect for interactive elements
      if (element.hasAttribute('data-magnetic')) {
        const strength = parseFloat(element.getAttribute('data-magnetic') || '0.3')
        scrollControllerRef.current?.createMagneticEffect(element, strength)
      }
    })

    return () => {
      scrollControllerRef.current?.destroy()
    }
  }, [smoothScroll, scrollSpeed, gestureDirection, enableParallax])

  // Expose scroll controller for imperative usage
  useEffect(() => {
    if (containerRef.current && scrollControllerRef.current) {
      (containerRef.current as any).scrollController = scrollControllerRef.current
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="scroll-system"
      style={{ 
        isolation: 'isolate',
        transform: 'translateZ(0)' // Force hardware acceleration
      }}
    >
      {children}
    </div>
  )
}

// Hook for accessing scroll controller in components
export const useScrollController = (): ScrollController | null => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = document.querySelector('.scroll-system') as any
    if (container?.scrollController) {
      containerRef.current = container.scrollController
    }
  }, [])

  return (containerRef.current as any) || null
}

export default ScrollSystem