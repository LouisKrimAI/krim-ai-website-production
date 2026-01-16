/**
 * KRIM AI - STRATEGIC PARTNERSHIPS DATA
 * Key partnerships that reinforce enterprise credibility and technical legitimacy
 */

export interface Partnership {
  id: string
  name: string
  displayName?: string
  category: 'infrastructure' | 'ai-tech' | 'compliance' | 'financial' | 'integration' | 'security'
  tier: 'premier' | 'strategic' | 'certified' | 'technology' | 'certification'
  description: string
  logo: {
    src: string
    alt: string
    width?: number
    height?: number
    darkMode?: string // Alternative logo for dark backgrounds
  }
  website?: string
  partnership: {
    type: 'accelerator' | 'technology' | 'infrastructure' | 'compliance' | 'integration' | 'certification'
    status: 'active' | 'certified' | 'member' | 'graduate'
    since?: string
  }
  benefits: string[]
  featured: boolean
}

export const partnerships: Partnership[] = [
  // AI & Technology Partners
  {
    id: 'nvidia-inception',
    name: 'NVIDIA Inception',
    category: 'ai-tech',
    tier: 'premier',
    description: 'GPU infrastructure and AI acceleration for massive scale processing',
    logo: {
      src: '/assets/logos/nvidia-inception.svg',
      alt: 'NVIDIA Inception Partner',
      darkMode: '/assets/logos/nvidia-inception-dark.svg'
    },
    website: 'https://www.nvidia.com/en-us/startups/',
    partnership: {
      type: 'accelerator',
      status: 'member',
      since: '2024'
    },
    benefits: [
      'Advanced GPU infrastructure access',
      'AI model optimization support',
      'Technical mentorship program',
      'Go-to-market acceleration'
    ],
    featured: true
  },
  {
    id: 'murf-ai',
    name: 'Murf.AI',
    displayName: 'MURF.AI',
    category: 'ai-tech',
    tier: 'strategic',
    description: 'Advanced voice AI technology for human-like communication',
    logo: {
      src: '/assets/logos/murf-ai.svg',
      alt: 'Murf.AI Technology Partner'
    },
    website: 'https://murf.ai/',
    partnership: {
      type: 'technology',
      status: 'active',
      since: '2023'
    },
    benefits: [
      'State-of-the-art voice synthesis',
      'Multi-lingual voice capabilities',
      'Emotional voice modulation',
      'Enterprise-grade voice API'
    ],
    featured: true
  },
  {
    id: 'openai',
    name: 'OpenAI',
    category: 'ai-tech',
    tier: 'technology',
    description: 'Advanced language models for intelligent conversation',
    logo: {
      src: '/assets/logos/openai.svg',
      alt: 'OpenAI Technology Partner'
    },
    website: 'https://openai.com/',
    partnership: {
      type: 'technology',
      status: 'certified',
      since: '2023'
    },
    benefits: [
      'GPT-4 model access',
      'Custom model fine-tuning',
      'Enterprise API reliability',
      'Advanced reasoning capabilities'
    ],
    featured: true
  },
  // Infrastructure Partners
  {
    id: 'aws-activate',
    name: 'AWS Activate',
    category: 'infrastructure',
    tier: 'premier',
    description: 'Cloud infrastructure and scaling support for enterprise deployment',
    logo: {
      src: '/assets/logos/aws-activate.svg',
      alt: 'AWS Activate Partner',
      darkMode: '/assets/logos/aws-activate-dark.svg'
    },
    website: 'https://aws.amazon.com/activate/',
    partnership: {
      type: 'accelerator',
      status: 'member',
      since: '2024'
    },
    benefits: [
      'Up to $100K in AWS credits',
      'Technical support and training',
      'Exclusive networking events',
      'Go-to-market resources'
    ],
    featured: true
  },
  {
    id: 'lambda-cloud',
    name: 'Lambda',
    displayName: 'Lambda Cloud',
    category: 'infrastructure',
    tier: 'strategic',
    description: 'High-performance GPU cloud infrastructure for AI workloads',
    logo: {
      src: '/assets/logos/lambda-cloud.svg',
      alt: 'Lambda Cloud Infrastructure Partner'
    },
    website: 'https://lambdalabs.com/',
    partnership: {
      type: 'infrastructure',
      status: 'active',
      since: '2023'
    },
    benefits: [
      'Dedicated GPU clusters',
      'Cost-effective AI training',
      'High-bandwidth networking',
      'Flexible scaling options'
    ],
    featured: true
  },
  {
    id: 'microsoft-azure',
    name: 'Microsoft Azure',
    category: 'infrastructure',
    tier: 'strategic',
    description: 'Enterprise cloud platform with AI services',
    logo: {
      src: '/assets/logos/microsoft-azure.svg',
      alt: 'Microsoft Azure Partner'
    },
    website: 'https://azure.microsoft.com/',
    partnership: {
      type: 'infrastructure',
      status: 'certified',
      since: '2024'
    },
    benefits: [
      'Global cloud infrastructure',
      'AI service integration',
      'Enterprise security features',
      'Hybrid cloud capabilities'
    ],
    featured: false
  },
  // Compliance & Security Partners
  {
    id: 'soc2',
    name: 'SOC 2',
    category: 'compliance',
    tier: 'certification',
    description: 'Security and availability compliance certification',
    logo: {
      src: '/assets/logos/soc2-certified.svg',
      alt: 'SOC 2 Certified'
    },
    partnership: {
      type: 'certification',
      status: 'certified',
      since: '2024'
    },
    benefits: [
      'Rigorous security controls',
      'Data protection assurance',
      'Regular security audits',
      'Compliance documentation'
    ],
    featured: false
  },
  {
    id: 'iso27001',
    name: 'ISO 27001',
    category: 'security',
    tier: 'certification',
    description: 'International information security management standard',
    logo: {
      src: '/assets/logos/iso27001.svg',
      alt: 'ISO 27001 Certified'
    },
    partnership: {
      type: 'certification',
      status: 'certified',
      since: '2024'
    },
    benefits: [
      'Information security framework',
      'Risk management processes',
      'Continuous improvement',
      'Global recognition'
    ],
    featured: false
  },
  {
    id: 'hipaa',
    name: 'HIPAA Compliant',
    category: 'compliance',
    tier: 'certification',
    description: 'Healthcare data protection compliance',
    logo: {
      src: '/assets/logos/hipaa-compliant.svg',
      alt: 'HIPAA Compliant'
    },
    partnership: {
      type: 'certification',
      status: 'certified',
      since: '2024'
    },
    benefits: [
      'Healthcare data protection',
      'Patient privacy safeguards',
      'Secure data transmission',
      'Audit trail maintenance'
    ],
    featured: false
  },
  // Financial & Integration Partners
  {
    id: 'plaid',
    name: 'Plaid',
    category: 'integration',
    tier: 'technology',
    description: 'Financial data connectivity and bank account verification',
    logo: {
      src: '/assets/logos/plaid.svg',
      alt: 'Plaid Integration Partner'
    },
    website: 'https://plaid.com/',
    partnership: {
      type: 'integration',
      status: 'certified',
      since: '2024'
    },
    benefits: [
      'Bank account verification',
      'Real-time balance checks',
      'Payment history analysis',
      'Secure financial data access'
    ],
    featured: false
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'financial',
    tier: 'strategic',
    description: 'Payment processing and financial infrastructure',
    logo: {
      src: '/assets/logos/stripe.svg',
      alt: 'Stripe Payment Partner'
    },
    website: 'https://stripe.com/',
    partnership: {
      type: 'integration',
      status: 'certified',
      since: '2023'
    },
    benefits: [
      'Secure payment processing',
      'Global payment methods',
      'Advanced fraud detection',
      'Real-time payment analytics'
    ],
    featured: false
  },
  {
    id: 'twilio',
    name: 'Twilio',
    category: 'integration',
    tier: 'technology',
    description: 'Communications platform for voice, SMS, and messaging',
    logo: {
      src: '/assets/logos/twilio.svg',
      alt: 'Twilio Communications Partner'
    },
    website: 'https://twilio.com/',
    partnership: {
      type: 'technology',
      status: 'certified',
      since: '2023'
    },
    benefits: [
      'Multi-channel communication',
      'Global phone number access',
      'SMS and voice APIs',
      'Real-time communication analytics'
    ],
    featured: false
  }
]

// Partnership filtering and grouping utilities
export const getFeaturedPartnerships = () => 
  partnerships.filter(p => p.featured)

export const getPartnershipsByCategory = (category: Partnership['category']) =>
  partnerships.filter(p => p.category === category)

export const getPartnershipsByTier = (tier: Partnership['tier']) =>
  partnerships.filter(p => p.tier === tier)

export const getPremierPartnerships = () =>
  partnerships.filter(p => p.tier === 'premier' || p.tier === 'strategic')

export const getComplianceCertifications = () =>
  partnerships.filter(p => p.category === 'compliance' || p.category === 'security')

// Partnership display configurations
export const partnershipDisplayConfig = {
  homepage: {
    maxItems: 6,
    showDescription: false,
    prioritizeFeatured: true,
    categories: ['ai-tech', 'infrastructure', 'compliance']
  },
  partnersPage: {
    maxItems: null,
    showDescription: true,
    groupByCategory: true,
    showBenefits: true
  },
  footer: {
    maxItems: 4,
    showLogosOnly: true,
    categories: ['compliance', 'security']
  }
}

export default partnerships