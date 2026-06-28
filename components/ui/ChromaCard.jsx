"use client";

import { useCallback } from "react";
import "./ChromaGrid.css";

export default function ChromaCard({
  children,
  className = "",
  disabled = false,
  as: Component = "div",
  ...props
}) {
  const handleMouseMove = useCallback(
    (e) => {
      if (disabled) return;
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    },
    [disabled],
  );

  const wrapperClass = [
    "chroma-card-wrapper",
    disabled ? "chroma-card-wrapper--static" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component
      className={wrapperClass}
      onMouseMove={disabled ? undefined : handleMouseMove}
      {...props}
    >
      {children}
    </Component>
  );
}
