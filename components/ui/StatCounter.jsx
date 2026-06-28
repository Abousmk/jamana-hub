"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

function parseValue(value) {
  const str = String(value);
  if (str.includes("–") || /\d\s*-\s*\d/.test(str)) {
    return { isRange: true };
  }
  const prefix = str.match(/^[^\d]*/)?.[0] ?? "";
  const suffix = str.match(/[^\d.,\s]*$/)?.[0] ?? "";
  const numStr = str.replace(/[^\d.,]/g, "").replace(",", ".");
  const numeric = parseFloat(numStr);
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { prefix, suffix, numeric, decimals, isValid: !Number.isNaN(numeric) };
}

export default function StatCounter({ value, className = "", active }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reducedMotion = useReducedMotion();
  const parsed = parseValue(value);
  const [display, setDisplay] = useState(value);
  const shouldAnimate = active !== undefined ? active : inView;

  useEffect(() => {
    if (!shouldAnimate) return;

    if (parsed.isRange || reducedMotion || !parsed.isValid) {
      setDisplay(value);
      return;
    }

    const { prefix, suffix, numeric, decimals } = parsed;
    const duration = 1800;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numeric * eased;
      const formatted =
        decimals > 0
          ? current.toFixed(decimals).replace(".", ",")
          : Math.round(current).toLocaleString("fr-CA");
      setDisplay(`${prefix}${formatted}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [shouldAnimate, reducedMotion, value, parsed]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: reducedMotion ? 0 : 0.6, ease: EASE }}
    >
      {display}
    </motion.span>
  );
}
