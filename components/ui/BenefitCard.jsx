"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { replayViewport, softFadeUp } from "@/lib/motion";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/imageConfig";

const staticFade = { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };

export default function BenefitCard({ title, description, index, imageSrc, imageAlt }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={reducedMotion ? staticFade : softFadeUp}
      initial="hidden"
      whileInView="show"
      viewport={reducedMotion ? { once: true } : replayViewport}
      className="group flex flex-col overflow-hidden rounded-sm border border-green-line bg-green-abyss/50 transition-[transform,opacity] duration-500 hover:border-gold/25"
    >
      {imageSrc && (
        <div className="relative h-36 overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            quality={IMAGE_QUALITY.card}
            sizes={IMAGE_SIZES.card}
            className="object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-green-abyss via-green-abyss/50 to-transparent"
            aria-hidden="true"
          />
          <span className="absolute left-4 top-4 font-util text-xs text-gold/80">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 md:p-8">
        {!imageSrc && (
          <span className="font-util text-xs text-gold/60">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <h3 className={`font-display text-xl text-cream md:text-2xl ${imageSrc ? "mt-0" : "mt-4"}`}>
          {title}
        </h3>
        <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-cream/70 md:text-base">
          {description}
        </p>
        <div className="mt-6 h-px w-8 bg-gold/40 transition-[transform,opacity] duration-500 group-hover:w-12 group-hover:bg-gold/70" />
      </div>
    </motion.div>
  );
}
