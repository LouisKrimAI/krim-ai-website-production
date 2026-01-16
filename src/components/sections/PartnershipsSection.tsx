/**
 * KRIM AI - PARTNERSHIPS SECTION COMPONENT
 * Displays strategic partnerships with professional logos and credibility signals
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import { partnerships, getFeaturedPartnerships, getPartnershipsByCategory, partnershipDisplayConfig, type Partnership } from '../../data/partnerships'

interface PartnershipsSectionProps {
  title?: string
  subtitle?: string
  displayMode?: 'homepage' | 'partnersPage' | 'footer' | 'custom'
  customConfig?: {
    maxItems?: number
    showDescription?: boolean
    showBenefits?: boolean
    categories?: Partnership['category'][]
    groupByCategory?: boolean
    filterFeatured?: boolean
  }
  className?: string
  compact?: boolean
}

export default function PartnershipsSection({
  title = "Powered by Key Partnerships",
  subtitle,
  displayMode = 'homepage',
  customConfig,
  className = "",
  compact = false
}: PartnershipsSectionProps) {
  // Get configuration based on display mode
  const config = customConfig || partnershipDisplayConfig[displayMode] || partnershipDisplayConfig.homepage

  // Filter and prepare partnerships
  const getFilteredPartnerships = () => {
    let filtered = partnerships

    // Filter by categories if specified
    if (config.categories) {
      filtered = filtered.filter(p => config.categories!.includes(p.category))
    }

    // Filter by featured if specified
    if (config.filterFeatured || config.prioritizeFeatured) {
      const featured = filtered.filter(p => p.featured)
      const nonFeatured = filtered.filter(p => !p.featured)
      filtered = [...featured, ...nonFeatured]
    }

    // Limit items if specified
    if (config.maxItems) {
      filtered = filtered.slice(0, config.maxItems)
    }

    return filtered
  }

  const displayedPartnerships = getFilteredPartnerships()

  // Group by category if specified
  const groupedPartnerships = config.groupByCategory 
    ? displayedPartnerships.reduce((groups, partnership) => {
        const category = partnership.category
        if (!groups[category]) {
          groups[category] = []
        }
        groups[category].push(partnership)
        return groups
      }, {} as Record<string, Partnership[]>)
    : { all: displayedPartnerships }

  return (
    <section className={`relative py-16 ${compact ? 'py-8' : 'py-16'} ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        {!compact && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className={`font-bold text-white mb-8 ${compact ? 'text-xl' : 'text-4xl md:text-5xl'}`}>
              {title}
            </h2>
            {subtitle && (
              <p className="text-white max-w-3xl mx-auto">{subtitle}</p>
            )}
          </motion.div>
        )}

        {/* Partnership Grid */}
        {Object.entries(groupedPartnerships).map(([category, categoryPartnerships]) => (
          <div key={category} className="mb-12 last:mb-0">
            {/* Category Header (if grouping) */}
            {config.groupByCategory && category !== 'all' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <h3 className="text-xl font-semibold text-white mb-2 capitalize text-white">
                  {category.replace('-', ' & ')} Partners
                </h3>
                <div className="w-12 h-0.5 bg-gradient-to-r from-krim-mint to-krim-cyan"></div>
              </motion.div>
            )}

            {/* Partnership Cards Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`grid gap-6 ${
                compact 
                  ? 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6' 
                  : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
              }`}
            >
              {categoryPartnerships.map((partnership, index) => (
                <PartnershipCard
                  key={partnership.id}
                  partnership={partnership}
                  index={index}
                  showDescription={config.showDescription}
                  showBenefits={config.showBenefits}
                  compact={compact}
                />
              ))}
            </motion.div>
          </div>
        ))}

        {/* Trust Signal */}
        {displayMode === 'homepage' && !compact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="text-sm text-white">
              Trusted partnerships powering AI-first financial services transformation
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

// Individual Partnership Card Component
interface PartnershipCardProps {
  partnership: Partnership
  index: number
  showDescription?: boolean
  showBenefits?: boolean
  compact?: boolean
}

function PartnershipCard({ 
  partnership, 
  index, 
  showDescription = false, 
  showBenefits = false,
  compact = false 
}: PartnershipCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const categoryColors = {
    'ai-tech': 'from-krim-mint/20 to-krim-mint/5 border-krim-mint/30',
    'infrastructure': 'from-krim-cyan/20 to-krim-cyan/5 border-krim-cyan/30',
    'compliance': 'from-green-500/20 to-green-500/5 border-green-500/30',
    'financial': 'from-krim-purple/20 to-krim-purple/5 border-krim-purple/30',
    'integration': 'from-blue-500/20 to-blue-500/5 border-blue-500/30',
    'security': 'from-red-500/20 to-red-500/5 border-red-500/30'
  }

  const tierBadges = {
    'premier': { label: 'Premier', color: 'text-yellow-500 bg-yellow-500/10' },
    'strategic': { label: 'Strategic', color: 'text-krim-mint bg-krim-mint/10' },
    'certified': { label: 'Certified', color: 'text-green-500 bg-green-500/10' },
    'technology': { label: 'Tech', color: 'text-blue-500 bg-blue-500/10' }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group cursor-pointer"
    >
      <div className={`
        relative bg-gradient-to-br ${categoryColors[partnership.category] || 'from-white/10 to-white/5 border-white/20'}
        rounded-xl ${compact ? 'p-4' : 'p-6'} border backdrop-blur-sm
        transition-all duration-300 h-full flex flex-col
        ${isHovered ? 'shadow-2xl shadow-white/20 scale-[1.02] border-white/40' : 'shadow-lg shadow-black/20'}
      `}>
        {/* Tier Badge */}
        {partnership.tier && !compact && (
          <div className="absolute top-2 right-2 z-10">
            <span className={`
              px-2 py-1 rounded-full text-xs font-medium
              ${tierBadges[partnership.tier].color}
            `}>
              {tierBadges[partnership.tier].label}
            </span>
          </div>
        )}

        {/* Logo Container - Enhanced for visual symmetry */}
        <div className={`flex items-center justify-center mb-4 ${compact ? 'h-16 p-2' : 'h-20 p-3'} relative`}>
          <div className={`absolute inset-0 bg-white/5 rounded-lg ${isHovered ? 'bg-white/10' : ''} transition-all duration-300`}></div>
          {!imageError ? (
            <img
              src={partnership.logo.src}
              alt={partnership.logo.alt}
              className={`relative z-10 object-contain filter brightness-100 transition-all duration-300 ${
                isHovered ? 'brightness-110 scale-105' : ''
              } ${compact ? 'max-h-10' : 'max-h-12'}`}
              style={{
                maxWidth: '100%',
                width: 'auto',
                height: 'auto'
              }}
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            // Fallback to text logo
            <div className={`
              relative z-10 flex items-center justify-center w-full ${compact ? 'h-10' : 'h-12'}
              bg-white/10 rounded-lg border border-white/20
            `}>
              <span className={`font-bold text-center ${compact ? 'text-xs' : 'text-sm'} text-white px-2`}>
                {partnership.displayName || partnership.name}
              </span>
            </div>
          )}
        </div>

        {/* Partnership Info */}
        <div className="flex-1 flex flex-col">
          {!compact && (
            <>
              <h3 className="text-sm font-semibold text-white mb-1 text-center text-white">
                {partnership.displayName || partnership.name}
              </h3>
              
              {showDescription && (
                <p className="text-xs text-white mb-3 text-center line-clamp-2">
                  {partnership.description}
                </p>
              )}

              {/* Partnership Status */}
              <div className="text-center mb-2">
                <span className={`
                  inline-block px-2 py-1 rounded-full text-xs
                  ${partnership.partnership.status === 'active' ? 'bg-green-500/20 text-green-400' :
                    partnership.partnership.status === 'certified' ? 'bg-blue-500/20 text-blue-400' :
                    partnership.partnership.status === 'member' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-gray-500/20 text-white'
                  }
                `}>
                  {partnership.partnership.status}
                </span>
              </div>

              {/* Benefits (on hover or if showBenefits) */}
              {showBenefits && partnership.benefits && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: isHovered || showBenefits ? 1 : 0,
                    height: isHovered || showBenefits ? 'auto' : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 overflow-hidden"
                >
                  <div className="text-xs text-white space-y-1">
                    {partnership.benefits.slice(0, 2).map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-1">
                        <span className="text-krim-mint mt-0.5">•</span>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>

        {/* External Link Indicator */}
        {partnership.website && !compact && (
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  )
}