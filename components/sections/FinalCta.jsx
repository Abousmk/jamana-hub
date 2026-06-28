"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { replayViewport, softFadeUp, softStagger, staticFade } from "@/lib/motion";
import { useLang } from "@/lib/i18n";
import { images } from "@/lib/images";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/imageConfig";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import GoldButton from "@/components/ui/GoldButton";
import Emblem from "@/components/ui/Emblem";

export default function FinalCta() {
  const { t, lang } = useLang();
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-green-deep via-green-deep to-green-abyss px-5 py-28 md:px-8 md:py-40">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src={images.finalCta.src}
          alt={images.finalCta.alt[lang]}
          fill
          quality={IMAGE_QUALITY.fullscreen}
          sizes={IMAGE_SIZES.full}
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-green-abyss/82" />
        <div className="absolute inset-0 bg-gradient-to-t from-green-abyss via-green-abyss/55 to-green-deep/30" />
      </div>

      <Emblem variant="watermark" />

      <motion.div
        variants={reducedMotion ? {} : softStagger}
        initial="hidden"
        whileInView="show"
        viewport={reducedMotion ? { once: true } : replayViewport}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <motion.div variants={reducedMotion ? staticFade : softFadeUp}>
          <SectionEyebrow>{t.finalCta.eyebrow}</SectionEyebrow>
        </motion.div>

        <motion.h2
          variants={reducedMotion ? staticFade : softFadeUp}
          className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.12] tracking-[-0.02em] text-cream"
        >
          {t.finalCta.title}
        </motion.h2>

        <motion.p
          variants={reducedMotion ? staticFade : softFadeUp}
          className="mt-6 font-body text-base text-cream/65 md:text-lg"
        >
          {t.finalCta.subtitle}
        </motion.p>

        <motion.div variants={reducedMotion ? staticFade : softFadeUp} className="mt-10">
          <GoldButton tally>{t.finalCta.cta}</GoldButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
