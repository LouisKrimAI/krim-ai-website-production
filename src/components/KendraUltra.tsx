/**
 * KENDRA ULTRA VISUALIZATION
 * The ultimate expression of enterprise AI governance
 * Inspired by Dieter Rams' principles and Swiss financial design
 */

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const KendraUltra = () => {
  const [systemTime, setSystemTime] = useState(new Date())
  const [activeProcess, setActiveProcess] = useState(0)
  const [networkFlow, setNetworkFlow] = useState(Array(50).fill(0))
  const [complianceMatrix, setComplianceMatrix] = useState(Array(8).fill(Array(8).fill(0)))
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    // System clock
    const clockInterval = setInterval(() => {
      setSystemTime(new Date())
    }, 1000)

    // Process cycling
    const processInterval = setInterval(() => {
      setActiveProcess(prev => (prev + 1) % 6)
    }, 3000)

    // Network flow simulation
    const flowInterval = setInterval(() => {
      setNetworkFlow(prev => {
        const newFlow = [...prev.slice(1), Math.random() * 100]
        return newFlow
      })
    }, 200)

    // Compliance matrix update
    const matrixInterval = setInterval(() => {
      setComplianceMatrix(prev => {
        const newMatrix = prev.map(row => 
          row.map(() => Math.random() > 0.3 ? 1 : 0)
        )
        return newMatrix
      })
    }, 2000)

    return () => {
      clearInterval(clockInterval)
      clearInterval(processInterval)
      clearInterval(flowInterval)
      clearInterval(matrixInterval)
    }
  }, [])

  const intelligenceProcesses = [
    { name: 'PERCEPTION', code: 'PERCEPT', status: 'SENSING', confidence: 98.2 },
    { name: 'REASONING', code: 'REASON', status: 'ANALYZING', confidence: 95.7 },
    { name: 'JUDGMENT', code: 'JUDGE', status: 'EVALUATING', confidence: 92.1 },
    { name: 'DECISION', code: 'DECIDE', status: 'CHOOSING', confidence: 96.8 },
    { name: 'ACTION', code: 'ACT', status: 'EXECUTING', confidence: 99.1 },
    { name: 'LEARNING', code: 'LEARN', status: 'ADAPTING', confidence: 87.3 }
  ]

  // Generate network path
  const networkPath = useMemo(() => {
    const points = networkFlow.map((value, index) => {
      const x = (index / (networkFlow.length - 1)) * 100
      const y = 50 - (value / 100) * 40
      return `${x},${y}`
    }).join(' ')
    return `M ${points}`
  }, [networkFlow])

  return (
    <div className="w-full h-[560px] bg-black relative overflow-hidden">
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, #00FFB2 1px, transparent 1px),
            linear-gradient(180deg, #00FFB2 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Main Container */}
      <div className="relative h-full flex flex-col p-6">
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.05]">
          <div className="flex items-center gap-6">
            {/* Logo/Title */}
            <div>
              <div className="text-[9px] font-mono text-[#666666] tracking-[0.3em] uppercase mb-1">
                INTELLIGENCE RUNTIME
              </div>
              <div className="text-base font-light text-white tracking-tight">
                Kendra
              </div>
            </div>

            {/* System Status */}
            <div className="flex items-center gap-4 pl-6 border-l border-white/[0.05]">
              <div className="flex items-center gap-2">
                <div className="w-[6px] h-[6px] bg-[#00FFB2] rounded-full animate-pulse" />
                <div className="text-[10px] font-mono text-[#666666]">OPERATIONAL</div>
              </div>
              <div className="text-[10px] font-mono text-[#666666]">
                {systemTime.toLocaleTimeString('en-US', { 
                  hour12: false, 
                  hour: '2-digit', 
                  minute: '2-digit', 
                  second: '2-digit' 
                })}
              </div>
            </div>
          </div>

          {/* Right side metrics */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-[9px] text-[#666666] uppercase mb-1">Decisions</div>
              <div className="text-sm font-mono text-white">2,847 <span className="text-[9px] text-[#666666]">/sec</span></div>
            </div>
            <div className="text-right">
              <div className="text-[9px] text-[#666666] uppercase mb-1">Confidence</div>
              <div className="text-sm font-mono text-[#00FFB2]">94.3<span className="text-[9px] text-[#666666]">%</span></div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex gap-6">
          {/* Left Panel - Process Monitor */}
          <div className="w-1/3 flex flex-col">
            <div className="text-[9px] font-mono text-[#666666] tracking-[0.3em] uppercase mb-4">
              INTELLIGENCE PIPELINE
            </div>

            <div className="flex-1 space-y-3">
              {intelligenceProcesses.map((process, index) => (
                <motion.div
                  key={process.code}
                  className="relative"
                  animate={{
                    x: activeProcess === index ? 4 : 0,
                    opacity: activeProcess === index ? 1 : 0.4
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center gap-3">
                    {/* Process indicator */}
                    <div className="relative">
                      <div 
                        className={`w-8 h-8 border ${
                          activeProcess === index ? 'border-[#00FFB2]' : 'border-white/10'
                        } flex items-center justify-center`}
                      >
                        <div className="text-[8px] font-mono text-white/60">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                      </div>
                      {activeProcess === index && (
                        <motion.div
                          className="absolute inset-0 border border-[#00FFB2]"
                          initial={{ scale: 1 }}
                          animate={{ scale: 1.2, opacity: 0 }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                    </div>

                    {/* Process details */}
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between">
                        <div className="text-xs text-white/90">{process.name}</div>
                        <div className="text-[9px] font-mono text-[#00FFB2]/60">{process.status}</div>
                      </div>
                      <div className="mt-1 h-[1px] bg-white/[0.05] rounded-full overflow-hidden">
                        {activeProcess === index && (
                          <motion.div
                            className="h-full bg-[#00FFB2]/30"
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 2.5, ease: "linear" }}
                          />
                        )}
                      </div>
                      <div className="text-[8px] font-mono text-white/30 mt-1">
                        {process.confidence}% confidence
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Process Summary */}
            <div className="mt-6 pt-4 border-t border-white/[0.05]">
              <div className="grid grid-cols-3 gap-2 text-[9px] font-mono">
                <div>
                  <div className="text-[#666666]">ACTIVE</div>
                  <div className="text-white mt-1">1</div>
                </div>
                <div>
                  <div className="text-[#666666]">QUEUED</div>
                  <div className="text-white mt-1">5</div>
                </div>
                <div>
                  <div className="text-[#666666]">COMPLETE</div>
                  <div className="text-[#00FFB2] mt-1">2,847</div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Panel - Network Flow Visualization */}
          <div className="flex-1 flex flex-col">
            <div className="text-[9px] font-mono text-[#666666] tracking-[0.3em] uppercase mb-4">
              INTELLIGENCE WEB
            </div>

            <div className="flex-1 bg-[#050505] border border-white/[0.05] rounded relative overflow-hidden">
              {/* Network visualization */}
              <svg ref={svgRef} className="absolute inset-0 w-full h-full">
                {/* Background grid */}
                <defs>
                  <pattern id="ultraGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="20" stroke="#00FFB2" strokeWidth="0.5" opacity="0.05" />
                    <line x1="0" y1="0" x2="20" y2="0" stroke="#00FFB2" strokeWidth="0.5" opacity="0.05" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#ultraGrid)" />

                {/* Network flow line */}
                <path
                  d={networkPath}
                  fill="none"
                  stroke="#00FFB2"
                  strokeWidth="1"
                  opacity="0.6"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Gradient fill under line */}
                <defs>
                  <linearGradient id="flowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00FFB2" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#00FFB2" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d={`${networkPath} L 100,100 L 0,100 Z`}
                  fill="url(#flowGradient)"
                  opacity="0.3"
                />

                {/* Data points */}
                {networkFlow.slice(-10).map((value, index) => {
                  const x = ((networkFlow.length - 10 + index) / (networkFlow.length - 1)) * 100
                  const y = 50 - (value / 100) * 40
                  return (
                    <circle
                      key={index}
                      cx={`${x}%`}
                      cy={`${y}%`}
                      r="2"
                      fill="#00FFB2"
                      opacity={0.8 - (index * 0.05)}
                    />
                  )
                })}
              </svg>

              {/* Overlay metrics */}
              <div className="absolute top-4 left-4 text-[9px] font-mono text-white/60">
                REASONING PATHS: 842 active
              </div>
              <div className="absolute bottom-4 right-4 text-[9px] font-mono text-white/60">
                DECISION TIME: 0.3ms AVG
              </div>
            </div>

            {/* Intelligence Stats */}
            <div className="mt-4 grid grid-cols-4 gap-2">
              {['LEARN', 'ADAPT', 'CONNECT', 'DECIDE'].map((stat, i) => (
                <div key={stat} className="text-center">
                  <div className="text-[8px] font-mono text-[#666666] mb-1">{stat}</div>
                  <div className="text-xs font-mono text-white">
                    {i === 0 ? '124K' : i === 1 ? '98K' : i === 2 ? '847' : '2.8K'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Compliance Matrix */}
          <div className="w-1/3 flex flex-col">
            <div className="text-[9px] font-mono text-[#666666] tracking-[0.3em] uppercase mb-4">
              SAFETY CONSTRAINTS
            </div>

            <div className="flex-1 flex flex-col justify-between">
              {/* Matrix visualization */}
              <div className="grid grid-cols-8 gap-1">
                {complianceMatrix.flat().map((value, index) => (
                  <motion.div
                    key={index}
                    className="aspect-square border border-white/10"
                    style={{
                      backgroundColor: value === 1 ? '#00FFB2' : 'transparent',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: value === 1 ? 0.3 : 0.05 }}
                    transition={{ duration: 0.3, delay: index * 0.01 }}
                  />
                ))}
              </div>

              {/* Compliance metrics */}
              <div className="space-y-3 mt-6">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-[9px] text-[#666666]">FDCPA</div>
                    <div className="text-[9px] font-mono text-[#00FFB2]">COMPLIANT</div>
                  </div>
                  <div className="h-[1px] bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-[#00FFB2]/30" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-[9px] text-[#666666]">TCPA</div>
                    <div className="text-[9px] font-mono text-[#00FFB2]">COMPLIANT</div>
                  </div>
                  <div className="h-[1px] bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-[#00FFB2]/30" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-[9px] text-[#666666]">FCRA</div>
                    <div className="text-[9px] font-mono text-[#00FFB2]">COMPLIANT</div>
                  </div>
                  <div className="h-[1px] bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-[#00FFB2]/30" />
                  </div>
                </div>
              </div>

              {/* Safety score */}
              <div className="mt-6 pt-4 border-t border-white/[0.05] text-center">
                <div className="text-[9px] text-[#666666] mb-2">SAFETY RATING</div>
                <div className="text-2xl font-mono text-[#00FFB2]">99.8%</div>
                <div className="text-[8px] font-mono text-[#666666] mt-1">ULTRA SAFE</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between">
          <div className="flex items-center gap-6 text-[9px] font-mono">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-[#00FFB2] rounded-full" />
              <span className="text-[#666666]">SYSTEM</span>
              <span className="text-white">KENDRA V3.0.0</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#666666]">REGION</span>
              <span className="text-white">US-EAST-1</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#666666]">CLUSTER</span>
              <span className="text-white">PROD-01</span>
            </div>
          </div>
          <div className="text-[9px] font-mono text-[#666666]">
            © 2025 KRIM AI · ENTERPRISE INTELLIGENCE RUNTIME
          </div>
        </div>
      </div>
    </div>
  )
}

export default KendraUltra