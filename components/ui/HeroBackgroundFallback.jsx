"use client";

import { useEffect, useState } from "react";
import { useMotionActive } from "@/lib/useMotionActive";
import WeavePattern from "@/components/ui/WeavePattern";

export default function HeroBackgroundFallback({
  className = "absolute inset-0 h-full w-full",
  animate = true,
}) {
  const { mounted, motionActive } = useMotionActive();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!mounted) return undefined;

    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [mounted]);

  const showWeave = mounted && animate && motionActive && isMobile;

  return (
    <div className={className} aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-green-abyss via-[#0d251d] to-green-abyss" />
      {showWeave ? <WeavePattern opacity={0.07} className="z-[1]" /> : null}
      {mounted && animate && motionActive && !isMobile ? (
        <div className="hero-fallback-shimmer absolute inset-0 z-[1] opacity-[0.04]" />
      ) : null}
    </div>
  );
}
