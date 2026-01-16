/**
 * KRIM AI - METRIC DISPLAY COMPONENT
 * Enterprise-grade metric presentation with real-time updates
 * Integrates with Claims Registry for consistent data display
 */

import { useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getMetric, getFormattedMetric, validateMetricFreshness } from '../../data/claimsRegistry'
import { contentPerformanceMonitor } from '../../utils/contentManager'
import styles from './MetricDisplay.module.css'

interface MetricDisplayProps {
  metricId: string
  showDescription?: boolean
  showSource?: boolean
  showConfidence?: boolean
  size?: 'small' | 'medium' | 'large'
  variant?: 'default' | 'hero' | 'card' | 'inline'
  animate?: boolean
  className?: string
  onMetricClick?: (metricId: string) => void
}

export const MetricDisplay: React.FC<MetricDisplayProps> = ({
  metricId,
  showDescription = false,
  showSource = false,
  showConfidence = false,
  size = 'medium',
  variant = 'default',
  animate = true,
  className = '',
  onMetricClick
}) => {
  const metric = useMemo(() => getMetric(metricId), [metricId])
  const formattedValue = useMemo(() => getFormattedMetric(metricId), [metricId])
  const isFresh = useMemo(() => validateMetricFreshness(metricId), [metricId])
  
  // Performance tracking
  useEffect(() => {
    const loadStart = performance.now()
    const loadEnd = performance.now()
    contentPerformanceMonitor.trackContentLoad(`metric_${metricId}`, loadEnd - loadStart)
    
    if (!isFresh && metric) {
      contentPerformanceMonitor.trackStaleContent(`metric_${metricId}`, [metricId])
    }
  }, [metricId, isFresh, metric])
  
  if (!metric) {
    return (
      <div className={`${styles.metricDisplay} ${styles.metricDisplayError} ${className}`}>
        <span className={styles.metricDisplayErrorText}>Metric not found</span>
      </div>
    )
  }
  
  const handleClick = () => {
    if (onMetricClick) {
      onMetricClick(metricId)
      contentPerformanceMonitor.trackContentInteraction(`metric_${metricId}`, 'click')
    }
  }
  
  const baseClasses = [
    styles.metricDisplay,
    styles[`metricDisplay${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
    styles[`metricDisplay${size.charAt(0).toUpperCase() + size.slice(1)}`],
    !isFresh && styles.metricDisplayStale,
    onMetricClick && styles.metricDisplayClickable,
    className
  ].filter(Boolean).join(' ')
  
  const MetricContent = (
    <>
      <div className={styles.metricDisplayValueContainer}>
        <span className={styles.metricDisplayValue}>
          {formattedValue}
        </span>
        {!isFresh && (
          <div className={styles.metricDisplayWarning} title="Data may be outdated">
            ⚠️
          </div>
        )}
      </div>
      
      <div className={styles.metricDisplayTitle}>
        {metric.title}
      </div>
      
      {showDescription && (
        <div className={styles.metricDisplayDescription}>
          {metric.description}
        </div>
      )}
      
      {showSource && (
        <div className={styles.metricDisplayMeta}>
          <span className={styles.metricDisplaySource}>
            Source: {metric.source}
          </span>
          {showConfidence && (
            <span className={styles.metricDisplayConfidence}>
              Confidence: {metric.confidenceLevel}
            </span>
          )}
        </div>
      )}
    </>
  )
  
  if (animate) {
    return (
      <motion.div
        className={baseClasses}
        onClick={handleClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1] }}
        whileHover={onMetricClick ? { scale: 1.02 } : undefined}
        whileTap={onMetricClick ? { scale: 0.98 } : undefined}
      >
        {MetricContent}
      </motion.div>
    )
  }
  
  return (
    <div className={baseClasses} onClick={handleClick}>
      {MetricContent}
    </div>
  )
}

/**
 * Metric Grid Component
 * Displays multiple metrics in a responsive grid
 */
interface MetricGridProps {
  metrics: string[]
  columns?: 2 | 3 | 4
  size?: 'small' | 'medium' | 'large'
  variant?: 'default' | 'hero' | 'card' | 'inline'
  showDescriptions?: boolean
  animate?: boolean
  className?: string
}

export const MetricGrid: React.FC<MetricGridProps> = ({
  metrics,
  columns = 3,
  size = 'medium',
  variant = 'default',
  showDescriptions = false,
  animate = true,
  className = ''
}) => {
  const gridClasses = [
    styles.metricGrid,
    styles[`metricGridColumns${columns}`],
    className
  ].filter(Boolean).join(' ')
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.0, 0.0, 0.2, 1]
      }
    }
  }
  
  if (animate) {
    return (
      <motion.div
        className={gridClasses}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {metrics.map(metricId => (
          <motion.div key={metricId} variants={itemVariants}>
            <MetricDisplay
              metricId={metricId}
              size={size}
              variant={variant}
              showDescription={showDescriptions}
              animate={false} // Grid handles animation
            />
          </motion.div>
        ))}
      </motion.div>
    )
  }
  
  return (
    <div className={gridClasses}>
      {metrics.map(metricId => (
        <MetricDisplay
          key={metricId}
          metricId={metricId}
          size={size}
          variant={variant}
          showDescription={showDescriptions}
          animate={animate}
        />
      ))}
    </div>
  )
}

/**
 * Inline Metric Component
 * For embedding metrics within text content
 */
interface InlineMetricProps {
  metricId: string
  prefix?: string
  suffix?: string
  className?: string
}

export const InlineMetric: React.FC<InlineMetricProps> = ({
  metricId,
  prefix = '',
  suffix = '',
  className = ''
}) => {
  const formattedValue = useMemo(() => getFormattedMetric(metricId), [metricId])
  const isFresh = useMemo(() => validateMetricFreshness(metricId), [metricId])
  
  const classes = [
    styles.inlineMetric,
    !isFresh && styles.inlineMetricStale,
    className
  ].filter(Boolean).join(' ')
  
  return (
    <span className={classes} title={!isFresh ? 'Data may be outdated' : undefined}>
      {prefix}{formattedValue}{suffix}
    </span>
  )
}

export default MetricDisplay