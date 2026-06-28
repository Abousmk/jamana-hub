"use client";

import { useEffect, useState } from "react";

function readReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** SSR-safe motion gate: static until mount, then respect prefers-reduced-motion. */
export function useMotionActive() {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const motionActive = mounted && !reducedMotion;

  return {
    mounted,
    reducedMotion,
    motionActive,
    disableMotion: !motionActive,
    /** Remount key so motion `initial` runs after hydration, not SSR static state. */
    motionKey: motionActive ? "motion" : "static",
  };
}
