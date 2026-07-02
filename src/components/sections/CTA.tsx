"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";

export function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{ background: "#06060f", padding: "120px 0", position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div className="dot-grid-dark" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,71,255,0.1) 0%, transparent 70%)", filter: "blur(40px)" }} />
        {/* Subtle rings */}
        {[280, 440, 600].map((sz, i) => (
          <motion.div key={i}
            animate={{ scale: [1, 1.18, 1], opacity: [0.06, 0, 0.06] }}
            transition={{ duration: 5 + i * 1.5, repeat: Infinity, delay: i * 1.3 }}
            style={{ position: "absolute", left: "50%", top: "50%", width: sz, height: sz, borderRadius: "50%", border: "1px solid rgba(0,71,255,0.25)", transform: "translate(-50%,-50%)" }}
          />
        ))}
      </div>

      <Container>
        <motion.div initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ textAlign: "center", position: "relative", zIndex: 2 }}>

          {/* Social proof avatars */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginBottom: 36 }}>
            <div style={{ display: "flex" }}>
              {["#0047FF","#5E6AD2","#059669","#DC2626","#D97706"].map((c, i) => (
                <div key={i} style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${c}, ${c}88)`, border: "2.5px solid #06060f", marginLeft: i > 0 ? -11 : 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff" }}>
                  {["SC","MR","JP","DT","LW"][i]}
                </div>
              ))}
            </div>
            <div>
              <div style={{ display: "flex", gap: 1.5 }}>{"★★★★★".split("").map((s,i) => <span key={i} style={{ color: "#F59E0B", fontSize: 12 }}>{s}</span>)}</div>
              <div style={{ fontSize: 12, color: "#52525b", marginTop: 2 }}>50,000+ professionals trust CustomSig</div>
            </div>
          </div>

          <h2 className="t-display" style={{ color: "#fff", marginBottom: 20 }}>
            Make Every Email
            <br />
            <span className="grad-blue">Count.</span>
          </h2>

          <p style={{ fontSize: 18, color: "#71717a", maxWidth: 440, margin: "0 auto 40px", lineHeight: 1.7 }}>
            The detail that separates good from great. Build a signature that opens Fortune 500 doors — in the next 2 minutes.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
            <a href="#builder" className="btn btn-primary btn-lg" style={{ fontSize: 16, padding: "15px 32px" }}>
              Build My Signature — Free
            </a>
            <a href="#pricing" className="btn btn-ghost-dark btn-lg">
              View Pricing
            </a>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
            {["Free forever plan", "No credit card", "2-minute setup"].map(t => (
              <span key={t} style={{ fontSize: 13, color: "#52525b", display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ color: "#34d399" }}>✓</span> {t}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
