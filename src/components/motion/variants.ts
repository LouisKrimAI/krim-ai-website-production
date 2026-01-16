/**
 * KUPA PAGE - SHARED MOTION VARIANTS
 * Clean, reusable animation patterns for consistent motion design
 */

import { duration, easing, stagger, distance } from './tokens'

// Stagger container variants for orchestrated reveals
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.base / 1000,
      delayChildren: 0.1
    }
  }
}

// Fast stagger for metrics and smaller items
export const staggerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.fast / 1000,
      delayChildren: 0
    }
  }
}

// Card reveal with scale and fade
export const cardReveal = {
  hidden: { 
    opacity: 0, 
    y: distance.base,
    scale: 0.98
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: duration.base / 1000,
      ease: easing.premium
    }
  }
}

// Simple fade in animation
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: duration.fast / 1000,
      ease: easing.easeOut
    }
  }
}

// Slide from left animation
export const slideFromLeft = {
  hidden: { 
    opacity: 0, 
    x: -distance.medium
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: duration.base / 1000,
      ease: easing.premium
    }
  }
}

// Scale animation for metrics
export const scaleReveal = {
  hidden: { 
    opacity: 0, 
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: duration.base / 1000,
      ease: easing.premium
    }
  }
}

// Hover lift animation
export const hoverLift = {
  scale: 1.02,
  y: -4,
  transition: {
    duration: duration.fast / 1000,
    ease: easing.gentle
  }
}

// Icon hover animation  
export const iconHover = {
  scale: 1.08,
  rotate: 3,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 25
  }
}

// Border glow animation
export const borderGlow = {
  initial: { opacity: 0 },
  hover: { 
    opacity: 1,
    transition: {
      duration: duration.fast / 1000
    }
  }
}

// Bottom line reveal
export const bottomLineReveal = {
  initial: { 
    scaleX: 0, 
    opacity: 0 
  },
  hover: { 
    scaleX: 1, 
    opacity: 0.5,
    transition: {
      duration: duration.base / 1000,
      ease: easing.easeOut
    }
  }
}

// Reduced motion safe variants
export const reducedMotionVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: duration.instant / 1000
    }
  }
}

// Helper to get motion-safe variants
export const getMotionSafeVariant = (variant: any, prefersReducedMotion: boolean) => {
  return prefersReducedMotion ? reducedMotionVariants : variant
}

// Additional variants for other components
export const reducedReveal = reducedMotionVariants

export const reveal = cardReveal

export const slideLeft = slideFromLeft

export const slideRight = {
  hidden: { 
    opacity: 0, 
    x: distance.medium
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: duration.base / 1000,
      ease: easing.premium
    }
  }
}

export const commandPanelReveal = {
  hidden: { 
    opacity: 0, 
    y: distance.large
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: duration.slow / 1000,
      ease: easing.premium
    }
  }
}

// Page transition for layout
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: duration.base / 1000,
      ease: easing.easeOut
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: duration.fast / 1000,
      ease: easing.easeIn
    }
  }
}