/**
 * KRIM AI - KENDRA RUNTIME PAGE
 * Enterprise infrastructure presentation for bank operations
 * Focus on control, governance, and operational command
 */

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Shield, 
  Lightning, 
  Database, 
  Users, 
  ChartBar,
  CheckCircle,
  Lock,
  Cpu,
  GitBranch,
  Terminal,
  CloudArrowUp,
  Gauge,
  FileText
} from '@phosphor-icons/react'

export default function KendraRuntime() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'architecture' | 'governance' | 'integration'>('architecture')

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors duration-150"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-lg">Kendra™</span>
              <span className="text-[#666666] text-sm">v2.4.0</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#00FFB2] rounded-full animate-pulse" />
              <span className="text-[#B0B0B0] text-sm">System Operational</span>
            </div>
            <button
              onClick={() => navigate('/contact')}
              className="bg-[#00FFB2] text-black px-6 py-2 rounded-lg font-medium hover:brightness-110 transition-all duration-150"
            >
              Request Architecture Review
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Command Center Feel */}
      <section className="relative min-h-[700px] lg:min-h-[800px] xl:min-h-[900px] flex items-center justify-center pt-32 pb-20 px-6">
        <div className="relative w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8 lg:space-y-10"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              <span className="bg-gradient-to-r from-[#00FFB2] to-[#00E5FF] bg-clip-text text-transparent font-black">
                Kendra™ Runtime
              </span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-[#B0B0B0] mb-12 leading-relaxed max-w-4xl mx-auto">
              Multi-Agent Operating System for Autonomous Banks
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-[#00FFB2]" />
                <span className="text-[#B0B0B0]">SOC2 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock size={16} className="text-[#00FFB2]" />
                <span className="text-[#B0B0B0]">Bank-Grade Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Lightning size={16} className="text-[#00FFB2]" />
                <span className="text-[#B0B0B0]">99.99% Uptime SLA</span>
              </div>
            </div>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-[#111111] rounded-xl p-1 border border-white/10">
              {(['architecture', 'governance', 'integration'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-150 ${
                    activeTab === tab
                      ? 'bg-[#00FFB2] text-black'
                      : 'text-[#B0B0B0] hover:text-white'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 'architecture' && (
              <div className="space-y-8">
                {/* System Layers Diagram */}
                <div className="bg-[#111111] rounded-xl p-8 border border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-6">Three-Layer Architecture</h2>
                  
                  {/* Visual Architecture */}
                  <div className="space-y-6">
                    {/* Command Layer */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-1">
                        <div className="bg-[#0A0A0A] rounded-lg p-6 border-2 border-[#00E5FF]/30 h-full">
                          <div className="flex items-center gap-3 mb-4">
                            <Terminal size={24} className="text-[#00E5FF]" />
                            <h3 className="text-lg font-semibold text-white">Command Layer</h3>
                          </div>
                          <p className="text-[#B0B0B0] text-sm mb-4">
                            Natural language interface for strategic control and monitoring
                          </p>
                          <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-[#00E5FF] rounded-full" />
                              <span className="text-[#666666] text-sm">Portfolio analytics</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-[#00E5FF] rounded-full" />
                              <span className="text-[#666666] text-sm">Decision support</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-[#00E5FF] rounded-full" />
                              <span className="text-[#666666] text-sm">Performance KPIs</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Runtime Layer */}
                      <div className="lg:col-span-1">
                        <div className="bg-[#141414] rounded-lg p-6 border-2 border-[#00FFB2]/50 h-full">
                          <div className="flex items-center gap-3 mb-4">
                            <Cpu size={24} className="text-[#00FFB2]" />
                            <h3 className="text-lg font-semibold text-white">Runtime Layer</h3>
                          </div>
                          <p className="text-[#B0B0B0] text-sm mb-4">
                            Core orchestration engine with governance and compliance
                          </p>
                          <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-[#00FFB2] rounded-full" />
                              <span className="text-[#666666] text-sm">Agent orchestration</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-[#00FFB2] rounded-full" />
                              <span className="text-[#666666] text-sm">Workflow engine</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-[#00FFB2] rounded-full" />
                              <span className="text-[#666666] text-sm">Compliance rules</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Execution Layer */}
                      <div className="lg:col-span-1">
                        <div className="bg-[#0A0A0A] rounded-lg p-6 border-2 border-[#B794F6]/30 h-full">
                          <div className="flex items-center gap-3 mb-4">
                            <Users size={24} className="text-[#B794F6]" />
                            <h3 className="text-lg font-semibold text-white">Execution Layer</h3>
                          </div>
                          <p className="text-[#B0B0B0] text-sm mb-4">
                            Specialized AI agents for autonomous operations
                          </p>
                          <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-[#B794F6] rounded-full" />
                              <span className="text-[#666666] text-sm">Collection agents</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-[#B794F6] rounded-full" />
                              <span className="text-[#666666] text-sm">Analysis agents</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-[#B794F6] rounded-full" />
                              <span className="text-[#666666] text-sm">Communication agents</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Data Flow Visualization */}
                    <div className="bg-[#0A0A0A] rounded-lg p-6 border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4">Data Flow & Processing</h3>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="bg-[#111111] rounded-lg p-4 mb-2">
                            <Database size={32} className="text-[#666666] mx-auto" />
                          </div>
                          <span className="text-[#666666] text-sm">Data Sources</span>
                        </div>
                        <div className="text-center">
                          <div className="bg-[#111111] rounded-lg p-4 mb-2">
                            <GitBranch size={32} className="text-[#00FFB2] mx-auto" />
                          </div>
                          <span className="text-[#00FFB2] text-sm font-medium">Kendra Runtime</span>
                        </div>
                        <div className="text-center">
                          <div className="bg-[#111111] rounded-lg p-4 mb-2">
                            <Users size={32} className="text-[#B794F6] mx-auto" />
                          </div>
                          <span className="text-[#B794F6] text-sm">AI Agents</span>
                        </div>
                        <div className="text-center">
                          <div className="bg-[#111111] rounded-lg p-4 mb-2">
                            <ChartBar size={32} className="text-[#00E5FF] mx-auto" />
                          </div>
                          <span className="text-[#00E5FF] text-sm">Outcomes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { label: 'Response Time', value: '<200ms', icon: Gauge },
                    { label: 'Daily Operations', value: '50K+', icon: Lightning },
                    { label: 'Agent Efficiency', value: '94%', icon: ChartBar },
                    { label: 'Error Rate', value: '<0.01%', icon: Shield }
                  ].map((metric, index) => {
                    const Icon = metric.icon
                    return (
                      <motion.div key={index} className="group relative" whileHover={{ y: -6, scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                        <div className="relative h-full p-6 rounded-xl overflow-hidden">
                          {/* Multi-layer background for depth */}
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.06] to-cyan-600/[0.03] rounded-xl" />
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] to-transparent rounded-xl" />
                          <div className="absolute inset-0 backdrop-blur-xl rounded-xl" />
                          
                          {/* Border with gradient */}
                          <div className="absolute inset-0 rounded-xl border border-cyan-400/15 group-hover:border-cyan-400/35 transition-colors duration-500" />
                          
                          {/* Glow effect on hover - THE HIGHLIGHTING AURA */}
                          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-400/8 to-transparent" />
                          
                          {/* Content with icon animations */}
                          <div className="relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-400/25 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-cyan-500/15">
                              <Icon size={24} className="text-cyan-400" />
                            </div>
                            <p className="text-sm text-white/70 mb-1">{metric.label}</p>
                            <p className="text-2xl font-bold text-white">{metric.value}</p>
                          </div>
                          
                          {/* Bottom accent line with animation */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-xl" />
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}

            {activeTab === 'governance' && (
              <div className="space-y-8">
                {/* Compliance Framework */}
                <div className="bg-[#111111] rounded-xl p-8 border border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-6">Enterprise Governance Framework</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Compliance Controls */}
                    <div className="bg-[#0A0A0A] rounded-lg p-6 border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4">Compliance Controls</h3>
                      <div className="space-y-3">
                        {[
                          'FDCPA adherence monitoring',
                          'TCPA compliance enforcement',
                          'State-specific regulation tracking',
                          'Real-time violation prevention',
                          'Automated compliance reporting'
                        ].map((item, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle size={16} className="text-[#00FFB2] flex-shrink-0" />
                            <span className="text-[#B0B0B0] text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Audit Capabilities */}
                    <div className="bg-[#0A0A0A] rounded-lg p-6 border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4">Audit & Transparency</h3>
                      <div className="space-y-3">
                        {[
                          'Complete action logging',
                          'Decision explanation trails',
                          'Agent behavior tracking',
                          'Immutable audit records',
                          'Regulatory report generation'
                        ].map((item, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <FileText size={16} className="text-[#00FFB2] flex-shrink-0" />
                            <span className="text-[#B0B0B0] text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Risk Management */}
                  <div className="mt-6 bg-[#0A0A0A] rounded-lg p-6 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">Risk Management Protocol</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#00FFB2] mb-2">100%</div>
                        <p className="text-[#666666] text-sm">Decision Traceability</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#00FFB2] mb-2">Real-time</div>
                        <p className="text-[#666666] text-sm">Compliance Monitoring</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#00FFB2] mb-2">Zero</div>
                        <p className="text-[#666666] text-sm">Tolerance for Violations</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Features */}
                <div className="bg-[#111111] rounded-xl p-8 border border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-6">Security Infrastructure</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        title: 'Data Protection',
                        items: ['256-bit encryption', 'At-rest & in-transit', 'Key rotation']
                      },
                      {
                        title: 'Access Control',
                        items: ['Role-based access', 'MFA enforcement', 'Session management']
                      },
                      {
                        title: 'Infrastructure',
                        items: ['SOC2 certified', 'ISO 27001 compliant', '24/7 monitoring']
                      }
                    ].map((section, index) => (
                      <div key={index} className="bg-[#0A0A0A] rounded-lg p-6 border border-white/10">
                        <Lock size={24} className="text-[#00FFB2] mb-3" />
                        <h3 className="text-white font-semibold mb-3">{section.title}</h3>
                        <ul className="space-y-2">
                          {section.items.map((item, i) => (
                            <li key={i} className="text-[#666666] text-sm">{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'integration' && (
              <div className="space-y-8">
                {/* Integration Overview */}
                <div className="bg-[#111111] rounded-xl p-8 border border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-6">System Integration</h2>
                  
                  {/* API Gateway */}
                  <div className="bg-[#0A0A0A] rounded-lg p-6 border border-white/10 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">API Gateway</h3>
                      <span className="text-[#00FFB2] text-sm font-medium">REST & GraphQL</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-[#111111] rounded-lg p-4 border border-white/10">
                        <CloudArrowUp size={20} className="text-[#00FFB2] mb-2" />
                        <p className="text-white font-medium mb-1">Ingestion APIs</p>
                        <p className="text-[#666666] text-xs">Real-time data streaming</p>
                      </div>
                      <div className="bg-[#111111] rounded-lg p-4 border border-white/10">
                        <GitBranch size={20} className="text-[#00FFB2] mb-2" />
                        <p className="text-white font-medium mb-1">Webhook Events</p>
                        <p className="text-[#666666] text-xs">Bi-directional sync</p>
                      </div>
                      <div className="bg-[#111111] rounded-lg p-4 border border-white/10">
                        <Database size={20} className="text-[#00FFB2] mb-2" />
                        <p className="text-white font-medium mb-1">Batch Processing</p>
                        <p className="text-[#666666] text-xs">Scheduled ETL pipelines</p>
                      </div>
                    </div>
                  </div>

                  {/* Supported Systems */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Pre-built Integrations</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        'Salesforce', 'Microsoft Dynamics', 'Oracle Siebel', 'SAP',
                        'Temenos', 'Finastra', 'FIS', 'Jack Henry',
                        'Twilio', 'SendGrid', 'AWS Connect', 'Genesys',
                        'Snowflake', 'Databricks', 'BigQuery', 'Redshift'
                      ].map((system) => (
                        <div key={system} className="bg-[#0A0A0A] rounded-lg p-3 border border-white/10 text-center">
                          <span className="text-[#B0B0B0] text-sm">{system}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Implementation Timeline */}
                  <div className="bg-[#0A0A0A] rounded-lg p-6 border border-white/10 mt-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Typical Implementation</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#111111] rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-[#00FFB2] font-bold">W1</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">System Assessment</p>
                          <p className="text-[#666666] text-sm">Architecture review & integration planning</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#111111] rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-[#00FFB2] font-bold">W2-3</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">Integration Setup</p>
                          <p className="text-[#666666] text-sm">API configuration & data mapping</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#111111] rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-[#00FFB2] font-bold">W4</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">Testing & Validation</p>
                          <p className="text-[#666666] text-sm">UAT & compliance verification</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#111111] rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-[#00FFB2] font-bold">W5+</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">Go Live</p>
                          <p className="text-[#666666] text-sm">Production deployment & monitoring</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready for Enterprise-Grade Bank Operations?
          </h2>
          <p className="text-[#B0B0B0] mb-8 max-w-2xl mx-auto">
            Schedule an architecture review with our solutions team to see how Kendra can transform your bank operations.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="bg-[#00FFB2] text-black px-8 py-4 rounded-lg font-medium hover:brightness-110 transition-all duration-150"
            >
              Request Architecture Review
            </button>
            <button
              onClick={() => navigate('/docs')}
              className="border border-white/20 text-white px-8 py-4 rounded-lg font-medium hover:border-[#00FFB2] hover:text-[#00FFB2] transition-colors duration-150"
            >
              Technical Documentation
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}