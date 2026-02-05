import React, { useState, useEffect } from 'react';
import World from './components/World';
import DPad from './components/DPad';
import { Gamepad2, Info, Zap } from 'lucide-react';

const App: React.FC = () => {
  // Input vector state {-1 to 1}
  const [inputVector, setInputVector] = useState({ x: 0, y: 0 });
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());
  const [isRunning, setIsRunning] = useState(false);

  // Keyboard Event Handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      
      if (e.key === 'Shift') {
        setIsRunning(true);
      }

      setKeysPressed((prev) => {
        const newKeys = new Set(prev);
        newKeys.add(e.code);
        return newKeys;
      });
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setIsRunning(false);
      }

      setKeysPressed((prev) => {
        const newKeys = new Set(prev);
        newKeys.delete(e.code);
        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Calculate vector from keys
  useEffect(() => {
    let x = 0;
    let y = 0;

    if (keysPressed.has('ArrowUp') || keysPressed.has('KeyW')) y -= 1;
    if (keysPressed.has('ArrowDown') || keysPressed.has('KeyS')) y += 1;
    if (keysPressed.has('ArrowLeft') || keysPressed.has('KeyA')) x -= 1;
    if (keysPressed.has('ArrowRight') || keysPressed.has('KeyD')) x += 1;

    if (keysPressed.size > 0) {
      setInputVector({ x, y });
    } else if (keysPressed.size === 0 && (inputVector.x !== 0 || inputVector.y !== 0)) {
       // Stop if keys are released and dpad not active (simplified logic)
       setInputVector({x: 0, y: 0});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keysPressed]);

  // Handler for DPad component
  const handleDPadChange = (vec: { x: number; y: number } | null) => {
    if (vec) {
      setInputVector(vec);
    } else {
      if (keysPressed.size === 0) {
        setInputVector({ x: 0, y: 0 });
      }
    }
  };

  // Handlers for Run Button (Touch/Click)
  const handleRunStart = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsRunning(true);
  };

  const handleRunEnd = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsRunning(false);
  };

  return (
    <div className="w-full h-screen bg-black flex flex-col relative overflow-hidden no-select">
      
      {/* Game Viewport */}
      <div className="flex-1 relative">
        <World inputVector={inputVector} isRunning={isRunning} />
      </div>

      {/* UI Overlay */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start pointer-events-none">
         <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700 text-slate-200 backdrop-blur-md shadow-lg max-w-xs pointer-events-auto">
            <h1 className="text-sm font-bold text-yellow-400 mb-1 flex items-center gap-2">
              <Gamepad2 size={16} /> Sprite Tester
            </h1>
            <p className="text-[10px] leading-relaxed text-slate-300">
              Use <span className="text-white font-bold">WASD</span> or <span className="text-white font-bold">Arrows</span> to move.
              <br/>
              Hold <span className="text-white font-bold">SHIFT</span> or <span className="text-amber-400 font-bold">Button</span> to Run.
            </p>
         </div>
      </div>

      {/* Mobile Controls */}
      <div className="absolute bottom-8 w-full px-8 pointer-events-none flex justify-between items-end">
        {/* D-Pad */}
        <div className="pointer-events-auto">
          <DPad onDirectionChange={handleDPadChange} />
        </div>

        {/* Run Button */}
        <button 
          className={`w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center shadow-xl backdrop-blur-sm transition-all pointer-events-auto touch-none select-none active:scale-95 ${
            isRunning 
              ? 'bg-amber-500/80 border-amber-300 text-white shadow-amber-500/20' 
              : 'bg-slate-800/80 border-slate-600 text-slate-400'
          }`}
          onMouseDown={handleRunStart}
          onMouseUp={handleRunEnd}
          onMouseLeave={handleRunEnd}
          onTouchStart={handleRunStart}
          onTouchEnd={handleRunEnd}
        >
          <Zap size={32} className={isRunning ? 'fill-white' : ''} />
          <span className="text-[10px] font-bold mt-1">RUN</span>
        </button>
      </div>

      <div className="absolute bottom-4 left-4 text-[10px] text-white/30 pointer-events-none flex items-center gap-1">
        <Info size={12}/> Asset Demo
      </div>
    </div>
  );
};

export default App;
