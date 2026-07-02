"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";

const TESTIMONIALS = [
  { quote: "After switching, my reply rates jumped 38% in the first month. Every Fortune 500 prospect immediately takes me more seriously.", name: "Sarah Chen", role: "VP of Sales, Salesforce", color: "#00A1E0", initials: "SC" },
  { quote: "The GIF showcase is pure genius. My SaaS demo plays right inside the email — I closed 3 deals from the signature alone.", name: "Marcus Rivera", role: "Founder, TechVentures", color: "#5E6AD2", initials: "MR" },
  { quote: "We deployed across our 200-person sales team in one afternoon. Brand consistency and measurable ROI from day one.", name: "Jennifer Park", role: "CMO, Goldman Sachs", color: "#0047FF", initials: "JP" },
  { quote: "I used to think signatures were an afterthought. This completely changed that — it's a sales tool disguised as a footer.", name: "David Thompson", role: "Enterprise AE, Microsoft", color: "#059669", initials: "DT" },
  { quote: "The Calendly link alone saves me 3 hours per week. No more scheduling back-and-forth — prospects book in seconds.", name: "Lisa Wang", role: "Director of BD, Google", color: "#DC2626", initials: "LW" },
  { quote: "From plain-text to beautifully branded signatures overnight. Our outreach conversion improved by 31% in 6 weeks.", name: "Robert Kim", role: "Head of Growth, Stripe", color: "#7C3AED", initials: "RK" },
];

export function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="testimonials" ref={ref} style={{ background: "#fff", padding: "100px 0", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      <Container>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="tag tag-amber" style={{ marginBottom: 16 }}>Testimonials</div>
          <h2 className="t-heading" style={{ color: "#09090b", marginBottom: 12 }}>
            Loved by leaders at<br />world-class companies.
          </h2>
          {/* Rating row */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 18px", borderRadius: 100, background: "#FFFBEB", border: "1px solid #FDE68A" }}>
            <div style={{ display: "flex", gap: 2 }}>{"★★★★★".split("").map((s,i) => <span key={i} style={{ color: "#F59E0B", fontSize: 14 }}>{s}</span>)}</div>
            <span style={{ fontWeight: 700, color: "#09090b", fontSize: 13 }}>5.0</span>
            <span style={{ color: "#92400e", fontSize: 13 }}>from 2,400+ reviews on G2 & Google</span>
          </div>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="grid md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={t.name}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.07 }}
              className="card-light"
              style={{ padding: 24, position: "relative", overflow: "hidden" }}
              whileHover={{ y: -3, transition: { duration: 0.18 } }}
            >
              {/* Top color accent */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${t.color}, ${t.color}44)` }} />
              
              {/* Stars */}
              <div style={{ display: "flex", gap: 2, marginBottom: 14, marginTop: 8 }}>
                {"★★★★★".split("").map((s,i) => <span key={i} style={{ color: "#F59E0B", fontSize: 13 }}>{s}</span>)}
              </div>
              <p style={{ fontSize: 14, color: "#3f3f46", lineHeight: 1.7, marginBottom: 20 }}>"{t.quote}"</p>
              
              <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 16, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", fontSize: 12, flexShrink: 0 }}>{t.initials}</div>
                <div>
                  <div style={{ fontWeight: 700, color: "#09090b", fontSize: 13 }}>{t.name}</div>
                  <div style={{ color: "#a1a1aa", fontSize: 12 }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
