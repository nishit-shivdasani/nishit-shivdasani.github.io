import { education } from "@/lib/resume";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

export function Education() {
  return (
    <Section id="education" index="05" title="Education">
      <Reveal selector="li">
        <ul className="space-y-4">
          {education.map((entry) => (
            <li
              key={entry.degree}
              className="rounded-lg border border-border bg-surface p-5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-medium">{entry.degree}</h3>
                <span className="font-mono text-xs text-muted">
                  {entry.period}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted">{entry.field}</p>
              <p className="mt-2 text-sm text-muted">
                {entry.school}
                <span className="text-border"> · </span>
                <span className="text-accent">{entry.result}</span>
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
