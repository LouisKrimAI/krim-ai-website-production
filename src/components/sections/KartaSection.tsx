import { getHomeCopy } from "../../content/homepage";
import Section from "../primitives/Section";
import BaseCard from "../primitives/BaseCard";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce, staggerChildren, getMotionVariant } from "../../utils/motionPresets";
import { Users, Briefcase } from "@phosphor-icons/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import HighlightText from "../atoms/HighlightText";
import { getSectionHighlights } from "../../utils/highlights";

const copy = getHomeCopy().karta;
const highlightTerms = getSectionHighlights('karta');

export default function KartaSection() {
  const prefersReducedMotion = useReducedMotion();
  const motionVariant = getMotionVariant(prefersReducedMotion);

  return (
    <Section
      center
      id="karta"
      className="relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 opacity-[0.03] bg-grid bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-krim-mint/[0.02] to-transparent" />
      </div>

      {/* Pill: AI Credit Workforce */}
      <motion.div
        className="inline-flex items-center px-5 py-2 rounded-full bg-krim-mint/10 border border-krim-mint/20 mb-10 md:mb-12"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <span className="text-sm md:text-base text-krim-mint font-semibold tracking-wide">
          <HighlightText text={copy.headline} terms={highlightTerms} />
        </span>
      </motion.div>

      {/* Roles 2-column spacious grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto mb-10 md:mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerChildren(0.07)}
      >
        {copy.roles.map((role, index) => (
          <motion.div key={role} variants={motionVariant} className="flex">
            <BaseCard variant="spacious" className="min-h-[240px] flex flex-col justify-center">
              <h3 className="text-xl md:text-2xl font-semibold text-white/95 flex items-center justify-center text-center">
                {index === 0 && <Users className="mr-3 h-8 w-8 flex-shrink-0 opacity-90" aria-hidden="true" weight="duotone" />}
                {index === 1 && <Briefcase className="mr-3 h-8 w-8 flex-shrink-0 opacity-90" aria-hidden="true" weight="duotone" />}
                <HighlightText text={role} terms={highlightTerms} />
              </h3>
            </BaseCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Chip trio: Atomic • Composable • Governed */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-3 mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {copy.tagline.split('. ').map((chip, index) => (
          <div key={chip} className="flex items-center gap-3">
            <div className="inline-block px-4 py-2 rounded-full border border-white/15 bg-white/[0.03] text-xs md:text-sm text-white/80 font-medium">
              <HighlightText text={chip.replace('.', '')} terms={highlightTerms} />
            </div>
            {index < 2 && <span className="text-white/30 text-sm">•</span>}
          </div>
        ))}
      </motion.div>

      {/* Subline */}
      <motion.p
        className="text-base md:text-lg leading-relaxed text-white/70 max-w-[68ch] mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <HighlightText text={copy.subline} terms={highlightTerms} />
      </motion.p>
    </Section>
  );
}
