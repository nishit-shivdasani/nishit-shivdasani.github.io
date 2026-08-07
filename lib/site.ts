/** Every outbound URL the page uses, as written in the design file. */
export const links = {
  /*
   * Relative on purpose. The design file hardcodes the absolute production
   * URL, but `download` is ignored cross-origin — from localhost or a preview
   * that link opens the *live* site's PDF instead of downloading this build's.
   * Served from public/, so it ships at the site root.
   */
  resume: "/Nishit_Shivdasani_Resume.pdf",
  email: "mailto:nishitshiv2001@gmail.com",
  emailLabel: "nishitshiv2001@gmail.com",
  calendly: "https://calendly.com/nishit-studios8/new-meeting",
  github: "https://github.com/nishit-shivdasani",
  githubHandle: "nishit-shivdasani",
  linkedin: "https://linkedin.com/in/nishit-shivdasani-54953540b",
  linkedinHandle: "nishit-shivdasani",
  phone: "tel:+917283827254",
  phoneLabel: "+91 72838 27254",
  npmPackage: "https://www.npmjs.com/package/custom-automapper",
  boilerplate:
    "https://github.com/nishit-shivdasani/nestjs-postgres-docker-boilerplate",
} as const;

/** Nav entries, in order. `id` doubles as the scroll target. */
export const navItems = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Open Source" },
  { id: "contact", label: "Contact" },
] as const;

/** The mobile sheet lists one extra section the desktop pill omits. */
export const mobileNavItems = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Open Source" },
  { id: "beyond", label: "Beyond the code" },
  { id: "contact", label: "Contact" },
] as const;
