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
        // === PRIMARY COLORS ===
        // From Navigation and core UI elements
        'primary-dark': '#181818',    // Top Nav background (177:32452)
        'primary-darker': '#131313',  // Add button pills (177:33071)
        'primary-black': '#000000',   // Pure black for text and borders
        'primary-white': '#ffffff',   // Card backgrounds

        // === ENTRY CHIP STATUS COLORS ===
        // Extracted from Figma Components page - Entry Chips section (177:32809)

        // Status=No Nudge (177:32808) - Transparent bg, black border
        'status-no-nudge': '#000000',         // Border color
        'status-no-nudge-bg': 'transparent',  // No background

        // Status=Nudge Scheduled (177:32812) - Yellow
        'status-scheduled': '#fcd915',    // Border: golden yellow
        'status-scheduled-bg': '#fffcef', // Background: light yellow/cream

        // Status=Nudge Sent (177:32813) - Blue
        'status-sent': '#004cce',     // Border: deep blue
        'status-sent-bg': '#eaf6ff',  // Background: light blue

        // Status=Nudge Responded (177:32814) - Green
        'status-responded': '#00b017',  // Border: green
        'status-responded-bg': '#eafff4', // Background: light green

        // Status=Entry Closed (177:32815) - Purple
        'status-closed': '#843dff',   // Border: purple
        'status-closed-bg': '#e8daff', // Background: light purple

        // === LEGACY ALIASES (for backward compatibility) ===
        'status-success': '#00b017',      // Maps to responded
        'status-success-bg': '#eafff4',
        'status-warning': '#fcd915',      // Maps to scheduled
        'status-warning-bg': '#fffcef',
        'status-info': '#004cce',         // Maps to sent
        'status-info-bg': '#eaf6ff',
        'status-neutral': '#000000',      // Maps to no-nudge
        'status-neutral-bg': 'transparent',
        'status-error': '#843dff',        // Maps to closed
        'status-error-bg': '#e8daff',

        // === TEXT COLORS ===
        'text-primary': '#000000',    // Main text (black)
        'text-secondary': '#585858',  // Secondary text (medium gray) - from List Card timestamp
        'text-tertiary': '#7a7a7a',   // Tertiary text (lighter gray) - from borders
        'text-white': '#ffffff',      // White text for dark backgrounds

        // === AVATAR COLORS ===
        // From Avatar components (177:32863, 177:32875, 177:32876)
        'avatar-image-bg': '#0b0b0b',     // Background for image avatars
        'avatar-contact-bg': '#4b4b4b',   // Contact initials background (medium gray)
        'avatar-space-bg': '#b9b9b9',     // Space initials background (light gray)

        // === BACKGROUND COLORS ===
        'bg-card': '#ffffff',       // Card backgrounds
        'bg-app': '#f8f8f8',        // App background (light gray)
        'bg-overlay': 'rgba(94, 94, 94, 0.2)', // Overlay for glassmorphism
        'bg-pill-active': '#efefef', // Active pill background (Middle Nav)

        // === BORDER COLORS ===
        'border-light': '#e9e9e9',  // Light borders (cards, general UI)
        'border-medium': '#7a7a7a', // Medium borders (search bar, emphasis)
        'border-dark': '#000000',   // Dark borders (active states, strong emphasis)
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Hiragino Kaku Gothic Pro',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'IBM Plex Mono',
          'SF Mono',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      fontSize: {
        '2xs': '10px',  // Avatar initials, mode labels
        xs: '12px',     // Chips, timestamps, filters, secondary text
        sm: '14px',     // Tab labels, secondary buttons, captions
        base: '16px',   // Body text, search placeholder, form inputs
        lg: '18px',     // Card titles, list item names, prominent text
        xl: '20px',     // Section headers, modal titles
        '2xl': '24px',  // Page titles, main headings
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
