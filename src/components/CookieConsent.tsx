/**
 * KRIM AI - COOKIE CONSENT BANNER V1.0
 * Modern glassmorphism design with smooth animations
 * GDPR/CCPA compliant with accessibility features
 */

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { useCookieConsent } from '../contexts/CookieConsentContext'
import Button from './Button'

interface CookieConsentProps {
  position?: 'bottom' | 'top' | 'center'
  compact?: boolean
  showCloseButton?: boolean
}

export default function CookieConsent({ 
  position = 'bottom',
  compact = false,
  showCloseButton = false
}: CookieConsentProps) {
  const {
    showBanner,
    isLoading,
    acceptAll,
    rejectNonEssential,
    showPreferencesModal,
    hideBanner
  } = useCookieConsent()
  
  const bannerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false)

  // Handle banner visibility with delay for smooth animation
  useEffect(() => {
    if (showBanner && !hasAnimatedIn) {
      const timer = setTimeout(() => {
        setIsVisible(true)
        setHasAnimatedIn(true)
      }, 1000) // Delay to let page settle
      
      return () => clearTimeout(timer)
    } else if (!showBanner) {
      setIsVisible(false)
    }
  }, [showBanner, hasAnimatedIn])

  // Keyboard accessibility
  useEffect(() => {
    if (isVisible && bannerRef.current) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && showCloseButton) {
          hideBanner()
        }
      }
      
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isVisible, hideBanner, showCloseButton])

  // Focus management for accessibility
  useEffect(() => {
    if (isVisible && bannerRef.current) {
      // Focus the banner for screen readers
      setTimeout(() => {
        bannerRef.current?.focus()
      }, 200)
    }
  }, [isVisible])

  // Position variants
  const positionClasses = {
    bottom: 'bottom-0 left-0 right-0',
    top: 'top-0 left-0 right-0',
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
  }

  // Animation variants
  const bannerVariants = {
    hidden: {
      opacity: 0,
      y: position === 'bottom' ? 100 : position === 'top' ? -100 : 0,
      scale: position === 'center' ? 0.9 : 1
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.6
      }
    },
    exit: {
      opacity: 0,
      y: position === 'bottom' ? 50 : position === 'top' ? -50 : 0,
      scale: position === 'center' ? 0.9 : 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.4,
        ease: 'easeOut'
      }
    }
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.4 + i * 0.1,
        duration: 0.3,
        ease: 'easeOut'
      }
    })
  }

  if (!showBanner && !isVisible) {
    return null
  }

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <>
          {/* Backdrop for center position */}
          {position === 'center' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              style={{zIndex: 'var(--z5-modal)'}}
              onClick={showCloseButton ? hideBanner : undefined}
            />
          )}

          {/* Cookie Banner */}
          <motion.div
            ref={bannerRef}
            variants={bannerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={clsx(
              'fixed z-[9999] transform-gpu',
              positionClasses[position],
              position !== 'center' && 'p-3 md:p-4'
            )}
            role="dialog"
            aria-labelledby="cookie-banner-title"
            aria-describedby="cookie-banner-description"
            tabIndex={-1}
          >
            <div
              className={clsx(
                'cookie-consent',
                'glass rounded-none p-2 w-full mx-0',
                'shadow-2xl',
                'relative overflow-hidden',
                'min-h-[4.6rem]',
                compact && 'p-2'
              )}
            >
              {/* Subtle background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-transparent to-gray-800/50" />
              
              {/* Close button */}
              {showCloseButton && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  onClick={hideBanner}
                  className="absolute top-4 right-4 text-white hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-white/5"
                  aria-label="Close cookie banner"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              )}

              {/* Content */}
              <div className="relative z-10">
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-2"
                >
                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <h2 
                      id="cookie-banner-title"
                      className="text-base font-semibold font-display text-gradient mb-1"
                    >
                      We value your privacy
                    </h2>
                    
                    <p 
                      id="cookie-banner-description"
                      className="text-sm text-white leading-tight"
                    >
                      We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.{' '}
                      <a
                        href="/legal/privacy"
                        className="text-krim-mint hover:text-krim-cyan transition-colors duration-200 underline decoration-krim-mint/30 hover:decoration-krim-cyan/50 underline-offset-2 inline-flex items-center min-h-[48px]"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read our Privacy Policy
                      </a>
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto justify-center sm:justify-end">
                    <motion.div
                      custom={0}
                      variants={buttonVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={acceptAll}
                        disabled={isLoading}
                        loading={isLoading}
                        glow
                        className="px-4 py-2 min-h-[48px] min-w-[48px]"
                        aria-describedby="accept-all-description"
                      >
                        Accept All
                      </Button>
                      <div id="accept-all-description" className="sr-only">
                        Accept all cookies including analytics, marketing, and functional cookies
                      </div>
                    </motion.div>

                    <motion.div
                      custom={1}
                      variants={buttonVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={showPreferencesModal}
                        className="px-4 py-2 min-h-[48px] min-w-[48px]"
                        aria-describedby="manage-preferences-description"
                      >
                        Preferences
                      </Button>
                      <div id="manage-preferences-description" className="sr-only">
                        Open detailed cookie preferences to choose which types of cookies to allow
                      </div>
                    </motion.div>

                    <motion.div
                      custom={2}
                      variants={buttonVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={rejectNonEssential}
                        disabled={isLoading}
                        className="px-4 py-2 min-h-[48px] min-w-[48px]"
                        aria-describedby="reject-description"
                      >
                        Decline
                      </Button>
                      <div id="reject-description" className="sr-only">
                        Reject all cookies except essential ones needed for basic website functionality
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/**
 * Compact Cookie Banner variant
 */
export function CompactCookieConsent(props: Omit<CookieConsentProps, 'compact'>) {
  return <CookieConsent {...props} compact />
}

/**
 * Floating Cookie Banner variant (center positioned with backdrop)
 */
export function FloatingCookieConsent(props: Omit<CookieConsentProps, 'position'>) {
  return <CookieConsent {...props} position="center" showCloseButton />
}

/**
 * Minimal Cookie Banner (just essential actions)
 */
export function MinimalCookieConsent() {
  const { showBanner, acceptAll, rejectNonEssential, isLoading } = useCookieConsent()
  
  if (!showBanner) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="fixed bottom-4 right-4 max-w-sm"
      style={{zIndex: 'var(--z5-modal)'}}
    >
      <div className="glass rounded-xl p-4 border border-krim-mint/20">
        <p className="text-sm text-white mb-3">
          We use cookies to improve your experience.
        </p>
        <div className="flex gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={acceptAll}
            disabled={isLoading}
            className="flex-1"
          >
            Accept
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={rejectNonEssential}
            disabled={isLoading}
            className="flex-1"
          >
            Decline
          </Button>
        </div>
      </div>
    </motion.div>
  )
}