"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";

const TESTIMONIALS = [
  { quote: "After switching, my reply rates jumped 38% in the first month. Every Fortune 500 prospect immediately takes me more seriously.", name: "Sarah Chen", role: "VP of Sales, Salesforce", init: "S", color: "#00A1E0" },
  { quote: "The GIF showcase is pure genius. My SaaS demo plays right inside the email — I've closed 3 deals just from the signature alone.", name: "Marcus Rivera", role: "Founder, TechVentures", init: "M", color: "#7c3aed" },
  { quote: "We deployed across our 200-person sales team. The brand consistency and professionalism it brings to outbound is remarkable.", name: "Jennifer Park", role: "CMO, Goldman Sachs", init: "J", color: "#2563eb" },
  { quote: "I used to think signatures were an afterthought. Custom Signature completely changed that — it's a sales tool disguised as a footer.", name: "David Thompson", role: "Enterprise AE, Microsoft", init: "D", color: "#059669" },
  { quote: "The calendar link alone saves me hours every week. No more back-and-forth — prospects click and book in seconds.", name: "Lisa Wang", role: "Director of BD, Google", init: "L", color: "#dc2626" },
  { quote: "We went from generic plain-text to beautifully branded signatures overnight. Our outreach conversion improved by 31%.", name: "Robert Kim", role: "Head of Growth, Stripe", init: "R", color: "#6366f1" },
];

export function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{ padding: "96px 0", background: "linear-gradient(180deg, #06060f 0%, #08091a 50%, #06060f 100%)" }}>
      <Container>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="pill" style={{ marginBottom: 16, background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.22)", color: "#fbbf24" }}>Testimonials</div>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}>
            Loved By Leaders at
            <br />
            <span style={{ background: "linear-gradient(135deg, #fbbf24 0%, #f97316 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              World-Class Companies
            </span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="card"
              style={{ padding: 28 }}
              whileHover={{ borderColor: `${t.color}30`, backgroundColor: `${t.color}05`, y: -4, transition: { duration: 0.2 } }}
            >
              <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                {"★★★★★".split("").map((s, si) => <span key={si} style={{ color: "#fbbf24", fontSize: 14 }}>{s}</span>)}
              </div>
              <p style={{ color: "#d1d5db", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>&ldquo;{t.quote}&rdquo;</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", fontSize: 16, flexShrink: 0 }}>{t.init}</div>
                <div>
                  <div style={{ fontWeight: 700, color: "#fff", fontSize: 14 }}>{t.name}</div>
                  <div style={{ color: "#6b7280", fontSize: 12 }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
