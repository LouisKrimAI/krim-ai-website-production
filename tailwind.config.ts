import type { Config } from 'tailwindcss'

/**
 * Krim — Tailwind theme, generated from docs/design-tokens.md.
 * One dark canvas (#09090C / #04060C) · mint = validated/learned ·
 * cyan (orb) = proposed/thinking · gold sparingly for amber/exception.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: '#09090C', deep: '#04060C' },
        surface: { DEFAULT: '#101116', raised: '#15171D' },
        mint: { DEFAULT: '#00FFB2', bright: '#5CFFCB', dim: '#00C98C', deep: '#0A6B4E' },
        'on-mint': '#04130D',
        gold: { DEFAULT: '#C8A14A', dim: '#A8843A' },
        ink: { DEFAULT: '#F6F6F4', 2: '#A9ADB6', 3: '#828791' },
        orb: { stroke: '#39D6FF', glow: '#BFEFFF' },
        cyan: '#39D6FF', // grammar alias: proposed / thinking
        pass: '#00FFB2',
        amber: '#C8A14A',
        fail: '#E5484D',
      },
      borderColor: {
        soft: 'rgba(255,255,255,0.08)',
        strong: 'rgba(255,255,255,0.14)',
      },
      fontFamily: {
        serif: ['var(--font-display)', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['var(--font-body)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'Consolas', 'monospace'],
      },
      fontSize: {
        // type scale — docs/design-tokens.md §2, scaled up for presence
        'display-hero': ['clamp(3rem, 6.6vw, 5.75rem)', { lineHeight: '1.04', letterSpacing: '-0.02em', fontWeight: '400' }],
        'display-1': ['clamp(2.3rem, 4.6vw, 3.9rem)', { lineHeight: '1.08', letterSpacing: '-0.015em', fontWeight: '400' }],
        'display-2': ['clamp(1.6rem, 2.4vw, 2.05rem)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '500' }],
        'display-3': ['clamp(1.7rem, 3.2vw, 2.5rem)', { lineHeight: '1.14', letterSpacing: '-0.012em', fontWeight: '400' }],
        eyebrow: ['0.8125rem', { lineHeight: '1', letterSpacing: '0.2em', fontWeight: '500' }],
        'body-lg': ['1.25rem', { lineHeight: '1.62' }],
        body: ['1.0625rem', { lineHeight: '1.62' }],
        caption: ['0.8125rem', { lineHeight: '1.55' }],
        'mono-data': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '500' }],
      },
      borderRadius: {
        sm: 'var(--r-sm)',
        DEFAULT: 'var(--r)',
        lg: 'var(--r-lg)',
        xl: 'var(--r-xl)',
      },
      maxWidth: {
        measure: 'var(--measure)',
        site: '1200px',
      },
      padding: {
        'section-y': 'var(--section-y)',
      },
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-soft': 'cubic-bezier(0.65, 0, 0.35, 1)',
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        fast: '150ms',
        DEFAULT: '240ms',
        slow: '420ms',
      },
    },
  },
  plugins: [],
}

export default config
