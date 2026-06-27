"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const WITHOUT_PROS = [
  "Plain black text — zero visual hierarchy",
  "No company logo or brand colors",
  "No profile photo or visual identity",
  "Social links as raw text only",
  "No call-to-action or meeting link",
  "No animated GIF product showcase",
  "Zero clicks or engagement generated",
  "Looks exactly like everyone else",
];

const WITH_PROS = [
  "Branded logo with your company colors",
  "Profile photo with designer layout",
  "Interactive social icons sidebar",
  "Verified blue checkmark trust badge",
  "One-click calendar booking button",
  "Animated GIF hero product showcase",
  "3× more link clicks & engagement",
  "Instantly memorable & authoritative",
];

export function Compare() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} id="compare" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="orb absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px]" style={{ background: "rgba(220,38,38,0.05)" }} />
      <div className="orb absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px]" style={{ background: "rgba(5,150,105,0.05)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-5"
            style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.2)", color: "#f87171" }}>
            Side by Side
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] mb-5">
            The Difference Is
            <br />
            <span style={{ background: "linear-gradient(135deg, #f87171 0%, #fb923c 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Night and Day
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Fortune 500 decision-makers notice everything. See exactly what your emails look like on their screens.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* WITHOUT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                style={{ background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)", color: "#f87171" }}>✗</div>
              <h3 className="text-white font-bold text-lg">Without Custom Signature</h3>
            </div>

            <div className="rounded-2xl overflow-hidden mb-6" style={{ background: "rgba(8,8,18,0.9)", border: "1px solid rgba(220,38,38,0.15)" }}>
              {/* Email chrome */}
              <div className="px-5 py-3 border-b border-white/6 flex items-center gap-3" style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-sm text-gray-400">👤</div>
                <div>
                  <div className="text-gray-300 text-xs font-medium">john.smith@company.com</div>
                  <div className="text-gray-600 text-xs">to: prospect@fortune500.com</div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-400 text-sm mb-2">Hi Sarah,</p>
                <div className="space-y-1.5 mb-2">
                  <div className="h-2 bg-white/8 rounded-full w-5/6" />
                  <div className="h-2 bg-white/8 rounded-full w-4/6" />
                </div>
                <p className="text-gray-400 text-sm mt-3 mb-4">Best,</p>
                <div className="h-px bg-white/6 mb-4" />
                {/* Plain text sig */}
                <div className="text-sm text-gray-400 space-y-0.5">
                  <div className="font-semibold text-gray-300">John Smith</div>
                  <div>CEO — Founder at ClickUp</div>
                  <div>www.clickup.com</div>
                  <div>john@clickup.com</div>
                  <div className="text-gray-600 text-xs mt-1">Website | Instagram | LinkedIn | Facebook | YouTube</div>
                </div>
                {/* Toggle OFF */}
                <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/6">
                  <div className="w-9 h-5 rounded-full relative" style={{ background: "#374151" }}>
                    <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-gray-500 rounded-full" />
                  </div>
                  <span className="text-gray-600 text-xs">Signature off</span>
                </div>
              </div>
            </div>

            <ul className="space-y-3">
              {WITHOUT_PROS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-500">
                  <span className="text-red-500/80 mt-0.5 flex-shrink-0 text-base leading-none">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* WITH */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                style={{ background: "rgba(5,150,105,0.15)", border: "1px solid rgba(5,150,105,0.3)", color: "#34d399" }}>✓</div>
              <h3 className="text-white font-bold text-lg">With Custom Signature</h3>
            </div>

            <div className="rounded-2xl overflow-hidden mb-6"
              style={{ background: "rgba(8,8,18,0.9)", border: "1px solid rgba(5,150,105,0.2)", boxShadow: "0 0 32px rgba(5,150,105,0.08)" }}>
              {/* Email chrome */}
              <div className="px-5 py-3 border-b border-white/6 flex items-center gap-3" style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-violet-400 flex items-center justify-center font-bold text-sm text-white">Z</div>
                <div>
                  <div className="text-gray-300 text-xs font-medium">zeb.evans@clickup.com</div>
                  <div className="text-gray-600 text-xs">to: prospect@fortune500.com</div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-400 text-sm mb-2">Hi Sarah,</p>
                <div className="space-y-1.5 mb-2">
                  <div className="h-2 bg-white/8 rounded-full w-5/6" />
                  <div className="h-2 bg-white/8 rounded-full w-4/6" />
                </div>
                <p className="text-gray-400 text-sm mt-3 mb-4">Warm regards,</p>
                <div className="h-px bg-white/6 mb-4" />

                {/* Branded sig */}
                <div className="rounded-xl overflow-hidden" style={{ background: "rgba(4,4,12,0.98)", border: "1px solid rgba(123,104,238,0.2)" }}>
                  <div className="flex">
                    <div className="w-1 flex-shrink-0" style={{ background: "linear-gradient(180deg, #7B68EE, #7B68EE40)" }} />
                    <div className="flex flex-col items-center gap-2 px-2.5 py-4 border-r border-white/6">
                      {["🌐","in","▶","𝕏","📸"].map((icon, i) => (
                        <motion.div key={i} whileHover={{ scale: 1.2 }}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs cursor-pointer"
                          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.06)" }}>
                          {icon}
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex flex-1 items-center gap-4 px-4 py-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className="font-black text-sm" style={{ color: "#7B68EE" }}>⚡ ClickUp</span>
                          <span className="text-blue-400 text-xs">✓</span>
                        </div>
                        <div className="text-white font-bold text-sm mb-0.5">Zeb Evans</div>
                        <div className="text-gray-400 text-xs mb-3">ClickUp CEO</div>
                        <div className="text-xs space-y-1 mb-3">
                          <div className="text-gray-500">zeb@clickup.com</div>
                          <div className="text-gray-500">www.clickup.com</div>
                        </div>
                        <motion.button whileHover={{ scale: 1.04 }}
                          className="px-3 py-1.5 rounded-full text-xs font-semibold text-white"
                          style={{ background: "#7B68EE" }}>
                          📅 Book a Meeting
                        </motion.button>
                      </div>
                      <div className="w-[68px] h-[80px] rounded-xl overflow-hidden relative flex-shrink-0"
                        style={{ background: "linear-gradient(145deg, rgba(123,104,238,0.3), rgba(123,104,238,0.06))" }}>
                        <div className="absolute inset-0 flex items-center justify-center font-black text-3xl"
                          style={{ color: "rgba(123,104,238,0.6)" }}>Z</div>
                        <div className="absolute inset-0 opacity-20"
                          style={{ background: "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(123,104,238,0.3) 5px, rgba(123,104,238,0.3) 6px)" }} />
                        <div className="absolute bottom-1.5 right-1.5 bg-black/50 rounded px-1 py-0.5 text-white/60 border border-white/10"
                          style={{ fontSize: 7, fontWeight: 700 }}>GIF</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Toggle ON */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/6">
                  <div className="w-9 h-5 rounded-full relative" style={{ background: "#059669" }}>
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow" />
                  </div>
                  <span className="text-gray-400 text-xs">Signature active</span>
                </div>
              </div>
            </div>

            <ul className="space-y-3">
              {WITH_PROS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                  <span className="text-green-400 mt-0.5 flex-shrink-0 text-base leading-none">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
