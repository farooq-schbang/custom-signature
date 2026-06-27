"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";

const TESTIMONIALS = [
  { quote: "After switching, my reply rates jumped 38% in the first month. Every Fortune 500 prospect immediately takes me more seriously.", name: "Sarah Chen", role: "VP of Sales, Salesforce", init: "S", color: "#00A1E0", size: "large" },
  { quote: "The GIF showcase is pure genius. My SaaS demo plays right inside the email — I've closed 3 deals just from the signature alone.", name: "Marcus Rivera", role: "Founder, TechVentures", init: "M", color: "#7c3aed", size: "small" },
  { quote: "We deployed across our 200-person sales team in one afternoon. Brand consistency + measurable ROI from day one.", name: "Jennifer Park", role: "CMO, Goldman Sachs", init: "J", color: "#2563eb", size: "small" },
  { quote: "I used to think signatures were an afterthought. Custom Signature completely changed that — it's a sales tool disguised as a footer.", name: "David Thompson", role: "Enterprise AE, Microsoft", init: "D", color: "#059669", size: "large" },
  { quote: "The calendar link alone saves me 3 hours every week. No more back-and-forth scheduling — prospects click and book instantly.", name: "Lisa Wang", role: "Director of BD, Google", init: "L", color: "#dc2626", size: "small" },
  { quote: "Went from generic plain-text to beautifully branded signatures overnight. Our outreach conversion improved by 31%.", name: "Robert Kim", role: "Head of Growth, Stripe", init: "R", color: "#6366f1", size: "small" },
];

export function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="testimonials" ref={ref} style={{ padding: "100px 0", background: "#020208" }}>
      <Container>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="pill pill-gold" style={{ marginBottom: 20 }}>Testimonials</div>
          <h2 className="display-lg" style={{ color: "#fff", marginBottom: 16 }}>
            Loved By Leaders at
            <br />
            <span style={{ background: "linear-gradient(135deg, #fbbf24 0%, #f97316 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              World-Class Companies.
            </span>
          </h2>

          {/* Aggregate rating */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "10px 20px", borderRadius: 100, background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)" }}>
            <div style={{ display: "flex", gap: 2 }}>{"★★★★★".split("").map((s, i) => <span key={i} style={{ color: "#fbbf24", fontSize: 16 }}>{s}</span>)}</div>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>5.0</span>
            <span style={{ color: "#64748b", fontSize: 13 }}>from 2,400+ reviews on G2 & Google</span>
          </div>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={t.name}
              initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.07, duration: 0.5 }}
              className="card card-hover"
              style={{ padding: 24, position: "relative", overflow: "hidden" }}
              whileHover={{ borderColor: `${t.color}30`, backgroundColor: `${t.color}04`, y: -4, transition: { duration: 0.2 } }}
            >
              {/* Subtle top accent */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, ${t.color}60, transparent)` }} />

              {/* Quote mark */}
              <div style={{ fontSize: 48, lineHeight: 1, color: `${t.color}20`, fontFamily: "Georgia,serif", marginBottom: 4, marginTop: -8 }}>&ldquo;</div>

              <div style={{ display: "flex", gap: 1, marginBottom: 12, marginTop: -16 }}>
                {"★★★★★".split("").map((s, si) => <span key={si} style={{ color: "#fbbf24", fontSize: 13 }}>{s}</span>)}
              </div>
              <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.75, marginBottom: 20 }}>{t.quote}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", fontSize: 15, flexShrink: 0 }}>{t.init}</div>
                <div>
                  <div style={{ fontWeight: 700, color: "#e2e8f0", fontSize: 13 }}>{t.name}</div>
                  <div style={{ color: "#475569", fontSize: 12 }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
