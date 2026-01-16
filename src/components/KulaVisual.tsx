/**
 * KULA EXECUTIVE AI ASSISTANT
 * Professional credit operations assistant interface for enterprise executives
 * No fluff. No emojis. Just sophisticated, intelligent assistance.
 */

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  status?: 'thinking' | 'complete'
  metrics?: {
    accounts?: number
    impact?: string
    confidence?: number
  }
  actions?: Array<{
    label: string
    type: 'primary' | 'secondary'
  }>
}

export default function KulaVisual() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Portfolio analysis ready. Texas collections dropped 15% last month - primarily from delayed first payments in the Austin region. I can show you the specific segments affected.',
      timestamp: new Date(Date.now() - 180000),
      status: 'complete',
      metrics: {
        accounts: 2847,
        impact: '$1.2M',
        confidence: 94
      },
      actions: [
        { label: 'View Analysis', type: 'primary' },
        { label: 'Deploy Strategy', type: 'secondary' }
      ]
    },
    {
      id: '2',
      type: 'user',
      content: 'Show me accounts 30-60 days past due with payment capacity above $500',
      timestamp: new Date(Date.now() - 120000),
      status: 'complete'
    },
    {
      id: '3',
      type: 'assistant',
      content: 'Found 3,421 accounts matching criteria. Average balance: $2,340. Historical recovery rate: 68%. These accounts respond best to structured payment plans with 3-6 month terms.',
      timestamp: new Date(Date.now() - 60000),
      status: 'complete',
      metrics: {
        accounts: 3421,
        impact: '$8.0M',
        confidence: 91
      },
      actions: [
        { label: 'Create Campaign', type: 'primary' },
        { label: 'Export List', type: 'secondary' }
      ]
    }
  ])

  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
      status: 'complete'
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Processing your request. I\'ll analyze the relevant portfolios and compliance requirements.',
        timestamp: new Date(),
        status: 'thinking'
      }
      setMessages(prev => [...prev, assistantMessage])
    }, 500)

    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          content: 'Analysis complete. I\'ve identified optimization opportunities that could improve recovery rates by 12% while maintaining full FDCPA compliance.',
          status: 'complete',
          metrics: {
            accounts: 5672,
            impact: '$3.4M',
            confidence: 89
          },
          actions: [
            { label: 'Review Strategy', type: 'primary' },
            { label: 'Schedule Discussion', type: 'secondary' }
          ]
        }
        return updated
      })
    }, 2000)
  }

  return (
    <div className="h-full flex flex-col max-h-[480px] bg-[#0A0A0A]">
      {/* Professional Header */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Kula Executive Assistant</h3>
            <p className="text-sm text-[#B0B0B0]">Credit Operations Intelligence</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Status Indicator */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00FFB2]" />
              <span className="text-sm text-[#B0B0B0]">Connected to Kendra</span>
            </div>
            {/* Metrics Summary */}
            <div className="flex items-center gap-4 text-sm text-[#666666]">
              <span>42K accounts monitored</span>
              <span>99.8% compliance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[75%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                {/* Message Bubble */}
                <div className={`rounded-xl px-4 py-3 ${
                  message.type === 'user' 
                    ? 'bg-[#111111] border border-white/10' 
                    : 'bg-[#111111] border border-white/10'
                }`}>
                  {/* Message Content */}
                  <p className={`text-sm leading-relaxed ${
                    message.type === 'user' ? 'text-white' : 'text-white/90'
                  }`}>
                    {message.content}
                  </p>

                  {/* Metrics Card - Only for assistant messages */}
                  {message.type === 'assistant' && message.metrics && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="mt-3 p-3 bg-[#0A0A0A] rounded-lg border border-white/5"
                    >
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div>
                          <p className="text-xs text-[#666666] uppercase tracking-wide">Accounts</p>
                          <p className="text-base font-semibold text-white mt-0.5">
                            {message.metrics.accounts?.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-[#666666] uppercase tracking-wide">Impact</p>
                          <p className="text-base font-semibold text-white mt-0.5">
                            {message.metrics.impact}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-[#666666] uppercase tracking-wide">Confidence</p>
                          <p className="text-base font-semibold text-white mt-0.5">
                            {message.metrics.confidence}%
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  {message.actions && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mt-3 flex gap-2"
                    >
                      {message.actions.map((action, i) => (
                        <button
                          key={i}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                            action.type === 'primary'
                              ? 'bg-[#00FFB2] text-black hover:brightness-110 active:scale-[0.98]'
                              : 'border border-white/20 text-white hover:border-[#00FFB2] hover:text-[#00FFB2]'
                          }`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Timestamp */}
                <p className="text-xs text-[#666666] mt-1 px-1">
                  {message.timestamp.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex justify-start"
          >
            <div className="bg-[#111111] border border-white/10 rounded-xl px-4 py-3">
              <div className="flex items-center gap-1.5">
                <motion.div
                  className="w-2 h-2 rounded-full bg-[#00FFB2]/70"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full bg-[#00FFB2]/70"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full bg-[#00FFB2]/70"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Professional Input Area */}
      <div className="px-6 py-4 border-t border-white/10">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about portfolio performance, compliance, or strategy..."
              className="flex-1 bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-[#666666] focus:border-[#00FFB2] focus:outline-none transition-colors duration-150 text-sm"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!input.trim()}
              className="bg-[#00FFB2] text-black px-6 py-3 rounded-lg font-medium hover:brightness-110 active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Send
            </motion.button>
          </div>
        </form>

        {/* Quick Actions */}
        <div className="mt-3 flex items-center gap-2">
          <p className="text-xs text-[#666666]">Quick queries:</p>
          <div className="flex gap-2">
            {[
              'Portfolio health',
              'Compliance status',
              'Recovery trends'
            ].map((query) => (
              <button
                key={query}
                onClick={() => setInput(query)}
                className="text-xs text-[#B0B0B0] hover:text-[#00FFB2] transition-colors duration-150"
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Professional Status Bar */}
      <div className="px-6 py-2 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-[#666666]">
          <span>Kendra v2.4.1</span>
          <span>•</span>
          <span>Response time: 0.3s</span>
          <span>•</span>
          <span>Full audit trail enabled</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00FFB2]" />
          <span className="text-[#666666]">All systems operational</span>
        </div>
      </div>
    </div>
  )
}