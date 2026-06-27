"use client";
import { Container } from "@/components/ui/Container";

const LINKS = {
  Product: ["Features","Pricing","Builder","Templates","Integrations","API"],
  Company: ["About","Blog","Careers","Press Kit","Partners"],
  Support: ["Help Center","Contact Us","Status","Privacy Policy","Terms of Service"],
  Enterprise: ["Fortune 500 Solutions","Team Management","Security","Compliance","White-label"],
};

export function Footer() {
  return (
    <footer style={{ background: "#020208", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "72px 0 40px" }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr", gap: 48, marginBottom: 56 }} className="grid md:grid-cols-5">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg, #2563eb, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: 16, boxShadow: "0 4px 16px rgba(37,99,235,0.35)" }}>C</div>
              <span style={{ fontWeight: 800, fontSize: 15, color: "#fff" }}>Custom<span style={{ color: "#60a5fa" }}>Signature</span></span>
            </div>
            <p style={{ color: "#475569", fontSize: 13, lineHeight: 1.7, marginBottom: 24 }}>
              The world&apos;s most advanced AI email signature platform for Fortune 500 professionals.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {[["🌐","Website"],["in","LinkedIn"],["𝕏","Twitter"],["▶","YouTube"]].map(([ic, label], i) => (
                <button key={i} title={label} style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, cursor: "pointer", color: "#64748b", transition: "all 0.2s" }}
                  onMouseOver={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#e2e8f0"; }}
                  onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#64748b"; }}
                >{ic}</button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([cat, links]) => (
            <div key={cat}>
              <div style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 13, marginBottom: 18, letterSpacing: "0.02em" }}>{cat}</div>
              <ul style={{ listStyle: "none" }}>
                {links.map(l => (
                  <li key={l} style={{ marginBottom: 10 }}>
                    <a href="#" style={{ color: "#475569", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
                      onMouseOver={e => e.currentTarget.style.color = "#94a3b8"}
                      onMouseOut={e => e.currentTarget.style.color = "#475569"}
                    >{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ color: "#334155", fontSize: 13 }}>© 2025 CustomSignature. All rights reserved.</div>
          <div style={{ display: "flex", alignItems: "center", gap: 28, fontSize: 13, color: "#334155", flexWrap: "wrap" }}>
            <span>Made with ❤️ for Fortune 500 professionals</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }} className="animate-pulse-dot" />
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
