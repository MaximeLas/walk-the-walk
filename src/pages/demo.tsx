/**
 * Component Demo Page
 *
 * Showcases all design system components in isolation for:
 * - Testing components without authentication
 * - Sharing previews with Michelle for design review
 * - Documenting component usage and variants
 *
 * Components will be added as we build them in Step 2.
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
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Design Tokens Test Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6 text-text-primary">
            Design Tokens Test
          </h2>

          {/* Color Tokens */}
          <div className="bg-bg-card rounded shadow-card p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-text-primary">
              Color Tokens
            </h3>

            <div className="space-y-4">
              {/* Status Colors - EXACT from Michelle's Figma */}
              <div>
                <h4 className="text-sm font-medium mb-2 text-text-secondary">
                  Entry Chip Status Colors (from Figma Components page)
                </h4>
                <div className="flex flex-wrap gap-3">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-20 h-9 bg-status-neutral-bg border border-status-neutral rounded-sm flex items-center justify-center">
                      <span className="text-xs">No Nudge</span>
                    </div>
                    <span className="text-xs text-text-secondary">Black</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-28 h-9 bg-status-warning-bg border border-status-warning rounded-sm flex items-center justify-center">
                      <span className="text-xs">Nudge Scheduled</span>
                    </div>
                    <span className="text-xs text-text-secondary">Yellow</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-24 h-9 bg-status-info-bg border border-status-info rounded-sm flex items-center justify-center">
                      <span className="text-xs">Nudge Sent</span>
                    </div>
                    <span className="text-xs text-text-secondary">Blue</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-32 h-9 bg-status-success-bg border border-status-success rounded-sm flex items-center justify-center">
                      <span className="text-xs">Nudge Responded</span>
                    </div>
                    <span className="text-xs text-text-secondary">Green</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-24 h-9 bg-status-error-bg border border-status-error rounded-sm flex items-center justify-center">
                      <span className="text-xs">Entry Closed</span>
                    </div>
                    <span className="text-xs text-text-secondary">Purple</span>
                  </div>
                </div>
              </div>

              {/* Text Colors */}
              <div>
                <h4 className="text-sm font-medium mb-2 text-text-secondary">
                  Text Hierarchy
                </h4>
                <div className="space-y-1">
                  <p className="text-base text-text-primary">
                    Primary text (headings, labels)
                  </p>
                  <p className="text-base text-text-secondary">
                    Secondary text (metadata, captions)
                  </p>
                  <p className="text-base text-text-tertiary">
                    Tertiary text (disabled, placeholders)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="bg-bg-card rounded shadow-card p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-text-primary">
              Typography
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-text-secondary mb-1">
                  text-2xl font-bold
                </p>
                <h1 className="text-2xl font-bold">Page Title (24px)</h1>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">
                  text-xl font-semibold
                </p>
                <h2 className="text-xl font-semibold">Section Header (20px)</h2>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">
                  text-lg font-semibold
                </p>
                <h3 className="text-lg font-semibold">Card Title (18px)</h3>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">text-base</p>
                <p className="text-base">Body text (16px)</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">text-sm</p>
                <p className="text-sm">Tab labels (14px)</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">text-xs</p>
                <p className="text-xs">Metadata, chips (12px)</p>
              </div>
            </div>
          </div>

          {/* Border Radius & Effects */}
          <div className="bg-bg-card rounded shadow-card p-6 mb-8">
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
          <div className="bg-linear-to-br from-indigo-500 to-purple-600 rounded shadow-card p-6 mb-8">
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
        </section>

        {/* Component Sections */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6 text-text-primary">
            Atomic Components
          </h2>

          {/* Avatar Component */}
          <div className="bg-bg-card rounded shadow-card p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-text-primary">
              Avatar Component
            </h3>
            <p className="text-sm text-text-secondary mb-6">
              Three types (image, contact-initials, space-initials) × Three sizes (sm, md, lg) = 9 variants
            </p>

            {/* Image Avatars */}
            <div className="mb-8">
              <h4 className="text-sm font-medium mb-3 text-text-primary">
                Type: Image (with dark background #0B0B0B)
              </h4>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <Avatar
                    type="image"
                    size="sm"
                    src="https://i.pravatar.cc/150?img=1"
                    alt="User 1"
                  />
                  <span className="text-xs text-text-secondary">Small (24px)</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Avatar
                    type="image"
                    size="md"
                    src="https://i.pravatar.cc/150?img=2"
                    alt="User 2"
                  />
                  <span className="text-xs text-text-secondary">Medium (32px)</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Avatar
                    type="image"
                    size="lg"
                    src="https://i.pravatar.cc/150?img=3"
                    alt="User 3"
                  />
                  <span className="text-xs text-text-secondary">Large (44px)</span>
                </div>
              </div>
            </div>

            {/* Contact Initials Avatars */}
            <div className="mb-8">
              <h4 className="text-sm font-medium mb-3 text-text-primary">
                Type: Contact Initials (Dark gray #4B4B4B, white text)
              </h4>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <Avatar
                    type="contact-initials"
                    size="sm"
                    initials="MH"
                  />
                  <span className="text-xs text-text-secondary">Small (24px)</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Avatar
                    type="contact-initials"
                    size="md"
                    initials="KL"
                  />
                  <span className="text-xs text-text-secondary">Medium (32px)</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Avatar
                    type="contact-initials"
                    size="lg"
                    initials="JS"
                  />
                  <span className="text-xs text-text-secondary">Large (44px)</span>
                </div>
              </div>
            </div>

            {/* Space Initials Avatars */}
            <div>
              <h4 className="text-sm font-medium mb-3 text-text-primary">
                Type: Space Initials (Light gray #B9B9B9, black text)
              </h4>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <Avatar
                    type="space-initials"
                    size="sm"
                    initials="WK"
                  />
                  <span className="text-xs text-text-secondary">Small (24px)</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Avatar
                    type="space-initials"
                    size="md"
                    initials="PT"
                  />
                  <span className="text-xs text-text-secondary">Medium (32px)</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Avatar
                    type="space-initials"
                    size="lg"
                    initials="SF"
                  />
                  <span className="text-xs text-text-secondary">Large (44px)</span>
                </div>
              </div>
            </div>
          </div>

          {/* EntryChip Component */}
          <div className="bg-bg-card rounded shadow-card p-6">
            <h3 className="text-lg font-semibold mb-4 text-text-primary">
              EntryChip Component
            </h3>
            <p className="text-sm text-text-secondary mb-6">
              Five status variants with color-coded backgrounds and borders
            </p>

            <div className="flex flex-wrap items-start gap-4">
              <div className="flex flex-col items-center gap-2">
                <EntryChip status="no-nudge">No Nudge</EntryChip>
                <span className="text-xs text-text-secondary">No Nudge</span>
                <span className="text-[10px] text-text-tertiary">Transparent</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <EntryChip status="scheduled">Nudge Scheduled</EntryChip>
                <span className="text-xs text-text-secondary">Scheduled</span>
                <span className="text-[10px] text-text-tertiary">Yellow</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <EntryChip status="sent">Nudge Sent</EntryChip>
                <span className="text-xs text-text-secondary">Sent</span>
                <span className="text-[10px] text-text-tertiary">Blue</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <EntryChip status="responded">Nudge Responded</EntryChip>
                <span className="text-xs text-text-secondary">Responded</span>
                <span className="text-[10px] text-text-tertiary">Green</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <EntryChip status="closed">Entry Closed</EntryChip>
                <span className="text-xs text-text-secondary">Closed</span>
                <span className="text-[10px] text-text-tertiary">Purple</span>
              </div>
            </div>

            {/* Usage notes */}
            <div className="mt-6 p-4 bg-bg-app rounded border border-border-light">
              <p className="text-xs text-text-secondary">
                <strong className="text-text-primary">Design specs:</strong> Arial Regular 12px,
                12px padding, 2px border radius, center aligned text. All variants use black text
                with status-specific background and border colors.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6 text-text-primary">
            Molecule Components
          </h2>

          <div className="bg-bg-card rounded shadow-card p-6">
            <p className="text-text-secondary text-center py-8">
              Components will be added here in Step 3.
              <br />
              <span className="text-xs">
                (SpaceCard, QuickNudgeModal)
              </span>
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6 text-text-primary">
            Navigation Components
          </h2>

          <div className="bg-bg-card rounded shadow-card p-6">
            <p className="text-text-secondary text-center py-8">
              Components will be added here in Step 4.
              <br />
              <span className="text-xs">
                (TopNav, MiddleNav, AddButton)
              </span>
            </p>
          </div>
        </section>

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
