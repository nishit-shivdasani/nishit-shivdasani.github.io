"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Sticky card stack: each card parks below the nav while the next one slides
 * over it, and the outgoing card scales back so the stack reads as depth.
 *
 * Sticky positioning does the pinning, not ScrollTrigger — the browser handles
 * it natively, so there's no pin-spacer to fight and nothing breaks if the
 * scrub never runs.
 */
export function StackedCards({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(
          "[data-case]",
          root.current,
        );

        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;

          gsap.to(card, {
            scale: 0.93,
            opacity: 0.4,
            ease: "none",
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: "top top+=140",
              scrub: true,
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="space-y-8">
      {children}
    </div>
  );
}
