"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const WORDS = [
  "Backend",
  "Distributed Systems",
  "NestJS",
  "Microservices",
  "TypeScript",
  "Event-Driven",
  "System Design",
];

/**
 * Full-bleed scrolling wordmark. Two identical tracks slide by 50% of the
 * pair's width, so the loop seam never lands in view. Scroll velocity nudges
 * the speed, which is what stops it feeling like a static GIF.
 */
export function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.to("[data-track]", {
          xPercent: -50,
          duration: 24,
          ease: "none",
          repeat: -1,
        });

        const trigger = ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            gsap.to(tween, {
              timeScale: 1 + Math.min(Math.abs(self.getVelocity()) / 900, 3),
              duration: 0.3,
              overwrite: true,
            });
          },
        });

        return () => {
          tween.kill();
          trigger.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-y border-border py-6"
    >
      <div data-track className="flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {WORDS.map((word) => (
              <li
                key={`${copy}-${word}`}
                className="flex shrink-0 items-center gap-8 px-8"
              >
                <span className="text-3xl font-semibold tracking-tight text-fg/25 sm:text-5xl">
                  {word}
                </span>
                <span className="text-2xl text-accent sm:text-4xl">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
