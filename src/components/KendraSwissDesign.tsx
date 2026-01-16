/**
 * KRIM AI - KENDRA SWISS DESIGN
 * Minimal, precise, data-driven interface following Swiss design principles
 * Focus on typography, grid, and information hierarchy
 */

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function KendraSwissDesign() {
  const [systemState, setSystemState] = useState({
    compliance: [100, 100, 100, 100, 100, 100, 100, 100],
    load: [42, 38, 45, 41, 44, 40, 43, 42],
    agents: {
      analysis: { status: 'active', load: 67 },
      validation: { status: 'active', load: 45 },
      execution: { status: 'active', load: 82 },
      monitoring: { status: 'active', load: 23 },
      reporting: { status: 'idle', load: 0 },
      audit: { status: 'active', load: 100 }
    }
  })

  // Minimal, professional data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemState(prev => ({
        ...prev,
        load: [...prev.load.slice(1), Math.floor(Math.random() * 10 + 38)],
        agents: {
          ...prev.agents,
          analysis: { ...prev.agents.analysis, load: Math.floor(Math.random() * 30 + 50) },
          validation: { ...prev.agents.validation, load: Math.floor(Math.random() * 20 + 40) },
          execution: { ...prev.agents.execution, load: Math.floor(Math.random() * 20 + 70) }
        }
      }))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 md:py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Minimal Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
            Kendra
          </h1>
          <p className="text-[#666666] text-lg">
            Intelligent orchestration infrastructure
          </p>
        </div>

        {/* Main Grid Layout - Swiss precision */}
        <div className="grid grid-cols-12 gap-px bg-white/10">
          
          {/* System Status - Large, clear indicator */}
          <div className="col-span-12 md:col-span-4 bg-[#0A0A0A] p-8">
            <div className="mb-4">
              <div className="text-[#666666] text-xs uppercase tracking-[0.2em] mb-6">
                System Status
              </div>
              <div className="flex items-baseline gap-3">
                <div className="text-6xl font-bold text-[#00FFB2]">100</div>
                <div className="text-2xl text-[#00FFB2]">%</div>
              </div>
              <div className="text-white mt-2">Operational</div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#666666] text-sm">Uptime</span>
                  <span className="text-white font-mono">99.98%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#666666] text-sm">Response</span>
                  <span className="text-white font-mono">12ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#666666] text-sm">Throughput</span>
                  <span className="text-white font-mono">2,847/m</span>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Grid - Visual representation */}
          <div className="col-span-12 md:col-span-8 bg-[#0A0A0A] p-8">
            <div className="text-[#666666] text-xs uppercase tracking-[0.2em] mb-6">
              Compliance Matrix
            </div>
            
            {/* Matrix visualization */}
            <div className="grid grid-cols-8 gap-2 mb-8">
              {['GDPR', 'SOC2', 'ISO', 'PCI', 'CCPA', 'HIPAA', 'FCA', 'MAS'].map((reg, idx) => (
                <div key={reg} className="text-center">
                  <div className={`aspect-square bg-[#111111] border ${systemState.compliance[idx] === 100 ? 'border-[#00FFB2]/30' : 'border-white/10'} flex items-center justify-center mb-2`}>
                    <div className={`text-2xl font-bold ${systemState.compliance[idx] === 100 ? 'text-[#00FFB2]' : 'text-white'}`}>
                      {systemState.compliance[idx]}
                    </div>
                  </div>
                  <div className="text-[#666666] text-xs">{reg}</div>
                </div>
              ))}
            </div>

            {/* Load visualization - minimal sparkline */}
            <div className="border-t border-white/10 pt-6">
              <div className="text-[#666666] text-xs uppercase tracking-[0.2em] mb-4">
                System Load (8H)
              </div>
              <div className="flex items-end h-16 gap-1">
                {systemState.load.map((value, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-white/20 transition-all duration-500"
                    style={{ height: `${value}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-[#666666] text-xs">
                <span>-8h</span>
                <span>-4h</span>
                <span>now</span>
              </div>
            </div>
          </div>

          {/* Agent Status Grid */}
          <div className="col-span-12 bg-[#0A0A0A]">
            <div className="grid grid-cols-6 gap-px bg-white/10">
              {Object.entries(systemState.agents).map(([name, agent]) => (
                <div key={name} className="bg-[#0A0A0A] p-6">
                  <div className="text-[#666666] text-xs uppercase tracking-[0.1em] mb-3">
                    {name}
                  </div>
                  <div className="mb-3">
                    <div className="text-2xl font-bold text-white mb-1">
                      {agent.load}%
                    </div>
                    <div className={`text-xs ${agent.status === 'active' ? 'text-[#00FFB2]' : 'text-[#666666]'}`}>
                      {agent.status.toUpperCase()}
                    </div>
                  </div>
                  {/* Load bar */}
                  <div className="h-1 bg-[#111111] relative overflow-hidden">
                    <div 
                      className={`absolute left-0 top-0 h-full transition-all duration-1000 ${
                        agent.status === 'active' ? 'bg-[#00FFB2]' : 'bg-white/20'
                      }`}
                      style={{ width: `${agent.load}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Control Interface */}
          <div className="col-span-12 bg-[#0A0A0A] p-8">
            <div className="grid grid-cols-12 gap-8">
              {/* Governance Controls */}
              <div className="col-span-12 md:col-span-6">
                <div className="text-[#666666] text-xs uppercase tracking-[0.2em] mb-6">
                  Governance Controls
                </div>
                
                <div className="space-y-4">
                  {[
                    { label: 'Risk Tolerance', value: 'Conservative', options: ['Conservative', 'Moderate', 'Aggressive'] },
                    { label: 'Audit Frequency', value: 'Continuous', options: ['Continuous', 'Hourly', 'Daily'] },
                    { label: 'Compliance Mode', value: 'Enforce', options: ['Monitor', 'Alert', 'Enforce'] },
                    { label: 'Data Retention', value: '90 Days', options: ['30 Days', '90 Days', '365 Days'] }
                  ].map((control) => (
                    <div key={control.label} className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-white">{control.label}</span>
                      <div className="flex gap-2">
                        {control.options.map((option) => (
                          <button
                            key={option}
                            className={`px-3 py-1 text-xs transition-colors duration-150 ${
                              option === control.value
                                ? 'bg-[#00FFB2] text-black font-medium'
                                : 'text-[#666666] hover:text-white'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Operation Metrics */}
              <div className="col-span-12 md:col-span-6">
                <div className="text-[#666666] text-xs uppercase tracking-[0.2em] mb-6">
                  Operation Metrics
                </div>
                
                <div className="bg-[#111111] p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-3xl font-bold text-white mb-1">24,847</div>
                      <div className="text-[#666666] text-sm">Operations Today</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-1">7</div>
                      <div className="text-[#666666] text-sm">Active Agents</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-[#00FFB2] mb-1">100%</div>
                      <div className="text-[#666666] text-sm">Compliance Rate</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-1">0</div>
                      <div className="text-[#666666] text-sm">Violations</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal footer */}
        <div className="mt-16 flex items-center justify-between">
          <div>
            <div className="text-white font-medium mb-1">
              Enterprise AI Governance Platform
            </div>
            <div className="text-[#666666] text-sm">
              Maintaining operational excellence through intelligent orchestration
            </div>
          </div>
          <button className="bg-[#00FFB2] text-black px-8 py-4 font-medium hover:brightness-110 active:scale-[0.98] transition-all duration-150">
            View Documentation
          </button>
        </div>
      </div>
    </section>
  )
}