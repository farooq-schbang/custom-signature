"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export function InteractiveDesign() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);
  const [activeIcon, setActiveIcon] = useState<string | null>(null);

  const ICONS = [
    { id: "web", icon: "🌐", label: "Visit Site", color: "#2563eb" },
    { id: "ig", icon: "📸", label: "Instagram", color: "#e1306c" },
    { id: "li", icon: "💼", label: "LinkedIn", color: "#0077b5" },
  ];

  return (
    <section ref={ref} className="py-28 relative overflow-hidden" style={{ background: "#020208" }}>
      {/* Star field */}
      <div className="absolute inset-0">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-glow-pulse"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animationDelay: Math.random() * 4 + "s",
              opacity: Math.random() * 0.4 + 0.1,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 border border-white/20"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <span className="text-yellow-400">⚡</span>
            <span className="text-white text-sm font-medium">Nothing Else Like It!</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            Interactive Design
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Custom Signature is the only AI-generated email signature with an interactive nav bar,
            logo animation, and profile animation — engineered for Fortune 500 impressions.
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-12">
          {/* 3D signature card */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            style={{ perspective: 1000 }}
          >
            <motion.div
              animate={{ rotateY: hovered ? -8 : 0, rotateX: hovered ? 5 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              className="cursor-pointer relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
              style={{ background: "#0f0f1a", minWidth: 360, transformStyle: "preserve-3d" }}
            >
              {/* Glow effect */}
              <motion.div
                animate={{ opacity: hovered ? 1 : 0 }}
                className="absolute inset-0 pointer-events-none rounded-2xl"
                style={{ boxShadow: "inset 0 0 60px rgba(59,130,246,0.2)" }}
              />

              <div className="flex">
                {/* Interactive sidebar */}
                <div className="flex flex-col items-center gap-3 px-3 py-5 border-r border-white/10">
                  {ICONS.map(({ id, icon, label, color }) => (
                    <motion.div
                      key={id}
                      whileHover={{ scale: 1.3 }}
                      onHoverStart={() => setActiveIcon(id)}
                      onHoverEnd={() => setActiveIcon(null)}
                      className="relative w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all"
                      style={{ background: activeIcon === id ? color + "40" : "rgba(255,255,255,0.08)" }}
                    >
                      <span className="text-sm">{icon}</span>
                      {activeIcon === id && (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="absolute left-10 whitespace-nowrap px-2 py-1 rounded text-xs text-white font-medium z-10"
                          style={{ background: color }}
                        >
                          {label}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Content */}
                <div className="flex-1 p-5 flex gap-4">
                  <div className="flex-1">
                    {/* Animated logo */}
                    <motion.div
                      animate={{ opacity: [1, 0.6, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-lg font-black mb-3 text-blue-400"
                    >
                      🏌️ BlueTees<span className="text-white">Golf</span>
                    </motion.div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-white font-bold">David Fisher</span>
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        className="text-blue-400 text-xs"
                      >✓</motion.span>
                    </div>
                    <div className="text-gray-400 text-xs mb-2">Evan Nicolini</div>
                    <div className="text-xs text-gray-500 space-y-0.5">
                      <div>BlueTees<span className="text-blue-400">Golf</span></div>
                      <div>david@blueteesgolf.com</div>
                      <div>www.blueteesgolf.com</div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="mt-3 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-blue-600"
                    >
                      📅 Schedule a Call
                    </motion.button>
                  </div>

                  {/* Animated product GIF area */}
                  <div className="w-24 h-28 rounded-lg overflow-hidden relative flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)" }}>
                    {/* Simulated animated GIF */}
                    <motion.div
                      animate={{
                        rotateY: [0, 15, 0, -15, 0],
                        scale: [1, 1.05, 1, 1.05, 1],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="text-5xl">⛳</div>
                    </motion.div>
                    {/* Diagonal overlay */}
                    <div className="absolute inset-0" style={{
                      background: "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(59,130,246,0.05) 8px, rgba(59,130,246,0.05) 10px)"
                    }} />
                    <div className="absolute bottom-1 right-1">
                      <span className="text-xs px-1.5 py-0.5 rounded bg-blue-600/80 text-white font-bold">GIF</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Feature callouts */}
          <div className="grid md:grid-cols-3 gap-6 w-full max-w-3xl">
            {[
              { icon: "🖱️", title: "Hover & Interact", desc: "Icons animate and expand on hover — driving engagement in every inbox." },
              { icon: "🎬", title: "Logo Animation", desc: "Your brand logo pulses and animates to capture attention instantly." },
              { icon: "🎭", title: "Profile Animation", desc: "Photo with diagonal slices and subtle motion creates a premium look." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="text-center p-5 rounded-xl border border-white/10"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="text-white font-bold text-sm mb-1">{item.title}</div>
                <div className="text-gray-500 text-xs">{item.desc}</div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 text-white text-sm hover:bg-white/5 transition-all"
            >
              🖱️ Hover your mouse
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold"
              style={{ background: "#2563eb" }}
            >
              Get Started →
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
