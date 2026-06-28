"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${8 + ((i * 17.3) % 84)}%`,
  top: `${12 + ((i * 23.7) % 76)}%`,
  size: 2 + (i % 3),
  opacity: 0.06 + (i % 5) * 0.025,
  delay: (i % 6) * 0.4,
}));

export default function CloserGlow({ mouseX, mouseY, interactive }) {
  const reducedMotion = useReducedMotion();
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 22 });

  const glowBackground = useTransform(
    [smoothX, smoothY],
    ([x, y]) =>
      `radial-gradient(520px circle at ${x * 100}% ${y * 100}%, rgba(200,169,81,0.14), transparent 68%)`
  );

  const particles = useMemo(() => PARTICLES, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {interactive ? (
        <motion.div className="absolute inset-0" style={{ background: glowBackground }} />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(200,169,81,0.08), transparent 70%)",
          }}
        />
      )}

      {particles.map((p) =>
        reducedMotion ? (
          <span
            key={p.id}
            className="absolute rounded-full bg-gold"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
            }}
          />
        ) : (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-gold"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
            }}
            animate={{ y: [0, -6, 0], opacity: [p.opacity, p.opacity * 1.6, p.opacity] }}
            transition={{
              duration: 4.5 + (p.id % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        )
      )}
    </div>
  );
}

export function useCloserGlow() {
  const reducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const interactive = isDesktop && !reducedMotion;

  const handleMouseMove = (e) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return { mouseX, mouseY, interactive, handleMouseMove, handleMouseLeave };
}
