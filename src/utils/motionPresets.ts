/**
 * KRIM AI — MOTION PRESETS
 * Institutional motion system for Framer Motion
 * Calm inevitability. Surgical precision.
 */

export const fadeUp = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0)", transition: { duration: 0.22, ease: "easeOut" } },
};

export const fadeUpReducedMotion = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22, ease: "easeOut" } },
};

export const viewportOnce = { once: true, margin: "-80px" };

export const staggerChildren = (step = 0.06) => ({
  visible: {
    transition: { staggerChildren: step }
  }
});

/**
 * Get motion variant based on user's reduced-motion preference
 * @param prefersReducedMotion - boolean from useReducedMotion hook
 * @param variant - the full-motion variant to use
 * @param reducedVariant - optional reduced-motion variant (defaults to fadeUpReducedMotion)
 */
export const getMotionVariant = (
  prefersReducedMotion: boolean,
  variant: typeof fadeUp = fadeUp,
  reducedVariant: typeof fadeUpReducedMotion = fadeUpReducedMotion
) => {
  return prefersReducedMotion ? reducedVariant : variant;
};

/**
 * Reduced motion helper - returns minimal variant if user prefers reduced motion
 * @param prefers - boolean from useReducedMotion hook
 * @param full - full motion variant
 * @param minimal - reduced motion variant
 */
export const reduced = <T, M>(prefers: boolean, full: T, minimal: M): T | M => {
  return prefers ? minimal : full;
};
