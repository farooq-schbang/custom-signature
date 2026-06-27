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
    <footer style={{ background: "#040409", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "64px 0 32px" }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }} className="grid md:grid-cols-5">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #2563eb, #1d4ed8)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: 18 }}>C</div>
              <span style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>Custom<span style={{ color: "#60a5fa" }}>Signature</span></span>
            </div>
            <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.65, marginBottom: 20 }}>
              The world&apos;s most advanced AI email signature platform for Fortune 500 professionals.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {["🌐","📸","in","▶","𝕏"].map((ic, i) => (
                <button key={i} style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, cursor: "pointer", color: "#9ca3af" }}>{ic}</button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([cat, links]) => (
            <div key={cat}>
              <div style={{ color: "#fff", fontWeight: 600, fontSize: 13, marginBottom: 16 }}>{cat}</div>
              <ul style={{ listStyle: "none" }}>
                {links.map(l => (
                  <li key={l} style={{ marginBottom: 10 }}>
                    <a href="#" style={{ color: "#6b7280", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
                      onMouseOver={e => (e.currentTarget.style.color = "#e5e7eb")}
                      onMouseOut={e => (e.currentTarget.style.color = "#6b7280")}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ color: "#4b5563", fontSize: 13 }}>© 2025 Custom Signature. All rights reserved.</div>
          <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 13, color: "#4b5563" }}>
            <span>Made with ❤️ for Fortune 500 professionals</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#34d399" }} className="animate-pulse-dot" />
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
