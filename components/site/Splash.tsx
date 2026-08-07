"use client";

import { useEffect, useRef, useState } from "react";
import { markReady } from "./useReady";

/** How long the trace takes to run start → finish. */
const FILL_MS = 1900;
/** Never dismiss before the trace has actually completed. */
const MIN_MS = FILL_MS;
const MAX_MS = 2800;
/** Must match the `.splash` transition duration in globals.css. */
const EXIT_MS = 450;
/** The duration the trace reports once complete. */
const TRACE_MS = 142;

type Span = {
  label: string;
  /** Badge for the backing store / transport, mirroring a real trace. */
  tag?: string;
  /**
   * Start and end as a fraction of the whole trace. This offset is what makes
   * the bars cascade diagonally instead of stacking into a plain bar chart.
   */
  from: number;
  to: number;
  ms: number;
  tone?: "root" | "cache";
  depth: 0 | 1;
};

/**
 * A plausible request trace for this page: gateway in, auth, a cache hit, the
 * two queries that actually cost something, then the stream out. The last span
 * runs to 1 so the waterfall stays alive right up to the handoff.
 */
const SPANS: Span[] = [
  { label: "gateway.request", from: 0, to: 1, ms: 142, tone: "root", depth: 0 },
  { label: "auth.verify", from: 0.04, to: 0.15, ms: 12, depth: 1 },
  {
    label: "profile.load",
    tag: "CACHE",
    from: 0.15,
    to: 0.29,
    ms: 18,
    tone: "cache",
    depth: 1,
  },
  { label: "work.query", tag: "PG", from: 0.29, to: 0.62, ms: 47, depth: 1 },
  { label: "skills.aggregate", from: 0.57, to: 0.8, ms: 31, depth: 1 },
  { label: "render.stream", tag: "SSE", from: 0.8, to: 1, ms: 24, depth: 1 },
];

/**
 * First-load overlay, drawn as a distributed trace waterfall — the view a
 * backend engineer actually lives in.
 *
 * The animation writes to the DOM directly rather than through state: a
 * `setState` per frame would re-render six spans sixty times a second for no
 * benefit, and on a mid-range phone that is exactly the jank you notice on
 * first paint. React owns the markup; the rAF loop owns the numbers.
 *
 * Safety properties, unchanged:
 *  - Purely an overlay; the real page is fully present in the HTML underneath,
 *    so crawlers and no-JS visitors are unaffected.
 *  - globals.css force-hides `.splash` at 3.4s via `splashFailsafe`, so a
 *    failed hydration cannot leave the page covered.
 *  - The scroll lock lives in JS for the same reason.
 */
export function Splash() {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  const traceRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const msRef = useRef<(HTMLSpanElement | null)[]>([]);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const elapsedRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const liveRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (document.body.dataset.splash === "seen") {
      setGone(true);
      markReady();
      return;
    }

    const started = performance.now();
    let exitTimer: ReturnType<typeof setTimeout>;
    let frame = 0;
    let dismissed = false;

    /** Paint one instant of the trace. `t` is 0 → 1 across the whole request. */
    const paint = (t: number) => {
      SPANS.forEach((span, i) => {
        const p = Math.min(
          Math.max((t - span.from) / (span.to - span.from), 0),
          1,
        );
        const bar = barsRef.current[i];
        if (bar) bar.style.width = `${(span.to - span.from) * p * 100}%`;

        const ms = msRef.current[i];
        if (ms) {
          ms.textContent = `${Math.round(span.ms * p)}ms`;
          ms.dataset.done = String(p >= 1);
        }
        // Highlights whichever span is mid-flight, so the eye follows the
        // cascade down the waterfall.
        const row = rowsRef.current[i];
        if (row) row.dataset.active = String(p > 0 && p < 1);
      });

      // Drives the playhead's position in pure CSS calc.
      traceRef.current?.style.setProperty("--t", String(t));
      if (elapsedRef.current) {
        elapsedRef.current.textContent = `${Math.round(t * TRACE_MS)} ms`;
      }
      const finished = t >= 1;
      if (statusRef.current) {
        statusRef.current.textContent = finished ? "200 OK" : "···";
        statusRef.current.dataset.done = String(finished);
      }
      if (liveRef.current) {
        liveRef.current.textContent = finished ? "complete" : "running";
      }
      traceRef.current?.setAttribute(
        "aria-valuenow",
        String(Math.round(t * 100)),
      );
    };

    const tick = (now: number) => {
      const t = Math.min((now - started) / FILL_MS, 1);
      paint(t);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const dismiss = () => {
      if (dismissed) return;
      dismissed = true;
      cancelAnimationFrame(frame);
      // Never wipe away mid-trace — land on a completed 200 first.
      paint(1);
      setLeaving(true);
      // Fire as the wipe starts so the hero's counters and typewriter are
      // already running by the time the splash clears.
      markReady();
      exitTimer = setTimeout(() => setGone(true), EXIT_MS);
    };

    const waitOut = () => {
      const remaining = Math.max(0, MIN_MS - (performance.now() - started));
      setTimeout(dismiss, remaining);
    };

    if (document.readyState === "complete") waitOut();
    else window.addEventListener("load", waitOut, { once: true });

    const cap = setTimeout(dismiss, MAX_MS);

    // Must be <html>, not <body>: globals.css sets `overflow-x: clip` on
    // <html>, and the viewport takes its overflow from the first of the two
    // that isn't `visible` — so locking <body> would do nothing.
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";

    return () => {
      clearTimeout(cap);
      clearTimeout(exitTimer);
      cancelAnimationFrame(frame);
      window.removeEventListener("load", waitOut);
      root.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    if (gone) document.documentElement.style.overflow = "";
  }, [gone]);

  if (gone) return null;

  return (
    <div
      className={`splash${leaving ? " splash--out" : ""}`}
      role="status"
      aria-label="Loading"
    >
      <div className="splash__glow" aria-hidden="true" />
      <div className="splash__inner">
        <div className="splash__head">
          <span className="splash__badge" aria-hidden="true">
            NS
          </span>
          <span className="splash__id">
            <span className="splash__welcome">
              Welcome — you&apos;ve reached
            </span>
            <span className="splash__name">
              Nishit Shivdasani<span>.</span>
            </span>
          </span>
        </div>

        <div
          className="splash__trace"
          ref={traceRef}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={0}
          aria-label="Loading portfolio"
        >
          <div className="splash__trace-head">
            <span className="splash__trace-title">trace · GET /</span>
            <span className="splash__trace-live">
              <i data-pulse="" />
              <span ref={liveRef}>running</span>
            </span>
          </div>

          <div className="splash__spans">
            {/* Sweeps with the trace, the way a real trace viewer scrubs. */}
            <span className="splash__playhead" aria-hidden="true" />
            {SPANS.map((span, i) => (
              <div
                className="splash__span"
                data-depth={span.depth}
                data-active="false"
                ref={(el) => {
                  rowsRef.current[i] = el;
                }}
                key={span.label}
              >
                <span className="splash__span-label">
                  {/* Only the name truncates — a clipped tag reads as a typo. */}
                  <em className="splash__span-name">{span.label}</em>
                  {span.tag && <em className="splash__span-tag">{span.tag}</em>}
                </span>
                <span className="splash__span-track">
                  <span
                    className="splash__span-bar"
                    data-tone={span.tone ?? "child"}
                    ref={(el) => {
                      barsRef.current[i] = el;
                    }}
                    style={{ left: `${span.from * 100}%`, width: "0%" }}
                  />
                </span>
                <span
                  className="splash__span-ms"
                  data-done="false"
                  ref={(el) => {
                    msRef.current[i] = el;
                  }}
                >
                  0ms
                </span>
              </div>
            ))}
          </div>

          <div className="splash__trace-foot">
            <span className="splash__status" data-done="false" ref={statusRef}>
              ···
            </span>
            <span className="splash__elapsed" ref={elapsedRef}>
              0 ms
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
