import {
  C,
  MONO,
  bandStyle,
  eyebrowStyle,
  headingStyle,
  tagStyleSm,
} from "./tokens";

type Role = {
  year: string;
  /** Small caps line under the year — "present", "2 yrs", "start". */
  span: string;
  spanTone: "rust" | "muted";
  logo: string;
  logoAlt: string;
  logoRounded?: boolean;
  title: string;
  current?: boolean;
  company: string;
  meta: string;
  blurb: string;
  tags: string[];
  last?: boolean;
};

const ROLES: Role[] = [
  {
    year: "2026",
    span: "present",
    spanTone: "rust",
    logo: "/assets/krs-logo.png",
    logoAlt: "KRS Solutions logo",
    title: "Software Engineer (SDE II)",
    current: true,
    company: "KRS Solutions",
    meta: " · Ahmedabad · Apr 2026 – Present",
    blurb:
      "Building and shipping TestOwl end to end — NestJS + PostgreSQL services, an Electron desktop client, and a GCP cloud test runner with Nginx routing and Grafana observability. Test-first throughout.",
    tags: ["NestJS", "GCP", "Electron", "TDD"],
  },
  {
    year: "2024",
    span: "2 yrs",
    spanTone: "muted",
    logo: "/assets/esparkbiz-logo.png",
    logoAlt: "eSparkBiz logo",
    logoRounded: true,
    title: "Software Engineer (SDE I)",
    company: "eSparkBiz",
    meta: " · Ahmedabad · Jun 2024 – Mar 2026",
    blurb:
      "Full-stack features for Sportafi at ~99% uptime under 5–10K peak concurrency — NestJS microservices, RabbitMQ + BullMQ, Redis caching (–20–30% DB load), Centrifugo real-time streams, Next.js frontends on AWS + Docker.",
    tags: ["NestJS", "Redis", "RabbitMQ", "AWS"],
  },
  {
    year: "2023",
    span: "start",
    spanTone: "muted",
    logo: "/assets/independent-logo.png",
    logoAlt: "Independent work logo",
    logoRounded: true,
    title: "Independent Software Engineer",
    company: "Self-Employed",
    meta: " · Gujarat, Remote · Jan 2023 – May 2024",
    blurb:
      "Delivered end-to-end client projects while studying — responsive sites and apps with Python/Django, JavaScript, React, and the MEAN stack, owning scope, timelines, and delivery.",
    tags: ["Django", "React", "MEAN"],
    last: true,
  },
];

/** The rail sits centred in the gutter between the year column and the cards. */
const RAIL_LEFT =
  "calc(clamp(74px,12vw,110px) + clamp(30px,5vw,44px) / 2)";

export function Experience() {
  return (
    <section id="experience" className="band band--wash" style={bandStyle}>
      <div data-reveal="" style={{ marginBottom: "clamp(24px,3vw,36px)" }}>
        <p style={eyebrowStyle}>02 — Experience</p>
        <h2 style={{ ...headingStyle, margin: "10px 0 0" }}>
          Three years, three chapters
          <span style={{ color: C.rust }}>.</span>
        </h2>
      </div>

      <ol
        id="timeline"
        style={{ margin: 0, padding: 0, listStyle: "none", position: "relative" }}
      >
        <span
          style={{
            position: "absolute",
            left: RAIL_LEFT,
            top: 8,
            bottom: 8,
            width: 2,
            background: C.line,
          }}
          aria-hidden="true"
        />
        <span
          id="timeline-fill"
          style={{
            position: "absolute",
            left: RAIL_LEFT,
            top: 8,
            height: "0%",
            maxHeight: "calc(100% - 16px)",
            width: 2,
            background: "linear-gradient(180deg,#C15F3C,#E0A184)",
            boxShadow: "0 0 8px rgba(193,95,60,0.4)",
          }}
          aria-hidden="true"
        />

        {ROLES.map((role) => (
          <li
            key={role.year}
            data-reveal=""
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "clamp(74px,12vw,110px) 1fr",
              gap: "0 clamp(30px,5vw,44px)",
              paddingBottom: role.last ? undefined : 36,
            }}
          >
            <div style={{ textAlign: "right", paddingTop: 22 }}>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 14,
                  fontWeight: 600,
                  color: C.ink,
                }}
              >
                {role.year}
              </span>
              <span
                style={{
                  display: "block",
                  marginTop: 4,
                  fontFamily: MONO,
                  fontSize: 10.5,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: role.spanTone === "rust" ? C.rustDeep : C.inkSoft,
                }}
              >
                {role.span}
              </span>
            </div>

            <div
              className="hv-timeline-card"
              style={{
                position: "relative",
                background: C.white,
                border: `1px solid ${C.line}`,
                borderRadius: 14,
                padding: "clamp(18px,3vw,26px)",
                transition:
                  "border-color 0.25s ease,transform 0.25s ease,box-shadow 0.25s ease",
              }}
            >
              <span
                data-timeline-dot={role.current ? "live" : "static"}
                data-pulse={role.current ? "" : undefined}
                style={{
                  position: "absolute",
                  left: "calc(clamp(30px,5vw,44px) / -2 - 9px)",
                  top: 26,
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: role.current ? C.rust : C.white,
                  border: role.current
                    ? `3px solid ${C.paper}`
                    : `3px solid ${C.lineStrong}`,
                  animation: role.current
                    ? "glowPulse 2s ease infinite"
                    : undefined,
                }}
                aria-hidden="true"
              />
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "8px 12px",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: C.white,
                    border: `1px solid ${C.line}`,
                    overflow: "hidden",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={role.logo}
                    alt={role.logoAlt}
                    style={{
                      width: 30,
                      height: 30,
                      objectFit: "contain",
                      borderRadius: role.logoRounded ? 6 : undefined,
                    }}
                  />
                </span>
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600 }}>
                  {role.title}
                </h3>
                {role.current && (
                  <span
                    style={{
                      background: "rgba(193,95,60,0.1)",
                      color: C.rustDeep,
                      borderRadius: 999,
                      padding: "3px 12px",
                      fontFamily: MONO,
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    CURRENT
                  </span>
                )}
              </div>

              <p style={{ margin: "6px 0 0", fontSize: 13.5, color: C.inkSoft }}>
                <strong style={{ color: C.rust, fontWeight: 600 }}>
                  {role.company}
                </strong>
                {role.meta}
              </p>
              <p
                style={{
                  margin: "12px 0 0",
                  fontSize: 14.5,
                  lineHeight: 1.7,
                  color: C.inkSoft,
                  textWrap: "pretty",
                }}
              >
                {role.blurb}
              </p>
              <div
                style={{
                  marginTop: 14,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 7,
                }}
              >
                {role.tags.map((tag) => (
                  <span key={tag} style={tagStyleSm}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
