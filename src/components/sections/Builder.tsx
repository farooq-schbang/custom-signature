"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const ACCENT_COLORS = ["#2563eb", "#7c3aed", "#059669", "#dc2626", "#d97706", "#0891b2", "#1d9bf0", "#f59e0b"];
const SOCIAL_ICONS = [
  { key: "web", icon: "🌐", label: "Website" },
  { key: "ig", icon: "📸", label: "Instagram" },
  { key: "li", icon: "💼", label: "LinkedIn" },
  { key: "fb", icon: "📘", label: "Facebook" },
  { key: "yt", icon: "▶️", label: "YouTube" },
];

export function Builder() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({
    name: "Alex Johnson",
    title: "VP of Sales",
    company: "Acme Corp",
    email: "alex@acmecorp.com",
    website: "www.acmecorp.com",
    calendly: "calendly.com/alexjohnson",
    accentColor: "#2563eb",
  });
  const [copiedHtml, setCopiedHtml] = useState(false);

  const handleChange = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleCopy = () => {
    const html = `<table style="font-family:sans-serif;font-size:13px;">
  <tr>
    <td style="border-right:2px solid ${form.accentColor};padding-right:12px;vertical-align:top;">
      <a href="mailto:${form.email}" style="color:${form.accentColor};font-weight:bold;text-decoration:none;">${form.name}</a><br/>
      <span style="color:#666;">${form.title}</span><br/>
      <span style="color:${form.accentColor};font-weight:600;">${form.company}</span><br/>
      <a href="mailto:${form.email}" style="color:#888;text-decoration:none;">${form.email}</a><br/>
      <a href="https://${form.website}" style="color:#888;text-decoration:none;">${form.website}</a><br/>
      <a href="https://${form.calendly}" style="display:inline-block;margin-top:6px;padding:4px 12px;background:${form.accentColor};color:#fff;border-radius:20px;text-decoration:none;font-size:11px;">📅 Book a Meeting</a>
    </td>
  </tr>
</table>`;
    navigator.clipboard.writeText(html);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  return (
    <section ref={ref} id="builder" className="py-28" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, #1d4ed815, transparent)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-cyan-500/30 text-cyan-400 mb-4">
            Live Builder
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Build Your Signature
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
              In Real Time
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Fill in your details below and watch your professional email signature come to life instantly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="text-blue-400">✦</span> Your Information
            </h3>
            <div className="space-y-4">
              {[
                { field: "name", label: "Full Name", placeholder: "Alex Johnson" },
                { field: "title", label: "Job Title / Designation", placeholder: "VP of Sales" },
                { field: "company", label: "Company Name", placeholder: "Acme Corporation" },
                { field: "email", label: "Email Address", placeholder: "alex@acmecorp.com" },
                { field: "website", label: "Website", placeholder: "www.acmecorp.com" },
                { field: "calendly", label: "Calendar / Meeting Link", placeholder: "calendly.com/yourname" },
              ].map(({ field, label, placeholder }) => (
                <div key={field}>
                  <label className="block text-gray-400 text-xs font-medium mb-1.5 uppercase tracking-wide">{label}</label>
                  <input
                    type="text"
                    value={(form as Record<string, string>)[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all"
                  />
                </div>
              ))}

              {/* Color picker */}
              <div>
                <label className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wide">Brand Accent Color</label>
                <div className="flex gap-2 flex-wrap">
                  {ACCENT_COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleChange("accentColor", color)}
                      className="w-8 h-8 rounded-full border-2 transition-all"
                      style={{
                        background: color,
                        borderColor: form.accentColor === color ? "#fff" : "transparent",
                        transform: form.accentColor === color ? "scale(1.2)" : "scale(1)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Socials checkboxes */}
              <div>
                <label className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wide">Social Media Handles</label>
                <div className="flex gap-3 flex-wrap">
                  {SOCIAL_ICONS.map(({ key, icon, label }) => (
                    <div key={key} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 cursor-pointer hover:border-blue-500/40 hover:text-white transition-all">
                      {icon} {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Live Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="text-green-400">⚡</span> Live Preview
            </h3>

            {/* Email mockup */}
            <div className="rounded-2xl overflow-hidden border border-white/10" style={{ background: "rgba(8,8,16,0.95)" }}>
              <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-4 text-gray-600 text-xs">Gmail — Compose</span>
              </div>
              <div className="p-5">
                <p className="text-gray-500 text-sm mb-2">Hey [Recipient],</p>
                <div className="space-y-1.5 mb-3">
                  <div className="h-2 bg-white/10 rounded w-4/5" />
                  <div className="h-2 bg-white/10 rounded w-3/5" />
                </div>
                <p className="text-gray-500 text-sm mb-4">Best regards,</p>

                {/* Signature preview */}
                <motion.div
                  layout
                  className="rounded-xl overflow-hidden border border-white/10"
                  style={{ background: "rgba(5,5,12,0.95)" }}
                >
                  <div className="flex">
                    {/* Social sidebar */}
                    <div className="flex flex-col items-center gap-2.5 px-2.5 py-4 border-r border-white/10">
                      {SOCIAL_ICONS.map(({ key, icon }) => (
                        <motion.div key={key} whileHover={{ scale: 1.2 }}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs cursor-pointer transition-colors hover:opacity-80"
                          style={{ background: "rgba(255,255,255,0.08)" }}
                        >
                          {icon}
                        </motion.div>
                      ))}
                    </div>

                    {/* Main info */}
                    <div className="flex-1 p-4 flex gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm mb-1" style={{ color: form.accentColor }}>
                          {form.company || "Your Company"}
                        </div>
                        <div className="flex items-center gap-1 mb-0.5">
                          <span className="text-white font-bold text-sm truncate">{form.name || "Your Name"}</span>
                          <span className="text-blue-400 text-xs">✓</span>
                        </div>
                        <div className="text-gray-400 text-xs mb-2">{form.title || "Your Title"}</div>
                        <div className="text-xs space-y-0.5">
                          <div className="text-gray-500 truncate">{form.email || "you@company.com"}</div>
                          <div className="text-gray-500 truncate">{form.website || "www.company.com"}</div>
                        </div>
                        {form.calendly && (
                          <motion.div
                            whileHover={{ scale: 1.03 }}
                            className="mt-2 inline-block px-3 py-1 rounded-full text-xs font-semibold text-white cursor-pointer"
                            style={{ background: form.accentColor }}
                          >
                            📅 Book a Meeting
                          </motion.div>
                        )}
                      </div>

                      {/* Avatar */}
                      <div className="w-16 h-20 rounded-lg flex-shrink-0 flex items-center justify-center relative overflow-hidden"
                        style={{ background: `linear-gradient(135deg, ${form.accentColor}40, ${form.accentColor}10)` }}>
                        <div className="text-3xl font-black text-white/60">
                          {(form.name || "Y").charAt(0).toUpperCase()}
                        </div>
                        <div className="absolute inset-0" style={{
                          background: `repeating-linear-gradient(45deg, transparent, transparent 6px, ${form.accentColor}15 6px, ${form.accentColor}15 8px)`
                        }} />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* GIF badge */}
                <div className="mt-3 p-3 rounded-lg border border-dashed border-white/15 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center text-xl">
                    🎬
                  </div>
                  <div>
                    <div className="text-white text-xs font-semibold">Hero Product GIF</div>
                    <div className="text-gray-500 text-xs">Your product animation plays here</div>
                  </div>
                  <div className="ml-auto">
                    <span className="text-xs px-2 py-1 rounded-full border border-blue-500/30 text-blue-400">Pro</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-4 flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCopy}
                className="flex-1 py-3 rounded-xl font-semibold text-white text-sm transition-all"
                style={{ background: copiedHtml ? "#059669" : form.accentColor }}
              >
                {copiedHtml ? "✓ HTML Copied!" : "📋 Copy HTML Code"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-3 rounded-xl font-semibold text-white text-sm border border-white/20 hover:bg-white/10 transition-all"
              >
                💾 Export
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
