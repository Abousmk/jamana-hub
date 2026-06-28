"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  Home,
  LayoutGrid,
  Menu,
  Play,
  Send,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";
import { ACTIVE_SOCIAL_LINKS } from "@/lib/social";
import { useTally } from "@/components/TallyModal";

const SPRING = { type: "spring", stiffness: 420, damping: 28, mass: 0.85 };

const ITEM_FOOTPRINT = 58;
const EDGE_PAD = 24;
const MIN_RADIUS = 52;
const MAX_RADIUS = 88;

function polarOffset(index, total, radius) {
  const startDeg = -90;
  const step = 360 / total;
  const rad = ((startDeg + step * index) * Math.PI) / 180;
  return {
    x: Math.round(Math.cos(rad) * radius),
    y: Math.round(Math.sin(rad) * radius),
  };
}

function useMenuDimensions() {
  const [dims, setDims] = useState({ containerSize: 248, radius: 72 });

  useEffect(() => {
    const update = () => {
      const minDim = Math.min(window.innerWidth, window.innerHeight);
      const maxRadius = Math.floor(
        (minDim - EDGE_PAD * 2 - ITEM_FOOTPRINT) / 2,
      );
      const radius = Math.max(
        MIN_RADIUS,
        Math.min(MAX_RADIUS, maxRadius),
      );
      setDims({
        radius,
        containerSize: radius * 2 + ITEM_FOOTPRINT,
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return dims;
}

function LanguageRow({ lang, setLang }) {
  return (
    <div
      className="flex items-center gap-1 font-util text-[0.65rem] uppercase tracking-[0.12em]"
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLang("fr")}
        className={cn(
          "rounded px-1.5 py-0.5 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
          lang === "fr" ? "text-gold" : "text-cream/45 hover:text-cream/70",
        )}
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
        className={cn(
          "rounded px-1.5 py-0.5 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
          lang === "en" ? "text-gold" : "text-cream/45 hover:text-cream/70",
        )}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}

export default function CircleMenu({ className, onOpenChange }) {
  const { lang, setLang, t } = useLang();
  const { open: openTally } = useTally();
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { containerSize, radius } = useMenuDimensions();

  const socialItems = useMemo(
    () =>
      ACTIVE_SOCIAL_LINKS.map((link) => ({
        key: link.label.toLowerCase(),
        label: link.label,
        href: link.href,
        iconSrc: link.iconSrc,
        external: true,
      })),
    [],
  );

  const items = useMemo(
    () => [
      {
        key: "accueil",
        label: t.nav.accueil,
        href: "/",
        icon: Home,
        external: false,
      },
      {
        key: "hub",
        label: t.nav.hub,
        href: "/#hub",
        icon: LayoutGrid,
        external: false,
      },
      {
        key: "media",
        label: t.nav.media,
        href: "/media",
        icon: Play,
        external: false,
      },
      {
        key: "postuler",
        label: t.nav.postuler,
        icon: Send,
        external: false,
        onClick: () => openTally(),
      },
      ...socialItems,
    ],
    [t.nav, socialItems, openTally],
  );

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const itemClass = cn(
    "flex min-w-[3.25rem] flex-col items-center justify-center gap-1 rounded-2xl border border-gold/25",
    "bg-green-deep px-2 py-2 text-cream shadow-[0_4px_24px_rgba(10,28,21,0.45)]",
    "transition-[transform,opacity,border-color,box-shadow] duration-300",
    "hover:border-gold/55 hover:bg-green-mid hover:shadow-[0_0_22px_rgba(200,169,81,0.35)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
  );

  const overlay = mounted
    ? createPortal(
        <AnimatePresence>
          {open ? (
            <>
              <motion.button
                type="button"
                key="backdrop"
                aria-label="Fermer le menu"
                className="fixed inset-0 z-[100] cursor-default bg-green-abyss/85"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0.01 : 0.25 }}
                onClick={close}
              />

              <div
                key="menu-layer"
                className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center"
                role="dialog"
                aria-modal="true"
                aria-label="Navigation"
              >
                <div
                  className="pointer-events-auto relative"
                  style={{ width: containerSize, height: containerSize }}
                >
                  <motion.div
                    className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-2xl border border-gold/20 bg-green-deep/90 px-4 py-2.5 shadow-[0_4px_32px_rgba(10,28,21,0.6)] backdrop-blur-sm"
                    initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.85 }}
                    transition={{
                      duration: reducedMotion ? 0.15 : 0.3,
                      delay: reducedMotion ? 0 : 0.05,
                    }}
                  >
                    <LanguageRow lang={lang} setLang={setLang} />
                  </motion.div>

                  {items.map((item, index) => {
                    const { x, y } = polarOffset(index, items.length, radius);
                    const Icon = item.icon;

                    const motionProps = reducedMotion
                      ? {
                          initial: { opacity: 0, x: 0, y: 0 },
                          animate: { opacity: 1, x, y },
                          exit: { opacity: 0, x: 0, y: 0 },
                          transition: { duration: 0.2, delay: index * 0.04 },
                        }
                      : {
                          initial: { opacity: 0, x: 0, y: 0, scale: 0.55 },
                          animate: { opacity: 1, x, y, scale: 1 },
                          exit: {
                            opacity: 0,
                            x: 0,
                            y: 0,
                            scale: 0.55,
                            transition: { duration: 0.2 },
                          },
                          transition: {
                            ...SPRING,
                            delay: index * 0.05,
                          },
                        };

                    const inner = (
                      <>
                        {item.iconSrc ? (
                          <Image
                            src={item.iconSrc}
                            alt=""
                            width={22}
                            height={22}
                            className="h-[1.375rem] w-[1.375rem] object-contain"
                            aria-hidden
                          />
                        ) : (
                          <Icon
                            className="h-[1.125rem] w-[1.125rem] text-gold"
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        )}
                        <span className="max-w-[4.25rem] truncate text-center font-util text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-cream/90">
                          {item.label}
                        </span>
                      </>
                    );

                    return (
                      <motion.div
                        key={item.key}
                        {...motionProps}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      >
                        {item.href ? (
                          <Link
                            href={item.href}
                            target={item.external ? "_blank" : undefined}
                            rel={
                              item.external ? "noopener noreferrer" : undefined
                            }
                            onClick={close}
                            className={itemClass}
                          >
                            {inner}
                          </Link>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              item.onClick?.();
                              close();
                            }}
                            className={itemClass}
                          >
                            {inner}
                          </button>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : null}
        </AnimatePresence>,
        document.body,
      )
    : null;

  return (
    <>
      <div className={cn("relative", className)}>
        <motion.button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gold text-green-abyss shadow-[0_0_20px_rgba(200,169,81,0.35)] transition-[transform,opacity] duration-300 hover:shadow-[0_0_28px_rgba(200,169,81,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green-abyss active:scale-95"
          whileTap={reducedMotion ? undefined : { scale: 0.94 }}
        >
          {open ? (
            <X className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
          )}
        </motion.button>
      </div>
      {overlay}
    </>
  );
}
