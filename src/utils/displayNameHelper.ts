/**
 * KRIM AI - DISPLAY NAME SAFETY HELPER
 * Utility to safely handle React component displayName assignments
 * Prevents TDZ errors in production builds
 */

import React from 'react'

/**
 * Safely sets displayName on a React component with comprehensive error handling
 */
export function safeSetDisplayName(
  component: React.ComponentType<any> | React.ForwardRefExoticComponent<any> | React.LazyExoticComponent<any> | any,
  name: string
): void {
  // Skip if component is null, undefined, or not a valid object
  if (!component || typeof component !== 'object' && typeof component !== 'function') {
    console.debug('safeSetDisplayName: Invalid component', component)
    return
  }

  // Skip if name is not provided or empty
  if (!name || typeof name !== 'string') {
    console.debug('safeSetDisplayName: Invalid name', name)
    return
  }

  try {
    // Check if component has displayName property or can have it set
    if ('displayName' in component || component.constructor === Object || typeof component === 'function') {
      component.displayName = name
    }
  } catch (error) {
    // Silent fail - displayName is not critical for functionality
    console.debug('safeSetDisplayName: Failed to set displayName', error)
  }
}

/**
 * Safely gets displayName from a React component with fallback
 */
export function safeGetDisplayName(
  component: React.ComponentType<any> | any,
  fallback: string = 'Component'
): string {
  if (!component) {
    return fallback
  }

  try {
    // Try multiple common displayName patterns
    return component.displayName || 
           component.name || 
           component.constructor?.name || 
           component.type?.displayName ||
           component.type?.name ||
           fallback
  } catch (error) {
    console.debug('safeGetDisplayName: Failed to get displayName', error)
    return fallback
  }
}

/**
 * HOC wrapper that safely sets displayName for wrapped components
 */
export function withSafeDisplayName<T extends React.ComponentType<any>>(
  component: T,
  name: string
): T {
  safeSetDisplayName(component, name)
  return component
}