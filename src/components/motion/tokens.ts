/**
 * KRIM AI - MOTION DESIGN TOKENS
 * Unified motion language for cosmic continuity
 * All animations reference these tokens for consistency
 */

// Duration tokens - premium, controlled timing
export const duration = {
  instant: 0,
  micro: 100,    // Micro-interactions
  fast: 180,     // Quick state changes
  base: 280,     // Standard transitions
  moderate: 400, // Content reveals
  slow: 600,     // Major transitions
  glacial: 1200, // Page transitions
} as const

// Easing functions - professional, no bouncing
export const easing = {
  // Primary easing - smooth and professional
  premium: [0.32, 0, 0.24, 1],          // Custom cubic-bezier for premium feel
  
  // Secondary easings
  easeIn: [0.32, 0, 1, 1],              // Accelerate
  easeOut: [0, 0, 0.24, 1],             // Decelerate (most natural)
  easeInOut: [0.42, 0, 0.58, 1],        // Standard symmetric
  
  // Special purpose
  sharp: [0.4, 0, 0.6, 1],              // Snappy but controlled
  gentle: [0.4, 0, 0.2, 1],             // Very soft transitions
  
  // Spring configs (Framer Motion)
  spring: {
    type: "spring",
    damping: 30,
    stiffness: 300,
    mass: 0.8,
  },
  
  springGentle: {
    type: "spring",
    damping: 40,
    stiffness: 200,
    mass: 1.2,
  }
} as const

// Distance tokens - predictable motion distances
export const distance = {
  // Micro movements
  nudge: 2,
  micro: 4,
  tiny: 8,
  
  // Standard movements
  small: 12,
  base: 20,
  medium: 32,
  
  // Large movements
  large: 48,
  huge: 64,
  massive: 96,
  
  // Percentage-based
  subtle: '2%',
  moderate: '5%',
  significant: '10%'
} as const

// Stagger tokens - orchestrated reveals
export const stagger = {
  fastest: 20,
  fast: 40,
  base: 60,
  slow: 90,
  slowest: 120,
  
  // Special patterns
  cascade: {
    staggerChildren: 0.06,
    delayChildren: 0.12,
  },
  
  wave: {
    staggerChildren: 0.04,
    delayChildren: 0,
  }
} as const

// Opacity levels for glass morphism
export const glass = {
  // Ultra-transparent (homepage success)
  ultraLight: {
    bg: 'rgba(10, 8, 27, 0.1)',
    border: 'rgba(255, 255, 255, 0.03)',
    blur: 'blur(20px)',
    saturate: 'saturate(1.2)',
  },
  
  // Light glass (floating cards)
  light: {
    bg: 'rgba(10, 8, 27, 0.15)',
    border: 'rgba(255, 255, 255, 0.05)',
    blur: 'blur(16px)',
    saturate: 'saturate(1.3)',
  },
  
  // Standard glass (sections)
  standard: {
    bg: 'rgba(10, 8, 27, 0.25)',
    border: 'rgba(255, 255, 255, 0.08)',
    blur: 'blur(12px)',
    saturate: 'saturate(1.4)',
  },
  
  // Medium glass (forms, interactive)
  medium: {
    bg: 'rgba(10, 8, 27, 0.4)',
    border: 'rgba(255, 255, 255, 0.1)',
    blur: 'blur(10px)',
    saturate: 'saturate(1.5)',
  },
  
  // Dense glass (modals, important content)
  dense: {
    bg: 'rgba(10, 8, 27, 0.6)',
    border: 'rgba(255, 255, 255, 0.12)',
    blur: 'blur(8px)',
    saturate: 'saturate(1.6)',
  },
  
  // Solid glass (legal text, high readability)
  solid: {
    bg: 'rgba(10, 8, 27, 0.85)',
    border: 'rgba(255, 255, 255, 0.15)',
    blur: 'blur(4px)',
    saturate: 'saturate(1.8)',
  }
} as const

// Glow effects
export const glow = {
  subtle: '0 0 20px rgba(0, 255, 136, 0.1)',
  soft: '0 0 30px rgba(0, 255, 136, 0.15)',
  standard: '0 0 40px rgba(0, 255, 136, 0.2)',
  strong: '0 0 60px rgba(0, 255, 136, 0.3)',
  intense: '0 0 80px rgba(0, 255, 136, 0.4)',
  
  // Multi-color glows
  aurora: `
    0 0 20px rgba(0, 255, 136, 0.1),
    0 0 40px rgba(0, 212, 255, 0.08),
    0 0 60px rgba(139, 92, 246, 0.06)
  `
} as const

// Depth layers (z-index system)
export const depth = {
  background: -1,
  starfield: 1,
  content: 10,
  floatingCards: 20,
  interactive: 30,
  navigation: 100,
  modal: 200,
  notification: 300,
  debug: 1000,
} as const

// Viewport thresholds for animations
export const viewport = {
  // When to trigger animations
  triggerOnce: true,
  
  // How much needs to be visible
  amountTiny: 0.1,
  amountSmall: 0.25,
  amountStandard: 0.35,
  amountLarge: 0.5,
  amountFull: 0.9,
  
  // Margins for early triggers
  marginEarly: "-100px",
  marginStandard: "-50px",
  marginLate: "0px",
} as const

// Reduced motion alternatives
export const reducedMotion = {
  duration: duration.instant,
  distance: 0,
  opacity: {
    from: 0.8,
    to: 1,
  },
  transition: {
    duration: duration.fast / 1000,
    ease: easing.gentle,
  }
} as const

// Export type for TypeScript
export type MotionTokens = {
  duration: typeof duration
  easing: typeof easing
  distance: typeof distance
  stagger: typeof stagger
  glass: typeof glass
  glow: typeof glow
  depth: typeof depth
  viewport: typeof viewport
  reducedMotion: typeof reducedMotion
}

// Helper function to get glass styles
export const getGlassStyle = (level: keyof typeof glass) => ({
  backgroundColor: glass[level].bg,
  border: `1px solid ${glass[level].border}`,
  backdropFilter: `${glass[level].blur} ${glass[level].saturate}`,
  WebkitBackdropFilter: `${glass[level].blur} ${glass[level].saturate}`,
})

// Helper function for responsive glass
export const getResponsiveGlass = (
  mobile: keyof typeof glass,
  tablet: keyof typeof glass,
  desktop: keyof typeof glass
) => {
  return {
    base: getGlassStyle(mobile),
    md: getGlassStyle(tablet),
    lg: getGlassStyle(desktop),
  }
}