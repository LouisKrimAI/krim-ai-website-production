/**
 * KRIM AI - KENDRA DESIGN PREVIEW
 * Compare professional design approaches
 */

import { useState } from 'react'
import KendraProfessional from '../components/KendraProfessional'
import KendraSwissDesign from '../components/KendraSwissDesign'
import KendraIndustrial from '../components/KendraIndustrial'

export default function KendraDesignPreview() {
  const [activeDesign, setActiveDesign] = useState<'professional' | 'swiss' | 'industrial'>('professional')

  const designs = [
    {
      id: 'professional',
      name: 'Bloomberg Terminal',
      description: 'Financial trading interface inspired design with control matrices and real-time monitoring',
      component: KendraProfessional
    },
    {
      id: 'swiss',
      name: 'Swiss Minimal',
      description: 'Clean, grid-based design following Swiss design principles with perfect typography',
      component: KendraSwissDesign
    },
    {
      id: 'industrial',
      name: 'SCADA Industrial',
      description: 'Industrial control system interface with process flow diagrams and safety systems',
      component: KendraIndustrial
    }
  ]

  const ActiveComponent = designs.find(d => d.id === activeDesign)?.component || KendraProfessional

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Design Selector */}
      <div className="border-b border-white/10 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-white mb-2">Kendra Professional Design Options</h1>
            <p className="text-[#666666] text-sm">
              Three enterprise-grade approaches that avoid generic AI design patterns
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {designs.map((design) => (
              <button
                key={design.id}
                onClick={() => setActiveDesign(design.id as any)}
                className={`text-left p-4 border transition-all duration-150 ${
                  activeDesign === design.id
                    ? 'bg-[#141414] border-[#00FFB2]'
                    : 'bg-[#0A0A0A] border-white/10 hover:border-white/20'
                }`}
              >
                <div className={`font-medium mb-1 ${
                  activeDesign === design.id ? 'text-[#00FFB2]' : 'text-white'
                }`}>
                  {design.name}
                </div>
                <div className="text-[#666666] text-xs">
                  {design.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Design Preview */}
      <ActiveComponent />

      {/* Implementation Notes */}
      <div className="border-t border-white/10 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h2 className="text-lg font-semibold text-white mb-4">Design Principles Applied</h2>
          
          <div className="grid grid-cols-3 gap-6 text-sm">
            <div>
              <div className="text-[#00FFB2] font-medium mb-2">No AI Clichés</div>
              <ul className="text-[#666666] space-y-1">
                <li>• No orbiting particles</li>
                <li>• No glowing orbs</li>
                <li>• No rotating rings</li>
                <li>• No neural networks</li>
                <li>• No sci-fi effects</li>
              </ul>
            </div>
            
            <div>
              <div className="text-[#00FFB2] font-medium mb-2">Professional Standards</div>
              <ul className="text-[#666666] space-y-1">
                <li>• Grid-based layouts</li>
                <li>• Typography hierarchy</li>
                <li>• Purposeful whitespace</li>
                <li>• Minimal animations</li>
                <li>• Data-driven visuals</li>
              </ul>
            </div>
            
            <div>
              <div className="text-[#00FFB2] font-medium mb-2">Enterprise Trust</div>
              <ul className="text-[#666666] space-y-1">
                <li>• Industrial aesthetics</li>
                <li>• Control system metaphors</li>
                <li>• Compliance focus</li>
                <li>• Audit visibility</li>
                <li>• Professional restraint</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-4 bg-[#0A0A0A] border border-white/10">
            <div className="text-[#666666] text-sm mb-2">Implementation Note:</div>
            <div className="text-white text-sm">
              Each design is production-ready and follows the Krim Visual Design System. 
              Choose based on your audience: Bloomberg for traders, Swiss for executives, Industrial for operations teams.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}