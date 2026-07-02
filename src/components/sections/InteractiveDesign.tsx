"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Container } from "@/components/ui/Container";

const PLATFORMS = [
  { name: "Gmail", color: "#EA4335", logo: "G" },
  { name: "Outlook", color: "#0078D4", logo: "O" },
  { name: "Apple Mail", color: "#3b3b3b", logo: "✉" },
  { name: "HubSpot", color: "#FF7A59", logo: "H" },
  { name: "Salesforce", color: "#00A1E0", logo: "S" },
  { name: "Superhuman", color: "#E83B3B", logo: "SH" },
  { name: "Front", color: "#FB923C", logo: "Fr" },
  { name: "Notion Mail", color: "#09090b", logo: "N" },
];

const AI_SUGGESTIONS = [
  { role: "Sales AE", industry: "SaaS", tip: "Authority layout + Calendly + GIF demo" },
  { role: "Creative Director", industry: "Design", tip: "Portfolio link + Instagram + animated avatar" },
  { role: "Startup Founder", industry: "Tech", tip: "Product GIF + investor credibility badge" },
  { role: "Investment Banker", industry: "Finance", tip: "Conservative trust layout + compliance-ready" },
];

export function InteractiveDesign() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeRole, setActiveRole] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);

  const handleGen = () => {
    setGenerating(true); setDone(false);
    setTimeout(() => { setGenerating(false); setDone(true); }, 1500);
  };

  return (
    <section style={{ background: "#06060f", color: "#fff", padding: "100px 0" }}>
      <Container>
        {/* Section header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} ref={ref}
          style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="tag tag-dark" style={{ marginBottom: 16 }}>AI + Compatibility</div>
          <h2 className="t-heading" style={{ color: "#fff", marginBottom: 12 }}>
            Built for how you actually work.
          </h2>
          <p style={{ fontSize: 17, color: "#71717a", maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
            AI generates your signature. It renders perfectly everywhere your team sends email.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }} className="grid md:grid-cols-2">
          {/* AI generator */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 }}>
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 100, background: "#FFFBEB", border: "1px solid #FDE68A", marginBottom: 14 }}>
                <span style={{ fontSize: 12 }}>⚡</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#D97706" }}>AI Signature Generator</span>
              </div>
              <h3 className="t-subheading" style={{ color: "#fff", marginBottom: 10 }}>Tell us your role.<br />We build the rest.</h3>
              <p style={{ fontSize: 15, color: "#71717a", lineHeight: 1.65 }}>Our AI has analyzed thousands of high-performing signatures by industry and role. It generates yours — optimized from day one.</p>
            </div>

            <div className="card" style={{ padding: 24 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#52525b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Select your role</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 18 }}>
                {AI_SUGGESTIONS.map((s, i) => (
                  <button key={i} onClick={() => { setActiveRole(i); setDone(false); }}
                    style={{
                      padding: "11px 14px", borderRadius: 10, border: activeRole === i ? "1.5px solid #0047FF" : "1px solid rgba(255,255,255,0.08)",
                      background: activeRole === i ? "rgba(0,71,255,0.1)" : "rgba(255,255,255,0.03)",
                      cursor: "pointer", textAlign: "left", transition: "all 0.15s", display: "flex", justifyContent: "space-between", alignItems: "center",
                    }}>
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: activeRole === i ? "#60a5fa" : "#e4e4e7" }}>{s.role}</span>
                      <span style={{ fontSize: 12, color: "#71717a", marginLeft: 6 }}>@ {s.industry}</span>
                    </div>
                    {activeRole === i && <span style={{ fontSize: 10, color: "#60a5fa" }}>→</span>}
                  </button>
                ))}
              </div>

              <button onClick={handleGen} className="btn btn-primary btn-md" style={{ width: "100%", justifyContent: "center", borderRadius: 10 }}>
                {generating
                  ? <span style={{ display: "flex", alignItems: "center", gap: 8 }}><motion.span animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}>◌</motion.span> Generating…</span>
                  : "✦ Generate My AI Signature"}
              </button>

              {done && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  style={{ marginTop: 12, padding: "12px 14px", borderRadius: 10, background: "rgba(5,150,105,0.1)", border: "1px solid rgba(5,150,105,0.25)" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#34d399", marginBottom: 4 }}>✓ Signature ready!</div>
                  <div style={{ fontSize: 12, color: "#71717a" }}>{AI_SUGGESTIONS[activeRole].tip}</div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Platform compatibility */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}>
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 100, background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.25)", marginBottom: 14 }}>
                <span style={{ fontSize: 12 }}>🌐</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#22d3ee" }}>Works Everywhere</span>
              </div>
              <h3 className="t-subheading" style={{ color: "#fff", marginBottom: 10 }}>One signature.<br />Every platform.</h3>
              <p style={{ fontSize: 15, color: "#71717a", lineHeight: 1.65 }}>Renders pixel-perfectly in Gmail, Outlook, Apple Mail, and every CRM your sales team uses.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
              {PLATFORMS.map((p, i) => (
                <motion.div key={p.name} initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.25 + i * 0.04 }}
                  className="card card-hover"
                  style={{ padding: "11px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 7, background: `${p.color}18`, border: `1px solid ${p.color}28`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 10, color: p.color, flexShrink: 0 }}>{p.logo}</div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#a1a1aa" }}>{p.name}</span>
                  <span style={{ marginLeft: "auto", fontSize: 11, color: "#22c55e" }}>✓</span>
                </motion.div>
              ))}
            </div>

            <div style={{ padding: "13px 16px", borderRadius: 12, background: "rgba(0,71,255,0.08)", border: "1px solid rgba(0,71,255,0.2)", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 20 }}>🌐</span>
              <div>
                <div style={{ fontWeight: 700, color: "#e4e4e7", fontSize: 13 }}>+ 1,000 more platforms</div>
                <div style={{ fontSize: 12, color: "#52525b" }}>If it sends email, your signature works in it</div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
