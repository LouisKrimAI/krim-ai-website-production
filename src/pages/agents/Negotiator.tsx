import React, { Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Target, TrendUp, Users, Brain, CheckCircle, CurrencyDollar, Calculator } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { AssetManager } from '../../utils/assetManager'
import OptimizedAvatar from '../../components/OptimizedAvatar'

// Lazy load heavy components
const ParticleField3D = React.lazy(() => import('../../components/ParticleField3D'))

const Negotiator: React.FC = () => {
  const agent = {
    id: 'negotiator',
    name: 'Negotiator',
    role: 'Strategic Deal Architect',
    category: 'borrower',
    tagline: 'Win-win solutions that actually work',
    description: 'Sophisticated negotiation AI that finds creative payment solutions. Masters complex financial situations and creates sustainable arrangements that benefit both parties.',
    capabilities: [
      'Advanced negotiation strategies',
      'Settlement optimization',
      'Payment plan structuring',
      'Financial analysis',
      'Risk assessment',
      'Deal creativity'
    ],
    metrics: [
      { label: 'Settlement Rate', value: '35%', trend: 'up' },
      { label: 'Average Recovery', value: '65%', trend: 'up' },
      { label: 'Plan Success Rate', value: '89%', trend: 'stable' }
    ],
    personality: {
      traits: ['Strategic', 'Creative', 'Fair', 'Persistent'],
      approach: 'Collaborative negotiation with mutual benefit focus',
      voiceTone: 'Professional, confident, and solution-oriented'
    },
    avatar: {
      primaryColor: '#00D4FF',
      secondaryColor: '#8B5CF6',
      energySignature: 'strategic-flow',
      animation: 'orbit',
      profilePhoto: AssetManager.getOptimizedAvatarPath('ai-agent-avatar-02')
    },
    skillConstellation: [
      'Finance', 'Strategy', 'Analytics', 'Creativity', 'Persistence'
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-krim-deep-space via-[#1a1a2e] to-[#0f0f1e] text-white">
      {/* Background Particles */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-krim-deep-space" />}>
          <ParticleField3D 
            particleCount={1500}
            colorPrimary={agent.avatar.primaryColor}
            colorSecondary={agent.avatar.secondaryColor}
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
              {/* Agent Avatar & Info */}
              <div className="text-center lg:text-left">
                <motion.div
                  className="relative inline-block mb-8"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity }
                  }}
                >
                  <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-krim-cyan/20 to-purple-500/20 p-1">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-krim-cyan to-purple-500 flex items-center justify-center overflow-hidden">
                      {agent.avatar.profilePhoto ? (
                        <OptimizedAvatar
                          baseName={agent.avatar.profilePhoto}
                          alt={agent.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-5xl md:text-6xl font-bold text-krim-deep-space">N</span>
                      )}
                    </div>
                    {/* Strategic orbital patterns */}
                    <div className="absolute inset-0 rounded-full border-2 border-krim-cyan/30">
                      <motion.div 
                        className="w-4 h-4 bg-krim-cyan rounded-full absolute top-0 left-1/2 -translate-x-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                    <div className="absolute inset-4 rounded-full border border-purple-500/20">
                      <motion.div 
                        className="w-3 h-3 bg-purple-500 rounded-full absolute bottom-0 right-1/4"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 bg-gradient-to-r from-krim-cyan to-purple-500 bg-clip-text text-transparent"
                >
                  {agent.name}
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
                  className="text-xl italic text-purple-400 mb-8"
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
                      <CurrencyDollar className="text-purple-400" size={32} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Description & Capabilities */}
        <section className="container mx-auto px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="glass-card p-8 border-krim-cyan/30"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-8 flex items-center space-x-3 text-white">
                  <Brain className="text-krim-cyan" size={32} />
                  <span>Strategic Intelligence</span>
                </h2>
                <p className="text-lg text-white leading-relaxed mb-8">
                  {agent.description}
                </p>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-purple-400">Core Philosophy</h3>
                  <p className="text-white">{agent.personality.approach}</p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-krim-cyan">Strategic Traits</h3>
                  <div className="flex flex-wrap gap-3">
                    {agent.personality.traits.map((trait, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-krim-cyan/10 border border-krim-cyan/30 rounded-full text-krim-cyan text-sm"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-purple-400">Communication Style</h3>
                  <p className="text-white">{agent.personality.voiceTone}</p>
                </div>
              </motion.div>

              {/* Capabilities */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="glass-card p-8 border-purple-500/30"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-8 flex items-center space-x-3 text-white">
                  <Target className="text-purple-500" size={32} />
                  <span>Negotiation Arsenal</span>
                </h2>
                <div className="space-y-4">
                  {agent.capabilities.map((capability, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                      className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-purple-500/10 transition-colors border border-transparent hover:border-purple-500/30"
                    >
                      <CheckCircle className="text-krim-cyan flex-shrink-0" size={20} />
                      <span className="text-white">{capability}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-gradient-to-r from-krim-cyan/10 to-purple-500/10 rounded-lg border border-krim-cyan/20">
                  <h4 className="font-semibold text-krim-cyan mb-2">Negotiation Success Formula</h4>
                  <p className="text-sm text-white">
                    Advanced behavioral analytics + Financial modeling + Creative structuring = 
                    Sustainable payment solutions that work for everyone
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skill Constellation */}
        <section className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="text-4xl font-bold mb-12"
            >
              Strategic Skill Matrix
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="flex justify-center flex-wrap gap-6"
            >
              {agent.skillConstellation.map((skill, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-6 min-w-[140px] hover:scale-110 transition-all duration-300 border-krim-cyan/30 hover:border-purple-500/50"
                  whileHover={{ 
                    rotateY: 15,
                    boxShadow: '0 20px 40px rgba(0, 212, 255, 0.3)'
                  }}
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    y: { duration: 2, repeat: Infinity, delay: index * 0.2 }
                  }}
                >
                  <div className="text-lg font-semibold text-krim-cyan">{skill}</div>
                  <div className="w-full h-1 bg-gradient-to-r from-krim-cyan to-purple-500 mt-2 rounded-full"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ROI Impact */}
        <section className="container mx-auto px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="glass-card p-12 text-center bg-gradient-to-br from-krim-cyan/5 to-purple-500/5 border-krim-cyan/30"
            >
              <Calculator className="mx-auto mb-6 text-krim-cyan" size={48} />
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Enterprise ROI Impact</h2>
              <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
                Negotiator revolutionizes debt recovery by finding creative win-win solutions that preserve relationships 
                while maximizing recovery rates. Advanced financial modeling ensures sustainable payment arrangements.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-krim-cyan mb-2">35%</div>
                  <div className="text-white">Higher Settlement Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">65%</div>
                  <div className="text-white">Average Recovery</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-krim-cyan mb-2">89%</div>
                  <div className="text-white">Plan Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">2.3x</div>
                  <div className="text-white">ROI Multiplier</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-left">
                <div className="p-6 bg-krim-cyan/10 rounded-lg border border-krim-cyan/30">
                  <h4 className="font-bold text-krim-cyan mb-3">Strategic Advantage</h4>
                  <ul className="space-y-2 text-sm text-white">
                    <li>• Creates sustainable payment solutions</li>
                    <li>• Preserves customer relationships</li>
                    <li>• Reduces legal risk through fair negotiations</li>
                    <li>• Optimizes recovery timelines</li>
                  </ul>
                </div>
                <div className="p-6 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <h4 className="font-bold text-purple-400 mb-3">Financial Innovation</h4>
                  <ul className="space-y-2 text-sm text-white">
                    <li>• Real-time financial analysis</li>
                    <li>• Creative payment structuring</li>
                    <li>• Risk-adjusted settlement optimization</li>
                    <li>• Behavioral economics integration</li>
                  </ul>
                </div>
              </div>

              <motion.div className="mt-12">
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-krim-cyan to-purple-500 text-krim-deep-space px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300"
                >
                  <Target size={24} />
                  <span>Deploy Strategic Negotiation</span>
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

export default Negotiator