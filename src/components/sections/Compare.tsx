"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Container } from "@/components/ui/Container";

const TEMPLATES = [
  { id: "exec", label: "Executive", name: "Alexandra Chen", title: "Chief Revenue Officer", company: "Salesforce", email: "a.chen@salesforce.com", phone: "+1 (415) 555-9201", accent: "#00A1E0", logo: "SF", badge: true, category: "Sales" },
  { id: "startup", label: "Startup", name: "Marcus Rivera", title: "Co-Founder & CEO", company: "Linear", email: "marcus@linear.app", phone: "+1 (650) 555-0847", accent: "#5E6AD2", logo: "L", badge: true, category: "Tech" },
  { id: "creative", label: "Creative", name: "Sofia Lee", title: "Creative Director", company: "Figma", email: "sofia@figma.com", phone: "+1 (415) 555-4422", accent: "#F24E1E", logo: "F", badge: false, category: "Design" },
  { id: "finance", label: "Finance", name: "David Thompson", title: "Managing Director", company: "Goldman Sachs", email: "d.thompson@gs.com", phone: "+1 (212) 555-8800", accent: "#0047FF", logo: "GS", badge: true, category: "Finance" },
  { id: "tech", label: "Engineer", name: "Priya Patel", title: "Staff Engineer", company: "Stripe", email: "priya@stripe.com", phone: "+1 (415) 555-6633", accent: "#635BFF", logo: "S", badge: false, category: "Tech" },
  { id: "sales", label: "Sales AE", name: "Ryan Kim", title: "Enterprise Account Executive", company: "HubSpot", email: "ryan.kim@hubspot.com", phone: "+1 (857) 555-7711", accent: "#FF7A59", logo: "H", badge: false, category: "Sales" },
];

export function Compare() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [sel, setSel] = useState(0);
  const t = TEMPLATES[sel];

  return (
    <section id="compare" ref={ref} style={{ background: "#fafafa", padding: "100px 0", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      <Container>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="tag tag-violet" style={{ marginBottom: 16 }}>Top Examples</div>
          <h2 className="t-heading" style={{ color: "#09090b", marginBottom: 12 }}>Signatures That Win.</h2>
          <p className="t-body" style={{ maxWidth: 400, margin: "0 auto" }}>
            Click any template to preview it live. Built for specific industries and personas.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 40, alignItems: "start" }} className="grid md:grid-cols-2">
          {/* Template picker */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {TEMPLATES.map((tmpl, i) => (
                <button key={tmpl.id} onClick={() => setSel(i)} style={{
                  padding: "16px", borderRadius: 14, border: sel === i ? `1.5px solid ${tmpl.accent}` : "1.5px solid rgba(0,0,0,0.08)",
                  background: sel === i ? `${tmpl.accent}08` : "#fff",
                  cursor: "pointer", textAlign: "left", transition: "all 0.18s",
                  boxShadow: sel === i ? `0 4px 20px ${tmpl.accent}18` : "0 1px 3px rgba(0,0,0,0.04)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: `${tmpl.accent}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: tmpl.accent }}>{tmpl.name.split(" ").map(n => n[0]).join("")}</div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#09090b" }}>{tmpl.name.split(" ")[0]}</div>
                      <div style={{ fontSize: 10.5, color: "#71717a" }}>{tmpl.company}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: tmpl.accent }}>{tmpl.label}</span>
                    {sel === i && <span style={{ fontSize: 9, fontWeight: 700, background: tmpl.accent, color: "#fff", padding: "2px 7px", borderRadius: 100 }}>ACTIVE</span>}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Live preview */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.15 }}>
            <div style={{ position: "sticky", top: 88 }}>
              {/* Gmail preview */}
              <div className="email-client" style={{ marginBottom: 14 }}>
                <div className="email-titlebar">
                  <div className="mac-dot" style={{ background: "#ff5f57" }} />
                  <div className="mac-dot" style={{ background: "#febc2e" }} />
                  <div className="mac-dot" style={{ background: "#28c840" }} />
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <span style={{ fontSize: 12, color: "#9ca3af" }}>Gmail — Compose</span>
                  </div>
                </div>
                <div style={{ background: "#fff", padding: "12px 18px 20px" }}>
                  <div style={{ borderBottom: "1px solid #f3f4f6", padding: "7px 0", fontSize: 12, color: "#9ca3af" }}>
                    To: <span style={{ color: "#374151" }}>prospect@company.com</span>
                  </div>
                  <div style={{ borderBottom: "1px solid #f3f4f6", padding: "7px 0", fontSize: 12, color: "#9ca3af" }}>
                    Subject: <span style={{ color: "#09090b", fontWeight: 500 }}>Following up on our conversation</span>
                  </div>
                  <div style={{ padding: "14px 0 0", fontSize: 13, color: "#6b7280", lineHeight: 1.75 }}>
                    <p style={{ color: "#374151" }}>Hi there,</p>
                    <p style={{ margin: "6px 0" }}>It was great connecting. I&apos;d love to explore how we can work together on this.</p>
                    <p>Best,</p>
                    <motion.div key={t.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
                      style={{ borderTop: `2.5px solid ${t.accent}`, paddingTop: 14, marginTop: 4 }}>
                      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${t.accent}, ${t.accent}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, color: "#fff", flexShrink: 0 }}>
                          {t.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 2 }}>
                            <span style={{ fontWeight: 700, fontSize: 13, color: "#111827" }}>{t.name}</span>
                            {t.badge && <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#1d9bf0", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 7, fontWeight: 900 }}>✓</span></div>}
                          </div>
                          <div style={{ fontSize: 11.5, color: "#6b7280", marginBottom: 7 }}>{t.title} · <span style={{ color: t.accent, fontWeight: 600 }}>{t.company}</span></div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 9 }}>
                            <span style={{ fontSize: 10.5, color: "#9ca3af" }}><span style={{ color: t.accent }}>✉ </span>{t.email}</span>
                            <span style={{ fontSize: 10.5, color: "#9ca3af" }}><span style={{ color: t.accent }}>☎ </span>{t.phone}</span>
                          </div>
                          <div style={{ display: "flex", gap: 4 }}>
                            {[["in","#0077b5"],["𝕏","#111"],["📅",t.accent],["🌐",t.accent]].map(([ic, bg], ii) => (
                              <div key={ii} style={{ width: 22, height: 22, borderRadius: 5, background: bg as string, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8.5, color: "#fff", fontWeight: 700 }}>{ic}</div>
                            ))}
                          </div>
                        </div>
                        <div style={{ width: 36, height: 36, borderRadius: 9, background: `${t.accent}12`, border: `1px solid ${t.accent}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: t.accent }}>{t.logo}</div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <a href="#builder" className="btn btn-primary btn-md" style={{ flex: 1, justifyContent: "center" }}>Use This Template</a>
                <button className="btn btn-ghost btn-md" onClick={() => setSel((sel + 1) % TEMPLATES.length)}>Next →</button>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
