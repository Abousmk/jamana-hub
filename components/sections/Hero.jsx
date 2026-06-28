"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE, fadeUp } from "@/lib/motion";
import { useLang } from "@/lib/i18n";
import Emblem from "@/components/ui/Emblem";
import GLSLHills from "@/components/ui/GLSLHills";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import HeroScrollArrow from "@/components/ui/HeroScrollArrow";

const GOLD_WORD_INDEX = { fr: 2, en: 4 };

const staticFade = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};

function DelayedFade({ delay, children, reducedMotion }) {
  return (
    <motion.div
      variants={reducedMotion ? staticFade : fadeUp}
      initial="hidden"
      animate="show"
      transition={
        reducedMotion ? undefined : { delay, duration: 0.7, ease: EASE }
      }
    >
      {children}
    </motion.div>
  );
}

function HeroTitle({ text, className, delay, reducedMotion, lang }) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const goldIndex = GOLD_WORD_INDEX[lang] ?? 2;

  if (reducedMotion) {
    return (
      <h1 className={className}>
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className={i === goldIndex ? "text-gold" : "text-cream"}>
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </h1>
    );
  }

  return (
    <motion.h1
      variants={fadeUp}
      initial="hidden"
      animate="show"
      transition={{ delay, duration: 0.7, ease: EASE }}
      className={className}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className={i === goldIndex ? "text-gold" : "text-cream"}>
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </motion.h1>
  );
}

export default function Hero() {
  const { t, lang } = useLang();
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-green-abyss px-5 pt-16 md:px-8"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <GLSLHills />
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <Emblem variant="hero" />

        <DelayedFade delay={0.45} reducedMotion={reducedMotion}>
          <SectionEyebrow className="mt-7">{t.hero.eyebrow}</SectionEyebrow>
        </DelayedFade>

        <HeroTitle
          text={t.hero.title}
          lang={lang}
          delay={0.55}
          reducedMotion={reducedMotion}
          className="mt-4 font-display text-[clamp(2.25rem,7.5vw,4.5rem)] font-normal leading-[1.12] tracking-[-0.02em] drop-shadow-[0_2px_20px_rgba(10,28,21,0.75)]"
        />

        <DelayedFade delay={0.85} reducedMotion={reducedMotion}>
          <p className="mt-5 max-w-[540px] font-body text-[0.95rem] leading-relaxed text-cream/70 md:text-lg">
            {t.hero.subtitle}
          </p>
        </DelayedFade>

        <DelayedFade delay={1.05} reducedMotion={reducedMotion}>
          <div className="mt-9">
            <HeroScrollArrow label={t.hero.scrollLabel} />
          </div>
        </DelayedFade>
      </div>

      <div
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        aria-hidden="true"
      >
        {!reducedMotion ? (
          <motion.div
            className="h-10 w-px origin-top bg-gradient-to-b from-gold/50 via-gold/25 to-transparent"
            animate={{ scaleY: [0.6, 1, 0.6], opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : (
          <div className="h-10 w-px bg-gradient-to-b from-gold/40 to-transparent opacity-50" />
        )}
      </div>
    </section>
  );
}
