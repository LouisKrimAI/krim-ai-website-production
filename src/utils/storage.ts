/**
 * Safe localStorage wrapper with error handling
 * Handles cases where localStorage is blocked (incognito, privacy settings)
 */

export const safeLocalStorage = {
  /**
   * Get item from localStorage with error handling
   */
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key)
    } catch (error) {
      console.warn(`localStorage.getItem failed for key "${key}":`, error)
      return null
    }
  },

  /**
   * Set item in localStorage with error handling
   */
  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value)
      return true
    } catch (error) {
      console.warn(`localStorage.setItem failed for key "${key}":`, error)
      return false
    }
  },

  /**
   * Remove item from localStorage with error handling
   */
  removeItem: (key: string): boolean => {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.warn(`localStorage.removeItem failed for key "${key}":`, error)
      return false
    }
  },

  /**
   * Clear all items from localStorage with error handling
   */
  clear: (): boolean => {
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.warn('localStorage.clear failed:', error)
      return false
    }
  },

  /**
   * Check if localStorage is available
   */
  isAvailable: (): boolean => {
    try {
      const testKey = '__localStorage_test__'
      localStorage.setItem(testKey, 'test')
      localStorage.removeItem(testKey)
      return true
    } catch (error) {
      return false
    }
  }
}

export default safeLocalStorage
