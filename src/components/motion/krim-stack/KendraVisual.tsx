/**
 * Kendra Visual: Neural Network Orchestration
 * Represents the governed runtime as a living neural network where data flows 
 * pulse through interconnected nodes like synapses firing
 */

import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { tabColors, fadeInUp, shouldAnimate, timing, dimensions } from './shared'

interface Node {
  id: string
  x: number
  y: number
  type: 'policy' | 'workflow' | 'data' | 'control'
  active: boolean
}

interface Connection {
  from: string
  to: string
  active: boolean
  flowDirection: 'forward' | 'reverse'
}

const KendraVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const colors = tabColors.kendra
  
  // Define the neural network structure
  const nodes: Node[] = [
    // Policy Layer (top)
    { id: 'policy-1', x: 120, y: 60, type: 'policy', active: true },
    { id: 'policy-2', x: 240, y: 60, type: 'policy', active: false },
    { id: 'policy-3', x: 360, y: 60, type: 'policy', active: true },
    
    // Control Layer (middle-top)
    { id: 'control-1', x: 80, y: 140, type: 'control', active: true },
    { id: 'control-2', x: 200, y: 140, type: 'control', active: true },
    { id: 'control-3', x: 320, y: 140, type: 'control', active: false },
    { id: 'control-4', x: 400, y: 140, type: 'control', active: true },
    
    // Workflow Layer (middle-bottom)
    { id: 'workflow-1', x: 60, y: 220, type: 'workflow', active: true },
    { id: 'workflow-2', x: 180, y: 220, type: 'workflow', active: true },
    { id: 'workflow-3', x: 300, y: 220, type: 'workflow', active: true },
    { id: 'workflow-4', x: 420, y: 220, type: 'workflow', active: false },
    
    // Data Layer (bottom)
    { id: 'data-1', x: 100, y: 300, type: 'data', active: true },
    { id: 'data-2', x: 220, y: 300, type: 'data', active: false },
    { id: 'data-3', x: 340, y: 300, type: 'data', active: true },
  ]

  const connections: Connection[] = [
    // Policy to Control
    { from: 'policy-1', to: 'control-1', active: true, flowDirection: 'forward' },
    { from: 'policy-1', to: 'control-2', active: true, flowDirection: 'forward' },
    { from: 'policy-2', to: 'control-2', active: false, flowDirection: 'forward' },
    { from: 'policy-2', to: 'control-3', active: false, flowDirection: 'forward' },
    { from: 'policy-3', to: 'control-3', active: true, flowDirection: 'forward' },
    { from: 'policy-3', to: 'control-4', active: true, flowDirection: 'forward' },
    
    // Control to Workflow
    { from: 'control-1', to: 'workflow-1', active: true, flowDirection: 'forward' },
    { from: 'control-2', to: 'workflow-1', active: true, flowDirection: 'forward' },
    { from: 'control-2', to: 'workflow-2', active: true, flowDirection: 'forward' },
    { from: 'control-3', to: 'workflow-3', active: false, flowDirection: 'forward' },
    { from: 'control-4', to: 'workflow-3', active: true, flowDirection: 'forward' },
    { from: 'control-4', to: 'workflow-4', active: false, flowDirection: 'forward' },
    
    // Workflow to Data
    { from: 'workflow-1', to: 'data-1', active: true, flowDirection: 'forward' },
    { from: 'workflow-2', to: 'data-1', active: true, flowDirection: 'forward' },
    { from: 'workflow-2', to: 'data-2', active: false, flowDirection: 'forward' },
    { from: 'workflow-3', to: 'data-2', active: false, flowDirection: 'forward' },
    { from: 'workflow-3', to: 'data-3', active: true, flowDirection: 'forward' },
    { from: 'workflow-4', to: 'data-3', active: false, flowDirection: 'forward' },
  ]

  const getNodeStyle = (node: Node) => {
    const baseStyle = "absolute rounded-full border-2 flex items-center justify-center transition-all duration-500"
    
    switch (node.type) {
      case 'policy':
        return `${baseStyle} w-4 h-4 ${node.active 
          ? `bg-emerald-400/30 border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.4)]` 
          : 'bg-white/5 border-white/20'}`
      case 'control':
        return `${baseStyle} w-3 h-3 ${node.active 
          ? `bg-emerald-300/40 border-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.4)]` 
          : 'bg-white/5 border-white/20'}`
      case 'workflow':
        return `${baseStyle} w-3 h-3 ${node.active 
          ? `bg-emerald-200/50 border-emerald-200 shadow-[0_0_8px_rgba(167,243,208,0.4)]` 
          : 'bg-white/5 border-white/20'}`
      case 'data':
        return `${baseStyle} w-2 h-2 ${node.active 
          ? `bg-emerald-100/60 border-emerald-100 shadow-[0_0_6px_rgba(209,250,229,0.4)]` 
          : 'bg-white/5 border-white/20'}`
      default:
        return baseStyle
    }
  }

  const getConnectionPath = (from: Node, to: Node) => {
    const dx = to.x - from.x
    const dy = to.y - from.y
    const midX = from.x + dx * 0.5
    const midY = from.y + dy * 0.3
    
    return `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`
  }

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#10B981" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
      </div>

      {/* Neural Network Container */}
      <div className="relative w-[480px] h-[360px]">
        {/* SVG for connections */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
          
          {connections.map((connection, index) => {
            const fromNode = nodes.find(n => n.id === connection.from)
            const toNode = nodes.find(n => n.id === connection.to)
            
            if (!fromNode || !toNode) return null
            
            return (
              <motion.path
                key={`${connection.from}-${connection.to}`}
                d={getConnectionPath(fromNode, toNode)}
                stroke={connection.active ? "url(#connectionGradient)" : "rgba(255,255,255,0.1)"}
                strokeWidth={connection.active ? "2" : "1"}
                fill="none"
                strokeDasharray={connection.active ? "4 4" : "2 2"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: connection.active ? 1 : 0.3,
                  strokeDashoffset: connection.active ? [0, -8] : 0
                }}
                transition={{ 
                  pathLength: { duration: 0.8, delay: index * 0.1 },
                  opacity: { duration: 0.5, delay: index * 0.1 },
                  strokeDashoffset: connection.active ? {
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  } : {}
                }}
              />
            )
          })}
        </svg>

        {/* Network Nodes */}
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            className={getNodeStyle(node)}
            style={{
              left: `${node.x}px`,
              top: `${node.y}px`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              ...(node.active && shouldAnimate() ? {
                boxShadow: [
                  '0 0 0 0 rgba(16,185,129,0.7)',
                  '0 0 0 8px rgba(16,185,129,0)',
                  '0 0 0 0 rgba(16,185,129,0)'
                ]
              } : {})
            }}
            transition={{ 
              scale: { duration: 0.4, delay: index * 0.05 },
              opacity: { duration: 0.4, delay: index * 0.05 },
              boxShadow: node.active ? {
                duration: 3,
                repeat: Infinity,
                ease: "easeOut"
              } : {}
            }}
          />
        ))}

        {/* Layer Labels */}
        <div className="absolute top-4 left-4 text-xs text-emerald-400/60 font-mono">
          Policy Layer
        </div>
        <div className="absolute top-24 left-4 text-xs text-emerald-300/60 font-mono">
          Control Layer  
        </div>
        <div className="absolute top-44 left-4 text-xs text-emerald-200/60 font-mono">
          Workflow Layer
        </div>
        <div className="absolute bottom-16 left-4 text-xs text-emerald-100/60 font-mono">
          Data Layer
        </div>

        {/* Real-time Metrics (No fake numbers) */}
        <div className="absolute top-4 right-4 space-y-2">
          <div className="text-xs text-white/60 font-mono">
            Runtime Status
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
            <span className="text-xs text-emerald-400 font-mono">ACTIVE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-300"/>
            <span className="text-xs text-emerald-300/80 font-mono">GOVERNED</span>
          </div>
        </div>

        {/* Flow Direction Indicator */}
        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-2 text-xs text-white/40 font-mono">
            <span>Policy</span>
            <div className="flex items-center">
              <motion.div
                className="w-4 h-0.5 bg-gradient-to-r from-emerald-400 to-transparent"
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="w-0 h-0 border-l-2 border-l-emerald-400 border-y-2 border-y-transparent"/>
            </div>
            <span>Execution</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default KendraVisual