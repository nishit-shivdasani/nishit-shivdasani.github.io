"use client";

import { useEffect, useState } from "react";

const READY_EVENT = "ns:ready";

/**
 * Announce that the splash is out of the way and the page is on screen.
 * Also stamps the document so subscribers that mount later still resolve.
 */
export function markReady() {
  if (document.body.dataset.splash === "done") return;
  document.body.dataset.splash = "done";
  window.dispatchEvent(new Event(READY_EVENT));
}

/**
 * True once the page is actually visible.
 *
 * The hero's counters and typewriter finish in ~1.4s, which is behind the
 * splash — without this they would play to an empty room and the page would
 * arrive already settled. Gating them here means the splash hands off *into*
 * the animation.
 *
 * Only JS-driven animation is gated. CSS entrance animations are deliberately
 * left alone: pausing them would need a document-level flag that a failed
 * hydration could never clear, which risks a permanently invisible hero.
 */
export function useReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (document.body.dataset.splash === "done") {
      setReady(true);
      return;
    }
    const onReady = () => setReady(true);
    window.addEventListener(READY_EVENT, onReady, { once: true });
    return () => window.removeEventListener(READY_EVENT, onReady);
  }, []);

  return ready;
}
