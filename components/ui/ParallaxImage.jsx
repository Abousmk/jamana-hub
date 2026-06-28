"use client";

import Image from "next/image";
import { motion, useTransform } from "framer-motion";
import { useSectionScroll, useParallaxY } from "@/lib/scroll";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/imageConfig";

export function SectionImage({
  src,
  alt,
  priority = false,
  overlayClassName = "bg-green-abyss/85",
  className = "",
  imageClassName = "object-cover",
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={IMAGE_QUALITY.section}
        sizes={IMAGE_SIZES.section}
        className={imageClassName}
      />
      <div
        className={`pointer-events-none absolute inset-0 ${overlayClassName}`}
        aria-hidden="true"
      />
    </div>
  );
}

export function ParallaxImageBand({
  src,
  alt,
  overlayClassName = "bg-green-abyss/80",
  heightClassName = "h-48 md:h-64 lg:h-72",
}) {
  const { ref, smoothProgress, reducedMotion: rm } = useSectionScroll({
    offset: ["start end", "end start"],
  });
  const y = useParallaxY(smoothProgress, [0, 1], rm ? [0, 0] : [24, -24]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${heightClassName}`}>
      <motion.div className="absolute inset-0" style={rm ? {} : { y, opacity }}>
        <Image
          src={src}
          alt={alt}
          fill
          quality={IMAGE_QUALITY.fullscreen}
          sizes={IMAGE_SIZES.full}
          className="object-cover"
        />
      </motion.div>
      <div
        className={`pointer-events-none absolute inset-0 ${overlayClassName}`}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-green-deep to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-green-deep to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}

export function ScrollParallaxBackground({ src, alt, progress, overlayClassName = "bg-green-abyss/88" }) {
  const y = useParallaxY(progress, [0, 1], [0, -48]);
  const opacity = useTransform(progress, [0, 0.15, 0.85, 1], [0.55, 0.75, 0.75, 0.55]);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ opacity }}
      aria-hidden="true"
    >
      <motion.div className="absolute inset-[-10%]" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill
          quality={IMAGE_QUALITY.fullscreen}
          sizes={IMAGE_SIZES.full}
          className="object-cover"
        />
      </motion.div>
      <div className={`absolute inset-0 ${overlayClassName}`} />
    </motion.div>
  );
}
