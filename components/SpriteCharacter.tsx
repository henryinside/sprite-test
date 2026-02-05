import React, { useState } from 'react';
import { Direction } from '../types';
import { SPRITE_SETS } from '../constants';

interface SpriteCharacterProps {
  direction: Direction;
  isMoving: boolean;
  isRunning: boolean;
}

const SpriteCharacter: React.FC<SpriteCharacterProps> = ({ direction, isMoving, isRunning }) => {
  const [hasError, setHasError] = useState(false);
  
  let currentSrc: string | undefined;

  if (isMoving) {
    // If moving, check if running or walking
    currentSrc = isRunning 
      ? SPRITE_SETS.RUN[direction] 
      : SPRITE_SETS.WALK[direction];
  } else {
    // If idle, try to get specific idle sprite, otherwise fallback to walk sprite (standing still)
    currentSrc = SPRITE_SETS.IDLE[direction] || SPRITE_SETS.WALK[direction];
  }

  // Safety fallback if a specific run/idle sprite is missing in the constants
  if (!currentSrc) {
    currentSrc = SPRITE_SETS.WALK[direction];
  }

  if (hasError) {
    return (
      <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-xs text-white text-center border-2 border-white shadow-lg relative z-10">
        Img Error
      </div>
    );
  }

  return (
    <div className="relative z-10 flex flex-col items-center">
      <img
        key={currentSrc} /* Force re-render when src changes to ensure GIF animation restarts/swaps cleanly */
        src={currentSrc}
        alt={`Character ${direction}`}
        className="w-16 h-16 object-contain pixelated rendering-pixelated"
        style={{ imageRendering: 'pixelated' }}
        onError={() => setHasError(true)}
      />
      
      {/* Shadow */}
      <div className="absolute bottom-1 w-10 h-3 bg-black/20 rounded-full blur-[2px]" />
    </div>
  );
};

export default SpriteCharacter;
