"use client";

import Image from "next/image";
import Link from "next/link";
import ChromaCard from "@/components/ui/ChromaCard";
import { useChromaEnabled } from "@/lib/useChromaEnabled";
import "./MagicBento.css";

const DEFAULT_CARD_COLOR = "#0D251D";

function CardBackground({ image, imageAlt, variant }) {
  if (!image) return null;

  return (
    <div className="magic-bento-card__bg" aria-hidden="true">
      <Image
        src={image}
        alt={imageAlt ?? ""}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
      <div
        className={`magic-bento-card__overlay${
          variant === "hero" ? " magic-bento-card__overlay--hero" : ""
        }`}
      />
    </div>
  );
}

function CardContent({ label, title, description, ctaHint }) {
  return (
    <>
      <div className="magic-bento-card__header">
        <div className="magic-bento-card__label">{label}</div>
      </div>
      <div className="magic-bento-card__content">
        <h2 className="magic-bento-card__title">{title}</h2>
        {description ? (
          <p className="magic-bento-card__description">{description}</p>
        ) : null}
        {ctaHint ? (
          <span className="magic-bento-card__cta-hint">{ctaHint}</span>
        ) : null}
      </div>
    </>
  );
}

function buildCardClassName({ textAutoHide, variant, interactive, spanFull }) {
  return [
    "magic-bento-card",
    "bento-anchor",
    textAutoHide ? "magic-bento-card--text-autohide" : "",
    variant === "hero" ? "magic-bento-card--hero" : "",
    variant === "cta" ? "magic-bento-card--cta" : "",
    interactive ? "magic-bento-card--clickable" : "",
    spanFull ? "magic-bento-card--span-full" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function BentoCard({ card, textAutoHide, chromaEnabled }) {
  const hasImage = Boolean(card.image);
  const useChroma = chromaEnabled && !hasImage;

  const className = buildCardClassName({
    textAutoHide,
    variant: card.variant,
    interactive: Boolean(card.onClick || card.href),
    spanFull: card.spanFull,
  });

  const style = hasImage
    ? { backgroundColor: card.color ?? DEFAULT_CARD_COLOR }
    : {
        background: "linear-gradient(145deg, #2C5F4B, #0D251D)",
        borderColor: "rgba(200, 169, 81, 0.35)",
      };

  const content = (
    <>
      <CardBackground
        image={card.image}
        imageAlt={card.imageAlt}
        variant={card.variant}
      />
      <CardContent
        label={card.label}
        title={card.title}
        description={card.description}
        ctaHint={card.ctaHint}
      />
    </>
  );

  if (card.href) {
    return (
      <ChromaCard
        as={Link}
        id={card.id}
        href={card.href}
        className={className}
        style={style}
        disabled={!useChroma}
      >
        {content}
      </ChromaCard>
    );
  }

  if (card.onClick) {
    return (
      <ChromaCard
        id={card.id}
        role="button"
        tabIndex={0}
        className={className}
        style={style}
        disabled={!useChroma}
        onClick={card.onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            card.onClick(e);
          }
        }}
      >
        {content}
      </ChromaCard>
    );
  }

  return (
    <ChromaCard id={card.id} className={className} style={style} disabled={!useChroma}>
      {content}
    </ChromaCard>
  );
}

export default function MagicBento({
  cards,
  textAutoHide = true,
  gridClassName = "",
}) {
  const chromaEnabled = useChromaEnabled();

  if (!cards?.length) {
    return null;
  }

  return (
    <div className={`card-grid bento-section ${gridClassName}`}>
      {cards.map((card, index) => (
        <BentoCard
          key={card.id ?? `${card.label}-${index}`}
          card={card}
          textAutoHide={textAutoHide}
          chromaEnabled={chromaEnabled}
        />
      ))}
    </div>
  );
}
