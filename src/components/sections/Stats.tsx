"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";

const STATS = [
  { value: "42%", label: "Higher Reply Rate", desc: "Recipients are 42% more likely to respond when they see a professional branded signature.", color: "#2563eb", icon: "↩" },
  { value: "3×", label: "More Link Clicks", desc: "Interactive social icons and CTA buttons drive 3× more engagement per email sent.", color: "#7c3aed", icon: "🔗" },
  { value: "50k+", label: "Active Users", desc: "Join professionals from Fortune 500 companies who already rely on Custom Signature.", color: "#0891b2", icon: "👥" },
  { value: "1000+", label: "Platforms Supported", desc: "Works seamlessly in Gmail, Outlook, HubSpot, Salesforce and 1000+ other platforms.", color: "#059669", icon: "🌐" },
  { value: "100%", label: "Brand Compliant", desc: "Central admin controls ensure every employee email signature is always on-brand.", color: "#d97706", icon: "✅" },
];

export function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="why" ref={ref} style={{ padding: "96px 0", background: "#06060f" }}>
      <Container>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="pill pill-blue" style={{ marginBottom: 16 }}>By the Numbers</div>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}>
            Results That Speak
            <br />
            <span className="text-gradient-blue">For Themselves</span>
          </h2>
          <p style={{ fontSize: 17, color: "#9ca3af", maxWidth: 520, margin: "0 auto", lineHeight: 1.65 }}>
            Every metric measured. Every advantage proven. See why top professionals choose Custom Signature.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="card card-hover"
              style={{ padding: 28, cursor: "default" }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${s.color}18`, border: `1px solid ${s.color}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 20 }}>
                {s.icon}
              </div>
              <div style={{ fontSize: 40, fontWeight: 900, color: s.color, letterSpacing: "-0.03em", marginBottom: 4, lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 10 }}>{s.label}</div>
              <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.65 }}>{s.desc}</p>
            </motion.div>
          ))}

          {/* Fortune 500 card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.5 }}
            style={{ padding: 28, borderRadius: 16, background: "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(124,58,237,0.08))", border: "1px solid rgba(99,102,241,0.2)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: 200 }}
          >
            <div style={{ fontSize: 44, marginBottom: 12 }}>🏆</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 6 }}>Fortune 500</div>
            <div style={{ color: "#9ca3af", fontSize: 14, marginBottom: 20 }}>Ready & Certified</div>
            <div style={{ display: "flex", marginLeft: -6 }}>
              {["G","S","A","M","D"].map((l, i) => (
                <div key={i} style={{ width: 32, height: 32, borderRadius: "50%", border: "2px solid #06060f", background: `hsl(${i*60+200},65%,45%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", marginLeft: -6 }}>{l}</div>
              ))}
              <div style={{ width: 32, height: 32, borderRadius: "50%", border: "2px solid #06060f", background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", marginLeft: -6 }}>+</div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
