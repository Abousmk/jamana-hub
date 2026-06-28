"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./ScrollFloat.css";

gsap.registerPlugin(ScrollTrigger);

function refreshScrollTriggers() {
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
}

export default function ScrollFloat({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "top bottom+=15%",
  scrollEnd = "center center",
  stagger = 0.03,
  disabled = false,
}) {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split("").map((char, index) => (
      <span className="char" key={index}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [children]);

  useLayoutEffect(() => {
    if (disabled) return;

    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : undefined;

    const charElements = el.querySelectorAll(".char");
    if (!charElements.length) return;

    const tween = gsap.fromTo(
      charElements,
      {
        willChange: "opacity, transform",
        opacity: 0.35,
        yPercent: 55,
        scaleY: 1.6,
        scaleX: 0.85,
        transformOrigin: "50% 100%",
      },
      {
        duration: animationDuration,
        ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger,
        immediateRender: false,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      },
    );

    refreshScrollTriggers();

    const onLoad = () => refreshScrollTriggers();
    window.addEventListener("load", onLoad);

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => refreshScrollTriggers())
        : null;
    resizeObserver?.observe(el);

    return () => {
      window.removeEventListener("load", onLoad);
      resizeObserver?.disconnect();
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [
    disabled,
    scrollContainerRef,
    animationDuration,
    ease,
    scrollStart,
    scrollEnd,
    stagger,
    children,
  ]);

  return (
    <h2 ref={containerRef} className={`scroll-float ${containerClassName}`}>
      <span className={`scroll-float-text font-display ${textClassName}`}>
        {splitText}
      </span>
    </h2>
  );
}
