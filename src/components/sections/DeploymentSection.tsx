import { getHomeCopy } from "../../content/homepage";
import Section from "../primitives/Section";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce, getMotionVariant } from "../../utils/motionPresets";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import HighlightText from "../atoms/HighlightText";
import { getSectionHighlights } from "../../utils/highlights";

const copy = getHomeCopy().deployment;
const highlightTerms = getSectionHighlights('deployment');

export default function DeploymentSection() {
  const prefersReducedMotion = useReducedMotion();
  const motionVariant = getMotionVariant(prefersReducedMotion);

  // Parse deployment modes from body
  const deploymentModes = copy.body.split(" • ");

  return (
    <Section
      center
      id="deployment"
      title={<HighlightText text={copy.headline} terms={highlightTerms} />}
      className="relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_50%_50%,_transparent_0%,_transparent_48%,_rgba(255,255,255,0.2)_48%,_rgba(255,255,255,0.2)_52%,_transparent_52%)] bg-[length:40px_40px]" />
      </div>

      {/* Centered glass chip bar (no hover) */}
      <motion.div
        className="flex flex-wrap justify-center gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={motionVariant}
      >
        {deploymentModes.map((mode) => (
          <div
            key={mode}
            className="bg-white/[0.04] backdrop-blur-sm border border-white/10 px-6 py-3 rounded-full text-sm md:text-base text-white/85 font-medium"
          >
            <HighlightText text={mode} terms={highlightTerms} />
          </div>
        ))}
      </motion.div>
    </Section>
  );
}
