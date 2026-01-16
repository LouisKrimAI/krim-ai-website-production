import React from 'react';

interface HighlightTextProps {
  text: string;
  terms?: string[];
}

/**
 * HighlightText - Highlights specified keywords/phrases with subtle accent styling
 * - Matches exact case (case-sensitive)
 * - Whole-word matching for single words, phrase matching for multi-word
 * - No layout shift, subtle underline with minimal hover glow
 * - Screen reader friendly (decorative only)
 */
export default function HighlightText({ text, terms }: HighlightTextProps) {
  // If no terms or empty array, return plain text
  if (!terms || terms.length === 0) {
    return <>{text}</>;
  }

  // Escape regex special characters
  const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Build regex pattern for all terms
  // For multi-word terms, match as-is; for single words, use word boundaries
  const patterns = terms.map(term => {
    const escaped = escapeRegex(term);
    const isMultiWord = term.includes(' ');
    return isMultiWord ? escaped : `\\b${escaped}\\b`;
  });

  const regex = new RegExp(`(${patterns.join('|')})`, 'g');

  // Split text by matches
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        // Check if this part is a match
        const isMatch = terms.some(term => part === term);

        if (isMatch) {
          return (
            <mark
              key={index}
              className="relative whitespace-pre-wrap bg-transparent text-inherit"
            >
              <span className="underline underline-offset-4 decoration-2 decoration-krim-mint/70">
                {part}
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-0.5 h-px bg-krim-mint/20 transition-opacity duration-300 group-hover:opacity-30"
              />
            </mark>
          );
        }

        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
}
