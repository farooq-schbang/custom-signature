"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";

const FEATURES = [
  { icon: "⚡", title: "AI-Powered Generator", desc: "Our AI analyzes top-performing signatures and generates one optimized for your industry and role.", color: "#fbbf24", pill: "AI" },
  { icon: "🎬", title: "GIF Product Showcase", desc: "Embed a looping product demo or brand animation directly inside your signature. Your pitch, delivered automatically.", color: "#f87171", pill: "Pro" },
  { icon: "📅", title: "1-Click Meeting Booking", desc: "Embed your Calendly, Cal.com or Google Calendar link. Prospects book instantly — no back-and-forth.", color: "#34d399", pill: "" },
  { icon: "✓", title: "Verified Blue Badge", desc: "The blue checkmark signals instant credibility to every recipient. Stand out in crowded inboxes.", color: "#1d9bf0", pill: "" },
  { icon: "📊", title: "Analytics Dashboard", desc: "See who clicked your links, which platforms drive the most traffic, and what content converts best.", color: "#a78bfa", pill: "Pro" },
  { icon: "🏢", title: "Team Management", desc: "Deploy consistent branded signatures across your entire team in minutes. Brand compliance at scale.", color: "#60a5fa", pill: "Enterprise" },
  { icon: "🔒", title: "SSO & SAML Integration", desc: "Enterprise-grade security with single sign-on, SAML 2.0 support, and role-based access controls.", color: "#fb923c", pill: "Enterprise" },
  { icon: "🌐", title: "1000+ Platform Support", desc: "Works natively in Gmail, Outlook, Apple Mail, HubSpot, Salesforce, and over 1,000 other platforms.", color: "#22d3ee", pill: "" },
];

export function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="features" ref={ref} style={{ padding: "100px 0", background: "#020208" }}>
      <Container>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="pill pill-blue" style={{ marginBottom: 20 }}>Features</div>
          <h2 className="display-lg" style={{ color: "#fff", marginBottom: 16 }}>
            Everything You Need to
            <br />
            <span className="grad-aurora">Win Every Inbox.</span>
          </h2>
          <p style={{ fontSize: 17, color: "#64748b", maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
            Not just a signature builder — a complete first-impression engine for ambitious professionals.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {FEATURES.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.06, duration: 0.5 }}
              className="card card-hover"
              style={{ padding: 24, position: "relative", overflow: "hidden" }}
            >
              {/* Subtle glow bg */}
              <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, borderRadius: "50%", background: `${f.color}08`, filter: "blur(20px)", pointerEvents: "none" }} />

              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${f.color}15`, border: `1px solid ${f.color}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                  {f.icon}
                </div>
                {f.pill && (
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 100, background: `${f.color}20`, color: f.color, border: `1px solid ${f.color}30`, letterSpacing: "0.05em" }}>
                    {f.pill}
                  </span>
                )}
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#e2e8f0", marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
