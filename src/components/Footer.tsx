import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Phone, EnvelopeSimple, MapPin, LinkedinLogo, XLogo } from '@phosphor-icons/react'
import { KrimAnimatedLogo } from './KrimLogo'
import { clsx } from 'clsx'

export default function Footer(){
  const { pathname } = useLocation()
  const isAlt = pathname === '/homepage-alt'
  const accentText = isAlt ? 'text-krim-mint' : 'text-krim-ochre'
  const accentHover = isAlt ? 'hover:text-krim-mint' : 'hover:text-krim-ochre'

  return (
    <footer className="relative border-t border-krim-ochre/15 bg-krim-indigo" role="contentinfo" aria-label="Site footer">
      <div className="relative max-w-7xl mx-auto px-6 section-spacing-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <KrimAnimatedLogo size="lg" treatment="mint" animated={isAlt} />
            </div>
            <div className="mb-6">
              <p className="brand-serif text-krim-off-white text-base leading-snug mb-3">
                The AI your regulator can read.
              </p>
              <p className="brand-sans text-krim-slate text-sm leading-relaxed">
                Sovereign superintelligence infrastructure for the operations that cannot afford to be wrong.
              </p>
            </div>
          </div>

          {/* KrimOS */}
          <div className="lg:col-span-2 lg:pt-6">
            <h2 className="brand-eyebrow text-krim-off-white/70 mb-4">KrimOS</h2>
            <ul className="space-y-1 text-sm">
              <li><Link to="/kendra" className={clsx("text-krim-off-white inline-flex items-center min-h-[32px] transition-colors", accentHover)}>Kendra · Runtime</Link></li>
              <li><Link to="/kula" className={clsx("text-krim-off-white inline-flex items-center min-h-[32px] transition-colors", accentHover)}>Kula · Twins</Link></li>
              <li><Link to="/karta" className={clsx("text-krim-off-white inline-flex items-center min-h-[32px] transition-colors", accentHover)}>Karta · Co-Workers</Link></li>
              <li><Link to="/kupa" className={clsx("text-krim-off-white inline-flex items-center min-h-[32px] transition-colors", accentHover)}>Kūpa · Dashboards</Link></li>
              <li><Link to="/kriya" className={clsx("text-krim-off-white inline-flex items-center min-h-[32px] transition-colors", accentHover)}>Kriya · Primitives</Link></li>
            </ul>
          </div>

          {/* Domains */}
          <div className="lg:col-span-2 lg:pt-6">
            <h2 className="brand-eyebrow text-krim-off-white/70 mb-4">Domains</h2>
            <ul className="space-y-1 text-sm">
              <li><Link to="/banking" className={clsx("text-krim-off-white inline-flex items-center min-h-[32px] transition-colors", accentHover)}>Banking</Link></li>
              <li><Link to="/government" className={clsx("text-krim-off-white inline-flex items-center min-h-[32px] transition-colors", accentHover)}>Government</Link></li>
            </ul>
          </div>

          {/* Research */}
          <div className="lg:col-span-2 lg:pt-6">
            <h2 className="brand-eyebrow text-krim-off-white/70 mb-4">Research</h2>
            <ul className="space-y-1 text-sm">
              <li><Link to="/safe-superintelligence" className={clsx("text-krim-off-white inline-flex items-center min-h-[32px] transition-colors", accentHover)}>Epistemic AI</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2 lg:pt-6">
            <h2 className="brand-eyebrow text-krim-off-white/70 mb-4 whitespace-nowrap">Legal & Compliance</h2>
            <ul className="space-y-1 text-sm">
              <li><Link to="/legal/privacy" className={clsx("text-krim-off-white inline-flex items-center min-h-[32px] transition-colors", accentHover)}>Privacy Policy</Link></li>
              <li><Link to="/legal/terms" className={clsx("text-krim-off-white inline-flex items-center min-h-[32px] transition-colors", accentHover)}>Terms of Service</Link></li>
              <li><Link to="/legal/security" className={clsx("text-krim-off-white inline-flex items-center min-h-[32px] transition-colors", accentHover)}>Security</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2 lg:pt-6">
            <h2 className="brand-eyebrow text-krim-off-white/70 mb-4">Contact</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-krim-off-white">
                <Phone className={clsx("w-4 h-4", accentText)} />
                <a href="tel:+15103455686" className={clsx("transition-colors inline-flex items-center min-h-[48px]", accentHover)}>
                  +1 510-345-5686
                </a>
              </div>
              <div className="flex items-center gap-2 text-krim-off-white">
                <EnvelopeSimple className={clsx("w-4 h-4", accentText)} />
                <a href="mailto:hello@krim.ai" className={clsx("transition-colors inline-flex items-center min-h-[48px]", accentHover)}>
                  hello@krim.ai
                </a>
              </div>
              <div className="flex items-start gap-2 text-krim-off-white">
                <MapPin className={clsx("w-4 h-4 mt-0.5", accentText)} />
                <div>
                  <div>169 Madison Ave</div>
                  <div>STE 15775</div>
                  <div>New York, NY 10016</div>
                  <div>United States</div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <a
                  href="https://www.linkedin.com/company/krim/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx("text-krim-off-white transition-colors inline-flex items-center justify-center min-w-[48px] min-h-[48px]", accentHover)}
                  aria-label="Follow Krim AI on LinkedIn"
                >
                  <LinkedinLogo className="w-6 h-6" />
                </a>
                <a
                  href="https://x.com/TheKrimAI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx("text-krim-off-white transition-colors inline-flex items-center justify-center min-w-[48px] min-h-[48px]", accentHover)}
                  aria-label="Follow Krim AI on X (Twitter)"
                >
                  <XLogo className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-krim-ochre/15 pt-8 flex flex-col md:flex-row justify-center items-center gap-4">
          <div className="text-sm sm:text-base text-krim-off-white/70 text-center">
            © {new Date().getFullYear()} Krim AI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
