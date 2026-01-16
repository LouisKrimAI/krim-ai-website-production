import React from 'react'
import KendraElite from '../components/KendraElite'

export default function KendraElitePreview() {
  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Kendra Elite Visualization
          </h1>
          <p className="text-lg text-[#B0B0B0]">
            Swiss precision meets enterprise governance
          </p>
        </div>
        
        <div className="bg-[#111111] p-8 rounded-2xl border border-white/10">
          <KendraElite />
        </div>
        
        <div className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-4">Design Philosophy</h2>
          <ul className="space-y-2 text-[#B0B0B0]">
            <li>• Inspired by Bloomberg Terminal and Swiss banking interfaces</li>
            <li>• Every pixel serves a purpose - no decorative elements</li>
            <li>• Monochromatic with strategic Mint accent (#00FFB2)</li>
            <li>• Typography-forward design with data visualization</li>
            <li>• Real-time metrics that build trust through transparency</li>
            <li>• Would pass the CFO credibility test immediately</li>
          </ul>
        </div>
      </div>
    </div>
  )
}