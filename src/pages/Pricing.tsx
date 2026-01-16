import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import Card from '../components/Card'
import MetricsBeforeFooter from '../components/MetricsBeforeFooter'
import { useCursorGlow } from '../hooks/useCursorGlow'
import { ArrowLeft } from '@phosphor-icons/react'

// Pricing Calculator Component
function PricingCalculator({ tier, deployment, agreement }: {
  tier: string
  deployment: string
  agreement: string
}) {
  // Base pricing by tier
  const basePricing = {
    tier1: 150000,  // 20k+ borrowers
    tier2: 300000,  // 200k+ borrowers
    tier3: 600000,  // 2M+ borrowers
    tier4: 1200000  // 5M+ borrowers
  }

  // Deployment multipliers
  const deploymentMultiplier = {
    cloud: 1.0,     // Multi-tenant cloud
    private: 1.5    // Private cloud/on-prem
  }

  // Agreement discounts
  const agreementDiscount = {
    monthly: 1.0,     // 0% discount
    quarterly: 0.85,  // 15% discount
    annual: 0.75,     // 25% discount
    threeyear: 0.65   // 35% discount
  }

  const basePrice = basePricing[tier as keyof typeof basePricing]
  const deploymentPrice = basePrice * deploymentMultiplier[deployment as keyof typeof deploymentMultiplier]
  const finalPrice = deploymentPrice * agreementDiscount[agreement as keyof typeof agreementDiscount]

  const tierLabels = {
    tier1: 'Tier 1 (20k+ borrowers)',
    tier2: 'Tier 2 (200k+ borrowers)',
    tier3: 'Tier 3 (2M+ borrowers)',
    tier4: 'Tier 4 (5M+ borrowers)'
  }

  const deploymentLabels = {
    cloud: 'Multi-tenant Cloud',
    private: 'Private Cloud/On-Prem'
  }

  const agreementLabels = {
    monthly: 'Monthly',
    quarterly: 'Quarterly',
    annual: 'Annual',
    threeyear: '3 Year'
  }

  return (
    <Card className="p-8 border-2 border-krim-mint/50 bg-gradient-to-br from-krim-mint/10 to-krim-deep/50">
      <h3 className="text-3xl font-bold text-white text-center mb-8 font-display w-full max-w-none text-white">Your Custom Pricing</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Configuration Summary */}
        <div>
          <h4 className="text-xl font-bold text-krim-mint mb-6 text-white">Configuration</h4>
          <div className="space-y-4">
            <div className="flex justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-white">Customer Tier:</span>
              <span className="text-white font-semibold">{tierLabels[tier as keyof typeof tierLabels]}</span>
            </div>
            <div className="flex justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-white">Deployment:</span>
              <span className="text-white font-semibold">{deploymentLabels[deployment as keyof typeof deploymentLabels]}</span>
            </div>
            <div className="flex justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-white">Agreement:</span>
              <span className="text-white font-semibold">{agreementLabels[agreement as keyof typeof agreementLabels]}</span>
            </div>
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div>
          <h4 className="text-xl font-bold text-krim-cyan mb-6 text-white">Pricing Breakdown</h4>
          <div className="space-y-4">
            <div className="flex justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-white">Base Price:</span>
              <span className="text-white">${(basePrice / 1000).toLocaleString()}K</span>
            </div>
            {deployment === 'private' && (
              <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">Private Cloud Premium:</span>
                <span className="text-krim-coral">+50%</span>
              </div>
            )}
            {agreement !== 'monthly' && (
              <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">Agreement Discount:</span>
                <span className="text-krim-mint">-{Math.round((1 - agreementDiscount[agreement as keyof typeof agreementDiscount]) * 100)}%</span>
              </div>
            )}
            <div className="flex justify-between p-4 bg-krim-mint/10 border-2 border-krim-mint/30 rounded-lg">
              <span className="text-white font-bold text-lg">Annual Price:</span>
              <span className="text-krim-mint font-bold text-2xl font-display">${(finalPrice / 1000).toLocaleString()}K</span>
            </div>
            {agreement !== 'annual' && (
              <div className="text-center text-white text-sm">
                {agreement === 'monthly' && `Monthly: $${Math.round(finalPrice / 12 / 1000)}K`}
                {agreement === 'quarterly' && `Quarterly: $${Math.round(finalPrice / 4 / 1000)}K`}
                {agreement === 'threeyear' && `Total 3-year: $${Math.round(finalPrice * 3 / 1000).toLocaleString()}K`}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function Pricing(){
  const navigate = useNavigate()
  const [selectedTier, setSelectedTier] = useState<string>('tier2')
  const [selectedDeployment, setSelectedDeployment] = useState<string>('cloud')
  const [selectedAgreement, setSelectedAgreement] = useState<string>('annual')
  const mousePosition = useCursorGlow()

  // Generate pricing configuration for contact form
  const getPricingConfig = (plan: string, tier: string, portfolioSize: string) => ({
    pricingConfig: {
      plan,
      tier,
      deployment: selectedDeployment,
      agreement: selectedAgreement,
      portfolioSize
    }
  })

  return (
    <div className="relative isolate bg-krim-deep-space overflow-x-hidden">
      {/* Cursor glow effect */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 136, 0.15), transparent 40%)`
        }}
      />


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

      {/* Z1: Hero Section */}
      <section className="hero-container relative pt-12 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-content text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-[1.1] mb-8 text-white"
          >
            Propel your business<br />
            <span className="text-gradient">
              into the agentic AI era
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl lg:text-2xl text-white text-center mb-12 max-w-4xl mx-auto leading-relaxed mobile-body prevent-orphans"
          >
            Join visionary companies who have stopped managing and started maximizing their loan portfolios
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/contact" state={getPricingConfig('Elite', 'Professional', '200k+ borrowers')}>
              <Button size="lg" magnetic glow className="px-8 py-4 text-lg font-bold">
                Start Your Free Trial →
              </Button>
            </Link>
            <Link to="/contact" state={getPricingConfig('Demo', 'Schedule', 'Variable')}>
              <Button variant="secondary" size="lg" className="px-8 py-4 text-lg font-semibold border-2 border-white/30 hover:border-white/60">
                Schedule Demo
              </Button>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-content">

        {/* Pricing Plans Section */}
        <motion.section
          className="mb-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <h2 className="text-3xl md:text-4xl font-bold text-white w-full max-w-none text-center">Choose Your Plan</h2>
            </div>
            <div className="w-full flex justify-center mb-8">
              <p className="text-xl text-white">Scalable solutions for every portfolio size</p>
            </div>

            {/* Configuration Toggles */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Deployment Options */}
                <div className="text-center">
                  <h3 className="text-lg font-bold text-white mb-4 font-display text-white">Deployment</h3>
                  <div className="inline-flex bg-white/10 rounded-lg p-1 backdrop-blur-sm w-full max-w-md">
                    <button
                      type="button"
                      onClick={() => setSelectedDeployment('cloud')}
                      className={`px-3 sm:px-6 py-3 min-h-[48px] rounded-md transition-all duration-300 font-semibold text-sm sm:text-base flex-1 ${
                        selectedDeployment === 'cloud'
                          ? 'bg-krim-mint text-black'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      Multi-tenant Cloud
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedDeployment('private')}
                      className={`px-3 sm:px-6 py-3 min-h-[48px] rounded-md transition-all duration-300 font-semibold text-sm sm:text-base flex-1 ${
                        selectedDeployment === 'private'
                          ? 'bg-krim-mint text-black'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      Private/On-Premise
                    </button>
                  </div>
                </div>

                {/* Agreement Options */}
                <div className="text-center">
                  <h3 className="text-lg font-bold text-white mb-4 font-display text-white">Agreement Term</h3>
                  <div className="inline-flex bg-white/10 rounded-lg p-1 backdrop-blur-sm w-full max-w-md overflow-x-auto">
                    <button
                      type="button"
                      onClick={() => setSelectedAgreement('monthly')}
                      className={`px-2 sm:px-3 py-3 min-h-[48px] rounded-md transition-all duration-300 font-semibold text-xs sm:text-sm relative flex-1 min-w-[60px] sm:min-w-[80px] ${
                        selectedAgreement === 'monthly'
                          ? 'bg-krim-mint text-black'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <div>Monthly</div>
                      <div className={`text-[10px] sm:text-xs ${selectedAgreement === 'monthly' ? 'text-black' : 'text-white'}`}>0% off</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedAgreement('quarterly')}
                      className={`px-2 sm:px-3 py-3 min-h-[48px] rounded-md transition-all duration-300 font-semibold text-xs sm:text-sm relative flex-1 min-w-[70px] sm:min-w-[90px] ${
                        selectedAgreement === 'quarterly'
                          ? 'bg-krim-mint text-black'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <div>Quarterly</div>
                      <div className={`text-[10px] sm:text-xs font-bold ${selectedAgreement === 'quarterly' ? 'text-black' : 'text-white'}`}>15% off</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedAgreement('annual')}
                      className={`px-2 sm:px-3 py-3 min-h-[48px] rounded-md transition-all duration-300 font-semibold text-xs sm:text-sm relative flex-1 min-w-[60px] sm:min-w-[80px] ${
                        selectedAgreement === 'annual'
                          ? 'bg-krim-mint text-black'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <div>Annual</div>
                      <div className={`text-[10px] sm:text-xs font-bold ${selectedAgreement === 'annual' ? 'text-black' : 'text-white'}`}>25% off</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedAgreement('threeyear')}
                      className={`px-2 sm:px-3 py-3 min-h-[48px] rounded-md transition-all duration-300 font-semibold text-xs sm:text-sm relative flex-1 min-w-[60px] sm:min-w-[80px] ${
                        selectedAgreement === 'threeyear'
                          ? 'bg-krim-mint text-black'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <div>3-Year</div>
                      <div className={`text-[10px] sm:text-xs font-bold ${selectedAgreement === 'threeyear' ? 'text-black' : 'text-white'}`}>35% off</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 xl:gap-8">
            {/* Starter Plan - Tier 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="relative p-6 glass-strong border-krim-mint/30 hover:border-krim-mint/60 transition-all duration-500 hover:shadow-xl hover:shadow-krim-mint/20 h-full flex flex-col" hover3D={true}>
                <div className="mb-6">
                  <h3 className="text-2xl font-black text-krim-mint mb-2 font-display text-white">Pioneer</h3>
                  <p className="text-white mb-4 text-sm">Start your agentic transformation journey</p>
                  <p className="text-krim-mint text-sm font-black">20k+ borrowers minimum</p>
                </div>

                <ul className="space-y-3 mb-6 flex-grow text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-krim-mint text-sm mt-0.5">✓</span>
                    <span className="text-white">Core 4 AI agents</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-krim-mint text-sm mt-0.5">✓</span>
                    <span className="text-white">Standard integrations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-krim-mint text-sm mt-0.5">✓</span>
                    <span className="text-white">Email/phone support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-krim-mint text-sm mt-0.5">✓</span>
                    <span className="text-white">Basic reporting dashboard</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-krim-mint text-sm mt-0.5">✓</span>
                    <span className="text-white">FDCPA compliance monitoring</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-krim-mint text-sm mt-0.5">✓</span>
                    <span className="text-white">4-6 week implementation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-krim-mint text-sm mt-0.5">✓</span>
                    <span className="text-white">Multi-tenant cloud</span>
                  </li>
                </ul>

                <Link to="/contact" state={getPricingConfig('Pioneer', 'Starter', '20k+ borrowers')} className="block">
                  <Button className="w-full border-2 border-krim-mint bg-krim-mint text-black hover:bg-transparent hover:text-black transition-all duration-300 font-semibold !h-[48px] flex items-center justify-center">
                    Get Started
                  </Button>
                </Link>
              </Card>
            </motion.div>

            {/* Professional Plan - Tier 2 - Featured */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="relative p-6 border-3 border-krim-mint bg-gradient-to-br from-krim-mint/15 to-krim-deep/80 h-full flex flex-col" hover3D={true} glow={true}>
                <div className="mb-6">
                  <h3 className="text-2xl font-black text-krim-mint mb-2 font-display text-white">Elite</h3>
                  <p className="text-white mb-4 text-sm">Accelerate performance with complete AI workforce</p>
                  <p className="text-krim-mint text-sm font-black">200k+ borrowers minimum</p>
                </div>

                <ul className="space-y-3 mb-6 flex-grow text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-krim-mint text-sm mt-0.5 font-semibold">✓</span>
                    <span className="text-white font-semibold">Everything in Pioneer, plus:</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-krim-mint text-sm mt-0.5">✓</span>
                    <span className="text-white">All 12 AI agents</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-krim-mint text-sm mt-0.5">✓</span>
                    <span className="text-white">Custom integrations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-krim-mint text-sm mt-0.5">✓</span>
                    <span className="text-white">Dedicated success manager</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-krim-mint text-sm mt-0.5">✓</span>
                    <span className="text-white">Advanced analytics suite</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-krim-mint text-sm mt-0.5">✓</span>
                    <span className="text-white">Priority support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-krim-mint text-sm mt-0.5">✓</span>
                    <span className="text-white">2-4 week implementation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-krim-mint text-sm mt-0.5">✓</span>
                    <span className="text-white">Enhanced compliance suite</span>
                  </li>
                </ul>

                <Link to="/contact" state={getPricingConfig('Elite', 'Professional', '200k+ borrowers')} className="block">
                  <Button className="w-full border-2 border-krim-mint bg-krim-mint text-black hover:bg-transparent hover:text-black transition-all duration-300 font-semibold !h-[48px] flex items-center justify-center">
                    Contact Sales
                  </Button>
                </Link>
              </Card>
            </motion.div>

            {/* Enterprise Plan - Tier 3 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="relative p-6 glass-strong border-krim-cyan/30 hover:border-krim-cyan/60 transition-all duration-500 hover:shadow-xl hover:shadow-krim-cyan/20 h-full flex flex-col" hover3D={true}>
                <div className="mb-6">
                  <h3 className="text-2xl font-black text-krim-cyan mb-2 font-display text-white">Legend</h3>
                  <p className="text-white mb-4 text-sm">Dominate markets with dedicated AI infrastructure</p>
                  <p className="text-krim-mint text-sm font-black">2M+ borrowers minimum</p>
                </div>

                <ul className="space-y-3 mb-6 flex-grow text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-krim-cyan text-sm mt-0.5 font-semibold">✓</span>
                    <span className="text-white font-semibold">Everything in Elite, plus:</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-krim-cyan text-sm mt-0.5">✓</span>
                    <span className="text-white">24/7 priority support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-krim-cyan text-sm mt-0.5">✓</span>
                    <span className="text-white">Dedicated infrastructure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-krim-cyan text-sm mt-0.5">✓</span>
                    <span className="text-white">Custom SLA agreements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-krim-cyan text-sm mt-0.5">✓</span>
                    <span className="text-white">1-2 week implementation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-krim-cyan text-sm mt-0.5">✓</span>
                    <span className="text-white">Private cloud option</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-krim-cyan text-sm mt-0.5">✓</span>
                    <span className="text-white">Advanced security features</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-krim-cyan text-sm mt-0.5">✓</span>
                    <span className="text-white">White-label options</span>
                  </li>
                </ul>

                <Link to="/contact" state={getPricingConfig('Legend', 'Enterprise', '2M+ borrowers')} className="block">
                  <Button className="w-full border-2 border-krim-mint bg-krim-mint text-black hover:bg-transparent hover:text-black transition-all duration-300 font-semibold !h-[48px] flex items-center justify-center">
                    Contact Sales
                  </Button>
                </Link>
              </Card>
            </motion.div>

            {/* Premium Plan - Tier 4 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="relative p-6 glass-strong border-krim-coral/30 hover:border-krim-coral/60 transition-all duration-500 hover:shadow-xl hover:shadow-krim-coral/20 h-full flex flex-col" hover3D={true}>
                <div className="mb-6">
                  <h3 className="text-2xl font-black text-krim-coral mb-2 font-display text-white">Icon</h3>
                  <p className="text-white mb-4 text-sm">Redefine industry standards with unlimited possibilities</p>
                  <p className="text-krim-mint text-sm font-black">5M+ borrowers minimum</p>
                </div>

                <ul className="space-y-3 mb-6 flex-grow text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-krim-coral text-sm mt-0.5 font-semibold">✓</span>
                    <span className="text-white font-semibold">Everything in Legend, plus:</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-krim-coral text-sm mt-0.5">✓</span>
                    <span className="text-white">Custom agent development</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-krim-coral text-sm mt-0.5">✓</span>
                    <span className="text-white">On-premise deployment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-krim-coral text-sm mt-0.5">✓</span>
                    <span className="text-white">Dedicated technical team</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-krim-coral text-sm mt-0.5">✓</span>
                    <span className="text-white">Multi-region deployment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-krim-coral text-sm mt-0.5">✓</span>
                    <span className="text-white">API access & customization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-krim-coral text-sm mt-0.5">✓</span>
                    <span className="text-white">Executive reporting</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-krim-coral text-sm mt-0.5">✓</span>
                    <span className="text-white">Priority feature requests</span>
                  </li>
                </ul>

                <Link to="/contact" state={getPricingConfig('Icon', 'Premium', '5M+ borrowers')} className="block">
                  <Button className="w-full border-2 border-krim-mint bg-krim-mint text-black hover:bg-transparent hover:text-black transition-all duration-300 font-semibold !h-[48px] flex items-center justify-center">
                    Schedule Call
                  </Button>
                </Link>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Description Section */}
        <motion.section
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-xl text-white max-w-4xl mx-auto mb-6">
            Transform your banking operations from cost center to profit driver. We offer simple and transparent pricing based on your portfolio size, deployment needs, and agreement terms.
          </p>
          <p className="text-lg text-krim-mint max-w-3xl mx-auto">
            All plans include complete Multi-Agentic OS with zero violations guarantee.
          </p>
        </motion.section>

        {/* Contact CTA */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="p-12 border-2 border-krim-mint/50 bg-gradient-to-br from-krim-mint/15 to-krim-deep/80">
            <div className="flex justify-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white w-full max-w-none text-center">Ready to Get Started?</h2>
            </div>
            <p className="text-xl text-white mb-12 max-w-3xl mx-auto">
              Contact our team for a detailed quote based on your specific requirements and portfolio size.
            </p>

            <div className="flex justify-center">
              <Link to="/contact" state={getPricingConfig('Custom', 'Quote', 'Variable')}>
                <Button className="bg-krim-mint text-black font-bold px-12 py-6 text-xl hover:scale-105 hover:text-black transition-all duration-300">
                  Get Custom Quote →
                </Button>
              </Link>
            </div>
          </Card>
        </motion.section>

      </div>

      {/* Metrics Section */}
      <MetricsBeforeFooter />
      </div> {/* Close content wrapper */}
    </div>
  )
}