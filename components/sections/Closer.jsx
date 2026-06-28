"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { fadeUp, stagger, staticFade } from "@/lib/motion";
import { useLang } from "@/lib/i18n";
import GoldButton from "@/components/ui/GoldButton";
import { EMBLEM_SRC, IMAGE_QUALITY } from "@/lib/imageConfig";

function GoldLine({ progress, reducedMotion }) {
  const scaleX = useTransform(progress, [0, 0.4], [0, 1]);

  if (reducedMotion) {
    return <span className="mx-auto block h-px w-[120px] bg-gold" aria-hidden="true" />;
  }

  return (
    <motion.span
      style={{ scaleX, originX: 0.5 }}
      className="mx-auto block h-px w-[120px] bg-gold will-change-transform"
      aria-hidden="true"
    />
  );
}

export default function Closer() {
  const { t } = useLang();
  const reducedMotion = useReducedMotion();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  return (
    <section
      id="closer"
      ref={ref}
      className="relative overflow-hidden px-5 py-24 md:px-8 md:py-32"
      style={{
        background: "radial-gradient(ellipse 70% 80% at 50% 50%, #0D251D, #0A1C15)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(200,169,81,0.08), transparent 70%)",
        }}
      />

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <Image
          src={EMBLEM_SRC}
          alt=""
          width={420}
          height={420}
          quality={IMAGE_QUALITY.emblem}
          sizes="420px"
          className="h-auto w-[min(85vw,420px)] opacity-[0.07]"
        />
      </div>

      <motion.div
        variants={reducedMotion ? {} : stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className="relative z-10 mx-auto flex max-w-[760px] flex-col items-center text-center"
      >
        <GoldLine progress={scrollYProgress} reducedMotion={reducedMotion} />

        {t.closer.line.map((line, i) => (
          <motion.p
            key={line}
            variants={reducedMotion ? staticFade : fadeUp}
            className={`mt-8 font-display text-[clamp(1.7rem,3.6vw,2.7rem)] font-semibold leading-[1.2] ${
              i === 0 ? "text-cream" : "text-gold-light"
            }`}
          >
            {line}
          </motion.p>
        ))}

        <motion.div variants={reducedMotion ? staticFade : fadeUp} className="mt-10">
          <GoldButton tally>{t.closer.cta}</GoldButton>
        </motion.div>

        <div className="mt-10 w-full">
          <GoldLine progress={scrollYProgress} reducedMotion={reducedMotion} />
        </div>
      </motion.div>
    </section>
  );
}
