/**
 * AddOptions Component
 *
 * Expanded add menu with action options and close button.
 * Figma: Node 177:33071 (Icon=Close) and 177:33067 (Add Options)
 *
 * Features:
 * - Four white pill buttons: Contact, Space, Promise, Nudge
 * - Glassmorphism container with backdrop blur
 * - Close button (X icon, circular, dark background)
 * - Vertical layout with gap between options menu and close button
 */

import React from 'react';

type AddOptionType = 'contact' | 'space' | 'promise' | 'nudge';

interface AddOptionsProps {
  /** Option click handler */
  onOptionClick?: (option: AddOptionType) => void;
  /** Close button click handler */
  onClose?: () => void;
}

export default function AddOptions({ onOptionClick, onClose }: AddOptionsProps) {
  const options: { value: AddOptionType; label: string }[] = [
    { value: 'contact', label: 'Contact' },
    { value: 'space', label: 'Space' },
    { value: 'promise', label: 'Promise' },
    { value: 'nudge', label: 'Nudge' }
  ];

  return (
    <div className="flex flex-col items-end gap-7">
      {/* Add Options Menu */}
      <div
        className="h-16 px-[14px] py-2 rounded-[60px] flex items-center gap-[14px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.15)]"
        style={{
          background:
            'linear-gradient(90deg, rgba(94, 94, 94, 0.2) 0%, rgba(94, 94, 94, 0.2) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.4) 100%)',
          backdropFilter: 'blur(6px)'
        }}
      >
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onOptionClick?.(option.value)}
            className="h-10 px-[15px] py-7 bg-white rounded-[40px] flex items-center justify-center"
          >
            <span
              className="text-[12px] leading-none text-black text-center whitespace-nowrap font-semibold"
              style={{ fontFamily: 'Hiragino Kaku Gothic Pro, sans-serif', fontWeight: 600 }}
            >
              {option.label}
            </span>
          </button>
        ))}
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Close add options"
        className="w-[68px] h-[68px] p-2 rounded-[48px] flex items-center justify-center shadow-[0px_4px_16px_0px_rgba(0,0,0,0.15)]"
        style={{
          background:
            'linear-gradient(90deg, rgba(94, 94, 94, 0.2) 0%, rgba(94, 94, 94, 0.2) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.4) 100%)',
          backdropFilter: 'blur(6px)'
        }}
      >
        <div className="w-[40px] h-[40px] bg-transparent rounded-[40px] flex items-center justify-center">
          {/* Close (X) Icon */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            className="shrink-0"
          >
            <path
              d="M24 8L8 24M8 8l16 16"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </button>
    </div>
  );
}
