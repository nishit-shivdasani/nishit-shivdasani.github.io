import { profile } from "@/lib/resume";

/** `$` prompt — decorative, so screen readers skip it and just read the command. */
function Prompt() {
  return (
    <span aria-hidden className="mr-2 select-none text-accent">
      $
    </span>
  );
}

function Command({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 first:mt-0">
      <Prompt />
      <span className="text-fg">{children}</span>
    </p>
  );
}

const profileEntries = [
  ["role", profile.role],
  ["company", "KRS Solutions · TestOwl"],
  ["location", "Ahmedabad, Gujarat, IN"],
  ["focus", "backend · distributed systems · microservices"],
  ["status", "open to work"],
] as const;

export function Terminal() {
  return (
    <div className="mt-8 overflow-hidden rounded-lg border border-border bg-surface">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="flex-1 text-center font-mono text-xs text-muted">
          nishit@portfolio: ~
        </span>
        {/* Balances the traffic lights so the title stays optically centred. */}
        <span aria-hidden className="w-[46px]" />
      </div>

      <div className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed sm:p-5 sm:text-sm">
        <Command>whoami</Command>
        <p className="text-accent">nishit-shivdasani</p>

        <Command>cat ~/.profile</Command>
        <dl className="grid grid-cols-[auto_1fr] gap-x-3">
          {profileEntries.map(([key, value]) => (
            <div key={key} className="contents">
              <dt className="text-muted">{key}</dt>
              <dd className="text-fg">
                <span aria-hidden className="mr-3 text-border">
                  =
                </span>
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <Command>cat ~/about.txt</Command>
        <p className="max-w-2xl whitespace-normal text-muted">
          {profile.summary} At <span className="text-fg">Sportafi</span>, built
          backend services that held ~99% uptime under 5K–10K concurrent load
          during live events. Core contributor on{" "}
          <span className="text-fg">TestOwl</span>, a no-code cross-browser
          test-automation platform, from early development through launch.
        </p>

        <p className="mt-4">
          <Prompt />
          <span
            aria-hidden
            className="inline-block h-4 w-2 translate-y-0.5 bg-accent motion-safe:animate-blink"
          />
          <span className="sr-only">End of terminal output</span>
        </p>
      </div>
    </div>
  );
}
