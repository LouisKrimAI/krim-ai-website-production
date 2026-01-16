/**
 * INTEGRATIONS SECTION - Homepage Refactor
 * Plugs Into the Credit Stack You Already Run
 * With auto-scrolling logo carousel
 */
import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Reveal } from '../Reveal'
import OptimizedImage from '../OptimizedImage'
import { ArrowRight, Database, CreditCard, ChatCircle, ChartBar } from '@phosphor-icons/react'

// Integration categories with their systems
const integrations = [
  {
    category: 'Loan & servicing systems',
    description: 'LOS / LMS and core platforms',
    icon: <Database className="w-5 h-5" />,
    systems: ['Encompass', 'Black Knight', 'FICS', 'Jack Henry', 'Fiserv']
  },
  {
    category: 'CRM & ticketing',
    description: 'Salesforce, HubSpot, Zendesk, ServiceNow and similar',
    icon: <ChatCircle className="w-5 h-5" />,
    systems: ['Salesforce', 'HubSpot', 'Zendesk', 'ServiceNow', 'Freshworks']
  },
  {
    category: 'Messaging & payments',
    description: 'SMS / OTT providers and payment gateways',
    icon: <CreditCard className="w-5 h-5" />,
    systems: ['Stripe', 'PayPal', 'Twilio', 'Plaid', 'Square']
  },
  {
    category: 'Data & analytics',
    description: 'warehouses and lakes like Snowflake, BigQuery, Redshift, plus BI tools',
    icon: <ChartBar className="w-5 h-5" />,
    systems: ['Snowflake', 'BigQuery', 'Redshift', 'Tableau', 'PowerBI']
  }
]

// Logo data for the carousel
const logoPartners = [
  { name: 'Salesforce', logo: '/logos/salesforce.svg' },
  { name: 'HubSpot', logo: '/logos/hubspot.svg' },
  { name: 'Zendesk', logo: '/logos/zendesk.svg' },
  { name: 'ServiceNow', logo: '/logos/servicenow.svg' },
  { name: 'Snowflake', logo: '/logos/snowflake.svg' },
  { name: 'BigQuery', logo: '/logos/bigquery.svg' },
  { name: 'Twilio', logo: '/logos/twilio.svg' },
  { name: 'Stripe', logo: '/logos/stripe.svg' },
  { name: 'AWS', logo: '/logos/aws.svg' },
  { name: 'Microsoft', logo: '/logos/microsoft.svg' }
]

const IntegrationsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll functionality
  useEffect(() => {
    const scrollElement = scrollRef.current
    if (!scrollElement) return

    let animationId: number
    let scrollPosition = 0

    const scroll = () => {
      scrollPosition += 0.5 // Slow scroll speed
      
      // Reset position when we've scrolled past the first set
      if (scrollPosition >= scrollElement.scrollWidth / 2) {
        scrollPosition = 0
      }
      
      scrollElement.scrollLeft = scrollPosition
      animationId = requestAnimationFrame(scroll)
    }

    // Start scrolling after a short delay
    const timeoutId = setTimeout(() => {
      animationId = requestAnimationFrame(scroll)
    }, 2000)

    return () => {
      clearTimeout(timeoutId)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-krim-deep-space/30 to-transparent">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Plugs Into the Credit Stack You Already Run
            </h2>
          </Reveal>
          <Reveal>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Krim connects to the platforms running your credit lending, servicing and analytics today, and acts as an orchestration and intelligence layer on top.
            </p>
          </Reveal>
        </div>

        {/* Integration Categories */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {integrations.map((integration, index) => (
            <Reveal key={integration.category}>
              <div className="bg-gray-900/30 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
                <div className="flex items-start mb-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-krim-mint/10 rounded-lg mr-4 text-krim-mint">
                    {integration.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">
                      {integration.category}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {integration.description}
                    </p>
                  </div>
                </div>
                
                {/* System Examples */}
                <div className="flex flex-wrap gap-2">
                  {integration.systems.map((system, idx) => (
                    <span
                      key={system}
                      className="inline-block text-xs px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full border border-gray-700/50"
                    >
                      {system}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Logo Carousel */}
        <Reveal>
          <div className="mb-12">
            <h3 className="text-center text-lg font-medium text-gray-400 mb-8">
              Trusted by teams using these platforms
            </h3>
            
            <div className="relative overflow-hidden">
              {/* Gradient overlays for smooth edges */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-krim-deep-space to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-krim-deep-space to-transparent z-10"></div>
              
              {/* Scrolling container */}
              <div 
                ref={scrollRef}
                className="flex space-x-8 overflow-x-hidden"
                style={{ scrollBehavior: 'auto' }}
              >
                {/* First set of logos */}
                {logoPartners.map((partner, index) => (
                  <div
                    key={`first-${partner.name}`}
                    className="flex-shrink-0 w-32 h-16 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                  >
                    <div className="w-full h-full bg-gray-800/30 rounded-lg flex items-center justify-center text-gray-400 text-sm font-medium">
                      {partner.name}
                    </div>
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {logoPartners.map((partner, index) => (
                  <div
                    key={`second-${partner.name}`}
                    className="flex-shrink-0 w-32 h-16 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                  >
                    <div className="w-full h-full bg-gray-800/30 rounded-lg flex items-center justify-center text-gray-400 text-sm font-medium">
                      {partner.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Architecture Diagram */}
        <Reveal>
          <div className="bg-gray-900/30 rounded-xl p-8 border border-gray-700/50 backdrop-blur-sm">
            <h3 className="text-center text-lg font-semibold text-white mb-8">
              How Krim Connects Your Stack
            </h3>
            
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-8 md:space-x-12">
                {/* Your Systems */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-800/50 rounded-xl flex items-center justify-center mb-3 border border-gray-700/50">
                    <Database className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-300 font-medium">Your Systems</p>
                  <p className="text-xs text-gray-500">LOS, CRM, Core</p>
                </div>

                {/* Arrow */}
                <div className="flex flex-col items-center">
                  <ArrowRight className="w-6 h-6 text-krim-mint" />
                  <span className="text-xs text-krim-mint mt-1">API</span>
                </div>

                {/* Kendra */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-krim-mint/20 to-krim-cyan/20 rounded-xl flex items-center justify-center mb-3 border border-krim-mint/30">
                    <div className="w-8 h-8 bg-krim-mint/50 rounded-md"></div>
                  </div>
                  <p className="text-sm text-white font-medium">Kendra</p>
                  <p className="text-xs text-krim-mint">Runtime</p>
                </div>

                {/* Arrow */}
                <div className="flex flex-col items-center">
                  <ArrowRight className="w-6 h-6 text-krim-mint" />
                  <span className="text-xs text-krim-mint mt-1">AI</span>
                </div>

                {/* Channels & Co-Workers */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-krim-cyan/10 rounded-xl flex items-center justify-center mb-3 border border-krim-cyan/30">
                    <ChatCircle className="w-8 h-8 text-krim-cyan" />
                  </div>
                  <p className="text-sm text-white font-medium">Channels</p>
                  <p className="text-xs text-krim-cyan">AI Co-Workers</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <div className="text-center mt-12">
            <button className="group flex items-center justify-center mx-auto text-krim-mint hover:text-krim-mint/80 transition-colors">
              <span className="font-medium">View integrations & reference architectures</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default IntegrationsSection