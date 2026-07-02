"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";

const FEATURES = [
  {
    icon: "⚡", color: "#0047FF", bg: "#EEF2FF",
    title: "AI Signature Generator",
    desc: "Describe your role and our AI builds an optimized, industry-specific signature in seconds — no blank canvas.",
    badge: "AI",
  },
  {
    icon: "🎬", color: "#DC2626", bg: "#FEF2F2",
    title: "GIF Product Showcase",
    desc: "Embed a looping demo directly inside your signature. Your product pitch, delivered automatically in every email.",
    badge: "Pro",
  },
  {
    icon: "📅", color: "#059669", bg: "#ECFDF5",
    title: "1-Click Booking Link",
    desc: "Connect Calendly, Cal.com, or Google Calendar. Recipients book instantly — no back-and-forth.",
    badge: null,
  },
  {
    icon: "✓", color: "#1d9bf0", bg: "#EFF6FF",
    title: "Verified Blue Badge",
    desc: "The credibility signal every Fortune 500 prospect looks for. A checkmark that signals you're the real deal.",
    badge: null,
  },
  {
    icon: "📊", color: "#7C3AED", bg: "#F5F3FF",
    title: "Click Analytics",
    desc: "Know which recipients clicked your links, which platforms drive traffic, and what content converts best.",
    badge: "Pro",
  },
  {
    icon: "🏢", color: "#D97706", bg: "#FFFBEB",
    title: "Team Deployment",
    desc: "Roll out consistent, on-brand signatures to your entire sales team in one afternoon. Brand compliance at scale.",
    badge: "Enterprise",
  },
];

export function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section id="features" ref={ref} style={{ background: "#fff", padding: "100px 0" }}>
      <Container>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="tag tag-blue" style={{ marginBottom: 16 }}>Features</div>
          <h2 className="t-heading" style={{ color: "#09090b", marginBottom: 16 }}>
            Supercharge Your Emails.
          </h2>
          <p className="t-body" style={{ maxWidth: 440, margin: "0 auto" }}>
            Every tool you need to turn your email footer into a revenue-generating first impression.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="grid md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.07 }}
              className="card-light" style={{ padding: 28, position: "relative" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{ width: 48, height: 48, borderRadius: 13, background: f.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{f.icon}</div>
                {f.badge && (
                  <span style={{ fontSize: 10.5, fontWeight: 700, padding: "2px 9px", borderRadius: 100, background: f.bg, color: f.color, border: `1px solid ${f.color}30` }}>{f.badge}</span>
                )}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#09090b", marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "#71717a", lineHeight: 1.65 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
