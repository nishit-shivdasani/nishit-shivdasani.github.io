"use client";

import { useEffect, useState } from "react";
import { links } from "@/lib/site";
import {
  CalendarIcon,
  ClockIcon,
  GithubIcon,
  LinkedinIcon,
  PinIcon,
} from "./Icons";
import { C, MONO } from "./tokens";
import { useReady } from "./useReady";

const ROLES = [
  "Backend Engineer",
  "Distributed Systems",
  "NestJS · TypeScript · Microservices",
  "Full-Stack SaaS Builder",
];

/** Types a role out, holds, deletes, moves to the next. Same timings as the design. */
function useTypedRole(enabled: boolean) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (!alive) return;
      const word = ROLES[roleIndex];
      let delay = 65;

      if (!deleting) {
        charIndex++;
        if (charIndex === word.length) {
          deleting = true;
          delay = 1800;
        }
      } else {
        charIndex--;
        delay = 32;
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % ROLES.length;
          delay = 350;
        }
      }

      setText(word.slice(0, charIndex));
      timer = setTimeout(tick, delay);
    };

    tick();
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [enabled]);

  return text;
}

/** Cubic ease-out ramp over 1.4s, driving all three headline numbers at once. */
function useCounters(enabled: boolean) {
  const [values, setValues] = useState({ yrs: 0, users: 0, uptime: 0 });

  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    const start = performance.now();
    const duration = 1400;

    const step = (now: number) => {
      if (!alive) return;
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValues({
        yrs: Math.round(3 * eased),
        users: Math.round(10 * eased),
        uptime: Math.round(99 * eased),
      });
      if (p < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
    return () => {
      alive = false;
    };
  }, [enabled]);

  return values;
}

/**
 * Ahmedabad wall-clock, refreshed every 30s. Rendered blank on the server —
 * the server's clock is not the visitor's and a mismatch would break hydration.
 */
function useLocalTime() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const read = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
    read();
    const id = setInterval(read, 30000);
    return () => clearInterval(id);
  }, []);

  return time;
}

const pillStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  background: C.white,
  border: `1px solid ${C.line}`,
  borderRadius: 999,
  padding: "8px 16px",
  fontFamily: MONO,
  fontSize: 12,
  color: C.inkSoft,
};

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="hv-stat"
      style={{
        background: C.white,
        border: `1px solid ${C.line}`,
        borderTop: `3px solid ${C.rust}`,
        borderRadius: 12,
        padding: "20px 22px",
        margin: 0,
        transition: "transform 0.25s ease,box-shadow 0.25s ease",
      }}
    >
      <dt
        style={{
          fontFamily: MONO,
          fontSize: "clamp(24px,3vw,30px)",
          fontWeight: 600,
          color: C.ink,
        }}
      >
        {value}
      </dt>
      <dd
        style={{
          margin: "6px 0 0",
          fontSize: 12.5,
          lineHeight: 1.5,
          color: C.inkSoft,
        }}
      >
        {label}
      </dd>
    </div>
  );
}

export function Hero() {
  // Held until the splash starts clearing, so the count-up and the typewriter
  // play to a visible page instead of finishing behind the overlay.
  const ready = useReady();
  const typedText = useTypedRole(ready);
  const { yrs, users, uptime } = useCounters(ready);
  const localTime = useLocalTime();

  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(48px,6.5vw,84px) 0 clamp(36px,4.5vw,56px)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -140,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(193,95,60,0.12) 0%,rgba(193,95,60,0) 65%)",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(min(100%,440px),1fr))",
          gap: "clamp(36px,5vw,64px)",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textAlign: "left",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 9,
              animation: "fadeUp 0.6s ease both",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                background: "rgba(193,95,60,0.09)",
                border: "1px solid rgba(193,95,60,0.35)",
                borderRadius: 999,
                padding: "8px 16px",
                fontFamily: MONO,
                fontSize: 12,
                fontWeight: 600,
                color: C.rustDeep,
              }}
            >
              <span
                data-pulse=""
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: C.rust,
                  animation: "glowPulse 2s ease infinite",
                }}
              />
              Open to new roles
            </span>
            <span style={pillStyle}>
              <PinIcon />
              Ahmedabad, India
            </span>
            <span style={pillStyle}>
              <ClockIcon />
              {localTime} IST
            </span>
          </div>

          <h1
            style={{
              margin: "26px 0 0",
              fontSize: "clamp(38px,5.2vw,62px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              textWrap: "balance",
              animation: "fadeUp 0.6s 0.1s ease both",
            }}
          >
            Nishit Shivdasani<span style={{ color: C.rust }}>.</span>
          </h1>

          <div
            style={{
              margin: "18px 0 0",
              display: "flex",
              alignItems: "center",
              gap: 16,
              width: "100%",
              maxWidth: 520,
              animation: "fadeUp 0.6s 0.2s ease both",
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: MONO,
                fontSize: "clamp(14px,2vw,18px)",
                fontWeight: 500,
                color: C.rustDeep,
                whiteSpace: "nowrap",
                minHeight: "1.5em",
              }}
            >
              {typedText}
              <span
                style={{
                  display: "inline-block",
                  width: 9,
                  height: "1.05em",
                  background: C.rust,
                  verticalAlign: "text-bottom",
                  marginLeft: 4,
                  animation: "blink 1s step-end infinite",
                }}
              />
            </p>
            <span
              style={{
                height: 1,
                flex: 1,
                background:
                  "linear-gradient(90deg,#DDD9CC 0%,rgba(193,95,60,0) 100%)",
              }}
            />
          </div>

          <p
            style={{
              margin: "22px 0 0",
              maxWidth: 560,
              fontSize: "clamp(15px,1.7vw,16.5px)",
              lineHeight: 1.75,
              color: C.inkSoft,
              textWrap: "pretty",
              animation: "fadeUp 0.6s 0.3s ease both",
            }}
          >
            I&apos;m a software engineer from Ahmedabad who fell in love with
            building things that don&apos;t fall over. Over 3+ years I&apos;ve
            gone from freelancing as a student to shipping production SaaS as an
            SDE II — designing backend systems, distributed architectures, and
            the occasional frontend that behaves. When traffic spikes and queues
            pile up, that&apos;s my favorite part of the job.
          </p>

          <div
            style={{
              marginTop: 32,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 12,
              animation: "fadeUp 0.6s 0.4s ease both",
            }}
          >
            <a
              href={links.email}
              className="hv-cta-rust"
              style={{
                background: C.rust,
                color: C.white,
                borderRadius: 10,
                padding: "13px 26px",
                whiteSpace: "nowrap",
                fontSize: 14.5,
                fontWeight: 600,
                boxShadow: "0 6px 18px rgba(193,95,60,0.3)",
                transition: "transform 0.2s ease",
              }}
            >
              Get in touch →
            </a>
            <a
              href={links.calendly}
              target="_blank"
              rel="noreferrer"
              className="hv-cta-ink"
              style={{
                background: C.ink,
                color: C.paper,
                borderRadius: 10,
                padding: "13px 26px",
                whiteSpace: "nowrap",
                fontSize: 14.5,
                fontWeight: 600,
                transition: "transform 0.2s ease",
              }}
            >
              <span
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                <CalendarIcon />
                Book a call
              </span>
            </a>
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="hv-cta-outline"
              style={{
                background: C.white,
                border: `1px solid ${C.line}`,
                borderRadius: 10,
                padding: "13px 26px",
                whiteSpace: "nowrap",
                fontSize: 14.5,
                fontWeight: 500,
                transition: "transform 0.2s ease",
              }}
            >
              <span
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                <GithubIcon />
                GitHub
              </span>
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hv-cta-outline"
              style={{
                background: C.white,
                border: `1px solid ${C.line}`,
                borderRadius: 10,
                padding: "13px 26px",
                whiteSpace: "nowrap",
                fontSize: 14.5,
                fontWeight: 500,
                transition: "transform 0.2s ease",
              }}
            >
              <span
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                <LinkedinIcon />
                LinkedIn
              </span>
            </a>
          </div>
        </div>

        <dl
          style={{
            margin: 0,
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(min(100%,190px),1fr))",
            gap: 14,
            animation: "fadeUp 0.6s 0.5s ease both",
          }}
        >
          <Stat value={`${yrs}+ yrs`} label="shipping production systems" />
          <Stat
            value={`5–${users}K`}
            label="concurrent users at live-event peak"
          />
          <Stat
            value={`~${uptime}%`}
            label="uptime under 5K–10K concurrent load"
          />
          <Stat value="20–30%" label="DB load cut via Redis caching" />
        </dl>
      </div>
    </section>
  );
}
