"use client";

import { useEffect } from "react";

const SECTION_IDS = ["work", "experience", "skills", "projects", "contact"];

/**
 * Renders nothing. Owns the four scroll-driven behaviours the design file
 * wired up in `componentDidMount`:
 *
 *   1. the progress bar across the top of the viewport,
 *   2. the active-section highlight in the nav pill,
 *   3. the timeline rail drawing itself in as you pass each role,
 *   4. the pointer tilt on `[data-tilt]` cards.
 *
 * The reveal animation is pure CSS (`animation-timeline: view()`), so it is
 * not handled here.
 */
export function Effects() {
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const bar = document.getElementById("scroll-progress");
      if (bar) {
        bar.style.width = `${max > 0 ? (doc.scrollTop / max) * 100 : 0}%`;
      }

      let active = "";
      for (const id of SECTION_IDS) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= 120) active = id;
      }
      document.querySelectorAll<HTMLElement>("[data-nav]").forEach((link) => {
        const on = link.getAttribute("data-nav") === active;
        link.style.color = on ? "#C15F3C" : "";
        link.style.borderBottomColor = on ? "#C15F3C" : "transparent";
      });
    };

    const onTimeline = () => {
      const list = document.getElementById("timeline");
      const fill = document.getElementById("timeline-fill");
      if (!list || !fill) return;

      const rect = list.getBoundingClientRect();
      // The rail fills to wherever the list crosses 62% down the viewport.
      const anchor = window.innerHeight * 0.62;
      const progress = Math.min(
        Math.max((anchor - rect.top) / rect.height, 0),
        1,
      );
      fill.style.height = `${progress * 100}%`;

      const fillY =
        rect.top + Math.min(progress * rect.height, rect.height - 16) + 8;
      // The "live" dot pulses on its own — only the static ones light up.
      list
        .querySelectorAll<HTMLElement>('[data-timeline-dot="static"]')
        .forEach((dot) => {
          const passed = dot.getBoundingClientRect().top <= fillY;
          dot.style.background = passed ? "#C15F3C" : "#FFFFFF";
          dot.style.borderColor = passed ? "#E0A184" : "#C4C0B2";
          dot.style.transition =
            "background 0.3s ease, border-color 0.3s ease";
        });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onTimeline, { passive: true });
    onScroll();
    onTimeline();

    const tiltCards = Array.from(
      document.querySelectorAll<HTMLElement>("[data-tilt]"),
    );
    const cleanups = tiltCards.map((el) => {
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -4;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 4;
        el.style.transform = `perspective(900px) rotateX(${rx.toFixed(
          2,
        )}deg) rotateY(${ry.toFixed(2)}deg) translateY(-3px)`;
      };
      const onLeave = () => {
        el.style.transform = "";
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onTimeline);
      cleanups.forEach((off) => off());
    };
  }, []);

  return null;
}
