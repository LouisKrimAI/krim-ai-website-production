/**
 * AI Copilot Enterprise Software Section
 * Command Center for Multi-Agentic Credit Servicing Platform
 * Executive-focused messaging with enterprise software UI mockups
 */

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendUp, Brain, Monitor, Gear, ChartBarHorizontal, Pulse, Target, ShieldCheck, CaretRight, Play, CornersOut, Users, CurrencyDollar, Clock, CheckCircle, ChartBar, Shield } from '@phosphor-icons/react'
import Card from '../Card'
import Button from '../Button'
import { AgentAvatar, DashboardScreenshot } from '../Asset'

export default function AICopilotEnterpriseSection() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isPlaying, setIsPlaying] = useState(false)
  
  // Real-time metrics animation
  const [metrics, setMetrics] = useState({
    activeLoans: 47832,
    processingTime: 90,
    contactRate: 65,
    complianceScore: 100
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        activeLoans: prev.activeLoans + Math.floor(Math.random() * 5),
        processingTime: 85 + Math.floor(Math.random() * 10),
        contactRate: 63 + Math.floor(Math.random() * 4),
        complianceScore: 99.8 + Math.random() * 0.2
      }))
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative py-32 z-content overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-krim-cyan/[0.03] via-transparent to-krim-mint/[0.03]" />
      <div className="absolute inset-0 opacity-[0.02] bg-grid bg-[size:40px_40px]" />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-krim-mint/10 to-krim-cyan/10 backdrop-blur-sm border border-krim-mint/20 rounded-full px-6 py-3 mb-6"
          >
            <Brain className="w-5 h-5 text-krim-mint" />
            <span className="text-sm font-semibold text-krim-mint uppercase tracking-wider">
              Executive Command Center
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-white">
            Your <span className="text-gradient">AI Copilot</span> Transforms<br />
            $47B Cost Centers Into Profit Drivers
          </h2>
          
          <p className="text-xl text-white max-w-4xl mx-auto mb-8">
            Your AI Copilot commands both your enterprise software AND your autonomous workforce.
            Orchestrate <span className="text-krim-mint font-semibold">12 specialized agents</span> across
            systems, dashboards, and real-time operations. Strategic oversight meets autonomous execution
            with unified control over <span className="text-krim-mint font-semibold">technology + agentic workforce</span>.
          </p>
        </motion.div>

        {/* Main Dashboard Interface */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Left Column - Control Panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <ExecutiveControlPanel 
              activeTab={activeTab} 
              setActiveTab={setActiveTab}
              metrics={metrics}
            />
          </motion.div>

          {/* Right Column - Main Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-2"
          >
            <DashboardInterface 
              activeTab={activeTab} 
              metrics={metrics}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          </motion.div>
        </div>

        {/* Agent Workforce Visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <Card className="p-8 glass-effect relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-krim-mint/5 via-transparent to-krim-cyan/5" />
            
            <div className="relative grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-krim-mint/10 rounded-full px-4 py-2 mb-4">
                  <Users className="w-4 h-4 text-krim-mint" />
                  <span className="text-xs font-semibold text-krim-mint uppercase tracking-wider">
                    Digital Workforce
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 text-white">
                  Your AI Copilot Commands <span className="text-gradient">12 Specialized Agents</span>
                </h3>
                <p className="text-lg text-white mb-6 leading-relaxed">
                  While your competitors struggle with 80 calls per day per human agent, your AI Copilot 
                  orchestrates autonomous agents processing <span className="text-krim-mint font-semibold">10,000+ calls daily</span>. 
                  Each agent masters specific credit servicing domains with behavioral intelligence from 
                  <span className="text-krim-mint font-semibold">validated behavioral models</span> - delivering 35% higher collection rates 
                  with zero compliance violations.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-krim-mint" />
                    <span>FDCPA/TCPA Compliant</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-krim-mint" />
                    <span>Real-time Coordination</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-krim-mint" />
                    <span>Behavioral AI Models</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-krim-mint" />
                    <span>Enterprise Integration</span>
                  </div>
                </div>
                <Button magnetic>
                  Explore Agent Capabilities
                  <CaretRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
              
              <div className="relative">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="relative"
                >
                  <AgentAvatar
                    variant="workforce"
                    className="w-full rounded-xl shadow-2xl border border-white/10"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/20 to-transparent rounded-xl" />
                  
                  {/* Floating metrics */}
                  <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-4 right-4 bg-krim-mint/20 backdrop-blur-sm border border-krim-mint/30 rounded-lg p-3"
                  >
                    <div className="text-krim-mint text-xs font-semibold">12 Active Agents</div>
                    <div className="text-white text-lg font-bold">98.7% Uptime</div>
                  </motion.div>
                  
                  <motion.div
                    animate={{ y: [5, -5, 5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-4 left-4 bg-krim-cyan/20 backdrop-blur-sm border border-krim-cyan/30 rounded-lg p-3"
                  >
                    <div className="text-krim-cyan text-xs font-semibold">Processing Now</div>
                    <div className="text-white text-lg font-bold">24,891 Tasks</div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Platform Integration Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          <PlatformFeature
            icon={<Monitor className="w-8 h-8" />}
            title="Multi-Dashboard Command Center"
            description="Your AI Copilot unifies every enterprise system—CRM, LMS, compliance tools—into one strategic control layer with comprehensive interaction insights"
            color="mint"
          />
          <PlatformFeature
            icon={<Gear className="w-8 h-8" />}
            title="Autonomous Orchestration"
            description="While you sleep, your AI Copilot coordinates 10,000+ concurrent conversations across all channels"
            color="cyan"
          />
          <PlatformFeature
            icon={<Target className="w-8 h-8" />}
            title="Profit Prediction Engine"
            description="AI Copilot forecasts which accounts will pay, default, or need intervention - 94% accuracy proven"
            color="purple"
          />
          <PlatformFeature
            icon={<ShieldCheck className="w-8 h-8" />}
            title="Zero-Risk Compliance Shield"
            description="Your AI Copilot makes violations physically impossible - zero violations across extensive validation"
            color="coral"
          />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-center"
        >
          <div className="mb-6">
            <p className="text-lg text-krim-coral font-semibold mb-2">
              Every day you operate manual processes, competitors pull further ahead
            </p>
            <p className="text-white">
              Join 50+ financial institutions already processing $200M+ monthly with AI Copilot orchestration
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" magnetic glow>
              Calculate My 3.2-Month Payback
              <Play className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="secondary" size="lg" magnetic>
              See AI Copilot Transform Collections
              <CaretRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
          <div className="mt-4 text-sm text-white">
            <span className="text-krim-mint">✓</span> 15% collection improvement guaranteed within 90 days
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Executive Control Panel Component
function ExecutiveControlPanel({ activeTab, setActiveTab, metrics }: {
  activeTab: string
  setActiveTab: (tab: string) => void
  metrics: any
}) {
  const tabs = [
    { id: 'overview', label: 'Portfolio Overview', icon: ChartBar },
    { id: 'agents', label: 'Agent Status', icon: Users },
    { id: 'performance', label: 'Performance', icon: TrendUp },
    { id: 'compliance', label: 'Compliance', icon: Shield }
  ]

  return (
    <Card className="p-6 glass-effect h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-krim-mint to-krim-cyan rounded-lg flex items-center justify-center">
          <Monitor className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">AI Copilot Command Center</h3>
          <p className="text-sm text-white">Strategic oversight with autonomous execution</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="space-y-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
              activeTab === tab.id 
                ? 'bg-krim-mint/20 border border-krim-mint/30 text-krim-mint' 
                : 'hover:bg-white/5 text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Quick Metrics */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-krim-mint/10 to-transparent rounded-lg border border-krim-mint/20">
          <div className="flex items-center gap-2">
            <Pulse className="w-4 h-4 text-krim-mint" />
            <span className="text-sm font-medium">Active Loans</span>
          </div>
          <motion.span 
            key={metrics.activeLoans}
            initial={{ scale: 1.1, color: '#16FFBB' }}
            animate={{ scale: 1, color: '#ffffff' }}
            className="text-sm font-bold"
          >
            {metrics.activeLoans.toLocaleString()}
          </motion.span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-krim-cyan/10 to-transparent rounded-lg border border-krim-cyan/20">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-krim-cyan" />
            <span className="text-sm font-medium">Avg Process Time</span>
          </div>
          <motion.span 
            key={metrics.processingTime}
            initial={{ scale: 1.1, color: '#37A7E7' }}
            animate={{ scale: 1, color: '#ffffff' }}
            className="text-sm font-bold"
          >
            {metrics.processingTime}s
          </motion.span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-500/10 to-transparent rounded-lg border border-green-500/20">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium">Compliance</span>
          </div>
          <motion.span 
            key={metrics.complianceScore}
            initial={{ scale: 1.1, color: '#10B981' }}
            animate={{ scale: 1, color: '#ffffff' }}
            className="text-sm font-bold"
          >
            {metrics.complianceScore.toFixed(1)}%
          </motion.span>
        </div>
      </div>
    </Card>
  )
}

// Main Dashboard Interface Component
function DashboardInterface({ activeTab, metrics, isPlaying, setIsPlaying }: {
  activeTab: string
  metrics: any
  isPlaying: boolean
  setIsPlaying: (playing: boolean) => void
}) {
  return (
    <Card className="p-8 glass-effect h-full min-h-[500px] relative overflow-hidden">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white capitalize text-white">AI Copilot {activeTab} Intelligence</h3>
          <p className="text-white text-sm">Strategic insights from autonomous operations</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Live
          </div>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <CornersOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Loan Portfolio Chart */}
        <div className="bg-gradient-to-br from-krim-mint/10 to-transparent p-4 rounded-lg border border-krim-mint/20">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-white">Portfolio Performance</h4>
            <TrendUp className="w-4 h-4 text-krim-mint" />
          </div>
          <div className="h-24 flex items-end gap-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ 
                  height: `${20 + Math.random() * 60}%`,
                  transition: { delay: i * 0.1, duration: 0.5 }
                }}
                className="flex-1 bg-gradient-to-t from-krim-mint to-krim-cyan rounded-sm opacity-60"
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-white">
            <span>Jan</span>
            <span>Current</span>
          </div>
        </div>

        {/* Agent Activity Heatmap */}
        <div className="bg-gradient-to-br from-krim-cyan/10 to-transparent p-4 rounded-lg border border-krim-cyan/20">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-white">Agent Activity</h4>
            <Users className="w-4 h-4 text-krim-cyan" />
          </div>
          <div className="grid grid-cols-5 gap-1">
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: Math.random() * 0.8 + 0.2, 
                  scale: 1,
                  transition: { delay: i * 0.02 }
                }}
                className={`aspect-square rounded-sm ${
                  Math.random() > 0.3 ? 'bg-krim-cyan' : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics Row */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard
          value="$2.4M"
          label="Annual Savings"
          trend="+35%"
          color="mint"
          icon={CurrencyDollar}
        />
        <MetricCard
          value={`${metrics.contactRate}%`}
          label="Contact Rate"
          trend="+65%"
          color="cyan"
          icon={Target}
        />
        <MetricCard
          value={`${metrics.completionRate}%`}
          label="Task Completion"
          trend="+89%"
          color="coral"
          icon={CheckCircle}
        />
        <MetricCard
          value="0"
          label="Violations"
          trend="100%"
          color="green"
          icon={Shield}
        />
      </div>

      {/* Floating Action Points */}
      <div className="absolute top-4 right-4 space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ 
              opacity: [0, 1, 0], 
              x: [-20, 0, 20],
              transition: { 
                duration: 3, 
                delay: i * 0.5, 
                repeat: Infinity,
                repeatType: 'loop'
              }
            }}
            className="w-2 h-2 bg-krim-mint rounded-full"
          />
        ))}
      </div>
    </Card>
  )
}

// Platform Feature Component
function PlatformFeature({ icon, title, description, color }: {
  icon: React.ReactNode
  title: string
  description: string
  color: 'mint' | 'cyan' | 'purple' | 'coral'
}) {
  const colorClasses = {
    mint: 'from-krim-mint/20 to-transparent border-krim-mint/30 text-krim-mint',
    cyan: 'from-krim-cyan/20 to-transparent border-krim-cyan/30 text-krim-cyan',
    purple: 'from-krim-purple/20 to-transparent border-krim-purple/30 text-krim-purple',
    coral: 'from-krim-coral/20 to-transparent border-krim-coral/30 text-krim-coral'
  }

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`p-6 h-full bg-gradient-to-br ${colorClasses[color]} relative overflow-hidden`}>
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-2 -translate-y-2">
          <div className="text-4xl">◆</div>
        </div>
        <div className={`mb-4 ${colorClasses[color].split(' ')[2]}`}>
          {icon}
        </div>
        <h3 className="text-lg font-bold text-white mb-2 text-white">{title}</h3>
        <p className="text-sm text-white leading-relaxed">{description}</p>
      </Card>
    </motion.div>
  )
}

// Metric Card Component
function MetricCard({ value, label, trend, color, icon: Icon }: {
  value: string
  label: string
  trend: string
  color: string
  icon: any
}) {
  const colorMap = {
    mint: 'text-krim-mint',
    cyan: 'text-krim-cyan',
    purple: 'text-krim-purple',
    green: 'text-green-400'
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
      <div className="flex items-center justify-between mb-2">
        <Icon className={`w-4 h-4 ${colorMap[color as keyof typeof colorMap]}`} />
        <span className={`text-xs font-bold ${colorMap[color as keyof typeof colorMap]}`}>
          {trend}
        </span>
      </div>
      <div className="text-xl font-bold mb-1">{value}</div>
      <div className="text-xs text-white">{label}</div>
    </div>
  )
}