"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/**
 * three.js is the heaviest thing on the page, so it is code-split and only
 * fetched once we know the device actually wants it.
 */
const ServiceMesh = dynamic(
  () => import("./ServiceMesh").then((m) => m.ServiceMesh),
  { ssr: false },
);

export function HeroScene() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const motionOk = window.matchMedia(
      "(prefers-reduced-motion: no-preference)",
    ).matches;
    const wideEnough = window.matchMedia("(min-width: 768px)").matches;
    // Rough proxy for "can spare a WebGL context" — keeps it off weak phones.
    const capable = (navigator.hardwareConcurrency ?? 2) >= 4;

    setEnabled(motionOk && wideEnough && capable);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_60%_60%_at_60%_40%,#000_35%,transparent_75%)]"
    >
      <ServiceMesh />
    </div>
  );
}
