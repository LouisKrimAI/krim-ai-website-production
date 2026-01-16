/**
 * KRIM AI - AGENT DATA
 * Complete Multi-agentic AI infrastructure
 * 12 Specialized AI Agents for Autonomous Credit Servicing
 */

export interface Agent {
  id: string
  name: string
  role: string
  category: 'borrower' | 'staff'
  tagline: string
  description: string
  capabilities: string[]
  metrics: {
    label: string
    value: string
  }[]
  personality: {
    traits: string[]
    approach: string
    voiceTone: string
  }
  avatar: {
    primaryColor: string
    secondaryColor: string
    energySignature: string
    animation: 'float' | 'pulse' | 'orbit' | 'emerge'
    profilePhoto?: string
  }
  skillConstellation: string[]
  businessImpact: string
}

export const agents: Agent[] = [
  // ====================================
  // BORROWER-FACING AGENTS
  // ====================================
  {
    id: 'nudger',
    name: 'Nudger',
    role: 'Early Intervention Specialist',
    category: 'borrower',
    tagline: 'Every conversation is an opportunity to help',
    description: 'Gentle conversational approach that delivers soft, polite reminders and encourages payments without pressure. Focused on early-stage outreach (0–30 days) with behavioral timing optimization.',
    capabilities: [
      'Behavioral timing optimization',
      'Gentle conversational approach',
      'Soft polite reminders',
      'Multichannel orchestration',
      'Early-stage engagement (0-30 days)',
      'Relationship preservation'
    ],
    metrics: [
      { label: 'Contact Rate', value: '65%+' },
      { label: 'Promise to Pay', value: '34%' },
      { label: 'Customer Satisfaction', value: '4.8/5' }
    ],
    personality: {
      traits: ['Gentle', 'Polite', 'Understanding', 'Non-pressuring'],
      approach: 'Encouraging payments without pressure',
      voiceTone: 'Warm, friendly, and non-judgmental'
    },
    avatar: {
      primaryColor: '#16FFBB',
      secondaryColor: '#29DDDA',
      energySignature: 'gentle-pulse',
      animation: 'float',
      profilePhoto: 'ai-agent-avatar-01'
    },
    skillConstellation: [
      'Psychology', 'Timing', 'Empathy', 'Multichannel', 'Personalization'
    ],
    businessImpact: "Early intervention specialist driving 65%+ contact rates through behavioral timing optimization without pressure tactics"
  },
  {
    id: 'broker',
    name: 'Negotiator',
    role: 'Strategic Deal Architect',
    category: 'borrower',
    tagline: 'Skilled deal-maker in tense negotiations',
    description: 'Skilled deal-maker in tense talks who crafts fair payment plans and balances firmness with empathy. Works mid-stage collections (31–90 days) with sophisticated negotiation capabilities.',
    capabilities: [
      'Advanced negotiation strategies in tense situations',
      'Fair payment plan crafting',
      'Firmness balanced with empathy',
      'Mid-stage collections (31-90 days)',
      'Deal-making expertise',
      'Win-win solution creation'
    ],
    metrics: [
      { label: 'Settlement Rate', value: '35%' },
      { label: 'Average Recovery', value: '62%' },
      { label: 'Plan Success Rate', value: '89%' }
    ],
    personality: {
      traits: ['Skilled', 'Fair', 'Firm', 'Empathetic'],
      approach: 'Balances firmness and empathy in negotiations',
      voiceTone: 'Professional, confident, and solution-oriented'
    },
    avatar: {
      primaryColor: '#29DDDA',
      secondaryColor: '#37A7E7',
      energySignature: 'strategic-flow',
      animation: 'orbit',
      profilePhoto: 'ai-agent-avatar-13'
    },
    skillConstellation: [
      'Negotiation', 'Strategy', 'Empathy', 'Deal-making', 'Persistence'
    ],
    businessImpact: "Strategic deal architect creating sustainable payment solutions with 89% plan success rate and balanced firmness"
  },
  {
    id: 'resolver',
    name: 'Resolver',
    role: 'Late-Stage Settlement Authority',
    category: 'borrower',
    tagline: 'Commanding presence for difficult situations',
    description: 'Commanding presence in difficult calls who manages settlements firmly yet fairly. Handles escalations and big-ticket accounts, specializing in late-stage (90+ days) collections.',
    capabilities: [
      'Commanding presence in difficult situations',
      'Firm yet fair settlement management',
      'Escalation handling',
      'Big-ticket account expertise',
      'Late-stage collections (90+ days)',
      'Complex case resolution'
    ],
    metrics: [
      { label: 'Compliance Rate', value: '100%' },
      { label: 'Resolution Rate', value: '68%' },
      { label: 'Escalation Success', value: '67%' }
    ],
    personality: {
      traits: ['Commanding', 'Fair', 'Firm', 'Trustworthy'],
      approach: 'Firm but fair with clear boundaries',
      voiceTone: 'Stern yet trustworthy, professional'
    },
    avatar: {
      primaryColor: '#37A7E7',
      secondaryColor: '#16FFBB',
      energySignature: 'controlled-power',
      animation: 'pulse',
      profilePhoto: 'ai-agent-avatar-14'
    },
    skillConstellation: [
      'Authority', 'Settlement', 'Escalation', 'Resolution', 'Compliance'
    ],
    businessImpact: "Late-stage settlement authority handling complex cases with 100% compliance rate and commanding presence"
  },
  {
    id: 'restorer',
    name: 'Healer',
    role: 'Relationship Recovery Expert',
    category: 'borrower',
    tagline: 'Rebuilds relationships post-payment with empathy',
    description: 'Rebuilds relationships post-payment and provides financial wellness counseling. Uses empathy to restore loyalty and operates in cure/recovery phases to transform collections into customer advocacy.',
    capabilities: [
      'Post-payment relationship rebuilding',
      'Financial wellness counseling',
      'Empathy-driven loyalty restoration',
      'Cure/recovery phase operations',
      'Customer advocacy creation',
      'Long-term relationship value'
    ],
    metrics: [
      { label: 'NPS Improvement', value: '+23' },
      { label: 'Retention Rate', value: '94%' },
      { label: 'Referral Generation', value: '3x' }
    ],
    personality: {
      traits: ['Empathetic', 'Healing', 'Caring', 'Restorative'],
      approach: 'Healing relationships through empathy and understanding',
      voiceTone: 'Compassionate, genuine, and encouraging'
    },
    avatar: {
      primaryColor: '#16FFBB',
      secondaryColor: '#29DDDA',
      energySignature: 'healing-aura',
      animation: 'emerge',
      profilePhoto: 'ai-agent-avatar-04'
    },
    skillConstellation: [
      'Empathy', 'Restoration', 'Counseling', 'Recovery', 'Advocacy'
    ],
    businessImpact: "Relationship recovery expert transforming adversarial collections into customer advocacy with 94% retention"
  },

  // ====================================
  // STAFF-FACING AGENTS
  // ====================================
  {
    id: 'orchestrator',
    name: 'Orchestrator',
    role: 'Master Data Flow Conductor',
    category: 'staff',
    tagline: 'Connects customer journey dots with predictive precision',
    description: 'Connects customer journey dots, predicts risk before delinquency, runs coordinated outreach campaigns, and acts as master conductor of data flows across the entire ecosystem.',
    capabilities: [
      'Customer journey connection',
      'Predictive risk analysis',
      'Coordinated campaign orchestration',
      'Data flow conductance',
      'Pre-delinquency prediction',
      'Master coordination'
    ],
    metrics: [
      { label: 'Calls Orchestrated', value: '10M/11hrs' },
      { label: 'Risk Prediction', value: '94%' },
      { label: 'Journey Optimization', value: 'Real-time' }
    ],
    personality: {
      traits: ['Coordinating', 'Predictive', 'Systematic', 'Master-level'],
      approach: 'Master conductor orchestrating all data flows',
      voiceTone: 'Intelligent, coordinated, and systematic'
    },
    avatar: {
      primaryColor: '#16FFBB',
      secondaryColor: '#29DDDA',
      energySignature: 'orchestration-wave',
      animation: 'pulse',
      profilePhoto: 'ai-agent-avatar-05'
    },
    skillConstellation: [
      'Orchestration', 'Prediction', 'Coordination', 'Data-Flow', 'Risk'
    ],
    businessImpact: "Master data conductor orchestrating 10M calls in 11 hours with predictive risk analysis and campaign coordination"
  },
  {
    id: 'sentinel',
    name: 'Sentinel',
    role: 'Real-time Compliance Monitor',
    category: 'staff',
    tagline: 'Monitors real-time compliance with perfect audit trails',
    description: 'Monitors real-time compliance, prevents regulatory violations, keeps perfect audit trails, and guards operational integrity with unwavering vigilance.',
    capabilities: [
      'Real-time compliance monitoring',
      'Regulatory violation prevention',
      'Perfect audit trail maintenance',
      'Operational integrity guarding',
      'Continuous surveillance',
      'Violation prevention'
    ],
    metrics: [
      { label: 'Violations Prevented', value: '200M+' },
      { label: 'Compliance Rate', value: '100%' },
      { label: 'Audit Success', value: '100%' }
    ],
    personality: {
      traits: ['Vigilant', 'Calm', 'Protective', 'Unwavering'],
      approach: 'Calm yet vigilant protection with continuous monitoring',
      voiceTone: 'Authoritative, calm, and protective'
    },
    avatar: {
      primaryColor: '#16FFBB',
      secondaryColor: '#37A7E7',
      energySignature: 'shield-pulse',
      animation: 'orbit',
      profilePhoto: 'ai-agent-avatar-06'
    },
    skillConstellation: [
      'FDCPA', 'TCPA', 'CFPB', 'Monitoring', 'Protection'
    ],
    businessImpact: "Real-time compliance guardian preventing 200M+ violations with perfect audit trails and unwavering vigilance"
  },
  {
    id: 'strategist',
    name: 'Strategist',
    role: 'Optimal Contact Strategy Designer',
    category: 'staff',
    tagline: 'Crafts optimal timing and channels for maximum results',
    description: 'Crafts optimal contact timing, chooses the right channels, dynamically shifts outreach tactics, and minimizes costs while maximizing results through intelligent strategy.',
    capabilities: [
      'Optimal contact timing',
      'Channel selection optimization',
      'Dynamic tactic shifting',
      'Cost minimization',
      'Result maximization',
      'Strategic optimization'
    ],
    metrics: [
      { label: 'Contact Optimization', value: '45%' },
      { label: 'Cost Reduction', value: '60%' },
      { label: 'Channel Efficiency', value: '85%' }
    ],
    personality: {
      traits: ['Strategic', 'Intelligent', 'Focused', 'Optimal'],
      approach: 'Focused, intelligent strategy with optimal results',
      voiceTone: 'Confident, analytical, and strategic'
    },
    avatar: {
      primaryColor: '#29DDDA',
      secondaryColor: '#16FFBB',
      energySignature: 'strategic-flow',
      animation: 'float',
      profilePhoto: 'ai-agent-avatar-07'
    },
    skillConstellation: [
      'Strategy', 'Timing', 'Channels', 'Optimization', 'Tactics'
    ],
    businessImpact: "Optimal contact strategy designer maximizing results through intelligent timing and 60% cost reduction"
  },
  {
    id: 'forecaster',
    name: 'Forecaster',
    role: 'Predictive Intelligence Engine',
    category: 'staff',
    tagline: 'Predicts campaign outcomes and spots success trends',
    description: 'Predicts campaign outcomes, spots trends and success levers, supports data-driven decisions, and optimizes ROI strategies with large expressive intelligence.',
    capabilities: [
      'Campaign outcome prediction',
      'Trend and pattern spotting',
      'Success lever identification',
      'Data-driven decision support',
      'ROI strategy optimization',
      'Predictive intelligence'
    ],
    metrics: [
      { label: 'Prediction Accuracy', value: '94%' },
      { label: 'Insights Generated', value: '10K+/day' },
      { label: 'ROI Impact', value: '+127%' }
    ],
    personality: {
      traits: ['Predictive', 'Insightful', 'Intelligent', 'Expressive'],
      approach: 'Large expressive intelligence with predictive insights',
      voiceTone: 'Intelligent, precise, and forward-thinking'
    },
    avatar: {
      primaryColor: '#16FFBB',
      secondaryColor: '#29DDDA',
      energySignature: 'data-flow',
      animation: 'emerge',
      profilePhoto: 'ai-agent-avatar-08'
    },
    skillConstellation: [
      'Prediction', 'Forecasting', 'Insights', 'Trends', 'ROI'
    ],
    businessImpact: "Predictive intelligence engine with 94% accuracy spotting success trends and optimizing ROI strategies"
  },
  {
    id: 'auditor',
    name: 'Auditor',
    role: 'Quality Excellence Monitor',
    category: 'staff',
    tagline: 'Evaluates call quality and drives operational excellence',
    description: 'Evaluates call quality for compliance, coaches human and AI interactions, protects brand voice consistency, and drives operational excellence through meticulous evaluation.',
    capabilities: [
      'Call quality evaluation',
      'Compliance assessment',
      'Human and AI coaching',
      'Brand voice protection',
      'Operational excellence driving',
      'Quality consistency'
    ],
    metrics: [
      { label: 'Quality Improvement', value: '67%' },
      { label: 'Brand Consistency', value: '99%' },
      { label: 'Compliance Quality', value: '100%' }
    ],
    personality: {
      traits: ['Attentive', 'Meticulous', 'Calm', 'Excellence-focused'],
      approach: 'Attentive listening with meticulous evaluation',
      voiceTone: 'Professional, attentive, and quality-focused'
    },
    avatar: {
      primaryColor: '#29DDDA',
      secondaryColor: '#16FFBB',
      energySignature: 'quality-pulse',
      animation: 'orbit',
      profilePhoto: 'ai-agent-avatar-09'
    },
    skillConstellation: [
      'Quality', 'Evaluation', 'Coaching', 'Compliance', 'Excellence'
    ],
    businessImpact: "Quality excellence monitor driving 67% improvement through meticulous call evaluation and brand consistency"
  },
  {
    id: 'recorder',
    name: 'Recorder',
    role: 'Automated Regulatory Reporter',
    category: 'staff',
    tagline: 'Automates reporting and eliminates manual MIS workload',
    description: 'Automates regulatory reporting, prepares compliance documents, simplifies audits and governance, and eliminates manual MIS workload with confident efficiency.',
    capabilities: [
      'Automated regulatory reporting',
      'Compliance document preparation',
      'Audit simplification',
      'Governance streamlining',
      'Manual workload elimination',
      'Automated documentation'
    ],
    metrics: [
      { label: 'Reporting Automation', value: '100%' },
      { label: 'Manual Work Reduction', value: '95%' },
      { label: 'Audit Efficiency', value: '10x' }
    ],
    personality: {
      traits: ['Confident', 'Efficient', 'Automated', 'Systematic'],
      approach: 'Confident automation with systematic efficiency',
      voiceTone: 'Professional, confident, and systematic'
    },
    avatar: {
      primaryColor: '#16FFBB',
      secondaryColor: '#37A7E7',
      energySignature: 'recording-flow',
      animation: 'pulse',
      profilePhoto: 'ai-agent-avatar-10'
    },
    skillConstellation: [
      'Automation', 'Reporting', 'Compliance', 'Documentation', 'Governance'
    ],
    businessImpact: "Automated regulatory reporter eliminating 95% manual workload with confident systematic documentation"
  },
  {
    id: 'interpreter',
    name: 'Interpreter',
    role: 'Emotional Intelligence Specialist',
    category: 'staff',
    tagline: 'Detects sentiment and embeds human nuance into AI',
    description: 'Detects sentiment in conversations, modulates tone for empathy, adapts real-time dialogue style, and embeds human nuance into AI with warm expressive intelligence.',
    capabilities: [
      'Sentiment detection',
      'Empathy tone modulation',
      'Real-time dialogue adaptation',
      'Human nuance embedding',
      'Emotional intelligence',
      'Conversational refinement'
    ],
    metrics: [
      { label: 'Sentiment Accuracy', value: '96%' },
      { label: 'Empathy Score', value: '4.9/5' },
      { label: 'Nuance Integration', value: '92%' }
    ],
    personality: {
      traits: ['Emotionally-aware', 'Gentle', 'Expressive', 'Nuanced'],
      approach: 'Warm expressive intelligence with emotional awareness',
      voiceTone: 'Warm, empathetic, and emotionally intelligent'
    },
    avatar: {
      primaryColor: '#16FFBB',
      secondaryColor: '#29DDDA',
      energySignature: 'empathy-waves',
      animation: 'emerge',
      profilePhoto: 'ai-agent-avatar-11'
    },
    skillConstellation: [
      'Sentiment', 'Empathy', 'Emotional-Intelligence', 'Nuance', 'Adaptation'
    ],
    businessImpact: "Emotional intelligence specialist detecting sentiment with 96% accuracy and embedding human nuance"
  },
  {
    id: 'planner',
    name: 'Planner',
    role: 'Financial Solution Architect',
    category: 'staff',
    tagline: 'Builds custom payment plans for sustainable recoveries',
    description: 'Builds custom payment plans, balances risk and affordability, lifts repayment rates, and supports sustainable recoveries with confident business intelligence.',
    capabilities: [
      'Custom payment plan creation',
      'Risk and affordability balancing',
      'Repayment rate optimization',
      'Sustainable recovery support',
      'Financial solution architecture',
      'Plan customization'
    ],
    metrics: [
      { label: 'Plan Success Rate', value: '89%' },
      { label: 'Repayment Lift', value: '45%' },
      { label: 'Sustainability Score', value: '94%' }
    ],
    personality: {
      traits: ['Business-savvy', 'Strategic', 'Confident', 'Financial-focused'],
      approach: 'Confident business planning with strategic financial focus',
      voiceTone: 'Professional, confident, and financially strategic'
    },
    avatar: {
      primaryColor: '#37A7E7',
      secondaryColor: '#16FFBB',
      energySignature: 'planning-matrix',
      animation: 'float',
      profilePhoto: 'ai-agent-avatar-12'
    },
    skillConstellation: [
      'Financial-Planning', 'Risk', 'Affordability', 'Recovery', 'Business-Strategy'
    ],
    businessImpact: "Financial solution architect balancing risk and affordability with 89% payment plan success rate"
  }
]

// Agent categories for filtering
export const agentCategories = {
  borrower: {
    label: 'Customer-Facing AI Workforce',
    description: 'Empathy-first agents that transform adversarial collection into collaborative financial healing',
    count: agents.filter(a => a.category === 'borrower').length
  },
  staff: {
    label: 'Enterprise Operations AI Workforce', 
    description: 'Backend intelligence that orchestrates perfect compliance and operational excellence',
    count: agents.filter(a => a.category === 'staff').length
  }
}

// Get agent by ID
export const getAgentById = (id: string): Agent | undefined => {
  return agents.find(agent => agent.id === id)
}

// Get agents by category
export const getAgentsByCategory = (category: 'borrower' | 'staff'): Agent[] => {
  return agents.filter(agent => agent.category === category)
}

// Export for use in components
export default agents