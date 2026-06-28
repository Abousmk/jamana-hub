"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** SSR-safe motion gate: static markup until mount, then respect prefers-reduced-motion. */
export function useMotionActive() {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const motionActive = mounted && !reducedMotion;

  return {
    mounted,
    reducedMotion,
    motionActive,
    disableMotion: !motionActive,
  };
}
