/**
 * KRIM AI - CENTRALIZED ASSET MANAGEMENT
 * Manages all website assets with optimized loading and caching
 */

// Asset categories for better organization
export type AssetCategory = 
  | 'agents' 
  | 'ui-screens' 
  | 'dashboards' 
  | 'architecture' 
  | 'references' 
  | 'placeholders'
  | 'presentations'

// Asset metadata interface
export interface AssetMeta {
  id: string
  src: string
  alt: string
  category: AssetCategory
  width?: number
  height?: number
  priority?: boolean
  description?: string
}

// Core asset registry - all assets organized by category
export const ASSETS: Record<AssetCategory, AssetMeta[]> = {
  agents: [
    {
      id: 'ai-agent-avatar-01',
      src: '/assets/images/optimized/ai-agent-avatar-01.webp',
      alt: 'AI Agent Avatar - Nudger (Professional male agent with futuristic design)',
      category: 'agents',
      width: 400,
      height: 400,
      description: 'Nudger AI agent avatar for customer service roles'
    },
    {
      id: 'ai-agent-avatar-02',
      src: '/assets/images/optimized/ai-agent-avatar-02.webp',
      alt: 'AI Agent Avatar - Negotiator (Diverse professional agent)',
      category: 'agents',
      width: 400,
      height: 400,
      description: 'Negotiator AI agent avatar for collections roles'
    },
    {
      id: 'ai-agent-avatar-03',
      src: '/assets/images/optimized/ai-agent-avatar-03.webp',
      alt: 'AI Agent Avatar - Resolver (Strategic problem solver)',
      category: 'agents',
      width: 400,
      height: 400,
      description: 'Resolver AI agent avatar for dispute resolution'
    },
    {
      id: 'ai-agent-avatar-04',
      src: '/assets/images/optimized/ai-agent-avatar-04.webp',
      alt: 'AI Agent Avatar - Healer (Empathetic relationship manager)',
      category: 'agents',
      width: 400,
      height: 400,
      description: 'Healer AI agent avatar for relationship management'
    },
    {
      id: 'ai-agent-avatar-05',
      src: '/assets/images/optimized/ai-agent-avatar-05.webp',
      alt: 'AI Agent Avatar - Campaign Orchestrator (Strategic campaign manager)',
      category: 'agents',
      width: 400,
      height: 400,
      description: 'Campaign Orchestrator AI agent avatar for campaign management'
    },
    {
      id: 'ai-agent-avatar-06',
      src: '/assets/images/optimized/ai-agent-avatar-06.webp',
      alt: 'AI Agent Avatar - Compliance Guardian (Regulatory monitor)',
      category: 'agents',
      width: 400,
      height: 400,
      description: 'Compliance Guardian AI agent avatar for regulatory compliance'
    },
    {
      id: 'ai-agent-avatar-08',
      src: '/assets/images/optimized/ai-agent-avatar-08.webp',
      alt: 'AI Agent Avatar - Analytics Prophet (Data insights specialist)',
      category: 'agents',
      width: 400,
      height: 400,
      description: 'Analytics Prophet AI agent avatar for data analysis'
    },
    {
      id: 'ai-agent-avatar-10',
      src: '/assets/images/optimized/ai-agent-avatar-10.webp',
      alt: 'AI Agent Avatar - Integration Wizard (System connectivity master)',
      category: 'agents',
      width: 400,
      height: 400,
      description: 'Integration Wizard AI agent avatar for system integration'
    },
    {
      id: 'ai-agent-avatar-11',
      src: '/assets/images/optimized/ai-agent-avatar-11.webp',
      alt: 'AI Agent Avatar - Training Sensei (Knowledge transfer master)',
      category: 'agents',
      width: 400,
      height: 400,
      description: 'Training Sensei AI agent avatar for knowledge management'
    },
    {
      id: 'ai-agent-grid-workforce',
      src: '/assets/images/ai-agent-grid-workforce.png',
      alt: 'Grid of diverse AI agents representing the full workforce capabilities',
      category: 'agents',
      width: 800,
      height: 600,
      priority: true,
      description: 'Complete AI workforce visualization showing role diversity'
    }
  ],
  
  'ui-screens': [
    {
      id: 'ai-dashboard-screenshot',
      src: '/assets/images/ai-dashboard-screenshot.png',
      alt: 'Krim AI dashboard interface showing enterprise loan management',
      category: 'ui-screens',
      width: 1200,
      height: 800,
      priority: true,
      description: 'Main dashboard interface for enterprise users'
    }
  ],
  
  dashboards: [],
  
  architecture: [],
  
  references: [
    {
      id: 'huly-hero-reference',
      src: '/assets/images/Screenshot 2025-09-07 at 11.24.48 PM.png',
      alt: 'Huly.io hero section design reference',
      category: 'references',
      width: 1920,
      height: 1080,
      description: 'Modern SaaS hero design inspiration'
    },
    {
      id: 'huly-dashboard-reference',
      src: '/assets/images/Screenshot 2025-09-07 at 11.24.58 PM.png',
      alt: 'Huly.io dashboard design reference',
      category: 'references',
      width: 1920,
      height: 1080,
      description: 'Enterprise dashboard design inspiration'
    }
  ],
  
  presentations: [
    {
      id: 'krim-ai-deck-v2',
      src: '/assets/images/krim-ai-presentation-deck-v2.pdf',
      alt: 'Krim AI presentation deck version 2',
      category: 'presentations',
      description: 'Latest Krim AI company presentation'
    },
    {
      id: 'krim-ai-deck-us',
      src: '/assets/images/krim-ai-presentation-us.pdf',
      alt: 'Krim AI US market presentation',
      category: 'presentations',
      description: 'US market focused presentation deck'
    }
  ],
  
  placeholders: []
}

// Utility functions for asset management
export class AssetManager {
  
  /**
   * Get asset by ID
   */
  static getAsset(id: string): AssetMeta | undefined {
    for (const category in ASSETS) {
      const asset = ASSETS[category as AssetCategory].find(asset => asset.id === id)
      if (asset) return asset
    }
    return undefined
  }

  /**
   * Get optimized avatar path by base name
   */
  static getOptimizedAvatarPath(baseName: string): string {
    const asset = this.getAsset(baseName)
    if (asset) {
      return asset.src
    }
    // Fallback to optimized path structure
    return `/assets/images/optimized/${baseName}.webp`
  }
  
  /**
   * Get assets by category
   */
  static getAssetsByCategory(category: AssetCategory): AssetMeta[] {
    return ASSETS[category] || []
  }
  
  /**
   * Get priority assets for preloading
   */
  static getPriorityAssets(): AssetMeta[] {
    const priorities: AssetMeta[] = []
    for (const category in ASSETS) {
      priorities.push(...ASSETS[category as AssetCategory].filter(asset => asset.priority))
    }
    return priorities
  }
  
  /**
   * Generate responsive image source set
   */
  static generateSrcSet(src: string, widths: number[] = [640, 768, 1024, 1280, 1536, 1920]): string {
    return widths
      .map(width => `${src}?width=${width}&quality=75 ${width}w`)
      .join(', ')
  }
  
  /**
   * Create placeholder data URL
   */
  static createPlaceholder(width: number = 400, height: number = 300, type: 'gradient' | 'solid' = 'gradient'): string {
    const gradientStops = type === 'gradient' 
      ? `<stop offset="0%" stop-color="#16FFBB" stop-opacity="0.1"/>
         <stop offset="100%" stop-color="#00D4FF" stop-opacity="0.1"/>`
      : `<stop offset="0%" stop-color="#0A081B" stop-opacity="0.8"/>`
      
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            ${gradientStops}
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
              fill="#16FFBB" font-family="system-ui" font-size="14" opacity="0.6">
          Krim AI
        </text>
      </svg>
    `)}`
  }
  
  /**
   * Preload critical assets
   */
  static preloadCriticalAssets(): void {
    if (typeof window === 'undefined') return
    
    const criticalAssets = this.getPriorityAssets()
    
    criticalAssets.forEach(asset => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = asset.src
      link.as = 'image'
      document.head.appendChild(link)
    })
  }
  
  /**
   * Generate missing placeholder assets
   */
  static generatePlaceholders(): Record<string, AssetMeta> {
    return {
      'hero-background': {
        id: 'hero-background-placeholder',
        src: this.createPlaceholder(1920, 1080),
        alt: 'Hero background placeholder with Krim AI branding',
        category: 'placeholders',
        width: 1920,
        height: 1080,
        priority: true,
        description: 'Hero section background placeholder'
      },
      
      'ai-copilot-interface': {
        id: 'ai-copilot-interface-placeholder',
        src: this.createPlaceholder(1200, 800),
        alt: 'AI Copilot interface mockup placeholder',
        category: 'placeholders',
        width: 1200,
        height: 800,
        description: 'AI Copilot enterprise software interface mockup'
      },
      
      'modular-architecture': {
        id: 'modular-architecture-placeholder',
        src: this.createPlaceholder(800, 600),
        alt: 'Modular OS architecture diagram placeholder',
        category: 'placeholders',
        width: 800,
        height: 600,
        description: 'Technical architecture visualization placeholder'
      },
      
      'compliance-dashboard': {
        id: 'compliance-dashboard-placeholder',
        src: this.createPlaceholder(1200, 800),
        alt: 'Compliance dashboard visualization placeholder',
        category: 'placeholders',
        width: 1200,
        height: 800,
        description: 'Enterprise compliance dashboard interface'
      },
      
      'performance-metrics': {
        id: 'performance-metrics-placeholder',
        src: this.createPlaceholder(800, 400),
        alt: 'Performance metrics visualization placeholder',
        category: 'placeholders',
        width: 800,
        height: 400,
        description: 'AI performance metrics and analytics visualization'
      }
    }
  }
}

// Asset paths helper - ensures consistent paths across the app
export const ASSET_PATHS = {
  images: '/assets/images/',
  icons: '/assets/icons/',
  videos: '/assets/videos/',
  documents: '/assets/documents/'
} as const

// Pre-generate placeholder assets
export const PLACEHOLDER_ASSETS = AssetManager.generatePlaceholders()

// Export commonly used assets for convenience
export const COMMON_ASSETS = {
  // AI Agents
  primaryAgent: ASSETS.agents[0],
  agentWorkforce: ASSETS.agents[2],
  
  // UI Screenshots
  mainDashboard: ASSETS['ui-screens'][0],
  
  // Placeholders
  heroBackground: PLACEHOLDER_ASSETS['hero-background'],
  aiCopilotInterface: PLACEHOLDER_ASSETS['ai-copilot-interface'],
  complianceDashboard: PLACEHOLDER_ASSETS['compliance-dashboard']
}

// Initialize asset preloading on client side
if (typeof window !== 'undefined') {
  // Preload critical assets after page load
  window.addEventListener('load', () => {
    AssetManager.preloadCriticalAssets()
  })
}