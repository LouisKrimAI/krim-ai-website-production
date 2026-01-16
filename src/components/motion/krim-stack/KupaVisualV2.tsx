/**
 * Kupa Visual V2: Futuristic Dashboard with Advanced Visual Details
 * High-tech command center with enhanced animations and sci-fi aesthetics
 */

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'

interface Alert {
  id: string
  type: 'warning' | 'info' | 'critical' | 'success'
  message: string
  timestamp: number
  acknowledged: boolean
  priority: 'low' | 'medium' | 'high'
}

interface MetricData {
  name: string
  value: number
  target: number
  status: 'healthy' | 'warning' | 'critical'
  trend: number[]
}

interface ControlAction {
  id: string
  name: string
  status: 'ready' | 'active' | 'cooling'
  description: string
  lastUsed?: number
}

const KupaVisualV2: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useTransform(mouseY, [-300, 300], [3, -3])
  const rotateY = useTransform(mouseX, [-300, 300], [-3, 3])

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 'alert-initial-1',
      type: 'warning' as const,
      message: 'Settlement acceptance down 23%',
      priority: 'high' as const,
      timestamp: Date.now() - 120000, // 2 minutes ago
      acknowledged: false
    },
    {
      id: 'alert-initial-2', 
      type: 'critical' as const,
      message: 'Promise-to-pay down 31%',
      priority: 'high' as const,
      timestamp: Date.now() - 300000, // 5 minutes ago
      acknowledged: false
    },
    {
      id: 'alert-initial-3',
      type: 'info' as const,
      message: 'Payment plan uptake up 15%',
      priority: 'low' as const,
      timestamp: Date.now() - 480000, // 8 minutes ago
      acknowledged: false
    }
  ])
  const [metrics, setMetrics] = useState<MetricData[]>([
    // Panel 1: Campaign Performance Metrics (Top Left) - Real-time operational metrics
    { name: 'Today\'s Collections', value: 847293, target: 2000000, status: 'warning', trend: [621000, 734000, 847293] },
    { name: 'Accounts Worked', value: 3427, target: 5000, status: 'warning', trend: [2890, 3156, 3427] },
    { name: 'RPC Rate', value: 42.3, target: 45, status: 'warning', trend: [40.1, 41.2, 42.3] }, // Right Party Contact
    { name: 'PTP Rate', value: 23.7, target: 25, status: 'warning', trend: [22.1, 23.2, 23.7] }, // Promise to Pay
    // Panel 4: Target Progress Metrics (Bottom Right) - Complementary metrics
    { name: 'Settlement Rate', value: 12.4, target: 15, status: 'warning', trend: [11.8, 12.1, 12.4] },
    { name: 'Avg Payment', value: 247, target: 300, status: 'warning', trend: [235, 241, 247] },
    { name: 'Broken Promises', value: 127, target: 100, status: 'critical', trend: [115, 121, 127] },
    { name: 'Active Plans', value: 892, target: 1000, status: 'warning', trend: [876, 884, 892] }
  ])

  const [controls, setControls] = useState<ControlAction[]>([
    { id: 'new-campaign', name: 'New Campaign', status: 'ready', description: 'Launch targeted campaign' },
    { id: 'create-agent', name: 'Create New Agent', status: 'ready', description: 'Deploy AI specialist' },
    { id: 'schedule-report', name: 'Schedule Report', status: 'ready', description: 'Automated insights delivery' },
    { id: 'deeper-analysis', name: 'Deeper Analysis', status: 'ready', description: 'Advanced analytics view' }
  ])

  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left - rect.width / 2)
        mouseY.set(e.clientY - rect.top - rect.height / 2)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      return () => container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])

  // Real-time updates for collections (every 30 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())

      setMetrics(prev => prev.map(metric => {
        let variation = 0
        let newValue = metric.value

        // Enhanced business hours logic (8am-8pm)
        const hour = new Date().getHours()
        const isBusinessHours = hour >= 8 && hour <= 20
        const isPeakHours = hour >= 10 && hour <= 18 // Peak collection hours
        const isLateShift = hour >= 18 && hour <= 20 // Final push hours
        
        if (metric.name === 'Today\'s Collections' && isBusinessHours) {
          // Collections increase varies by time of day
          if (isPeakHours) {
            variation = Math.floor(Math.random() * 15000 + 8000) // $8-23k during peak
          } else if (isLateShift) {
            variation = Math.floor(Math.random() * 12000 + 5000) // $5-17k during late shift
          } else {
            variation = Math.floor(Math.random() * 8000 + 3000) // $3-11k during early hours
          }
          newValue = Math.min(2500000, metric.value + variation)
        } else if (metric.name === 'Accounts Worked' && isBusinessHours) {
          // Accounts worked varies by shift
          if (isPeakHours) {
            variation = Math.floor(Math.random() * 30 + 25) // 25-55 during peak
          } else {
            variation = Math.floor(Math.random() * 20 + 15) // 15-35 during other hours
          }
          newValue = Math.min(6000, metric.value + variation)
        } else if (metric.name === 'RPC Rate') {
          // RPC rate changes slowly with slight daily fluctuation
          variation = (Math.random() - 0.5) * 0.3
          newValue = Math.max(38, Math.min(48, metric.value + variation))
        } else if (metric.name === 'PTP Rate') {
          // PTP rate changes very slowly
          variation = (Math.random() - 0.5) * 0.15
          newValue = Math.max(20, Math.min(28, metric.value + variation))
        } else if (metric.name === 'Settlement Rate') {
          // Settlement rate is stable, minor variations
          variation = (Math.random() - 0.5) * 0.08
          newValue = Math.max(10, Math.min(16, metric.value + variation))
        } else if (metric.name === 'Avg Payment') {
          // Average payment changes slowly
          variation = Math.floor((Math.random() - 0.5) * 5)
          newValue = Math.max(200, Math.min(350, metric.value + variation))
        } else if (metric.name === 'Broken Promises' && isBusinessHours) {
          // Broken promises tracked throughout the day
          variation = Math.floor(Math.random() * 4 - 1) // Can go up or down slightly
          newValue = Math.max(50, metric.value + variation)
        } else if (metric.name === 'Active Plans' && isBusinessHours) {
          // Active plans increase slowly during business hours
          variation = Math.floor(Math.random() * 6 - 1)
          newValue = Math.max(800, metric.value + variation)
        }

        const newTrend = [...metric.trend.slice(-9), newValue]
        
        // Determine status based on target achievement
        let status: 'healthy' | 'warning' | 'critical' = 'healthy'
        const targetRatio = newValue / metric.target
        
        if (metric.name === 'Broken Promises') {
          // Inverted - lower is better
          if (newValue > metric.target * 1.5) status = 'critical'
          else if (newValue > metric.target) status = 'warning'
          else status = 'healthy'
        } else {
          // Normal metrics - higher is better
          if (targetRatio >= 0.95) status = 'healthy'
          else if (targetRatio >= 0.8) status = 'warning'
          else status = 'critical'
        }

        return { ...metric, value: newValue, trend: newTrend, status }
      }))

      // Clean up acknowledged alerts first (auto-remove after 10 seconds)
      setAlerts(prev => prev.filter(alert => 
        !alert.acknowledged || (Date.now() - alert.timestamp < 10000)
      ))

      // Add new alert only if we have space and can avoid duplicates
      // Reduced frequency to approximately every 4 minutes (0.125 chance per 30-second update = 8 updates)
      if (Math.random() < 0.125) {
        setAlerts(prev => {
          // Only add if we have less than 3 active alerts
          if (prev.length >= 3) return prev

          const alertTypes = [
            // Critical operational alerts
            { type: 'critical' as const, message: 'Dialer system failure - 52 agents unable to make calls', priority: 'high' as const },
            { type: 'critical' as const, message: 'TCPA violation risk - agent bypassed DNC check on 7 calls', priority: 'high' as const },
            { type: 'critical' as const, message: 'Payment gateway offline - unable to process settlements', priority: 'high' as const },
            // Warning alerts
            { type: 'warning' as const, message: 'High-balance account $247K requesting 22% settlement', priority: 'high' as const },
            { type: 'warning' as const, message: 'Agent retention alert - 3 top performers absent today', priority: 'medium' as const },
            { type: 'warning' as const, message: 'Portfolio aging - 147 accounts past 90 days', priority: 'medium' as const },
            { type: 'warning' as const, message: 'Skip trace needed - 892 disconnected numbers in queue', priority: 'medium' as const },
            // Info alerts
            { type: 'info' as const, message: 'New portfolio loaded - 2,847 accounts totaling $4.2M', priority: 'medium' as const },
            { type: 'info' as const, message: 'Compliance audit scheduled for tomorrow 10 AM', priority: 'medium' as const },
            { type: 'info' as const, message: 'Legal review completed on disputed account #8291037', priority: 'low' as const },
            // Success alerts
            { type: 'success' as const, message: 'Major settlement closed: $187,000 at 31% recovery', priority: 'low' as const },
            { type: 'success' as const, message: 'Monthly target achieved - $2.1M collected (105% of goal)', priority: 'low' as const },
            { type: 'success' as const, message: 'Skip trace success - 423 new valid numbers found', priority: 'low' as const }
          ]

          // Get currently displayed messages to prevent duplicates
          const currentMessages = prev.map(a => a.message)
          const availableAlerts = alertTypes.filter(alert => !currentMessages.includes(alert.message))
          
          // Only add alert if we have unique options available
          if (availableAlerts.length === 0) return prev

          const alert = availableAlerts[Math.floor(Math.random() * availableAlerts.length)]
          const newAlert: Alert = {
            id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            ...alert,
            timestamp: Date.now(),
            acknowledged: false
          }

          // Double-check for duplicates before adding
          const finalCheck = prev.filter(existingAlert => existingAlert.message === newAlert.message)
          if (finalCheck.length > 0) return prev

          return [...prev, newAlert].slice(-3) // Always keep max 3 alerts
        })
      }
    }, 30000) // Update every 30 seconds instead of 800ms

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

  const getMetricColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-emerald-300'
      case 'warning': return 'text-yellow-300'
      case 'critical': return 'text-red-300'
      default: return 'text-white'
    }
  }

  const getMetricGradient = (status: string) => {
    switch (status) {
      case 'healthy': return 'from-emerald-400 to-emerald-600'
      case 'warning': return 'from-yellow-400 to-orange-500'
      case 'critical': return 'from-red-400 to-red-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-400 bg-red-500/10 text-red-300 shadow-red-500/20'
      case 'warning': return 'border-yellow-400 bg-yellow-500/10 text-yellow-300 shadow-yellow-500/20'
      case 'success': return 'border-emerald-400 bg-emerald-500/10 text-emerald-300 shadow-emerald-500/20'
      case 'info': return 'border-blue-400 bg-blue-500/10 text-blue-300 shadow-blue-500/20'
      default: return 'border-gray-400 bg-gray-500/10 text-gray-300 shadow-gray-500/20'
    }
  }

  const getControlColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-emerald-400/30'
      case 'cooling': return 'bg-yellow-500/20 border-yellow-400 text-yellow-300 shadow-yellow-400/30'
      case 'ready': return 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-cyan-400/30'
      default: return 'bg-gray-500/20 border-gray-400 text-gray-300'
    }
  }

  const getPriorityIndicator = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-400 animate-pulse'
      case 'medium': return 'bg-yellow-400'
      case 'low': return 'bg-emerald-400'
      default: return 'bg-gray-400'
    }
  }

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-full flex flex-col overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl"
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY
      }}
    >
      {/* Futuristic Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent" />
      </div>

      {/* Animated Scan Line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
        animate={{ y: [0, 400] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ zIndex: 1 }}
      />

      {/* Data Stream Lines */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
          style={{
            left: `${20 + i * 30}%`,
            height: '100%',
          }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scaleY: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Enhanced Header */}
      <div className="relative flex items-center justify-between p-4 border-b border-cyan-400/20 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="relative">
            <motion.div
              className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
              animate={{
                boxShadow: [
                  "0 0 10px rgba(52, 211, 153, 0.5)",
                  "0 0 20px rgba(52, 211, 153, 0.8)",
                  "0 0 10px rgba(52, 211, 153, 0.5)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping" />
          </div>
          <div>
            <span className="text-lg font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              CAMPAIGN COMMAND CENTER
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-mono text-cyan-300">
            {currentTime.toLocaleTimeString()}
          </div>
          <div className="text-xs text-cyan-400/60">
            {currentTime.toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Enhanced Dashboard Grid */}
      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-2 p-2 h-full max-h-full overflow-hidden">
        
        {/* Neural Network Connection Lines */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <svg className="w-full h-full">
            {/* Animated connection lines between panels */}
            <motion.line
              x1="50%" y1="50%" x2="50%" y2="100%"
              stroke="url(#neuralGradient)" strokeWidth="1" opacity="0.4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1 }}
            />
            <motion.line
              x1="0%" y1="50%" x2="100%" y2="50%"
              stroke="url(#neuralGradient)" strokeWidth="1" opacity="0.4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1.5 }}
            />
            <defs>
              <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Campaign Performance - Consolidated Metrics */}
        <motion.div
          className="relative flex flex-col"
          whileHover={{ scale: 1.02, rotateY: 2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="h-full bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60 border border-cyan-400/40 rounded-lg backdrop-blur-sm relative overflow-hidden shadow-lg shadow-cyan-500/20">
            {/* Holographic Corner Brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-400/80 animate-pulse" />
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyan-400/80 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-cyan-400/80 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-400/80 animate-pulse" />
            
            {/* Glitch Effect on Hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-blue-500/10 to-purple-500/5 opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            <div className="p-2 relative z-20 min-h-0">
              <div className="flex items-center gap-1 mb-2">
                <motion.div 
                  className="w-2 h-2 rounded-full bg-cyan-400"
                  animate={{
                    boxShadow: [
                      "0 0 5px #06b6d4",
                      "0 0 15px #06b6d4", 
                      "0 0 5px #06b6d4"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <h3 className="text-xs font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                  CAMPAIGN PERFORMANCE
                </h3>
              </div>
              
              <div className="space-y-1 overflow-hidden">
                {metrics.slice(0, 4).map((metric, index) => (
                  <motion.div
                    key={metric.name}
                    className="flex items-center justify-between group min-h-0"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 2 }}
                  >
                    <span className="text-xs text-white/70 font-medium group-hover:text-white/90 transition-colors truncate pr-1 flex-1">
                      {metric.name}
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className={`text-xs font-mono font-bold ${getMetricColor(metric.status)} whitespace-nowrap`}>
                        {metric.name === 'Today\'s Collections' ? `$${(metric.value/1000).toFixed(0)}K` :
                         metric.name === 'Accounts Worked' ? metric.value.toLocaleString() :
                         metric.name === 'RPC Rate' ? `${metric.value.toFixed(1)}%` :
                         metric.name === 'PTP Rate' ? `${metric.value.toFixed(1)}%` :
                         Math.round(metric.value)}
                      </span>
                      
                      <motion.div
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          metric.status === 'healthy' ? 'bg-emerald-400' :
                          metric.status === 'warning' ? 'bg-yellow-400' :
                          'bg-red-400'
                        }`}
                        style={{
                          boxShadow: `0 0 6px ${
                            metric.status === 'healthy' ? '#10b981' :
                            metric.status === 'warning' ? '#f59e0b' :
                            '#ef4444'
                          }`
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                          rotateZ: [0, 180, 360]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          delay: index * 0.5 
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Campaign Alerts */}
        <motion.div
          className="relative flex flex-col"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="h-full bg-slate-800/40 border border-cyan-400/30 rounded-lg backdrop-blur-sm relative overflow-hidden shadow-lg shadow-cyan-500/10">
            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-400/60" />
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyan-400/60" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-cyan-400/60" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-400/60" />
            
            <div className="p-2 min-h-0">
              <div className="flex items-center gap-1 mb-2">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <h3 className="text-xs font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                  PRIORITY ALERTS
                </h3>
                <span className="text-xs bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded-full">
                  {alerts.filter(a => !a.acknowledged).length} NEW
                </span>
              </div>
              
              <div className="space-y-1 overflow-hidden" style={{ height: 'calc(100% - 2rem)' }}>
                <AnimatePresence>
                  {alerts.slice(-3).map((alert, index) => (
                    <motion.div
                      key={alert.id}
                      className={`p-1.5 rounded border cursor-pointer transition-all duration-300 ${getAlertColor(alert.type)} ${
                        alert.acknowledged ? 'opacity-50' : 'hover:scale-[1.01]'
                      }`}
                      initial={{ opacity: 0, x: 20, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -20, scale: 0.9 }}
                      layout
                      whileHover={{ y: -1 }}
                    >
                      <div className="flex items-center justify-between min-h-0">
                        <div className="flex items-center gap-1.5 min-w-0 flex-1">
                          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${getPriorityIndicator(alert.priority)}`} />
                          <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis flex-1">
                            {alert.message}
                          </span>
                        </div>
                        {!alert.acknowledged && (
                          <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-current shrink-0 ml-1"
                            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Campaign Actions */}
        <motion.div
          className="relative flex flex-col"
          whileHover={{ scale: 1.02, rotateX: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="h-full bg-gradient-to-br from-emerald-900/20 via-slate-800/40 to-cyan-900/20 border border-emerald-400/40 rounded-lg backdrop-blur-sm relative overflow-hidden shadow-lg shadow-emerald-500/20">
            {/* Holographic Corner Brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-emerald-400/80" />
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-emerald-400/80" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-emerald-400/80" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-emerald-400/80" />
            
            {/* Matrix-style cascading effect */}
            <motion.div
              className="absolute right-2 top-0 w-px h-full bg-gradient-to-b from-transparent via-emerald-400/30 to-transparent"
              animate={{ 
                height: ['0%', '100%', '0%'],
                opacity: [0, 0.6, 0] 
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 2 }}
            />
            
            <div className="p-2 min-h-0">
              <div className="flex items-center gap-1 mb-2">
                <motion.div 
                  className="w-2 h-2 rounded-full bg-emerald-400"
                  animate={{
                    boxShadow: [
                      "0 0 5px #10b981",
                      "0 0 15px #10b981", 
                      "0 0 5px #10b981"
                    ],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <h3 className="text-xs font-bold bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
                  CAMPAIGN ACTIONS
                </h3>
              </div>
              
              <div className="grid grid-cols-2 gap-2 h-full overflow-hidden">
                {controls.map((control, index) => (
                  <motion.button
                    key={control.id}
                    className={`group relative p-4 rounded border transition-all duration-300 h-full ${getControlColor(control.status)} ${
                      control.status === 'ready' ? 'hover:shadow-md hover:scale-105' : ''
                    }`}
                    onClick={() => control.status === 'ready' && executeControl(control.id)}
                    disabled={control.status !== 'ready'}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={control.status === 'ready' ? { y: -1, rotateY: 1 } : {}}
                    whileTap={{ scale: 0.98 }}
                    title={control.description}
                  >
                    <div className="flex flex-col items-center justify-center gap-2 h-full min-h-0">
                      <span className="text-sm font-bold text-center leading-tight">
                        {control.name}
                      </span>
                      
                      {/* Enhanced Status Indicators */}
                      {control.status === 'active' && (
                        <motion.div
                          className="w-full h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-full overflow-hidden"
                          initial={{ scaleX: 0, rotateX: 0 }}
                          animate={{ scaleX: 1, rotateX: 360 }}
                          transition={{ duration: 1, rotateX: { duration: 2, repeat: Infinity } }}
                        />
                      )}
                      
                      {control.status === 'cooling' && (
                        <div className="w-full h-1 bg-gray-600 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                            animate={{ scaleX: [1, 0] }}
                            transition={{ duration: 3 }}
                          />
                        </div>
                      )}
                      
                      {control.status === 'ready' && (
                        <motion.div 
                          className="w-2 h-2 rounded-full bg-current opacity-60"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.6, 1, 0.6]
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        />
                      )}
                    </div>
                    
                    <motion.div 
                      className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-emerald-400/10 via-cyan-400/10 to-blue-400/10"
                      whileHover={{
                        background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1))'
                      }}
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Portfolio Risk Heat Map - Simplified */}
        <motion.div
          className="relative flex flex-col"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <div className="h-full bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-purple-400/40 rounded-lg backdrop-blur-sm relative overflow-hidden">
            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-purple-400/60" />
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-purple-400/60" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-purple-400/60" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-purple-400/60" />
            
            <div className="p-2 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-1 mb-2">
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <h3 className="text-xs font-bold bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
                  PORTFOLIO RISK
                </h3>
                <span className="text-[9px] text-white/40 ml-auto">30-DAY</span>
              </div>
              
              {/* Risk Cards Grid */}
              <div className="grid grid-cols-2 gap-1.5 flex-1">
                {[
                  { 
                    segment: '30-60 Days', 
                    amount: '$2.1M', 
                    percentage: '52%',
                    change: '+3.2%',
                    trend: 'up',
                    color: 'border-yellow-400/40 bg-yellow-500/10'
                  },
                  { 
                    segment: '61-90 Days', 
                    amount: '$1.6M', 
                    percentage: '26%',
                    change: '-1.8%',
                    trend: 'down',
                    color: 'border-orange-400/50 bg-orange-500/10'
                  },
                  { 
                    segment: '90+ Days', 
                    amount: '$890K', 
                    percentage: '14%',
                    change: '+2.1%',
                    trend: 'up',
                    color: 'border-red-400/60 bg-red-500/10'
                  },
                  { 
                    segment: 'Legal', 
                    amount: '$445K', 
                    percentage: '8%',
                    change: '-0.5%',
                    trend: 'down',
                    color: 'border-red-500/70 bg-red-600/15'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.segment}
                    className={`relative p-1.5 rounded border ${item.color} group cursor-pointer h-full flex flex-col justify-between`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Top: Segment name */}
                    <div className="text-[9px] font-bold text-white/90 leading-tight mb-1">
                      {item.segment}
                    </div>
                    
                    {/* Middle: Amount */}
                    <div className="text-xs font-bold text-white text-center">
                      {item.amount}
                    </div>
                    
                    {/* Bottom: Change and percentage */}
                    <div className="flex items-center justify-between mt-1">
                      <div className={`text-[7px] font-bold px-0.5 rounded ${
                        item.trend === 'up' 
                          ? 'bg-red-500/20 text-red-300' 
                          : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {item.change}
                      </div>
                      <span className="text-[9px] font-bold text-white/80">
                        {item.percentage}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Summary */}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-purple-400/20">
                <span className="text-[9px] text-purple-300">Total: $5.04M</span>
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-yellow-400 animate-pulse" />
                  <span className="text-[9px] text-yellow-300 font-medium">Needs Review</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Alert Modal */}
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
              className={`bg-slate-900/90 border-2 rounded-xl p-6 max-w-md backdrop-blur-sm ${getAlertColor(selectedAlert.type)} shadow-2xl`}
              initial={{ scale: 0.8, y: 30, rotateX: -15 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.8, y: 30, rotateX: -15 }}
              onClick={(e) => e.stopPropagation()}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-3 h-3 rounded-full ${getPriorityIndicator(selectedAlert.priority)}`} />
                  <div className="text-lg font-bold uppercase tracking-wide">
                    {selectedAlert.type} ALERT
                  </div>
                </div>
                <div className="text-sm mb-2">{selectedAlert.message}</div>
                <div className="text-xs opacity-60">
                  Priority: {selectedAlert.priority.toUpperCase()} • {new Date(selectedAlert.timestamp).toLocaleString()}
                </div>
              </div>
              
              <motion.button
                className="w-full py-3 px-4 bg-current/20 border border-current rounded-lg text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:bg-current/30"
                onClick={() => acknowledgeAlert(selectedAlert.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                ACKNOWLEDGE
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.6);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.8);
        }
      `}</style>
    </motion.div>
  )
}

export default KupaVisualV2