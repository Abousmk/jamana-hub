"use client";

import { motion } from "framer-motion";
import {
  EDITORIAL_EASE,
  editorialFadeUp,
  editorialStagger,
  editorialViewport,
  staticFade,
} from "@/lib/motion";
import { useLang } from "@/lib/i18n";
import { useMotionActive } from "@/lib/useMotionActive";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function RealityStats() {
  const { t } = useLang();
  const { disableMotion, motionKey } = useMotionActive();
  const { eyebrow, title, source, closing, items } = t.stats;
  const variants = disableMotion ? staticFade : editorialFadeUp;
  const listVariants = disableMotion ? staticFade : editorialStagger;

  return (
    <div>
      <motion.header
        key={`reality-head-${motionKey}`}
        variants={variants}
        initial="hidden"
        whileInView="show"
        viewport={editorialViewport}
        className="text-left"
      >
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2 className="title-display title-backdrop text-balance mt-3 font-display text-[clamp(1.65rem,4.5vw,2.5rem)] leading-tight text-cream">
          {title}
        </h2>
        {source ? (
          <p className="mt-3 font-body text-xs text-cream/45 md:text-sm">
            {source}
          </p>
        ) : null}
      </motion.header>

      <motion.div
        key={`reality-grid-${motionKey}`}
        variants={listVariants}
        initial="hidden"
        whileInView="show"
        viewport={editorialViewport}
        className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:mt-12 md:gap-y-14 lg:grid-cols-3"
      >
        {items.map((stat) => (
          <motion.div
            key={`${stat.number}-${stat.label}`}
            variants={variants}
            className="text-veil"
          >
            <p className="font-display text-[clamp(2.5rem,7vw,3.75rem)] font-normal leading-none tracking-tight text-gold-light">
              {stat.number}
            </p>
            <p className="mt-3 max-w-[28ch] font-body text-base leading-[1.65] text-cream/75">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        key={`reality-close-${motionKey}`}
        variants={variants}
        initial="hidden"
        whileInView="show"
        viewport={editorialViewport}
        transition={
          disableMotion ? undefined : { duration: 0.8, ease: EDITORIAL_EASE }
        }
        className="title-backdrop-center mt-14 text-center font-display text-[clamp(1.125rem,2.8vw,1.5rem)] italic leading-snug text-cream/85 md:mt-16"
      >
        {closing}
      </motion.p>
    </div>
  );
}
