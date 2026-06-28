"use client";

import WeavePattern from "@/components/ui/WeavePattern";

export default function GlobalBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-green-abyss" />
      <WeavePattern opacity={0.06} />
    </div>
  );
}
