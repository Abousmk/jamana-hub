"use client";

import Image from "next/image";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { images } from "@/lib/images";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/imageConfig";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import ScrollPinSection, { PinMobileFallback } from "@/components/ui/ScrollPinSection";
import { useScrollFade } from "@/lib/scroll";

function CriterionPin({ item, progress, start, end }) {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [20, 0]);

  return (
    <motion.li style={{ opacity, y }} className="flex gap-4 pb-5 font-body text-sm text-cream/75 md:text-base">
      <span
        className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-gold/10 font-util text-[0.6rem] text-gold"
        aria-hidden="true"
      >
        ✓
      </span>
      {item}
    </motion.li>
  );
}

function ExclusivePinContent({ progress, t }) {
  const headerOpacity = useScrollFade(progress, [0, 0.12], [0.7, 0.88]);
  const headerY = useTransform(progress, [0, 0.15], [28, 0]);
  const criteria = t.exclusive.criteria;
  const spread = 0.58 / criteria.length;

  const closingOpacity = useTransform(progress, [0.78, 0.92], [0, 1]);
  const closingY = useTransform(progress, [0.78, 0.92], [16, 0]);

  return (
    <div className="mx-auto w-full max-w-3xl px-5 text-center md:px-8">
      <motion.div style={{ opacity: headerOpacity, y: headerY }}>
        <SectionEyebrow>{t.exclusive.eyebrow}</SectionEyebrow>
        <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.15] tracking-[-0.02em] text-cream">
          {t.exclusive.title}
        </h2>
        <p className="mt-6 font-body text-base text-cream/65 md:text-lg">
          {t.exclusive.intro}
        </p>
      </motion.div>

      <ul className="mt-12 space-y-5 text-left">
        {criteria.map((item, i) => {
          const start = 0.14 + i * spread;
          const end = start + spread * 0.7;
          return (
            <CriterionPin key={item} item={item} progress={progress} start={start} end={end} />
          );
        })}
      </ul>

      <motion.p
        style={{ opacity: closingOpacity, y: closingY }}
        className="mt-12 font-display text-lg italic text-gold-light md:text-xl"
      >
        {t.exclusive.closing}
      </motion.p>
    </div>
  );
}

function ExclusiveStaticContent({ t }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <SectionEyebrow>{t.exclusive.eyebrow}</SectionEyebrow>
      <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.15] tracking-[-0.02em] text-cream">
        {t.exclusive.title}
      </h2>
      <p className="mt-6 font-body text-base text-cream/65 md:text-lg">
        {t.exclusive.intro}
      </p>
      <ul className="mt-12 space-y-5 text-left">
        {t.exclusive.criteria.map((item) => (
          <li key={item} className="flex gap-4 pb-5 font-body text-sm text-cream/75 md:text-base">
            <span
              className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-gold/10 font-util text-[0.6rem] text-gold"
              aria-hidden="true"
            >
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-12 font-display text-lg italic text-gold-light md:text-xl">
        {t.exclusive.closing}
      </p>
    </div>
  );
}

export default function ExclusiveFilter() {
  const { t, lang } = useLang();
  const reducedMotion = useReducedMotion();

  return (
    <ScrollPinSection
      pinHeightClass="lg:h-[300vh]"
      bgClassName="relative bg-gradient-to-b from-green-deep via-green-abyss to-green-abyss"
    >
      {({ progress, reducedMotion: rm }) => (
        <>
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <Image
              src={images.exclusiveFilter.src}
              alt={images.exclusiveFilter.alt[lang]}
              fill
              quality={IMAGE_QUALITY.fullscreen}
              sizes={IMAGE_SIZES.full}
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-green-abyss/86" />
          </div>

          <div className="relative z-10 lg:hidden">
            <PinMobileFallback reducedMotion={rm || reducedMotion}>
              <ExclusiveStaticContent t={t} />
            </PinMobileFallback>
          </div>
          <div className="relative z-10 hidden lg:block">
            {progress ? <ExclusivePinContent progress={progress} t={t} /> : null}
          </div>
        </>
      )}
    </ScrollPinSection>
  );
}
