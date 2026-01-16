/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // Enable dark mode with 'dark' class on HTML tag
  theme: {
    extend: {
      colors: {
        // Official Krim AI brand colors
        'krim-deep-space': '#0A081B',
        'krim-mint': '#00FF88',
        'krim-cyan': '#00D4FF',
        'krim-coral': '#FF4C61',
        'krim-purple': '#8B5CF6',
        // 'krim-ash': '#A3A3B5', // REMOVED: 0 usages in codebase
        
        // Depth system colors
        'depth-void': 'var(--depth-void)',
        'depth-space': 'var(--depth-space)',
        'depth-midnight': 'var(--depth-midnight)',
        'depth-twilight': 'var(--depth-twilight)',
        'depth-dawn': 'var(--depth-dawn)',
        
        // Glass system
        'glass-barely': 'var(--glass-barely)',
        'glass-subtle': 'var(--glass-subtle)',
        'glass-soft': 'var(--glass-soft)',
        'glass-medium': 'var(--glass-medium)',
        'glass-strong': 'var(--glass-strong)',
        'glass-intense': 'var(--glass-intense)',
        
        // Semantic color system
        'primary': 'var(--color-primary)',
        'secondary': 'var(--color-secondary)',
        'background': 'var(--color-background)',
        'surface': 'var(--color-surface)',
        'surface-elevated': 'var(--color-surface-elevated)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        'success': 'var(--color-success)',
        'warning': 'var(--color-warning)',
        'error': 'var(--color-error)',
        'info': 'var(--color-info)',
      },
      fontFamily: {
        'display': ['var(--font-display)'],
        'body': ['var(--font-body)'],
        'mono': ['var(--font-mono)'],
      },
      fontSize: {
        'xs': ['var(--text-xs)', { lineHeight: '1.4' }],
        'sm': ['var(--text-sm)', { lineHeight: '1.5' }],
        'base': ['var(--text-base)', { lineHeight: '1.6' }],
        'lg': ['var(--text-lg)', { lineHeight: '1.6' }],
        'xl': ['var(--text-xl)', { lineHeight: '1.5' }],
        '2xl': ['var(--text-2xl)', { lineHeight: '1.4' }],
        '3xl': ['var(--text-3xl)', { lineHeight: '1.3' }],
        '4xl': ['var(--text-4xl)', { lineHeight: '1.2' }],
        '5xl': ['var(--text-5xl)', { lineHeight: '1.1' }],
        '6xl': ['var(--text-6xl)', { lineHeight: '1.0' }],
        '7xl': ['var(--text-7xl)', { lineHeight: '1.0' }],
      },
      spacing: {
        '1': 'var(--space-1)',
        '2': 'var(--space-2)',
        '3': 'var(--space-3)',
        '4': 'var(--space-4)',
        '6': 'var(--space-6)',
        '8': 'var(--space-8)',
        '12': 'var(--space-12)',
        '16': 'var(--space-16)',
        '24': 'var(--space-24)',
        '32': 'var(--space-32)',
      },
      zIndex: {
        'void': 'var(--z0-void)',
        'data': 'var(--z1-data)',
        'content': 'var(--z2-content)',
        'agents': 'var(--z3-agents)',
        'interaction': 'var(--z4-interaction)',
        'modal': 'var(--z5-modal)',
        'navigation': 'var(--z6-navigation)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        'glow': 'var(--shadow-glow)',
        'glass': '0 4px 20px rgba(0,0,0,0.3)',
        'neon': '0 0 24px rgba(22,255,187,0.45)',
      },
      backdropBlur: {
        'glass': 'var(--glass-blur)',
      },
      backgroundImage: {
        'grid': 'linear-gradient(rgba(22, 255, 187, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(22, 255, 187, 0.03) 1px, transparent 1px)',
        'aurora-primary': 'var(--aurora-primary)',
        'aurora-secondary': 'var(--aurora-secondary)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'aurora-flow': 'aurora-flow 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        // REMOVED starfield animations: causing performance issues with gradient rendering
        // REMOVED unused animations (0 usages): shimmer, float, rotate
      },
      keyframes: {
        'aurora-flow': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'pulse-glow': {
          '0%, 100%': { 'box-shadow': '0 0 20px rgba(22, 255, 187, 0.3)' },
          '50%': { 'box-shadow': '0 0 40px rgba(22, 255, 187, 0.8)' },
        },
        // REMOVED starfield keyframes: causing paint thrashing and performance issues
        // REMOVED unused keyframes: shimmer, float
      },
      transitionDuration: {
        'fast': 'var(--duration-fast)',
        'normal': 'var(--duration-normal)',
        'slow': 'var(--duration-slow)',
      },
      transitionTimingFunction: {
        'default': 'var(--ease-default)',
        'spring': 'var(--ease-spring)',
      },
    },
  },
  plugins: [],
}
