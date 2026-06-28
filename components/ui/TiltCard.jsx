"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const MAX_TILT = 8;
const SPRING = { stiffness: 280, damping: 28 };

export default function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [hovered, setHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);

  const springRotateX = useSpring(rotateX, SPRING);
  const springRotateY = useSpring(rotateY, SPRING);
  const springScale = useSpring(scale, SPRING);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const enableTilt = isDesktop && !reducedMotion;

  const handleMouseMove = (e) => {
    if (!enableTilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * MAX_TILT * 2);
    rotateX.set(-y * MAX_TILT * 2);
    scale.set(1.02);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  const handleMouseEnter = () => {
    if (enableTilt) setHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={enableTilt ? handleMouseMove : undefined}
      onMouseEnter={enableTilt ? handleMouseEnter : undefined}
      onMouseLeave={enableTilt ? handleMouseLeave : undefined}
      style={
        enableTilt
          ? {
              rotateX: springRotateX,
              rotateY: springRotateY,
              scale: springScale,
              transformPerspective: 900,
              transformStyle: "preserve-3d",
            }
          : undefined
      }
      className={`${className} ${
        hovered
          ? "shadow-[0_20px_50px_rgba(10,28,21,0.55)]"
          : "shadow-[0_8px_24px_rgba(10,28,21,0.25)]"
      }`}
    >
      {children}
    </motion.div>
  );
}
