"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";

const SIGNATURES = [
  {
    name: "Sarah Chen", title: "VP of Sales", company: "Salesforce",
    email: "s.chen@salesforce.com", phone: "+1 (415) 555-0192",
    accent: "#00A1E0", initials: "SC", badge: true,
    socials: [{ label: "in", bg: "#0077b5" }, { label: "𝕏", bg: "#09090b" }, { label: "📅", bg: "#00A1E0" }],
  },
  {
    name: "Marcus Rivera", title: "Co-Founder & CEO", company: "Linear",
    email: "marcus@linear.app", phone: "+1 (650) 555-0847",
    accent: "#5E6AD2", initials: "MR", badge: true,
    socials: [{ label: "in", bg: "#0077b5" }, { label: "𝕏", bg: "#09090b" }, { label: "🌐", bg: "#5E6AD2" }],
  },
  {
    name: "Jennifer Park", title: "Head of Growth", company: "Stripe",
    email: "jpark@stripe.com", phone: "+1 (415) 555-3021",
    accent: "#635BFF", initials: "JP", badge: false,
    socials: [{ label: "in", bg: "#0077b5" }, { label: "𝕏", bg: "#09090b" }, { label: "📸", bg: "#e1306c" }],
  },
];

const LOGOS = [
  "Salesforce", "Google", "Microsoft", "Amazon", "Meta", "Stripe", "Notion",
  "Linear", "Figma", "Vercel", "Shopify", "HubSpot", "Slack", "Zoom", "Atlassian", "Adobe",
  "Salesforce", "Google", "Microsoft", "Amazon", "Meta", "Stripe", "Notion",
  "Linear", "Figma", "Vercel", "Shopify", "HubSpot", "Slack", "Zoom", "Atlassian", "Adobe",
];

function SigPreview({ sig }: { sig: typeof SIGNATURES[0] }) {
  return (
    <div style={{ borderTop: `2.5px solid ${sig.accent}`, paddingTop: 14 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        {/* Avatar */}
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          background: `linear-gradient(135deg, ${sig.accent}, ${sig.accent}88)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, fontSize: 13, color: "#fff", flexShrink: 0, letterSpacing: "0.02em",
        }}>{sig.initials}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 1 }}>
            <span style={{ fontWeight: 700, fontSize: 13, color: "#111827", fontFamily: "Inter,sans-serif" }}>{sig.name}</span>
            {sig.badge && (
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#1d9bf0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontSize: 7.5, fontWeight: 900 }}>✓</span>
              </div>
            )}
          </div>
          <div style={{ fontSize: 11.5, color: "#6b7280", marginBottom: 7, fontFamily: "Inter,sans-serif" }}>
            {sig.title} · <span style={{ color: sig.accent, fontWeight: 600 }}>{sig.company}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 9 }}>
            <span style={{ fontSize: 10.5, color: "#9ca3af", fontFamily: "Inter,sans-serif" }}>
              <span style={{ color: sig.accent, marginRight: 4 }}>✉</span>{sig.email}
            </span>
            <span style={{ fontSize: 10.5, color: "#9ca3af", fontFamily: "Inter,sans-serif" }}>
              <span style={{ color: sig.accent, marginRight: 4 }}>☎</span>{sig.phone}
            </span>
          </div>
          <div style={{ display: "flex", gap: 5 }}>
            {sig.socials.map((s, i) => (
              <div key={i} style={{ width: 22, height: 22, borderRadius: 5, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8.5, color: "#fff", fontWeight: 700 }}>{s.label}</div>
            ))}
            <div style={{ width: 22, height: 22, borderRadius: 5, background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8.5, color: sig.accent, fontWeight: 700, border: `1px solid ${sig.accent}30` }}>+3</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const [sigIdx, setSigIdx] = useState(0);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setSigIdx(i => (i + 1) % SIGNATURES.length), 3400);
    return () => clearInterval(t);
  }, []);

  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });
  const rx = useTransform(sy, [-150, 150], [4, -4]);
  const ry = useTransform(sx, [-150, 150], [-4, 4]);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  };

  return (
    <section style={{ background: "#fff", position: "relative", overflow: "hidden", paddingBottom: 0 }}>
      {/* Subtle dot grid */}
      <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />
      {/* Soft blue glow top center */}
      <div style={{ position: "absolute", top: -200, left: "50%", transform: "translateX(-50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,71,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <Container>
        <div style={{ paddingTop: 120, paddingBottom: 80, position: "relative" }}>

          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
            style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px 5px 8px", borderRadius: 100, background: "#EEF2FF", border: "1px solid #C7D7FF" }}>
              <div style={{ display: "flex" }}>
                {["#0047FF","#5E6AD2","#059669","#DC2626","#D97706"].map((c, i) => (
                  <div key={i} style={{ width: 18, height: 18, borderRadius: "50%", background: c, border: "2px solid #EEF2FF", marginLeft: i > 0 ? -5 : 0 }} />
                ))}
              </div>
              <span style={{ fontSize: 12, color: "#0047FF", fontWeight: 600 }}>Trusted by 50,000+ professionals</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.05 }}
            style={{ textAlign: "center", marginBottom: 20 }}>
            <h1 className="t-display" style={{ color: "#09090b", marginBottom: 0 }}>
              Standout In
              <br />
              <span style={{ position: "relative", display: "inline-block" }}>
                <span className="grad-blue">Every Inbox.</span>
                {/* Underline decoration */}
                <svg style={{ position: "absolute", bottom: -8, left: 0, right: 0, width: "100%" }} height="6" viewBox="0 0 300 6" fill="none" preserveAspectRatio="none">
                  <path d="M0 3 Q75 6 150 3 Q225 0 300 3" stroke="#0047FF" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5"/>
                </svg>
              </span>
            </h1>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
            style={{ textAlign: "center", fontSize: 18, color: "#71717a", maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.65 }}>
            Build AI-powered email signatures in minutes. Designed for sales teams and creative professionals who know first impressions close deals.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
            <a href="#builder" className="btn btn-primary btn-lg">Build My Signature — Free</a>
            <a href="#compare" className="btn btn-ghost btn-lg">Browse Templates</a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 64, flexWrap: "wrap" }}>
            {["No credit card · Free forever", "Setup in 2 minutes", "Works in Gmail, Outlook & more"].map(t => (
              <span key={t} style={{ fontSize: 13, color: "#a1a1aa", display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ color: "#059669", fontWeight: 700 }}>✓</span> {t}
              </span>
            ))}
          </motion.div>

          {/* Email window */}
          <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
            onMouseMove={onMove} onMouseLeave={() => { mx.set(0); my.set(0); }}
            style={{ maxWidth: 660, margin: "0 auto", position: "relative", perspective: 1000 }}>

            {/* Floating left card */}
            <motion.div className="animate-float" style={{
              position: "absolute", left: -120, top: 48, zIndex: 10,
              background: "#fff", borderRadius: 14, padding: "14px 16px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: "1px solid rgba(0,0,0,0.07)",
              minWidth: 148,
            }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#09090b", letterSpacing: "-0.04em" }}>+38%</div>
              <div style={{ fontSize: 12, color: "#71717a", marginTop: 1 }}>Reply rate boost</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} className="animate-pulse-dot" />
                <span style={{ fontSize: 10.5, color: "#10b981", fontWeight: 600 }}>Live analytics</span>
              </div>
            </motion.div>

            {/* Floating right card */}
            <motion.div className="animate-float-delayed" style={{
              position: "absolute", right: -100, top: 36, zIndex: 10,
              background: "#fff", borderRadius: 14, padding: "14px 16px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: "1px solid rgba(0,0,0,0.07)",
              minWidth: 136,
            }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#09090b", letterSpacing: "-0.04em" }}>2 min</div>
              <div style={{ fontSize: 12, color: "#71717a", marginTop: 1 }}>Setup time</div>
              <div style={{ fontSize: 11, color: "#0047FF", marginTop: 8, fontWeight: 600 }}>No design skills needed</div>
            </motion.div>

            {/* Main window */}
            <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>
              {/* Gmail-like light email client */}
              <div className="email-client">
                {/* Titlebar */}
                <div className="email-titlebar">
                  <div className="mac-dot" style={{ background: "#ff5f57" }} />
                  <div className="mac-dot" style={{ background: "#febc2e" }} />
                  <div className="mac-dot" style={{ background: "#28c840" }} />
                  <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                    <div style={{ background: "#f3f4f6", borderRadius: 6, padding: "3px 20px", fontSize: 12, color: "#9ca3af", border: "1px solid #e5e7eb" }}>
                      New Message — Gmail
                    </div>
                  </div>
                </div>

                {/* Email compose body */}
                <div style={{ background: "#fff", padding: "0 20px 20px" }}>
                  <div style={{ borderBottom: "1px solid #f3f4f6", padding: "9px 0", display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "#9ca3af", width: 28 }}>To</span>
                    <span style={{ fontSize: 13, color: "#374151" }}>prospect@fortune500.com</span>
                  </div>
                  <div style={{ borderBottom: "1px solid #f3f4f6", padding: "9px 0", display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "#9ca3af", width: 28 }}>Sub</span>
                    <span style={{ fontSize: 13, color: "#09090b", fontWeight: 500 }}>Q4 Partnership — Following Up</span>
                  </div>
                  <div style={{ padding: "14px 0 0", fontSize: 13, color: "#6b7280", lineHeight: 1.75 }}>
                    <p style={{ color: "#374151" }}>Hi Alex,</p>
                    <p style={{ margin: "6px 0", color: "#6b7280" }}>Following up on our call — I&apos;ve attached the revised Q4 proposal. Would love to get your thoughts before end of week.</p>
                    <p style={{ color: "#6b7280" }}>Best,</p>
                    {/* Animated signature swap */}
                    <div style={{ position: "relative", minHeight: 108 }}>
                      {mounted && SIGNATURES.map((sig, i) => (
                        <motion.div key={sig.name} initial={false}
                          animate={{ opacity: i === sigIdx ? 1 : 0, y: i === sigIdx ? 0 : 5 }}
                          transition={{ duration: 0.45 }}
                          style={{ position: i === 0 ? "relative" : "absolute", inset: 0 }}>
                          <SigPreview sig={sig} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Signature name indicators */}
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
              {SIGNATURES.map((sig, i) => (
                <button key={i} onClick={() => setSigIdx(i)}
                  style={{ width: i === sigIdx ? 20 : 6, height: 6, borderRadius: 3, border: "none", cursor: "pointer", transition: "all 0.3s", background: i === sigIdx ? "#0047FF" : "#d1d5db" }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Logo marquee strip */}
      <div style={{ background: "#fafafa", borderTop: "1px solid rgba(0,0,0,0.06)", borderBottom: "1px solid rgba(0,0,0,0.06)", padding: "20px 0", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 100, background: "linear-gradient(to right, #fafafa, transparent)", zIndex: 2 }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 100, background: "linear-gradient(to left, #fafafa, transparent)", zIndex: 2 }} />
        <p style={{ textAlign: "center", fontSize: 11, color: "#c4c4cc", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Professionals at these companies use CustomSig</p>
        <div className="animate-marquee">
          {LOGOS.map((name, i) => (
            <div key={i} style={{ padding: "0 32px", fontSize: 13, fontWeight: 700, color: "#c4c4cc", whiteSpace: "nowrap", userSelect: "none" }}>{name}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
