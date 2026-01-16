/**
 * TEXT READABILITY TEST PAGE
 * Phase 4: Showcases all text readability enhancements with starfield background
 * WCAG 2.1 AA Compliant
 */

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Shield, Brain, Lightning, Users } from '@phosphor-icons/react'

export default function TextReadabilityTest() {
  return (
    <div className="min-h-screen relative">
      {/* Content wrapper with transparent backgrounds to show starfield */}
      <div className="relative z-10 overflow-x-hidden">
        
        {/* Hero Section Test */}
        <section className="relative min-h-[600px] flex items-center py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-6xl font-black text-white hero-heading-readable mb-8">
              Text Readability Test Page
            </h1>
            <p className="text-2xl text-slate-100 text-readable-strong max-w-4xl mx-auto mb-4">
              Testing enhanced text contrast and readability with glass morphism backgrounds
            </p>
            <p className="text-xl text-emerald-400 text-readable-strong">
              All text optimized for starfield visibility while maintaining WCAG 2.1 AA standards
            </p>
            
            <div className="flex gap-4 justify-center mt-12">
              <button className="cta-primary-readable">
                Primary CTA Test
              </button>
              <button className="cta-secondary-readable">
                Secondary CTA Test
              </button>
            </div>
          </div>
        </section>

        {/* Section Headers Test */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-white section-heading-readable mb-8 text-center">
              Section Heading with Enhanced Readability
            </h2>
            <p className="text-xl text-gray-200 text-readable text-center max-w-3xl mx-auto">
              This section demonstrates how headings and body text maintain excellent contrast
              against the animated starfield background using our glass morphism system.
            </p>
          </div>
        </section>

        {/* Feature Cards Test */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-white section-heading-readable mb-12 text-center">
              Feature Cards with Glass Morphism
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "Enhanced Contrast",
                  description: "Text shadows and backing ensure readability on any starfield section"
                },
                {
                  icon: <Brain className="w-8 h-8" />,
                  title: "Smart Glass Layers",
                  description: "Dynamic glass morphism adjusts based on background brightness"
                },
                {
                  icon: <Lightning className="w-8 h-8" />,
                  title: "Performance Optimized",
                  description: "Efficient CSS-only solutions maintain 60fps animations"
                }
              ].map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="card-text-readable group hover:scale-105 transition-all duration-300"
                >
                  <div className="text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white text-readable-strong mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-200 text-readable">
                    {card.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Navigation Test */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-white section-heading-readable mb-8 text-center">
              Navigation Elements Test
            </h2>
            
            <div className="flex gap-6 justify-center flex-wrap">
              <a href="#home" className="nav-readable px-4 py-2">Home</a>
              <a href="#platform" className="nav-readable px-4 py-2">Platform</a>
              <a href="#products" className="nav-readable px-4 py-2">Products</a>
              <a href="#solutions" className="nav-readable px-4 py-2">Solutions</a>
              <a href="#contact" className="nav-readable px-4 py-2">Contact</a>
            </div>
          </div>
        </section>

        {/* Stats Test */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-white section-heading-readable mb-12 text-center">
              Statistics with High Contrast
            </h2>
            
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { value: "99.9%", label: "Uptime" },
                { value: "250ms", label: "Response Time" },
                { value: "10M+", label: "Interactions" },
                { value: "95%", label: "Accuracy" }
              ].map((stat, idx) => (
                <div key={idx} className="glass-standard p-6 rounded-xl">
                  <div className="stat-readable text-4xl font-bold mb-2">
                    {stat.value}
                  </div>
                  <div className="stat-label-readable">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content Sections Test */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="platform-section-readable">
              <h2 className="text-3xl font-bold text-white section-heading-readable mb-6">
                Platform Section with Glass Background
              </h2>
              <p className="text-lg text-gray-200 text-readable mb-4">
                This entire section has a glass morphism background with enhanced blur and border
                to ensure all content remains readable against the moving starfield.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-200 text-readable">
                    Text shadows provide depth and contrast
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-200 text-readable">
                    Glass backgrounds adapt to content needs
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-200 text-readable">
                    Accessibility standards maintained throughout
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* High Contrast Test */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold high-contrast-text mb-8">
              High Contrast Mode for Critical Information
            </h2>
            <p className="text-xl high-contrast-text max-w-3xl mx-auto">
              When maximum readability is required, high contrast text ensures perfect visibility
              with enhanced shadows and increased font weight.
            </p>
          </div>
        </section>

        {/* Accessibility Notes */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="hero-content-readable">
              <h2 className="text-3xl font-bold text-white section-heading-readable mb-6">
                Accessibility Enhancements
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white text-readable-strong mb-3">
                    WCAG 2.1 AA Compliance
                  </h3>
                  <ul className="space-y-2 text-gray-200 text-readable">
                    <li>• Minimum contrast ratio of 4.5:1 for normal text</li>
                    <li>• Minimum contrast ratio of 3:1 for large text</li>
                    <li>• Enhanced focus states for keyboard navigation</li>
                    <li>• Reduced motion support for accessibility</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white text-readable-strong mb-3">
                    Glass Morphism System
                  </h3>
                  <ul className="space-y-2 text-gray-200 text-readable">
                    <li>• Ultra-light to strong glass variants</li>
                    <li>• Dynamic blur and backdrop filters</li>
                    <li>• Border enhancements for definition</li>
                    <li>• Fallback styles for older browsers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white hero-heading-readable mb-6">
              Ready to Experience Enhanced Readability?
            </h2>
            <p className="text-xl text-gray-200 text-readable mb-8">
              All pages have been optimized with these readability enhancements
              while maintaining the elegant starfield effect.
            </p>
            <button className="cta-primary-readable text-lg px-8 py-4">
              Return to Homepage
              <ArrowRight className="inline-block ml-2" />
            </button>
          </div>
        </section>

      </div>
    </div>
  )
}