/**
 * KRIM AI - KENDRA INDUSTRIAL CONTROL INTERFACE
 * SCADA-inspired control system for AI governance
 * No decorative elements - pure functional design
 */

import { useState, useEffect } from 'react'

export default function KendraIndustrial() {
  const [timestamp, setTimestamp] = useState(new Date().toISOString())
  const [controlState, setControlState] = useState({
    primaryCircuit: 'ENGAGED',
    secondaryCircuit: 'STANDBY',
    governanceMode: 'ENFORCE',
    auditStatus: 'RECORDING'
  })

  // Update timestamp
  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(new Date().toISOString())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Process flow stages
  const processStages = [
    { id: 'INTAKE', status: 'ACTIVE', pressure: 2.4, flow: 847 },
    { id: 'VALIDATE', status: 'ACTIVE', pressure: 2.3, flow: 845 },
    { id: 'ANALYZE', status: 'ACTIVE', pressure: 2.1, flow: 842 },
    { id: 'PROCESS', status: 'ACTIVE', pressure: 2.0, flow: 840 },
    { id: 'OUTPUT', status: 'ACTIVE', pressure: 1.8, flow: 838 }
  ]

  // Safety interlocks
  const interlocks = [
    { system: 'COMPLIANCE_LOCK', status: 'ENGAGED', indicator: 'GREEN' },
    { system: 'AUDIT_TRACE', status: 'ACTIVE', indicator: 'GREEN' },
    { system: 'RISK_MONITOR', status: 'ARMED', indicator: 'GREEN' },
    { system: 'DATA_INTEGRITY', status: 'VERIFIED', indicator: 'GREEN' },
    { system: 'AUTH_CONTROL', status: 'SECURED', indicator: 'GREEN' },
    { system: 'FAILSAFE', status: 'READY', indicator: 'AMBER' }
  ]

  return (
    <section className="py-16 md:py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Industrial Header */}
        <div className="bg-[#111111] border-2 border-[#333333] p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div>
                <div className="text-[#999999] text-xs font-mono mb-1">SYSTEM DESIGNATION</div>
                <div className="text-white text-2xl font-bold font-mono">KENDRA-01</div>
              </div>
              <div className="h-12 w-px bg-[#333333]" />
              <div>
                <div className="text-[#999999] text-xs font-mono mb-1">CLASSIFICATION</div>
                <div className="text-[#00FFB2] text-lg font-mono">OPERATIONAL</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[#999999] text-xs font-mono mb-1">SYSTEM TIME</div>
              <div className="text-white font-mono text-sm">{timestamp}</div>
            </div>
          </div>
        </div>

        {/* Main Control Panel */}
        <div className="grid grid-cols-12 gap-4">
          
          {/* Left Panel - System Controls */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            {/* Primary Controls */}
            <div className="bg-[#0A0A0A] border border-[#333333] p-4">
              <div className="text-[#999999] text-xs font-mono mb-4">PRIMARY CONTROLS</div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#999999] text-xs font-mono">MAIN CIRCUIT</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 ${controlState.primaryCircuit === 'ENGAGED' ? 'bg-[#00FFB2]' : 'bg-[#333333]'}`} />
                    <span className="text-white text-xs font-mono">{controlState.primaryCircuit}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-[#999999] text-xs font-mono">BACKUP CIRCUIT</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 ${controlState.secondaryCircuit === 'ACTIVE' ? 'bg-[#00FFB2]' : 'bg-[#FF9900]'}`} />
                    <span className="text-white text-xs font-mono">{controlState.secondaryCircuit}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-[#999999] text-xs font-mono">GOVERNANCE</span>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#00FFB2]" />
                    <span className="text-white text-xs font-mono">{controlState.governanceMode}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-[#999999] text-xs font-mono">AUDIT SYSTEM</span>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#00FFB2] animate-pulse" />
                    <span className="text-white text-xs font-mono">{controlState.auditStatus}</span>
                  </div>
                </div>
              </div>
              
              {/* Control Buttons */}
              <div className="mt-4 pt-4 border-t border-[#333333] grid grid-cols-2 gap-2">
                <button className="bg-[#1A1A1A] border border-[#333333] text-[#999999] text-xs font-mono py-2 hover:border-[#666666] transition-colors">
                  ENABLE
                </button>
                <button className="bg-[#1A1A1A] border border-[#333333] text-[#999999] text-xs font-mono py-2 hover:border-[#666666] transition-colors">
                  DISABLE
                </button>
                <button className="bg-[#1A1A1A] border border-[#333333] text-[#999999] text-xs font-mono py-2 hover:border-[#666666] transition-colors col-span-2">
                  EMERGENCY STOP
                </button>
              </div>
            </div>

            {/* Safety Interlocks */}
            <div className="bg-[#0A0A0A] border border-[#333333] p-4">
              <div className="text-[#999999] text-xs font-mono mb-4">SAFETY INTERLOCKS</div>
              
              <div className="space-y-2">
                {interlocks.map((lock) => (
                  <div key={lock.system} className="flex items-center justify-between">
                    <span className="text-[#666666] text-xs font-mono">{lock.system}</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 ${
                        lock.indicator === 'GREEN' ? 'bg-[#00FF00]' : 
                        lock.indicator === 'AMBER' ? 'bg-[#FF9900]' : 
                        'bg-[#FF0000]'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center - Process Flow Diagram */}
          <div className="col-span-12 lg:col-span-6">
            <div className="bg-[#0A0A0A] border border-[#333333] p-6 h-full">
              <div className="text-[#999999] text-xs font-mono mb-6">PROCESS FLOW SCHEMATIC</div>
              
              {/* Flow Stages */}
              <div className="space-y-4">
                {processStages.map((stage, idx) => (
                  <div key={stage.id}>
                    <div className="bg-[#111111] border border-[#333333] p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <div className="text-white font-mono text-sm">[{idx + 1}]</div>
                          <div>
                            <div className="text-white font-mono">{stage.id}</div>
                            <div className="text-[#666666] text-xs font-mono">STAGE {idx + 1}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div>
                            <div className="text-[#999999] text-xs font-mono">PRESSURE</div>
                            <div className="text-white font-mono">{stage.pressure} BAR</div>
                          </div>
                          <div>
                            <div className="text-[#999999] text-xs font-mono">FLOW</div>
                            <div className="text-[#00FFB2] font-mono">{stage.flow} L/S</div>
                          </div>
                          <div className={`px-2 py-1 text-xs font-mono ${
                            stage.status === 'ACTIVE' ? 'bg-[#00FF00]/20 text-[#00FF00]' : 'bg-[#FF9900]/20 text-[#FF9900]'
                          }`}>
                            {stage.status}
                          </div>
                        </div>
                      </div>
                      
                      {/* Flow indicator bar */}
                      <div className="h-2 bg-[#0A0A0A] border border-[#333333] relative overflow-hidden">
                        <div className="absolute left-0 top-0 h-full bg-[#00FFB2]/30" style={{ width: `${(stage.flow / 850) * 100}%` }} />
                      </div>
                    </div>
                    
                    {idx < processStages.length - 1 && (
                      <div className="flex justify-center py-2">
                        <div className="w-0.5 h-4 bg-[#333333]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* System Totals */}
              <div className="mt-6 pt-6 border-t border-[#333333] grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-[#999999] text-xs font-mono mb-2">TOTAL THROUGHPUT</div>
                  <div className="text-[#00FFB2] text-2xl font-mono font-bold">4,212</div>
                  <div className="text-[#666666] text-xs font-mono">UNITS/HR</div>
                </div>
                <div className="text-center">
                  <div className="text-[#999999] text-xs font-mono mb-2">EFFICIENCY</div>
                  <div className="text-white text-2xl font-mono font-bold">98.7%</div>
                  <div className="text-[#666666] text-xs font-mono">OPTIMAL</div>
                </div>
                <div className="text-center">
                  <div className="text-[#999999] text-xs font-mono mb-2">COMPLIANCE</div>
                  <div className="text-[#00FF00] text-2xl font-mono font-bold">100%</div>
                  <div className="text-[#666666] text-xs font-mono">VERIFIED</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - System Monitoring */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            {/* Alarm Panel */}
            <div className="bg-[#0A0A0A] border border-[#333333] p-4">
              <div className="text-[#999999] text-xs font-mono mb-4">ALARM PANEL</div>
              
              <div className="space-y-2 mb-4">
                <div className="bg-[#111111] border border-[#333333] p-2 flex items-center justify-between">
                  <span className="text-[#666666] text-xs font-mono">CRITICAL</span>
                  <span className="text-[#00FF00] text-xs font-mono">0 ACTIVE</span>
                </div>
                <div className="bg-[#111111] border border-[#333333] p-2 flex items-center justify-between">
                  <span className="text-[#666666] text-xs font-mono">WARNING</span>
                  <span className="text-[#00FF00] text-xs font-mono">0 ACTIVE</span>
                </div>
                <div className="bg-[#111111] border border-[#333333] p-2 flex items-center justify-between">
                  <span className="text-[#666666] text-xs font-mono">INFO</span>
                  <span className="text-white text-xs font-mono">3 ACTIVE</span>
                </div>
              </div>
              
              <button className="w-full bg-[#1A1A1A] border border-[#333333] text-[#999999] text-xs font-mono py-2 hover:border-[#666666] transition-colors">
                ACKNOWLEDGE ALL
              </button>
            </div>

            {/* Agent Status Grid */}
            <div className="bg-[#0A0A0A] border border-[#333333] p-4">
              <div className="text-[#999999] text-xs font-mono mb-4">AGENT STATUS</div>
              
              <div className="grid grid-cols-3 gap-2">
                {['A01', 'A02', 'A03', 'A04', 'A05', 'A06', 'A07', 'A08', 'A09'].map((agent) => (
                  <div key={agent} className="bg-[#111111] border border-[#333333] p-2 text-center">
                    <div className="text-[#666666] text-xs font-mono mb-1">{agent}</div>
                    <div className={`w-3 h-3 mx-auto ${
                      ['A01', 'A02', 'A03', 'A04', 'A05', 'A06', 'A07'].includes(agent) 
                        ? 'bg-[#00FF00]' 
                        : 'bg-[#666666]'
                    }`} />
                  </div>
                ))}
              </div>
            </div>

            {/* System Log */}
            <div className="bg-black border border-[#333333] p-3">
              <div className="text-[#999999] text-xs font-mono mb-3">SYSTEM LOG</div>
              
              <div className="font-mono text-xs space-y-1 h-32 overflow-hidden">
                <div className="text-[#00FF00]">&gt; System initialized</div>
                <div className="text-[#999999]">&gt; Loading governance rules...</div>
                <div className="text-[#999999]">&gt; Compliance modules active</div>
                <div className="text-[#999999]">&gt; Audit trail enabled</div>
                <div className="text-[#00FFB2]">&gt; All systems operational</div>
                <div className="text-[#666666]">&gt; Monitoring active processes</div>
                <div className="text-[#666666]">&gt; Agent pool: 7/10 active</div>
                <div className="text-[#666666]">_</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="mt-6 bg-[#111111] border-2 border-[#333333] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button className="bg-[#00FFB2] text-black px-6 py-2 font-mono text-sm font-bold hover:brightness-110 transition">
                EXECUTE PROTOCOL
              </button>
              <button className="border border-[#666666] text-[#999999] px-6 py-2 font-mono text-sm hover:border-white hover:text-white transition">
                VIEW SCHEMATICS
              </button>
            </div>
            <div className="text-[#666666] text-xs font-mono">
              KENDRA CONTROL INTERFACE v2.4.1 | INDUSTRIAL GRADE
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}