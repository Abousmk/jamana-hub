"use client";

import { motion, useReducedMotion } from "framer-motion";
import { replayViewport, softFadeUp, softStagger, staticFade } from "@/lib/motion";
import { useLang } from "@/lib/i18n";
import { images } from "@/lib/images";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { SectionImage } from "@/components/ui/ParallaxImage";

export default function About() {
  const { t, lang } = useLang();
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-green-deep via-green-deep to-green-abyss px-5 py-24 md:px-8 md:py-32"
    >
      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-64 w-64 rounded-full bg-gold/5 blur-3xl"
        aria-hidden="true"
      />

      <motion.div
        variants={reducedMotion ? {} : softStagger}
        initial="hidden"
        whileInView="show"
        viewport={reducedMotion ? { once: true } : replayViewport}
        className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16"
      >
        <motion.div variants={reducedMotion ? staticFade : softFadeUp} className="relative">
          <SectionImage
            src={images.about.src}
            alt={images.about.alt[lang]}
            className="aspect-[4/5] rounded-sm lg:aspect-[3/4]"
            overlayClassName="bg-gradient-to-t from-green-abyss/90 via-green-abyss/40 to-green-abyss/20"
          />
          <div
            className="pointer-events-none absolute -bottom-3 -right-3 hidden h-full w-full rounded-sm border border-gold/20 lg:block"
            aria-hidden="true"
          />
        </motion.div>

        <div>
          <motion.div variants={reducedMotion ? staticFade : softFadeUp}>
            <SectionEyebrow>{t.about.eyebrow}</SectionEyebrow>
          </motion.div>

          <motion.h2
            variants={reducedMotion ? staticFade : softFadeUp}
            className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.12] tracking-[-0.02em] text-cream"
          >
            {t.about.title}
          </motion.h2>

          <motion.p
            variants={reducedMotion ? staticFade : softFadeUp}
            className="mt-6 font-display text-xl italic text-gold-light md:text-2xl"
          >
            {t.about.tagline}
          </motion.p>

          <motion.p
            variants={reducedMotion ? staticFade : softFadeUp}
            className="mt-8 font-body text-base leading-relaxed text-cream/80 md:text-lg"
          >
            {t.about.body}
          </motion.p>

          <motion.div
            variants={reducedMotion ? staticFade : softFadeUp}
            className="mt-12 rounded-sm border border-gold/15 bg-green-abyss/40 p-6 md:p-8"
          >
            <p className="font-util text-xs uppercase tracking-[0.14em] text-gold">
              {t.about.visionLabel}
            </p>
            <p className="mt-3 font-body text-base leading-relaxed text-cream/75 md:text-lg">
              {t.about.vision}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
