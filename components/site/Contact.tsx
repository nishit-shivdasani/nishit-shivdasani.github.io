import { links } from "@/lib/site";
import {
  CalendarIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
} from "./Icons";
import { C, MONO, sectionStyle } from "./tokens";

type Channel = {
  href: string;
  external?: boolean;
  label: string;
  value: string;
  note: string;
  icon: React.ReactNode;
};

const CHANNELS: Channel[] = [
  {
    href: links.email,
    label: "Email — fastest",
    value: links.emailLabel,
    note: "Better SLAs than most APIs",
    icon: <MailIcon />,
  },
  {
    href: links.calendly,
    external: true,
    label: "Book a call",
    value: "Grab a slot on my calendar",
    note: "30 minutes, no slide deck required",
    icon: <CalendarIcon size={18} />,
  },
  {
    href: links.phone,
    label: "Phone",
    value: links.phoneLabel,
    note: "Weekdays, IST business hours",
    icon: <PhoneIcon />,
  },
  {
    href: links.github,
    external: true,
    label: "GitHub",
    value: links.githubHandle,
    note: "Code & packages",
    icon: <GithubIcon size={18} />,
  },
  {
    href: links.linkedin,
    external: true,
    label: "LinkedIn",
    value: links.linkedinHandle,
    note: "The professional one",
    icon: <LinkedinIcon size={18} />,
  },
];

const FACTS: [string, string][] = [
  ["< 24h", "typical reply time"],
  ["IST", "Ahmedabad · UTC+5:30"],
  ["Remote", "or hybrid, happy either way"],
];

export function Contact() {
  return (
    <section id="contact" style={sectionStyle}>
      <div
        data-reveal=""
        style={{
          position: "relative",
          background: C.ink,
          borderRadius: 22,
          padding: "clamp(30px,5vw,54px)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -90,
            width: 380,
            height: 380,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(193,95,60,0.38) 0%,rgba(193,95,60,0) 70%)",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />
        <div
          style={{
            position: "absolute",
            bottom: -120,
            left: -100,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(224,161,132,0.16) 0%,rgba(224,161,132,0) 70%)",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />

        <div
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))",
            gap: "clamp(28px,4vw,48px)",
            alignItems: "start",
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                border: "1px solid rgba(244,243,238,0.22)",
                borderRadius: 999,
                padding: "7px 15px",
                fontFamily: MONO,
                fontSize: 11.5,
                color: C.rustLight,
              }}
            >
              <span
                data-pulse=""
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: C.rust,
                  animation: "glowPulse 2s ease infinite",
                }}
              />
              accepting new opportunities
            </p>
            <h2
              style={{
                margin: "20px 0 0",
                fontSize: "clamp(28px,4.2vw,46px)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.08,
                color: C.paper,
                textWrap: "balance",
              }}
            >
              Let&apos;s build something that doesn&apos;t page you at 3AM
              <span style={{ color: C.rust }}>.</span>
            </h2>
            <p
              style={{
                margin: "16px 0 0",
                maxWidth: 460,
                fontSize: 14.5,
                lineHeight: 1.75,
                color: C.onDark,
                textWrap: "pretty",
              }}
            >
              Backend and full-stack roles, freelance builds, or just a good
              conversation about distributed systems — pick whichever channel
              suits you.
            </p>
            <dl
              style={{
                margin: "26px 0 0",
                display: "flex",
                flexWrap: "wrap",
                gap: 26,
              }}
            >
              {FACTS.map(([value, label]) => (
                <div key={label} style={{ margin: 0 }}>
                  <dt
                    style={{
                      fontFamily: MONO,
                      fontSize: 19,
                      fontWeight: 600,
                      color: C.rustLight,
                    }}
                  >
                    {value}
                  </dt>
                  <dd
                    style={{ margin: "4px 0 0", fontSize: 12, color: C.onDark }}
                  >
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            {CHANNELS.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noreferrer" : undefined}
                className="hv-contact"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  minWidth: 0,
                  background: "rgba(244,243,238,0.06)",
                  border: "1px solid rgba(244,243,238,0.16)",
                  borderRadius: 14,
                  padding: "18px 20px",
                  color: C.paper,
                  transition:
                    "background 0.22s ease,border-color 0.22s ease,transform 0.22s ease",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 42,
                    height: 42,
                    flexShrink: 0,
                    borderRadius: 11,
                    background: "rgba(193,95,60,0.2)",
                    color: C.rustLight,
                  }}
                >
                  {channel.icon}
                </span>
                <span style={{ minWidth: 0 }}>
                  <span
                    style={{
                      display: "block",
                      fontFamily: MONO,
                      fontSize: 10.5,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: C.onDark,
                    }}
                  >
                    {channel.label}
                  </span>
                  <span
                    style={{
                      display: "block",
                      marginTop: 3,
                      fontSize: 14,
                      fontWeight: 600,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {channel.value}
                  </span>
                  <span
                    style={{
                      display: "block",
                      marginTop: 2,
                      fontSize: 11.5,
                      color: C.onDark,
                    }}
                  >
                    {channel.note}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
