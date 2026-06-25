/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#8b5cf6',
        secondary: '#14b8a6',
        accent: '#f97316',
        dark: 'var(--bg-dark)',
        surface: 'var(--bg-surface)',
        card: 'var(--bg-card)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          from: { boxShadow: '0 0 20px #8b5cf644' },
          to: { boxShadow: '0 0 40px #8b5cf688, 0 0 80px #8b5cf633' },
        },
      },
    },
  },
  plugins: [],
}
