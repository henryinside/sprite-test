import React, { useRef, useState, useCallback } from 'react';
import { GameState, Direction } from '../types';
import { WALK_SPEED, RUN_SPEED, TILE_SIZE, DIAGONAL_FACTOR } from '../constants';
import { useGameLoop } from '../hooks/useGameLoop';
import SpriteCharacter from './SpriteCharacter';

interface WorldProps {
  inputVector: { x: number; y: number };
  isRunning: boolean;
}

const World: React.FC<WorldProps> = ({ inputVector, isRunning }) => {
  const [gameState, setGameState] = useState<GameState>({
    position: { x: 0, y: 0 },
    direction: Direction.SOUTH,
    isMoving: false,
  });

  // Background pattern ref
  const bgRef = useRef<HTMLDivElement>(null);

  // Determine direction enum from vector
  const getDirectionFromVector = (vx: number, vy: number, current: Direction): Direction => {
    if (Math.abs(vy) > Math.abs(vx)) {
      return vy > 0 ? Direction.SOUTH : Direction.NORTH;
    } else if (Math.abs(vx) > Math.abs(vy)) {
      return vx > 0 ? Direction.EAST : Direction.WEST;
    }
    return current;
  };

  // Game Loop Logic
  const updateGame = useCallback(() => {
    setGameState((prev) => {
      const { x: vx, y: vy } = inputVector;
      const isMoving = vx !== 0 || vy !== 0;

      if (!isMoving) {
        return { ...prev, isMoving: false };
      }

      // Calculate speed
      let speed = isRunning ? RUN_SPEED : WALK_SPEED;
      if (vx !== 0 && vy !== 0) {
        speed *= DIAGONAL_FACTOR;
      }

      // Update position
      const newPos = {
        x: prev.position.x + vx * speed,
        y: prev.position.y + vy * speed,
      };

      // Determine new facing direction
      const newDir = getDirectionFromVector(vx, vy, prev.direction);

      return {
        position: newPos,
        direction: newDir,
        isMoving: true,
      };
    });
  }, [inputVector, isRunning]);

  useGameLoop(updateGame);

  // Background movement logic (Camera follows player)
  // We simulate camera movement by moving the background position in the opposite direction of the player
  const backgroundPosition = {
    backgroundPositionX: `${-gameState.position.x}px`,
    backgroundPositionY: `${-gameState.position.y}px`,
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-emerald-800">
      {/* Tiled Ground Layer */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: `${TILE_SIZE}px ${TILE_SIZE}px`,
          ...backgroundPosition
        }}
      />
      
      {/* Decorative dots to visualize movement better */}
      <div 
        className="absolute inset-0 w-full h-full opacity-20"
        style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: `${TILE_SIZE * 2}px ${TILE_SIZE * 2}px`,
            ...backgroundPosition
        }}
      />

      {/* Coordinate Debugger (Optional) */}
      <div className="absolute top-4 left-4 text-emerald-200 text-xs font-mono bg-black/50 p-2 rounded pointer-events-none">
        POS: {Math.round(gameState.position.x)}, {Math.round(gameState.position.y)}<br/>
        DIR: {gameState.direction}<br/>
        STATE: {isRunning ? 'RUN' : 'WALK'}
      </div>

      {/* Character - Centered in viewport */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <SpriteCharacter 
          direction={gameState.direction} 
          isMoving={gameState.isMoving} 
          isRunning={isRunning}
        />
      </div>
    </div>
  );
};

export default World;
