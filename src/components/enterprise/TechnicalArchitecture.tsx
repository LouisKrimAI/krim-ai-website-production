/**
 * TECHNICAL ARCHITECTURE VISUALIZATION V2.0
 * Detailed system architecture for CTO and technical decision makers
 * Features: Interactive architecture layers, integration points, scalability metrics
 */

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Database, 
  CloudArrowUp, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  Lightning, 
  Gear, 
  ChartBar,
  Lock,
  ArrowRight,
  CheckCircle,
  Warning,
  Info
} from '@phosphor-icons/react'
import Card from '../Card'

interface ArchitectureLayer {
  id: string
  name: string
  description: string
  technologies: Technology[]
  connections: string[]
  performance: {
    throughput: string
    latency: string
    availability: string
  }
  security: SecurityFeature[]
  scalability: {
    current: string
    maximum: string
    autoScale: boolean
  }
}

interface Technology {
  name: string
  type: 'database' | 'compute' | 'network' | 'ai' | 'security'
  version: string
  purpose: string
  certification?: string
}

interface SecurityFeature {
  name: string
  standard: string
  implemented: boolean
  auditDate?: string
}

interface IntegrationPoint {
  id: string
  name: string
  type: 'api' | 'webhook' | 'stream' | 'batch'
  protocol: string
  authentication: string
  rateLimit: string
  documentation: string
}

const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: 'presentation',
    name: 'Presentation Layer',
    description: 'Multi-channel communication and user interfaces',
    technologies: [
      { name: 'React/TypeScript', type: 'compute', version: '18.x', purpose: 'Web UI Framework' },
      { name: 'WebRTC', type: 'network', version: '1.0', purpose: 'Real-time Communication' },
      { name: 'PWA Service Workers', type: 'compute', version: 'Latest', purpose: 'Offline Capability' },
      { name: 'Tailwind CSS', type: 'compute', version: '3.x', purpose: 'Design System' }
    ],
    connections: ['logic', 'security'],
    performance: {
      throughput: '10K concurrent users',
      latency: '<100ms UI response',
      availability: '99.9%'
    },
    security: [
      { name: 'Content Security Policy', standard: 'W3C CSP Level 3', implemented: true },
      { name: 'OWASP Secure Headers', standard: 'OWASP 2023', implemented: true },
      { name: 'Input Sanitization', standard: 'OWASP Top 10', implemented: true }
    ],
    scalability: {
      current: '50K users',
      maximum: '1M users',
      autoScale: true
    }
  },
  {
    id: 'logic',
    name: 'Business Logic Layer',
    description: 'AI agent orchestration and workflow management',
    technologies: [
      { name: 'Node.js/Express', type: 'compute', version: '20.x LTS', purpose: 'API Gateway' },
      { name: 'Python/FastAPI', type: 'ai', version: '3.11', purpose: 'AI Processing' },
      { name: 'Apache Kafka', type: 'network', version: '3.5', purpose: 'Event Streaming', certification: 'Enterprise' },
      { name: 'Redis Cluster', type: 'database', version: '7.x', purpose: 'Caching/Sessions' },
      { name: 'Kubernetes', type: 'compute', version: '1.28', purpose: 'Container Orchestration', certification: 'CNCF Certified' }
    ],
    connections: ['data', 'presentation', 'ai'],
    performance: {
      throughput: '1M API calls/minute',
      latency: '<50ms average',
      availability: '99.95%'
    },
    security: [
      { name: 'OAuth 2.0/OIDC', standard: 'RFC 6749', implemented: true, auditDate: '2024-Q4' },
      { name: 'JWT Token Management', standard: 'RFC 7519', implemented: true },
      { name: 'Rate Limiting', standard: 'Industry Best Practice', implemented: true },
      { name: 'API Gateway Security', standard: 'OWASP API Security', implemented: true }
    ],
    scalability: {
      current: '100 nodes',
      maximum: '10K nodes',
      autoScale: true
    }
  },
  {
    id: 'ai',
    name: 'AI Processing Layer',
    description: 'Machine learning models and agent intelligence',
    technologies: [
      { name: 'PyTorch/CUDA', type: 'ai', version: '2.1', purpose: 'Deep Learning', certification: 'NVIDIA Certified' },
      { name: 'Transformers/HuggingFace', type: 'ai', version: '4.x', purpose: 'NLP Models' },
      { name: 'NVIDIA Triton', type: 'ai', version: '23.x', purpose: 'Model Serving' },
      { name: 'AI Flow', type: 'ai', version: '2.8', purpose: 'AI Lifecycle' },
      { name: 'Apache Spark', type: 'compute', version: '3.5', purpose: 'Distributed Processing' }
    ],
    connections: ['logic', 'data'],
    performance: {
      throughput: '10M inferences/hour',
      latency: '<25ms per call',
      availability: '99.9%'
    },
    security: [
      { name: 'Model Encryption', standard: 'AES-256', implemented: true },
      { name: 'Federated Learning', standard: 'Privacy-Preserving', implemented: true },
      { name: 'Differential Privacy', standard: 'IEEE Standard', implemented: true }
    ],
    scalability: {
      current: '50 GPUs',
      maximum: '1K GPUs',
      autoScale: true
    }
  },
  {
    id: 'data',
    name: 'Data Layer',
    description: 'Multi-tenant data management and analytics',
    technologies: [
      { name: 'PostgreSQL Cluster', type: 'database', version: '16.x', purpose: 'Transactional Data', certification: 'Enterprise' },
      { name: 'Apache Cassandra', type: 'database', version: '4.1', purpose: 'Time-series Data' },
      { name: 'Elasticsearch', type: 'database', version: '8.x', purpose: 'Search/Analytics', certification: 'Platinum' },
      { name: 'Apache Airflow', type: 'compute', version: '2.7', purpose: 'Data Pipeline' },
      { name: 'MinIO S3', type: 'database', version: '2023.x', purpose: 'Object Storage' }
    ],
    connections: ['security', 'logic', 'ai'],
    performance: {
      throughput: '100GB/hour ingestion',
      latency: '<10ms queries',
      availability: '99.99%'
    },
    security: [
      { name: 'Encryption at Rest', standard: 'AES-256', implemented: true, auditDate: '2024-Q4' },
      { name: 'Encryption in Transit', standard: 'TLS 1.3', implemented: true },
      { name: 'Data Masking', standard: 'NIST Privacy Framework', implemented: true },
      { name: 'Backup Encryption', standard: 'Zero-Knowledge', implemented: true }
    ],
    scalability: {
      current: '10TB storage',
      maximum: '100PB storage',
      autoScale: true
    }
  },
  {
    id: 'security',
    name: 'Security Layer',
    description: 'Zero-trust security and compliance framework',
    technologies: [
      { name: 'HashiCorp Vault', type: 'security', version: '1.15', purpose: 'Secrets Management', certification: 'Enterprise' },
      { name: 'Istio Service Mesh', type: 'security', version: '1.19', purpose: 'mTLS/Zero Trust' },
      { name: 'Falco Runtime Security', type: 'security', version: '0.36', purpose: 'Threat Detection' },
      { name: 'OPA Gatekeeper', type: 'security', version: '3.14', purpose: 'Policy Enforcement' }
    ],
    connections: ['data', 'logic', 'presentation'],
    performance: {
      throughput: '1M auth/minute',
      latency: '<5ms validation',
      availability: '99.99%'
    },
    security: [
      { name: 'SOC 2', standard: 'AICPA SOC 2', implemented: true, auditDate: '2024-Q3' },
      { name: 'ISO 27001', standard: 'ISO/IEC 27001:2022', implemented: true, auditDate: '2024-Q2' },
      { name: 'HIPAA Ready', standard: 'HIPAA Security Rule', implemented: true },
      { name: 'PCI DSS L1', standard: 'PCI DSS v4.0', implemented: true, auditDate: '2024-Q4' }
    ],
    scalability: {
      current: '1K policies',
      maximum: '100K policies',
      autoScale: true
    }
  }
]

const INTEGRATION_POINTS: IntegrationPoint[] = [
  {
    id: 'rest-api',
    name: 'REST API Gateway',
    type: 'api',
    protocol: 'HTTP/2 + TLS 1.3',
    authentication: 'OAuth 2.0 + mTLS',
    rateLimit: '10K requests/minute',
    documentation: 'OpenAPI 3.0 Specification'
  },
  {
    id: 'graphql',
    name: 'GraphQL Endpoint',
    type: 'api',
    protocol: 'GraphQL over HTTPS',
    authentication: 'JWT + RBAC',
    rateLimit: '5K queries/minute',
    documentation: 'Apollo Studio Explorer'
  },
  {
    id: 'webhook',
    name: 'Event Webhooks',
    type: 'webhook',
    protocol: 'HTTP POST + HMAC',
    authentication: 'Signature Verification',
    rateLimit: '1K events/minute',
    documentation: 'AsyncAPI 2.6 Schema'
  },
  {
    id: 'kafka-streams',
    name: 'Real-time Streams',
    type: 'stream',
    protocol: 'Apache Kafka',
    authentication: 'SASL/SCRAM + ACL',
    rateLimit: '1M messages/second',
    documentation: 'Confluent Schema Registry'
  }
]

export default function TechnicalArchitecture() {
  const [activeLayer, setActiveLayer] = useState<string>('logic')
  const [showIntegrations, setShowIntegrations] = useState(false)
  const [performanceMetrics, setPerformanceMetrics] = useState(true)

  const currentLayer = ARCHITECTURE_LAYERS.find(layer => layer.id === activeLayer)

  const getLayerIcon = (layerId: string) => {
    switch (layerId) {
      case 'presentation': return <Globe className="w-6 h-6" />
      case 'logic': return <Cpu className="w-6 h-6" />
      case 'ai': return <Lightning className="w-6 h-6" />
      case 'data': return <Database className="w-6 h-6" />
      case 'security': return <ShieldCheck className="w-6 h-6" />
      default: return <Gear className="w-6 h-6" />
    }
  }

  const getTechIcon = (type: Technology['type']) => {
    switch (type) {
      case 'database': return <Database className="w-4 h-4" />
      case 'compute': return <Cpu className="w-4 h-4" />
      case 'network': return <CloudArrowUp className="w-4 h-4" />
      case 'ai': return <Lightning className="w-4 h-4" />
      case 'security': return <Lock className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-8">
      {/* CTO Strategic Overview */}
      <motion.div 
        className="ceo-strategic"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="ceo-impact-metric">
          Cloud-Native
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-white">Multi-agentic AI Infrastructure</h2>
        <p className="text-xl text-white max-w-4xl mx-auto mb-8">
          Built on battle-tested enterprise architecture. Kubernetes-native, AI-first, zero-trust security model.
          Every component designed for infinite scale and enterprise reliability.
        </p>
        
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-enterprise-gold mb-2">99.99%</div>
            <div className="text-white">System Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-enterprise-gold mb-2">&lt;25ms</div>
            <div className="text-white">AI Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-enterprise-gold mb-2">1M+</div>
            <div className="text-white">API Calls/Minute</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-enterprise-gold mb-2">SOC 2</div>
            <div className="text-white">Type II Certified</div>
          </div>
        </div>
      </motion.div>

      {/* Architecture Layer Selector */}
      <motion.div
        className="tech-architecture"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-krim-cyan mb-4 text-white">System Architecture Layers</h3>
          <p className="text-white">Click any layer to explore detailed technical specifications</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {ARCHITECTURE_LAYERS.map((layer) => (
            <motion.button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id)}
              className={`cto-layer p-6 text-center transition-all duration-300 ${
                activeLayer === layer.id 
                  ? 'border-krim-cyan/60 bg-krim-cyan/10 scale-105' 
                  : 'hover:border-krim-cyan/40 hover:bg-krim-cyan/5'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-krim-cyan mb-3 flex justify-center">
                {getLayerIcon(layer.id)}
              </div>
              <div className="cto-layer-title text-sm">{layer.name}</div>
              <div className="text-xs text-white mt-2">{layer.technologies.length} technologies</div>
            </motion.button>
          ))}
        </div>

        {/* Selected Layer Details */}
        <AnimatePresence mode="wait">
          {currentLayer && (
            <motion.div
              key={activeLayer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Layer Overview */}
              <div className="bg-krim-deep/50 rounded-2xl p-6 border border-krim-cyan/30">
                <h4 className="text-xl font-bold text-krim-cyan mb-3 text-white">{currentLayer.name}</h4>
                <p className="text-white mb-4">{currentLayer.description}</p>
                
                {/* Performance Metrics Toggle */}
                <button
                  onClick={() => setPerformanceMetrics(!performanceMetrics)}
                  className="flex items-center gap-2 text-sm text-krim-mint hover:text-krim-cyan transition-colors mb-4"
                >
                  <ChartBar className="w-4 h-4" />
                  {performanceMetrics ? 'Hide' : 'Show'} Performance Metrics
                </button>

                <AnimatePresence>
                  {performanceMetrics && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid md:grid-cols-3 gap-4"
                    >
                      <div className="bg-krim-mint/10 rounded-lg p-4 border border-krim-mint/20">
                        <div className="text-sm text-krim-mint font-semibold mb-1">Throughput</div>
                        <div className="font-bold text-white">{currentLayer.performance.throughput}</div>
                      </div>
                      <div className="bg-krim-cyan/10 rounded-lg p-4 border border-krim-cyan/20">
                        <div className="text-sm text-krim-cyan font-semibold mb-1">Latency</div>
                        <div className="font-bold text-white">{currentLayer.performance.latency}</div>
                      </div>
                      <div className="bg-krim-purple/10 rounded-lg p-4 border border-krim-purple/20">
                        <div className="text-sm text-krim-purple font-semibold mb-1">Availability</div>
                        <div className="font-bold text-white">{currentLayer.performance.availability}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Technologies Grid */}
              <div>
                <h5 className="text-lg font-bold text-white mb-4">Technology Stack</h5>
                <div className="cto-architecture">
                  {currentLayer.technologies.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-krim-cyan/30 transition-all"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-krim-cyan">
                          {getTechIcon(tech.type)}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{tech.name}</div>
                          <div className="text-xs text-white">v{tech.version}</div>
                        </div>
                      </div>
                      <div className="text-sm text-white mb-2">{tech.purpose}</div>
                      {tech.certification && (
                        <div className="cto-tech-badge">
                          {tech.certification}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Security Features */}
              <div>
                <h5 className="text-lg font-bold text-white mb-4">Security & Compliance</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  {currentLayer.security.map((security, index) => (
                    <motion.div
                      key={security.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center gap-3 p-4 bg-krim-purple/10 rounded-lg border border-krim-purple/20"
                    >
                      <div className={security.implemented ? 'text-krim-mint' : 'text-krim-coral'}>
                        {security.implemented ? <CheckCircle className="w-5 h-5" /> : <Warning className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white">{security.name}</div>
                        <div className="text-sm text-white">{security.standard}</div>
                        {security.auditDate && (
                          <div className="text-xs text-krim-purple mt-1">Audited: {security.auditDate}</div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Scalability Information */}
              <div className="bg-krim-mint/5 rounded-xl p-6 border border-krim-mint/20">
                <h5 className="text-lg font-bold text-krim-mint mb-4">Scalability Metrics</h5>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-white mb-1">Current Capacity</div>
                    <div className="font-bold text-white">{currentLayer.scalability.current}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white mb-1">Maximum Scale</div>
                    <div className="font-bold text-white">{currentLayer.scalability.maximum}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white mb-1">Auto-scaling</div>
                    <div className={`font-bold ${currentLayer.scalability.autoScale ? 'text-krim-mint' : 'text-krim-coral'}`}>
                      {currentLayer.scalability.autoScale ? 'Enabled' : 'Manual'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Integration Points */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-krim-cyan mb-2 text-white">Integration Endpoints</h3>
            <p className="text-white">Enterprise-grade APIs for seamless system integration</p>
          </div>
          <button
            onClick={() => setShowIntegrations(!showIntegrations)}
            className="px-4 py-2 bg-krim-cyan/20 border border-krim-cyan/40 rounded-lg text-krim-cyan hover:bg-krim-cyan/30 transition-all"
          >
            {showIntegrations ? 'Hide' : 'Show'} Details
          </button>
        </div>

        <AnimatePresence>
          {showIntegrations && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid lg:grid-cols-2 gap-6"
            >
              {INTEGRATION_POINTS.map((integration, index) => (
                <motion.div
                  key={integration.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="executive-card hover:border-krim-cyan/40"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-krim-cyan/20 flex items-center justify-center text-krim-cyan">
                        {integration.type === 'api' && <Globe className="w-5 h-5" />}
                        {integration.type === 'webhook' && <Lightning className="w-5 h-5" />}
                        {integration.type === 'stream' && <ChartBar className="w-5 h-5" />}
                        {integration.type === 'batch' && <Database className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{integration.name}</h4>
                        <div className="text-sm text-krim-cyan uppercase">{integration.type}</div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white">Protocol:</span>
                        <span className="text-white font-medium">{integration.protocol}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white">Authentication:</span>
                        <span className="text-white font-medium">{integration.authentication}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white">Rate Limit:</span>
                        <span className="text-white font-medium">{integration.rateLimit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white">Documentation:</span>
                        <span className="text-krim-mint font-medium">{integration.documentation}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}