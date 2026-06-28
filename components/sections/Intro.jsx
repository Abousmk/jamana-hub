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

export default function Intro() {
  const { t } = useLang();
  const reducedMotion = useReducedMotion();

  return (
    <section id="intro" className="bg-green-abyss">
      <motion.div
        variants={reducedMotion ? {} : stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-8% 0px" }}
        className="mx-auto max-w-[760px] px-5 py-20 text-center md:px-8 md:py-28"
      >
        <motion.div variants={reducedMotion ? staticFade : fadeUp}>
          <SectionEyebrow>{t.intro.eyebrow}</SectionEyebrow>
        </motion.div>

        <motion.h2
          variants={reducedMotion ? staticFade : fadeUp}
          className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.15] tracking-[-0.02em] text-cream"
        >
          {t.intro.title}
        </motion.h2>

        <motion.p
          variants={reducedMotion ? staticFade : fadeUp}
          className="mt-6 font-body text-base text-cream/74 md:text-lg"
        >
          {t.intro.body}
        </motion.p>
      </motion.div>

      <motion.div
        variants={reducedMotion ? staticPhoto : photoReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-5% 0px" }}
      >
        <TreatedPhoto caption={t.intro.caption} hue={158} height="64vh" />
      </motion.div>
    </section>
  );
}
