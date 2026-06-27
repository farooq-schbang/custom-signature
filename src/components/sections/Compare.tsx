"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const WITHOUT = {
  name: "Zeb Evans",
  title: "CEO - Founder",
  company: "Click Up",
  website: "www.clickup.com",
  email: "click@customesignature.com",
  socials: "Website, Instagram, LinkedIn, Facebook, Youtube",
};

const WITH = {
  name: "Zeb Evans",
  title: "ClickUp CEO",
  company: "ClickUp",
  email: "zeb@clickup.com",
  website: "www.clickup.com",
  accentColor: "#7B68EE",
};

const PROS = [
  "Plain black text — no visual hierarchy",
  "No logo or brand colors",
  "No profile photo",
  "No social icons — just text list",
  "No call-to-action or meeting link",
  "No GIF product showcase",
  "Zero clicks generated",
  "Looks the same as everyone else",
];

const CONS = [
  "Branded logo with company colors",
  "Profile photo with diagonal design",
  "Interactive social sidebar icons",
  "Verified blue badge trust signal",
  "One-click calendar booking button",
  "Animated GIF hero product",
  "3X more link engagement",
  "Instantly memorable & professional",
];

export function Compare() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="compare" className="py-28 relative">
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #2563eb, transparent 60%), radial-gradient(circle at 70% 50%, #7c3aed, transparent 60%)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-red-500/30 text-red-400 mb-4">
            Side by Side
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            The Difference Is
            <span className="block bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
              Night and Day
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Stop leaving revenue on the table. See exactly what your emails look like to Fortune 500 decision-makers.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* WITHOUT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 text-lg font-bold">✗</div>
              <h3 className="text-white font-bold text-lg">Without Custom Signature</h3>
            </div>
            <div className="rounded-2xl overflow-hidden border border-red-500/20" style={{ background: "rgba(10,10,10,0.8)" }}>
              {/* Email header */}
              <div className="px-5 py-3 border-b border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm">👤</div>
                <div>
                  <div className="text-white text-sm font-medium">Custom Signature</div>
                  <div className="text-gray-500 text-xs">to: evannicolini@example.com</div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-400 text-sm mb-3">Hey Zach,</p>
                <div className="space-y-1.5 mb-3">
                  <div className="h-2 bg-white/10 rounded w-4/5" />
                  <div className="h-2 bg-white/10 rounded w-3/5" />
                </div>
                <p className="text-gray-400 text-sm mb-4">Best,</p>
                {/* Plain text signature */}
                <div className="text-gray-300 text-sm">
                  <div className="font-bold">{WITHOUT.name}</div>
                  <div className="text-gray-400">{WITHOUT.title}</div>
                  <div className="text-gray-400">{WITHOUT.company}</div>
                  <div className="text-gray-400">{WITHOUT.website}</div>
                  <div className="text-gray-400">{WITHOUT.email}</div>
                  <div className="text-gray-500 text-xs mt-1">{WITHOUT.socials}</div>
                </div>
                {/* Toggle off */}
                <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/10">
                  <div className="w-10 h-6 rounded-full bg-gray-700 relative">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-gray-400 rounded-full" />
                  </div>
                  <span className="text-gray-500 text-xs">Custom Signature</span>
                  <div className="ml-auto flex gap-3">
                    <button className="text-xs text-gray-500 px-3 py-1.5 rounded-full border border-white/10">↗ Reply</button>
                    <button className="text-xs text-gray-500 px-3 py-1.5 rounded-full border border-white/10">🗑 Delete</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Cons list */}
            <ul className="mt-5 space-y-2">
              {PROS.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
                  <span className="text-red-500 mt-0.5 flex-shrink-0">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* WITH */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 text-lg font-bold">✓</div>
              <h3 className="text-white font-bold text-lg">With Custom Signature</h3>
            </div>
            <div className="rounded-2xl overflow-hidden border border-green-500/20 animate-pulse-glow" style={{ background: "rgba(10,10,10,0.8)" }}>
              {/* Email header */}
              <div className="px-5 py-3 border-b border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center font-bold text-sm">C</div>
                <div>
                  <div className="text-white text-sm font-medium">Custom Signature</div>
                  <div className="text-gray-500 text-xs">to: evannicolini@example.com</div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-400 text-sm mb-3">Hey Zach,</p>
                <div className="space-y-1.5 mb-3">
                  <div className="h-2 bg-white/10 rounded w-4/5" />
                  <div className="h-2 bg-white/10 rounded w-3/5" />
                </div>
                <p className="text-gray-400 text-sm mb-4">Best,</p>
                {/* Branded signature */}
                <div className="rounded-xl overflow-hidden border border-white/10" style={{ background: "rgba(5,5,15,0.9)" }}>
                  <div className="flex">
                    {/* Sidebar */}
                    <div className="flex flex-col items-center gap-2.5 px-2.5 py-4 border-r border-white/10">
                      {["🌐","📸","💼","📘","▶️"].map((icon, i) => (
                        <motion.div key={i} whileHover={{ scale: 1.2 }}
                          className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs cursor-pointer hover:bg-blue-600/50 transition-colors">
                          {icon}
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex-1 p-4 flex gap-3">
                      <div className="flex-1">
                        <div className="font-bold text-sm mb-0.5" style={{ color: WITH.accentColor }}>⚡ ClickUp</div>
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-white font-bold text-sm">{WITH.name}</span>
                          <span className="text-blue-400 text-xs">✓</span>
                        </div>
                        <div className="text-gray-400 text-xs mb-2">{WITH.title}</div>
                        <div className="text-xs text-gray-500 space-y-0.5">
                          <div style={{ color: WITH.accentColor }}>{WITH.company}</div>
                          <div>{WITH.email}</div>
                          <div>{WITH.website}</div>
                        </div>
                        <motion.button whileHover={{ scale: 1.05 }}
                          className="mt-2 px-3 py-1 rounded-full text-xs font-semibold text-white"
                          style={{ background: WITH.accentColor }}>
                          📅 Book a Meeting
                        </motion.button>
                      </div>
                      {/* Photo */}
                      <div className="w-16 h-20 rounded-lg overflow-hidden relative flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${WITH.accentColor}40, transparent)` }}>
                        <div className="absolute inset-0 flex items-center justify-center text-3xl">Z</div>
                        <div className="absolute inset-0" style={{
                          background: `repeating-linear-gradient(45deg, transparent, transparent 6px, ${WITH.accentColor}20 6px, ${WITH.accentColor}20 8px)`
                        }} />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Toggle on */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10">
                  <div className="w-10 h-6 rounded-full relative" style={{ background: "#2563eb" }}>
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                  <span className="text-gray-400 text-xs">Custom Signature</span>
                  <div className="ml-auto flex gap-3">
                    <button className="text-xs text-blue-400 px-3 py-1.5 rounded-full border border-blue-500/30">↗ Reply</button>
                    <button className="text-xs text-gray-500 px-3 py-1.5 rounded-full border border-white/10">🗑 Delete</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Pros list */}
            <ul className="mt-5 space-y-2">
              {CONS.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
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
