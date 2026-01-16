/**
 * KUPA COMMAND CENTERS - Operational Control Interfaces
 * Clean, futuristic design with emphasis on simplicity and visual impact
 */

import React from 'react'
import {
  Eye, Shield, Users, Target, Scales, ChartBar, 
  Gavel, MapPin, Building, CheckCircle,
  Lightning, Lock, TrendUp, Pulse,
  Brain, Network, Cpu, Database, ArrowRight
} from '@phosphor-icons/react'
import Button from '../components/Button'
import { motion, LazyMotion, domAnimation, MotionConfig } from 'framer-motion'

// Import layout and motion components
import { 
  StarfieldLayout, 
  StarfieldSection
} from '../components/motion/StarfieldLayout'
import {
  Reveal,
  StaggerGrid,
  HoverLiftCard,
  GlassContainer
} from '../components/motion/primitives'
import { duration, easing, stagger as staggerTokens } from '../components/motion/tokens'
import { useReducedMotion } from '../hooks/useReducedMotion'

// Enhanced Command Center Card Component - Vibrant & Interactive
interface CommandCenterCardProps {
  title: string
  description: string
  icon: React.ComponentType<any>
  index: number
  accentColor: string
  accentClass?: string
}

function CommandCenterCard({ 
  title, 
  description, 
  icon: Icon, 
  index,
  accentColor,
  accentClass
}: CommandCenterCardProps) {
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        delay: index * 0.05,
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className="group h-full relative"
    >
      {/* Enhanced glow effect container - Much more visible */}
      <div 
        className="absolute -inset-4 rounded-xl opacity-60 group-hover:opacity-90 blur-2xl transition-all duration-700"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accentColor}80, ${accentColor}40 50%, transparent 70%)`,
        }}
      />
      
      {/* Main card with enhanced styling */}
      <div className="relative h-full">
        <HoverLiftCard
          liftDistance={12}
          glowColor={`${accentColor}40`}
          scale={1.05}
          className="h-full"
        >
          {/* Beautiful gradient border effect - Much more vibrant */}
          <div 
            className="absolute inset-0 rounded-xl p-[3px]"
            style={{
              background: `linear-gradient(135deg, ${accentColor}90, ${accentColor}60 25%, ${accentColor}30 50%, ${accentColor}60 75%, ${accentColor}90)`,
              backgroundSize: '400% 400%',
              animation: 'gradientShift 4s ease-in-out infinite',
            }}
          >
            <div className="absolute inset-[3px] rounded-xl bg-slate-900/90 backdrop-blur-sm" />
          </div>
          
          <GlassContainer 
            glassLevel="standard" 
            className="relative h-full p-6 rounded-xl overflow-hidden border-0"
            style={{
              background: `linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.8))`,
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Animated top accent with glow - Much brighter */}
            <div 
              className="absolute inset-x-0 top-0 h-[3px] group-hover:h-[4px] transition-all duration-500"
              style={{
                background: `linear-gradient(90deg, transparent, ${accentColor} 20%, ${accentColor} 50%, ${accentColor} 80%, transparent)`,
                boxShadow: `0 0 30px ${accentColor}80, 0 0 10px ${accentColor}`,
              }}
            />
            
            {/* Enhanced background pattern - More visible */}
            <div 
              className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-700"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, ${accentColor}30 0%, transparent 50%)`,
              }}
            />
            
            {/* Icon with enhanced styling */}
            <div className="mb-4 relative">
              <div 
                className="inline-flex p-3 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}40, ${accentColor}20)`,
                  border: `2px solid ${accentColor}70`,
                  boxShadow: `0 0 30px ${accentColor}40, inset 0 0 20px ${accentColor}20`,
                }}
              >
                <Icon 
                  className="w-6 h-6 transition-all duration-500 group-hover:scale-110"
                  style={{ 
                    color: accentColor,
                    filter: `drop-shadow(0 0 10px ${accentColor}40)`,
                  }}
                />
              </div>
              
              {/* Icon glow pulse on hover - Much more visible */}
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"
                style={{
                  background: `radial-gradient(circle at center, ${accentColor}50, ${accentColor}20 50%, transparent 70%)`,
                }}
              />
            </div>
            
            {/* Enhanced typography with hover effects */}
            <h3 className="text-lg font-bold text-white mb-3 tracking-tight transition-all duration-500 group-hover:tracking-wide">
              {title}
            </h3>
            <p className="text-sm text-gray-100 leading-relaxed transition-colors duration-500 group-hover:text-white">
              {description}
            </p>
            
            {/* Interactive corner accents - Much more visible */}
            <div 
              className="absolute top-3 right-3 w-12 h-12 opacity-40 group-hover:opacity-80 transition-all duration-500"
              style={{
                borderTop: `3px solid ${accentColor}`,
                borderRight: `3px solid ${accentColor}`,
                borderRadius: '0 8px 0 0',
                boxShadow: `0 0 15px ${accentColor}40`,
              }}
            />
            <div 
              className="absolute bottom-3 left-3 w-12 h-12 opacity-40 group-hover:opacity-80 transition-all duration-500"
              style={{
                borderBottom: `3px solid ${accentColor}`,
                borderLeft: `3px solid ${accentColor}`,
                borderRadius: '0 0 0 8px',
                boxShadow: `0 0 15px ${accentColor}40`,
              }}
            />
            
            {/* Bottom glow bar with shimmer animation - Much more visible */}
            <div 
              className="absolute inset-x-0 bottom-0 h-[4px] opacity-60 group-hover:opacity-100 transition-all duration-700"
              style={{
                background: `linear-gradient(90deg, transparent, ${accentColor} 30%, ${accentColor} 50%, ${accentColor} 70%, transparent)`,
                boxShadow: `0 0 20px ${accentColor}80, 0 0 40px ${accentColor}40`,
                animation: 'shimmer 3s ease-in-out infinite',
              }}
            />
          </GlassContainer>
        </HoverLiftCard>
      </div>
      
    </motion.div>
  )
}


// Main Kupa Page Component
export default function Kupa() {
  const prefersReducedMotion = useReducedMotion()

  const commandCenters = [
    {
      title: 'Campaign Operations',
      description: 'Multi-channel performance tracking with compliance guardrails',
      icon: Target,
      accentColor: 'rgb(0, 255, 150)', // Brighter Mint Green
      accentClass: 'text-krim-mint'
    },
    {
      title: 'Support Queue',
      description: 'Task routing between AI agents and human specialists',
      icon: Users,
      accentColor: 'rgb(0, 230, 255)', // Brighter Electric Cyan
      accentClass: 'text-krim-cyan'
    },
    {
      title: 'Legal Tracking',
      description: 'Dispute monitoring with deadline alerts and filing status',
      icon: Gavel,
      accentColor: 'rgb(0, 255, 136)', // Brighter Mint
      accentClass: 'text-krim-mint'
    },
    {
      title: 'Field Operations',
      description: 'Field team deployment and visit outcome tracking',
      icon: MapPin,
      accentColor: 'rgb(255, 120, 140)', // Brighter Coral
      accentClass: 'text-krim-coral'
    },
    {
      title: 'Compliance Monitor',
      description: 'Violation detection with automated interventions',
      icon: Scales,
      accentColor: 'rgb(50, 230, 255)', // Brighter Turquoise
      accentClass: 'text-cyan-400'
    },
    {
      title: 'Risk Analysis',
      description: 'Portfolio deterioration alerts with intervention triggers',
      icon: TrendUp,
      accentColor: 'rgb(255, 210, 70)', // Brighter Golden Amber
      accentClass: 'text-amber-400'
    },
    {
      title: 'Settlement Management',
      description: 'Approval workflows with enforced authority limits',
      icon: ChartBar,
      accentColor: 'rgb(80, 230, 180)', // Brighter Emerald
      accentClass: 'text-emerald-400'
    },
    {
      title: 'Executive View',
      description: 'Operational metrics with process drill-down capability',
      icon: Building,
      accentColor: 'rgb(150, 160, 255)', // Brighter Indigo
      accentClass: 'text-indigo-400'
    }
  ]

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion={prefersReducedMotion ? "always" : "never"}>
        <StarfieldLayout pageType="product" contentDensity="sparse">
      
      {/* Hero Section - Standardized like Kendra */}
      <StarfieldSection glassLevel="ultraLight" className="relative min-h-[700px] lg:min-h-[800px] xl:min-h-[900px] flex items-center py-24 lg:py-32">
        <div className="w-full container max-w-6xl mx-auto px-6">
          
          <div className="text-center">
            
            {/* Kupa Title - Matching Kendra Pattern */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-[1.1] tracking-tight"
            >
              <span className="bg-gradient-to-r from-krim-cyan to-krim-mint bg-clip-text text-transparent font-black">
                Kupa™ Command Centers
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
              Real-Time Control Interfaces for Operations
            </motion.p>

            {/* Description - What it DOES */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl lg:text-2xl text-white/70 max-w-4xl mx-auto mb-16 leading-relaxed"
            >
              Monitor agent performance and portfolio health in real-time. Intervene with policy controls when needed. Scale oversight without adding headcount.
            </motion.p>
            
            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center"
            >
              <HoverLiftCard liftDistance={4}>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-cyan hover:from-krim-mint hover:to-krim-cyan text-black font-semibold px-8 py-4"
                >
                  Tour Live Operations Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </HoverLiftCard>
            </motion.div>
          </div>
          
        </div>
      </StarfieldSection>

      {/* Command Centers Grid - Professional Cards */}
      <StarfieldSection glassLevel="light" className="relative py-20 border-t border-slate-800">
        <div className="container max-w-6xl mx-auto px-6">
          
          <Reveal direction="up" delay={0}>
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-light leading-[1.2] mb-6 text-center text-white">
                <span className="text-krim-cyan font-bold">Specialized</span><br />
                <span className="text-white font-bold">Command Centers</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                Purpose-built interfaces for every operational domain
              </p>
            </div>
          </Reveal>
          
          {/* Professional grid layout */}
          <StaggerGrid staggerDelay={80} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commandCenters.map((center, index) => (
              <CommandCenterCard
                key={center.title}
                {...center}
                index={index}
              />
            ))}
          </StaggerGrid>
        </div>
      </StarfieldSection>

      {/* Core Capabilities - Clean Layout */}
      <StarfieldSection glassLevel="standard" className="relative py-20 border-t border-gray-800">
        <div className="container max-w-6xl mx-auto px-6">
          
          <Reveal direction="up" delay={0}>
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-light mb-6 text-center text-white">
                <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">Operational Possibilities</span> Unlocked
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                Safe, governed control enables new capabilities across your operations
              </p>
            </div>
          </Reveal>
          
          {/* Three pillars */}
          <StaggerGrid staggerDelay={100} className="grid md:grid-cols-3 gap-8">
            <HoverLiftCard liftDistance={5} glowColor="rgba(0, 212, 255, 0.15)">
              <GlassContainer glassLevel="light" className="p-8 h-full flex flex-col">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-krim-cyan/10 to-krim-cyan/5 border border-krim-cyan/20">
                    <Eye className="w-6 h-6 text-krim-cyan" />
                  </div>
                  <h3 className="text-xl font-bold text-white pt-1">Real-time Insights</h3>
                </div>
                <p className="text-base text-gray-300 leading-relaxed flex-grow">
                  Spot opportunities and issues instantly across all operational channels
                </p>
              </GlassContainer>
            </HoverLiftCard>
            
            <HoverLiftCard liftDistance={5} glowColor="rgba(0, 255, 136, 0.15)">
              <GlassContainer glassLevel="light" className="p-8 h-full flex flex-col">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-krim-mint/10 to-krim-mint/5 border border-krim-mint/20">
                    <Lightning className="w-6 h-6 text-krim-mint" />
                  </div>
                  <h3 className="text-xl font-bold text-white pt-1">Confident Actions</h3>
                </div>
                <p className="text-base text-gray-300 leading-relaxed flex-grow">
                  Take immediate action with built-in policy protection and approval workflows
                </p>
              </GlassContainer>
            </HoverLiftCard>
            
            <HoverLiftCard liftDistance={5} glowColor="rgba(16, 185, 129, 0.15)">
              <GlassContainer glassLevel="light" className="p-8 h-full flex flex-col">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-400/10 to-emerald-400/5 border border-emerald-400/20">
                    <Shield className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white pt-1">Regulatory Confidence</h3>
                </div>
                <p className="text-base text-gray-300 leading-relaxed flex-grow">
                  Move faster with complete transparency and automatic compliance documentation
                </p>
              </GlassContainer>
            </HoverLiftCard>
          </StaggerGrid>
        </div>
      </StarfieldSection>

      {/* Architecture Integration Section */}
      <StarfieldSection glassLevel="standard" className="relative py-20 border-t border-white/10">
        <div className="container max-w-5xl mx-auto px-6">
          <Reveal direction="up" once={true}>
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-light mb-6 text-center text-white">
                <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">Architecture:</span> Command Centers on Kendra
              </h2>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.2} once={true}>
            <GlassContainer glassLevel="light" className="rounded-2xl p-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="grid gap-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-slate-900/50 to-transparent border-l-2 border-krim-cyan">
                    <div className="w-2 h-2 rounded-full bg-krim-cyan mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <span className="font-mono text-sm font-bold text-krim-cyan uppercase tracking-wider">Foundation</span>
                      <p className="text-gray-200 mt-1">Kendra Runtime (orchestration + policy enforcement)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-slate-900/50 to-transparent border-l-2 border-krim-mint">
                    <div className="w-2 h-2 rounded-full bg-krim-mint mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <span className="font-mono text-sm font-bold text-krim-mint uppercase tracking-wider">Data Layer</span>
                      <p className="text-gray-200 mt-1">Kula Digital Twins (unified customer view)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-slate-900/50 to-transparent border-l-2 border-emerald-400">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <span className="font-mono text-sm font-bold text-emerald-400 uppercase tracking-wider">Actions</span>
                      <p className="text-gray-200 mt-1">Kriya Primitives (policy-checked operations)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-slate-900/50 to-transparent border-l-2 border-krim-mint">
                    <div className="w-2 h-2 rounded-full bg-krim-mint mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <span className="font-mono text-sm font-bold text-krim-mint uppercase tracking-wider">Workers</span>
                      <p className="text-gray-200 mt-1">Karta AI (automated task execution)</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-lg font-medium">
                  <span className="bg-gradient-to-r from-krim-cyan to-krim-mint bg-clip-text text-transparent font-bold">Real-time updates</span> 
                  <span className="text-gray-300"> across all components. </span>
                  <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-bold">Single source of truth.</span>
                </p>
              </div>
            </GlassContainer>
          </Reveal>
        </div>
      </StarfieldSection>

      


      {/* Leadership Section - Role-Based Views */}
      <StarfieldSection glassLevel="light" className="relative py-20 border-t border-white/10">
        <div className="container max-w-6xl mx-auto px-6">
          
          <Reveal direction="up" delay={0}>
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-light text-center mb-6 text-white">
                <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">Role-Based</span> Command Centers
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                Configured views and controls for each operational role
              </p>
            </div>
          </Reveal>
          
          {/* Focused 5-Card Grid - Key Roles Only */}
          <StaggerGrid staggerDelay={80} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                role: 'Chief Risk Officer',
                icon: Shield,
                color: 'rgb(0, 255, 136)',
                points: [
                  'Portfolio risk monitoring',
                  'Compliance violations tracking',
                  'Regulatory reporting automation'
                ]
              },
              {
                role: 'Head of Collections',
                icon: Target,
                color: 'rgb(0, 212, 255)',
                points: [
                  'Campaign performance metrics',
                  'Agent productivity insights',
                  'Settlement workflow control'
                ]
              },
              {
                role: 'Chief Compliance Officer',
                icon: Scales,
                color: 'rgb(255, 76, 97)',
                points: [
                  'Real-time compliance monitoring',
                  'Policy enforcement automation',
                  'Audit trail documentation'
                ]
              },
              {
                role: 'Legal Counsel',
                icon: Gavel,
                color: 'rgb(0, 255, 136)',
                points: [
                  'Dispute case management',
                  'Legal deadline tracking',
                  'Regulatory filing status'
                ]
              },
              {
                role: 'Field Operations Lead',
                icon: MapPin,
                color: 'rgb(0, 212, 255)',
                points: [
                  'Territory planning tools',
                  'Visit outcome tracking',
                  'Field team coordination'
                ]
              }
            ].map((persona, idx) => (
              <motion.div
                key={persona.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  delay: idx * 0.05,
                  duration: 0.5,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                className="group"
              >
                <GlassContainer glassLevel="light" className="h-full p-6">
                  
                  {/* Subtle top accent */}
                  <div 
                    className="absolute inset-x-0 top-0 h-[1px]"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${persona.color}30 50%, transparent)`,
                    }}
                  />
                  
                  {/* Icon */}
                  <div className="mb-4">
                    <div 
                      className="inline-flex p-2.5 rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, ${persona.color}10, transparent)`,
                        border: `1px solid ${persona.color}20`
                      }}
                    >
                      <persona.icon 
                        className="w-5 h-5"
                        style={{ color: persona.color }}
                      />
                    </div>
                  </div>
                  
                  {/* Role */}
                  <h3 className="text-lg font-bold text-white mb-4">
                    {persona.role}
                  </h3>
                  
                  {/* Bullet points */}
                  <ul className="space-y-3">
                    {persona.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div 
                          className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{ backgroundColor: persona.color }}
                        />
                        <span className="text-sm text-gray-300 leading-relaxed">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </GlassContainer>
              </motion.div>
            ))}
          </StaggerGrid>
        </div>
      </StarfieldSection>

      {/* Final CTA - Minimal and Powerful */}
      <StarfieldSection glassLevel="standard" className="relative py-20 border-t border-white/10">
        <div className="container max-w-4xl mx-auto px-6 text-center">
          
          <Reveal direction="up" delay={0}>
            <div className="space-y-6">
              {/* Heading */}
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-light text-center text-white">
                <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent">Deploy Kupa Command Centers</span>
              </h2>
              
              {/* Subtext */}
              <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto text-center font-medium">
                Pre-configured for your compliance requirements. Live in weeks.
              </p>
              
              {/* CTAs */}
              <Button 
                size="lg"
                className="bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-cyan hover:from-krim-mint hover:to-krim-cyan text-black font-semibold px-8 py-4"
              >
                See Kupa in action
              </Button>
            </div>
          </Reveal>
        </div>
      </StarfieldSection>
        </StarfieldLayout>
      </MotionConfig>
    </LazyMotion>
  )
}