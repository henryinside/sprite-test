import { useEffect, useRef } from 'react';

export const useGameLoop = (callback: (deltaTime: number) => void) => {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  // Use a ref to store the latest callback to avoid stale closures in the animation loop
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      // Call the latest callback
      callbackRef.current(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only start loop once
};