/**
 * AddButton Component
 *
 * Floating action button with plus icon.
 * Figma: Node 177:32897 (Icon=Add)
 *
 * Features:
 * - Circular white button with plus icon
 * - Glassmorphism container with backdrop blur
 * - Shadow and rounded pill container
 * - 68x68px total size (8px padding + 42x42px button)
 */

import React from 'react';

interface AddButtonProps {
  /** Click handler */
  onClick?: () => void;
  /** Button aria label */
  ariaLabel?: string;
}

export default function AddButton({
  onClick,
  ariaLabel = 'Add new item'
}: AddButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="w-[68px] h-[68px] p-2 rounded-[48px] flex flex-col items-center justify-between shadow-[0px_4px_16px_0px_rgba(0,0,0,0.15)]"
      style={{
        background:
          'linear-gradient(90deg, rgba(94, 94, 94, 0.2) 0%, rgba(94, 94, 94, 0.2) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.4) 100%)',
        backdropFilter: 'blur(6px)'
      }}
    >
      <div className="w-[42px] h-[42px] bg-white rounded-[40px] flex items-center justify-center p-7">
        {/* Plus Icon */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          className="shrink-0"
        >
          <path
            d="M16 8v16M8 16h16"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </button>
  );
}
