/**
 * Progressive Disclosure Component - Enterprise Information Architecture
 * 
 * Enables sophisticated B2B buyers to consume information at their preferred depth:
 * - Executives: High-level metrics and strategic impact
 * - Technical: Implementation details and specifications  
 * - Financial: Detailed ROI calculations and cost breakdowns
 */

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CaretRight, Info, TrendUp, Gear, Calculator } from '@phosphor-icons/react'
import Card from './Card'
import { getDisplayMetric } from '../data/claimsRegistry'

export interface DisclosureLevel {
  level: 'executive' | 'technical' | 'financial'
  title: string
  description: string
  content: React.ReactNode
  icon: React.ReactNode
}

interface ProgressiveDisclosureProps {
  title: string
  summary: string
  levels: DisclosureLevel[]
  defaultLevel?: 'executive' | 'technical' | 'financial'
  className?: string
}

const LEVEL_CONFIG = {
  executive: {
    label: 'Executive Summary',
    color: 'krim-mint',
    icon: <TrendUp className="w-5 h-5" />,
    description: 'Strategic impact and key metrics'
  },
  technical: {
    label: 'Technical Details',
    color: 'krim-cyan', 
    icon: <Gear className="w-5 h-5" />,
    description: 'Architecture and implementation'
  },
  financial: {
    label: 'Financial Analysis',
    color: 'krim-purple',
    icon: <Calculator className="w-5 h-5" />,
    description: 'ROI calculations and cost breakdown'
  }
}

export default function ProgressiveDisclosure({
  title,
  summary,
  levels,
  defaultLevel = 'executive',
  className = ''
}: ProgressiveDisclosureProps) {
  const [activeLevel, setActiveLevel] = useState(defaultLevel)
  const [isExpanded, setIsExpanded] = useState(false)

  const currentLevel = levels.find(l => l.level === activeLevel)

  // Helper functions for dynamic Tailwind classes
  const getLevelBorderClass = (level: 'executive' | 'technical' | 'financial') => {
    const map = {
      executive: 'border-krim-mint/20',
      technical: 'border-krim-cyan/20',
      financial: 'border-krim-purple/20'
    }
    return map[level]
  }

  const getLevelBgClass = (level: 'executive' | 'technical' | 'financial', opacity: '5' | '20') => {
    const map = {
      executive: `bg-krim-mint/${opacity}`,
      technical: `bg-krim-cyan/${opacity}`,
      financial: `bg-krim-purple/${opacity}`
    }
    return map[level]
  }

  const getLevelTextClass = (level: 'executive' | 'technical' | 'financial') => {
    const map = {
      executive: 'text-krim-mint',
      technical: 'text-krim-cyan',
      financial: 'text-krim-purple'
    }
    return map[level]
  }

  return (
    <div className={`progressive-disclosure ${className}`}>
      {/* Summary Card - Always Visible */}
      <Card className="p-6 border border-krim-mint/20 hover:border-krim-mint/40 transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2 text-white">{title}</h3>
            <p className="text-white leading-relaxed">{summary}</p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-krim-mint hover:bg-krim-mint/10 rounded-lg transition-colors"
          >
            <Info className="w-4 h-4" />
            {isExpanded ? 'Less Detail' : 'More Detail'}
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <CaretRight className="w-4 h-4" />
            </motion.div>
          </button>
        </div>

        {/* Level Tabs - Shown when expanded */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="border-t border-white/10 pt-4">
                {/* Level Selection Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {levels.map((level) => {
                    const config = LEVEL_CONFIG[level.level]
                    const isActive = activeLevel === level.level
                    
                    return (
                      <button
                        key={level.level}
                        onClick={() => setActiveLevel(level.level)}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                          isActive 
                            ? `bg-${config.color}/20 text-${config.color} border border-${config.color}/40` 
                            : 'text-white hover:text-white hover:bg-white/5 border border-white/10'
                        }`}
                      >
                        {config.icon}
                        <span className="hidden sm:inline">{config.label}</span>
                        <span className="sm:hidden">{level.level}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Active Level Content */}
                <AnimatePresence mode="wait">
                  {currentLevel && (
                    <motion.div
                      key={activeLevel}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className={`p-4 rounded-lg border ${getLevelBorderClass(activeLevel)} ${getLevelBgClass(activeLevel, '5')}`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`p-2 rounded-lg ${getLevelBgClass(activeLevel, '20')}`}>
                          {currentLevel.icon}
                        </div>
                        <div>
                          <h4 className={`text-lg font-semibold ${getLevelTextClass(activeLevel)} mb-1`}>
                            {currentLevel.title}
                          </h4>
                          <p className="text-white text-sm">
                            {currentLevel.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-white">
                        {currentLevel.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  )
}

// Convenience component for common use cases
export function ROIDisclosure({ 
  portfolioSize, 
  className = '' 
}: { 
  portfolioSize: number
  className?: string 
}) {
  const levels: DisclosureLevel[] = [
    {
      level: 'executive',
      title: 'Strategic Impact',
      description: 'High-level business outcomes and competitive advantage',
      icon: <TrendUp className="w-5 h-5 text-krim-mint" />,
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-krim-mint/10 rounded-lg">
              <div className="text-2xl font-bold text-krim-mint">${getDisplayMetric('annualSavings')}</div>
              <div className="text-sm text-white">Median Annual Savings</div>
            </div>
            <div className="text-center p-3 bg-krim-mint/10 rounded-lg">
              <div className="text-2xl font-bold text-krim-mint">{getDisplayMetric('paybackPeriod')}mo</div>
              <div className="text-sm text-white">Median Payback</div>
            </div>
          </div>
          <p className="text-sm text-white">
            Based on validated results from {getDisplayMetric('customers')} financial institutions managing ${getDisplayMetric('monthlyDebt')} monthly debt.
          </p>
        </div>
      )
    },
    {
      level: 'technical',
      title: 'Implementation Overview', 
      description: 'Architecture, integration, and deployment specifications',
      icon: <Gear className="w-5 h-5 text-krim-cyan" />,
      content: (
        <div className="space-y-3">
          <ul className="space-y-2 text-sm">
            <li>• <strong>Deployment:</strong> 12-day average (Kubernetes or Docker Swarm)</li>
            <li>• <strong>Integration:</strong> RESTful + GraphQL APIs with webhooks</li>
            <li>• <strong>Architecture:</strong> Microservices with event-driven processing</li>
            <li>• <strong>Security:</strong> SOC 2, HIPAA-ready, AES-256 encryption</li>
          </ul>
          <div className="p-3 bg-krim-cyan/10 rounded-lg text-sm">
            <strong className="text-krim-cyan">SLA:</strong> 99.9% uptime, &lt;50ms response times, enterprise support
          </div>
        </div>
      )
    },
    {
      level: 'financial',
      title: 'Detailed ROI Analysis',
      description: 'Complete cost-benefit breakdown with methodology',
      icon: <Calculator className="w-5 h-5 text-krim-purple" />,
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <strong className="text-krim-purple">Operational Savings:</strong>
              <ul className="mt-1 space-y-1 text-white">
                <li>• Staff cost reduction: $800K/year</li>
                <li>• Compliance risk mitigation: $200K/year</li>
                <li>• Technology consolidation: $150K/year</li>
              </ul>
            </div>
            <div>
              <strong className="text-krim-purple">Revenue Impact:</strong>
              <ul className="mt-1 space-y-1 text-white">
                <li>• {getDisplayMetric('collectionLift')} collection rate improvement</li>
                <li>• 65% contact rate (vs 30% baseline)</li>
                <li>• Additional annual collections: ${getDisplayMetric('annualSavings')}</li>
              </ul>
            </div>
          </div>
          <div className="p-3 bg-krim-purple/10 rounded-lg text-sm">
            <strong className="text-krim-purple">Total Impact:</strong> $3.25M annual benefit vs $150K platform cost = 2,067% ROI
          </div>
        </div>
      )
    }
  ]

  return (
    <ProgressiveDisclosure
      title={`ROI Impact Analysis - $${portfolioSize}M Portfolio`}
      summary="Validated savings and revenue impact based on enterprise customer implementations with defendable methodology."
      levels={levels}
      className={className}
    />
  )
}