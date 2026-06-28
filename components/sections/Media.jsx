"use client";

import { motion, useReducedMotion } from "framer-motion";
import { replayViewport, softFadeUp, softStagger, staticFade } from "@/lib/motion";
import { useLang } from "@/lib/i18n";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function Media() {
  const { t } = useLang();
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="media"
      className="bg-gradient-to-b from-green-abyss via-green-abyss to-green-deep px-5 py-24 md:px-8 md:py-32"
    >
      <motion.div
        variants={reducedMotion ? {} : softStagger}
        initial="hidden"
        whileInView="show"
        viewport={reducedMotion ? { once: true } : replayViewport}
        className="mx-auto max-w-6xl"
      >
        <motion.div variants={reducedMotion ? staticFade : softFadeUp}>
          <SectionEyebrow>{t.media.eyebrow}</SectionEyebrow>
        </motion.div>

        <motion.h2
          variants={reducedMotion ? staticFade : softFadeUp}
          className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.12] tracking-[-0.02em] text-cream"
        >
          {t.media.title}
        </motion.h2>

        <motion.p
          variants={reducedMotion ? staticFade : softFadeUp}
          className="mt-4 max-w-2xl font-body text-base text-cream/65 md:text-lg"
        >
          {t.media.subtitle}
        </motion.p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {t.media.items.map((item) => (
            <motion.article
              key={item.title}
              variants={reducedMotion ? staticFade : softFadeUp}
              className="relative flex flex-col rounded-sm bg-green-deep/50 p-8"
            >
              <span className="absolute right-6 top-6 font-util text-[0.6rem] uppercase tracking-[0.14em] text-gold/70">
                {item.status}
              </span>
              <h3 className="pr-20 font-display text-xl text-cream md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-4 flex-1 font-body text-sm leading-relaxed text-cream/60 md:text-base">
                {item.description}
              </p>
              <p className="mt-8 font-util text-[0.65rem] uppercase tracking-[0.12em] text-cream/35">
                {item.status}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
