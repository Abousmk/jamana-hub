"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import { useMotionActive } from "@/lib/useMotionActive";

function ChevronDown({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

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
      className="group relative flex h-14 w-14 items-center justify-center rounded-full transition-[transform,opacity] duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green-abyss active:scale-95"
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle, rgba(200,169,81,0.4) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {motionActive ? (
        <motion.div
          className="relative flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-7 w-7 text-gold drop-shadow-[0_0_14px_rgba(200,169,81,0.65)]" />
        </motion.div>
      ) : (
        <ChevronDown className="relative h-7 w-7 text-gold drop-shadow-[0_0_10px_rgba(200,169,81,0.5)]" />
      )}
    </button>
  );
}
