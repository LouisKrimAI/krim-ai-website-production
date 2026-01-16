import * as React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type BaseCardProps = {
  children: React.ReactNode;
  className?: string;
  /** Enable hover lift & shadow (default: true) */
  interactive?: boolean;
  /** Optional click handler */
  onClick?: () => void;
  /** Tab index for keyboard navigation */
  tabIndex?: number;
  /** Apply accent border (subtle) */
  accent?: boolean;
  /** Card size variant */
  variant?: 'compact' | 'spacious';
};

/**
 * BaseCard — Glass intelligence tile
 *
 * Foundation for all homepage cards:
 * - Glass morphism (bg-white/[0.04] + backdrop-blur-xl)
 * - Surgical hover lift (3px translateY)
 * - Hover glow ring (mint accent, subtle)
 * - Institutional border (white/10-12)
 * - Optional accent border for emphasis
 * - Respects prefers-reduced-motion
 */
export default function BaseCard({
  children,
  className = "",
  interactive = true,
  onClick,
  tabIndex,
  accent = false,
  variant = 'compact',
}: BaseCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = interactive ? motion.div : "div";

  const baseClasses = [
    // Glass morphism with variant-based radius
    variant === 'spacious' ? "rounded-[var(--krim-radius-xl)]" : "rounded-[var(--krim-radius-lg)]",
    "bg-white/[0.03] backdrop-blur-sm",
    variant === 'spacious' ? "p-8" : "p-6",

    // Border
    accent ? "border border-white/12" : "border border-white/10",

    // Interactive states (hover + focus) - conditional based on reduced motion
    interactive && "will-change-transform transition-transform duration-200 ease-out",
    interactive && !prefersReducedMotion && "hover:-translate-y-[3px] hover:shadow-lg",
    interactive && !prefersReducedMotion && "focus-visible:-translate-y-[3px] focus-visible:shadow-lg",
    interactive && "hover:ring-1 hover:ring-krim-mint/20 hover:ring-offset-1",
    interactive && "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40",

    // Click affordance
    onClick && "cursor-pointer",

    className,
  ]
    .filter(Boolean)
    .join(" ");

  const motionProps = interactive && !prefersReducedMotion
    ? {
        whileHover: { y: -3 },
        whileFocus: { y: -3 },
        transition: { duration: 0.2, ease: "easeOut" },
      }
    : {};

  return (
    <Component
      className={baseClasses}
      onClick={onClick}
      tabIndex={tabIndex}
      role={onClick ? "button" : undefined}
      {...motionProps}
    >
      {children}
    </Component>
  );
}
