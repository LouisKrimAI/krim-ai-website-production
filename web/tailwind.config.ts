import type { Config } from 'tailwindcss'

/**
 * krim.ai — ONE CANVAS token system (BUILD-BRIEF v3 §3).
 *
 * One background throughout: the deep Krim ground. Glass panels carry
 * content above it. Grammar: cyan = proposed/thinking · mint = validated/
 * learned · gold (amber-dark) = exception states only.
 *
 * NOTE: the paper/ink/seal/rule families below are RETIRED (v2 light-world)
 * but retained until the homepage rework (v3 step ②) — app/page.tsx and
 * HeroArrival still consume them. Remove after step ②.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ---- the RECORD (light · home register) ----
        paper: { DEFAULT: '#F7F5F1', 2: '#EFECE5', card: '#FFFFFF' },
        rule: { DEFAULT: '#DAD6CC', strong: '#B9B4A6' },
        ink: { DEFAULT: '#16181D', 2: '#4A4E57', 3: '#8B8E96' },
        seal: { DEFAULT: '#0A6B4E', bright: '#00C98C' },
        amber: { DEFAULT: '#8A6A2A', dark: '#C8A14A' },

        // ---- the RUNTIME (dark · punctuation) ----
        runtime: { DEFAULT: '#09090C', deep: '#04060C', panel: '#101116' },
        rline: { DEFAULT: 'rgba(57,214,255,0.16)', dim: 'rgba(57,214,255,0.08)', soft: 'rgba(255,255,255,0.08)' },
        // rtext-3 floored at #7A8089 for AA on the small tracked mono labels
        rtext: { DEFAULT: '#F6F6F4', 2: '#A9ADB6', 3: '#7A8089' },
        cyan: { DEFAULT: '#39D6FF', pale: '#BFEFFF' },
        mint: { DEFAULT: '#00FFB2', bright: '#5CFFCB', dim: '#00C98C', on: '#04130D' },
        fail: { DEFAULT: '#E5484D' },
      },
      fontFamily: {
        serif: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.16, 1, 0.30, 1)',
        'in-out-soft': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      maxWidth: { measure: '68ch', site: '1120px' },
    },
  },
  plugins: [],
}
export default config
