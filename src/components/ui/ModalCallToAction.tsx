/**
 * ModalCallToAction Component
 *
 * Bottom action bar with Import and Save buttons.
 * Figma: Node 209:39337 (Modal Call to Action)
 *
 * Features:
 * - Dark background (#181818)
 * - Two pill-shaped buttons side by side
 * - Import button: white bg, black text, download icon
 * - Save button: gray bg (#DEDEDE), disabled state
 * - Rounded top corners (36px radius)
 * - Glassmorphism with backdrop blur
 */

import React from 'react';

interface ModalCallToActionProps {
  /** Import button click handler */
  onImportClick?: () => void;
  /** Save button click handler */
  onSaveClick?: () => void;
  /** Whether Save button is disabled */
  saveDisabled?: boolean;
}

export default function ModalCallToAction({
  onImportClick,
  onSaveClick,
  saveDisabled = true
}: ModalCallToActionProps) {
  return (
    <div
      className="w-full bg-[#181818] rounded-tl-[36px] rounded-tr-[36px] p-6 flex flex-col items-center gap-[10px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.15)] overflow-hidden"
      style={{ backdropFilter: 'blur(6px)' }}
    >
      <div className="w-[380px] flex items-center justify-between">
        {/* Import Button */}
        <button
          onClick={onImportClick}
          className="bg-white border border-black rounded-[50px] px-6 py-4 flex items-center gap-2 min-w-[48px]"
        >
          {/* Import Icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2v14M12 16l-4-4M12 16l4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 20h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span
            className="text-[14px] leading-none text-black"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            Import from Contacts
          </span>
        </button>

        {/* Save Button (Disabled) */}
        <button
          onClick={onSaveClick}
          disabled={saveDisabled}
          className={`border border-black rounded-[50px] px-6 py-4 flex items-center gap-2 min-w-[48px] ${
            saveDisabled
              ? 'bg-[#dedede] cursor-not-allowed'
              : 'bg-white cursor-pointer'
          }`}
        >
          {/* Save Icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
              stroke={saveDisabled ? '#646464' : 'currentColor'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 21v-8H7v8M7 3v5h8"
              stroke={saveDisabled ? '#646464' : 'currentColor'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className={`text-[14px] leading-none ${
              saveDisabled ? 'text-[#646464]' : 'text-black'
            }`}
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            Save
          </span>
        </button>
      </div>
    </div>
  );
}
