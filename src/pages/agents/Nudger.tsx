import React, { Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Lightning, Users, Brain, Target, TrendUp, CheckCircle } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { AssetManager } from '../../utils/assetManager'
import OptimizedAvatar from '../../components/OptimizedAvatar'

// Lazy load heavy components
const ParticleField3D = React.lazy(() => import('../../components/ParticleField3D'))

const Nudger: React.FC = () => {
  const agent = {
    id: 'nudger',
    name: 'Nudger',
    role: 'Early Intervention Specialist',
    category: 'borrower',
    tagline: 'Every conversation is an opportunity to help',
    description: 'Gentle first touch agent that preserves relationships while securing payments. Specializes in behavioral psychology and timing optimization for maximum engagement without aggression.',
    capabilities: [
      'Behavioral timing optimization',
      'Multichannel orchestration', 
      'Sentiment analysis',
      'Payment propensity scoring',
      'Personalized messaging',
      'Relationship preservation'
    ],
    metrics: [
      { label: 'Contact Rate', value: '65%+', trend: 'up' },
      { label: 'Promise to Pay', value: '42%', trend: 'up' },
      { label: 'Customer Satisfaction', value: '4.8/5', trend: 'stable' }
    ],
    personality: {
      traits: ['Empathetic', 'Patient', 'Understanding', 'Supportive'],
      approach: 'Collaborative problem-solving with genuine care',
      voiceTone: 'Warm, friendly, and non-judgmental'
    },
    avatar: {
      primaryColor: '#00FF88',
      secondaryColor: '#00D4FF',
      energySignature: 'gentle-pulse',
      animation: 'float',
      profilePhoto: AssetManager.getOptimizedAvatarPath('ai-agent-avatar-01')
    },
    skillConstellation: [
      'Psychology', 'Timing', 'Empathy', 'Multichannel', 'Personalization'
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-krim-deep-space via-[#1a1a2e] to-[#0f0f1e] text-white">
      {/* Background Particles */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-krim-deep-space" />}>
          <ParticleField3D 
            particleCount={1200}
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
                    rotate: 360,
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                >
                  <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-krim-mint/20 to-krim-cyan/20 p-1">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-krim-mint to-krim-cyan flex items-center justify-center overflow-hidden">
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
                    {/* Orbital rings */}
                    <div className="absolute inset-0 rounded-full border-2 border-krim-mint/30 animate-spin"></div>
                    <div className="absolute inset-2 rounded-full border border-krim-cyan/20 animate-pulse"></div>
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent"
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
                  className="text-xl italic text-krim-mint mb-8"
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
                    className="glass-card p-6 hover:scale-105 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-white mb-1">{metric.label}</div>
                        <div className="text-3xl font-bold text-krim-mint">{metric.value}</div>
                      </div>
                      <TrendUp className="text-krim-cyan" size={32} />
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
                className="glass-card p-8"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-8 flex items-center space-x-3 text-white">
                  <Brain className="text-krim-mint" size={32} />
                  <span>Agent Intelligence</span>
                </h2>
                <p className="text-lg text-white leading-relaxed">
                  {agent.description}
                </p>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4 text-krim-cyan">Personality Traits</h3>
                  <div className="flex flex-wrap gap-3">
                    {agent.personality.traits.map((trait, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-krim-mint/10 border border-krim-mint/30 rounded-full text-krim-mint text-sm"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3 text-krim-cyan">Communication Style</h3>
                  <p className="text-white">{agent.personality.voiceTone}</p>
                </div>
              </motion.div>

              {/* Capabilities */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="glass-card p-8"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-8 flex items-center space-x-3 text-white">
                  <Lightning className="text-krim-cyan" size={32} />
                  <span>Core Capabilities</span>
                </h2>
                <div className="space-y-4">
                  {agent.capabilities.map((capability, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                      className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <CheckCircle className="text-krim-mint flex-shrink-0" size={20} />
                      <span className="text-white">{capability}</span>
                    </motion.div>
                  ))}
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
              Skill Constellation
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
                  className="glass-card p-6 min-w-[120px] hover:scale-110 transition-all duration-300"
                  whileHover={{ 
                    rotateY: 10,
                    boxShadow: '0 20px 40px rgba(0, 255, 136, 0.3)'
                  }}
                >
                  <div className="text-lg font-semibold text-krim-mint">{skill}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Enterprise Value Proposition */}
        <section className="container mx-auto px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="glass-card p-12 text-center bg-gradient-to-br from-krim-mint/5 to-krim-cyan/5"
            >
              <Target className="mx-auto mb-6 text-krim-mint" size={48} />
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Enterprise Impact</h2>
              <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
                Nudger transforms your early intervention strategy from aggressive pursuit to empathetic engagement, 
                preserving customer relationships while driving superior recovery rates through behavioral psychology.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-krim-mint mb-2">3x</div>
                  <div className="text-white">Higher Engagement</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-krim-cyan mb-2">65%+</div>
                  <div className="text-white">Contact Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-krim-mint mb-2">4.8/5</div>
                  <div className="text-white">Customer Satisfaction</div>
                </div>
              </div>

              <motion.div className="mt-12">
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-krim-mint to-krim-cyan text-krim-deep-space px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300"
                >
                  <Users size={24} />
                  <span>Deploy Nudger in Your Operation</span>
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
          border-color: rgba(0, 255, 136, 0.4);
          box-shadow: 0 12px 40px rgba(0, 255, 136, 0.2);
        }
      `}</style>
    </div>
  )
}

export default Nudger