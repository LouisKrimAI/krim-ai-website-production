/**
 * RESPONSIVE TEXT COMPONENT
 * Displays different text content for mobile vs desktop
 * Uses CSS classes for responsive switching
 */
import React from 'react'

export interface ResponsiveTextProps {
  children: string
  mobile?: string
  className?: string
}

/**
 * ResponsiveText - Shows different text based on screen size
 * Uses CSS classes to hide/show content responsively
 */
export function ResponsiveText({
  children,
  mobile,
  className = ''
}: ResponsiveTextProps) {
  if (!mobile) {
    return <span className={className}>{children}</span>
  }

  return (
    <>
      <span className={`mobile-cta-full ${className}`}>
        {children}
      </span>
      <span className={`mobile-cta-short ${className}`}>
        {mobile}
      </span>
    </>
  )
}

export default ResponsiveText