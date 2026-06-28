"use client";

import { motion } from "framer-motion";
import { EASE, replayViewport, sectionFadeUp, softFadeUp, softStagger, staticFade } from "@/lib/motion";
import { useLang } from "@/lib/i18n";
import { useMotionActive } from "@/lib/useMotionActive";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import GoldButton from "@/components/ui/GoldButton";

export default function Testimonials() {
  const { t } = useLang();
  const { disableMotion, motionKey } = useMotionActive();

  return (
    <motion.section
      key={motionKey}
      variants={disableMotion ? staticFade : sectionFadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={disableMotion ? undefined : { duration: 0.7, ease: EASE }}
      className="relative w-full overflow-hidden bg-gradient-to-b from-green-abyss/90 via-green-deep/72 to-green-abyss/90 px-4 py-10 sm:px-6 md:py-12 lg:px-8"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent"
        aria-hidden="true"
      />

      <motion.div
        variants={disableMotion ? {} : softStagger}
        initial="hidden"
        whileInView="show"
        viewport={disableMotion ? { once: true } : replayViewport}
        className="relative mx-auto max-w-2xl text-center"
      >
        <motion.div variants={disableMotion ? staticFade : softFadeUp}>
          <SectionEyebrow>{t.testimonials.eyebrow}</SectionEyebrow>
        </motion.div>

        <motion.h2
          variants={disableMotion ? staticFade : softFadeUp}
          className="title-display text-balance mt-3 font-display text-[clamp(1.5rem,4vw,2.25rem)] leading-[1.15] tracking-[-0.02em] text-cream"
        >
          {t.testimonials.title}
        </motion.h2>

        <motion.div
          variants={disableMotion ? staticFade : softFadeUp}
          className="relative mx-auto mt-8 px-4 md:mt-10"
        >
          <span
            className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 font-display text-[5rem] leading-none text-gold/15 md:text-[6rem]"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <div className="relative rounded-sm border border-gold/15 bg-green-deep/40 px-6 py-8 backdrop-blur-[2px] md:px-10 md:py-9">
            <p className="text-pretty font-body text-sm leading-relaxed text-cream/65 md:text-base">
              {t.testimonials.message}
            </p>

            <div
              className="mx-auto mt-7 flex items-center justify-center gap-3"
              aria-hidden="true"
            >
              <span className="h-px w-8 bg-gold/30" />
              <span className="h-1 w-1 rotate-45 bg-gold/50" />
              <span className="h-px w-8 bg-gold/30" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={disableMotion ? staticFade : softFadeUp}
          className="mt-8"
        >
          <p className="font-body text-xs text-cream/45 md:text-sm">
            {t.testimonials.hint}
          </p>
          <div className="mt-4">
            <GoldButton tally className="!px-6 !py-2.5 !text-[0.65rem]">
              {t.testimonials.cta}
            </GoldButton>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
