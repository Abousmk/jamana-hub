"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, stagger, staticFade } from "@/lib/motion";
import { useLang } from "@/lib/i18n";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import TiltCard from "@/components/ui/TiltCard";

const ICONS = [
  <svg key="rezo" viewBox="0 0 32 32" fill="none" className="h-8 w-8" aria-hidden="true">
    <circle cx="8" cy="16" r="3" stroke="#C8A951" strokeWidth="1.3" />
    <circle cx="24" cy="8" r="3" stroke="#C8A951" strokeWidth="1.3" />
    <circle cx="24" cy="24" r="3" stroke="#C8A951" strokeWidth="1.3" />
    <line x1="10.5" y1="14.5" x2="21.5" y2="9.5" stroke="#C8A951" strokeWidth="1.3" />
    <line x1="10.5" y1="17.5" x2="21.5" y2="22.5" stroke="#C8A951" strokeWidth="1.3" />
    <line x1="24" y1="11" x2="24" y2="21" stroke="#C8A951" strokeWidth="1.3" />
  </svg>,
  <svg key="academy" viewBox="0 0 32 32" fill="none" className="h-8 w-8" aria-hidden="true">
    <rect x="6" y="10" width="20" height="4" rx="1" stroke="#C8A951" strokeWidth="1.3" />
    <rect x="8" y="16" width="16" height="4" rx="1" stroke="#C8A951" strokeWidth="1.3" />
    <rect x="10" y="22" width="12" height="4" rx="1" stroke="#C8A951" strokeWidth="1.3" />
  </svg>,
  <svg key="media" viewBox="0 0 32 32" fill="none" className="h-8 w-8" aria-hidden="true">
    <rect x="6" y="8" width="16" height="20" rx="2" stroke="#C8A951" strokeWidth="1.3" />
    <path d="M18 14l8-4v16l-8-4V14z" stroke="#C8A951" strokeWidth="1.3" strokeLinejoin="round" />
    <line x1="10" y1="13" x2="16" y2="13" stroke="#C8A951" strokeWidth="1.3" />
    <line x1="10" y1="17" x2="14" y2="17" stroke="#C8A951" strokeWidth="1.3" />
  </svg>,
  <svg key="global" viewBox="0 0 32 32" fill="none" className="h-8 w-8" aria-hidden="true">
    <circle cx="16" cy="16" r="10" stroke="#C8A951" strokeWidth="1.3" />
    <ellipse cx="16" cy="16" rx="4" ry="10" stroke="#C8A951" strokeWidth="1.3" />
    <line x1="6" y1="16" x2="26" y2="16" stroke="#C8A951" strokeWidth="1.3" />
    <path d="M8 10c3 2 13 2 16 0M8 22c3-2 13-2 16 0" stroke="#C8A951" strokeWidth="1.3" />
  </svg>,
];

export default function Ecosysteme() {
  const { t } = useLang();
  const reducedMotion = useReducedMotion();

  return (
    <section id="ecosysteme" className="bg-green-abyss px-5 py-20 md:px-8 md:py-28">
      <motion.div
        variants={reducedMotion ? {} : stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-8% 0px" }}
        className="mx-auto max-w-[1180px]"
      >
        <motion.div variants={reducedMotion ? staticFade : fadeUp}>
          <SectionEyebrow>{t.eco.eyebrow}</SectionEyebrow>
        </motion.div>

        <motion.h2
          variants={reducedMotion ? staticFade : fadeUp}
          className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.12] tracking-[-0.02em] text-cream"
        >
          {t.eco.title}
        </motion.h2>

        <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
          {t.eco.cards.map((card, i) => (
            <motion.div key={card.k} variants={reducedMotion ? staticFade : fadeUp}>
              <TiltCard className="rounded-[14px] border border-green-line bg-green-deep p-8 hover:border-gold">
                {ICONS[i]}
                <p className="mt-5 font-util text-[0.65rem] uppercase tracking-[0.16em] text-gold md:text-xs">
                  {card.k}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-cream">{card.t}</h3>
                <p className="mt-3 font-body text-sm text-cream/62 md:text-base">{card.d}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
