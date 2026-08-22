"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  Clapperboard,
  Globe,
  GraduationCap,
  Network,
} from "lucide-react";
import {
  editorialFadeUp,
  editorialStagger,
  editorialViewport,
  staticFade,
} from "@/lib/motion";
import { useLang } from "@/lib/i18n";
import { withLocale } from "@/lib/locale";
import { useMotionActive } from "@/lib/useMotionActive";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { cn } from "@/lib/utils";

const ICONS = {
  rezo: Network,
  academy: GraduationCap,
  media: Clapperboard,
  global: Globe,
};

const CARD_BASE =
  "flex h-full flex-col rounded-[4px] border border-gold/[0.12] bg-transparent p-10 md:p-12 transition-[border-color,box-shadow] duration-500 ease-out";

const CARD_HOVER =
  "[@media(hover:hover)_and_(pointer:fine)]:hover:border-gold/40 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_0_40px_-10px_rgba(200,169,81,0.35)]";

function EcoCard({ pillar, href, discover, variants }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.55, margin: "-8% 0px" });
  const Icon = ICONS[pillar.id] ?? Network;
  const linked = Boolean(href);

  const className = cn(
    CARD_BASE,
    CARD_HOVER,
    linked ? "group cursor-pointer" : "cursor-default",
    inView &&
      "max-md:border-gold/25 max-md:shadow-[0_0_32px_-12px_rgba(200,169,81,0.22)]",
    linked &&
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green-abyss",
  );

  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <Icon
          className="size-7 shrink-0 text-gold/80"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <span
          aria-hidden="true"
          className="font-display text-[3rem] leading-none text-gold/25"
        >
          {pillar.number}
        </span>
      </div>

      <div className="mt-12 flex flex-1 flex-col md:mt-14">
        <h3 className="font-display text-[2rem] italic leading-tight text-cream">
          <span className="sr-only">{pillar.number} — </span>
          {pillar.title}
        </h3>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-util text-[11px] font-medium uppercase tracking-[0.2em] text-gold/85">
            {pillar.label}
          </span>
          <span className="rounded-full border border-gold/40 bg-transparent px-2.5 py-[3px] font-util text-[10px] font-medium uppercase tracking-[0.16em] text-gold/85">
            {pillar.badge}
          </span>
        </div>

        <p className="mt-5 max-w-[70ch] font-body text-base leading-[1.65] text-cream/85 md:text-lg">
          {pillar.description}
        </p>

        {linked ? (
          <span className="mt-auto inline-flex items-center gap-2 pt-8 font-util text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
            {discover}
            <ArrowUpRight
              className="size-3.5 transition-transform duration-300 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-0.5"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </span>
        ) : null}
      </div>
    </>
  );

  return (
    <motion.li ref={ref} variants={variants} className="list-none">
      {linked ? (
        <Link href={href} className={className}>
          {content}
        </Link>
      ) : (
        <div className={className}>{content}</div>
      )}
    </motion.li>
  );
}

export default function EcosystemCards() {
  const { t, lang } = useLang();
  const { disableMotion, motionKey } = useMotionActive();
  const { eyebrow, title, subtitle, discover, pillars } = t.hub.ecosystem;
  const variants = disableMotion ? staticFade : editorialFadeUp;
  const listVariants = disableMotion ? staticFade : editorialStagger;

  return (
    <section id="ecosysteme" className="section-solid scroll-mt-20">
      <div className="section-solid-content">
        <motion.div
          key={motionKey}
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={editorialViewport}
        >
          <motion.header variants={variants} className="text-left">
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
            <div className="mt-4 flex flex-col gap-3 md:mt-5 md:flex-row md:items-end md:justify-between md:gap-10 lg:gap-16">
              <h2 className="title-display title-backdrop text-balance font-display text-[clamp(2.35rem,5.8vw,4rem)] font-normal leading-[1.08] tracking-[-0.02em] text-cream">
                {title}
              </h2>
              <p className="max-w-[70ch] shrink-0 font-body text-base italic leading-[1.65] text-cream/80 md:max-w-[22rem] md:pb-1 md:text-right">
                {subtitle}
              </p>
            </div>
          </motion.header>

          <motion.ul
            variants={listVariants}
            className="mt-14 grid list-none grid-cols-1 gap-6 p-0 md:mt-16 md:grid-cols-2 md:gap-8 lg:mt-[4.5rem] lg:gap-10"
          >
            {pillars.map((pillar) => (
              <EcoCard
                key={pillar.id}
                pillar={pillar}
                href={pillar.href ? withLocale(pillar.href, lang) : undefined}
                discover={discover}
                variants={variants}
              />
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
