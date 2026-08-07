import { C, MONO } from "./tokens";

export function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.line}`, background: C.paperAlt }}>
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "20px clamp(24px,4vw,40px)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px 20px",
          fontFamily: MONO,
          fontSize: 12,
          color: C.inkSoft,
        }}
      >
        <span>© 2026 Nishit Shivdasani</span>
        <span>Handcrafted in Ahmedabad, IN · fueled by coffee</span>
      </div>
    </footer>
  );
}
