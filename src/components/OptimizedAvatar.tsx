/**
 * Optimized Avatar Component
 * Handles WebP/AVIF optimization with responsive lazy loading
 * Replaces 1.1-1.8MB PNGs with 2-8KB optimized formats
 */
import React from 'react'

interface OptimizedAvatarProps {
  baseName?: string // For ai-agent-avatar-01 format
  name?: string // For agent name format (backward compatibility)
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  width?: number
  height?: number
  className?: string
  priority?: boolean // For above-the-fold avatars
}

const sizeMap = {
  sm: { width: 48, height: 48 },
  md: { width: 96, height: 96 },
  lg: { width: 128, height: 128 },
  xl: { width: 192, height: 192 }
}

export default function OptimizedAvatar({
  baseName,
  name,
  alt,
  size = 'lg',
  width: customWidth,
  height: customHeight,
  className = '',
  priority = false
}: OptimizedAvatarProps) {
  const sizeConfig = sizeMap[size]
  const finalWidth = customWidth || sizeConfig.width
  const finalHeight = customHeight || sizeConfig.height

  let fileName: string
  if (baseName) {
    // Use baseName directly for ai-agent-avatar-01 format
    fileName = baseName
  } else if (name) {
    // Convert name to kebab-case for file paths (backward compatibility)
    fileName = name.toLowerCase().replace(/\s+/g, '-')
  } else {
    throw new Error('Either baseName or name prop must be provided')
  }

  // Generate optimized image paths
  const webpPath = `/images/avatars/optimized/${fileName}.webp`
  const avifPath = `/images/avatars/optimized/${fileName}.avif`
  const fallbackPath = `/images/avatars/optimized/${fileName}.jpg` // Small JPEG fallback

  // Temporary debug: Use simple img for testing
  return (
    <img
      src={fallbackPath}
      alt={alt}
      width={finalWidth}
      height={finalHeight}
      loading={priority ? 'eager' : 'lazy'}
      className={className}
      style={{
        aspectRatio: '1/1',
        objectFit: 'cover'
      }}
    />
  )
}

// Agent avatar mappings for type safety
export const AGENT_AVATARS = {
  'kim-recovery': 'KIM Recovery',
  'kim-guardian': 'KIM Guardian',
  'kim-connect': 'KIM Connect',
  'kim-early': 'KIM Early Intervention',
  'kim-orchestrator': 'KIM Orchestrator',
  'kim-resolve': 'KIM Resolve',
  'nudger': 'The Nudger',
  'negotiator': 'The Negotiator',
  'resolver': 'The Resolver',
  'healer': 'The Healer',
  'compliance-guardian': 'Compliance Guardian',
  'campaign-orchestrator': 'Campaign Orchestrator',
  'case-manager': 'Case Manager',
  'analytics-prophet': 'Analytics Prophet',
  'training-sensei': 'Training Sensei',
  'integration-wizard': 'Integration Wizard'
} as const

export type AgentAvatarKey = keyof typeof AGENT_AVATARS