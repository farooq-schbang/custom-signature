"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Container } from "@/components/ui/Container";

const PLANS = [
  {
    name: "Starter", monthly: 0, annual: 0, color: "#6b7280",
    desc: "Perfect for individuals.",
    cta: "Start Free", popular: false,
    features: ["1 Email Signature","Basic Templates (3)","Name, Title, Company","Social Media Icons","Email Support"],
  },
  {
    name: "Pro", monthly: 19, annual: 14, color: "#2563eb",
    desc: "For professionals who mean business.",
    cta: "Start Pro Trial", popular: true,
    features: ["5 Email Signatures","50+ Premium Templates","Animated Logo & Profile","Calendar Meeting Link","GIF Product Showcase","Verified Blue Badge","Analytics Dashboard","Priority Support","1000+ Platform Support"],
  },
  {
    name: "Enterprise", monthly: 79, annual: 59, color: "#7c3aed",
    desc: "For Fortune 500 teams.",
    cta: "Contact Sales", popular: false,
    features: ["Unlimited Signatures","Team Management Console","Brand Compliance Engine","Bulk Deployment","Custom Domain","SSO / SAML Integration","Dedicated Success Manager","SLA & Custom Contracts","White-label Option"],
  },
];

export function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" ref={ref} style={{ padding: "96px 0", background: "#06060f" }}>
      <Container>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="pill pill-blue" style={{ marginBottom: 16 }}>Simple Pricing</div>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}>
            Invest in Your
            <br />
            <span className="text-gradient-blue">First Impression</span>
          </h2>
          <p style={{ fontSize: 17, color: "#9ca3af", maxWidth: 400, margin: "0 auto 32px", lineHeight: 1.65 }}>
            One email can open Fortune 500 doors. Make it count.
          </p>

          {/* Toggle */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "6px 20px", borderRadius: 100, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: !annual ? "#fff" : "#6b7280", cursor: "pointer" }} onClick={() => setAnnual(false)}>Monthly</span>
            <button onClick={() => setAnnual(!annual)} style={{ width: 44, height: 24, borderRadius: 12, background: annual ? "#2563eb" : "#374151", position: "relative", border: "none", cursor: "pointer", transition: "background 0.2s" }}>
              <motion.div animate={{ x: annual ? 22 : 2 }} style={{ position: "absolute", top: 4, width: 16, height: 16, borderRadius: "50%", background: "#fff" }} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: annual ? "#fff" : "#6b7280", cursor: "pointer" }} onClick={() => setAnnual(true)}>Annual</span>
              <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 100, background: "rgba(5,150,105,0.18)", color: "#34d399" }}>Save 25%</span>
            </div>
          </div>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="grid md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              style={{
                position: "relative",
                borderRadius: 20,
                padding: 28,
                overflow: "hidden",
                background: plan.popular ? `linear-gradient(145deg, ${plan.color}12, rgba(6,6,15,0.9))` : "rgba(255,255,255,0.025)",
                border: plan.popular ? `1px solid ${plan.color}50` : "1px solid rgba(255,255,255,0.07)",
                transform: plan.popular ? "scale(1.03)" : "scale(1)",
              }}
            >
              {/* Popular top bar */}
              {plan.popular && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${plan.color}, transparent)` }} />}

              {plan.popular && (
                <div style={{ position: "absolute", top: 16, right: 16, padding: "3px 10px", borderRadius: 100, background: plan.color, color: "#fff", fontSize: 11, fontWeight: 700 }}>Most Popular</div>
              )}

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontWeight: 800, color: "#fff", fontSize: 20, marginBottom: 4 }}>{plan.name}</div>
                <div style={{ color: "#6b7280", fontSize: 13 }}>{plan.desc}</div>
              </div>

              <div style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                  <span style={{ fontSize: 44, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>
                    ${annual ? plan.annual : plan.monthly}
                  </span>
                  <span style={{ color: "#6b7280", fontSize: 14 }}>/mo</span>
                </div>
                {annual && plan.annual > 0 && (
                  <div style={{ color: "#4b5563", fontSize: 12, marginTop: 4 }}>
                    Billed annually · <span style={{ textDecoration: "line-through" }}>${plan.monthly}/mo</span> monthly
                  </div>
                )}
              </div>

              <a href="#builder"
                style={{
                  display: "block", textAlign: "center", padding: "12px 24px", borderRadius: 100, fontWeight: 700, fontSize: 14, textDecoration: "none", marginBottom: 28, cursor: "pointer",
                  background: plan.popular ? plan.color : "rgba(255,255,255,0.08)",
                  color: "#fff",
                  border: plan.popular ? "none" : "1px solid rgba(255,255,255,0.12)",
                  transition: "all 0.2s",
                }}
                onMouseOver={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseOut={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "none"; }}
              >
                {plan.cta}
              </a>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {plan.features.map(feat => (
                  <li key={feat} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
                    <span style={{ width: 18, height: 18, borderRadius: "50%", background: `${plan.color}22`, color: plan.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span style={{ color: "#d1d5db" }}>{feat}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
          style={{ textAlign: "center", color: "#4b5563", fontSize: 13, marginTop: 32 }}>
          All plans include a 14-day free trial · No credit card required · Cancel anytime
        </motion.p>
      </Container>
    </section>
  );
}
