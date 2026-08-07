import { projects } from "@/lib/resume";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

export function Projects() {
  return (
    <Section id="projects" index="04" title="Open Source">
      <Reveal className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noreferrer noopener"
            className="group flex flex-col rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent/50"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-mono text-sm text-fg transition-colors group-hover:text-accent">
                {project.name}
              </h3>
              <span
                aria-hidden
                className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              >
                ↗
              </span>
            </div>

            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
              {project.description}
            </p>

            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded border border-border bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </a>
        ))}
      </Reveal>
    </Section>
  );
}
