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
];

/**
 * GitHub and LinkedIn are already buttons in the hero, so giving them full
 * 88px cards here repeated them for a third time and made the panel 200px
 * taller than it needed to be. Kept as a compact row: same links, a fraction
 * of the weight.
 */
const SOCIALS = [
  { href: links.github, label: links.githubHandle, icon: <GithubIcon size={15} /> },
  { href: links.linkedin, label: "LinkedIn", icon: <LinkedinIcon size={15} /> },
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
          padding: "clamp(28px,4vw,44px)",
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
            /*
             * The five contact channels make the right column much taller than
             * the left. Top-aligning left a ~200px dead gap under the facts and
             * made the panel read bottom-heavy; centring balances the two.
             */
            alignItems: "center",
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
                margin: "18px 0 0",
                /*
                 * Sits in a ~540px column, less than half the width the other
                 * section headings get. At the design's 46px it wrapped to
                 * three lines and stood 149px tall — 3x every other heading,
                 * and larger than any type on the page bar the hero name.
                 * Scaled to its column so it reads as a confident close rather
                 * than a shout.
                 */
                fontSize: "clamp(24px,2.6vw,34px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.18,
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

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 2,
              }}
            >
              {SOCIALS.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hv-contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 9,
                    background: "rgba(244,243,238,0.06)",
                    border: "1px solid rgba(244,243,238,0.16)",
                    borderRadius: 999,
                    padding: "9px 16px",
                    color: C.paper,
                    fontFamily: MONO,
                    fontSize: 12,
                    whiteSpace: "nowrap",
                    transition:
                      "background 0.22s ease,border-color 0.22s ease,transform 0.22s ease",
                  }}
                >
                  {social.icon}
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
