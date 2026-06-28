"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMotionActive } from "@/lib/useMotionActive";

const JAMANA_SIZE = "clamp(4rem, 18vw, 13rem)";
const HUB_SIZE = "clamp(6rem, 26vw, 18rem)";
const STROKE = "1px rgba(200, 169, 81, 0.5)";
const MOBILE_FILL = "rgba(200, 169, 81, 0.35)";
const GOLD = "#C8A951";

const jamanaBaseClass =
  "pointer-events-none absolute left-1/2 top-1/2 z-[3] -translate-x-1/2 -translate-y-1/2 select-none font-display text-[length:var(--sig-size)] font-bold leading-none tracking-tight";

export default function FooterSignature() {
  const containerRef = useRef(null);
  const [mouseX, setMouseX] = useState(null);
  const [isPointerFine, setIsPointerFine] = useState(false);
  const { motionActive, mounted } = useMotionActive();

  useEffect(() => {
    if (!mounted) return undefined;

    const mq = window.matchMedia("(pointer: fine) and (min-width: 769px)");
    const update = () => setIsPointerFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [mounted]);

  const useDesktopHover = mounted && motionActive && isPointerFine;
  const useMobileFill = mounted && motionActive && !isPointerFine;

  const handleMouseMove = useCallback(
    (e) => {
      if (!containerRef.current || !useDesktopHover) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMouseX(e.clientX - rect.left);
    },
    [useDesktopHover],
  );

  const handleMouseLeave = useCallback(() => {
    setMouseX(null);
  }, []);

  let hoverFillStyle = null;

  if (useDesktopHover && mouseX !== null) {
    const rect = containerRef.current?.getBoundingClientRect();
    const width = rect?.width ?? 400;
    const centerX = width / 2;
    const proximity = 1 - Math.min(Math.abs(mouseX - centerX) / (width / 2), 1);
    const opacity = 0.12 + proximity * 0.88;

    hoverFillStyle = {
      color: GOLD,
      opacity,
      WebkitMaskImage: `radial-gradient(circle 180px at ${mouseX}px 50%, black 0%, transparent 100%)`,
      maskImage: `radial-gradient(circle 180px at ${mouseX}px 50%, black 0%, transparent 100%)`,
    };
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-[220px] overflow-hidden md:min-h-[280px] lg:min-h-[320px]"
      onMouseMove={useDesktopHover ? handleMouseMove : undefined}
      onMouseLeave={useDesktopHover ? handleMouseLeave : undefined}
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 select-none font-display text-[length:var(--hub-size)] font-bold leading-none tracking-tight"
        style={{ "--hub-size": HUB_SIZE, color: "rgba(200, 169, 81, 0.09)" }}
      >
        HUB
      </div>

      <div
        className={jamanaBaseClass}
        style={{
          "--sig-size": JAMANA_SIZE,
          WebkitTextStroke: STROKE,
          color: "transparent",
        }}
      >
        JAMANA
      </div>

      {useMobileFill ? (
        <motion.div
          className={jamanaBaseClass}
          style={{ "--sig-size": JAMANA_SIZE, color: MOBILE_FILL }}
          initial={{ opacity: 0.55 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          JAMANA
        </motion.div>
      ) : hoverFillStyle ? (
        <div
          className={`${jamanaBaseClass} transition-opacity duration-200`}
          style={{ "--sig-size": JAMANA_SIZE, ...hoverFillStyle }}
        >
          JAMANA
        </div>
      ) : null}
    </div>
  );
}
