/**
 * KRIM AI - IMAGE OPTIMIZATION UTILITIES
 * Advanced image processing for 2035 futuristic assets
 */

// SVG Generator for Agent Avatars
export const generateAgentAvatar = (
  agentName: string,
  primaryColor: string,
  secondaryColor: string,
  pattern: 'neural' | 'orbital' | 'wave' | 'geometric' | 'energy' = 'neural'
) => {
  const patterns = {
    neural: `
      <defs>
        <pattern id="neural-${agentName}" patternUnits="userSpaceOnUse" width="40" height="40">
          <circle cx="20" cy="20" r="2" fill="${primaryColor}" opacity="0.6">
            <animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="10" cy="10" r="1" fill="${secondaryColor}" opacity="0.4">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="30" cy="30" r="1.5" fill="${primaryColor}" opacity="0.5">
            <animate attributeName="r" values="1.5;3;1.5" dur="4s" repeatCount="indefinite"/>
          </circle>
        </pattern>
      </defs>
    `,
    
    orbital: `
      <defs>
        <pattern id="orbital-${agentName}" patternUnits="userSpaceOnUse" width="60" height="60">
          <circle cx="30" cy="30" r="20" fill="none" stroke="${primaryColor}" stroke-width="1" opacity="0.3">
            <animateTransform attributeName="transform" type="rotate" values="0 30 30;360 30 30" dur="20s" repeatCount="indefinite"/>
          </circle>
          <circle cx="30" cy="30" r="3" fill="${secondaryColor}">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="50" cy="30" r="2" fill="${primaryColor}">
            <animateTransform attributeName="transform" type="rotate" values="0 30 30;360 30 30" dur="10s" repeatCount="indefinite"/>
          </circle>
        </pattern>
      </defs>
    `,
    
    wave: `
      <defs>
        <pattern id="wave-${agentName}" patternUnits="userSpaceOnUse" width="80" height="40">
          <path d="M0,20 Q20,10 40,20 T80,20" fill="none" stroke="${primaryColor}" stroke-width="2" opacity="0.4">
            <animate attributeName="d" values="M0,20 Q20,10 40,20 T80,20;M0,20 Q20,30 40,20 T80,20;M0,20 Q20,10 40,20 T80,20" dur="4s" repeatCount="indefinite"/>
          </path>
          <path d="M0,25 Q20,15 40,25 T80,25" fill="none" stroke="${secondaryColor}" stroke-width="1" opacity="0.3">
            <animate attributeName="d" values="M0,25 Q20,15 40,25 T80,25;M0,25 Q20,35 40,25 T80,25;M0,25 Q20,15 40,25 T80,25" dur="3s" repeatCount="indefinite"/>
          </path>
        </pattern>
      </defs>
    `,
    
    geometric: `
      <defs>
        <pattern id="geometric-${agentName}" patternUnits="userSpaceOnUse" width="50" height="50">
          <polygon points="25,5 45,20 35,40 15,40 5,20" fill="${primaryColor}" opacity="0.3">
            <animateTransform attributeName="transform" type="rotate" values="0 25 25;360 25 25" dur="15s" repeatCount="indefinite"/>
          </polygon>
          <polygon points="25,15 35,25 25,35 15,25" fill="${secondaryColor}" opacity="0.5">
            <animateTransform attributeName="transform" type="rotate" values="0 25 25;-360 25 25" dur="10s" repeatCount="indefinite"/>
          </polygon>
        </pattern>
      </defs>
    `,
    
    energy: `
      <defs>
        <pattern id="energy-${agentName}" patternUnits="userSpaceOnUse" width="60" height="60">
          <g opacity="0.4">
            <path d="M10,30 Q30,10 50,30" fill="none" stroke="${primaryColor}" stroke-width="2">
              <animate attributeName="stroke-width" values="2;4;2" dur="2s" repeatCount="indefinite"/>
            </path>
            <path d="M10,30 Q30,50 50,30" fill="none" stroke="${secondaryColor}" stroke-width="1">
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite"/>
            </path>
            <circle cx="30" cy="30" r="4" fill="${primaryColor}">
              <animate attributeName="r" values="4;8;4" dur="2.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.5s" repeatCount="indefinite"/>
            </circle>
          </g>
        </pattern>
      </defs>
    `
  }

  return `
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      ${patterns[pattern]}
      
      <!-- Background Circle -->
      <circle cx="60" cy="60" r="55" fill="url(#gradient-bg-${agentName})" stroke="${primaryColor}" stroke-width="2" opacity="0.8"/>
      
      <!-- Pattern Fill -->
      <circle cx="60" cy="60" r="50" fill="url(#${pattern}-${agentName})" opacity="0.6"/>
      
      <!-- Center Glow -->
      <circle cx="60" cy="60" r="20" fill="${secondaryColor}" opacity="0.4">
        <animate attributeName="r" values="20;25;20" dur="4s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.4;0.7;0.4" dur="4s" repeatCount="indefinite"/>
      </circle>
      
      <!-- Agent Initial -->
      <text x="60" y="70" text-anchor="middle" fill="white" font-size="24" font-weight="bold" font-family="Arial">
        ${agentName.charAt(0)}
      </text>
      
      <!-- Gradient Definitions -->
      <defs>
        <radialGradient id="gradient-bg-${agentName}">
          <stop offset="0%" style="stop-color:${secondaryColor};stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:${primaryColor};stop-opacity:0.2" />
        </radialGradient>
        
        <!-- Glow Filter -->
        <filter id="glow-${agentName}">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    </svg>
  `
}

// Brand Assets Generator
export const generateBrandAssets = () => {
  const logo = `
    <svg width="200" height="60" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#00FF88;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#00D4FF;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:1" />
        </linearGradient>
        
        <filter id="logoGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- KRIM Text -->
      <text x="10" y="40" font-family="Arial" font-size="32" font-weight="bold" fill="url(#logoGradient)" filter="url(#logoGlow)">
        KRIM
      </text>
      
      <!-- AI Suffix -->
      <text x="120" y="35" font-family="Arial" font-size="18" font-weight="300" fill="#00D4FF" opacity="0.8">
        AI
      </text>
      
      <!-- Energy Pulse -->
      <circle cx="180" cy="30" r="8" fill="#00FF88" opacity="0.6">
        <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
      </circle>
    </svg>
  `

  const favicon = `
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="faviconGradient">
          <stop offset="0%" style="stop-color:#00FF88;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#00D4FF;stop-opacity:1" />
        </radialGradient>
      </defs>
      
      <rect width="32" height="32" rx="6" fill="#030207"/>
      <circle cx="16" cy="16" r="12" fill="url(#faviconGradient)" opacity="0.8"/>
      <text x="16" y="22" text-anchor="middle" fill="white" font-size="14" font-weight="bold">K</text>
    </svg>
  `

  return { logo, favicon }
}

// WebP/AVIF Conversion Utilities
export const generateOptimizedImageSet = (
  baseName: string,
  sizes: number[] = [320, 640, 1024, 1920]
) => {
  return sizes.map(size => ({
    webp: `/${baseName}-${size}w.webp ${size}w`,
    avif: `/${baseName}-${size}w.avif ${size}w`,
    fallback: `/${baseName}-${size}w.jpg ${size}w`
  }))
}

// Lazy Loading Placeholder Generator
export const generatePlaceholder = (width: number, height: number, color = '#030207') => {
  const aspectRatio = height / width
  
  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <rect width="60%" height="20%" x="20%" y="40%" fill="rgba(255,255,255,0.1)" rx="4">
        <animate attributeName="opacity" values="0.1;0.3;0.1" dur="2s" repeatCount="indefinite"/>
      </rect>
    </svg>
  `
}

// CSS Background Patterns
export const cssPatterns = {
  neuralNetwork: `
    background-image: 
      radial-gradient(circle at 25% 25%, rgba(0, 255, 136, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.05) 0%, transparent 50%);
    background-size: 200px 200px, 150px 150px, 100px 100px;
    background-position: 0 0, 50px 50px, 25px 25px;
  `,
  
  dataFlow: `
    background-image: 
      linear-gradient(90deg, transparent 95%, rgba(0, 255, 136, 0.2) 95%),
      linear-gradient(0deg, transparent 95%, rgba(0, 212, 255, 0.2) 95%);
    background-size: 20px 20px, 20px 20px;
  `,
  
  circuitBoard: `
    background-image:
      linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px),
      linear-gradient(180deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px);
    background-size: 40px 40px;
  `,
  
  hexagonGrid: `
    background-image: 
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0l26 15v30L30 60 4 45V15z' fill='none' stroke='%2300FF88' stroke-width='1' opacity='0.1'/%3E%3C/svg%3E");
    background-size: 60px 60px;
  `
}

// Image Optimization Function
export const optimizeImageSrc = (
  src: string, 
  width?: number, 
  quality = 80,
  format: 'webp' | 'avif' | 'auto' = 'auto'
) => {
  if (!src) return ''
  
  // Detect WebP/AVIF support
  const supportsWebP = typeof window !== 'undefined' && 
    document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0
  
  const supportsAvif = typeof window !== 'undefined' && 
    document.createElement('canvas').toDataURL('image/avif').indexOf('data:image/avif') === 0

  let targetFormat = format
  if (format === 'auto') {
    targetFormat = supportsAvif ? 'avif' : supportsWebP ? 'webp' : 'webp'
  }

  // Build optimized URL (assuming CDN with query params)
  const params = new URLSearchParams()
  if (width) params.set('w', width.toString())
  params.set('q', quality.toString())
  params.set('f', targetFormat)
  
  return `${src}?${params.toString()}`
}

// Generate Agent Color Schemes
export const agentColorSchemes = {
  nudger: { primary: '#00FF88', secondary: '#00D4FF' },
  negotiator: { primary: '#8B5CF6', secondary: '#FF6B9D' },
  resolver: { primary: '#FF4C61', secondary: '#FF6B9D' },
  healer: { primary: '#4ECDC4', secondary: '#00FF88' },
  complianceGuardian: { primary: '#FFD700', secondary: '#FFA500' },
  campaignOrchestrator: { primary: '#00D4FF', secondary: '#8B5CF6' },
  analyticsProphet: { primary: '#FF6B9D', secondary: '#FF4C61' },
  caseManager: { primary: '#00FF88', secondary: '#4ECDC4' },
  trainingSensei: { primary: '#8B5CF6', secondary: '#00D4FF' },
  integrationWizard: { primary: '#4ECDC4', secondary: '#00FF88' }
}

// Export all utilities
export default {
  generateAgentAvatar,
  generateBrandAssets,
  generateOptimizedImageSet,
  generatePlaceholder,
  cssPatterns,
  optimizeImageSrc,
  agentColorSchemes
}