"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Section title that wipes up out of a clipping mask, with the index and rule
 * drawing in behind it.
 */
export function MaskHeading({ index, title }: { index: string; title: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
        });

        tl.from("[data-title]", {
          yPercent: 115,
          duration: 0.8,
          ease: "power3.out",
        })
          .from("[data-index]", { opacity: 0, x: -12, duration: 0.5 }, 0.15)
          .from("[data-rule]", { scaleX: 0, duration: 0.9, ease: "power3.out" }, 0.2);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="flex items-baseline gap-4">
      <span data-index className="font-mono text-sm text-accent">
        {index}
      </span>
      <span className="overflow-hidden py-[0.05em]">
        <h2
          data-title
          className="inline-block text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {title}
        </h2>
      </span>
      <span
        data-rule
        aria-hidden
        className="h-px flex-1 origin-left bg-border"
      />
    </div>
  );
}
