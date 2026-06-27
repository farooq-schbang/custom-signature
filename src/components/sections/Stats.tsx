"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const STATS = [
  {
    icon: "↩",
    value: "42%",
    label: "Increase Reply Rate",
    desc: "Recipients are 42% more likely to respond to emails with a professional, branded signature.",
    color: "from-blue-600 to-blue-400",
  },
  {
    icon: "🔗",
    value: "3X",
    label: "Increase Link Clicks",
    desc: "Interactive social icons and CTA buttons drive 3X more engagement with every email you send.",
    color: "from-purple-600 to-purple-400",
  },
  {
    icon: "👤",
    value: "50k+",
    label: "Active Users",
    desc: "Join thousands of professionals from Fortune 500 companies already using Custom Signature.",
    color: "from-cyan-600 to-cyan-400",
  },
  {
    icon: "✉️",
    value: "1000+",
    label: "Supported Email & CRM",
    desc: "Works seamlessly with Gmail, Outlook, Apple Mail, HubSpot, Salesforce, and 1000+ more platforms.",
    color: "from-green-600 to-green-400",
  },
  {
    icon: "✅",
    value: "100%",
    label: "Social Status Sync",
    desc: "Your social proof, follower counts, and verification badges update automatically in real time.",
    color: "from-orange-600 to-orange-400",
  },
];

export function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="why" className="py-28 relative" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, #1d4ed810, transparent)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-blue-500/30 text-blue-400 mb-4">
            By the Numbers
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Results That Speak
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              For Themselves
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Every metric measured. Every advantage proven. See why the world&apos;s top professionals choose Custom Signature.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative rounded-2xl p-6 overflow-hidden cursor-default"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              whileHover={{ borderColor: "rgba(59,130,246,0.3)", background: "rgba(59,130,246,0.05)" }}
            >
              {/* Glow on hover */}
              <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-xl mb-4`}>
                {stat.icon}
              </div>

              <div className={`text-4xl font-black mb-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-white font-semibold mb-2">{stat.label}</div>
              <p className="text-gray-500 text-sm leading-relaxed">{stat.desc}</p>
            </motion.div>
          ))}

          {/* Span card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="md:col-span-2 lg:col-span-1 rounded-2xl p-6 flex flex-col justify-center items-center text-center"
            style={{ background: "linear-gradient(135deg, #1d4ed820, #7c3aed10)", border: "1px solid rgba(99,102,241,0.2)" }}
          >
            <div className="text-5xl mb-4">🏆</div>
            <div className="text-2xl font-black text-white mb-2">Fortune 500</div>
            <div className="text-gray-400 text-sm">Ready & Certified</div>
            <div className="mt-4 flex -space-x-2">
              {["G", "S", "A", "M", "D"].map((l, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: `hsl(${i * 60 + 200}, 70%, 45%)` }}>{l}</div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-black bg-blue-600 flex items-center justify-center text-xs font-bold text-white">+</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
