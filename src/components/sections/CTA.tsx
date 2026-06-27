"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";

export function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{ padding: "120px 0", position: "relative", overflow: "hidden", background: "#06060f" }}>
      {/* Bg */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(37,99,235,0.12), rgba(124,58,237,0.06), transparent)" }} />
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />

      {/* Rings */}
      {[240, 380, 520].map((sz, i) => (
        <motion.div key={i}
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0, 0.15] }}
          transition={{ duration: 4 + i * 1.5, repeat: Infinity, delay: i * 1.2 }}
          style={{ position: "absolute", left: "50%", top: "50%", width: sz, height: sz, borderRadius: "50%", border: "1px solid rgba(37,99,235,0.2)", transform: "translate(-50%, -50%)" }}
        />
      ))}

      <Container>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: "center", position: "relative", zIndex: 10 }}>

          <div className="pill pill-blue" style={{ marginBottom: 24 }}>
            <motion.span animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>✦</motion.span>
            Join 50,000+ professionals
          </div>

          <h2 style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 20 }}>
            Make Every
            <br />
            <span className="text-gradient-hero">Email Count</span>
          </h2>

          <p style={{ fontSize: 18, color: "#9ca3af", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.65 }}>
            Fortune 500 executives notice details. Your email signature is the detail that closes deals, wins trust, and opens doors.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", marginBottom: 32 }}>
            <a href="#builder" className="btn btn-primary btn-lg">✦ Create Your Free Signature</a>
            <a href="#pricing" className="btn btn-ghost btn-lg">View Pricing</a>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 32, fontSize: 14, color: "#4b5563" }}>
            {["Free forever plan","No credit card","Setup in 2 minutes"].map(t => (
              <span key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "#34d399" }}>✓</span> {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Social proof */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
          style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 24, marginTop: 64, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex" }}>
            {["A","B","C","D","E"].map((l, i) => (
              <div key={i} style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid #06060f", background: `hsl(${i*50+200},65%,45%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff", marginLeft: i > 0 ? -12 : 0 }}>{l}</div>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: 700, color: "#fff", fontSize: 14 }}>50,000+ professionals trust us</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
              {"★★★★★".split("").map((s, i) => <span key={i} style={{ color: "#fbbf24", fontSize: 13 }}>{s}</span>)}
              <span style={{ color: "#6b7280", fontSize: 13, marginLeft: 6 }}>5.0 on G2 & Google</span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
