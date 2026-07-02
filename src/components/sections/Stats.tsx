"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";

const STATS = [
  { value: 50000, suffix: "+", label: "Active Users", color: "#0047FF" },
  { value: 38, suffix: "%", label: "More Replies", color: "#5E6AD2" },
  { value: 2, suffix: "min", label: "To Go Live", color: "#059669" },
  { value: 1000, suffix: "+", label: "Platforms", color: "#D97706" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let n = 0; const step = 16; const inc = target / (1600 / step);
    const t = setInterval(() => { n += inc; if (n >= target) { setVal(target); clearInterval(t); } else setVal(Math.floor(n)); }, step);
    return () => clearInterval(t);
  }, [inView, target]);
  const disp = target >= 1000 ? (val / 1000).toFixed(0) + "K" : val;
  return <span ref={ref}>{disp}{suffix}</span>;
}

export function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <section ref={ref} style={{ background: "#06060f", color: "#fff", padding: "64px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }} className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }}
              style={{ textAlign: "center", padding: "24px 16px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none", position: "relative" }}>
              <div style={{ fontSize: "clamp(36px,4vw,56px)", fontWeight: 900, letterSpacing: "-0.045em", color: "#fff", lineHeight: 1, marginBottom: 8 }}>
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: s.color }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
