/**
 * Highlights utility - retrieves highlight terms from copy.json
 */

export function getHighlights(): string[] {
  try {
    // Dynamic import to avoid bundling issues
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const copy = require('../content/homepage/copy.json');
    return copy.highlights ?? [];
  } catch {
    return [];
  }
}

/**
 * Get combined highlights for a specific section
 * Merges global highlights with section-specific highlights
 * @param sectionKey - The section key (e.g., 'hero', 'problem', 'krimos')
 * @returns Array of unique highlight terms
 */
export function getSectionHighlights(sectionKey: string): string[] {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const copy = require('../content/homepage/copy.json');
    const global = copy.highlights ?? [];
    const local = copy[sectionKey]?.highlights ?? [];

    // Merge, deduplicate, and filter out empty values
    return Array.from(new Set([...global, ...local])).filter(Boolean);
  } catch {
    return [];
  }
}
