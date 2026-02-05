import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface DPadProps {
  onDirectionChange: (direction: { x: number; y: number } | null) => void;
}

const DPad: React.FC<DPadProps> = ({ onDirectionChange }) => {
  // Added active state visual feedback and better touch handling properties
  const btnClass = "w-14 h-14 bg-slate-800/80 active:bg-slate-600 border-2 border-slate-600 rounded-lg flex items-center justify-center text-white touch-none select-none transition-colors cursor-pointer outline-none focus:outline-none focus:bg-slate-700";

  // Helpers to handle touch/mouse events without triggering context menus
  const handleStart = (x: number, y: number) => (e: React.SyntheticEvent) => {
    e.preventDefault(); // Prevent focus loss and mouse emulation on touch
    e.stopPropagation();
    onDirectionChange({ x, y });
  };

  const handleEnd = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onDirectionChange(null);
  };

  // Prevent right-click context menu on the DPad
  const preventContext = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div 
      className="grid grid-cols-3 gap-2 p-4 bg-slate-900/50 rounded-2xl backdrop-blur-sm shadow-xl pointer-events-auto"
      onContextMenu={preventContext}
    >
      {/* Top Row */}
      <div />
      <button
        className={btnClass}
        onMouseDown={handleStart(0, -1)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart(0, -1)}
        onTouchEnd={handleEnd}
        onContextMenu={preventContext}
      >
        <ArrowUp size={28} className="pointer-events-none" />
      </button>
      <div />

      {/* Middle Row */}
      <button
        className={btnClass}
        onMouseDown={handleStart(-1, 0)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart(-1, 0)}
        onTouchEnd={handleEnd}
        onContextMenu={preventContext}
      >
        <ArrowLeft size={28} className="pointer-events-none" />
      </button>
      <div className="w-14 h-14 flex items-center justify-center">
        <div className="w-4 h-4 bg-slate-500 rounded-full opacity-50" />
      </div>
      <button
        className={btnClass}
        onMouseDown={handleStart(1, 0)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart(1, 0)}
        onTouchEnd={handleEnd}
        onContextMenu={preventContext}
      >
        <ArrowRight size={28} className="pointer-events-none" />
      </button>

      {/* Bottom Row */}
      <div />
      <button
        className={btnClass}
        onMouseDown={handleStart(0, 1)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart(0, 1)}
        onTouchEnd={handleEnd}
        onContextMenu={preventContext}
      >
        <ArrowDown size={28} className="pointer-events-none" />
      </button>
      <div />
    </div>
  );
};

export default DPad;