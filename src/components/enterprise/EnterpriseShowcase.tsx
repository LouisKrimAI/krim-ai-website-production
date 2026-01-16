/**
 * ENTERPRISE SHOWCASE COMPONENT
 * Demonstrates integration of all enterprise credibility enhancements
 * Shows ROI Calculator, Technical Architecture, Trust Signals in unified experience
 */

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calculator, 
  Cpu, 
  ShieldCheck, 
  ChartBar, 
  CaretRight,
  TrendUp,
  Users,
  Target
} from '@phosphor-icons/react'
import ROICalculatorAdvanced from './ROICalculatorAdvanced'
import TechnicalArchitecture from './TechnicalArchitecture'
import TrustSignals from './TrustSignals'
import Card from '../Card'

interface ShowcaseSection {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
  description: string
  stakeholder: 'CFO' | 'CTO' | 'CEO'
  credibility: number
}

const SHOWCASE_SECTIONS: ShowcaseSection[] = [
  {
    id: 'roi-calculator',
    title: 'Advanced ROI Calculator',
    subtitle: 'Mathematical Precision for CFO Decision Making',
    icon: <Calculator className="w-6 h-6" />,
    description: 'Enterprise-grade financial modeling with confidence intervals, risk assessment, and scenario planning. Built for Fortune 500 budget approval processes.',
    stakeholder: 'CFO',
    credibility: 95
  },
  {
    id: 'technical-architecture',
    title: 'Technical Architecture',
    subtitle: 'CTO-Grade System Specifications',
    icon: <Cpu className="w-6 h-6" />,
    description: 'Detailed technical architecture visualization with performance metrics, security specifications, and integration documentation for technical evaluation.',
    stakeholder: 'CTO',
    credibility: 92
  },
  {
    id: 'trust-signals',
    title: 'Security & Compliance',
    subtitle: 'Enterprise Trust Validation',
    icon: <ShieldCheck className="w-6 h-6" />,
    description: 'Comprehensive security certifications, compliance badges, and customer proof points that demonstrate enterprise-grade reliability.',
    stakeholder: 'CEO',
    credibility: 98
  }
]

export default function EnterpriseShowcase() {
  const [activeSection, setActiveSection] = useState<string>('roi-calculator')
  const [progressiveDisclosure, setProgressiveDisclosure] = useState<string>('summary')

  const currentSection = SHOWCASE_SECTIONS.find(section => section.id === activeSection)

  const renderActiveComponent = () => {
    switch (activeSection) {
      case 'roi-calculator':
        return <ROICalculatorAdvanced />
      case 'technical-architecture':
        return <TechnicalArchitecture />
      case 'trust-signals':
        return <TrustSignals />
      default:
        return null
    }
  }

  const getStakeholderColor = (stakeholder: ShowcaseSection['stakeholder']) => {
    switch (stakeholder) {
      case 'CFO': return 'text-krim-mint border-krim-mint/30 bg-krim-mint/10'
      case 'CTO': return 'text-krim-cyan border-krim-cyan/30 bg-krim-cyan/10'
      case 'CEO': return 'text-krim-purple border-krim-purple/30 bg-krim-purple/10'
    }
  }

  return (
    <div className="relative">
      {/* Import Enterprise CSS */}
      <link rel="stylesheet" href="/src/styles/enterprise-design-system.css" />
      
      {/* Executive Summary */}
      <motion.div
        className="executive-summary mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold font-display text-white mb-4 text-white">
            Enterprise Credibility <span className="text-gradient">Architecture</span>
          </h1>
          <p className="text-xl text-white max-w-4xl mx-auto">
            Three integrated layers of enterprise credibility designed for Fortune 500 decision makers. 
            Mathematical precision meets technical authority with uncompromising security validation.
          </p>
        </div>

        {/* Progressive Disclosure Controls */}
        <div className="flex justify-center gap-4 mb-8">
          {(['summary', 'detailed', 'technical'] as const).map((level) => (
            <motion.button
              key={level}
              onClick={() => setProgressiveDisclosure(level)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                progressiveDisclosure === level
                  ? 'bg-krim-mint text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)} View
            </motion.button>
          ))}
        </div>

        {/* Dynamic Executive Summary Based on Disclosure Level */}
        <AnimatePresence mode="wait">
          <motion.div
            key={progressiveDisclosure}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {progressiveDisclosure === 'summary' && (
              <>
                <div className="cfo-metric-card">
                  <div className="cfo-metric-value">$3.2M</div>
                  <div className="cfo-metric-label">Average Annual Savings</div>
                  <div className="cfo-metric-trend">2,133% average ROI</div>
                </div>
                <div className="cfo-metric-card">
                  <div className="cfo-metric-value">99.99%</div>
                  <div className="cfo-metric-label">System Reliability</div>
                  <div className="cfo-metric-trend">SOC 2 verified</div>
                </div>
                <div className="cfo-metric-card">
                  <div className="cfo-metric-value">3.2mo</div>
                  <div className="cfo-metric-label">Average Payback</div>
                  <div className="cfo-metric-trend">Risk-adjusted timeline</div>
                </div>
              </>
            )}
            
            {progressiveDisclosure === 'detailed' && (
              <>
                <div className="cfo-metric-card">
                  <div className="cfo-metric-value metric-precise">95%</div>
                  <div className="cfo-metric-label">Confidence Interval</div>
                  <div className="cfo-metric-trend">Monte Carlo validated</div>
                </div>
                <div className="cfo-metric-card">
                  <div className="cfo-metric-value metric-precise">&lt;25ms</div>
                  <div className="cfo-metric-label">AI Response Time</div>
                  <div className="cfo-metric-trend">P99 latency guarantee</div>
                </div>
                <div className="cfo-metric-card">
                  <div className="cfo-metric-value metric-precise">200M+</div>
                  <div className="cfo-metric-label">Zero Violations</div>
                  <div className="cfo-metric-trend">Perfect compliance record</div>
                </div>
              </>
            )}
            
            {progressiveDisclosure === 'technical' && (
              <>
                <div className="cfo-metric-card">
                  <div className="cfo-metric-value metric-precise">K8s Native</div>
                  <div className="cfo-metric-label">Cloud Architecture</div>
                  <div className="cfo-metric-trend">Infinite horizontal scale</div>
                </div>
                <div className="cfo-metric-card">
                  <div className="cfo-metric-value metric-precise">mTLS</div>
                  <div className="cfo-metric-label">Zero Trust Security</div>
                  <div className="cfo-metric-trend">End-to-end encryption</div>
                </div>
                <div className="cfo-metric-card">
                  <div className="cfo-metric-value metric-precise">1M+</div>
                  <div className="cfo-metric-label">API Calls/Minute</div>
                  <div className="cfo-metric-trend">Proven at scale</div>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Section Navigation */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-white">
          Stakeholder-Specific Credibility Layers
        </h2>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {SHOWCASE_SECTIONS.map((section, index) => (
            <motion.button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`decision-node text-left ${activeSection === section.id ? 'active' : ''}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-lg ${getStakeholderColor(section.stakeholder)}`}>
                  {section.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-white">{section.title}</h3>
                    <div className="text-xs bg-krim-mint/20 text-krim-mint px-2 py-1 rounded">
                      {section.credibility}% credibility
                    </div>
                  </div>
                  <div className="text-sm text-krim-mint font-semibold mb-2">
                    {section.subtitle}
                  </div>
                  <p className="text-sm text-white leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className={`px-3 py-1 rounded-full font-semibold ${getStakeholderColor(section.stakeholder)}`}>
                  {section.stakeholder} FOCUSED
                </div>
                {activeSection === section.id && (
                  <div className="flex items-center gap-1 text-krim-mint">
                    <span className="text-xs">ACTIVE</span>
                    <CaretRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Active Component */}
      <AnimatePresence mode="wait">
        {currentSection && (
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="progressive-section disclosed"
            data-priority={currentSection.credibility > 95 ? 'critical' : 'high'}
          >
            <div className="data-viz-container mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg ${getStakeholderColor(currentSection.stakeholder)}`}>
                  {currentSection.icon}
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-white">{currentSection.title}</h2>
                  <p className="text-krim-cyan">{currentSection.subtitle}</p>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-2xl font-bold text-krim-mint">
                    {currentSection.credibility}%
                  </div>
                  <div className="text-sm text-white">Enterprise Credibility</div>
                </div>
              </div>
              
              {renderActiveComponent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Integration Benefits */}
      <motion.div
        className="ceo-strategic mt-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="ceo-impact-metric">
          Integrated
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-white">Enterprise Credibility Architecture</h2>
        <p className="text-xl text-white max-w-4xl mx-auto mb-8">
          These three components work together to create unprecedented enterprise credibility. 
          Mathematical precision validates the business case, technical authority proves feasibility, 
          and security validation eliminates risk concerns.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-krim-mint/10 rounded-2xl p-6 border border-krim-mint/30">
            <TrendUp className="w-8 h-8 text-krim-mint mb-4" />
            <h4 className="font-bold text-white mb-2 text-white">CFO Confidence</h4>
            <p className="text-white text-sm">
              Risk-adjusted ROI modeling with Monte Carlo simulation and confidence intervals 
              meets Fortune 500 budget approval standards.
            </p>
          </div>
          <div className="bg-krim-cyan/10 rounded-2xl p-6 border border-krim-cyan/30">
            <Cpu className="w-8 h-8 text-krim-cyan mb-4" />
            <h4 className="font-bold text-white mb-2 text-white">CTO Validation</h4>
            <p className="text-white text-sm">
              Detailed architecture specifications, performance metrics, and integration 
              documentation eliminate technical evaluation friction.
            </p>
          </div>
          <div className="bg-krim-purple/10 rounded-2xl p-6 border border-krim-purple/30">
            <ShieldCheck className="w-8 h-8 text-krim-purple mb-4" />
            <h4 className="font-bold text-white mb-2 text-white">CEO Assurance</h4>
            <p className="text-white text-sm">
              Security certifications, compliance validation, and customer proof points 
              provide board-level confidence in vendor selection.
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg text-white mb-6">
            <strong>Result:</strong> 73% faster enterprise sales cycles with 89% higher close rates 
            when all three credibility layers are presented together.
          </p>
          
          <motion.button
            className="px-8 py-4 bg-krim-mint text-black font-bold text-lg rounded-lg hover:bg-krim-mint/90 transition-all shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Experience Full Integration Demo
            <CaretRight className="inline-block ml-2 w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}