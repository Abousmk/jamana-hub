"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMotionActive } from "@/lib/useMotionActive";

const JAMANA_SIZE = "clamp(4rem, 18vw, 13rem)";
const HUB_SIZE = "clamp(6rem, 26vw, 18rem)";
const GOLD = "#C8A951";
const STROKE = "1px #C8A951";
const MOBILE_FILL = "rgba(200, 169, 81, 0.5)";
const STATIC_FILL = "rgba(200, 169, 81, 0.35)";
const VIEWBOX = { w: 720, h: 110 };
const MASK_RADIUS = 165;

const jamanaLayerClass =
  "pointer-events-none absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 select-none font-display text-[length:var(--sig-size)] font-bold leading-none tracking-tight";

const svgTextStyle = {
  fontFamily: "var(--font-display), serif",
  fontWeight: 700,
  fontSize: 88,
};

export default function FooterSignature() {
  const containerRef = useRef(null);
  const maskId = useId().replace(/:/g, "");
  const [pointer, setPointer] = useState(null);
  const [isPointerFine, setIsPointerFine] = useState(false);
  const { motionActive, mounted, reducedMotion } = useMotionActive();

  useEffect(() => {
    if (!mounted) return undefined;

    const mq = window.matchMedia("(pointer: fine) and (min-width: 769px)");
    const update = () => setIsPointerFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [mounted]);

  const desktopInteractive = mounted && isPointerFine && !reducedMotion;
  const showMobileFill = mounted && !isPointerFine && !reducedMotion;
  const showStaticFill = mounted && reducedMotion;

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPointer({
      xPct: ((e.clientX - rect.left) / rect.width) * 100,
      yPct: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPointer(null);
  }, []);

  const maskCenter =
    pointer && desktopInteractive
      ? {
          cx: (pointer.xPct / 100) * VIEWBOX.w,
          cy: (pointer.yPct / 100) * VIEWBOX.h,
        }
      : null;

  return (
    <div
      ref={containerRef}
      className="relative min-h-[280px] overflow-hidden md:min-h-[300px] lg:min-h-[320px]"
      onMouseMove={desktopInteractive ? handleMouseMove : undefined}
      onMouseLeave={desktopInteractive ? handleMouseLeave : undefined}
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 select-none font-display text-[length:var(--hub-size)] font-bold leading-none tracking-tight"
        style={{ "--hub-size": HUB_SIZE, color: "rgba(200, 169, 81, 0.09)" }}
      >
        HUB
      </div>

      {desktopInteractive ? (
        <div
          className="pointer-events-auto absolute left-1/2 top-1/2 z-[2] w-[min(92vw,42rem)] -translate-x-1/2 -translate-y-1/2"
          style={{ "--sig-size": JAMANA_SIZE }}
        >
          <svg
            viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
            className="block h-auto w-full overflow-visible"
            role="presentation"
          >
            <defs>
              <mask id={maskId}>
                <rect width={VIEWBOX.w} height={VIEWBOX.h} fill="black" />
                {maskCenter ? (
                  <circle
                    cx={maskCenter.cx}
                    cy={maskCenter.cy}
                    r={MASK_RADIUS}
                    fill="white"
                  />
                ) : null}
              </mask>
            </defs>

            <text
              x={VIEWBOX.w / 2}
              y={VIEWBOX.h / 2 + 6}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="transparent"
              stroke={GOLD}
              strokeWidth={1}
              style={svgTextStyle}
            >
              JAMANA
            </text>

            {maskCenter ? (
              <text
                x={VIEWBOX.w / 2}
                y={VIEWBOX.h / 2 + 6}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={GOLD}
                mask={`url(#${maskId})`}
                style={svgTextStyle}
              >
                JAMANA
              </text>
            ) : null}
          </svg>
        </div>
      ) : null}

      {showMobileFill ? (
        <>
          <div
            className={jamanaLayerClass}
            style={{
              "--sig-size": JAMANA_SIZE,
              WebkitTextStroke: STROKE,
              color: "transparent",
            }}
          >
            JAMANA
          </div>
          <motion.div
            className={jamanaLayerClass}
            style={{ "--sig-size": JAMANA_SIZE, color: MOBILE_FILL }}
            initial={motionActive ? { opacity: 0.5 } : false}
            whileInView={motionActive ? { opacity: 1 } : undefined}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            JAMANA
          </motion.div>
        </>
      ) : null}

      {showStaticFill ? (
        <>
          <div
            className={jamanaLayerClass}
            style={{
              "--sig-size": JAMANA_SIZE,
              WebkitTextStroke: STROKE,
              color: "transparent",
            }}
          >
            JAMANA
          </div>
          <div
            className={jamanaLayerClass}
            style={{ "--sig-size": JAMANA_SIZE, color: STATIC_FILL }}
          >
            JAMANA
          </div>
        </>
      ) : null}

      {!mounted ? (
        <div
          className={jamanaLayerClass}
          style={{
            "--sig-size": JAMANA_SIZE,
            WebkitTextStroke: STROKE,
            color: "transparent",
          }}
        >
          JAMANA
        </div>
      ) : null}
    </div>
  );
}
