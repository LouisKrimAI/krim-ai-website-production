import { getHomeCopy } from "../../content/homepage";
import Section from "../primitives/Section";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce, staggerChildren, getMotionVariant } from "../../utils/motionPresets";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import HighlightText from "../atoms/HighlightText";
import { getSectionHighlights } from "../../utils/highlights";
import StunningIntegrationsSection from "../home/StunningIntegrationsSection";

const copy = getHomeCopy().integrations;
const highlightTerms = getSectionHighlights('integrations');

export default function IntegrationsSection() {
  const prefersReducedMotion = useReducedMotion();
  const motionVariant = getMotionVariant(prefersReducedMotion);

  return (
    <Section
      center
      id="integrations"
      title={<HighlightText text={copy.headline} terms={highlightTerms} />}
      className="relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 opacity-[0.03] bg-grid bg-[size:60px_60px]" />
      </div>

      {/* Body lines with stagger */}
      <motion.div
        className="flex flex-col gap-6 max-w-3xl mx-auto mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerChildren(0.06)}
      >
        {/* Row 1: Main line */}
        <motion.p
          variants={motionVariant}
          className="text-base md:text-lg leading-relaxed text-white/85 text-center"
        >
          <HighlightText text={copy.body[0]} terms={highlightTerms} />
        </motion.p>

        {/* Row 2: Supporting lines with accent dots */}
        <div className="flex flex-col gap-4">
          {copy.body.slice(1).map((line) => (
            <motion.div
              key={line}
              variants={motionVariant}
              className="flex items-center justify-center gap-3"
            >
              <span className="inline-block w-1 h-1 rounded-full bg-krim-mint/60 flex-shrink-0" />
              <p className="text-base md:text-lg leading-relaxed text-white/80">
                <HighlightText text={line} terms={highlightTerms} />
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Integration Ecosystem Visualization */}
      <StunningIntegrationsSection />
    </Section>
  );
}
