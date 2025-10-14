/**
 * TopNav Component
 *
 * Top navigation bar with search functionality and profile avatar.
 * Figma: Node 177:32452 (Active=No), 177:32739 (Active=Yes)
 *
 * Features:
 * - Dark background (#181818)
 * - Search bar with rounded pill shape
 * - Profile avatar (circular)
 * - Glassmorphism effects (backdrop blur + shadow)
 * - Rounded bottom corners (36px radius)
 */

import React from 'react';

interface TopNavProps {
  /** Search input value */
  searchValue?: string;
  /** Search input change handler */
  onSearchChange?: (value: string) => void;
  /** Profile avatar image URL */
  avatarSrc?: string;
  /** Profile avatar alt text */
  avatarAlt?: string;
  /** Placeholder text for search bar */
  placeholder?: string;
}

export default function TopNav({
  searchValue = '',
  onSearchChange,
  avatarSrc,
  avatarAlt = 'Profile',
  placeholder = 'Where am I at with...'
}: TopNavProps) {
  return (
    <div
      className="w-full bg-[#181818] rounded-bl-[36px] rounded-br-[36px] p-6 flex items-center gap-[10px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.15)]"
      style={{ backdropFilter: 'blur(6px)' }}
    >
      {/* Search Bar */}
      <div className="flex-1 max-w-[326px] h-[44px] bg-white rounded-[40px] px-5 py-7 flex items-center gap-[5px] border border-[#7a7a7a]">
        {/* Search Icon */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="shrink-0"
        >
          <path
            d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16ZM18 18l-4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Search Input */}
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none text-black text-center text-[16px] font-['Arial',sans-serif] placeholder:text-black"
          style={{ fontFamily: 'Arial, sans-serif' }}
        />
      </div>

      {/* Profile Avatar */}
      <div className="shrink-0 w-[44px] h-[44px] rounded-[50px] border border-[#7a7a7a] overflow-hidden">
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={avatarAlt}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#4B4B4B] flex items-center justify-center">
            <span className="text-white text-[16px] font-['IBM_Plex_Mono',monospace] font-bold">
              U
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
