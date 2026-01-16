/**
 * Kriya Visual: Component Forge
 * Building blocks that magnetically snap together forming secure automation chains
 */

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { tabColors, fadeInUp, shouldAnimate, timing } from './shared'

interface Component {
  id: string
  type: 'trigger' | 'action' | 'check' | 'transform'
  name: string
  position: { x: number; y: number }
  connected: boolean
  active: boolean
}

interface Connection {
  from: string
  to: string
  type: 'data' | 'control' | 'compliance'
}

const KriyaVisual: React.FC = () => {
  const colors = tabColors.kriya
  const [assembledChain, setAssembledChain] = useState(false)

  const components: Component[] = [
    {
      id: 'trigger-1',
      type: 'trigger',
      name: 'Account\nOverdue',
      position: { x: 60, y: 100 },
      connected: false,
      active: true
    },
    {
      id: 'check-1',
      type: 'check',
      name: 'FDCPA\nValidation',
      position: { x: 180, y: 80 },
      connected: false,
      active: true
    },
    {
      id: 'transform-1',
      type: 'transform',
      name: 'Message\nPersonalize',
      position: { x: 300, y: 100 },
      connected: false,
      active: true
    },
    {
      id: 'action-1',
      type: 'action',
      name: 'Send\nReminder',
      position: { x: 420, y: 120 },
      connected: false,
      active: true
    },
    // Available components
    {
      id: 'check-2',
      type: 'check',
      name: 'TCPA\nConsent',
      position: { x: 100, y: 220 },
      connected: false,
      active: false
    },
    {
      id: 'transform-2',
      type: 'transform',
      name: 'Compliance\nLog',
      position: { x: 220, y: 240 },
      connected: false,
      active: false
    },
    {
      id: 'action-2',
      type: 'action',
      name: 'Schedule\nCallback',
      position: { x: 340, y: 220 },
      connected: false,
      active: false
    }
  ]

  const connections: Connection[] = [
    { from: 'trigger-1', to: 'check-1', type: 'control' },
    { from: 'check-1', to: 'transform-1', type: 'compliance' },
    { from: 'transform-1', to: 'action-1', type: 'data' },
  ]

  const getComponentStyle = (component: Component) => {
    const isActive = component.active || assembledChain
    
    switch (component.type) {
      case 'trigger':
        return {
          bg: isActive ? 'bg-emerald-500/20' : 'bg-gray-600/20',
          border: isActive ? 'border-emerald-400' : 'border-gray-500',
          text: isActive ? 'text-emerald-300' : 'text-gray-400',
          glow: isActive ? 'shadow-[0_0_12px_rgba(16,185,129,0.4)]' : '',
          icon: '⚡'
        }
      case 'check':
        return {
          bg: isActive ? 'bg-blue-500/20' : 'bg-gray-600/20',
          border: isActive ? 'border-blue-400' : 'border-gray-500',
          text: isActive ? 'text-blue-300' : 'text-gray-400',
          glow: isActive ? 'shadow-[0_0_12px_rgba(59,130,246,0.4)]' : '',
          icon: '✓'
        }
      case 'transform':
        return {
          bg: isActive ? 'bg-purple-500/20' : 'bg-gray-600/20',
          border: isActive ? 'border-purple-400' : 'border-gray-500',
          text: isActive ? 'text-purple-300' : 'text-gray-400',
          glow: isActive ? 'shadow-[0_0_12px_rgba(147,51,234,0.4)]' : '',
          icon: '⚡'
        }
      case 'action':
        return {
          bg: isActive ? 'bg-amber-500/20' : 'bg-gray-600/20',
          border: isActive ? 'border-amber-400' : 'border-gray-500',
          text: isActive ? 'text-amber-300' : 'text-gray-400',
          glow: isActive ? 'shadow-[0_0_12px_rgba(245,158,11,0.4)]' : '',
          icon: '⚙'
        }
      default:
        return {
          bg: 'bg-gray-600/20',
          border: 'border-gray-500',
          text: 'text-gray-400',
          glow: '',
          icon: '○'
        }
    }
  }

  const getConnectionColor = (type: string) => {
    switch (type) {
      case 'data': return '#F59E0B'
      case 'control': return '#10B981' 
      case 'compliance': return '#3B82F6'
      default: return '#6B7280'
    }
  }

  const assembleChain = () => {
    setAssembledChain(true)
    setTimeout(() => setAssembledChain(false), 4000)
  }

  React.useEffect(() => {
    const interval = setInterval(assembleChain, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      {/* Background Circuit Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full">
          <defs>
            <pattern id="circuit" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M40,0 L40,40 L0,40" fill="none" stroke="#F59E0B" strokeWidth="0.5"/>
              <path d="M40,40 L80,40 L80,80" fill="none" stroke="#F59E0B" strokeWidth="0.5"/>
              <circle cx="40" cy="40" r="2" fill="#F59E0B" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)"/>
        </svg>
      </div>

      {/* Component Forge */}
      <div className="relative w-[500px] h-[320px]">
        
        {/* Assembly Connections */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            {connections.map((connection) => (
              <linearGradient 
                key={`gradient-${connection.from}-${connection.to}`}
                id={`connectionGradient-${connection.from}-${connection.to}`} 
                x1="0%" y1="0%" x2="100%" y2="0%"
              >
                <stop offset="0%" stopColor={getConnectionColor(connection.type)} stopOpacity="0.8"/>
                <stop offset="100%" stopColor={getConnectionColor(connection.type)} stopOpacity="0.3"/>
              </linearGradient>
            ))}
          </defs>
          
          {connections.map((connection, index) => {
            const fromComponent = components.find(c => c.id === connection.from)
            const toComponent = components.find(c => c.id === connection.to)
            
            if (!fromComponent || !toComponent) return null
            
            const isActive = assembledChain || (fromComponent.active && toComponent.active)
            
            return (
              <motion.line
                key={`${connection.from}-${connection.to}`}
                x1={fromComponent.position.x + 40}
                y1={fromComponent.position.y + 20}
                x2={toComponent.position.x + 40}
                y2={toComponent.position.y + 20}
                stroke={isActive ? `url(#connectionGradient-${connection.from}-${connection.to})` : '#6B7280'}
                strokeWidth={isActive ? "3" : "1"}
                strokeDasharray={isActive ? "6 6" : "2 2"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: isActive ? 1 : 0.5, 
                  opacity: isActive ? 1 : 0.3,
                  strokeDashoffset: isActive ? [0, -12] : 0
                }}
                transition={{ 
                  pathLength: { duration: 0.8, delay: index * 0.2 + (assembledChain ? 0.5 : 0) },
                  opacity: { duration: 0.5 },
                  strokeDashoffset: isActive ? {
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  } : {}
                }}
              />
            )
          })}
        </svg>

        {/* Components */}
        {components.map((component, index) => {
          const style = getComponentStyle(component)
          
          return (
            <motion.div
              key={component.id}
              className={`
                absolute w-20 h-10 rounded-lg ${style.bg} ${style.border} 
                border-2 flex flex-col items-center justify-center cursor-pointer
                backdrop-blur-sm transition-all duration-500 ${style.glow} group
              `}
              style={{
                left: `${component.position.x}px`,
                top: `${component.position.y}px`,
              }}
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotate: 0,
                y: assembledChain && component.active ? [0, -2, 0] : 0
              }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              {/* Component Icon */}
              <div className={`text-lg ${style.text} mb-0.5`}>
                {style.icon}
              </div>
              
              {/* Component Name */}
              <div className={`text-xs ${style.text} font-mono text-center leading-tight`}>
                {component.name.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>

              {/* Magnetic Field Effect (when assembling) */}
              <AnimatePresence>
                {assembledChain && component.active && (
                  <motion.div
                    className={`absolute inset-0 rounded-lg border-2 ${style.border}`}
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ scale: 1.3, opacity: [0, 0.5, 0] }}
                    exit={{ scale: 1, opacity: 0 }}
                    transition={{ duration: 1, repeat: 3 }}
                  />
                )}
              </AnimatePresence>

              {/* Compliance Shield (for check components) */}
              {component.type === 'check' && (component.active || assembledChain) && (
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500/20 border border-blue-400 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-xs text-blue-300">🛡</span>
                </motion.div>
              )}
            </motion.div>
          )
        })}

        {/* Component Palette */}
        <motion.div
          className="absolute bottom-4 left-0 right-0 h-12 bg-gradient-to-r from-amber-500/10 to-orange-600/5 border border-amber-400/30 rounded-xl backdrop-blur-sm"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="flex items-center justify-center gap-6 h-full px-4">
            <div className="flex items-center gap-2">
              <span className="text-emerald-300 text-lg">⚡</span>
              <span className="text-xs text-emerald-300 font-mono">Triggers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-300 text-lg">✓</span>
              <span className="text-xs text-blue-300 font-mono">Checks</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-300 text-lg">⚡</span>
              <span className="text-xs text-purple-300 font-mono">Transforms</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-300 text-lg">⚙</span>
              <span className="text-xs text-amber-300 font-mono">Actions</span>
            </div>
          </div>
        </motion.div>

        {/* Assembly Status */}
        <motion.div
          className="absolute top-4 right-4 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-emerald-400"
              animate={{ 
                scale: assembledChain ? [1, 1.2, 1] : 1,
                opacity: assembledChain ? [1, 0.5, 1] : 1
              }}
              transition={{ duration: 1, repeat: assembledChain ? Infinity : 0 }}
            />
            <span className="text-xs text-emerald-300 font-mono">
              {assembledChain ? 'Assembling' : 'Ready'}
            </span>
          </div>
        </motion.div>

        {/* Flow Visualization */}
        <AnimatePresence>
          {assembledChain && (
            <motion.div
              className="absolute top-4 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="flex items-center gap-2 text-xs text-white/60 font-mono">
                <span>Compliance Flow Active</span>
                <motion.div
                  className="w-3 h-0.5 bg-gradient-to-r from-amber-400 to-transparent"
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Forge Label */}
        <div className="absolute top-4 left-4 text-xs text-amber-400/60 font-mono">
          COMPONENT FORGE
        </div>
      </div>
    </motion.div>
  )
}

export default KriyaVisual