"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Container } from "@/components/ui/Container";

const PLATFORMS = [
  { name: "Gmail", color: "#EA4335", logo: "G" },
  { name: "Outlook", color: "#0078D4", logo: "O" },
  { name: "Apple Mail", color: "#64748b", logo: "✉" },
  { name: "HubSpot", color: "#FF7A59", logo: "H" },
  { name: "Salesforce", color: "#00A1E0", logo: "SF" },
  { name: "Superhuman", color: "#E83B3B", logo: "SH" },
  { name: "Notion Mail", color: "#e2e8f0", logo: "N" },
  { name: "Front", color: "#fb923c", logo: "F" },
];

const AI_ROLES = [
  { role: "VP of Sales", company: "Salesforce", result: "Authority-forward layout, LinkedIn CTA, booking link" },
  { role: "Startup Founder", company: "YC W24", result: "Bold brand, product GIF, investor-optimized" },
  { role: "Creative Director", company: "Figma", result: "Visual portfolio link, Instagram, animated avatar" },
  { role: "Investment Banker", company: "Goldman Sachs", result: "Conservative trust layout, compliance-ready" },
];

export function InteractiveDesign() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [aiRole, setAiRole] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setGenerated(false);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 1400);
  };

  return (
    <section ref={ref} style={{ padding: "100px 0", background: "#020208" }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }} className="grid md:grid-cols-2">
          {/* AI generator panel */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 }}>
            <div className="pill pill-gold" style={{ marginBottom: 20 }}>AI-Powered</div>
            <h2 className="display-md" style={{ color: "#fff", marginBottom: 16 }}>
              AI Writes Your
              <br />
              <span className="grad-aurora">Perfect Signature.</span>
            </h2>
            <p style={{ fontSize: 16, color: "#64748b", marginBottom: 36, lineHeight: 1.7 }}>
              Tell us your role. Our AI generates an optimized signature template proven to drive engagement for your industry.
            </p>

            <div className="card" style={{ padding: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Select Your Role</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                {AI_ROLES.map((r, i) => (
                  <button key={i} onClick={() => { setAiRole(i); setGenerated(false); }}
                    style={{
                      padding: "12px 16px", borderRadius: 10, border: aiRole === i ? "1px solid rgba(251,191,36,0.4)" : "1px solid rgba(255,255,255,0.07)",
                      background: aiRole === i ? "rgba(251,191,36,0.06)" : "rgba(255,255,255,0.02)",
                      cursor: "pointer", textAlign: "left", transition: "all 0.15s",
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 700, color: aiRole === i ? "#fbbf24" : "#94a3b8" }}>{r.role}</div>
                    <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>@ {r.company}</div>
                  </button>
                ))}
              </div>

              <button onClick={handleGenerate} className="btn btn-primary btn-md" style={{ width: "100%", justifyContent: "center" }}>
                {generating ? (
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}>⟳</motion.span>
                    Generating...
                  </span>
                ) : "✦ Generate AI Signature"}
              </button>

              {generated && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  style={{ marginTop: 16, padding: "12px 14px", borderRadius: 10, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
                  <div style={{ fontSize: 12, color: "#22c55e", fontWeight: 700, marginBottom: 6 }}>✓ Signature generated!</div>
                  <div style={{ fontSize: 11, color: "#475569", lineHeight: 1.6 }}>{AI_ROLES[aiRole].result}</div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Platform compatibility */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}>
            <div className="pill pill-cyan" style={{ marginBottom: 20 }}>Works Everywhere</div>
            <h2 className="display-md" style={{ color: "#fff", marginBottom: 16 }}>
              One Signature.
              <br />
              <span className="grad-blue">Every Platform.</span>
            </h2>
            <p style={{ fontSize: 16, color: "#64748b", marginBottom: 36, lineHeight: 1.7 }}>
              Your signature renders pixel-perfectly in every email client, CRM, and sales tool your team uses.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              {PLATFORMS.map((p, i) => (
                <motion.div key={p.name}
                  initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 + i * 0.05 }}
                  className="card card-hover"
                  style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, cursor: "default" }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: `${p.color}18`, border: `1px solid ${p.color}28`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 11, color: p.color, flexShrink: 0 }}>{p.logo}</div>
                  <span style={{ fontWeight: 600, fontSize: 12, color: "#94a3b8" }}>{p.name}</span>
                  <span style={{ marginLeft: "auto", color: "#22c55e", fontSize: 11 }}>✓</span>
                </motion.div>
              ))}
            </div>

            <div style={{ padding: "14px 18px", borderRadius: 12, background: "rgba(37,99,235,0.07)", border: "1px solid rgba(37,99,235,0.18)", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 22 }}>🌐</span>
              <div>
                <div style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 14 }}>+ 1,000 more platforms</div>
                <div style={{ color: "#475569", fontSize: 12 }}>If it sends email, your signature works in it</div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
