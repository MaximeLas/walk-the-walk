/**
 * Avatar Component
 *
 * Three types:
 * - image: Displays user profile photo with dark background
 * - contact-initials: Dark gray (#4B4B4B) with white text
 * - space-initials: Light gray (#B9B9B9) with black text
 *
 * Three sizes:
 * - sm: 24x24px (list cards)
 * - md: 32x32px (general use)
 * - lg: 44x44px (top navigation)
 *
 * Source: COMPLETE_FIGMA_EXTRACTION.md "Avatars" section
 */

import React from 'react'
import Image from 'next/image'

export interface AvatarProps {
  type: 'image' | 'contact-initials' | 'space-initials'
  size: 'sm' | 'md' | 'lg'
  src?: string // Required if type='image'
  initials?: string // Required if type='contact-initials' or 'space-initials'
  alt?: string // Alt text for image type
}

export function Avatar({ type, size, src, initials, alt }: AvatarProps) {
  // Size classes
  const sizeClasses = {
    sm: 'w-6 h-6', // 24px
    md: 'w-8 h-8', // 32px
    lg: 'w-11 h-11', // 44px
  }

  // Font size classes for initials (scales with avatar size)
  const fontSizeClasses = {
    sm: 'text-[10px]', // 10px - matches Figma spec
    md: 'text-xs', // 12px - scaled up for medium
    lg: 'text-sm', // 14px - scaled up for large
  }

  // Base classes for all avatars
  const baseClasses = `
    ${sizeClasses[size]}
    rounded-full
    overflow-hidden
    flex
    items-center
    justify-center
    flex-shrink-0
  `.trim()

  // Type-specific rendering
  if (type === 'image') {
    if (!src) {
      console.warn('Avatar: src is required when type="image"')
      return null
    }

    return (
      <div className={`${baseClasses} bg-[#0B0B0B]`}>
        <Image
          src={src}
          alt={alt || 'Avatar'}
          width={size === 'sm' ? 24 : size === 'md' ? 32 : 44}
          height={size === 'sm' ? 24 : size === 'md' ? 32 : 44}
          className="w-full h-full object-cover"
        />
      </div>
    )
  }

  if (type === 'contact-initials') {
    if (!initials) {
      console.warn('Avatar: initials is required when type="contact-initials"')
      return null
    }

    // Limit to 2 characters for initials
    const displayInitials = initials.slice(0, 2).toUpperCase()

    return (
      <div
        className={`${baseClasses} bg-[#4B4B4B]`}
        aria-label={`Contact ${initials}`}
      >
        <span
          className={`
            ${fontSizeClasses[size]}
            font-bold
            text-white
            leading-none
            font-mono
          `.trim()}
          style={{ fontFamily: 'IBM Plex Mono, monospace' }}
        >
          {displayInitials}
        </span>
      </div>
    )
  }

  if (type === 'space-initials') {
    if (!initials) {
      console.warn('Avatar: initials is required when type="space-initials"')
      return null
    }

    // Limit to 2 characters for initials
    const displayInitials = initials.slice(0, 2).toUpperCase()

    return (
      <div
        className={`${baseClasses} bg-[#B9B9B9]`}
        aria-label={`Space ${initials}`}
      >
        <span
          className={`
            ${fontSizeClasses[size]}
            font-bold
            text-black
            leading-none
            font-mono
          `.trim()}
          style={{ fontFamily: 'IBM Plex Mono, monospace' }}
        >
          {displayInitials}
        </span>
      </div>
    )
  }

  return null
}
