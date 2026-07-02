"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";

const STEPS = [
  {
    num: "01",
    title: "Choose a Template",
    desc: "Pick from 50+ professionally designed signature templates built for specific roles, industries, and company sizes.",
    accent: "#0047FF",
    visual: (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 7 }}>
        {[["#0047FF","SC"],["#5E6AD2","MR"],["#F24E1E","SL"],["#00A1E0","AC"],["#059669","JP"],["#635BFF","PK"]].map(([c, init], i) => (
          <div key={i} style={{ borderRadius: 10, padding: "10px 8px", border: `1px solid ${c}25`, background: `${c}06`, display: "flex", alignItems: "center", gap: 6, cursor: "pointer", transition: "all 0.15s" }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: c as string, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, fontWeight: 800, color: "#fff", flexShrink: 0 }}>{init}</div>
            <div style={{ flex: 1 }}>
              <div style={{ height: 4, borderRadius: 2, background: `${c}40`, marginBottom: 3 }} />
              <div style={{ height: 3, borderRadius: 2, background: `${c}20`, width: "65%" }} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: "02",
    title: "Customize Details",
    desc: "Add your name, title, photo, social links, meeting calendar, GIF showcase, and verified badge. Live preview updates as you type.",
    accent: "#5B5BD6",
    visual: (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[["Name","Alexandra Chen"],["Title","VP of Sales"],["Company","Salesforce"],["Calendar","Link Calendly"]].map(([l, v]) => (
          <div key={l} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ fontSize: 11, color: "#a1a1aa", width: 50, flexShrink: 0 }}>{l}</div>
            <div style={{ flex: 1, borderRadius: 7, padding: "7px 10px", background: "#fff", border: "1px solid rgba(0,0,0,0.1)", fontSize: 12, color: "#09090b", fontWeight: 500 }}>{v}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: "03",
    title: "Copy & Go Live",
    desc: "One click copies HTML to your clipboard. Paste into Gmail, Outlook, Apple Mail, or any CRM in under 30 seconds.",
    accent: "#059669",
    visual: (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 4 }}>
          {[["G","#EA4335","Gmail"],["O","#0078D4","Outlook"],["✉","#3b3b3b","Apple"]].map(([logo, color, name]) => (
            <div key={name} style={{ borderRadius: 9, padding: "8px 6px", background: `${color}10`, border: `1px solid ${color}28`, textAlign: "center" }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: color as string, marginBottom: 2 }}>{logo}</div>
              <div style={{ fontSize: 10, color: "#71717a" }}>{name}</div>
            </div>
          ))}
        </div>
        <div style={{ borderRadius: 9, padding: "10px 14px", background: "#ECFDF5", border: "1px solid #A7F3D0", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14 }}>📋</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#059669" }}>HTML Signature Copied!</span>
          <span style={{ marginLeft: "auto", fontSize: 11, color: "#34d399" }}>✓</span>
        </div>
      </div>
    ),
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section id="howitworks" ref={ref} style={{ background: "#fff", padding: "100px 0", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      <Container>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="tag tag-green" style={{ marginBottom: 16 }}>How It Works</div>
          <h2 className="t-heading" style={{ color: "#09090b", marginBottom: 12 }}>Up and running in 3 steps.</h2>
          <p className="t-body" style={{ maxWidth: 400, margin: "0 auto" }}>No design experience. No dev help. Just a signature that makes every email count.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28, position: "relative" }} className="grid md:grid-cols-3">
          {/* Connector */}
          <div style={{ position: "absolute", top: 40, left: "calc(33.33% + 10px)", right: "calc(33.33% + 10px)", height: 1, borderTop: "1.5px dashed #d4d4d8" }} className="hidden md:block" />

          {STEPS.map((s, i) => (
            <motion.div key={s.num} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.12 }}
              className="card-light" style={{ padding: 28 }}>
              {/* Step number */}
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${s.accent}12`, border: `1.5px solid ${s.accent}30`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: s.accent }}>{s.num}</span>
              </div>
              {/* Visual */}
              <div style={{ borderRadius: 12, padding: 16, background: "#fafafa", border: "1px solid rgba(0,0,0,0.06)", marginBottom: 20 }}>
                {s.visual}
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#09090b", marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "#71717a", lineHeight: 1.65 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
          style={{ textAlign: "center", marginTop: 48 }}>
          <a href="#builder" className="btn btn-primary btn-lg">Start Building for Free →</a>
        </motion.div>
      </Container>
    </section>
  );
}
