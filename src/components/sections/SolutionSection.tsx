import { getHomeCopy } from "../../content/homepage";
import BaseCard from "../primitives/BaseCard";
import Section from "../primitives/Section";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce, staggerChildren, getMotionVariant, reduced } from "../../utils/motionPresets";
import { ExpertCoWorkersGlyph, UnifiedIntelligenceGlyph, ContinuousLearningGlyph, CompliantByDesignGlyph } from "../atoms/PillarGlyphs";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import HighlightText from "../atoms/HighlightText";
import { getHighlights } from "../../utils/highlights";

const { krimos, pillars } = getHomeCopy();
const highlightTerms = getHighlights();

export default function SolutionSection() {
  const prefersReducedMotion = useReducedMotion();
  const motionVariant = getMotionVariant(prefersReducedMotion);

  return (
    <Section
      center
      id="krimos"
      title={
        <>
          <span className="text-white/50 text-sm md:text-base uppercase tracking-wider block mb-3">
            <HighlightText text={krimos.kicker} terms={highlightTerms} />
          </span>
          <span className="text-2xl md:text-3xl lg:text-4xl block mb-2">
            <span className="text-krim-mint relative inline-block">
              Kendra
              {/* Animated underline */}
              <motion.span
                className="absolute left-0 bottom-0 h-[3px] bg-krim-mint"
                initial={{ width: reduced(prefersReducedMotion, "0%", "100%") }}
                whileInView={{ width: "100%" }}
                viewport={viewportOnce}
                transition={{ duration: reduced(prefersReducedMotion, 0.2, 0), delay: 0.1 }}
              />
            </span> — <HighlightText text={krimos.headline.replace('Kendra — ', '')} terms={highlightTerms} />
          </span>
        </>
      }
      subtitle={<HighlightText text={krimos.subline} terms={highlightTerms} />}
      className="relative overflow-hidden"
    >
      {/* Background — hexagonal grid */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_50%_50%,_transparent_0%,_transparent_48%,_rgba(255,255,255,0.2)_48%,_rgba(255,255,255,0.2)_52%,_transparent_52%)] bg-[length:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-krim-mint/[0.02] to-transparent" />
      </div>

      {/* Pill: Autonomy with Governance */}
      <motion.div
        className="inline-flex items-center px-4 py-2 rounded-full bg-krim-mint/10 border border-krim-mint/20 mb-10 md:mb-12"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <span className="text-sm text-krim-mint font-medium tracking-wide">
          <HighlightText text={pillars.pillarsTag} terms={highlightTerms} />
        </span>
      </motion.div>

      {/* Kendra 4 pillars — 2×2 spacious grid */}
      <motion.div
        id="pillars"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerChildren(0.07)}
      >
        {pillars.pillars.map((pillar, index) => (
          <motion.div key={pillar.title} variants={motionVariant} className="flex">
            <BaseCard variant="spacious" accent={index === 3} className="min-h-[200px] flex flex-col">
              <div className="flex flex-col h-full">
                <h3 className="text-lg md:text-xl font-semibold text-white/95 flex items-center mb-4">
                  {index === 0 && <ExpertCoWorkersGlyph className="mr-3 h-10 w-10 flex-shrink-0" />}
                  {index === 1 && <UnifiedIntelligenceGlyph className="mr-3 h-10 w-10 flex-shrink-0" />}
                  {index === 2 && <ContinuousLearningGlyph className="mr-3 h-10 w-10 flex-shrink-0" />}
                  {index === 3 && <CompliantByDesignGlyph className="mr-3 h-10 w-10 flex-shrink-0" />}
                  <HighlightText text={pillar.title} terms={highlightTerms} />
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-white/75 flex-1">
                  <HighlightText text={pillar.body} terms={highlightTerms} />
                </p>
              </div>
            </BaseCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
