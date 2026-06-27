"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Container } from "@/components/ui/Container";

const TEMPLATES = [
  {
    id: "exec",
    label: "Executive",
    name: "Alexandra Chen",
    title: "Chief Revenue Officer",
    company: "Salesforce",
    email: "a.chen@salesforce.com",
    phone: "+1 (415) 555-9201",
    accent: "#00A1E0",
    logo: "SF",
    badge: true,
    color: "#00A1E0",
  },
  {
    id: "startup",
    label: "Startup",
    name: "Marcus Rivera",
    title: "Co-Founder & CEO",
    company: "Linear",
    email: "marcus@linear.app",
    phone: "+1 (650) 555-0847",
    accent: "#5E6AD2",
    logo: "L",
    badge: true,
    color: "#5E6AD2",
  },
  {
    id: "creative",
    label: "Creative",
    name: "Sofia Lee",
    title: "Creative Director",
    company: "Figma",
    email: "sofia@figma.com",
    phone: "+1 (415) 555-4422",
    accent: "#F24E1E",
    logo: "F",
    badge: false,
    color: "#F24E1E",
  },
  {
    id: "finance",
    label: "Finance",
    name: "David Thompson",
    title: "Managing Director",
    company: "Goldman Sachs",
    email: "d.thompson@gs.com",
    phone: "+1 (212) 555-8800",
    accent: "#2563eb",
    logo: "GS",
    badge: true,
    color: "#2563eb",
  },
  {
    id: "tech",
    label: "Tech",
    name: "Priya Patel",
    title: "Staff Engineer",
    company: "Stripe",
    email: "priya@stripe.com",
    phone: "+1 (415) 555-6633",
    accent: "#635BFF",
    logo: "S",
    badge: false,
    color: "#635BFF",
  },
  {
    id: "sales",
    label: "Sales",
    name: "Ryan Kim",
    title: "Enterprise AE",
    company: "HubSpot",
    email: "ryan.kim@hubspot.com",
    phone: "+1 (857) 555-7711",
    accent: "#FF7A59",
    logo: "H",
    badge: false,
    color: "#FF7A59",
  },
];

function TemplateCard({ t, selected, onClick }: { t: typeof TEMPLATES[0]; selected: boolean; onClick: () => void }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={onClick}
      style={{
        borderRadius: 14, padding: 20, cursor: "pointer",
        border: selected ? `1px solid ${t.accent}60` : "1px solid rgba(255,255,255,0.07)",
        background: selected ? `${t.accent}0a` : "rgba(255,255,255,0.025)",
        transition: "border-color 0.2s, background 0.2s",
        position: "relative", overflow: "hidden",
      }}
    >
      {selected && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${t.accent}, ${t.accent}44)` }} />}
      
      {/* Mini signature preview */}
      <div style={{ borderTop: `2px solid ${t.accent}`, paddingTop: 12 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${t.accent}30`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: t.accent, flexShrink: 0 }}>{t.name[0]}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
              <span style={{ fontWeight: 700, fontSize: 13, color: "#e2e8f0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.name}</span>
              {t.badge && <div style={{ width: 13, height: 13, borderRadius: "50%", background: "#1d9bf0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ color: "#fff", fontSize: 7 }}>✓</span></div>}
            </div>
            <div style={{ fontSize: 11, color: "#64748b" }}>{t.title}</div>
            <div style={{ fontSize: 11, color: t.accent, fontWeight: 600 }}>{t.company}</div>
          </div>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: `${t.accent}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 900, color: t.accent, flexShrink: 0 }}>{t.logo}</div>
        </div>
      </div>
      
      <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: t.accent, letterSpacing: "0.05em" }}>{t.label}</span>
        {selected && <span style={{ fontSize: 10, color: t.accent, background: `${t.accent}20`, padding: "2px 8px", borderRadius: 100 }}>Selected ✓</span>}
      </div>
    </motion.div>
  );
}

export function Compare() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [selected, setSelected] = useState(0);
  const t = TEMPLATES[selected];

  return (
    <section id="compare" ref={ref} style={{ padding: "100px 0", background: "#020208" }}>
      <Container>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="pill pill-cyan" style={{ marginBottom: 20 }}>Live Examples</div>
          <h2 className="display-lg" style={{ color: "#fff", marginBottom: 16 }}>
            Top Signature
            <br />
            <span className="grad-aurora">Templates.</span>
          </h2>
          <p style={{ fontSize: 17, color: "#64748b", maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
            Click any template to preview it live. Each one is crafted for a specific industry and persona.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 40, alignItems: "start" }} className="grid md:grid-cols-2">
          {/* Template grid */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {TEMPLATES.map((tmpl, i) => (
                <TemplateCard key={tmpl.id} t={tmpl} selected={i === selected} onClick={() => setSelected(i)} />
              ))}
            </div>
          </motion.div>

          {/* Live preview */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}>
            <div style={{ position: "sticky", top: 100 }}>
              <div className="mac-window">
                <div className="mac-titlebar">
                  <div className="mac-dot" style={{ background: "#ff5f57" }} />
                  <div className="mac-dot" style={{ background: "#febc2e" }} />
                  <div className="mac-dot" style={{ background: "#28c840" }} />
                  <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                    <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 6, padding: "3px 16px", fontSize: 12, color: "#475569" }}>
                      Gmail — Compose
                    </div>
                  </div>
                </div>

                <div style={{ padding: "16px 20px 20px", background: "#0e0e1a" }}>
                  <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "8px 0", fontSize: 12, color: "#475569" }}>
                    <span style={{ marginRight: 8 }}>To:</span><span style={{ color: "#94a3b8" }}>prospect@company.com</span>
                  </div>
                  <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "8px 0", fontSize: 12, color: "#475569" }}>
                    <span style={{ marginRight: 8 }}>Subject:</span><span style={{ color: "#e2e8f0" }}>Following up on our conversation</span>
                  </div>

                  <div style={{ padding: "16px 0 0", fontSize: 13, color: "#94a3b8", lineHeight: 1.8 }}>
                    <p style={{ marginBottom: 8 }}>Hi there,</p>
                    <p style={{ marginBottom: 16 }}>It was great connecting at the conference. I&apos;d love to explore how we can work together.</p>

                    {/* Animated signature */}
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      style={{ borderTop: `3px solid ${t.accent}`, paddingTop: 16 }}
                    >
                      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                        <div style={{ width: 52, height: 52, borderRadius: "50%", background: `linear-gradient(135deg, ${t.accent}cc, ${t.accent}44)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 20, color: "#fff", flexShrink: 0 }}>{t.name[0]}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                            <span style={{ fontWeight: 700, fontSize: 15, color: "#e2e8f0" }}>{t.name}</span>
                            {t.badge && <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#1d9bf0", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 8, fontWeight: 900 }}>✓</span></div>}
                          </div>
                          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 10 }}>{t.title} · <span style={{ color: t.accent, fontWeight: 600 }}>{t.company}</span></div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: 10 }}>
                            <span style={{ fontSize: 11, color: "#475569" }}><span style={{ color: t.accent }}>✉ </span>{t.email}</span>
                            <span style={{ fontSize: 11, color: "#475569" }}><span style={{ color: t.accent }}>☎ </span>{t.phone}</span>
                          </div>
                          <div style={{ display: "flex", gap: 5 }}>
                            {[["in","#0077b5"],["𝕏","#111827"],["🌐",t.accent],["📅",t.accent]].map(([ic, bg], i) => (
                              <div key={i} style={{ width: 24, height: 24, borderRadius: 6, background: bg as string, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#fff", fontWeight: 700 }}>{ic}</div>
                            ))}
                          </div>
                        </div>
                        <div style={{ width: 38, height: 38, borderRadius: 9, background: `${t.accent}18`, border: `1px solid ${t.accent}30`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: t.accent }}>{t.logo}</div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Use this template button */}
              <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
                <a href="#builder" className="btn btn-primary btn-md" style={{ flex: 1, justifyContent: "center" }}>Use This Template</a>
                <button className="btn btn-ghost btn-md" style={{ fontSize: 13 }} onClick={() => setSelected((selected + 1) % TEMPLATES.length)}>Next →</button>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
