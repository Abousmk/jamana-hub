"use client";

import { useMotionActive } from "@/lib/useMotionActive";
import WeavePattern from "@/components/ui/WeavePattern";

export default function HeroBackgroundFallback({
  className = "absolute inset-0 z-[1] h-full w-full",
  animate = true,
  isDesktop = false,
}) {
  const { mounted } = useMotionActive();
  const isMobile = mounted && !isDesktop;

  return (
    <div className={className} aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-green-abyss via-green-deep to-[#081510]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_100%,rgba(44,95,75,0.22),transparent_65%)]" />
      {isMobile ? (
        <WeavePattern
          opacity={0.12}
          mobileMaxOpacity={0.12}
          animate={animate}
          className="z-[1]"
        />
      ) : null}
      {mounted ? (
        <div
          className={`hero-fallback-shimmer absolute inset-0 z-[1] ${isMobile ? "opacity-[0.07]" : "opacity-[0.05]"}`}
        />
      ) : null}
    </div>
  );
}
