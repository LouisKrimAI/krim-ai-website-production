import { getHomeCopy } from "../../content/homepage";
import Section from "../primitives/Section";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce, staggerChildren, getMotionVariant } from "../../utils/motionPresets";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import HighlightText from "../atoms/HighlightText";
import { getSectionHighlights } from "../../utils/highlights";

const copy = getHomeCopy().kupa;
const highlightTerms = getSectionHighlights('kupa');

export default function KupaSection() {
  const prefersReducedMotion = useReducedMotion();
  const motionVariant = getMotionVariant(prefersReducedMotion);

  // Parse subline into 8 command center items
  const commandCenters = copy.subline.split(" • ");

  return (
    <Section
      center
      id="kupa"
      title={<HighlightText text={copy.headline} terms={highlightTerms} />}
      className="relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 opacity-[0.03] bg-grid bg-[size:60px_60px]" />
      </div>

      {/* 2×4 grid of mini command center cards */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerChildren(0.05)}
      >
        {commandCenters.map((center) => (
          <motion.div
            key={center}
            variants={motionVariant}
            className="rounded-[var(--krim-radius-lg)] bg-white/[0.04] backdrop-blur-xl border border-white/10 p-5 transition-all duration-200 ease-out hover:-translate-y-[3px] hover:ring-1 hover:ring-krim-mint/20 hover:ring-offset-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-krim-mint/50"
          >
            {/* Icon placeholder circle */}
            <div className="w-10 h-10 mx-auto mb-3 rounded-full border border-white/10 bg-white/[0.02]" aria-hidden="true" />
            {/* Center name */}
            <p className="text-[clamp(13px,1.3vw,14px)] text-center text-white/85 font-medium">
              <HighlightText text={center} terms={highlightTerms} />
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer lines with accent dot separators */}
      <motion.div
        className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-[clamp(14px,1.4vw,16px)] text-krim-mint/90"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        {copy.lines.map((line, index) => (
          <div key={line} className="flex items-center gap-4">
            <span><HighlightText text={line} terms={highlightTerms} /></span>
            {index < copy.lines.length - 1 && (
              <span className="hidden md:inline text-krim-mint/40">•</span>
            )}
          </div>
        ))}
      </motion.div>
    </Section>
  );
}
