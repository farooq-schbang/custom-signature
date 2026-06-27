"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";

const FEATS = [
  { icon: "🎬", title: "Animated GIF Showcase", desc: "Looping brand animation plays directly in inboxes — no plugins, no attachments.", tag: "Exclusive", color: "#2563eb" },
  { icon: "📅", title: "One-Click Calendar", desc: "Calendly, Cal.com, or Google Meet — let anyone book you right from your email.", tag: "Productivity", color: "#7c3aed" },
  { icon: "⚡", title: "Interactive Social Nav", desc: "Animated vertical icon sidebar for Website, LinkedIn, YouTube, Instagram and more.", tag: "Unique", color: "#0891b2" },
  { icon: "✅", title: "Verified Trust Badge", desc: "Blue verified checkmark next to your name — instant authority with every email.", tag: "Trust", color: "#1d9bf0" },
  { icon: "🤖", title: "AI-Generated Design", desc: "Feed your brand colors and industry. Our AI crafts a pixel-perfect signature.", tag: "AI Powered", color: "#059669" },
  { icon: "🌐", title: "1000+ Platform Support", desc: "Works natively in Gmail, Outlook, Superhuman, HubSpot, Salesforce and more.", tag: "Universal", color: "#d97706" },
  { icon: "📊", title: "Analytics & A/B Testing", desc: "Track clicks and engagement. A/B test designs to find what converts best.", tag: "Data-Driven", color: "#dc2626" },
  { icon: "👥", title: "Team Management", desc: "Deploy brand-compliant signatures across your entire org with bulk controls.", tag: "Enterprise", color: "#7c3aed" },
];

export function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="features" ref={ref} style={{ padding: "96px 0", background: "linear-gradient(180deg, #06060f 0%, #08091a 50%, #06060f 100%)" }}>
      <Container>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="pill pill-violet" style={{ marginBottom: 16 }}>✦ Features</div>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}>
            Nothing Else
            <br />
            <span className="text-gradient-blue" style={{ background: "linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Like It
            </span>
          </h2>
          <p style={{ fontSize: 17, color: "#9ca3af", maxWidth: 520, margin: "0 auto", lineHeight: 1.65 }}>
            Every element engineered to build trust, drive clicks, and make you unforgettable — all in one email footer.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {FEATS.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="card"
              style={{ padding: 24, position: "relative", overflow: "hidden", cursor: "default", transition: "all 0.2s" }}
              whileHover={{ y: -4, borderColor: `${f.color}30`, backgroundColor: `${f.color}08`, transition: { duration: 0.2 } }}
            >
              {/* Top accent on hover */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${f.color}, transparent)`, opacity: 0 }}
                className="feat-accent" />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${f.color}18`, border: `1px solid ${f.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                  {f.icon}
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 100, background: `${f.color}18`, color: f.color, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  {f.tag}
                </span>
              </div>

              <div style={{ fontWeight: 700, color: "#fff", fontSize: 14, marginBottom: 8 }}>{f.title}</div>
              <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.65 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
