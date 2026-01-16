import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface AnimatedIconProps {
  children: ReactNode;
  animation?: 'float' | 'pulse' | 'rotate' | 'bounce' | 'swing';
  className?: string;
  duration?: number;
}

/**
 * AnimatedIcon - Wraps any icon with subtle continuous animation
 * Animation pauses on hover for better UX
 */
export default function AnimatedIcon({
  children,
  animation = 'float',
  className = '',
  duration = 3
}: AnimatedIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Different animation variants for variety
  const animations = {
    float: {
      y: [0, -8, 0],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    pulse: {
      scale: [1, 1.08, 1],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    rotate: {
      rotate: [0, 5, -5, 0],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    bounce: {
      y: [0, -10, 0],
      scale: [1, 0.95, 1],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeOut"
      }
    },
    swing: {
      rotate: [0, 10, -10, 0],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className={`inline-flex ${className}`}
      animate={isHovered ? {} : animations[animation]}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
}
