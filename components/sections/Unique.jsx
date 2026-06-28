"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, stagger, staticFade } from "@/lib/motion";
import { useLang } from "@/lib/i18n";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import TreatedPhoto from "@/components/ui/TreatedPhoto";

const photoReveal = {
  hidden: { opacity: 0, scale: 1.04 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const staticPhoto = {
  hidden: { opacity: 1, scale: 1 },
  show: { opacity: 1, scale: 1 },
};

const NUMBERS = ["01", "02", "03"];

export default function Unique() {
  const { t } = useLang();
  const reducedMotion = useReducedMotion();

  return (
    <section id="unique" className="bg-green-deep">
      <motion.div
        variants={reducedMotion ? staticPhoto : photoReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-5% 0px" }}
      >
        <TreatedPhoto caption={t.unique.caption} hue={150} height="56vh" />
      </motion.div>

      <motion.div
        variants={reducedMotion ? {} : stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-8% 0px" }}
        className="mx-auto max-w-[1080px] px-5 py-20 text-center md:px-8 md:py-28"
      >
        <motion.div variants={reducedMotion ? staticFade : fadeUp}>
          <SectionEyebrow>{t.unique.eyebrow}</SectionEyebrow>
        </motion.div>

        <motion.h2
          variants={reducedMotion ? staticFade : fadeUp}
          className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.12] tracking-[-0.02em] text-cream"
        >
          {t.unique.title}
        </motion.h2>

        <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-10 text-left">
          {t.unique.points.map((point, i) => (
            <motion.div key={point.t} variants={reducedMotion ? staticFade : fadeUp}>
              <p className="font-display text-4xl text-gold/40 md:text-5xl">{NUMBERS[i]}</p>
              <h3 className="mt-3 font-display text-xl font-semibold text-gold-light md:text-2xl">
                {point.t}
              </h3>
              <p className="mt-3 font-body text-sm text-cream/66 md:text-base">{point.d}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
