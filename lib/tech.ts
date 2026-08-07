import {
  siDjango,
  siDocker,
  siElectron,
  siExpress,
  siGooglecloud,
  siGrafana,
  siJavascript,
  siLaravel,
  siMongodb,
  siNestjs,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siOpenjdk,
  siPhp,
  siPostgresql,
  siPython,
  siRabbitmq,
  siReact,
  siRedis,
  siTypescript,
} from "simple-icons";

export type TechItem = {
  name: string;
  /** 24×24 SVG path from simple-icons; omitted when no brand icon exists. */
  path?: string;
  /** Rendered colour. Overridden where the brand hex is unreadable on near-black. */
  color: string;
};

export type TechGroup = { group: string; items: TechItem[] };

/**
 * simple-icons carries no Amazon/AWS marks (removed at Amazon's request), and
 * has none for BullMQ or Centrifugo — those fall back to monogram tiles.
 */
const NO_ICON = undefined;

export const techGroups: TechGroup[] = [
  {
    group: "Languages",
    items: [
      { name: "TypeScript", path: siTypescript.path, color: `#${siTypescript.hex}` },
      { name: "JavaScript", path: siJavascript.path, color: `#${siJavascript.hex}` },
      { name: "Python", path: siPython.path, color: `#${siPython.hex}` },
      // OpenJDK's mark is pure black — use Java's orange so it reads on dark.
      { name: "Java", path: siOpenjdk.path, color: "#E76F00" },
      { name: "PHP", path: siPhp.path, color: `#${siPhp.hex}` },
    ],
  },
  {
    group: "Frameworks & Runtime",
    items: [
      { name: "NestJS", path: siNestjs.path, color: `#${siNestjs.hex}` },
      { name: "Node.js", path: siNodedotjs.path, color: `#${siNodedotjs.hex}` },
      { name: "Next.js", path: siNextdotjs.path, color: "#FFFFFF" },
      { name: "React", path: siReact.path, color: `#${siReact.hex}` },
      { name: "Express", path: siExpress.path, color: "#E9E9EC" },
      // Django's brand green (#092E20) is near-invisible here; use their light green.
      { name: "Django", path: siDjango.path, color: "#44B78B" },
      { name: "Laravel", path: siLaravel.path, color: `#${siLaravel.hex}` },
    ],
  },
  {
    group: "Databases & Messaging",
    items: [
      { name: "PostgreSQL", path: siPostgresql.path, color: `#${siPostgresql.hex}` },
      { name: "MongoDB", path: siMongodb.path, color: `#${siMongodb.hex}` },
      { name: "Redis", path: siRedis.path, color: `#${siRedis.hex}` },
      { name: "RabbitMQ", path: siRabbitmq.path, color: `#${siRabbitmq.hex}` },
      { name: "BullMQ", path: NO_ICON, color: "#E5A50A" },
      { name: "Centrifugo", path: NO_ICON, color: "#7B61FF" },
    ],
  },
  {
    group: "Cloud & DevOps",
    items: [
      { name: "AWS", path: NO_ICON, color: "#FF9900" },
      { name: "Google Cloud", path: siGooglecloud.path, color: `#${siGooglecloud.hex}` },
      { name: "Docker", path: siDocker.path, color: `#${siDocker.hex}` },
      { name: "Nginx", path: siNginx.path, color: `#${siNginx.hex}` },
      { name: "Electron", path: siElectron.path, color: `#${siElectron.hex}` },
      { name: "Grafana", path: siGrafana.path, color: `#${siGrafana.hex}` },
    ],
  },
];

/** No meaningful logo exists for these — rendered as text chips. */
export const practices = [
  "TDD",
  "Test Automation",
  "REST API Design",
  "Microservices",
  "Systems Design",
  "Event-Driven Architecture",
] as const;
