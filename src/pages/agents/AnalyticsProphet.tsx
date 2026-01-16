import React, { Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Brain, TrendUp, Eye, CheckCircle, Sparkle, ChartBar, Diamond } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { AssetManager } from '../../utils/assetManager'
import OptimizedAvatar from '../../components/OptimizedAvatar'

// Lazy load heavy components
const ParticleField3D = React.lazy(() => import('../../components/ParticleField3D'))

const AnalyticsProphet: React.FC = () => {
  const agent = {
    id: 'analytics-prophet',
    name: 'Analytics Prophet',
    role: 'Predictive Intelligence Engine',
    category: 'staff',
    tagline: 'See the future, shape the outcome',
    description: 'Provides predictive analytics and insights that drive strategic decisions. Transforms data into actionable intelligence.',
    capabilities: [
      'Predictive modeling',
      'Trend analysis', 
      'Anomaly detection',
      'Performance forecasting',
      'Behavioral insights',
      'Custom reporting'
    ],
    metrics: [
      { label: 'Prediction Accuracy', value: '94%', trend: 'up' },
      { label: 'Insights Generated', value: '10K+/day', trend: 'up' },
      { label: 'ROI Impact', value: '+127%', trend: 'up' }
    ],
    avatar: {
      profilePhoto: AssetManager.getOptimizedAvatarPath('ai-agent-avatar-08')
    },
    skillConstellation: [
      'Prediction', 'Analytics', 'Insights', 'Forecasting', 'Modeling'
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-krim-deep-space via-[#1a1a2e] to-[#0f0f1e] text-white">
      {/* Background Particles */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-krim-deep-space" />}>
          <ParticleField3D 
            particleCount={1500}
            colorPrimary="#00FF88"
            colorSecondary="#8B5CF6"
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
                >
                  <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-krim-mint/20 to-purple-500/20 p-1">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-krim-mint to-purple-500 flex items-center justify-center overflow-hidden">
                      {agent.avatar.profilePhoto ? (
                        <OptimizedAvatar
                          baseName={agent.avatar.profilePhoto}
                          alt={agent.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-5xl md:text-6xl font-bold text-white">P</span>
                      )}
                    </div>
                    {/* Predictive data streams */}
                    {[...Array(5)].map((_, index) => (
                      <motion.div 
                        key={index}
                        className="absolute w-1 h-12 bg-gradient-to-t from-transparent to-krim-mint rounded-full"
                        style={{
                          left: `${20 + index * 15}%`,
                          top: `${10 + Math.sin(index) * 20}%`,
                        }}
                        animate={{ 
                          height: [12, 24, 12],
                          opacity: [0.3, 1, 0.3]
                        }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-krim-mint to-purple-500 bg-clip-text text-transparent font-black"
                >
                  Analytics Prophet
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
                    className="glass-card p-6 hover:scale-105 transition-all duration-300 border-purple-500/30"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-white mb-1">{metric.label}</div>
                        <div className="text-3xl font-bold text-purple-400">{metric.value}</div>
                      </div>
                      <Diamond className="text-krim-mint" size={32} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Future Vision */}
        <section className="container mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="max-w-6xl mx-auto bg-gradient-to-r from-purple-500/10 to-krim-mint/10 p-8 rounded-2xl border border-purple-500/30"
          >
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4 text-purple-400">Predictive Intelligence</h3>
              <p className="text-white max-w-3xl mx-auto">
                See patterns invisible to human analysis. Predict customer behavior, market trends, 
                and operational bottlenecks before they impact your business.
              </p>
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
              className="glass-card p-8 border-purple-500/30"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 flex items-center space-x-3 text-center justify-center text-white">
                <Brain className="text-purple-500" size={32} />
                <span>Prophetic Capabilities</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {agent.capabilities.slice(0, 3).map((capability, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                      className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-purple-500/10 transition-colors"
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
                      className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-krim-mint/10 transition-colors"
                    >
                      <CheckCircle className="text-krim-mint flex-shrink-0" size={20} />
                      <span className="text-white">{capability}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-krim-mint/10 rounded-lg border border-purple-500/30">
                <h4 className="font-bold text-purple-400 mb-4 text-center">Prediction Engine</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-krim-mint">94%</div>
                    <div className="text-xs text-white">Accuracy</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">10K+</div>
                    <div className="text-xs text-white">Daily Insights</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-krim-mint">+127%</div>
                    <div className="text-xs text-white">ROI Impact</div>
                  </div>
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
              className="glass-card p-12 text-center bg-gradient-to-br from-purple-500/5 to-krim-mint/5 border-purple-500/30"
            >
              <Eye className="mx-auto mb-6 text-purple-400" size={48} />
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Future-Sight Business Intelligence</h2>
              <p className="text-xl text-white mb-12 max-w-3xl mx-auto">
                Analytics Prophet transforms your data into competitive advantage through predictive insights 
                that anticipate market changes, customer behavior, and operational opportunities.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-left">
                <div className="p-6 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <h4 className="font-bold text-purple-400 mb-3">Predictive Power</h4>
                  <ul className="space-y-2 text-sm text-white">
                    <li>• Forecast customer payment behavior with 94% accuracy</li>
                    <li>• Predict optimal contact timing and channels</li>
                    <li>• Identify high-risk accounts before they default</li>
                    <li>• Anticipate market trends and portfolio performance</li>
                  </ul>
                </div>
                <div className="p-6 bg-krim-mint/10 rounded-lg border border-krim-mint/30">
                  <h4 className="font-bold text-krim-mint mb-3">Strategic Advantage</h4>
                  <ul className="space-y-2 text-sm text-white">
                    <li>• Make data-driven decisions with confidence</li>
                    <li>• Optimize resource allocation proactively</li>
                    <li>• Reduce operational costs through prediction</li>
                    <li>• Stay ahead of market changes and opportunities</li>
                  </ul>
                </div>
              </div>

              <motion.div className="mt-12">
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-krim-mint text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300"
                >
                  <Sparkle size={24} />
                  <span>Unleash Predictive Intelligence</span>
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

export default AnalyticsProphet