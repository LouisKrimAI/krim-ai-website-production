/**
 * Karta Visual: AI Agent Orchestra
 * Shows specialized AI agents working in synchronized harmony 
 * like an elite operations center
 */

import React from 'react'
import { motion } from 'framer-motion'
import { tabColors, fadeInUp, shouldAnimate, timing } from './shared'

interface Agent {
  id: string
  name: string
  role: string
  status: 'active' | 'idle' | 'processing'
  position: { x: number; y: number }
  specialization: string
  currentTask?: string
}

const KartaVisual: React.FC = () => {
  const colors = tabColors.karta

  const agents: Agent[] = [
    {
      id: 'kim-early',
      name: 'Kim Early',
      role: 'Early Stage Collections',
      status: 'active',
      position: { x: 100, y: 80 },
      specialization: 'Payment Arrangements',
      currentTask: 'Crafting payment plan proposal'
    },
    {
      id: 'negotiator',
      name: 'The Negotiator',
      role: 'Settlement Specialist',
      status: 'processing',
      position: { x: 300, y: 80 },
      specialization: 'Dispute Resolution',
      currentTask: 'Analyzing settlement options'
    },
    {
      id: 'kim-connect',
      name: 'Kim Connect',
      role: 'Customer Engagement',
      status: 'active',
      position: { x: 100, y: 220 },
      specialization: 'Retention & Cross-sell',
      currentTask: 'Identifying retention opportunity'
    },
    {
      id: 'nudger',
      name: 'The Nudger',
      role: 'Gentle Reminders',
      status: 'idle',
      position: { x: 300, y: 220 },
      specialization: 'Payment Reminders',
    }
  ]

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return { 
          bg: 'bg-violet-500/20', 
          border: 'border-violet-400', 
          glow: 'shadow-[0_0_16px_rgba(139,92,246,0.4)]',
          text: 'text-violet-300'
        }
      case 'processing':
        return { 
          bg: 'bg-amber-500/20', 
          border: 'border-amber-400', 
          glow: 'shadow-[0_0_16px_rgba(245,158,11,0.4)]',
          text: 'text-amber-300'
        }
      case 'idle':
        return { 
          bg: 'bg-slate-500/10', 
          border: 'border-slate-400/40', 
          glow: '',
          text: 'text-slate-400'
        }
      default:
        return { 
          bg: 'bg-white/5', 
          border: 'border-white/20', 
          glow: '',
          text: 'text-white/60'
        }
    }
  }

  const collaborationConnections = [
    { from: 'kim-early', to: 'negotiator', type: 'data-sharing' },
    { from: 'kim-connect', to: 'kim-early', type: 'handoff' },
    { from: 'nudger', to: 'kim-early', type: 'escalation' },
  ]

  const getAgentById = (id: string) => agents.find(agent => agent.id === id)

  return (
    <motion.div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      {/* Background Network */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full">
          <defs>
            <pattern id="hexGrid" width="60" height="52" patternUnits="userSpaceOnUse">
              <path d="M30,2 L50,17 L50,35 L30,50 L10,35 L10,17 Z" fill="none" stroke="#8B5CF6" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexGrid)"/>
        </svg>
      </div>

      {/* Agent Orchestra */}
      <div className="relative w-[420px] h-[320px]">
        
        {/* Collaboration Lines */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="collaborationGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6"/>
              <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.6"/>
            </linearGradient>
          </defs>
          
          {collaborationConnections.map((connection, index) => {
            const fromAgent = getAgentById(connection.from)
            const toAgent = getAgentById(connection.to)
            
            if (!fromAgent || !toAgent) return null
            
            return (
              <motion.line
                key={`${connection.from}-${connection.to}`}
                x1={fromAgent.position.x + 40}
                y1={fromAgent.position.y + 40}
                x2={toAgent.position.x + 40}
                y2={toAgent.position.y + 40}
                stroke="url(#collaborationGradient)"
                strokeWidth="2"
                strokeDasharray="6 6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: 0.7,
                }}
                transition={{ 
                  pathLength: { duration: 1, delay: index * 0.3 + 0.5 },
                  opacity: { duration: 0.5, delay: index * 0.3 + 0.5 }
                }}
              />
            )
          })}
        </svg>

        {/* AI Agents */}
        {agents.map((agent, index) => {
          const statusStyle = getAgentStatusColor(agent.status)
          
          return (
            <motion.div
              key={agent.id}
              className="absolute group"
              style={{
                left: `${agent.position.x}px`,
                top: `${agent.position.y}px`,
                width: '80px',
                height: '100px'
              }}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
            >
              {/* Agent Avatar */}
              <motion.div
                className={`
                  relative w-16 h-16 rounded-xl ${statusStyle.bg} ${statusStyle.border} 
                  border-2 flex items-center justify-center mx-auto mb-2 backdrop-blur-sm
                  ${statusStyle.glow} transition-all duration-500
                `}
                whileHover={{ scale: 1.05 }}
              >
                {/* Agent Icon/Initial */}
                <div className={`text-xl font-bold ${statusStyle.text}`}>
                  {agent.name.split(' ').map(n => n[0]).join('')}
                </div>
                
                {/* Status Indicator */}
                <motion.div
                  className={`absolute -top-2 -right-2 w-4 h-4 rounded-full border-2 border-gray-900 ${
                    agent.status === 'active' ? 'bg-emerald-400' :
                    agent.status === 'processing' ? 'bg-amber-400' :
                    'bg-slate-400'
                  }`}
                  animate={agent.status === 'active' ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Processing Animation */}
                {agent.status === 'processing' && (
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-amber-400/50"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </motion.div>

              {/* Agent Info */}
              <div className="text-center">
                <div className="text-xs font-semibold text-white mb-1">
                  {agent.name}
                </div>
                <div className="text-xs text-white/60 font-mono">
                  {agent.specialization}
                </div>
              </div>

              {/* Current Task Indicator */}
              {agent.currentTask && (
                <motion.div
                  className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-violet-400/60 to-transparent"
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              {/* Hover Tooltip */}
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-32 p-2 bg-gray-900/90 border border-violet-400/30 rounded-lg text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                <div className="font-semibold text-violet-300">{agent.role}</div>
                {agent.currentTask && (
                  <div className="text-white/80 mt-1">{agent.currentTask}</div>
                )}
              </div>
            </motion.div>
          )
        })}

        {/* Orchestra Control Panel */}
        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-80 h-16 bg-gradient-to-r from-violet-500/10 to-violet-600/5 border border-violet-400/30 rounded-xl backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
              <span className="text-xs text-white font-mono">Orchestra Active</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-violet-300 font-mono">Coordination</span>
                <div className="w-8 h-1 bg-violet-400/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-violet-400"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-300 font-mono">Compliance</span>
                <div className="w-2 h-2 rounded-full bg-emerald-400"/>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          className="absolute top-4 right-4 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="text-xs text-violet-300/80 font-mono">Agent Status</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400"/>
              <span className="text-xs text-emerald-300 font-mono">Active: 2</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-400"/>
              <span className="text-xs text-amber-300 font-mono">Processing: 1</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-slate-400"/>
              <span className="text-xs text-slate-400 font-mono">Idle: 1</span>
            </div>
          </div>
        </motion.div>

        {/* Coordination Label */}
        <div className="absolute top-4 left-4 text-xs text-violet-400/60 font-mono">
          AI Agent Orchestra
        </div>
      </div>
    </motion.div>
  )
}

export default KartaVisual