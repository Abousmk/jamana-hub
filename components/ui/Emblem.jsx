"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { emblemReveal } from "@/lib/motion";

const staticReveal = {
  hidden: { opacity: 1, scale: 1 },
  show: { opacity: 1, scale: 1 },
};

function WatermarkParallax({ className = "" }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [48, -48]);

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <motion.div
        style={reducedMotion ? undefined : { y }}
        className="will-change-transform"
      >
        <Image
          src="/Jamana_embleme_seul_transparent.png"
          alt=""
          width={700}
          height={700}
          className="h-auto w-[min(85vw,700px)] opacity-[0.07]"
        />
      </motion.div>
    </div>
  );
}

function HeroEmblem() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [16, -16]);

  return (
    <div ref={sectionRef} className="relative w-[110px] md:w-[160px]">
      <motion.div
        variants={reducedMotion ? staticReveal : emblemReveal}
        initial="hidden"
        animate="show"
        style={reducedMotion ? undefined : { y: parallaxY }}
        className="will-change-transform"
      >
        <Image
          src="/Jamana_embleme_seul_transparent.png"
          alt="Emblème Jamana Hub"
          width={160}
          height={160}
          className="h-auto w-full"
          priority
        />
      </motion.div>
    </div>
  );
}

export default function Emblem({ variant = "hero" }) {
  if (variant === "watermark") {
    return <WatermarkParallax />;
  }

  return <HeroEmblem />;
}
