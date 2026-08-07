import { Fragment } from "react";
import { C, MONO } from "./tokens";

const TOP_LINES = [
  "npm run dream --scale=production",
  "works on every machine ✓ — tested",
  "coffee.then(code).then(ship)",
  "git commit -m 'final_fix_v7_REAL'",
  "99% uptime · 100% coffee-fueled",
  "APIs with single-digit-ms replies",
];

const BOTTOM_LINES = [
  "backend by day · backend by 2AM",
  "sudo make it scale",
  "console.log('clean code, no drama')",
  "flaky tests don't survive my pipeline",
  "ships on Friday · sleeps fine",
  "eat · sleep · queue jobs · repeat",
];

const itemStyle: React.CSSProperties = {
  padding: "0 26px",
  fontFamily: MONO,
  fontSize: "clamp(15px,2.2vw,20px)",
  fontWeight: 600,
  whiteSpace: "nowrap",
  color: C.paper,
};

/** One copy of the strip. Rendered twice so the -50% translate loops seamlessly. */
function Track({ lines, dot }: { lines: string[]; dot: string }) {
  return (
    <div style={{ display: "flex", flexShrink: 0, alignItems: "center" }}>
      {lines.map((line) => (
        <Fragment key={line}>
          <span style={itemStyle}>{line}</span>
          <span style={{ color: dot, fontSize: 12 }}>◆</span>
        </Fragment>
      ))}
    </div>
  );
}

function Band({
  lines,
  background,
  boxShadow,
  rotate,
  animation,
  dot,
}: {
  lines: string[];
  background: string;
  boxShadow: string;
  rotate: string;
  animation: string;
  dot: string;
}) {
  return (
    <div
      style={{
        width: "110vw",
        marginLeft: "-5vw",
        transform: `rotate(${rotate})`,
        background,
        boxShadow,
        overflow: "hidden",
        padding: "13px 0",
      }}
    >
      <div data-marquee="" style={{ display: "flex", width: "max-content", animation }}>
        <Track lines={lines} dot={dot} />
        <Track lines={lines} dot={dot} />
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <div
      style={{
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)",
        width: "100vw",
        overflow: "hidden",
        padding: "22px 0",
        display: "grid",
        gap: 14,
      }}
      aria-hidden="true"
    >
      <Band
        lines={TOP_LINES}
        background={C.rust}
        boxShadow="0 6px 20px rgba(193,95,60,0.25)"
        rotate="-1.2deg"
        animation="marquee 28s linear infinite"
        dot="rgba(244,243,238,0.6)"
      />
      <Band
        lines={BOTTOM_LINES}
        background={C.ink}
        boxShadow="0 6px 20px rgba(43,38,33,0.3)"
        rotate="1deg"
        animation="marqueeR 28s linear infinite"
        dot={C.rust}
      />
    </div>
  );
}
