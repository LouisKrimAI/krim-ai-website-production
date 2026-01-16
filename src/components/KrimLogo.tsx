/**
 * KRIM AI - LOGO COMPONENTS V1.0
 * Professional logo components with responsive behavior
 * Supports icon-only, wordmark, and animated variants
 */

import React from 'react'
import { clsx } from 'clsx'

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'custom'
  className?: string
  animated?: boolean
}

interface WordmarkProps extends LogoProps {
  variant?: 'horizontal' | 'stacked'
}

/**
 * Krim AI Icon-only Logo
 * Perfect for compact spaces, favicons, loading states
 */
export function KrimLogo({ size = 'md', className, animated = false }: LogoProps) {
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6', 
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    custom: ''
  }

  return (
    <svg
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(
        sizeClasses[size],
        'flex-shrink-0',
        animated && 'transition-transform duration-300 hover:scale-110',
        className
      )}
      role="img"
      aria-labelledby="krim-logo-title"
    >
      <title id="krim-logo-title">Krim Logo</title>
      <g id="inverted-triangle">
        {/* Inverted triangle with green edges */}
        {/* Left side with gap */}
        <line x1="100" y1="100" x2="140" y2="169.3" stroke="#00FF88" strokeWidth="4" strokeLinecap="round"/>
        <line x1="160" y1="203.9" x2="200" y2="273.2" stroke="#00FF88" strokeWidth="4" strokeLinecap="round"/>
        
        {/* Right side with gap */}
        <line x1="300" y1="100" x2="260" y2="169.3" stroke="#00FF88" strokeWidth="4" strokeLinecap="round"/>
        <line x1="240" y1="203.9" x2="200" y2="273.2" stroke="#00FF88" strokeWidth="4" strokeLinecap="round"/>
        
        {/* Top side with gap */}
        <line x1="100" y1="100" x2="180" y2="100" stroke="#00FF88" strokeWidth="4" strokeLinecap="round"/>
        <line x1="220" y1="100" x2="300" y2="100" stroke="#00FF88" strokeWidth="4" strokeLinecap="round"/>
      </g>

      {/* Single central dot at exact centroid */}
      <circle cx="200" cy="157.7" r="6" fill="#00FF88"/>
    </svg>
  )
}

/**
 * Krim AI Wordmark Logo
 * Professional brand lockup with icon + text
 */
export function KrimWordmark({ 
  size = 'md', 
  variant = 'horizontal', 
  className,
  animated = false 
}: WordmarkProps) {
  const sizeClasses = {
    xs: 'h-6',
    sm: 'h-8', 
    md: 'h-10',
    lg: 'h-14',
    xl: 'h-20',
    custom: ''
  }

  return (
    <svg
      viewBox="0 0 400 120"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(
        sizeClasses[size],
        'flex-shrink-0 w-auto',
        animated && 'transition-transform duration-300 hover:scale-105',
        className
      )}
      role="img"
      aria-labelledby="krim-wordmark-title"
    >
      <title id="krim-wordmark-title">Krim AI wordmark</title>
      {/* Logo icon on the left */}
      <g transform="translate(20, 5) scale(0.35)">
        {/* Inverted triangle with green edges */}
        {/* Left side with gap */}
        <line x1="100" y1="100" x2="140" y2="169.3" stroke="#00FF88" strokeWidth="4" strokeLinecap="round"/>
        <line x1="160" y1="203.9" x2="200" y2="273.2" stroke="#00FF88" strokeWidth="4" strokeLinecap="round"/>
        
        {/* Right side with gap */}
        <line x1="300" y1="100" x2="260" y2="169.3" stroke="#00FF88" strokeWidth="4" strokeLinecap="round"/>
        <line x1="240" y1="203.9" x2="200" y2="273.2" stroke="#00FF88" strokeWidth="4" strokeLinecap="round"/>
        
        {/* Top side with gap */}
        <line x1="100" y1="100" x2="180" y2="100" stroke="#00FF88" strokeWidth="4" strokeLinecap="round"/>
        <line x1="220" y1="100" x2="300" y2="100" stroke="#00FF88" strokeWidth="4" strokeLinecap="round"/>
        
        {/* Single center dot at centroid */}
        <circle cx="200" cy="157.7" r="5" fill="#00FF88"/>
      </g>
      
      {/* Text adjacent to logo */}
      <text 
        x="150" 
        y="90" 
        fontFamily="Montserrat, system-ui, -apple-system, sans-serif" 
        fontSize="56" 
        fontWeight="bold" 
        fill="#00FF88"
      >
        KRIM
      </text>
    </svg>
  )
}

/**
 * Krim AI Animated Logo
 * Engaging animated version with converging dots
 */
export function KrimAnimatedLogo({ 
  size = 'md', 
  className,
  animated = true 
}: Omit<WordmarkProps, 'variant'>) {
  const sizeClasses = {
    xs: 'h-6',
    sm: 'h-8', 
    md: 'h-10',
    lg: 'h-14',
    xl: 'h-20',
    custom: ''
  }

  return (
    <svg
      viewBox="0 0 400 120"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(
        sizeClasses[size],
        'flex-shrink-0 w-auto',
        className
      )}
      role="img"
      aria-labelledby="krim-animated-title"
    >
      <title id="krim-animated-title">Krim AI animated wordmark</title>
      {/* Logo icon on the left */}
      <g transform="translate(20, 5) scale(0.35)">
        {/* Inverted triangle with green edges */}
        {/* Left side with gap */}
        <line x1="100" y1="100" x2="140" y2="169.3" stroke="#00FF88" strokeWidth="4" strokeLinecap="round"/>
        <line x1="160" y1="203.9" x2="200" y2="273.2" stroke="#00FF88" strokeWidth="4" strokeLinecap="round"/>
        
        {/* Right side with gap */}
        <line x1="300" y1="100" x2="260" y2="169.3" stroke="#00FF88" strokeWidth="4" strokeLinecap="round"/>
        <line x1="240" y1="203.9" x2="200" y2="273.2" stroke="#00FF88" strokeWidth="4" strokeLinecap="round"/>
        
        {/* Top side with gap */}
        <line x1="100" y1="100" x2="180" y2="100" stroke="#00FF88" strokeWidth="4" strokeLinecap="round"/>
        <line x1="220" y1="100" x2="300" y2="100" stroke="#00FF88" strokeWidth="4" strokeLinecap="round"/>
        
        {/* Animated dots entering through portal centers to exact centroid (200, 157.7) */}
        {animated && (
          <>
            {/* Red dot from left portal center */}
            <circle r="4" fill="#FF0040">
              <animate attributeName="cx" values="106.7;150;200;150;106.7" dur="3s" repeatCount="indefinite"/>
              <animate attributeName="cy" values="211.6;186.6;157.7;186.6;211.6" dur="3s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;1;1;1;0" dur="3s" repeatCount="indefinite"/>
            </circle>
            
            {/* Blue dot from right portal center */}
            <circle r="4" fill="#00BBFF">
              <animate attributeName="cx" values="293.3;250;200;250;293.3" dur="3s" begin="1s" repeatCount="indefinite"/>
              <animate attributeName="cy" values="211.6;186.6;157.7;186.6;211.6" dur="3s" begin="1s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;1;1;1;0" dur="3s" begin="1s" repeatCount="indefinite"/>
            </circle>
            
            {/* Green dot from top portal center */}
            <circle r="4" fill="#00FF88">
              <animate attributeName="cx" values="200;200;200;200;200" dur="3s" begin="2s" repeatCount="indefinite"/>
              <animate attributeName="cy" values="50;100;157.7;100;50" dur="3s" begin="2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;1;1;1;0" dur="3s" begin="2s" repeatCount="indefinite"/>
            </circle>
            
            {/* Central convergence flash */}
            <circle cx="200" cy="157.7" r="2" fill="#FFFFFF" opacity="0">
              <animate attributeName="opacity" values="0;0.8;0" dur="1s" begin="1.5s" repeatCount="indefinite"/>
              <animate attributeName="r" values="2;10;2" dur="1s" begin="1.5s" repeatCount="indefinite"/>
            </circle>
          </>
        )}
      </g>
      
      {/* Text adjacent to logo */}
      <text 
        x="150" 
        y="90" 
        fontFamily="Montserrat, system-ui, -apple-system, sans-serif" 
        fontSize="56" 
        fontWeight="bold" 
        fill="#00FF88"
      >
        KRIM
      </text>
    </svg>
  )
}

/**
 * Logo Loading Spinner
 * Icon-only logo with rotation animation
 */
export function KrimLogoSpinner({ size = 'md', className }: Omit<LogoProps, 'animated'>) {
  return (
    <div className={clsx('animate-spin', className)}>
      <KrimLogo size={size} />
    </div>
  )
}

// Default export for convenience
export default KrimWordmark