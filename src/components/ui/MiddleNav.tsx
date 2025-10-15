/**
 * MiddleNav Component
 *
 * Middle navigation bar with filter/sort controls and view mode tabs.
 * Figma: Node 177:32453 (All), 177:32615 (Contacts), 177:32652 (Spaces)
 *
 * KEY FIX: Active tab uses PURPLE (#505BFF) not gray!
 *
 * Features:
 * - Glassmorphism background (white semi-transparent)
 * - Filter and Sort controls
 * - Three view tabs: All, Contacts, Spaces
 * - Active tab has purple background (#505BFF) with white text
 * - Inactive tabs have transparent background with black text
 */

import React from 'react';

type ViewMode = 'all' | 'contacts' | 'spaces';

interface MiddleNavProps {
  /** Currently active view mode */
  activeView?: ViewMode;
  /** View mode change handler */
  onViewChange?: (view: ViewMode) => void;
  /** Filter click handler */
  onFilterClick?: () => void;
  /** Sort click handler */
  onSortClick?: () => void;
  /** Current sort label */
  sortLabel?: string;
}

export default function MiddleNav({
  activeView = 'all',
  onViewChange,
  onFilterClick,
  onSortClick,
  sortLabel = 'Sort By: Most Recent'
}: MiddleNavProps) {
  return (
    <div
      className="w-full py-2 px-0 flex flex-col gap-[10px] items-center border border-[#e9e9e9]"
      style={{
        background:
          'linear-gradient(90deg, rgba(255, 255, 255, 0.69) 0%, rgba(255, 255, 255, 0.69) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.4) 100%)',
        backdropFilter: 'blur(6px)'
      }}
    >
      {/* Filters and Sort */}
      <div className="w-full px-6 py-0 flex items-center justify-between">
        {/* Filter */}
        <button
          onClick={onFilterClick}
          className="flex items-center gap-1 cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M14 2H2l4.8 5.6v4.8l2.4 1.2v-6L14 2z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[12px] font-['Arial',sans-serif] font-bold text-black leading-none">
            Filters
          </span>
        </button>

        {/* Sort */}
        <button
          onClick={onSortClick}
          className="flex items-center gap-1 cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 12l2.5 2.5L8 12M5.5 14V2M11 4L8.5 1.5 6 4m2.5-2.5V14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[12px] font-['Arial',sans-serif] font-bold text-black leading-none">
            {sortLabel}
          </span>
        </button>
      </div>

      {/* Divider Line */}
      <div className="w-full h-px bg-[#e9e9e9]" />

      {/* View Options */}
      <div className="w-full px-6 py-0 flex items-center justify-between">
        {/* All Tab */}
        <button
          onClick={() => onViewChange?.('all')}
          className={`min-w-[100px] px-6 py-3 rounded-[48px] flex items-center justify-center transition-colors ${
            activeView === 'all'
              ? 'bg-[#505BFF] text-white'
              : 'bg-transparent text-black'
          }`}
          style={{ backdropFilter: activeView === 'all' ? 'blur(6px)' : 'none' }}
        >
          <span className="text-[18px] font-['Arial',sans-serif] font-bold leading-none">
            All
          </span>
        </button>

        {/* Contacts Tab */}
        <button
          onClick={() => onViewChange?.('contacts')}
          className={`min-w-[100px] px-6 py-3 rounded-[48px] flex items-center justify-center transition-colors ${
            activeView === 'contacts'
              ? 'bg-[#505BFF] text-white'
              : 'bg-transparent text-black'
          }`}
          style={{ backdropFilter: activeView === 'contacts' ? 'blur(6px)' : 'none' }}
        >
          <span className="text-[18px] font-['Arial',sans-serif] font-bold leading-none">
            Contacts
          </span>
        </button>

        {/* Spaces Tab */}
        <button
          onClick={() => onViewChange?.('spaces')}
          className={`min-w-[100px] px-6 py-3 rounded-[48px] flex items-center justify-center transition-colors ${
            activeView === 'spaces'
              ? 'bg-[#505BFF] text-white'
              : 'bg-transparent text-black'
          }`}
          style={{ backdropFilter: activeView === 'spaces' ? 'blur(6px)' : 'none' }}
        >
          <span className="text-[18px] font-['Arial',sans-serif] font-bold leading-none">
            Spaces
          </span>
        </button>
      </div>
    </div>
  );
}
