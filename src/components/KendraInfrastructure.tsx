/**
 * KRIM AI - KENDRA INFRASTRUCTURE VISUALIZATION
 * Enterprise-grade visual representation of the Kendra runtime
 * Replaces particle effects with trust-building system visualization
 */

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { CheckCircle, Shield, Database, Users, ChartBar, Lightning } from '@phosphor-icons/react'

export default function KendraInfrastructure() {
  const [systemMetrics, setSystemMetrics] = useState({
    operations: 24847,
    compliance: 100,
    agents: 7,
    uptime: 99.98
  })

  // Simulate real-time metric updates (subtle, not distracting)
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        operations: prev.operations + Math.floor(Math.random() * 5),
        compliance: 100, // Always compliant
        agents: 7 + Math.floor(Math.random() * 3),
        uptime: 99.98
      }))
    }, 5000) // Update every 5 seconds, not constantly

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 md:py-24 relative">
      {/* Subtle grid background - infrastructure feel */}
      <div className="absolute inset-0 bg-[#0A0A14] opacity-50">
        <div className="absolute inset-0 bg-grid bg-[size:40px_40px] opacity-[0.02]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header - Clear and Direct */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            Kendra™
          </h2>
          <p className="text-xl md:text-2xl text-[#B0B0B0] font-medium">
            Credit Operations Operating System
          </p>
        </motion.div>

        {/* System Architecture Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          {/* Architecture Diagram Container */}
          <div className="bg-[#111111] rounded-xl p-8 border border-white/10">
            {/* Status Bar */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#00FFB2] rounded-full animate-pulse" />
                <span className="text-white font-medium">System Status: OPERATIONAL</span>
              </div>
              <div className="text-[#666666] text-sm">
                Uptime: {systemMetrics.uptime}%
              </div>
            </div>

            {/* Three-Layer Architecture */}
            <div className="space-y-6">
              {/* Layer 3: AI Agents (Top) */}
              <div className="relative">
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 text-[#666666] text-sm font-medium">
                  LAYER 3
                </div>
                <div className="bg-[#0A0A0A] rounded-lg p-6 border border-white/10 ml-12">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold">AI Agent Layer</h3>
                    <span className="text-[#00FFB2] text-sm font-medium">
                      {systemMetrics.agents} ACTIVE
                    </span>
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                    {['Collector', 'Negotiator', 'Analyst', 'Auditor', 'Scheduler', 'Reporter'].map((agent) => (
                      <div key={agent} className="text-center">
                        <div className="w-12 h-12 mx-auto mb-2 bg-[#111111] rounded-lg border border-white/20 flex items-center justify-center">
                          <Users size={20} className="text-[#00FFB2]" />
                        </div>
                        <span className="text-[#666666] text-xs">{agent}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Connection Lines */}
              <div className="flex justify-center">
                <div className="w-px h-8 bg-white/20" />
              </div>

              {/* Layer 2: Kendra Runtime (Middle) */}
              <div className="relative">
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 text-[#666666] text-sm font-medium">
                  LAYER 2
                </div>
                <div className="bg-[#141414] rounded-lg p-6 border-2 border-[#00FFB2]/30 ml-12">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold text-lg">Kendra Runtime</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Shield size={16} className="text-[#00FFB2]" />
                        <span className="text-[#B0B0B0] text-sm">Governance Active</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Lightning size={16} className="text-[#00FFB2]" />
                        <span className="text-[#B0B0B0] text-sm">Orchestrating</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#0A0A0A] rounded-lg p-3 border border-white/10">
                      <span className="text-[#666666] text-xs">COMPLIANCE</span>
                      <p className="text-white font-semibold mt-1">{systemMetrics.compliance}%</p>
                    </div>
                    <div className="bg-[#0A0A0A] rounded-lg p-3 border border-white/10">
                      <span className="text-[#666666] text-xs">OPERATIONS/DAY</span>
                      <p className="text-white font-semibold mt-1">{systemMetrics.operations.toLocaleString()}</p>
                    </div>
                    <div className="bg-[#0A0A0A] rounded-lg p-3 border border-white/10">
                      <span className="text-[#666666] text-xs">AUDIT TRAIL</span>
                      <p className="text-white font-semibold mt-1">RECORDING</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connection Lines */}
              <div className="flex justify-center">
                <div className="w-px h-8 bg-white/20" />
              </div>

              {/* Layer 1: Existing Systems (Bottom) */}
              <div className="relative">
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 text-[#666666] text-sm font-medium">
                  LAYER 1
                </div>
                <div className="bg-[#0A0A0A] rounded-lg p-6 border border-white/10 ml-12 opacity-60">
                  <h3 className="text-[#B0B0B0] font-semibold mb-4">Existing Infrastructure</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Core Banking', 'CRM System', 'Data Warehouse', 'Communication APIs'].map((system) => (
                      <div key={system} className="flex items-center gap-2">
                        <Database size={16} className="text-[#666666]" />
                        <span className="text-[#666666] text-sm">{system}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Capabilities - No animations, just solid value props */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            {
              title: 'Enterprise Governance',
              metric: '100% Compliant',
              icon: Shield,
              description: 'Built-in regulatory compliance and audit trails'
            },
            {
              title: 'Multi-Agent Orchestration',
              metric: '10+ AI Agents',
              icon: Users,
              description: 'Coordinate specialized agents for every operation'
            },
            {
              title: 'Real-time Operations',
              metric: '24/7 Active',
              icon: Lightning,
              description: 'Continuous processing with human oversight'
            },
            {
              title: 'Performance Analytics',
              metric: '360° Visibility',
              icon: ChartBar,
              description: 'Complete operational transparency and control'
            }
          ].map((capability, index) => {
            const Icon = capability.icon
            return (
              <div
                key={index}
                className="bg-[#111111] rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors duration-150"
              >
                <Icon size={24} className="text-[#00FFB2] mb-4" />
                <h3 className="text-white font-semibold mb-1">{capability.title}</h3>
                <p className="text-[#00FFB2] text-sm font-medium mb-3">{capability.metric}</p>
                <p className="text-[#666666] text-sm">{capability.description}</p>
              </div>
            )
          })}
        </motion.div>

        {/* Single CTA - Clear and Professional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="/kendra"
            className="inline-flex items-center gap-2 bg-[#00FFB2] text-black px-8 py-4 rounded-lg font-medium hover:brightness-110 active:scale-[0.98] transition-all duration-150"
          >
            View Technical Architecture
            <ChartBar size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}