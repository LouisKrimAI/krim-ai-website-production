/**
 * FEATURE FLAGS - Safe Homepage Rollout
 * Toggle between old and new homepage implementations
 */

export interface FeatureFlags {
  NEW_HOMEPAGE_ENABLED: boolean
  // Add other feature flags here as needed
}

// Environment-based feature flag configuration
const getFeatureFlags = (): FeatureFlags => {
  // Check for URL parameter override (for testing)
  const urlParams = new URLSearchParams(window.location.search)
  const forceNewHomepage = urlParams.get('new_homepage') === 'true'
  const forceOldHomepage = urlParams.get('new_homepage') === 'false'
  
  if (forceNewHomepage) {
    console.log('🚀 Feature Flag: NEW_HOMEPAGE_ENABLED (URL override)')
    return {
      NEW_HOMEPAGE_ENABLED: true
    }
  }
  
  if (forceOldHomepage) {
    console.log('🔒 Feature Flag: NEW_HOMEPAGE_DISABLED (URL override)')
    return {
      NEW_HOMEPAGE_ENABLED: false
    }
  }
  
  // Environment variable check
  const envFlag = import.meta.env.VITE_NEW_HOMEPAGE_ENABLED
  if (envFlag === 'true') {
    console.log('🚀 Feature Flag: NEW_HOMEPAGE_ENABLED (Environment)')
    return {
      NEW_HOMEPAGE_ENABLED: true
    }
  }
  
  // Default: enabled for testing
  return {
    NEW_HOMEPAGE_ENABLED: true
  }
}

export const featureFlags = getFeatureFlags()

// Helper function for individual flag checks
export const isNewHomepageEnabled = (): boolean => {
  return featureFlags.NEW_HOMEPAGE_ENABLED
}

// Safe rollout percentage (can be adjusted)
export const isInRolloutPercentage = (percentage: number = 0): boolean => {
  if (percentage === 0) return false
  if (percentage === 100) return true
  
  // Use session storage to maintain consistency per session
  const sessionKey = 'homepage_rollout_group'
  let rolloutGroup = sessionStorage.getItem(sessionKey)
  
  if (!rolloutGroup) {
    rolloutGroup = Math.random().toString()
    sessionStorage.setItem(sessionKey, rolloutGroup)
  }
  
  const hash = rolloutGroup.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)
  
  return Math.abs(hash) % 100 < percentage
}

// Debug function for development
export const debugFeatureFlags = () => {
  console.table(featureFlags)
  console.log('Current URL for testing:')
  console.log('• Enable new homepage: ' + window.location.origin + window.location.pathname + '?new_homepage=true')
  console.log('• Disable new homepage: ' + window.location.origin + window.location.pathname + '?new_homepage=false')
}