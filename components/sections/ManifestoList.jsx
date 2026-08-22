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
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h3 className="title-display title-backdrop text-balance mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] leading-tight text-cream">
          {title}
        </h3>
      </motion.header>

      <motion.ol
        key={`manifesto-list-${motionKey}`}
        variants={listVariants}
        initial="hidden"
        whileInView="show"
        viewport={editorialViewport}
        className="mt-10 list-none p-0 md:mt-12"
      >
        {items.map((item) => (
          <motion.li
            key={item.number}
            variants={variants}
            className="grid grid-cols-1 items-start gap-4 border-t border-gold/[0.12] py-[2.25rem] last:border-b md:grid-cols-[auto_1fr] md:gap-10 md:py-10 lg:gap-14"
          >
            <span
              aria-hidden="true"
              className="font-display text-[clamp(3rem,6vw,5rem)] leading-none text-gold/[0.85]"
            >
              {item.number}
            </span>
            <div className="text-veil min-w-0">
              <h4 className="font-display text-[clamp(1.6rem,3vw,2rem)] leading-tight text-cream">
                <span className="sr-only">{item.number} — </span>
                {item.title}
              </h4>
              <p className="mt-3 max-w-[65ch] font-body text-base leading-[1.65] text-cream/75 md:text-lg">
                {item.body}
              </p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
}
