/**
 * KENDRA ELITE VISUALIZATION
 * Swiss precision meets enterprise governance
 * Designed for the world's most demanding financial executives
 */

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const KendraElite = () => {
  const [activeLayer, setActiveLayer] = useState(0)
  const [dataStream, setDataStream] = useState(0)
  const [complianceScore, setComplianceScore] = useState(98.7)
  const [systemStatus, setSystemStatus] = useState('OPERATIONAL')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Cycle through governance layers
    const layerInterval = setInterval(() => {
      setActiveLayer(prev => (prev + 1) % 4)
    }, 4000)

    // Data stream animation
    const streamInterval = setInterval(() => {
      setDataStream(prev => (prev + 1) % 100)
    }, 100)

    // Compliance score fluctuation
    const scoreInterval = setInterval(() => {
      setComplianceScore(prev => {
        const delta = (Math.random() - 0.5) * 0.2
        const newScore = prev + delta
        return Math.max(98, Math.min(99.9, newScore))
      })
    }, 2000)

    return () => {
      clearInterval(layerInterval)
      clearInterval(streamInterval)
      clearInterval(scoreInterval)
    }
  }, [])

  // Canvas grid animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    ctx.scale(2, 2)

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = '#00FFB2'
      ctx.lineWidth = 0.5
      ctx.globalAlpha = 0.05

      // Draw perspective grid
      const centerX = canvas.width / 4
      const centerY = canvas.height / 4
      const vanishingPoint = { x: centerX, y: centerY * 0.3 }

      for (let i = 0; i < 20; i++) {
        const y = (canvas.height / 4) * (i / 20)
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width / 2, y)
        ctx.stroke()
      }

      for (let i = 0; i < 30; i++) {
        const x = (canvas.width / 4) * (i / 30)
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(vanishingPoint.x, vanishingPoint.y)
        ctx.stroke()
      }
    }

    drawGrid()
  }, [])

  const governanceLayers = [
    { id: 'INFRASTRUCTURE', level: 0, status: 'SECURE', load: 42 },
    { id: 'RUNTIME', level: 1, status: 'ACTIVE', load: 67 },
    { id: 'COMPLIANCE', level: 2, status: 'ENFORCED', load: 98 },
    { id: 'INTELLIGENCE', level: 3, status: 'LEARNING', load: 84 }
  ]

  return (
    <div className="w-full h-[480px] bg-[#0A0A0A] rounded-xl overflow-hidden relative">
      {/* Perspective Grid Background */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.3 }}
      />

      {/* Main Architecture Display */}
      <div className="relative z-10 h-full flex">
        {/* Left Panel - System Architecture */}
        <div className="w-2/3 h-full border-r border-white/5 p-8">
          {/* Header Status Bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <div className="text-[10px] text-[#666666] tracking-[0.2em] uppercase">System Status</div>
                <div className="text-sm font-medium text-white mt-1">{systemStatus}</div>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div className="flex flex-col">
                <div className="text-[10px] text-[#666666] tracking-[0.2em] uppercase">Compliance</div>
                <div className="text-sm font-medium text-[#00FFB2] mt-1">{complianceScore.toFixed(1)}%</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 rounded-full"
                  style={{
                    backgroundColor: i === activeLayer ? '#00FFB2' : '#333333'
                  }}
                  animate={{
                    scale: i === activeLayer ? [1, 1.5, 1] : 1
                  }}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </div>
          </div>

          {/* Governance Layers Visualization */}
          <div className="relative h-[320px]">
            {governanceLayers.map((layer, index) => (
              <motion.div
                key={layer.id}
                className="absolute w-full"
                style={{
                  top: `${index * 80}px`,
                  zIndex: 4 - index
                }}
                animate={{
                  opacity: activeLayer === index ? 1 : 0.3,
                  y: activeLayer === index ? -5 : 0
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Layer Card */}
                <div 
                  className="relative h-[70px] border border-white/10 rounded-lg overflow-hidden"
                  style={{
                    background: activeLayer === index 
                      ? 'linear-gradient(90deg, rgba(0,255,178,0.05) 0%, rgba(0,255,178,0) 100%)' 
                      : 'rgba(17,17,17,0.5)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {/* Layer Content */}
                  <div className="absolute inset-0 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Layer Index */}
                      <div className="flex items-center justify-center w-8 h-8">
                        <div className="text-[10px] font-mono text-[#666666]">L{index}</div>
                      </div>

                      {/* Layer Info */}
                      <div>
                        <div className="text-xs font-medium text-white">{layer.id}</div>
                        <div className="text-[10px] text-[#666666] mt-1">{layer.status}</div>
                      </div>
                    </div>

                    {/* Load Indicator */}
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-[2px] bg-[#111111] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-[#00FFB2]"
                          initial={{ width: 0 }}
                          animate={{ width: `${layer.load}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                      <div className="text-[10px] font-mono text-[#666666] w-8 text-right">
                        {layer.load}%
                      </div>
                    </div>
                  </div>

                  {/* Active Layer Accent */}
                  {activeLayer === index && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#00FFB2]"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>

                {/* Connection Lines */}
                {index < governanceLayers.length - 1 && (
                  <svg className="absolute w-full h-[20px] top-[70px] left-0">
                    <motion.line
                      x1="50%"
                      y1="0"
                      x2="50%"
                      y2="10"
                      stroke="#333333"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                    />
                  </svg>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Panel - Real-time Metrics */}
        <div className="w-1/3 h-full p-8 flex flex-col">
          {/* Metrics Header */}
          <div className="mb-6">
            <div className="text-[10px] text-[#666666] tracking-[0.2em] uppercase">Real-time Analysis</div>
          </div>

          {/* Key Metrics */}
          <div className="space-y-6 flex-1">
            {/* Throughput */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] text-[#666666] uppercase">Throughput</div>
                <div className="text-xs font-mono text-white">12,847 ops/s</div>
              </div>
              <div className="h-[1px] bg-[#111111] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#00FFB2]"
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  style={{ width: '30%' }}
                />
              </div>
            </div>

            {/* Latency */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] text-[#666666] uppercase">Latency</div>
                <div className="text-xs font-mono text-white">0.3ms</div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 h-4 bg-[#111111] rounded-sm overflow-hidden"
                    animate={{
                      opacity: dataStream % 20 === i ? 1 : 0.3
                    }}
                  >
                    <div 
                      className="h-full bg-[#00FFB2]"
                      style={{
                        height: `${20 + Math.random() * 80}%`
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Security Score */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] text-[#666666] uppercase">Security Index</div>
                <div className="text-xs font-mono text-[#00FFB2]">AAA</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {['AUTH', 'ENCRYPT', 'AUDIT'].map((label, i) => (
                  <div key={i} className="text-center">
                    <div className="h-8 bg-[#111111] rounded-sm mb-1 flex items-end justify-center">
                      <motion.div
                        className="w-full bg-[#00FFB2] rounded-sm"
                        initial={{ height: 0 }}
                        animate={{ height: '100%' }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      />
                    </div>
                    <div className="text-[8px] text-[#666666]">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Connections */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] text-[#666666] uppercase">Connections</div>
                <div className="text-xs font-mono text-white">1,284</div>
              </div>
              <div className="relative h-12">
                <svg className="w-full h-full">
                  <polyline
                    points={`0,40 ${dataStream % 100},30 ${(dataStream + 20) % 100},35 ${(dataStream + 40) % 100},25 100,30`}
                    fill="none"
                    stroke="#00FFB2"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Status */}
          <div className="pt-6 border-t border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-[#00FFB2] rounded-full animate-pulse" />
                <div className="text-[10px] text-[#666666] uppercase">Live</div>
              </div>
              <div className="text-[10px] font-mono text-[#666666]">
                {new Date().toLocaleTimeString('en-US', { hour12: false })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#0A0A0A] border-t border-white/5 flex items-center px-8">
        <div className="flex items-center gap-8 text-[10px] font-mono text-[#666666]">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-[#00FFB2] rounded-full" />
            <span>KENDRA V2.4.1</span>
          </div>
          <div className="flex items-center gap-2">
            <span>UPTIME</span>
            <span className="text-white">99.99%</span>
          </div>
          <div className="flex items-center gap-2">
            <span>REGION</span>
            <span className="text-white">US-EAST-1</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KendraElite