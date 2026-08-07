import {
  C,
  MONO,
  eyebrowStyle,
  headingStyle,
  sectionLeadStyle,
  sectionStyle,
} from "./tokens";

/**
 * `icon` is a simpleicons slug; append `/hex` where the brand mark needs
 * recolouring. The design pulls these from cdn.simpleicons.org at runtime —
 * we ship the same SVGs from public/icons instead, so the chips survive a CDN
 * outage and the page makes no third-party requests. Slashes become dashes in
 * the filename (`nextdotjs/2B2621` -> `nextdotjs-2B2621.svg`).
 */
type Skill = { name: string; icon?: string };

const iconSrc = (slug: string) => `/icons/${slug.replace("/", "-")}.svg`;

type Group = {
  /** The mono heading, e.g. `languages[5]`. */
  title: string;
  /** The method-call suffix on the right of the card header. */
  method: string;
  /** Colour of the square bullet next to the title. */
  dot: string;
  caption: string;
  skills: Skill[];
};

const GROUPS: Group[] = [
  {
    title: "languages[5]",
    method: ".speak()",
    dot: C.rust,
    caption: "Fluent in five. Dreams in TypeScript.",
    skills: [
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Python", icon: "python" },
      { name: "Java", icon: "openjdk" },
      { name: "PHP", icon: "php" },
    ],
  },
  {
    title: "frameworks[7]",
    method: ".build()",
    dot: C.ink,
    caption: "NestJS is home. The rest are vacation houses.",
    skills: [
      { name: "NestJS", icon: "nestjs" },
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Next.js", icon: "nextdotjs/2B2621" },
      { name: "React", icon: "react" },
      { name: "Express", icon: "express/2B2621" },
      { name: "Django", icon: "django/092E20" },
      { name: "Laravel", icon: "laravel" },
    ],
  },
  {
    title: "databases[6]",
    method: ".persist()",
    dot: "#B1ADA1",
    caption: "Where data sleeps. The queues never do.",
    skills: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Redis", icon: "redis" },
      { name: "RabbitMQ", icon: "rabbitmq" },
      { name: "BullMQ" },
      { name: "Centrifugo" },
    ],
  },
  {
    title: "cloud_devops[6]",
    method: ".deploy()",
    dot: C.rustLight,
    caption: "If it runs, it runs in a container.",
    skills: [
      { name: "AWS" },
      { name: "Google Cloud", icon: "googlecloud" },
      { name: "Docker", icon: "docker" },
      { name: "Nginx", icon: "nginx" },
      { name: "Electron", icon: "electron" },
      { name: "Grafana", icon: "grafana" },
    ],
  },
];

const PRACTICES = [
  "TDD",
  "Test Automation",
  "REST API Design",
  "Microservices",
  "Systems Design",
  "Event-Driven Architecture",
];

const chipStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  border: `1px solid ${C.line}`,
  background: C.paper,
  borderRadius: 999,
  padding: "6px 14px",
  whiteSpace: "nowrap",
  fontSize: 13,
  color: C.ink,
  transition:
    "transform 0.18s ease,border-color 0.18s ease,box-shadow 0.18s ease",
};

function CardHeader({
  title,
  method,
  dot,
  dark,
}: {
  title: string;
  method: string;
  dot: string;
  dark?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        margin: "-24px -24px 16px",
        padding: "12px 20px",
        background: dark ? "rgba(244,243,238,0.07)" : C.paper,
        borderBottom: dark
          ? "1px solid rgba(244,243,238,0.14)"
          : `1px solid ${C.line}`,
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <span
          style={{ width: 10, height: 10, borderRadius: 3, background: dot }}
        />
        <h3
          style={{
            margin: 0,
            fontFamily: MONO,
            fontSize: 12.5,
            fontWeight: 600,
            letterSpacing: "0.02em",
            color: dark ? C.paper : undefined,
          }}
        >
          {title}
        </h3>
      </span>
      <span
        style={{
          fontFamily: MONO,
          fontSize: 10.5,
          color: dark ? C.onDark : C.inkSoft,
        }}
      >
        {method}
      </span>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" style={sectionStyle}>
      <div data-reveal="" style={{ marginBottom: "clamp(24px,3vw,36px)" }}>
        <p style={eyebrowStyle}>03 — Skills</p>
        <h2 style={{ ...headingStyle, margin: "10px 0 0" }}>
          Tools of the trade<span style={{ color: C.rust }}>.</span>
        </h2>
        <p style={sectionLeadStyle}>
          Everything below has survived production traffic, 2AM debugging, and
          at least one very confident refactor.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,400px),1fr))",
          gap: 16,
        }}
      >
        {GROUPS.map((group) => (
          <div
            key={group.title}
            data-reveal=""
            className="hv-skill-card"
            style={{
              background: C.white,
              border: `1px solid ${C.line}`,
              borderRadius: 14,
              padding: 24,
              overflow: "hidden",
              transition: "transform 0.25s ease,box-shadow 0.25s ease",
            }}
          >
            <CardHeader
              title={group.title}
              method={group.method}
              dot={group.dot}
            />
            <p
              style={{
                margin: "0 0 14px",
                fontSize: 12.5,
                color: C.inkSoft,
                fontStyle: "italic",
              }}
            >
              {group.caption}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {group.skills.map((skill) => (
                <span key={skill.name} className="hv-chip" style={chipStyle}>
                  {skill.icon && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={iconSrc(skill.icon)}
                      alt=""
                      width={15}
                      height={15}
                      style={{ display: "block" }}
                    />
                  )}
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        data-reveal=""
        style={{
          marginTop: 16,
          background: C.ink,
          borderRadius: 14,
          padding: 24,
          overflow: "hidden",
        }}
      >
        <CardHeader
          title="how_i_work[6]"
          method=".always()"
          dot={C.rust}
          dark
        />
        <p
          style={{
            margin: "0 0 14px",
            fontSize: 12.5,
            color: C.onDark,
            fontStyle: "italic",
          }}
        >
          Warning: writes the test before the code. Every time.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {PRACTICES.map((practice) => (
            <span
              key={practice}
              style={{
                border: "1px solid rgba(244,243,238,0.25)",
                borderRadius: 999,
                padding: "6px 14px",
                whiteSpace: "nowrap",
                fontSize: 13,
                color: C.paper,
              }}
            >
              {practice}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
