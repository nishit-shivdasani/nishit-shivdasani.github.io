import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { profile } from "@/lib/resume";
import { Splash } from "@/components/site/Splash";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteUrl = "https://nishit-shivdasani.github.io";
const description = `${profile.role} in ${profile.location}. ${profile.summary}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description,
  keywords: [
    "Nishit Shivdasani",
    "Software Engineer",
    "NestJS",
    "TypeScript",
    "Node.js",
    "Next.js",
    "Microservices",
    "Backend Engineer",
    "Ahmedabad",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: siteUrl,
    title: `${profile.name} — ${profile.role}`,
    description,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description,
  },
  robots: { index: true, follow: true },
};

/** schema.org Person — helps search engines resolve the name to a real profile. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: [
    "TypeScript",
    "NestJS",
    "Node.js",
    "Microservices",
    "PostgreSQL",
    "Redis",
    "System Design",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrains.variable}`}
    >
      {/*
        Browser extensions (ColorZilla's cz-shortcut-listen, Grammarly's
        data-gr-*, …) write attributes onto <body> before React hydrates,
        which trips a hydration warning. Suppression here is one level deep —
        it covers this element's own attributes only, so genuine mismatches
        inside the app still surface.
      */}
      <body suppressHydrationWarning>
        {/*
          Runs during parse, before the splash markup below it is reached, so a
          session that has already seen the splash never paints it even for one
          frame. Doing this in an effect instead would flash.

          The flag goes on <body>, not <html>: writing it pre-hydration makes
          the client DOM differ from the server HTML, and <body> is the element
          already carrying suppressHydrationWarning. Putting it on <html> warns
          on every load, and silencing that would mean suppressing <html>'s
          attributes wholesale.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var k='ns-splash';if(sessionStorage.getItem(k))document.body.dataset.splash='seen';else sessionStorage.setItem(k,'1')}catch(e){}",
          }}
        />
        <Splash />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
