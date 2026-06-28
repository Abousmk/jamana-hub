"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { NAV_LINKS } from "@/lib/navLinks";
import { ACTIVE_SOCIAL_LINKS } from "@/lib/social";
import { useTally } from "@/components/TallyModal";
import LanguageToggle from "@/components/LanguageToggle";
import WeavePattern from "@/components/ui/WeavePattern";
import FooterSignature from "@/components/ui/FooterSignature";
import { LOGO_SRC, IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/imageConfig";

const linkClass =
  "font-body text-sm text-cream/55 transition-[transform,color] duration-300 hover:translate-x-[3px] hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold";

export default function Footer() {
  const { t } = useLang();
  const { open } = useTally();
  const links = t.footer.links;

  return (
    <footer className="relative w-full overflow-hidden border-t border-green-line bg-green-abyss">
      <WeavePattern opacity={0.075} />

      <div className="relative z-10 px-4 py-12 sm:px-6 md:py-14 lg:px-8">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-8">
          <div className="max-w-xs">
            <Link
              href="/"
              className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green-abyss"
            >
              <Image
                src={LOGO_SRC}
                alt="Jamana Hub"
                width={180}
                height={48}
                quality={IMAGE_QUALITY.emblem}
                sizes={IMAGE_SIZES.footer}
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
                  <Link key={key} href={href} className={linkClass}>
                    {links[key]}
                  </Link>
                ))}
                <button type="button" onClick={open} className={`text-left ${linkClass}`}>
                  {links.postuler}
                </button>
              </nav>
            </div>

            <div>
              <p className="font-util text-[0.6rem] uppercase tracking-[0.14em] text-gold md:text-[0.65rem]">
                {t.foot.follow}
              </p>
              <nav className="mt-3 flex flex-col gap-2.5">
                {ACTIVE_SOCIAL_LINKS.map(({ label, href, iconSrc }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 ${linkClass}`}
                  >
                    <Image
                      src={iconSrc}
                      alt=""
                      width={18}
                      height={18}
                      className="h-[1.125rem] w-[1.125rem] shrink-0 object-contain"
                      aria-hidden
                    />
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
      </div>

      <FooterSignature />

      <div className="relative z-10 px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1400px] border-t border-gold/25 pt-6 text-center">
          <p className="font-body text-xs text-cream/35">
            © 2026 Jamana Hub. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
