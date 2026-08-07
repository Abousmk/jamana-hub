"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WeavePattern from "@/components/ui/WeavePattern";
import { useLang } from "@/lib/i18n";
import { withLocale } from "@/lib/locale";

function LegalSection({ section }) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="font-display text-xl text-cream md:text-2xl">{section.title}</h2>
      {section.paragraphs?.map((p) => (
        <p
          key={p}
          className="mt-3 font-body text-sm leading-relaxed text-cream/70 md:text-base"
        >
          {p}
        </p>
      ))}
      {section.items?.length ? (
        <ul className="mt-4 list-disc space-y-2 pl-5 font-body text-sm leading-relaxed text-cream/70 md:text-base">
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {section.closing?.map((p) => (
        <p
          key={p}
          className="mt-3 font-body text-sm leading-relaxed text-cream/70 md:text-base"
        >
          {p}
        </p>
      ))}
    </section>
  );
}

export default function LegalDocument({ doc }) {
  const { lang } = useLang();

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden px-5 pt-24 pb-16 md:px-8 md:pt-28 md:pb-20">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-green-deep/78 via-green-deep/68 to-green-abyss/78"
          aria-hidden="true"
        />
        <WeavePattern opacity={0.06} className="z-[1]" />
        <article className="relative z-10 mx-auto max-w-2xl">
          <h1 className="font-display text-[clamp(1.85rem,5vw,2.75rem)] font-normal leading-[1.15] tracking-[-0.02em] text-cream">
            {doc.title}
          </h1>
          <p className="mt-3 font-util text-[0.65rem] uppercase tracking-[0.12em] text-gold/70">
            {doc.lastUpdated}
          </p>

          <div className="mt-10 border-t border-green-line/50 pt-10">
            {doc.sections.map((section) => (
              <LegalSection key={section.title} section={section} />
            ))}
          </div>

          <Link
            href={withLocale("/", lang)}
            className="mt-12 inline-block font-util text-xs uppercase tracking-[0.14em] text-gold transition-opacity duration-300 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green-abyss"
          >
            ← {doc.back}
          </Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
