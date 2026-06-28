"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, stagger, staticFade } from "@/lib/motion";
import { useLang } from "@/lib/i18n";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function Chiffres() {
  const { t } = useLang();
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="chiffres"
      className="border-y border-green-line bg-green-deep px-5 py-20 md:px-8 md:py-28"
    >
      <motion.div
        variants={reducedMotion ? {} : stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-8% 0px" }}
        className="mx-auto max-w-[1180px] text-center"
      >
        <motion.div variants={reducedMotion ? staticFade : fadeUp}>
          <SectionEyebrow>{t.glance.eyebrow}</SectionEyebrow>
        </motion.div>

        <motion.h2
          variants={reducedMotion ? staticFade : fadeUp}
          className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.12] tracking-[-0.02em] text-cream"
        >
          {t.glance.title}
        </motion.h2>

        <motion.p
          variants={reducedMotion ? staticFade : fadeUp}
          className="mx-auto mt-5 max-w-2xl font-body text-base text-cream/60 md:text-lg"
        >
          {t.glance.lead}
        </motion.p>

        <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
          {t.glance.stats.map((stat, i) => (
            <motion.div
              key={stat.l}
              variants={reducedMotion ? staticFade : fadeUp}
              className={`px-4 py-6 ${
                i > 0
                  ? "max-[820px]:border-t max-[820px]:border-green-line min-[821px]:border-l min-[821px]:border-green-line"
                  : ""
              }`}
            >
              <p className="font-display text-[clamp(2.8rem,6vw,4.2rem)] font-bold leading-none text-gold">
                {stat.n}
                <span className="text-[0.55em] text-gold-light">{stat.suf}</span>
              </p>
              <p className="mt-3 font-util text-[0.65rem] uppercase tracking-[0.1em] text-cream/60 md:text-xs">
                {stat.l}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          variants={reducedMotion ? staticFade : fadeUp}
          className="mt-10 font-body text-xs text-cream/35"
        >
          {t.glance.note}
        </motion.p>
      </motion.div>
    </section>
  );
}
