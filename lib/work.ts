/**
 * Case studies — depth behind the résumé bullets in `experience`.
 * Every claim here traces back to the résumé; nothing is invented.
 */
export type CaseStudy = {
  index: string;
  name: string;
  category: string;
  role: string;
  period: string;
  context: string;
  problem: string;
  approach: string[];
  results: { value: string; label: string }[];
  stack: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    index: "01",
    name: "Sportafi",
    category: "Distributed Systems · Real-Time",
    role: "Software Engineer (SDE I) · eSparkBiz",
    period: "Jun 2024 – Mar 2026",
    context:
      "Blockchain-powered sports-engagement platform serving 50K+ users, with traffic concentrated into short live-event windows.",
    problem:
      "Live events drove 5K–10K concurrent users onto the same high-traffic API paths, and the activity dashboard polled for updates — both pushing avoidable load onto the database at exactly the worst moment.",
    approach: [
      "Worked across a 3–5 service microservices architecture in NestJS / TypeScript, adding a new service built to the team's established pattern.",
      "Implemented REST APIs, event-driven messaging over RabbitMQ, and background job processing with BullMQ so slow work left the request path.",
      "Introduced Redis caching on the hottest read paths to absorb repeat traffic during peak concurrency.",
      "Replaced dashboard polling with Centrifugo, pushing live event data and activity streams to clients instead.",
      "Built the Next.js frontend components and shipped user-engagement, payroll, and payment-integration features on AWS (Lambda, S3) in a Docker-based environment.",
    ],
    results: [
      { value: "~99%", label: "uptime under live-event load" },
      { value: "20–30%", label: "database load removed" },
      { value: "50K+", label: "users served" },
    ],
    stack: [
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
    index: "02",
    name: "TestOwl",
    category: "Developer Tooling · Cloud Execution",
    role: "Software Engineer (SDE II) · KRS Solutions",
    period: "Apr 2026 – Present",
    context:
      "A no-code cross-browser test-automation platform. Core contributor from early development through launch.",
    problem:
      "Teams needed to record, manage, and run web-application tests across multiple browsers and environments without writing code — which means the authoring surface has to be code-free while the execution layer still scales.",
    approach: [
      "Built the backend services in NestJS with PostgreSQL, and packaged the cross-platform desktop client with Electron for a code-free authoring experience.",
      "Implemented a cloud-based test-case runner on Google Cloud Platform that executes automated tests at scale across browsers and environments.",
      "Configured Nginx for request routing and Grafana for runtime observability of test execution and platform health.",
      "Worked test-first (TDD) so the automation engine stays reliable as new browser and environment support lands.",
    ],
    results: [
      { value: "Shipped", label: "early development → launch" },
      { value: "Multi-browser", label: "parallel cloud execution" },
      { value: "TDD", label: "test-first automation engine" },
    ],
    stack: [
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
