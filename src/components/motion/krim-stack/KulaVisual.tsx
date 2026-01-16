/**
 * Kula Visual: Natural Language Transformation Pipeline
 * Shows natural language transforming into structured workflows through
 * an elegant transformation pipeline
 */

import React from 'react'
import { motion } from 'framer-motion'
import { tabColors, fadeInUp, shouldAnimate, timing } from './shared'

const KulaVisual: React.FC = () => {
  const colors = tabColors.kula

  const transformationStages = [
    {
      id: 'input',
      label: 'Natural Language',
      example: '"When account is 30+ days past due, send gentle reminder via preferred channel"',
      y: 60,
      width: 400
    },
    {
      id: 'parse',
      label: 'Intent Recognition',
      example: 'TRIGGER: account.days_past_due >= 30\nACTION: send_communication\nTONE: gentle_reminder\nCHANNEL: customer.preferred_channel',
      y: 140,
      width: 350
    },
    {
      id: 'structure',
      label: 'Structured Logic',
      example: '{\n  "trigger": {\n    "condition": "account.dpd >= 30",\n    "frequency": "daily"\n  },\n  "action": {\n    "type": "communication",\n    "template": "gentle_reminder",\n    "channel": "preferred"\n  }\n}',
      y: 220,
      width: 320
    },
    {
      id: 'workflow',
      label: 'Governed Workflow',
      example: '• Compliance: FDCPA checked ✓\n• Timing: Business hours ✓\n• Channel: Consent verified ✓\n• Template: Approved ✓',
      y: 300,
      width: 300
    }
  ]

  return (
    <motion.div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full">
          <defs>
            <pattern id="circuit" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0,20 Q20,0 40,20 Q20,40 0,20" fill="none" stroke="#00D4FF" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)"/>
        </svg>
      </div>

      {/* Transformation Pipeline */}
      <div className="relative w-[480px] h-[380px]">
        {/* Transformation Stages */}
        {transformationStages.map((stage, index) => (
          <motion.div
            key={stage.id}
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{ 
              top: `${stage.y}px`,
              width: `${stage.width}px`
            }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.3,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {/* Stage Container */}
            <div className={`
              relative p-4 rounded-xl border backdrop-blur-sm transition-all duration-500
              ${index === 0 ? 'bg-cyan-500/10 border-cyan-400/40' : 
                index === 1 ? 'bg-cyan-400/10 border-cyan-300/40' :
                index === 2 ? 'bg-cyan-300/10 border-cyan-200/40' :
                'bg-cyan-200/10 border-cyan-100/40'}
            `}>
              {/* Stage Label */}
              <div className="flex justify-between items-center mb-3">
                <h4 className={`text-sm font-bold ${
                  index === 0 ? 'text-cyan-300' :
                  index === 1 ? 'text-cyan-200' :
                  index === 2 ? 'text-cyan-100' :
                  'text-white'
                }`}>
                  {stage.label}
                </h4>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                  index === 0 ? 'border-cyan-400 text-cyan-400' :
                  index === 1 ? 'border-cyan-300 text-cyan-300' :
                  index === 2 ? 'border-cyan-200 text-cyan-200' :
                  'border-cyan-100 text-cyan-100'
                }`}>
                  {index + 1}
                </div>
              </div>

              {/* Content */}
              <div className={`text-xs font-mono leading-relaxed ${
                index === 0 ? 'text-cyan-100/90' :
                index === 1 ? 'text-cyan-50/90' :
                index === 2 ? 'text-white/90' :
                'text-white/95'
              }`}>
                {stage.example.split('\n').map((line, lineIndex) => (
                  <div key={lineIndex} className="mb-1">
                    {line.includes('✓') ? (
                      <div className="flex items-center gap-2">
                        <span>{line.replace('✓', '').trim()}</span>
                        <motion.span 
                          className="text-emerald-400"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.3 + 0.5 + lineIndex * 0.1 }}
                        >
                          ✓
                        </motion.span>
                      </div>
                    ) : (
                      line
                    )}
                  </div>
                ))}
              </div>

              {/* Processing Indicator */}
              {index < transformationStages.length - 1 && (
                <motion.div
                  className="absolute bottom-2 right-2 flex items-center gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.3 + 0.8 }}
                >
                  {[0, 1, 2].map((dotIndex) => (
                    <motion.div
                      key={dotIndex}
                      className={`w-1.5 h-1.5 rounded-full ${
                        index === 0 ? 'bg-cyan-400' :
                        index === 1 ? 'bg-cyan-300' :
                        'bg-cyan-200'
                      }`}
                      animate={{ 
                        opacity: [0.3, 1, 0.3],
                        scale: [0.8, 1, 0.8]
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: dotIndex * 0.2
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}

        {/* Flow Arrows */}
        {transformationStages.slice(0, -1).map((stage, index) => (
          <motion.div
            key={`arrow-${index}`}
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{ top: `${stage.y + 70}px` }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (index + 1) * 0.3 - 0.1 }}
          >
            <div className="flex flex-col items-center">
              <motion.div 
                className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-8 border-t-cyan-400/60"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="w-0.5 h-4 bg-gradient-to-b from-cyan-400/60 to-transparent mt-1"
                animate={{ scaleY: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              />
            </div>
          </motion.div>
        ))}

        {/* Side Labels */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-cyan-400/60 font-mono">
          TRANSFORMATION PIPELINE
        </div>
        
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 rotate-90 text-xs text-cyan-400/60 font-mono">
          GOVERNANCE LAYER
        </div>

        {/* Digital Twin Avatar */}
        <motion.div
          className="absolute top-4 right-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400/30 to-cyan-600/20 border border-cyan-400/50 flex items-center justify-center backdrop-blur-sm">
              <div className="w-6 h-6 rounded-full bg-cyan-400/80 flex items-center justify-center">
                <motion.div
                  className="w-2 h-2 rounded-full bg-white"
                  animate={{ scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>
            
            {/* Pulse Effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
          
          <div className="absolute top-14 right-0 text-xs text-cyan-300/80 font-mono whitespace-nowrap">
            Kula AI
          </div>
        </motion.div>

        {/* Processing Status */}
        <motion.div
          className="absolute bottom-4 left-4 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-cyan-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs text-cyan-300 font-mono">Processing</span>
          </div>
          
          <div className="w-px h-4 bg-white/20"/>
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400"/>
            <span className="text-xs text-emerald-300 font-mono">Validated</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default KulaVisual