"use client";

import { Fragment, useState } from "react";
import { C, MONO, eyebrowStyle, headingStyle, tagStyle } from "./tokens";

type Node = { label: string; tone: "plain" | "rust" | "ink" };
type Metric = { value: string; label: string };

type Project = {
  id: string;
  name: string;
  logo: string;
  logoAlt: string;
  logoSize: number;
  subtitle: string;
  meta: string;
  blurb: string;
  /** Left edge gradient — rust for the flagship, ink for the second card. */
  accent: string;
  /** Rendered as `node → node → node ⇢ node`; the last arrow is dashed. */
  pipeline: Node[];
  metrics: Metric[];
  bullets: string[];
  tags: string[];
};

const PROJECTS: Project[] = [
  {
    id: "sportafi",
    name: "Sportafi",
    logo: "/assets/sportafi-logo.png",
    logoAlt: "Sportafi logo",
    logoSize: 36,
    subtitle: "Distributed Systems · Real-Time · 5–10K peak concurrency",
    meta: "SDE I · eSparkBiz · Jun 2024 – Mar 2026",
    blurb:
      "Blockchain-powered sports-engagement platform with traffic concentrated into live-event windows — 5K–10K concurrent users hitting the same hot API paths.",
    accent: "linear-gradient(180deg,#C15F3C,#E0A184)",
    pipeline: [
      { label: "Next.js client", tone: "plain" },
      { label: "NestJS services ×3–5", tone: "rust" },
      { label: "RabbitMQ · BullMQ", tone: "plain" },
      { label: "PostgreSQL + Redis", tone: "plain" },
      { label: "Centrifugo live push", tone: "ink" },
    ],
    metrics: [
      { value: "~99%", label: "uptime during live events" },
      { value: "20–30%", label: "DB load removed via Redis" },
      { value: "3–5", label: "services, event-driven" },
    ],
    bullets: [
      "Backend services across a microservices architecture in NestJS / TypeScript — REST APIs, RabbitMQ messaging, BullMQ background jobs.",
      "Centrifugo replaced dashboard polling with live event and activity streams.",
      "Next.js frontend components plus user-engagement, payroll, and payment features on AWS (Lambda, S3) with Docker.",
    ],
    tags: [
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "RabbitMQ",
      "BullMQ",
      "Centrifugo",
      "Next.js",
      "AWS",
      "Docker",
    ],
  },
  {
    id: "testowl",
    name: "TestOwl",
    logo: "/assets/testowl-logo.png",
    logoAlt: "TestOwl logo",
    logoSize: 34,
    subtitle: "Developer Tooling · Cloud Execution · No-Code",
    meta: "SDE II · KRS Solutions · Apr 2026 – Present",
    blurb:
      "No-code cross-browser test-automation platform — core contributor from early development through launch.",
    accent: "linear-gradient(180deg,#2B2621,#6B665B)",
    pipeline: [
      { label: "Electron client", tone: "plain" },
      { label: "NestJS API", tone: "rust" },
      { label: "GCP test runner", tone: "plain" },
      { label: "Browsers ×N in parallel", tone: "plain" },
      { label: "Grafana observability", tone: "ink" },
    ],
    metrics: [
      { value: "Shipped", label: "early development → launch" },
      { value: "Multi-browser", label: "cloud execution at scale" },
      { value: "TDD", label: "test-first, always" },
    ],
    bullets: [
      "NestJS + PostgreSQL backend services; Electron desktop client for code-free test authoring across platforms.",
      "Cloud-based test runner on Google Cloud Platform executing automated tests at scale across browsers and environments.",
      "Nginx request routing and Grafana observability of test execution and platform health.",
    ],
    tags: [
      "NestJS",
      "PostgreSQL",
      "Electron",
      "Google Cloud",
      "Nginx",
      "Grafana",
      "TDD",
    ],
  },
];

const nodeStyles: Record<Node["tone"], React.CSSProperties> = {
  plain: {
    background: C.white,
    border: `1px solid ${C.line}`,
    color: C.ink,
  },
  rust: { background: C.rust, color: C.white },
  ink: { background: C.ink, color: C.paper },
};

function Pipeline({ nodes }: { nodes: Node[] }) {
  return (
    <div
      style={{
        margin: "18px 0 0",
        background: C.paper,
        border: `1px dashed ${C.lineStrong}`,
        borderRadius: 12,
        padding: "16px 18px",
        overflowX: "auto",
      }}
    >
      <p
        style={{
          margin: "0 0 12px",
          fontFamily: MONO,
          fontSize: 10.5,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: C.inkSoft,
        }}
      >
        Architecture at a glance
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          width: "max-content",
        }}
      >
        {nodes.map((node, i) => {
          // The arrow feeding the terminal node is dashed and neutral.
          const isLast = i === nodes.length - 1;
          return (
            <Fragment key={node.label}>
              {i > 0 && (
                <span
                  style={{
                    color: isLast ? C.inkSoft : C.rust,
                    fontFamily: MONO,
                    fontSize: 13,
                  }}
                >
                  {isLast ? "⇢" : "→"}
                </span>
              )}
              <span
                style={{
                  ...nodeStyles[node.tone],
                  borderRadius: 8,
                  padding: "8px 13px",
                  fontFamily: MONO,
                  fontSize: 11.5,
                  whiteSpace: "nowrap",
                }}
              >
                {node.label}
              </span>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

function WorkCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <article
      data-reveal=""
      data-tilt=""
      className="hv-work"
      style={{
        position: "relative",
        border: `1px solid ${C.line}`,
        background: C.white,
        borderRadius: 16,
        overflow: "hidden",
        transition: "border-color 0.25s ease,box-shadow 0.25s ease",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          background: project.accent,
        }}
        aria-hidden="true"
      />
      <div style={{ padding: "clamp(22px,3.5vw,32px)" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "10px 24px",
            alignItems: "flex-start",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 46,
                height: 46,
                borderRadius: 12,
                background: C.white,
                border: `1px solid ${C.line}`,
                overflow: "hidden",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.logo}
                alt={project.logoAlt}
                style={{
                  width: project.logoSize,
                  height: project.logoSize,
                  objectFit: "contain",
                }}
              />
            </span>
            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "clamp(20px,2.5vw,25px)",
                  fontWeight: 700,
                }}
              >
                {project.name}
              </h3>
              <p style={{ margin: "3px 0 0", fontSize: 13, color: C.inkSoft }}>
                {project.subtitle}
              </p>
            </div>
          </div>
          <span
            style={{
              background: C.paperAlt,
              borderRadius: 999,
              padding: "6px 14px",
              fontFamily: MONO,
              fontSize: 11.5,
              whiteSpace: "nowrap",
              color: C.inkSoft,
            }}
          >
            {project.meta}
          </span>
        </div>

        <p
          style={{
            margin: "18px 0 0",
            maxWidth: 720,
            fontSize: 14.5,
            lineHeight: 1.75,
            color: C.inkSoft,
            textWrap: "pretty",
          }}
        >
          {project.blurb}
        </p>

        {open && (
          <>
            <Pipeline nodes={project.pipeline} />
            <div
              style={{
                margin: "18px 0 0",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))",
                gap: 10,
              }}
            >
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  style={{
                    background: C.paper,
                    borderRadius: 10,
                    padding: "14px 16px",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontFamily: MONO,
                      fontSize: 18,
                      fontWeight: 600,
                      color: C.rustDeep,
                    }}
                  >
                    {metric.value}
                  </p>
                  <p
                    style={{
                      margin: "3px 0 0",
                      fontSize: 12,
                      color: C.inkSoft,
                    }}
                  >
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
            <ul
              style={{
                margin: "18px 0 0",
                padding: 0,
                listStyle: "none",
                display: "grid",
                gap: 9,
              }}
            >
              {project.bullets.map((bullet) => (
                <li
                  key={bullet}
                  style={{
                    display: "flex",
                    gap: 12,
                    fontSize: 14.5,
                    lineHeight: 1.7,
                    color: C.inkSoft,
                  }}
                >
                  <span style={{ fontFamily: MONO, color: C.rust }}>›</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        <div
          style={{
            marginTop: 18,
            display: "flex",
            flexWrap: "wrap",
            gap: 7,
          }}
        >
          {project.tags.map((tag) => (
            <span key={tag} style={tagStyle}>
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="hv-work-toggle"
          style={{
            marginTop: 18,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "none",
            border: `1px solid ${C.rust}`,
            color: C.rust,
            borderRadius: 999,
            padding: "8px 18px",
            fontFamily: MONO,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 0.2s ease,color 0.2s ease",
          }}
        >
          {open ? "Hide details ▲" : "View details — how it was built ▼"}
        </button>
      </div>
    </article>
  );
}

export function Work() {
  return (
    <section id="work" style={{ padding: "clamp(44px,5.5vw,68px) 0" }}>
      <div data-reveal="" style={{ marginBottom: "clamp(24px,3vw,36px)" }}>
        <p style={eyebrowStyle}>01 — Selected Work</p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            gap: "8px 18px",
            marginTop: 10,
          }}
        >
          <h2 style={headingStyle}>
            The stuff that survived production
            <span style={{ color: C.rust }}>.</span>
          </h2>
        </div>
      </div>
      <div style={{ display: "grid", gap: 22 }}>
        {PROJECTS.map((project) => (
          <WorkCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
