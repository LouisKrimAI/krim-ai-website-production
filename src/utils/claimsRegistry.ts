/**
 * CLAIMS REGISTRY UTILITY FUNCTIONS
 * Helper functions to easily consume Claims Registry data across components
 */

import { 
  CLAIMS_REGISTRY, 
  CUSTOMER_METRICS, 
  PERFORMANCE_METRICS, 
  COMPLIANCE_METRICS,
  ENTERPRISE_GUARANTEES,
  POSITIONING_CLAIMS,
  RISK_MITIGATION
} from '../data/claimsRegistry'

// Utility function to get specific metrics by ID
export function getMetric(category: keyof typeof CLAIMS_REGISTRY, id: string) {
  const metrics = CLAIMS_REGISTRY[category] as any[]
  return metrics.find(metric => metric.id === id)
}

// Get display value for progressive disclosure
export function getDisplayValue(category: keyof typeof CLAIMS_REGISTRY, id: string, context: 'homepage' | 'productPage' | 'caseStudy' = 'homepage') {
  const metric = getMetric(category, id)
  if (!metric || !metric.progressiveDisclosure) return metric?.displayValue || ''
  return metric.progressiveDisclosure[context] || metric.displayValue
}

// RTF-COMPLIANT ROI calculation - matches data/claimsRegistry.ts exactly
export function calculateDefendableROI(portfolioSizeMillions: number) {
  // Convert millions to actual portfolio size
  const portfolioSize = portfolioSizeMillions * 1000000
  
  // Use the same RTF-compliant calculation from data/claimsRegistry.ts
  const baselineRate = 26 // 26%
  const improvedRate = 35 // 35% with Krim AI (+9 percentage points)
  
  const currentAnnualRecovery = portfolioSize * (baselineRate / 100)
  const improvedAnnualRecovery = portfolioSize * (improvedRate / 100) 
  const additionalRevenue = improvedAnnualRecovery - currentAnnualRecovery
  
  let krimAICost
  if (portfolioSize >= 1000000000) {
    krimAICost = 300000 // Enterprise: $300K
  } else if (portfolioSize >= 100000000) {
    krimAICost = 150000 // Professional: $150K  
  } else {
    krimAICost = 75000 // Starter: $75K
  }
  
  const annualSavings = 0 // RTF calculation doesn't include operational savings
  const totalBenefit = additionalRevenue + annualSavings
  const netAnnualBenefit = totalBenefit - krimAICost
  const monthlyBenefit = totalBenefit / 12
  const paybackMonths = monthlyBenefit > 0 ? Math.ceil(krimAICost / monthlyBenefit) : 36
  const roiPercentage = (netAnnualBenefit / krimAICost) * 100
  
  return {
    portfolioSize: portfolioSizeMillions,
    currentAnnualRecovery,
    additionalRevenue,
    annualSavings,
    totalBenefit,
    netAnnualBenefit,
    paybackMonths: Math.max(paybackMonths, 1),
    roiPercentage: Math.max(roiPercentage, 0),
    krimAICost,
    baselineCollectionRate: baselineRate,
    improvedCollectionRate: improvedRate
  }
}

// Get enterprise claims formatted for display
export const ENTERPRISE_CLAIMS = {
  customers: getDisplayValue('metrics', 'financial_institutions', 'productPage'),
  monthlyDebt: getDisplayValue('metrics', 'monthly_debt_managed', 'productPage'),
  interactions: getDisplayValue('metrics', 'ai_calls_processed', 'productPage'),
  collectionLift: getDisplayValue('metrics', 'collection_lift', 'productPage'),
  compliance: '0',
  uptime: getDisplayValue('metrics', 'uptime_sla', 'productPage')
}

// Competitive differentiators for pricing page
export const PRICING_DIFFERENTIATORS = [
  {
    category: 'completeness',
    krim: 'Complete Multi-agentic AI infrastructure',
    others: 'Point solutions requiring integration'
  },
  {
    category: 'track_record',
    krim: '200M+ Interactions with Zero Violations',
    others: 'Limited deployment history'
  },
  {
    category: 'guarantees',
    krim: 'ROI & Compliance Guarantees',
    others: 'Best effort implementation'
  },
  {
    category: 'scalability',
    krim: 'Infinite Scale with Same Performance',
    others: 'Performance degradation at scale'
  }
]

// Enterprise risk mitigation points
export const ENTERPRISE_RISK_MITIGATION = [
  {
    concern: 'Security',
    mitigation: 'Enterprise-grade security with continuous monitoring',
    proof: 'SOC 2 Certification'
  },
  {
    concern: 'Compliance',
    mitigation: 'Built-in regulatory compliance and audit trails',
    proof: 'Zero violations across 200M+ interactions'
  },
  {
    concern: 'Integration',
    mitigation: 'API-first design for seamless system integration',
    proof: 'API-first architecture with 50+ successful integrations'
  },
  {
    concern: 'Support',
    mitigation: 'Dedicated enterprise support and success management',
    proof: 'Dedicated enterprise success team'
  }
]

// Urgency messaging for pricing
export const URGENCY_MESSAGING = {
  scarcity: 'Only 5 Visionary Partner slots remaining for Q1 2025',
  competition: 'Competitors using AI collect 2× more at half the cost',
  opportunity: 'Every day you wait costs $12,847 per $100M portfolio',
  transformation: 'Industry transformation accelerating—lead or follow'
}

// Pricing tier configuration with enterprise focus
export const PRICING_TIERS = [
  {
    name: 'Visionary Partner',
    description: 'Complete transformation for industry leaders',
    features: [
      'Complete Multi-agentic AI infrastructure',
      '12 specialized AI agents',
      'AI Copilot strategic command center',
      'ROI & compliance guarantees',
      'Dedicated enterprise success team',
      'Custom integration & deployment',
      'Executive briefing & training'
    ],
    investment: 'Custom Enterprise Pricing',
    cta: 'Become a Visionary Partner',
    highlighted: true
  }
]

// Progressive disclosure for different sections
export function getProgressiveDisclosure(section: 'hero' | 'features' | 'proof' | 'urgency') {
  switch (section) {
    case 'hero':
      return {
        headline: 'Transform Your $47B Cost Center Into an AI-Native Profit Engine',
        subheading: 'Join 50+ financial institutions achieving guaranteed ROI with the world\'s first multi-agentic AI infrastructure'
      }
    case 'features':
      return {
        title: 'Complete Enterprise Transformation',
        description: 'Everything you need to dominate your market with AI-native credit servicing'
      }
    case 'proof':
      return {
        title: 'Proven Results at Enterprise Scale',
        metrics: ENTERPRISE_CLAIMS
      }
    case 'urgency':
      return {
        title: 'The Future of Credit Servicing is Here',
        message: URGENCY_MESSAGING
      }
    default:
      return {}
  }
}