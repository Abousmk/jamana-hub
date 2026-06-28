"use client";

import Image from "next/image";
import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, fadeUp, staticFade } from "@/lib/motion";
import { useLang } from "@/lib/i18n";
import { images } from "@/lib/images";
import { useChromaEnabled } from "@/lib/useChromaEnabled";
import { useTally } from "@/components/TallyModal";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import GoldButton from "@/components/ui/GoldButton";
import MagicBento from "@/components/ui/MagicBento";
import ChromaSection from "@/components/ui/ChromaSection";
import StatsGrid from "@/components/sections/StatsGrid";

const SECTION_ORDER = ["manifeste", "realite", "ecosysteme", "selection"];

const SECTION_GRIDS = {
  manifeste: "card-grid--manifeste",
  ecosysteme: "card-grid--ecosysteme",
};

const SECTION_TITLE_CLASS =
  "mt-3 font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-tight text-cream";
const SECTION_SUBTITLE_CLASS =
  "mt-3 font-body text-[clamp(1rem,2.2vw,1.25rem)] leading-relaxed text-cream/70";

function HubSectionHeader({ eyebrow, title, subtitle, className = "" }) {
  return (
    <header className={className}>
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      {title ? <h2 className={SECTION_TITLE_CLASS}>{title}</h2> : null}
      {subtitle ? <h3 className={SECTION_SUBTITLE_CLASS}>{subtitle}</h3> : null}
    </header>
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
  };

  if (card.action === "tally") {
    return { ...enriched, onClick: () => open() };
  }

  return enriched;
}

function groupCardsBySection(cards) {
  const groups = {
    manifeste: [],
    ecosysteme: [],
  };

  for (const card of cards) {
    if (groups[card.section]) {
      groups[card.section].push(card);
    }
  }

  return groups;
}

function SelectionBlock() {
  const { t } = useLang();
  const imageData = images.exclusiveFilter;
  const heading = t.hub.sectionHeadings.selection;

  return (
    <div className="mt-16 md:mt-20">
      <HubSectionHeader
        eyebrow={t.hub.sections.selection}
        title={heading.title}
        subtitle={heading.subtitle}
      />
      <div className="relative mt-6 overflow-hidden rounded-xl border border-gold/25 bg-green-abyss/80 p-6 md:p-10 lg:p-12">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <Image
            src={imageData.src}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 72rem"
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-abyss/95 via-green-deep/90 to-green-abyss/95" />
        </div>
        <div className="relative flex flex-col gap-5 md:gap-6 lg:max-w-3xl">
          <p className="font-display text-lg text-gold/90 md:text-xl">
            {t.selection.lead}
          </p>
          <p className="font-body text-sm leading-relaxed text-cream/75 md:text-base">
            {t.selection.body}
          </p>
          <p className="font-body text-sm italic text-cream/55 md:text-base">
            {t.selection.closing}
          </p>
          <div className="pt-2">
            <GoldButton tally className="px-10">
              {t.selection.cta} →
            </GoldButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function EcosystemHeader() {
  const { t } = useLang();
  const eco = t.hub.ecosystem;

  return (
    <HubSectionHeader
      eyebrow={eco.eyebrow}
      title={eco.title}
      subtitle={eco.subtitle}
      className="max-w-2xl"
    />
  );
}

export default function BentoHub() {
  const { t, lang } = useLang();
  const { open } = useTally();
  const reducedMotion = useReducedMotion();
  const chromaEnabled = useChromaEnabled();

  const cardGroups = useMemo(() => {
    const enriched = t.bento.cards.map((card) => enrichCard(card, lang, open));
    return groupCardsBySection(enriched);
  }, [t.bento.cards, lang, open]);

  return (
    <motion.section
      id="hub"
      variants={reducedMotion ? staticFade : fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={reducedMotion ? undefined : { duration: 0.7, ease: EASE }}
      className="scroll-mt-20 bg-gradient-to-b from-green-deep via-green-deep to-green-abyss px-5 pt-10 pb-16 md:px-8 md:pt-12 md:pb-20"
    >
      <div className="mx-auto max-w-6xl">
        <HubSectionHeader
          eyebrow={t.bento.eyebrow}
          title={t.bento.title}
          subtitle={t.bento.subtitle}
          className="mx-auto max-w-2xl text-center"
        />

        {SECTION_ORDER.map((sectionKey) => {
          if (sectionKey === "realite") {
            const heading = t.hub.sectionHeadings.realite;
            return (
              <div key="realite" className="mt-16 md:mt-20">
                <HubSectionHeader
                  eyebrow={t.hub.sections.realite}
                  title={heading.title}
                  subtitle={heading.subtitle}
                />
                <StatsGrid />
              </div>
            );
          }

          if (sectionKey === "selection") {
            return <SelectionBlock key="selection" />;
          }

          const cards = cardGroups[sectionKey];
          if (!cards.length) return null;

          const heading = t.hub.sectionHeadings[sectionKey];
          const useChromaSection =
            chromaEnabled && (sectionKey === "manifeste" || sectionKey === "ecosysteme");

          return (
            <div key={sectionKey} className="mt-10 md:mt-12">
              {sectionKey === "ecosysteme" ? (
                <EcosystemHeader />
              ) : (
                <HubSectionHeader
                  eyebrow={t.hub.sections[sectionKey]}
                  title={heading?.title}
                  subtitle={heading?.subtitle}
                />
              )}
              <div
                className={`flex justify-center ${sectionKey === "manifeste" ? "mt-4 md:mt-5" : "mt-6"}`}
              >
                <ChromaSection enabled={useChromaSection} className="w-full max-w-[72rem]">
                  <MagicBento
                    cards={cards}
                    textAutoHide
                    gridClassName={SECTION_GRIDS[sectionKey]}
                  />
                </ChromaSection>
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
