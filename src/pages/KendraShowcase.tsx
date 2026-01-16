/**
 * KENDRA VISUALIZATION SHOWCASE
 * Compare world-class design approaches
 */

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import KendraElite from '../components/KendraElite'
import KendraUltra from '../components/KendraUltra'
import KendraNeural from '../components/KendraNeural'
import KendraIntelligence from '../components/KendraIntelligence'

export default function KendraShowcase() {
  const [activeView, setActiveView] = useState<'neural' | 'intelligence' | 'ultra' | 'elite'>('neural')

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-white tracking-tight">
                Kendra Visualization
              </h1>
              <p className="text-sm text-[#666666] mt-2">
                Enterprise AI Governance Runtime
              </p>
            </div>
            
            {/* Toggle */}
            <div className="flex items-center gap-2 p-1 bg-[#111111] rounded-lg border border-white/10">
              <button
                onClick={() => setActiveView('neural')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeView === 'neural'
                    ? 'bg-[#00FFB2] text-black'
                    : 'text-[#666666] hover:text-white'
                }`}
              >
                Neural Network
              </button>
              <button
                onClick={() => setActiveView('intelligence')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeView === 'intelligence'
                    ? 'bg-[#00FFB2] text-black'
                    : 'text-[#666666] hover:text-white'
                }`}
              >
                Living Intelligence
              </button>
              <button
                onClick={() => setActiveView('ultra')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeView === 'ultra'
                    ? 'bg-[#00FFB2] text-black'
                    : 'text-[#666666] hover:text-white'
                }`}
              >
                Ultra Design
              </button>
              <button
                onClick={() => setActiveView('elite')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeView === 'elite'
                    ? 'bg-[#00FFB2] text-black'
                    : 'text-[#666666] hover:text-white'
                }`}
              >
                Elite Design
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Visualization */}
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          {activeView === 'neural' ? <KendraNeural /> : 
           activeView === 'intelligence' ? <KendraIntelligence /> :
           activeView === 'ultra' ? <KendraUltra /> : <KendraElite />}
        </motion.div>

        {/* Design Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {/* Neural Intelligence Philosophy */}
          <div className={`${activeView === 'neural' ? 'opacity-100' : 'opacity-40'} transition-opacity duration-300`}>
            <h2 className="text-xl font-semibold text-white mb-4">Neural Intelligence</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 bg-[#00FFB2] rounded-full mt-2" />
                <div>
                  <p className="text-sm text-[#B0B0B0]">
                    Living neural network with real-time synaptic activity
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 bg-[#00FFB2] rounded-full mt-2" />
                <div>
                  <p className="text-sm text-[#B0B0B0]">
                    Emergent thought patterns forming from neural connections
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 bg-[#00FFB2] rounded-full mt-2" />
                <div>
                  <p className="text-sm text-[#B0B0B0]">
                    Interactive consciousness responding to stimuli
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 bg-[#00FFB2] rounded-full mt-2" />
                <div>
                  <p className="text-sm text-[#B0B0B0]">
                    Organic intelligence that breathes and evolves
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-[#111111] rounded-lg border border-white/10">
              <div className="text-xs font-mono text-[#666666] uppercase mb-2">Neural Activity</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-[#00FFB2] font-mono">150</div>
                  <div className="text-[10px] text-[#666666]">neurons</div>
                </div>
                <div>
                  <div className="text-[#00E5FF] font-mono">~450</div>
                  <div className="text-[10px] text-[#666666]">synapses</div>
                </div>
                <div>
                  <div className="text-[#B200FF] font-mono">LIVE</div>
                  <div className="text-[10px] text-[#666666]">thinking</div>
                </div>
                <div>
                  <div className="text-[#FFB200] font-mono">∞</div>
                  <div className="text-[10px] text-[#666666]">patterns</div>
                </div>
              </div>
            </div>
          </div>

          {/* Living Intelligence Philosophy */}
          <div className={`${activeView === 'intelligence' ? 'opacity-100' : 'opacity-40'} transition-opacity duration-300`}>
            <h2 className="text-xl font-semibold text-white mb-4">Living Intelligence</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 bg-[#00FFB2] rounded-full mt-2" />
                <div>
                  <p className="text-sm text-[#B0B0B0]">
                    Self-organizing consciousness with emergent behavior
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 bg-[#00FFB2] rounded-full mt-2" />
                <div>
                  <p className="text-sm text-[#B0B0B0]">
                    Multi-layered cognition with memory formation
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 bg-[#00FFB2] rounded-full mt-2" />
                <div>
                  <p className="text-sm text-[#B0B0B0]">
                    Real-time pattern emergence and recognition
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 bg-[#00FFB2] rounded-full mt-2" />
                <div>
                  <p className="text-sm text-[#B0B0B0]">
                    Organic intelligence that thinks and evolves
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-[#111111] rounded-lg border border-white/10">
              <div className="text-xs font-mono text-[#666666] uppercase mb-2">Cognitive Metrics</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-[#00E5FF] font-mono">AWARE</div>
                  <div className="text-[10px] text-[#666666]">conscious</div>
                </div>
                <div>
                  <div className="text-[#FFB200] font-mono">LEARNING</div>
                  <div className="text-[10px] text-[#666666]">evolving</div>
                </div>
                <div>
                  <div className="text-[#B200FF] font-mono">SENSING</div>
                  <div className="text-[10px] text-[#666666]">perceiving</div>
                </div>
                <div>
                  <div className="text-[#00FFB2] font-mono">THINKING</div>
                  <div className="text-[10px] text-[#666666]">processing</div>
                </div>
              </div>
            </div>
          </div>

          {/* Ultra Design Philosophy */}
          <div className={`${activeView === 'ultra' ? 'opacity-100' : 'opacity-40'} transition-opacity duration-300`}>
            <h2 className="text-xl font-semibold text-white mb-4">Ultra Design</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 bg-[#00FFB2] rounded-full mt-2" />
                <div>
                  <p className="text-sm text-[#B0B0B0]">
                    Inspired by Bloomberg Terminal and Swiss banking interfaces
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 bg-[#00FFB2] rounded-full mt-2" />
                <div>
                  <p className="text-sm text-[#B0B0B0]">
                    Real-time data visualization with network topology
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 bg-[#00FFB2] rounded-full mt-2" />
                <div>
                  <p className="text-sm text-[#B0B0B0]">
                    Process pipeline monitoring with compliance matrix
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 bg-[#00FFB2] rounded-full mt-2" />
                <div>
                  <p className="text-sm text-[#B0B0B0]">
                    Typography-first approach with minimal decoration
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-[#111111] rounded-lg border border-white/10">
              <div className="text-xs font-mono text-[#666666] uppercase mb-2">Key Metrics</div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-[#00FFB2] font-mono">14,892</div>
                  <div className="text-[10px] text-[#666666]">req/s</div>
                </div>
                <div>
                  <div className="text-[#00FFB2] font-mono">99.99%</div>
                  <div className="text-[10px] text-[#666666]">uptime</div>
                </div>
                <div>
                  <div className="text-[#00FFB2] font-mono">0.3ms</div>
                  <div className="text-[10px] text-[#666666]">latency</div>
                </div>
              </div>
            </div>
          </div>

          {/* Elite Design Philosophy */}
          <div className={`${activeView === 'elite' ? 'opacity-100' : 'opacity-40'} transition-opacity duration-300`}>
            <h2 className="text-xl font-semibold text-white mb-4">Elite Design</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 bg-[#00FFB2] rounded-full mt-2" />
                <div>
                  <p className="text-sm text-[#B0B0B0]">
                    Layered architecture visualization with depth
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 bg-[#00FFB2] rounded-full mt-2" />
                <div>
                  <p className="text-sm text-[#B0B0B0]">
                    Perspective grid for spatial organization
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 bg-[#00FFB2] rounded-full mt-2" />
                <div>
                  <p className="text-sm text-[#B0B0B0]">
                    Real-time metrics with visual hierarchy
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 bg-[#00FFB2] rounded-full mt-2" />
                <div>
                  <p className="text-sm text-[#B0B0B0]">
                    Clean separation of concerns and data streams
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-[#111111] rounded-lg border border-white/10">
              <div className="text-xs font-mono text-[#666666] uppercase mb-2">System Layers</div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[#B0B0B0]">Infrastructure</span>
                  <span className="text-[#00FFB2] font-mono">42%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#B0B0B0]">Runtime</span>
                  <span className="text-[#00FFB2] font-mono">67%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#B0B0B0]">Compliance</span>
                  <span className="text-[#00FFB2] font-mono">98%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#B0B0B0]">Intelligence</span>
                  <span className="text-[#00FFB2] font-mono">84%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Design Principles */}
        <div className="mt-16 p-8 bg-[#050505] rounded-xl border border-white/5">
          <h3 className="text-lg font-semibold text-white mb-6">Shared Design Principles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-xs font-mono text-[#00FFB2] uppercase mb-2">01. Purpose</div>
              <p className="text-sm text-[#B0B0B0]">
                Every pixel serves a function. No decorative elements without purpose.
              </p>
            </div>
            <div>
              <div className="text-xs font-mono text-[#00FFB2] uppercase mb-2">02. Trust</div>
              <p className="text-sm text-[#B0B0B0]">
                Designed to pass the CFO credibility test on first impression.
              </p>
            </div>
            <div>
              <div className="text-xs font-mono text-[#00FFB2] uppercase mb-2">03. Clarity</div>
              <p className="text-sm text-[#B0B0B0]">
                Information hierarchy that makes complex systems immediately understandable.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Notes */}
        <div className="mt-8 text-center">
          <p className="text-xs text-[#666666]">
            Built with React, Framer Motion, and TypeScript · Optimized for 60fps performance
          </p>
        </div>
      </div>
    </div>
  )
}