/**
 * Kula Visual V2: Simple Chat Dialogue Interface
 * Shows natural conversation with AI assistant
 */

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  sender: 'user' | 'kula'
  text: string
  timestamp: number
  typing?: boolean
}

const KulaVisualV2: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'kula',
      text: "Hi! I'm Kula, your AI assistant. How can I help you today?",
      timestamp: Date.now() - 300000
    }
  ])
  
  const [isTyping, setIsTyping] = useState(false)

  const conversations = [
    {
      userMessage: "Build a campaign to target accounts 60+ days past due with balances over $5,000",
      kulaResponse: "I'll create a high-priority outreach campaign using phone calls and registered mail for maximum impact. Want me to add settlement offer triggers?"
    },
    {
      userMessage: "Set up automated weekly compliance reports for the legal team",
      kulaResponse: "I'll generate automated reports covering FDCPA violations, dispute rates, and settlement approvals. Want specific state regulation tracking?"
    },
    {
      userMessage: "I need automated weekly reports sent to different teams for our credit card cross-sell campaign",
      kulaResponse: "I'll build segmented weekly reports - executive summary for leadership, detailed metrics for marketing, and compliance stats for risk teams. Include campaign ROI breakdowns?"
    }
  ]


  useEffect(() => {
    let conversationIndex = 0
    
    const cycleConversations = () => {
      const conversation = conversations[conversationIndex]
      
      // Reset to just Kula greeting
      setMessages([{
        id: '1',
        sender: 'kula',
        text: "Hi! I'm Kula, your AI assistant. How can I help you today?",
        timestamp: Date.now()
      }])
      
      // Add user message after delay
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: `user-${Date.now()}`,
          sender: 'user',
          text: conversation.userMessage,
          timestamp: Date.now()
        }])
        
        // Show Kula typing
        setIsTyping(true)
        
        // Add Kula response after typing delay
        setTimeout(() => {
          setIsTyping(false)
          setMessages(prev => [...prev, {
            id: `kula-${Date.now()}`,
            sender: 'kula', 
            text: conversation.kulaResponse,
            timestamp: Date.now()
          }])
        }, 2000)
      }, 2000)
      
      // Move to next conversation
      conversationIndex = (conversationIndex + 1) % conversations.length
    }

    // Start first conversation immediately
    cycleConversations()
    
    // Set up interval for subsequent conversations
    const interval = setInterval(cycleConversations, 12000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900/90 to-gray-900/90 rounded-xl">
      <div className="w-full h-full max-w-md mx-auto flex flex-col">
        
        {/* Chat Header */}
        <div className="flex items-center gap-3 p-4 border-b border-cyan-400/20">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 flex items-center justify-center">
            <span className="text-cyan-400 font-bold text-sm">K</span>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Kula AI Assistant</div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <span className="text-xs text-emerald-300">Online</span>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-700/80 text-white border border-cyan-400/20'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex justify-start"
            >
              <div className="bg-slate-700/80 text-white border border-cyan-400/20 px-4 py-2 rounded-2xl">
                <div className="flex items-center gap-1">
                  <div className="flex gap-1">
                    <motion.div
                      className="w-2 h-2 bg-cyan-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-cyan-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-cyan-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                  <span className="text-xs text-cyan-300 ml-2">Kula is thinking...</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-3 border-t border-cyan-400/20">
          <div className="flex items-center gap-2 p-2.5 bg-slate-800/40 rounded-xl border border-cyan-400/20">
            <input
              type="text"
              placeholder="Describe the workflow you want to create..."
              className="flex-1 bg-transparent text-white text-xs placeholder-white/50 outline-none min-w-0"
              disabled
            />
            <button className="w-7 h-7 bg-cyan-500 rounded-lg flex items-center justify-center hover:bg-cyan-400 transition-colors shrink-0">
              <span className="text-white text-xs">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KulaVisualV2