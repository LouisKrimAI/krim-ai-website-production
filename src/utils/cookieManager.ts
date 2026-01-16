/**
 * KRIM AI - COOKIE MANAGEMENT SYSTEM V1.0
 * GDPR/CCPA compliant cookie consent management
 * Performance-optimized with localStorage integration
 */

export interface CookiePreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

export interface ConsentData {
  preferences: CookiePreferences
  timestamp: number
  version: string
  hasConsented: boolean
}

// Storage keys
const CONSENT_STORAGE_KEY = 'krim-cookie-consent'
const PREFERENCES_STORAGE_KEY = 'krim-cookie-preferences'
const CONSENT_VERSION = '1.0'

// Default preferences
const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true, // Always true - required for basic functionality
  analytics: false,
  marketing: false,
  functional: false
}

/**
 * Cookie Manager class for handling consent and preferences
 */
export class CookieManager {
  private static instance: CookieManager
  private preferences: CookiePreferences
  private hasConsented: boolean
  private listeners: Array<(preferences: CookiePreferences) => void> = []

  private constructor() {
    this.preferences = this.loadPreferences()
    this.hasConsented = this.loadConsentStatus()
  }

  /**
   * Singleton instance
   */
  static getInstance(): CookieManager {
    if (!CookieManager.instance) {
      CookieManager.instance = new CookieManager()
    }
    return CookieManager.instance
  }

  /**
   * Load preferences from localStorage
   */
  private loadPreferences(): CookiePreferences {
    if (typeof window === 'undefined') {
      return DEFAULT_PREFERENCES
    }

    try {
      const stored = localStorage.getItem(PREFERENCES_STORAGE_KEY)
      if (!stored) return DEFAULT_PREFERENCES

      const preferences = JSON.parse(stored) as CookiePreferences
      
      // Ensure essential cookies are always enabled
      preferences.essential = true
      
      return preferences
    } catch (error) {
      console.warn('Failed to load cookie preferences:', error)
      return DEFAULT_PREFERENCES
    }
  }

  /**
   * Load consent status from localStorage
   */
  private loadConsentStatus(): boolean {
    if (typeof window === 'undefined') {
      return false
    }

    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY)
      if (!stored) return false

      const consentData = JSON.parse(stored) as ConsentData
      
      // Check if consent is still valid (not expired or different version)
      const isValid = consentData.version === CONSENT_VERSION &&
                      consentData.timestamp > Date.now() - (365 * 24 * 60 * 60 * 1000) // 1 year

      return isValid && consentData.hasConsented
    } catch (error) {
      console.warn('Failed to load consent status:', error)
      return false
    }
  }

  /**
   * Save preferences to localStorage with enhanced error handling
   */
  private savePreferences(preferences: CookiePreferences): void {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(preferences))
      
      // Verify the save was successful by reading back
      const stored = localStorage.getItem(PREFERENCES_STORAGE_KEY)
      if (!stored) {
        throw new Error('localStorage verification failed')
      }
    } catch (error) {
      console.error('Failed to save cookie preferences:', error)
      
      // Dispatch error event for UI to handle
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('cookie-storage-error', {
          detail: { type: 'save-preferences', error: error instanceof Error ? error.message : 'Unknown error' }
        }))
      }
      
      throw error // Re-throw to let caller handle
    }
  }

  /**
   * Save consent data to localStorage with enhanced error handling
   */
  private saveConsent(hasConsented: boolean): void {
    if (typeof window === 'undefined') return

    try {
      const consentData: ConsentData = {
        preferences: this.preferences,
        timestamp: Date.now(),
        version: CONSENT_VERSION,
        hasConsented
      }
      
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentData))
      
      // Verify the save was successful by reading back
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY)
      if (!stored) {
        throw new Error('localStorage verification failed')
      }
    } catch (error) {
      console.error('Failed to save consent data:', error)
      
      // Dispatch error event for UI to handle
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('cookie-storage-error', {
          detail: { type: 'save-consent', error: error instanceof Error ? error.message : 'Unknown error' }
        }))
      }
      
      throw error // Re-throw to let caller handle
    }
  }

  /**
   * Get current preferences
   */
  getPreferences(): CookiePreferences {
    return { ...this.preferences }
  }

  /**
   * Check if user has provided consent
   */
  getHasConsented(): boolean {
    return this.hasConsented
  }

  /**
   * Accept all cookies
   */
  acceptAll(): void {
    this.preferences = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true
    }
    
    this.hasConsented = true
    this.savePreferences(this.preferences)
    this.saveConsent(true)
    this.notifyListeners()
  }

  /**
   * Reject non-essential cookies
   */
  rejectNonEssential(): void {
    this.preferences = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false
    }
    
    this.hasConsented = true
    this.savePreferences(this.preferences)
    this.saveConsent(true)
    this.notifyListeners()
  }

  /**
   * Update specific preferences
   */
  updatePreferences(newPreferences: Partial<CookiePreferences>): void {
    this.preferences = {
      ...this.preferences,
      ...newPreferences,
      essential: true // Always keep essential cookies enabled
    }
    
    this.hasConsented = true
    this.savePreferences(this.preferences)
    this.saveConsent(true)
    this.notifyListeners()
  }

  /**
   * Reset all consent and preferences
   */
  resetConsent(): void {
    this.preferences = DEFAULT_PREFERENCES
    this.hasConsented = false
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CONSENT_STORAGE_KEY)
      localStorage.removeItem(PREFERENCES_STORAGE_KEY)
    }
    
    this.notifyListeners()
  }

  /**
   * Check if a specific cookie category is allowed
   */
  isAllowed(category: keyof CookiePreferences): boolean {
    return this.preferences[category]
  }

  /**
   * Add listener for preference changes
   */
  addListener(callback: (preferences: CookiePreferences) => void): void {
    this.listeners.push(callback)
  }

  /**
   * Remove listener
   */
  removeListener(callback: (preferences: CookiePreferences) => void): void {
    this.listeners = this.listeners.filter(listener => listener !== callback)
  }

  /**
   * Notify all listeners of preference changes
   */
  private notifyListeners(): void {
    this.listeners.forEach(callback => {
      try {
        callback(this.preferences)
      } catch (error) {
        console.error('Cookie preference listener error:', error)
      }
    })
  }

  /**
   * Get consent banner data for debugging
   */
  getConsentData(): ConsentData | null {
    if (typeof window === 'undefined') return null

    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch (error) {
      return null
    }
  }
}

// Export singleton instance
export const cookieManager = CookieManager.getInstance()

/**
 * Cookie category definitions for UI
 */
export const COOKIE_CATEGORIES = {
  essential: {
    name: 'Essential',
    description: 'Required for basic website functionality, security, and user authentication.',
    examples: ['Session management', 'Security tokens', 'User preferences']
  },
  analytics: {
    name: 'Analytics', 
    description: 'Help us understand how visitors use our website to improve performance and user experience.',
    examples: ['Google Analytics', 'Performance monitoring', 'Error tracking']
  },
  marketing: {
    name: 'Marketing',
    description: 'Used to deliver relevant advertisements and track marketing campaign effectiveness.',
    examples: ['Ad targeting', 'Social media integration', 'Campaign tracking']
  },
  functional: {
    name: 'Functional',
    description: 'Enable enhanced functionality and personalization features.',
    examples: ['Chat widgets', 'Video players', 'Social media embeds']
  }
} as const

/**
 * Performance-optimized cookie consent hook
 */
export function useCookieConsent() {
  const manager = CookieManager.getInstance()
  
  return {
    preferences: manager.getPreferences(),
    hasConsented: manager.getHasConsented(),
    acceptAll: () => manager.acceptAll(),
    rejectNonEssential: () => manager.rejectNonEssential(),
    updatePreferences: (prefs: Partial<CookiePreferences>) => manager.updatePreferences(prefs),
    resetConsent: () => manager.resetConsent(),
    isAllowed: (category: keyof CookiePreferences) => manager.isAllowed(category)
  }
}

// Development utilities
export const DEV_UTILS = {
  clearAllConsent: () => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(CONSENT_STORAGE_KEY)
    localStorage.removeItem(PREFERENCES_STORAGE_KEY)
    console.log('🍪 All cookie consent data cleared')
  },
  
  logConsentStatus: () => {
    const manager = CookieManager.getInstance()
    console.log('🍪 Cookie Consent Status:', {
      hasConsented: manager.getHasConsented(),
      preferences: manager.getPreferences(),
      consentData: manager.getConsentData()
    })
  }
}

// Expose dev utils in development
if (process.env.NODE_ENV === 'development') {
  (window as any).cookieDevUtils = DEV_UTILS
}