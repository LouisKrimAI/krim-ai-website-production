import React, { Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Lightning, Network, CheckCircle, Gear, Link as LinkIcon, ShieldCheck } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import OptimizedAvatar from '../../components/OptimizedAvatar'

const ParticleField3D = React.lazy(() => import('../../components/ParticleField3D'))

const IntegrationWizard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-krim-deep-space via-[#1a1a2e] to-[#0f0f1e] text-white">
      <div className="fixed inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-krim-deep-space" />}>
          <ParticleField3D particleCount={1600} colorPrimary="#FF4C61" colorSecondary="#37A7E7" />
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
              <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-red-500 to-blue-500 flex items-center justify-center overflow-hidden">
                <OptimizedAvatar
                  baseName="ai-agent-avatar-10"
                  alt="Integration Wizard"
                  width={192}
                  height={192}
                  priority={true}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </motion.div>

            <motion.h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent font-black">
              Integration Wizard
            </motion.h1>
            
            <motion.div className="text-2xl text-red-400 mb-6">
              System Connectivity Master
            </motion.div>

            <motion.p className="text-xl italic text-blue-400 mb-12">
              "Seamless connections, infinite possibilities"
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="glass-card p-6">
                <div className="text-3xl font-bold text-red-400 mb-2">50+</div>
                <div className="text-white">Systems Connected</div>
              </div>
              <div className="glass-card p-6">
                <div className="text-3xl font-bold text-blue-400 mb-2">99.99%</div>
                <div className="text-white">Uptime</div>
              </div>
              <div className="glass-card p-6">
                <div className="text-3xl font-bold text-red-400 mb-2">100%</div>
                <div className="text-white">Data Accuracy</div>
              </div>
            </div>

            <motion.div className="glass-card p-12 bg-gradient-to-br from-red-500/5 to-blue-500/5">
              <Network className="mx-auto mb-6 text-red-400" size={48} />
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Universal Connectivity</h2>
              <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
                Integration Wizard creates seamless connections between Krim AI and your existing ecosystem, 
                ensuring perfect data flow and system harmony across your entire technology stack.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="text-left">
                  <h4 className="font-bold text-red-400 mb-3">Technical Mastery</h4>
                  <ul className="space-y-2 text-sm text-white">
                    <li>• API management and optimization</li>
                    <li>• Real-time data synchronization</li>
                    <li>• Advanced error handling</li>
                    <li>• Security protocol management</li>
                  </ul>
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-blue-400 mb-3">Integration Excellence</h4>
                  <ul className="space-y-2 text-sm text-white">
                    <li>• 50+ systems seamlessly connected</li>
                    <li>• 99.99% uptime guarantee</li>
                    <li>• Perfect data accuracy</li>
                    <li>• Enterprise-grade security</li>
                  </ul>
                </div>
              </div>

              <motion.div className="mt-12">
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300"
                >
                  <LinkIcon size={24} />
                  <span>Connect Your Ecosystem</span>
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
          border: 1px solid rgba(255, 76, 97, 0.2);
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  )
}

export default IntegrationWizard