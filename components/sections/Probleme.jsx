"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { fadeUp, stagger, staticFade } from "@/lib/motion";
import { useLang } from "@/lib/i18n";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import GoldButton from "@/components/ui/GoldButton";
import TiltCard from "@/components/ui/TiltCard";

const BG_COLORS = ["#0A1C15", "#1F1410", "#2A1712", "#1A1210", "#0A1C15"];
const ACCENT_COLORS = ["#C8A951", "#D98C5F", "#D98C5F", "#C8A951"];

export default function Probleme() {
  const { t } = useLang();
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    BG_COLORS
  );

  const accent = useTransform(
    scrollYProgress,
    [0.12, 0.32, 0.78, 1],
    ACCENT_COLORS
  );

  return (
    <section
      id="probleme"
      ref={sectionRef}
      className="relative min-h-[260vh]"
    >
      <motion.div
        className="sticky top-0 flex min-h-screen items-center px-5 py-24 md:px-8"
        style={reducedMotion ? { backgroundColor: "#0A1C15" } : { backgroundColor }}
      >
        <motion.div
          variants={reducedMotion ? {} : stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="mx-auto w-full max-w-[1080px] text-center"
        >
          <motion.div variants={reducedMotion ? staticFade : fadeUp}>
            {reducedMotion ? (
              <SectionEyebrow>{t.prob.eyebrow}</SectionEyebrow>
            ) : (
              <motion.p
                style={{ color: accent }}
                className="font-util text-[0.65rem] font-medium uppercase tracking-[0.18em] md:text-xs"
              >
                {t.prob.eyebrow}
              </motion.p>
            )}
          </motion.div>

          <motion.h2
            variants={reducedMotion ? staticFade : fadeUp}
            className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.12] tracking-[-0.02em] text-cream"
          >
            {t.prob.title}
          </motion.h2>

          <motion.p
            variants={reducedMotion ? staticFade : fadeUp}
            className="mx-auto mt-5 max-w-2xl font-body text-base text-cream/70 md:text-lg"
          >
            {t.prob.lead}
          </motion.p>

          <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
            {t.prob.stats.map((stat) => (
              <motion.div key={stat.l} variants={reducedMotion ? staticFade : fadeUp}>
                <TiltCard className="rounded-[14px] border border-green-line bg-[rgba(255,255,255,0.03)] p-7 text-left hover:border-gold">
                  {reducedMotion ? (
                    <p className="font-display text-[clamp(2.4rem,5vw,3.4rem)] font-bold leading-none text-gold">
                      {stat.n}
                    </p>
                  ) : (
                    <motion.p
                      style={{ color: accent }}
                      className="font-display text-[clamp(2.4rem,5vw,3.4rem)] font-bold leading-none"
                    >
                      {stat.n}
                    </motion.p>
                  )}
                  <p className="mt-3 font-util text-sm font-semibold text-cream">{stat.l}</p>
                  <p className="mt-2 font-body text-sm text-cream/55">{stat.s}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          <motion.p
            variants={reducedMotion ? staticFade : fadeUp}
            className="mt-14 font-display text-xl italic text-gold-light md:text-2xl"
          >
            {t.prob.close}
          </motion.p>

          <motion.div variants={reducedMotion ? staticFade : fadeUp} className="mt-8">
            <GoldButton tally>{t.prob.cta}</GoldButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
