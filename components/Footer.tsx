import { profile } from "@/lib/resume";

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-muted">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>Next.js · TypeScript · Tailwind · GitHub Pages</span>
      </div>
    </footer>
  );
}
