import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        'primary-dark': '#181818',      // Top nav background
        'primary-white': '#ffffff',     // Cards, buttons

        // Status colors (from Entry Chips)
        'status-success': '#00b017',    // Green - Responded/Done
        'status-success-bg': '#eafff4', // Light green background
        'status-warning': '#fcd915',    // Yellow - Scheduled
        'status-warning-bg': '#fffcef', // Light yellow background
        'status-info': '#004cce',       // Blue - In Progress
        'status-info-bg': '#eaf6ff',    // Light blue background
        'status-neutral': '#585858',    // Gray - No Nudge
        'status-neutral-bg': '#f5f5f5', // Light gray background
        'status-error': '#ef4444',      // Red - Closed/Error
        'status-error-bg': '#fee2e2',   // Light red background

        // Text colors
        'text-primary': '#000000',      // Primary text (headings, labels)
        'text-secondary': '#585858',    // Secondary text (metadata, captions)
        'text-tertiary': '#7a7a7a',     // Tertiary text (disabled, placeholders)

        // Border colors
        'border-light': '#e9e9e9',      // Light borders (cards, inputs)
        'border-dark': '#7a7a7a',       // Dark borders (avatars, emphasis)

        // Background colors
        'bg-card': '#ffffff',           // Card backgrounds
        'bg-app': '#f8f8f8',            // App background
        'bg-overlay': 'rgba(94, 94, 94, 0.2)', // Overlay/backdrop
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
        xs: '12px',    // Chips, metadata, small labels
        sm: '14px',    // Tab labels, secondary buttons
        base: '16px',  // Body text, search placeholder, inputs
        lg: '18px',    // Card titles, prominent text
        xl: '20px',    // Section headers
        '2xl': '24px', // Page titles, main headers
      },
      fontWeight: {
        normal: '400',   // Arial Regular, body text
        medium: '500',   // Hiragino W3, slightly emphasized
        semibold: '600', // Hiragino W6, section headers
        bold: '700',     // Arial Bold, main headings
      },
      borderRadius: {
        sm: '2px',      // Entry chips
        DEFAULT: '8px', // Cards, general rounding
        lg: '20px',     // Tab pills, larger rounded elements
        xl: '36px',     // Top nav bottom corners
        '2xl': '40px',  // Circular buttons, search bar
        full: '9999px', // Avatars, perfect circles
      },
      boxShadow: {
        card: '0px 4px 16px 0px rgba(0, 0, 0, 0.15)',  // Cards, elevated elements
        sm: '0px 2px 8px 0px rgba(0, 0, 0, 0.1)',      // Subtle elevation
      },
      backdropBlur: {
        DEFAULT: '6px', // Glassmorphism effect (cards, nav)
      },
      transitionDuration: {
        DEFAULT: '150ms', // Standard transitions (hover, focus)
        slow: '300ms',    // Modal/drawer animations
      },
    },
  },
  plugins: [],
}

export default config
