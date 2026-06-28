"use client";

import { motion } from "framer-motion";
import { EASE, fadeUp } from "@/lib/motion";
import { useLang } from "@/lib/i18n";
import { useMotionActive } from "@/lib/useMotionActive";
import Emblem from "@/components/ui/Emblem";
import GLSLHills from "@/components/ui/GLSLHills";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import HeroScrollArrow from "@/components/ui/HeroScrollArrow";

const GOLD_WORD_INDEX = { fr: 2, en: 4 };

const staticFade = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};

function DelayedFade({ delay, children, disableMotion }) {
  return (
    <motion.div
      variants={disableMotion ? staticFade : fadeUp}
      initial={disableMotion ? "show" : "hidden"}
      animate="show"
      transition={
        disableMotion ? undefined : { delay, duration: 0.7, ease: EASE }
      }
    >
      {children}
    </motion.div>
  );
}

function HeroTitle({ text, className, delay, disableMotion, lang }) {
  const words = text.trim().split(/ +/).filter(Boolean);
  const goldIndex = GOLD_WORD_INDEX[lang] ?? 2;

  if (disableMotion) {
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
  const { disableMotion } = useMotionActive();

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] max-h-[100dvh] items-center justify-center overflow-hidden bg-green-abyss px-4 pt-16 pb-14 sm:px-6 md:px-8"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <GLSLHills />
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <Emblem variant="hero" />

        <DelayedFade delay={0.45} disableMotion={disableMotion}>
          <SectionEyebrow className="mt-7">{t.hero.eyebrow}</SectionEyebrow>
        </DelayedFade>

        <HeroTitle
          text={t.hero.title}
          lang={lang}
          delay={0.55}
          disableMotion={disableMotion}
          className="title-display text-balance mt-4 font-display text-[clamp(2rem,7vw,4.5rem)] font-normal leading-[1.12] tracking-[-0.02em] drop-shadow-[0_2px_20px_rgba(10,28,21,0.75)]"
        />

        <DelayedFade delay={0.85} disableMotion={disableMotion}>
          <p className="text-pretty mt-5 max-w-[540px] font-body text-[0.95rem] leading-relaxed text-cream/70 md:text-lg">
            {t.hero.subtitle}
          </p>
        </DelayedFade>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 sm:bottom-8">
        <DelayedFade delay={1.05} disableMotion={disableMotion}>
          <HeroScrollArrow label={t.hero.scrollLabel} />
        </DelayedFade>
      </div>
    </section>
  );
}
