/**
 * KRIM AI - OPTIMIZED IMAGE COMPONENT
 * WebP/AVIF with fallbacks and lazy loading
 */
import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useIntersection } from '../hooks/useIntersection'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  quality?: number
  lazy?: boolean
  placeholder?: 'blur' | 'empty'
  sizes?: string
  priority?: boolean
  onLoad?: () => void
  onError?: () => void
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  quality = 75,
  lazy = true,
  placeholder = 'blur',
  sizes = '100vw',
  priority = false,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState('')
  const imgRef = useRef<HTMLImageElement>(null)
  
  const [intersectionRef, isIntersecting] = useIntersection({
    triggerOnce: true,
    rootMargin: '200px',
    skip: !lazy || priority
  })
  
  // Check for modern image format support
  const getOptimizedSrc = (originalSrc: string, width?: number) => {
    if (!originalSrc) return ''
    
    // If it's already an optimized URL, return as is
    if (originalSrc.includes('format=') || originalSrc.includes('.webp') || originalSrc.includes('.avif')) {
      return originalSrc
    }
    
    // Create optimized URL with query parameters
    const url = new URL(originalSrc, window.location.origin)
    url.searchParams.set('quality', quality.toString())
    if (width) url.searchParams.set('width', width.toString())
    
    return url.toString()
  }
  
  // Create source set for different formats and sizes
  const createSourceSet = (src: string) => {
    const baseUrl = src.split('?')[0]
    const params = new URLSearchParams(src.split('?')[1] || '')
    params.set('quality', quality.toString())
    
    const widths = width ? [width, width * 2] : [640, 768, 1024, 1280, 1536, 1920]
    
    return widths.map(w => {
      const newParams = new URLSearchParams(params)
      newParams.set('width', w.toString())
      return `${baseUrl}?${newParams.toString()} ${w}w`
    }).join(', ')
  }
  
  // Check if browser supports WebP/AVIF
  const checkImageSupport = async (format: 'webp' | 'avif'): Promise<boolean> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      canvas.width = 1
      canvas.height = 1
      
      const dataUrl = canvas.toDataURL(`image/${format}`)
      const img = new Image()
      
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
      img.src = dataUrl
    })
  }
  
  // Load image when in view
  useEffect(() => {
    if (!lazy || priority || isIntersecting) {
      const loadImage = async () => {
        try {
          // Check for modern format support
          const supportsAvif = await checkImageSupport('avif')
          const supportsWebP = await checkImageSupport('webp')
          
          let optimizedSrc = src
          
          // Use modern format if supported
          if (supportsAvif) {
            optimizedSrc = src.includes('?') 
              ? `${src}&format=avif` 
              : `${src}?format=avif&quality=${quality}`
          } else if (supportsWebP) {
            optimizedSrc = src.includes('?') 
              ? `${src}&format=webp` 
              : `${src}?format=webp&quality=${quality}`
          }
          
          // Add width parameter if specified
          if (width && !optimizedSrc.includes('width=')) {
            optimizedSrc += `${optimizedSrc.includes('?') ? '&' : '?'}width=${width}`
          }
          
          setCurrentSrc(optimizedSrc)
        } catch (error) {
          console.warn('Image optimization failed, using original:', error)
          setCurrentSrc(src)
        }
      }
      
      loadImage()
    }
  }, [src, isIntersecting, lazy, priority, quality, width])
  
  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }
  
  // Handle image error
  const handleError = () => {
    setHasError(true)
    // Fallback to original source
    if (currentSrc !== src) {
      setCurrentSrc(src)
      setHasError(false)
    } else {
      onError?.()
    }
  }
  
  // Generate blur placeholder
  const blurDataUrl = `data:image/svg+xml;base64,${btoa(`
    <svg width="${width || 400}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#16FFBB" stop-opacity="0.1"/>
          <stop offset="100%" stop-color="#00D4FF" stop-opacity="0.1"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
    </svg>
  `)}`
  
  return (
    <div
      ref={intersectionRef as React.RefObject<HTMLDivElement>}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Placeholder */}
      {placeholder === 'blur' && !isLoaded && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-krim-mint/5 to-krim-cyan/5 animate-pulse"
          style={{
            backgroundImage: `url(${blurDataUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      )}
      
      {/* Main Image */}
      {currentSrc && (
        <picture>
          {/* Modern formats */}
          <source
            srcSet={createSourceSet(currentSrc.replace(/format=\w+/, 'format=avif'))}
            sizes={sizes}
            type="image/avif"
          />
          <source
            srcSet={createSourceSet(currentSrc.replace(/format=\w+/, 'format=webp'))}
            sizes={sizes}
            type="image/webp"
          />
          
          {/* Fallback */}
          <motion.img
            ref={imgRef}
            src={currentSrc}
            alt={alt}
            width={width}
            height={height}
            loading={lazy && !priority ? 'lazy' : 'eager'}
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className={`
              w-full h-full object-cover transition-opacity duration-300
              ${isLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            sizes={sizes}
          />
        </picture>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">Image not available</div>
          </div>
        </div>
      )}
      
      {/* Loading indicator */}
      {!isLoaded && currentSrc && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-krim-mint border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}

export default OptimizedImage

// Utility function for preloading critical images
export const preloadImage = (src: string, priority = false) => {
  if (typeof window === 'undefined') return
  
  const link = document.createElement('link')
  link.rel = priority ? 'preload' : 'prefetch'
  link.href = src
  link.as = 'image'
  
  // Add to head
  document.head.appendChild(link)
  
  // Remove after load to clean up
  link.onload = () => {
    setTimeout(() => {
      document.head.removeChild(link)
    }, 1000)
  }
}

// Hook for batch image preloading
export const useImagePreloader = (images: string[]) => {
  useEffect(() => {
    images.forEach(src => preloadImage(src))
  }, [images])
}