import React from 'react'
import { useCookieConsent } from '../contexts/CookieConsentContext'
import { COOKIE_CATEGORIES } from '../utils/cookieManager'
import Button from '../components/Button'
import Card from '../components/Card'

export default function Legal(){
  const { 
    preferences, 
    hasConsented, 
    showPreferencesModal, 
    resetConsent,
    acceptAll,
    rejectNonEssential 
  } = useCookieConsent()

  return (
    <div className="max-w-6xl mx-auto px-6 pt-20 pb-16 space-y-12 min-h-screen bg-krim-deep-space">
      {/* Legal & Compliance Section */}
      <section>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-display text-center text-gradient w-full max-w-none mb-8 leading-[1.1] mobile-h1 prevent-orphans text-white">
          Legal & Compliance
        </h1>
        <Card variant="glass" className="p-8">
          <p className="text-white mb-6 text-lg leading-relaxed">
            Krim AI adheres to all relevant U.S. federal and state regulations governing debt recovery and consumer communications.
            Our policy is simple: <span className="text-krim-mint font-semibold">100% compliance, 0 violations.</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ul className="space-y-4 text-white">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-krim-mint rounded-full mt-2 flex-shrink-0" />
                <div>
                  <strong className="text-white">FDCPA:</strong> No harassment, deception, or unfair practices. Respectful, lawful, and transparent communications.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-krim-mint rounded-full mt-2 flex-shrink-0" />
                <div>
                  <strong className="text-white">TCPA:</strong> Calling windows, do-not-call, opt-outs, consent records; strict controls on auto-dialing and messaging.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-krim-mint rounded-full mt-2 flex-shrink-0" />
                <div>
                  <strong className="text-white">CFPB (Reg F):</strong> Frequency limits, disclosure rules, channel caps, and data validation enforced by design.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-krim-mint rounded-full mt-2 flex-shrink-0" />
                <div>
                  <strong className="text-white">SERVICEMEMBERS (SCRA):</strong> Protections applied to servicemember accounts (e.g., rate limits, foreclosure safeguards).
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-krim-mint rounded-full mt-2 flex-shrink-0" />
                <div>
                  <strong className="text-white">FCRA:</strong> Accurate reporting, dispute handling, and proper notices when applicable.
                </div>
              </li>
            </ul>
            <ul className="space-y-4 text-white">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-krim-cyan rounded-full mt-2 flex-shrink-0" />
                <div>
                  <strong className="text-white">State & Local Laws:</strong> Jurisdiction-specific rules, licensing, bonding, and stricter limits automatically enforced.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-krim-cyan rounded-full mt-2 flex-shrink-0" />
                <div>
                  <strong className="text-white">No Harassment or Abuse:</strong> AI scripts and sentiment checks prevent abusive or threatening language; respectful tone always.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-krim-cyan rounded-full mt-2 flex-shrink-0" />
                <div>
                  <strong className="text-white">Client Internal Policies:</strong> We ingest lender-specific rules and do-not-contact lists and enforce them in real time.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-krim-cyan rounded-full mt-2 flex-shrink-0" />
                <div>
                  <strong className="text-white">Audit & Monitoring:</strong> Every interaction is logged with transcripts/recordings; live compliance AI flags deviations.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-krim-cyan rounded-full mt-2 flex-shrink-0" />
                <div>
                  <strong className="text-white">Continuous Updates:</strong> The rules engine updates as regulations evolve; legal experts review policy changes.
                </div>
              </li>
            </ul>
          </div>
        </Card>
      </section>

      {/* Privacy & Cookie Policy Section */}
      <section>
        <h2 className="text-4xl md:text-5xl font-bold mb-8 w-full max-w-none text-center text-white">
          Privacy & Cookie Policy
        </h2>
        
        {/* Current Cookie Status */}
        <Card variant="glass-strong" className="p-6 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2 text-white">
                Your Cookie Preferences
              </h3>
              <p className="text-white mb-4">
                {hasConsented 
                  ? 'You have provided cookie consent. You can modify your preferences at any time.'
                  : 'You have not yet provided cookie consent. Manage your preferences below.'
                }
              </p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(preferences).map(([key, value]) => (
                  <span
                    key={key}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      value 
                        ? 'bg-krim-mint/20 text-krim-mint border border-krim-mint/30'
                        : 'bg-gray-700/50 text-white border border-gray-600/30'
                    }`}
                  >
                    {COOKIE_CATEGORIES[key as keyof typeof COOKIE_CATEGORIES]?.name || key}: {value ? 'Enabled' : 'Disabled'}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="secondary"
                size="md"
                onClick={showPreferencesModal}
              >
                Manage Preferences
              </Button>
              {hasConsented && (
                <Button
                  variant="ghost"
                  size="md"
                  onClick={resetConsent}
                >
                  Reset Consent
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Cookie Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {Object.entries(COOKIE_CATEGORIES).map(([key, category]) => (
            <Card key={key} variant="glass" className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-3 h-3 rounded-full ${
                  preferences[key as keyof typeof preferences] ? 'bg-krim-mint' : 'bg-gray-500'
                }`} />
                <h3 className="text-lg font-semibold text-white">
                  {category.name}
                </h3>
                {key === 'essential' && (
                  <span className="px-2 py-1 text-xs font-medium bg-krim-mint/20 text-krim-mint rounded-full">
                    Required
                  </span>
                )}
              </div>
              <p className="text-white mb-3">
                {category.description}
              </p>
              <div className="space-y-3">
                <p className="text-sm font-medium text-white">Examples:</p>
                <ul className="text-sm text-white space-y-3">
                  {category.examples.map((example, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-krim-mint rounded-full" />
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        {/* GDPR/CCPA Rights */}
        <Card variant="glass" className="p-8">
          <h3 className="text-xl font-semibold text-white mb-4 text-white">
            Your Privacy Rights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-medium text-krim-mint mb-3 text-white">GDPR Rights (EU)</h4>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-krim-mint rounded-full mt-2" />
                  Right to access your personal data
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-krim-mint rounded-full mt-2" />
                  Right to rectify inaccurate data
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-krim-mint rounded-full mt-2" />
                  Right to erasure ("right to be forgotten")
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-krim-mint rounded-full mt-2" />
                  Right to data portability
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-krim-mint rounded-full mt-2" />
                  Right to object to processing
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium text-krim-cyan mb-3 text-white">CCPA Rights (California)</h4>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-krim-cyan rounded-full mt-2" />
                  Right to know about data collection
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-krim-cyan rounded-full mt-2" />
                  Right to delete personal information
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-krim-cyan rounded-full mt-2" />
                  Right to opt-out of data sales
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-krim-cyan rounded-full mt-2" />
                  Right to non-discrimination
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-krim-cyan rounded-full mt-2" />
                  Right to know data sharing practices
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        {!hasConsented && (
          <Card variant="glass" className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 text-white">
              Quick Cookie Actions
            </h3>
            <p className="text-white mb-6">
              Choose how we can use cookies to enhance your experience on our website.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={acceptAll}
                glow
              >
                Accept All Cookies
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={showPreferencesModal}
              >
                Customize Preferences
              </Button>
              <Button
                variant="ghost"
                size="md"
                onClick={rejectNonEssential}
              >
                Essential Only
              </Button>
            </div>
          </Card>
        )}
      </section>

      {/* Contact Information */}
      <section>
        <Card variant="glass" className="p-8 text-center">
          <h3 className="text-xl font-semibold text-white mb-4 text-white">
            Questions About Our Policies?
          </h3>
          <p className="text-white mb-6 max-w-2xl mx-auto">
            For privacy, terms, data processing agreements, or any legal inquiries, 
            our legal team is available to assist you.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => window.location.href = '/contact'}
          >
            Contact Legal Team
          </Button>
        </Card>
      </section>
    </div>
  )
}
