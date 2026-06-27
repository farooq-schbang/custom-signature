"use client";
import { motion, useMotionValue, useTransform, animate, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";

const SIGS = [
  { name: "Sarah Chen", title: "VP of Marketing", company: "Stripe", email: "sarah@stripe.com", website: "stripe.com", color: "#635BFF", initial: "S", cta: "Book a Demo" },
  { name: "Marcus Rivera", title: "Head of Growth", company: "Linear", email: "marcus@linear.app", website: "linear.app", color: "#5E6AD2", initial: "M", cta: "Schedule Call" },
  { name: "Priya Kapoor", title: "Chief Revenue Officer", company: "Notion", email: "priya@notion.so", website: "notion.so", color: "#7C3AED", initial: "P", cta: "Book Meeting" },
  { name: "James Wilson", title: "Director of Sales", company: "Figma", email: "j.wilson@figma.com", website: "figma.com", color: "#F24E1E", initial: "J", cta: "Book a Call" },
];

const LOGOS = ["Goldman Sachs","McKinsey & Co.","Salesforce","Microsoft","Google","Amazon","JPMorgan","Deloitte","Apple","Meta","Netflix","Adobe","Stripe","Notion","Linear","Figma"];

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const c = animate(0, to, { duration: 2, ease: "easeOut", onUpdate(v) { node.textContent = Math.round(v) + suffix; } });
    return () => c.stop();
  }, [to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

function SigCard({ sig }: { sig: typeof SIGS[0] }) {
  const c = sig.color;
  return (
    <div style={{ background: "#0a0a18", border: `1px solid ${c}30`, borderRadius: 12 }}>
      <div style={{ display: "flex" }}>
        {/* accent bar */}
        <div style={{ width: 3, flexShrink: 0, background: `linear-gradient(180deg, ${c}, ${c}40)`, borderRadius: "12px 0 0 12px" }} />
        {/* social icons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "14px 10px", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
          {["🌐","in","▶","𝕏","📸"].map((icon, i) => (
            <div key={i} style={{ width: 24, height: 24, borderRadius: "50%", background: `${c}18`, border: `1px solid ${c}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, cursor: "pointer" }}>
              {icon}
            </div>
          ))}
        </div>
        {/* info */}
        <div style={{ flex: 1, padding: "14px 14px", display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <span style={{ fontWeight: 800, fontSize: 12, color: c }}>{sig.company}</span>
              <span style={{ color: "#60a5fa", fontSize: 10 }}>✓</span>
            </div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 2 }}>{sig.name}</div>
            <div style={{ color: "#9ca3af", fontSize: 11, marginBottom: 10 }}>{sig.title}</div>
            <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 2 }}>{sig.email}</div>
            <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 10 }}>{sig.website}</div>
            <div style={{ display: "inline-block", padding: "5px 12px", borderRadius: 100, background: c, color: "#fff", fontSize: 10, fontWeight: 600, cursor: "pointer" }}>
              📅 {sig.cta}
            </div>
          </div>
          {/* avatar */}
          <div style={{ width: 64, height: 78, borderRadius: 10, background: `linear-gradient(135deg, ${c}35, ${c}08)`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <span style={{ fontWeight: 900, fontSize: 22, color: `${c}90` }}>{sig.initial}</span>
            <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(45deg, transparent, transparent 4px, ${c}18 4px, ${c}18 5px)`, opacity: 0.4 }} />
            <div style={{ position: "absolute", bottom: 5, right: 5, background: "rgba(0,0,0,0.55)", borderRadius: 4, padding: "1px 4px", fontSize: 7, fontWeight: 700, color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}>GIF</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const [active, setActive] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rx = useSpring(useTransform(mouseY, [-300, 300], [6, -6]), { stiffness: 60, damping: 18 });
  const ry = useSpring(useTransform(mouseX, [-300, 300], [-6, 6]), { stiffness: 60, damping: 18 });

  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % SIGS.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ background: "#06060f", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Background grid */}
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />
      {/* Glow orbs */}
      <div style={{ position: "absolute", top: -100, left: "30%", width: 600, height: 400, background: "rgba(37,99,235,0.1)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "40%", right: -100, width: 400, height: 400, background: "rgba(124,58,237,0.07)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />

      <Container>
        <div style={{ paddingTop: 112, paddingBottom: 48, display: "flex", flexDirection: "column", minHeight: "100vh" }}>

          {/* Social proof badge */}
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 16, padding: "8px 20px", borderRadius: 100, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 12 }}>
              <span style={{ fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>G2</span>
              <span style={{ color: "#fbbf24", letterSpacing: 1 }}>★★★★★</span>
              <span style={{ color: "#6b7280" }}>5.0</span>
              <span style={{ width: 1, height: 12, background: "rgba(255,255,255,0.15)", display: "inline-block" }} />
              <span style={{ fontWeight: 700, background: "linear-gradient(90deg,#4285F4,#EA4335,#FBBC05,#34A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Google</span>
              <span style={{ color: "#fbbf24", letterSpacing: 1 }}>★★★★★</span>
              <span style={{ color: "#6b7280" }}>5.0</span>
              <span style={{ width: 1, height: 12, background: "rgba(255,255,255,0.15)", display: "inline-block" }} />
              <span style={{ color: "#9ca3af" }}>Trusted by <strong style={{ color: "#fff" }}>50,000+</strong> professionals</span>
            </div>
          </motion.div>

          {/* Main two-column hero */}
          <div style={{ display: "flex", gap: 64, alignItems: "center", flex: 1 }}>
            {/* Left — text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div className="pill pill-blue" style={{ marginBottom: 24 }}>
                  <motion.span animate={{ scale: [1,1.4,1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: "50%", background: "#60a5fa", display: "inline-block" }} />
                  World&apos;s Most Advanced Email Signature Platform
                </div>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
                style={{ fontSize: "clamp(42px, 5vw, 68px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 20 }}>
                Your Email.
                <br />
                <span className="text-gradient-hero">Their First</span>
                <br />
                Impression.
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
                style={{ fontSize: 17, color: "#9ca3af", lineHeight: 1.7, maxWidth: 460, marginBottom: 32 }}>
                The only AI-powered signature with an interactive social nav, animated brand logo,
                GIF showcase, and one-click calendar booking — used by Fortune 500 professionals.
              </motion.p>

              {/* Stats */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36 }}
                style={{ display: "flex", gap: 32, marginBottom: 36 }}>
                {[{ n: 42, s: "%", l: "Higher Reply Rate" }, { n: 3, s: "×", l: "More Link Clicks" }, { n: 50, s: "k+", l: "Active Users" }].map(st => (
                  <div key={st.l}>
                    <div style={{ fontSize: 28, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>
                      <CountUp to={st.n} suffix={st.s} />
                    </div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{st.l}</div>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44 }}
                style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
                <a href="#builder" className="btn btn-primary btn-lg">✦ Create Your Signature Free</a>
                <a href="#compare" className="btn btn-ghost btn-lg">See the Difference →</a>
              </motion.div>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                style={{ fontSize: 12, color: "#4b5563" }}>
                No credit card · Setup in 2 min · Works with Gmail, Outlook & 1000+ apps
              </motion.p>
            </div>

            {/* Right — email mockup */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ flex: 1, minWidth: 0, perspective: 1200 }}
              onMouseMove={e => {
                const r = e.currentTarget.getBoundingClientRect();
                mouseX.set(e.clientX - r.left - r.width / 2);
                mouseY.set(e.clientY - r.top - r.height / 2);
              }}
              onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
            >
              <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>
                <div className="email-surface">
                  {/* Chrome bar */}
                  <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.02)" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <div style={{ width: 11, height: 11, borderRadius: "50%", background: "rgba(255,69,58,0.7)" }} />
                      <div style={{ width: 11, height: 11, borderRadius: "50%", background: "rgba(255,196,0,0.7)" }} />
                      <div style={{ width: 11, height: 11, borderRadius: "50%", background: "rgba(40,200,64,0.7)" }} />
                    </div>
                    <span style={{ fontSize: 11, color: "#4b5563", marginLeft: 8 }}>Gmail — New Message</span>
                  </div>

                  {/* Email header fields */}
                  <div style={{ padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    {[["From","CustomSignature <hello@customsig.com>"],["To","john.smith@fortune500.com"],["Subject","Following up on our partnership"]].map(([k,v]) => (
                      <div key={k} style={{ display: "flex", gap: 12, marginBottom: 6, fontSize: 11 }}>
                        <span style={{ color: "#4b5563", width: 48, flexShrink: 0 }}>{k}</span>
                        <span style={{ color: k === "Subject" ? "#e5e7eb" : "#9ca3af", fontWeight: k === "Subject" ? 500 : 400 }}>{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Body */}
                  <div style={{ padding: 18 }}>
                    <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 8 }}>Hi John,</p>
                    <div style={{ marginBottom: 6 }}>
                      {[0.83, 0.66, 0.5].map((w, i) => <div key={i} style={{ height: 8, background: "rgba(255,255,255,0.07)", borderRadius: 4, marginBottom: 6, width: `${w * 100}%` }} />)}
                    </div>
                    <p style={{ color: "#6b7280", fontSize: 13, marginTop: 12, marginBottom: 14 }}>Warm regards,</p>
                    <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 14 }} />

                    {/* Signature carousel */}
                    <div style={{ position: "relative", minHeight: 120 }}>
                      {SIGS.map((sig, i) => (
                        <motion.div key={i}
                          animate={{ opacity: i === active ? 1 : 0, y: i === active ? 0 : 8 }}
                          transition={{ duration: 0.35 }}
                          style={{ position: i === 0 ? "relative" : "absolute", inset: i === 0 ? undefined : 0, pointerEvents: i === active ? "auto" : "none" }}
                        >
                          {(i === 0 || i === active) && <SigCard sig={i === active ? SIGS[active] : SIGS[0]} />}
                        </motion.div>
                      ))}
                    </div>

                    {/* Dots & toggle */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 36, height: 20, borderRadius: 10, background: "#2563eb", position: "relative", cursor: "pointer" }}>
                          <div style={{ position: "absolute", right: 3, top: 3, width: 14, height: 14, borderRadius: "50%", background: "#fff" }} />
                        </div>
                        <span style={{ fontSize: 11, color: "#6b7280" }}>Signature active</span>
                      </div>
                      <div style={{ display: "flex", gap: 5 }}>
                        {SIGS.map((_, i) => (
                          <button key={i} onClick={() => setActive(i)}
                            style={{ height: 5, borderRadius: 3, background: i === active ? "#60a5fa" : "rgba(255,255,255,0.2)", width: i === active ? 20 : 5, border: "none", cursor: "pointer", transition: "all 0.3s" }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  style={{ position: "absolute", top: -12, right: -12, padding: "6px 14px", borderRadius: 100, background: "linear-gradient(135deg, #2563eb, #7c3aed)", color: "#fff", fontSize: 11, fontWeight: 700, boxShadow: "0 4px 20px rgba(37,99,235,0.45)" }}
                >
                  {SIGS[active].company}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Logo strip */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 28, marginTop: 32, overflow: "hidden" }}>
            <p style={{ textAlign: "center", fontSize: 11, color: "#4b5563", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 16 }}>
              Trusted by professionals at
            </p>
            <div style={{ display: "flex", overflow: "hidden" }}>
              <div className="animate-marquee" style={{ display: "flex", gap: 48, whiteSpace: "nowrap", flexShrink: 0 }}>
                {[...LOGOS, ...LOGOS].map((l, i) => (
                  <span key={i} style={{ color: "#374151", fontWeight: 600, fontSize: 13 }}>{l}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
