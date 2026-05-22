/**
 * KRIYA PRIMITIVES - The Building Blocks of Safe Agentic Automation
 * Compact glassmorphic design with emerald/mint accent theme
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
  Reveal
} from '../components/motion/primitives'

// Simple Primitive List Component for Hero
function PrimitiveList() {
  return (
    <div className="backdrop-blur-md bg-gradient-to-br from-emerald-500/[0.05] to-krim-mint/[0.02] border border-white/[0.06] rounded-2xl px-6 py-5">
      <div className="space-y-5">
        <h3 className="text-lg font-bold text-white mb-5">How Kriya Controls Execution:</h3>
        <div className="space-y-4">
          {[
            { title: 'Every action requires a primitive', desc: 'Only pre-defined, approved operations execute' },
            { title: 'Policies enforced before execution', desc: 'Your rules checked in real-time before each action' },
            { title: 'Complete audit trail', desc: 'Every action logged for regulatory compliance' },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-white">{item.title}</div>
                <div className="text-sm text-white/55">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
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

      {/* Hero Section */}
      <StarfieldSection glassLevel="ultraLight" className="relative min-h-[700px] lg:min-h-[800px] xl:min-h-[900px] flex items-center py-20 md:py-28">
        <div className="w-full max-w-6xl mx-auto px-6">
          <div className="text-center">
            {/* Kriya Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[1.1] tracking-tight"
            >
              <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent font-black">
                Kriya Primitives™
              </span>
            </motion.h2>

            {/* Sub-heading */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto font-light tracking-wide mb-10 leading-relaxed"
            >
              Governed Building Blocks
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-16 leading-relaxed"
            >
              Define operations as governed primitives. Every action stays within your policies. Update rules once, enforce everywhere.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center mb-16"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-cyan hover:from-krim-mint hover:to-krim-cyan text-black font-semibold rounded-xl px-8 py-3.5"
              >
                Review Compliance Controls
              </Button>
            </motion.div>
          </div>
        </div>
      </StarfieldSection>

      {/* How Kriya Controls AI */}
      <StarfieldSection glassLevel="light" className="relative py-20 md:py-28 border-t border-slate-800">
        <div className="container max-w-4xl mx-auto px-6">
          <Reveal direction="up" once={true}>
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">How Kriya Controls Execution</span>
              </h2>
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.2} once={true}>
            <PrimitiveList />
          </Reveal>
        </div>
      </StarfieldSection>


      {/* Section 2: The Five Primitive Types */}
      <StarfieldSection glassLevel="light" className="relative py-20 md:py-28 border-t border-slate-800">
        <div className="container max-w-6xl mx-auto px-6">
          <Reveal direction="up" once={true}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.2] mb-6 text-center">
                <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">Five Building Blocks for Governance</span>
              </h2>
            </div>
          </Reveal>

          {/* Primitive Types Grid - 2-3 Layout */}
          <div className="space-y-5 mb-12">
            {/* Top row: 2 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
              {[
                {
                  title: "Actions",
                  text: "Send notifications respecting schedules. Make calls with retry logic. Update entity status. Trigger external system events.",
                  accentColor: "from-emerald-400 to-mint-400",
                },
                {
                  title: "Checks",
                  text: "Verify entity eligibility. Check time-based conditions. Confirm permission status. Validate against external rules.",
                  accentColor: "from-emerald-400 to-krim-mint",
                }
              ].map((primitive, idx) => {
                const Icon = primitiveIcons[idx]
                return (
                  <motion.div
                    key={primitive.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                    whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                    className="group relative backdrop-blur-md bg-gradient-to-br from-emerald-500/[0.05] to-krim-mint/[0.02] group-hover:from-emerald-500/[0.12] group-hover:to-krim-mint/[0.06] border border-white/[0.08] hover:border-emerald-400/50 rounded-2xl p-7 transition-all duration-500 overflow-hidden group-hover:shadow-[0_8px_32px_rgba(16,185,129,0.15)]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400/15 to-krim-mint/5 border border-emerald-400/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-emerald-400/30">
                        <Icon className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                          {primitive.title}
                        </h3>
                        <p className="text-sm text-white/55 leading-relaxed">
                          {primitive.text}
                        </p>
                      </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-emerald-400 via-krim-mint/60 to-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </motion.div>
                )
              })}
            </div>

            {/* Bottom row: 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {[
                {
                  title: "Policies",
                  text: "Action frequency limits. Conditional execution rules. Threshold-based constraints. Time-window restrictions.",
                },
                {
                  title: "Templates",
                  text: "Pre-written message templates. Standard response forms. Approved document schemas. Regulated content language.",
                },
                {
                  title: "Data & Scope",
                  text: "Role-based field access. Scope restrictions by context. Attribute-level visibility controls. Context-aware data boundaries.",
                }
              ].map((primitive, idx) => {
                const Icon = primitiveIcons[idx + 2]
                return (
                  <motion.div
                    key={primitive.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                    whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                    className="group relative backdrop-blur-md bg-gradient-to-br from-emerald-500/[0.05] to-krim-mint/[0.02] group-hover:from-emerald-500/[0.12] group-hover:to-krim-mint/[0.06] border border-white/[0.08] hover:border-emerald-400/50 rounded-2xl p-7 transition-all duration-500 overflow-hidden group-hover:shadow-[0_8px_32px_rgba(16,185,129,0.15)]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400/15 to-krim-mint/5 border border-emerald-400/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-emerald-400/30">
                        <Icon className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                          {primitive.title}
                        </h3>
                        <p className="text-sm text-white/55 leading-relaxed">
                          {primitive.text}
                        </p>
                      </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-emerald-400 via-krim-mint/60 to-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </motion.div>
                )
              })}
            </div>
          </div>

          <Reveal direction="up" delay={0.5} once={true}>
            <div className="text-center">
              <div className="backdrop-blur-md bg-gradient-to-br from-emerald-500/[0.05] to-krim-mint/[0.02] border border-white/[0.06] rounded-2xl px-6 py-5 max-w-4xl mx-auto">
                <p className="text-sm text-white/55 text-center">
                  <span className="bg-gradient-to-r from-emerald-400 to-krim-mint bg-clip-text text-transparent font-bold">Each primitive:</span> defined inputs/outputs, policy validation, <span className="bg-gradient-to-r from-emerald-400 to-krim-mint bg-clip-text text-transparent font-bold">full audit trail</span>.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </StarfieldSection>

      {/* Section 3: Stack Position */}
      <StarfieldSection glassLevel="standard" className="relative py-20 md:py-28 border-t border-gray-800">
        <div className="container max-w-4xl mx-auto px-6">
          <Reveal direction="up" once={true}>
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center">
                <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">Architecture:</span>{' '}
                <span className="text-white">Primitives at the Foundation</span>
              </h2>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.2} once={true}>
            <div className="backdrop-blur-md bg-gradient-to-br from-emerald-500/[0.05] to-krim-mint/[0.02] border border-white/[0.06] rounded-2xl px-6 py-5">
              <div className="space-y-3">
                {[
                  { layer: 'Layer 1:', text: 'Kriya Primitives (atomic operations + policies)' },
                  { layer: 'Layer 2:', text: 'Kendra Runtime (orchestration + enforcement)' },
                  { layer: 'Layer 3:', text: 'Karta/Kula/Kupa (AI applications using primitives)' },
                ].map((item) => (
                  <div key={item.layer} className="flex items-center gap-3">
                    <span className="font-mono font-semibold text-sm text-white/55">{item.layer}</span>
                    <span className="text-sm text-white/55">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-white/[0.06] text-sm text-white/55">
                <span className="bg-gradient-to-r from-emerald-400 to-krim-mint bg-clip-text text-transparent font-bold">Change a primitive</span> → automatically updates across all applications. <span className="bg-gradient-to-r from-emerald-400 to-krim-mint bg-clip-text text-transparent font-bold">Version controlled. Audit logged.</span>
              </div>
            </div>
          </Reveal>
        </div>
      </StarfieldSection>

      {/* Section 4: Compliance Mechanisms */}
      <StarfieldSection glassLevel="standard" className="relative py-20 md:py-28 border-t border-white/10">
        <div className="container max-w-5xl mx-auto px-6">
          <Reveal direction="up" once={true}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-10">
              <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">Regulatory Compliance</span>{' '}
              <span className="text-white">Through Constraint</span>
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.2} once={true}>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  title: 'Enforcement Mechanisms',
                  items: [
                    'Primitive whitelist: AI cannot invent new actions',
                    'Pre-execution validation: Regulatory rules checked inline',
                    'Data isolation: No external data sources, only your systems',
                  ]
                },
                {
                  title: 'Audit & Traceability',
                  items: [
                    'Every primitive execution logged with timestamp + context',
                    'Policy version tracking: which rules applied when',
                    'Regulatory reporting: Regulatory complaint response ready',
                  ]
                }
              ].map((card) => (
                <div
                  key={card.title}
                  className="group relative backdrop-blur-md bg-gradient-to-br from-emerald-500/[0.05] to-krim-mint/[0.02] hover:from-emerald-500/[0.12] hover:to-krim-mint/[0.06] border border-white/[0.08] hover:border-emerald-400/50 rounded-2xl p-7 transition-all duration-500 overflow-hidden hover:shadow-[0_8px_32px_rgba(16,185,129,0.15)]"
                >
                  <h3 className="text-lg font-bold text-white mb-5">{card.title}</h3>
                  <ul className="space-y-3">
                    {card.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0" />
                        <span className="text-sm text-white/55">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-emerald-400 via-krim-mint/60 to-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </StarfieldSection>

      {/* Section 5: Real Workflows */}
      <StarfieldSection glassLevel="light" className="relative py-20 md:py-28 border-t border-gray-800">
        <div className="container max-w-5xl mx-auto px-6">
          <Reveal direction="up" once={true}>
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center">
                <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">Real Workflows</span>{' '}
                <span className="text-white">Using Primitives</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                title: "Automated escalation workflow",
                flow: "CHECK: severity_threshold → CHECK: user_role_eligible → POLICY: max_actions_per_hour(5) → ACTION: send_notification(template:ESCALATION_V2) → ACTION: create_ticket",
                outcome: "Consistent execution. Policies enforced on every trigger."
              },
              {
                title: "Request processing pipeline",
                flow: "CHECK: request_type → POLICY: sla_window(24_hours) → ACTION: validate_data → ACTION: send_confirmation(template:ACK_V1) → ACTION: log_transaction",
                outcome: "Repeatable process. Zero policy violations."
              }
            ].map((example, idx) => (
              <motion.div
                key={example.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                className="group relative backdrop-blur-md bg-gradient-to-br from-emerald-500/[0.05] to-krim-mint/[0.02] group-hover:from-emerald-500/[0.12] group-hover:to-krim-mint/[0.06] border border-white/[0.08] hover:border-emerald-400/50 rounded-2xl p-7 transition-all duration-500 overflow-hidden group-hover:shadow-[0_8px_32px_rgba(16,185,129,0.15)]"
              >
                <h3 className="text-lg font-bold text-white mb-4">
                  {example.title}
                </h3>
                <div className="bg-black/20 rounded-lg p-3 mb-4">
                  <code className="text-xs text-emerald-400 font-mono break-all leading-relaxed">
                    {example.flow}
                  </code>
                </div>
                <p className="text-sm text-white/55">
                  <span className="text-krim-mint font-bold">→</span> {example.outcome}
                </p>
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-emerald-400 via-krim-mint/60 to-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            ))}
          </div>
        </div>
      </StarfieldSection>


      {/* Final CTA Section */}
      <StarfieldSection glassLevel="standard" className="relative py-20 md:py-28 border-t border-white/10">
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <Reveal direction="up" once={true}>
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center">
                <span className="bg-gradient-to-r from-krim-mint via-krim-cyan to-krim-mint bg-clip-text text-transparent">Policies Become Execution</span>
              </h2>

              <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto text-center leading-relaxed">
                Your governance rules turn directly into automated workflows that never break compliance.
              </p>

              <Button
                size="lg"
                className="bg-gradient-to-r from-krim-cyan via-krim-mint to-krim-cyan hover:from-krim-mint hover:to-krim-cyan text-black font-semibold rounded-xl px-8 py-3.5"
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
