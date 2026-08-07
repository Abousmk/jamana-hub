"use client";

import Link from "next/link";
import { useTally } from "@/components/TallyModal";
import { useLang } from "@/lib/i18n";
import { withLocale } from "@/lib/locale";

const baseClass =
  "inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 font-util text-xs font-semibold uppercase tracking-[0.14em] text-green-abyss transition-[transform,opacity] duration-300 hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(200,169,81,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green-abyss active:scale-[0.98]";

export default function GoldButton({ children, href, className = "", onClick, tally }) {
  const { open } = useTally();
  const { lang } = useLang();

  if (tally) {
    return (
      <button
        type="button"
        onClick={(e) => {
          onClick?.(e);
          open();
        }}
        className={`${baseClass} ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      href={withLocale(href ?? "/postuler", lang)}
      onClick={onClick}
      className={`${baseClass} ${className}`}
    >
      {children}
    </Link>
  );
}
