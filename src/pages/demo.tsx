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
import { ListCard } from '@/components/ui/ListCard'
import TopNav from '@/components/ui/TopNav'
import MiddleNav from '@/components/ui/MiddleNav'
import ScreenModeSwitcher from '@/components/ui/ScreenModeSwitcher'
import AddButton from '@/components/ui/AddButton'
import AddOptions from '@/components/ui/AddOptions'
import ModalCallToAction from '@/components/ui/ModalCallToAction'
import { useState } from 'react'

export default function ComponentDemo() {
  // State for interactive demos
  const [viewMode, setViewMode] = useState<'all' | 'contacts' | 'spaces'>('all')
  const [screenMode, setScreenMode] = useState<'list' | 'nudges'>('list')
  const [showAddOptions, setShowAddOptions] = useState(false)

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

                    {/* Collapsible Detailed Verification Guide */}
                    <details className="mt-4 border-t border-purple-200 pt-4">
                      <summary className="cursor-pointer text-sm font-semibold text-purple-900 hover:text-purple-700">
                        🔍 Detailed Verification Guide (click to expand)
                      </summary>
                      <div className="mt-4 space-y-3 text-sm text-gray-700 bg-white/50 p-4 rounded">
                        <div>
                          <strong className="text-purple-900">Status Colors — Exact Values:</strong>
                          <ul className="list-disc list-inside mt-2 space-y-1 ml-4 text-xs">
                            <li><strong>No Nudge:</strong> Transparent background, Border #000000 (black), 1px solid</li>
                            <li><strong>Scheduled:</strong> Background #FFFCEF, Border #FCD915 (golden yellow)</li>
                            <li><strong>Sent:</strong> Background #EAF6FF, Border #004CCE (deep blue)</li>
                            <li><strong>Responded:</strong> Background #EAFFF4, Border #00B017 (green)</li>
                            <li><strong>Closed:</strong> Background #E8DAFF, Border #843DFF (purple)</li>
                          </ul>
                          <p className="text-xs text-gray-600 mt-2">
                            💡 Use Figma's color picker or inspect mode to verify these exact hex values in your Entry Chips section.
                          </p>
                        </div>
                        <div>
                          <strong className="text-purple-900">Typography Scale — Complete Breakdown:</strong>
                          <ul className="list-disc list-inside mt-2 space-y-1 ml-4 text-xs">
                            <li><strong>text-2xl (24px):</strong> Page titles, large headings</li>
                            <li><strong>text-xl (20px):</strong> Section headers</li>
                            <li><strong>text-lg (18px):</strong> Card titles, prominent labels</li>
                            <li><strong>text-base (16px):</strong> Body text, main content, button labels</li>
                            <li><strong>text-sm (14px):</strong> Tab labels, secondary actions</li>
                            <li><strong>text-xs (12px):</strong> Entry chips, metadata, timestamps, helper text</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-purple-900">Border Radius Values:</strong>
                          <ul className="list-disc list-inside mt-2 space-y-1 ml-4 text-xs">
                            <li><strong>2px (rounded-sm):</strong> Entry chips - subtle, barely rounded corners</li>
                            <li><strong>8px (rounded):</strong> List cards - soft corners</li>
                            <li><strong>20px (rounded-lg):</strong> Tab buttons - pill-ish shape</li>
                            <li><strong>40px (rounded-2xl):</strong> Buttons, search bars - fully rounded pill</li>
                            <li><strong>50px/full (rounded-full):</strong> Avatars, icons - perfect circles</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-purple-900">Step-by-Step Figma Comparison:</strong>
                          <ol className="list-decimal list-inside mt-2 space-y-1 ml-4 text-xs">
                            <li>Open Figma Components page (Node ID: 177:32228)</li>
                            <li>Use split screen: Figma on left, demo page on right</li>
                            <li>Check Entry Chips section: Compare each status color swatch</li>
                            <li>Use color picker tool in Figma to verify hex codes match</li>
                            <li>Check typography examples against your design system</li>
                            <li>Compare border radius examples to component specs</li>
                          </ol>
                        </div>
                        <div>
                          <strong className="text-purple-900">Edge Cases to Verify:</strong>
                          <ul className="list-disc list-inside mt-2 space-y-1 ml-4 text-xs">
                            <li>Do the status colors have enough contrast from each other?</li>
                            <li>Is text readable on all colored backgrounds?</li>
                            <li>Does the glassmorphism effect render correctly in Safari?</li>
                            <li>Are the color swatches rendering accurately (not washed out)?</li>
                          </ul>
                        </div>
                      </div>
                    </details>
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

                    {/* Collapsible Detailed Verification Guide */}
                    <details className="mt-4 border-t border-purple-200 pt-4">
                      <summary className="cursor-pointer text-sm font-semibold text-purple-900 hover:text-purple-700">
                        🔍 Detailed Verification Guide (click to expand)
                      </summary>
                      <div className="mt-4 space-y-3 text-sm text-gray-700 bg-white/50 p-4 rounded">
                        <div>
                          <strong className="text-purple-900">Avatar — Exact Color Values:</strong>
                          <ul className="list-disc list-inside mt-2 space-y-1 ml-4 text-xs">
                            <li><strong>Image type:</strong> Background #0B0B0B (very dark gray/black), contains profile photo</li>
                            <li><strong>Contact Initials:</strong> Background #4B4B4B (medium gray), Text #FFFFFF (white), Font: IBM Plex Mono Bold 10px-14px</li>
                            <li><strong>Space Initials:</strong> Background #B9B9B9 (light gray), Text #000000 (black), Font: IBM Plex Mono Bold 10px-14px</li>
                            <li><strong>Sizes:</strong> Small 24×24px, Medium 32×32px, Large 44×44px — all with rounded-full (50px border-radius)</li>
                          </ul>
                          <p className="text-xs text-gray-600 mt-2">
                            💡 Check contrast ratios: Contact initials should have higher contrast than Space initials
                          </p>
                        </div>
                        <div>
                          <strong className="text-purple-900">EntryChip — Exact Color Values:</strong>
                          <ul className="list-disc list-inside mt-2 space-y-1 ml-4 text-xs">
                            <li><strong>No Nudge:</strong> Bg transparent, Border #000000 (black) 1px, Text #000000</li>
                            <li><strong>Scheduled:</strong> Bg #FFFCEF (light yellow), Border #FCD915 (golden yellow) 1px, Text #000000</li>
                            <li><strong>Sent:</strong> Bg #EAF6FF (light blue), Border #004CCE (deep blue) 1px, Text #000000</li>
                            <li><strong>Responded:</strong> Bg #EAFFF4 (light green), Border #00B017 (green) 1px, Text #000000</li>
                            <li><strong>Closed:</strong> Bg #E8DAFF (light purple), Border #843DFF (purple) 1px, Text #000000</li>
                          </ul>
                          <p className="text-xs text-gray-600 mt-2">
                            💡 All use: Arial Regular 12px, 12px padding all sides, 2px border-radius, center-aligned text
                          </p>
                        </div>
                        <div>
                          <strong className="text-purple-900">Step-by-Step Figma Comparison:</strong>
                          <ol className="list-decimal list-inside mt-2 space-y-1 ml-4 text-xs">
                            <li>Open Figma Components page (Node ID: 177:32228)</li>
                            <li>Find "Avatars" section — compare 3 fill types against demo</li>
                            <li>Verify all 3 avatar sizes match your specs (24px in list cards, 44px in top nav)</li>
                            <li>Find "Entry Chips" section — compare all 5 status variants</li>
                            <li>Use color picker to verify each chip's background and border colors</li>
                            <li>Check that 2px border-radius is subtle (barely rounded, not pill-shaped)</li>
                          </ol>
                        </div>
                        <div>
                          <strong className="text-purple-900">Edge Cases to Test:</strong>
                          <ul className="list-disc list-inside mt-2 space-y-1 ml-4 text-xs">
                            <li><strong>Avatar:</strong> Try long initials (&gt;2 characters) - should truncate to 2</li>
                            <li><strong>Avatar:</strong> Missing image src - should show placeholder or error state</li>
                            <li><strong>EntryChip:</strong> Long text - does it wrap or truncate?</li>
                            <li><strong>EntryChip:</strong> Very short text ("OK") - does padding look balanced?</li>
                            <li><strong>Color Contrast:</strong> Can you distinguish all 5 chip statuses at a glance?</li>
                            <li><strong>Mobile:</strong> Do small (24px) avatars feel too tiny on phone?</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-purple-900">Usage Context (where these will appear):</strong>
                          <ul className="list-disc list-inside mt-2 space-y-1 ml-4 text-xs">
                            <li><strong>Small Avatar (24px):</strong> In ListCard contacts/spaces list</li>
                            <li><strong>Medium Avatar (32px):</strong> General purpose, inline with text</li>
                            <li><strong>Large Avatar (44px):</strong> Top navigation bar (your profile)</li>
                            <li><strong>EntryChips:</strong> In ListCard bottom section showing promise statuses</li>
                          </ul>
                          <p className="text-xs text-gray-600 mt-2">
                            Next step: These components will be composed into ListCard (Step 3) combining Avatar + EntryChips + text
                          </p>
                        </div>
                      </div>
                    </details>
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
        <details open className="group">
          <summary className="cursor-pointer list-none">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl group-open:rotate-90 transition-transform">▶</span>
              <h2 className="text-xl font-semibold text-text-primary">
                Step 3: Molecule Components 🚧
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
                      <strong className="text-purple-900">What to review:</strong> This step implements the ListCard component
                      in two variants — Contact and Space. These cards combine the Avatar and EntryChip components from Step 2
                      with names, timestamps, and status indicators to create the main list items you'll see throughout the app.
                    </p>
                    <div>
                      <strong className="text-purple-900">Contact ListCard — Key elements to check:</strong>
                      <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                        <li><strong>Layout:</strong> Avatar on left, name + green online dot, timestamp on right</li>
                        <li><strong>Online Indicator:</strong> Is the green dot (#00B017, 8px) visible and appropriately sized?</li>
                        <li><strong>Typography:</strong> Name in Hiragino Kaku Gothic Pro W6 (16px, semi-bold)</li>
                        <li><strong>Timestamp:</strong> Gray text (#585858), right-aligned, 12px</li>
                        <li><strong>Entry Chips:</strong> Bottom row with 12px gap between chips</li>
                        <li><strong>Card Shadow:</strong> Does the shadow (0px 4px 16px rgba(0,0,0,0.15)) look right?</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-purple-900">Space ListCard — Key elements to check:</strong>
                      <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                        <li><strong>Layout:</strong> Avatar, space name, separator line, "+X Others" count, timestamp</li>
                        <li><strong>Separator:</strong> Is the vertical line visible and positioned correctly?</li>
                        <li><strong>Connection Count:</strong> "+X Others" text in light weight (W3, 12px)</li>
                        <li><strong>Consistency:</strong> Does spacing/padding match Contact cards?</li>
                      </ul>
                    </div>
                    <p>
                      <strong className="text-purple-900">How to check:</strong> Open your Figma Components page and find the
                      "List Cards" section. Compare both Contact (177:32766) and Space (177:32834) variants side-by-side with
                      the demo below. Check spacing, colors, typography, and the overall visual hierarchy.
                    </p>
                    <p>
                      <strong className="text-purple-900">Mobile Testing:</strong> These cards are designed mobile-first.
                      View this page on your phone to ensure the cards look great at narrow widths and that text doesn't overflow.
                    </p>
                    <p className="text-xs text-gray-600 italic mt-4">
                      ✨ Tip: These cards will be the primary interface for browsing contacts and spaces in the Home screen.
                      Make sure they feel tappable and the information hierarchy is clear at a glance!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-text-secondary mb-6">
              Molecule components that combine atomic components (Avatar + EntryChip) with text and layout.
              These are the main building blocks for the Home screen list view.
            </p>

            {/* ListCard Component */}
            <div className="bg-bg-card rounded shadow-card p-6">
              <h3 className="text-lg font-semibold mb-2 text-text-primary">
                ListCard Component
              </h3>
              <p className="text-sm text-text-secondary mb-6">
                <code className="bg-gray-200 px-1 rounded">src/components/ui/ListCard.tsx</code> •
                Two types: Contact & Space
              </p>

              {/* Contact Type */}
              <div className="mb-8">
                <h4 className="text-sm font-medium mb-4 text-text-primary">
                  Type: Contact (with online status indicator)
                </h4>
                <div className="space-y-4 max-w-md">
                  <ListCard
                    type="contact"
                    avatar={{
                      type: 'contact-initials',
                      initials: 'MH',
                    }}
                    name="Michelle Harrison"
                    isOnline={true}
                    timestamp="2 min ago"
                    chips={[
                      { status: 'sent', label: 'Check designs' },
                      { status: 'responded', label: 'Review PR' },
                    ]}
                  />
                  <ListCard
                    type="contact"
                    avatar={{
                      type: 'image',
                      src: 'https://i.pravatar.cc/150?img=5',
                    }}
                    name="Kevin Liu"
                    isOnline={false}
                    timestamp="1 hour ago"
                    chips={[
                      { status: 'scheduled', label: 'Follow up' },
                      { status: 'no-nudge', label: 'Draft ideas' },
                    ]}
                  />
                  <ListCard
                    type="contact"
                    avatar={{
                      type: 'contact-initials',
                      initials: 'JS',
                    }}
                    name="Jane Smith"
                    isOnline={true}
                    timestamp="5 min ago"
                    chips={[
                      { status: 'responded', label: 'Testing done' },
                      { status: 'closed', label: 'Archived' },
                    ]}
                  />
                </div>
              </div>

              {/* Space Type */}
              <div>
                <h4 className="text-sm font-medium mb-4 text-text-primary">
                  Type: Space (with connection count)
                </h4>
                <div className="space-y-4 max-w-md">
                  <ListCard
                    type="space"
                    avatar={{
                      type: 'space-initials',
                      initials: 'WK',
                    }}
                    name="Weekly Kickoff"
                    connectionCount={3}
                    timestamp="15 min ago"
                    chips={[
                      { status: 'sent', label: 'Agenda items' },
                      { status: 'scheduled', label: 'Next meeting' },
                    ]}
                  />
                  <ListCard
                    type="space"
                    avatar={{
                      type: 'space-initials',
                      initials: 'PT',
                    }}
                    name="Product Team"
                    connectionCount={8}
                    timestamp="2 hours ago"
                    chips={[
                      { status: 'responded', label: 'Q4 Goals' },
                      { status: 'sent', label: 'Feature specs' },
                      { status: 'no-nudge', label: 'Research' },
                    ]}
                  />
                  <ListCard
                    type="space"
                    avatar={{
                      type: 'space-initials',
                      initials: 'SF',
                    }}
                    name="Sunday Funday"
                    connectionCount={5}
                    timestamp="Yesterday"
                    chips={[
                      { status: 'closed', label: 'Last event' },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </details>

        {/* Step 4: Navigation Components */}
        <details open className="group">
          <summary className="cursor-pointer list-none">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl group-open:rotate-90 transition-transform">▶</span>
              <h2 className="text-xl font-semibold text-text-primary">
                Step 4: Navigation & Action Components ✅
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
                      <strong className="text-purple-900">What to review:</strong> This step implements 6 navigation
                      and action components: TopNav, MiddleNav, ScreenModeSwitcher, AddButton, AddOptions, and
                      ModalCallToAction. These are the interactive UI elements that let users navigate and take actions.
                    </p>
                    <p>
                      <strong className="text-purple-900 text-base">🚨 CRITICAL FIX:</strong> The initial implementation
                      had wrong colors and modes due to an outdated extraction document. This has been corrected by
                      verifying directly against your Figma designs:
                    </p>
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 my-3">
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li><strong>FIXED:</strong> Active tab color is now <span className="font-mono bg-[#505BFF] text-white px-1 rounded">#505BFF (PURPLE)</span> — not gray!</li>
                        <li><strong>FIXED:</strong> Screen modes are now "List" and "Nudges" — not "List/Grid/Chat"</li>
                        <li><strong>FIXED:</strong> Add Options shows 4 buttons: Contact, Space, Promise, Nudge</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-purple-900">TopNav — Key elements to check:</strong>
                      <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                        <li><strong>Background:</strong> Dark (#181818) with rounded bottom corners (36px)</li>
                        <li><strong>Search Bar:</strong> White pill shape with search icon and placeholder text</li>
                        <li><strong>Profile Avatar:</strong> Circular (44px) on the right</li>
                        <li><strong>Shadow & Blur:</strong> Glassmorphism effect visible?</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-purple-900">MiddleNav — Key elements to check:</strong>
                      <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                        <li><strong>Active Tab Color:</strong> Is purple (#505BFF) used for "All" when active?</li>
                        <li><strong>Inactive Tabs:</strong> White bg with black 2px border for "Contacts" and "Spaces"</li>
                        <li><strong>Filter/Sort Icons:</strong> Visible and correctly positioned?</li>
                        <li><strong>Typography:</strong> Bold text for tabs, regular for filter/sort labels</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-purple-900">ScreenModeSwitcher — Key elements to check:</strong>
                      <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                        <li><strong>Two Modes Only:</strong> "List" and "Nudges" (calendar icon)</li>
                        <li><strong>Active State:</strong> White background for selected mode</li>
                        <li><strong>Icons:</strong> List icon (hamburger lines) and Calendar icon</li>
                        <li><strong>Shape:</strong> Pill-shaped container (60px border-radius)</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-purple-900">AddButton & AddOptions — Key elements to check:</strong>
                      <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                        <li><strong>AddButton:</strong> Circular white button with + icon</li>
                        <li><strong>AddOptions Menu:</strong> 4 white pill buttons (Contact, Space, Promise, Nudge)</li>
                        <li><strong>Close Button:</strong> Dark with X icon</li>
                        <li><strong>Layout:</strong> Vertical stack with gap between menu and close button</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-purple-900">ModalCallToAction — Key elements to check:</strong>
                      <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                        <li><strong>Background:</strong> Dark (#181818) with rounded top corners (36px)</li>
                        <li><strong>Import Button:</strong> White bg, black border, with download icon</li>
                        <li><strong>Save Button:</strong> Gray bg (#DEDEDE) for disabled state</li>
                        <li><strong>Button Icons:</strong> Import (down arrow) and Save (floppy disk)</li>
                      </ul>
                    </div>
                    <p>
                      <strong className="text-purple-900">How to check:</strong> Open your Figma Navigation section
                      (Node ID: 177:32892) side-by-side with this demo. Compare each component carefully, especially
                      verifying the purple active tab color (#505BFF) vs the old incorrect gray.
                    </p>
                    <p>
                      <strong className="text-purple-900">Interactive Testing:</strong> Try clicking the tabs and buttons
                      below to see the interactive states. The purple color should stand out clearly when tabs are active.
                    </p>
                    <p className="text-xs text-gray-600 italic mt-4">
                      ✨ Tip: The purple active state is a key part of your design language — make sure it pops and
                      feels cohesive with your overall color palette!
                    </p>

                    {/* Collapsible Detailed Verification Guide */}
                    <details className="mt-4 border-t border-purple-200 pt-4">
                      <summary className="cursor-pointer text-sm font-semibold text-purple-900 hover:text-purple-700">
                        🔍 Detailed Verification Guide (click to expand)
                      </summary>
                      <div className="mt-4 space-y-3 text-sm text-gray-700 bg-white/50 p-4 rounded">
                        <div>
                          <strong className="text-purple-900">Exact Color Values — VERIFY THESE:</strong>
                          <ul className="list-disc list-inside mt-2 space-y-1 ml-4 text-xs">
                            <li><strong>TopNav Background:</strong> #181818 (very dark gray)</li>
                            <li><strong>MiddleNav Active Tab (All):</strong> #505BFF (PURPLE) — WHITE TEXT</li>
                            <li><strong>MiddleNav Inactive Tabs:</strong> WHITE bg, BLACK 2px border, BLACK text</li>
                            <li><strong>Screen Switcher Active:</strong> WHITE bg</li>
                            <li><strong>AddOptions Buttons:</strong> WHITE bg, BLACK text</li>
                            <li><strong>Modal Background:</strong> #181818 (matches TopNav)</li>
                            <li><strong>Save Button Disabled:</strong> #DEDEDE (light gray)</li>
                          </ul>
                          <p className="text-xs text-gray-600 mt-2">
                            💡 Use Figma's color picker on the Navigation section to verify these exact hex values.
                            The purple #505BFF is the most critical to verify!
                          </p>
                        </div>
                        <div>
                          <strong className="text-purple-900">Component Specs:</strong>
                          <ul className="list-disc list-inside mt-2 space-y-1 ml-4 text-xs">
                            <li><strong>TopNav:</strong> 24px padding, 36px bottom corners, search bar 44px height, avatar 44px circular</li>
                            <li><strong>MiddleNav:</strong> White semi-transparent bg, 10px gap between sections, tabs 20px border-radius</li>
                            <li><strong>ScreenModeSwitcher:</strong> 60px pill shape, 8px vertical padding, icons 24px</li>
                            <li><strong>AddButton:</strong> 68×68px total (8px padding + 42px button), circular</li>
                            <li><strong>AddOptions:</strong> 64px height menu, 40px height buttons, 14px gap</li>
                            <li><strong>ModalCallToAction:</strong> 24px padding, buttons 50px border-radius (pill)</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-purple-900">Step-by-Step Figma Comparison:</strong>
                          <ol className="list-decimal list-inside mt-2 space-y-1 ml-4 text-xs">
                            <li>Open Figma Navigation section (Node ID: 177:32892)</li>
                            <li>Compare TopNav: dark bar with search + avatar</li>
                            <li>Compare MiddleNav: VERIFY purple active tab (#505BFF)</li>
                            <li>Compare ScreenModeSwitcher: TWO modes only (List, Nudges)</li>
                            <li>Compare AddButton and expanded AddOptions state</li>
                            <li>Compare ModalCallToAction: dark bar with two buttons</li>
                            <li>Use color picker to verify purple is #505BFF, not gray!</li>
                          </ol>
                        </div>
                        <div>
                          <strong className="text-purple-900">What Was Wrong (for context):</strong>
                          <ul className="list-disc list-inside mt-2 space-y-1 ml-4 text-xs">
                            <li>Old extraction had gray active tabs — now correctly purple #505BFF</li>
                            <li>Old extraction had 3 modes (List/Grid/Chat) — now correctly 2 modes (List/Nudges)</li>
                            <li>Old extraction was missing some components — now all 6 components implemented</li>
                            <li>Root cause: Extraction document was outdated vs current Figma design</li>
                            <li>Solution: Verified all specs directly from Figma using MCP tools</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-purple-900">Edge Cases to Test:</strong>
                          <ul className="list-disc list-inside mt-2 space-y-1 ml-4 text-xs">
                            <li><strong>MiddleNav:</strong> Click each tab — active state should be clearly purple</li>
                            <li><strong>ScreenModeSwitcher:</strong> Toggle between List/Nudges — white bg on active</li>
                            <li><strong>AddOptions:</strong> Click option buttons — what happens on click?</li>
                            <li><strong>Search Bar:</strong> Type in search — placeholder disappears, cursor shows</li>
                            <li><strong>Disabled State:</strong> Save button should look obviously disabled</li>
                            <li><strong>Mobile:</strong> Do all buttons feel tappable (≥44px touch targets)?</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-purple-900">Usage Context:</strong>
                          <ul className="list-disc list-inside mt-2 space-y-1 ml-4 text-xs">
                            <li><strong>TopNav:</strong> Fixed at top of Home screen</li>
                            <li><strong>MiddleNav:</strong> Below TopNav, controls what list content shows</li>
                            <li><strong>ScreenModeSwitcher:</strong> Floating bottom-right, toggles view mode</li>
                            <li><strong>AddButton:</strong> Floating bottom-right, tap to show AddOptions</li>
                            <li><strong>AddOptions:</strong> Appears when AddButton tapped, offers quick actions</li>
                            <li><strong>ModalCallToAction:</strong> Bottom of modals for primary/secondary actions</li>
                          </ul>
                          <p className="text-xs text-gray-600 mt-2">
                            Next step: Combine these into Home Screen layout (Step 5)
                          </p>
                        </div>
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-text-secondary mb-6">
              Navigation, filtering, and action components that control the app experience.
              All specs verified directly against Figma designs (Node: 177:32892).
            </p>

            {/* TopNav Component */}
            <div className="bg-bg-card rounded shadow-card p-6">
              <h3 className="text-lg font-semibold mb-2 text-text-primary">
                TopNav Component
              </h3>
              <p className="text-sm text-text-secondary mb-6">
                <code className="bg-gray-200 px-1 rounded">src/components/ui/TopNav.tsx</code> •
                Dark background (#181818), search bar, profile avatar
              </p>

              <div className="max-w-md">
                <TopNav
                  avatarSrc="https://i.pravatar.cc/150?img=8"
                  placeholder="Where am I at with..."
                />
              </div>
            </div>

            {/* MiddleNav Component */}
            <div className="bg-bg-card rounded shadow-card p-6">
              <h3 className="text-lg font-semibold mb-2 text-text-primary">
                MiddleNav Component
              </h3>
              <p className="text-sm text-text-secondary mb-6">
                <code className="bg-gray-200 px-1 rounded">src/components/ui/MiddleNav.tsx</code> •
                View tabs with PURPLE active state (#505BFF), filter/sort controls
              </p>

              <div className="max-w-md">
                <MiddleNav
                  activeView={viewMode}
                  onViewChange={setViewMode}
                />
                <p className="text-xs text-text-tertiary mt-2">
                  Active view: <span className="font-semibold">{viewMode}</span> (Click tabs to change)
                </p>
              </div>
            </div>

            {/* ScreenModeSwitcher Component */}
            <div className="bg-bg-card rounded shadow-card p-6">
              <h3 className="text-lg font-semibold mb-2 text-text-primary">
                ScreenModeSwitcher Component
              </h3>
              <p className="text-sm text-text-secondary mb-6">
                <code className="bg-gray-200 px-1 rounded">src/components/ui/ScreenModeSwitcher.tsx</code> •
                Two modes: List and Nudges (NOT Grid/Chat!)
              </p>

              <div className="flex items-center gap-4">
                <ScreenModeSwitcher
                  activeMode={screenMode}
                  onModeChange={setScreenMode}
                />
                <p className="text-xs text-text-tertiary">
                  Active mode: <span className="font-semibold">{screenMode}</span>
                </p>
              </div>
            </div>

            {/* AddButton & AddOptions Components */}
            <div className="bg-bg-card rounded shadow-card p-6">
              <h3 className="text-lg font-semibold mb-2 text-text-primary">
                AddButton & AddOptions Components
              </h3>
              <p className="text-sm text-text-secondary mb-6">
                <code className="bg-gray-200 px-1 rounded">src/components/ui/AddButton.tsx</code> •
                <code className="bg-gray-200 px-1 rounded ml-1">src/components/ui/AddOptions.tsx</code>
                <br />
                Floating action button that expands to show 4 action options
              </p>

              <div className="flex items-start gap-8">
                <div className="flex flex-col items-center gap-2">
                  <AddButton onClick={() => setShowAddOptions(!showAddOptions)} />
                  <span className="text-xs text-text-secondary">Collapsed</span>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <AddOptions
                    onOptionClick={(option) => console.log('Selected:', option)}
                    onClose={() => setShowAddOptions(false)}
                  />
                  <span className="text-xs text-text-secondary">Expanded (4 options + close)</span>
                </div>
              </div>
            </div>

            {/* ModalCallToAction Component */}
            <div className="bg-bg-card rounded shadow-card p-6">
              <h3 className="text-lg font-semibold mb-2 text-text-primary">
                ModalCallToAction Component
              </h3>
              <p className="text-sm text-text-secondary mb-6">
                <code className="bg-gray-200 px-1 rounded">src/components/ui/ModalCallToAction.tsx</code> •
                Bottom action bar with Import and Save buttons
              </p>

              <div className="max-w-md">
                <ModalCallToAction
                  onImportClick={() => console.log('Import clicked')}
                  onSaveClick={() => console.log('Save clicked')}
                  saveDisabled={true}
                />
              </div>
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
