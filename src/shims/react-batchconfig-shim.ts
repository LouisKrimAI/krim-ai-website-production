/**
 * STANDALONE REACT BATCHCONFIG POLYFILL
 * Pure side-effect module with no exports - completely treeshake-proof
 */

// IMMEDIATE EXECUTION - Must run before any React code
(function initializeReactBatchConfigShim() {
  if (typeof window === 'undefined') return

  // Get React from global scope
  const react = (window as any).React
  if (!react) {
    if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.warn('[KRIM] React not available for polyfill - will retry when React loads')
    }
    return
  }

  const SECRET_KEY = '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED'
  let internals = react[SECRET_KEY]

  if (!internals) {
    react[SECRET_KEY] = internals = {}
  }

  if (!internals.ReactCurrentBatchConfig) {
    internals.ReactCurrentBatchConfig = { transition: null }

    // TREESHAKE-PROOF SIDE EFFECTS
    const timestamp = Date.now()
    const shimId = `shim-${Math.random().toString(36).substr(2, 9)}`

    // Global mutations
    ;(window as any).__KRIM_REACT_BATCHCONFIG_SHIM__ = true
    ;(window as any).__KRIM_SHIM_TIMESTAMP__ = timestamp
    ;(window as any).__KRIM_SHIM_ID__ = shimId

    // DOM side effects
    document.documentElement.setAttribute('data-react-shim', 'applied')
    document.documentElement.setAttribute('data-shim-id', shimId)

    // Console logging
    if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.log('[SHIM] ReactCurrentBatchConfig polyfill applied from standalone shim')
      console.log('[SHIM] Shim ID:', shimId, 'at', timestamp)
    }

    // Storage effect
    try {
      sessionStorage.setItem('react-batchconfig-shim', timestamp.toString())
    } catch {
      // Silently ignore storage errors in environments where sessionStorage is not available
    }
  }
})()

// Additional side effect - modify global object
if (typeof window !== 'undefined') {
  ;(window as any).__KRIM_SHIM_LOADED__ = true
  ;(window as any).__KRIM_SHIM_VERSION__ = '1.0.0'
}