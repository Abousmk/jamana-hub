"use client";

import Image from "next/image";
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  EDITORIAL_EASE,
  editorialFadeUp,
  editorialViewport,
  staticFade,
} from "@/lib/motion";
import { useLang } from "@/lib/i18n";
import { withLocale } from "@/lib/locale";
import { images } from "@/lib/images";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/imageConfig";
import { useTally } from "@/components/TallyModal";
import { useMotionActive } from "@/lib/useMotionActive";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import GoldButton from "@/components/ui/GoldButton";
import MagicBento from "@/components/ui/MagicBento";
import ChromaSection from "@/components/ui/ChromaSection";
import ManifestoList from "@/components/sections/ManifestoList";
import RealityStats from "@/components/sections/RealityStats";
import EcosystemCards from "@/components/sections/EcosystemCards";

const HUB_HEADER_CLASS = "text-left";

const SECTION_TITLE_CLASS =
  "title-display title-backdrop text-balance mt-3 font-display text-[clamp(1.65rem,4.5vw,2.5rem)] leading-tight text-cream";
const SECTION_SUBTITLE_CLASS =
  "text-veil text-pretty mt-3 max-w-[70ch] font-body text-base leading-[1.65] text-cream/80 md:text-lg";

function HubSectionHeader({ eyebrow, title, subtitle, className = "" }) {
  return (
    <header className={`${HUB_HEADER_CLASS} ${className}`.trim()}>
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      {title ? <h2 className={SECTION_TITLE_CLASS}>{title}</h2> : null}
      {subtitle ? <h3 className={SECTION_SUBTITLE_CLASS}>{subtitle}</h3> : null}
    </header>
  );
}

function HubSectionReveal({ children, className = "" }) {
  const { disableMotion, motionKey } = useMotionActive();

  return (
    <motion.div
      key={motionKey}
      variants={disableMotion ? staticFade : editorialFadeUp}
      initial="hidden"
      whileInView="show"
      viewport={editorialViewport}
      transition={
        disableMotion ? undefined : { duration: 0.8, ease: EDITORIAL_EASE }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

function enrichCard(card, lang, open) {
  const imageData = card.cardKey ? images[card.cardKey] : null;

  const enriched = {
    ...card,
    ...(imageData && {
      image: imageData.src,
      imageAlt: imageData.alt[lang],
    }),
    ...(card.href && { href: withLocale(card.href, lang) }),
  };

  if (card.action === "tally") {
    return { ...enriched, onClick: () => open() };
  }

  return enriched;
}

function SelectionBlock() {
  const { t, lang } = useLang();
  const imageData = images.exclusiveFilter;
  const heading = t.hub.sectionHeadings.selection;

  return (
    <section className="section-solid-alt">
      <div className="section-solid-content">
        <HubSectionReveal>
          <HubSectionHeader
            eyebrow={t.hub.sections.selection}
            title={heading.title}
            subtitle={heading.subtitle}
          />
          <div className="relative mt-6 overflow-hidden rounded-xl border border-gold/25 bg-green-abyss/80 p-6 md:p-10 lg:p-12">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <Image
                src={imageData.src}
                alt={imageData.alt[lang]}
                fill
                quality={IMAGE_QUALITY.section}
                sizes={IMAGE_SIZES.selection}
                className="object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-green-abyss/95 via-green-deep/90 to-green-abyss/95" />
            </div>
            <div className="relative flex flex-col gap-5 md:gap-6 lg:max-w-3xl">
              <p className="font-display text-lg text-gold/90 md:text-xl">
                {t.selection.lead}
              </p>
              <p className="max-w-[70ch] font-body text-base leading-[1.65] text-cream/85 md:text-lg">
                {t.selection.body}
              </p>
              <p className="max-w-[70ch] font-body text-base italic leading-[1.65] text-cream/80 md:text-lg">
                {t.selection.closing}
              </p>
              <div className="pt-2">
                <GoldButton tally className="px-10">
                  {t.selection.cta} →
                </GoldButton>
              </div>
            </div>
          </div>
        </HubSectionReveal>
      </div>
    </section>
  );
}

function TwinImageCard({ card }) {
  return (
    <ChromaSection enabled={false} className="w-full">
      <MagicBento cards={[card]} textAutoHide={false} gridClassName="card-grid--twins" />
    </ChromaSection>
  );
}

export default function BentoHub() {
  const { t, lang } = useLang();
  const { open } = useTally();

  const { aboutCard, batirCard } = useMemo(() => {
    const enriched = t.bento.cards.map((card) => enrichCard(card, lang, open));
    return {
      aboutCard: enriched.find((c) => c.slot === "about"),
      batirCard: enriched.find((c) => c.slot === "batir"),
    };
  }, [t.bento.cards, lang, open]);

  return (
    <div id="hub" className="relative scroll-mt-20 w-full overflow-x-hidden">
      <section className="section-solid">
        <div className="section-solid-content">
          <HubSectionReveal>
            <h2 className="title-display title-backdrop text-balance font-display text-[clamp(2.5rem,6vw,4.5rem)] font-normal leading-[1.12] tracking-[-0.02em] text-cream">
              {t.bento.eyebrow}
            </h2>
          </HubSectionReveal>

          {aboutCard ? (
            <HubSectionReveal className="mt-6 md:mt-8">
              <TwinImageCard card={aboutCard} />
            </HubSectionReveal>
          ) : null}
        </div>
      </section>

      <ManifestoList />

      {batirCard ? (
        <section className="section-solid">
          <div className="section-solid-content">
            <HubSectionReveal>
              <TwinImageCard card={batirCard} />
            </HubSectionReveal>
          </div>
        </section>
      ) : null}

      <RealityStats />

      <EcosystemCards />

      <SelectionBlock />
    </div>
  );
}
