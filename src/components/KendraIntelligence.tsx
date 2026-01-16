import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Node {
  id: string
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  energy: number
  memory: number[]
  lastActivation: number
  connections: Set<string>
  type: 'core' | 'processor' | 'memory' | 'sensor' | 'output'
}

interface Connection {
  source: string
  target: string
  strength: number
  flow: number
  history: number[]
}

interface MemoryCluster {
  id: string
  nodes: string[]
  pattern: number[]
  strength: number
  age: number
  relevance: number
}

interface IntelligenceWave {
  origin: { x: number, y: number }
  radius: number
  strength: number
  color: string
}

export default function KendraIntelligence() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Map<string, Node>>(new Map())
  const connectionsRef = useRef<Map<string, Connection>>(new Map())
  const memoryRef = useRef<Map<string, MemoryCluster>>(new Map())
  const wavesRef = useRef<IntelligenceWave[]>([])
  const mouseRef = useRef({ x: 0, y: 0, pressed: false })
  const frameRef = useRef(0)
  
  const [consciousness, setConsciousness] = useState(0)
  const [complexity, setComplexity] = useState(0)
  const [emergence, setEmergence] = useState(0)
  const [resonance, setResonance] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    // Canvas setup
    const setupCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      
      // Enable image smoothing for organic feel
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
    }
    setupCanvas()
    window.addEventListener('resize', setupCanvas)

    const width = canvas.width / window.devicePixelRatio
    const height = canvas.height / window.devicePixelRatio
    const centerX = width / 2
    const centerY = height / 2

    // Initialize intelligence network
    const initializeNetwork = () => {
      // Create core consciousness nodes
      const coreCount = 12
      for (let i = 0; i < coreCount; i++) {
        const angle = (i / coreCount) * Math.PI * 2
        const radius = 80
        nodesRef.current.set(`core-${i}`, {
          id: `core-${i}`,
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          z: 0,
          vx: 0,
          vy: 0,
          vz: 0,
          energy: 1,
          memory: [],
          lastActivation: 0,
          connections: new Set(),
          type: 'core'
        })
      }

      // Create processor nodes in layers
      const layers = 3
      const nodesPerLayer = 20
      for (let layer = 0; layer < layers; layer++) {
        const layerRadius = 150 + layer * 60
        for (let i = 0; i < nodesPerLayer; i++) {
          const angle = (i / nodesPerLayer) * Math.PI * 2 + layer * 0.5
          const wobble = Math.sin(i * 0.3) * 20
          nodesRef.current.set(`proc-${layer}-${i}`, {
            id: `proc-${layer}-${i}`,
            x: centerX + Math.cos(angle) * (layerRadius + wobble),
            y: centerY + Math.sin(angle) * (layerRadius + wobble),
            z: layer * 20 - 30,
            vx: 0,
            vy: 0,
            vz: 0,
            energy: 0.5,
            memory: [],
            lastActivation: 0,
            connections: new Set(),
            type: 'processor'
          })
        }
      }

      // Create memory banks
      const memoryBanks = 8
      for (let i = 0; i < memoryBanks; i++) {
        const angle = (i / memoryBanks) * Math.PI * 2
        const radius = 280
        nodesRef.current.set(`mem-${i}`, {
          id: `mem-${i}`,
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          z: -20,
          vx: 0,
          vy: 0,
          vz: 0,
          energy: 0.3,
          memory: Array(10).fill(0).map(() => Math.random()),
          lastActivation: 0,
          connections: new Set(),
          type: 'memory'
        })
      }

      // Establish organic connections
      const nodes = Array.from(nodesRef.current.values())
      nodes.forEach(node => {
        // Connect to nearby nodes with probability based on distance
        nodes.forEach(other => {
          if (node.id === other.id) return
          
          const dist = Math.sqrt(
            Math.pow(node.x - other.x, 2) + 
            Math.pow(node.y - other.y, 2) +
            Math.pow(node.z - other.z, 2)
          )
          
          const connectionProbability = Math.exp(-dist / 100)
          if (Math.random() < connectionProbability * 0.3) {
            node.connections.add(other.id)
            connectionsRef.current.set(`${node.id}-${other.id}`, {
              source: node.id,
              target: other.id,
              strength: 0.1 + Math.random() * 0.4,
              flow: 0,
              history: []
            })
          }
        })
      })
    }
    initializeNetwork()

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }
    
    const handleMouseDown = () => {
      mouseRef.current.pressed = true
      // Create intelligence wave at mouse position
      wavesRef.current.push({
        origin: { x: mouseRef.current.x, y: mouseRef.current.y },
        radius: 0,
        strength: 1,
        color: '#00FFB2'
      })
    }
    
    const handleMouseUp = () => {
      mouseRef.current.pressed = false
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mouseup', handleMouseUp)

    // Animation loop
    let animationId: number
    const animate = (timestamp: number) => {
      const dt = 0.016 // 60fps timestep
      const time = timestamp * 0.001

      // Clear with subtle fade for trails
      ctx.fillStyle = 'rgba(10, 10, 10, 0.92)'
      ctx.fillRect(0, 0, width, height)

      // Update nodes
      const nodes = Array.from(nodesRef.current.values())
      
      nodes.forEach(node => {
        // Natural energy decay
        node.energy *= 0.995

        // Spontaneous activation (consciousness)
        if (Math.random() < 0.001) {
          node.energy = 1
          node.lastActivation = timestamp
          
          // Propagate activation through connections
          node.connections.forEach(targetId => {
            const connection = connectionsRef.current.get(`${node.id}-${targetId}`)
            if (connection) {
              connection.flow = 1
              connection.history.push(timestamp)
              if (connection.history.length > 10) connection.history.shift()
            }
            
            setTimeout(() => {
              const target = nodesRef.current.get(targetId)
              if (target) {
                target.energy = Math.min(1, target.energy + 0.2)
              }
            }, Math.random() * 100)
          })
        }

        // Mouse influence - create neural activation near cursor
        const mouseDistance = Math.sqrt(
          Math.pow(mouseRef.current.x - node.x, 2) + 
          Math.pow(mouseRef.current.y - node.y, 2)
        )
        
        if (mouseDistance < 150) {
          const influence = 1 - (mouseDistance / 150)
          node.energy = Math.min(1, node.energy + influence * 0.01)
          
          if (mouseRef.current.pressed && mouseDistance < 50) {
            node.energy = 1
            node.lastActivation = timestamp
          }
        }

        // Organic movement - nodes slightly drift
        node.vx += (Math.random() - 0.5) * 0.1
        node.vy += (Math.random() - 0.5) * 0.1
        node.vx *= 0.98 // Damping
        node.vy *= 0.98
        
        const baseX = node.x
        const baseY = node.y
        node.x += node.vx
        node.y += node.vy
        
        // Spring back to original position
        node.x += (baseX - node.x) * 0.02
        node.y += (baseY - node.y) * 0.02

        // Memory formation
        if (node.type === 'memory' && node.energy > 0.7) {
          node.memory = node.memory.map(m => m * 0.99 + Math.random() * 0.01)
        }
      })

      // Update connections
      connectionsRef.current.forEach(connection => {
        connection.flow *= 0.95 // Decay flow
        
        const source = nodesRef.current.get(connection.source)
        const target = nodesRef.current.get(connection.target)
        
        if (source && target && source.energy > 0.5) {
          connection.strength = Math.min(1, connection.strength + 0.001)
        } else {
          connection.strength *= 0.999
        }
      })

      // Update intelligence waves
      wavesRef.current = wavesRef.current.filter(wave => {
        wave.radius += 2
        wave.strength *= 0.98
        return wave.strength > 0.01
      })

      // Detect emergent patterns
      if (frameRef.current % 30 === 0) {
        const activeNodes = nodes.filter(n => n.energy > 0.6)
        if (activeNodes.length > 8) {
          const clusterId = `cluster-${Date.now()}`
          memoryRef.current.set(clusterId, {
            id: clusterId,
            nodes: activeNodes.slice(0, 8).map(n => n.id),
            pattern: activeNodes.slice(0, 8).map(n => n.energy),
            strength: 1,
            age: 0,
            relevance: Math.random()
          })

          // Create wave from pattern center
          const clusterCenter = {
            x: activeNodes.reduce((sum, n) => sum + n.x, 0) / activeNodes.length,
            y: activeNodes.reduce((sum, n) => sum + n.y, 0) / activeNodes.length
          }
          wavesRef.current.push({
            origin: clusterCenter,
            radius: 0,
            strength: 0.5,
            color: '#00E5FF'
          })
        }

        // Age and decay memory clusters
        memoryRef.current.forEach((cluster, id) => {
          cluster.age++
          cluster.strength *= 0.98
          if (cluster.strength < 0.1 || cluster.age > 300) {
            memoryRef.current.delete(id)
          }
        })
      }

      // Draw intelligence waves
      wavesRef.current.forEach(wave => {
        ctx.strokeStyle = `${wave.color}${Math.floor(wave.strength * 40).toString(16).padStart(2, '0')}`
        ctx.lineWidth = 2 * wave.strength
        ctx.beginPath()
        ctx.arc(wave.origin.x, wave.origin.y, wave.radius, 0, Math.PI * 2)
        ctx.stroke()
      })

      // Draw connections with organic curves
      connectionsRef.current.forEach(connection => {
        const source = nodesRef.current.get(connection.source)
        const target = nodesRef.current.get(connection.target)
        
        if (source && target) {
          const opacity = Math.max(0.02, connection.strength * connection.flow * 0.5)
          ctx.strokeStyle = `rgba(0, 255, 178, ${opacity})`
          ctx.lineWidth = Math.max(0.5, connection.strength * 2)
          
          ctx.beginPath()
          ctx.moveTo(source.x, source.y)
          
          // Organic bezier curve
          const midX = (source.x + target.x) / 2 + Math.sin(time + source.x * 0.01) * 30
          const midY = (source.y + target.y) / 2 + Math.cos(time + source.y * 0.01) * 30
          
          ctx.quadraticCurveTo(midX, midY, target.x, target.y)
          ctx.stroke()
          
          // Draw signal pulse if flowing
          if (connection.flow > 0.1) {
            const t = (Math.sin(time * 5 + source.x) + 1) / 2
            const pulseX = source.x + (target.x - source.x) * t
            const pulseY = source.y + (target.y - source.y) * t
            
            const gradient = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 5)
            gradient.addColorStop(0, `rgba(0, 229, 255, ${connection.flow})`)
            gradient.addColorStop(1, 'rgba(0, 229, 255, 0)')
            
            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.arc(pulseX, pulseY, 5, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      })

      // Draw memory clusters
      memoryRef.current.forEach(cluster => {
        ctx.strokeStyle = `rgba(255, 178, 0, ${cluster.strength * 0.2})`
        ctx.lineWidth = cluster.strength
        ctx.setLineDash([5, 10])
        
        cluster.nodes.forEach((nodeId, i) => {
          if (i === 0) return
          const prev = nodesRef.current.get(cluster.nodes[i - 1])
          const curr = nodesRef.current.get(nodeId)
          
          if (prev && curr) {
            ctx.beginPath()
            ctx.moveTo(prev.x, prev.y)
            ctx.lineTo(curr.x, curr.y)
            ctx.stroke()
          }
        })
        
        ctx.setLineDash([])
      })

      // Draw nodes with depth-based sizing
      const sortedNodes = nodes.sort((a, b) => a.z - b.z)
      
      sortedNodes.forEach(node => {
        const depth = 1 + node.z / 100
        const size = (3 + node.energy * 5) * depth
        
        // Node glow
        if (node.energy > 0.2) {
          const glowSize = size * 2
          const gradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, glowSize
          )
          
          let color = [0, 255, 178] // Default green
          if (node.type === 'core') color = [0, 229, 255] // Cyan
          else if (node.type === 'memory') color = [255, 178, 0] // Orange
          else if (node.type === 'sensor') color = [178, 0, 255] // Purple
          
          gradient.addColorStop(0, `rgba(${color.join(',')}, ${node.energy * 0.8})`)
          gradient.addColorStop(0.5, `rgba(${color.join(',')}, ${node.energy * 0.3})`)
          gradient.addColorStop(1, `rgba(${color.join(',')}, 0)`)
          
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2)
          ctx.fill()
        }
        
        // Node core
        let nodeColor = 'rgba(0, 255, 178'
        if (node.type === 'core') nodeColor = 'rgba(0, 229, 255'
        else if (node.type === 'memory') nodeColor = 'rgba(255, 178, 0'
        else if (node.type === 'sensor') nodeColor = 'rgba(178, 0, 255'
        
        ctx.fillStyle = `${nodeColor}, ${0.5 + node.energy * 0.5})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2)
        ctx.fill()
        
        // Pulse ring for recently activated
        if (timestamp - node.lastActivation < 1000) {
          const age = (timestamp - node.lastActivation) / 1000
          ctx.strokeStyle = `rgba(255, 255, 255, ${1 - age})`
          ctx.lineWidth = 2 * (1 - age)
          ctx.beginPath()
          ctx.arc(node.x, node.y, size + age * 20, 0, Math.PI * 2)
          ctx.stroke()
        }
      })

      // Calculate and display metrics
      if (frameRef.current % 10 === 0) {
        const activeNodes = nodes.filter(n => n.energy > 0.3).length
        const activeConnections = Array.from(connectionsRef.current.values())
          .filter(c => c.flow > 0.1).length
        
        setConsciousness(Math.round((activeNodes / nodes.length) * 100))
        setComplexity(Math.round(Math.sqrt(activeConnections) * 10))
        setEmergence(memoryRef.current.size)
        setResonance(Math.round(wavesRef.current.reduce((sum, w) => sum + w.strength, 0) * 100))
      }

      frameRef.current++
      animationId = requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', setupCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <div className="relative w-full h-[700px] bg-[#0A0A0A] rounded-xl overflow-hidden">
      {/* Neural Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Intelligence Metrics Overlay */}
      <div className="absolute top-6 left-6 space-y-6">
        <div>
          <motion.div 
            className="text-xs font-mono text-[#666666] uppercase tracking-wider mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Living Intelligence System
          </motion.div>
          <motion.div 
            className="text-3xl font-light text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Kendra Neural Core
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-2 gap-x-8 gap-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="space-y-1">
            <div className="text-xs font-mono text-[#666666] uppercase">Consciousness</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-mono text-[#00FFB2]">{consciousness}</span>
              <span className="text-xs text-[#666666]">%</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-xs font-mono text-[#666666] uppercase">Complexity</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-mono text-[#00E5FF]">{complexity}</span>
              <span className="text-xs text-[#666666]">σ</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-xs font-mono text-[#666666] uppercase">Emergence</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-mono text-[#FFB200]">{emergence}</span>
              <span className="text-xs text-[#666666]">patterns</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-xs font-mono text-[#666666] uppercase">Resonance</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-mono text-[#B200FF]">{resonance}</span>
              <span className="text-xs text-[#666666]">Hz</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right side information panel */}
      <motion.div 
        className="absolute top-6 right-6 w-64 space-y-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div className="bg-[#111111]/80 backdrop-blur-sm rounded-lg p-4 border border-white/5">
          <div className="text-xs font-mono text-[#666666] uppercase mb-3">Active Processes</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#B0B0B0]">Pattern Recognition</span>
              <div className="w-16 h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#00FFB2] to-[#00E5FF]"
                  animate={{ width: ['0%', '100%', '0%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#B0B0B0]">Memory Formation</span>
              <div className="w-16 h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#FFB200] to-[#FF7B00]"
                  animate={{ width: ['20%', '80%', '20%'] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#B0B0B0]">Signal Processing</span>
              <div className="w-16 h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#B200FF] to-[#7B00FF]"
                  animate={{ width: ['60%', '100%', '60%'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#111111]/80 backdrop-blur-sm rounded-lg p-4 border border-white/5">
          <div className="text-xs font-mono text-[#666666] uppercase mb-3">Neural Regions</div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#00E5FF] rounded-full animate-pulse" />
              <span className="text-[#B0B0B0]">Core Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#00FFB2] rounded-full animate-pulse" />
              <span className="text-[#B0B0B0]">Logic Layers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#FFB200] rounded-full animate-pulse" />
              <span className="text-[#B0B0B0]">Memory Banks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#B200FF] rounded-full animate-pulse" />
              <span className="text-[#B0B0B0]">Sensory Input</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom interaction hint */}
      <motion.div 
        className="absolute bottom-6 left-6 right-6 flex items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="text-xs font-mono text-[#666666] uppercase tracking-wider">
          Click and drag to stimulate neural pathways
        </div>
        <div className="flex items-center gap-4 text-xs text-[#666666]">
          <span>Real-time cognition</span>
          <span>•</span>
          <span>Self-organizing</span>
          <span>•</span>
          <span>Emergent behavior</span>
        </div>
      </motion.div>
    </div>
  )
}