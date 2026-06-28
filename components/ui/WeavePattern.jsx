"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useId, useState } from "react";
import { useMotionActive } from "@/lib/useMotionActive";

/** Tileable stair-step meander paths — horizontal + vertical interlace, 25px grid on 100×100 */
const WEAVE_PATHS = [
  "M0 25 H25 V0 H50 V25 H75 V50 H100 V25",
  "M25 0 V25 H0 V50 H25 V75 H50 V100",
  "M0 75 H25 V50 H50 V75 H75 V50 H100 V75",
  "M75 0 V25 H50 V0 H25 V25 H0 V50",
];

const PARALLAX_MAX = 32;
const LOOP_DURATION = 34;

export default function WeavePattern({
  opacity = 0.06,
  color = "#C8A951",
  tileSize = 100,
  className = "z-0",
}) {
  const patternId = useId().replace(/:/g, "");
  const { motionActive, mounted } = useMotionActive();
  const [effectiveOpacity, setEffectiveOpacity] = useState(opacity);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, PARALLAX_MAX]);

  useEffect(() => {
    if (!mounted) return undefined;

    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => {
      setEffectiveOpacity(mq.matches ? Math.min(opacity, 0.05) : opacity);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [opacity, mounted]);

  const layerStyle = { opacity: effectiveOpacity };

  const pattern = (
    <svg
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={patternId}
          width={tileSize}
          height={tileSize}
          patternUnits="userSpaceOnUse"
        >
          {WEAVE_PATHS.map((d) => (
            <path
              key={d}
              d={d}
              fill="none"
              stroke={color}
              strokeWidth="1"
              strokeLinecap="square"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );

  const bleed = tileSize;

  return (
    <div
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    >
      {motionActive ? (
        <motion.div
          className="absolute will-change-transform"
          style={{
            top: -bleed,
            right: -bleed,
            bottom: -bleed,
            left: -bleed,
            ...layerStyle,
          }}
          initial={{ x: 0, y: 0 }}
          animate={{ x: tileSize, y: tileSize }}
          transition={{
            duration: LOOP_DURATION,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <motion.div className="h-full w-full will-change-transform" style={{ y }}>
            {pattern}
          </motion.div>
        </motion.div>
      ) : (
        <div className="absolute inset-0" style={layerStyle}>
          {pattern}
        </div>
      )}
    </div>
  );
}
