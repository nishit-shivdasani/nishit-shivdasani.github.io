import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Work } from "@/components/Work";
import { Experience } from "@/components/Experience";
import { TechGrid } from "@/components/TechGrid";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main" className="mx-auto max-w-4xl px-6">
        <Hero />
        <Marquee />
        <Work />
        <Experience />
        <TechGrid />
        <Projects />
        <Education />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
