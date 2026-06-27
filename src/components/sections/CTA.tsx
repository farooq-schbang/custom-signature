"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";

export function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{ padding: "120px 0", position: "relative", overflow: "hidden", background: "#020208" }}>
      {/* Glow */}
      <div style={{ position: "absolute", inset: 0 }}>
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ position: "absolute", width: 800, height: 800, borderRadius: "50%", left: "50%", top: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)", filter: "blur(40px)" }}
        />
        <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.3 }} />
        {[300, 480, 660].map((sz, i) => (
          <motion.div key={i}
            animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0, 0.08] }}
            transition={{ duration: 4 + i * 1.5, repeat: Infinity, delay: i * 1.2 }}
            style={{ position: "absolute", left: "50%", top: "50%", width: sz, height: sz, borderRadius: "50%", border: "1px solid rgba(37,99,235,0.25)", transform: "translate(-50%, -50%)" }}
          />
        ))}
      </div>

      <Container>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: "center", position: "relative", zIndex: 10 }}>

          <div className="pill pill-blue" style={{ marginBottom: 28 }}>
            <motion.span animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>✦</motion.span>
            Join 50,000+ professionals
          </div>

          <h2 className="display-xl" style={{ color: "#fff", marginBottom: 20 }}>
            Make Every
            <br />
            <span className="grad-aurora">Email Count.</span>
          </h2>

          <p style={{ fontSize: 19, color: "#64748b", maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.7 }}>
            Fortune 500 executives notice details. Your email signature is the detail that closes deals, wins trust, and opens doors.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", marginBottom: 32 }}>
            <a href="#builder" className="btn btn-primary btn-lg" style={{ fontSize: 16, padding: "16px 36px" }}>✦ Create Your Free Signature</a>
            <a href="#pricing" className="btn btn-ghost btn-lg">View Pricing</a>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 32, fontSize: 14, color: "#334155", flexWrap: "wrap" }}>
            {["Free forever plan","No credit card","Setup in 2 minutes"].map(t => (
              <span key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "#22c55e" }}>✓</span> {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Social proof row */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
          style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 24, marginTop: 72, paddingTop: 48, borderTop: "1px solid rgba(255,255,255,0.06)", flexWrap: "wrap" }}>
          <div style={{ display: "flex" }}>
            {["#3b82f6","#7c3aed","#10b981","#ef4444","#f59e0b"].map((c, i) => (
              <div key={i} style={{ width: 42, height: 42, borderRadius: "50%", border: "2px solid #020208", background: `linear-gradient(135deg, ${c}, ${c}99)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#fff", marginLeft: i > 0 ? -14 : 0 }}>
                {["S","M","J","D","L"][i]}
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: 700, color: "#e2e8f0", fontSize: 15 }}>50,000+ professionals trust us</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 3 }}>
              {"★★★★★".split("").map((s, i) => <span key={i} style={{ color: "#fbbf24", fontSize: 14 }}>{s}</span>)}
              <span style={{ color: "#475569", fontSize: 13, marginLeft: 8 }}>5.0 from 2,400+ reviews</span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
