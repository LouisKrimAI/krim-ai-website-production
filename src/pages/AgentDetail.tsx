import { Suspense, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { agents, getAgentById } from '../data/agents'
import Card from '../components/Card'
import OptimizedAvatar from '../components/OptimizedAvatar'
import Button from '../components/Button'
import { CaretRight, Users, Phone } from '@phosphor-icons/react'

// Enhanced loading component for better UX
const LoadingState = () => (
  <div className="max-w-5xl mx-auto px-6 py-16 animate-pulse">
    <div className="h-4 bg-gray-300/20 rounded w-32 mb-6"></div>
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-36 h-36 bg-gray-300/20 rounded-full"></div>
      <div className="flex-1">
        <div className="h-8 bg-gray-300/20 rounded w-64 mb-2"></div>
        <div className="h-6 bg-gray-300/20 rounded w-48 mb-4"></div>
        <div className="h-4 bg-gray-300/20 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300/20 rounded w-3/4"></div>
      </div>
    </div>
  </div>
)

// Error state component with retry functionality
const ErrorState = ({ error, retry }: { error?: string; retry: () => void }) => (
  <div className="max-w-3xl mx-auto px-6 pt-20 pb-24 text-center">
    <div className="mb-6">
      <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold mb-2 text-white">Agent Not Found</h1>
      <p className="text-white mb-6">
        {error || "The requested agent profile could not be found."}
      </p>
      <div className="flex gap-4 justify-center">
        <Link 
          to="/agents" 
          className="bg-krim-cyan hover:bg-krim-cyan/80 text-black px-6 py-2 rounded-lg font-medium transition-colors"
        >
          View All Agents
        </Link>
        <button 
          onClick={retry}
          className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  </div>
)

// Main AgentDetail component with performance optimizations
export default function AgentDetail() {
  const { id } = useParams<{ id: string }>()
  const [retryKey, setRetryKey] = useState(0)
  
  // Performance: Early return for invalid ID
  if (!id) {
    return <ErrorState error="No agent ID provided" retry={() => window.location.reload()} />
  }

  const agent = getAgentById(id)
  
  if (!agent) {
    return (
      <ErrorState 
        error={`Agent "${id}" was not found in our system.`}
        retry={() => setRetryKey(prev => prev + 1)}
      />
    )
  }

  // Animation variants for smooth transitions
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-krim-deep-space">
    <Suspense fallback={<LoadingState />}>
      <motion.div
        key={retryKey}
        className="max-w-5xl mx-auto px-6 py-16"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Navigation */}
        <motion.div variants={itemVariants}>
          <Link 
            to="/agents" 
            className="inline-flex items-center text-krim-cyan hover:text-krim-cyan/80 transition-colors font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Agents
          </Link>
        </motion.div>

        {/* Agent Header */}
        <motion.div 
          className="flex flex-col md:flex-row gap-8 mt-6"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <div className="relative group">
              <div 
                className="w-36 h-36 rounded-full bg-gradient-to-br shadow-2xl overflow-hidden"
                style={{ 
                  background: `linear-gradient(135deg, ${agent.avatar.primaryColor}20, ${agent.avatar.secondaryColor}20)`
                }}
              >
                {agent.avatar.profilePhoto ? (
                  <OptimizedAvatar
                    baseName={agent.avatar.profilePhoto}
                    alt={agent.name}
                    width={144}
                    height={144}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl font-bold"
                       style={{ color: agent.avatar.primaryColor }}>
                    {agent.name[0]}
                  </div>
                )}
              </div>
              {/* Animated border effect */}
              <div 
                className="absolute inset-0 rounded-full opacity-50 animate-pulse"
                style={{ 
                  background: `conic-gradient(from 0deg, ${agent.avatar.primaryColor}, ${agent.avatar.secondaryColor}, ${agent.avatar.primaryColor})`,
                  padding: '2px',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude'
                }}
              ></div>
            </div>
          </motion.div>
          
          <motion.div className="flex-1" variants={itemVariants}>
            <h1 className="text-4xl font-bold text-white mb-2 text-white">{agent.name}</h1>
            <div className="text-krim-mint font-semibold mb-3">{agent.role}</div>
            <div className="text-lg text-krim-cyan/80 font-medium mb-3">"{agent.tagline}"</div>
            <p className="text-white leading-relaxed">{agent.description}</p>
            
            {/* Agent Traits */}
            <div className="flex flex-wrap gap-2 mt-4">
              {agent.personality.traits.map((trait, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white"
                >
                  {trait}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Philosophy Quote */}
        <motion.blockquote 
          className="border-l-4 border-krim-cyan pl-6 italic text-white my-8 text-lg"
          variants={itemVariants}
        >
          "{agent.personality.approach}"
        </motion.blockquote>

        {/* Performance Metrics and Details Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <h3 className="font-semibold text-white mb-4 text-lg text-white">Performance Highlights</h3>
              <div className="space-y-3">
                {agent.metrics.map((metric, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                    <span className="text-white font-medium">{metric.label}</span>
                    <span className="text-krim-mint font-bold text-lg">{metric.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <h3 className="font-semibold text-white mb-4 text-lg text-white">Personality & Approach</h3>
              <div className="space-y-3 text-sm text-white">
                <div>
                  <span className="text-white font-medium block mb-1">Category:</span>
                  <span className="capitalize">{agent.category === 'borrower' ? 'Customer-Facing' : 'Enterprise Operations'} Agent</span>
                </div>
                <div>
                  <span className="text-white font-medium block mb-1">Voice Tone:</span>
                  <span>{agent.personality.voiceTone}</span>
                </div>
                <div>
                  <span className="text-white font-medium block mb-1">Energy Signature:</span>
                  <span className="capitalize">{agent.avatar.energySignature.replace('-', ' ')}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Capabilities */}
        <motion.div variants={itemVariants}>
          <Card className="mb-6">
            <h3 className="font-semibold text-white mb-4 text-lg text-white">Core Capabilities</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white">
              {agent.capabilities.map((capability, i) => (
                <li key={i} className="flex items-start">
                  <svg className="w-5 h-5 text-krim-cyan mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{capability}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        {/* Skill Constellation */}
        <motion.div variants={itemVariants}>
          <Card>
            <h3 className="font-semibold text-white mb-4 text-lg text-white">Skill Constellation</h3>
            <div className="flex flex-wrap gap-3">
              {agent.skillConstellation.map((skill, i) => (
                <div
                  key={i}
                  className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${agent.avatar.primaryColor}20, ${agent.avatar.secondaryColor}20)`,
                    border: `1px solid ${agent.avatar.primaryColor}40`,
                    color: agent.avatar.primaryColor
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div variants={itemVariants} className="mt-8">
          <Card className="text-center bg-gradient-to-br from-krim-mint/10 to-krim-cyan/10 border-2 border-krim-mint/30">
            <h3 className="text-2xl font-bold text-white mb-4 text-white">
              Deploy {agent.name} in Your
              <span className="text-gradient bg-gradient-to-r from-krim-mint to-krim-cyan bg-clip-text text-transparent"> Multi-Agent OS</span>
            </h3>
            <p className="text-white mb-6 max-w-2xl mx-auto">
              {agent.businessImpact}. Ready to transform your {agent.category === 'borrower' ? 'customer interactions' : 'operations team'} with AI-powered excellence?
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contact" className="w-full sm:w-auto">
                <Button size="lg" magnetic glow className="w-full">
                  <Phone className="mr-2 w-5 h-5" />
                  Schedule Demo with {agent.name}
                  <CaretRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>

              <Link to="/agents" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full">
                  <Users className="mr-2 w-5 h-5" />
                  Explore All 12 Agents
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex flex-wrap justify-center gap-6 text-sm text-white">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-krim-mint rounded-full"></div>
                  <span>30-Day Implementation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-krim-mint rounded-full"></div>
                  <span>Zero Upfront Investment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-krim-mint rounded-full"></div>
                  <span>100% Compliance Guaranteed</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </Suspense>
    </div>
  )
}
