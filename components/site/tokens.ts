/** Palette + type tokens lifted verbatim from the design file. */
export const MONO = "var(--font-mono)";

export const C = {
  paper: "#F4F3EE",
  paperAlt: "#EDEAE0",
  white: "#FFFFFF",
  ink: "#2B2621",
  inkSoft: "#5C574D",
  line: "#DDD9CC",
  lineStrong: "#C4C0B2",
  rust: "#C15F3C",
  rustDeep: "#A94E2C",
  rustLight: "#E0A184",
  onDark: "#C9C4B8",
} as const;

/** Chip used for tech tags inside work / timeline / project cards. */
export const tagStyle: React.CSSProperties = {
  border: `1px solid ${C.lineStrong}`,
  background: C.paper,
  borderRadius: 999,
  padding: "4px 12px",
  whiteSpace: "nowrap",
  fontFamily: MONO,
  fontSize: 11,
  color: C.inkSoft,
};

/** Slightly smaller variant used in the timeline and project cards. */
export const tagStyleSm: React.CSSProperties = {
  ...tagStyle,
  padding: "3px 11px",
  fontSize: 10.5,
};

/** Section eyebrow — "01 — Selected Work". */
export const eyebrowStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: MONO,
  fontSize: 12,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: C.rustDeep,
};

/** Section heading. */
export const headingStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(26px,3.6vw,38px)",
  fontWeight: 700,
  letterSpacing: "-0.02em",
};

/** Body copy under a section heading. */
export const sectionLeadStyle: React.CSSProperties = {
  margin: "12px 0 0",
  maxWidth: 560,
  fontSize: 14.5,
  lineHeight: 1.7,
  color: C.inkSoft,
  textWrap: "pretty",
};

/** Every section but the first is separated by a hairline rule. */
export const sectionStyle: React.CSSProperties = {
  padding: "clamp(44px,5.5vw,68px) 0",
  borderTop: `1px solid ${C.line}`,
};
