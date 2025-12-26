import { useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';


export function useMotionOptimized() {
  const prefersReducedMotion = useReducedMotion();
  const [isMountedOnClient, setIsMountedOnClient] = useState(false);

  useEffect(() => {
    setIsMountedOnClient(true);
  }, []);

  return {
    shouldReduceMotion: prefersReducedMotion,
    isMounted: isMountedOnClient,
    viewportConfig: {
      once: true,
      margin: '0px 0px -100px 0px',
    },
  };
}

export const MOTION_CONFIG = {
  layoutScroll: false,
  transformPagePoint: undefined,
  skipAnimationOnInit: true,
};
