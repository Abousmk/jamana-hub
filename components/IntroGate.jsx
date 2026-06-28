"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useLang } from "@/lib/i18n";
import { EASE, fadeUp, stagger } from "@/lib/motion";
import { EMBLEM_SRC, IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/imageConfig";

const INTRO_IMAGES = Array.from({ length: 7 }, (_, i) => `/intro/intro${i + 1}.jpg`);
const SLIDE_DURATION = 3.5;
const CROSSFADE = 2.4;
const CROSSFADE_REDUCED = 1.2;
const SLIDE_DURATION_REDUCED = 6;
const KEN_BURNS_DURATION = 14;

function IntroSlideshow({ reducedMotion }) {
  const [current, setCurrent] = useState(0);
  const slideMs = (reducedMotion ? SLIDE_DURATION_REDUCED : SLIDE_DURATION) * 1000;
  const fadeDuration = reducedMotion ? CROSSFADE_REDUCED : CROSSFADE;

  useEffect(() => {
    const id = window.setInterval(() => {
      setCurrent((c) => (c + 1) % INTRO_IMAGES.length);
    }, slideMs);
    return () => window.clearInterval(id);
  }, [slideMs]);

  const src = INTRO_IMAGES[current];

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={src}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: fadeDuration, ease: EASE }}
        >
          {reducedMotion ? (
            <Image
              src={src}
              alt=""
              fill
              priority={current === 0}
              quality={IMAGE_QUALITY.fullscreen}
              sizes={IMAGE_SIZES.full}
              className="object-cover"
            />
          ) : (
            <motion.div
              className="absolute inset-[-8%] will-change-transform"
              initial={{ scale: 1 }}
              animate={{ scale: 1.12 }}
              transition={{ duration: KEN_BURNS_DURATION, ease: "linear" }}
            >
              <Image
                src={src}
                alt=""
                fill
                priority={current === 0}
                quality={IMAGE_QUALITY.fullscreen}
                sizes={IMAGE_SIZES.full}
                className="object-cover"
              />
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Green gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,28,21,0.55), rgba(10,28,21,0.78))",
        }}
      />

      {/* Radial vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(10,28,21,0.72) 100%)",
        }}
      />

      {/* Film grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(245,240,227,0.03) 2px,
            rgba(245,240,227,0.03) 4px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            rgba(200,169,81,0.02) 2px,
            rgba(200,169,81,0.02) 4px
          )`,
        }}
      />
    </div>
  );
}

function MouseGlow({ active }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return undefined;

    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      <div
        className="absolute h-[min(70vw,520px)] w-[min(70vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: pos.x,
          top: pos.y,
          background:
            "radial-gradient(circle, rgba(200,169,81,0.10) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

function AmbienceToggle({ disabled }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = useCallback(() => {
    if (disabled || !audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.volume = 0.25;
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [disabled, playing]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  return (
    <>
      {!disabled && (
        <audio ref={audioRef} src="/intro/ambience.mp3" preload="none" loop />
      )}
      <button
        type="button"
        onClick={toggle}
        disabled={disabled}
        aria-label={playing ? "Couper l'ambiance sonore" : "Activer l'ambiance sonore"}
        aria-pressed={playing}
        className={`absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-green-abyss/40 backdrop-blur-sm transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green-abyss md:right-6 md:top-6 ${
          disabled
            ? "cursor-default text-cream/25 opacity-50"
            : "text-gold/70 hover:border-gold/60 hover:text-gold"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-5 w-5"
          aria-hidden="true"
        >
          {playing ? (
            <>
              <path d="M9 18V6l6 4-6 4z" />
              <path d="M16 6v12" />
            </>
          ) : (
            <>
              <path d="M9 18V6l6 4-6 4z" />
              <path d="M18.5 8.5a5 5 0 0 1 0 7" />
              <path d="M21 6a9 9 0 0 1 0 12" />
            </>
          )}
        </svg>
      </button>
    </>
  );
}

export default function IntroGate() {
  const { setLang } = useLang();
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [audioAvailable, setAudioAvailable] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    fetch("/intro/ambience.mp3", { method: "HEAD" })
      .then((res) => setAudioAvailable(res.ok))
      .catch(() => setAudioAvailable(false));
  }, []);

  const complete = useCallback(
    (lang) => {
      setLang(lang);
      document.documentElement.lang = lang;
      setExiting(true);
      window.setTimeout(() => setVisible(false), 800);
    },
    [setLang],
  );

  if (!mounted || !visible) return null;

  const showGlow = !reducedMotion && isDesktop;

  return (
    <motion.div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-green-abyss${
        exiting ? " pointer-events-none" : ""
      }`}
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.8, ease: EASE }}
      aria-modal="true"
      role="dialog"
      aria-label="Introduction Jamana Hub"
    >
      <IntroSlideshow reducedMotion={reducedMotion} />
      <MouseGlow active={showGlow} />

      <AmbienceToggle disabled={!audioAvailable} />

      <motion.div
        className="relative z-10 flex max-w-lg flex-col items-center px-6 py-10 text-center"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp} className="mb-6">
          <Image
            src={EMBLEM_SRC}
            alt="Emblème Jamana"
            width={120}
            height={120}
            quality={IMAGE_QUALITY.emblem}
            sizes="110px"
            className="h-auto w-[88px] drop-shadow-[0_0_28px_rgba(200,169,81,0.45)] md:w-[110px]"
          />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mb-4 font-util text-[0.65rem] uppercase tracking-[0.28em] text-gold md:text-xs"
        >
          FOI · AMBITION · EXCELLENCE
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="font-display text-balance text-[1.65rem] leading-tight text-cream md:text-4xl"
        >
          Bienvenue dans
          <br />
          <span className="italic text-gold-light">l&apos;univers de Jamana</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-3 font-body text-sm text-cream/55 md:text-base"
        >
          Welcome to the world of Jamana
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-8 font-util text-[0.7rem] uppercase tracking-[0.18em] text-cream/45 md:text-xs"
        >
          Choisis ta langue · Choose your language
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-5 flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center"
        >
          <button
            type="button"
            onClick={() => complete("fr")}
            className="group rounded-sm border border-gold/50 bg-[rgba(200,169,81,0.08)] px-8 py-3.5 font-util text-sm uppercase tracking-[0.14em] text-cream backdrop-blur-md transition-[transform,background-color,color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-green-abyss hover:shadow-[0_8px_32px_rgba(200,169,81,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green-abyss"
          >
            Français
          </button>
          <button
            type="button"
            onClick={() => complete("en")}
            className="group rounded-sm border border-gold/50 bg-[rgba(200,169,81,0.08)] px-8 py-3.5 font-util text-sm uppercase tracking-[0.14em] text-cream backdrop-blur-md transition-[transform,background-color,color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-green-abyss hover:shadow-[0_8px_32px_rgba(200,169,81,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green-abyss"
          >
            English
          </button>
        </motion.div>
      </motion.div>

      <motion.button
        type="button"
        onClick={() => complete("fr")}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 font-util text-[0.7rem] uppercase tracking-[0.16em] text-cream/40 transition-opacity duration-300 hover:text-cream/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green-abyss"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
      >
        Passer · Skip
      </motion.button>
    </motion.div>
  );
}
