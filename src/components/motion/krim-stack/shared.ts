/**
 * Shared utilities and animation primitives for Krim Stack motion components
 */

import { Variants } from 'framer-motion'

// Animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
}

export const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
}

export const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
}

export const stagger: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Custom easing functions for premium feel
export const easings = {
  spring: { type: "spring" as const, stiffness: 400, damping: 25 },
  smooth: [0.25, 0.46, 0.45, 0.94] as const,
  snappy: [0.68, -0.55, 0.265, 1.55] as const,
  bounce: [0.175, 0.885, 0.32, 1.275] as const
}

// Color schemes for each tab
export const tabColors = {
  kendra: {
    primary: '#10B981', // emerald-500
    light: '#34D399',   // emerald-400
    gradient: 'from-emerald-500/20 to-emerald-600/10',
    accent: 'emerald',
    border: 'border-emerald-400/30',
    glow: 'shadow-[0_8px_32px_rgba(16,185,129,0.15)]'
  },
  kula: {
    primary: '#00D4FF', // cyan-400
    light: '#67E8F9',   // cyan-300
    gradient: 'from-cyan-500/20 to-cyan-600/10',
    accent: 'cyan',
    border: 'border-cyan-400/30',
    glow: 'shadow-[0_8px_32px_rgba(0,212,255,0.15)]'
  },
  karta: {
    primary: '#8B5CF6', // violet-500
    light: '#A78BFA',   // violet-400
    gradient: 'from-violet-500/20 to-violet-600/10',
    accent: 'violet',
    border: 'border-violet-400/30',
    glow: 'shadow-[0_8px_32px_rgba(139,92,246,0.15)]'
  },
  kupa: {
    primary: '#14B8A6', // teal-500
    light: '#2DD4BF',   // teal-400
    gradient: 'from-teal-500/20 to-teal-600/10',
    accent: 'teal',
    border: 'border-teal-400/30',
    glow: 'shadow-[0_8px_32px_rgba(20,184,166,0.15)]'
  },
  kriya: {
    primary: '#F59E0B', // amber-500
    light: '#FCD34D',   // amber-300
    gradient: 'from-amber-500/20 to-orange-600/10',
    accent: 'amber',
    border: 'border-amber-400/30',
    glow: 'shadow-[0_8px_32px_rgba(245,158,11,0.15)]'
  }
} as const

export type TabId = keyof typeof tabColors

// Animation timing constants
export const timing = {
  fast: 0.2,
  medium: 0.4,
  slow: 0.6,
  verySlow: 0.8
}

// Component dimensions for consistent sizing
export const dimensions = {
  container: {
    height: '580px',
    textWidth: '50%',
    visualWidth: '50%',
    gap: '24px'
  },
  visual: {
    maxWidth: '460px',
    maxHeight: '400px',
    padding: '32px'
  },
  node: {
    small: '8px',
    medium: '12px',
    large: '16px'
  },
  agent: {
    avatar: '64px',
    smallAvatar: '48px'
  }
}

// Utility functions
export const getTabColor = (tabId: TabId) => tabColors[tabId]

export const createPulseAnimation = (color: string) => ({
  animate: {
    boxShadow: [
      `0 0 0 0 ${color}40`,
      `0 0 0 8px ${color}00`,
      `0 0 0 0 ${color}00`
    ]
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeOut"
  }
})

export const createFlowAnimation = (duration: number = 3) => ({
  animate: {
    strokeDashoffset: [1000, 0]
  },
  transition: {
    duration,
    repeat: Infinity,
    ease: "linear"
  }
})

// Performance optimizations
export const reducedMotionPreference = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const shouldAnimate = () => !reducedMotionPreference()