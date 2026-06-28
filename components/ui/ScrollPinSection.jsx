"use client";

import { motion, useMotionValueEvent } from "framer-motion";
import { softFadeUp } from "@/lib/motion";
import { useSectionScroll } from "@/lib/scroll";

export default function ScrollPinSection({
  id,
  children,
  className = "",
  pinHeightClass = "lg:h-[220vh]",
  bgClassName = "bg-green-abyss",
  onProgress,
}) {
  const { ref, scrollYProgress, smoothProgress, reducedMotion } = useSectionScroll();

  useMotionValueEvent(smoothProgress, "change", (value) => {
    onProgress?.(value);
  });

  if (reducedMotion) {
    return (
      <section
        id={id}
        className={`px-5 py-24 md:px-8 md:py-32 ${bgClassName} ${className}`}
      >
        {typeof children === "function"
          ? children({ progress: null, reducedMotion: true })
          : children}
      </section>
    );
  }

  return (
    <section
      id={id}
      ref={ref}
      className={`relative ${bgClassName} ${pinHeightClass} max-lg:px-5 max-lg:py-24 md:max-lg:px-8 md:max-lg:py-32 ${className}`}
    >
      <div className="max-lg:contents lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:justify-center lg:overflow-hidden lg:px-8">
        {typeof children === "function" ? (
          children({ progress: smoothProgress, reducedMotion: false })
        ) : (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-10%", amount: 0.3 }}
            variants={softFadeUp}
            className="w-full"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export function PinMobileFallback({ reducedMotion, children, className = "" }) {
  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-10%", amount: 0.3 }}
      variants={softFadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export { softFadeUp } from "@/lib/motion";
export { staticFade } from "@/lib/motion";
