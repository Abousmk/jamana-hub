"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TALLY_URL = "https://tally.so/r/442AOX?transparentBackground=1";

export default function PostulerPage() {
  const { t } = useLang();

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col bg-green-abyss pt-16 md:pt-[4.5rem]">
        <div className="flex flex-1 flex-col items-center px-5 py-8 md:px-8">
          <h1 className="font-display text-3xl tracking-[-0.02em] text-cream md:text-4xl">
            {t.postuler.title}
          </h1>
          <div className="mt-8 w-full max-w-2xl flex-1 overflow-hidden rounded-2xl border border-green-line bg-green-deep">
            <iframe
              src={TALLY_URL}
              title={t.postuler.title}
              className="h-[calc(100vh-12rem)] min-h-[500px] w-full border-0"
              loading="lazy"
            />
          </div>
          <Link
            href="/"
            className="mt-6 font-util text-xs uppercase tracking-[0.14em] text-gold transition-opacity duration-300 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green-abyss"
          >
            ← {t.postuler.back}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
