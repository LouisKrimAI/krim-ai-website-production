/**
 * Kupa Visual: Holographic Command Center
 * Multi-layered holographic dashboard with depth and real-time data streams
 */

import React from 'react'
import { motion } from 'framer-motion'
import { tabColors, fadeInUp, shouldAnimate, timing } from './shared'

interface DataLayer {
  id: string
  name: string
  z: number
  opacity: number
  color: string
  metrics: Array<{
    label: string
    value: string
    trend: 'up' | 'down' | 'stable'
    status: 'normal' | 'warning' | 'critical'
  }>
}

const KupaVisual: React.FC = () => {
  const colors = tabColors.kupa

  const dataLayers: DataLayer[] = [
    {
      id: 'operational',
      name: 'Operational Layer',
      z: 0,
      opacity: 1,
      color: 'teal',
      metrics: [
        { label: 'Active Workflows', value: 'Processing', trend: 'stable', status: 'normal' },
        { label: 'Queue Status', value: 'Optimal', trend: 'up', status: 'normal' },
        { label: 'Response Time', value: '<2s', trend: 'stable', status: 'normal' }
      ]
    },
    {
      id: 'compliance',
      name: 'Compliance Layer', 
      z: 1,
      opacity: 0.8,
      color: 'emerald',
      metrics: [
        { label: 'Policy Checks', value: 'All Passed', trend: 'stable', status: 'normal' },
        { label: 'Audit Trail', value: 'Complete', trend: 'stable', status: 'normal' },
        { label: 'Violations', value: 'None', trend: 'stable', status: 'normal' }
      ]
    },
    {
      id: 'performance',
      name: 'Performance Layer',
      z: 2, 
      opacity: 0.6,
      color: 'cyan',
      metrics: [
        { label: 'Success Rate', value: 'Tracking', trend: 'up', status: 'normal' },
        { label: 'Agent Load', value: 'Balanced', trend: 'stable', status: 'normal' },
        { label: 'Throughput', value: 'Optimal', trend: 'up', status: 'normal' }
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-emerald-400'
      case 'warning': return 'text-amber-400'
      case 'critical': return 'text-red-400'
      default: return 'text-white/60'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗'
      case 'down': return '↘'
      case 'stable': return '→'
      default: return '→'
    }
  }

  const layerZTransforms = [0, -20, -40]
  const layerBlurs = ['blur-none', 'backdrop-blur-[0.5px]', 'backdrop-blur-sm']

  return (
    <motion.div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      initial="initial"
      animate="animate"
      variants={fadeInUp}
      style={{ perspective: '1000px' }}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="commandGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <rect width="30" height="30" fill="none" stroke="#14B8A6" strokeWidth="0.5"/>
              <circle cx="15" cy="15" r="1" fill="#14B8A6" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#commandGrid)"/>
        </svg>
      </div>

      {/* Command Center Container */}
      <div className="relative w-[480px] h-[360px]" style={{ transformStyle: 'preserve-3d' }}>
        
        {/* Holographic Data Layers */}
        {dataLayers.map((layer, index) => (
          <motion.div
            key={layer.id}
            className={`
              absolute inset-0 rounded-lg border backdrop-blur-sm
              ${layer.color === 'teal' ? 'border-teal-400/30 bg-teal-500/10' :
                layer.color === 'emerald' ? 'border-emerald-400/30 bg-emerald-500/10' :
                'border-cyan-400/30 bg-cyan-500/10'}
            `}
            initial={{ 
              opacity: 0, 
              rotateX: -15,
              z: layerZTransforms[index],
              scale: 0.9
            }}
            animate={{ 
              opacity: layer.opacity, 
              rotateX: 0,
              z: layerZTransforms[index],
              scale: 1
            }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.3,
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
            style={{
              transformStyle: 'preserve-3d',
              transform: `translateZ(${layerZTransforms[index]}px) rotateX(${index * 2}deg)`
            }}
          >
            {/* Layer Header */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
              <h3 className={`text-sm font-bold ${
                layer.color === 'teal' ? 'text-teal-300' :
                layer.color === 'emerald' ? 'text-emerald-300' :
                'text-cyan-300'
              }`}>
                {layer.name}
              </h3>
              <div className="flex items-center gap-2">
                <motion.div
                  className={`w-2 h-2 rounded-full ${
                    layer.color === 'teal' ? 'bg-teal-400' :
                    layer.color === 'emerald' ? 'bg-emerald-400' :
                    'bg-cyan-400'
                  }`}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                />
                <span className="text-xs font-mono text-white/60">LIVE</span>
              </div>
            </div>

            {/* Layer Content */}
            <div className="absolute top-16 left-4 right-4 bottom-4">
              <div className="grid grid-cols-1 gap-3 h-full">
                {layer.metrics.map((metric, metricIndex) => (
                  <motion.div
                    key={`${layer.id}-${metricIndex}`}
                    className={`
                      p-3 rounded-lg border backdrop-blur-sm
                      ${layer.color === 'teal' ? 'border-teal-400/20 bg-teal-500/5' :
                        layer.color === 'emerald' ? 'border-emerald-400/20 bg-emerald-500/5' :
                        'border-cyan-400/20 bg-cyan-500/5'}
                    `}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.3 + metricIndex * 0.1 + 0.5 
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-white/80 font-mono">
                          {metric.label}
                        </div>
                        <div className={`text-sm font-bold mt-1 ${getStatusColor(metric.status)}`}>
                          {metric.value}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <motion.span 
                          className={`text-lg ${
                            metric.trend === 'up' ? 'text-emerald-400' :
                            metric.trend === 'down' ? 'text-red-400' :
                            'text-white/60'
                          }`}
                          animate={{ 
                            y: metric.trend === 'up' ? [0, -2, 0] : 
                               metric.trend === 'down' ? [0, 2, 0] : 0 
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {getTrendIcon(metric.trend)}
                        </motion.span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Data Streams */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
          <defs>
            <linearGradient id="streamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14B8A6" stopOpacity="0"/>
              <stop offset="50%" stopColor="#14B8A6" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#14B8A6" stopOpacity="0"/>
            </linearGradient>
          </defs>
          
          {/* Vertical Data Streams */}
          {[120, 200, 280, 360].map((x, index) => (
            <motion.line
              key={`stream-${index}`}
              x1={x}
              y1="0"
              x2={x}
              y2="360"
              stroke="url(#streamGradient)"
              strokeWidth="1"
              strokeDasharray="4 8"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -24 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: index * 0.5
              }}
            />
          ))}
        </svg>

        {/* Control Panel */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-r from-teal-500/20 to-teal-600/10 border-t border-teal-400/30 backdrop-blur-sm rounded-b-lg"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          style={{ zIndex: 20 }}
        >
          <div className="flex items-center justify-between px-4 h-full">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-emerald-400"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs text-emerald-300 font-mono">All Systems Operational</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="text-xs text-teal-300 font-mono hover:text-teal-200 transition-colors">
                Override
              </button>
              <button className="text-xs text-teal-300 font-mono hover:text-teal-200 transition-colors">
                Adjust
              </button>
              <button className="text-xs text-teal-300 font-mono hover:text-teal-200 transition-colors">
                Trace
              </button>
            </div>
          </div>
        </motion.div>

        {/* Layer Navigation */}
        <div className="absolute top-4 right-4 flex flex-col gap-2" style={{ zIndex: 30 }}>
          {dataLayers.map((layer, index) => (
            <motion.button
              key={layer.id}
              className={`
                w-8 h-8 rounded-lg border backdrop-blur-sm flex items-center justify-center text-xs font-bold transition-all
                ${layer.color === 'teal' ? 'border-teal-400/40 bg-teal-500/10 text-teal-300' :
                  layer.color === 'emerald' ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-300' :
                  'border-cyan-400/40 bg-cyan-500/10 text-cyan-300'}
              `}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              {index + 1}
            </motion.button>
          ))}
        </div>

        {/* Command Center Label */}
        <div className="absolute top-4 left-4 text-xs text-teal-400/60 font-mono" style={{ zIndex: 30 }}>
          COMMAND CENTER
        </div>
      </div>
    </motion.div>
  )
}

export default KupaVisual