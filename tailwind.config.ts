import type { Config } from 'tailwindcss';

/**
 * Promise Plaza design tokens.
 * Palette anchor: Dairy Milk purple, warmed by lamplight amber, on night ink.
 * Rose is an accent only (<5 elements site-wide). Slate is quarantined to the rain scene.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './data/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { 900: '#07080F', 800: '#0D1020', 700: '#161A33' },
        cocoa: { 600: '#3B1E63', 500: '#5B2C8F' },
        amber: { 400: '#E9A63C', 300: '#F6C97A' },
        cream: { 100: '#F5EDE0', 200: '#E3D7C4' },
        rose: { 500: '#B94F63' },
        pista: { 400: '#9CBFA3' },
        slate: { 500: '#5C6480' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        deva: ['var(--font-deva)', 'Georgia', 'serif'],
        hand: ['var(--font-hand)', 'cursive'],
      },
      fontSize: {
        // 1.25 ratio, fluid
        '2xs': ['clamp(0.66rem, 0.64rem + 0.1vw, 0.72rem)', { lineHeight: '1.4' }],
        xs: ['clamp(0.75rem, 0.72rem + 0.15vw, 0.82rem)', { lineHeight: '1.5' }],
        sm: ['clamp(0.875rem, 0.84rem + 0.2vw, 0.95rem)', { lineHeight: '1.6' }],
        base: ['clamp(1rem, 0.96rem + 0.25vw, 1.12rem)', { lineHeight: '1.7' }],
        lg: ['clamp(1.2rem, 1.1rem + 0.5vw, 1.45rem)', { lineHeight: '1.55' }],
        xl: ['clamp(1.5rem, 1.3rem + 1vw, 2.1rem)', { lineHeight: '1.35' }],
        '2xl': ['clamp(1.9rem, 1.5rem + 2vw, 3.1rem)', { lineHeight: '1.18' }],
        '3xl': ['clamp(2.4rem, 1.7rem + 3.4vw, 4.6rem)', { lineHeight: '1.06' }],
        '4xl': ['clamp(3rem, 1.8rem + 5.6vw, 7rem)', { lineHeight: '0.98' }],
        '5xl': ['clamp(3.4rem, 1.6rem + 8.4vw, 10rem)', { lineHeight: '0.94' }],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.028em',
        caps: '0.08em',
        capsWide: '0.22em',
      },
      borderRadius: {
        // 2px on functional edges, or fully round. Nothing in between.
        edge: '2px',
      },
      maxWidth: { measure: '62ch', letter: '58ch' },
      transitionTimingFunction: {
        enter: 'cubic-bezier(0.16, 1, 0.3, 1)',
        exit: 'cubic-bezier(0.7, 0, 0.84, 0)',
      },
      keyframes: {
        breathe: { '0%,100%': { opacity: '0.72' }, '50%': { opacity: '1' } },
        flicker: {
          '0%,100%': { opacity: '1' },
          '42%': { opacity: '0.88' },
          '46%': { opacity: '1' },
          '73%': { opacity: '0.93' },
        },
        drift: { '0%': { transform: 'translate3d(0,0,0)' }, '100%': { transform: 'translate3d(-50%,0,0)' } },
        fall: { '0%': { transform: 'translate3d(0,-20vh,0)' }, '100%': { transform: 'translate3d(-6vw,110vh,0)' } },
        sheen: { '0%': { transform: 'translateX(-120%)' }, '100%': { transform: 'translateX(220%)' } },
      },
      animation: {
        breathe: 'breathe 7s ease-in-out infinite',
        flicker: 'flicker 5.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
