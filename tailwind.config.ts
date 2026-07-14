import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    // Container mirrors DESIGN.md §4: max-width 1200px, side padding 24/32/48.
    container: {
      center: true,
      padding: {
        DEFAULT: '24px',
        md: '32px',
        lg: '48px',
      },
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        // DESIGN.md §2 color tokens
        'brand-green': '#16A34A',
        'brand-green-dark': '#15803D', // button hover
        'brand-green-light': '#DCFCE7',
        ink: '#0A0F0C',
        charcoal: '#1C2420',
        paper: '#FFFFFF',
        mist: '#F4F7F5',
        'slate-text': '#55605A',
        line: '#E5EAE7',
        error: '#DC2626',
        whatsapp: '#25D366',
      },
      fontFamily: {
        // Bound to next/font CSS variables set in app/layout.tsx
        display: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // DESIGN.md §3 type scale (desktop values; responsive handled per-component)
        'h1-hero': ['64px', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'h1-hero-m': ['38px', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'h2-section': ['40px', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'h2-section-m': ['30px', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'h3-card': ['22px', { lineHeight: '1.25' }],
        'h3-card-m': ['20px', { lineHeight: '1.25' }],
        body: ['17px', { lineHeight: '1.65' }],
        'body-m': ['16px', { lineHeight: '1.65' }],
        caption: ['14px', { lineHeight: '1.5' }],
        eyebrow: ['13px', { lineHeight: '1.2', letterSpacing: '0.08em' }],
      },
      maxWidth: {
        prose: '65ch',
        content: '1200px',
      },
      borderRadius: {
        // DESIGN.md §4 radii
        card: '16px',
        btn: '12px',
        pill: '999px',
        img: '20px',
      },
      boxShadow: {
        subtle: '0 1px 3px rgb(0 0 0 / 0.06)',
        hover: '0 8px 24px rgb(10 15 12 / 0.08)',
      },
      spacing: {
        // Section vertical padding (DESIGN.md §4)
        'section-y': '112px',
        'section-y-m': '64px',
      },
      transitionTimingFunction: {
        'ease-out-soft': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
