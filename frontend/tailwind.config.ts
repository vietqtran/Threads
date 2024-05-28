import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          green: {
            '50': '#eafff4',
            '100': '#cdfee4',
            '200': '#a0facf',
            '300': '#62f3b5',
            '400': '#1ddf93',
            '500': '#00ca82',
            '600': '#00a46a',
            '700': '#008358',
            '800': '#006847',
            '900': '#00553c',
            '950': '#003023'
          },
          'light-blue': {
            '50': '#ebffff',
            '100': '#cefeff',
            '200': '#a2faff',
            '300': '#63f3fd',
            '400': '#1ce3f4',
            '500': '#00daf0',
            '600': '#039eb7',
            '700': '#0a7d94',
            '800': '#126578',
            '900': '#145365',
            '950': '#063746'
          },
          blue: {
            '50': '#eff8ff',
            '100': '#dceffd',
            '200': '#c0e4fd',
            '300': '#95d3fb',
            '400': '#63baf7',
            '500': '#3f9cf2',
            '600': '#247ce6',
            '700': '#2169d4',
            '800': '#2156ac',
            '900': '#204a88',
            '950': '#182e53'
          }
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config

export default config
