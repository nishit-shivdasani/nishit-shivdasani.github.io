"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const SEEN_KEY = "preloader-seen";

/**
 * Counter → word → curtain lift.
 *
 * Skipped on repeat visits within a session, and under reduced motion — a
 * loading screen you can't skip is a tax on everyone after the first look.
 * Page content is already in the DOM underneath; this only sits on top.
 */
export function Preloader() {
  const [done, setDone] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const seen = sessionStorage.getItem(SEEN_KEY) === "1";

      if (reduced || seen || document.visibilityState !== "visible") {
        setDone(true);
        return;
      }

      // Lenis scrolls the root, so `body { overflow: hidden }` wouldn't hold it.
      // Its own stop class is what the Lenis CSS above keys off.
      const lockScroll = (locked: boolean) =>
        document.documentElement.classList.toggle("lenis-stopped", locked);

      lockScroll(true);

      const progress = { n: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem(SEEN_KEY, "1");
          lockScroll(false);
          setDone(true);
        },
      });

      tl.to(progress, {
        n: 100,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.textContent = String(Math.round(progress.n)).padStart(
              3,
              "0",
            );
          }
        },
      })
        .to("[data-preload-count]", { opacity: 0, duration: 0.25 })
        .fromTo(
          "[data-preload-word]",
          { opacity: 0, yPercent: 60 },
          { opacity: 1, yPercent: 0, duration: 0.4, ease: "power2.out" },
        )
        .to("[data-preload-word]", { opacity: 0, duration: 0.3, delay: 0.35 })
        .to(root.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
        });

      return () => lockScroll(false);
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
    >
      <div className="relative flex items-center justify-center">
        <span
          data-preload-count
          className="font-mono text-5xl tabular-nums text-fg sm:text-7xl"
        >
          <span ref={countRef}>000</span>
          <span className="text-accent">%</span>
        </span>
        <span
          data-preload-word
          className="absolute font-mono text-2xl uppercase tracking-[0.4em] text-accent opacity-0 sm:text-3xl"
        >
          Welcome
        </span>
      </div>
    </div>
  );
}
