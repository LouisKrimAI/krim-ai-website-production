/**
 * Kendra Visual V3: Credit Servicing Operating System
 * Central intelligence orchestrating the complete credit lifecycle
 */

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface SecurityLayer {
  id: string
  name: string
  radius: number
  active: boolean
  color: string
}

interface CreditSystem {
  id: string
  name: string
  angle: number
  radius: number
  status: 'active' | 'secure' | 'processing'
  description: string
}

interface OrchestrationFlow {
  id: string
  from: { x: number; y: number }
  to: { x: number; y: number }
  active: boolean
}

const KendraVisualV2: React.FC = () => {
  const centerX = 273
  const centerY = 220

  const [securityLayers] = useState<SecurityLayer[]>([
    { id: 'inner', name: 'Core Security', radius: 70, active: true, color: '#10B981' },
    { id: 'middle', name: 'Validation Layer', radius: 120, active: true, color: '#3B82F6' },
    { id: 'outer', name: 'Access Control', radius: 170, active: true, color: '#8B5CF6' }
  ])

  const [creditSystems] = useState<CreditSystem[]>([
    { 
      id: 'decision-engine', 
      name: 'Decision Engine', 
      angle: 0, 
      radius: 200, 
      status: 'processing',
      description: 'AI decision engine'
    },
    { 
      id: 'servicing', 
      name: 'Servicing Hub', 
      angle: 60, 
      radius: 200, 
      status: 'active',
      description: 'Payment processing & account management'
    },
    { 
      id: 'recovery-systems', 
      name: 'Recovery Systems', 
      angle: 120, 
      radius: 200, 
      status: 'active',
      description: 'Recovery workflows'
    },
    { 
      id: 'compliance', 
      name: 'Compliance Monitor', 
      angle: 180, 
      radius: 200, 
      status: 'secure',
      description: 'Regulatory oversight & risk management'
    },
    { 
      id: 'risk-assessment', 
      name: 'Risk Assessment', 
      angle: 240, 
      radius: 200, 
      status: 'processing',
      description: 'Risk evaluation'
    },
    { 
      id: 'data-intelligence', 
      name: 'Data Intelligence', 
      angle: 300, 
      radius: 200, 
      status: 'active',
      description: 'Data insights'
    }
  ])

  const [orchestrationFlows, setOrchestrationFlows] = useState<OrchestrationFlow[]>([])
  const [systemStatus, setSystemStatus] = useState<'SECURE' | 'ORCHESTRATING' | 'PROCESSING'>('SECURE')

  useEffect(() => {
    // Generate orchestration flows from center to credit systems
    const flows: OrchestrationFlow[] = creditSystems.map(system => {
      const systemX = centerX + Math.cos((system.angle * Math.PI) / 180) * system.radius
      const systemY = centerY + Math.sin((system.angle * Math.PI) / 180) * system.radius
      
      return {
        id: `flow-${system.id}`,
        from: { x: centerX, y: centerY },
        to: { x: systemX, y: systemY },
        active: Math.random() > 0.3
      }
    })
    
    setOrchestrationFlows(flows)

    // Animate orchestration
    const interval = setInterval(() => {
      setOrchestrationFlows(prev => prev.map(flow => ({
        ...flow,
        active: Math.random() > 0.25
      })))
      
      setSystemStatus(prev => {
        const statuses: Array<'SECURE' | 'ORCHESTRATING' | 'PROCESSING'> = ['SECURE', 'ORCHESTRATING', 'PROCESSING']
        const currentIndex = statuses.indexOf(prev)
        return statuses[(currentIndex + 1) % statuses.length]
      })
    }, 2800)

    return () => clearInterval(interval)
  }, [creditSystems])

  const getSystemPosition = (system: CreditSystem) => {
    const x = centerX + Math.cos((system.angle * Math.PI) / 180) * system.radius
    const y = centerY + Math.sin((system.angle * Math.PI) / 180) * system.radius
    return { x, y }
  }

  const getSystemColor = (status: string) => {
    switch (status) {
      case 'active': return 'border-blue-400 bg-blue-500/20 text-blue-300'
      case 'secure': return 'border-green-400 bg-green-500/20 text-green-300'
      case 'processing': return 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
      default: return 'border-gray-400 bg-gray-500/20 text-gray-300'
    }
  }

  const getStatusColor = () => {
    switch (systemStatus) {
      case 'SECURE': return 'text-green-300'
      case 'ORCHESTRATING': return 'text-cyan-300'
      case 'PROCESSING': return 'text-blue-300'
      default: return 'text-gray-300'
    }
  }

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-gradient-to-br from-slate-900/90 to-gray-900/90 rounded-xl">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 z-10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-3 h-3 rounded-full bg-emerald-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-sm font-bold text-emerald-300">Intelligence Runtime</span>
        </div>
        <div className="text-xs font-mono">
          Status: <span className={getStatusColor()}>{systemStatus}</span>
        </div>
      </div>

      {/* Orchestration Container */}
      <div className="relative flex-1 flex items-center justify-center">
        
        {/* Security Layers (SVG Rings) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {securityLayers.map((layer, index) => (
            <g key={layer.id}>
              {/* Security Ring */}
              <motion.circle
                cx={centerX}
                cy={centerY}
                r={layer.radius}
                fill="none"
                stroke={layer.color}
                strokeWidth="2"
                strokeOpacity="0.3"
                strokeDasharray="5,5"
                animate={{ 
                  strokeOpacity: [0.2, 0.6, 0.2],
                  rotate: [0, 360]
                }}
                transition={{ 
                  strokeOpacity: { duration: 3, repeat: Infinity },
                  rotate: { duration: 25 + index * 8, repeat: Infinity, ease: "linear" }
                }}
                style={{ transformOrigin: `${centerX}px ${centerY}px` }}
              />
              
              {/* Security Gates */}
              {[0, 90, 180, 270].map(angle => {
                const gateX = centerX + Math.cos((angle * Math.PI) / 180) * layer.radius
                const gateY = centerY + Math.sin((angle * Math.PI) / 180) * layer.radius
                return (
                  <motion.circle
                    key={`gate-${layer.id}-${angle}`}
                    cx={gateX}
                    cy={gateY}
                    r="4"
                    fill={layer.color}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: angle / 90 * 0.5 }}
                  />
                )
              })}
            </g>
          ))}
        </svg>

        {/* Orchestration Flows */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {orchestrationFlows.map((flow) => (
            <g key={flow.id}>
              {/* Command Flow Line */}
              <motion.line
                x1={flow.from.x}
                y1={flow.from.y}
                x2={flow.to.x}
                y2={flow.to.y}
                stroke={flow.active ? "#06B6D4" : "#06B6D440"}
                strokeWidth={flow.active ? 3 : 1}
                strokeLinecap="round"
                animate={{
                  opacity: flow.active ? [0.3, 1, 0.3] : 0.1
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Orchestration Signal */}
              {flow.active && (
                <motion.circle
                  cx={flow.from.x}
                  cy={flow.from.y}
                  r="3"
                  fill="#06B6D4"
                  animate={{
                    cx: [flow.from.x, flow.to.x],
                    cy: [flow.from.y, flow.to.y],
                    scale: [1, 0.5, 1]
                  }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                />
              )}
            </g>
          ))}
        </svg>

        {/* Central Kendra Core */}
        <motion.div
          className="absolute"
          style={{ 
            left: centerX - 60, 
            top: centerY - 60,
            width: 120,
            height: 120
          }}
          animate={{
            boxShadow: [
              "0 0 30px rgba(16, 185, 129, 0.4)",
              "0 0 60px rgba(16, 185, 129, 0.8)",
              "0 0 30px rgba(16, 185, 129, 0.4)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="w-full h-full rounded-full border-4 border-emerald-400 bg-gradient-to-br from-emerald-400/30 to-green-400/30 backdrop-blur-sm flex flex-col items-center justify-center">
            {/* Core Intelligence */}
            <motion.div
              className="w-10 h-10 rounded-full bg-emerald-400"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <div className="text-center mt-2">
              <div className="text-sm font-bold text-emerald-300 leading-tight">Kendra</div>
              <div className="text-xs text-emerald-200/60">Core</div>
            </div>
          </div>
        </motion.div>

        {/* Credit Systems */}
        {creditSystems.map((system) => {
          const position = getSystemPosition(system)
          return (
            <motion.div
              key={system.id}
              className="absolute"
              style={{ 
                left: position.x - 45, 
                top: position.y - 35,
                width: 90,
                height: 70
              }}
              whileHover={{ scale: 1.05 }}
              animate={{
                boxShadow: `0 0 25px ${system.status === 'active' ? 'rgba(59, 130, 246, 0.4)' : 
                                      system.status === 'secure' ? 'rgba(16, 185, 129, 0.4)' : 
                                      'rgba(6, 182, 212, 0.4)'}`
              }}
            >
              <div className={`w-full h-full rounded-lg border-2 backdrop-blur-sm ${getSystemColor(system.status)} flex flex-col items-center justify-center transition-all duration-300 p-2`}>
                {/* System Core */}
                <motion.div
                  className="w-4 h-4 rounded-full bg-current mb-1"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* System Name */}
                <div className="text-center">
                  <div className="font-bold text-white text-xs leading-tight">{system.name}</div>
                </div>
              </div>

            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default KendraVisualV2