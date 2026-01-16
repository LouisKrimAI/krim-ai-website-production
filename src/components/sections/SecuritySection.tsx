import { getHomeCopy } from "../../content/homepage";
import Section from "../primitives/Section";
import BaseCard from "../primitives/BaseCard";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce, staggerChildren, getMotionVariant } from "../../utils/motionPresets";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import HighlightText from "../atoms/HighlightText";
import { getSectionHighlights } from "../../utils/highlights";

const copy = getHomeCopy().security;
const highlightTerms = getSectionHighlights('security');

export default function SecuritySection() {
  const prefersReducedMotion = useReducedMotion();
  const motionVariant = getMotionVariant(prefersReducedMotion);

  return (
    <Section
      center
      id="security"
      title={<HighlightText text={copy.headline} terms={highlightTerms} />}
      className="relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 opacity-[0.03] bg-grid bg-[size:60px_60px]" />
      </div>

      {/* 3-column grid of compact security cards */}
      <motion.div
        className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerChildren(0.06)}
      >
        {copy.bullets.map((bullet) => (
          <motion.div key={bullet} variants={motionVariant}>
            <BaseCard>
              {/* Lock/shield icon placeholder */}
              <div className="w-8 h-8 mx-auto mb-3 rounded-full border border-white/10 bg-white/[0.02]" aria-hidden="true" />
              {/* Bullet text - higher contrast */}
              <p className="text-base md:text-lg text-center leading-relaxed text-white/90 font-medium">
                <HighlightText text={bullet} terms={highlightTerms} />
              </p>
            </BaseCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
