"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Highlight } from "@/lib/resume";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Counts up when scrolled into view. The final string is server-rendered, so
 * with JS off, motion reduced, or no `count` config, it simply reads correctly.
 */
export function Counter({
  display,
  count,
  className,
}: {
  display: string;
  count?: Highlight["count"];
  className?: string;
}) {
  const el = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!count || !el.current) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const state = { n: 0 };
        const prefix = count.prefix ?? "";

        gsap.to(state, {
          n: count.to,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: el.current, start: "top 90%", once: true },
          onUpdate: () => {
            if (el.current) {
              el.current.textContent = `${prefix}${Math.round(state.n)}${count.suffix}`;
            }
          },
          // Guarantee the exact final string even if the tween is cut short.
          onComplete: () => {
            if (el.current) el.current.textContent = display;
          },
        });
      });

      return () => mm.revert();
    },
    { scope: el, dependencies: [display, count] },
  );

  return (
    <span ref={el} className={className}>
      {display}
    </span>
  );
}
