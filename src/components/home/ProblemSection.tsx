/**
 * PROBLEM SECTION - Enterprise Homepage
 * What's Broken in Credit Operations Today
 * Professional design with clear visual hierarchy
 */
import React from 'react'
import { motion } from 'framer-motion'
import { Reveal } from '../Reveal'
import { Warning, Shield, Network, Eye, TrendDown, Users, Database } from '@phosphor-icons/react'

const ProblemSection: React.FC = () => {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Professional gradient background */}
      
      {/* Animated warning pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.03 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,0,0,0.1)_0%,transparent_50%)] pointer-events-none"
      />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header - Enhanced */}
        <div className="text-center mb-20">
          <Reveal>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-8 border border-red-500/20"
            >
              <Warning className="w-10 h-10 text-red-400" />
            </motion.div>
          </Reveal>
          <Reveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              <span className="text-orange-400">
                What's Broken
              </span>
              <br />
              <span className="text-white">in Credit Operations Today</span>
            </h2>
          </Reveal>
          <Reveal>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Two fundamental problems are holding back credit operations from reaching their potential
            </p>
          </Reveal>
        </div>

        {/* Two-Column Problem Breakdown - Professional Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Problem 1: Fragmented and Manual Work - Enhanced Card */}
          <Reveal>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="group relative rounded-2xl border border-orange-500/20 hover:border-orange-500/40 overflow-hidden transition-all duration-300"
            >
              {/* Glow effect on hover */}
              
              <div className="relative p-10">
                {/* Header with icon */}
                <div className="flex items-start gap-4 mb-8">
                  <motion.div 
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="flex items-center justify-center w-14 h-14 rounded-xl border border-orange-500/30 flex-shrink-0"
                  >
                    <Network className="w-7 h-7 text-orange-400" />
                  </motion.div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-orange-400 font-bold text-lg">Problem #1</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white leading-tight">
                      Work is fragmented and manual
                    </h3>
                  </div>
                </div>

                {/* Problem points with better design */}
                <div className="space-y-4 mb-8">
                  {[
                    { icon: Database, text: "LOS, cores, CRMs, dialers, ticketing tools and spreadsheets don't really talk" },
                    { icon: Users, text: "People bridge the gaps – re-keying data, chasing updates, remembering rules" },
                    { icon: Eye, text: "Compliance looks back at a small sample and hopes nothing important slipped" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]"
                    >
                      <item.icon className="w-5 h-5 text-orange-400/60 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 leading-relaxed text-sm">{item.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Risk Indicator - Enhanced */}
                <div className="p-4 rounded-lg border border-orange-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-orange-400 mb-1">IMPACT LEVEL</p>
                      <p className="text-sm text-gray-400">System Fragmentation Risk</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <motion.div 
                            key={i} 
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * i, duration: 0.3 }}
                            className={`w-2 h-8 rounded-full origin-bottom ${
                              i <= 4 ? 'border-2 border-orange-500' : 'border border-gray-700'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-orange-400">HIGH</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Reveal>

          {/* Problem 2: GenAI Risks - Enhanced Card */}
          <Reveal>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative rounded-2xl border border-red-500/20 hover:border-red-500/40 overflow-hidden transition-all duration-300"
            >
              {/* Glow effect on hover */}
              
              <div className="relative p-10">
                {/* Header with icon */}
                <div className="flex items-start gap-4 mb-8">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="flex items-center justify-center w-14 h-14 rounded-xl border border-red-500/30 flex-shrink-0"
                  >
                    <Shield className="w-7 h-7 text-red-400" />
                  </motion.div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-red-400 font-bold text-lg">Problem #2</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white leading-tight">
                      GenAI is risky and hard to govern
                    </h3>
                  </div>
                </div>

                {/* Problem points with better design */}
                <div className="space-y-4 mb-8">
                  {[
                    { icon: Warning, text: "Generic models can hallucinate, over-share or hide how they reached an answer" },
                    { icon: Database, text: "It's unclear who and what can see which data, and where that data goes" },
                    { icon: Network, text: "Point bots appear in pockets, with no unified way to control behaviour, data access or explanations to regulators" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]"
                    >
                      <item.icon className="w-5 h-5 text-red-400/60 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 leading-relaxed text-sm">{item.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Risk Indicator - Enhanced */}
                <div className="p-4 rounded-lg border border-red-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-red-400 mb-1">IMPACT LEVEL</p>
                      <p className="text-sm text-gray-400">AI Governance Risk</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <motion.div 
                            key={i} 
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * i, duration: 0.3 }}
                            className={`w-2 h-8 rounded-full origin-bottom ${
                              i <= 5 ? 'border-2 border-red-500' : 'border border-gray-700'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-red-400">CRITICAL</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>

        {/* Bottom Impact Summary - Professional Design */}
        <Reveal>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 text-center"
          >
            <div className="max-w-5xl mx-auto">
              <div className="relative rounded-2xl p-10 border border-red-500/20 overflow-hidden">
                {/* Animated background effect */}
                <motion.div
                  animate={{ 
                    background: [
                      'radial-gradient(circle at 20% 50%, rgba(255, 0, 0, 0.1) 0%, transparent 50%)',
                      'radial-gradient(circle at 80% 50%, rgba(255, 100, 0, 0.1) 0%, transparent 50%)',
                      'radial-gradient(circle at 20% 50%, rgba(255, 0, 0, 0.1) 0%, transparent 50%)'
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                  className="absolute inset-0 pointer-events-none"
                />
                
                <div className="relative z-10">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-red-500/10 rounded-full border border-red-500/20"
                  >
                    <TrendDown className="w-5 h-5 text-red-400" />
                    <span className="text-red-400 font-semibold">The Costly Result</span>
                  </motion.div>
                  
                  <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed font-light mb-8">
                    Credit operations become <span className="text-orange-400 font-semibold">expensive</span>, 
                    <span className="text-red-400 font-semibold"> error-prone</span>, and 
                    <span className="text-red-500 font-semibold"> risky</span>.
                  </p>
                  
                  <p className="text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto">
                    Teams spend more time fighting systems than serving customers, while regulators demand explanations that scattered AI tools can't provide.
                  </p>
                  
                  {/* Impact metrics */}
                  <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/[0.08]">
                    {[
                      { label: 'Manual Work', value: '70%', color: 'text-orange-400' },
                      { label: 'Error Rate', value: '15%+', color: 'text-red-400' },
                      { label: 'Compliance Risk', value: 'HIGH', color: 'text-red-500' }
                    ].map((metric, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="text-center"
                      >
                        <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                        <p className="text-xs text-gray-500 mt-1">{metric.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}

export default ProblemSection