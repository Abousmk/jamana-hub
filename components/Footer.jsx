"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { NAV_LINKS } from "@/lib/navLinks";
import { ACTIVE_SOCIAL_LINKS } from "@/lib/social";
import { useTally } from "@/components/TallyModal";
import LanguageToggle from "@/components/LanguageToggle";

export default function Footer() {
  const { t } = useLang();
  const { open } = useTally();
  const links = t.footer.links;

  return (
    <footer className="border-t border-green-line bg-green-abyss px-5 py-12 md:px-8 md:py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-8">
        <div className="max-w-xs">
          <Link
            href="/"
            className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green-abyss"
          >
            <Image
              src="/Jamana_logo_complet_transparent.png"
              alt="Jamana Hub"
              width={180}
              height={48}
              className="h-11 w-auto"
            />
          </Link>
          <p className="mt-3 font-util text-[0.6rem] uppercase tracking-[0.14em] text-gold/70 md:text-[0.65rem]">
            {t.footer.tagline}
          </p>
        </div>

        <div className="flex flex-wrap gap-10 sm:gap-14">
          <div>
            <p className="font-util text-[0.6rem] uppercase tracking-[0.14em] text-gold md:text-[0.65rem]">
              {t.foot.nav}
            </p>
            <nav className="mt-3 flex flex-col gap-2.5">
              {NAV_LINKS.map(({ key, href }) => (
                <Link
                  key={key}
                  href={href}
                  className="font-body text-sm text-cream/55 transition-opacity duration-300 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  {links[key]}
                </Link>
              ))}
              <button
                type="button"
                onClick={open}
                className="text-left font-body text-sm text-cream/55 transition-opacity duration-300 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                {links.postuler}
              </button>
            </nav>
          </div>

          <div>
            <p className="font-util text-[0.6rem] uppercase tracking-[0.14em] text-gold md:text-[0.65rem]">
              {t.foot.follow}
            </p>
            <nav className="mt-3 flex flex-col gap-2.5">
              {ACTIVE_SOCIAL_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-cream/55 transition-opacity duration-300 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  {label}
                </a>
              ))}
              <p className="font-body text-xs text-cream/30">{t.foot.comingSoon}</p>
            </nav>
          </div>
        </div>

        <div className="flex items-start md:items-end">
          <LanguageToggle />
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-green-line/60 pt-6">
        <p className="font-body text-xs text-cream/35">
          © 2026 Jamana Hub. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
