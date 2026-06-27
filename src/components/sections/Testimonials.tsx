"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TESTIMONIALS = [
  {
    quote: "After switching to Custom Signature, my email reply rates jumped 38% in the first month. Every Fortune 500 prospect immediately takes me more seriously.",
    name: "Sarah Chen",
    title: "VP of Sales, Salesforce",
    avatar: "S",
    rating: 5,
    color: "#00A1E0",
  },
  {
    quote: "The GIF product showcase is pure genius. My SaaS demo plays right inside the email — I've closed 3 deals just from the signature alone.",
    name: "Marcus Rivera",
    title: "Founder, TechVentures",
    avatar: "M",
    rating: 5,
    color: "#7c3aed",
  },
  {
    quote: "We deployed Custom Signature across our 200-person sales team. The consistency and professionalism it brings to every outbound email is remarkable.",
    name: "Jennifer Park",
    title: "CMO, Goldman Sachs",
    avatar: "J",
    rating: 5,
    color: "#2563eb",
  },
  {
    quote: "I used to think email signatures were an afterthought. Custom Signature completely changed my perspective — it's a sales tool disguised as a footer.",
    name: "David Thompson",
    title: "Enterprise AE, Microsoft",
    avatar: "D",
    rating: 5,
    color: "#059669",
  },
  {
    quote: "The calendar booking link alone has saved me hours every week. No more back-and-forth scheduling — prospects just click and book.",
    name: "Lisa Wang",
    title: "Director of BD, Google",
    avatar: "L",
    rating: 5,
    color: "#dc2626",
  },
  {
    quote: "We went from generic plain-text signatures to beautifully branded ones overnight. Our outreach conversion rate improved by 31%.",
    name: "Robert Kim",
    title: "Head of Growth, Stripe",
    avatar: "R",
    rating: 5,
    color: "#6366f1",
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, #7c3aed, transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-yellow-500/30 text-yellow-400 mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Loved By Leaders at
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-300 bg-clip-text text-transparent">
              World-Class Companies
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              whileHover={{ borderColor: `${t.color}40`, background: `${t.color}05` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {"★★★★★".split("").map((s, si) => <span key={si} className="text-yellow-400 text-sm">{s}</span>)}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-lg"
                  style={{ background: t.color }}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
