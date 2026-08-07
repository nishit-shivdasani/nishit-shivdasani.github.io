import { experience } from "@/lib/resume";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

/** "Apr 2026 – Present" → "2026", for the year rail. */
function startYear(period: string) {
  return period.match(/\d{4}/)?.[0] ?? "";
}

export function Experience() {
  return (
    <Section id="experience" index="02" title="Experience">
      <Reveal selector="[data-role]">
        <ol>
          {experience.map((role) => (
            <li
              key={`${role.company}-${role.period}`}
              data-role
              className="group grid grid-cols-[3.5rem_1fr] gap-x-4 pb-10 last:pb-0 sm:grid-cols-[5rem_1fr] sm:gap-x-8"
            >
              {/* Year rail */}
              <div className="relative text-right">
                <span className="font-mono text-sm text-fg sm:text-base">
                  {startYear(role.period)}
                </span>
                {role.current && (
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-accent">
                    now
                  </span>
                )}
              </div>

              {/* Spine + node, drawn on the left edge of the content column */}
              <div className="relative border-l border-border pl-6 group-last:border-transparent">
                <span
                  aria-hidden
                  className={`absolute -left-[4.5px] top-1.5 size-2 rounded-full ring-4 ring-bg ${
                    role.current ? "bg-accent" : "bg-border"
                  }`}
                />

                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-medium">
                    {role.title}
                    <span className="text-muted"> · </span>
                    <span className="text-accent">{role.company}</span>
                  </h3>
                  <span className="font-mono text-xs text-muted">
                    {role.period}
                  </span>
                </div>

                <p className="mt-1 font-mono text-xs text-muted">
                  {role.location}
                  {role.product ? ` · ${role.product}` : ""}
                </p>

                <ul className="mt-4 space-y-2">
                  {role.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-sm leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-2 size-1 shrink-0 rounded-full bg-accent/60"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {role.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-[11px] text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
