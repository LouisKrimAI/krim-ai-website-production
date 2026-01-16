import React, { Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ShieldCheck, Scales, Warning, CheckCircle, Target, TrendUp, Trophy } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { AssetManager } from '../../utils/assetManager'
import OptimizedAvatar from '../../components/OptimizedAvatar'

// Lazy load heavy components
const ParticleField3D = React.lazy(() => import('../../components/ParticleField3D'))

const Resolver: React.FC = () => {
  const agent = {
    id: 'resolver',
    name: 'Resolver',
    role: 'Complex Case Authority',
    category: 'borrower',
    tagline: 'Fair resolution for the toughest situations',
    description: 'Handles escalations and complex cases with perfect compliance and firmness. Specializes in difficult conversations while maintaining regulatory adherence.',
    capabilities: [
      'Escalation management',
      'Compliance monitoring',
      'Dispute resolution',
      'Legal knowledge',
      'Documentation',
      'Risk mitigation'
    ],
    metrics: [
      { label: 'Compliance Rate', value: '100%', trend: 'stable' },
      { label: 'Resolution Rate', value: '72%', trend: 'up' },
      { label: 'Escalation Reduction', value: '67%', trend: 'up' }
    ],
    personality: {
      traits: ['Authoritative', 'Fair', 'Knowledgeable', 'Firm'],
      approach: 'Firm but fair with clear boundaries',
      voiceTone: 'Professional, clear, and decisive'
    },
    avatar: {
      primaryColor: '#FF4C61',
      secondaryColor: '#00FF88',
      energySignature: 'controlled-power',
      animation: 'pulse',
      profilePhoto: AssetManager.getOptimizedAvatarPath('ai-agent-avatar-03')
    },
    skillConstellation: [
      'Compliance', 'Legal', 'Documentation', 'Authority', 'Resolution'
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-krim-deep-space via-[#1a1a2e] to-[#0f0f1e] text-white">
      {/* Background Particles */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-krim-deep-space" />}>
          <ParticleField3D 
            particleCount={1000}
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
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    scale: { duration: 2, repeat: Infinity }
                  }}
                >
                  <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-red-500/20 to-krim-mint/20 p-1">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-red-500 to-krim-mint flex items-center justify-center overflow-hidden">
                      {agent.avatar.profilePhoto ? (
                        <OptimizedAvatar
                          baseName={agent.avatar.profilePhoto}
                          alt={agent.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-5xl md:text-6xl font-bold text-white">R</span>
                      )}
                    </div>
                    {/* Authoritative pulse rings */}
                    <motion.div 
                      className="absolute inset-0 rounded-full border-2 border-red-500/50"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.7, 0.3] 
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity 
                      }}
                    />
                    <motion.div 
                      className="absolute inset-4 rounded-full border border-krim-mint/40"
                      animate={{ 
                        scale: [1, 1.05, 1],
                        opacity: [0.5, 0.9, 0.5] 
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: 0.5 
                      }}
                    />
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 bg-gradient-to-r from-red-500 to-krim-mint bg-clip-text text-transparent"
                >
                  {agent.name}
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-2xl text-red-400 mb-6"
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
                    className="glass-card p-6 hover:scale-105 transition-all duration-300 border-red-500/30"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-white mb-1">{metric.label}</div>
                        <div className="text-3xl font-bold text-red-400">{metric.value}</div>
                      </div>
                      <ShieldCheck className="text-krim-mint" size={32} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Authority & Compliance Banner */}
        <section className="container mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="max-w-6xl mx-auto bg-gradient-to-r from-red-500/10 to-krim-mint/10 p-6 rounded-2xl border border-red-500/30"
          >
            <div className="flex items-center justify-center space-x-8 text-center">
              <div className="flex items-center space-x-2">
                <Trophy className="text-red-400" size={24} />
                <span className="font-semibold">Perfect Compliance Record</span>
              </div>
              <div className="flex items-center space-x-2">
                <Scales className="text-krim-mint" size={24} />
                <span className="font-semibold">Zero Legal Violations</span>
              </div>
              <div className="flex items-center space-x-2">
                <Warning className="text-red-400" size={24} />
                <span className="font-semibold">Complex Case Expert</span>
              </div>
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
                className="glass-card p-8 border-red-500/30"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-8 flex items-center space-x-3 text-white">
                  <ShieldCheck className="text-red-400" size={32} />
                  <span>Authority Profile</span>
                </h2>
                <p className="text-lg text-white leading-relaxed mb-8">
                  {agent.description}
                </p>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-krim-mint">Approach Philosophy</h3>
                  <p className="text-white">{agent.personality.approach}</p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-red-400">Authority Traits</h3>
                  <div className="flex flex-wrap gap-3">
                    {agent.personality.traits.map((trait, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-sm"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-red-500/10 to-krim-mint/10 rounded-lg border border-red-500/20">
                  <h4 className="font-semibold text-red-400 mb-2">Compliance Guarantee</h4>
                  <p className="text-sm text-white">
                    Every interaction monitored for FDCPA, TCPA, and CFPB compliance. 
                    Perfect legal adherence with firm resolution capabilities.
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
                  <Scales className="text-krim-mint" size={32} />
                  <span>Resolution Powers</span>
                </h2>
                <div className="space-y-4">
                  {agent.capabilities.map((capability, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                      className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/30"
                    >
                      <CheckCircle className="text-krim-mint flex-shrink-0" size={20} />
                      <span className="text-white">{capability}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-red-500/10 rounded-lg border border-red-500/30">
                    <div className="text-2xl font-bold text-red-400">Battle</div>
                    <div className="text-xs text-white">Tested Reliability</div>
                  </div>
                  <div className="text-center p-3 bg-krim-mint/10 rounded-lg border border-krim-mint/30">
                    <div className="text-2xl font-bold text-krim-mint">0</div>
                    <div className="text-xs text-white">Compliance Violations</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Legal Framework Display */}
        <section className="container mx-auto px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="glass-card p-8 border-red-500/30"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center flex items-center justify-center space-x-3 text-white">
                <Scales className="text-red-400" size={36} />
                <span>Legal & Regulatory Framework</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-red-500/5 rounded-lg border border-red-500/20">
                  <div className="text-lg font-bold text-red-400 mb-2">FDCPA</div>
                  <div className="text-sm text-white">Fair Debt Collection Practices Act compliance</div>
                </div>
                <div className="text-center p-6 bg-krim-mint/5 rounded-lg border border-krim-mint/20">
                  <div className="text-lg font-bold text-krim-mint mb-2">TCPA</div>
                  <div className="text-sm text-white">Telephone Consumer Protection Act adherence</div>
                </div>
                <div className="text-center p-6 bg-red-500/5 rounded-lg border border-red-500/20">
                  <div className="text-lg font-bold text-red-400 mb-2">CFPB</div>
                  <div className="text-sm text-white">Consumer Financial Protection Bureau rules</div>
                </div>
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
              transition={{ delay: 1.8, duration: 0.6 }}
              className="text-4xl font-bold mb-12"
            >
              Authority Matrix
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="flex justify-center flex-wrap gap-6"
            >
              {agent.skillConstellation.map((skill, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-6 min-w-[140px] hover:scale-110 transition-all duration-300 border-red-500/30 hover:border-krim-mint/50"
                  whileHover={{ 
                    rotateX: 10,
                    boxShadow: '0 20px 40px rgba(255, 76, 97, 0.3)'
                  }}
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    scale: { duration: 3, repeat: Infinity, delay: index * 0.3 }
                  }}
                >
                  <div className="text-lg font-semibold text-red-400 mb-2">{skill}</div>
                  <div className="w-full h-1 bg-gradient-to-r from-red-500 to-krim-mint rounded-full"></div>
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
              transition={{ delay: 2.2, duration: 0.8 }}
              className="glass-card p-12 text-center bg-gradient-to-br from-red-500/5 to-krim-mint/5 border-red-500/30"
            >
              <Target className="mx-auto mb-6 text-red-400" size={48} />
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Risk Mitigation & Authority</h2>
              <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
                Resolver eliminates legal risk while maintaining firm authority in complex cases. 
                Perfect compliance record with decisive resolution capabilities for your most challenging situations.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400 mb-2">100%</div>
                  <div className="text-white">Compliance Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-krim-mint mb-2">82%</div>
                  <div className="text-white">Resolution Success</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400 mb-2">67%</div>
                  <div className="text-white">Escalation Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-krim-mint mb-2">$0</div>
                  <div className="text-white">Legal Violation Costs</div>
                </div>
              </div>

              <motion.div className="mt-12">
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-krim-mint text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300"
                >
                  <ShieldCheck size={24} />
                  <span>Deploy Authoritative Resolution</span>
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
          box-shadow: 0 12px 40px rgba(255, 76, 97, 0.2);
        }
      `}</style>
    </div>
  )
}

export default Resolver