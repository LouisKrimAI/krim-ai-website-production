/**
 * KRIM AI - COOKIE PREFERENCES MODAL V1.0
 * Advanced preferences management with granular controls
 * Accessible modal with smooth animations and glassmorphism
 */

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { useCookieConsent } from '../contexts/CookieConsentContext'
import { COOKIE_CATEGORIES, CookiePreferences as CookiePreferencesType } from '../utils/cookieManager'
import Button from './Button'
import Card from './Card'

interface ToggleProps {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  label: string
  description: string
  examples: string[]
}

function CookieToggle({ 
  id, 
  checked, 
  onChange, 
  disabled = false, 
  label, 
  description, 
  examples 
}: ToggleProps) {
  const toggleRef = useRef<HTMLButtonElement>(null)

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      if (!disabled) {
        onChange(!checked)
      }
    }
  }, [checked, onChange, disabled])

  return (
    <Card variant="glass" className="p-6 transition-all duration-200 hover:shadow-glow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-lg font-semibold font-display text-white">
              {label}
            </h3>
            {disabled && (
              <span className="px-2 py-1 text-xs font-medium bg-krim-mint/20 text-krim-mint rounded-full">
                Required
              </span>
            )}
          </div>
          
          <p className="text-white mb-4 leading-relaxed">
            {description}
          </p>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-white">Examples:</p>
            <ul className="text-sm text-white space-y-1">
              {examples.map((example, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-krim-mint rounded-full" />
                  {example}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Toggle Switch */}
        <div className="flex-shrink-0">
          <button
            ref={toggleRef}
            id={id}
            type="button"
            role="switch"
            aria-checked={checked}
            aria-describedby={`${id}-description`}
            disabled={disabled}
            className={clsx(
              'relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-krim-mint focus:ring-opacity-50',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              checked 
                ? 'bg-gradient-to-r from-krim-mint to-krim-cyan shadow-glow' 
                : 'bg-gray-600 hover:bg-gray-500'
            )}
            onClick={() => !disabled && onChange(!checked)}
            onKeyDown={handleKeyDown}
          >
            <motion.span
              className={clsx(
                'inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform',
                'flex items-center justify-center'
              )}
              animate={{
                translateX: checked ? 28 : 4
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
            >
              {checked ? (
                <svg className="h-3 w-3 text-krim-mint" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
            </motion.span>
          </button>
          <div id={`${id}-description`} className="sr-only">
            {description}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function CookiePreferencesModal() {
  const {
    showPreferences,
    preferences,
    hidePreferencesModal,
    updatePreferences,
    acceptAll,
    rejectNonEssential,
    isLoading
  } = useCookieConsent()

  const [localPreferences, setLocalPreferences] = useState<CookiePreferencesType>(preferences)
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Sync local state with context
  useEffect(() => {
    setLocalPreferences(preferences)
  }, [preferences])

  // Focus management
  useEffect(() => {
    if (showPreferences) {
      // Trap focus in modal
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      
      if (focusableElements && focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus()
      }

      // Handle escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          hidePreferencesModal()
        }
      }

      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'

      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = 'unset'
      }
    }
  }, [showPreferences, hidePreferencesModal])

  // Handle preference changes
  const handlePreferenceChange = useCallback((
    category: keyof CookiePreferencesType, 
    value: boolean
  ) => {
    setLocalPreferences(prev => ({
      ...prev,
      [category]: value
    }))
  }, [])

  // Save preferences
  const handleSavePreferences = useCallback(() => {
    updatePreferences(localPreferences)
  }, [localPreferences, updatePreferences])

  // Reset to current saved preferences
  const handleReset = useCallback(() => {
    setLocalPreferences(preferences)
  }, [preferences])

  // Check if preferences have changed
  const hasChanges = Object.keys(localPreferences).some(
    key => localPreferences[key as keyof CookiePreferencesType] !== preferences[key as keyof CookiePreferencesType]
  )

  if (!showPreferences) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && hidePreferencesModal()}
      >
        <motion.div
          ref={modalRef}
          data-cookie-preferences-modal
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
          className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
          role="dialog"
          aria-labelledby="cookie-preferences-title"
          aria-describedby="cookie-preferences-description"
          tabIndex={-1}
        >
          <div className="glass-strong rounded-2xl shadow-2xl border border-krim-mint/20 relative overflow-hidden">
            {/* Aurora background */}
            <div className="absolute inset-0 bg-gradient-to-br from-krim-mint/5 via-transparent to-krim-cyan/5 animate-aurora-flow" />
            
            {/* Header */}
            <div className="relative z-10 p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 
                    id="cookie-preferences-title"
                    className="text-2xl md:text-3xl font-bold font-display text-gradient"
                  >
                    Cookie Preferences
                  </h2>
                  <p 
                    id="cookie-preferences-description"
                    className="text-white mt-2"
                  >
                    Customize your cookie settings to control how we collect and use data to improve your experience.
                  </p>
                </div>
                
                <button
                  ref={closeButtonRef}
                  onClick={hidePreferencesModal}
                  className="p-2 text-white hover:text-white transition-colors duration-200 rounded-full hover:bg-white/5"
                  aria-label="Close preferences modal"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-h-[60vh] overflow-y-auto p-6 space-y-6">
              {Object.entries(COOKIE_CATEGORIES).map(([key, category]) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: Object.keys(COOKIE_CATEGORIES).indexOf(key) * 0.1,
                    duration: 0.3
                  }}
                >
                  <CookieToggle
                    id={`cookie-${key}`}
                    label={category.name}
                    description={category.description}
                    examples={[...category.examples]}
                    checked={localPreferences[key as keyof CookiePreferencesType]}
                    onChange={(checked) => handlePreferenceChange(key as keyof CookiePreferencesType, checked)}
                    disabled={key === 'essential'}
                  />
                </motion.div>
              ))}

              {/* Additional Information */}
              <Card variant="glass" className="p-6 border border-krim-cyan/20">
                <h3 className="text-lg font-semibold font-display text-white mb-3 text-white">
                  Privacy Notice
                </h3>
                <p className="text-white mb-4 leading-relaxed">
                  Your privacy is important to us. We only collect data that helps us provide better services while respecting your choices. You can change these preferences at any time.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="/legal/privacy" 
                    className="text-krim-mint hover:text-krim-cyan transition-colors underline decoration-krim-mint/30 hover:decoration-krim-cyan/50"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>
                  <a 
                    href="/legal/terms" 
                    className="text-krim-mint hover:text-krim-cyan transition-colors underline decoration-krim-mint/30 hover:decoration-krim-cyan/50"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms of Service
                  </a>
                  <a 
                    href="/contact" 
                    className="text-krim-mint hover:text-krim-cyan transition-colors underline decoration-krim-mint/30 hover:decoration-krim-cyan/50"
                  >
                    Contact Us
                  </a>
                </div>
              </Card>
            </div>

            {/* Footer Actions */}
            <div className="relative z-10 p-6 border-t border-white/10">
              <div className="flex flex-col sm:flex-row gap-3 justify-between">
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={rejectNonEssential}
                    disabled={isLoading}
                  >
                    Reject All Non-Essential
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={acceptAll}
                    disabled={isLoading}
                  >
                    Accept All
                  </Button>
                </div>

                <div className="flex gap-3">
                  {hasChanges && (
                    <Button
                      variant="ghost"
                      size="md"
                      onClick={handleReset}
                      disabled={isLoading}
                    >
                      Reset
                    </Button>
                  )}
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleSavePreferences}
                    disabled={isLoading || !hasChanges}
                    loading={isLoading}
                    glow={hasChanges}
                  >
                    Save Preferences
                  </Button>
                </div>
              </div>
            </div>

            {/* Performance indicator in development */}
            {process.env.NODE_ENV === 'development' && (
              <div className="absolute bottom-2 left-2 text-xs text-text-muted bg-black/20 px-2 py-1 rounded">
                Preferences Modal • {performance.now().toFixed(0)}ms
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}