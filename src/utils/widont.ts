/**
 * WIDONT UTILITY - Prevents single-word orphans in text
 * Replaces the last space with a non-breaking space to keep
 * the last two words together on the same line
 */

/**
 * Prevents widow/orphan words by replacing the last space with &nbsp;
 * @param text - The text string to process
 * @returns Text with non-breaking space before the last word
 */
export function widont(text: string): string {
  if (!text || typeof text !== 'string') return text

  // Replace the last space with a non-breaking space
  // This keeps the last two words together
  return text.replace(/\s+([^\s]+)$/, '\u00A0$1')
}

/**
 * React hook version for easier use in components
 * @param text - The text to process
 * @returns Processed text with widow prevention
 */
export function useWidont(text: string): string {
  return widont(text)
}

/**
 * Processes multiple phrases that commonly create orphans
 * @param text - Input text
 * @returns Text with critical phrase protection
 */
export function preventCriticalOrphans(text: string): string {
  if (!text) return text

  return text
    // Keep "credit servicing" together
    .replace(/loan\s+servicing/gi, 'loan\u00A0servicing')
    // Keep "90-Day ROI" together
    .replace(/90-Day\s+ROI/gi, '90-Day\u00A0ROI')
    // Keep "Calculate Your" together
    .replace(/Calculate\s+Your/gi, 'Calculate\u00A0Your')
    // Keep other critical business pairs
    .replace(/AI\s+infrastructure/gi, 'AI\u00A0infrastructure')
    .replace(/compliance\s+violations/gi, 'compliance\u00A0violations')
    .replace(/collection\s+rates/gi, 'collection\u00A0rates')
    // Apply general widont to remaining text
    .replace(/\s+([^\s\u00A0]+)$/, '\u00A0$1')
}

/**
 * Mobile-specific text shortening for CTAs
 * @param text - Full CTA text
 * @param maxLength - Maximum character length for mobile
 * @returns Shortened text for mobile or original for desktop
 */
export function mobileCTA(text: string, maxLength: number = 18): string {
  // Predefined mobile alternatives
  const mobileAlternatives: Record<string, string> = {
    'Calculate Your 90-Day ROI': 'Calculate 90-Day ROI',
    'Get Started Today': 'Get Started',
    'Request a Demo': 'Demo',
    'Learn More About': 'Learn More',
    'Contact Our Team': 'Contact Us'
  }

  // Check for predefined alternatives first
  if (mobileAlternatives[text]) {
    return mobileAlternatives[text]
  }

  // Fallback: Truncate if too long
  if (text.length > maxLength) {
    const truncated = text.substring(0, maxLength - 1).trim()
    return truncated + '…'
  }

  return text
}

/**
 * Responsive text utility for React components
 * @param fullText - Full desktop text
 * @param mobileText - Optional mobile alternative
 * @returns Object with desktop and mobile versions
 */
export function responsiveText(fullText: string, mobileText?: string) {
  return {
    desktop: preventCriticalOrphans(fullText),
    mobile: mobileText ? preventCriticalOrphans(mobileText) : mobileCTA(fullText),
    full: preventCriticalOrphans(fullText)
  }
}

/**
 * Props for ResponsiveText component
 */
export interface ResponsiveTextProps {
  children: string
  mobile?: string
  className?: string
}

/**
 * Simple string-based responsive text utility
 * Returns the mobile version if provided, otherwise desktop version
 */
export function getResponsiveText(children: string, mobile?: string): string {
  // For server-side rendering or non-React usage
  return mobile || children
}

export default widont