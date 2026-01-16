/**
 * KRIM AI - CONDITIONAL ANALYTICS WRAPPER V1.0
 * GDPR/CCPA compliant analytics integration
 * Only loads analytics when user has consented
 */

import React, { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { useCookieConsent } from '../contexts/CookieConsentContext'

interface ConditionalAnalyticsProps {
  children?: React.ReactNode
}

/**
 * Conditional Analytics Component
 * Only renders analytics when user has consented to analytics cookies
 */
export default function ConditionalAnalytics({ children }: ConditionalAnalyticsProps) {
  const { canUseAnalytics, hasConsented } = useCookieConsent()

  // Handle analytics initialization
  useEffect(() => {
    if (hasConsented) {
      if (canUseAnalytics) {
        // Analytics enabled - mark performance
        performance.mark('analytics-enabled')
        
        // Dispatch custom event for any additional analytics setup
        window.dispatchEvent(new CustomEvent('analytics-enabled', {
          detail: { timestamp: Date.now() }
        }))
        
        console.log('🔍 Analytics enabled with user consent')
      } else {
        // Analytics disabled - mark performance
        performance.mark('analytics-disabled')
        
        // Dispatch custom event for analytics cleanup
        window.dispatchEvent(new CustomEvent('analytics-disabled', {
          detail: { timestamp: Date.now() }
        }))
        
        console.log('🚫 Analytics disabled by user preference')
      }
    }
  }, [canUseAnalytics, hasConsented])

  // Handle consent changes for existing analytics
  useEffect(() => {
    const handlePreferencesChanged = (event: CustomEvent) => {
      const preferences = event.detail
      
      if (preferences.analytics) {
        console.log('🔄 Analytics re-enabled by user')
        // Trigger any necessary reinitialization
        window.dispatchEvent(new CustomEvent('analytics-reinit'))
      } else {
        console.log('🔄 Analytics disabled by user')
        // Clean up any existing tracking
        window.dispatchEvent(new CustomEvent('analytics-cleanup'))
      }
    }

    window.addEventListener('cookie-preferences-changed', handlePreferencesChanged as EventListener)
    
    return () => {
      window.removeEventListener('cookie-preferences-changed', handlePreferencesChanged as EventListener)
    }
  }, [])

  return (
    <>
      {children}
      
      {/* Only render analytics components if user has consented */}
      {hasConsented && canUseAnalytics && (
        <>
          <Analytics />
          <SpeedInsights />
          
        </>
      )}
      
    </>
  )
}

/**
 * Hook for conditional analytics tracking
 * Only tracks events if user has consented to analytics
 */
export function useConditionalAnalytics() {
  const { canUseAnalytics, hasConsented } = useCookieConsent()

  const track = (event: string, data?: Record<string, any>) => {
    if (hasConsented && canUseAnalytics) {
      // Only track if analytics are allowed
      if (typeof window !== 'undefined' && 'va' in window) {
        // Vercel Analytics tracking
        (window as any).va('track', event, data)
      }
      
      // Custom event for any additional tracking systems
      window.dispatchEvent(new CustomEvent('analytics-track', {
        detail: { event, data, timestamp: Date.now() }
      }))
      
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 Analytics Event:', event, data)
      }
    } else if (process.env.NODE_ENV === 'development') {
      console.log('🚫 Analytics Event Blocked:', event, data)
    }
  }

  return {
    track,
    canTrack: hasConsented && canUseAnalytics,
    hasConsented,
    canUseAnalytics
  }
}

/**
 * HOC for components that need analytics tracking
 * Automatically handles consent checking
 */
export function withAnalytics<T extends Record<string, unknown>>(
  Component: React.ComponentType<T>,
  trackingEvents?: {
    onMount?: string
    onUnmount?: string
    onInteraction?: string
  }
) {
  const AnalyticsWrappedComponent = (props: T) => {
    const { track, canTrack } = useConditionalAnalytics()

    useEffect(() => {
      if (trackingEvents?.onMount && canTrack) {
        track(trackingEvents.onMount, { component: Component.displayName || Component.name })
      }

      return () => {
        if (trackingEvents?.onUnmount && canTrack) {
          track(trackingEvents.onUnmount, { component: Component.displayName || Component.name })
        }
      }
    }, [track, canTrack])

    // Enhanced props with analytics tracking
    const enhancedProps = {
      ...props,
      onAnalyticsEvent: (event: string, data?: Record<string, any>) => {
        if (trackingEvents?.onInteraction && canTrack) {
          track(trackingEvents.onInteraction, { event, data, component: Component.displayName || Component.name })
        }
      }
    } as T & { onAnalyticsEvent?: (event: string, data?: Record<string, any>) => void }

    return <Component {...enhancedProps} />
  }

  AnalyticsWrappedComponent.displayName = `withAnalytics(${Component.displayName || Component.name})`

  return AnalyticsWrappedComponent
}

/**
 * Performance optimized consent-aware Google Analytics setup
 */
export function useGoogleAnalytics(measurementId?: string) {
  const { canUseAnalytics, hasConsented } = useCookieConsent()

  useEffect(() => {
    if (!measurementId || !hasConsented || !canUseAnalytics) return

    // Only load GA if user has consented
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    
    script.onload = () => {
      (window as any).dataLayer = (window as any).dataLayer || []
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args)
      }
      
      gtag('js', new Date())
      gtag('config', measurementId, {
        anonymize_ip: true, // Privacy-friendly setting
        allow_google_signals: false, // Disable ads features for privacy
        allow_ad_personalization_signals: false
      })
      
      ;(window as any).gtag = gtag
      
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 Google Analytics loaded with consent')
      }
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup on unmount or consent withdrawal
      const existingScript = document.querySelector(`script[src*="${measurementId}"]`)
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [measurementId, canUseAnalytics, hasConsented])
}