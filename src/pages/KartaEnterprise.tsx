import React from 'react'
import KartaVisual from '../components/sections/KartaVisual'

const KartaEnterprise: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header Section */}
      <div className="border-b border-white/5 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-white">
                Karta AI Workforce Platform
              </h1>
              <p className="text-[#B0B0B0] mt-2 text-lg leading-relaxed">
                Enterprise-grade autonomous agent management for financial operations
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="border border-white/20 text-white px-6 py-3 rounded-lg hover:border-[#00FFB2] hover:text-[#00FFB2] transition-colors duration-150">
                System Health
              </button>
              <button className="bg-[#00FFB2] text-black px-6 py-3 rounded-lg font-medium hover:brightness-110 active:scale-[0.98] transition-all duration-150">
                Deploy New Agent
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Executive Summary Bar */}
      <div className="bg-[#111111] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-5 gap-6">
            <div className="text-center">
              <p className="text-[#666666] text-xs tracking-wide mb-1">SYSTEM UPTIME</p>
              <p className="text-2xl font-bold text-white">99.98%</p>
            </div>
            <div className="text-center">
              <p className="text-[#666666] text-xs tracking-wide mb-1">MONTHLY VOLUME</p>
              <p className="text-2xl font-bold text-white">482K</p>
            </div>
            <div className="text-center">
              <p className="text-[#666666] text-xs tracking-wide mb-1">ERROR RATE</p>
              <p className="text-2xl font-bold text-[#00FFB2]">0.02%</p>
            </div>
            <div className="text-center">
              <p className="text-[#666666] text-xs tracking-wide mb-1">AVG RESOLUTION</p>
              <p className="text-2xl font-bold text-white">1.8s</p>
            </div>
            <div className="text-center">
              <p className="text-[#666666] text-xs tracking-wide mb-1">COST SAVINGS</p>
              <p className="text-2xl font-bold text-[#00FFB2]">$3.2M</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Department Overview */}
          <div className="col-span-3 space-y-4">
            <div className="bg-[#111111] rounded-xl p-6">
              <h3 className="text-white font-medium mb-4">Department Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-white text-sm">Collections</p>
                    <p className="text-[#666666] text-xs">3 agents active</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[#00FFB2]" />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-white text-sm">Compliance</p>
                    <p className="text-[#666666] text-xs">2 agents active</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[#00FFB2]" />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-white text-sm">Risk Management</p>
                    <p className="text-[#666666] text-xs">2 agents active</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-white text-sm">Operations</p>
                    <p className="text-[#666666] text-xs">1 agent idle</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[#666666]" />
                </div>
              </div>
            </div>

            {/* Compliance Status */}
            <div className="bg-[#111111] rounded-xl p-6">
              <h3 className="text-white font-medium mb-4">Compliance Status</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[#B0B0B0] text-xs">TCPA Compliance</p>
                    <p className="text-[#00FFB2] text-xs font-medium">100%</p>
                  </div>
                  <div className="w-full h-1 bg-[#1A1A1A] rounded-full">
                    <div className="w-full h-1 bg-[#00FFB2] rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[#B0B0B0] text-xs">FDCPA Compliance</p>
                    <p className="text-[#00FFB2] text-xs font-medium">100%</p>
                  </div>
                  <div className="w-full h-1 bg-[#1A1A1A] rounded-full">
                    <div className="w-full h-1 bg-[#00FFB2] rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[#B0B0B0] text-xs">Reg F Compliance</p>
                    <p className="text-[#00FFB2] text-xs font-medium">100%</p>
                  </div>
                  <div className="w-full h-1 bg-[#1A1A1A] rounded-full">
                    <div className="w-full h-1 bg-[#00FFB2] rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* System Alerts */}
            <div className="bg-[#111111] rounded-xl p-6">
              <h3 className="text-white font-medium mb-4">System Alerts</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#00FFB2] mt-1.5" />
                  <p className="text-[#B0B0B0] text-xs">All systems operational</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-white mt-1.5" />
                  <p className="text-[#B0B0B0] text-xs">Scheduled maintenance: Sunday 2AM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center - Main Workforce Dashboard */}
          <div className="col-span-9">
            <KartaVisual />
          </div>
        </div>

        {/* Bottom Section - Real-time Activity Feed */}
        <div className="mt-6 bg-[#111111] rounded-xl p-6">
          <h3 className="text-white font-medium mb-4">Real-time Activity Stream</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-4 py-2 border-b border-white/5">
              <span className="text-[#666666] text-xs w-20">12:34:22</span>
              <span className="text-[#00FFB2] text-xs font-medium w-32">CS-001</span>
              <span className="text-[#B0B0B0] text-sm">Completed payment arrangement for account #48291</span>
            </div>
            <div className="flex items-center gap-4 py-2 border-b border-white/5">
              <span className="text-[#666666] text-xs w-20">12:34:19</span>
              <span className="text-[#00FFB2] text-xs font-medium w-32">RA-001</span>
              <span className="text-[#B0B0B0] text-sm">Risk assessment completed for portfolio segment A-12</span>
            </div>
            <div className="flex items-center gap-4 py-2 border-b border-white/5">
              <span className="text-[#666666] text-xs w-20">12:34:15</span>
              <span className="text-[#00FFB2] text-xs font-medium w-32">CO-001</span>
              <span className="text-[#B0B0B0] text-sm">Compliance review passed for batch #7829</span>
            </div>
            <div className="flex items-center gap-4 py-2 border-b border-white/5">
              <span className="text-[#666666] text-xs w-20">12:34:11</span>
              <span className="text-[#00FFB2] text-xs font-medium w-32">PP-001</span>
              <span className="text-[#B0B0B0] text-sm">Payment plan structured for high-value account</span>
            </div>
            <div className="flex items-center gap-4 py-2">
              <span className="text-[#666666] text-xs w-20">12:34:08</span>
              <span className="text-[#00FFB2] text-xs font-medium w-32">PM-001</span>
              <span className="text-[#B0B0B0] text-sm">Portfolio rebalancing initiated for Q1 2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KartaEnterprise