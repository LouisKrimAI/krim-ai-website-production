/**
 * LAYER STACK VISUALIZATION
 * Visual representation of the AI stack with Layer 3.5 highlight
 */
import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { clsx } from 'clsx'

interface LayerStackProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  highlightLayer?: number
}

const layers = [
  { id: 1, name: 'Silicon & chips', description: 'Hardware foundation' },
  { id: 2, name: 'Systems & cloud', description: 'Infrastructure layer' },
  { id: 3, name: 'Foundation models', description: 'Large language models' },
  { id: 3.5, name: 'Intelligence runtime', description: 'Kendra', isKendra: true },
  { id: 4, name: 'Applications & agents', description: 'AI co-workers' },
  { id: 5, name: 'Data & ecosystems', description: 'Business integration' }
]

export default function LayerStack({ 
  className = '', 
  size = 'md',
  highlightLayer = 3.5 
}: LayerStackProps) {
  const prefersReducedMotion = useReducedMotion()

  const sizeClasses = {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96'
  }

  const layerHeight = {
    sm: 'h-10',
    md: 'h-12', 
    lg: 'h-14'
  }

  const textSize = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  const subtextSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={clsx('space-y-3', sizeClasses[size], className)}
    >
      {layers.map((layer, index) => {
        const isHighlighted = layer.id === highlightLayer
        
        return (
          <motion.div
            key={layer.id}
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: prefersReducedMotion ? 0 : index * 0.1,
              ease: "easeOut" 
            }}
            className={clsx(
              'relative rounded-2xl border transition-all duration-300',
              layerHeight[size],
              'flex items-center justify-between px-4',
              isHighlighted 
                ? 'border-emerald-400/70 bg-emerald-950/30 shadow-[0_0_40px_rgba(45,212,191,0.35)]'
                : 'border-slate-700/50 bg-slate-900/40 hover:border-slate-600/70'
            )}
          >
            {/* Layer number */}
            <div className={clsx(
              'flex items-center gap-3 flex-shrink-0',
              textSize[size]
            )}>
              <span className={clsx(
                'font-mono font-medium min-w-[2.5rem] text-center',
                isHighlighted ? 'text-emerald-400' : 'text-slate-400'
              )}>
                {layer.id}
              </span>
              <div>
                <div className={clsx(
                  'font-semibold',
                  isHighlighted ? 'text-white' : 'text-slate-200'
                )}>
                  {layer.name}
                </div>
                {layer.isKendra && (
                  <div className={clsx(
                    'font-medium text-emerald-400',
                    subtextSize[size]
                  )}>
                    {layer.description}
                  </div>
                )}
              </div>
            </div>

            {/* Subtle pulse animation on highlighted layer */}
            {isHighlighted && !prefersReducedMotion && (
              <motion.div
                className="absolute inset-0 rounded-2xl border border-emerald-400/50"
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.02, 1]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </motion.div>
        )
      })}
    </motion.div>
  )
}