/**
 * Kupa Visual Enhanced: Futuristic Command Center Dashboard
 * Advanced sci-fi dashboard with holographic effects, data streams, and sophisticated animations
 */

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'

interface Alert {
  id: string
  type: 'warning' | 'info' | 'critical' | 'success'
  message: string
  timestamp: number
  acknowledged: boolean
  priority: number
}

interface MetricData {
  name: string
  value: number
  target: number
  status: 'healthy' | 'warning' | 'critical'
  trend: number[]
  unit?: string
  delta?: number
}

interface ControlAction {
  id: string
  name: string
  icon: string
  status: 'ready' | 'active' | 'cooling' | 'locked'
  lastUsed?: number
  description: string
}

interface SystemModule {
  name: string
  status: 'online' | 'offline' | 'maintenance'
  efficiency: number
  temperature: number
}

const KupaVisualEnhanced: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [metrics, setMetrics] = useState<MetricData[]>([
    { name: 'Campaigns Live', value: 12, target: 15, status: 'warning', trend: [10, 11, 12, 11, 12], unit: 'active', delta: 1 },
    { name: 'Active Agents', value: 4, target: 4, status: 'healthy', trend: [4, 4, 4, 4, 4], unit: 'agents', delta: 0 },
    { name: 'Workflows', value: 8, target: 6, status: 'healthy', trend: [6, 7, 8, 7, 8], unit: 'flows', delta: 2 },
    { name: 'Queue Size', value: 23, target: 30, status: 'healthy', trend: [28, 25, 23, 24, 23], unit: 'items', delta: -5 }
  ])

  const [controls, setControls] = useState<ControlAction[]>([
    { id: 'create-campaign', name: 'Campaign', icon: '⚡', status: 'ready', description: 'Deploy new campaign' },
    { id: 'create-agent', name: 'Agent', icon: '🤖', status: 'ready', description: 'Spawn AI agent' },
    { id: 'schedule-review', name: 'Review', icon: '📊', status: 'ready', description: 'Schedule analysis' },
    { id: 'export-report', name: 'Export', icon: '💾', status: 'ready', description: 'Generate report' }
  ])

  const [systemModules, setSystemModules] = useState<SystemModule[]>([
    { name: 'Runtime Core', status: 'online', efficiency: 98.5, temperature: 42 },
    { name: 'Agent Network', status: 'online', efficiency: 99.2, temperature: 38 },
    { name: 'Data Pipeline', status: 'online', efficiency: 96.8, temperature: 45 },
    { name: 'Security Layer', status: 'online', efficiency: 100, temperature: 35 }
  ])

  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [scanLineY, setScanLineY] = useState(0)
  const [activeQuadrant, setActiveQuadrant] = useState<number | null>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-200, 200], [5, -5])
  const rotateY = useTransform(mouseX, [-200, 200], [-5, 5])

  // Handle mouse movement for parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  // Animate scan line
  useEffect(() => {
    const interval = setInterval(() => {
      setScanLineY(prev => (prev + 1) % 100)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())

      // Update metrics with realistic variations
      setMetrics(prev => prev.map(metric => {
        let variation = 0
        let newValue = metric.value

        if (metric.name === 'Campaigns Live') {
          variation = Math.floor((Math.random() - 0.5) * 4)
          newValue = Math.max(8, Math.min(18, metric.value + variation))
        } else if (metric.name === 'Active Agents') {
          newValue = 4
        } else if (metric.name === 'Workflows') {
          variation = Math.floor((Math.random() - 0.5) * 6)
          newValue = Math.max(4, Math.min(15, metric.value + variation))
        } else if (metric.name === 'Queue Size') {
          variation = Math.floor((Math.random() - 0.5) * 10)
          newValue = Math.max(10, Math.min(45, metric.value + variation))
        }

        const delta = newValue - metric.value
        const newTrend = [...metric.trend.slice(-4), newValue]
        
        let status: 'healthy' | 'warning' | 'critical' = 'healthy'
        if (metric.name === 'Queue Size') {
          status = newValue > metric.target ? 'warning' : 'healthy'
        } else if (metric.name === 'Campaigns Live') {
          if (newValue < metric.target * 0.7) status = 'critical'
          else if (newValue < metric.target) status = 'warning'
        } else {
          if (newValue < metric.target * 0.8) status = 'critical'
          else if (newValue < metric.target) status = 'warning'
        }

        return {
          ...metric,
          value: newValue,
          trend: newTrend,
          status,
          delta
        }
      }))

      // Update system modules
      setSystemModules(prev => prev.map(module => ({
        ...module,
        efficiency: Math.max(85, Math.min(100, module.efficiency + (Math.random() - 0.5) * 2)),
        temperature: Math.max(30, Math.min(60, module.temperature + (Math.random() - 0.5) * 3))
      })))

      // Generate alerts
      if (Math.random() < 0.15) {
        const alertTypes = [
          { type: 'info' as const, message: 'New campaign ready to launch', priority: 1 },
          { type: 'warning' as const, message: 'Agent training session due', priority: 2 },
          { type: 'success' as const, message: 'Monthly report generated', priority: 1 },
          { type: 'critical' as const, message: 'Review requires immediate attention', priority: 3 }
        ]

        const alert = alertTypes[Math.floor(Math.random() * alertTypes.length)]
        const newAlert: Alert = {
          id: `alert-${Date.now()}`,
          ...alert,
          timestamp: Date.now(),
          acknowledged: false
        }

        setAlerts(prev => [...prev.slice(-4), newAlert])
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ))
    setSelectedAlert(null)
  }

  const executeControl = (controlId: string) => {
    setControls(prev => prev.map(control => 
      control.id === controlId 
        ? { ...control, status: 'active', lastUsed: Date.now() }
        : control
    ))

    setTimeout(() => {
      setControls(prev => prev.map(control => 
        control.id === controlId 
          ? { ...control, status: 'cooling' }
          : control
      ))
    }, 1000)

    setTimeout(() => {
      setControls(prev => prev.map(control => 
        control.id === controlId 
          ? { ...control, status: 'ready', lastUsed: Date.now() }
          : control
      ))
    }, 3000)
  }

  const getStatusGradient = (status: string) => {
    switch (status) {
      case 'healthy': return 'from-emerald-500 to-teal-500'
      case 'warning': return 'from-yellow-500 to-amber-500'
      case 'critical': return 'from-red-500 to-pink-500'
      default: return 'from-gray-500 to-slate-500'
    }
  }

  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'critical': 
        return {
          border: 'border-red-500/40',
          bg: 'bg-red-500/10',
          text: 'text-red-300',
          glow: 'shadow-[0_0_20px_rgba(239,68,68,0.3)]'
        }
      case 'warning': 
        return {
          border: 'border-amber-500/40',
          bg: 'bg-amber-500/10',
          text: 'text-amber-300',
          glow: 'shadow-[0_0_20px_rgba(245,158,11,0.3)]'
        }
      case 'success': 
        return {
          border: 'border-emerald-500/40',
          bg: 'bg-emerald-500/10',
          text: 'text-emerald-300',
          glow: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]'
        }
      case 'info': 
        return {
          border: 'border-cyan-500/40',
          bg: 'bg-cyan-500/10',
          text: 'text-cyan-300',
          glow: 'shadow-[0_0_20px_rgba(6,182,212,0.3)]'
        }
      default: 
        return {
          border: 'border-gray-500/40',
          bg: 'bg-gray-500/10',
          text: 'text-gray-300',
          glow: ''
        }
    }
  }

  return (
    <motion.div 
      className="relative w-full h-full flex flex-col overflow-hidden rounded-2xl"
      onMouseMove={handleMouseMove}
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="none" stroke="url(#gridGradient)" strokeWidth="0.5"/>
              <circle cx="20" cy="20" r="1" fill="#14b8a6" opacity="0.5"/>
            </pattern>
            <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.2"/>
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.2"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
        
        {/* Scanning Line Effect */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"
          style={{ top: `${scanLineY}%` }}
        />
      </div>

      {/* Holographic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-teal-500/5 pointer-events-none"/>

      {/* Header with Advanced Status Display */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-cyan-500/30 bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          {/* Animated Status Indicator */}
          <div className="relative">
            <motion.div
              className="w-4 h-4 rounded-full bg-emerald-400"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [1, 0.6, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-emerald-400"
              animate={{ scale: [1, 2], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          
          <div className="flex flex-col">
            <span className="text-cyan-300 font-bold text-sm tracking-wider">KUPA COMMAND CENTER</span>
            <span className="text-cyan-400/60 text-xs font-mono">SYSTEM ACTIVE • LEVEL 5 CLEARANCE</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Mini System Status */}
          <div className="flex items-center gap-3">
            {systemModules.slice(0, 2).map((module, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  module.status === 'online' ? 'bg-emerald-400' : 'bg-red-400'
                }`}/>
                <span className="text-xs text-cyan-300/80 font-mono">
                  {module.efficiency.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-end">
            <div className="text-xs text-cyan-300 font-mono tracking-wider">
              {currentTime.toLocaleDateString()}
            </div>
            <div className="text-sm text-cyan-400 font-mono font-bold">
              {currentTime.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid with 3D Transform */}
      <motion.div 
        className="flex-1 grid grid-cols-2 grid-rows-2 gap-3 p-4"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
      >
        
        {/* Quadrant 1: Live Metrics - Enhanced with graphs and animations */}
        <motion.div 
          className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-cyan-500/30 rounded-xl p-4 backdrop-blur-md overflow-hidden"
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          onHoverStart={() => setActiveQuadrant(1)}
          onHoverEnd={() => setActiveQuadrant(null)}
        >
          {/* Corner Brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400/50"/>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400/50"/>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400/50"/>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400/50"/>
          
          {/* Glow Effect */}
          {activeQuadrant === 1 && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}

          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-cyan-300 font-bold tracking-wider">LIVE METRICS</span>
            <motion.div 
              className="flex gap-1"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1 h-3 bg-cyan-400/60 rounded-full"/>
              ))}
            </motion.div>
          </div>

          <div className="space-y-3">
            {metrics.map((metric, idx) => (
              <motion.div 
                key={metric.name} 
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400 font-medium">{metric.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-mono font-bold bg-gradient-to-r ${getStatusGradient(metric.status)} bg-clip-text text-transparent`}>
                      {metric.value}
                    </span>
                    <span className="text-xs text-gray-500">/{metric.target}</span>
                    {metric.delta !== undefined && metric.delta !== 0 && (
                      <motion.span 
                        className={`text-xs font-mono ${metric.delta > 0 ? 'text-emerald-400' : 'text-red-400'}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        {metric.delta > 0 ? '+' : ''}{metric.delta}
                      </motion.span>
                    )}
                  </div>
                </div>
                
                {/* Progress Bar with Glow */}
                <div className="relative h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                  <motion.div
                    className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getStatusGradient(metric.status)} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(metric.value / metric.target) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{
                      boxShadow: metric.status === 'critical' 
                        ? '0 0 10px rgba(239,68,68,0.5)' 
                        : metric.status === 'warning'
                        ? '0 0 10px rgba(245,158,11,0.5)'
                        : '0 0 10px rgba(16,185,129,0.5)'
                    }}
                  />
                </div>

                {/* Mini Trend Graph */}
                <div className="absolute right-0 top-0">
                  <svg width="40" height="20" className="opacity-40">
                    <polyline
                      points={metric.trend.map((value, index) => {
                        const x = (index / (metric.trend.length - 1)) * 40
                        const normalizedValue = (value - Math.min(...metric.trend)) / 
                          (Math.max(...metric.trend) - Math.min(...metric.trend) || 1)
                        const y = 20 - (normalizedValue * 15)
                        return `${x},${y}`
                      }).join(' ')}
                      fill="none"
                      stroke={metric.status === 'critical' ? '#ef4444' : metric.status === 'warning' ? '#f59e0b' : '#10b981'}
                      strokeWidth="1"
                    />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quadrant 2: Notifications - Enhanced with priority and animations */}
        <motion.div 
          className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-cyan-500/30 rounded-xl p-4 backdrop-blur-md overflow-hidden"
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          onHoverStart={() => setActiveQuadrant(2)}
          onHoverEnd={() => setActiveQuadrant(null)}
        >
          {/* Corner Brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400/50"/>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400/50"/>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400/50"/>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400/50"/>
          
          {activeQuadrant === 2 && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}

          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-cyan-300 font-bold tracking-wider">NOTIFICATIONS</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-cyan-400/60 font-mono">{alerts.filter(a => !a.acknowledged).length} NEW</span>
              <motion.div
                className="w-2 h-2 rounded-full bg-cyan-400"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>

          <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
            <AnimatePresence>
              {alerts.slice(-4).reverse().map((alert, idx) => {
                const styles = getAlertStyles(alert.type)
                return (
                  <motion.div
                    key={alert.id}
                    className={`relative p-2 rounded-lg border ${styles.border} ${styles.bg} ${styles.text} cursor-pointer transition-all ${
                      alert.acknowledged ? 'opacity-40' : 'opacity-100'
                    } ${styles.glow}`}
                    initial={{ opacity: 0, x: 50, scale: 0.9 }}
                    animate={{ opacity: alert.acknowledged ? 0.4 : 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.9 }}
                    whileHover={{ scale: 1.02, x: 2 }}
                    onClick={() => setSelectedAlert(alert)}
                    layout
                  >
                    {/* Priority Indicator */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg bg-current opacity-60"/>
                    
                    <div className="flex items-start justify-between pl-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase">{alert.type}</span>
                          {!alert.acknowledged && (
                            <motion.span
                              className="text-xs px-1 py-0.5 bg-current/20 rounded"
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              NEW
                            </motion.span>
                          )}
                        </div>
                        <p className="text-xs mt-0.5 opacity-90">{alert.message}</p>
                        <div className="text-xs opacity-60 mt-0.5 font-mono">
                          {new Date(alert.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                      
                      {!alert.acknowledged && (
                        <motion.div
                          className="w-2 h-2 rounded-full bg-current"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
            
            {alerts.length === 0 && (
              <div className="text-center text-xs text-gray-500 py-4">No notifications</div>
            )}
          </div>
        </motion.div>

        {/* Quadrant 3: Quick Actions - Enhanced with futuristic buttons */}
        <motion.div 
          className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-cyan-500/30 rounded-xl p-4 backdrop-blur-md overflow-hidden"
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          onHoverStart={() => setActiveQuadrant(3)}
          onHoverEnd={() => setActiveQuadrant(null)}
        >
          {/* Corner Brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400/50"/>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400/50"/>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400/50"/>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400/50"/>
          
          {activeQuadrant === 3 && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}

          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-cyan-300 font-bold tracking-wider">QUICK ACTIONS</span>
            <div className="flex gap-1">
              {['ready', 'active', 'cooling'].map((status, idx) => (
                <div 
                  key={status}
                  className={`w-2 h-2 rounded-full ${
                    status === 'ready' ? 'bg-emerald-400' : 
                    status === 'active' ? 'bg-yellow-400' : 'bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {controls.map((control, idx) => (
              <motion.button
                key={control.id}
                className={`relative p-3 rounded-lg border transition-all overflow-hidden group ${
                  control.status === 'active' 
                    ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.4)]' 
                    : control.status === 'cooling' 
                    ? 'bg-amber-500/20 border-amber-400/50 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.4)]' 
                    : control.status === 'locked'
                    ? 'bg-gray-500/20 border-gray-400/50 text-gray-400 cursor-not-allowed'
                    : 'bg-cyan-500/10 border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                }`}
                onClick={() => control.status === 'ready' && executeControl(control.id)}
                disabled={control.status !== 'ready'}
                whileHover={control.status === 'ready' ? { scale: 1.05 } : {}}
                whileTap={control.status === 'ready' ? { scale: 0.95 } : {}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-transparent via-current to-transparent"
                    animate={{ 
                      x: control.status === 'active' ? ['-100%', '100%'] : 0,
                      opacity: control.status === 'active' ? [0, 1, 0] : 0
                    }}
                    transition={{ duration: 1, repeat: control.status === 'active' ? Infinity : 0 }}
                  />
                </div>

                <div className="relative flex flex-col items-center gap-1">
                  <span className="text-lg">{control.icon}</span>
                  <span className="text-xs font-bold">{control.name}</span>
                  
                  {control.status === 'active' && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-current"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1 }}
                    />
                  )}
                  
                  {control.status === 'cooling' && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-current"
                      initial={{ scaleX: 1 }}
                      animate={{ scaleX: 0 }}
                      transition={{ duration: 2 }}
                    />
                  )}
                </div>

                {/* Hover Description */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 border border-cyan-400/30 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {control.description}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Quadrant 4: System Status - Enhanced with module visualization */}
        <motion.div 
          className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-cyan-500/30 rounded-xl p-4 backdrop-blur-md overflow-hidden"
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          onHoverStart={() => setActiveQuadrant(4)}
          onHoverEnd={() => setActiveQuadrant(null)}
        >
          {/* Corner Brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400/50"/>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400/50"/>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400/50"/>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400/50"/>
          
          {activeQuadrant === 4 && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}

          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-cyan-300 font-bold tracking-wider">SYSTEM STATUS</span>
            <motion.div 
              className="text-xs font-mono text-emerald-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              OPTIMAL
            </motion.div>
          </div>

          <div className="space-y-2">
            {systemModules.map((module, idx) => (
              <motion.div
                key={module.name}
                className="relative"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className={`w-2 h-2 rounded-full ${
                        module.status === 'online' ? 'bg-emerald-400' : 
                        module.status === 'maintenance' ? 'bg-amber-400' : 'bg-red-400'
                      }`}
                      animate={module.status === 'online' ? {
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.7, 1]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                    />
                    <span className="text-xs text-gray-400">{module.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-mono ${
                      module.efficiency > 95 ? 'text-emerald-400' : 
                      module.efficiency > 85 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {module.efficiency.toFixed(1)}%
                    </span>
                    <span className={`text-xs font-mono ${
                      module.temperature < 40 ? 'text-cyan-400' : 
                      module.temperature < 50 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {module.temperature}°C
                    </span>
                  </div>
                </div>
                
                {/* Module Performance Bar */}
                <div className="relative h-1 bg-slate-700/50 rounded-full overflow-hidden">
                  <motion.div
                    className={`absolute inset-y-0 left-0 rounded-full ${
                      module.efficiency > 95 ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 
                      module.efficiency > 85 ? 'bg-gradient-to-r from-yellow-500 to-amber-500' : 
                      'bg-gradient-to-r from-red-500 to-pink-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${module.efficiency}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{
                      boxShadow: module.efficiency > 95 
                        ? '0 0 10px rgba(16,185,129,0.5)' 
                        : module.efficiency > 85
                        ? '0 0 10px rgba(245,158,11,0.5)'
                        : '0 0 10px rgba(239,68,68,0.5)'
                    }}
                  />
                  
                  {/* Animated Pulse Effect */}
                  <motion.div
                    className="absolute inset-y-0 w-4 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '500%'] }}
                    transition={{ duration: 3, repeat: Infinity, delay: idx * 0.5 }}
                  />
                </div>
              </motion.div>
            ))}

            {/* Summary Stats */}
            <div className="pt-2 mt-2 border-t border-cyan-400/20">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Uptime:</span>
                  <span className="text-cyan-400 font-mono">99.98%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Latency:</span>
                  <span className="text-emerald-400 font-mono">12ms</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Alert Detail Modal with Enhanced Effects */}
      <AnimatePresence>
        {selectedAlert && (
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAlert(null)}
          >
            <motion.div
              className={`relative bg-gradient-to-br from-slate-900 to-slate-800 border rounded-xl p-6 max-w-md ${
                getAlertStyles(selectedAlert.type).border
              } ${getAlertStyles(selectedAlert.type).glow}`}
              initial={{ scale: 0.8, y: 50, rotateX: -15 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.8, y: 50, rotateX: 15 }}
              onClick={(e) => e.stopPropagation()}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Alert Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className={`text-sm font-bold uppercase mb-1 ${getAlertStyles(selectedAlert.type).text}`}>
                    {selectedAlert.type} ALERT
                  </div>
                  <div className="text-xs text-gray-500 font-mono">
                    ID: {selectedAlert.id}
                  </div>
                </div>
                <div className={`text-xs px-2 py-1 rounded border ${getAlertStyles(selectedAlert.type).border} ${getAlertStyles(selectedAlert.type).bg}`}>
                  PRIORITY {selectedAlert.priority}
                </div>
              </div>

              {/* Alert Content */}
              <div className="mb-4">
                <p className="text-sm text-gray-300 mb-2">{selectedAlert.message}</p>
                <div className="text-xs text-gray-500">
                  Timestamp: {new Date(selectedAlert.timestamp).toLocaleString()}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <motion.button
                  className={`flex-1 py-2 px-4 rounded-lg border font-bold text-sm transition-all ${
                    getAlertStyles(selectedAlert.type).border
                  } ${getAlertStyles(selectedAlert.type).bg} ${getAlertStyles(selectedAlert.type).text} hover:opacity-80`}
                  onClick={() => acknowledgeAlert(selectedAlert.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ACKNOWLEDGE
                </motion.button>
                <motion.button
                  className="py-2 px-4 rounded-lg border border-gray-600 bg-gray-700/50 text-gray-300 font-bold text-sm hover:bg-gray-700 transition-all"
                  onClick={() => setSelectedAlert(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  DISMISS
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Data Stream Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
        <defs>
          <linearGradient id="dataStream" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0"/>
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0"/>
          </linearGradient>
        </defs>
        
        {/* Animated Data Streams */}
        {[...Array(5)].map((_, idx) => (
          <motion.line
            key={idx}
            x1={`${20 + idx * 20}%`}
            y1="0"
            x2={`${20 + idx * 20}%`}
            y2="100%"
            stroke="url(#dataStream)"
            strokeWidth="0.5"
            strokeDasharray="5 10"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -30 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              delay: idx * 0.8
            }}
          />
        ))}
      </svg>
    </motion.div>
  )
}

// Add custom scrollbar styles
const styles = `
  <style>
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(15, 23, 42, 0.5);
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(6, 182, 212, 0.5);
      border-radius: 2px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(6, 182, 212, 0.7);
    }
  </style>
`

export default KupaVisualEnhanced