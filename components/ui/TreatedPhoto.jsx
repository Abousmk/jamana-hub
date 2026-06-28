"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { EMBLEM_SRC, IMAGE_QUALITY } from "@/lib/imageConfig";

export default function TreatedPhoto({ caption, hue = 158, height = "62vh" }) {
  const { lang } = useLang();
  const badge = lang === "fr" ? "Photo à remplacer" : "Photo to replace";

  return (
    <div className="relative w-full overflow-hidden" style={{ height }}>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, hsl(${hue}, 45%, 12%) 0%, hsl(${hue}, 35%, 22%) 50%, hsl(40, 38%, 38%) 100%)`,
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 8px)",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(10,28,21,0.85) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <Image
          src={EMBLEM_SRC}
          alt=""
          width={180}
          height={180}
          quality={IMAGE_QUALITY.emblem}
          sizes="180px"
          className="h-auto w-[180px] opacity-[0.16]"
        />
      </div>

      <div className="absolute bottom-6 left-5 flex items-center gap-3 md:bottom-8 md:left-8">
        <span className="block h-px w-7 bg-gold" aria-hidden="true" />
        <p className="font-util text-[0.6rem] uppercase tracking-[0.12em] text-cream/85 md:text-xs">
          {caption}
        </p>
      </div>

      <p className="absolute right-5 top-5 font-util text-[0.55rem] uppercase tracking-[0.1em] text-cream/40 md:right-8 md:top-8 md:text-[0.6rem]">
        {badge}
      </p>
    </div>
  );
}
