"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Container } from "@/components/ui/Container";

const COLORS = ["#2563eb","#7c3aed","#059669","#dc2626","#d97706","#0891b2","#ec4899","#f59e0b"];
const FIELDS = [
  { key:"name", label:"Full Name", placeholder:"Alex Johnson" },
  { key:"title", label:"Job Title", placeholder:"VP of Sales" },
  { key:"company", label:"Company", placeholder:"Acme Corporation" },
  { key:"email", label:"Email Address", placeholder:"alex@acmecorp.com" },
  { key:"website", label:"Website", placeholder:"www.acmecorp.com" },
  { key:"calendly", label:"Calendar Link", placeholder:"calendly.com/yourname" },
];
const SOCIALS = [
  { key:"web", icon:"🌐", label:"Website" },
  { key:"li", icon:"in", label:"LinkedIn" },
  { key:"yt", icon:"▶", label:"YouTube" },
  { key:"tw", icon:"𝕏", label:"Twitter" },
  { key:"ig", icon:"📸", label:"Instagram" },
];

export function Builder() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [f, setF] = useState({ name:"Alex Johnson", title:"VP of Sales", company:"Acme Corp", email:"alex@acmecorp.com", website:"www.acmecorp.com", calendly:"calendly.com/alexjohnson", accentColor:"#2563eb" });
  const [copied, setCopied] = useState(false);
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));
  const c = f.accentColor;

  const handleCopy = () => {
    const html = `<table cellpadding="0" cellspacing="0" border="0" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:13px;">
  <tr>
    <td style="vertical-align:middle;padding-right:10px;border-right:2px solid ${c}40;">
      <table cellpadding="0" cellspacing="4">
        ${SOCIALS.map(s=>`<tr><td><a href="#" style="display:block;width:22px;height:22px;border-radius:50%;background:${c}18;text-align:center;line-height:22px;text-decoration:none;font-size:10px;">${s.icon}</a></td></tr>`).join('')}
      </table>
    </td>
    <td style="vertical-align:top;padding-left:12px;padding-right:12px;">
      <div style="color:${c};font-weight:800;font-size:12px;margin-bottom:4px;">${f.company}</div>
      <div style="color:#fff;font-weight:700;font-size:14px;margin-bottom:2px;">${f.name} <span style="color:#1d9bf0;font-size:11px;">✓</span></div>
      <div style="color:#9ca3af;font-size:12px;margin-bottom:6px;">${f.title}</div>
      <div style="color:#6b7280;font-size:11px;margin-bottom:2px;"><a href="mailto:${f.email}" style="color:#6b7280;text-decoration:none;">${f.email}</a></div>
      <div style="color:#6b7280;font-size:11px;margin-bottom:8px;"><a href="https://${f.website}" style="color:#6b7280;text-decoration:none;">${f.website}</a></div>
      ${f.calendly ? `<a href="https://${f.calendly}" style="display:inline-block;padding:5px 14px;background:${c};color:#fff;border-radius:20px;text-decoration:none;font-size:11px;font-weight:600;">📅 Book a Meeting</a>` : ''}
    </td>
  </tr>
</table>`;
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="builder" ref={ref} style={{ padding: "96px 0", background: "linear-gradient(180deg, #06060f 0%, #080915 100%)" }}>
      <Container>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="pill pill-cyan" style={{ marginBottom: 16 }}>⚡ Live Builder</div>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}>
            Build Yours in
            <br />
            <span className="text-gradient-green">60 Seconds</span>
          </h2>
          <p style={{ fontSize: 17, color: "#9ca3af", maxWidth: 480, margin: "0 auto", lineHeight: 1.65 }}>
            Fill in your details and watch your signature come to life. Copy the HTML and paste it anywhere.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 32 }} className="grid md:grid-cols-2">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1, duration: 0.6 }}
            className="card" style={{ padding: 28 }}>
            <h3 style={{ fontWeight: 700, color: "#fff", fontSize: 15, marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#60a5fa" }}>✦</span> Your Information
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {FIELDS.map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{label}</label>
                  <input type="text" value={(f as Record<string,string>)[key]} onChange={e => set(key, e.target.value)} placeholder={placeholder}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", fontSize: 13, outline: "none", boxSizing: "border-box" }}
                    onFocus={e => { e.target.style.borderColor = `${c}60`; e.target.style.background = "rgba(255,255,255,0.06)"; }}
                    onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.background = "rgba(255,255,255,0.04)"; }}
                  />
                </div>
              ))}
              {/* Color picker */}
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Brand Color</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {COLORS.map(col => (
                    <button key={col} onClick={() => set("accentColor", col)} title={col}
                      style={{ width: 30, height: 30, borderRadius: "50%", background: col, border: f.accentColor === col ? `2px solid ${col}` : "2px solid transparent", outline: f.accentColor === col ? `2px solid rgba(255,255,255,0.4)` : "2px solid transparent", outlineOffset: 2, transform: f.accentColor === col ? "scale(1.2)" : "scale(1)", cursor: "pointer", transition: "all 0.2s" }} />
                  ))}
                </div>
              </div>
              {/* Socials */}
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Social Channels</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {SOCIALS.map(({ key, icon, label }) => (
                    <div key={key} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 100, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 12, color: "#9ca3af", cursor: "pointer" }}>
                      <span style={{ fontSize: 11 }}>{icon}</span> {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Preview */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2, duration: 0.6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <h3 style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>Live Preview</h3>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#34d399", marginLeft: "auto" }}>
                <motion.div animate={{ scale: [1,1.5,1] }} transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399" }} />
                Live
              </div>
            </div>

            {/* Email mockup */}
            <div className="email-surface" style={{ marginBottom: 16 }}>
              <div style={{ padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.02)" }}>
                <div style={{ display: "flex", gap: 5 }}>
                  {["rgba(255,69,58,0.7)","rgba(255,196,0,0.7)","rgba(40,200,64,0.7)"].map((bg,i) => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: bg }} />)}
                </div>
                <span style={{ fontSize: 11, color: "#4b5563", marginLeft: 8 }}>Gmail — Compose</span>
              </div>
              <div style={{ padding: 18 }}>
                <p style={{ color: "#4b5563", fontSize: 13, marginBottom: 8 }}>Hi [Recipient],</p>
                {[0.7,0.5].map((w,i) => <div key={i} style={{ height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 4, marginBottom: 6, width: `${w*100}%` }} />)}
                <p style={{ color: "#4b5563", fontSize: 13, marginTop: 10, marginBottom: 12 }}>Best regards,</p>
                <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 12 }} />

                {/* Live sig */}
                <div style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${c}22` }}>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: 3, flexShrink: 0, background: `linear-gradient(180deg, ${c}, ${c}40)` }} />
                    <div style={{ display: "flex", flexDirection: "column", gap: 7, padding: "12px 10px", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
                      {SOCIALS.map(({ key, icon }) => (
                        <motion.div key={key} whileHover={{ scale: 1.15 }}
                          style={{ width: 22, height: 22, borderRadius: "50%", background: `${c}15`, border: `1px solid ${c}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, cursor: "pointer" }}>
                          {icon}
                        </motion.div>
                      ))}
                    </div>
                    <div style={{ flex: 1, padding: "12px 14px", display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 800, fontSize: 12, color: c, marginBottom: 5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.company || "Your Company"}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
                          <span style={{ color: "#fff", fontWeight: 700, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name || "Your Name"}</span>
                          <span style={{ color: "#60a5fa", fontSize: 10 }}>✓</span>
                        </div>
                        <div style={{ color: "#9ca3af", fontSize: 11, marginBottom: 8 }}>{f.title || "Your Title"}</div>
                        <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.email || "you@company.com"}</div>
                        <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.website || "www.company.com"}</div>
                        {f.calendly && (
                          <div style={{ display: "inline-block", padding: "4px 10px", borderRadius: 100, background: c, color: "#fff", fontSize: 10, fontWeight: 600, cursor: "pointer" }}>📅 Book a Meeting</div>
                        )}
                      </div>
                      <div style={{ width: 58, height: 72, borderRadius: 8, background: `linear-gradient(135deg, ${c}35, ${c}08)`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                        <span style={{ fontWeight: 900, fontSize: 20, color: `${c}90` }}>{(f.name || "Y").charAt(0).toUpperCase()}</span>
                        <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(45deg, transparent, transparent 4px, ${c}18 4px, ${c}18 5px)`, opacity: 0.4 }} />
                        <div style={{ position: "absolute", bottom: 4, right: 4, background: "rgba(0,0,0,0.5)", borderRadius: 3, padding: "1px 4px", fontSize: 6, fontWeight: 700, color: "rgba(255,255,255,0.5)" }}>GIF</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* GIF placeholder */}
                <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10, border: "1px dashed rgba(255,255,255,0.1)", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 8, background: `linear-gradient(135deg, ${c}25, ${c}08)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🎬</div>
                  <div>
                    <div style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>Hero Product GIF</div>
                    <div style={{ color: "#4b5563", fontSize: 11 }}>Your brand animation plays here</div>
                  </div>
                  <div style={{ marginLeft: "auto", padding: "2px 8px", borderRadius: 100, background: `${c}15`, color: c, fontSize: 10, fontWeight: 700, border: `1px solid ${c}22` }}>Pro</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 10 }}>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleCopy}
                style={{ flex: 1, padding: "14px 0", borderRadius: 12, background: copied ? "#059669" : `linear-gradient(135deg, ${c}, ${c}cc)`, color: "#fff", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", boxShadow: `0 0 24px ${c}40` }}>
                {copied ? "✓ Copied!" : "📋 Copy HTML Code"}
              </motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                style={{ padding: "14px 20px", borderRadius: 12, background: "rgba(255,255,255,0.05)", color: "#fff", fontWeight: 700, fontSize: 14, border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}>
                💾 Export
              </motion.button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
