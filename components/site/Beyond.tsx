import {
  C,
  MONO,
  eyebrowStyle,
  headingStyle,
  sectionLeadStyle,
  sectionStyle,
} from "./tokens";

const SPECS: [string, string][] = [
  ["runtime", "Human v27 · Ahmedabad, IN"],
  ["fuel", "Coffee — 3 cups, non-negotiable"],
  ["uptime", "Weekdays 10:00 – late · IST"],
  ["idle_process", "Reading architecture post-mortems"],
  ["status", "Open to interesting problems"],
];

const JOBS: { n: string; title: string; body: string }[] = [
  {
    n: "01",
    title: "Side-project weekends",
    body: "If I build it twice at work, it becomes an open-source package.",
  },
  {
    n: "02",
    title: "System-design deep dives",
    body: "Outage write-ups from big engineering blogs are my comfort reading.",
  },
  {
    n: "03",
    title: "Test-first, always",
    body: "TDD stopped being a process and became a personality trait.",
  },
  {
    n: "04",
    title: "Mentoring & code review",
    body: "Best way to learn something twice: explain it to someone once.",
  },
];

const LOADED = [
  "☕ coffee.service — always on",
  "📖 reading: distributed systems",
  "🎧 lo-fi + long build logs",
  "🌙 peak hours: after 10pm",
  "🚀 shipping: TestOwl",
];

export function Beyond() {
  return (
    <section id="beyond" style={sectionStyle}>
      <div data-reveal="" style={{ marginBottom: "clamp(24px,3vw,36px)" }}>
        <p style={eyebrowStyle}>06 — Beyond the code</p>
        <h2 style={{ ...headingStyle, margin: "10px 0 0" }}>
          Runtime environment: human<span style={{ color: C.rust }}>.</span>
        </h2>
        <p style={sectionLeadStyle}>
          The specs behind the engineer — what keeps the process running when
          the IDE is closed.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))",
          gap: 16,
          alignItems: "start",
        }}
      >
        <div
          data-reveal=""
          data-tilt=""
          className="hv-beyond"
          style={{
            background: C.white,
            border: `1px solid ${C.line}`,
            borderRadius: 16,
            overflow: "hidden",
            transition: "border-color 0.25s ease,box-shadow 0.25s ease",
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
                color: C.rustDeep,
              }}
            >
              system.specs
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                fontFamily: MONO,
                fontSize: 11,
                color: C.inkSoft,
              }}
            >
              <span
                data-pulse=""
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: C.rust,
                  animation: "glowPulse 2s ease infinite",
                }}
              />
              running
            </span>
          </div>
          <div style={{ padding: "8px 20px 20px" }}>
            {SPECS.map(([key, value], i) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: 14,
                  padding: "11px 0",
                  borderBottom:
                    i === SPECS.length - 1
                      ? undefined
                      : `1px solid ${C.paperAlt}`,
                }}
              >
                <span
                  style={{ fontFamily: MONO, fontSize: 12, color: C.rustDeep }}
                >
                  {key}
                </span>
                <span
                  style={{ fontSize: 13, color: C.inkSoft, textAlign: "right" }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          data-reveal=""
          data-tilt=""
          className="hv-beyond-dark"
          style={{
            background: C.ink,
            borderRadius: 16,
            overflow: "hidden",
            transition: "box-shadow 0.25s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              background: "rgba(244,243,238,0.07)",
              borderBottom: "1px solid rgba(244,243,238,0.14)",
              padding: "12px 20px",
            }}
          >
            <span
              style={{
                fontFamily: MONO,
                fontSize: 12,
                fontWeight: 600,
                color: C.rustLight,
              }}
            >
              background_jobs
            </span>
            <span style={{ fontFamily: MONO, fontSize: 11, color: C.inkSoft }}>
              4 active
            </span>
          </div>
          <div style={{ padding: 20, display: "grid", gap: 14 }}>
            {JOBS.map((job) => (
              <div key={job.n} style={{ display: "flex", gap: 12 }}>
                <span
                  style={{ fontFamily: MONO, fontSize: 13, color: C.rust }}
                >
                  {job.n}
                </span>
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      fontWeight: 600,
                      color: C.paper,
                    }}
                  >
                    {job.title}
                  </p>
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: 12.5,
                      lineHeight: 1.6,
                      color: C.onDark,
                    }}
                  >
                    {job.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        data-reveal=""
        style={{
          marginTop: 16,
          background: C.white,
          border: `1px solid ${C.line}`,
          borderRadius: 16,
          padding: "22px 24px",
        }}
      >
        <p
          style={{
            margin: "0 0 14px",
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: C.inkSoft,
          }}
        >
          Currently loaded
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {LOADED.map((item) => (
            <span
              key={item}
              style={{
                border: `1px solid ${C.line}`,
                background: C.paper,
                borderRadius: 999,
                padding: "4px 12px",
                whiteSpace: "nowrap",
                fontFamily: MONO,
                fontSize: 11,
                color: C.inkSoft,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
