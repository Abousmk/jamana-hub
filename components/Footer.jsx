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
    <footer className="relative w-full overflow-hidden bg-green-abyss">
      <WeavePattern opacity={0.075} />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <div className="w-full overflow-hidden rounded-2xl border border-green-line bg-green-deep/90">
          <div className="flex w-full flex-col items-center gap-10 px-6 py-10 text-center md:flex-row md:items-start md:justify-between md:gap-8 md:px-10 md:py-12 md:text-left">
            <div className="flex max-w-xs flex-col items-center md:items-start">
              <Link
                href="/"
                className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green-deep"
              >
                <Image
                  src={LOGO_SRC}
                  alt="Jamana Hub"
                  width={180}
                  height={48}
                  quality={IMAGE_QUALITY.emblem}
                  sizes={IMAGE_SIZES.footer}
                  className="mx-auto h-11 w-auto md:mx-0"
                />
              </Link>
              <p className="mt-3 font-util text-[0.6rem] uppercase tracking-[0.14em] text-gold/70 md:text-[0.65rem]">
                {t.footer.tagline}
              </p>
            </div>

            <div className="flex flex-col items-center gap-10 sm:flex-row sm:gap-14 md:items-start">
              <div className="flex flex-col items-center md:items-start">
                <p className="font-util text-[0.6rem] uppercase tracking-[0.14em] text-gold md:text-[0.65rem]">
                  {t.foot.nav}
                </p>
                <nav className="mt-3 flex flex-col items-center gap-2.5 md:items-start">
                  {NAV_LINKS.map(({ key, href }) => (
                    <Link key={key} href={href} className={linkClass}>
                      {links[key]}
                    </Link>
                  ))}
                  <button
                    type="button"
                    onClick={open}
                    className={`text-center md:text-left ${linkClass}`}
                  >
                    {links.postuler}
                  </button>
                </nav>
              </div>

              <div className="flex flex-col items-center md:items-start">
                <p className="font-util text-[0.6rem] uppercase tracking-[0.14em] text-gold md:text-[0.65rem]">
                  {t.foot.follow}
                </p>
                <nav className="mt-3 flex flex-col items-center gap-2.5 md:items-start">
                  {ACTIVE_SOCIAL_LINKS.map(({ label, href, iconSrc }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center gap-2 md:justify-start ${linkClass}`}
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

            <div className="flex items-center justify-center md:items-end">
              <LanguageToggle />
            </div>
          </div>

          <FooterSignature />

          <div className="border-t border-green-line/60 px-6 py-6 text-center">
            <p className="font-body text-xs text-cream/35">
              © 2026 Jamana Hub. {t.footer.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
