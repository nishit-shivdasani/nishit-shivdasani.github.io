import { practices, techGroups, type TechItem } from "@/lib/tech";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

function TechTile({ item }: { item: TechItem }) {
  return (
    <li
      data-tech
      className="group flex flex-col items-center gap-2 rounded-lg border border-border bg-surface p-3 transition-colors hover:border-accent/40 hover:bg-surface-2"
    >
      {item.path ? (
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="size-6 shrink-0 opacity-80 transition-opacity group-hover:opacity-100"
          fill={item.color}
        >
          <path d={item.path} />
        </svg>
      ) : (
        // No brand mark available — monogram keeps the grid rhythm intact.
        <span
          aria-hidden
          className="flex size-6 shrink-0 items-center justify-center rounded font-mono text-[10px] font-bold"
          style={{ color: item.color, backgroundColor: `${item.color}1f` }}
        >
          {item.name.slice(0, 2).toUpperCase()}
        </span>
      )}
      <span className="text-center text-[11px] leading-tight text-muted transition-colors group-hover:text-fg">
        {item.name}
      </span>
    </li>
  );
}

export function TechGrid() {
  return (
    <Section id="skills" index="03" title="Stack">
      <div className="space-y-8">
        {techGroups.map((group) => (
          <div key={group.group}>
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
              {group.group}
            </h3>
            <Reveal className="mt-3" selector="[data-tech]" stagger={0.04} y={16}>
              <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-7">
                {group.items.map((item) => (
                  <TechTile key={item.name} item={item} />
                ))}
              </ul>
            </Reveal>
          </div>
        ))}

        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
            Practices
          </h3>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {practices.map((practice) => (
              <li
                key={practice}
                className="rounded border border-border bg-surface px-2.5 py-1 text-xs text-fg"
              >
                {practice}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
