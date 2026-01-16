/**
 * Kriya Visual V2: 5 Primitive Types for Safe AI
 * Governance-focused building blocks that control AI actions
 */

import React from 'react'
import { motion } from 'framer-motion'

interface KriyaType {
  name: string
  type: 'action' | 'check' | 'policy' | 'template' | 'data'
  description: string
  kriyas: string[]
  icon: string
  governance: string
  color: string
}

const KriyaVisualV2: React.FC = () => {
  const kriyaTypes: KriyaType[] = [
    {
      name: 'Actions',
      type: 'action',
      description: 'Controlled operations',
      kriyas: ['Send SMS/Email', 'Update Account', 'Create Payment Plan', 'Schedule Callback'],
      icon: '⚡',
      governance: 'Pre-approved operations only',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      name: 'Checks',
      type: 'check', 
      description: 'Validation gates',
      kriyas: ['Verify Customer Status', 'Balance Validation', 'Contact Permissions', 'Dispute Status'],
      icon: '✓',
      governance: 'Every decision verified',
      color: 'from-emerald-500 to-green-500'
    },
    {
      name: 'Policies',
      type: 'policy',
      description: 'Compliance rules',
      kriyas: ['FDCPA Compliance', 'State Regulations', 'Contact Limits', 'Settlement Rules'],
      icon: '⚖️',
      governance: 'Enforced before execution',
      color: 'from-violet-500 to-purple-500'
    },
    {
      name: 'Templates',
      type: 'template',
      description: 'Standardized content',
      kriyas: ['Legal Scripts', 'SMS Messages', 'Email Templates', 'Letter Forms'],
      icon: '📄',
      governance: 'Consistent messaging',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      name: 'Data & Scope',
      type: 'data',
      description: 'Access controls',
      kriyas: ['Role-Based Access', 'State Law Filters', 'PII Protection', 'Audit Logging'],
      icon: '🔒',
      governance: 'Selective data access',
      color: 'from-teal-500 to-cyan-500'
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'action': return 'border-cyan-400/20 hover:border-cyan-400/40 text-cyan-300 hover:text-cyan-200'
      case 'check': return 'border-emerald-400/20 hover:border-emerald-400/40 text-emerald-300 hover:text-emerald-200'
      case 'policy': return 'border-violet-400/20 hover:border-violet-400/40 text-violet-300 hover:text-violet-200'
      case 'template': return 'border-blue-400/20 hover:border-blue-400/40 text-blue-300 hover:text-blue-200'
      case 'data': return 'border-teal-400/20 hover:border-teal-400/40 text-teal-300 hover:text-teal-200'
      default: return 'border-gray-400/20 hover:border-gray-400/40 text-gray-300 hover:text-gray-200'
    }
  }

  return (
    <div className="relative w-full h-full flex flex-col bg-gradient-to-br from-slate-900/90 to-gray-900/90 rounded-xl p-2 sm:p-3 border border-slate-700/30 overflow-hidden">
      {/* Enhanced Header */}
      <div className="w-full flex flex-col items-center justify-center mb-2 flex-shrink-0">
        <h3 className="text-sm sm:text-base font-bold text-white mb-1 text-center">
          <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">Five Primitive Types</span>
        </h3>
        <p className="text-[10px] sm:text-xs text-white/70 font-medium text-center">350+ Kriyas for safe AI deployment</p>
      </div>

      {/* Tight Fit Grid Layout */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="h-full grid grid-rows-5 gap-0.5 sm:gap-1">
          {kriyaTypes.map((kriya, index) => (
            <motion.div
              key={kriya.name}
              className={`group relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 border ${getTypeColor(kriya.type)} rounded-lg p-2 sm:p-2.5 backdrop-blur-sm transition-all duration-500 flex flex-col min-h-0 max-h-full hover:shadow-lg`}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.08, duration: 0.6, ease: "easeOut" }}
            >
              {/* Split Layout: Header Left, Grid Right */}
              <div className="flex items-stretch gap-2 h-full">
                {/* Left Side: Header */}
                <div className="flex-shrink-0 flex items-center gap-2 w-1/3">
                  {/* Animated Icon */}
                  <motion.div 
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-gradient-to-br from-current/20 to-current/8 flex items-center justify-center text-xs sm:text-sm flex-shrink-0 relative"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {kriya.icon}
                    {/* Subtle pulse effect */}
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-current/10"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                  
                  {/* Title & Description */}
                  <div className="flex-1">
                    <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-current transition-colors duration-300 mb-0.5 leading-tight">
                      {kriya.name}
                    </h4>
                    <p className="text-[10px] sm:text-xs text-white/60 group-hover:text-white/80 font-medium leading-tight transition-colors duration-300">{kriya.description}</p>
                  </div>
                </div>
                
                {/* Right Side: Kriyas Grid */}
                <div className="flex-1 grid grid-cols-2 auto-rows-fr gap-1 sm:gap-1.5 p-1 min-h-0 overflow-hidden">
                {kriya.kriyas.map((kriyaItem, idx) => (
                  <div
                    key={idx}
                    className="relative flex items-center justify-center px-2 py-1 sm:px-2.5 sm:py-1.5 bg-gradient-to-br from-slate-700/40 to-slate-800/40 border-2 transition-all duration-300 h-full min-h-[22px] sm:min-h-[28px] group/kriya overflow-hidden w-full max-w-[115px] sm:max-w-[130px] mx-auto rounded-md"
                    style={{
                      borderColor: 'rgba(6, 182, 212, 0.2)',
                      background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)`,
                      boxShadow: `inset 0 0 0 1px rgba(6, 182, 212, 0.15), inset 0 0 0 1px rgba(16, 185, 129, 0.15)`
                    }}
                  >
                    {/* Dynamic border and background on parent hover */}
                    <div 
                      className="absolute inset-0 rounded-md border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ borderColor: `rgb(${kriya.type === 'action' ? '6 182 212' : kriya.type === 'check' ? '16 185 129' : kriya.type === 'policy' ? '139 92 246' : kriya.type === 'template' ? '59 130 246' : '20 184 166'} / 0.6)` }}
                    ></div>
                    <div 
                      className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ 
                        background: `linear-gradient(135deg, rgb(${kriya.type === 'action' ? '6 182 212' : kriya.type === 'check' ? '16 185 129' : kriya.type === 'policy' ? '139 92 246' : kriya.type === 'template' ? '59 130 246' : '20 184 166'} / 0.1) 0%, rgb(${kriya.type === 'action' ? '6 182 212' : kriya.type === 'check' ? '16 185 129' : kriya.type === 'policy' ? '139 92 246' : kriya.type === 'template' ? '59 130 246' : '20 184 166'} / 0.05) 100%)`,
                        boxShadow: `0 4px 20px rgb(${kriya.type === 'action' ? '6 182 212' : kriya.type === 'check' ? '16 185 129' : kriya.type === 'policy' ? '139 92 246' : kriya.type === 'template' ? '59 130 246' : '20 184 166'} / 0.2)`
                      }}
                    ></div>
                    {/* Enhanced edge highlight with animation */}
                    <motion.div 
                      className="absolute inset-0 rounded-md bg-gradient-to-r from-cyan-400/15 via-emerald-400/15 to-cyan-400/15 group-hover:from-current/15 group-hover:via-current/15 group-hover:to-current/15"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    {/* Type card hover highlight */}
                    <div className="absolute inset-0 rounded-md bg-current/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {/* Breathing glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-md bg-gradient-to-r from-cyan-400/5 via-emerald-400/5 to-cyan-400/5 group-hover:from-current/8 group-hover:via-current/8 group-hover:to-current/8"
                      animate={{ opacity: [0.2, 0.4, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    <span className="relative text-[8px] sm:text-[9px] text-white/85 group-hover/kriya:text-white font-medium leading-none text-center z-10 transition-colors duration-300">
                      {kriyaItem}
                    </span>
                  </div>
                ))}
                </div>
              </div>
              
              {/* Enhanced Card Glow */}
              <motion.div 
                className="absolute inset-0 rounded-lg bg-gradient-to-br from-current/8 via-transparent to-current/8 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
              {/* Ambient glow */}
              <motion.div
                className="absolute inset-0 rounded-lg bg-current/3"
                animate={{ opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default KriyaVisualV2