import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Phone, EnvelopeSimple, MapPin, LinkedinLogo, XLogo } from '@phosphor-icons/react'
import { KrimAnimatedLogo } from './KrimLogo'

export default function Footer(){
  return (
    <footer className="relative border-t border-white/10" role="contentinfo" aria-label="Site footer">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-krim-mint/[0.02] to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6 section-spacing-md">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-3">
            <div className="mb-4">
              <KrimAnimatedLogo size="lg" />
            </div>
            <div className="mb-6">
              <p className="body-regular text-white mb-2">
                Safe <span className="highlight-superintelligence">Superintelligence</span><br />
                for <span className="highlight-credit-operations">Autonomous Banks</span>
              </p>
              <p className="caption-text">
                <span className="text-krim-cyan font-semibold">Atomic</span> - <span className="text-krim-mint font-semibold">Composable</span> - <span className="text-krim-cyan font-semibold">Governed</span>
              </p>
            </div>
            
          </div>

          {/* Solutions */}
          <div className="lg:col-span-2 lg:pt-6">
            <h2 className="card-heading text-white mb-4">KrimOS</h2>
            <ul className="space-y-1 text-sm">
              <li><Link to="/kendra" className="text-white text-readable hover:text-krim-mint transition-colors inline-flex items-center min-h-[32px]">Kendra</Link></li>
              <li><Link to="/kula" className="text-white text-readable hover:text-krim-mint transition-colors inline-flex items-center min-h-[32px]">Kula</Link></li>
              <li><Link to="/karta" className="text-white text-readable hover:text-krim-mint transition-colors inline-flex items-center min-h-[32px]">Karta</Link></li>
              <li><Link to="/kupa" className="text-white text-readable hover:text-krim-mint transition-colors inline-flex items-center min-h-[32px]">Kupa</Link></li>
              <li><Link to="/kriya" className="text-white text-readable hover:text-krim-mint transition-colors inline-flex items-center min-h-[32px]">Kriya</Link></li>
            </ul>
          </div>

          {/* Research */}
          <div className="lg:col-span-2 lg:pt-6">
            <h2 className="card-heading text-white mb-4">Research</h2>
            <ul className="space-y-1 text-sm">
              <li><Link to="/safe-superintelligence" className="text-white hover:text-krim-mint transition-colors inline-flex items-center min-h-[32px]">Safe Superintelligence</Link></li>
            </ul>
          </div>


          {/* Company - Hidden for now
          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-white hover:text-krim-mint transition-colors">About Us</Link></li>
            </ul>
          </div>
          */}

          {/* Legal & Compliance */}
          <div className="lg:col-span-2 lg:pt-6">
            <h2 className="card-heading text-white mb-4 whitespace-nowrap">Legal & Compliance</h2>
            <ul className="space-y-1 text-sm">
              <li><Link to="/legal/privacy" className="text-white hover:text-krim-mint transition-colors inline-flex items-center min-h-[32px]">Privacy Policy</Link></li>
              <li><Link to="/legal/terms" className="text-white hover:text-krim-mint transition-colors inline-flex items-center min-h-[32px]">Terms of Service</Link></li>
              <li><Link to="/legal/security" className="text-white hover:text-krim-mint transition-colors inline-flex items-center min-h-[32px]">Security</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 lg:pt-6">
            <h2 className="card-heading text-white mb-4">Contact</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-white">
                <Phone className="w-4 h-4 text-krim-mint" />
                <a href="tel:+15103455686" className="hover:text-krim-mint transition-colors inline-flex items-center min-h-[48px]">
                  +1 510-345-5686
                </a>
              </div>
              <div className="flex items-center gap-2 text-white">
                <EnvelopeSimple className="w-4 h-4 text-krim-mint" />
                <a href="mailto:hello@krim.ai" className="hover:text-krim-mint transition-colors inline-flex items-center min-h-[48px]">
                  hello@krim.ai
                </a>
              </div>
              <div className="flex items-start gap-2 text-white">
                <MapPin className="w-4 h-4 text-krim-mint mt-0.5" />
                <div>
                  <div>169 Madison Ave</div>
                  <div>STE 15775</div>
                  <div>New York, NY 10016</div>
                  <div>United States</div>
                </div>
              </div>
              
              {/* Social Media Links */}
              <div className="flex items-center gap-4 pt-4">
                <a
                  href="https://www.linkedin.com/company/krim/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-krim-mint transition-colors inline-flex items-center justify-center min-w-[48px] min-h-[48px]"
                  aria-label="Follow Krim AI on LinkedIn"
                >
                  <LinkedinLogo className="w-6 h-6" />
                </a>
                <a
                  href="https://x.com/TheKrimAI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-krim-mint transition-colors inline-flex items-center justify-center min-w-[48px] min-h-[48px]"
                  aria-label="Follow Krim AI on X (Twitter)"
                >
                  <XLogo className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>


        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-center items-center gap-4">
          <div className="text-sm sm:text-base text-white text-center">
            © {new Date().getFullYear()} Krim AI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
