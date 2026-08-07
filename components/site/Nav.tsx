"use client";

import { useState } from "react";
import { links, mobileNavItems, navItems } from "@/lib/site";
import { DownloadIcon } from "./Icons";
import { C, MONO } from "./tokens";

/**
 * The resume pill, shared by the desktop bar and the mobile sheet.
 * `data-*` styling lives in globals.css as `.hv-resume`.
 */
function ResumeButton() {
  return (
    <a
      href={links.resume}
      target="_blank"
      rel="noreferrer"
      download="Nishit_Shivdasani_Resume.pdf"
      className="hv-resume"
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        background: C.ink,
        color: C.paper,
        borderRadius: 999,
        padding: "7px 8px 7px 18px",
        whiteSpace: "nowrap",
        fontFamily: MONO,
        fontSize: 12.5,
        fontWeight: 600,
        boxShadow: "0 4px 14px rgba(43,38,33,0.22)",
        transition:
          "background 0.22s ease,transform 0.22s ease,box-shadow 0.22s ease",
      }}
    >
      resume.pdf
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: C.rust,
          color: C.white,
          flexShrink: 0,
        }}
      >
        <DownloadIcon />
      </span>
    </a>
  );
}

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const burgerBar: React.CSSProperties = {
    display: "block",
    width: 18,
    height: 2,
    borderRadius: 2,
    background: "currentColor",
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: `1px solid ${C.line}`,
        background: "rgba(244,243,238,0.92)",
        backdropFilter: "blur(14px)",
      }}
    >
      <nav
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "12px clamp(20px,4vw,40px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <a
          href="#top"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontWeight: 600,
            fontSize: 15,
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 34,
              height: 34,
              borderRadius: 10,
              background: C.rust,
              color: C.white,
              fontFamily: MONO,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            NS
          </span>
          Nishit Shivdasani
        </a>

        <ul
          id="nav-links"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            minWidth: 0,
            listStyle: "none",
            margin: 0,
            padding: 5,
            background: C.white,
            border: `1px solid ${C.line}`,
            borderRadius: 999,
            fontSize: 13.5,
            fontWeight: 500,
          }}
        >
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                data-nav={item.id}
                className="hv-nav"
                style={{
                  display: "block",
                  color: C.inkSoft,
                  whiteSpace: "nowrap",
                  borderRadius: 999,
                  padding: "7px 14px",
                  transition: "color 0.2s ease,background 0.2s ease",
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span id="nav-resume">
            <ResumeButton />
          </span>
          <button
            id="nav-burger"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: 42,
              height: 42,
              flexShrink: 0,
              background: C.white,
              border: `1px solid ${C.line}`,
              borderRadius: 12,
              cursor: "pointer",
              color: C.ink,
              padding: 0,
            }}
          >
            <span style={{ display: "grid", gap: 5 }}>
              <span
                style={{
                  ...burgerBar,
                  transition: "transform 0.25s ease,opacity 0.25s ease",
                  transform: menuOpen
                    ? "translateY(7px) rotate(45deg)"
                    : "none",
                }}
              />
              <span
                style={{
                  ...burgerBar,
                  transition: "opacity 0.2s ease",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  ...burgerBar,
                  transition: "transform 0.25s ease",
                  transform: menuOpen
                    ? "translateY(-7px) rotate(-45deg)"
                    : "none",
                }}
              />
            </span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          style={{
            borderTop: `1px solid ${C.line}`,
            background: C.paper,
            padding: "8px clamp(20px,4vw,40px) 22px",
          }}
        >
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {mobileNavItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="hv-menu-link"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    padding: "14px 4px",
                    borderBottom: `1px solid ${C.line}`,
                    fontSize: 16,
                    fontWeight: 500,
                    color: C.ink,
                  }}
                >
                  {item.label}
                  <span style={{ color: C.rust }}>→</span>
                </a>
              </li>
            ))}
          </ul>
          <div
            style={{
              marginTop: 18,
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <ResumeButton />
            <a
              href={links.email}
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: C.rust,
                color: C.white,
                borderRadius: 999,
                padding: "11px 20px",
                whiteSpace: "nowrap",
                fontSize: 13.5,
                fontWeight: 600,
              }}
            >
              Get in touch →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
