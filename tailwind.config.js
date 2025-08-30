/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#E6E6E6',
        muted: '#9A9A9A',
        border: '#2A2A2A',
        accent: '#00F5D4',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'Liberation Mono', 'monospace'],
      },
      fontVariantNumeric: {
        'tabular': 'tabular-nums',
      },
      borderRadius: {
        DEFAULT: '8px',
      },
      spacing: {
        '1px': '1px',
      },
      animation: {
        'fade-in': 'fadeIn 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}