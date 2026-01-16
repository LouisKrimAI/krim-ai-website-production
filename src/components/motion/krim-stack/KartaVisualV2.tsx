/**
 * Karta Visual V2: Multi-Modal AI Coworkers
 * Comprehensive agent showcase across business functions
 */

import React from 'react'
import { motion } from 'framer-motion'

interface Agent {
  id: string
  name: string
  category: 'contact-center' | 'back-office' | 'ai-studio'
  status: 'active' | 'busy' | 'idle'
  description: string
  icon: string
}

const KartaVisualV2: React.FC = () => {
  const agents: Agent[] = [
    // Contact Center Agents (4)
    {
      id: 'early-collections',
      name: 'Early Collections',
      category: 'contact-center',
      status: 'busy',
      description: 'Delinquency',
      icon: '🎯'
    },
    {
      id: 'cross-sell',
      name: 'Cross-Sell Agent', 
      category: 'contact-center',
      status: 'active',
      description: 'Upselling',
      icon: '💎'
    },
    {
      id: 'onboarding-kyc',
      name: 'Onboarding - KYC',
      category: 'contact-center',
      status: 'active',
      description: 'Verification',
      icon: '🛡️'
    },
    {
      id: 'recovery',
      name: 'Recovery Agent',
      category: 'contact-center',
      status: 'busy',
      description: 'Settlement',
      icon: '⚡'
    },
    
    // Back-Office Agents (4)
    {
      id: 'doc-processor',
      name: 'Doc Processor',
      category: 'back-office',
      status: 'busy',
      description: 'Paperwork',
      icon: '📋'
    },
    {
      id: 'compliance-auditor',
      name: 'Compliance',
      category: 'back-office',
      status: 'active',
      description: 'Auditing',
      icon: '🛡️'
    },
    {
      id: 'payment-processor',
      name: 'Payments',
      category: 'back-office',
      status: 'active',
      description: 'Processing',
      icon: '💳'
    },
    {
      id: 'data-analyst',
      name: 'Analytics',
      category: 'back-office',
      status: 'active',
      description: 'Reporting',
      icon: '📊'
    },
    
    // AI Studio Agents (2)
    {
      id: 'agent-builder',
      name: 'Agent Builder',
      category: 'ai-studio',
      status: 'active',
      description: 'Creation',
      icon: '🤖'
    },
    {
      id: 'workflow-designer',
      name: 'Workflow Designer',
      category: 'ai-studio',
      status: 'active',
      description: 'Automation',
      icon: '⚙️'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-400'
      case 'busy': return 'bg-yellow-400' 
      case 'idle': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'contact-center': return 'border-violet-400/40 bg-violet-500/10'
      case 'back-office': return 'border-cyan-400/40 bg-cyan-500/10'
      case 'ai-studio': return 'border-emerald-400/40 bg-emerald-500/10'
      default: return 'border-gray-400/40 bg-gray-500/10'
    }
  }

  const renderAgentCard = (agent: Agent) => (
    <motion.div
      key={agent.id}
      className={`p-2 rounded-lg border ${getCategoryColor(agent.category)} backdrop-blur-sm hover:scale-105 transition-all duration-300`}
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <div className="text-sm">{agent.icon}</div>
        <div>
          <h4 className="text-xs font-semibold text-white">{agent.name}</h4>
          <p className="text-xs text-white/60 leading-tight">{agent.description}</p>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900/90 to-gray-900/90 rounded-xl p-4">
      <div className="w-full h-full flex flex-col">
        
        
        {/* Contact Center Section */}
        <div className="flex-1 border-b border-white/10 pb-2 mb-2">
          <div className="text-center mb-2">
            <h4 className="text-xs font-semibold text-violet-300">Contact Center</h4>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {agents.filter(agent => agent.category === 'contact-center').map(renderAgentCard)}
          </div>
        </div>

        {/* Back-Office Section */}
        <div className="flex-1 border-b border-white/10 pb-2 mb-2">
          <div className="text-center mb-2">
            <h4 className="text-xs font-semibold text-cyan-300">Back-Office</h4>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {agents.filter(agent => agent.category === 'back-office').map(renderAgentCard)}
          </div>
        </div>

        {/* AI Studio Section */}
        <div className="flex-1">
          <div className="text-center mb-2">
            <h4 className="text-xs font-semibold text-emerald-300">AI Studio</h4>
          </div>
          
          <div className="grid grid-cols-2 gap-1.5">
            {agents.filter(agent => agent.category === 'ai-studio').map(renderAgentCard)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default KartaVisualV2