/**
 * ScreenModeSwitcher Component
 *
 * Toggle between List and Nudges view modes.
 * Figma: Node 209:37869 (Mode=List), 177:32962 (Mode=Schedule/Nudges)
 *
 * KEY FIX: Only TWO modes - List and Nudges (NOT Grid/Chat)!
 *
 * Features:
 * - Glassmorphism pill-shaped container
 * - Two modes: List and Nudges
 * - Active mode has white background
 * - Calendar icon for Nudges mode
 * - List icon for List mode
 * - Backdrop blur and shadow effects
 */

import React from 'react';

type ScreenMode = 'list' | 'nudges';

interface ScreenModeSwitcherProps {
  /** Currently active screen mode */
  activeMode?: ScreenMode;
  /** Mode change handler */
  onModeChange?: (mode: ScreenMode) => void;
}

export default function ScreenModeSwitcher({
  activeMode = 'list',
  onModeChange
}: ScreenModeSwitcherProps) {
  return (
    <div
      className="inline-flex items-center justify-between px-[14px] py-2 rounded-[60px] gap-0 shadow-[0px_4px_16px_0px_rgba(0,0,0,0.15)]"
      style={{
        background:
          'linear-gradient(90deg, rgba(94, 94, 94, 0.2) 0%, rgba(94, 94, 94, 0.2) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.4) 100%)',
        backdropFilter: 'blur(6px)'
      }}
    >
      {/* List Tab */}
      <button
        onClick={() => onModeChange?.('list')}
        className={`h-[60px] px-[13px] py-2 rounded-[48px] flex flex-col items-center justify-center gap-1 ${
          activeMode === 'list'
            ? 'bg-white'
            : 'bg-transparent'
        }`}
        style={{ backdropFilter: activeMode === 'list' ? 'blur(6px)' : 'none' }}
      >
        <div className="w-[54px] h-[54px] px-3 py-2 rounded-[40px] flex flex-col items-center justify-center gap-1">
          {/* List Icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-[12px] font-['Arial',sans-serif] font-bold text-black leading-none">
            List
          </span>
        </div>
      </button>

      {/* Nudges Tab */}
      <button
        onClick={() => onModeChange?.('nudges')}
        className={`h-[60px] w-[80px] px-[13px] py-2 rounded-[48px] flex flex-col items-center justify-center gap-1 ${
          activeMode === 'nudges'
            ? 'bg-white'
            : 'bg-transparent'
        }`}
        style={{ backdropFilter: activeMode === 'nudges' ? 'blur(6px)' : 'none' }}
      >
        {/* Calendar Icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="4"
            width="18"
            height="18"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M8 2v4M16 2v4M3 10h18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-[12px] font-['Arial',sans-serif] font-bold text-black leading-none">
          Nudges
        </span>
      </button>
    </div>
  );
}
