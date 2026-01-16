/**
 * KRIM AI - GLOBAL CONSOLE SUPPRESSION FOR PRODUCTION
 * Completely disables ALL console output in production builds
 * Affects all code including external libraries (React Router, Workbox, etc.)
 */

// Store original console methods for potential restoration
const originalConsole = {
  log: console.log,
  warn: console.warn,
  error: console.error,
  info: console.info,
  debug: console.debug,
  trace: console.trace,
  group: console.group,
  groupEnd: console.groupEnd,
  groupCollapsed: console.groupCollapsed,
  time: console.time,
  timeEnd: console.timeEnd,
  table: console.table,
  count: console.count,
  clear: console.clear,
  assert: console.assert
}

// No-op function for production
const noop = () => {}

/**
 * Globally suppress all console output in production
 * This overrides console methods for ALL code including external libraries
 */
export const suppressConsoleInProduction = () => {
  // Detect production environment (multiple checks for safety)
  const isProduction = import.meta.env.PROD ||
                      import.meta.env.MODE === 'production' ||
                      process.env.NODE_ENV === 'production' ||
                      !import.meta.env.DEV

  if (isProduction) {
    // Override all console methods immediately
    console.log = noop
    console.warn = noop
    console.error = noop
    console.info = noop
    console.debug = noop
    console.trace = noop
    console.group = noop
    console.groupEnd = noop
    console.groupCollapsed = noop
    console.time = noop
    console.timeEnd = noop
    console.table = noop
    console.count = noop
    console.clear = noop
    console.assert = noop

    // Suppress any additional console methods that might be added by libraries
    Object.getOwnPropertyNames(console).forEach(method => {
      if (typeof (console as any)[method] === 'function') {
        (console as any)[method] = noop
      }
    })

    // Override window.console as well (for libraries that bypass the global console)
    if (typeof window !== 'undefined') {
      (window as any).console = new Proxy(console, {
        get() { return noop },
        set() { return true }
      })
    }

    // Use defineProperty to ensure console methods can't be restored
    Object.defineProperty(window, 'console', {
      value: new Proxy({}, { get: () => noop, set: () => true }),
      writable: false,
      configurable: false
    })

    // Freeze console object to prevent external libraries from restoring methods
    Object.freeze(console)
  }
}

/**
 * Restore original console methods (for development or testing)
 * Only works if console hasn't been frozen yet
 */
export const restoreConsole = () => {
  if (!Object.isFrozen(console)) {
    Object.assign(console, originalConsole)
  }
}

/**
 * Emergency console restore for critical errors (bypasses freeze)
 * Should only be used for genuine emergencies
 */
export const emergencyConsoleRestore = () => {
  try {
    // Create a new console object if the original is frozen
    const newConsole = Object.create(null)
    Object.assign(newConsole, originalConsole)
    Object.defineProperty(window, 'console', {
      value: newConsole,
      writable: true,
      configurable: true
    })
  } catch (e) {
    // If all else fails, at least try to restore log and error
    try {
      (window as any).console = {
        ...originalConsole,
        log: originalConsole.log,
        error: originalConsole.error
      }
    } catch (finalError) {
      // Console suppression is too strong, give up
    }
  }
}

export default suppressConsoleInProduction