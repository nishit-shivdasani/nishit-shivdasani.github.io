import { navLinks, profile } from "@/lib/resume";
import { ScrollProgress } from "./ScrollProgress";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto max-w-4xl px-6 md:flex md:h-16 md:items-center md:justify-between md:gap-6"
      >
        {/* `md:contents` dissolves this row so logo/résumé/links all become
            direct flex children of the nav on desktop. */}
        <div className="flex h-14 items-center justify-between gap-6 md:contents">
          <div className="flex items-baseline gap-5">
            <a
              href="#top"
              className="font-mono text-sm font-medium tracking-tight transition-colors hover:text-accent"
            >
              <span className="text-accent">~/</span>nishit
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="hidden font-mono text-xs text-muted transition-colors hover:text-accent xl:inline"
            >
              {profile.email}
            </a>
          </div>

          <a
            href={profile.resume}
            download
            className="shrink-0 whitespace-nowrap rounded-md border border-accent/40 bg-accent-dim px-3 py-1.5 font-mono text-xs text-accent transition-colors hover:bg-accent hover:text-bg md:order-last"
          >
            Résumé ↓
          </a>
        </div>

        {/*
          On mobile this becomes its own row under the logo and scrolls
          sideways, so the section links stay reachable without a JS menu.
        */}
        <ul className="-mx-6 flex items-center gap-6 overflow-x-auto border-t border-border px-6 py-2.5 text-sm text-muted md:mx-0 md:gap-5 md:overflow-visible md:border-t-0 md:px-0 md:py-0 md:text-[13px]">
          {navLinks.map((link) => (
            <li key={link.href} className="shrink-0">
              <a href={link.href} className="transition-colors hover:text-fg">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <ScrollProgress />
    </header>
  );
}
