"use client";
import { Container } from "@/components/ui/Container";

const LINKS = {
  Product: ["Features","Pricing","Builder","Templates","Integrations","Changelog"],
  Company: ["About","Blog","Careers","Press Kit","Partners"],
  Support: ["Help Center","Contact Us","Status","Privacy Policy","Terms of Service"],
  Enterprise: ["Fortune 500 Solutions","Team Management","Security","Compliance","White-label"],
};

export function Footer() {
  return (
    <footer style={{ background: "#03030a", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "72px 0 40px" }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1fr", gap: 48, marginBottom: 60 }} className="grid md:grid-cols-5">
          {/* Brand col */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 18 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: "#0047FF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: 15 }}>C</div>
              <span style={{ fontWeight: 800, fontSize: 15, color: "#fff", letterSpacing: "-0.02em" }}>Custom<span style={{ color: "#60a5fa" }}>Sig</span></span>
            </div>
            <p style={{ fontSize: 13, color: "#52525b", lineHeight: 1.7, marginBottom: 22 }}>
              The most advanced AI email signature platform for designers, sales teams, and Fortune 500 professionals.
            </p>
            <div style={{ display: "flex", gap: 7 }}>
              {[["🌐","Website"],["in","LinkedIn"],["𝕏","Twitter"],["▶","YouTube"]].map(([ic, label], i) => (
                <button key={i} title={label} style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, cursor: "pointer", color: "#52525b", transition: "all 0.15s" }}
                  onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLButtonElement).style.color = "#e4e4e7"; }}
                  onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLButtonElement).style.color = "#52525b"; }}
                >{ic}</button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([cat, links]) => (
            <div key={cat}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#e4e4e7", marginBottom: 16, letterSpacing: "-0.01em" }}>{cat}</div>
              <ul style={{ listStyle: "none" }}>
                {links.map(l => (
                  <li key={l} style={{ marginBottom: 10 }}>
                    <a href="#" style={{ fontSize: 13, color: "#52525b", textDecoration: "none", transition: "color 0.15s" }}
                      onMouseOver={e => (e.currentTarget.style.color = "#a1a1aa")}
                      onMouseOut={e => (e.currentTarget.style.color = "#52525b")}
                    >{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
          <div style={{ fontSize: 13, color: "#3f3f46" }}>© 2025 CustomSig. All rights reserved.</div>
          <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 13, color: "#3f3f46", flexWrap: "wrap" }}>
            <span>Made for designers and closers</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} className="animate-pulse-dot" />
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
