/**
 * HOMEPAGE WITH FEATURE FLAG
 * Safe rollout system for new homepage implementation
 */
import React, { lazy, Suspense } from 'react'
import { isNewHomepageEnabled } from '../utils/featureFlags'

// Lazy load both homepage implementations
const OldHome = lazy(() => import('./Home'))
const NewHome = lazy(() => import('./NewHome'))

// Loading fallback that matches existing design
const HomeLoadingFallback = () => (
  <div className="relative bg-krim-deep-space min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 border-2 border-krim-mint border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-white/60 text-sm">Loading Krim AI...</p>
    </div>
  </div>
)

export default function HomeWithFeatureFlag() {
  const useNewHomepage = isNewHomepageEnabled()
  
  // Debug info in development
  if (import.meta.env.DEV) {
    console.log(`🏠 Homepage: ${useNewHomepage ? 'NEW' : 'OLD'} implementation`)
  }

  return (
    <Suspense fallback={<HomeLoadingFallback />}>
      {useNewHomepage ? <NewHome /> : <OldHome />}
    </Suspense>
  )
}