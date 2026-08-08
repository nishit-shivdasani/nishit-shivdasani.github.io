import {
  C,
  MONO,
  bandStyle,
  eyebrowStyle,
  headingStyle,
  sectionLeadStyle,
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

/** Split so the emoji can be sized independently of the label. */
const LOADED: [string, string][] = [
  ["☕", "coffee.service — always on"],
  ["📖", "reading: distributed systems"],
  ["🎧", "lo-fi + long build logs"],
  ["🌙", "peak hours: after 10pm"],
  ["🚀", "shipping: TestOwl"],
];

export function Beyond() {
  return (
    <section id="beyond" className="band band--wash" style={bandStyle}>
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
          /*
           * `start` let the two cards size independently, so they ended 22px
           * apart and the pair looked unfinished. Stretching squares the
           * bottom edge; the shorter card just carries a little more trailing
           * space, which is what a card is supposed to do.
           */
          alignItems: "stretch",
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

      {/*
        No card wrapper on purpose. As a third bordered white box directly under
        system.specs and background_jobs it read as a peer card competing with
        them; sitting straight on the band makes it a footnote to the pair,
        which is what it actually is. The label-plus-fading-rule is the same
        motif the hero uses under the name.
      */}
      <div data-reveal="" style={{ marginTop: 28 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: C.rustDeep,
              whiteSpace: "nowrap",
            }}
          >
            Currently loaded
          </p>
          <span
            style={{
              height: 1,
              flex: 1,
              background:
                "linear-gradient(90deg,#DDD9CC 0%,rgba(193,95,60,0) 100%)",
            }}
            aria-hidden="true"
          />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {LOADED.map(([icon, label]) => (
            <span
              key={label}
              className="hv-chip"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: C.white,
                border: `1px solid ${C.line}`,
                borderRadius: 999,
                padding: "9px 18px 9px 13px",
                whiteSpace: "nowrap",
                fontFamily: MONO,
                fontSize: 12.5,
                color: C.ink,
                transition:
                  "transform 0.18s ease,border-color 0.18s ease,box-shadow 0.18s ease",
              }}
            >
              <span style={{ fontSize: 16, lineHeight: 1 }} aria-hidden="true">
                {icon}
              </span>
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
