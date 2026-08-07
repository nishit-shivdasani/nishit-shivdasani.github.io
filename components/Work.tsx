import { caseStudies } from "@/lib/work";
import { Section } from "./Section";
import { StackedCards } from "./StackedCards";

export function Work() {
  return (
    <Section id="work" index="01" title="Selected Work">
      <StackedCards>
        {caseStudies.map((study, i) => (
          <article
            key={study.name}
            data-case
            style={{ top: `calc(5.5rem + ${i * 0.75}rem)` }}
            className="sticky origin-top rounded-lg border border-border bg-surface shadow-2xl shadow-black/40 transition-colors hover:border-accent/40"
          >
            <header className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2 border-b border-border p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <span className="font-mono text-sm text-accent">
                  {study.index}
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">
                    {study.name}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-accent/80">
                    {study.category}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted">{study.role}</p>
                <p className="mt-1 font-mono text-xs text-muted">
                  {study.period}
                </p>
              </div>
            </header>

            <div className="space-y-6 p-5 sm:p-6">
              <p className="text-sm leading-relaxed text-muted">
                {study.context}
              </p>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-widest text-accent">
                  Problem
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {study.problem}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-widest text-accent">
                  Approach
                </h4>
                <ul className="mt-2 space-y-2">
                  {study.approach.map((step) => (
                    <li
                      key={step}
                      className="flex gap-3 text-sm leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-2 size-1 shrink-0 rounded-full bg-accent/60"
                      />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-widest text-accent">
                  Result
                </h4>
                <dl className="mt-3 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3">
                  {study.results.map((result) => (
                    <div key={result.label} className="bg-surface-2 p-4">
                      <dt className="font-mono text-lg text-accent">
                        {result.value}
                      </dt>
                      <dd className="mt-1 text-xs leading-snug text-muted">
                        {result.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <ul className="flex flex-wrap gap-1.5">
                {study.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded border border-border bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </StackedCards>
    </Section>
  );
}
