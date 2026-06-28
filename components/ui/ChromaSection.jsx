"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./ChromaGrid.css";

export default function ChromaSection({
  children,
  className = "",
  enabled = true,
  radius = 220,
  damping = 0.45,
  fadeOut = 0.6,
}) {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;
    const el = rootRef.current;
    if (!el) return;

    setX.current = gsap.quickSetter(el, "--x", "px");
    setY.current = gsap.quickSetter(el, "--y", "px");
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, [enabled]);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease: "power3.out",
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  const handleMove = (e) => {
    if (!enabled) return;
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    if (!enabled) return;
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true,
    });
  };

  const sectionClass = [
    "chroma-section",
    enabled ? "" : "chroma-section--static",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={rootRef}
      className={sectionClass}
      style={{ "--r": `${radius}px` }}
      onPointerMove={enabled ? handleMove : undefined}
      onPointerLeave={enabled ? handleLeave : undefined}
    >
      {children}
      {enabled ? (
        <>
          <div className="chroma-section__overlay" aria-hidden="true" />
          <div ref={fadeRef} className="chroma-section__fade" aria-hidden="true" />
        </>
      ) : null}
    </div>
  );
}
