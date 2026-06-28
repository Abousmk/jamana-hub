"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, fadeUp } from "@/lib/motion";
import { useLang } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import MediaContactForm from "@/components/sections/MediaContactForm";
import { ACTIVE_SOCIAL_LINKS } from "@/lib/social";

const staticFade = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};

export default function MediaPage() {
  const { t } = useLang();
  const reducedMotion = useReducedMotion();
  const m = t.mediaPage;
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-green-abyss px-5 pt-24 pb-16 md:px-8 md:pt-28 md:pb-20">
        <motion.div
          variants={reducedMotion ? staticFade : fadeUp}
          initial="hidden"
          animate="show"
          transition={reducedMotion ? undefined : { duration: 0.7, ease: EASE }}
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
        >
          <SectionEyebrow>{m.eyebrow}</SectionEyebrow>

          <h1 className="mt-4 font-display text-[clamp(2rem,6vw,3.25rem)] font-normal leading-[1.12] tracking-[-0.02em] text-cream">
            {m.title}
          </h1>

          <p className="mt-5 max-w-lg font-body text-base leading-relaxed text-cream/70 md:text-lg">
            {m.intro}
          </p>

          <p className="mt-4 font-body text-sm text-cream/50">{m.episodesNote}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {ACTIVE_SOCIAL_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-green-line px-6 py-3 font-util text-xs font-semibold uppercase tracking-[0.14em] text-cream/80 transition-[transform,opacity,border-color] duration-300 hover:border-gold hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green-abyss"
              >
                {label}
              </a>
            ))}
            {contactEmail ? (
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center justify-center rounded-full border border-green-line px-6 py-3 font-util text-xs font-semibold uppercase tracking-[0.14em] text-cream/80 transition-[transform,opacity,border-color] duration-300 hover:border-gold hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green-abyss"
              >
                {m.email}
              </a>
            ) : null}
          </div>

          <MediaContactForm />
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
