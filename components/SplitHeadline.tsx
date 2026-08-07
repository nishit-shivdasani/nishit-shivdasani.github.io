"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Per-character entrance. The full string stays in `aria-label` and each glyph
 * is aria-hidden, so assistive tech reads the name once, not letter by letter.
 */
export function SplitHeadline({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const root = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (document.visibilityState !== "visible") return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-char]", {
          opacity: 0,
          yPercent: 110,
          rotateX: -60,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.028,
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <h1 ref={root} aria-label={text} className={className}>
      {text.split(" ").map((word, wordIndex, words) => (
        <span
          key={`${word}-${wordIndex}`}
          className="inline-block overflow-hidden py-[0.08em] align-bottom"
        >
          {word.split("").map((char, charIndex) => (
            <span
              key={`${char}-${charIndex}`}
              data-char
              aria-hidden
              className="inline-block"
            >
              {char}
            </span>
          ))}
          {wordIndex < words.length - 1 && (
            <span aria-hidden className="inline-block">
              &nbsp;
            </span>
          )}
        </span>
      ))}
    </h1>
  );
}
