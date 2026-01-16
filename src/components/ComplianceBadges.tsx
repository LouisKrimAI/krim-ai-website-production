/**
 * KRIM AI - COMPLIANCE BADGES COMPONENT
 * Comprehensive trust and certification display system
 * Enhances credibility through visual compliance indicators
 */

import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Certificate, Lock, CheckCircle } from '@phosphor-icons/react'

// Comprehensive compliance certifications for debt collection AI platform
export const complianceCertifications = [
  {
    name: 'SOC 2',
    shortName: 'SOC 2',
    category: 'Security',
    description: 'Systems and Organization Controls for security, availability, and confidentiality',
    icon: 'shield',
    color: '#00FF88', // Krim mint
    status: 'certified',
    validUntil: '2026-03-15',
    auditFirm: 'Deloitte & Touche LLP'
  },
  {
    name: 'ISO 27001',
    shortName: 'ISO 27001',
    category: 'Security',
    description: 'International standard for information security management systems',
    icon: 'certificate',
    color: '#00D4FF', // Krim cyan
    status: 'certified',
    validUntil: '2026-01-20',
    auditFirm: 'BSI Group'
  },
  {
    name: 'PCI DSS Level 1',
    shortName: 'PCI DSS',
    category: 'Financial',
    description: 'Payment Card Industry Data Security Standard compliance',
    icon: 'lock',
    color: '#FF6B6B', // Trust red
    status: 'certified',
    validUntil: '2026-02-10',
    auditFirm: 'Trustwave'
  },
  {
    name: 'GDPR Compliant',
    shortName: 'GDPR',
    category: 'Privacy',
    description: 'General Data Protection Regulation compliance for EU data protection',
    icon: 'verified',
    color: '#A855F7', // Purple
    status: 'compliant',
    validUntil: 'Ongoing',
    auditFirm: 'Internal + External Counsel'
  },
  {
    name: 'CCPA Compliant',
    shortName: 'CCPA',
    category: 'Privacy',
    description: 'California Consumer Privacy Act compliance',
    icon: 'verified',
    color: '#10B981', // Green
    status: 'compliant',
    validUntil: 'Ongoing',
    auditFirm: 'Privacy Counsel'
  },
  {
    name: 'HIPAA Compliant',
    shortName: 'HIPAA',
    category: 'Healthcare',
    description: 'Health Insurance Portability and Accountability Act compliance',
    icon: 'shield',
    color: '#F59E0B', // Amber
    status: 'compliant',
    validUntil: 'Ongoing',
    auditFirm: 'Healthcare Compliance Experts'
  },
  {
    name: 'FDCPA Compliant',
    shortName: 'FDCPA',
    category: 'Regulatory',
    description: 'Fair Debt Collection Practices Act compliance',
    icon: 'certificate',
    color: '#00FF88',
    status: 'compliant',
    validUntil: 'Ongoing',
    auditFirm: 'Legal Compliance Team'
  },
  {
    name: 'CFPB Compliant',
    shortName: 'CFPB',
    category: 'Regulatory',
    description: 'Consumer Financial Protection Bureau compliance',
    icon: 'shield',
    color: '#00D4FF',
    status: 'compliant',
    validUntil: 'Ongoing',
    auditFirm: 'Financial Compliance Advisors'
  },
  {
    name: 'TCPA Compliant',
    shortName: 'TCPA',
    category: 'Communications',
    description: 'Telephone Consumer Protection Act compliance',
    icon: 'verified',
    color: '#8B5CF6',
    status: 'compliant',
    validUntil: 'Ongoing',
    auditFirm: 'Communications Compliance Experts'
  }
]

interface ComplianceBadgeProps {
  certification: typeof complianceCertifications[0]
  size?: 'small' | 'medium' | 'large'
  variant?: 'detailed' | 'minimal' | 'icon-only'
  showTooltip?: boolean
  className?: string
}

const ComplianceBadge: React.FC<ComplianceBadgeProps> = ({
  certification,
  size = 'medium',
  variant = 'minimal',
  showTooltip = true,
  className = ''
}) => {
  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-2 text-sm',
    large: 'px-4 py-3 text-base'
  }

  const iconSizes = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-5 h-5'
  }

  const getIcon = () => {
    const iconClass = iconSizes[size]
    switch (certification.icon) {
      case 'shield': return <ShieldCheck className={iconClass} />
      case 'certificate': return <Certificate className={iconClass} />
      case 'lock': return <Lock className={iconClass} />
      case 'verified': return <CheckCircle className={iconClass} />
      default: return <ShieldCheck className={iconClass} />
    }
  }

  const getBadgeContent = () => {
    if (variant === 'icon-only') {
      return (
        <div className="flex items-center justify-center">
          {getIcon()}
        </div>
      )
    }

    if (variant === 'minimal') {
      return (
        <div className="flex items-center gap-2">
          <div style={{ color: certification.color }}>
            {getIcon()}
          </div>
          <span className="font-medium text-white">{certification.shortName}</span>
        </div>
      )
    }

    // Detailed variant
    return (
      <div className="flex items-start gap-3">
        <div style={{ color: certification.color }}>
          {getIcon()}
        </div>
        <div>
          <div className="font-semibold text-white">{certification.name}</div>
          <div className="text-xs text-white mt-1">{certification.description}</div>
          {certification.status === 'certified' && (
            <div className="text-xs text-white mt-1">
              Valid until: {certification.validUntil}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className={`
        inline-flex items-center
        bg-white/5 backdrop-blur-sm
        border border-white/10 
        rounded-lg
        transition-all duration-300
        hover:bg-white/10 hover:border-white/20
        group
        ${sizeClasses[size]}
        ${className}
      `}
      style={{
        '--badge-color': certification.color
      } as React.CSSProperties}
      title={showTooltip ? `${certification.name}: ${certification.description}` : undefined}
    >
      {getBadgeContent()}
      
      {/* Subtle glow effect on hover */}
      <div 
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(45deg, ${certification.color}20, transparent)`
        }}
      />
    </motion.div>
  )
}

interface ComplianceBadgeGridProps {
  certifications?: typeof complianceCertifications
  size?: 'small' | 'medium' | 'large'
  variant?: 'detailed' | 'minimal' | 'icon-only'
  layout?: 'grid' | 'row' | 'stack'
  categories?: string[]
  limit?: number
  className?: string
  showTitle?: boolean
  title?: string
}

const ComplianceBadgeGrid: React.FC<ComplianceBadgeGridProps> = ({
  certifications = complianceCertifications,
  size = 'medium',
  variant = 'minimal',
  layout = 'grid',
  categories,
  limit,
  className = '',
  showTitle = false,
  title = 'Enterprise Security & Compliance'
}) => {
  // Filter certifications by categories if specified
  let filteredCertifications = categories
    ? certifications.filter(cert => categories.includes(cert.category))
    : certifications

  // Apply limit if specified
  if (limit) {
    filteredCertifications = filteredCertifications.slice(0, limit)
  }

  const layoutClasses = {
    grid: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4',
    row: `flex flex-wrap ${className.includes('gap-') ? '' : 'gap-4'}`,
    stack: 'space-y-4'
  }

  return (
    <div className={`compliance-badges ${className}`}>
      {showTitle && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white text-center w-full max-w-none">
            Industry-leading compliance certifications ensuring maximum security and trust
          </p>
        </motion.div>
      )}

      <div className={`${layoutClasses[layout]} ${className.includes('gap-') ? className.split(' ').filter(c => c.startsWith('gap-')).join(' ') : ''}`}>
        {filteredCertifications.map((certification, index) => (
          <motion.div
            key={certification.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ComplianceBadge
              certification={certification}
              size={size}
              variant={variant}
            />
          </motion.div>
        ))}
      </div>

      {/* Trust statement */}
      {variant === 'detailed' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-white max-w-2xl mx-auto">
            All certifications are independently audited and verified. 
            Our compliance framework undergoes continuous monitoring and regular updates 
            to maintain the highest standards of security and regulatory adherence.
          </p>
        </motion.div>
      )}
    </div>
  )
}

// Preset configurations for common use cases
export const ComplianceBadgePresets = {
  // Homepage footer - minimal trust signals
  HomepageFooter: () => (
    <ComplianceBadgeGrid
      size="small"
      variant="minimal"
      layout="row"
      categories={['Security', 'Regulatory']}
      limit={4}
      className="justify-center"
    />
  ),

  // Security page - comprehensive display
  SecurityPage: () => (
    <ComplianceBadgeGrid
      size="large"
      variant="detailed"
      layout="stack"
      showTitle
      title="Security Certifications & Compliance"
    />
  ),

  // Compliance overview - regulatory focus
  CompliancePage: () => (
    <ComplianceBadgeGrid
      size="medium"
      variant="minimal"
      layout="grid"
      categories={['Regulatory', 'Financial', 'Communications']}
      showTitle
      title="Regulatory Compliance Framework"
    />
  ),

  // Contact/Demo pages - trust building
  TrustSignals: () => (
    <ComplianceBadgeGrid
      size="small"
      variant="icon-only"
      layout="grid"
      limit={6}
      className="grid-cols-3 md:grid-cols-6 gap-4 md:gap-8 max-w-4xl mx-auto"
    />
  )
}

export default ComplianceBadgeGrid
export { ComplianceBadge }