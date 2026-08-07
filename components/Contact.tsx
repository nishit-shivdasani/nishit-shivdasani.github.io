import { profile } from "@/lib/resume";
import { Section } from "./Section";

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phoneHref}` },
  {
    label: "GitHub",
    value: "nishit-shivdasani",
    href: profile.github,
    external: true,
  },
  {
    label: "LinkedIn",
    value: "nishit-shivdasani",
    href: profile.linkedin,
    external: true,
  },
  { label: "Résumé", value: "Download PDF", href: profile.resume, download: true },
];

export function Contact() {
  return (
    <Section id="contact" index="06" title="Contact">
      <p className="max-w-2xl text-sm leading-relaxed text-muted">
        Open to backend and full-stack roles, and to interesting problems in
        distributed systems. Fastest route is email.
      </p>

      <ul className="mt-8 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
        {channels.map((channel) => (
          <li key={channel.label} className="bg-surface sm:last:col-span-2">
            <a
              href={channel.href}
              {...(channel.external
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
              {...(channel.download ? { download: true } : {})}
              className="group flex items-center justify-between gap-4 p-4 transition-colors hover:bg-surface-2"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                {channel.label}
              </span>
              <span className="text-sm text-fg transition-colors group-hover:text-accent">
                {channel.value}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
