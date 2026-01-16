/**
 * KRIM AI - COOKIE CONSENT CONTEXT V1.0
 * Performance-optimized context for cookie consent management
 * Integrates with Vercel Analytics and third-party services
 */

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { cookieManager, CookiePreferences } from '../utils/cookieManager'

interface CookieConsentContextValue {
  // State
  preferences: CookiePreferences
  hasConsented: boolean
  showBanner: boolean
  showPreferences: boolean
  isLoading: boolean
  
  // Actions
  acceptAll: () => void
  rejectNonEssential: () => void
  updatePreferences: (prefs: Partial<CookiePreferences>) => void
  resetConsent: () => void
  showPreferencesModal: () => void
  hidePreferencesModal: () => void
  hideBanner: () => void
  
  // Utilities
  isAllowed: (category: keyof CookiePreferences) => boolean
  canUseAnalytics: boolean
  canUseMarketing: boolean
  canUseFunctional: boolean
}

const CookieConsentContext = createContext<CookieConsentContextValue | undefined>(undefined)

interface CookieConsentProviderProps {
  children: React.ReactNode
  autoHideBannerDelay?: number
}

/**
 * Cookie Consent Provider Component
 * Manages global cookie consent state and integrations
 */
export function CookieConsentProvider({ 
  children, 
  autoHideBannerDelay = 0 
}: CookieConsentProviderProps) {
  const [preferences, setPreferences] = useState<CookiePreferences>(cookieManager.getPreferences())
  const [hasConsented, setHasConsented] = useState(cookieManager.getHasConsented())
  const [showBanner, setShowBanner] = useState(!cookieManager.getHasConsented())
  const [showPreferences, setShowPreferences] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize state from localStorage
  useEffect(() => {
    const initializeState = () => {
      const storedPreferences = cookieManager.getPreferences()
      const storedConsent = cookieManager.getHasConsented()
      
      setPreferences(storedPreferences)
      setHasConsented(storedConsent)
      setShowBanner(!storedConsent)
      setIsLoading(false)
      
      // Performance mark for initialization
      if (typeof window !== 'undefined') {
        performance.mark('cookie-consent-initialized')
      }
    }

    // Small delay to prevent hydration issues
    const timeoutId = setTimeout(initializeState, 50)
    return () => clearTimeout(timeoutId)
  }, [])

  // Auto-hide banner after delay if consent given
  useEffect(() => {
    if (autoHideBannerDelay > 0 && hasConsented && showBanner) {
      const timeoutId = setTimeout(() => {
        setShowBanner(false)
      }, autoHideBannerDelay)
      
      return () => clearTimeout(timeoutId)
    }
  }, [autoHideBannerDelay, hasConsented, showBanner])

  // Listen for cookie preference changes
  useEffect(() => {
    const handlePreferenceChange = (newPreferences: CookiePreferences) => {
      setPreferences(newPreferences)
      
      // Re-initialize analytics if preferences changed
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('cookie-preferences-changed', {
          detail: newPreferences
        }))
      }
    }

    cookieManager.addListener(handlePreferenceChange)
    
    return () => {
      cookieManager.removeListener(handlePreferenceChange)
    }
  }, [])

  // Accept all cookies (with error boundary and race condition protection)
  const acceptAll = useCallback(() => {
    if (isLoading) return // Prevent rapid clicks
    
    setIsLoading(true)
    
    try {
      cookieManager.acceptAll()
      setHasConsented(true)
      setShowBanner(false)
      setShowPreferences(false)
      
      // Performance mark for user action
      if (typeof window !== 'undefined') {
        performance.mark('cookie-consent-accepted-all')
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Failed to accept cookies:', error)
      }
      // Don't change state if operation failed
    } finally {
      setIsLoading(false)
    }
  }, [isLoading])

  // Reject non-essential cookies (with error boundary and race condition protection)
  const rejectNonEssential = useCallback(() => {
    if (isLoading) return // Prevent rapid clicks
    
    setIsLoading(true)
    
    try {
      cookieManager.rejectNonEssential()
      setHasConsented(true)
      setShowBanner(false)
      setShowPreferences(false)
      
      // Performance mark for user action
      if (typeof window !== 'undefined') {
        performance.mark('cookie-consent-rejected-non-essential')
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Failed to reject cookies:', error)
      }
      // Don't change state if operation failed
    } finally {
      setIsLoading(false)
    }
  }, [isLoading])

  // Update specific preferences (with error boundary and race condition protection)
  const updatePreferences = useCallback((prefs: Partial<CookiePreferences>) => {
    if (isLoading) return // Prevent rapid clicks
    
    setIsLoading(true)
    
    try {
      cookieManager.updatePreferences(prefs)
      setHasConsented(true)
      setShowBanner(false)
      setShowPreferences(false)
      
      // Performance mark for user action
      if (typeof window !== 'undefined') {
        performance.mark('cookie-consent-preferences-updated')
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Failed to update preferences:', error)
      }
      // Don't change state if operation failed
    } finally {
      setIsLoading(false)
    }
  }, [isLoading])

  // Reset all consent (with error boundary and race condition protection)
  const resetConsent = useCallback(() => {
    if (isLoading) return // Prevent rapid clicks
    
    setIsLoading(true)
    
    try {
      cookieManager.resetConsent()
      setHasConsented(false)
      setShowBanner(true)
      setShowPreferences(false)
      
      // Performance mark for user action
      if (typeof window !== 'undefined') {
        performance.mark('cookie-consent-reset')
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Failed to reset consent:', error)
      }
      // Don't change state if operation failed
    } finally {
      setIsLoading(false)
    }
  }, [isLoading])

  // Show preferences modal
  const showPreferencesModal = useCallback(() => {
    setShowPreferences(true)
    
    // Focus management for accessibility
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const modal = document.querySelector('[data-cookie-preferences-modal]')
        if (modal instanceof HTMLElement) {
          modal.focus()
        }
      }, 100)
    }
  }, [])

  // Hide preferences modal
  const hidePreferencesModal = useCallback(() => {
    setShowPreferences(false)
  }, [])

  // Hide banner manually
  const hideBanner = useCallback(() => {
    setShowBanner(false)
  }, [])

  // Check if category is allowed (fixed dependency issue)
  const isAllowed = useCallback((category: keyof CookiePreferences) => {
    return cookieManager.isAllowed(category)
  }, [])

  // Compute permission flags
  const canUseAnalytics = useMemo(() => preferences.analytics, [preferences.analytics])
  const canUseMarketing = useMemo(() => preferences.marketing, [preferences.marketing])
  const canUseFunctional = useMemo(() => preferences.functional, [preferences.functional])

  // Context value with performance optimizations
  const contextValue = useMemo<CookieConsentContextValue>(() => ({
    // State
    preferences,
    hasConsented,
    showBanner,
    showPreferences,
    isLoading,
    
    // Actions
    acceptAll,
    rejectNonEssential,
    updatePreferences,
    resetConsent,
    showPreferencesModal,
    hidePreferencesModal,
    hideBanner,
    
    // Utilities
    isAllowed,
    canUseAnalytics,
    canUseMarketing,
    canUseFunctional
  }), [
    preferences,
    hasConsented,
    showBanner,
    showPreferences,
    isLoading,
    acceptAll,
    rejectNonEssential,
    updatePreferences,
    resetConsent,
    showPreferencesModal,
    hidePreferencesModal,
    hideBanner,
    isAllowed,
    canUseAnalytics,
    canUseMarketing,
    canUseFunctional
  ])

  return (
    <CookieConsentContext.Provider value={contextValue}>
      {children}
    </CookieConsentContext.Provider>
  )
}

/**
 * Hook to use cookie consent context
 */
export function useCookieConsent(): CookieConsentContextValue {
  const context = useContext(CookieConsentContext)
  
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider')
  }
  
  return context
}

/**
 * HOC to conditionally render components based on cookie consent
 */
export function withCookieConsent<T extends Record<string, unknown>>(
  Component: React.ComponentType<T>,
  requiredCategory: keyof CookiePreferences = 'functional'
) {
  const ConditionalComponent = (props: T) => {
    const { isAllowed, hasConsented } = useCookieConsent()
    
    if (!hasConsented || !isAllowed(requiredCategory)) {
      return null
    }
    
    return <Component {...props} />
  }
  
  ConditionalComponent.displayName = `withCookieConsent(${Component.displayName || Component.name})`
  
  return ConditionalComponent
}

/**
 * Hook for tracking cookie consent analytics
 */
export function useCookieConsentAnalytics() {
  const { hasConsented, preferences } = useCookieConsent()
  
  useEffect(() => {
    if (hasConsented && typeof window !== 'undefined' && preferences.analytics) {
      // Track consent decisions for analytics
      const consentData = {
        essential: preferences.essential,
        analytics: preferences.analytics,
        marketing: preferences.marketing,
        functional: preferences.functional,
        timestamp: Date.now()
      }
      
      // Send to analytics service
      window.dispatchEvent(new CustomEvent('cookie-consent-analytics', {
        detail: consentData
      }))
    }
  }, [hasConsented, preferences])
  
  return {
    trackConsentChange: (category: string, allowed: boolean) => {
      if (hasConsented && preferences.analytics && typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('cookie-preference-change', {
          detail: { category, allowed, timestamp: Date.now() }
        }))
      }
    }
  }
}

// Export types for external use
export type { CookiePreferences, CookieConsentContextValue }