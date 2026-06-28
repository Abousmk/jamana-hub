"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function useChromaEnabled() {
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return !reducedMotion && !isMobile;
}
