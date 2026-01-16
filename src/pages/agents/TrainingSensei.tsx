import React, { Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, GraduationCap, Users, TrendUp, BookOpen, Trophy, Lightbulb } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import OptimizedAvatar from '../../components/OptimizedAvatar'

const ParticleField3D = React.lazy(() => import('../../components/ParticleField3D'))

const TrainingSensei: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-krim-deep-space via-[#1a1a2e] to-[#0f0f1e] text-white">
      <div className="fixed inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-krim-deep-space" />}>
          <ParticleField3D particleCount={1000} colorPrimary="#37A7E7" colorSecondary="#00D4FF" />
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
              <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-krim-cyan flex items-center justify-center overflow-hidden">
                <OptimizedAvatar
                  baseName="ai-agent-avatar-11"
                  alt="Training Sensei"
                  width={192}
                  height={192}
                  priority={true}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </motion.div>

            <motion.h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-krim-cyan bg-clip-text text-transparent font-black">
              Training Sensei
            </motion.h1>
            
            <motion.div className="text-2xl text-blue-400 mb-6">
              Knowledge Transfer Master
            </motion.div>

            <motion.p className="text-xl italic text-krim-cyan mb-12">
              "Elevate every human in the loop"
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="glass-card p-6">
                <div className="text-3xl font-bold text-blue-400 mb-2">5,000+</div>
                <div className="text-white">Agents Trained</div>
              </div>
              <div className="glass-card p-6">
                <div className="text-3xl font-bold text-krim-cyan mb-2">67%</div>
                <div className="text-white">Skill Improvement</div>
              </div>
              <div className="glass-card p-6">
                <div className="text-3xl font-bold text-blue-400 mb-2">92%</div>
                <div className="text-white">Knowledge Retention</div>
              </div>
            </div>

            <motion.div className="glass-card p-12 bg-gradient-to-br from-blue-500/5 to-krim-cyan/5">
              <GraduationCap className="mx-auto mb-6 text-blue-400" size={48} />
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Human Enhancement Engine</h2>
              <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
                Training Sensei continuously evolves your human workforce by extracting insights from AI successes 
                and transforming them into actionable training programs that elevate every team member.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="text-left">
                  <h4 className="font-bold text-blue-400 mb-3">Training Innovation</h4>
                  <ul className="space-y-2 text-sm text-white">
                    <li>• AI-driven training program design</li>
                    <li>• Personalized skill development paths</li>
                    <li>• Real-time performance coaching</li>
                    <li>• Best practice knowledge extraction</li>
                  </ul>
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-krim-cyan mb-3">Human Impact</h4>
                  <ul className="space-y-2 text-sm text-white">
                    <li>• 67% improvement in agent skills</li>
                    <li>• 92% knowledge retention rate</li>
                    <li>• Continuous certification management</li>
                    <li>• Career development acceleration</li>
                  </ul>
                </div>
              </div>

              <motion.div className="mt-12">
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-krim-cyan text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300"
                >
                  <Lightbulb size={24} />
                  <span>Elevate Your Team</span>
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
          border: 1px solid rgba(55, 167, 231, 0.2);
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  )
}

export default TrainingSensei