"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { emblemReveal } from "@/lib/motion";
import { useMotionActive } from "@/lib/useMotionActive";
import { EMBLEM_SRC, IMAGE_QUALITY } from "@/lib/imageConfig";

const staticReveal = {
  hidden: { opacity: 1, scale: 1 },
  show: { opacity: 1, scale: 1 },
};

function WatermarkParallax({ className = "" }) {
  const ref = useRef(null);
  const { motionActive } = useMotionActive();

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
        style={motionActive ? { y } : undefined}
        className={motionActive ? "will-change-transform" : undefined}
      >
        <Image
          src={EMBLEM_SRC}
          alt=""
          width={700}
          height={700}
          quality={IMAGE_QUALITY.emblem}
          sizes="700px"
          className="h-auto w-[min(85vw,700px)] opacity-[0.07]"
        />
      </motion.div>
    </div>
  );
}

function HeroEmblem() {
  const sectionRef = useRef(null);
  const { disableMotion, motionActive, motionKey } = useMotionActive();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [16, -16]);

  return (
    <div ref={sectionRef} className="relative w-[110px] md:w-[160px]">
      <motion.div
        key={motionKey}
        variants={disableMotion ? staticReveal : emblemReveal}
        initial={disableMotion ? "show" : "hidden"}
        animate="show"
        style={motionActive ? { y: parallaxY } : undefined}
        className={motionActive ? "will-change-transform" : undefined}
      >
        <Image
          src={EMBLEM_SRC}
          alt="Emblème Jamana Hub"
          width={160}
          height={160}
          priority
          quality={IMAGE_QUALITY.emblem}
          sizes="(max-width: 768px) 110px, 160px"
          className="h-auto w-full"
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
