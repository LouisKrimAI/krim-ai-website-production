/**
 * KULA - DIGITAL TWINS FOR REGULATED OPERATIONS
 * Natural language interface to Kendra for operations teams
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

/* ------------------------------------------------------------------ */
/*  Shared card style tokens (Kula = cyan primary, mint secondary)    */
/* ------------------------------------------------------------------ */
const glassCard = 'relative backdrop-blur-md bg-gradient-to-br from-krim-cyan/[0.05] to-krim-cyan/[0.02] group-hover:from-krim-cyan/[0.12] group-hover:to-krim-cyan/[0.06] border border-white/[0.08] rounded-2xl overflow-hidden group-hover:shadow-[0_8px_32px_rgba(0,212,255,0.15)]'
const glassCardHover = 'hover:border-krim-cyan/50 transition-all duration-500'
const roleCard = 'relative backdrop-blur-md bg-gradient-to-br from-krim-cyan/[0.05] to-krim-mint/[0.02] group-hover:from-krim-cyan/[0.12] group-hover:to-krim-mint/[0.06] border border-white/[0.08] rounded-2xl overflow-hidden hover:border-krim-cyan/50 transition-all duration-500 group-hover:shadow-[0_8px_32px_rgba(0,212,255,0.15)]'

export default function KulaPage() {
  return (
    <StarfieldLayout pageType="product" contentDensity="moderate">

      {/* HERO SECTION */}
      <StarfieldSection glassLevel="ultraLight" className="relative flex items-center py-20 md:py-28">
        <div className="w-full max-w-6xl mx-auto px-6">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[1.1] tracking-tight"
            >
              <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent font-black">
                Kula™ Digital Twins
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto font-light tracking-wide mb-10 leading-relaxed"
            >
              Powered by Kendra Runtime
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl text-white/70 max-w-4xl mx-auto mb-16 leading-relaxed"
            >
              Query portfolios in plain English. Surface insights from millions of records. Turn intent into governed, executable workflows.
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
                  className="bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-cyan hover:from-krim-mint hover:to-krim-cyan text-black font-semibold rounded-xl px-8 py-3.5"
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
      <StarfieldSection glassLevel="light" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal direction="up" className="mb-12">
            <div className="flex justify-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 text-center">
                What is a <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent font-black">Kula Digital Twin</span>?
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
                <p className="text-lg md:text-xl text-white/60 leading-relaxed text-center max-w-3xl">
                  A digital replica of your entire operation—every record, every rule, every outcome—queryable in plain English.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 pt-8">
                {[
                  { icon: Database, title: 'Live Data Mirror', desc: 'Real-time sync with all your systems and portfolios' },
                  { icon: Brain, title: 'Natural Language', desc: 'Ask questions like you would a colleague' },
                  { icon: Target, title: 'Instant Insights', desc: 'Get answers and action plans in seconds' },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className={`${glassCard} ${glassCardHover} p-7 text-center`}
                  >
                    <div className="w-11 h-11 mx-auto mb-4 rounded-lg bg-krim-cyan/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-krim-cyan/30">
                      <item.icon className="w-5 h-5 text-krim-cyan" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-white/55">{item.desc}</p>
                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-krim-cyan/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </StarfieldSection>

      {/* CORE CAPABILITIES */}
      <StarfieldSection glassLevel="ultraLight" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal direction="up" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
              Command Operations Through{' '}
              <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">
                Natural Language
              </span>
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-lg md:text-xl text-white/60">
                Turn strategy into action instantly
              </p>
              <p className="text-sm text-white/55 leading-relaxed">
                Kula translates your executive intent into governed, executable workflows across Kendra—no technical knowledge required
              </p>
            </div>
          </Reveal>

          <StaggerGrid staggerDelay={100} className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Eye,
                title: 'Cross-System Intelligence Access',
                body: '"Why did our Southwest region performance drop 15% last month?" Query across all systems, surface root causes, recommend specific actions.',
                accent: 'Replace weeks of analyst work with instant, comprehensive insights',
              },
              {
                icon: Brain,
                title: 'Strategic Workflow Orchestration',
                body: '"Reduce case escalations by improving first-contact resolution rates" Analyze workflows, suggest intervention strategies, build compliant campaigns.',
                accent: 'Strategic goals become actionable, governed workflows in minutes',
              },
              {
                icon: Target,
                title: 'Deploy Autonomous Workers',
                body: '"Deploy Autonomous Workers for routine inquiries but escalate complex cases" Configure Karta agents with precise guardrails and human oversight.',
                accent: 'Governed worker deployment with complete transparency',
              },
              {
                icon: Gear,
                title: 'Policy-as-Code Management',
                body: '"Update contact strategy for new regulatory guidance" Translate regulatory requirements into operational rules, implement instantly.',
                accent: 'Regulatory changes become operational compliance in hours, not months',
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`group ${glassCard} ${glassCardHover} p-7 flex flex-col`}
              >
                <div className="w-10 h-10 rounded-lg bg-krim-cyan/10 flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-krim-cyan/30">
                  <card.icon className="w-5 h-5 text-krim-cyan" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                <p className="text-sm text-white/55 mb-4 flex-grow">{card.body}</p>
                <p className="text-sm text-krim-cyan">{card.accent}</p>
                {/* Bottom accent line */}
                <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-krim-cyan/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.div>
            ))}
          </StaggerGrid>
        </div>
      </StarfieldSection>

      {/* USER IMPACT */}
      <StarfieldSection glassLevel="standard" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal direction="up" className="mb-16">
            <div className="flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center">
                <span className="block text-white">Impact for</span>
                <span className="block bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent font-black">Operations Teams</span>
              </h2>
              <p className="text-lg md:text-xl text-white/60 text-center max-w-3xl">
                From hours of data gathering to minutes of insight and action
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Before Kula</h3>
              <ul className="space-y-4">
                {[
                  'Wait 3 days for analyst reports',
                  'Email chains to gather cross-system data',
                  'Weeks to test and deploy strategy changes',
                  'React to problems after portfolio impact',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-white/55">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-krim-cyan mb-6">With Kula</h3>
              <ul className="space-y-4">
                {[
                  'Get any operational insight instantly',
                  'Query across all systems in natural language',
                  'Test and deploy changes in minutes',
                  'Proactively prevent issues before impact',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-krim-cyan mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Role Examples */}
          <div className="mt-16">
            <Reveal direction="up" className="mb-12">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-4">
                How Different Roles Use{' '}
                <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">
                  Kula
                </span>
              </h3>
              <p className="text-lg md:text-xl text-center max-w-3xl mx-auto text-white/60">
                Natural language queries tailored to each executive's priorities
              </p>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  role: 'Chief Risk Officer',
                  asks: 'Show me portfolio segments with deteriorating payment patterns',
                  delivers: ['Risk concentration analysis', 'Early warning alerts', 'Recommended intervention strategies with compliance validation'],
                },
                {
                  role: 'Chief Operating Officer',
                  asks: 'Reduce operational costs while maintaining service quality',
                  delivers: ['Channel optimization analysis', 'Agent productivity insights', 'Workflow efficiency recommendations'],
                },
                {
                  role: 'Head of Operations',
                  asks: 'Optimize our approach for high-priority case segments',
                  delivers: ['Performance analysis of current strategies', 'A/B test recommendations', 'Deployment-ready campaign variations'],
                },
                {
                  role: 'Compliance Officer',
                  asks: 'Ensure all outbound activity follows state-specific calling rules',
                  delivers: ['Policy engine updates', 'Real-time violation monitoring', 'Automatic compliance validation for all interactions'],
                },
                {
                  role: 'Finance Director',
                  asks: 'Project the impact of extending alternative resolution timelines for at-risk accounts',
                  delivers: ['Historical pattern analysis', 'Segment-specific projections', 'Cash flow impact modeling with confidence intervals'],
                },
                {
                  role: 'Operations Analyst',
                  asks: 'Automate our monthly compliance reporting for the board',
                  delivers: ['Automated Karta-Report configuration', 'Exception flagging', 'Audit-ready documentation generation'],
                },
              ].map((card, i) => (
                <motion.div
                  key={card.role}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                  whileHover={{ y: -6 }}
                  className={`group ${roleCard} px-6 py-5 flex flex-col`}
                >
                  <h4 className="text-lg font-bold mb-4">
                    <span className="bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-cyan bg-clip-text text-transparent">
                      {card.role}
                    </span>
                  </h4>

                  <div className="space-y-4 flex-grow">
                    <div>
                      <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-1">Asks:</p>
                      <p className="text-sm text-white/80 italic">"{card.asks}"</p>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06]">
                      <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">Kula Delivers:</p>
                      <ul className="space-y-1.5">
                        {card.delivers.map((d) => (
                          <li key={d} className="text-sm text-white/55 flex items-start">
                            <span className="text-krim-cyan mr-2">&#8226;</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-krim-cyan/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </StarfieldSection>

      {/* TRUST & FOUNDATION */}
      <StarfieldSection glassLevel="ultraLight" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal direction="up" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Built for Regulated Operations
            </h2>
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto">
              Kula connects to Kendra runtime, not documents.<br />
              Every answer is grounded in your actual data.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: Database, title: 'Grounded Data', desc: 'Connected to live Kendra records, interactions, and outcomes. Anchored to your actual data—nothing executes without system confirmation.' },
              { icon: Shield, title: 'Role-Based Access', desc: 'See only your portfolios, regions, and queues. All actions flow through established governance.' },
              { icon: CheckCircle, title: 'Full Audit Trail', desc: 'Every question, recommendation, and action is logged. Complete traceability for regulatory compliance.' },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`group ${glassCard} ${glassCardHover} p-7 text-center`}
              >
                <div className="w-11 h-11 rounded-lg bg-krim-cyan/10 flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-krim-cyan/30">
                  <item.icon className="w-5 h-5 text-krim-cyan" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-white/55">{item.desc}</p>
                {/* Bottom accent line */}
                <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-krim-cyan/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-krim-cyan hover:bg-krim-cyan/90 text-black font-semibold rounded-xl px-8 py-3.5"
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
