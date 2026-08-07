"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /**
   * CSS selector for the elements to stagger. Defaults to direct children,
   * which is what you want for a grid or a list.
   */
  selector?: string;
  /** Play on mount instead of on scroll — for above-the-fold content. */
  immediate?: boolean;
  stagger?: number;
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
};

/**
 * Progressive enhancement: children render in their final state server-side.
 * GSAP only pulls them back to the start position once it runs, and
 * `matchMedia` skips the whole thing under prefers-reduced-motion — so with
 * JS off, or motion reduced, the page is simply static and fully readable.
 */
export function Reveal({
  children,
  className,
  selector,
  immediate = false,
  stagger = 0.08,
  delay = 0,
  y = 24,
}: RevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Scope the query to this instance — otherwise every matching element on
      // the page gets swept into one tween.
      const targets = selector
        ? gsap.utils.toArray<HTMLElement>(selector, root.current)
        : Array.from(root.current?.children ?? []);

      if (!targets.length) return;

      // A page opened in a background tab has rAF throttled, so an on-mount
      // tween would freeze part-way and only finish when the tab is focused.
      // Above-the-fold content just renders as-is instead.
      if (immediate && document.visibilityState !== "visible") return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(targets, {
          opacity: 0,
          y,
          duration: 0.6,
          ease: "power2.out",
          stagger,
          delay,
          ...(immediate
            ? {}
            : {
                scrollTrigger: {
                  trigger: root.current,
                  start: "top 85%",
                  once: true,
                },
              }),
        });
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [selector, immediate, stagger, delay, y] },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
