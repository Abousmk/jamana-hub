"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useLang } from "@/lib/i18n";

const EMBED_URLS = {
  fr: "https://tally.so/embed/442AOX?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1",
  en: "https://tally.so/embed/ZjAgRa?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1",
};

function loadTallyEmbeds() {
  if (typeof window === "undefined") return;
  if (window.Tally?.loadEmbeds) {
    window.Tally.loadEmbeds();
    return;
  }
  document.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((iframe) => {
    iframe.src = iframe.dataset.tallySrc;
  });
}

export default function TallyEmbed({ title }) {
  const { lang } = useLang();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    loadTallyEmbeds();
  }, [mounted, lang]);

  const embedSrc = EMBED_URLS[lang] ?? EMBED_URLS.fr;

  return (
    <>
      <div className="w-full min-h-[320px]">
        {mounted ? (
          <iframe
            key={lang}
            data-tally-src={embedSrc}
            loading="lazy"
            width="100%"
            height="200"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title={title}
            className="w-full border-0"
          />
        ) : (
          <div className="min-h-[320px] w-full" aria-hidden="true" />
        )}
      </div>
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
        onLoad={loadTallyEmbeds}
      />
    </>
  );
}
