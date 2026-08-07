import {
  C,
  MONO,
  eyebrowStyle,
  headingStyle,
  sectionLeadStyle,
  sectionStyle,
} from "./tokens";

type Degree = {
  /** Header row styled as a release note. */
  release: string;
  releaseColor: string;
  badge: string;
  badgeBg: string;
  badgeColor: string;
  title: string;
  school: string;
  notes: string[];
  honours: string;
};

const DEGREES: Degree[] = [
  {
    release: "release v2.0 — major upgrade",
    releaseColor: C.rustDeep,
    badge: "LATEST",
    badgeBg: "rgba(193,95,60,0.1)",
    badgeColor: C.rustDeep,
    title: "Master of Computer Applications",
    school: "Dharmsinh Desai University, Nadiad · 2023 – 2025",
    notes: [
      "Specialized in Computer Software Engineering",
      "Completed while already shipping production code full-time",
    ],
    honours: "★ First Class with Distinction",
  },
  {
    release: "release v1.0 — initial release",
    releaseColor: C.inkSoft,
    badge: "STABLE",
    badgeBg: "rgba(43,38,33,0.07)",
    badgeColor: C.inkSoft,
    title: "Bachelor of Computer Applications",
    school: "Dharmsinh Desai University, Nadiad · 2020 – 2023",
    notes: [
      "First semicolons, first segfaults, first all-nighters",
      "Freelanced for real clients alongside the coursework",
    ],
    honours: "★ First Class with Distinction",
  },
];

export function Education() {
  return (
    <section id="education" style={sectionStyle}>
      <div data-reveal="" style={{ marginBottom: "clamp(24px,3vw,36px)" }}>
        <p style={eyebrowStyle}>05 — Education</p>
        <h2 style={{ ...headingStyle, margin: "10px 0 0" }}>
          Where the semicolons began<span style={{ color: C.rust }}>.</span>
        </h2>
        <p style={sectionLeadStyle}>
          Two degrees, one university, zero backlogs — shipped like proper
          releases.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))",
          gap: 16,
        }}
      >
        {DEGREES.map((degree) => (
          <div
            key={degree.title}
            data-reveal=""
            className="hv-education"
            style={{
              position: "relative",
              background: C.white,
              border: `1px solid ${C.line}`,
              borderRadius: 16,
              overflow: "hidden",
              transition: "transform 0.25s ease,box-shadow 0.25s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                background: C.paper,
                borderBottom: `1px solid ${C.line}`,
                padding: "12px 20px",
              }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  fontWeight: 600,
                  color: degree.releaseColor,
                }}
              >
                {degree.release}
              </span>
              <span
                style={{
                  background: degree.badgeBg,
                  color: degree.badgeColor,
                  borderRadius: 999,
                  padding: "3px 12px",
                  fontFamily: MONO,
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                {degree.badge}
              </span>
            </div>

            <div style={{ padding: "24px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 52,
                    height: 52,
                    borderRadius: 12,
                    background: C.white,
                    border: `1px solid ${C.line}`,
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/ddu-logo.png"
                    alt="Dharmsinh Desai University logo"
                    style={{ width: 42, height: 42, objectFit: "contain" }}
                  />
                </span>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16.5, fontWeight: 600 }}>
                    {degree.title}
                  </h3>
                  <p
                    style={{ margin: "4px 0 0", fontSize: 13, color: C.inkSoft }}
                  >
                    {degree.school}
                  </p>
                </div>
              </div>

              <ul
                style={{
                  margin: "16px 0 0",
                  padding: 0,
                  listStyle: "none",
                  display: "grid",
                  gap: 7,
                }}
              >
                {degree.notes.map((note) => (
                  <li
                    key={note}
                    style={{
                      display: "flex",
                      gap: 10,
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: C.inkSoft,
                    }}
                  >
                    <span style={{ fontFamily: MONO, color: C.rust }}>+</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>

              <p
                style={{
                  margin: "16px 0 0",
                  display: "inline-block",
                  background: "rgba(193,95,60,0.1)",
                  color: C.rustDeep,
                  borderRadius: 999,
                  padding: "4px 13px",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {degree.honours}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
