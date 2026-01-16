import React, { Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Briefcase, Target, CheckCircle, Users, Database, Stack } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import OptimizedAvatar from '../../components/OptimizedAvatar'

const ParticleField3D = React.lazy(() => import('../../components/ParticleField3D'))

const CaseManager: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-krim-deep-space via-[#1a1a2e] to-[#0f0f1e] text-white">
      <div className="fixed inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-krim-deep-space" />}>
          <ParticleField3D particleCount={1200} colorPrimary="#8B5CF6" colorSecondary="#37A7E7" />
        </Suspense>
      </div>

      <div className="relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-6 py-8">
          <Link to="/agents" className="inline-flex items-center space-x-2 text-krim-cyan hover:text-white transition-colors group cursor-pointer hover:scale-105">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Multi-Agent OS</span>
          </Link>
        </motion.div>

        <section className="container mx-auto px-6 py-12">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div className="relative inline-block mb-8">
              <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center overflow-hidden">
                <OptimizedAvatar
                  baseName="ai-agent-avatar-09"
                  alt="Case Manager"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover rounded-full"
                  priority
                />
              </div>
            </motion.div>

            <motion.h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent font-black">
              Case Manager
            </motion.h1>
            
            <motion.div className="text-2xl text-purple-400 mb-6">
              Portfolio Orchestration Director
            </motion.div>

            <motion.p className="text-xl italic text-blue-400 mb-12">
              "$2B+ managed with surgical precision"
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="glass-card p-6">
                <div className="text-3xl font-bold text-purple-400 mb-2">$2B+</div>
                <div className="text-white">Portfolio Managed</div>
              </div>
              <div className="glass-card p-6">
                <div className="text-3xl font-bold text-blue-400 mb-2">3.5x</div>
                <div className="text-white">Efficiency Gain</div>
              </div>
              <div className="glass-card p-6">
                <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
                <div className="text-white">Accuracy Rate</div>
              </div>
            </div>

            <motion.div className="glass-card p-12 bg-gradient-to-br from-purple-500/5 to-blue-500/5">
              <Briefcase className="mx-auto mb-6 text-purple-400" size={48} />
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Portfolio Mastery</h2>
              <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
                Case Manager orchestrates complex debt portfolios with intelligent prioritization and automated workflows, 
                ensuring optimal outcomes across billions in managed assets.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="text-left">
                  <h4 className="font-bold text-purple-400 mb-3">Core Capabilities</h4>
                  <ul className="space-y-2 text-sm text-white">
                    <li>• Portfolio analysis and optimization</li>
                    <li>• Intelligent priority scoring</li>
                    <li>• Automated workflow management</li>
                    <li>• Resource allocation optimization</li>
                  </ul>
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-blue-400 mb-3">Business Impact</h4>
                  <ul className="space-y-2 text-sm text-white">
                    <li>• 3.5x improvement in operational efficiency</li>
                    <li>• Perfect accuracy across $2B+ portfolios</li>
                    <li>• Automated case prioritization</li>
                    <li>• Real-time performance tracking</li>
                  </ul>
                </div>
              </div>

              <motion.div className="mt-12">
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300"
                >
                  <Database size={24} />
                  <span>Deploy Portfolio Intelligence</span>
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
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  )
}

export default CaseManager