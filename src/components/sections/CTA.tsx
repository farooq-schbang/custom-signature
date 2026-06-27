"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";

export function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, #1d4ed830, #7c3aed10, transparent)" }} />

      {/* Grid */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: "linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {/* Animated rings */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/10"
          animate={{ scale: [1, 1.5 + i * 0.2, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 1.2 }}
          style={{ width: 200 + i * 120, height: 200 + i * 120 }}
        />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 text-blue-300 text-sm mb-6">
            <motion.span animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>✦</motion.span>
            Join 50,000+ professionals already using Custom Signature
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
            Make Every
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              Email Count
            </span>
          </h2>

          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10">
            Fortune 500 executives notice details. Your email signature is the detail that closes deals, wins trust, and opens doors.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button size="lg" href="#builder">
              ✦ Create Your Free Signature
            </Button>
            <Button variant="secondary" size="lg" href="#pricing">
              View Pricing
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
            <span>✓ Free forever plan</span>
            <span>✓ No credit card</span>
            <span>✓ Setup in 2 minutes</span>
          </div>
        </motion.div>

        {/* Social proof row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="mt-16 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-8"
        >
          <div className="flex -space-x-3">
            {["A", "B", "C", "D", "E"].map((l, i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center text-sm font-bold text-white"
                style={{ background: `hsl(${i * 50 + 200}, 70%, 45%)` }}>{l}</div>
            ))}
          </div>
          <div className="text-left">
            <div className="text-white font-bold">50,000+ professionals trust us</div>
            <div className="flex gap-1">{"★★★★★".split("").map((s, i) => <span key={i} className="text-yellow-400 text-sm">{s}</span>)}
              <span className="text-gray-500 text-sm ml-1">5.0 on G2 & Google</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
