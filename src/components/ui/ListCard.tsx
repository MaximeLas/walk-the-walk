/**
 * ListCard Component
 *
 * Two types of list cards for displaying contacts and spaces:
 * - contact: Shows avatar, name, status indicator, timestamp, and entry chips
 * - space: Shows avatar, name, connection count, timestamp, and entry chips
 *
 * Both types share:
 * - White background (#FFFFFF)
 * - 8px border radius
 * - Shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.15)
 * - Backdrop filter: blur(6px)
 * - Card Top: 12px padding, 8px gap
 * - Card Bottom: 12px horizontal padding, 6px vertical padding, 12px gap between chips
 *
 * Source: COMPLETE_FIGMA_EXTRACTION.md "List Cards" section
 */

import React from 'react'
import { Avatar, AvatarProps } from './Avatar'
import { EntryChip, EntryChipStatus } from './EntryChip'

export interface ListCardContactProps {
  type: 'contact'
  avatar: Omit<AvatarProps, 'size'> // Always sm size for list cards
  name: string
  isOnline?: boolean // Shows green status dot if true
  timestamp: string
  chips: Array<{
    status: EntryChipStatus
    label: string
  }>
}

export interface ListCardSpaceProps {
  type: 'space'
  avatar: Omit<AvatarProps, 'size'> // Always sm size for list cards
  name: string
  connectionCount: number
  timestamp: string
  chips: Array<{
    status: EntryChipStatus
    label: string
  }>
}

export type ListCardProps = ListCardContactProps | ListCardSpaceProps

export function ListCard(props: ListCardProps) {
  const { type, avatar, timestamp, chips } = props

  return (
    <div
      className="
        w-full
        bg-white
        rounded-[8px]
        overflow-hidden
        flex
        flex-col
      "
      style={{
        boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.15)',
        backdropFilter: 'blur(6px)',
      }}
    >
      {/* Card Top */}
      <div className="p-3 flex items-center gap-2">
        {/* Avatar */}
        <Avatar {...avatar} size="sm" />

        {/* Name & Status/Connections */}
        <div className="flex-1 flex items-center gap-3 min-w-0">
          {type === 'contact' ? (
            <>
              {/* Contact Name */}
              <span
                className="text-base font-semibold text-black leading-none whitespace-nowrap truncate"
                style={{ fontFamily: 'Hiragino Kaku Gothic Pro, sans-serif' }}
              >
                {props.name}
              </span>

              {/* Status Indicator Dot */}
              {props.isOnline && (
                <div
                  className="w-2 h-2 rounded-full bg-[#00B017] flex-shrink-0"
                  aria-label="Online"
                />
              )}
            </>
          ) : (
            <>
              {/* Space Name */}
              <span
                className="text-base font-semibold text-black whitespace-nowrap truncate"
                style={{ fontFamily: 'Hiragino Kaku Gothic Pro, sans-serif' }}
              >
                {props.name}
              </span>

              {/* Separator Line */}
              <div
                className="w-px h-6 bg-gray-300 flex-shrink-0"
                style={{ transform: 'rotate(90deg)' }}
              />

              {/* Connection Count */}
              <span
                className="text-xs font-light text-black text-center whitespace-nowrap"
                style={{ fontFamily: 'Hiragino Kaku Gothic Pro, sans-serif' }}
              >
                +{props.connectionCount} Others
              </span>
            </>
          )}
        </div>

        {/* Timestamp */}
        <span
          className="text-xs font-light text-[#585858] text-right whitespace-nowrap flex-shrink-0"
          style={{ fontFamily: 'Hiragino Kaku Gothic Pro, sans-serif' }}
        >
          {timestamp}
        </span>
      </div>

      {/* Card Bottom - Entry Chips */}
      <div className="px-3 py-1.5 flex items-center gap-3 flex-wrap">
        {chips.map((chip, index) => (
          <EntryChip key={index} status={chip.status}>
            {chip.label}
          </EntryChip>
        ))}
      </div>
    </div>
  )
}
