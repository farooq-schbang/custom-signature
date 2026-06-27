"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Container } from "@/components/ui/Container";

const FIELDS = [
  { key: "name", label: "Full Name", placeholder: "Alex Johnson", type: "text" },
  { key: "title", label: "Job Title", placeholder: "VP of Sales", type: "text" },
  { key: "company", label: "Company", placeholder: "Acme Corp", type: "text" },
  { key: "email", label: "Email", placeholder: "alex@acme.com", type: "email" },
  { key: "phone", label: "Phone", placeholder: "+1 (555) 000-0000", type: "tel" },
  { key: "website", label: "Website", placeholder: "https://acme.com", type: "url" },
];

const ACCENT_COLORS = ["#2563eb","#5E6AD2","#7c3aed","#00A1E0","#10b981","#f59e0b","#ef4444","#FF7A59"];

const TABS = ["Design","Links","Banner","Analytics"];

export function Builder() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [fields, setFields] = useState<Record<string, string>>({
    name: "Alex Johnson",
    title: "VP of Sales",
    company: "Acme Corp",
    email: "alex@acme.com",
    phone: "+1 (555) 012-3456",
    website: "https://acme.com",
  });
  const [accent, setAccent] = useState("#2563eb");
  const [badge, setBadge] = useState(true);
  const [activeTab, setActiveTab] = useState("Design");
  const [copied, setCopied] = useState(false);

  const set = (k: string, v: string) => setFields(prev => ({ ...prev, [k]: v }));

  const handleCopy = () => {
    const html = `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;"><tr><td style="border-top:3px solid ${accent};padding-top:12px;"><table cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right:12px;vertical-align:top;"><div style="width:44px;height:44px;border-radius:50%;background:${accent};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:18px;">${fields.name?.[0] || "A"}</div></td><td><strong style="color:#111827;font-size:14px;">${fields.name || ""}</strong><br/><span style="color:#6b7280;font-size:12px;">${fields.title || ""} · ${fields.company || ""}</span><br/><span style="color:#9ca3af;font-size:11px;">${fields.email || ""} · ${fields.phone || ""}</span></td></tr></table></td></tr></table>`;
    navigator.clipboard.writeText(html).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  return (
    <section id="builder" ref={ref} style={{ padding: "100px 0", background: "#020208" }}>
      <Container>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="pill pill-green" style={{ marginBottom: 20 }}>Live Builder</div>
          <h2 className="display-lg" style={{ color: "#fff", marginBottom: 16 }}>
            Build Yours in
            <br />
            <span className="grad-green">Under 2 Minutes.</span>
          </h2>
          <p style={{ fontSize: 17, color: "#64748b", maxWidth: 420, margin: "0 auto", lineHeight: 1.7 }}>
            Type your details, pick a style, copy and paste. No account required to get started.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 32, alignItems: "start" }} className="grid md:grid-cols-2">
          {/* Editor panel */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 }}>
            <div className="mac-window">
              {/* App tabs */}
              <div style={{ background: "#1a1a2e", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 16px", display: "flex", alignItems: "center", gap: 2 }}>
                {TABS.map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer", background: "transparent", borderBottom: activeTab === tab ? "2px solid #2563eb" : "2px solid transparent", color: activeTab === tab ? "#60a5fa" : "#475569", transition: "all 0.2s" }}
                  >{tab}</button>
                ))}
              </div>

              <div style={{ padding: 20, background: "#0e0e1a" }}>
                {/* Color picker */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Accent Color</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {ACCENT_COLORS.map(c => (
                      <button key={c} onClick={() => setAccent(c)}
                        style={{ width: 28, height: 28, borderRadius: "50%", background: c, border: c === accent ? `3px solid #fff` : "3px solid transparent", cursor: "pointer", boxShadow: c === accent ? `0 0 0 2px ${c}` : "none", transition: "all 0.15s" }}
                      />
                    ))}
                  </div>
                </div>

                {/* Fields */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {FIELDS.map(f => (
                    <div key={f.key}>
                      <label style={{ fontSize: 11, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 5 }}>{f.label}</label>
                      <input
                        type={f.type}
                        value={fields[f.key] || ""}
                        onChange={e => set(f.key, e.target.value)}
                        placeholder={f.placeholder}
                        style={{ width: "100%", padding: "9px 12px", borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "#e2e8f0", fontSize: 13, outline: "none", fontFamily: "inherit", transition: "border-color 0.2s" }}
                        onFocus={e => e.target.style.borderColor = `${accent}60`}
                        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.09)"}
                      />
                    </div>
                  ))}
                </div>

                {/* Options */}
                <div style={{ marginTop: 16, display: "flex", gap: 10, alignItems: "center" }}>
                  <button onClick={() => setBadge(b => !b)}
                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 8, border: badge ? `1px solid ${accent}40` : "1px solid rgba(255,255,255,0.08)", background: badge ? `${accent}12` : "rgba(255,255,255,0.04)", cursor: "pointer", color: badge ? accent : "#64748b", fontSize: 12, fontWeight: 600, transition: "all 0.2s" }}
                  >
                    {badge ? "✓ " : "○ "} Verified Badge
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Preview panel */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}>
            <div style={{ position: "sticky", top: 100 }}>
              <div className="mac-window">
                <div className="mac-titlebar">
                  <div className="mac-dot" style={{ background: "#ff5f57" }} />
                  <div className="mac-dot" style={{ background: "#febc2e" }} />
                  <div className="mac-dot" style={{ background: "#28c840" }} />
                  <div style={{ flex: 1, textAlign: "center", fontSize: 12, color: "#475569" }}>Live Preview</div>
                </div>

                <div style={{ padding: 20, background: "#0e0e1a" }}>
                  {/* Fake email body */}
                  <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7, marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <p style={{ marginBottom: 6 }}>Hi Sarah,</p>
                    <p style={{ marginBottom: 6 }}>Thanks for your time on our call today — excited about the opportunity ahead.</p>
                    <p>Best,</p>
                  </div>

                  {/* Live signature */}
                  <motion.div
                    key={accent + JSON.stringify(fields)}
                    initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}
                    style={{ borderTop: `3px solid ${accent}`, paddingTop: 16 }}
                  >
                    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <div style={{ width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg, ${accent}dd, ${accent}55)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18, color: "#fff", flexShrink: 0, boxShadow: `0 4px 16px ${accent}40` }}>
                        {(fields.name || "A")[0].toUpperCase()}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
                          <span style={{ fontWeight: 700, fontSize: 14, color: "#e2e8f0" }}>{fields.name || "Your Name"}</span>
                          {badge && <div style={{ width: 15, height: 15, borderRadius: "50%", background: "#1d9bf0", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 8 }}>✓</span></div>}
                        </div>
                        <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>
                          {fields.title || "Job Title"}
                          {fields.company && <> · <span style={{ color: accent, fontWeight: 600 }}>{fields.company}</span></>}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 10 }}>
                          {fields.email && <span style={{ fontSize: 11, color: "#475569" }}><span style={{ color: accent }}>✉ </span>{fields.email}</span>}
                          {fields.phone && <span style={{ fontSize: 11, color: "#475569" }}><span style={{ color: accent }}>☎ </span>{fields.phone}</span>}
                        </div>
                        <div style={{ display: "flex", gap: 5 }}>
                          {[["in","#0077b5"],["𝕏","#111827"],["🌐",accent],["📅",accent]].map(([ic, bg], i) => (
                            <div key={i} style={{ width: 22, height: 22, borderRadius: 5, background: bg as string, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#fff", fontWeight: 700 }}>{ic}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Copy button */}
              <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
                <button onClick={handleCopy} className="btn btn-primary btn-md" style={{ flex: 1, transition: "all 0.2s" }}>
                  {copied ? "✓ Copied to Clipboard!" : "📋 Copy HTML Signature"}
                </button>
                <a href="#pricing" className="btn btn-ghost btn-md" style={{ fontSize: 13 }}>Upgrade →</a>
              </div>
              <p style={{ textAlign: "center", fontSize: 12, color: "#334155", marginTop: 10 }}>Paste directly into Gmail, Outlook, Apple Mail & more</p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
