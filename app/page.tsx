import { Beyond } from "@/components/site/Beyond";
import { Contact } from "@/components/site/Contact";
import { Education } from "@/components/site/Education";
import { Effects } from "@/components/site/Effects";
import { Experience } from "@/components/site/Experience";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Nav } from "@/components/site/Nav";
import { Projects } from "@/components/site/Projects";
import { Skills } from "@/components/site/Skills";
import { Work } from "@/components/site/Work";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", overflowX: "clip" }}>
      <a href="#top" className="skip-link">
        Skip to content
      </a>
      <div
        id="scroll-progress"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: 3,
          width: "0%",
          background: "linear-gradient(90deg,#C15F3C,#E0A184)",
          zIndex: 100,
          transition: "width 0.1s linear",
        }}
        aria-hidden="true"
      />

      <Nav />

      <main
        id="top"
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 clamp(24px,4vw,40px)",
        }}
      >
        <Hero />
        <Marquee />
        <Work />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Beyond />
        <Contact />
      </main>

      <Footer />
      <Effects />
    </div>
  );
}
