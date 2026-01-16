/**
 * DEPTH CARD - Revolutionary Data Visualization
 * Cards that exist in Z-space with living metrics and emotional resonance
 * Transforms static data into compelling visual narratives
 */

import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView, useAnimation, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { TrendUp, Lightning, ShieldCheck, Target, CurrencyDollar, Users, Clock, Trophy } from '@phosphor-icons/react'

interface MetricData {
  value: string | number
  label: string
  unit?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  description?: string
  icon?: 'trending' | 'zap' | 'shield' | 'target' | 'dollar' | 'users' | 'clock' | 'award'
}

interface DepthCardProps {
  metric?: MetricData
  children?: React.ReactNode
  title?: string
  description?: string
  depth?: 'shallow' | 'medium' | 'deep' | 'infinite'
  hover3D?: boolean
  glow?: boolean
  pulse?: boolean
  live?: boolean
  particles?: boolean
  borderGlow?: boolean
  size?: 'small' | 'medium' | 'large' | 'hero'
  variant?: 'default' | 'metric' | 'feature' | 'testimonial'
  className?: string
  onClick?: () => void
  disableAnimation?: boolean
}

export default function DepthCard({
  metric,
  children,
  title,
  description,
  depth = 'medium',
  hover3D = true,
  glow = false,
  pulse = false,
  live = false,
  particles = false,
  borderGlow = true,
  size = 'medium',
  variant = 'default',
  className = '',
  onClick,
  disableAnimation = false
}: DepthCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-100px' })
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [animatedValue, setAnimatedValue] = useState(0)

  // Motion values for 3D effects
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 300 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  // Size configurations
  const sizeConfig = {
    small: {
      padding: 'p-4',
      minHeight: 'min-h-[120px]',
      maxTilt: 8,
      metric: 'text-xl',
      label: 'text-xs'
    },
    medium: {
      padding: 'p-6',
      minHeight: 'min-h-[160px]',
      maxTilt: 12,
      metric: 'text-3xl',
      label: 'text-sm'
    },
    large: {
      padding: 'p-8',
      minHeight: 'min-h-[200px]',
      maxTilt: 15,
      metric: 'text-4xl',
      label: 'text-base'
    },
    hero: {
      padding: 'p-12',
      minHeight: 'min-h-[280px]',
      maxTilt: 20,
      metric: 'text-6xl',
      label: 'text-lg'
    }
  }

  // Depth configurations
  const depthConfig = {
    shallow: {
      background: 'glass-subtle',
      blur: 'backdrop-blur-sm',
      shadow: 'shadow-depth-1',
      zIndex: 'depth-content'
    },
    medium: {
      background: 'glass-medium',
      blur: 'backdrop-blur-md',
      shadow: 'shadow-depth-2',
      zIndex: 'depth-content'
    },
    deep: {
      background: 'glass-strong',
      blur: 'backdrop-blur-lg',
      shadow: 'shadow-depth-3',
      zIndex: 'depth-agents'
    },
    infinite: {
      background: 'glass-intense',
      blur: 'backdrop-blur-xl',
      shadow: 'shadow-depth-3',
      zIndex: 'depth-interaction'
    }
  }

  const config = sizeConfig[size]
  const depthStyle = depthConfig[depth]

  // Icon mapping
  const iconMap = {
    trending: TrendUp,
    zap: Lightning,
    shield: ShieldCheck,
    target: Target,
    dollar: CurrencyDollar,
    users: Users,
    clock: Clock,
    award: Trophy
  }

  // 3D tilt effect
  useEffect(() => {
    if (!hover3D || !cardRef.current) return

    const card = cardRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -config.maxTilt
      const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * config.maxTilt
      
      setRotation({ x: rotateX, y: rotateY, z: 0 })
      x.set((e.clientX - centerX) * 0.1)
      y.set((e.clientY - centerY) * 0.1)
    }

    const handleMouseLeave = () => {
      setRotation({ x: 0, y: 0, z: 0 })
      x.set(0)
      y.set(0)
    }

    if (isHovered) {
      document.addEventListener('mousemove', handleMouseMove)
      card.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hover3D, isHovered, x, y, config.maxTilt])

  // Live metric animation
  useEffect(() => {
    if (!live || !metric || typeof metric.value !== 'number') return

    const startTime = Date.now()
    const duration = 2000
    const startValue = 0
    const endValue = metric.value

    const animateValue = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      
      setAnimatedValue(Math.floor(easeOutCubic * endValue))
      
      if (progress < 1) {
        requestAnimationFrame(animateValue)
      }
    }

    if (isInView) {
      requestAnimationFrame(animateValue)
    }
  }, [isInView, live, metric])

  // Particle effect
  const ParticleEffect = () => {
    if (!particles || !isHovered) return null

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-krim-mint rounded-full opacity-60"
            initial={{ 
              x: '50%', 
              y: '50%', 
              scale: 0 
            }}
            animate={{
              x: `${50 + (Math.random() - 0.5) * 300}%`,
              y: `${50 + (Math.random() - 0.5) * 300}%`,
              scale: [0, 1, 0],
              opacity: [0.6, 1, 0]
            }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              repeat: Infinity,
              repeatDelay: 3
            }}
          />
        ))}
      </div>
    )
  }

  // Metric display component
  const MetricDisplay = () => {
    if (!metric) return null

    const IconComponent = metric.icon ? iconMap[metric.icon] : TrendUp
    const displayValue = live ? animatedValue : metric.value

    const ValueContainer = disableAnimation ? 'div' : motion.div
    const IconContainer = disableAnimation ? 'div' : motion.div
    const LabelContainer = disableAnimation ? 'div' : motion.div
    const TrendContainer = disableAnimation ? 'div' : motion.div
    const DescriptionContainer = disableAnimation ? 'p' : motion.p

    return (
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <ValueContainer
            className={`${config.metric} font-bold text-krim-mint`}
            {...(!disableAnimation && {
              initial: { scale: 0.8, opacity: 0 },
              animate: isInView ? { scale: 1, opacity: 1 } : {},
              transition: { duration: 0.6, delay: 0.2 }
            })}
          >
            {typeof displayValue === 'number'
              ? displayValue.toLocaleString()
              : displayValue}
            {metric.unit && <span className="text-base text-white ml-1">{metric.unit}</span>}
          </ValueContainer>

          {IconComponent && (
            <IconContainer
              className="text-krim-cyan"
              {...(!disableAnimation && {
                initial: { rotate: -180, opacity: 0 },
                animate: isInView ? { rotate: 0, opacity: 1 } : {},
                transition: { duration: 0.8, delay: 0.4 }
              })}
            >
              <IconComponent size={size === 'hero' ? 32 : size === 'large' ? 28 : 24} />
            </IconContainer>
          )}
        </div>

        <LabelContainer
          className={`${config.label} text-white`}
          {...(!disableAnimation && {
            initial: { y: 20, opacity: 0 },
            animate: isInView ? { y: 0, opacity: 1 } : {},
            transition: { duration: 0.6, delay: 0.3 }
          })}
        >
          {metric.label}
        </LabelContainer>

        {metric.trend && metric.trendValue && (
          <TrendContainer
            className={`flex items-center space-x-2 text-xs ${
              metric.trend === 'up'
                ? 'text-green-400'
                : metric.trend === 'down'
                  ? 'text-red-400'
                  : 'text-white'
            }`}
            {...(!disableAnimation && {
              initial: { x: -20, opacity: 0 },
              animate: isInView ? { x: 0, opacity: 1 } : {},
              transition: { duration: 0.6, delay: 0.5 }
            })}
          >
            <TrendUp
              size={14}
              className={metric.trend === 'down' ? 'rotate-180' : ''}
            />
            <span>{metric.trendValue}</span>
          </TrendContainer>
        )}

        {metric.description && (
          <DescriptionContainer
            className="text-xs text-white mt-2"
            {...(!disableAnimation && {
              initial: { opacity: 0 },
              animate: isInView ? { opacity: 1 } : {},
              transition: { duration: 0.6, delay: 0.6 }
            })}
          >
            {metric.description}
          </DescriptionContainer>
        )}
      </div>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      className={`
        relative ${config.padding} ${config.minHeight} ${depthStyle.background} 
        ${depthStyle.blur} ${depthStyle.shadow} ${depthStyle.zIndex}
        rounded-2xl border transition-all duration-500
        ${borderGlow 
          ? 'border-krim-mint/20 hover:border-krim-mint/40' 
          : 'border-white/10 hover:border-white/20'
        }
        ${glow ? 'hover:shadow-[0_0_40px_rgba(0,255,136,0.2)]' : ''}
        ${pulse ? 'animate-pulse' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        transform-gpu will-change-transform
        ${className}
      `}
      style={{
        transform: hover3D 
          ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateX(${springX}px) translateY(${springY}px)`
          : undefined
      }}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.8, 
        ease: 'easeOut',
        delay: Math.random() * 0.2 
      }}
      whileHover={{ 
        scale: onClick ? 1.02 : 1,
        transition: { duration: 0.2 }
      }}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Background gradient overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0"
        animate={{
          opacity: isHovered ? 0.1 : 0,
          background: [
            'linear-gradient(45deg, transparent, rgba(0,255,136,0.1), transparent)',
            'linear-gradient(225deg, transparent, rgba(0,212,255,0.1), transparent)',
            'linear-gradient(45deg, transparent, rgba(0,255,136,0.1), transparent)'
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Particle system */}
      <ParticleEffect />

      {/* Glow orb */}
      {glow && (
        <motion.div
          className="absolute -top-2 -right-2 w-4 h-4 bg-krim-mint rounded-full opacity-60"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {title && (
          <motion.h3
            className="text-lg font-semibold text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {title}
          </motion.h3>
        )}

        {metric ? <MetricDisplay /> : children}

        {description && (
          <motion.p
            className="text-sm text-white mt-3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {description}
          </motion.p>
        )}
      </div>

      {/* Hover reveal content */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none rounded-2xl"
        animate={{ 
          opacity: isHovered && onClick ? 1 : 0,
          background: 'rgba(0,0,0,0.8)'
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="text-krim-mint font-medium"
          initial={{ scale: 0.8 }}
          animate={{ scale: isHovered ? 1 : 0.8 }}
        >
          Click to explore →
        </motion.div>
      </motion.div>

      {/* Border animation */}
      {borderGlow && isHovered && (
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-krim-mint/40 pointer-events-none"
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.05, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  )
}

// Utility component for metric grids
interface MetricGridProps {
  metrics: MetricData[]
  size?: DepthCardProps['size']
  depth?: DepthCardProps['depth']
  className?: string
  disableAnimations?: boolean
}

export function MetricGrid({
  metrics,
  size = 'medium',
  depth = 'medium',
  className = '',
  disableAnimations = false
}: MetricGridProps) {
  const containerProps = disableAnimations
    ? {
        className: `grid gap-6 ${
          metrics.length === 2
            ? 'grid-cols-1 md:grid-cols-2'
            : metrics.length === 3
              ? 'grid-cols-1 md:grid-cols-3'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
        } ${className}`
      }
    : {
        className: `grid gap-6 ${
          metrics.length === 2
            ? 'grid-cols-1 md:grid-cols-2'
            : metrics.length === 3
              ? 'grid-cols-1 md:grid-cols-3'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
        } ${className}`,
        variants: {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.1
            }
          }
        },
        initial: "hidden" as const,
        animate: "visible" as const
      }

  const Container = disableAnimations ? 'div' : motion.div

  return (
    <Container {...containerProps}>
      {metrics.map((metric, index) => (
        <DepthCard
          key={index}
          metric={metric}
          size={size}
          depth={depth}
          live
          glow
          borderGlow
          particles
          variant="metric"
          disableAnimation={disableAnimations}
        />
      ))}
    </Container>
  )
}