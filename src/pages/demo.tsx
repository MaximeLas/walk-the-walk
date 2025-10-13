/**
 * Component Demo Page
 *
 * Showcases all design system components in isolation for:
 * - Testing components without authentication
 * - Sharing previews with Michelle for design review
 * - Documenting component usage and variants
 *
 * Organized by Phase 2 implementation steps for clear progress tracking.
 */

import { Avatar } from '@/components/ui/Avatar'
import { EntryChip } from '@/components/ui/EntryChip'

export default function ComponentDemo() {
  return (
    <div className="min-h-screen bg-bg-app">
      {/* Header */}
      <div className="bg-primary-dark text-white px-6 py-8 rounded-b-xl shadow-card">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Component Demo</h1>
          <p className="text-base text-gray-300">
            Mobile-first design system components from Michelle's Figma designs
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Click section headings to expand/collapse • Organized by implementation step
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">

        {/* Step 1: Foundation Setup */}
        <details open className="group">
          <summary className="cursor-pointer list-none">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl group-open:rotate-90 transition-transform">▶</span>
              <h2 className="text-xl font-semibold text-text-primary">
                Step 1: Foundation Setup ✅
              </h2>
            </div>
          </summary>

          <div className="ml-9 space-y-8">
            {/* Review Notes for Michelle */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 rounded-r p-6 mb-8">
              <div className="flex items-start gap-3">
                <span className="text-2xl">👩‍🎨</span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">
                    Review Notes for Michelle
                  </h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <p>
                      <strong className="text-purple-900">What to review:</strong> This step sets up all the design tokens
                      from your Figma designs — the colors, typography, spacing, and effects that all components will use.
                    </p>
                    <div>
                      <strong className="text-purple-900">Key items to verify:</strong>
                      <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                        <li><strong>Status Colors:</strong> Do the 5 color swatches match your Entry Chip designs in Figma? (No Nudge, Scheduled, Sent, Responded, Closed)</li>
                        <li><strong>Text Hierarchy:</strong> Are the three text color shades appropriate? (Primary, Secondary, Tertiary)</li>
                        <li><strong>Typography Scale:</strong> Do the font sizes feel right? (24px → 12px)</li>
                        <li><strong>Border Radius:</strong> Do the different roundness levels match your designs? (2px subtle → full circles)</li>
                        <li><strong>Glassmorphism:</strong> Does the frosted glass effect look right?</li>
                      </ul>
                    </div>
                    <p>
                      <strong className="text-purple-900">How to check:</strong> Open your Figma Components page side-by-side
                      with this demo. Compare the color swatches, font sizes, and visual effects. Everything here should match
                      your design system exactly.
                    </p>
                    <p className="text-xs text-gray-600 italic mt-4">
                      ✨ Tip: These tokens are configured once and reused everywhere. If something looks off,
                      it's easier to fix now before components use them!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-text-secondary mb-6">
              Design tokens extracted from Figma and configured in <code className="bg-gray-200 px-1 rounded">src/styles/globals.css</code>.
              These are the building blocks used by all components.
            </p>

            {/* Color Tokens */}
            <div className="bg-bg-card rounded shadow-card p-6">
              <h3 className="text-lg font-semibold mb-4 text-text-primary">
                Color Tokens
              </h3>

              <div className="space-y-6">
                {/* Status Colors - Just swatches */}
                <div>
                  <h4 className="text-sm font-medium mb-3 text-text-secondary">
                    Status Colors (from Figma Entry Chips)
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 bg-transparent border-2 border-black rounded-sm"></div>
                      <span className="text-xs text-text-secondary">No Nudge</span>
                      <span className="text-[10px] text-text-tertiary">Transparent</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 bg-[#FFFCEF] border-2 border-[#FCD915] rounded-sm"></div>
                      <span className="text-xs text-text-secondary">Scheduled</span>
                      <span className="text-[10px] text-text-tertiary">#FFFCEF</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 bg-[#EAF6FF] border-2 border-[#004CCE] rounded-sm"></div>
                      <span className="text-xs text-text-secondary">Sent</span>
                      <span className="text-[10px] text-text-tertiary">#EAF6FF</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 bg-[#EAFFF4] border-2 border-[#00B017] rounded-sm"></div>
                      <span className="text-xs text-text-secondary">Responded</span>
                      <span className="text-[10px] text-text-tertiary">#EAFFF4</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 bg-[#E8DAFF] border-2 border-[#843DFF] rounded-sm"></div>
                      <span className="text-xs text-text-secondary">Closed</span>
                      <span className="text-[10px] text-text-tertiary">#E8DAFF</span>
                    </div>
                  </div>
                </div>

                {/* Text Colors */}
                <div>
                  <h4 className="text-sm font-medium mb-3 text-text-secondary">
                    Text Hierarchy
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-8 bg-text-primary rounded"></div>
                      <p className="text-base text-text-primary">
                        Primary text (headings, labels)
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-8 bg-text-secondary rounded"></div>
                      <p className="text-base text-text-secondary">
                        Secondary text (metadata, captions)
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-8 bg-text-tertiary rounded"></div>
                      <p className="text-base text-text-tertiary">
                        Tertiary text (disabled, placeholders)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="bg-bg-card rounded shadow-card p-6">
              <h3 className="text-lg font-semibold mb-4 text-text-primary">
                Typography Scale
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-text-secondary mb-1">text-2xl font-bold (24px)</p>
                  <h1 className="text-2xl font-bold">Page Title</h1>
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">text-xl font-semibold (20px)</p>
                  <h2 className="text-xl font-semibold">Section Header</h2>
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">text-lg font-semibold (18px)</p>
                  <h3 className="text-lg font-semibold">Card Title</h3>
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">text-base (16px)</p>
                  <p className="text-base">Body text</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">text-sm (14px)</p>
                  <p className="text-sm">Tab labels</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">text-xs (12px)</p>
                  <p className="text-xs">Metadata, chips</p>
                </div>
              </div>
            </div>

            {/* Border Radius & Effects */}
            <div className="bg-bg-card rounded shadow-card p-6">
              <h3 className="text-lg font-semibold mb-4 text-text-primary">
                Border Radius & Effects
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-text-secondary mb-2">rounded-sm (2px)</p>
                  <div className="h-16 bg-status-neutral-bg border border-status-neutral rounded-sm flex items-center justify-center">
                    <span className="text-xs">Chip</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-2">rounded (8px)</p>
                  <div className="h-16 bg-status-info-bg border border-status-info rounded flex items-center justify-center">
                    <span className="text-xs">Card</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-2">rounded-lg (20px)</p>
                  <div className="h-16 bg-status-warning-bg border border-status-warning rounded-lg flex items-center justify-center">
                    <span className="text-xs">Tab</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-2">rounded-2xl (40px)</p>
                  <div className="h-16 bg-status-success-bg border border-status-success rounded-2xl flex items-center justify-center">
                    <span className="text-xs">Button</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-2">rounded-full</p>
                  <div className="w-16 h-16 bg-status-error-bg border border-status-error rounded-full flex items-center justify-center">
                    <span className="text-xs">Avatar</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-2">shadow-card</p>
                  <div className="h-16 bg-bg-card rounded shadow-card flex items-center justify-center">
                    <span className="text-xs">Elevated</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Glassmorphism Effect */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded shadow-card p-6">
              <h3 className="text-lg font-semibold mb-4 text-white">
                Glassmorphism (Backdrop Blur)
              </h3>

              <div className="backdrop-blur bg-bg-overlay rounded shadow-card p-4">
                <p className="text-white text-sm">
                  This card uses <code className="bg-black/20 px-1 rounded">backdrop-blur</code> and{' '}
                  <code className="bg-black/20 px-1 rounded">bg-bg-overlay</code> for a frosted glass effect.
                  This matches the glassmorphism seen in Michelle's Add button and card designs.
                </p>
              </div>
            </div>
          </div>
        </details>

        {/* Step 2: Atomic Components */}
        <details open className="group">
          <summary className="cursor-pointer list-none">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl group-open:rotate-90 transition-transform">▶</span>
              <h2 className="text-xl font-semibold text-text-primary">
                Step 2: Atomic Components ✅
              </h2>
            </div>
          </summary>

          <div className="ml-9 space-y-8">
            {/* Review Notes for Michelle */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 rounded-r p-6 mb-8">
              <div className="flex items-start gap-3">
                <span className="text-2xl">👩‍🎨</span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">
                    Review Notes for Michelle
                  </h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <p>
                      <strong className="text-purple-900">What to review:</strong> This step implements the first building block
                      components from your Figma designs — Avatar and EntryChip. These are the atomic components that will be
                      combined to create the list cards in Step 3.
                    </p>
                    <div>
                      <strong className="text-purple-900">Avatar Component — 9 variants to check:</strong>
                      <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                        <li><strong>Image type:</strong> Does the dark background (#0B0B0B) look right with profile photos?</li>
                        <li><strong>Contact Initials:</strong> Is the dark gray (#4B4B4B) with white text readable? Correct contrast?</li>
                        <li><strong>Space Initials:</strong> Is the light gray (#B9B9B9) with black text distinct enough from Contact?</li>
                        <li><strong>Sizes:</strong> Do small (24px), medium (32px), and large (44px) feel appropriate for their uses?</li>
                        <li><strong>Typography:</strong> Is IBM Plex Mono Bold the right font for initials?</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-purple-900">EntryChip Component — 5 status variants to check:</strong>
                      <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                        <li><strong>Colors:</strong> Do all 5 status colors match your Figma exactly? (Yellow, Blue, Green, Purple, Black)</li>
                        <li><strong>Contrast:</strong> Is black text readable on all colored backgrounds?</li>
                        <li><strong>Distinction:</strong> Are the 5 statuses visually distinct enough from each other?</li>
                        <li><strong>Size/Padding:</strong> Does the 12px padding feel right? Not too cramped or too loose?</li>
                        <li><strong>Border Radius:</strong> Is the 2px corner subtle enough? (Intended to be barely rounded)</li>
                      </ul>
                    </div>
                    <p>
                      <strong className="text-purple-900">How to check:</strong> Open your Figma Components page (Node ID: 177:32228)
                      side-by-side with this demo. Find the "Avatars" and "Entry Chips" sections in Figma and compare each variant.
                      Test on your phone too — these components need to look great on mobile.
                    </p>
                    <p>
                      <strong className="text-purple-900">Why these first?</strong> These are the smallest building blocks. Once you
                      approve these, we'll combine them into ListCard components (Step 3) — Avatar + EntryChips + text = a contact
                      or space card. It's easier to adjust a single Avatar now than fix it in 10 different cards later!
                    </p>
                    <p className="text-xs text-gray-600 italic mt-4">
                      ✨ Tip: Pay special attention to the color contrast on Entry Chips — they'll be used throughout the app
                      to show status at a glance. If any status color is hard to distinguish, let us know!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-text-secondary mb-6">
              Smallest reusable UI components. These are fully functional components with prop-based variants,
              ready to be composed into larger components in Step 3.
            </p>

            {/* Avatar Component */}
            <div className="bg-bg-card rounded shadow-card p-6">
              <h3 className="text-lg font-semibold mb-2 text-text-primary">
                Avatar Component
              </h3>
              <p className="text-sm text-text-secondary mb-6">
                <code className="bg-gray-200 px-1 rounded">src/components/ui/Avatar.tsx</code> •
                Three types × Three sizes = 9 variants
              </p>

              {/* Image Avatars */}
              <div className="mb-8">
                <h4 className="text-sm font-medium mb-3 text-text-primary">
                  Type: Image (dark background #0B0B0B)
                </h4>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar
                      type="image"
                      size="sm"
                      src="https://i.pravatar.cc/150?img=1"
                      alt="User 1"
                    />
                    <span className="text-xs text-text-secondary">sm (24px)</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Avatar
                      type="image"
                      size="md"
                      src="https://i.pravatar.cc/150?img=2"
                      alt="User 2"
                    />
                    <span className="text-xs text-text-secondary">md (32px)</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Avatar
                      type="image"
                      size="lg"
                      src="https://i.pravatar.cc/150?img=3"
                      alt="User 3"
                    />
                    <span className="text-xs text-text-secondary">lg (44px)</span>
                  </div>
                </div>
              </div>

              {/* Contact Initials Avatars */}
              <div className="mb-8">
                <h4 className="text-sm font-medium mb-3 text-text-primary">
                  Type: Contact Initials (dark gray #4B4B4B, white text)
                </h4>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar type="contact-initials" size="sm" initials="MH" />
                    <span className="text-xs text-text-secondary">sm (24px)</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Avatar type="contact-initials" size="md" initials="KL" />
                    <span className="text-xs text-text-secondary">md (32px)</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Avatar type="contact-initials" size="lg" initials="JS" />
                    <span className="text-xs text-text-secondary">lg (44px)</span>
                  </div>
                </div>
              </div>

              {/* Space Initials Avatars */}
              <div>
                <h4 className="text-sm font-medium mb-3 text-text-primary">
                  Type: Space Initials (light gray #B9B9B9, black text)
                </h4>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar type="space-initials" size="sm" initials="WK" />
                    <span className="text-xs text-text-secondary">sm (24px)</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Avatar type="space-initials" size="md" initials="PT" />
                    <span className="text-xs text-text-secondary">md (32px)</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Avatar type="space-initials" size="lg" initials="SF" />
                    <span className="text-xs text-text-secondary">lg (44px)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* EntryChip Component */}
            <div className="bg-bg-card rounded shadow-card p-6">
              <h3 className="text-lg font-semibold mb-2 text-text-primary">
                EntryChip Component
              </h3>
              <p className="text-sm text-text-secondary mb-6">
                <code className="bg-gray-200 px-1 rounded">src/components/ui/EntryChip.tsx</code> •
                Five status variants with color-coded backgrounds
              </p>

              <div className="flex flex-wrap items-start gap-4 mb-6">
                <div className="flex flex-col items-center gap-2">
                  <EntryChip status="no-nudge">No Nudge</EntryChip>
                  <span className="text-xs text-text-secondary">no-nudge</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <EntryChip status="scheduled">Scheduled</EntryChip>
                  <span className="text-xs text-text-secondary">scheduled</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <EntryChip status="sent">Sent</EntryChip>
                  <span className="text-xs text-text-secondary">sent</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <EntryChip status="responded">Responded</EntryChip>
                  <span className="text-xs text-text-secondary">responded</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <EntryChip status="closed">Closed</EntryChip>
                  <span className="text-xs text-text-secondary">closed</span>
                </div>
              </div>

              {/* Usage example */}
              <div className="p-4 bg-bg-app rounded border border-border-light">
                <p className="text-xs text-text-secondary mb-2">
                  <strong className="text-text-primary">Usage:</strong>
                </p>
                <code className="text-xs text-text-primary">
                  &lt;EntryChip status="scheduled"&gt;Nudge Scheduled&lt;/EntryChip&gt;
                </code>
              </div>
            </div>
          </div>
        </details>

        {/* Step 3: Molecule Components */}
        <details className="group">
          <summary className="cursor-pointer list-none">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl group-open:rotate-90 transition-transform">▶</span>
              <h2 className="text-xl font-semibold text-text-primary">
                Step 3: Molecule Components ⏳
              </h2>
            </div>
          </summary>

          <div className="ml-9">
            <div className="bg-bg-card rounded shadow-card p-6">
              <p className="text-text-secondary text-center py-8">
                Components will be added here in Step 3.
                <br />
                <span className="text-xs text-text-tertiary mt-2 block">
                  ListCard (Contact + Space types) - Combines Avatar, EntryChip, and text
                </span>
              </p>
            </div>
          </div>
        </details>

        {/* Step 4: Navigation Components */}
        <details className="group">
          <summary className="cursor-pointer list-none">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl group-open:rotate-90 transition-transform">▶</span>
              <h2 className="text-xl font-semibold text-text-primary">
                Step 4: Navigation & Action Components ⏳
              </h2>
            </div>
          </summary>

          <div className="ml-9">
            <div className="bg-bg-card rounded shadow-card p-6">
              <p className="text-text-secondary text-center py-8">
                Components will be added here in Step 4.
                <br />
                <span className="text-xs text-text-tertiary mt-2 block">
                  TopNav, MiddleNav, ScreenModeSwitcher, AddButton
                </span>
              </p>
            </div>
          </div>
        </details>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-border-light text-center">
          <p className="text-sm text-text-secondary">
            Design tokens configured from Michelle's Figma designs
            <br />
            <span className="text-xs">
              Phase 2: Mobile-First Design System Implementation
            </span>
          </p>
        </footer>
      </div>
    </div>
  )
}
