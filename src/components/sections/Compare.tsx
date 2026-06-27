"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";

const BAD = ["Plain black text — zero visual hierarchy","No logo or brand colors","No profile photo","Social links as raw text only","No call-to-action or booking link","No animated GIF product showcase","Zero engagement generated","Looks the same as everyone else"];
const GOOD = ["Branded logo with company colors","Profile photo with designer layout","Interactive social icons sidebar","Verified blue checkmark badge","One-click calendar booking button","Animated GIF hero product showcase","3× more link clicks & engagement","Instantly memorable & authoritative"];

const ACCENT = "#7B68EE";

export function Compare() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="compare" ref={ref} style={{ padding: "96px 0", background: "#06060f" }}>
      <Container>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="pill pill-red" style={{ marginBottom: 16 }}>Side by Side</div>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}>
            The Difference Is
            <br />
            <span className="text-gradient-orange">Night and Day</span>
          </h2>
          <p style={{ fontSize: 17, color: "#9ca3af", maxWidth: 520, margin: "0 auto", lineHeight: 1.65 }}>
            Fortune 500 decision-makers notice everything. See exactly what your emails look like on their screen.
          </p>
        </motion.div>

        {/* Two columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="grid md:grid-cols-2">
          {/* --- WITHOUT --- */}
          <motion.div initial={{ opacity: 0, x: -32 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.15, duration: 0.6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(220,38,38,0.12)", border: "1px solid rgba(220,38,38,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f87171", fontSize: 14, fontWeight: 700 }}>✗</div>
              <h3 style={{ fontWeight: 700, fontSize: 16, color: "#fff" }}>Without Custom Signature</h3>
            </div>

            {/* Email mockup */}
            <div className="email-surface" style={{ border: "1px solid rgba(220,38,38,0.14)", marginBottom: 24 }}>
              <div style={{ padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.02)" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#374151", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#9ca3af" }}>👤</div>
                <div>
                  <div style={{ color: "#d1d5db", fontSize: 12, fontWeight: 500 }}>john.smith@company.com</div>
                  <div style={{ color: "#4b5563", fontSize: 11 }}>to: prospect@fortune500.com</div>
                </div>
              </div>
              <div style={{ padding: 18 }}>
                <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 8 }}>Hi Sarah,</p>
                {[0.83,0.66].map((w,i) => <div key={i} style={{ height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 4, marginBottom: 6, width: `${w*100}%` }} />)}
                <p style={{ color: "#6b7280", fontSize: 13, marginTop: 12, marginBottom: 14 }}>Best,</p>
                <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 12 }} />
                {/* Plain text sig */}
                <div style={{ fontSize: 13, lineHeight: 1.8, color: "#6b7280" }}>
                  <div style={{ fontWeight: 600, color: "#9ca3af" }}>John Smith</div>
                  <div>CEO — Founder at ClickUp</div>
                  <div>www.clickup.com</div>
                  <div>john@clickup.com</div>
                  <div style={{ fontSize: 11, color: "#4b5563", marginTop: 4 }}>Website | Instagram | LinkedIn | Facebook | YouTube</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ width: 32, height: 18, borderRadius: 9, background: "#374151", position: "relative" }}>
                    <div style={{ position: "absolute", left: 3, top: 3, width: 12, height: 12, borderRadius: "50%", background: "#6b7280" }} />
                  </div>
                  <span style={{ fontSize: 11, color: "#4b5563" }}>Signature off</span>
                </div>
              </div>
            </div>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {BAD.map(item => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "#6b7280" }}>
                  <span style={{ color: "#ef4444", flexShrink: 0, lineHeight: "1.5" }}>✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* --- WITH --- */}
          <motion.div initial={{ opacity: 0, x: 32 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.25, duration: 0.6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(5,150,105,0.12)", border: "1px solid rgba(5,150,105,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "#34d399", fontSize: 14, fontWeight: 700 }}>✓</div>
              <h3 style={{ fontWeight: 700, fontSize: 16, color: "#fff" }}>With Custom Signature</h3>
            </div>

            {/* Email mockup */}
            <div className="email-surface" style={{ border: `1px solid ${ACCENT}22`, boxShadow: `0 0 32px ${ACCENT}12`, marginBottom: 24 }}>
              <div style={{ padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.02)" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT}80)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: "#fff" }}>Z</div>
                <div>
                  <div style={{ color: "#d1d5db", fontSize: 12, fontWeight: 500 }}>zeb.evans@clickup.com</div>
                  <div style={{ color: "#4b5563", fontSize: 11 }}>to: prospect@fortune500.com</div>
                </div>
              </div>
              <div style={{ padding: 18 }}>
                <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 8 }}>Hi Sarah,</p>
                {[0.83,0.66].map((w,i) => <div key={i} style={{ height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 4, marginBottom: 6, width: `${w*100}%` }} />)}
                <p style={{ color: "#6b7280", fontSize: 13, marginTop: 12, marginBottom: 14 }}>Warm regards,</p>
                <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 12 }} />

                {/* Branded signature */}
                <div style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${ACCENT}20` }}>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: 3, flexShrink: 0, background: `linear-gradient(180deg, ${ACCENT}, ${ACCENT}40)` }} />
                    <div style={{ display: "flex", flexDirection: "column", gap: 7, padding: "12px 10px", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
                      {["🌐","in","▶","𝕏","📸"].map((ic,i) => (
                        <div key={i} style={{ width: 22, height: 22, borderRadius: "50%", background: `${ACCENT}18`, border: `1px solid ${ACCENT}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, cursor: "pointer" }}>{ic}</div>
                      ))}
                    </div>
                    <div style={{ flex: 1, padding: "12px 14px", display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                          <span style={{ fontWeight: 800, fontSize: 12, color: ACCENT }}>⚡ ClickUp</span>
                          <span style={{ color: "#60a5fa", fontSize: 9 }}>✓</span>
                        </div>
                        <div style={{ color: "#fff", fontWeight: 700, fontSize: 12, marginBottom: 2 }}>Zeb Evans</div>
                        <div style={{ color: "#9ca3af", fontSize: 10, marginBottom: 8 }}>ClickUp CEO</div>
                        <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 2 }}>zeb@clickup.com</div>
                        <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 8 }}>www.clickup.com</div>
                        <div style={{ display: "inline-block", padding: "4px 10px", borderRadius: 100, background: ACCENT, color: "#fff", fontSize: 10, fontWeight: 600, cursor: "pointer" }}>📅 Book a Meeting</div>
                      </div>
                      <div style={{ width: 58, height: 72, borderRadius: 8, background: `linear-gradient(135deg, ${ACCENT}35, ${ACCENT}08)`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                        <span style={{ fontWeight: 900, fontSize: 22, color: `${ACCENT}80` }}>Z</span>
                        <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(45deg, transparent, transparent 4px, ${ACCENT}18 4px, ${ACCENT}18 5px)`, opacity: 0.4 }} />
                        <div style={{ position: "absolute", bottom: 4, right: 4, background: "rgba(0,0,0,0.5)", borderRadius: 3, padding: "1px 3px", fontSize: 6, fontWeight: 700, color: "rgba(255,255,255,0.5)" }}>GIF</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ width: 32, height: 18, borderRadius: 9, background: "#059669", position: "relative" }}>
                    <div style={{ position: "absolute", right: 3, top: 3, width: 12, height: 12, borderRadius: "50%", background: "#fff" }} />
                  </div>
                  <span style={{ fontSize: 11, color: "#6b7280" }}>Signature active</span>
                </div>
              </div>
            </div>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {GOOD.map(item => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "#d1d5db" }}>
                  <span style={{ color: "#34d399", flexShrink: 0, lineHeight: "1.5" }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
