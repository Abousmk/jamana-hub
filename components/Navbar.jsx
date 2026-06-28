"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE, fadeUp, stagger } from "@/lib/motion";
import { useLang } from "@/lib/i18n";
import { NAV_LINKS } from "@/lib/navLinks";
import LanguageToggle from "@/components/LanguageToggle";
import GoldButton from "@/components/ui/GoldButton";

const navSlide = {
  hidden: { opacity: 0, y: -100 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const staticNav = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};

export default function Navbar() {
  const { t } = useLang();
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const shouldAnimateNav = mounted && !reducedMotion;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.header
        variants={shouldAnimateNav ? navSlide : staticNav}
        initial={shouldAnimateNav ? "hidden" : "show"}
        animate="show"
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="relative">
          <motion.div
            className="pointer-events-none absolute inset-0 border-b border-green-line bg-green-abyss"
            animate={{ opacity: scrolled ? 1 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          />

          <nav className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-[4.5rem] md:px-8">
            <Link
              href="/"
              className="relative z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green-abyss"
            >
              <Image
                src="/Jamana_logo_complet_transparent.png"
                alt="Jamana Hub"
                width={140}
                height={32}
                className="h-8 w-auto"
                priority
              />
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              {NAV_LINKS.map(({ key, href }) => (
                <Link
                  key={key}
                  href={href}
                  className="font-body text-sm text-cream/80 transition-opacity duration-300 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green-abyss"
                >
                  {t.nav[key]}
                </Link>
              ))}
              <LanguageToggle />
              <GoldButton tally>{t.nav.postuler}</GoldButton>
            </div>

            <button
              type="button"
              className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green-abyss"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <span
                className={`block h-px w-5 bg-cream transition-[transform,opacity] duration-300 ${
                  menuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-cream transition-[transform,opacity] duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-cream transition-[transform,opacity] duration-300 ${
                  menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </button>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-green-abyss md:hidden"
          >
            <motion.nav
              variants={shouldAnimateNav ? stagger : {}}
              initial={shouldAnimateNav ? "hidden" : "show"}
              animate="show"
              className="flex flex-1 flex-col items-center justify-center gap-8 px-6"
            >
              {NAV_LINKS.map(({ key, href }) => (
                <motion.div key={key} variants={shouldAnimateNav ? fadeUp : {}}>
                  <Link
                    href={href}
                    onClick={closeMenu}
                    className="font-display text-2xl text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    {t.nav[key]}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={shouldAnimateNav ? fadeUp : {}}>
                <LanguageToggle />
              </motion.div>
              <motion.div variants={shouldAnimateNav ? fadeUp : {}}>
                <GoldButton tally onClick={closeMenu}>
                  {t.nav.postuler}
                </GoldButton>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
