/**
 * KRIM AI - ROI DISCLOSURE COMPONENT
 * Professional ROI transparency for enterprise credibility
 * Compliance with financial accuracy standards
 */

import React from 'react'
import { motion } from 'framer-motion'
import { Info } from '@phosphor-icons/react'

interface ROIDisclosureProps {
  className?: string
  compact?: boolean
  scenarios?: {
    conservative: string
    moderate: string 
    optimistic: string
  }
}

export const ROIDisclosure: React.FC<ROIDisclosureProps> = ({
  className = '',
  compact = false,
  scenarios = {
    conservative: "2900%",
    moderate: "4200%", 
    optimistic: "5900%"
  }
}) => {
  const baseClasses = [
    "bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5",
    compact && "p-3",
    className
  ].filter(Boolean).join(' ')

  return (
    <motion.div
      className={baseClasses}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Info size={16} className="text-krim-mint flex-shrink-0" />
        <span className="text-sm font-semibold text-white">ROI Methodology</span>
      </div>
      
      {!compact && (
        <div className="ml-6">
          <p className="text-sm text-white mb-4 leading-relaxed">
            ROI calculations based on validated performance data from 50+ financial institution deployments. 
            Results vary by portfolio size, current collection rates, and implementation scope.
          </p>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center p-3 bg-krim-mint/5 border border-krim-mint/10 rounded-lg">
              <span className="text-xs font-medium text-white">Conservative:</span>
              <span className="text-xs font-bold text-krim-mint">{scenarios.conservative} ROI</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-krim-mint/5 border border-krim-mint/10 rounded-lg">
              <span className="text-xs font-medium text-white">Moderate:</span>
              <span className="text-xs font-bold text-krim-mint">{scenarios.moderate} ROI</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-krim-mint/5 border border-krim-mint/10 rounded-lg">
              <span className="text-xs font-medium text-white">Optimistic:</span>
              <span className="text-xs font-bold text-krim-mint">{scenarios.optimistic} ROI</span>
            </div>
          </div>
          
          <div className="pt-3 border-t border-white/10">
            <span className="text-xs text-white italic leading-relaxed">
              Past performance does not guarantee future results. ROI subject to implementation quality and market conditions.
            </span>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default ROIDisclosure