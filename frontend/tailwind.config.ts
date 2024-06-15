import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        5.5: '1.375rem',
        8.5: '3.375rem',
        15: '3.75rem',
        '15px': '0.938rem',
        19: '4.75rem',
        '51px': '51px'
      },
      backgroundColor: {
        body: 'var(--background-body)'
      }
    }
  },
  plugins: []
}
export default config
