import * as React from "react";
import { Link as LinkIcon } from "@phosphor-icons/react";
import { useToast } from "../../hooks/useToast";

type SectionProps = {
  id?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  /** When true, centers title/subtitle and content (for hero/problem/solution). */
  center?: boolean;
  /** Allow content to span edge-to-edge while keeping heading container aligned */
  bleed?: boolean;
  /** Text alignment for section */
  align?: 'left' | 'center';
};

export default function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
  center = false,
  bleed = false,
  align = 'left',
}: SectionProps) {
  const { showToast } = useToast();

  const handleCopyLink = () => {
    if (!id) return;
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url).then(() => {
      showToast('Link copied');
    });
  };

  // Extract data attributes from className if present
  const dataClosingSection = className?.includes('data-closing-section');

  return (
    <section
      id={id}
      data-section
      {...(dataClosingSection ? { 'data-closing-section': true } : {})}
      className={`relative py-12 md:py-16 lg:py-24 ${className.replace('data-closing-section', '')}`}
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1000px' }}
    >
      <div className={`mx-auto ${bleed ? 'w-full' : 'max-w-[var(--krim-container)]'} px-4 md:px-6 ${align === 'center' || center ? "text-center" : ""}`}>
        {title ? (
          <div className={`group relative inline-flex items-center gap-2 ${center ? "justify-center w-full" : ""}`}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-white/95">
              {title}
            </h2>
            {id && (
              <button
                onClick={handleCopyLink}
                title="Copy link"
                aria-label="Copy link to this section"
                className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-200 p-1.5 rounded-lg hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-krim-mint/50"
              >
                <LinkIcon className="w-5 h-5 text-white/50 hover:text-krim-mint/80" weight="bold" />
              </button>
            )}
          </div>
        ) : null}
        {subtitle ? (
          <p className={`mt-4 text-base md:text-lg leading-relaxed text-white/80 ${center ? "mx-auto max-w-[68ch]" : "max-w-[68ch]"}`}>
            {subtitle}
          </p>
        ) : null}
        <div className={`${title || subtitle ? "mt-10 md:mt-12" : ""}`}>{children}</div>
      </div>
    </section>
  );
}
