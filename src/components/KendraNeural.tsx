import React, { useEffect, useRef, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Neuron {
  id: string
  x: number
  y: number
  z: number
  charge: number
  connections: string[]
  lastFired: number
  type: 'sensory' | 'interneuron' | 'motor' | 'memory'
  cluster: number
}

interface Synapse {
  source: string
  target: string
  strength: number
  active: boolean
  pulsePhase: number
}

interface ThoughtPattern {
  id: string
  neurons: string[]
  strength: number
  timestamp: number
  type: 'emerging' | 'active' | 'fading'
}

export default function KendraNeural() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)
  const neuronsRef = useRef<Map<string, Neuron>>(new Map())
  const synapsesRef = useRef<Map<string, Synapse>>(new Map())
  const thoughtPatternsRef = useRef<Map<string, ThoughtPattern>>(new Map())
  const mouseRef = useRef({ x: 0, y: 0 })
  const [activeThoughts, setActiveThoughts] = useState<number>(0)
  const [networkHealth, setNetworkHealth] = useState(100)
  const [processingSpeed, setProcessingSpeed] = useState(0)

  // Initialize neural network
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create neurons
    const neuronCount = 150
    for (let i = 0; i < neuronCount; i++) {
      const id = `n${i}`
      const angle = (i / neuronCount) * Math.PI * 2
      const radius = 150 + Math.random() * 200
      const depth = Math.random() * 100 - 50
      
      // Cluster neurons for more realistic brain regions
      const cluster = Math.floor(i / 20)
      const clusterOffset = cluster * 0.3
      
      neuronsRef.current.set(id, {
        id,
        x: Math.cos(angle + clusterOffset) * radius + canvas.width / 2,
        y: Math.sin(angle + clusterOffset) * radius + canvas.height / 2,
        z: depth,
        charge: Math.random(),
        connections: [],
        lastFired: 0,
        type: i < 30 ? 'sensory' : i < 100 ? 'interneuron' : i < 130 ? 'motor' : 'memory',
        cluster
      })
    }

    // Create synapses based on proximity and type compatibility
    neuronsRef.current.forEach((neuron, id) => {
      const nearbyNeurons = Array.from(neuronsRef.current.values())
        .filter(n => n.id !== id)
        .map(n => ({
          neuron: n,
          distance: Math.sqrt(
            Math.pow(n.x - neuron.x, 2) + 
            Math.pow(n.y - neuron.y, 2) + 
            Math.pow(n.z - neuron.z, 2)
          )
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3 + Math.floor(Math.random() * 3))

      nearbyNeurons.forEach(({ neuron: target }) => {
        const synapseId = `${id}-${target.id}`
        if (!synapsesRef.current.has(synapseId) && !synapsesRef.current.has(`${target.id}-${id}`)) {
          synapsesRef.current.set(synapseId, {
            source: id,
            target: target.id,
            strength: 0.3 + Math.random() * 0.7,
            active: false,
            pulsePhase: 0
          })
          neuron.connections.push(target.id)
        }
      })
    })

    // Track mouse movement for interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }
    canvas.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    let animationId: number
    const animate = (timestamp: number) => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update neural activity
      const neurons = Array.from(neuronsRef.current.values())
      const time = timestamp * 0.001

      // Spontaneous neural firing (background activity)
      neurons.forEach(neuron => {
        // Natural decay
        neuron.charge *= 0.98

        // Spontaneous activation
        if (Math.random() < 0.002) {
          neuron.charge = 1
          neuron.lastFired = timestamp

          // Propagate signal to connected neurons
          neuron.connections.forEach(targetId => {
            const target = neuronsRef.current.get(targetId)
            if (target) {
              setTimeout(() => {
                target.charge = Math.min(1, target.charge + 0.3)
              }, 50 + Math.random() * 100)
            }
          })
        }

        // Mouse interaction - neurons fire near cursor
        const mouseDistance = Math.sqrt(
          Math.pow(mouseRef.current.x - neuron.x, 2) + 
          Math.pow(mouseRef.current.y - neuron.y, 2)
        )
        if (mouseDistance < 100) {
          neuron.charge = Math.min(1, neuron.charge + (100 - mouseDistance) * 0.001)
        }
      })

      // Update synapses
      synapsesRef.current.forEach(synapse => {
        const source = neuronsRef.current.get(synapse.source)
        const target = neuronsRef.current.get(synapse.target)
        
        if (source && target) {
          // Synapse is active if source neuron is charged
          synapse.active = source.charge > 0.5
          if (synapse.active) {
            synapse.pulsePhase = (synapse.pulsePhase + 0.05) % 1
          } else {
            synapse.pulsePhase *= 0.95
          }
        }
      })

      // Detect and create thought patterns
      const activeNeurons = neurons.filter(n => n.charge > 0.6)
      if (activeNeurons.length > 5 && Math.random() < 0.01) {
        const patternId = `thought${Date.now()}`
        thoughtPatternsRef.current.set(patternId, {
          id: patternId,
          neurons: activeNeurons.slice(0, 8).map(n => n.id),
          strength: 1,
          timestamp: timestamp,
          type: 'emerging'
        })

        // Clean old patterns
        thoughtPatternsRef.current.forEach((pattern, id) => {
          if (timestamp - pattern.timestamp > 5000) {
            thoughtPatternsRef.current.delete(id)
          }
        })
      }

      // Update thought patterns
      thoughtPatternsRef.current.forEach(pattern => {
        const age = timestamp - pattern.timestamp
        if (age < 1000) {
          pattern.type = 'emerging'
          pattern.strength = age / 1000
        } else if (age < 3000) {
          pattern.type = 'active'
          pattern.strength = 1
        } else {
          pattern.type = 'fading'
          pattern.strength = Math.max(0, 1 - (age - 3000) / 2000)
        }
      })

      // Draw synapses
      ctx.strokeStyle = 'rgba(0, 255, 178, 0.1)'
      ctx.lineWidth = 0.5

      synapsesRef.current.forEach(synapse => {
        const source = neuronsRef.current.get(synapse.source)
        const target = neuronsRef.current.get(synapse.target)
        
        if (source && target) {
          const opacity = synapse.active ? synapse.strength * 0.6 : 0.05
          ctx.strokeStyle = `rgba(0, 255, 178, ${opacity})`
          ctx.lineWidth = synapse.active ? 1 : 0.3

          ctx.beginPath()
          ctx.moveTo(source.x, source.y)
          
          // Create organic curve
          const midX = (source.x + target.x) / 2 + Math.sin(time + source.x) * 20
          const midY = (source.y + target.y) / 2 + Math.cos(time + source.y) * 20
          
          ctx.quadraticCurveTo(midX, midY, target.x, target.y)
          ctx.stroke()

          // Draw pulse along synapse if active
          if (synapse.active && synapse.pulsePhase > 0) {
            const pulseX = source.x + (target.x - source.x) * synapse.pulsePhase
            const pulseY = source.y + (target.y - source.y) * synapse.pulsePhase
            
            ctx.fillStyle = `rgba(0, 229, 255, ${synapse.strength})`
            ctx.beginPath()
            ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      })

      // Draw thought pattern connections
      thoughtPatternsRef.current.forEach(pattern => {
        if (pattern.strength > 0.1) {
          ctx.strokeStyle = `rgba(0, 255, 178, ${pattern.strength * 0.2})`
          ctx.lineWidth = pattern.strength * 2
          ctx.setLineDash([5, 5])
          
          for (let i = 0; i < pattern.neurons.length - 1; i++) {
            const n1 = neuronsRef.current.get(pattern.neurons[i])
            const n2 = neuronsRef.current.get(pattern.neurons[i + 1])
            if (n1 && n2) {
              ctx.beginPath()
              ctx.moveTo(n1.x, n1.y)
              ctx.lineTo(n2.x, n2.y)
              ctx.stroke()
            }
          }
          
          ctx.setLineDash([])
        }
      })

      // Draw neurons
      neurons.forEach(neuron => {
        const size = 2 + neuron.charge * 6
        const brightness = 0.3 + neuron.charge * 0.7
        
        // Glow effect for active neurons
        if (neuron.charge > 0.3) {
          const gradient = ctx.createRadialGradient(
            neuron.x, neuron.y, 0,
            neuron.x, neuron.y, size * 3
          )
          gradient.addColorStop(0, `rgba(0, 255, 178, ${neuron.charge * 0.8})`)
          gradient.addColorStop(0.3, `rgba(0, 229, 255, ${neuron.charge * 0.4})`)
          gradient.addColorStop(1, 'rgba(0, 255, 178, 0)')
          
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(neuron.x, neuron.y, size * 3, 0, Math.PI * 2)
          ctx.fill()
        }

        // Neuron core
        let color = 'rgba(0, 255, 178'
        if (neuron.type === 'sensory') color = 'rgba(0, 229, 255'
        else if (neuron.type === 'motor') color = 'rgba(178, 0, 255'
        else if (neuron.type === 'memory') color = 'rgba(255, 178, 0'

        ctx.fillStyle = `${color}, ${brightness})`
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, size, 0, Math.PI * 2)
        ctx.fill()

        // Pulsing effect for recently fired neurons
        if (timestamp - neuron.lastFired < 500) {
          const pulseScale = 1 - (timestamp - neuron.lastFired) / 500
          ctx.strokeStyle = `rgba(255, 255, 255, ${pulseScale * 0.5})`
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.arc(neuron.x, neuron.y, size + pulseScale * 10, 0, Math.PI * 2)
          ctx.stroke()
        }
      })

      // Update metrics
      if (frameRef.current % 30 === 0) {
        const activeCount = neurons.filter(n => n.charge > 0.3).length
        setActiveThoughts(thoughtPatternsRef.current.size)
        setNetworkHealth(Math.round((activeCount / neurons.length) * 100))
        setProcessingSpeed(Math.round(activeCount * 12.7))
      }

      frameRef.current++
      animationId = requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="relative w-full h-[600px] bg-[#0A0A0A] rounded-xl overflow-hidden">
      {/* Neural Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Overlay Information */}
      <div className="absolute top-6 left-6 space-y-4">
        <div>
          <div className="text-xs font-mono text-[#666666] uppercase tracking-wider mb-1">
            Neural Intelligence
          </div>
          <div className="text-2xl font-light text-white">
            Kendra Neural Engine
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="text-xs font-mono text-[#666666]">THOUGHTS</div>
            <div className="text-sm font-mono text-[#00FFB2]">{activeThoughts}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs font-mono text-[#666666]">NETWORK</div>
            <div className="text-sm font-mono text-[#00FFB2]">{networkHealth}%</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs font-mono text-[#666666]">SPEED</div>
            <div className="text-sm font-mono text-[#00FFB2]">{processingSpeed} Hz</div>
          </div>
        </div>
      </div>

      {/* Bottom Status */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#00E5FF] rounded-full animate-pulse" />
            <span className="text-xs text-[#666666]">Sensory Input</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#00FFB2] rounded-full animate-pulse" />
            <span className="text-xs text-[#666666]">Processing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#B200FF] rounded-full animate-pulse" />
            <span className="text-xs text-[#666666]">Motor Output</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#FFB200] rounded-full animate-pulse" />
            <span className="text-xs text-[#666666]">Memory Formation</span>
          </div>
        </div>
        
        <div className="text-xs font-mono text-[#666666]">
          MOVE CURSOR TO STIMULATE
        </div>
      </div>
    </div>
  )
}