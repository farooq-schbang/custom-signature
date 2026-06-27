"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Container } from "@/components/ui/Container";

const PLANS = [
  {
    name: "Starter", monthly: 0, annual: 0, color: "#64748b",
    desc: "For individuals getting started.",
    cta: "Start Free — No Card", popular: false,
    features: ["1 Email Signature","3 Basic Templates","Name, Title, Company, Social","Email Support","Custom Signature Branding"],
    missing: ["GIF Showcase","Analytics","Team Management","Verified Badge"],
  },
  {
    name: "Pro", monthly: 19, annual: 14, color: "#2563eb",
    desc: "For professionals who close deals.",
    cta: "Start 14-Day Trial", popular: true,
    features: ["5 Email Signatures","50+ Premium Templates","Animated Logo & Photo","Meeting Calendar Link","GIF Product Showcase","Verified Blue Badge","Analytics Dashboard","Priority Support","1000+ Platform Support"],
    missing: [],
  },
  {
    name: "Enterprise", monthly: 79, annual: 59, color: "#7c3aed",
    desc: "For Fortune 500 teams.",
    cta: "Contact Sales", popular: false,
    features: ["Unlimited Signatures","Team Management Console","Brand Compliance Engine","Bulk Deployment","Custom Domain","SSO / SAML","Dedicated Success Manager","SLA & Custom Contracts","White-label Option"],
    missing: [],
  },
];

export function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" ref={ref} style={{ padding: "100px 0", background: "#020208" }}>
      <Container>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="pill pill-blue" style={{ marginBottom: 20 }}>Pricing</div>
          <h2 className="display-lg" style={{ color: "#fff", marginBottom: 16 }}>
            Invest in Your
            <br />
            <span className="grad-blue">First Impression.</span>
          </h2>
          <p style={{ fontSize: 17, color: "#64748b", maxWidth: 380, margin: "0 auto 32px", lineHeight: 1.7 }}>
            One email can open Fortune 500 doors. Your signature is the detail that makes it happen.
          </p>

          {/* Toggle */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "6px 6px 6px 20px", borderRadius: 100, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: !annual ? "#e2e8f0" : "#475569", cursor: "pointer" }} onClick={() => setAnnual(false)}>Monthly</span>
            <button onClick={() => setAnnual(!annual)} style={{ width: 44, height: 24, borderRadius: 12, background: annual ? "#2563eb" : "#1e293b", border: "none", cursor: "pointer", transition: "background 0.2s", position: "relative" }}>
              <motion.div animate={{ x: annual ? 22 : 2 }} style={{ position: "absolute", top: 4, width: 16, height: 16, borderRadius: "50%", background: "#fff" }} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: annual ? "#e2e8f0" : "#475569", cursor: "pointer" }} onClick={() => setAnnual(true)}>Annual</span>
              <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 100, background: "rgba(5,150,105,0.15)", color: "#34d399", border: "1px solid rgba(5,150,105,0.25)" }}>Save 25%</span>
            </div>
          </div>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="grid md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <motion.div key={plan.name}
              initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}
              style={{
                position: "relative", borderRadius: 20, padding: 28, overflow: "hidden",
                background: plan.popular ? `linear-gradient(145deg, ${plan.color}12, rgba(2,2,8,0.95))` : "rgba(255,255,255,0.025)",
                border: plan.popular ? `1px solid ${plan.color}45` : "1px solid rgba(255,255,255,0.07)",
                transform: plan.popular ? "scale(1.03)" : "scale(1)",
              }}
            >
              {plan.popular && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${plan.color}, transparent)` }} />}
              {plan.popular && (
                <div style={{ position: "absolute", top: 18, right: 18, padding: "3px 10px", borderRadius: 100, background: plan.color, color: "#fff", fontSize: 10, fontWeight: 800, letterSpacing: "0.04em" }}>MOST POPULAR</div>
              )}

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontWeight: 800, color: "#fff", fontSize: 20, marginBottom: 4 }}>{plan.name}</div>
                <div style={{ color: "#64748b", fontSize: 13 }}>{plan.desc}</div>
              </div>

              <div style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                  <span style={{ fontSize: 48, fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}>${annual ? plan.annual : plan.monthly}</span>
                  <span style={{ color: "#475569", fontSize: 13 }}>/mo</span>
                </div>
                {annual && plan.annual > 0 && (
                  <div style={{ color: "#475569", fontSize: 12, marginTop: 6 }}>
                    Billed annually · <span style={{ textDecoration: "line-through" }}>${plan.monthly}/mo</span> monthly
                  </div>
                )}
                {plan.annual === 0 && <div style={{ color: "#34d399", fontSize: 12, marginTop: 6, fontWeight: 600 }}>Free forever · No credit card</div>}
              </div>

              <a href="#builder" style={{
                display: "block", textAlign: "center", padding: "13px 24px", borderRadius: 100,
                fontWeight: 700, fontSize: 14, textDecoration: "none", marginBottom: 28, cursor: "pointer",
                background: plan.popular ? plan.color : "rgba(255,255,255,0.07)",
                color: "#fff", border: plan.popular ? "none" : "1px solid rgba(255,255,255,0.1)",
                boxShadow: plan.popular ? `0 4px 24px ${plan.color}40` : "none",
                transition: "all 0.2s",
              }}
                onMouseOver={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseOut={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "none"; }}
              >{plan.cta}</a>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
                {plan.features.map(feat => (
                  <li key={feat} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
                    <span style={{ width: 18, height: 18, borderRadius: "50%", background: `${plan.color}20`, color: plan.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span style={{ color: "#cbd5e1" }}>{feat}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginTop: 40 }}>
          <p style={{ color: "#334155", fontSize: 13 }}>All plans include a 14-day free trial · No credit card required · Cancel anytime</p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
            {["SOC2 Compliant","GDPR Ready","99.9% Uptime SLA","24/7 Support"].map(b => (
              <span key={b} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#475569" }}>
                <span style={{ color: "#34d399" }}>✓</span> {b}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
