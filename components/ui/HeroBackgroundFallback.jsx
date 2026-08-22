"use client";

import Image from "next/image";
import WeavePattern from "@/components/ui/WeavePattern";
import { EMBLEM_SRC, IMAGE_QUALITY } from "@/lib/imageConfig";

/**
 * Always-visible hero backdrop (gradient + weave).
 * Used on mobile / reduced-motion / no-WebGL; also sits under GLSL hills on desktop.
 * Not gated on motionActive — animate only controls weave drift / shimmer.
 */
export default function HeroBackgroundFallback({
  className = "absolute inset-0 z-[1] h-full w-full",
  animate = true,
  isDesktop = false,
}) {
  // Default to mobile treatment until desktop is confirmed (SSR + first paint).
  const showMobileFallback = !isDesktop;

  return (
    <div className={className} aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0A1C15 0%, #0D251D 48%, #081510 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 100%, rgba(44,95,75,0.28), transparent 65%)",
        }}
      />

      <WeavePattern
        opacity={showMobileFallback ? 0.12 : 0.06}
        mobileMaxOpacity={0.12}
        animate={animate}
        className="z-[1]"
      />

      {showMobileFallback ? (
        <div className="absolute inset-0 z-[1] flex items-center justify-center">
          <Image
            src={EMBLEM_SRC}
            alt=""
            width={420}
            height={420}
            quality={IMAGE_QUALITY.emblem}
            sizes="280px"
            className="h-auto w-[min(70%,280px)] opacity-[0.06]"
          />
        </div>
      ) : null}

      <div
        className={`hero-fallback-shimmer absolute inset-0 z-[1] ${
          animate ? "" : "[animation:none]"
        } ${showMobileFallback ? "opacity-[0.08]" : "opacity-[0.05]"}`}
      />
    </div>
  );
}
