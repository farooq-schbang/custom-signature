"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Container } from "@/components/ui/Container";

const PLANS = [
  {
    name: "Starter", monthly: 0, annual: 0, color: "#52525b", badge: null,
    desc: "For individuals getting started.",
    cta: "Start Free — No Card",
    features: ["1 email signature","3 basic templates","Name, title, company, social links","Email support"],
    missing: ["GIF showcase","Analytics dashboard","Verified badge","Team management"],
  },
  {
    name: "Pro", monthly: 19, annual: 14, color: "#0047FF", badge: "Most Popular",
    desc: "For professionals who close deals.",
    cta: "Start 14-Day Free Trial",
    features: ["5 email signatures","50+ premium templates","Animated logo & profile photo","1-click calendar booking link","GIF product showcase","Verified blue badge","Click analytics dashboard","Priority support","1,000+ platform support"],
    missing: [],
  },
  {
    name: "Enterprise", monthly: 79, annual: 59, color: "#7C3AED", badge: null,
    desc: "For Fortune 500 teams.",
    cta: "Contact Sales",
    features: ["Unlimited signatures","Team management console","Brand compliance engine","Bulk deployment","Custom domain","SSO / SAML 2.0","Dedicated success manager","SLA & custom contracts","White-label option"],
    missing: [],
  },
];

export function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" ref={ref} style={{ background: "#06060f", color: "#fff", padding: "100px 0" }}>
      <Container>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="tag tag-dark" style={{ marginBottom: 16 }}>Pricing</div>
          <h2 className="t-heading" style={{ color: "#fff", marginBottom: 12 }}>
            Simple, honest pricing.
          </h2>
          <p style={{ fontSize: 17, color: "#71717a", maxWidth: 380, margin: "0 auto 32px", lineHeight: 1.7 }}>
            Start free. Upgrade when you need more. No surprise fees, ever.
          </p>
          {/* Toggle */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "5px 5px 5px 18px", borderRadius: 100, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: !annual ? "#e4e4e7" : "#52525b", cursor: "pointer" }} onClick={() => setAnnual(false)}>Monthly</span>
            <button onClick={() => setAnnual(a => !a)} style={{ width: 42, height: 23, borderRadius: 12, background: annual ? "#0047FF" : "#27272a", border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s" }}>
              <motion.div animate={{ x: annual ? 21 : 2 }} style={{ position: "absolute", top: 3.5, width: 16, height: 16, borderRadius: "50%", background: "#fff" }} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: annual ? "#e4e4e7" : "#52525b", cursor: "pointer" }} onClick={() => setAnnual(true)}>Annual</span>
              <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 9px", borderRadius: 100, background: "rgba(5,150,105,0.15)", color: "#34d399", border: "1px solid rgba(5,150,105,0.2)" }}>Save 25%</span>
            </div>
          </div>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }} className="grid md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <motion.div key={plan.name}
              initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}
              style={{
                borderRadius: 20, padding: 28, position: "relative", overflow: "hidden",
                background: plan.badge ? "rgba(0,71,255,0.06)" : "rgba(255,255,255,0.03)",
                border: plan.badge ? "1px solid rgba(0,71,255,0.3)" : "1px solid rgba(255,255,255,0.07)",
                transform: plan.badge ? "scale(1.02)" : "scale(1)",
              }}>
              {plan.badge && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #0047FF, transparent)" }} />}
              {plan.badge && (
                <div style={{ position: "absolute", top: 16, right: 16, fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 100, background: "#0047FF", color: "#fff", letterSpacing: "0.04em" }}>{plan.badge.toUpperCase()}</div>
              )}

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontWeight: 800, color: "#fff", fontSize: 18, marginBottom: 3 }}>{plan.name}</div>
                <div style={{ fontSize: 13, color: "#71717a" }}>{plan.desc}</div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                  <span style={{ fontSize: 52, fontWeight: 900, color: "#fff", letterSpacing: "-0.045em", lineHeight: 1 }}>
                    ${annual ? plan.annual : plan.monthly}
                  </span>
                  <span style={{ color: "#52525b", fontSize: 13 }}>/mo</span>
                </div>
                {annual && plan.annual > 0 && (
                  <div style={{ fontSize: 12, color: "#52525b", marginTop: 4 }}>
                    Billed annually · <span style={{ textDecoration: "line-through" }}>${plan.monthly}/mo</span> billed monthly
                  </div>
                )}
                {plan.monthly === 0 && <div style={{ fontSize: 12, color: "#34d399", marginTop: 4, fontWeight: 600 }}>Free forever, no credit card</div>}
              </div>

              <a href="#builder" style={{
                display: "block", textAlign: "center", padding: "12px 20px", borderRadius: 10,
                fontWeight: 700, fontSize: 14, textDecoration: "none", marginBottom: 24, cursor: "pointer",
                background: plan.badge ? "#0047FF" : "rgba(255,255,255,0.07)",
                color: "#fff",
                border: plan.badge ? "none" : "1px solid rgba(255,255,255,0.1)",
                boxShadow: plan.badge ? "0 4px 20px rgba(0,71,255,0.35)" : "none",
                transition: "all 0.18s",
              }}
                onMouseOver={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseOut={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "none"; }}
              >{plan.cta}</a>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 13 }}>
                    <span style={{ width: 16, height: 16, borderRadius: "50%", background: `${plan.color}20`, color: plan.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ color: "#d4d4d8" }}>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
          style={{ textAlign: "center", marginTop: 40 }}>
          <p style={{ color: "#52525b", fontSize: 13, marginBottom: 12 }}>
            All plans include a 14-day free trial · No credit card required · Cancel anytime
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
            {["SOC 2 Compliant","GDPR Ready","99.9% Uptime","24/7 Support"].map(b => (
              <span key={b} style={{ fontSize: 12, color: "#52525b", display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ color: "#34d399" }}>✓</span> {b}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
