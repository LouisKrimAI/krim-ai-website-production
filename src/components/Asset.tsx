/**
 * KRIM AI - SMART ASSET COMPONENT
 * High-level component that works with the asset management system
 */
import React from 'react'
import OptimizedImage from './OptimizedImage'
import { AssetManager, AssetMeta, COMMON_ASSETS, PLACEHOLDER_ASSETS } from '../utils/assetManager'

interface AssetProps {
  // Asset ID from the asset registry
  id?: string
  
  // Direct asset metadata (overrides ID lookup)
  asset?: AssetMeta
  
  // Fallback to placeholder if asset not found
  placeholder?: keyof typeof PLACEHOLDER_ASSETS
  
  // Additional OptimizedImage props
  className?: string
  priority?: boolean
  lazy?: boolean
  sizes?: string
  quality?: number
  
  // Event handlers
  onLoad?: () => void
  onError?: () => void
}

const Asset: React.FC<AssetProps> = ({
  id,
  asset: directAsset,
  placeholder,
  className = '',
  priority,
  lazy = true,
  sizes = '100vw',
  quality = 75,
  onLoad,
  onError
}) => {
  // Resolve asset from ID or use direct asset
  const resolvedAsset = directAsset || (id ? AssetManager.getAsset(id) : null)
  
  // Fallback to placeholder if asset not found
  const fallbackAsset = placeholder ? PLACEHOLDER_ASSETS[placeholder] : null
  
  // Final asset to render
  const finalAsset = resolvedAsset || fallbackAsset
  
  if (!finalAsset) {
    console.warn(`Asset not found: ${id}, and no placeholder specified`)
    return (
      <div className={`bg-gradient-to-br from-krim-mint/5 to-krim-cyan/5 flex items-center justify-center ${className}`}>
        <div className="text-krim-mint/40 text-sm">Asset not found</div>
      </div>
    )
  }
  
  return (
    <OptimizedImage
      src={finalAsset.src}
      alt={finalAsset.alt}
      width={finalAsset.width}
      height={finalAsset.height}
      className={className}
      priority={priority || finalAsset.priority}
      lazy={lazy}
      sizes={sizes}
      quality={quality}
      onLoad={onLoad}
      onError={onError}
    />
  )
}

export default Asset

// Convenience components for common assets
export const HeroBackground: React.FC<Omit<AssetProps, 'id' | 'placeholder'>> = (props) => (
  <Asset 
    placeholder="hero-background"
    priority
    sizes="100vw"
    {...props}
  />
)

export const AgentAvatar: React.FC<AssetProps & { variant?: 'primary' | 'secondary' | 'workforce' }> = ({ 
  variant = 'primary', 
  ...props 
}) => {
  const assetMap = {
    primary: COMMON_ASSETS.primaryAgent,
    secondary: AssetManager.getAsset('ai-agent-avatar-02'),
    workforce: COMMON_ASSETS.agentWorkforce
  }
  
  return (
    <Asset 
      asset={assetMap[variant]}
      className="rounded-lg overflow-hidden"
      {...props}
    />
  )
}

export const DashboardScreenshot: React.FC<Omit<AssetProps, 'id'>> = (props) => (
  <Asset
    asset={COMMON_ASSETS.mainDashboard}
    placeholder="ai-copilot-interface"
    className="rounded-xl shadow-2xl border border-krim-mint/10"
    {...props}
  />
)

export const ComplianceDashboard: React.FC<Omit<AssetProps, 'id' | 'placeholder'>> = (props) => (
  <Asset
    placeholder="compliance-dashboard"
    className="rounded-xl shadow-xl border border-krim-cyan/10"
    {...props}
  />
)

export const ArchitectureDiagram: React.FC<Omit<AssetProps, 'id' | 'placeholder'>> = (props) => (
  <Asset
    placeholder="modular-architecture"
    className="rounded-lg bg-gradient-to-br from-krim-space/50 to-krim-space/80 p-6"
    {...props}
  />
)

export const PerformanceMetrics: React.FC<Omit<AssetProps, 'id' | 'placeholder'>> = (props) => (
  <Asset
    placeholder="performance-metrics"
    className="rounded-lg"
    {...props}
  />
)