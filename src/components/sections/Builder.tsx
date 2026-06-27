"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const ACCENT_COLORS = [
  { color: "#2563eb", name: "Blue" },
  { color: "#7c3aed", name: "Violet" },
  { color: "#059669", name: "Emerald" },
  { color: "#dc2626", name: "Red" },
  { color: "#d97706", name: "Amber" },
  { color: "#0891b2", name: "Cyan" },
  { color: "#ec4899", name: "Pink" },
  { color: "#f59e0b", name: "Yellow" },
];

const SOCIALS = [
  { key: "web", icon: "🌐", label: "Website" },
  { key: "li", icon: "in", label: "LinkedIn" },
  { key: "yt", icon: "▶", label: "YouTube" },
  { key: "tw", icon: "𝕏", label: "X / Twitter" },
  { key: "ig", icon: "📸", label: "Instagram" },
];

const FIELDS = [
  { key: "name", label: "Full Name", placeholder: "Alex Johnson" },
  { key: "title", label: "Job Title", placeholder: "VP of Sales" },
  { key: "company", label: "Company", placeholder: "Acme Corporation" },
  { key: "email", label: "Email Address", placeholder: "alex@acmecorp.com" },
  { key: "website", label: "Website", placeholder: "www.acmecorp.com" },
  { key: "calendly", label: "Calendar / Booking Link", placeholder: "calendly.com/yourname" },
];

export function Builder() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [form, setForm] = useState({
    name: "Alex Johnson",
    title: "VP of Sales",
    company: "Acme Corp",
    email: "alex@acmecorp.com",
    website: "www.acmecorp.com",
    calendly: "calendly.com/alexjohnson",
    accentColor: "#2563eb",
  });
  const [copied, setCopied] = useState(false);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const c = form.accentColor;

  const handleCopy = () => {
    const html = `<table cellpadding="0" cellspacing="0" border="0" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:13px;max-width:480px;">
  <tr>
    <td style="vertical-align:middle;padding-right:10px;border-right:2px solid ${c}40;">
      <table cellpadding="0" cellspacing="0">
        ${SOCIALS.map(s => `<tr><td style="padding-bottom:6px;"><a href="#" style="display:block;width:24px;height:24px;border-radius:50%;background:${c}18;text-align:center;line-height:24px;text-decoration:none;font-size:11px;">${s.icon}</a></td></tr>`).join('')}
      </table>
    </td>
    <td style="vertical-align:top;padding-left:14px;padding-right:14px;">
      <div style="color:${c};font-weight:800;font-size:13px;margin-bottom:6px;">${form.company}</div>
      <div style="color:#ffffff;font-weight:700;font-size:14px;margin-bottom:2px;">${form.name} <span style="color:#1d9bf0;font-size:11px;">✓</span></div>
      <div style="color:#9ca3af;font-size:12px;margin-bottom:8px;">${form.title}</div>
      <div style="color:#6b7280;font-size:11px;margin-bottom:2px;"><a href="mailto:${form.email}" style="color:#6b7280;text-decoration:none;">${form.email}</a></div>
      <div style="color:#6b7280;font-size:11px;margin-bottom:8px;"><a href="https://${form.website}" style="color:#6b7280;text-decoration:none;">${form.website}</a></div>
      ${form.calendly ? `<a href="https://${form.calendly}" style="display:inline-block;padding:5px 14px;background:${c};color:#ffffff;border-radius:20px;text-decoration:none;font-size:11px;font-weight:600;">📅 Book a Meeting</a>` : ''}
    </td>
  </tr>
</table>`;
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={ref} id="builder" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="orb absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]" style={{ background: "rgba(37,99,235,0.08)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-5"
            style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)", color: "#22d3ee" }}>
            ⚡ Live Builder
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] mb-5">
            Build Yours in
            <br />
            <span style={{ background: "linear-gradient(135deg, #22d3ee 0%, #60a5fa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              60 Seconds
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Fill in your details and watch your signature come to life in real time. Copy the HTML and paste it anywhere.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs" style={{ background: "rgba(37,99,235,0.2)", color: "#60a5fa" }}>✦</div>
              <h3 className="text-white font-bold">Your Information</h3>
            </div>

            <div className="space-y-4">
              {FIELDS.map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1.5">{label}</label>
                  <input
                    type="text"
                    value={(form as Record<string, string>)[key]}
                    onChange={(e) => set(key, e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-2.5 rounded-xl text-white text-sm placeholder-gray-700 outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    onFocus={(e) => { e.target.style.borderColor = `${c}60`; e.target.style.background = "rgba(255,255,255,0.06)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.background = "rgba(255,255,255,0.04)"; }}
                  />
                </div>
              ))}

              {/* Color picker */}
              <div>
                <label className="block text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2.5">Brand Accent Color</label>
                <div className="flex gap-2 flex-wrap">
                  {ACCENT_COLORS.map(({ color, name }) => (
                    <button
                      key={color}
                      title={name}
                      onClick={() => set("accentColor", color)}
                      className="w-8 h-8 rounded-full transition-all duration-200"
                      style={{
                        background: color,
                        outline: form.accentColor === color ? `2px solid ${color}` : "2px solid transparent",
                        outlineOffset: 2,
                        transform: form.accentColor === color ? "scale(1.25)" : "scale(1)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Socials */}
              <div>
                <label className="block text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2.5">Social Channels</label>
                <div className="flex gap-2 flex-wrap">
                  {SOCIALS.map(({ key, icon, label }) => (
                    <div key={key}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all"
                      style={{ background: "rgba(255,255,255,0.05)", border: `1px solid rgba(255,255,255,0.08)`, color: "#9ca3af" }}
                    >
                      <span className="text-xs">{icon}</span> {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Live Preview */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs" style={{ background: "rgba(5,150,105,0.2)", color: "#34d399" }}>⚡</div>
              <h3 className="text-white font-bold">Live Preview</h3>
              <div className="ml-auto flex items-center gap-1.5 text-xs text-green-400">
                <motion.div animate={{ scale: [1,1.4,1] }} transition={{ duration:2, repeat:Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Live
              </div>
            </div>

            {/* Email mockup */}
            <div className="rounded-2xl overflow-hidden mb-4"
              style={{ background: "rgba(8,8,18,0.95)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 24px 48px rgba(0,0,0,0.4)" }}>
              {/* Chrome */}
              <div className="px-4 py-3 border-b border-white/6 flex items-center gap-2" style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="ml-2 text-gray-600 text-xs">Gmail — Compose</span>
              </div>

              <div className="p-5">
                <p className="text-gray-500 text-sm mb-2">Hi [Recipient],</p>
                <div className="space-y-1.5 mb-2">
                  <div className="h-2 bg-white/8 rounded-full w-5/6" />
                  <div className="h-2 bg-white/8 rounded-full w-3/6" />
                </div>
                <p className="text-gray-500 text-sm mt-3 mb-4">Best regards,</p>
                <div className="h-px bg-white/6 mb-4" />

                {/* Signature preview */}
                <motion.div layout className="rounded-xl overflow-hidden"
                  style={{ background: "rgba(4,4,12,0.98)", border: `1px solid ${c}25` }}>
                  <div className="flex">
                    {/* Color accent bar */}
                    <div className="w-1 flex-shrink-0" style={{ background: `linear-gradient(180deg, ${c}, ${c}30)` }} />
                    {/* Social icons */}
                    <div className="flex flex-col items-center gap-2 px-2.5 py-4 border-r border-white/6">
                      {SOCIALS.map(({ key, icon }) => (
                        <motion.div key={key} whileHover={{ scale: 1.2 }}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs cursor-pointer"
                          style={{ background: `${c}15`, border: `1px solid ${c}20` }}>
                          {icon}
                        </motion.div>
                      ))}
                    </div>
                    {/* Info */}
                    <div className="flex flex-1 items-center gap-4 px-4 py-4">
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm mb-2 truncate" style={{ color: c }}>{form.company || "Your Company"}</div>
                        <div className="flex items-center gap-1 mb-0.5">
                          <span className="text-white font-bold text-sm truncate">{form.name || "Your Name"}</span>
                          <span className="text-blue-400 text-xs">✓</span>
                        </div>
                        <div className="text-gray-400 text-xs mb-3">{form.title || "Your Title"}</div>
                        <div className="text-xs space-y-1 mb-3">
                          <div className="text-gray-500 truncate">{form.email || "you@company.com"}</div>
                          <div className="text-gray-500 truncate">{form.website || "www.company.com"}</div>
                        </div>
                        {form.calendly && (
                          <motion.div whileHover={{ scale: 1.04 }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white cursor-pointer"
                            style={{ background: c }}>
                            📅 Book a Meeting
                          </motion.div>
                        )}
                      </div>
                      {/* Avatar */}
                      <div className="w-[72px] h-[88px] rounded-xl overflow-hidden relative flex-shrink-0"
                        style={{ background: `linear-gradient(145deg, ${c}35, ${c}08)` }}>
                        <div className="absolute inset-0 flex items-center justify-center font-black text-2xl"
                          style={{ color: `${c}90` }}>
                          {(form.name || "Y").charAt(0).toUpperCase()}
                        </div>
                        <div className="absolute inset-0 opacity-25"
                          style={{ background: `repeating-linear-gradient(45deg, transparent, transparent 5px, ${c}30 5px, ${c}30 6px)` }} />
                        <div className="absolute bottom-1.5 right-1.5 bg-black/50 rounded px-1 py-0.5 text-white/60 border border-white/10"
                          style={{ fontSize: 7, fontWeight: 700 }}>GIF</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* GIF slot */}
                <div className="mt-3 p-3 rounded-xl border border-dashed border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${c}25, ${c}08)` }}>🎬</div>
                  <div>
                    <div className="text-white text-xs font-semibold">Hero Product GIF</div>
                    <div className="text-gray-600 text-xs">Your animated brand showcase plays here</div>
                  </div>
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-full" style={{ background: `${c}15`, color: c, border: `1px solid ${c}25` }}>Pro</span>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCopy}
                className="flex-1 py-3.5 rounded-xl font-bold text-white text-sm transition-all"
                style={{ background: copied ? "#059669" : `linear-gradient(135deg, ${c}, ${c}cc)`, boxShadow: `0 0 24px ${c}40` }}
              >
                {copied ? "✓ Copied to Clipboard!" : "📋 Copy HTML Code"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-3.5 rounded-xl font-bold text-white text-sm transition-all"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
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
