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
import { useChromaEnabled } from "@/lib/useChromaEnabled";
import { useTally } from "@/components/TallyModal";
import { useMotionActive } from "@/lib/useMotionActive";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import GoldButton from "@/components/ui/GoldButton";
import WeavePattern from "@/components/ui/WeavePattern";
import MagicBento from "@/components/ui/MagicBento";
import ChromaSection from "@/components/ui/ChromaSection";
import ManifestoList from "@/components/sections/ManifestoList";
import RealityStats from "@/components/sections/RealityStats";

const HUB_HEADER_CLASS = "text-left";

const SECTION_TITLE_CLASS =
  "title-display title-backdrop text-balance mt-3 font-display text-[clamp(1.65rem,4.5vw,2.5rem)] leading-tight text-cream";
const SECTION_SUBTITLE_CLASS =
  "text-veil text-pretty mt-3 font-body text-[clamp(1rem,2.2vw,1.25rem)] leading-relaxed text-cream/75";

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
    <HubSectionReveal className="mt-12 md:mt-16">
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
          <p className="font-body text-base leading-[1.65] text-cream/75">
            {t.selection.body}
          </p>
          <p className="font-body text-base italic leading-[1.65] text-cream/55">
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
  const chromaEnabled = useChromaEnabled();

  const { aboutCard, batirCard, ecosystemCards } = useMemo(() => {
    const enriched = t.bento.cards.map((card) => enrichCard(card, lang, open));
    return {
      aboutCard: enriched.find((c) => c.slot === "about"),
      batirCard: enriched.find((c) => c.slot === "batir"),
      ecosystemCards: enriched.filter((c) => c.section === "ecosysteme"),
    };
  }, [t.bento.cards, lang, open]);

  return (
    <section
      id="hub"
      className="relative scroll-mt-20 w-full overflow-x-hidden px-4 pt-4 pb-14 sm:px-6 md:pt-6 md:pb-16 lg:px-8"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-green-deep/78 via-green-deep/68 to-green-abyss/78"
        aria-hidden="true"
      />
      <WeavePattern opacity={0.075} className="z-[1]" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
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

        <ManifestoList />

        {batirCard ? (
          <HubSectionReveal className="mt-12 md:mt-16">
            <TwinImageCard card={batirCard} />
          </HubSectionReveal>
        ) : null}

        <div className="mt-12 md:mt-16 lg:mt-20">
          <RealityStats />
        </div>

        {ecosystemCards.length ? (
          <HubSectionReveal className="mt-10 md:mt-12">
            <HubSectionHeader
              eyebrow={t.hub.ecosystem.eyebrow}
              title={t.hub.ecosystem.title}
              subtitle={t.hub.ecosystem.subtitle}
            />
            <div className="mt-6">
              <ChromaSection enabled={chromaEnabled} className="w-full">
                <MagicBento
                  cards={ecosystemCards}
                  textAutoHide
                  gridClassName="card-grid--ecosysteme"
                />
              </ChromaSection>
            </div>
          </HubSectionReveal>
        ) : null}

        <SelectionBlock />
      </div>
    </section>
  );
}
