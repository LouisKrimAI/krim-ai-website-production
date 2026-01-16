/**
 * Reveal Component - Sticky-after-first-view scroll animation
 * Replaces problematic whileInView patterns that cause disappearing elements
 */
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  amount?: number;
  className?: string;
}

export function Reveal({ children, amount = 0.25, className }: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount });
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (inView) setSeen(true);
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={false}                       // never start hidden
      animate={seen ? "show" : "idle"}      // once seen, never revert
      variants={{
        idle: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
      className={className}
      data-reveal
    >
      {children}
    </motion.div>
  );
}