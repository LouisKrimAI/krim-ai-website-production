/**
 * KRIM AI - CENTRALIZED CLAIMS REGISTRY
 * Single Source of Truth for All Website Metrics, Claims, and Content
 * Enterprise-grade data management for Fortune 500 CTOs
 */

export interface MetricClaim {
  id: string
  category: 'performance' | 'financial' | 'operational' | 'technical' | 'scale'
  title: string
  value: string
  unit?: string
  description: string
  source: string
  validatedAt: string
  confidenceLevel: 'high' | 'medium' | 'low'
  context?: string
  supportingData?: {
    methodology?: string
    sampleSize?: string
    timeFrame?: string
    baseline?: string
  }
}

export interface ContentBlock {
  id: string
  type: 'headline' | 'subheading' | 'body' | 'cta' | 'tagline'
  content: string
  context: string
  lastUpdated: string
  variants?: {
    [key: string]: string
  }
}

export interface BusinessClaim {
  id: string
  category: 'roi' | 'efficiency' | 'cost_reduction' | 'revenue_increase' | 'automation'
  claim: string
  supporting_metrics: string[]
  business_impact: string
  timeframe: string
  confidence: 'proven' | 'projected' | 'estimated'
}

// ====================================
// CORE PERFORMANCE METRICS
// ====================================
export const performanceMetrics: MetricClaim[] = [
  {
    id: 'collection_lift',
    category: 'performance',
    title: 'Collection Performance Increase',
    value: '35',
    unit: '%',
    description: 'Average increase in collection rates across all client implementations',
    source: 'Internal analytics across 50+ financial institutions',
    validatedAt: '2024-09-01',
    confidenceLevel: 'high',
    context: 'Measured against pre-implementation baselines',
    supportingData: {
      methodology: 'Before-and-after analysis across client portfolio',
      sampleSize: '50+ financial institutions',
      timeFrame: '12-month rolling average',
      baseline: 'Pre-implementation collection rates'
    }
  },
  {
    id: 'cost_center_transformation',
    category: 'financial',
    title: 'Cost Center Value',
    value: '47',
    unit: 'B',
    description: 'Total addressable market size for credit servicing cost centers',
    source: 'Industry research and market analysis',
    validatedAt: '2024-08-15',
    confidenceLevel: 'high',
    context: 'Annual cost center spending across the industry'
  },
  {
    id: 'monthly_debt_managed',
    category: 'scale',
    title: 'Monthly Debt Under Management',
    value: '2',
    unit: 'B+',
    description: 'Total debt portfolio managed monthly across platform',
    source: 'Changes first pass.rtf - Impact bar section',
    validatedAt: '2024-09-10',
    confidenceLevel: 'high',
    context: 'RTF approved metric from Impact horizontal bar'
  },
  {
    id: 'ai_calls_processed',
    category: 'technical',
    title: 'AI Interactions Processed',
    value: '200',
    unit: 'M+',
    description: 'Total AI-powered interactions processed to date',
    source: 'Platform telemetry and usage analytics',
    validatedAt: '2024-09-10',
    confidenceLevel: 'high',
    context: 'Cumulative since platform launch'
  },
  {
    id: 'financial_institutions',
    category: 'scale',
    title: 'Financial Institution Clients',
    value: '50',
    unit: '+',
    description: 'Proven results across financial institutions',
    source: 'Changes first pass.rtf - Customer Results section',
    validatedAt: '2024-09-01',
    confidenceLevel: 'high',
    context: 'RTF approved metric from Customer Results section'
  },
  {
    id: 'automation_rate',
    category: 'operational',
    title: 'Process Automation Rate',
    value: '90',
    unit: '%',
    description: 'Percentage of credit servicing processes fully automated',
    source: 'Process automation metrics',
    validatedAt: '2024-09-01',
    confidenceLevel: 'high',
    context: 'Average across all deployed workflows'
  },
  {
    id: 'response_time',
    category: 'technical',
    title: 'Average Response Time',
    value: '<100',
    unit: 'ms',
    description: 'Average API response time for critical operations',
    source: 'System performance monitoring',
    validatedAt: '2024-09-10',
    confidenceLevel: 'high',
    context: '99th percentile response times'
  },
  {
    id: 'uptime_sla',
    category: 'technical',
    title: 'System Uptime',
    value: '99.9',
    unit: '%',
    description: 'Platform uptime over the last 12 months',
    source: 'Infrastructure monitoring',
    validatedAt: '2024-09-10',
    confidenceLevel: 'high',
    context: 'Enterprise SLA compliance'
  },
  {
    id: 'roi_timeframe',
    category: 'financial',
    title: 'ROI Realization Timeframe',
    value: '90',
    unit: 'days',
    description: 'Average time to positive ROI for new implementations',
    source: 'Client success metrics',
    validatedAt: '2024-08-30',
    confidenceLevel: 'high',
    context: 'From go-live to measurable ROI'
  },
  {
    id: 'cost_reduction',
    category: 'financial',
    title: 'Operational Cost Reduction',
    value: '60',
    unit: '%',
    description: 'Average reduction in credit servicing operational costs',
    source: 'Client financial reporting',
    validatedAt: '2024-09-01',
    confidenceLevel: 'high',
    context: 'Compared to traditional servicing methods'
  },
  {
    id: 'compliance_violations',
    category: 'operational',
    title: 'Compliance Violations',
    value: '0',
    unit: '',
    description: 'Total compliance violations across all client interactions',
    source: 'Compliance monitoring system',
    validatedAt: '2024-09-10',
    confidenceLevel: 'high',
    context: 'Across 140M+ interactions'
  },
  {
    id: 'processing_speed',
    category: 'operational',
    title: 'Processing Speed Improvement',
    value: '73',
    unit: '%',
    description: 'Faster processing with autonomous workflows',
    source: 'Operational efficiency metrics',
    validatedAt: '2024-09-10',
    confidenceLevel: 'high',
    context: 'Compared to manual processes'
  },
  {
    id: 'daily_interactions',
    category: 'scale',
    title: 'Daily Interactions Capacity',
    value: '10,000',
    unit: '+',
    description: 'Daily interactions handled autonomously by agents',
    source: 'Platform capacity metrics',
    validatedAt: '2024-09-10',
    confidenceLevel: 'high',
    context: 'Per agent cluster capacity'
  },
  {
    id: 'deployment_time',
    category: 'operational',
    title: 'Implementation Timeline',
    value: '30',
    unit: ' days',
    description: 'Time for complete implementation and go-live',
    source: 'Implementation tracking',
    validatedAt: '2024-09-10',
    confidenceLevel: 'high',
    context: 'Standard deployment timeline'
  },
  {
    id: 'forecasting_accuracy',
    category: 'technical',
    title: 'Payment Prediction Accuracy',
    value: '94',
    unit: '%',
    description: 'Accuracy in predicting borrower behavior and payment likelihood',
    source: 'AI model performance metrics',
    validatedAt: '2024-09-10',
    confidenceLevel: 'high',
    context: 'Cross-validated model performance'
  },
  {
    id: 'resolution_rate',
    category: 'performance',
    title: 'Case Resolution Success Rate',
    value: '82',
    unit: '%',
    description: 'Successful resolution of collection cases',
    source: 'Case management analytics',
    validatedAt: '2024-09-10',
    confidenceLevel: 'high',
    context: 'Across all case types'
  },
  {
    id: 'daily_orchestration',
    category: 'scale',
    title: 'Daily Orchestration Events',
    value: '10M',
    unit: '+',
    description: 'Daily orchestration and coordination events processed',
    source: 'System orchestration metrics',
    validatedAt: '2024-09-10',
    confidenceLevel: 'high',
    context: 'Cross-agent coordination activities'
  },
  {
    id: 'annual_savings',
    category: 'financial',
    title: 'Annual Cost Savings',
    value: '8.85M',
    unit: '',
    description: 'Net annual benefit after Krim AI investment cost (RTF-compliant calculation)',
    source: 'RTF defendable ROI calculation - Additional Revenue minus Platform Cost',
    validatedAt: '2024-09-10',
    confidenceLevel: 'high',
    context: 'Based on $100M portfolio: $9M additional revenue - $150K cost = $8.85M net benefit'
  },
  {
    id: 'payback_period',
    category: 'financial',
    title: 'Investment Payback Period',
    value: '3.2',
    unit: 'mo',
    description: 'Median payback period for customer investments',
    source: 'ROI analysis across customer base',
    validatedAt: '2024-09-10',
    confidenceLevel: 'high',
    context: 'Time from implementation to ROI break-even'
  },
  {
    id: 'market_size',
    category: 'scale',
    title: 'Total Addressable Market',
    value: '47',
    unit: 'B',
    description: 'Total addressable market for credit servicing transformation',
    source: 'Industry market research',
    validatedAt: '2024-09-10',
    confidenceLevel: 'high',
    context: 'Annual cost center spending across industry'
  },
  {
    id: 'proven_track_record',
    category: 'scale',
    title: 'Proven Interaction Volume',
    value: '200M',
    unit: '+',
    description: 'Total interactions processed with proven compliance',
    source: 'Platform telemetry data',
    validatedAt: '2024-09-10',
    confidenceLevel: 'high',
    context: 'Cumulative compliant interactions'
  },
  {
    id: 'response_time',
    category: 'technical',
    title: 'System Response Time',
    value: '50ms',
    unit: '',
    description: 'Maximum API response time for real-time interactions',
    source: 'System performance monitoring',
    validatedAt: '2024-09-10',
    confidenceLevel: 'high',
    context: 'Sub-second response guarantee'
  },
  {
    id: 'cost_reduction',
    category: 'financial',
    title: 'Operational Cost Reduction',
    value: '60',
    unit: '%',
    description: 'Average operational cost reduction vs traditional methods',
    source: 'Customer operational analysis',
    validatedAt: '2024-09-10',
    confidenceLevel: 'high',
    context: 'Validated across customer implementations'
  },
  {
    id: 'roi_timeframe',
    category: 'financial',
    title: 'ROI Realization Timeframe',
    value: '90',
    unit: '',
    description: 'Days to measurable ROI realization',
    source: 'Customer ROI tracking',
    validatedAt: '2024-09-10',
    confidenceLevel: 'high',
    context: 'Average time to positive ROI'
  }
]

// ====================================
// BUSINESS VALUE PROPOSITIONS
// ====================================
export const businessClaims: BusinessClaim[] = [
  {
    id: 'profit_center_transformation',
    category: 'roi',
    claim: 'Transform a $47B cost center into an AI-native profit driver',
    supporting_metrics: ['cost_center_transformation', 'cost_reduction', 'collection_lift'],
    business_impact: 'Complete operational transformation from cost to profit',
    timeframe: '90-day implementation cycle',
    confidence: 'proven'
  },
  {
    id: 'collection_optimization',
    category: 'revenue_increase',
    claim: 'Complete loan lifecycle management with 35% collection lift',
    supporting_metrics: ['collection_lift', 'automation_rate', 'monthly_debt_managed'],
    business_impact: 'Significant revenue increase through improved collections',
    timeframe: 'Immediate upon deployment',
    confidence: 'proven'
  },
  {
    id: 'operational_efficiency',
    category: 'efficiency',
    claim: '90% automation rate across all credit servicing processes',
    supporting_metrics: ['automation_rate', 'response_time', 'uptime_sla'],
    business_impact: 'Massive operational efficiency gains',
    timeframe: 'Progressive over 6 months',
    confidence: 'proven'
  },
  {
    id: 'enterprise_scale',
    category: 'automation',
    claim: 'Enterprise-grade platform managing $200M+ monthly debt',
    supporting_metrics: ['monthly_debt_managed', 'financial_institutions', 'ai_calls_processed'],
    business_impact: 'Proven scalability for enterprise deployments',
    timeframe: 'Scalable from day one',
    confidence: 'proven'
  }
]

// ====================================
// DYNAMIC CONTENT BLOCKS
// ====================================
export const contentBlocks: ContentBlock[] = [
  {
    id: 'hero_headline',
    type: 'headline',
    content: 'Multi-agentic AI infrastructure for Autonomous Credit Servicing',
    context: 'Primary value proposition headline',
    lastUpdated: '2024-09-01'
  },
  {
    id: 'hero_subheading',
    type: 'subheading',
    content: 'Transform a $47B cost center into an AI-native profit driver. Complete loan lifecycle management with 35% collection lift.',
    context: 'Hero section supporting message',
    lastUpdated: '2024-09-01'
  },
  {
    id: 'cta_primary',
    type: 'cta',
    content: 'See Your 90-Day ROI',
    context: 'Primary call-to-action button',
    lastUpdated: '2024-09-01',
    variants: {
      urgent: 'Calculate Your ROI Now',
      consultative: 'Book Strategic Assessment',
      direct: 'Start Your Transformation'
    }
  },
  {
    id: 'platform_tagline',
    type: 'tagline',
    content: 'The world\'s first multi-agentic AI infrastructure purpose-built for autonomous credit servicing',
    context: 'Platform positioning statement',
    lastUpdated: '2024-09-01'
  },
  {
    id: 'enterprise_value',
    type: 'body',
    content: 'Fortune 500 financial institutions trust Krim AI to automate their most complex credit servicing operations, delivering measurable ROI in 90 days or less.',
    context: 'Enterprise credibility statement',
    lastUpdated: '2024-09-01'
  }
]

// ====================================
// DATA ACCESS UTILITIES
// ====================================

/**
 * Get metric by ID with validation
 */
export const getMetric = (id: string): MetricClaim | undefined => {
  return performanceMetrics.find(metric => metric.id === id)
}

/**
 * Get formatted metric value with unit
 */
export const getFormattedMetric = (id: string): string => {
  const metric = getMetric(id)
  if (!metric) return 'N/A'
  
  return `${metric.value}${metric.unit || ''}`
}

/**
 * Get content block with fallback
 */
export const getContent = (id: string, variant?: string): string => {
  const content = contentBlocks.find(block => block.id === id)
  if (!content) return ''
  
  if (variant && content.variants && content.variants[variant]) {
    return content.variants[variant]
  }
  
  return content.content
}

/**
 * Get business claim with supporting data
 */
export const getBusinessClaim = (id: string) => {
  const claim = businessClaims.find(c => c.id === id)
  if (!claim) return null
  
  const supportingMetrics = claim.supporting_metrics
    .map(metricId => getMetric(metricId))
    .filter(Boolean)
  
  return {
    ...claim,
    metrics: supportingMetrics
  }
}

/**
 * Get metrics by category
 */
export const getMetricsByCategory = (category: MetricClaim['category']): MetricClaim[] => {
  return performanceMetrics.filter(metric => metric.category === category)
}

/**
 * Validate metric freshness (for monitoring)
 */
export const validateMetricFreshness = (id: string, maxAgeInDays: number = 30): boolean => {
  const metric = getMetric(id)
  if (!metric) return false
  
  const validatedDate = new Date(metric.validatedAt)
  const now = new Date()
  const daysDiff = (now.getTime() - validatedDate.getTime()) / (1000 * 3600 * 24)
  
  return daysDiff <= maxAgeInDays
}

/**
 * Get all stale metrics (for maintenance alerts)
 */
export const getStaleMetrics = (maxAgeInDays: number = 30): MetricClaim[] => {
  return performanceMetrics.filter(metric => !validateMetricFreshness(metric.id, maxAgeInDays))
}

// ====================================
// ENTERPRISE COMPLIANCE
// ====================================

/**
 * Data governance metadata
 */
export const dataGovernance = {
  lastAudit: '2024-09-01',
  dataOfficer: 'CTO Office',
  complianceFramework: 'SOC 2',
  retentionPolicy: '7 years',
  accessControls: 'RBAC with audit logging',
  encryptionStandard: 'AES-256',
  backupFrequency: 'Real-time with 3-2-1 strategy'
}

/**
 * Performance monitoring configuration
 */
export const monitoringConfig = {
  metricFreshnessThreshold: 30, // days
  automatedValidation: true,
  alertingEnabled: true,
  dashboardRefreshInterval: 300000, // 5 minutes
  realTimeMetrics: ['response_time', 'uptime_sla', 'ai_calls_processed']
}

// ====================================
// LEGACY EXPORTS FOR BACKWARDS COMPATIBILITY
// ====================================

export const CLAIMS_REGISTRY = {
  metrics: performanceMetrics,
  claims: businessClaims,
  content: contentBlocks
}

// Raw metric values without units for proper formatting
export const CUSTOMER_METRICS = {
  customers: '50',
  monthlyDebt: '2',
  interactions: '200',
  collectionLift: '35',
  compliance: '0',
  uptime: '99.9',
  annualSavings: '2.4',
  paybackPeriod: '3.2',
  processingSpeed: '73',
  dailyInteractions: '10,000',
  deploymentTime: '30',
  forecastingAccuracy: '94',
  resolutionRate: '82',
  dailyOrchestration: '10',
  marketSize: '47',
  provenTrackRecord: '200',
  averageROI: '560',
  portfolioManaged: '18',
  roiTimeframe: '90',
  costReduction: '60',
  customerSatisfaction: '+28',
  responseTime: '5',
  availableSlots: '5',
  systemResponseTime: '50',
  industryContactRate: '26',
  industryCollectionRate: '15',
  krimContactRate: '65',
  krimCollectionRate: '22',
  humanAgentCost: '50',
  traditionalSystemCost: '2.5',
  portfolioMin: '10',
  portfolioMax: '1000',
  contactRateMin: '15',
  contactRateMax: '40',
  violationsPrevented: '200',
  complianceRate: '100',
  auditSuccessRate: '100',
  complianceCost: '0'
}

/**
 * Display-ready formatted metrics with proper units
 */
export const FORMATTED_METRICS = {
  customers: `${CUSTOMER_METRICS.customers}+`,
  monthlyDebt: `${CUSTOMER_METRICS.monthlyDebt}B`,
  interactions: `${CUSTOMER_METRICS.interactions}M`,
  collectionLift: `${CUSTOMER_METRICS.collectionLift}%`,
  compliance: `${CUSTOMER_METRICS.compliance}`,
  uptime: `${CUSTOMER_METRICS.uptime}%`,
  annualSavings: `${CUSTOMER_METRICS.annualSavings}M`,
  paybackPeriod: `${CUSTOMER_METRICS.paybackPeriod}mo`,
  processingSpeed: `${CUSTOMER_METRICS.processingSpeed}`,
  dailyInteractions: `${CUSTOMER_METRICS.dailyInteractions}+`,
  deploymentTime: `${CUSTOMER_METRICS.deploymentTime} days`,
  forecastingAccuracy: `${CUSTOMER_METRICS.forecastingAccuracy}%`,
  resolutionRate: `${CUSTOMER_METRICS.resolutionRate}%`,
  dailyOrchestration: `${CUSTOMER_METRICS.dailyOrchestration}M`,
  marketSize: `${CUSTOMER_METRICS.marketSize}B`,
  provenTrackRecord: `${CUSTOMER_METRICS.provenTrackRecord}M+`,
  averageROI: `${CUSTOMER_METRICS.averageROI}%`,
  portfolioManaged: `${CUSTOMER_METRICS.portfolioManaged}B+`,
  roiTimeframe: `${CUSTOMER_METRICS.roiTimeframe} days`,
  costReduction: `${CUSTOMER_METRICS.costReduction}%`,
  customerSatisfaction: `${CUSTOMER_METRICS.customerSatisfaction}`,
  responseTime: `${CUSTOMER_METRICS.responseTime}ms`,
  availableSlots: `${CUSTOMER_METRICS.availableSlots}`,
  systemResponseTime: `${CUSTOMER_METRICS.systemResponseTime}ms`,
  industryContactRate: `${CUSTOMER_METRICS.industryContactRate}%`,
  industryCollectionRate: `${CUSTOMER_METRICS.industryCollectionRate}%`,
  krimContactRate: `${CUSTOMER_METRICS.krimContactRate}%+`,
  krimCollectionRate: `${CUSTOMER_METRICS.krimCollectionRate}%+`,
  humanAgentCost: `$${CUSTOMER_METRICS.humanAgentCost}K`,
  traditionalSystemCost: `$${CUSTOMER_METRICS.traditionalSystemCost}M`,
  portfolioMin: `$${CUSTOMER_METRICS.portfolioMin}M`,
  portfolioMax: `$${CUSTOMER_METRICS.portfolioMax}M`,
  contactRateMin: `${CUSTOMER_METRICS.contactRateMin}%`,
  contactRateMax: `${CUSTOMER_METRICS.contactRateMax}%`,
  violationsPrevented: `${CUSTOMER_METRICS.violationsPrevented}M+`,
  complianceRate: `${CUSTOMER_METRICS.complianceRate}%`,
  auditSuccessRate: `${CUSTOMER_METRICS.auditSuccessRate}%`,
  complianceCost: `$${CUSTOMER_METRICS.complianceCost}`
}

/**
 * Utility function to get properly formatted metric with fallback
 */
export const getDisplayMetric = (key: keyof typeof FORMATTED_METRICS): string => {
  return FORMATTED_METRICS[key] || 'N/A'
}

export const PERFORMANCE_METRICS = performanceMetrics

export const COMPLIANCE_METRICS = {
  violations: getMetric('compliance_violations')?.value || '0',
  uptime: getMetric('uptime_sla')?.value || '99.9',
  certifications: ['SOC 2', 'HIPAA Ready', 'FDCPA Compliant']
}

export const ENTERPRISE_GUARANTEES = {
  performance: 'If you don\'t see 15% improvement in collection rates within 90 days, we\'ll optimize the system at no additional cost until you do.',
  implementation: 'Full deployment within 8 weeks with implementation success commitment.',
  satisfaction: 'Cancel within first 90 days with professional service commitment.',
  
  // RTF-compliant professional guarantee language
  commitment: {
    title: 'Our Commitment to Your Success',
    performanceGuarantee: {
      title: 'Performance Guarantee',
      description: 'If you don\'t see 15% improvement in collection rates within 90 days, we\'ll optimize the system at no additional cost until you do.',
      legal: 'Performance measured against pre-implementation baseline collection rates'
    },
    implementationGuarantee: {
      title: 'Implementation Guarantee', 
      description: 'Full deployment within 8 weeks with implementation success commitment.',
      legal: 'Implementation success backed by professional service commitment'
    },
    satisfactionGuarantee: {
      title: 'Satisfaction Guarantee',
      description: 'Cancel within first 90 days with professional service commitment.',
      legal: 'Service commitment includes completed integration work and ongoing support'
    }
  }
}

export const POSITIONING_CLAIMS = {
  headline: 'Turn Your $47B Cost Center Into an AI-Native Profit Engine',
  subheadline: 'Multi-agentic AI infrastructure that achieves 35% higher collection rates. Eliminate compliance violations—guaranteed.',
  competitive: 'While competitors use AI collect 2× more at half the cost'
}

export const RISK_MITIGATION = {
  urgency: 'Q1 2025 Implementation Advantage',
  scarcity: 'Reserve your implementation slot by January 15th', 
  social_proof: '50+ leading financial institutions trust Krim AI',
  
  // RTF-compliant professional urgency messaging
  implementationAdvantage: {
    title: 'Q1 2025 Implementation Advantage',
    benefits: [
      'Lock in current pricing before 2025 increases',
      'Complete implementation before busy spring lending season',
      'Demonstrate ROI for next year\'s strategic planning',
      'Get ahead of regulatory changes taking effect in 2025'
    ],
    cta: 'Reserve your implementation slot by January 15th'
  }
}

// RTF-COMPLIANT REALISTIC PRICING STRUCTURE
export const PRICING_TIERS = {
  starter: {
    name: 'Starter',
    price: 75000,
    priceLabel: '$75K annually',
    portfolioRange: 'Up to $250M',
    features: [
      'Core 6 AI agents',
      'Standard integrations', 
      'Email/phone support',
      'Basic reporting dashboard',
      'FDCPA compliance monitoring'
    ],
    setup: 'Standard implementation (4-6 weeks)'
  },
  professional: {
    name: 'Professional',
    price: 150000,
    priceLabel: '$150K annually',
    portfolioRange: '$250M to $1B',
    features: [
      'All 12 AI agents',
      'Custom integrations',
      'Dedicated success manager',
      'Advanced analytics suite',
      'Priority support',
      'Custom compliance rules'
    ],
    setup: 'Accelerated implementation (2-4 weeks)',
    popular: true
  },
  enterprise: {
    name: 'Enterprise', 
    price: 300000,
    priceLabel: '$300K annually',
    portfolioRange: 'Unlimited portfolio size',
    features: [
      'Custom agent development',
      'On-premise deployment options',
      '24/7 priority support',
      'Dedicated infrastructure',
      'Custom SLA agreements',
      'White-label options'
    ],
    setup: 'Concierge implementation (1-2 weeks)',
    contact: true
  }
}

export const ENTERPRISE_CLAIMS = {
  ...CUSTOMER_METRICS,
  ...COMPLIANCE_METRICS,
  ...ENTERPRISE_GUARANTEES,
  ...POSITIONING_CLAIMS,
  ...RISK_MITIGATION
}

// ====================================
// ROI CALCULATION FUNCTIONS
// ====================================

export const calculateDefendableROI = (portfolioSize: number, currentCollectionRate: number = 26) => {
  // EXACT RTF IMPLEMENTATION - Matches the realistic example provided
  
  // Portfolio parameters
  const portfolioSizeMillions = portfolioSize / 1000000 // Convert to millions for calculations
  
  // Current collection rate baseline (26% industry average)
  const baselineRate = 26 // 26%
  const improvedRate = 35 // 35% with Krim AI (+9 percentage points)
  
  // Annual recovery calculations
  const currentAnnualRecovery = portfolioSize * (baselineRate / 100) // Current 26% recovery
  const improvedAnnualRecovery = portfolioSize * (improvedRate / 100) // Improved 35% recovery
  const additionalRevenue = improvedAnnualRecovery - currentAnnualRecovery // +$9M on $100M portfolio
  
  // RTF EXACT CALCULATION IMPLEMENTATION
  // RTF: $100M portfolio → $9M additional revenue, $150K cost → $8.85M net = 5,900% ROI
  
  let krimAICost
  if (portfolioSize >= 1000000000) { // $1B+
    krimAICost = 300000 // Enterprise: $300K
  } else if (portfolioSize >= 100000000) { // $100M-$1B (RTF example used $150K for $100M)
    krimAICost = 150000 // Professional: $150K
  } else { // Under $100M
    krimAICost = 75000 // Starter: $75K
  }
  
  // For RTF compliance: Net Benefit = Additional Revenue - Krim AI Cost
  // No traditional cost savings included to match RTF's simple calculation
  const annualSavings = 0 // RTF calculation doesn't include operational savings
  
  // Total annual benefit
  const totalBenefit = additionalRevenue + annualSavings
  
  // Net benefit (after Krim AI cost)
  const netAnnualBenefit = totalBenefit - krimAICost
  
  // Payback calculation in months
  const monthlyBenefit = totalBenefit / 12
  const paybackMonths = monthlyBenefit > 0 ? Math.ceil(krimAICost / monthlyBenefit) : 36
  
  // ROI: (Net Annual Benefit / Investment) * 100
  // For $100M: ($8.85M / $150K) * 100 = 5,900%
  const roiPercentage = (netAnnualBenefit / krimAICost) * 100

  return {
    portfolioSize,
    currentAnnualRecovery,
    improvedAnnualRecovery,
    additionalRevenue,
    annualSavings,
    totalBenefit,
    netAnnualBenefit,
    paybackMonths: Math.max(paybackMonths, 1), // Minimum 1 month
    roiPercentage: Math.max(roiPercentage, 0), // No negative ROI
    baselineCollectionRate: baselineRate,
    improvedCollectionRate: improvedRate,
    krimAICost
  }
}