"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useTransform } from "framer-motion";
import { replayViewport, softFadeUp, staticFade } from "@/lib/motion";
import { useLang } from "@/lib/i18n";
import { images } from "@/lib/images";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import StatCounter from "@/components/ui/StatCounter";
import ScrollPinSection, { PinMobileFallback } from "@/components/ui/ScrollPinSection";
import { ParallaxImageBand } from "@/components/ui/ParallaxImage";
import { useScrollFade } from "@/lib/scroll";

function StatItem({ value, label, detail, reducedMotion, active }) {
  return (
    <motion.div
      variants={reducedMotion ? staticFade : softFadeUp}
      className="rounded-sm bg-green-abyss/30 p-6 md:p-8"
    >
      <StatCounter
        value={value}
        active={active}
        className="block font-display text-3xl text-gold md:text-4xl"
      />
      <p className="mt-2 font-util text-xs uppercase tracking-[0.12em] text-cream">
        {label}
      </p>
      <p className="mt-1 font-body text-sm text-cream/50">{detail}</p>
    </motion.div>
  );
}

function StatsPinContent({ progress, t, reducedMotion, onCountersReady }) {
  useMotionValueEvent(progress, "change", (v) => {
    if (v > 0.38) onCountersReady();
  });

  const headlineOpacity = useScrollFade(progress);
  const headlineY = useTransform(progress, [0, 0.2], [32, 0]);
  const gridOpacity = useTransform(progress, [0.35, 0.55], [0, 1]);
  const gridY = useTransform(progress, [0.35, 0.55], [24, 0]);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
      <motion.div style={{ opacity: headlineOpacity, y: headlineY }}>
        <SectionEyebrow>{t.stats.eyebrow}</SectionEyebrow>
        <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.12] tracking-[-0.02em] text-cream">
          {t.stats.title}
        </h2>
        <p className="mt-4 max-w-2xl font-body text-base text-cream/65 md:text-lg">
          {t.stats.subtitle}
        </p>
      </motion.div>

      <motion.div style={{ opacity: gridOpacity, y: gridY }} className="mt-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {t.stats.items.map((item) => (
            <StatItem key={item.label} {...item} reducedMotion={reducedMotion} active />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function StatsMobileBody({ t, reducedMotion }) {
  return (
    <div className="mx-auto max-w-6xl">
      <SectionEyebrow>{t.stats.eyebrow}</SectionEyebrow>
      <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.12] tracking-[-0.02em] text-cream">
        {t.stats.title}
      </h2>
      <p className="mt-4 max-w-2xl font-body text-base text-cream/65 md:text-lg">
        {t.stats.subtitle}
      </p>
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {t.stats.items.map((item) => (
          <StatItem key={item.label} {...item} reducedMotion={reducedMotion} />
        ))}
      </div>
    </div>
  );
}

function StatsMarketSection({ t, reducedMotion }) {
  return (
    <motion.div
      variants={reducedMotion ? staticFade : softFadeUp}
      initial="hidden"
      whileInView="show"
      viewport={reducedMotion ? { once: true } : replayViewport}
      className="mx-auto max-w-6xl px-5 md:px-8"
    >
      <h3 className="font-display text-2xl text-cream md:text-3xl">
        {t.stats.marketTitle}
      </h3>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {t.stats.market.map((item) => (
          <StatItem key={item.label} {...item} reducedMotion={reducedMotion} />
        ))}
      </div>
      <p className="mt-8 font-body text-base text-cream/60 md:text-lg">
        {t.stats.goal}
      </p>
    </motion.div>
  );
}

export default function Stats() {
  const { t, lang } = useLang();
  const reducedMotion = useReducedMotion();
  const [, setCountersActive] = useState(false);

  const handleCountersReady = () => setCountersActive(true);

  return (
    <>
      <ScrollPinSection
        pinHeightClass="lg:h-[240vh]"
        bgClassName="bg-gradient-to-b from-green-abyss via-green-abyss to-green-deep"
      >
        {({ progress, reducedMotion: rm }) => (
          <>
            <div className="lg:hidden">
              <PinMobileFallback reducedMotion={rm || reducedMotion}>
                <StatsMobileBody t={t} reducedMotion={rm || reducedMotion} />
              </PinMobileFallback>
            </div>
            <div className="hidden lg:block">
              {progress && !rm ? (
                <StatsPinContent
                  progress={progress}
                  t={t}
                  reducedMotion={rm}
                  onCountersReady={handleCountersReady}
                />
              ) : (
                <StatsMobileBody t={t} reducedMotion={rm} />
              )}
            </div>
          </>
        )}
      </ScrollPinSection>

      <ParallaxImageBand
        src={images.statsBand.src}
        alt={images.statsBand.alt[lang]}
        overlayClassName="bg-green-abyss/78"
      />

      <section className="bg-gradient-to-b from-green-deep to-green-abyss pb-24 md:pb-32">
        <StatsMarketSection t={t} reducedMotion={reducedMotion} />
      </section>
    </>
  );
}
