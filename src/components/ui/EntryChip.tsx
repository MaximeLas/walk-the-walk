/**
 * EntryChip Component
 *
 * Status indicator chips with five variants:
 * - no-nudge: Transparent bg, black border
 * - scheduled: Light yellow bg, golden border
 * - sent: Light blue bg, blue border
 * - responded: Light green bg, green border
 * - closed: Light purple bg, purple border
 *
 * All chips share:
 * - Font: Arial Regular, 12px
 * - Padding: 12px all sides
 * - Border radius: 2px
 * - Border: 1px solid
 * - Height: Flexible (size-full)
 * - Text: Center aligned, black
 *
 * Source: COMPLETE_FIGMA_EXTRACTION.md "Entry Chips" section
 */

import React from 'react'

export type EntryChipStatus =
  | 'no-nudge'
  | 'scheduled'
  | 'sent'
  | 'responded'
  | 'closed'

export interface EntryChipProps {
  status: EntryChipStatus
  children: React.ReactNode
}

export function EntryChip({ status, children }: EntryChipProps) {
  // Status-specific colors from Figma extraction
  const statusStyles = {
    'no-nudge': {
      bg: 'bg-transparent',
      border: 'border-black',
      text: 'text-black',
    },
    scheduled: {
      bg: 'bg-[#FFFCEF]', // Light yellow/cream
      border: 'border-[#FCD915]', // Golden yellow
      text: 'text-black',
    },
    sent: {
      bg: 'bg-[#EAF6FF]', // Light blue
      border: 'border-[#004CCE]', // Deep blue
      text: 'text-black',
    },
    responded: {
      bg: 'bg-[#EAFFF4]', // Light green
      border: 'border-[#00B017]', // Green
      text: 'text-black',
    },
    closed: {
      bg: 'bg-[#E8DAFF]', // Light purple
      border: 'border-[#843DFF]', // Purple
      text: 'text-black',
    },
  }

  const style = statusStyles[status]

  return (
    <div
      className={`
        ${style.bg}
        ${style.border}
        ${style.text}
        inline-flex
        items-center
        justify-center
        px-3
        py-3
        rounded-sm
        border
        text-xs
        leading-none
        text-center
        whitespace-nowrap
      `.trim()}
      style={{ fontFamily: 'Arial, sans-serif' }}
    >
      {children}
    </div>
  )
}
