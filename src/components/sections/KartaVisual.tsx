import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface WorkforceAgent {
  id: string
  name: string
  department: 'collections' | 'compliance' | 'risk' | 'operations'
  status: 'active' | 'idle' | 'processing'
  utilization: number // 0-100
  tasksCompleted: number
  accuracy: number
  avgResponseTime: number // in ms
  complianceScore: number
  currentQueue: number
}

const workforceData: WorkforceAgent[] = [
  {
    id: 'CS-001',
    name: 'Collections Specialist',
    department: 'collections',
    status: 'active',
    utilization: 87,
    tasksCompleted: 2847,
    accuracy: 99.2,
    avgResponseTime: 1200,
    complianceScore: 100,
    currentQueue: 43
  },
  {
    id: 'CO-001',
    name: 'Compliance Officer',
    department: 'compliance',
    status: 'processing',
    utilization: 92,
    tasksCompleted: 1923,
    accuracy: 99.8,
    avgResponseTime: 2100,
    complianceScore: 100,
    currentQueue: 28
  },
  {
    id: 'RA-001',
    name: 'Risk Assessment Analyst',
    department: 'risk',
    status: 'active',
    utilization: 78,
    tasksCompleted: 3214,
    accuracy: 98.7,
    avgResponseTime: 1800,
    complianceScore: 99,
    currentQueue: 67
  },
  {
    id: 'PP-001',
    name: 'Payment Plan Coordinator',
    department: 'operations',
    status: 'active',
    utilization: 81,
    tasksCompleted: 1576,
    accuracy: 99.4,
    avgResponseTime: 900,
    complianceScore: 100,
    currentQueue: 34
  },
  {
    id: 'RL-001',
    name: 'Regulatory Liaison',
    department: 'compliance',
    status: 'idle',
    utilization: 45,
    tasksCompleted: 892,
    accuracy: 99.9,
    avgResponseTime: 3400,
    complianceScore: 100,
    currentQueue: 12
  },
  {
    id: 'PM-001',
    name: 'Portfolio Manager',
    department: 'risk',
    status: 'processing',
    utilization: 94,
    tasksCompleted: 4127,
    accuracy: 98.5,
    avgResponseTime: 2200,
    complianceScore: 98,
    currentQueue: 89
  }
]

const KartaVisual: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<WorkforceAgent | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Calculate aggregate metrics
  const totalTasks = workforceData.reduce((acc, agent) => acc + agent.tasksCompleted, 0)
  const avgUtilization = Math.round(workforceData.reduce((acc, agent) => acc + agent.utilization, 0) / workforceData.length)
  const avgCompliance = Math.round(workforceData.reduce((acc, agent) => acc + agent.complianceScore, 0) / workforceData.length)
  const activeAgents = workforceData.filter(agent => agent.status === 'active').length

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-[#00FFB2]'
      case 'processing': return 'bg-white'
      case 'idle': return 'bg-[#666666]'
      default: return 'bg-[#666666]'
    }
  }

  const getDepartmentLabel = (dept: string) => {
    switch(dept) {
      case 'collections': return 'COLLECTIONS'
      case 'compliance': return 'COMPLIANCE'
      case 'risk': return 'RISK MGMT'
      case 'operations': return 'OPERATIONS'
      default: return dept.toUpperCase()
    }
  }

  return (
    <div className="w-full bg-[#0A0A0A] rounded-xl overflow-hidden">
      {/* Executive Dashboard Header */}
      <div className="bg-[#111111] border-b border-white/5 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Workforce Management System</h2>
            <p className="text-sm text-[#666666] mt-1 tracking-wide">ENTERPRISE AI OPERATIONS</p>
          </div>
          <div className="flex items-center gap-6">
            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors duration-150 ${
                  viewMode === 'grid' 
                    ? 'bg-[#00FFB2] text-black' 
                    : 'text-[#666666] hover:text-white'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors duration-150 ${
                  viewMode === 'list' 
                    ? 'bg-[#00FFB2] text-black' 
                    : 'text-[#666666] hover:text-white'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-4 gap-6 mt-6">
          <div className="bg-[#0A0A0A] rounded-lg p-4">
            <p className="text-[#666666] text-xs tracking-wide mb-1">TOTAL PROCESSED</p>
            <p className="text-2xl font-bold text-white">{totalTasks.toLocaleString()}</p>
            <p className="text-xs text-[#00FFB2] mt-1">+12% MTD</p>
          </div>
          <div className="bg-[#0A0A0A] rounded-lg p-4">
            <p className="text-[#666666] text-xs tracking-wide mb-1">AVG UTILIZATION</p>
            <p className="text-2xl font-bold text-white">{avgUtilization}%</p>
            <div className="w-full h-1 bg-[#1A1A1A] rounded-full mt-2">
              <div 
                className="h-1 bg-[#00FFB2] rounded-full transition-all duration-300"
                style={{ width: `${avgUtilization}%` }}
              />
            </div>
          </div>
          <div className="bg-[#0A0A0A] rounded-lg p-4">
            <p className="text-[#666666] text-xs tracking-wide mb-1">COMPLIANCE SCORE</p>
            <p className="text-2xl font-bold text-white">{avgCompliance}%</p>
            <p className="text-xs text-[#B0B0B0] mt-1">FULLY COMPLIANT</p>
          </div>
          <div className="bg-[#0A0A0A] rounded-lg p-4">
            <p className="text-[#666666] text-xs tracking-wide mb-1">ACTIVE AGENTS</p>
            <p className="text-2xl font-bold text-white">{activeAgents}/{workforceData.length}</p>
            <p className="text-xs text-[#B0B0B0] mt-1">OPERATIONAL</p>
          </div>
        </div>
      </div>

      {/* Workforce Grid/List */}
      <div className="p-8">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-3 gap-4">
            {workforceData.map((agent) => (
              <motion.div
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="bg-[#111111] rounded-xl p-6 hover:bg-[#141414] transition-colors duration-150 cursor-pointer"
              >
                {/* Agent Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-[#666666] text-xs tracking-wide mb-1">
                      {getDepartmentLabel(agent.department)}
                    </p>
                    <h3 className="text-white font-medium">{agent.name}</h3>
                    <p className="text-[#666666] text-xs mt-1">{agent.id}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
                </div>

                {/* Performance Metrics */}
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[#666666] text-xs">CAPACITY</p>
                      <p className="text-xs text-white font-medium">{agent.utilization}%</p>
                    </div>
                    <div className="w-full h-1 bg-[#1A1A1A] rounded-full">
                      <div 
                        className={`h-1 rounded-full transition-all duration-300 ${
                          agent.utilization > 85 ? 'bg-[#00FFB2]' : 'bg-white'
                        }`}
                        style={{ width: `${agent.utilization}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[#666666] text-xs">ACCURACY</p>
                      <p className="text-white text-sm font-medium">{agent.accuracy}%</p>
                    </div>
                    <div>
                      <p className="text-[#666666] text-xs">QUEUE</p>
                      <p className="text-white text-sm font-medium">{agent.currentQueue}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5">
                    <p className="text-[#666666] text-xs">DAILY VOLUME</p>
                    <p className="text-white text-lg font-semibold">{agent.tasksCompleted.toLocaleString()}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-[#111111] rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 text-xs font-medium text-[#666666] tracking-wide">AGENT</th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-[#666666] tracking-wide">STATUS</th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-[#666666] tracking-wide">UTILIZATION</th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-[#666666] tracking-wide">ACCURACY</th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-[#666666] tracking-wide">VOLUME</th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-[#666666] tracking-wide">COMPLIANCE</th>
                </tr>
              </thead>
              <tbody>
                {workforceData.map((agent) => (
                  <tr 
                    key={agent.id}
                    onClick={() => setSelectedAgent(agent)}
                    className="border-b border-white/5 hover:bg-[#141414] transition-colors duration-150 cursor-pointer"
                  >
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-white font-medium">{agent.name}</p>
                        <p className="text-[#666666] text-xs mt-1">{agent.id} • {getDepartmentLabel(agent.department)}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
                        <span className="text-[#B0B0B0] text-sm capitalize">{agent.status}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="w-20">
                        <p className="text-white text-sm font-medium mb-1">{agent.utilization}%</p>
                        <div className="w-full h-1 bg-[#1A1A1A] rounded-full">
                          <div 
                            className={`h-1 rounded-full ${
                              agent.utilization > 85 ? 'bg-[#00FFB2]' : 'bg-white'
                            }`}
                            style={{ width: `${agent.utilization}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-white text-sm font-medium">{agent.accuracy}%</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-white text-sm font-medium">{agent.tasksCompleted.toLocaleString()}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className={`text-sm font-medium ${
                        agent.complianceScore === 100 ? 'text-[#00FFB2]' : 'text-white'
                      }`}>
                        {agent.complianceScore}%
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Agent Detail Modal */}
      <AnimatePresence>
        {selectedAgent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setSelectedAgent(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111111] rounded-xl p-8 max-w-2xl w-full"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-[#00FFB2] text-xs tracking-wide mb-2">
                    {getDepartmentLabel(selectedAgent.department)}
                  </p>
                  <h3 className="text-2xl font-semibold text-white">{selectedAgent.name}</h3>
                  <p className="text-[#666666] text-sm mt-1">Agent ID: {selectedAgent.id}</p>
                </div>
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="text-[#666666] hover:text-white transition-colors duration-150"
                >
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Performance Overview */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-[#0A0A0A] rounded-lg p-4">
                  <p className="text-[#666666] text-xs tracking-wide mb-2">CURRENT STATUS</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(selectedAgent.status)}`} />
                    <p className="text-white font-medium capitalize">{selectedAgent.status}</p>
                  </div>
                </div>
                <div className="bg-[#0A0A0A] rounded-lg p-4">
                  <p className="text-[#666666] text-xs tracking-wide mb-2">QUEUE DEPTH</p>
                  <p className="text-2xl font-bold text-white">{selectedAgent.currentQueue}</p>
                </div>
              </div>

              {/* Detailed Metrics */}
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[#B0B0B0] text-sm">Capacity Utilization</p>
                    <p className="text-white font-medium">{selectedAgent.utilization}%</p>
                  </div>
                  <div className="w-full h-2 bg-[#1A1A1A] rounded-full">
                    <div 
                      className="h-2 bg-[#00FFB2] rounded-full transition-all duration-300"
                      style={{ width: `${selectedAgent.utilization}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#0A0A0A] rounded-lg p-4">
                    <p className="text-[#666666] text-xs tracking-wide mb-1">ACCURACY</p>
                    <p className="text-xl font-bold text-white">{selectedAgent.accuracy}%</p>
                  </div>
                  <div className="bg-[#0A0A0A] rounded-lg p-4">
                    <p className="text-[#666666] text-xs tracking-wide mb-1">AVG RESPONSE</p>
                    <p className="text-xl font-bold text-white">{(selectedAgent.avgResponseTime / 1000).toFixed(1)}s</p>
                  </div>
                  <div className="bg-[#0A0A0A] rounded-lg p-4">
                    <p className="text-[#666666] text-xs tracking-wide mb-1">COMPLIANCE</p>
                    <p className="text-xl font-bold text-[#00FFB2]">{selectedAgent.complianceScore}%</p>
                  </div>
                </div>
              </div>

              {/* Daily Performance */}
              <div className="border-t border-white/10 pt-6">
                <p className="text-[#666666] text-xs tracking-wide mb-3">TODAY'S PERFORMANCE</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[#B0B0B0] text-sm mb-1">Tasks Completed</p>
                    <p className="text-2xl font-bold text-white">{selectedAgent.tasksCompleted.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[#B0B0B0] text-sm mb-1">Efficiency Rating</p>
                    <p className="text-2xl font-bold text-[#00FFB2]">A+</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8">
                <button className="flex-1 bg-[#00FFB2] text-black px-6 py-3 rounded-lg font-medium hover:brightness-110 active:scale-[0.98] transition-all duration-150">
                  View Full Analytics
                </button>
                <button className="flex-1 border border-white/20 text-white px-6 py-3 rounded-lg hover:border-[#00FFB2] hover:text-[#00FFB2] transition-colors duration-150">
                  Configure Agent
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default KartaVisual