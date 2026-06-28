"use client";

import { useRef } from "react";
import {
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { EASE } from "@/lib/motion";

export const softFadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE },
  },
};

export const softStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
};

export const replayViewport = {
  once: false,
  margin: "-10% 0px -10% 0px",
  amount: 0.25,
};

export const PIN_HEIGHT = "lg:h-[220vh]";
export const PIN_HEIGHT_TALL = "lg:h-[280vh]";
export const PIN_HEIGHT_MANIFESTE = "lg:h-[320vh]";

export function useSectionScroll(options = {}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const { offset = ["start start", "end end"] } = options;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  return { ref, scrollYProgress, smoothProgress, reducedMotion };
}

export function useParallaxY(progress, input = [0, 1], output = [0, -72]) {
  return useTransform(progress, input, output);
}

export function useScrollFade(progress, fadeIn = [0, 0.18], fadeOut = [0.82, 1]) {
  const opacityIn = useTransform(progress, fadeIn, [0, 1]);
  const opacityOut = useTransform(progress, fadeOut, [1, 0]);
  return useTransform([opacityIn, opacityOut], ([a, b]) => Math.min(a, b));
}

export function useScrollScale(progress, range = [0, 0.25, 0.75, 1], values = [0.94, 1, 1, 0.97]) {
  return useTransform(progress, range, values);
}
