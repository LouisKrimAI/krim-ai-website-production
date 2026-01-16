import React, { Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, Users, TrendUp, CheckCircle, Star, Sparkle, UserCheck } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { AssetManager } from '../../utils/assetManager'
import OptimizedAvatar from '../../components/OptimizedAvatar'

// Lazy load heavy components
const ParticleField3D = React.lazy(() => import('../../components/ParticleField3D'))

const Healer: React.FC = () => {
  const agent = {
    id: 'healer',
    name: 'Healer',
    role: 'Relationship Recovery Expert',
    category: 'borrower',
    tagline: 'Transform collections into customer loyalty',
    description: 'Rebuilds trust and creates advocates from recovered accounts. Focuses on long-term relationship value and customer lifetime value optimization.',
    capabilities: [
      'Trust rebuilding',
      'Customer retention',
      'Loyalty programs',
      'Feedback collection',
      'Service recovery',
      'Advocacy creation'
    ],
    metrics: [
      { label: 'NPS Improvement', value: '+23', trend: 'up' },
      { label: 'Retention Rate', value: '94%', trend: 'up' },
      { label: 'Referral Generation', value: '3x', trend: 'up' }
    ],
    personality: {
      traits: ['Caring', 'Genuine', 'Optimistic', 'Thoughtful'],
      approach: 'Healing relationships through understanding',
      voiceTone: 'Compassionate, genuine, and encouraging'
    },
    avatar: {
      primaryColor: '#8B5CF6',
      secondaryColor: '#00FF88',
      energySignature: 'healing-aura',
      animation: 'emerge',
      profilePhoto: AssetManager.getOptimizedAvatarPath('ai-agent-avatar-04')
    },
    skillConstellation: [
      'Empathy', 'Retention', 'Loyalty', 'Recovery', 'Advocacy'
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-krim-deep-space via-[#1a1a2e] to-[#0f0f1e] text-white">
      {/* Background Particles */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-krim-deep-space" />}>
          <ParticleField3D 
            particleCount={1800}
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
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-purple-500/20 to-krim-mint/20 p-1">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-krim-mint flex items-center justify-center overflow-hidden">
                      {agent.avatar.profilePhoto ? (
                        <OptimizedAvatar
                          baseName={agent.avatar.profilePhoto}
                          alt={agent.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-5xl md:text-6xl font-bold text-white">H</span>
                      )}
                    </div>
                    {/* Healing aura rings */}
                    {[...Array(3)].map((_, index) => (
                      <motion.div 
                        key={index}
                        className="absolute inset-0 rounded-full border border-purple-500/20"
                        style={{
                          scale: 1 + (index + 1) * 0.1,
                        }}
                        animate={{ 
                          opacity: [0, 0.6, 0],
                          scale: [1 + index * 0.1, 1.3 + index * 0.1, 1 + index * 0.1]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          delay: index * 0.5,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 bg-gradient-to-r from-purple-500 to-krim-mint bg-clip-text text-transparent"
                >
                  {agent.name}
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-2xl text-purple-400 mb-6"
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
                    className="glass-card p-6 hover:scale-105 transition-all duration-300 border-purple-500/30 hover:border-krim-mint/50"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-white mb-1">{metric.label}</div>
                        <div className="text-3xl font-bold text-purple-400">{metric.value}</div>
                      </div>
                      <Heart className="text-krim-mint" size={32} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Healing Philosophy Banner */}
        <section className="container mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="max-w-6xl mx-auto bg-gradient-to-r from-purple-500/10 to-krim-mint/10 p-6 rounded-2xl border border-purple-500/30"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Healing Through Understanding</h3>
              <p className="text-white max-w-3xl mx-auto">
                Every difficult conversation is an opportunity to rebuild trust. 
                Healer transforms negative experiences into positive relationships, 
                creating lifelong advocates from challenging situations.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Description & Capabilities */}
        <section className="container mx-auto px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="glass-card p-8 border-purple-500/30"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-8 flex items-center space-x-3 text-white">
                  <Heart className="text-purple-400" size={32} />
                  <span>Healing Intelligence</span>
                </h2>
                <p className="text-lg text-white leading-relaxed mb-8">
                  {agent.description}
                </p>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-krim-mint">Therapeutic Approach</h3>
                  <p className="text-white">{agent.personality.approach}</p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-purple-400">Healing Traits</h3>
                  <div className="flex flex-wrap gap-3">
                    {agent.personality.traits.map((trait, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-500/10 to-krim-mint/10 rounded-lg border border-purple-500/20">
                  <h4 className="font-semibold text-purple-400 mb-2">Relationship Recovery</h4>
                  <p className="text-sm text-white">
                    Transforms debt collection from transactional to relational, 
                    creating customer advocates through empathetic resolution and ongoing care.
                  </p>
                </div>
              </motion.div>

              {/* Capabilities */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="glass-card p-8 border-krim-mint/30"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-8 flex items-center space-x-3 text-white">
                  <Sparkle className="text-krim-mint" size={32} />
                  <span>Healing Capabilities</span>
                </h2>
                <div className="space-y-4">
                  {agent.capabilities.map((capability, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                      className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-purple-500/10 transition-colors border border-transparent hover:border-purple-500/30"
                    >
                      <CheckCircle className="text-krim-mint flex-shrink-0" size={20} />
                      <span className="text-white">{capability}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                    <div className="text-2xl font-bold text-purple-400">94%</div>
                    <div className="text-xs text-white">Customer Retention</div>
                  </div>
                  <div className="text-center p-3 bg-krim-mint/10 rounded-lg border border-krim-mint/30">
                    <div className="text-2xl font-bold text-krim-mint">+23</div>
                    <div className="text-xs text-white">NPS Improvement</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Customer Journey Transformation */}
        <section className="container mx-auto px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="text-4xl font-bold mb-12 text-center"
            >
              Customer Journey Transformation
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <div className="glass-card p-6 text-center border-red-500/30">
                <div className="text-red-400 mb-4">😰</div>
                <h3 className="text-lg font-semibold mb-2 text-red-400">Before Healer</h3>
                <p className="text-sm text-white">Frustrated customers, damaged relationships, negative experiences</p>
              </div>
              
              <div className="glass-card p-6 text-center border-purple-500/30">
                <div className="text-purple-400 mb-4">🔄</div>
                <h3 className="text-lg font-semibold mb-2 text-purple-400">Healing Process</h3>
                <p className="text-sm text-white">Empathetic listening, understanding, rebuilding trust step by step</p>
              </div>
              
              <div className="glass-card p-6 text-center border-krim-mint/30">
                <div className="text-krim-mint mb-4">💚</div>
                <h3 className="text-lg font-semibold mb-2 text-krim-mint">After Healer</h3>
                <p className="text-sm text-white">Loyal advocates, positive reviews, referrals to family and friends</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skill Constellation */}
        <section className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 0.6 }}
              className="text-4xl font-bold mb-12"
            >
              Healing Skill Constellation
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="flex justify-center flex-wrap gap-6"
            >
              {agent.skillConstellation.map((skill, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-6 min-w-[120px] hover:scale-110 transition-all duration-300 border-purple-500/30 hover:border-krim-mint/50"
                  whileHover={{ 
                    rotateY: 5,
                    boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)'
                  }}
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    y: { 
                      duration: 2.5, 
                      repeat: Infinity, 
                      delay: index * 0.4,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <div className="text-lg font-semibold text-purple-400 mb-2">{skill}</div>
                  <motion.div 
                    className="w-full h-1 bg-gradient-to-r from-purple-500 to-krim-mint rounded-full"
                    animate={{
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Enterprise Impact */}
        <section className="container mx-auto px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.8 }}
              className="glass-card p-12 text-center bg-gradient-to-br from-purple-500/5 to-krim-mint/5 border-purple-500/30"
            >
              <Star className="mx-auto mb-6 text-purple-400" size={48} />
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Customer Lifetime Value Revolution</h2>
              <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
                Healer doesn't just resolve debt—it transforms your relationship with customers. 
                Turn collection experiences into loyalty-building opportunities that drive referrals and retention.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">3x</div>
                  <div className="text-white">More Referrals</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-krim-mint mb-2">94%</div>
                  <div className="text-white">Retention Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">+23</div>
                  <div className="text-white">NPS Points</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-krim-mint mb-2">156%</div>
                  <div className="text-white">Advocacy Increase</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-left">
                <div className="p-6 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <h4 className="font-bold text-purple-400 mb-3">Relationship Healing</h4>
                  <ul className="space-y-2 text-sm text-white">
                    <li>• Transforms negative experiences into positive memories</li>
                    <li>• Creates emotional connections beyond transactional interactions</li>
                    <li>• Rebuilds trust through consistent, caring follow-up</li>
                    <li>• Turns debt recovery into relationship recovery</li>
                  </ul>
                </div>
                <div className="p-6 bg-krim-mint/10 rounded-lg border border-krim-mint/30">
                  <h4 className="font-bold text-krim-mint mb-3">Business Impact</h4>
                  <ul className="space-y-2 text-sm text-white">
                    <li>• Increases customer lifetime value significantly</li>
                    <li>• Reduces churn and improves retention rates</li>
                    <li>• Generates positive reviews and testimonials</li>
                    <li>• Creates organic growth through referrals</li>
                  </ul>
                </div>
              </div>

              <motion.div className="mt-12">
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-krim-mint text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300"
                >
                  <UserCheck size={24} />
                  <span>Transform Relationships with Healer</span>
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
          box-shadow: 0 12px 40px rgba(139, 92, 246, 0.2);
        }
      `}</style>
    </div>
  )
}

export default Healer