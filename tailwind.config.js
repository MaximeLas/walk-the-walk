/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        'primary-dark': '#181818',
        'primary-white': '#ffffff',

        // Status colors (from Entry Chips)
        'status-success': '#00b017',
        'status-success-bg': '#eafff4',
        'status-warning': '#fcd915',
        'status-warning-bg': '#fffcef',
        'status-info': '#004cce',
        'status-info-bg': '#eaf6ff',
        'status-neutral': '#585858',
        'status-neutral-bg': '#f5f5f5',
        'status-error': '#ef4444',
        'status-error-bg': '#fee2e2',

        // Text colors
        'text-primary': '#000000',
        'text-secondary': '#585858',
        'text-tertiary': '#7a7a7a',

        // Border colors
        'border-light': '#e9e9e9',
        'border-dark': '#7a7a7a',

        // Background colors
        'bg-card': '#ffffff',
        'bg-app': '#f8f8f8',
        'bg-overlay': 'rgba(94, 94, 94, 0.2)',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Hiragino Kaku Gothic Pro',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '8px',
        lg: '20px',
        xl: '36px',
        '2xl': '40px',
        full: '9999px',
      },
      boxShadow: {
        card: '0px 4px 16px 0px rgba(0, 0, 0, 0.15)',
        sm: '0px 2px 8px 0px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        DEFAULT: '6px',
      },
      transitionDuration: {
        DEFAULT: '150ms',
        slow: '300ms',
      },
    },
  },
  plugins: [],
}
