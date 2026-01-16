import { getHomeCopy } from "../../content/homepage";
import Section from "../primitives/Section";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeUp, viewportOnce, getMotionVariant } from "../../utils/motionPresets";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import HighlightText from "../atoms/HighlightText";
import { getSectionHighlights } from "../../utils/highlights";

const copy = getHomeCopy().closing;
const highlightTerms = getSectionHighlights('closing');

export default function ClosingSection() {
  const prefersReducedMotion = useReducedMotion();
  const motionVariant = getMotionVariant(prefersReducedMotion);

  return (
    <Section
      center
      id="closing"
      className="relative overflow-hidden"
      data-closing-section
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_50%_50%,_transparent_0%,_transparent_48%,_rgba(255,255,255,0.2)_48%,_rgba(255,255,255,0.2)_52%,_transparent_52%)] bg-[length:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-krim-mint/[0.02] to-transparent" />
      </div>

      {/* Glass OS panel container with depth glow */}
      <div className="relative max-w-5xl mx-auto">
        {/* Depth glow behind panel */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[120%] bg-gradient-radial from-krim-mint/10 via-krim-cyan/5 to-transparent blur-3xl opacity-10 pointer-events-none -z-10" />

        {/* Glass OS panel */}
        <div className="relative rounded-3xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] p-12 md:p-16">
          {/* Corner accent dots */}
          <div className="absolute top-4 left-4 w-1 h-1 rounded-full bg-krim-mint/40" />
          <div className="absolute top-4 right-4 w-1 h-1 rounded-full bg-krim-mint/40" />
          <div className="absolute bottom-4 left-4 w-1 h-1 rounded-full bg-krim-mint/40" />
          <div className="absolute bottom-4 right-4 w-1 h-1 rounded-full bg-krim-mint/40" />

          {/* Anchor statement */}
          <motion.p
            className="text-lg md:text-xl font-medium leading-relaxed text-white/95 relative mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={motionVariant}
          >
            <HighlightText text={copy.anchor} terms={highlightTerms} />
          </motion.p>

          {/* Secondary CTA */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Link
              to="/book-demo"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/[0.02] text-white/90 font-medium text-sm hover:bg-white/[0.05] hover:border-krim-mint/40 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-krim-mint/50"
              data-krim-cta="closing-secondary"
            >
              Book Demo
            </Link>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
