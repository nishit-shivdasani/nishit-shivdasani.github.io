import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { profile } from "@/lib/resume";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
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
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      {/*
        Browser extensions (ColorZilla's cz-shortcut-listen, Grammarly's
        data-gr-*, …) write attributes onto <body> before React hydrates,
        which trips a hydration warning. Suppression here is one level deep —
        it covers this element's own attributes only, so genuine mismatches
        inside the app still surface.
      */}
      <body className="font-sans" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Preloader />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
