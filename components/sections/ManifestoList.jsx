"use client";

import { motion } from "framer-motion";
import {
  editorialFadeUp,
  editorialStagger,
  editorialViewport,
  staticFade,
} from "@/lib/motion";
import { useLang } from "@/lib/i18n";
import { useMotionActive } from "@/lib/useMotionActive";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function ManifestoList() {
  const { t } = useLang();
  const { disableMotion, motionKey } = useMotionActive();
  const { eyebrow, title, items } = t.hub.manifestoList;
  const variants = disableMotion ? staticFade : editorialFadeUp;
  const listVariants = disableMotion ? staticFade : editorialStagger;

  return (
    <div className="mt-12 md:mt-16 lg:mt-20">
      <motion.header
        key={`manifesto-head-${motionKey}`}
        variants={variants}
        initial="hidden"
        whileInView="show"
        viewport={editorialViewport}
        className="text-left"
      >
        <SectionEyebrow className="tracking-[0.25em]">{eyebrow}</SectionEyebrow>
        <h3 className="title-display text-balance mt-3 font-display text-[clamp(1.65rem,4.5vw,2.5rem)] leading-tight text-cream">
          {title}
        </h3>
      </motion.header>

      <motion.ol
        key={`manifesto-list-${motionKey}`}
        variants={listVariants}
        initial="hidden"
        whileInView="show"
        viewport={editorialViewport}
        className="mt-10 list-none space-y-0 border-t border-gold/[0.12] p-0 md:mt-12"
      >
        {items.map((item) => (
          <motion.li
            key={item.number}
            variants={variants}
            className="grid grid-cols-1 gap-3 border-b border-gold/[0.12] py-8 md:grid-cols-[minmax(4.5rem,auto)_1fr] md:gap-8 md:py-10 lg:gap-12 lg:py-12"
          >
            <span
              aria-hidden="true"
              className="font-display text-[clamp(2.75rem,8vw,4.5rem)] leading-none text-gold/90"
            >
              {item.number}
            </span>
            <div className="min-w-0 md:pt-1">
              <h4 className="font-display text-[clamp(1.35rem,3vw,1.85rem)] leading-tight text-cream">
                <span className="sr-only">{item.number} — </span>
                {item.title}
              </h4>
              <p className="mt-3 max-w-[65ch] font-body text-[clamp(0.95rem,2vw,1.0625rem)] leading-relaxed text-cream/70">
                {item.body}
              </p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
}
