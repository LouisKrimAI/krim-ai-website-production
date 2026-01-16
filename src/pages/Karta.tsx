/**
 * KARTA AI COWORKERS - Individual Specialist Showcase
 * Redesigned to highlight expertise-based AI specialists
 * Clean, focused structure showcasing individual AI coworkers
 */

import React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight, Shield, Brain, FileText, ChartBar, 
  Users, Scales, Gear, Lock, CheckCircle, 
  Phone, EnvelopeSimple, ChatCircle, Headset,
  Bank, Calculator, TrendUp, Eye, Pulse, Star,
  Gavel, ClipboardText, HandCoins, UserCircle,
  DeviceMobile, Globe, Lightning, Cpu
} from '@phosphor-icons/react'
import Button from '../components/Button'

// Import starfield system components
import { StarfieldLayout, StarfieldSection } from '../components/motion/StarfieldLayout'
import { 
  Reveal, 
  StaggerGrid, 
  HoverLiftCard, 
  GlassContainer 
} from '../components/motion/primitives'

// Individual Specialist Card Interface
interface SpecialistCardProps {
  name: string
  expertise: string
  description: string
  competencies: string[]
  icon: React.ElementType
  category: 'contact' | 'backoffice'
}

// Simple Karta Card Interface
interface SimpleKartaCardProps {
  name: string
  expertise: string
  icon: React.ElementType
  category: 'contact' | 'backoffice'
}

// Specialist Card Component
function SpecialistCard({ name, expertise, description, competencies, icon: Icon, category }: SpecialistCardProps) {
  const isContact = category === 'contact'
  const accentColor = isContact ? 'rgb(0, 212, 255)' : 'rgb(0, 255, 136)'
  const glowColor = `${accentColor.replace('rgb', 'rgba').replace(')', ', 0.25)')}`
  
  return (
    <HoverLiftCard
      liftDistance={8}
      glowColor={glowColor}
      className="group h-full"
    >
      <GlassContainer
        glassLevel="standard"
        className="flex flex-col h-full p-6 relative overflow-hidden"
      >
        {/* Top accent bar */}
        <div 
          className="absolute inset-x-0 top-0 h-0.5"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor} 50%, transparent)`,
            boxShadow: `0 0 15px ${glowColor}`,
          }}
        />
        
        {/* Icon */}
        <div 
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
          style={{
            background: `${accentColor}15`,
            border: `1px solid ${accentColor}40`
          }}
        >
          <Icon className="w-7 h-7" style={{ color: accentColor }} />
        </div>
        
        {/* Name and Expertise */}
        <h3 className="text-lg font-bold text-white mb-1">
          {name}
        </h3>
        <p className="text-sm mb-3" style={{ color: accentColor }}>
          {expertise}
        </p>
        
        {/* Description */}
        <p className="text-xs text-gray-300 mb-4 flex-grow">
          {description}
        </p>
        
        {/* Competencies */}
        <div className="space-y-2">
          {competencies.slice(0, 3).map((competency, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: accentColor }} />
              <span className="text-xs text-gray-300">{competency}</span>
            </div>
          ))}
        </div>
        
        {/* Background glow */}
        <div 
          className="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ backgroundColor: accentColor }}
        />
      </GlassContainer>
    </HoverLiftCard>
  )
}

// Simple Karta Card Component
function SimpleKartaCard({ name, expertise, icon: Icon, category }: SimpleKartaCardProps) {
  const isContact = category === 'contact'
  const accentColor = isContact ? 'rgb(0, 212, 255)' : 'rgb(0, 255, 136)'
  const glowColor = `${accentColor.replace('rgb', 'rgba').replace(')', ', 0.15)')}`
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <HoverLiftCard
        liftDistance={6}
        glowColor={glowColor}
        className="group h-full"
      >
        <GlassContainer
          glassLevel="light"
          className="flex items-center gap-4 h-full p-4 relative overflow-hidden"
        >
          {/* Top accent bar */}
          <div 
            className="absolute inset-x-0 top-0 h-0.5"
            style={{
              background: `linear-gradient(90deg, transparent, ${accentColor} 50%, transparent)`,
              boxShadow: `0 0 10px ${glowColor}`,
            }}
          />
          
          {/* Icon */}
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background: `${accentColor}15`,
              border: `1px solid ${accentColor}30`
            }}
          >
            <Icon className="w-5 h-5" style={{ color: accentColor }} />
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white mb-1 truncate">
              {name}
            </h3>
            <p className="text-xs" style={{ color: accentColor }}>
              {expertise}
            </p>
          </div>
          
          {/* Background glow */}
          <div 
            className="absolute -top-5 -right-5 w-16 h-16 rounded-full opacity-5 blur-2xl pointer-events-none"
            style={{ backgroundColor: accentColor }}
          />
        </GlassContainer>
      </HoverLiftCard>
    </motion.div>
  )
}

// Contact Center Specialists Data
const contactCenterSpecialists = [
  // Customer Lifecycle (4)
  {
    name: 'Onboarding Agent',
    expertise: 'Account Setup & Guidance',
    description: 'Guides new customers through account activation, setup, and initial product education with personalized onboarding flows.',
    competencies: ['Account activation', 'Product education', 'Setup guidance'],
    icon: UserCircle,
    category: 'contact' as const
  },
  {
    name: 'KYC/Re-KYC Agent',
    expertise: 'Identity Verification & Compliance',
    description: 'Conducts identity verification calls, collects compliance documentation, and manages periodic re-verification requirements.',
    competencies: ['Identity verification', 'Compliance documentation', 'Re-verification workflows'],
    icon: Shield,
    category: 'contact' as const
  },
  {
    name: 'Financial Education Agent',
    expertise: 'Financial Literacy & Empowerment',
    description: 'Provides financial literacy education, budgeting guidance, and empowerment programs to improve customer financial health.',
    competencies: ['Financial education', 'Budgeting guidance', 'Financial empowerment'],
    icon: Brain,
    category: 'contact' as const
  },
  {
    name: 'Healer Agent',
    expertise: 'Relationship Recovery',
    description: 'Rebuilds relationships post-payment, provides financial wellness counseling, and transforms collections into customer advocacy.',
    competencies: ['Relationship rebuilding', 'Financial wellness', 'Customer advocacy'],
    icon: Star,
    category: 'contact' as const
  },

  // Collections Lifecycle (4)
  {
    name: 'Nudger Agent',
    expertise: 'Pre-Due & Due Date',
    description: 'Gentle behavioral timing specialist providing soft reminders and early intervention before accounts become delinquent.',
    competencies: ['Behavioral timing', 'Early intervention', 'Payment reminders'],
    icon: Pulse,
    category: 'contact' as const
  },
  {
    name: 'Collections (1-30)',
    expertise: 'Early Delinquency Specialist',
    description: 'Early-stage collections expert handling 1-30 day past due accounts with empathy-driven payment arrangements.',
    competencies: ['Early delinquency', 'Payment arrangements', 'Relationship preservation'],
    icon: Headset,
    category: 'contact' as const
  },
  {
    name: 'Cure Agent',
    expertise: '31-90 Days Recovery',
    description: 'Mid-stage recovery specialist balancing firmness with empathy to create sustainable payment solutions and cure accounts.',
    competencies: ['Payment plan negotiation', 'Account recovery', 'Win-win solutions'],
    icon: CheckCircle,
    category: 'contact' as const
  },
  {
    name: 'Late Stage Settlement',
    expertise: '91+ Days Resolution',
    description: 'Authoritative specialist handling complex late-stage cases with commanding presence and settlement authority.',
    competencies: ['Settlement authority', 'Complex resolution', 'Final negotiations'],
    icon: Gavel,
    category: 'contact' as const
  },

  // Specialized Services (4)
  {
    name: 'Hardship Agent',
    expertise: 'Financial Assistance',
    description: 'Empathetic specialist providing financial assistance programs and support for customers experiencing genuine hardship.',
    competencies: ['Financial counseling', 'Hardship programs', 'Empathy-driven support'],
    icon: Users,
    category: 'contact' as const
  },
  {
    name: 'Cross-Sell Agent',
    expertise: 'New Products',
    description: 'Revenue expansion specialist identifying opportunities for new product offerings like credit cards, loans, and insurance.',
    competencies: ['Product opportunities', 'Revenue expansion', 'Cross-selling'],
    icon: TrendUp,
    category: 'contact' as const
  },
  {
    name: 'Up-Sell Agent',
    expertise: 'Product Upgrades',
    description: 'Enhancement specialist focused on upgrading existing products to higher value tiers and premium service levels.',
    competencies: ['Product upgrades', 'Premium services', 'Value enhancement'],
    icon: Star,
    category: 'contact' as const
  },
  {
    name: 'Fraud & Dispute Agent',
    expertise: 'Case Handling',
    description: 'Specialized investigator handling fraud cases, dispute resolution, and complex complaint management with regulatory compliance.',
    competencies: ['Fraud investigation', 'Dispute resolution', 'Regulatory compliance'],
    icon: Scales,
    category: 'contact' as const
  }
]

// Back Office Specialists Data
const backOfficeSpecialists = [
  // Campaign & Strategy (3)
  {
    name: 'Campaign Manager',
    expertise: 'Orchestration',
    description: 'Orchestrates multi-channel campaign strategies, coordinates timing, and manages complex collections campaigns across all touchpoints.',
    competencies: ['Campaign orchestration', 'Multi-channel strategy', 'Timing optimization'],
    icon: Gear,
    category: 'backoffice' as const
  },
  {
    name: 'Forecaster Agent',
    expertise: 'Predictive Intelligence',
    description: 'Predictive intelligence engine analyzing campaign outcomes, spotting trends, and optimizing ROI strategies with data-driven insights.',
    competencies: ['Predictive modeling', 'Trend analysis', 'ROI optimization'],
    icon: ChartBar,
    category: 'backoffice' as const
  },
  {
    name: 'Orchestrator Agent',
    expertise: 'Master Data Conductor',
    description: 'Master conductor connecting customer journey dots, predicting risk before delinquency, and coordinating data flows across the ecosystem.',
    competencies: ['Data flow coordination', 'Journey mapping', 'Risk prediction'],
    icon: Brain,
    category: 'backoffice' as const
  },

  // Compliance & Risk (3)
  {
    name: 'Compliance Monitoring',
    expertise: 'Regulatory Oversight',
    description: 'Real-time compliance guardian monitoring FDCPA, TCPA, and regulatory requirements with perfect audit trails and violation prevention.',
    competencies: ['Real-time monitoring', 'Violation prevention', 'Regulatory compliance'],
    icon: Shield,
    category: 'backoffice' as const
  },
  {
    name: 'Evidence Trail Agent',
    expertise: 'Documentation Tracking',
    description: 'Maintains comprehensive audit trails and documentation tracking for regulatory compliance and internal governance requirements.',
    competencies: ['Audit trail maintenance', 'Documentation tracking', 'Compliance records'],
    icon: FileText,
    category: 'backoffice' as const
  },
  {
    name: 'Recorder Agent',
    expertise: 'Regulatory Reporting',
    description: 'Automated regulatory reporting specialist preparing compliance documents and eliminating manual MIS workload with systematic efficiency.',
    competencies: ['Regulatory reporting', 'Compliance documentation', 'Automated workflows'],
    icon: ClipboardText,
    category: 'backoffice' as const
  },

  // Data & Intelligence (4)
  {
    name: 'Business Intelligence (BIA)',
    expertise: 'Analytics',
    description: 'Advanced analytics engine generating performance insights, business intelligence, and strategic recommendations from collections data.',
    competencies: ['Advanced analytics', 'Performance insights', 'Strategic recommendations'],
    icon: ChartBar,
    category: 'backoffice' as const
  },
  {
    name: 'Report Generator',
    expertise: 'Stakeholder Reports',
    description: 'Creates stakeholder reports and executive dashboards with customized metrics, KPIs, and business intelligence delivery.',
    competencies: ['Executive dashboards', 'Custom reporting', 'KPI tracking'],
    icon: TrendUp,
    category: 'backoffice' as const
  },
  {
    name: 'Payment Reconciliation',
    expertise: 'Processing',
    description: 'Handles payment processing, matching, financial reconciliation, and transaction management with automated workflows.',
    competencies: ['Payment processing', 'Financial reconciliation', 'Transaction management'],
    icon: Bank,
    category: 'backoffice' as const
  },
  {
    name: 'Interpreter Agent',
    expertise: 'Emotional Intelligence',
    description: 'Emotional intelligence specialist detecting sentiment, modulating tone for empathy, and embedding human nuance into AI interactions.',
    competencies: ['Sentiment detection', 'Empathy modulation', 'Emotional intelligence'],
    icon: Users,
    category: 'backoffice' as const
  },

  // Platform Management (3)
  {
    name: 'Karta Admin',
    expertise: 'System Management',
    description: 'System management specialist handling configuration, operational oversight, and platform administration with confident automation.',
    competencies: ['System configuration', 'Operational oversight', 'Platform administration'],
    icon: Gear,
    category: 'backoffice' as const
  },
  {
    name: 'Karta Learn',
    expertise: 'Knowledge Management',
    description: 'Knowledge management specialist optimizing continuous learning, training patterns, and intelligence enhancement across the platform.',
    competencies: ['Knowledge management', 'Continuous learning', 'Training optimization'],
    icon: Brain,
    category: 'backoffice' as const
  },
  {
    name: 'Karta Payload',
    expertise: 'Multimedia Content Delivery',
    description: 'Multimedia content delivery specialist managing documents, images, videos, and rich media assets for campaigns and customer communications.',
    competencies: ['Document delivery', 'Multimedia management', 'Content distribution'],
    icon: EnvelopeSimple,
    category: 'backoffice' as const
  }
]

// Main Karta Page Component
export default function Karta() {
  return (
    <StarfieldLayout 
      pageType="product" 
      contentDensity="moderate"
    >
      
      {/* Hero Section - Standardized like Kendra */}
      <StarfieldSection 
        glassLevel="ultraLight" 
        className="relative py-24 lg:py-32"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div>
            
            {/* Karta Title - Enterprise-grade Typography */}
            <div className="w-full flex justify-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 text-center"
              >
                <span className="bg-gradient-to-r from-krim-cyan to-krim-mint bg-clip-text text-transparent">
                  Karta™ Coworkers for Bank Operations
                </span>
              </motion.h2>
            </div>

            {/* Sub-heading - What it IS */}
            <div className="w-full flex justify-center">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-2xl md:text-3xl text-white/60 max-w-3xl font-light tracking-wide mb-10 text-center"
              >
                Intelligent Multi-Modal Specialists
              </motion.p>
            </div>

            {/* Description - What it DOES */}
            <div className="w-full flex justify-center">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-lg md:text-xl text-white/70 max-w-4xl mb-12 leading-relaxed text-center"
              >
                Create & Deploy expert AI specialists across contact center and back office. Each masters their domain, grounded by pre-execution validation, intercepting hallucinations before action.
              </motion.p>
            </div>
              
            {/* CTAs */}
            <Reveal delay={0.7}>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <HoverLiftCard liftDistance={4}>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-cyan hover:from-krim-mint hover:to-krim-cyan text-black font-semibold px-8 py-4"
                  >
                    See Agents Handle Real Cases
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </HoverLiftCard>
              </div>
            </Reveal>
          </div>
        </div>
      </StarfieldSection>

      {/* How Karta Co-workers Operate Section */}
      <StarfieldSection glassLevel="light" className="py-20 lg:py-24 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-16">
            <div className="w-full flex justify-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                How <span className="bg-gradient-to-r from-krim-cyan to-krim-mint bg-clip-text text-transparent">Karta</span> Co-workers Operate
              </h2>
            </div>
            <div className="w-full flex justify-center">
              <p className="text-lg sm:text-xl text-gray-200 max-w-4xl text-center">
                Autonomous AI specialists with multi-modal capabilities, regulatory compliance, and instant deployment
              </p>
            </div>
          </Reveal>

          <StaggerGrid className="grid gap-8 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 max-w-7xl mx-auto">
            {/* Multi-Modal Communication */}
            <HoverLiftCard liftDistance={6} glowColor="rgba(0, 212, 255, 0.15)">
              <GlassContainer glassLevel="standard" className="p-6 h-full relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-0.5" 
                  style={{ 
                    background: 'linear-gradient(90deg, transparent, rgb(0, 212, 255) 50%, transparent)',
                    boxShadow: '0 0 15px rgba(0, 212, 255, 0.3)' 
                  }}/>
                
                <div className="flex items-center gap-3 mb-4">
                  <DeviceMobile className="w-6 h-6 text-krim-cyan" />
                  <h3 className="text-lg font-bold text-white">Multi-Modal Channels</h3>
                </div>
                
                <p className="text-sm text-gray-100 mb-4 leading-relaxed">
                  Communicate across every customer touchpoint
                </p>
                
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-xs text-gray-200">
                    <div className="w-1.5 h-1.5 bg-krim-cyan rounded-full" />
                    Voice calls & voicemails
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-200">
                    <div className="w-1.5 h-1.5 bg-krim-cyan rounded-full" />
                    Email, SMS & web chat
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-200">
                    <div className="w-1.5 h-1.5 bg-krim-cyan rounded-full" />
                    Social media & messaging
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-200">
                    <div className="w-1.5 h-1.5 bg-krim-cyan rounded-full" />
                    Document & multimedia
                  </li>
                </ul>
                
                <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-krim-cyan/10 blur-2xl" />
              </GlassContainer>
            </HoverLiftCard>

            {/* Autonomous Actions */}
            <HoverLiftCard liftDistance={6} glowColor="rgba(0, 255, 136, 0.15)">
              <GlassContainer glassLevel="standard" className="p-6 h-full relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-0.5" 
                  style={{ 
                    background: 'linear-gradient(90deg, transparent, rgb(0, 255, 136) 50%, transparent)',
                    boxShadow: '0 0 15px rgba(0, 255, 136, 0.3)' 
                  }}/>
                
                <div className="flex items-center gap-3 mb-4">
                  <Lightning className="w-6 h-6 text-krim-mint" />
                  <h3 className="text-lg font-bold text-white">Autonomous Actions</h3>
                </div>
                
                <p className="text-sm text-gray-100 mb-4 leading-relaxed">
                  Execute complex tasks without human intervention
                </p>
                
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-xs text-gray-200">
                    <div className="w-1.5 h-1.5 bg-krim-mint rounded-full" />
                    Process payments & plans
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-200">
                    <div className="w-1.5 h-1.5 bg-krim-mint rounded-full" />
                    Generate personalized content
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-200">
                    <div className="w-1.5 h-1.5 bg-krim-mint rounded-full" />
                    Verify & document compliance
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-200">
                    <div className="w-1.5 h-1.5 bg-krim-mint rounded-full" />
                    Orchestrate workflows
                  </li>
                </ul>
                
                <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-krim-mint/10 blur-2xl" />
              </GlassContainer>
            </HoverLiftCard>

            {/* Intelligence & Decision Making */}
            <HoverLiftCard liftDistance={6} glowColor="rgba(138, 43, 226, 0.15)">
              <GlassContainer glassLevel="standard" className="p-6 h-full relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-0.5" 
                  style={{ 
                    background: 'linear-gradient(90deg, transparent, rgb(138, 43, 226) 50%, transparent)',
                    boxShadow: '0 0 15px rgba(138, 43, 226, 0.3)' 
                  }}/>
                
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-6 h-6" style={{ color: 'rgb(138, 43, 226)' }} />
                  <h3 className="text-lg font-bold text-white">Smart Decision Making</h3>
                </div>
                
                <p className="text-sm text-gray-100 mb-4 leading-relaxed">
                  Advanced intelligence with built-in compliance
                </p>
                
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-xs text-gray-200">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'rgb(138, 43, 226)' }} />
                    Real-time risk assessment
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-200">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'rgb(138, 43, 226)' }} />
                    Adaptive customer strategies
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-200">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'rgb(138, 43, 226)' }} />
                    Pre-execution validation
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-200">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'rgb(138, 43, 226)' }} />
                    Smart escalation logic
                  </li>
                </ul>
                
                <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full opacity-10 blur-2xl" style={{ backgroundColor: 'rgb(138, 43, 226)' }} />
              </GlassContainer>
            </HoverLiftCard>

            {/* Integration & Deployment */}
            <HoverLiftCard liftDistance={6} glowColor="rgba(255, 107, 107, 0.15)">
              <GlassContainer glassLevel="standard" className="p-6 h-full relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-0.5" 
                  style={{ 
                    background: 'linear-gradient(90deg, transparent, rgb(255, 107, 107) 50%, transparent)',
                    boxShadow: '0 0 15px rgba(255, 107, 107, 0.3)' 
                  }}/>
                
                <div className="flex items-center gap-3 mb-4">
                  <Cpu className="w-6 h-6" style={{ color: 'rgb(255, 107, 107)' }} />
                  <h3 className="text-lg font-bold text-white">Instant<br />Deployment</h3>
                </div>
                
                <p className="text-sm text-gray-100 mb-4 leading-relaxed">
                  Ready-to-use specialists with seamless integration
                </p>
                
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-xs text-gray-200">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'rgb(255, 107, 107)' }} />
                    Universal system integration
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-200">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'rgb(255, 107, 107)' }} />
                    Zero training required
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-200">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'rgb(255, 107, 107)' }} />
                    Continuous optimization
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-200">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'rgb(255, 107, 107)' }} />
                    Scale on demand
                  </li>
                </ul>
                
                <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full opacity-10 blur-2xl" style={{ backgroundColor: 'rgb(255, 107, 107)' }} />
              </GlassContainer>
            </HoverLiftCard>
          </StaggerGrid>

          {/* Key Differentiators Callout */}
          <Reveal delay={0.3} className="mt-12">
            <div className="w-full flex justify-center">
              <GlassContainer glassLevel="ultraLight" className="max-w-3xl mx-auto p-6 text-center">
                <h3 className="text-lg font-bold text-white mb-3">
                  <span className="text-krim-mint">Enterprise-Grade</span> AI Co-workers
                </h3>
                <p className="text-sm text-gray-300">
                  <strong className="text-white">Autonomous execution</strong> • <strong className="text-white">Built-in compliance</strong> • <strong className="text-white">Multi-modal expertise</strong>
                </p>
              </GlassContainer>
            </div>
          </Reveal>
        </div>
      </StarfieldSection>

      {/* Three Types of Karta Overview Section */}
      <StarfieldSection glassLevel="light" className="py-20 lg:py-24 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12">
            <div className="w-full flex justify-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Three Types of <span className="bg-gradient-to-r from-krim-cyan to-krim-mint bg-clip-text text-transparent">Karta</span>
              </h2>
            </div>
            <div className="w-full flex justify-center">
              <p className="text-lg sm:text-xl text-gray-200 max-w-3xl text-center">
                Purpose-built SSI Coworkers for every aspect of bank operations
              </p>
            </div>
          </Reveal>
          
          <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
            {/* Back Office Karta Card */}
            <HoverLiftCard liftDistance={8} glowColor="rgba(0, 255, 136, 0.2)">
              <GlassContainer glassLevel="standard" className="p-6 h-full relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1" 
                  style={{ 
                    background: 'linear-gradient(90deg, transparent, rgb(0, 255, 136) 50%, transparent)',
                    boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)' 
                  }}/>
                
                <div className="flex items-center gap-3 mb-4">
                  <Gear className="w-7 h-7 text-krim-mint" />
                  <h3 className="text-xl font-bold text-white">Back Office</h3>
                </div>
                
                <p className="text-base text-gray-100 mb-5 leading-relaxed font-medium">
                  Operations AI that handles workflows and business processes
                </p>
                
                <ul className="space-y-2.5">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-krim-mint rounded-full" />
                    <span className="text-gray-200 text-sm">Risk Assessment & Analytics</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-krim-mint rounded-full" />
                    <span className="text-gray-200 text-sm">Payment & Financial Operations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-krim-mint rounded-full" />
                    <span className="text-gray-200 text-sm">Document & Workflow Management</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-krim-mint rounded-full" />
                    <span className="text-gray-200 text-sm">Compliance & Quality Assurance</span>
                  </li>
                </ul>
                
                <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-krim-mint/10 blur-3xl" />
              </GlassContainer>
            </HoverLiftCard>
            
            {/* Contact Center Karta Card */}
            <HoverLiftCard liftDistance={8} glowColor="rgba(0, 212, 255, 0.2)">
              <GlassContainer glassLevel="standard" className="p-6 h-full relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1" 
                  style={{ 
                    background: 'linear-gradient(90deg, transparent, rgb(0, 212, 255) 50%, transparent)',
                    boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' 
                  }}/>
                
                <div className="flex items-center gap-3 mb-4">
                  <Headset className="w-7 h-7 text-krim-cyan" />
                  <h3 className="text-xl font-bold text-white">Contact Center</h3>
                </div>
                
                <p className="text-base text-gray-100 mb-5 leading-relaxed font-medium">
                  Customer-facing AI that handles conversations across all channels
                </p>
                
                <ul className="space-y-2.5">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-krim-cyan rounded-full" />
                    <span className="text-gray-200 text-sm">Customer Service & Support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-krim-cyan rounded-full" />
                    <span className="text-gray-200 text-sm">Sales & Revenue Expansion</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-krim-cyan rounded-full" />
                    <span className="text-gray-200 text-sm">Collections & Recovery</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-krim-cyan rounded-full" />
                    <span className="text-gray-200 text-sm">Dispute & Complaint Resolution</span>
                  </li>
                </ul>
                
                <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-krim-cyan/10 blur-3xl" />
              </GlassContainer>
            </HoverLiftCard>
            
            {/* Studio Karta Card */}
            <HoverLiftCard liftDistance={8} glowColor="rgba(138, 43, 226, 0.2)">
              <GlassContainer glassLevel="standard" className="p-6 h-full relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1" 
                  style={{ 
                    background: 'linear-gradient(90deg, transparent, rgb(138, 43, 226) 50%, transparent)',
                    boxShadow: '0 0 20px rgba(138, 43, 226, 0.3)' 
                  }}/>
                
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-7 h-7" style={{ color: 'rgb(138, 43, 226)' }} />
                  <h3 className="text-xl font-bold text-white">Studio</h3>
                </div>
                
                <p className="text-base text-gray-100 mb-5 leading-relaxed font-medium">
                  Creative AI that builds, designs, and deploys custom coworkers
                </p>
                
                <ul className="space-y-2.5">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'rgb(138, 43, 226)' }} />
                    <span className="text-gray-200 text-sm">Agent & Workflow Creation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'rgb(138, 43, 226)' }} />
                    <span className="text-gray-200 text-sm">Content Generation Studio</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'rgb(138, 43, 226)' }} />
                    <span className="text-gray-200 text-sm">Deployment & Scale</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'rgb(138, 43, 226)' }} />
                    <span className="text-gray-200 text-sm">Continuous Optimization</span>
                  </li>
                </ul>
                
                <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: 'rgb(138, 43, 226)' }} />
              </GlassContainer>
            </HoverLiftCard>
          </div>
        </div>
      </StarfieldSection>

      {/* Back Office Karta Section */}
      <StarfieldSection glassLevel="standard" className="py-20 lg:py-24 border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12">
            <div className="w-full flex justify-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">Back Office</span> Karta
              </h2>
            </div>
            <div className="w-full flex justify-center">
              <p className="text-lg sm:text-xl text-gray-200 max-w-3xl text-center">
                Operations AI coworkers managing workflows and business processes
              </p>
            </div>
          </Reveal>
          
          {/* Risk & Analytics */}
          <div className="mb-16">
            <div className="w-full flex justify-center">
              <h3 className="text-2xl font-bold text-white mb-6">Risk Assessment & Analytics</h3>
            </div>
            <StaggerGrid staggerDelay={80} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <SimpleKartaCard name="Risk Assessment Karta" expertise="Portfolio Analysis" icon={ChartBar} category="backoffice" />
              <SimpleKartaCard name="Fraud Prevention Karta" expertise="Security & Detection" icon={Lock} category="backoffice" />
              <SimpleKartaCard name="Predictive Analytics Karta" expertise="Behavioral Forecasting" icon={Brain} category="backoffice" />
            </StaggerGrid>
          </div>

          {/* Financial Operations */}
          <div className="mb-16">
            <div className="w-full flex justify-center">
              <h3 className="text-2xl font-bold text-white mb-6">Payment & Financial Operations</h3>
            </div>
            <StaggerGrid staggerDelay={80} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <SimpleKartaCard name="Payment Processing Karta" expertise="Transaction Management" icon={Bank} category="backoffice" />
              <SimpleKartaCard name="Settlement Karta" expertise="Resolution Operations" icon={Calculator} category="backoffice" />
              <SimpleKartaCard name="Revenue Recognition Karta" expertise="Financial Reporting" icon={TrendUp} category="backoffice" />
            </StaggerGrid>
          </div>

          {/* Document & Workflow */}
          <div className="mb-16">
            <div className="w-full flex justify-center">
              <h3 className="text-2xl font-bold text-white mb-6">Document & Workflow Management</h3>
            </div>
            <StaggerGrid staggerDelay={80} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <SimpleKartaCard name="Document Generation Karta" expertise="Automated Documentation" icon={ClipboardText} category="backoffice" />
              <SimpleKartaCard name="Workflow Orchestration Karta" expertise="Process Management" icon={Gear} category="backoffice" />
              <SimpleKartaCard name="Data Integration Karta" expertise="System Coordination" icon={Pulse} category="backoffice" />
            </StaggerGrid>
          </div>

          {/* Compliance & Quality */}
          <div>
            <div className="w-full flex justify-center">
              <h3 className="text-2xl font-bold text-white mb-6">Compliance & Quality Assurance</h3>
            </div>
            <StaggerGrid staggerDelay={80} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <SimpleKartaCard name="Compliance Monitor Karta" expertise="Regulatory Oversight" icon={Shield} category="backoffice" />
              <SimpleKartaCard name="Audit Trail Karta" expertise="Documentation & Records" icon={FileText} category="backoffice" />
              <SimpleKartaCard name="Quality Assurance Karta" expertise="Performance Monitoring" icon={Eye} category="backoffice" />
            </StaggerGrid>
          </div>
        </div>
      </StarfieldSection>

      {/* Contact Center Karta Section */}
      <StarfieldSection glassLevel="light" className="py-20 lg:py-24 border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12">
            <div className="w-full flex justify-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-krim-cyan to-krim-mint bg-clip-text text-transparent">Contact Center</span> Karta
              </h2>
            </div>
            <div className="w-full flex justify-center">
              <p className="text-lg sm:text-xl text-gray-200 max-w-3xl text-center">
                Customer-facing AI coworkers organized by expertise and responsibility
              </p>
            </div>
          </Reveal>

          {/* Customer Service & Support */}
          <div className="mb-16">
            <div className="w-full flex justify-center">
              <h3 className="text-2xl font-bold text-white mb-6">Customer Service & Support</h3>
            </div>
            <StaggerGrid staggerDelay={80} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <SimpleKartaCard name="Service Karta" expertise="General Support" icon={ChatCircle} category="contact" />
              <SimpleKartaCard name="Dispute Karta" expertise="Complaints & Disputes" icon={Scales} category="contact" />
              <SimpleKartaCard name="VIP Service Karta" expertise="High-Value Customers" icon={Star} category="contact" />
            </StaggerGrid>
          </div>

          {/* Sales & Revenue */}
          <div className="mb-16">
            <div className="w-full flex justify-center">
              <h3 className="text-2xl font-bold text-white mb-6">Sales & Revenue Expansion</h3>
            </div>
            <StaggerGrid staggerDelay={80} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <SimpleKartaCard name="Cross-sell Karta" expertise="Revenue Growth" icon={TrendUp} category="contact" />
              <SimpleKartaCard name="Retention Karta" expertise="Customer Loyalty" icon={Brain} category="contact" />
              <SimpleKartaCard name="Activation Karta" expertise="Account Onboarding" icon={Pulse} category="contact" />
            </StaggerGrid>
          </div>

          {/* Collections & Recovery */}
          <div>
            <div className="w-full flex justify-center">
              <h3 className="text-2xl font-bold text-white mb-6">Collections & Recovery</h3>
            </div>
            <StaggerGrid staggerDelay={80} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <StarfieldSection glassLevel="standard" className="py-20 lg:py-24 border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12">
            <div className="w-full flex justify-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">AI Studio</span>
              </h2>
            </div>
            <div className="w-full flex justify-center">
              <p className="text-lg sm:text-xl text-gray-200 max-w-3xl text-center">
                Build, create, and deploy custom coworkers
              </p>
            </div>
          </Reveal>
          
          {/* Agent & Workflow Creation */}
          <div className="mb-16">
            <div className="w-full flex justify-center">
              <h3 className="text-2xl font-bold text-white mb-6">Agent & Workflow Creation</h3>
            </div>
            <StaggerGrid staggerDelay={80} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <HoverLiftCard liftDistance={8} glowColor="rgba(0, 255, 136, 0.2)">
                <GlassContainer glassLevel="standard" className="h-full p-6 relative overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-krim-mint via-emerald-300 to-krim-mint"
                    style={{ boxShadow: '0 0 20px rgba(0, 255, 136, 0.4)' }}/>
                  
                  <div className="w-12 h-12 rounded-lg bg-krim-mint/10 border border-krim-mint/20 flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-krim-mint" />
                  </div>
                  
                  <h4 className="text-xl font-bold text-white mb-3">Agent Builder</h4>
                  <p className="text-sm text-gray-300 mb-4">Design custom AI coworkers with expertise and compliance guardrails</p>
                  <ul className="space-y-2 text-xs text-gray-400">
                    <li>• Configure conversation patterns</li>
                    <li>• Set domain expertise</li>
                  </ul>
                  
                  <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-krim-mint/5 blur-2xl" />
                </GlassContainer>
              </HoverLiftCard>

              <HoverLiftCard liftDistance={8} glowColor="rgba(0, 255, 136, 0.2)">
                <GlassContainer glassLevel="standard" className="h-full p-6 relative overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-krim-mint via-emerald-300 to-krim-mint"
                    style={{ boxShadow: '0 0 20px rgba(0, 255, 136, 0.4)' }}/>
                  
                  <div className="w-12 h-12 rounded-lg bg-krim-mint/10 border border-krim-mint/20 flex items-center justify-center mb-4">
                    <Gear className="w-6 h-6 text-krim-mint" />
                  </div>
                  
                  <h4 className="text-xl font-bold text-white mb-3">Workflow Designer</h4>
                  <p className="text-sm text-gray-300 mb-4">Create automation workflows</p>
                  <ul className="space-y-2 text-xs text-gray-400">
                    <li>• Visual workflow builder</li>
                    <li>• Multi-channel orchestration</li>
                    <li>• Decision logic trees</li>
                  </ul>
                  
                  <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-krim-mint/5 blur-2xl" />
                </GlassContainer>
              </HoverLiftCard>

              <HoverLiftCard liftDistance={8} glowColor="rgba(0, 255, 136, 0.2)">
                <GlassContainer glassLevel="standard" className="h-full p-6 relative overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-krim-mint via-emerald-300 to-krim-mint"
                    style={{ boxShadow: '0 0 20px rgba(0, 255, 136, 0.4)' }}/>
                  
                  <div className="w-12 h-12 rounded-lg bg-krim-mint/10 border border-krim-mint/20 flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-krim-mint" />
                  </div>
                  
                  <h4 className="text-xl font-bold text-white mb-3">Integration Studio</h4>
                  <p className="text-sm text-gray-300 mb-4">Connect to existing systems and data sources</p>
                  <ul className="space-y-2 text-xs text-gray-400">
                    <li>• API connectors</li>
                    <li>• System orchestration</li>
                  </ul>
                  
                  <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-krim-mint/5 blur-2xl" />
                </GlassContainer>
              </HoverLiftCard>
            </StaggerGrid>
          </div>

          {/* Content Generation Studio */}
          <div className="mb-16">
            <div className="w-full flex justify-center">
              <h3 className="text-2xl font-bold text-white mb-6">Content Generation Studio</h3>
            </div>
            <StaggerGrid staggerDelay={80} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <HoverLiftCard liftDistance={8} glowColor="rgba(0, 212, 255, 0.2)">
                <GlassContainer glassLevel="standard" className="h-full p-6 relative overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-krim-cyan via-blue-300 to-krim-cyan"
                    style={{ boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)' }}/>
                  
                  <div className="w-12 h-12 rounded-lg bg-krim-cyan/10 border border-krim-cyan/20 flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-krim-cyan" />
                  </div>
                  
                  <h4 className="text-lg font-bold text-white mb-3">Document Creation</h4>
                  <p className="text-sm text-gray-300 mb-4">Generate legal notices, compliance docs, and campaign materials</p>
                  
                  <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-krim-cyan/5 blur-2xl" />
                </GlassContainer>
              </HoverLiftCard>

              <HoverLiftCard liftDistance={8} glowColor="rgba(0, 212, 255, 0.2)">
                <GlassContainer glassLevel="standard" className="h-full p-6 relative overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-krim-cyan via-blue-300 to-krim-cyan"
                    style={{ boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)' }}/>
                  
                  <div className="w-12 h-12 rounded-lg bg-krim-cyan/10 border border-krim-cyan/20 flex items-center justify-center mb-4">
                    <Eye className="w-6 h-6 text-krim-cyan" />
                  </div>
                  
                  <h4 className="text-lg font-bold text-white mb-3">Image Generation</h4>
                  <p className="text-sm text-gray-300 mb-4">Create visual assets for campaigns and presentations</p>
                  
                  <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-krim-cyan/5 blur-2xl" />
                </GlassContainer>
              </HoverLiftCard>

              <HoverLiftCard liftDistance={8} glowColor="rgba(0, 212, 255, 0.2)">
                <GlassContainer glassLevel="standard" className="h-full p-6 relative overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-krim-cyan via-blue-300 to-krim-cyan"
                    style={{ boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)' }}/>
                  
                  <div className="w-12 h-12 rounded-lg bg-krim-cyan/10 border border-krim-cyan/20 flex items-center justify-center mb-4">
                    <ChatCircle className="w-6 h-6 text-krim-cyan" />
                  </div>
                  
                  <h4 className="text-lg font-bold text-white mb-3">Video Production</h4>
                  <p className="text-sm text-gray-300 mb-4">Generate video content for training and marketing</p>
                  
                  <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-krim-cyan/5 blur-2xl" />
                </GlassContainer>
              </HoverLiftCard>

              <HoverLiftCard liftDistance={8} glowColor="rgba(0, 212, 255, 0.2)">
                <GlassContainer glassLevel="standard" className="h-full p-6 relative overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-krim-cyan via-blue-300 to-krim-cyan"
                    style={{ boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)' }}/>
                  
                  <div className="w-12 h-12 rounded-lg bg-krim-cyan/10 border border-krim-cyan/20 flex items-center justify-center mb-4">
                    <EnvelopeSimple className="w-6 h-6 text-krim-cyan" />
                  </div>
                  
                  <h4 className="text-lg font-bold text-white mb-3">Multimedia Delivery</h4>
                  <p className="text-sm text-gray-300 mb-4">Orchestrate delivery of documents, images, and videos</p>
                  
                  <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-krim-cyan/5 blur-2xl" />
                </GlassContainer>
              </HoverLiftCard>
            </StaggerGrid>
          </div>

          {/* Deployment & Scale */}
          <div className="mb-12">
            <div className="w-full flex justify-center">
              <h3 className="text-2xl font-bold text-white mb-6">Deployment & Scale</h3>
            </div>
            <StaggerGrid staggerDelay={80} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <HoverLiftCard liftDistance={8} glowColor="rgba(0, 255, 136, 0.2)">
                <GlassContainer glassLevel="standard" className="h-full p-6 relative overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-krim-mint via-emerald-300 to-krim-mint"
                    style={{ boxShadow: '0 0 20px rgba(0, 255, 136, 0.4)' }}/>
                  
                  <div className="w-12 h-12 rounded-lg bg-krim-mint/10 border border-krim-mint/20 flex items-center justify-center mb-4">
                    <Pulse className="w-6 h-6 text-krim-mint" />
                  </div>
                  
                  <h4 className="text-xl font-bold text-white mb-3">Live Deployment</h4>
                  <p className="text-sm text-gray-300 mb-4">Deploy agents with intelligent routing</p>
                  <ul className="space-y-2 text-xs text-gray-400">
                    <li>• Multi-channel deployment</li>
                    <li>• Campaign timing optimization</li>
                    <li>• Real-time monitoring</li>
                  </ul>
                  
                  <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-krim-mint/5 blur-2xl" />
                </GlassContainer>
              </HoverLiftCard>

              <HoverLiftCard liftDistance={8} glowColor="rgba(0, 255, 136, 0.2)">
                <GlassContainer glassLevel="standard" className="h-full p-6 relative overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-krim-mint via-emerald-300 to-krim-mint"
                    style={{ boxShadow: '0 0 20px rgba(0, 255, 136, 0.4)' }}/>
                  
                  <div className="w-12 h-12 rounded-lg bg-krim-mint/10 border border-krim-mint/20 flex items-center justify-center mb-4">
                    <TrendUp className="w-6 h-6 text-krim-mint" />
                  </div>
                  
                  <h4 className="text-xl font-bold text-white mb-3">Continuous Optimization</h4>
                  <p className="text-sm text-gray-300 mb-4">Monitor and optimize agent effectiveness</p>
                  <ul className="space-y-2 text-xs text-gray-400">
                    <li>• A/B testing frameworks</li>
                    <li>• Continuous learning</li>
                    <li>• ROI optimization</li>
                  </ul>
                  
                  <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-krim-mint/5 blur-2xl" />
                </GlassContainer>
              </HoverLiftCard>
            </StaggerGrid>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <GlassContainer glassLevel="light" className="inline-flex items-center gap-3 px-8 py-4 rounded-full">
              <Pulse className="h-5 w-5 text-krim-mint" />
              <p className="text-lg font-bold">
                <span className="text-krim-mint">Powered by Kendra.</span>{" "}
                <span className="text-white">Every creation governed.</span>
              </p>
            </GlassContainer>
          </motion.div>
        </div>
      </StarfieldSection>

      {/* Compliance Foundations Section */}
      <StarfieldSection glassLevel="standard" className="py-20 lg:py-24 border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12">
            <div className="w-full flex justify-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Built on <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">Compliance Foundations</span>
              </h2>
            </div>
            <div className="w-full flex justify-center">
              <p className="text-lg sm:text-xl text-gray-200 max-w-3xl text-center">
                Every specialist operates within policy constraints, not prompts
              </p>
            </div>
          </Reveal>
          
          <StaggerGrid staggerDelay={100} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <HoverLiftCard liftDistance={5} glowColor="rgba(0, 255, 136, 0.15)">
              <GlassContainer glassLevel="light" className="p-6 h-full flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-krim-mint/10 to-krim-mint/5 border border-krim-mint/20 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-krim-mint" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Policy Constraints</h3>
                <p className="text-sm text-gray-300">Your playbooks, not prompts</p>
              </GlassContainer>
            </HoverLiftCard>
            
            <HoverLiftCard liftDistance={5} glowColor="rgba(0, 212, 255, 0.15)">
              <GlassContainer glassLevel="light" className="p-6 h-full flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-krim-cyan/10 to-krim-cyan/5 border border-krim-cyan/20 flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-krim-cyan" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Validated Outputs</h3>
                <p className="text-sm text-gray-300">Actions verified against approved data</p>
              </GlassContainer>
            </HoverLiftCard>
            
            <HoverLiftCard liftDistance={5} glowColor="rgba(0, 255, 136, 0.15)">
              <GlassContainer glassLevel="light" className="p-6 h-full flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-krim-mint/10 to-krim-mint/5 border border-krim-mint/20 flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-krim-mint" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Data Boundaries</h3>
                <p className="text-sm text-gray-300">Scoped access control</p>
              </GlassContainer>
            </HoverLiftCard>
            
            <HoverLiftCard liftDistance={5} glowColor="rgba(0, 212, 255, 0.15)">
              <GlassContainer glassLevel="light" className="p-6 h-full flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-krim-cyan/10 to-krim-cyan/5 border border-krim-cyan/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-krim-cyan" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Audit Trails</h3>
                <p className="text-sm text-gray-300">Full traceability</p>
              </GlassContainer>
            </HoverLiftCard>
          </StaggerGrid>
        </div>
      </StarfieldSection>

      {/* Impact Showcase Section */}
      <StarfieldSection glassLevel="light" className="py-20 lg:py-24 border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12">
            <div className="w-full flex justify-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-krim-cyan to-krim-mint bg-clip-text text-transparent">Proven Impact</span> Across Operations
              </h2>
            </div>
            <div className="w-full flex justify-center">
              <p className="text-lg sm:text-xl text-gray-200 max-w-3xl text-center">
                Specialists drive measurable improvements across every metric that matters
              </p>
            </div>
          </Reveal>
          
          <StaggerGrid staggerDelay={120} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlassContainer glassLevel="light" className="p-6 text-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-krim-mint/10 to-krim-mint/5 border border-krim-mint/20 flex items-center justify-center mx-auto mb-4">
                <TrendUp className="w-6 h-6 text-krim-mint" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Portfolio Performance</h3>
              <p className="text-sm text-gray-300">Higher recovery rates with improved customer relationships</p>
            </GlassContainer>
            
            <GlassContainer glassLevel="light" className="p-6 text-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-krim-cyan/10 to-krim-cyan/5 border border-krim-cyan/20 flex items-center justify-center mx-auto mb-4">
                <Pulse className="w-6 h-6 text-krim-cyan" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Operational Efficiency</h3>
              <p className="text-sm text-gray-300">Faster processing with consistent quality across all interactions</p>
            </GlassContainer>
            
            <GlassContainer glassLevel="light" className="p-6 text-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-krim-mint/10 to-krim-mint/5 border border-krim-mint/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-krim-mint" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Compliance Confidence</h3>
              <p className="text-sm text-gray-300">Perfect regulatory adherence with complete audit documentation</p>
            </GlassContainer>
            
            <GlassContainer glassLevel="light" className="p-6 text-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-krim-cyan/10 to-krim-cyan/5 border border-krim-cyan/20 flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-krim-cyan" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Customer<br />Experience</h3>
              <p className="text-sm text-gray-300">Better outcomes through empathetic, expert interactions</p>
            </GlassContainer>
          </StaggerGrid>
        </div>
      </StarfieldSection>

      {/* Simple CTA Section */}
      <StarfieldSection glassLevel="standard" className="py-20 lg:py-24 border-t border-slate-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="w-full flex justify-center">
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-6">
                <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">Deploy Your AI Specialists</span>
              </h2>
            </div>
            
            <div className="w-full flex justify-center">
              <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed max-w-3xl mb-8 text-center">
                See how your specialists handle real customer interactions and workflows
              </p>
            </div>
            
            <div className="w-full flex justify-center">
              <HoverLiftCard liftDistance={4}>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-cyan hover:from-krim-mint hover:to-krim-cyan text-black font-semibold px-8 py-4"
                >
                  See Agents Handle Real Cases
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </HoverLiftCard>
            </div>
          </Reveal>
        </div>
      </StarfieldSection>
    </StarfieldLayout>
  )
}