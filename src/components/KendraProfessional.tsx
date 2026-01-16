/**
 * KRIM AI - KENDRA PROFESSIONAL INTERFACE
 * Enterprise control system visualization inspired by Bloomberg Terminal
 * and industrial SCADA systems. Zero AI clichés, pure professional design.
 */

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

export default function KendraProfessional() {
  // Real-time data simulation - subtle updates like a trading terminal
  const [metrics, setMetrics] = useState({
    throughput: 2847,
    latency: 12,
    compliance: 100,
    active: 7,
    queue: 234,
    processed: 98476
  })

  const [auditLog, setAuditLog] = useState([
    { time: '14:32:41', action: 'COMPLIANCE_CHECK', status: 'PASS', id: 'CC-8947' },
    { time: '14:32:39', action: 'AGENT_DISPATCH', status: 'EXEC', id: 'AD-2341' },
    { time: '14:32:38', action: 'RISK_ANALYSIS', status: 'PASS', id: 'RA-7823' },
    { time: '14:32:35', action: 'DATA_VALIDATION', status: 'PASS', id: 'DV-4521' },
    { time: '14:32:34', action: 'AUTH_REQUEST', status: 'GRANT', id: 'AR-9876' }
  ])

  // Simulate real-time updates
  useEffect(() => {
    const metricsInterval = setInterval(() => {
      setMetrics(prev => ({
        throughput: prev.throughput + Math.floor(Math.random() * 10 - 3),
        latency: Math.max(8, Math.min(20, prev.latency + (Math.random() * 2 - 1))),
        compliance: 100,
        active: Math.floor(Math.random() * 3) + 6,
        queue: Math.max(200, prev.queue + Math.floor(Math.random() * 20 - 10)),
        processed: prev.processed + Math.floor(Math.random() * 5 + 1)
      }))
    }, 3000)

    const logInterval = setInterval(() => {
      const actions = ['COMPLIANCE_CHECK', 'AGENT_DISPATCH', 'RISK_ANALYSIS', 'DATA_VALIDATION', 'AUTH_REQUEST', 'AUDIT_WRITE', 'SYSTEM_CHECK']
      const statuses = ['PASS', 'EXEC', 'GRANT', 'VERIFY']
      const newEntry = {
        time: new Date().toTimeString().split(' ')[0],
        action: actions[Math.floor(Math.random() * actions.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        id: `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${Math.floor(Math.random() * 9000 + 1000)}`
      }
      setAuditLog(prev => [newEntry, ...prev.slice(0, 4)])
    }, 5000)

    return () => {
      clearInterval(metricsInterval)
      clearInterval(logInterval)
    }
  }, [])

  // Governance Matrix - shows control points
  const governanceMatrix = [
    ['AUTH', 'ACTIVE', 'ACTIVE', 'MONITOR', 'ACTIVE'],
    ['RISK', 'ACTIVE', 'ENFORCE', 'ACTIVE', 'ACTIVE'],
    ['COMP', 'ENFORCE', 'ACTIVE', 'ACTIVE', 'ENFORCE'],
    ['AUDIT', 'ACTIVE', 'ACTIVE', 'RECORD', 'ACTIVE'],
    ['DATA', 'MONITOR', 'ACTIVE', 'ACTIVE', 'VERIFY']
  ]

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Professional grid background - very subtle */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header - Clean and Professional */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-2">
                Kendra Control Interface
              </h2>
              <p className="text-[#666666] text-sm tracking-wide uppercase">
                Intelligence Governance & Compliance System
              </p>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="text-right">
                <div className="text-[#666666] text-xs uppercase tracking-wide mb-1">System Status</div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00FFB2] rounded-sm" />
                  <span className="text-white font-medium">OPERATIONAL</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[#666666] text-xs uppercase tracking-wide mb-1">Compliance</div>
                <div className="text-[#00FFB2] font-mono font-medium">100.0%</div>
              </div>
            </div>
          </div>

          {/* System Control Bar - Like Bloomberg Terminal */}
          <div className="bg-[#0A0A0A] border border-white/10 rounded-none p-1 flex items-center gap-1">
            {['MONITOR', 'CONTROL', 'AUDIT', 'ANALYZE', 'REPORT'].map((mode, idx) => (
              <button
                key={mode}
                className={`px-4 py-2 text-xs font-medium tracking-wider transition-colors duration-150 ${
                  idx === 0 
                    ? 'bg-[#00FFB2] text-black' 
                    : 'text-[#666666] hover:text-white hover:bg-white/5'
                }`}
              >
                {mode}
              </button>
            ))}
            <div className="ml-auto px-4 text-[#666666] text-xs font-mono">
              UTC {new Date().toISOString().split('T')[1].split('.')[0]}
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-12 gap-4 mb-8">
          {/* Left Panel - Performance Metrics */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-[#111111] border border-white/10 p-4">
              <div className="text-[#666666] text-xs uppercase tracking-wider mb-4">
                Performance Metrics
              </div>
              
              {/* Metric Cards */}
              <div className="space-y-3">
                <div className="bg-[#0A0A0A] p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#666666] text-xs uppercase">Throughput</span>
                    <span className="text-[#00FFB2] text-xs">▲ 2.3%</span>
                  </div>
                  <div className="text-white font-mono text-xl">{metrics.throughput}</div>
                  <div className="text-[#666666] text-xs">ops/min</div>
                </div>

                <div className="bg-[#0A0A0A] p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#666666] text-xs uppercase">Latency</span>
                    <span className="text-white text-xs">━</span>
                  </div>
                  <div className="text-white font-mono text-xl">{metrics.latency}ms</div>
                  <div className="text-[#666666] text-xs">p95 response</div>
                </div>

                <div className="bg-[#0A0A0A] p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#666666] text-xs uppercase">Queue Depth</span>
                    <span className="text-white text-xs">━</span>
                  </div>
                  <div className="text-white font-mono text-xl">{metrics.queue}</div>
                  <div className="text-[#666666] text-xs">pending</div>
                </div>

                <div className="bg-[#0A0A0A] p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#666666] text-xs uppercase">Processed</span>
                    <span className="text-[#00FFB2] text-xs">▲</span>
                  </div>
                  <div className="text-white font-mono text-xl">{metrics.processed.toLocaleString()}</div>
                  <div className="text-[#666666] text-xs">today</div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Panel - Governance Matrix */}
          <div className="col-span-12 lg:col-span-6">
            <div className="bg-[#111111] border border-white/10 p-4 h-full">
              <div className="text-[#666666] text-xs uppercase tracking-wider mb-4">
                Governance Control Matrix
              </div>
              
              {/* Matrix Grid */}
              <div className="bg-[#0A0A0A] p-4">
                <div className="grid grid-cols-5 gap-1">
                  {governanceMatrix.flat().map((status, idx) => (
                    <div
                      key={idx}
                      className={`
                        h-12 flex items-center justify-center text-xs font-mono
                        ${status === 'ACTIVE' ? 'bg-[#141414] text-[#00FFB2] border border-[#00FFB2]/20' : ''}
                        ${status === 'ENFORCE' ? 'bg-[#00FFB2]/10 text-[#00FFB2] border border-[#00FFB2]/30' : ''}
                        ${status === 'MONITOR' ? 'bg-[#141414] text-[#666666] border border-white/10' : ''}
                        ${status === 'VERIFY' ? 'bg-[#141414] text-white border border-white/20' : ''}
                        ${status === 'RECORD' ? 'bg-[#1A1A1A] text-[#B0B0B0] border border-white/10' : ''}
                        ${['AUTH', 'RISK', 'COMP', 'AUDIT', 'DATA'].includes(status) ? 'bg-[#0A0A0A] text-[#666666] font-bold border border-white/5' : ''}
                      `}
                    >
                      {status}
                    </div>
                  ))}
                </div>
                
                {/* Matrix Legend */}
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-6">
                  {[
                    { label: 'ACTIVE', color: 'text-[#00FFB2]' },
                    { label: 'ENFORCE', color: 'text-[#00FFB2] font-bold' },
                    { label: 'MONITOR', color: 'text-[#666666]' },
                    { label: 'VERIFY', color: 'text-white' }
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div className={`w-3 h-3 border ${item.color === 'text-[#00FFB2] font-bold' ? 'bg-[#00FFB2]/20 border-[#00FFB2]' : 'border-current'} ${item.color}`} />
                      <span className="text-[#666666] text-xs">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Control Parameters */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { label: 'Risk Threshold', value: '0.02', unit: '' },
                  { label: 'Compliance Level', value: '100', unit: '%' },
                  { label: 'Audit Frequency', value: '1.0', unit: 'Hz' }
                ].map(param => (
                  <div key={param.label} className="bg-[#0A0A0A] p-3">
                    <div className="text-[#666666] text-xs mb-1">{param.label}</div>
                    <div className="text-white font-mono">
                      {param.value}<span className="text-[#666666]">{param.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Audit Trail */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-[#111111] border border-white/10 p-4 h-full">
              <div className="text-[#666666] text-xs uppercase tracking-wider mb-4">
                Audit Trail
              </div>
              
              {/* Terminal-style audit log */}
              <div className="bg-black p-3 font-mono text-xs space-y-1 h-[340px] overflow-hidden">
                {auditLog.map((entry, idx) => (
                  <div key={idx} className={`flex items-center gap-2 ${idx === 0 ? 'text-white' : 'text-[#666666]'}`}>
                    <span className="text-[#444444]">{entry.time}</span>
                    <span className={entry.status === 'PASS' ? 'text-[#00FFB2]' : 'text-white'}>
                      [{entry.status}]
                    </span>
                    <span>{entry.action}</span>
                    <span className="text-[#444444]">#{entry.id}</span>
                  </div>
                ))}
              </div>
              
              {/* Audit Statistics */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="bg-[#0A0A0A] p-2 text-center">
                  <div className="text-[#00FFB2] font-mono text-lg">100%</div>
                  <div className="text-[#666666] text-xs">COMPLIANCE</div>
                </div>
                <div className="bg-[#0A0A0A] p-2 text-center">
                  <div className="text-white font-mono text-lg">{metrics.active}</div>
                  <div className="text-[#666666] text-xs">AGENTS</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Data Flow Visualization (No particles!) */}
        <div className="bg-[#111111] border border-white/10 p-6">
          <div className="text-[#666666] text-xs uppercase tracking-wider mb-4">
            System Architecture
          </div>
          
          {/* Professional flow diagram */}
          <div className="bg-[#0A0A0A] p-6">
            <div className="grid grid-cols-5 gap-4">
              {/* Input Sources */}
              <div>
                <div className="text-[#666666] text-xs uppercase mb-3">Sources</div>
                <div className="space-y-2">
                  {['API', 'BATCH', 'STREAM', 'MANUAL'].map(source => (
                    <div key={source} className="bg-[#111111] border border-white/10 px-3 py-2 text-xs text-[#666666]">
                      {source}
                    </div>
                  ))}
                </div>
              </div>

              {/* Validation Layer */}
              <div>
                <div className="text-[#666666] text-xs uppercase mb-3">Validation</div>
                <div className="bg-[#141414] border border-white/20 p-4 h-32 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-white font-mono text-2xl mb-1">
                      {metrics.throughput}
                    </div>
                    <div className="text-[#666666] text-xs">CHECKS/MIN</div>
                  </div>
                </div>
              </div>

              {/* Kendra Core */}
              <div>
                <div className="text-[#00FFB2] text-xs uppercase mb-3">Kendra Core</div>
                <div className="bg-[#00FFB2]/10 border-2 border-[#00FFB2]/30 p-4 h-32 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-[#00FFB2] text-xs font-bold mb-2">ORCHESTRATION</div>
                    <div className="grid grid-cols-3 gap-1">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-[#00FFB2]" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Processing Layer */}
              <div>
                <div className="text-[#666666] text-xs uppercase mb-3">Processing</div>
                <div className="bg-[#141414] border border-white/20 p-4 h-32 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-white font-mono text-2xl mb-1">
                      {metrics.active}
                    </div>
                    <div className="text-[#666666] text-xs">AGENTS</div>
                  </div>
                </div>
              </div>

              {/* Output Channels */}
              <div>
                <div className="text-[#666666] text-xs uppercase mb-3">Output</div>
                <div className="space-y-2">
                  {['ACTION', 'REPORT', 'ALERT', 'LOG'].map(output => (
                    <div key={output} className="bg-[#111111] border border-white/10 px-3 py-2 text-xs text-[#666666]">
                      {output}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Connection lines - static, no animation */}
            <div className="relative mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between text-xs">
                <div className="text-[#666666]">
                  <span className="font-mono">INPUT:</span> {metrics.queue} queued
                </div>
                <div className="text-[#666666]">
                  <span className="font-mono">LATENCY:</span> {metrics.latency}ms
                </div>
                <div className="text-[#666666]">
                  <span className="font-mono">OUTPUT:</span> {metrics.processed} processed
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional CTA */}
        <div className="mt-8 flex items-center justify-between">
          <div className="text-[#666666] text-sm">
            Enterprise-grade AI orchestration and governance platform
          </div>
          <button className="bg-[#00FFB2] text-black px-6 py-3 font-medium hover:brightness-110 active:scale-[0.98] transition-all duration-150">
            Request Technical Documentation
          </button>
        </div>
      </div>
    </section>
  )
}