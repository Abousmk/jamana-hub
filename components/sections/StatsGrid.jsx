"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE, fadeUp, stagger, staticFade } from "@/lib/motion";
import { useLang } from "@/lib/i18n";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

const SECTION_TITLE_CLASS =
  "mt-3 font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-tight text-cream";
const SECTION_SUBTITLE_CLASS =
  "mt-3 font-body text-[clamp(1rem,2.2vw,1.25rem)] leading-relaxed text-cream/70";

export default function StatsGrid() {
  const { t } = useLang();
  const reducedMotion = useReducedMotion();
  const { eyebrow, title, subtitle, items, source } = t.stats;

  return (
    <div className="mt-6">
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h2 className={SECTION_TITLE_CLASS}>{title}</h2>
      {subtitle ? <h3 className={SECTION_SUBTITLE_CLASS}>{subtitle}</h3> : null}

      <motion.div
        variants={reducedMotion ? staticFade : stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-8% 0px" }}
        className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((stat) => (
          <motion.article
            key={stat.number}
            variants={reducedMotion ? staticFade : fadeUp}
            transition={{ duration: 0.7, ease: EASE }}
            className="rounded-xl border border-gold/20 bg-green-deep p-6 md:p-7"
          >
            <p className="font-display text-[clamp(1.75rem,4vw,2.25rem)] font-bold leading-none text-gold">
              {stat.number}
            </p>
            <p className="mt-3 font-util text-xs font-semibold uppercase tracking-[0.12em] text-cream">
              {stat.label}
            </p>
            {stat.description ? (
              <p className="mt-2 font-body text-sm leading-relaxed text-cream/70">
                {stat.description}
              </p>
            ) : null}
          </motion.article>
        ))}
      </motion.div>

      <p className="mt-6 font-body text-xs text-cream/40">{source}</p>
    </div>
  );
}
