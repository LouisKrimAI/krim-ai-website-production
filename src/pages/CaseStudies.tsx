import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCursorGlow } from '../hooks/useCursorGlow'
import Card from '../components/Card'
import Button from '../components/Button'
import { motion } from 'framer-motion'
import { TrendUp, ShieldCheck, Users, CurrencyDollar, ArrowRight, ArrowLeft, CheckCircle, Building, Star, Quotes, Trophy, Target, Lightning } from '@phosphor-icons/react'
import { getDisplayMetric, CUSTOMER_METRICS, ENTERPRISE_CLAIMS } from '../data/claimsRegistry'

export default function CaseStudies(){
  const navigate = useNavigate()
  const mousePosition = useCursorGlow()
  const [selectedCase, setSelectedCase] = useState(0)

  const caseStudies = [
    {
      id: 5,
      industry: "Top Indian Lender",
      company: "Leading NBFC",
      memberCount: "85M+ Customers",
      segment: "Financial Services",
      challenge: "Revolutionizing Collections at Scale",
      executive: "Head of Collections",
      executiveTitle: "Head of Collections",
      painPoints: ["High-volume call ops = high cost, low yield", "Human agents were inconsistent and underperforming", "Fragmented pre-due and bounce workflows", "Diminishing returns despite high overhead"],
      solution: {
        title: "AI-Powered Collections Transformation",
        components: ["Deployed specialized AI agents for Pre-Due, DPD 1–4, and Post-Bounce engagement", "7500 concurrent AI Agents able to fire 8M calls daily", "Live campaign observability with real-time tuning"]
      },
      results: {
        contactRate: "58% → 74%",
        opsCost: "$12M → $1.8M. 85% reduction",
        avgCallTime: "96s → 42s",
        collectionRate: "+ve 55%",
        totalReach: "3.4M borrowers/month"
      },
      testimonial: "Krim didn't just improve ops it flipped the economics of our collections.",
      keyMetric: "Savings, Outcomes, Scale",
      keyMetricLabel: "Leading NBFC",
      story: "A leading Indian NBFC with over 85 million customers re-engineered their collections process using Krim AI's autonomous agentic AI. This move replaced fragmented, high-cost call center operations, leading to a significant boost in collections and a dramatic reduction in operational expenses.",
      pdfUrl: "/resources/KrimAI_CaseStudy_NBFC.pdf"
    },
    {
      id: 6,
      industry: "Public Sector Bank",
      company: "Major Public Sector Bank",
      segment: "Public Sector Banking",
      challenge: "Modernizing Outreach, Ensuring Compliance",
      executive: "Deputy GM, Public Sector Bank",
      executiveTitle: "Deputy GM",
      memberCount: "30M+ Customers",
      painPoints: ["Government-mandated data sovereignty", "Legacy systems incompatible with modern outreach", "Delinquency rising in underserved regions", "Limited human bandwidth for follow-up"],
      solution: {
        title: "Secure, On-Premise AI Deployment",
        components: ["Fully on-prem deployment of Krim OS with secure network integration", "7+ AI agents covering reminder calls, education, welcome calling, fraud detection", "Regional campaigns with multilingual voice agents – 7 Indian languages.", "Tiered journey logic based on borrower risk"]
      },
      results: {
        resolutionRate: "+18%",
        campaignDesignTime: "190%",
        automatedCalls: "3.8M / month",
        complianceViolations: "0",
        complaints: "↓35%"
      },
      testimonial: "Krim AI helped us meet regulatory goals while modernizing our outreach. The cost savings have been significant whilst collection rates have improved. Happy to be part of this AI era.",
      keyMetric: "Collections & Compliance",
      keyMetricLabel: "Public Sector Bank",
      story: "A major public sector bank serving Tier 3 & 4 geographies deployed Krim AI's OS on-premise to modernize their outreach while adhering to strict data sovereignty mandates. The AI-powered system delivered scale and compliance, resulting in a significant increase in resolution rates and a reduction in complaints.",
      pdfUrl: "/resources/KrimAI_CaseStudy_PublicSector.pdf"
    },
    {
      id: 3,
      industry: "Mortgage Lender",
      company: "Large Home Loans Provider",
      portfolio: "$12B Portfolio",
      segment: "Mortgage Servicing",
      challenge: "Compliance Automation",
      executive: "SVP of Servicing",
      executiveTitle: "SVP of Servicing",
      memberCount: "95,000 mortgage accounts",
      painPoints: [
        "High cost of addressing compliance violations",
        "Limited visibility into agent-customer interactions",
        "Complex compliance requirements across multiple states",
        "Lengthy loss mitigation processes"
      ],
      solution: {
        title: "Compliance-First Multi-Agentic Platform",
        components: [
          "Compliance AI monitoring 100% of interactions",
          "Resolver AI for complex loss mitigation cases",
          "MIS Reporter AI for real-time audit trails",
          "Campaign Manager AI for compliant outreach"
        ]
      },
      results: {
        savings: "$2M+ annually",
        contactRate: "+45%",
        memberSatisfaction: "Significant reduction in complaints",
        complianceViolations: "Zero violations in 18 months",
        paybackPeriod: "4 months",
        roi: "450%"
      },
      testimonial: "Perfect compliance at scale seemed impossible until Krim AI. Now we have 100% interaction monitoring with zero violations across 200,000+ customer contacts. The CFPB audit was effortless.",
      keyMetric: "Customer Empathy & Compliant",
      keyMetricLabel: "Compliance Coverage",
      story: "A large US servicer achieved perfect regulatory compliance while improving customer experience. Their Multi-Agent OS now handles complex loss mitigation cases that previously required multiple specialists, reducing processing time from 45 days to 7 days."
    },
    {
      id: 4,
      industry: "Regional Bank",
      company: "A Community Bank",
      portfolio: "$1.8B Total Assets",
      segment: "Community Banking",
      challenge: "Complete Digital Transformation",
      executive: "President",
      executiveTitle: "President",
      memberCount: "45,000 customers",
      painPoints: [
        "Outdated technology compared to fintech competitors",
        "High customer acquisition costs",
        "Negative impact of collections on customer relationships",
        "Lack of 24/7 customer service"
      ],
      solution: {
        title: "Complete Multi-Agentic Banking OS",
        components: [
          "Full spectrum of borrower-facing AI agents",
          "Staff-facing agents for loan officers",
          "AI Copilot for strategic decision support",
          "24/7 customer service automation"
        ]
      },
      results: {
        savings: "$1M+ annually",
        contactRate: "+120%",
        memberSatisfaction: "+25 NPS points",
        complianceViolations: "Zero violations",
        paybackPeriod: "5 months",
        roi: "300%"
      },
      testimonial: "Krim AI gave us fintech capabilities while keeping our community values. We're now the most innovative bank in our market, and customers are choosing us over the big nationals.",
      keyMetric: "387%",
      keyMetricLabel: "Digital ROI",
      story: "A community bank modernized its technology stack in 6 months. Their Multi-Agent OS now provides 24/7 customer service, intelligent loan origination, and empathetic collections—all while maintaining the personal touch that defines community banking."
    }
  ]

  const aggregateResults = {
    totalSavings: "$25M+",
    averageROI: "1-qtr ROI",
    portfolioScale: "$2B+",
    portfolioManaged: "$2B+",
    interactionsProcessed: "200M+",
    complianceViolations: "0",
    customerSatisfaction: "65%+ Contact"
  }

  return (
    <div className="min-h-screen bg-krim-deep-space relative isolate overflow-x-hidden">
      {/* Cursor glow effect */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 136, 0.15), transparent 40%)`
        }}
      />

      {/* Background layer */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-krim-mint/[0.02] via-transparent to-krim-cyan/[0.02]" />
        <div className="absolute inset-0 bg-grid bg-[size:60px_60px] opacity-[0.02]" />
      </div>

      {/* Content wrapper with proper z-index layering */}
      <div className="relative z-10">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <button
            onClick={() => navigate(-1)}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-krim-mint/50 transition-all duration-300 group"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-white group-hover:text-krim-mint transition-colors" />
          </button>
        </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-6 text-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-krim-mint/5 via-transparent to-krim-cyan/5" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-krim-mint/10 rounded-full mb-6">
              <Trophy className="w-4 h-4 text-krim-mint" />
              <span className="text-krim-mint font-medium">Proven Results</span>
            </div>
            
            <div className="flex justify-center mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold w-full max-w-none text-center leading-[1.1] mobile-h1 prevent-orphans">
                <span className="bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent font-black">
                  $25M+ Savings Verified.
                </span>
                <br />
                <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent font-black">
                  Zero Implementation Failures
                </span>
              </h1>
            </div>

            <p className="text-xl lg:text-2xl text-white text-center mb-12 max-w-4xl mx-auto leading-relaxed mobile-body prevent-orphans">
              ROI realized in real-world transformations across 4 implementations.
            </p>

            {/* Key Stats - HIDDEN */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { value: "100%", label: "Success Rate" },
                { value: "90 Days", label: "Payback Period" },
                { value: "$2B+", label: "Debt Collected" },
                { value: "0", label: "Violations" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:shadow-glow hover:scale-105 transition-all duration-300"
                >
                  <div className="text-2xl md:text-3xl font-bold text-krim-mint">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div> */}
          </motion.div>
        </div>
      </section>

      {/* Case Study Selector */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white w-full max-w-none text-center mb-8 text-white">
              Success Stories That
              <span className="text-krim-mint"> Transform Industries</span>
            </h2>
            <p className="text-white text-lg text-center">
              Deep-dive into real transformations across credit servicing segments
            </p>
          </div>

          {/* Industry Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {caseStudies.map((study, index) => (
              <button
                key={study.id}
                onClick={() => setSelectedCase(index)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCase === index
                    ? 'bg-krim-mint text-black shadow-lg shadow-krim-mint/25'
                    : 'bg-white/5 text-krim-mint hover:bg-krim-mint/10 border border-krim-mint/20'
                }`}
              >
                {study.industry}
              </button>
            ))}
          </div>

          {/* Selected Case Study */}
          <motion.div
            key={selectedCase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:shadow-glow hover:scale-105 transition-all duration-300"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-krim-mint/10 to-krim-cyan/10 p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="text-krim-mint font-medium text-sm mb-2 uppercase tracking-wider">
                    {caseStudies[selectedCase].segment}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                    {caseStudies[selectedCase].company}
                  </h3>
                  <p className="text-white">
                    {caseStudies[selectedCase].portfolio} • {caseStudies[selectedCase].memberCount}
                  </p>
                </div>

                <div className="text-center md:text-right">
                  <div className="text-3xl font-bold text-krim-cyan">
                    {caseStudies[selectedCase].keyMetric}
                  </div>
                  <div className="text-sm text-white">
                    {caseStudies[selectedCase].keyMetricLabel}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Challenge & Solution */}
                <div>
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-3 flex items-center gap-2 text-white">
                      <Target className="w-5 h-5 text-krim-coral" />
                      The Challenge
                    </h4>
                    <div className="space-y-2">
                      {caseStudies[selectedCase].painPoints.map((point, i) => (
                        <div key={i} className="text-white text-sm flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-krim-coral rounded-full mt-2 flex-shrink-0" />
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-3 flex items-center gap-2 text-white">
                      <Lightning className="w-5 h-5 text-krim-mint" />
                      Solution Deployed
                    </h4>
                    <div className="bg-krim-mint/5 rounded-lg p-4 mb-3">
                      <div className="font-medium text-krim-mint mb-2">
                        {caseStudies[selectedCase].solution.title}
                      </div>
                    </div>
                    <div className="space-y-2">
                      {caseStudies[selectedCase].solution.components.map((component, i) => (
                        <div key={i} className="text-white text-sm flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-krim-mint mt-0.5 flex-shrink-0" />
                          {component}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Results & Testimonial */}
                <div>
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-3 flex items-center gap-2 text-white">
                      <TrendUp className="w-5 h-5 text-krim-cyan" />
                      Measurable Results
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {Object.entries(caseStudies[selectedCase].results).map(([key, value], i) => (
                        <div key={key} className="bg-white/5 rounded-lg p-3">
                          <div className="text-lg font-bold text-krim-cyan">{value}</div>
                          <div className="text-xs text-white capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Executive Testimonial */}
                  <div className="bg-gradient-to-br from-krim-mint/5 to-krim-cyan/5 rounded-lg p-6 border border-krim-mint/20 hover:shadow-glow hover:scale-105 transition-all duration-300">
                    <Quotes className="w-6 h-6 text-krim-mint mb-3" />
                    <blockquote className="text-white mb-4 italic">
                      "{caseStudies[selectedCase].testimonial}"
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-krim-mint/20 rounded-full flex items-center justify-center">
                        <Building className="w-5 h-5 text-krim-mint" />
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          {caseStudies[selectedCase].executive}
                        </div>
                        <div className="text-sm text-white">
                          {caseStudies[selectedCase].executiveTitle}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Story */}
              <div className="mt-8 p-6 bg-white/5 rounded-lg">
                <h4 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
                  <Star className="w-5 h-5 text-krim-mint" />
                  Success Story
                </h4>
                <p className="text-white leading-relaxed">
                  {caseStudies[selectedCase].story}
                </p>
              </div>

              {/* Book Demo CTA */}
              <div className="mt-8 text-center">
                <Link to="/contact">
                  <Button
                    variant="secondary"
                    size="lg"
                  >
                    Book Demo
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BUILD YOUR ROI & TCO MODEL - NEW ADDITION */}
      <section className="py-16 px-6 bg-gradient-to-b from-black/20 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold w-full max-w-none text-center mb-6 text-white">
              Build Your ROI & TCO Model
            </h2>
            <p className="text-xl text-white mb-12 max-w-2xl mx-auto">
              Get a tailored ROI analysis aligned to your portfolio and policies.
            </p>

            <div className="mb-8">
              <Link to="/contact">
                <Button glow size="lg" className="px-8 py-4 bg-gradient-to-r from-krim-mint to-krim-blue text-black font-bold">
                  Book Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ROI Methodology Transparency - HIDDEN */}
      {/* <section className="py-16 px-6 bg-krim-deep/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white w-full max-w-none text-center mb-8 text-white">
              ROI Methodology
              <span className="text-krim-mint"> Transparency</span>
            </h2>
            <p className="text-white text-lg">
              Our calculations are audited by third-party CPAs and validated against industry benchmarks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 glass-strong border-krim-mint/30" glow hover3D>
              <h3 className="text-2xl font-bold text-krim-mint mb-6 text-white">Savings Calculation Method</h3>
              <div className="space-y-4 text-white">
                <div className="border-b border-white/10 pb-3">
                  <span className="font-semibold text-krim-mint">Collection Improvement Revenue:</span>
                  <br />Active Collections Portfolio (4% of total) × Collection Rate Improvement (7 percentage points: 26% → 33%)
                </div>
                <div className="border-b border-white/10 pb-3">
                  <span className="font-semibold text-krim-mint">Operational Cost Reduction:</span>
                  <br />FTE reduction (1.5 positions) × Fully-loaded cost ($75K per FTE)
                </div>
                <div className="border-b border-white/10 pb-3">
                  <span className="font-semibold text-krim-mint">Implementation Costs:</span>
                  <br />Annual license + Implementation (50% of annual) amortized over first year
                </div>
                <div className="border-b border-white/10 pb-3">
                  <span className="font-semibold text-krim-mint">ROI Formula:</span>
                  <br />(Total Annual Benefit - Total First Year Cost) ÷ Total First Year Cost × 100
                </div>
                <div className="text-sm text-white pt-2">
                  Conservative methodology using industry-standard 4% active collections rate and 7-point improvement.
                </div>
              </div>
            </Card>

            <Card className="p-8 glass-strong border-krim-cyan/30" glow hover3D>
              <h3 className="text-2xl font-bold text-krim-cyan mb-6 text-white">Verification Standards</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-krim-mint mt-1" />
                  <span className="text-white">Third-party CPA audits of all financial claims</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-krim-mint mt-1" />
                  <span className="text-white">90-day measurement periods minimum</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-krim-mint mt-1" />
                  <span className="text-white">Industry benchmark comparisons (McKinsey, Deloitte)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-krim-mint mt-1" />
                  <span className="text-white">Conservative estimation methodology</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-krim-mint mt-1" />
                  <span className="text-white">Customer-approved case study publication</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-krim-mint/10 to-krim-cyan/10 rounded-2xl p-8 border border-krim-mint/20 text-center hover:shadow-glow hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4 text-white">Conservative Calculation Standards</h3>
            <p className="text-white text-lg mb-6">
              All ROI calculations use industry-conservative assumptions: 4% active collections rate, 7-point collection improvement, realistic implementation costs, and defensive modeling.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-krim-mint mb-2">100%</div>
                <div className="text-white text-sm">Cases Independently Audited</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-krim-mint mb-2">Conservative</div>
                <div className="text-white text-sm">Estimation Methodology</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-krim-mint mb-2">Replicable</div>
                <div className="text-white text-sm">Results Across Segments</div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* COMBINED IMPACT ACROSS ALL IMPLEMENTATIONS - REPLACE 13 */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white w-full max-w-none text-center mb-8 text-white">
              Combined Impact Across <span className="text-krim-mint">All Implementations</span>
            </h2>
            <p className="text-white text-lg text-center">
              Aggregate results speak louder than individual victories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
            {[
              { icon: CurrencyDollar, value: aggregateResults.totalSavings, label: "Total Annual Savings", color: "text-krim-mint" },
              { icon: TrendUp, value: aggregateResults.averageROI, label: "Average ROI", color: "text-krim-mint" },
              { icon: Lightning, value: aggregateResults.portfolioScale, label: "Portfolio Scale", color: "text-krim-cyan" },
              { icon: ShieldCheck, value: aggregateResults.complianceViolations, label: "Compliance Violations", color: "text-krim-coral" }
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/10 text-center hover:bg-white/10 hover:shadow-glow hover:scale-105 transition-all duration-300"
              >
                <metric.icon className={`w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 ${metric.color}`} />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">{metric.value}</div>
                <div className="text-xs md:text-sm text-white">{metric.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { value: aggregateResults.portfolioManaged, label: "Portfolio Assets Managed" },
              { value: aggregateResults.interactionsProcessed, label: "AI Interactions Processed" },
              { value: aggregateResults.customerSatisfaction, label: "Customer Satisfaction Lift" }
            ].map((stat, index) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/10 text-center hover:shadow-glow hover:scale-105 transition-all duration-300">
                <div className="text-xl md:text-2xl font-bold text-krim-cyan mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm text-white">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof & Trust Signals - HIDDEN */}
      {/* <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-krim-mint/10 to-krim-cyan/10 rounded-2xl p-8 border border-krim-mint/20 hover:shadow-glow hover:scale-105 transition-all duration-300">
            <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-krim-mint" />
                <span className="text-white">SOC 2 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-krim-mint" />
                <span className="text-white">{getDisplayMetric('provenTrackRecord')} Interactions</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-krim-mint" />
                <span className="text-white">Zero Violations</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-krim-mint" />
                <span className="text-white">{getDisplayMetric('customers')} Institutions</span>
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Evaluate These Verified Results
            </h3>
            <p className="text-white mb-6 text-lg">
              Schedule a technical assessment to review similar implementations in your market segment.
              <br />Conservative ROI projections available based on your portfolio characteristics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button glow size="lg" className="px-8 py-4">
                Calculate My ROI →
              </Button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2">
                Schedule Strategy Call
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-4 border border-krim-mint/50 hover:bg-krim-mint/10 rounded-xl font-medium transition-all duration-300 text-krim-mint">
                Connect With Reference Customer
              </button>
            </div>
          </div>
        </div>
      </section> */}

      {/* YOUR CASE STUDY STARTS TODAY - REPLACE 14 */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold w-full max-w-none text-center mb-6 text-white">
              Your Case Study <span className="text-krim-mint">Starts Today</span>
            </h2>
            <p className="text-xl text-white mb-8">
              While you read about these transformations, your competitors are already implementing theirs.
            </p>
            <p className="text-xl text-krim-mint font-semibold mb-12">
              Don't wait. Your credit servicing revolution is one demo away.
            </p>

            <div className="mb-8">
              <Button glow size="hero" className="px-10 py-5 text-lg bg-gradient-to-r from-krim-mint to-krim-blue text-black font-bold">
                Start My Transformation → →
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      </div> {/* Close content wrapper */}
    </div>
  )
}
