import { useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

/**
 * Hook para optimizar motion y reducir forced reflows
 * Desactiva animations innecesarias basadas en preferencias del usuario
 * y evita mediciones de layout en elementos fuera de viewport
 */
export function useMotionOptimized() {
  const prefersReducedMotion = useReducedMotion();
  const [isMountedOnClient, setIsMountedOnClient] = useState(false);

  useEffect(() => {
    // Delay animation triggers until after hydration completes
    setIsMountedOnClient(true);
  }, []);

  return {
    shouldReduceMotion: prefersReducedMotion,
    isMounted: isMountedOnClient,
    // Provide optimized animation config that avoids reflows
    viewportConfig: {
      once: true,
      margin: '0px 0px -100px 0px', // Trigger animations only when element is ~100px from viewport
    },
  };
}

/**
 * Configuración global para motion/react que reduce reflows
 * Usar en MotionConfig del app
 */
export const MOTION_CONFIG = {
  // Reducir frecuencia de chequeos de viewport
  layoutScroll: false,
  // Usar GPU acceleration
  transformPagePoint: undefined,
  // Reducir precisión de mediciones para menos reflows
  skipAnimationOnInit: true,
};
