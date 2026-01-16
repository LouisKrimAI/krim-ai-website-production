/**
 * KRIM AI - COMPLIANCE OVERVIEW
 * Comprehensive regulatory compliance hub
 */
import React from 'react'
import { Link } from 'react-router-dom'
import '../../../styles/depth-system.css'
import { ComplianceBadgePresets } from '../../components/ComplianceBadges'

const ComplianceOverview: React.FC = () => {
  const complianceAreas = [
    {
      title: 'FDCPA',
      subtitle: 'Fair Debt Collection Practices Act',
      description: 'Comprehensive debt collection compliance with automated validation and dispute management',
      link: '/compliance/fdcpa',
      icon: '⚖️',
      color: 'electric'
    },
    {
      title: 'CFPB',
      subtitle: 'Consumer Financial Protection Bureau',
      description: 'Full CFPB compliance with real-time monitoring and automated reporting',
      link: '/compliance/cfpb',
      icon: '🛡️',
      color: 'cyan'
    },
    {
      title: 'TCPA',
      subtitle: 'Telephone Consumer Protection Act',
      description: 'Advanced consent management and communication compliance automation',
      link: '/compliance/tcpa',
      icon: '📞',
      color: 'coral'
    },
    {
      title: 'FCRA',
      subtitle: 'Fair Credit Reporting Act',
      description: 'Credit reporting accuracy and consumer rights protection',
      link: '/compliance/fcra',
      icon: '📊',
      color: 'purple'
    },
    {
      title: 'SCRA',
      subtitle: 'Servicemembers Civil Relief Act',
      description: 'Military service member protection and benefits automation',
      link: '/compliance/scra',
      icon: '🇺🇸',
      color: 'aurora'
    }
  ]

  return (
    <div className="depth-void min-h-screen">
      <div className="aurora-background" />
      
      {/* Hero Section */}
      <section className="depth-surface p-8 mb-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-white mb-6 shimmer-text">
            Regulatory Compliance Center
          </h1>
          <p className="text-xl mb-8 text-white max-w-4xl mx-auto">
            Krim AI's comprehensive compliance framework ensures 100% adherence to all financial 
            services regulations through automated monitoring, real-time validation, and 
            intelligent risk management.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="depth-elevated p-6 text-center">
              <div className="text-4xl glow-text-electric mb-4">99.9%</div>
              <p className="text-white">Compliance Accuracy</p>
            </div>
            <div className="depth-elevated p-6 text-center">
              <div className="text-4xl glow-text-cyan mb-4">24/7</div>
              <p className="text-white">Real-time Monitoring</p>
            </div>
            <div className="depth-elevated p-6 text-center">
              <div className="text-4xl glow-text-coral mb-4">5+</div>
              <p className="text-white">Regulatory Frameworks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Compliance Badges */}
      <section className="max-w-6xl mx-auto p-8 mb-12">
        <ComplianceBadgePresets.CompliancePage />
      </section>

      {/* Compliance Areas */}
      <section className="max-w-6xl mx-auto p-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
          Regulatory Framework Coverage
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {complianceAreas.map((area, index) => (
            <Link
              key={area.title}
              to={area.link}
              className="depth-elevated p-8 group hover:depth-floating transition-all duration-300 block"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">{area.icon}</div>
                <h3 className="text-2xl font-bold mb-2 glow-text-electric group-hover:shimmer-text">
                  {area.title}
                </h3>
                <h4 className="text-lg mb-4 text-white">{area.subtitle}</h4>
                <p className="text-white leading-relaxed">
                  {area.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Key Features */}
        <div className="depth-substrate p-12 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Automated Compliance Intelligence
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="depth-surface p-6">
                <h3 className="text-xl font-bold mb-4 glow-text-electric">Real-time Validation</h3>
                <p className="text-white">
                  Every interaction is validated against regulatory requirements in real-time, 
                  preventing violations before they occur.
                </p>
              </div>
              
              <div className="depth-surface p-6">
                <h3 className="text-xl font-bold mb-4 glow-text-cyan">Automated Documentation</h3>
                <p className="text-white">
                  Complete audit trails and compliance documentation generated automatically 
                  for every customer interaction.
                </p>
              </div>
              
              <div className="depth-surface p-6">
                <h3 className="text-xl font-bold mb-4 glow-text-coral">Risk Management</h3>
                <p className="text-white">
                  Predictive risk assessment identifies potential compliance issues before 
                  they become violations.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="depth-surface p-6">
                <h3 className="text-xl font-bold mb-4 glow-text-electric">Regulatory Updates</h3>
                <p className="text-white">
                  Automatic updates to compliance rules and regulations ensure your system 
                  is always current with the latest requirements.
                </p>
              </div>
              
              <div className="depth-surface p-6">
                <h3 className="text-xl font-bold mb-4 glow-text-cyan">Multi-State Coverage</h3>
                <p className="text-white">
                  Comprehensive coverage of federal and state-specific regulations across 
                  all 50 states and territories.
                </p>
              </div>
              
              <div className="depth-surface p-6">
                <h3 className="text-xl font-bold mb-4 glow-text-coral">Audit Readiness</h3>
                <p className="text-white">
                  Complete audit preparation with organized documentation, compliance 
                  reports, and violation prevention metrics.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Pages Links */}
        <div className="depth-substrate p-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Legal Documentation
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/legal/privacy" className="depth-surface p-6 text-center group hover:depth-elevated transition-all">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2 group-hover:glow-text-electric">Privacy Policy</h3>
              <p className="text-white">Data protection and privacy commitments</p>
            </Link>
            
            <Link to="/legal/terms" className="depth-surface p-6 text-center group hover:depth-elevated transition-all">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold mb-2 group-hover:glow-text-cyan">Terms of Service</h3>
              <p className="text-white">Platform usage terms and conditions</p>
            </Link>
            
            <Link to="/legal/security" className="depth-surface p-6 text-center group hover:depth-elevated transition-all">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2 group-hover:glow-text-coral">Security</h3>
              <p className="text-white">Security measures and data protection</p>
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Ready to Transform Your Compliance?
          </h2>
          <p className="text-xl mb-8 text-white max-w-3xl mx-auto">
            Join the future of automated regulatory compliance. Reduce risk, increase efficiency, 
            and ensure 100% compliance with Krim AI's intelligent compliance platform.
          </p>
          <button className="magnetic-button text-lg px-12 py-4">
            Schedule Compliance Demo
          </button>
        </div>
      </section>
    </div>
  )
}

export default ComplianceOverview