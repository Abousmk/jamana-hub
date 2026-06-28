"use client";

import Image from "next/image";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { replayViewport, softFadeUp, staticFade } from "@/lib/motion";
import { useLang } from "@/lib/i18n";
import { images } from "@/lib/images";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import ScrollPinSection, { PinMobileFallback } from "@/components/ui/ScrollPinSection";
import { useScrollFade } from "@/lib/scroll";

function PillarPin({ pillar, index, opacity, y }) {
  return (
    <motion.div style={{ opacity, y }} className="pt-4">
      <span className="font-util text-xs text-gold/50">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-3 font-display text-2xl text-cream md:text-3xl">
        {pillar.title}
      </h3>
      <p className="mt-4 font-body text-sm leading-relaxed text-cream/65 md:text-base">
        {pillar.description}
      </p>
    </motion.div>
  );
}

function ManifestePinContent({ progress, t }) {
  const introOpacity = useScrollFade(progress, [0, 0.1], [0.65, 0.85]);
  const introY = useTransform(progress, [0, 0.12], [24, 0]);

  const pillarOpacities = [
    useTransform(progress, [0.14, 0.28], [0, 1]),
    useTransform(progress, [0.32, 0.46], [0, 1]),
    useTransform(progress, [0.5, 0.64], [0, 1]),
  ];
  const pillarYs = [
    useTransform(progress, [0.14, 0.28], [28, 0]),
    useTransform(progress, [0.32, 0.46], [28, 0]),
    useTransform(progress, [0.5, 0.64], [28, 0]),
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
      <motion.div style={{ opacity: introOpacity, y: introY }}>
        <SectionEyebrow>{t.manifeste.eyebrow}</SectionEyebrow>
        <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.12] tracking-[-0.02em] text-cream">
          {t.manifeste.title}
        </h2>
        <p className="mt-6 max-w-3xl font-body text-base leading-relaxed text-cream/75 md:text-lg">
          {t.manifeste.intro}
        </p>
      </motion.div>

      <div className="mt-16 grid gap-10 md:grid-cols-3">
        {t.manifeste.pillars.map((pillar, i) => (
          <PillarPin
            key={pillar.title}
            pillar={pillar}
            index={i}
            opacity={pillarOpacities[i]}
            y={pillarYs[i]}
          />
        ))}
      </div>
    </div>
  );
}

function ManifesteStaticIntro({ t, pillarsOnly = false }) {
  return (
    <div className="mx-auto max-w-6xl">
      <SectionEyebrow>{t.manifeste.eyebrow}</SectionEyebrow>
      <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.12] tracking-[-0.02em] text-cream">
        {t.manifeste.title}
      </h2>
      <p className="mt-6 max-w-3xl font-body text-base leading-relaxed text-cream/75 md:text-lg">
        {t.manifeste.intro}
      </p>
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {t.manifeste.pillars.map((pillar, i) => (
          <div key={pillar.title} className="pt-4">
            <span className="font-util text-xs text-gold/50">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-display text-2xl text-cream md:text-3xl">
              {pillar.title}
            </h3>
            <p className="mt-4 font-body text-sm leading-relaxed text-cream/65 md:text-base">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
      {!pillarsOnly && <ManifesteMission t={t} />}
    </div>
  );
}

function ManifesteMission({ t, reducedMotion }) {
  return (
    <motion.div
      variants={reducedMotion ? staticFade : softFadeUp}
      initial="hidden"
      whileInView="show"
      viewport={reducedMotion ? { once: true } : replayViewport}
      className="mt-20 rounded-sm bg-green-abyss/40 p-8 md:p-12"
    >
      <h3 className="font-display text-2xl text-cream md:text-3xl">
        {t.manifeste.missionTitle}
      </h3>
      <ol className="mt-8 space-y-5">
        {t.manifeste.mission.map((item, i) => (
          <li
            key={item}
            className="flex gap-5 font-body text-sm text-cream/70 md:text-base"
          >
            <span className="font-util text-xs text-gold">{String(i + 1).padStart(2, "0")}</span>
            {item}
          </li>
        ))}
      </ol>
    </motion.div>
  );
}

export default function Manifeste() {
  const { t, lang } = useLang();
  const reducedMotion = useReducedMotion();

  return (
    <>
      <ScrollPinSection
        id="manifeste"
        pinHeightClass="lg:h-[320vh]"
        bgClassName="relative bg-gradient-to-b from-green-abyss via-green-deep to-green-deep"
      >
        {({ progress, reducedMotion: rm }) => (
          <>
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
              <Image
                src={images.manifeste.src}
                alt={images.manifeste.alt[lang]}
                fill
                sizes="100vw"
                className="object-cover object-top opacity-40"
              />
              <div className="absolute inset-0 bg-green-abyss/82" />
              <div className="absolute inset-0 bg-gradient-to-b from-green-abyss/90 via-green-abyss/70 to-green-deep/85" />
            </div>

            <div className="relative z-10 lg:hidden">
              <PinMobileFallback reducedMotion={rm || reducedMotion}>
                <ManifesteStaticIntro t={t} />
              </PinMobileFallback>
            </div>
            <div className="relative z-10 hidden lg:block">
              {progress ? <ManifestePinContent progress={progress} t={t} /> : null}
            </div>
          </>
        )}
      </ScrollPinSection>

      <section className="bg-gradient-to-b from-green-deep to-green-abyss px-5 pb-24 md:px-8 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <ManifesteMission t={t} reducedMotion={reducedMotion} />
        </div>
      </section>
    </>
  );
}
