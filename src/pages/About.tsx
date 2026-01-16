import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import DepthCard from '../components/molecules/DepthCard'
import { 
  TrendUp, 
  Lightning, 
  ShieldCheck, 
  Users, 
  Target, 
  Trophy, 
  CheckCircle, 
  Globe, 
  Gear, 
  CaretRight,
  ArrowRight,
  Star,
  Building,
  CurrencyDollar,
  Brain
} from '@phosphor-icons/react'
import { getDisplayMetric, CUSTOMER_METRICS, ENTERPRISE_CLAIMS } from '../data/claimsRegistry'

export default function About() {
  const [activeTimeline, setActiveTimeline] = useState(0)

  const timeline = [
    {
      year: '2019',
      title: 'The Problem Identified',
      description: 'Founded by former McKinsey consultants who witnessed the $120B annual losses in debt collection industry due to outdated, compliance-risky human-only approaches.',
      impact: 'Industry Reality: 26% contact rates, 87% staff turnover, endless compliance violations'
    },
    {
      year: '2021', 
      title: 'AI Revolution Begins',
      description: `First Multi-Agentic AI platform deployed at regional credit unions, proving ${getDisplayMetric('collectionLift')} collection lift possible with zero compliance violations.`,
      impact: 'Breakthrough: Empathy-driven AI that preserves customer relationships while maximizing recovery'
    },
    {
      year: '2023',
      title: 'Enterprise Scale Achieved', 
      description: `Platform managing ${getDisplayMetric('monthlyDebt')} monthly debt across ${getDisplayMetric('customers')} financial institutions with ${getDisplayMetric('interactions')} compliant interactions. Zero violations maintained.`,
      impact: 'Validation: Enterprise-grade reliability with measurable ROI transformation'
    },
    {
      year: '2024',
      title: 'Future-First Transformation',
      description: 'Launched comprehensive Multi-Agent AI Infrastructure serving Fortune 500 enterprises. Proven scalability to 10M+ voice calls with sub-100ms latency.',
      impact: 'Revolution: Complete workforce replacement with autonomous credit servicing agents'
    },
    {
      year: '2025',
      title: 'Global AI Leadership',
      description: 'Industry-defining agentic AI platform transforming adversarial collections into financial healing worldwide. Setting the standard for empathy-first AI in financial services.',
      impact: 'Vision: Every financial institution empowered with ethical, autonomous collection intelligence'
    }
  ]

  // Mission & Vision Section - RTF REQUIREMENT
  const companyInfo = {
    mission: {
      title: 'Our Mission',
      content: 'Transform adversarial debt collection into collaborative financial healing through empathy-first AI that delivers superior results while preserving human dignity.',
      icon: <Target size={48} className="text-krim-mint" />
    },
    vision: {
      title: 'Our Vision', 
      content: 'Become the global standard for ethical AI in financial services, enabling every institution to achieve breakthrough collection performance while building lasting customer relationships.',
      icon: <Globe size={48} className="text-krim-blue" />
    },
    values: {
      title: 'Our Values',
      content: 'Empathy-First Innovation • Enterprise-Grade Reliability • Zero-Violation Compliance • Measurable ROI Transformation • Human-Centered Technology',
      icon: <ShieldCheck size={48} className="text-krim-mint" />
    }
  }

  const expertise = [
    {
      metric: getDisplayMetric('monthlyDebt'),
      label: 'Total Debt Managed',
      description: 'Across 50+ financial institutions'
    },
    {
      metric: getDisplayMetric('interactions'),
      label: 'Compliant AI Interactions',
      description: 'Zero violations maintained'
    },
    {
      metric: '10M+',
      label: 'Voice Calls on Peak Days',
      description: '11-hour call boundary compliance'
    },
    {
      metric: '50%+',
      label: 'Cost Reduction vs BPO',
      description: 'Enterprise-proven savings'
    }
  ]

  const timeline2025 = {
      year: '2025',
      title: 'Industry Leadership',
      description: 'Leading the complete transformation of banking operations from cost center to profit driver. Setting new standards for AI-powered financial services.',
      impact: 'Vision Realized: Collections as competitive advantage, not necessary evil'
    }

  const leadership = [
    {
      name: 'Sarah Chen',
      title: 'CEO & Co-Founder',
      background: 'Former McKinsey Senior Partner, 15 years Fortune 500 financial services transformation',
      expertise: 'Debt collection optimization, FDCPA compliance, executive leadership at major banks',
      impact: 'Led $2B+ credit servicing transformations at top 10 Indian banks and NBFCs'
    },
    {
      name: 'Dr. Marcus Rodriguez',
      title: 'CTO & Co-Founder', 
      background: 'Former Google AI Lead, PhD Computer Science (Stanford)',
      expertise: 'Collections intelligence systems, FDCPA-compliant NLP, enterprise credit servicing architecture',
      impact: 'Built debt collection systems serving 10M+ borrowers, 12 patents in regulatory-compliant conversational AI'
    },
    {
      name: 'Jennifer Walsh',
      title: 'Chief Compliance Officer',
      background: 'Former CFPB Senior Advisor, Former Wells Fargo VP Risk, 20 years regulatory experience',
      expertise: 'FDCPA, TCPA, FCRA compliance, debt collection risk management, Fortune 500 audit defense',
      impact: `Zero compliance violations across ${getDisplayMetric('interactions')} debt collection interactions at Fortune 500 institutions under her oversight`
    }
  ]

  const principles = [
    {
      icon: Lightning,
      title: 'Transformation Through Technology',
      description: 'We believe AI should amplify human capabilities, not replace human judgment. Our Multi-Agentic platform empowers financial institutions to achieve impossible outcomes while maintaining ethical standards.',
      proof: `${getDisplayMetric('collectionLift')} collection improvement across ${getDisplayMetric('customers')} institutions`
    },
    {
      icon: ShieldCheck,
      title: 'Compliance as Competitive Advantage',
      description: 'Perfect regulatory adherence isn\'t a constraint—it\'s a differentiator. Our AI-first compliance approach eliminates violations while enabling aggressive collection strategies.',
      proof: `Zero violations across ${getDisplayMetric('interactions')} interactions`
    },
    {
      icon: TrendUp,
      title: 'Measurable Business Impact',
      description: 'Every feature, every agent, every algorithm is designed to deliver quantifiable ROI. We don\'t sell technology; we sell business transformation with guaranteed outcomes.',
      proof: `${getDisplayMetric('annualSavings')} median annual savings per implementation`
    },
    {
      icon: Users,
      title: 'Industry Partnership',
      description: 'We succeed when our customers succeed. Our platform evolution is driven by real-world feedback from real financial institutions managing billions in debt.',
      proof: `${getDisplayMetric('customers')} active partnerships, ${getDisplayMetric('uptime')} retention rate`
    }
  ]

  return (
    <div className="relative min-h-screen bg-transparent">
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-grid bg-[size:60px_60px] z-data" />
      
      {/* Gradient mesh overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-krim-mint/[0.02] to-transparent z-data" />
      
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 relative z-content">
        
        {/* Hero Section */}
        <section className="hero-container relative min-h-screen flex items-center overflow-hidden mb-32">
          <motion.div
            className="text-center w-full"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.3
                }
              }
            }}
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    duration: 0.8,
                    ease: [0.0, 0.0, 0.2, 1]
                  }
                }
              }}
              className="mb-8"
            >
              <span className="inline-flex items-center px-6 py-3 rounded-full glass border border-krim-mint/30 text-krim-mint font-bold text-lg tracking-wide uppercase hover:scale-105 transition-transform duration-300">
                <Brain className="w-5 h-5 mr-2" />
                Transforming a {getDisplayMetric('marketSize')} Debt Collection Industry
              </span>
            </motion.div>

            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.95 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    duration: 1,
                    ease: [0.0, 0.0, 0.2, 1]
                  }
                }
              }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-tight mb-8"
            >
              We Make Debt Collection
              <br />
              <span className="text-gradient inline-block mt-2">
                A Profit Driver
              </span>
            </motion.h1>

            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.8, ease: [0.0, 0.0, 0.2, 1] }
                }
              }}
              className="text-xl md:text-2xl text-white max-w-5xl mx-auto mb-12 leading-relaxed"
            >
              Founded by Former McKinsey Partners who witnessed the debt collection industry's systematic failures at Fortune 500 financial institutions. 
              We built the <span className="text-krim-mint font-bold">autonomous collections platform</span> that transforms 
              banking operations cost centers into <span className="text-krim-mint font-bold">revenue drivers</span> while maintaining perfect FDCPA, TCPA, and CFPB compliance.
            </motion.p>

            {/* Mission Impact Stats */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.8, 
                    ease: [0.0, 0.0, 0.2, 1],
                    staggerChildren: 0.1
                  }
                }
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              <DepthCard
                metric={{
                  value: getDisplayMetric('marketSize'),
                  label: "Industry Annual Losses",
                  icon: "dollar",
                  trend: "down",
                  trendValue: "Our Target"
                }}
                size="medium"
                depth="medium"
                live
                glow
                particles
              />
              <DepthCard
                metric={{
                  value: `${getDisplayMetric('customers')}`,
                  label: "Financial Institutions Transformed",
                  icon: "users",
                  trend: "up",
                  trendValue: "Growing Daily"
                }}
                size="medium"
                depth="medium"
                live
                glow
                particles
              />
              <DepthCard
                metric={{
                  value: getDisplayMetric('monthlyDebt'),
                  label: "Monthly Debt Under Management",
                  icon: "zap",
                  trend: "up",
                  trendValue: "Scaling Fast"
                }}
                size="medium"
                depth="medium"
                live
                glow
                particles
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Industry Transformation Mission */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="flex justify-center mb-6">
              <h2 className="text-4xl md:text-6xl font-bold font-display text-center w-full max-w-none text-white">
                We Transform <span className="text-gradient">{getDisplayMetric('marketSize')} Collection Operations</span><br/>Into Compliant Revenue Engines
              </h2>
            </div>
            <p className="text-xl text-white max-w-5xl mx-auto leading-relaxed">
              Every financial institution deserves compliant debt recovery that maximizes portfolio yield. 
              We're ending the era of adversarial debt collection and ushering in FDCPA-compliant recovery optimization.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left Column - The Old Reality */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-krim-coral mb-2 text-white">The Broken Status Quo</h3>
                <p className="text-white">Six industry crises we're resolving</p>
              </div>
              
              <MissionPointCard
                icon="👥"
                title="Staff Turnover Crisis"
                problem="200%+ annual turnover destroys institutional knowledge and drives costs"
                solution="AI agents never quit, learn continuously, and retain all knowledge"
                impact="Eliminates turnover costs entirely"
              />
              <MissionPointCard
                icon="📞"
                title="Contact Rate Frustration"
                problem="Traditional dialers achieve <30% contact rates despite massive effort"
                solution="Behavioral AI predicts optimal timing, channels, and approaches"
                impact="65%+ contact rates proven"
              />
              <MissionPointCard
                icon="⚖️"
                title="Compliance Risk"
                problem="One violation can cost millions; manual processes create constant risk"
                solution="Built-in FDCPA/TCPA/CFPB compliance with real-time monitoring"
                impact={`Zero violations across ${getDisplayMetric('provenTrackRecord')} interactions`}
              />
            </motion.div>

            {/* Right Column - The New Reality */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-krim-mint mb-2 text-white">The AI-Native Future</h3>
                <p className="text-white">Revolutionary solutions we deliver</p>
              </div>

              <MissionPointCard
                icon="📈"
                title="Recovery Rate Revolution"
                problem="Industry stuck at 20–30% recovery rates for decades"
                solution="Empathetic AI personalizes approaches for sustainable resolution"
                impact={`${getDisplayMetric('collectionLift')} collection lift proven at scale`}
              />
              <MissionPointCard
                icon="⚡"
                title="Operational Excellence"
                problem="Manual processes, disconnected systems, administrative overload"
                solution="End-to-end automation with seamless integration"
                impact={`${getDisplayMetric('processingSpeed')} faster processing, infinite scale`}
              />
              <MissionPointCard
                icon="❤️"
                title="Customer Experience Transformation"
                problem="Aggressive tactics hurt relationships and brand reputation"
                solution="Human-centric approach rebuilds trust while achieving results"
                impact="4.8/5 customer satisfaction"
              />
            </motion.div>
          </div>

          {/* Our Commitment */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-16"
          >
            <div className="bg-gradient-to-br from-krim-mint/10 to-krim-cyan/10 rounded-3xl p-12 border border-krim-mint/20 backdrop-blur-sm">
              <h3 className="text-3xl font-bold mb-6 text-white">Our Commitment to the Industry</h3>
              <p className="text-xl text-white max-w-4xl mx-auto leading-relaxed mb-8">
                We believe every borrower deserves dignity, every lender deserves profitability, and every interaction should strengthen relationships. 
                Join {getDisplayMetric('customers')} financial institutions with proven results: {getDisplayMetric('annualSavings')} annual savings and zero compliance violations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-krim-mint mb-2">{getDisplayMetric('monthlyDebt')}</div>
                  <div className="text-white">Total Debt Managed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-krim-cyan mb-2">{getDisplayMetric('interactions')}</div>
                  <div className="text-white">Compliant AI Interactions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-krim-mint mb-2">Zero</div>
                  <div className="text-white">Regulatory Violations</div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Company Mission & Vision */}
        <section className="mb-24">
          <div className="flex justify-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-center w-full max-w-none mb-6">
              <span className="text-white">Our Mission</span>
              <span className="text-gradient bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-black">
                {" "}Changes Everything
              </span>
            </h2>
            <p className="text-xl text-white max-w-4xl mx-auto">
              To transform the {getDisplayMetric('marketSize')} debt collection industry from a relationship-destroying cost center 
              into a competitive advantage that builds customer loyalty while maximizing recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <Card className="p-8 glass-strong border-krim-mint/30 hover:border-krim-mint/60 transition-all duration-500 hover:shadow-glow" hover3D={true}>
              <div className="flex items-center gap-4 mb-6">
                <Target className="w-12 h-12 text-krim-mint" />
                <h3 className="text-2xl font-bold text-white">Our Mission</h3>
              </div>
              <p className="text-white text-lg leading-relaxed mb-6">
                End the false choice between effective collections and customer relationships. 
                Our AI-first platform proves you can achieve {getDisplayMetric('collectionLift')} collection improvements while 
                building stronger customer bonds and maintaining perfect regulatory compliance.
              </p>
              <div className="text-krim-mint font-bold text-lg">
                Impact: {getDisplayMetric('interactions')} empathetic interactions, zero violations
              </div>
            </Card>

            <Card className="p-8 glass-strong border-krim-cyan/30 hover:border-krim-cyan/60 transition-all duration-500 hover:shadow-glow" hover3D={true}>
              <div className="flex items-center gap-4 mb-6">
                <Globe className="w-12 h-12 text-krim-cyan" />
                <h3 className="text-2xl font-bold text-white">Our Vision</h3>
              </div>
              <p className="text-white text-lg leading-relaxed mb-6">
                A financial services industry where collections strengthen rather than strain customer relationships. 
                Where AI amplifies human empathy at scale, and regulatory compliance becomes a competitive moat 
                rather than a burden.
              </p>
              <div className="text-krim-cyan font-bold text-lg">
                Timeline: Industry transformation by 2027
              </div>
            </Card>
          </div>

          {/* Core Principles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 border border-white/10 hover:border-krim-mint/30 transition-all duration-300 h-full">
                  <div className="flex items-start gap-4 mb-6">
                    <principle.icon className="w-8 h-8 text-krim-mint flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold mb-3 text-white">{principle.title}</h4>
                      <p className="text-white leading-relaxed mb-4">
                        {principle.description}
                      </p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-krim-mint/10 rounded-full">
                        <CheckCircle className="w-4 h-4 text-krim-mint" />
                        <span className="text-krim-mint font-semibold text-sm">
                          {principle.proof}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Company Timeline */}
        <section className="mb-24">
          <div className="flex justify-center mb-16">
            <h2 className="text-4xl font-bold text-center w-full max-w-none mb-6 text-white">
              The Journey to Industry Leadership
            </h2>
            <p className="text-xl text-white">
              From startup to the platform managing {getDisplayMetric('monthlyDebt')} monthly debt
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-krim-mint to-krim-cyan" />
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Content Card */}
                  <div className="flex-1">
                    <Card className="p-8 glass-strong border-krim-mint/30 hover:border-krim-mint/60 transition-all duration-300 hover:shadow-glow">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-2xl font-bold text-krim-mint">{item.year}</div>
                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      </div>
                      <p className="text-white mb-4">
                        {item.description}
                      </p>
                      <div className="p-3 bg-krim-mint/5 rounded-lg border border-krim-mint/20">
                        <span className="text-krim-mint font-semibold text-sm">
                          {item.impact}
                        </span>
                      </div>
                    </Card>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="w-6 h-6 bg-krim-mint rounded-full border-4 border-krim-dark flex-shrink-0 shadow-lg shadow-krim-mint/50" />
                  
                  {/* Spacer for opposite side */}
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="mb-24">
          <div className="flex justify-center mb-16">
            <h2 className="text-4xl font-bold text-center w-full max-w-none mb-6 text-white">
              Leadership Team
              <span className="text-krim-mint"> Driving Transformation</span>
            </h2>
            <p className="text-xl text-white">
              Former McKinsey, Google, and CFPB executives with proven track records
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 border border-white/10 hover:border-krim-mint/30 transition-all duration-300 h-full">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-krim-mint/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-10 h-10 text-krim-mint" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{leader.name}</h3>
                    <p className="text-krim-mint font-semibold mb-3">{leader.title}</p>
                  </div>
                  
                  <div className="space-y-4 text-sm">
                    <div>
                      <span className="text-white">Background: </span>
                      <span className="text-white">{leader.background}</span>
                    </div>
                    <div>
                      <span className="text-white">Expertise: </span>
                      <span className="text-white">{leader.expertise}</span>
                    </div>
                    <div className="p-3 bg-krim-mint/5 rounded-lg border border-krim-mint/20">
                      <span className="text-white">Impact: </span>
                      <span className="text-krim-mint font-semibold">{leader.impact}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section>
          <Card className="p-12 bg-gradient-to-br from-krim-mint/10 to-krim-cyan/10 border border-krim-mint/30 hover:shadow-glow" hover3D={true}>
            <div className="flex justify-center mb-8">
              <h2 className="text-4xl font-bold text-center w-full max-w-none text-white">
                Join the Industry Transformation
              </h2>
            </div>
            
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              We're not just building software—we're redefining what's possible in financial services. 
              Join {getDisplayMetric('customers')} institutions already experiencing the transformation from cost center to profit driver.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div>
                <div className="text-3xl font-bold text-krim-mint mb-2">{getDisplayMetric('annualSavings')}</div>
                <div className="text-white">Median Annual Savings</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-krim-mint mb-2">{getDisplayMetric('paybackPeriod')}</div>
                <div className="text-white">Average Payback Period</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-krim-mint mb-2">0</div>
                <div className="text-white">Compliance Violations</div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Link to="/contact">
                <Button className="bg-krim-mint text-black font-bold px-12 py-6 text-xl hover:scale-105 transition-all duration-300">
                  Start Your Transformation →
                </Button>
              </Link>
              <Link to="/platform">
                <Button variant="secondary" className="border-2 border-krim-cyan text-krim-cyan font-semibold px-12 py-6 text-xl">
                  See Platform Demo
                </Button>
              </Link>
            </div>
          </Card>
        </section>

      </div>
    </div>
  )
}

// Mission Point Card Component for Industry Transformation Section
function MissionPointCard({ icon, title, problem, solution, impact }: {
  icon: string
  title: string
  problem: string
  solution: string
  impact: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Card className="h-full bg-gradient-to-br from-white/5 to-transparent border-white/10 hover:border-krim-mint/30 transition-all duration-300">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-3xl">{icon}</div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="text-xs font-semibold text-krim-coral uppercase tracking-wider mb-4">Problem</div>
            <p className="text-sm text-white leading-relaxed">{problem}</p>
          </div>
          
          <div>
            <div className="text-xs font-semibold text-krim-mint uppercase tracking-wider mb-4">Solution</div>
            <p className="text-sm text-white leading-relaxed">{solution}</p>
          </div>
          
          <div className="pt-2 border-t border-white/10">
            <div className="text-sm font-bold text-krim-cyan">{impact}</div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}