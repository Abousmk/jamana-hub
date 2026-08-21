"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { EASE, fadeUp } from "@/lib/motion";
import { useLang } from "@/lib/i18n";
import { withLocale } from "@/lib/locale";
import { useMotionActive } from "@/lib/useMotionActive";
import Emblem from "@/components/ui/Emblem";
import HeroBackgroundFallback from "@/components/ui/HeroBackgroundFallback";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import HeroScrollArrow from "@/components/ui/HeroScrollArrow";

const GLSLHills = dynamic(() => import("@/components/ui/GLSLHills"), { ssr: false });

const GOLD_WORD_INDEX = { fr: 2, en: 4 };
const DESKTOP_MQ = "(min-width: 769px)";

const staticFade = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};

function DelayedFade({ delay, children, disableMotion, motionKey }) {
  return (
    <motion.div
      key={motionKey}
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

function HeroTitle({ text, className, delay, disableMotion, motionKey, lang }) {
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
      key={motionKey}
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

function HeroCoords({ label, value, align = "left" }) {
  return (
    <div
      className={`flex max-w-[9.5rem] flex-col gap-1 sm:max-w-none ${
        align === "right" ? "items-end text-right" : "items-start text-left"
      }`}
    >
      <span className="font-util text-[0.625rem] uppercase tracking-[0.2em] text-cream/45 md:text-[0.6875rem]">
        {label}
      </span>
      <span className="font-util text-[0.625rem] uppercase tracking-[0.2em] text-cream/40 md:text-[0.6875rem]">
        {value}
      </span>
    </div>
  );
}

export default function Hero() {
  const { t, lang } = useLang();
  const { disableMotion, motionKey, mounted, motionActive } = useMotionActive();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (!mounted) return undefined;

    const mq = window.matchMedia(DESKTOP_MQ);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [mounted]);

  const showGlsl = mounted && isDesktop;

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] max-h-[100dvh] flex-col overflow-hidden bg-green-abyss"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <HeroBackgroundFallback animate={motionActive} isDesktop={isDesktop} />
        {showGlsl ? (
          <GLSLHills
            animate={motionActive}
            className="absolute inset-0 z-[2] h-full w-full"
          />
        ) : null}
      </div>

      {/* Centered stack only — bottom padding clears absolute coords / scroll cue */}
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 pt-16 pb-28 text-center sm:px-6 sm:pb-32 md:px-8 md:pb-36">
        <Emblem variant="hero" />

        <DelayedFade delay={0.45} disableMotion={disableMotion} motionKey={motionKey}>
          <SectionEyebrow className="mt-7">{t.hero.eyebrow}</SectionEyebrow>
        </DelayedFade>

        <HeroTitle
          text={t.hero.title}
          lang={lang}
          delay={0.55}
          disableMotion={disableMotion}
          motionKey={motionKey}
          className="title-display text-balance mt-4 font-display text-[clamp(2rem,7vw,4.5rem)] font-normal leading-[1.12] tracking-[-0.02em] drop-shadow-[0_2px_20px_rgba(10,28,21,0.75)]"
        />

        <DelayedFade delay={0.85} disableMotion={disableMotion} motionKey={motionKey}>
          <p className="text-pretty mt-5 max-w-[540px] font-body text-[0.95rem] leading-relaxed text-cream/70 md:text-lg">
            {t.hero.subtitle}
          </p>
        </DelayedFade>

        <DelayedFade delay={1.0} disableMotion={disableMotion} motionKey={motionKey}>
          <div className="mt-8 flex w-full justify-center sm:mt-9">
            <Link
              href={withLocale("/postuler", lang)}
              className="inline-flex min-h-11 w-full max-w-sm items-center justify-center gap-2 rounded-full border border-gold/40 bg-transparent px-6 py-3 font-util text-[0.75rem] uppercase tracking-[0.25em] text-cream/90 transition-[background-color,color,border-color,transform] duration-300 hover:border-gold hover:bg-gold hover:text-green-abyss focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green-abyss active:scale-[0.98] sm:w-auto sm:max-w-none sm:px-7 sm:text-[0.8125rem]"
            >
              <span>{t.hero.ctaPrimary}</span>
              <span aria-hidden="true" className="text-[0.9em]">
                ↗
              </span>
            </Link>
          </div>
        </DelayedFade>
      </div>

      {/* Bottom chrome — outside the text stack, never in the CTA flow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 px-4 sm:px-6 md:px-8">
        <div className="pointer-events-auto relative mx-auto flex max-w-[1400px] items-end justify-between gap-3 sm:gap-4">
          <DelayedFade delay={1.15} disableMotion={disableMotion} motionKey={motionKey}>
            <HeroCoords label={t.hero.coordMontrealLabel} value={t.hero.coordMontreal} />
          </DelayedFade>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <DelayedFade delay={1.2} disableMotion={disableMotion} motionKey={motionKey}>
              <HeroScrollArrow label={t.hero.scrollLabel} />
            </DelayedFade>
          </div>

          <DelayedFade delay={1.15} disableMotion={disableMotion} motionKey={motionKey}>
            <HeroCoords
              align="right"
              label={t.hero.coordMeccaLabel}
              value={t.hero.coordMecca}
            />
          </DelayedFade>
        </div>
      </div>
    </section>
  );
}
