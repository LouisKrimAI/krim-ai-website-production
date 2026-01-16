import React, { Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Lightning, ChartBarHorizontal, Target, CheckCircle, TrendUp, Pulse, Command } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { AssetManager } from '../../utils/assetManager'
import OptimizedAvatar from '../../components/OptimizedAvatar'

// Lazy load heavy components
const ParticleField3D = React.lazy(() => import('../../components/ParticleField3D'))

const CampaignOrchestrator: React.FC = () => {
  const agent = {
    id: 'campaign-orchestrator',
    name: 'Campaign Orchestrator',
    role: 'Strategy Optimization Engine',
    category: 'staff',
    tagline: '10M calls in 11 hours, perfectly orchestrated',
    description: 'Designs and executes collection campaigns at massive scale. Optimizes timing, channel, and message for maximum effectiveness.',
    capabilities: [
      'Campaign design',
      'A/B testing',
      'Channel optimization',
      'Timing optimization',
      'Segment targeting',
      'Performance analysis'
    ],
    metrics: [
      { label: 'Calls Orchestrated', value: '10M/11hrs', trend: 'up' },
      { label: 'Campaign Lift', value: '45%', trend: 'up' },
      { label: 'Optimization Speed', value: 'Real-time', trend: 'stable' }
    ],
    avatar: {
      profilePhoto: AssetManager.getOptimizedAvatarPath('ai-agent-avatar-05')
    },
    skillConstellation: [
      'Strategy', 'Analytics', 'Optimization', 'Scale', 'Testing'
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-krim-deep-space via-[#1a1a2e] to-[#0f0f1e] text-white">
      {/* Background Particles */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-krim-deep-space" />}>
          <ParticleField3D 
            particleCount={2000}
            colorPrimary="#00D4FF"
            colorSecondary="#FF4C61"
          />
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-6 py-8"
        >
          <Link 
            to="/agents" 
            className="inline-flex items-center space-x-2 text-krim-cyan hover:text-white transition-colors group cursor-pointer hover:scale-105"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Multi-Agent OS</span>
          </Link>
        </motion.div>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="text-center lg:text-left">
                <motion.div
                  className="relative inline-block mb-8"
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    scale: { duration: 2, repeat: Infinity }
                  }}
                >
                  <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-krim-cyan/20 to-red-500/20 p-1">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-krim-cyan to-red-500 flex items-center justify-center overflow-hidden">
                      {agent.avatar.profilePhoto ? (
                        <OptimizedAvatar
                          baseName={agent.avatar.profilePhoto}
                          alt={agent.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-5xl md:text-6xl font-bold text-white">O</span>
                      )}
                    </div>
                    <motion.div 
                      className="absolute inset-0 rounded-full border-2 border-krim-cyan/50"
                      animate={{ 
                        rotate: 360,
                      }}
                      transition={{ 
                        duration: 8, 
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <Command 
                        className="absolute top-0 left-1/2 -translate-x-2 text-krim-cyan" 
                        size={20}
                      />
                    </motion.div>
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-krim-cyan to-red-500 bg-clip-text text-transparent font-black"
                >
                  Campaign Orchestrator
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-2xl text-krim-cyan mb-6"
                >
                  {agent.role}
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-xl italic text-red-400 mb-8"
                >
                  "{agent.tagline}"
                </motion.p>
              </div>

              {/* Key Metrics */}
              <div className="space-y-6">
                {agent.metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                    className="glass-card p-6 hover:scale-105 transition-all duration-300 border-krim-cyan/30"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-white mb-1">{metric.label}</div>
                        <div className="text-3xl font-bold text-krim-cyan">{metric.value}</div>
                      </div>
                      <Pulse className="text-red-400" size={32} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Scale Demonstration */}
        <section className="container mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="max-w-6xl mx-auto bg-gradient-to-r from-krim-cyan/10 to-red-500/10 p-8 rounded-2xl border border-krim-cyan/30"
          >
            <h3 className="text-3xl font-bold mb-6 text-center text-krim-cyan">Unprecedented Scale</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-krim-cyan mb-2">10M</div>
                <div className="text-white">Calls in 11 Hours</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-red-400 mb-2">45%</div>
                <div className="text-white">Campaign Lift</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-krim-cyan mb-2">Real-time</div>
                <div className="text-white">Optimization</div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Capabilities */}
        <section className="container mx-auto px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="glass-card p-8 border-krim-cyan/30"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 flex items-center space-x-3 text-center justify-center text-white">
                <Lightning className="text-krim-cyan" size={32} />
                <span>Orchestration Capabilities</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {agent.capabilities.slice(0, 3).map((capability, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                      className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-krim-cyan/10 transition-colors"
                    >
                      <CheckCircle className="text-krim-mint flex-shrink-0" size={20} />
                      <span className="text-white">{capability}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="space-y-4">
                  {agent.capabilities.slice(3).map((capability, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 + index * 0.1, duration: 0.5 }}
                      className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-red-500/10 transition-colors"
                    >
                      <CheckCircle className="text-krim-mint flex-shrink-0" size={20} />
                      <span className="text-white">{capability}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enterprise Impact */}
        <section className="container mx-auto px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="glass-card p-12 text-center bg-gradient-to-br from-krim-cyan/5 to-red-500/5 border-krim-cyan/30"
            >
              <ChartBarHorizontal className="mx-auto mb-6 text-krim-cyan" size={48} />
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Campaign Excellence at Scale</h2>
              <p className="text-xl text-white mb-12 max-w-3xl mx-auto">
                Campaign Orchestrator transforms your collection operations with AI-driven strategy optimization, 
                executing millions of interactions with surgical precision and continuous improvement.
              </p>

              <motion.div className="mt-12">
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-krim-cyan to-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300"
                >
                  <Command size={24} />
                  <span>Deploy Campaign Intelligence</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>

      <style>{`
        .glass-card {
          background: rgba(16, 14, 35, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 255, 136, 0.2);
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .glass-card:hover {
          box-shadow: 0 12px 40px rgba(0, 212, 255, 0.2);
        }
      `}</style>
    </div>
  )
}

export default CampaignOrchestrator