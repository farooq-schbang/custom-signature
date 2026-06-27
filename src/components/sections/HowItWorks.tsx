"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";

const STEPS = [
  {
    num: "01",
    title: "Pick a Template",
    desc: "Choose from 50+ professionally designed signature templates. Each one is crafted for Fortune 500-level impact.",
    color: "#3b82f6",
    preview: (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        {[["#3b82f6","S"],["#5E6AD2","L"],["#635BFF","S"],["#00A1E0","SF"],["#10b981","G"],["#f59e0b","N"]].map(([c, l], i) => (
          <div key={i} style={{ borderRadius: 8, padding: "10px 8px", border: `1px solid ${c}30`, background: `${c}08`, display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: c as string, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 800, color: "#fff", flexShrink: 0 }}>{l}</div>
            <div style={{ flex: 1 }}>
              <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)", marginBottom: 3 }} />
              <div style={{ height: 3, borderRadius: 2, background: "rgba(255,255,255,0.07)", width: "70%" }} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: "02",
    title: "Customize Everything",
    desc: "Add your name, title, photo, social links, GIF showcase, meeting link, and verified badge. No design skills needed.",
    color: "#a78bfa",
    preview: (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[["Name","Alex Johnson"],["Title","VP of Sales"],["Company","Acme Corp"],["Phone","+1 555-0192"]].map(([label, val]) => (
          <div key={label} style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ fontSize: 11, color: "#64748b", width: 56, flexShrink: 0 }}>{label}</div>
            <div style={{ flex: 1, borderRadius: 6, padding: "6px 10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 12, color: "#e2e8f0" }}>{val}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: "03",
    title: "Copy & Deploy Instantly",
    desc: "One click copies your signature to your clipboard. Paste it into Gmail, Outlook, or any email client in seconds.",
    color: "#22d3ee",
    preview: (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {[["Gmail","#EA4335"],["Outlook","#0078D4"],["Apple Mail","#1C1C1E"]].map(([name, color]) => (
            <div key={name} style={{ flex: 1, borderRadius: 8, padding: "8px 6px", background: `${color}12`, border: `1px solid ${color}30`, textAlign: "center" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: color as string }}>{name}</div>
            </div>
          ))}
        </div>
        <div style={{ borderRadius: 8, padding: "10px 14px", background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.25)", display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <span style={{ fontSize: 14 }}>📋</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#22d3ee" }}>Copy HTML Signature</span>
          <span style={{ marginLeft: "auto", fontSize: 11, color: "#22d3ee", opacity: 0.7 }}>✓ Copied!</span>
        </div>
      </div>
    ),
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="howitworks" ref={ref} style={{ padding: "100px 0", background: "#020208" }}>
      <Container>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="pill pill-violet" style={{ marginBottom: 20 }}>How It Works</div>
          <h2 className="display-lg" style={{ color: "#fff", marginBottom: 16 }}>
            Live in 3 Steps.
            <br />
            <span className="grad-blue">No Design Skills.</span>
          </h2>
          <p style={{ fontSize: 17, color: "#64748b", maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
            The fastest way to go from plain text footer to a signature that opens Fortune 500 doors.
          </p>
        </motion.div>

        {/* Steps */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32, position: "relative" }} className="grid md:grid-cols-3">
          {/* Connector lines */}
          <div style={{ position: "absolute", top: 48, left: "calc(33.33% - 16px)", right: "calc(33.33% - 16px)", height: 1, background: "linear-gradient(90deg, rgba(59,130,246,0.4), rgba(167,139,250,0.4), rgba(34,211,238,0.4))", pointerEvents: "none" }} className="hidden md:block" />

          {STEPS.map((step, i) => (
            <motion.div key={step.num}
              initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.15 }}
              className="card card-hover"
              style={{ padding: 28, position: "relative", overflow: "hidden" }}
            >
              {/* Top accent */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${step.color}80, ${step.color}20)` }} />

              {/* Number */}
              <div style={{ fontSize: 11, fontWeight: 800, color: step.color, letterSpacing: "0.1em", marginBottom: 20 }}>{step.num}</div>

              {/* Preview card */}
              <div style={{ borderRadius: 12, padding: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", marginBottom: 24 }}>
                {step.preview}
              </div>

              <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{step.title}</h3>
              <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65 }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
          style={{ textAlign: "center", marginTop: 56 }}>
          <a href="#builder" className="btn btn-primary btn-lg">Start Building Now — It&apos;s Free</a>
        </motion.div>
      </Container>
    </section>
  );
}
