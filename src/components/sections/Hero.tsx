"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";

const SIGNATURES = [
  { name: "Sarah Chen", title: "VP of Sales", company: "Salesforce", email: "sarah.chen@salesforce.com", phone: "+1 (415) 555-0192", accent: "#00A1E0", logo: "S", badge: true },
  { name: "Marcus Rivera", title: "Co-Founder & CEO", company: "Linear", email: "marcus@linear.app", phone: "+1 (650) 555-0847", accent: "#5E6AD2", logo: "L", badge: true },
  { name: "Jennifer Park", title: "Head of Growth", company: "Stripe", email: "jpark@stripe.com", phone: "+1 (415) 555-3021", accent: "#635BFF", logo: "S", badge: false },
];

const LOGOS = [
  "Salesforce","Google","Microsoft","Amazon","Meta","Stripe","Notion","Linear","Figma","Vercel","Shopify","HubSpot","Slack","Twilio","Atlassian","Zoom",
  "Salesforce","Google","Microsoft","Amazon","Meta","Stripe","Notion","Linear","Figma","Vercel","Shopify","HubSpot","Slack","Twilio","Atlassian","Zoom",
];

function SignaturePreview({ sig }: { sig: typeof SIGNATURES[0] }) {
  return (
    <div style={{ borderTop: `3px solid ${sig.accent}`, paddingTop: 16, fontFamily: "Georgia,serif", userSelect: "none" }}>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg, ${sig.accent}cc, ${sig.accent}44)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18, color: "#fff", flexShrink: 0, boxShadow: `0 4px 16px ${sig.accent}44` }}>{sig.name[0]}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 2 }}>
            <span style={{ fontWeight: 700, fontSize: 14, color: "#111827", fontFamily: "Inter,sans-serif" }}>{sig.name}</span>
            {sig.badge && <div style={{ width: 15, height: 15, borderRadius: "50%", background: "#1d9bf0", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 8, fontWeight: 900 }}>✓</span></div>}
          </div>
          <div style={{ fontSize: 12, color: "#6b7280", fontFamily: "Inter,sans-serif", marginBottom: 8 }}>{sig.title} · <span style={{ color: sig.accent, fontWeight: 600 }}>{sig.company}</span></div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
            <span style={{ fontSize: 11, color: "#9ca3af", fontFamily: "Inter,sans-serif" }}><span style={{ color: sig.accent }}>✉ </span>{sig.email}</span>
            <span style={{ fontSize: 11, color: "#9ca3af", fontFamily: "Inter,sans-serif" }}><span style={{ color: sig.accent }}>☎ </span>{sig.phone}</span>
          </div>
          <div style={{ display: "flex", gap: 5 }}>
            {[["in","#0077b5"],["𝕏","#111"],["🌐",sig.accent],["▶","#ff0000"]].map(([ic, bg], i) => (
              <div key={i} style={{ width: 22, height: 22, borderRadius: 5, background: bg as string, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#fff", fontWeight: 700 }}>{ic}</div>
            ))}
          </div>
        </div>
        <div style={{ width: 34, height: 34, borderRadius: 8, background: `${sig.accent}18`, border: `1px solid ${sig.accent}30`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: sig.accent, flexShrink: 0 }}>{sig.logo}</div>
      </div>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [sigIndex, setSigIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setSigIndex(i => (i + 1) % SIGNATURES.length), 3200);
    return () => clearInterval(t);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const rotateX = useTransform(springY, [-200, 200], [5, -5]);
  const rotateY = useTransform(springX, [-200, 200], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <section style={{ position: "relative", overflow: "hidden", background: "#020208", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Aurora blobs */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.65, 0.4] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", width: 900, height: 900, borderRadius: "50%", left: "0%", top: "-35%", background: "radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.5, 0.25] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", right: "0%", top: "-15%", background: "radial-gradient(circle, rgba(124,58,237,0.16) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", left: "35%", bottom: "-10%", background: "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.3 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 240, background: "linear-gradient(to bottom, transparent, #020208)" }} />
      </div>

      <Container>
        <div style={{ paddingTop: 136, paddingBottom: 64, display: "flex", flexDirection: "column", flex: 1 }}>

          {/* Social proof chip */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 16px 6px 8px", borderRadius: 100, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
              <div style={{ display: "flex" }}>
                {["#3b82f6","#7c3aed","#10b981","#ef4444","#f59e0b"].map((c, i) => (
                  <div key={i} style={{ width: 22, height: 22, borderRadius: "50%", background: c, border: "2px solid #020208", marginLeft: i > 0 ? -7 : 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 800, color: "#fff" }}>
                    {["S","M","J","D","L"][i]}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 1 }}>{"★★★★★".split("").map((s, i) => <span key={i} style={{ color: "#fbbf24", fontSize: 10 }}>{s}</span>)}</div>
              <span style={{ fontSize: 12, color: "#94a3b8" }}>Loved by <strong style={{ color: "#e2e8f0", fontWeight: 700 }}>50,000+</strong> professionals</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }} style={{ textAlign: "center", marginBottom: 24 }}>
            <h1 className="display-xl" style={{ color: "#fff", marginBottom: 8 }}>
              Your Email Signature
              <br />
              <span className="grad-aurora">Closes Deals.</span>
            </h1>
            <p style={{ fontSize: 18, color: "#94a3b8", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
              Build a premium animated signature in 2 minutes. Look like a Fortune 500 executive in every inbox.
            </p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
            <a href="#builder" className="btn btn-primary btn-lg">✦ Build My Signature — Free</a>
            <a href="#compare" className="btn btn-ghost btn-lg">See Examples →</a>
          </motion.div>

          {/* Trust signals */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 72, flexWrap: "wrap" }}>
            {["No credit card","2-minute setup","Free forever"].map(t => (
              <span key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#475569" }}>
                <span style={{ color: "#22c55e" }}>✓</span> {t}
              </span>
            ))}
          </motion.div>

          {/* Email window mockup */}
          <motion.div ref={ref} initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            onMouseMove={handleMouseMove} onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
            style={{ position: "relative", maxWidth: 680, margin: "0 auto", width: "100%", perspective: 1200 }}
          >
            {/* Floating stat: left */}
            <motion.div className="animate-float" style={{ position: "absolute", left: -110, top: 40, zIndex: 20, background: "rgba(13,13,26,0.92)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "14px 18px", minWidth: 148, boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>+38%</div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 1 }}>Reply rate boost</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} className="animate-pulse-dot" />
                <span style={{ fontSize: 10, color: "#22c55e" }}>Live analytics</span>
              </div>
            </motion.div>

            {/* Floating stat: right */}
            <motion.div className="animate-float-delayed" style={{ position: "absolute", right: -100, top: 30, zIndex: 20, background: "rgba(13,13,26,0.92)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "14px 18px", minWidth: 136, boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>50K+</div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 1 }}>Professionals</div>
              <div style={{ fontSize: 11, color: "#a78bfa", marginTop: 8 }}>↑ 12% this month</div>
            </motion.div>

            {/* Mac window */}
            <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
              <div className="mac-window">
                <div className="mac-titlebar">
                  <div className="mac-dot" style={{ background: "#ff5f57" }} />
                  <div className="mac-dot" style={{ background: "#febc2e" }} />
                  <div className="mac-dot" style={{ background: "#28c840" }} />
                  <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                    <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 6, padding: "3px 20px", fontSize: 12, color: "#475569" }}>Gmail — Compose</div>
                  </div>
                </div>
                <div style={{ padding: "0 20px 20px", background: "#0e0e1a" }}>
                  <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "10px 0", fontSize: 13 }}>
                    <span style={{ color: "#334155", marginRight: 12 }}>To:</span><span style={{ color: "#94a3b8" }}>team@fortune500.com</span>
                  </div>
                  <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "10px 0", fontSize: 13 }}>
                    <span style={{ color: "#334155", marginRight: 12 }}>Subject:</span><span style={{ color: "#e2e8f0", fontWeight: 500 }}>Q4 Partnership Proposal — Following Up</span>
                  </div>
                  <div style={{ padding: "16px 0 0", fontSize: 13, color: "#94a3b8", lineHeight: 1.8 }}>
                    <p>Hi Alex,</p>
                    <p style={{ margin: "8px 0" }}>Following up on our call last week. Attaching the revised proposal with updated terms for Q4.</p>
                    <p>Looking forward to connecting.</p>
                    <div style={{ position: "relative", minHeight: 110, marginTop: 4 }}>
                      {mounted && SIGNATURES.map((sig, i) => (
                        <motion.div key={sig.name} initial={false}
                          animate={{ opacity: i === sigIndex ? 1 : 0, y: i === sigIndex ? 0 : 6 }}
                          transition={{ duration: 0.5 }}
                          style={{ position: i === 0 ? "relative" : "absolute", inset: 0 }}
                        >
                          <SignaturePreview sig={sig} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Glow */}
            <div style={{ position: "absolute", bottom: -50, left: "15%", right: "15%", height: 70, background: "radial-gradient(ellipse, rgba(37,99,235,0.28) 0%, transparent 70%)", filter: "blur(20px)", pointerEvents: "none" }} />
          </motion.div>
        </div>
      </Container>

      {/* Logo marquee */}
      <div style={{ padding: "36px 0 56px", borderTop: "1px solid rgba(255,255,255,0.05)", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 140, background: "linear-gradient(to right, #020208, transparent)", zIndex: 10 }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 140, background: "linear-gradient(to left, #020208, transparent)", zIndex: 10 }} />
        <p style={{ textAlign: "center", fontSize: 11, color: "#1e293b", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 18, fontWeight: 700 }}>Trusted by professionals at</p>
        <div className="animate-marquee">
          {LOGOS.map((name, i) => (
            <div key={i} style={{ padding: "0 36px", fontSize: 13, fontWeight: 700, color: "#1e293b", whiteSpace: "nowrap", userSelect: "none" }}>{name}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
