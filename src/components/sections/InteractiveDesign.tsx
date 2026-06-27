"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Container } from "@/components/ui/Container";

const PLATFORMS = [
  { name: "Gmail", color: "#EA4335", logo: "G" },
  { name: "Outlook", color: "#0078D4", logo: "O" },
  { name: "Apple Mail", color: "#1C1C1E", logo: "✉" },
  { name: "HubSpot", color: "#FF7A59", logo: "H" },
  { name: "Salesforce", color: "#00A1E0", logo: "S" },
  { name: "Superhuman", color: "#E83B3B", logo: "SH" },
];

const ICON_DEMOS = [
  { icon: "🌐", label: "Website", color: "#2563eb" },
  { icon: "in", label: "LinkedIn", color: "#0077b5" },
  { icon: "▶", label: "YouTube", color: "#ff0000" },
  { icon: "𝕏", label: "Twitter", color: "#fff" },
  { icon: "📸", label: "Instagram", color: "#e1306c" },
];

export function InteractiveDesign() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section ref={ref} style={{ padding: "96px 0", background: "#06060f" }}>
      <Container>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="pill pill-blue" style={{ marginBottom: 16 }}>Works Everywhere</div>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}>
            One Signature.
            <br />
            <span className="text-gradient-blue">Every Platform.</span>
          </h2>
          <p style={{ fontSize: 17, color: "#9ca3af", maxWidth: 480, margin: "0 auto", lineHeight: 1.65 }}>
            Your custom signature renders perfectly in every email client, CRM, and productivity tool your team uses.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" }} className="grid md:grid-cols-2">
          {/* Platform logos */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.15 }}>
            <h3 style={{ fontWeight: 700, color: "#fff", fontSize: 16, marginBottom: 24 }}>Natively Compatible With</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {PLATFORMS.map((p, i) => (
                <motion.div key={p.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  className="card card-hover"
                  style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, cursor: "default" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: `${p.color}22`, border: `1px solid ${p.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: p.color, flexShrink: 0 }}>{p.logo}</div>
                  <span style={{ fontWeight: 600, fontSize: 13, color: "#e5e7eb" }}>{p.name}</span>
                  <span style={{ marginLeft: "auto", color: "#34d399", fontSize: 12 }}>✓</span>
                </motion.div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: "14px 20px", borderRadius: 12, background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.18)", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 20 }}>🌐</span>
              <div>
                <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>+ 1000 more platforms</div>
                <div style={{ color: "#6b7280", fontSize: 12 }}>If it sends email, your signature works in it</div>
              </div>
            </div>
          </motion.div>

          {/* Interactive social nav demo */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.25 }}>
            <h3 style={{ fontWeight: 700, color: "#fff", fontSize: 16, marginBottom: 24 }}>Interactive Social Nav</h3>
            <div className="card" style={{ padding: 28 }}>
              <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
                Hover the social icons below to see how your signature interacts with recipients in real time.
              </p>
              <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
                {ICON_DEMOS.map(ic => (
                  <motion.div
                    key={ic.label}
                    whileHover={{ scale: 1.25, y: -4 }}
                    onHoverStart={() => setHovered(ic.label)}
                    onHoverEnd={() => setHovered(null)}
                    style={{ width: 44, height: 44, borderRadius: "50%", background: hovered === ic.label ? `${ic.color}28` : "rgba(255,255,255,0.06)", border: `1px solid ${hovered === ic.label ? ic.color + "50" : "rgba(255,255,255,0.08)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, cursor: "pointer", transition: "all 0.2s" }}
                    title={ic.label}
                  >
                    {ic.icon}
                  </motion.div>
                ))}
              </div>
              {hovered && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  style={{ padding: "8px 14px", borderRadius: 8, background: "rgba(255,255,255,0.06)", color: "#e5e7eb", fontSize: 13 }}>
                  Opens your <strong style={{ color: "#fff" }}>{hovered}</strong> profile in a new tab — no redirects, no plugins
                </motion.div>
              )}
              {!hovered && (
                <div style={{ padding: "8px 14px", borderRadius: 8, background: "rgba(255,255,255,0.03)", color: "#4b5563", fontSize: 13 }}>
                  👆 Hover an icon to see the interaction
                </div>
              )}

              {/* Verified badge demo */}
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ color: "#9ca3af", fontSize: 12, marginBottom: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Verified Trust Badge</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontWeight: 700, color: "#fff", fontSize: 16 }}>Alex Johnson</span>
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}
                    style={{ width: 18, height: 18, borderRadius: "50%", background: "#1d9bf0", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700 }}>✓</motion.div>
                </div>
                <p style={{ color: "#6b7280", fontSize: 12, marginTop: 6 }}>The blue badge signals credibility to every recipient at a glance</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
