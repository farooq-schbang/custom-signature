"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FEATURES = [
  {
    icon: "🎬",
    title: "Animated GIF Showcase",
    desc: "Embed a looping brand animation that plays directly in inboxes — no plugins, no attachments, instant wow factor.",
    tag: "Exclusive",
    color: "#2563eb",
    glow: "rgba(37,99,235,0.15)",
  },
  {
    icon: "📅",
    title: "One-Click Calendar",
    desc: "Calendly, Cal.com, or Google Meet — let anyone book time with you right from your email footer.",
    tag: "Productivity",
    color: "#7c3aed",
    glow: "rgba(124,58,237,0.15)",
  },
  {
    icon: "⚡",
    title: "Interactive Social Nav",
    desc: "A sleek vertical sidebar of animated social icons that react on hover. Website, LinkedIn, YouTube, Instagram and more.",
    tag: "Unique",
    color: "#0891b2",
    glow: "rgba(8,145,178,0.15)",
  },
  {
    icon: "✅",
    title: "Verified Trust Badge",
    desc: "The blue verified checkmark next to your name. Establishes instant authority and credibility with every email.",
    tag: "Trust",
    color: "#1d9bf0",
    glow: "rgba(29,155,240,0.15)",
  },
  {
    icon: "🤖",
    title: "AI-Generated Design",
    desc: "Feed it your brand colors and industry — our AI crafts a pixel-perfect signature that feels handcrafted by a designer.",
    tag: "AI Powered",
    color: "#059669",
    glow: "rgba(5,150,105,0.15)",
  },
  {
    icon: "🌐",
    title: "1000+ Platform Support",
    desc: "Works natively in Gmail, Outlook, Apple Mail, Superhuman, HubSpot, Salesforce, and every major CRM.",
    tag: "Universal",
    color: "#d97706",
    glow: "rgba(217,119,6,0.15)",
  },
  {
    icon: "📊",
    title: "Analytics & A/B Testing",
    desc: "Track opens, link clicks, and signature engagement. A/B test designs to find what drives the most conversions.",
    tag: "Data-Driven",
    color: "#dc2626",
    glow: "rgba(220,38,38,0.15)",
  },
  {
    icon: "👥",
    title: "Team Management",
    desc: "Deploy brand-compliant signatures across your entire organization with central admin controls and bulk sync.",
    tag: "Enterprise",
    color: "#7c3aed",
    glow: "rgba(124,58,237,0.15)",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} id="features" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(4,4,9,0.8) 30%, rgba(4,4,9,0.8) 70%, transparent 100%)" }} />
      <div className="orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px]" style={{ background: "rgba(124,58,237,0.06)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-5"
            style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)", color: "#a78bfa" }}>
            ✦ Features
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] mb-5">
            Nothing Else
            <br />
            <span style={{ background: "linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Like It
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Every element engineered to build trust, drive engagement, and make you unforgettable — all in one email footer.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {FEATURES.map((feat) => (
            <motion.div
              key={feat.title}
              variants={cardVariants}
              className="group relative rounded-2xl p-5 overflow-hidden cursor-default"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
              whileHover={{
                background: feat.glow,
                borderColor: `${feat.color}30`,
                y: -4,
                transition: { duration: 0.2 }
              }}
            >
              {/* Top highlight line */}
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${feat.color}, transparent)` }} />

              {/* Icon */}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{ background: `${feat.color}18`, border: `1px solid ${feat.color}25` }}>
                {feat.icon}
              </div>

              {/* Tag + Title */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-white text-sm leading-snug">{feat.title}</h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5"
                  style={{ background: `${feat.color}18`, color: feat.color }}>
                  {feat.tag}
                </span>
              </div>

              <p className="text-gray-500 text-xs leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
