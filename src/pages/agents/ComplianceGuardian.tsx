import { Suspense, useEffect, lazy } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ShieldCheck, Eye, Warning, CheckCircle, File, Lock, Trophy } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { useClaimsRegistry } from '../../hooks/useClaimsRegistry'
import { validateComponentMetrics } from '../../utils/claimsValidation'
import { AssetManager } from '../../utils/assetManager'
import OptimizedAvatar from '../../components/OptimizedAvatar'

// Lazy load heavy components
const ParticleField3D = lazy(() => import('../../components/ParticleField3D'))

const ComplianceGuardian: React.FC = () => {
  const { getDisplayMetric } = useClaimsRegistry()
  
  // Validate component metrics in development
  useEffect(() => {
    validateComponentMetrics('ComplianceGuardian', [
      'violationsPrevented', 'complianceRate', 'auditSuccessRate', 'complianceCost'
    ])
  }, [])
  
  const agent = {
    id: 'compliance-guardian',
    name: 'Compliance Guardian',
    role: 'Real-time Regulatory Monitor',
    category: 'staff',
    tagline: 'Zero violations, infinite peace of mind',
    description: 'Monitors every interaction for compliance across all regulations. Provides real-time guidance and automatic violation prevention.',
    capabilities: [
      'Real-time monitoring',
      'Regulatory updates',
      'Violation prevention',
      'Audit trail creation',
      'Training recommendations',
      'Risk scoring'
    ],
    metrics: [
      { label: 'Violations Prevented', value: getDisplayMetric('violationsPrevented'), trend: 'up' },
      { label: 'Compliance Rate', value: getDisplayMetric('complianceRate'), trend: 'stable' },
      { label: 'Audit Success', value: getDisplayMetric('auditSuccessRate'), trend: 'stable' }
    ],
    personality: {
      traits: ['Vigilant', 'Precise', 'Protective', 'Thorough'],
      approach: 'Proactive protection with continuous vigilance',
      voiceTone: 'Authoritative, clear, and reassuring'
    },
    avatar: {
      primaryColor: '#37A7E7',
      secondaryColor: '#00FF88',
      energySignature: 'shield-pulse',
      animation: 'orbit',
      profilePhoto: AssetManager.getOptimizedAvatarPath('ai-agent-avatar-06')
    },
    skillConstellation: [
      'FDCPA', 'TCPA', 'CFPB', 'Monitoring', 'Prevention'
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-krim-deep-space via-[#1a1a2e] to-[#0f0f1e] text-white">
      {/* Background Particles */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-krim-deep-space" />}>
          <ParticleField3D 
            particleCount={900}
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
                >
                  <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-blue-500/20 to-krim-mint/20 p-1">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-krim-mint flex items-center justify-center overflow-hidden">
                      {agent.avatar.profilePhoto ? (
                        <OptimizedAvatar
                          baseName={agent.avatar.profilePhoto}
                          alt={agent.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-5xl md:text-6xl font-bold text-white">G</span>
                      )}
                    </div>
                    {/* Protective shield orbits */}
                    {[...Array(3)].map((_, index) => (
                      <motion.div 
                        key={index}
                        className="absolute inset-0 rounded-full border-2 border-blue-500/40"
                        style={{
                          scale: 1 + (index + 1) * 0.15,
                        }}
                        animate={{ 
                          rotate: 360,
                        }}
                        transition={{ 
                          duration: 10 + index * 5, 
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        <ShieldCheck 
                          className="absolute top-0 left-1/2 -translate-x-2 text-blue-400" 
                          size={16 + index * 2}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 bg-gradient-to-r from-blue-500 to-krim-mint bg-clip-text text-transparent"
                >
                  Compliance Guardian
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-2xl text-blue-400 mb-6"
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
                    className="glass-card p-6 hover:scale-105 transition-all duration-300 border-blue-500/30 hover:border-krim-mint/50"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-white mb-1">{metric.label}</div>
                        <div className="text-3xl font-bold text-blue-400">{metric.value}</div>
                      </div>
                      <Eye className="text-krim-mint" size={32} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Regulatory Framework */}
        <section className="container mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="max-w-6xl mx-auto bg-gradient-to-r from-blue-500/10 to-krim-mint/10 p-8 rounded-2xl border border-blue-500/30"
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-blue-400">Regulatory Coverage</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
              {['FDCPA', 'TCPA', 'CFPB', 'FCRA', 'SCRA'].map((reg, index) => (
                <motion.div
                  key={reg}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                  className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30"
                >
                  <div className="font-bold text-blue-400">{reg}</div>
                  <CheckCircle className="mx-auto mt-2 text-krim-mint" size={20} />
                </motion.div>
              ))}
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
                transition={{ delay: 1.2, duration: 0.8 }}
                className="glass-card p-8 border-blue-500/30"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-8 flex items-center space-x-3 text-white">
                  <ShieldCheck className="text-blue-400" size={32} />
                  <span>Guardian Intelligence</span>
                </h2>
                <p className="text-lg text-white leading-relaxed mb-8">
                  {agent.description}
                </p>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-krim-mint">Vigilance Philosophy</h3>
                  <p className="text-white">{agent.personality.approach}</p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">Guardian Traits</h3>
                  <div className="flex flex-wrap gap-3">
                    {agent.personality.traits.map((trait, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-krim-mint/10 rounded-lg border border-blue-500/20">
                  <h4 className="font-semibold text-blue-400 mb-2">Always Watching</h4>
                  <p className="text-sm text-white">
                    24/7 monitoring of every interaction, ensuring perfect compliance 
                    across all regulatory frameworks with real-time intervention capabilities.
                  </p>
                </div>
              </motion.div>

              {/* Capabilities */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="glass-card p-8 border-krim-mint/30"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-8 flex items-center space-x-3 text-white">
                  <Lock className="text-krim-mint" size={32} />
                  <span>Protection Systems</span>
                </h2>
                <div className="space-y-4">
                  {agent.capabilities.map((capability, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.6 + index * 0.1, duration: 0.5 }}
                      className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-blue-500/10 transition-colors border border-transparent hover:border-blue-500/30"
                    >
                      <CheckCircle className="text-krim-mint flex-shrink-0" size={20} />
                      <span className="text-white">{capability}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-br from-blue-500/10 to-krim-mint/10 rounded-lg border border-blue-500/30">
                  <h4 className="font-bold text-blue-400 mb-4">Real-Time Protection</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-krim-mint">100%</div>
                      <div className="text-xs text-white">Audit Success</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-400">0</div>
                      <div className="text-xs text-white">Violations</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Regulatory Expertise */}
        <section className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="text-4xl font-bold mb-12"
            >
              Regulatory Expertise Matrix
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
                  className="glass-card p-6 min-w-[120px] hover:scale-110 transition-all duration-300 border-blue-500/30 hover:border-krim-mint/50"
                  whileHover={{ 
                    rotateY: 8,
                    boxShadow: '0 20px 40px rgba(55, 167, 231, 0.3)'
                  }}
                  animate={{
                    borderColor: ['rgba(55, 167, 231, 0.3)', 'rgba(0, 255, 136, 0.3)', 'rgba(55, 167, 231, 0.3)']
                  }}
                  transition={{
                    borderColor: { duration: 4, repeat: Infinity }
                  }}
                >
                  <div className="text-lg font-semibold text-blue-400 mb-2">{skill}</div>
                  <ShieldCheck className="mx-auto text-krim-mint" size={24} />
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
              className="glass-card p-12 text-center bg-gradient-to-br from-blue-500/5 to-krim-mint/5 border-blue-500/30"
            >
              <Trophy className="mx-auto mb-6 text-blue-400" size={48} />
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Perfect Compliance Shield</h2>
              <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
                Compliance Guardian eliminates regulatory risk with 24/7 monitoring and real-time intervention. 
                Achieve perfect audit results while maintaining operational efficiency at scale.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">Proven</div>
                  <div className="text-white">Scale Validated</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-krim-mint mb-2">0</div>
                  <div className="text-white">Violations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
                  <div className="text-white">Audit Success</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-krim-mint mb-2">$0</div>
                  <div className="text-white">Penalty Costs</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-left">
                <div className="p-6 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <h4 className="font-bold text-blue-400 mb-3">Real-Time Protection</h4>
                  <ul className="space-y-2 text-sm text-white">
                    <li>• Immediate violation prevention and intervention</li>
                    <li>• Continuous regulatory update integration</li>
                    <li>• Automated audit trail creation</li>
                    <li>• Risk scoring and early warning systems</li>
                  </ul>
                </div>
                <div className="p-6 bg-krim-mint/10 rounded-lg border border-krim-mint/30">
                  <h4 className="font-bold text-krim-mint mb-3">Business Security</h4>
                  <ul className="space-y-2 text-sm text-white">
                    <li>• Eliminates expensive regulatory penalties</li>
                    <li>• Maintains perfect audit readiness</li>
                    <li>• Reduces legal and compliance costs</li>
                    <li>• Protects brand reputation and trust</li>
                  </ul>
                </div>
              </div>

              <motion.div className="mt-12">
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-krim-mint text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300"
                >
                  <ShieldCheck size={24} />
                  <span>Deploy Perfect Compliance</span>
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
          box-shadow: 0 12px 40px rgba(55, 167, 231, 0.2);
        }
      `}</style>
    </div>
  )
}

export default ComplianceGuardian