"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";

const STATS = [
  { value: 50000, suffix: "+", label: "Professionals", sublabel: "Active users worldwide", color: "#3b82f6" },
  { value: 38, suffix: "%", label: "More Replies", sublabel: "Average reply rate increase", color: "#a78bfa" },
  { value: 2, suffix: "min", label: "Setup Time", sublabel: "From zero to live signature", color: "#22d3ee" },
  { value: 1000, suffix: "+", label: "Platforms", sublabel: "Compatible email clients & CRMs", color: "#34d399" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    const t = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(t);
  }, [inView, target]);

  const display = target >= 1000 ? `${Math.floor(count / 1000)}K` : count;
  return <span ref={ref}>{display}{suffix}</span>;
}

export function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} style={{ padding: "80px 0", background: "#020208", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1 }} className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}
              style={{ textAlign: "center", padding: "32px 24px", position: "relative" }}
            >
              {/* Vertical divider */}
              {i < STATS.length - 1 && (
                <div style={{ position: "absolute", right: 0, top: "20%", height: "60%", width: 1, background: "rgba(255,255,255,0.06)" }} />
              )}
              <div style={{ fontSize: "clamp(36px,4vw,56px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#fff", marginBottom: 6, lineHeight: 1 }}>
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: "#475569" }}>{s.sublabel}</div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
