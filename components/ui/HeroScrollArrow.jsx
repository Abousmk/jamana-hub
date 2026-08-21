"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import { useMotionActive } from "@/lib/useMotionActive";

export default function HeroScrollArrow({ label }) {
  const { motionActive, reducedMotion } = useMotionActive();

  const scrollToHub = useCallback(() => {
    const hub = document.getElementById("hub");
    if (hub) {
      hub.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  }, [reducedMotion]);

  return (
    <button
      type="button"
      onClick={scrollToHub}
      aria-label={label}
      className="group flex flex-col items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green-abyss"
    >
      {motionActive ? (
        <motion.span
          className="block h-7 w-px origin-top bg-gold/70 sm:h-8"
          aria-hidden="true"
          animate={{ scaleY: [0.35, 1, 0.35], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : (
        <span className="block h-7 w-px bg-gold/50 sm:h-8" aria-hidden="true" />
      )}

      <span className="font-util text-[0.65rem] uppercase tracking-[0.25em] text-cream/45 transition-colors duration-300 group-hover:text-gold/80">
        {label}
      </span>
    </button>
  );
}
