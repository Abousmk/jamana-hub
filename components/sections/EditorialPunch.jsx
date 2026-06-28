"use client";

import { motion, useReducedMotion, useTransform } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { images } from "@/lib/images";
import ScrollPinSection, { PinMobileFallback } from "@/components/ui/ScrollPinSection";
import { ScrollParallaxBackground } from "@/components/ui/ParallaxImage";
import { useScrollFade, useScrollScale } from "@/lib/scroll";

function EditorialPinContent({ progress, t }) {
  const opacity = useScrollFade(progress);
  const scale = useScrollScale(progress);
  const y = useTransform(progress, [0, 0.22], [36, 0]);

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="relative z-10 mx-auto w-full max-w-5xl px-5 text-center md:px-8"
    >
      <h2 className="font-display text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.05] tracking-[-0.03em] text-cream drop-shadow-[0_4px_32px_rgba(10,28,21,0.9)]">
        {t.editorial.line1}
        <br />
        <span className="bg-gradient-to-r from-gold-light via-gold to-gold-light bg-clip-text text-transparent">
          {t.editorial.line2}
        </span>
      </h2>
      <p className="mx-auto mt-8 max-w-2xl font-body text-base text-cream/70 md:text-lg">
        {t.editorial.subline}
      </p>
    </motion.div>
  );
}

function EditorialMobileContent({ t }) {
  return (
    <div className="relative mx-auto max-w-5xl text-center">
      <h2 className="font-display text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.05] tracking-[-0.03em] text-cream">
        {t.editorial.line1}
        <br />
        <span className="text-gold">{t.editorial.line2}</span>
      </h2>
      <p className="mx-auto mt-8 max-w-2xl font-body text-base text-cream/65 md:text-lg">
        {t.editorial.subline}
      </p>
    </div>
  );
}

export default function EditorialPunch() {
  const { t, lang } = useLang();
  const reducedMotion = useReducedMotion();

  return (
    <ScrollPinSection
      pinHeightClass="lg:h-[250vh]"
      bgClassName="relative bg-gradient-to-b from-green-abyss via-green-abyss to-green-deep"
    >
      {({ progress, reducedMotion: rm }) => (
        <>
          {!rm && progress && (
            <ScrollParallaxBackground
              src={images.editorial.src}
              alt={images.editorial.alt[lang]}
              progress={progress}
              overlayClassName="bg-green-abyss/78"
            />
          )}

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            aria-hidden="true"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, #C8A951 0, #C8A951 1px, transparent 0, transparent 50%)",
              backgroundSize: "16px 16px",
            }}
          />

          <div className="lg:hidden">
            <PinMobileFallback reducedMotion={rm || reducedMotion}>
              <EditorialMobileContent t={t} />
            </PinMobileFallback>
          </div>
          <div className="hidden lg:block">
            {progress ? <EditorialPinContent progress={progress} t={t} /> : null}
          </div>
        </>
      )}
    </ScrollPinSection>
  );
}
