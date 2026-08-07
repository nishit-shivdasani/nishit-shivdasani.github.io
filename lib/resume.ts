export const profile = {
  name: "Nishit Shivdasani",
  role: "Software Engineer (SDE II)",
  tagline: "Full-Stack · TypeScript · NestJS · Microservices",
  location: "Ahmedabad, Gujarat, India",
  email: "nishitshiv2001@gmail.com",
  phone: "+91 72838 27254",
  phoneHref: "+917283827254",
  linkedin: "https://linkedin.com/in/nishit-shivdasani-54953540b",
  github: "https://github.com/nishit-shivdasani",
  resume: "/Nishit_Shivdasani_Resume.pdf",
  summary:
    "Full-stack software engineer with 3+ years shipping web applications end to end — from independent client projects to production SaaS. Backend- and system-design–focused, building services within distributed, event-driven microservice architectures.",
} as const;

export type Highlight = {
  /** Rendered server-side and used verbatim when the counter can't run. */
  display: string;
  label: string;
  /** Present only where a single number can sensibly count up. */
  count?: { prefix?: string; to: number; suffix: string };
};

/** Numbers worth leading with — pulled straight from shipped work. */
export const highlights: Highlight[] = [
  {
    display: "50K+",
    label: "users served on Sportafi",
    count: { to: 50, suffix: "K+" },
  },
  {
    display: "~99%",
    label: "uptime under 5K–10K concurrent load",
    count: { prefix: "~", to: 99, suffix: "%" },
  },
  // A range has no single value to count toward — left static on purpose.
  { display: "20–30%", label: "DB load cut via Redis caching" },
  {
    display: "3+ yrs",
    label: "shipping production systems",
    count: { to: 3, suffix: "+ yrs" },
  },
];

export type Role = {
  title: string;
  company: string;
  product?: string;
  location: string;
  period: string;
  current?: boolean;
  points: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    title: "Software Engineer (SDE II)",
    company: "KRS Solutions",
    product: "TestOwl",
    location: "Ahmedabad, India",
    period: "Apr 2026 – Present",
    current: true,
    points: [
      "Build and ship TestOwl, a production no-code test-automation platform that lets users record, manage, and run web-application tests across multiple browsers and environments without writing code.",
      "Develop backend services in NestJS with PostgreSQL and package the cross-platform desktop client with Electron, delivering a code-free authoring experience for automated tests.",
      "Implement a cloud-based test-case runner on Google Cloud Platform that executes automated tests at scale across browsers and environments.",
      "Configure Nginx for request routing and Grafana for runtime observability of test execution and platform health.",
      "Work test-first (TDD) to keep the automation engine reliable as new browser and environment support is added.",
    ],
    stack: ["NestJS", "PostgreSQL", "Electron", "GCP", "Nginx", "Grafana", "TDD"],
  },
  {
    title: "Software Engineer (SDE I)",
    company: "eSparkBiz",
    product: "Sportafi",
    location: "Ahmedabad, India",
    period: "Jun 2024 – Mar 2026",
    points: [
      "Built and maintained full-stack features for Sportafi, a blockchain-powered sports-engagement platform serving 50K+ users at ~99% uptime under 5K–10K concurrent load during live events.",
      "Developed backend services across a 3–5 service microservices architecture in NestJS / TypeScript, adding a new service built to the team's established pattern and implementing REST APIs, event-driven messaging (RabbitMQ), and background job processing (BullMQ).",
      "Cut database load by ~20–30% on high-traffic API paths by introducing Redis caching, keeping the platform responsive under peak concurrency during live events.",
      "Delivered real-time event data and activity streams to the user dashboard by integrating Centrifugo, replacing polling with live updates.",
      "Built Next.js frontend components and shipped user-engagement, payroll, and payment-integration features, backed by AWS services (Lambda, S3) in a Docker-based environment.",
    ],
    stack: [
      "NestJS",
      "TypeScript",
      "RabbitMQ",
      "BullMQ",
      "Redis",
      "Centrifugo",
      "Next.js",
      "AWS",
      "Docker",
    ],
  },
  {
    title: "Independent Software Engineer",
    company: "Self-Employed",
    location: "Gujarat, India · Remote",
    period: "Jan 2023 – May 2024",
    points: [
      "Delivered end-to-end software development for clients as a student, building responsive sites and applications with Python / Django, JavaScript, React, and the MEAN stack.",
      "Scoped projects directly with clients and ran multiple engagements concurrently, owning timelines and delivery.",
    ],
    stack: ["Django", "Python", "React", "MEAN"],
  },
];

export const projects = [
  {
    name: "custom-nestjs-automapper",
    url: "https://github.com/nishit-shivdasani/custom-nestjs-automapper",
    description:
      "Authored and published a type-safe object-mapping library for TypeScript and NestJS, built for speed and real-world use.",
    tags: ["TypeScript", "NestJS", "Library"],
  },
  {
    name: "nestjs-postgres-docker-boilerplate",
    url: "https://github.com/nishit-shivdasani/nestjs-postgres-docker-boilerplate",
    description:
      "Production-grade NestJS + PostgreSQL + Docker starter (NestJS v10) for bootstrapping containerized backend services.",
    tags: ["NestJS", "PostgreSQL", "Docker"],
  },
] as const;

export const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    field: "Computer Software Engineering",
    school: "Dharmsinh Desai University, Nadiad",
    period: "Aug 2023 – May 2025",
    result: "First Class with Distinction",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    field: "Computer Software Engineering",
    school: "Dharmsinh Desai University, Nadiad",
    period: "Jul 2020 – May 2023",
    result: "First Class with Distinction",
  },
] as const;

export const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Stack" },
  { href: "#projects", label: "Open Source" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
] as const;
