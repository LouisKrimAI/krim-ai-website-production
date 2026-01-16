/**
 * Safe Three.js wrapper components
 */
import React, { ComponentType, useEffect, useState } from 'react'

// Critical polyfill for ReactCurrentBatchConfig crash
if (typeof window !== 'undefined' && (window as any).React) {
  const reactInternals = (window as any).React?.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
  if (reactInternals && !reactInternals.ReactCurrentBatchConfig) {
    reactInternals.ReactCurrentBatchConfig = { transition: null }
  }
}

// Client-side only component wrapper
export function withClientOnly<P extends object>(
  WrappedComponent: ComponentType<P>,
  fallback?: React.ReactNode
) {
  const SafeComponent = (props: P) => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
      setIsClient(true)
    }, [])

    if (!isClient) {
      return fallback || (
        <div className="w-full h-full bg-gradient-to-br from-krim-mint/5 via-transparent to-krim-cyan/5" />
      )
    }

    return <WrappedComponent {...props} />
  }

  SafeComponent.displayName = `withClientOnly(${WrappedComponent.displayName || WrappedComponent.name})`
  return SafeComponent
}

// Enhanced Three.js Error Boundary with WebGL error handling
export function ThreeJSErrorBoundary({
  children,
  fallback
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode
}) {
  const [hasError, setHasError] = useState(false)
  const [errorInfo, setErrorInfo] = useState<string>('')

  useEffect(() => {
    // Handle WebGL context lost events
    const handleContextLost = (event: Event) => {
      console.warn('WebGL context lost - falling back to safe mode')
      event.preventDefault()
      setHasError(true)
      setErrorInfo('WebGL context lost')
    }

    // Handle WebGL context restored events
    const handleContextRestored = () => {
      console.log('WebGL context restored - attempting to recover')
      setHasError(false)
      setErrorInfo('')
    }

    // Global error handler for Three.js buffer errors
    const handleGlobalError = (event: ErrorEvent) => {
      if (event.error?.message?.includes('buffer') ||
          event.error?.message?.includes('WebGL') ||
          event.error?.message?.includes('THREE')) {
        console.warn('Three.js error caught:', event.error.message)
        setHasError(true)
        setErrorInfo(event.error.message)
        event.preventDefault()
      }
    }

    // Add global listeners
    window.addEventListener('webglcontextlost', handleContextLost)
    window.addEventListener('webglcontextrestored', handleContextRestored)
    window.addEventListener('error', handleGlobalError)

    return () => {
      window.removeEventListener('webglcontextlost', handleContextLost)
      window.removeEventListener('webglcontextrestored', handleContextRestored)
      window.removeEventListener('error', handleGlobalError)
    }
  }, [])

  if (hasError) {
    return fallback || (
      <div className="w-full h-full bg-gradient-to-br from-krim-mint/5 via-transparent to-krim-cyan/5 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-sm mb-2">3D visualization temporarily unavailable</p>
          {process.env.NODE_ENV === 'development' && (
            <p className="text-xs text-white">{errorInfo}</p>
          )}
        </div>
      </div>
    )
  }

  return <>{children}</>
}