import { links } from "@/lib/site";
import { GithubIcon } from "./Icons";
import {
  C,
  MONO,
  eyebrowStyle,
  headingStyle,
  sectionLeadStyle,
  sectionStyle,
  tagStyleSm,
} from "./tokens";

type Repo = {
  href: string;
  /** Header row: coloured dot + kind on the left, status badge on the right. */
  kind: string;
  kindColor: string;
  dotColor: string;
  badge: string;
  badgeBg: string;
  badgeColor: string;
  name: string;
  command: string;
  blurb: string;
  aside: string;
  tags: string[];
};

const REPOS: Repo[] = [
  {
    href: links.npmPackage,
    kind: "npm package",
    kindColor: C.rustDeep,
    dotColor: "#CB3837",
    badge: "PUBLISHED",
    badgeBg: "rgba(193,95,60,0.1)",
    badgeColor: C.rustDeep,
    name: "custom-automapper",
    command: "npm install custom-automapper",
    blurb:
      "Type-safe object-mapping for TypeScript + NestJS. Map DTOs without the boilerplate — or the runtime surprises.",
    aside: "// dependencies: 0 drama · types: included · docs: actually written",
    tags: ["TypeScript", "NestJS"],
  },
  {
    href: links.boilerplate,
    kind: "starter template",
    kindColor: C.inkSoft,
    dotColor: C.ink,
    badge: "PRODUCTION-GRADE",
    badgeBg: "rgba(43,38,33,0.07)",
    badgeColor: C.inkSoft,
    name: "nestjs-postgres-docker-boilerplate",
    command: "git clone nestjs-postgres-docker-boilerplate",
    blurb:
      "NestJS v10 + PostgreSQL + Docker, wired the way production expects. Skip the setup week, start on the feature.",
    aside: "// from zero to running API: one command · YAML tears: pre-cried",
    tags: ["NestJS", "PostgreSQL", "Docker"],
  },
];

export function Projects() {
  return (
    <section id="projects" style={sectionStyle}>
      <div data-reveal="" style={{ marginBottom: "clamp(24px,3vw,36px)" }}>
        <p style={eyebrowStyle}>04 — Open Source</p>
        <h2 style={{ ...headingStyle, margin: "10px 0 0" }}>
          Free code, priceless docs<span style={{ color: C.rust }}>.</span>
        </h2>
        <p style={sectionLeadStyle}>
          Built it twice at work? It becomes a package. Published, documented,
          and maintained — because good tools deserve to escape the repo.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))",
          gap: 16,
        }}
      >
        {REPOS.map((repo) => (
          <a
            key={repo.name}
            data-reveal=""
            data-tilt=""
            href={repo.href}
            target="_blank"
            rel="noreferrer"
            className="hv-project"
            style={{
              display: "flex",
              flexDirection: "column",
              background: C.white,
              border: `1px solid ${C.line}`,
              borderRadius: 16,
              overflow: "hidden",
              color: C.ink,
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
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: MONO,
                  fontSize: 11,
                  fontWeight: 600,
                  color: repo.kindColor,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: repo.dotColor,
                  }}
                />
                {repo.kind}
              </span>
              <span
                style={{
                  background: repo.badgeBg,
                  color: repo.badgeColor,
                  borderRadius: 999,
                  padding: "3px 12px",
                  fontFamily: MONO,
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                {repo.badge}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                padding: "22px 20px",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontFamily: MONO,
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                {repo.name} <span style={{ color: C.rust }}>↗</span>
              </h3>
              <div
                style={{
                  margin: "14px 0 0",
                  background: C.ink,
                  borderRadius: 10,
                  padding: "12px 14px",
                  fontFamily: MONO,
                  fontSize: 11.5,
                  color: C.paper,
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ color: C.rustLight }}>$</span> {repo.command}
              </div>
              <p
                style={{
                  margin: "14px 0 0",
                  flex: 1,
                  fontSize: 13.5,
                  lineHeight: 1.7,
                  color: C.inkSoft,
                }}
              >
                {repo.blurb}
              </p>
              <p
                style={{
                  margin: "12px 0 0",
                  fontFamily: MONO,
                  fontSize: 11,
                  color: C.inkSoft,
                }}
              >
                {repo.aside}
              </p>
              <div
                style={{
                  marginTop: 14,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 7,
                }}
              >
                {repo.tags.map((tag) => (
                  <span key={tag} style={tagStyleSm}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>

      <a
        data-reveal=""
        href={links.github}
        target="_blank"
        rel="noreferrer"
        className="hv-github-more"
        style={{
          marginTop: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          border: `1px dashed ${C.lineStrong}`,
          borderRadius: 14,
          padding: 18,
          fontFamily: MONO,
          fontSize: 13,
          color: C.inkSoft,
          transition: "border-color 0.2s ease,color 0.2s ease",
        }}
      >
        <GithubIcon />
        cd ~/github — more experiments, boilerplates &amp; works in progress →
      </a>
    </section>
  );
}
