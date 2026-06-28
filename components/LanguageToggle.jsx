"use client";

import { useLang } from "@/lib/i18n";

export default function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <div
      className="flex items-center gap-1 font-util text-xs uppercase tracking-[0.12em]"
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLang("fr")}
        className={`px-1 transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green-abyss ${
          lang === "fr" ? "text-gold" : "text-cream/45 hover:text-cream/70"
        }`}
        aria-pressed={lang === "fr"}
      >
        FR
      </button>
      <span className="text-cream/25" aria-hidden="true">
        |
      </span>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`px-1 transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green-abyss ${
          lang === "en" ? "text-gold" : "text-cream/45 hover:text-cream/70"
        }`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}
