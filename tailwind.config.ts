import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0faf7',
          100: '#d4f0e6',
          200: '#a9e1cd',
          300: '#7dd2b4',
          400: '#4ab893',
          500: '#1a7d5f',
          600: '#0E4D3D',
          700: '#0c4034',
          800: '#09332a',
          900: '#062620',
        },
        accent: {
          50: '#fffef5',
          100: '#fffadb',
          200: '#fff3ad',
          300: '#ffe975',
          400: '#FFC700',
          500: '#e6b300',
          600: '#cc9f00',
        },
        danger: '#dc2626',
        success: '#16a34a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            img: {
              borderRadius: '0.5rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
