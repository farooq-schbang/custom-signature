"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FEATURES = [
  {
    icon: "🎬",
    title: "GIF Brand Showcase",
    desc: "Embed an animated GIF of your hero product or service that plays directly in every recipient's inbox — zero plugins, zero attachments.",
    tag: "Exclusive",
    color: "#2563eb",
  },
  {
    icon: "📅",
    title: "Calendar Meeting Link",
    desc: "One-click Calendly, Cal.com, or Google Meet integration. Let anyone book time with you right from your email footer.",
    tag: "Productivity",
    color: "#7c3aed",
  },
  {
    icon: "🔗",
    title: "Interactive Nav Bar",
    desc: "A vertical sidebar of animated social icons that react on hover — website, Instagram, LinkedIn, Facebook, YouTube and custom links.",
    tag: "Unique",
    color: "#0891b2",
  },
  {
    icon: "✅",
    title: "Verified Blue Badge",
    desc: "Display your trust signals with a verified checkmark next to your name, establishing credibility from the first glance.",
    tag: "Trust",
    color: "#1d9bf0",
  },
  {
    icon: "🤖",
    title: "AI-Generated Design",
    desc: "Our AI reads your brand colors, logo, and industry to auto-generate a pixel-perfect signature that feels handcrafted.",
    tag: "AI Powered",
    color: "#059669",
  },
  {
    icon: "🌐",
    title: "1000+ Platform Support",
    desc: "Works natively in Gmail, Outlook, Apple Mail, Superhuman, HubSpot, Salesforce, Zoho, and 1000+ email and CRM tools.",
    tag: "Universal",
    color: "#d97706",
  },
  {
    icon: "📊",
    title: "Analytics Dashboard",
    desc: "Track opens, clicks, and engagement by signature version. A/B test designs to find what converts best for your audience.",
    tag: "Data-Driven",
    color: "#dc2626",
  },
  {
    icon: "👥",
    title: "Team Management",
    desc: "Deploy consistent, brand-compliant signatures across your entire organization with central admin controls and bulk updates.",
    tag: "Enterprise",
    color: "#7c3aed",
  },
];

export function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="features" className="py-28" style={{ background: "linear-gradient(180deg, transparent, #050510, transparent)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-purple-500/30 text-purple-400 mb-4">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Nothing Else
            <span className="block bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
              Like It
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Every element of your email signature is engineered to build trust, drive clicks, and make you unforgettable.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="group relative rounded-2xl p-5 overflow-hidden"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              whileHover={{ y: -4, borderColor: `${feat.color}40` }}
            >
              {/* Gradient top bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, transparent, ${feat.color}, transparent)` }} />

              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{feat.icon}</div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: `${feat.color}20`, color: feat.color }}>
                  {feat.tag}
                </span>
              </div>

              <h3 className="font-bold text-white mb-2 text-sm">{feat.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
