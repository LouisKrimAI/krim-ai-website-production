/**
 * KULA - AI ASSISTANT FOR BANK OPERATIONS
 * Natural language interface to Kendra for banking operations teams
 */

import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Eye, Brain, Target, Gear, 
  Shield, Database, CheckCircle
} from '@phosphor-icons/react'
import Button from '../components/Button'

// Starfield motion system imports
import { 
  StarfieldLayout, 
  StarfieldSection
} from '../components/motion/StarfieldLayout'
import { Reveal, StaggerGrid } from '../components/motion/primitives'

export default function KulaPage() {
  return (
    <StarfieldLayout pageType="product" contentDensity="moderate">
      
      {/* HERO SECTION */}
      <StarfieldSection glassLevel="ultraLight" className="relative min-h-[700px] lg:min-h-[800px] xl:min-h-[900px] flex items-center py-24 lg:py-32">
        <div className="w-full max-w-6xl mx-auto px-6">
          <div className="text-center">
            {/* Kula Title - Matching Kendra Pattern */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-[1.1] tracking-tight"
            >
              <span className="bg-gradient-to-r from-krim-cyan to-krim-mint bg-clip-text text-transparent font-black">
                Kula™ Digital Twins
              </span>
            </motion.h2>

            {/* Sub-heading - What it IS */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl lg:text-3xl text-white/60 max-w-4xl mx-auto font-light tracking-wide mb-10 leading-relaxed"
            >
              Natural Language Interface for every role
            </motion.p>

            {/* Description - What it DOES */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl lg:text-2xl text-white/70 max-w-4xl mx-auto mb-16 leading-relaxed"
            >
              Query portfolios in plain English. Surface insights from millions of accounts instantly. Transform strategic intent into governed, executable workflows.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center mb-16"
            >
              <Link to="/contact">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-cyan hover:from-krim-mint hover:to-krim-cyan text-black font-semibold px-8 py-4"
                >
                  See Kula in Action
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </StarfieldSection>

      {/* WHAT IS A KULA DIGITAL TWIN */}
      <StarfieldSection glassLevel="light" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal
            direction="up"
            className="mb-12"
          >
            <div className="flex justify-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center">
                What is a <span className="bg-gradient-to-r from-krim-cyan to-krim-mint bg-clip-text text-transparent font-black">Kula Digital Twin</span>?
              </h2>
            </div>
          </Reveal>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="flex justify-center">
                <p className="text-xl md:text-2xl text-white/80 leading-relaxed text-center">
                  A perfect digital replica of your entire bank operation—every account, every rule, every outcome—that you can query<br />in plain English.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-krim-mint/10 flex items-center justify-center">
                    <Database className="w-8 h-8 text-krim-mint" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Live Data Mirror</h3>
                  <p className="text-white/60 text-sm">Real-time sync with all your systems and portfolios</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-krim-mint/10 flex items-center justify-center">
                    <Brain className="w-8 h-8 text-krim-mint" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Natural Language</h3>
                  <p className="text-white/60 text-sm">Ask questions like you would a colleague</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-krim-mint/10 flex items-center justify-center">
                    <Target className="w-8 h-8 text-krim-mint" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Instant Insights</h3>
                  <p className="text-white/60 text-sm">Get answers and action plans in seconds</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </StarfieldSection>

      {/* CORE CAPABILITIES */}
      <StarfieldSection glassLevel="ultraLight" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal
            direction="up"
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
              Command Your Bank Operations Through{' '}
              <span className="bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-cyan bg-clip-text text-transparent">
                Natural Language
              </span>
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              <p className="text-xl md:text-2xl text-white/90 font-medium">
                Turn strategy into action instantly
              </p>
              <p className="text-lg text-white/70 leading-relaxed">
                Kula translates your executive intent into governed, executable workflows across Kendra—no technical knowledge required
              </p>
            </div>
          </Reveal>

          <StaggerGrid
            staggerDelay={100}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="p-8 bg-black/20 border border-white/10 rounded-xl hover:border-krim-mint/30 transition-all duration-300 flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-krim-mint/20 flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-krim-mint" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Cross-System Intelligence Access</h3>
              <div className="flex-grow">
                <p className="text-white/70 mb-4">
                  "Why did our Texas collections performance drop 15% last month?"
                  Query across all systems, surface root causes, recommend specific actions.
                </p>
              </div>
              <p className="text-sm text-krim-mint mt-auto">
                Replace weeks of analyst work with instant, comprehensive insights
              </p>
            </div>

            <div className="p-8 bg-black/20 border border-white/10 rounded-xl hover:border-krim-mint/30 transition-all duration-300 flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-krim-mint/20 flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-krim-mint" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Strategic Workflow Orchestration</h3>
              <div className="flex-grow">
                <p className="text-white/70 mb-4">
                  "Reduce early delinquency by improving first-payment success rates"
                  Analyze workflows, suggest intervention strategies, build compliant campaigns.
                </p>
              </div>
              <p className="text-sm text-krim-mint mt-auto">
                Strategic goals become actionable, governed workflows in minutes
              </p>
            </div>

            <div className="p-8 bg-black/20 border border-white/10 rounded-xl hover:border-krim-mint/30 transition-all duration-300 flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-krim-mint/20 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-krim-mint" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Deploy AI Workforce</h3>
              <div className="flex-grow">
                <p className="text-white/70 mb-4">
                  "Deploy AI for routine payment inquiries but escalate hardship cases"
                  Configure Karta agents with precise guardrails and human oversight.
                </p>
              </div>
              <p className="text-sm text-krim-mint mt-auto">
                Governed AI deployment with complete transparency
              </p>
            </div>

            <div className="p-8 bg-black/20 border border-white/10 rounded-xl hover:border-krim-mint/30 transition-all duration-300 flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-krim-mint/20 flex items-center justify-center mb-6">
                <Gear className="w-6 h-6 text-krim-mint" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Policy-as-Code Management</h3>
              <div className="flex-grow">
                <p className="text-white/70 mb-4">
                  "Update contact strategy for new CFPB Reg F guidance"
                  Translate regulatory requirements into operational rules, implement instantly.
                </p>
              </div>
              <p className="text-sm text-krim-mint mt-auto">
                Regulatory changes become operational compliance in hours, not months
              </p>
            </div>
          </StaggerGrid>
        </div>
      </StarfieldSection>

      {/* USER IMPACT */}
      <StarfieldSection glassLevel="standard" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal
            direction="up"
            className="mb-16"
          >
            <div className="flex flex-col items-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
                <span className="block text-white">Real Impact for</span>
                <span className="block bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent font-black">Banking Operations Teams</span>
              </h2>
              <div className="flex flex-col items-center">
                <p className="text-xl md:text-2xl text-white/80 font-medium text-center">
                  From hours of data gathering to minutes of insight and action
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Before Kula</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-white/70">Wait 3 days for analyst reports</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-white/70">Email chains to gather cross-system data</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-white/70">Weeks to test and deploy strategy changes</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-white/70">React to problems after portfolio impact</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-krim-mint mb-6">With Kula</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-krim-mint mt-0.5 flex-shrink-0" />
                  <span className="text-white/90">Get any operational insight instantly</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-krim-mint mt-0.5 flex-shrink-0" />
                  <span className="text-white/90">Query across all systems in natural language</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-krim-mint mt-0.5 flex-shrink-0" />
                  <span className="text-white/90">Test and deploy changes in minutes</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-krim-mint mt-0.5 flex-shrink-0" />
                  <span className="text-white/90">Proactively prevent issues before impact</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Role Examples - Redesigned for credibility and scannability */}
          <div className="mt-16">
            <Reveal
              direction="up"
              className="mb-12"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
                How Different Roles Use{' '}
                <span className="bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-cyan bg-clip-text text-transparent">
                  Kula
                </span>
              </h3>
              <p className="text-lg text-center max-w-2xl mx-auto">
                <span className="bg-gradient-to-r from-krim-mint/80 via-krim-cyan/80 to-krim-mint/80 bg-clip-text text-transparent font-medium">
                  Natural language queries
                </span>{' '}
                <span className="text-white/60">tailored to each executive's priorities</span>
              </p>
            </Reveal>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* CRO/Risk Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group relative p-6 bg-gradient-to-b from-black/30 to-black/10 border border-white/10 rounded-xl hover:border-krim-mint/40 transition-all duration-300 flex flex-col h-full"
              >
                
                <h4 className="text-lg font-bold mt-2 mb-4">
                  <span className="bg-gradient-to-r from-krim-cyan/90 via-krim-mint/90 to-krim-cyan/90 bg-clip-text text-transparent">
                    Chief Risk Officer
                  </span>
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-white/50 uppercase tracking-wider mb-1">Asks:</p>
                    <p className="text-sm text-white/90 italic">
                      "Show me portfolio segments with deteriorating payment patterns"
                    </p>
                  </div>
                  
                  <div className="pt-3 border-t border-white/10">
                    <p className="text-sm font-medium text-white/50 uppercase tracking-wider mb-2">Kula Delivers:</p>
                    <ul className="space-y-1.5">
                      <li className="text-sm text-white/80 flex items-start">
                        <span className="text-krim-mint mr-2">•</span>
                        <span>Risk concentration analysis</span>
                      </li>
                      <li className="text-sm text-white/80 flex items-start">
                        <span className="text-krim-mint mr-2">•</span>
                        <span>Early warning alerts</span>
                      </li>
                      <li className="text-sm text-white/80 flex items-start">
                        <span className="text-krim-mint mr-2">•</span>
                        <span>Recommended intervention strategies with compliance validation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* COO/Operations Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group relative p-6 bg-gradient-to-b from-black/30 to-black/10 border border-white/10 rounded-xl hover:border-krim-mint/40 transition-all duration-300 flex flex-col h-full"
              >
                
                <h4 className="text-lg font-bold mt-2 mb-4">
                  <span className="bg-gradient-to-r from-krim-cyan/90 via-krim-mint/90 to-krim-cyan/90 bg-clip-text text-transparent">
                    Chief Operating Officer
                  </span>
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-white/50 uppercase tracking-wider mb-1">Asks:</p>
                    <p className="text-sm text-white/90 italic">
                      "Reduce our cost-to-collect while maintaining recovery rates"
                    </p>
                  </div>
                  
                  <div className="pt-3 border-t border-white/10">
                    <p className="text-sm font-medium text-white/50 uppercase tracking-wider mb-2">Kula Delivers:</p>
                    <ul className="space-y-1.5">
                      <li className="text-sm text-white/80 flex items-start">
                        <span className="text-krim-mint mr-2">•</span>
                        <span>Channel optimization analysis</span>
                      </li>
                      <li className="text-sm text-white/80 flex items-start">
                        <span className="text-krim-mint mr-2">•</span>
                        <span>Agent productivity insights</span>
                      </li>
                      <li className="text-sm text-white/80 flex items-start">
                        <span className="text-krim-mint mr-2">•</span>
                        <span>Workflow efficiency recommendations</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Strategy Head Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="group relative p-6 bg-gradient-to-b from-black/30 to-black/10 border border-white/10 rounded-xl hover:border-krim-mint/40 transition-all duration-300 flex flex-col h-full"
              >
                
                <h4 className="text-lg font-bold mt-2 mb-4">
                  <span className="bg-gradient-to-r from-krim-cyan/90 via-krim-mint/90 to-krim-cyan/90 bg-clip-text text-transparent">
                    Head of Collections
                  </span>
                </h4>
                
                <div className="flex flex-col h-full">
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-white/50 uppercase tracking-wider mb-1">Asks:</p>
                    <p className="text-sm text-white/90 italic">
                      "Optimize our approach for accounts hitting 30+ days past due"
                    </p>
                  </div>
                  
                  <div className="pt-3 border-t border-white/10 mt-auto">
                    <p className="text-sm font-medium text-white/50 uppercase tracking-wider mb-2">Kula Delivers:</p>
                    <ul className="space-y-1.5">
                      <li className="text-sm text-white/80 flex items-start">
                        <span className="text-krim-mint mr-2">•</span>
                        <span>Performance analysis of current strategies</span>
                      </li>
                      <li className="text-sm text-white/80 flex items-start">
                        <span className="text-krim-mint mr-2">•</span>
                        <span>A/B test recommendations</span>
                      </li>
                      <li className="text-sm text-white/80 flex items-start">
                        <span className="text-krim-mint mr-2">•</span>
                        <span>Deployment-ready campaign variations</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Compliance Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="group relative p-6 bg-gradient-to-b from-black/30 to-black/10 border border-white/10 rounded-xl hover:border-krim-mint/40 transition-all duration-300 flex flex-col h-full"
              >
                
                <h4 className="text-lg font-bold mt-2 mb-4">
                  <span className="bg-gradient-to-r from-krim-cyan/90 via-krim-mint/90 to-krim-cyan/90 bg-clip-text text-transparent">
                    Compliance Officer
                  </span>
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-white/50 uppercase tracking-wider mb-1">Asks:</p>
                    <p className="text-sm text-white/90 italic">
                      "Ensure all outbound activity follows state-specific calling rules"
                    </p>
                  </div>
                  
                  <div className="pt-3 border-t border-white/10">
                    <p className="text-sm font-medium text-white/50 uppercase tracking-wider mb-2">Kula Delivers:</p>
                    <ul className="space-y-1.5">
                      <li className="text-sm text-white/80 flex items-start">
                        <span className="text-krim-mint mr-2">•</span>
                        <span>Policy engine updates</span>
                      </li>
                      <li className="text-sm text-white/80 flex items-start">
                        <span className="text-krim-mint mr-2">•</span>
                        <span>Real-time violation monitoring</span>
                      </li>
                      <li className="text-sm text-white/80 flex items-start">
                        <span className="text-krim-mint mr-2">•</span>
                        <span>Automatic compliance validation for all interactions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Finance Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="group relative p-6 bg-gradient-to-b from-black/30 to-black/10 border border-white/10 rounded-xl hover:border-krim-mint/40 transition-all duration-300 flex flex-col h-full"
              >
                
                <h4 className="text-lg font-bold mt-2 mb-4">
                  <span className="bg-gradient-to-r from-krim-cyan/90 via-krim-mint/90 to-krim-cyan/90 bg-clip-text text-transparent">
                    Finance Director
                  </span>
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-white/50 uppercase tracking-wider mb-1">Asks:</p>
                    <p className="text-sm text-white/90 italic">
                      "Project the impact of extending payment plans for hardship accounts"
                    </p>
                  </div>
                  
                  <div className="pt-3 border-t border-white/10">
                    <p className="text-sm font-medium text-white/50 uppercase tracking-wider mb-2">Kula Delivers:</p>
                    <ul className="space-y-1.5">
                      <li className="text-sm text-white/80 flex items-start">
                        <span className="text-krim-mint mr-2">•</span>
                        <span>Historical pattern analysis</span>
                      </li>
                      <li className="text-sm text-white/80 flex items-start">
                        <span className="text-krim-mint mr-2">•</span>
                        <span>Segment-specific projections</span>
                      </li>
                      <li className="text-sm text-white/80 flex items-start">
                        <span className="text-krim-mint mr-2">•</span>
                        <span>Cash flow impact modeling with confidence intervals</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Back-Office Operations Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="group relative p-6 bg-gradient-to-b from-black/30 to-black/10 border border-white/10 rounded-xl hover:border-krim-mint/40 transition-all duration-300 flex flex-col h-full"
              >
                
                <h4 className="text-lg font-bold mt-2 mb-4">
                  <span className="bg-gradient-to-r from-krim-cyan/90 via-krim-mint/90 to-krim-cyan/90 bg-clip-text text-transparent">
                    Operations Analyst
                  </span>
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-white/50 uppercase tracking-wider mb-1">Asks:</p>
                    <p className="text-sm text-white/90 italic">
                      "Automate our monthly compliance reporting for the board"
                    </p>
                  </div>
                  
                  <div className="pt-3 border-t border-white/10">
                    <p className="text-sm font-medium text-white/50 uppercase tracking-wider mb-2">Kula Delivers:</p>
                    <ul className="space-y-1.5">
                      <li className="text-sm text-white/80 flex items-start">
                        <span className="text-krim-mint mr-2">•</span>
                        <span>Automated Karta-Report configuration</span>
                      </li>
                      <li className="text-sm text-white/80 flex items-start">
                        <span className="text-krim-mint mr-2">•</span>
                        <span>Exception flagging</span>
                      </li>
                      <li className="text-sm text-white/80 flex items-start">
                        <span className="text-krim-mint mr-2">•</span>
                        <span>Audit-ready documentation generation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </StarfieldSection>


      {/* TRUST & FOUNDATION */}
      <StarfieldSection glassLevel="ultraLight" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal
            direction="up"
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Built for Regulated Bank Operations
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Kula connects to Kendra runtime, not documents.<br />
              Every answer is grounded in your actual data.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 rounded-xl bg-krim-mint/20 flex items-center justify-center mx-auto mb-6">
                <Database className="w-8 h-8 text-krim-mint" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Grounded Data</h3>
              <p className="text-white/70 text-sm">
                Connected to live Kendra accounts, interactions, and outcomes. 
                Anchored to your real data - nothing executes without system confirmation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-xl bg-krim-mint/20 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-krim-mint" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Role-Based Access</h3>
              <p className="text-white/70 text-sm">
                See only your portfolios, regions, and queues. 
                All actions flow through established Kriya governance.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-xl bg-krim-mint/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-krim-mint" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Full Audit Trail</h3>
              <p className="text-white/70 text-sm">
                Every question, recommendation, and action is logged. 
                Complete traceability for regulatory requirements.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link to="/contact">
              <Button 
                size="lg"
                className="bg-krim-mint hover:bg-krim-mint/90 text-black font-semibold px-8 py-4 rounded-lg"
              >
                See Kula in Action
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </StarfieldSection>
    </StarfieldLayout>
  )
}