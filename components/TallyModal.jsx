"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { useLang } from "@/lib/i18n";

const TALLY_URL = "https://tally.so/r/442AOX?transparentBackground=1";

const TallyContext = createContext(null);

export function TallyProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <TallyContext.Provider value={{ open, close, isOpen }}>
      {children}
      <TallyModalOverlay />
    </TallyContext.Provider>
  );
}

export function useTally() {
  const ctx = useContext(TallyContext);
  if (!ctx) {
    throw new Error("useTally must be used within TallyProvider");
  }
  return ctx;
}

function TallyModalOverlay() {
  const { isOpen, close } = useTally();
  const { t } = useLang();
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t.tally.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.3, ease: EASE }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-green-abyss/90 p-0 sm:items-center sm:p-6"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : 40 }}
            transition={{ duration: reducedMotion ? 0 : 0.4, ease: EASE }}
            className="relative flex h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-green-line bg-green-deep sm:h-[85vh] sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-green-line px-5 py-4">
              <p className="font-util text-xs uppercase tracking-[0.14em] text-gold">
                {t.tally.title}
              </p>
              <button
                type="button"
                onClick={close}
                aria-label={t.tally.close}
                className="flex h-8 w-8 items-center justify-center rounded-full text-cream/70 transition-opacity duration-300 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <span className="text-xl leading-none" aria-hidden="true">
                  ×
                </span>
              </button>
            </div>
            <iframe
              src={TALLY_URL}
              title={t.tally.title}
              className="min-h-0 flex-1 w-full border-0"
              loading="lazy"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
