/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{jsx,js}'],
  theme: {
    extend: {
      fontFamily: {
        logo: ['"Bebas Neue"', 'sans-serif'],
        heading: ['Flexing', 'serif'],
        body: ['"Bricolage Grotesque"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      colors: {
        blue: {
          primary: '#1E40AF',
          dark: '#1E3A8A',
          light: '#EFF6FF',
          border: '#BFDBFE',
        }
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
