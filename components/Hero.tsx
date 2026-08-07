import { highlights, profile } from "@/lib/resume";
import { Terminal } from "./Terminal";
import { Reveal } from "./Reveal";
import { Counter } from "./Counter";
import { SplitHeadline } from "./SplitHeadline";
import { HeroScene } from "./three/HeroScene";

export function Hero() {
  return (
    <div className="relative isolate">
      <HeroScene />

      <Reveal
        immediate
        stagger={0.05}
        y={16}
        delay={0.35}
        className="block pt-16 pb-16 sm:pt-24 sm:pb-20"
      >
        <p
          id="top"
          className="mb-4 flex items-center gap-2 font-mono text-sm text-accent"
        >
          <span
            aria-hidden
            className="inline-block size-2 rounded-full bg-accent"
          />
          Available for backend &amp; full-stack work
        </p>

        <SplitHeadline
          text={profile.name}
          className="text-4xl font-semibold tracking-tight sm:text-6xl"
        />

        <p className="mt-3 text-lg text-fg sm:text-xl">{profile.role}</p>
        <p className="mt-1 font-mono text-sm text-muted">{profile.tagline}</p>

        <Terminal />

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-90"
          >
            Get in touch
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-md border border-border px-4 py-2 text-sm text-fg transition-colors hover:border-accent/50 hover:text-accent"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-md border border-border px-4 py-2 text-sm text-fg transition-colors hover:border-accent/50 hover:text-accent"
          >
            LinkedIn
          </a>
          <span className="font-mono text-xs text-muted">
            {profile.location}
          </span>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
          {highlights.map((item) => (
            <div key={item.label} className="bg-surface/80 p-4 backdrop-blur-sm">
              <dt className="font-mono text-xl text-accent sm:text-2xl">
                <Counter display={item.display} count={item.count} />
              </dt>
              <dd className="mt-1 text-xs leading-snug text-muted">
                {item.label}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  );
}
