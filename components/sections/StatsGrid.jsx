"use client";

import { motion } from "framer-motion";
import { EASE, fadeUp, stagger, staticFade } from "@/lib/motion";
import { useLang } from "@/lib/i18n";
import { useMotionActive } from "@/lib/useMotionActive";

export default function StatsGrid() {
  const { t } = useLang();
  const { disableMotion } = useMotionActive();
  const { items, source } = t.stats;

  return (
    <div>
      <motion.div
        variants={disableMotion ? staticFade : stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-8% 0px" }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((stat) => (
          <motion.article
            key={stat.number}
            variants={disableMotion ? staticFade : fadeUp}
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
