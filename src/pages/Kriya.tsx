/**
 * KRIYA PRIMITIVES - The Building Blocks of Safe Agentic Automation
 * Product page implementation with starfield continuity system
 */

import React from 'react'
import { motion } from 'framer-motion'
import {
  Lightning, Scales, FileText, Database, CheckCircle
} from '@phosphor-icons/react'
import Button from '../components/Button'

// Import starfield and motion components
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

// Animation variants
const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
}

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
}

// Simple Primitive List Component for Hero
function PrimitiveList() {
  return (
    <GlassContainer glassLevel="light" className="relative w-full rounded-2xl p-8">
      <div className="space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">How Kriya Controls AI:</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-krim-cyan rounded-full mt-2 flex-shrink-0" />
            <div>
              <div className="text-lg font-semibold text-white">Every action requires a primitive</div>
              <div className="text-base text-gray-300">AI can only execute pre-defined, approved operations</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-krim-cyan rounded-full mt-2 flex-shrink-0" />
            <div>
              <div className="text-lg font-semibold text-white">Policies enforced before execution</div>
              <div className="text-base text-gray-300">FDCPA, TCPA, and your rules checked in real-time</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-krim-cyan rounded-full mt-2 flex-shrink-0" />
            <div>
              <div className="text-lg font-semibold text-white">Complete audit trail</div>
              <div className="text-base text-gray-300">Every decision logged with regulatory traceability</div>
            </div>
          </div>
        </div>
      </div>
    </GlassContainer>
  )
}



export default function Kriya() {

  // Icon mapping for primitive types
  const primitiveIcons = [
    Lightning, // Action
    CheckCircle, // Check
    Scales, // Policy
    FileText, // Template
    Database // Data & scope
  ]

  return (
    <StarfieldLayout pageType="product" contentDensity="moderate">
      
      {/* Hero Section - Standardized Pattern */}
      <StarfieldSection glassLevel="ultraLight" className="relative min-h-[700px] lg:min-h-[800px] xl:min-h-[900px] flex items-center py-24 lg:py-32">
        <div className="w-full max-w-6xl mx-auto px-6">
          <div className="text-center">
            {/* Kriya Title - Matching Kendra Pattern */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-[1.1] tracking-tight"
            >
              <span className="bg-gradient-to-r from-krim-cyan to-krim-mint bg-clip-text text-transparent font-black">
                Kriya Primitives™
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
              Pre-Approved Building Blocks for Safe AI
            </motion.p>

            {/* Description - What it DOES */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl lg:text-2xl text-white/70 max-w-4xl mx-auto mb-16 leading-relaxed"
            >
              Every AI action maps to compliant, auditable primitives. Change policies once, update everywhere. Never worry about regulatory violations or unauthorized actions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center mb-16"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-cyan hover:from-krim-mint hover:to-krim-cyan text-black font-semibold px-8 py-4"
              >
                Review Compliance Controls
              </Button>
            </motion.div>
          </div>
        </div>
      </StarfieldSection>

      {/* How Kriya Controls AI - Moved Below Hero */}
      <StarfieldSection glassLevel="light" className="relative py-16 border-t border-slate-800">
        <div className="container max-w-4xl mx-auto px-6">
          <Reveal direction="up" once={true}>
            <div className="text-center mb-10">
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-light mb-6 text-white">
                <span className="bg-gradient-to-r from-krim-cyan to-krim-mint bg-clip-text text-transparent font-bold">How Kriya Controls AI</span>
              </h2>
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.2} once={true}>
            <PrimitiveList />
          </Reveal>
        </div>
      </StarfieldSection>


      {/* Section 2: The Five Primitive Types */}
      <StarfieldSection glassLevel="light" className="relative py-20 border-t border-slate-800">
        <div className="container max-w-6xl mx-auto px-6">
          <Reveal direction="up" once={true}>
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-light leading-[1.2] mb-6 text-center text-white">
                <span className="bg-gradient-to-r from-krim-cyan to-krim-mint bg-clip-text text-transparent font-bold">Five Primitive Types</span><br />
                <span className="text-white font-bold">Complete Control</span>
              </h2>
            </div>
          </Reveal>

          {/* Primitive Types Grid - 2-3 Layout */}
          <div className="space-y-8 mb-16">
            {/* Top row: 2 cards centered */}
            <StaggerGrid staggerDelay={80} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Actions",
                  text: "Send text messages respecting time zones. Make calls with attempt limits. Update account status. Create payment plans.",
                  color: "border-t-cyan-400"
                },
                {
                  title: "Checks", 
                  text: "Verify if customer is vulnerable. Check payment due dates. Confirm dispute status. Validate contact permissions.",
                  color: "border-t-emerald-400"
                }
              ].map((primitive, idx) => {
                const Icon = primitiveIcons[idx]
                return (
                  <HoverLiftCard
                    key={primitive.title}
                    liftDistance={5}
                    glowColor="rgba(0, 255, 136, 0.15)"
                    className={`bg-slate-800/30 border border-gray-700 border-t-4 ${primitive.color} rounded-2xl p-8 hover:border-gray-600 transition-all duration-300 group cursor-pointer h-full`}
                  >
                    <div className="flex items-start gap-4">
                      <Icon className="w-6 h-6 text-krim-cyan mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-krim-cyan transition-colors">
                          {primitive.title}
                        </h3>
                        <p className="text-base text-gray-200 leading-relaxed font-medium">
                          {primitive.text}
                        </p>
                      </div>
                    </div>
                  </HoverLiftCard>
                )
              })}
            </StaggerGrid>

            {/* Bottom row: 3 cards */}
            <StaggerGrid staggerDelay={80} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Policies",
                  text: "Maximum 7 contact attempts per month. Required disclosures by state. Settlement limits by balance amount.",
                  color: "border-t-violet-400"
                },
                {
                  title: "Templates",
                  text: "Pre-written scripts for calls. Standardized letter templates. Dispute acknowledgment forms with legal language.",
                  color: "border-t-blue-400"
                },
                {
                  title: "Data & Scope",
                  text: "Junior agents see balances only. Managers access personal information. State laws control what data is visible.",
                  color: "border-t-teal-400"
                }
              ].map((primitive, idx) => {
                const Icon = primitiveIcons[idx + 2]
                return (
                  <HoverLiftCard
                    key={primitive.title}
                    liftDistance={5}
                    glowColor="rgba(0, 255, 136, 0.15)"
                    className={`bg-slate-800/30 border border-gray-700 border-t-4 ${primitive.color} rounded-2xl p-8 hover:border-gray-600 transition-all duration-300 group cursor-pointer h-full`}
                  >
                    <div className="flex items-start gap-4">
                      <Icon className="w-6 h-6 text-krim-cyan mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-krim-cyan transition-colors">
                          {primitive.title}
                        </h3>
                        <p className="text-base text-gray-200 leading-relaxed font-medium">
                          {primitive.text}
                        </p>
                      </div>
                    </div>
                  </HoverLiftCard>
                )
              })}
            </StaggerGrid>
          </div>

          <Reveal direction="up" delay={0.5} once={true}>
            <div className="text-center">
              <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/30 border border-slate-600/30 rounded-xl p-6 max-w-4xl mx-auto">
                <p className="text-lg font-semibold text-white text-center">
                  <span className="bg-gradient-to-r from-krim-cyan to-krim-mint bg-clip-text text-transparent">Each primitive:</span> defined inputs/outputs, policy validation, <span className="bg-gradient-to-r from-krim-cyan to-krim-mint bg-clip-text text-transparent">full audit trail</span>.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </StarfieldSection>

      {/* Section 3: Stack Position - Simplified */}
      <StarfieldSection glassLevel="standard" className="relative py-16 border-t border-gray-800">
        <div className="container max-w-4xl mx-auto px-6">
          <Reveal direction="up" once={true}>
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-light mb-6 text-center text-white">
                <span className="bg-gradient-to-r from-krim-cyan to-krim-mint bg-clip-text text-transparent">Architecture:</span> Primitives at the Foundation
              </h2>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.2} once={true}>
            <div className="bg-slate-800/30 border border-gray-700 rounded-xl p-6">
              <div className="space-y-3 text-gray-200">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-semibold text-gray-300">Layer 1:</span>
                  <span>Kriya Primitives (atomic operations + policies)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-semibold text-gray-300">Layer 2:</span>
                  <span>Kendra Runtime (orchestration + enforcement)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-semibold text-gray-300">Layer 3:</span>
                  <span>Karta/Kula/Kupa (AI applications using primitives)</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-700 text-base text-gray-200 font-medium">
                <span className="bg-gradient-to-r from-krim-cyan to-krim-mint bg-clip-text text-transparent">Change a primitive</span> → automatically updates across all applications. <span className="bg-gradient-to-r from-krim-cyan to-krim-mint bg-clip-text text-transparent">Version controlled. Audit logged.</span>
              </div>
            </div>
          </Reveal>
        </div>
      </StarfieldSection>

      {/* Section 4: Compliance Mechanisms */}
      <StarfieldSection glassLevel="standard" className="relative py-16 border-t border-white/10">
        <div className="container max-w-5xl mx-auto px-6">
          <Reveal direction="up" once={true}>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-light text-center mb-10 text-white">
              <span className="bg-gradient-to-r from-krim-cyan to-krim-mint bg-clip-text text-transparent">Regulatory Compliance</span> Through Constraint
            </h2>
          </Reveal>
          
          <Reveal direction="up" delay={0.2} once={true}>
            <div className="grid md:grid-cols-2 gap-6">
              <GlassContainer glassLevel="light" className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Enforcement Mechanisms</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-200">
                    <div className="w-1.5 h-1.5 bg-krim-cyan rounded-full mt-2 flex-shrink-0" />
                    <span className="text-base">Primitive whitelist: AI cannot invent new actions</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-200">
                    <div className="w-1.5 h-1.5 bg-krim-cyan rounded-full mt-2 flex-shrink-0" />
                    <span className="text-base">Pre-execution validation: FDCPA/TCPA rules checked inline</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-200">
                    <div className="w-1.5 h-1.5 bg-krim-cyan rounded-full mt-2 flex-shrink-0" />
                    <span className="text-base">Data isolation: No external data sources, only your systems</span>
                  </li>
                </ul>
              </GlassContainer>
              
              <GlassContainer glassLevel="light" className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Audit & Traceability</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-200">
                    <div className="w-1.5 h-1.5 bg-krim-cyan rounded-full mt-2 flex-shrink-0" />
                    <span className="text-base">Every primitive execution logged with timestamp + context</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-200">
                    <div className="w-1.5 h-1.5 bg-krim-cyan rounded-full mt-2 flex-shrink-0" />
                    <span className="text-base">Policy version tracking: which rules applied when</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-200">
                    <div className="w-1.5 h-1.5 bg-krim-cyan rounded-full mt-2 flex-shrink-0" />
                    <span className="text-base">Regulatory reporting: CFPB/FTC complaint response ready</span>
                  </li>
                </ul>
              </GlassContainer>
            </div>
          </Reveal>
        </div>
      </StarfieldSection>

      {/* Section 5: Real Workflows */}
      <StarfieldSection glassLevel="light" className="relative py-16 border-t border-gray-800">
        <div className="container max-w-5xl mx-auto px-6">
          <Reveal direction="up" once={true}>
            <div className="text-center mb-10">
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-light mb-6 text-center text-white">
                <span className="bg-gradient-to-r from-krim-cyan to-krim-mint bg-clip-text text-transparent">Real Workflows</span> Using Primitives
              </h2>
            </div>
          </Reveal>

          <StaggerGrid staggerDelay={100} className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "30-day past due outreach",
                flow: "CHECK: account_status=30DPD → CHECK: vulnerable_customer=false → POLICY: max_attempts(7/30days) → ACTION: send_sms(template:REG_F_30DPD) → ACTION: log_contact",
                outcome: "TCPA compliant. Same message every account."
              },
              {
                title: "Dispute acknowledgment",
                flow: "CHECK: dispute_type → POLICY: acknowledgment_sla(5_days) → ACTION: create_case → ACTION: send_letter(template:DISPUTE_ACK_V3) → ACTION: start_timer(30_days)",
                outcome: "FCRA timeline enforced automatically."
              }
            ].map((example, idx) => (
              <GlassContainer key={example.title} glassLevel="light" className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">
                  {example.title}
                </h3>
                <div className="bg-slate-900/50 rounded-lg p-3 mb-4">
                  <code className="text-sm text-krim-cyan font-mono break-all leading-relaxed">
                    {example.flow}
                  </code>
                </div>
                <p className="text-base text-gray-200 font-medium">
                  <span className="text-krim-mint font-bold text-lg">→</span> {example.outcome}
                </p>
              </GlassContainer>
            ))}
          </StaggerGrid>
        </div>
      </StarfieldSection>


      {/* Final CTA Section */}
      <StarfieldSection glassLevel="standard" className="relative py-16 border-t border-white/10">
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <Reveal direction="up" once={true}>
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-light text-center text-white">
                <span className="bg-gradient-to-r from-krim-cyan to-krim-mint bg-clip-text text-transparent">Your Policies Enable Safe Superintelligence</span>
              </h2>
              
              <p className="text-xl sm:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto text-center font-medium">
                See how your existing banking policies become the foundation for AI that stays within your rules.
              </p>
              
              <Button 
                size="lg"
                className="bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-cyan hover:from-krim-mint hover:to-krim-cyan text-black font-semibold px-8 py-4"
              >
                See Safe Superintelligence in Action
              </Button>
            </div>
          </Reveal>
        </div>
      </StarfieldSection>
    </StarfieldLayout>
  )
}