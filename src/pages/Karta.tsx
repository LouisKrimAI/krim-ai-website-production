/**
 * KARTA AUTONOMOUS WORKERS - Individual Specialist Showcase
 * Redesigned with compact glassmorphic card design language
 * Accent: mint primary (#00FF88), emerald secondary
 */

import React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight, Shield, Brain, FileText, ChartBar,
  Users, Scales, Gear, Lock, CheckCircle,
  EnvelopeSimple, ChatCircle, Headset,
  Buildings, Calculator, TrendUp, Eye, Pulse, Star,
  ClipboardText, HandCoins, UserCircle,
  DeviceMobile, Lightning, Cpu
} from '@phosphor-icons/react'
import Button from '../components/Button'

// Import starfield system components
import { StarfieldLayout, StarfieldSection } from '../components/motion/StarfieldLayout'
import { Reveal, StaggerGrid } from '../components/motion/primitives'

/* ------------------------------------------------------------------ */
/*  Design tokens  (Karta = mint primary, emerald secondary)          */
/* ------------------------------------------------------------------ */
const glass = 'relative backdrop-blur-md bg-gradient-to-br from-krim-mint/[0.05] to-krim-mint/[0.02] group-hover:from-krim-mint/[0.12] group-hover:to-krim-mint/[0.06] border border-white/[0.08] rounded-2xl overflow-hidden group-hover:shadow-[0_8px_32px_rgba(0,255,136,0.15)]'
const glassHover = 'hover:border-krim-mint/50 transition-all duration-500'
const glassCyan = 'relative backdrop-blur-md bg-gradient-to-br from-krim-cyan/[0.05] to-krim-cyan/[0.02] group-hover:from-krim-cyan/[0.12] group-hover:to-krim-cyan/[0.06] border border-white/[0.08] rounded-2xl overflow-hidden hover:border-krim-cyan/50 transition-all duration-500 group-hover:shadow-[0_8px_32px_rgba(0,212,255,0.15)]'

const springHover = { type: 'spring' as const, stiffness: 400, damping: 25 }

/* ------------------------------------------------------------------ */
/*  Simple Karta Card (compact, used in specialist grids)             */
/* ------------------------------------------------------------------ */
interface SimpleKartaCardProps {
  name: string
  expertise: string
  icon: React.ElementType
  category: 'contact' | 'backoffice'
}

function SimpleKartaCard({ name, expertise, icon: Icon, category }: SimpleKartaCardProps) {
  const isContact = category === 'contact'
  const color = isContact ? 'krim-cyan' : 'krim-mint'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      className={`group ${isContact ? glassCyan : `${glass} ${glassHover}`} flex items-center gap-4 px-5 py-4`}
    >
      <div className={`w-10 h-10 rounded-lg bg-${color}/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
        <Icon className={`w-5 h-5 text-${color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-white mb-1 truncate">{name}</h3>
        <p className={`text-xs text-${color}`}>{expertise}</p>
      </div>
      {/* Bottom accent line */}
      <div className={`absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-${color}/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Compact feature card used in "How Karta Works"                    */
/* ------------------------------------------------------------------ */
interface FeatureCardProps {
  icon: React.ElementType
  title: string
  body: string
  bullets: string[]
  color: 'mint' | 'cyan' | 'purple' | 'red'
}

const colorMap = {
  mint:   { text: 'text-krim-mint', bg: 'bg-krim-mint', dot: 'bg-krim-mint', cardClass: `${glass} ${glassHover}` },
  cyan:   { text: 'text-krim-cyan', bg: 'bg-krim-cyan', dot: 'bg-krim-cyan', cardClass: glassCyan },
  purple: { text: 'text-purple-400', bg: 'bg-purple-400', dot: 'bg-purple-400', cardClass: 'relative backdrop-blur-md bg-gradient-to-br from-purple-500/[0.05] to-purple-500/[0.02] group-hover:from-purple-500/[0.12] group-hover:to-purple-500/[0.06] border border-white/[0.08] rounded-2xl overflow-hidden hover:border-purple-400/50 transition-all duration-500 group-hover:shadow-[0_8px_32px_rgba(168,85,247,0.15)]' },
  red:    { text: 'text-red-400', bg: 'bg-red-400', dot: 'bg-red-400', cardClass: 'relative backdrop-blur-md bg-gradient-to-br from-red-400/[0.05] to-red-400/[0.02] group-hover:from-red-400/[0.12] group-hover:to-red-400/[0.06] border border-white/[0.08] rounded-2xl overflow-hidden hover:border-red-400/50 transition-all duration-500 group-hover:shadow-[0_8px_32px_rgba(248,113,113,0.15)]' },
}

function FeatureCard({ icon: Icon, title, body, bullets, color }: FeatureCardProps) {
  const c = colorMap[color]
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={springHover}
      className={`group ${c.cardClass} p-7 h-full flex flex-col`}
    >
      <div className="flex items-center gap-3 mb-4">
        <Icon className={`w-5 h-5 ${c.text}`} />
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
      <p className="text-sm text-white/55 mb-4">{body}</p>
      <ul className="space-y-2">
        {bullets.map((b) => (
          <li key={b} className="flex items-center gap-2 text-sm text-white/55">
            <div className={`w-1.5 h-1.5 ${c.dot} rounded-full`} />
            {b}
          </li>
        ))}
      </ul>
      <div className={`absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${c.text}`} style={{ opacity: 0.6 }} />
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function Karta() {
  return (
    <StarfieldLayout pageType="product" contentDensity="moderate">

      {/* Hero Section */}
      <StarfieldSection glassLevel="ultraLight" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
            >
              <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">
                Karta™ Autonomous Workers
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto font-light tracking-wide mb-10"
            >
              Intelligent Multi-Modal Specialists
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Create & Deploy expert AI specialists across contact center and back office. Each masters their domain, grounded by pre-execution validation, intercepting hallucinations before action.
            </motion.p>

            <Reveal delay={0.7}>
              <div className="flex justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-cyan hover:from-krim-mint hover:to-krim-cyan text-black font-semibold rounded-xl px-8 py-3.5"
                >
                  See Agents Handle Real Cases
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </StarfieldSection>

      {/* How Karta Works */}
      <StarfieldSection glassLevel="light" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-14">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-center">
              How <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">Karta</span> Works
            </h2>
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto text-center">
              Autonomous AI specialists with multi-modal capabilities, regulatory compliance, and instant deployment
            </p>
          </Reveal>

          <StaggerGrid className="grid gap-6 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 max-w-7xl mx-auto">
            <FeatureCard icon={DeviceMobile} title="Multi-Modal Channels" body="Communicate across every customer touchpoint" color="cyan" bullets={['Voice calls & voicemails', 'Email, SMS & web chat', 'Social media & messaging', 'Document & multimedia']} />
            <FeatureCard icon={Lightning} title="Autonomous Actions" body="Execute complex tasks without human intervention" color="mint" bullets={['Process payments & plans', 'Generate personalized content', 'Verify & document compliance', 'Orchestrate workflows']} />
            <FeatureCard icon={Brain} title="Smart Decision Making" body="Advanced intelligence with built-in compliance" color="purple" bullets={['Real-time risk assessment', 'Adaptive customer strategies', 'Pre-execution validation', 'Smart escalation logic']} />
            <FeatureCard icon={Cpu} title="Instant Deployment" body="Ready-to-use specialists with seamless integration" color="red" bullets={['Universal system integration', 'Zero training required', 'Continuous optimization', 'Scale on demand']} />
          </StaggerGrid>

          {/* Key Differentiators Callout */}
          <Reveal delay={0.3} className="mt-10">
            <div className={`${glass} max-w-3xl mx-auto px-6 py-5 text-center`}>
              <h3 className="text-lg font-bold text-white mb-2">
                <span className="text-krim-mint">Enterprise-Grade</span> Autonomous Workers
              </h3>
              <p className="text-sm text-white/55">
                <strong className="text-white">Autonomous execution</strong> &middot; <strong className="text-white">Built-in compliance</strong> &middot; <strong className="text-white">Multi-modal expertise</strong>
              </p>
            </div>
          </Reveal>
        </div>
      </StarfieldSection>

      {/* Three Types of Karta */}
      <StarfieldSection glassLevel="light" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-center">
              Three Types of <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">Karta</span>
            </h2>
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto text-center">
              Purpose-built Autonomous Workers for regulated operations
            </p>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-3 max-w-6xl mx-auto">
            {[
              { icon: Gear, title: 'Back Office', color: 'mint' as const, desc: 'Back office Autonomous Workers handling workflows and business processes', items: ['Risk Assessment & Analytics', 'Payment & Financial Operations', 'Document & Workflow Management', 'Compliance & Quality Assurance'] },
              { icon: Headset, title: 'Contact Center', color: 'cyan' as const, desc: 'Customer-facing Autonomous Workers handling conversations across all channels', items: ['Customer Service & Support', 'Sales & Revenue Expansion', 'Case Management & Resolution', 'Dispute & Complaint Resolution'] },
              { icon: Brain, title: 'Studio', color: 'purple' as const, desc: 'AI builder for custom Autonomous Workers and workflows', items: ['Agent & Workflow Creation', 'Content Generation Studio', 'Deployment & Scale', 'Continuous Optimization'] },
            ].map((card) => {
              const c = colorMap[card.color]
              return (
                <motion.div
                  key={card.title}
                  whileHover={{ y: -6 }}
                  transition={springHover}
                  className={`group ${c.cardClass} p-7 h-full`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <card.icon className={`w-6 h-6 ${c.text}`} />
                    <h3 className="text-xl font-bold text-white">{card.title}</h3>
                  </div>
                  <p className="text-sm text-white/55 mb-5">{card.desc}</p>
                  <ul className="space-y-2.5">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <div className={`w-2 h-2 ${c.dot} rounded-full`} />
                        <span className="text-sm text-white/55">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={`absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${c.text}`} style={{ opacity: 0.6 }} />
                </motion.div>
              )
            })}
          </div>
        </div>
      </StarfieldSection>

      {/* Back Office Karta Section */}
      <StarfieldSection glassLevel="standard" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-center">
              <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">Back Office</span> Karta
            </h2>
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto text-center">
              Operations Autonomous Workers managing workflows and business processes
            </p>
          </Reveal>

          {/* Risk & Analytics */}
          <div className="mb-14">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Risk Assessment & Analytics</h3>
            <StaggerGrid staggerDelay={80} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <SimpleKartaCard name="Risk Assessment Karta" expertise="Portfolio Analysis" icon={ChartBar} category="backoffice" />
              <SimpleKartaCard name="Fraud Prevention Karta" expertise="Security & Detection" icon={Lock} category="backoffice" />
              <SimpleKartaCard name="Predictive Analytics Karta" expertise="Behavioral Forecasting" icon={Brain} category="backoffice" />
            </StaggerGrid>
          </div>

          {/* Financial Operations */}
          <div className="mb-14">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Payment & Financial Operations</h3>
            <StaggerGrid staggerDelay={80} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <SimpleKartaCard name="Transaction Processing Karta" expertise="Transaction Management" icon={Buildings} category="backoffice" />
              <SimpleKartaCard name="Settlement Karta" expertise="Resolution Operations" icon={Calculator} category="backoffice" />
              <SimpleKartaCard name="Revenue Recognition Karta" expertise="Financial Reporting" icon={TrendUp} category="backoffice" />
            </StaggerGrid>
          </div>

          {/* Document & Workflow */}
          <div className="mb-14">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Document & Workflow Management</h3>
            <StaggerGrid staggerDelay={80} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <SimpleKartaCard name="Document Generation Karta" expertise="Automated Documentation" icon={ClipboardText} category="backoffice" />
              <SimpleKartaCard name="Workflow Orchestration Karta" expertise="Process Management" icon={Gear} category="backoffice" />
              <SimpleKartaCard name="Data Integration Karta" expertise="System Coordination" icon={Pulse} category="backoffice" />
            </StaggerGrid>
          </div>

          {/* Compliance & Quality */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Compliance & Quality Assurance</h3>
            <StaggerGrid staggerDelay={80} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <SimpleKartaCard name="Compliance Monitor Karta" expertise="Regulatory Oversight" icon={Shield} category="backoffice" />
              <SimpleKartaCard name="Audit Trail Karta" expertise="Documentation & Records" icon={FileText} category="backoffice" />
              <SimpleKartaCard name="Quality Assurance Karta" expertise="Performance Monitoring" icon={Eye} category="backoffice" />
            </StaggerGrid>
          </div>
        </div>
      </StarfieldSection>

      {/* Contact Center Karta Section */}
      <StarfieldSection glassLevel="light" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-center">
              <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">Contact Center</span> Karta
            </h2>
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto text-center">
              Customer-facing Autonomous Workers organized by expertise and responsibility
            </p>
          </Reveal>

          {/* Customer Service & Support */}
          <div className="mb-14">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Customer Service & Support</h3>
            <StaggerGrid staggerDelay={80} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <SimpleKartaCard name="Service Karta" expertise="General Support" icon={ChatCircle} category="contact" />
              <SimpleKartaCard name="Dispute Karta" expertise="Complaints & Disputes" icon={Scales} category="contact" />
              <SimpleKartaCard name="VIP Service Karta" expertise="High-Value Customers" icon={Star} category="contact" />
            </StaggerGrid>
          </div>

          {/* Sales & Revenue */}
          <div className="mb-14">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Sales & Revenue Expansion</h3>
            <StaggerGrid staggerDelay={80} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <SimpleKartaCard name="Cross-sell Karta" expertise="Revenue Growth" icon={TrendUp} category="contact" />
              <SimpleKartaCard name="Retention Karta" expertise="Customer Loyalty" icon={Brain} category="contact" />
              <SimpleKartaCard name="Activation Karta" expertise="Account Onboarding" icon={Pulse} category="contact" />
            </StaggerGrid>
          </div>

          {/* Case Management & Resolution */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Case Management & Resolution</h3>
            <StaggerGrid staggerDelay={80} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <SimpleKartaCard name="Early Stage Karta" expertise="0-30 Days Past Due" icon={UserCircle} category="contact" />
              <SimpleKartaCard name="Mid Stage Karta" expertise="31-90 Days Past Due" icon={Headset} category="contact" />
              <SimpleKartaCard name="Late Stage Karta" expertise="90+ Days Past Due" icon={Shield} category="contact" />
              <SimpleKartaCard name="Settlement Karta" expertise="Final Resolution" icon={HandCoins} category="contact" />
              <SimpleKartaCard name="Hardship Karta" expertise="Financial Difficulty" icon={Users} category="contact" />
              <SimpleKartaCard name="Recovery Karta" expertise="Post-Payment Relationship" icon={CheckCircle} category="contact" />
            </StaggerGrid>
          </div>
        </div>
      </StarfieldSection>

      {/* AI Studio Section */}
      <StarfieldSection glassLevel="standard" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-center">
              <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">AI Studio</span>
            </h2>
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto text-center">
              Build, create, and deploy custom Autonomous Workers
            </p>
          </Reveal>

          {/* Agent & Workflow Creation */}
          <div className="mb-14">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Agent & Workflow Creation</h3>
            <StaggerGrid staggerDelay={80} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: Brain, title: 'Agent Builder', desc: 'Design custom Autonomous Workers with expertise and compliance guardrails', bullets: ['Configure conversation patterns', 'Set domain expertise'] },
                { icon: Gear, title: 'Workflow Designer', desc: 'Create automation workflows', bullets: ['Visual workflow builder', 'Multi-channel orchestration', 'Decision logic trees'] },
                { icon: CheckCircle, title: 'Integration Studio', desc: 'Connect to existing systems and data sources', bullets: ['API connectors', 'System orchestration'] },
              ].map((card) => (
                <motion.div
                  key={card.title}
                  whileHover={{ y: -6 }}
                  transition={springHover}
                  className={`group ${glass} ${glassHover} p-7 h-full`}
                >
                  <div className="w-10 h-10 rounded-lg bg-krim-mint/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-krim-mint/30">
                    <card.icon className="w-5 h-5 text-krim-mint" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{card.title}</h4>
                  <p className="text-sm text-white/55 mb-4">{card.desc}</p>
                  <ul className="space-y-2 text-sm text-white/55">
                    {card.bullets.map((b) => <li key={b}>&#8226; {b}</li>)}
                  </ul>
                  <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-krim-mint/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </motion.div>
              ))}
            </StaggerGrid>
          </div>

          {/* Content Generation Studio */}
          <div className="mb-14">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Content Generation Studio</h3>
            <StaggerGrid staggerDelay={80} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: FileText, title: 'Document Creation', desc: 'Generate legal notices, compliance docs, and campaign materials' },
                { icon: Eye, title: 'Image Generation', desc: 'Create visual assets for campaigns and presentations' },
                { icon: ChatCircle, title: 'Video Production', desc: 'Generate video content for training and marketing' },
                { icon: EnvelopeSimple, title: 'Multimedia Delivery', desc: 'Orchestrate delivery of documents, images, and videos' },
              ].map((card) => (
                <motion.div
                  key={card.title}
                  whileHover={{ y: -6 }}
                  transition={springHover}
                  className={`group ${glassCyan} p-7 h-full`}
                >
                  <div className="w-10 h-10 rounded-lg bg-krim-cyan/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-krim-cyan/30">
                    <card.icon className="w-5 h-5 text-krim-cyan" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3">{card.title}</h4>
                  <p className="text-sm text-white/55">{card.desc}</p>
                  <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-krim-cyan/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </motion.div>
              ))}
            </StaggerGrid>
          </div>

          {/* Deployment & Scale */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Deployment & Scale</h3>
            <StaggerGrid staggerDelay={80} className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {[
                { icon: Pulse, title: 'Live Deployment', desc: 'Deploy agents with intelligent routing', bullets: ['Multi-channel deployment', 'Campaign timing optimization', 'Real-time monitoring'] },
                { icon: TrendUp, title: 'Continuous Optimization', desc: 'Monitor and optimize agent effectiveness', bullets: ['A/B testing frameworks', 'Continuous learning', 'ROI optimization'] },
              ].map((card) => (
                <motion.div
                  key={card.title}
                  whileHover={{ y: -6 }}
                  transition={springHover}
                  className={`group ${glass} ${glassHover} p-7 h-full`}
                >
                  <div className="w-10 h-10 rounded-lg bg-krim-mint/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-krim-mint/30">
                    <card.icon className="w-5 h-5 text-krim-mint" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{card.title}</h4>
                  <p className="text-sm text-white/55 mb-4">{card.desc}</p>
                  <ul className="space-y-2 text-sm text-white/55">
                    {card.bullets.map((b) => <li key={b}>&#8226; {b}</li>)}
                  </ul>
                  <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-krim-mint/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </motion.div>
              ))}
            </StaggerGrid>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <div className={`${glass} inline-flex items-center gap-3 px-8 py-3.5 rounded-xl`}>
              <Pulse className="h-5 w-5 text-krim-mint" />
              <p className="text-lg font-bold">
                <span className="text-krim-mint">Powered by Kendra.</span>{' '}
                <span className="text-white">Every creation governed.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </StarfieldSection>

      {/* Compliance Foundations */}
      <StarfieldSection glassLevel="standard" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-center">
              Built on <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">Compliance Foundations</span>
            </h2>
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto text-center">
              Every specialist operates within policy constraints, not prompts
            </p>
          </Reveal>

          <StaggerGrid staggerDelay={100} className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Shield, title: 'Policy Constraints', desc: 'Your playbooks, not prompts', color: 'mint' },
              { icon: Brain, title: 'Validated Outputs', desc: 'Actions verified against approved data', color: 'cyan' },
              { icon: Lock, title: 'Data Boundaries', desc: 'Scoped access control', color: 'mint' },
              { icon: CheckCircle, title: 'Audit Trails', desc: 'Full traceability', color: 'cyan' },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -6 }}
                transition={springHover}
                className={`group ${item.color === 'mint' ? `${glass} ${glassHover}` : glassCyan} p-7 flex flex-col items-center text-center`}
              >
                <div className={`w-11 h-11 rounded-lg bg-${item.color === 'mint' ? 'krim-mint' : 'krim-cyan'}/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-${item.color === 'mint' ? 'krim-mint' : 'krim-cyan'}/30`}>
                  <item.icon className={`w-5 h-5 text-${item.color === 'mint' ? 'krim-mint' : 'krim-cyan'}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/55">{item.desc}</p>
                <div className={`absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-${item.color === 'mint' ? 'krim-mint' : 'krim-cyan'}/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
              </motion.div>
            ))}
          </StaggerGrid>
        </div>
      </StarfieldSection>

      {/* Proven Impact */}
      <StarfieldSection glassLevel="light" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-center">
              <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">Proven Impact</span> Across Operations
            </h2>
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto text-center">
              Specialists drive measurable improvements across every metric that matters
            </p>
          </Reveal>

          <StaggerGrid staggerDelay={120} className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: TrendUp, title: 'Portfolio Performance', desc: 'Higher recovery rates with improved customer relationships', color: 'mint' },
              { icon: Pulse, title: 'Operational Efficiency', desc: 'Faster processing with consistent quality across all interactions', color: 'cyan' },
              { icon: Shield, title: 'Compliance Confidence', desc: 'Perfect regulatory adherence with complete audit documentation', color: 'mint' },
              { icon: Star, title: 'Customer Experience', desc: 'Better outcomes through empathetic, expert interactions', color: 'cyan' },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -6 }}
                transition={springHover}
                className={`group ${item.color === 'mint' ? `${glass} ${glassHover}` : glassCyan} p-7 text-center`}
              >
                <div className={`w-11 h-11 rounded-lg bg-${item.color === 'mint' ? 'krim-mint' : 'krim-cyan'}/10 flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-${item.color === 'mint' ? 'krim-mint' : 'krim-cyan'}/30`}>
                  <item.icon className={`w-5 h-5 text-${item.color === 'mint' ? 'krim-mint' : 'krim-cyan'}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/55">{item.desc}</p>
                <div className={`absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-${item.color === 'mint' ? 'krim-mint' : 'krim-cyan'}/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
              </motion.div>
            ))}
          </StaggerGrid>
        </div>
      </StarfieldSection>

      {/* CTA */}
      <StarfieldSection glassLevel="standard" className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center">
              <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">Deploy Your AI Specialists</span>
            </h2>
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-8 text-center">
              See how your specialists handle real customer interactions and workflows
            </p>
            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-cyan hover:from-krim-mint hover:to-krim-cyan text-black font-semibold rounded-xl px-8 py-3.5"
              >
                See Agents Handle Real Cases
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </div>
      </StarfieldSection>
    </StarfieldLayout>
  )
}
