"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const STEPS = [
  { id: 1, label: "Your product" },
  { id: 2, label: "Target market" },
  { id: 3, label: "Delivery" },
];

export default function PortalOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    productDescription: "",
    targetMarket: "",
    keywords: "",
    deliveryEmail: "",
  });

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
    setError("");
  }

  function canAdvance() {
    if (step === 1) return form.productDescription.trim().length >= 20;
    if (step === 2) return form.targetMarket.trim().length >= 10;
    if (step === 3) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.deliveryEmail);
    return false;
  }

  async function submit() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/outreach/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name || `Campaign ${new Date().toLocaleDateString()}`,
          productDescription: form.productDescription,
          targetMarket: form.targetMarket,
          keywords: form.keywords.split(",").map(k => k.trim()).filter(Boolean),
          deliveryEmail: form.deliveryEmail,
          userId: "demo-user",
        }),
      });
      if (!res.ok) throw new Error("Failed to create campaign");
      const campaign = await res.json();
      router.push(`/portal/campaign/${campaign.id}`);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#020208", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginBottom: 48 }}>
        <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 32, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #2563eb, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, color: "#fff" }}>O</div>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#e2e8f0" }}>OpenOutreach</span>
        </a>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 12 }}>
          Find your next<br /><span style={{ background: "linear-gradient(135deg, #60a5fa, #818cf8, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>50 leads — free.</span>
        </h1>
        <p style={{ color: "#64748b", fontSize: 16, maxWidth: 420, margin: "0 auto" }}>
          Describe your product and target market. We handle the rest: discovery, qualification, and delivery straight to your inbox.
        </p>
      </motion.div>

      {/* Step indicators */}
      <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 40 }}>
        {STEPS.map((s, i) => (
          <div key={s.id} style={{ display: "flex", alignItems: "center" }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 700, transition: "all 0.3s",
              background: step > s.id ? "#2563eb" : step === s.id ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.05)",
              border: step >= s.id ? "1px solid #2563eb" : "1px solid rgba(255,255,255,0.08)",
              color: step >= s.id ? "#60a5fa" : "#334155",
            }}>
              {step > s.id ? "✓" : s.id}
            </div>
            <span style={{ fontSize: 12, color: step >= s.id ? "#94a3b8" : "#334155", marginLeft: 8, marginRight: i < STEPS.length - 1 ? 0 : 0 }}>{s.label}</span>
            {i < STEPS.length - 1 && <div style={{ width: 40, height: 1, background: step > s.id ? "#2563eb44" : "rgba(255,255,255,0.06)", margin: "0 12px" }} />}
          </div>
        ))}
      </div>

      {/* Card */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        style={{ width: "100%", maxWidth: 540, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "36px 32px" }}
      >
        {step === 1 && (
          <div>
            <label style={labelStyle}>Campaign name <span style={{ color: "#334155" }}>(optional)</span></label>
            <input style={inputStyle} placeholder="e.g. Q3 Outbound — SaaS Founders" value={form.name} onChange={e => set("name", e.target.value)} />

            <label style={{ ...labelStyle, marginTop: 24 }}>Describe your product or service <span style={{ color: "#ef4444" }}>*</span></label>
            <textarea
              style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
              placeholder="e.g. We build AI-powered recruiting software that helps HR teams screen 10× more candidates without extra headcount. Integrates with LinkedIn, Greenhouse, and Workday."
              value={form.productDescription}
              onChange={e => set("productDescription", e.target.value)}
            />
            <p style={{ fontSize: 12, color: "#334155", marginTop: 6 }}>Be specific — the more detail, the better the lead quality. Min 20 characters.</p>
          </div>
        )}

        {step === 2 && (
          <div>
            <label style={labelStyle}>Who is your ideal customer? <span style={{ color: "#ef4444" }}>*</span></label>
            <textarea
              style={{ ...inputStyle, minHeight: 100, resize: "vertical" }}
              placeholder="e.g. VP of Sales or Head of Revenue at B2B SaaS companies with 50–500 employees, Series A–C funded, US-based."
              value={form.targetMarket}
              onChange={e => set("targetMarket", e.target.value)}
            />

            <label style={{ ...labelStyle, marginTop: 24 }}>Keywords / job titles <span style={{ color: "#334155" }}>(comma separated)</span></label>
            <input
              style={inputStyle}
              placeholder="VP Sales, Head of Growth, Revenue Operations"
              value={form.keywords}
              onChange={e => set("keywords", e.target.value)}
            />
          </div>
        )}

        {step === 3 && (
          <div>
            <label style={labelStyle}>Deliver leads to this email <span style={{ color: "#ef4444" }}>*</span></label>
            <input
              style={inputStyle}
              type="email"
              placeholder="you@yourcompany.com"
              value={form.deliveryEmail}
              onChange={e => set("deliveryEmail", e.target.value)}
            />
            <p style={{ fontSize: 12, color: "#334155", marginTop: 6 }}>We&apos;ll send qualified leads directly here. No spam, ever.</p>

            <div style={{ marginTop: 28, padding: "16px 20px", borderRadius: 12, background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)" }}>
              <div style={{ fontWeight: 700, color: "#60a5fa", fontSize: 14, marginBottom: 8 }}>Your free tier</div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ color: "#94a3b8", fontSize: 13 }}>First 50 leads</span>
                <span style={{ color: "#34d399", fontWeight: 700, fontSize: 13 }}>FREE</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#94a3b8", fontSize: 13 }}>After that</span>
                <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 13 }}>$0.20 / lead</span>
              </div>
            </div>

            {error && <p style={{ color: "#f87171", fontSize: 13, marginTop: 12 }}>{error}</p>}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28 }}>
          {step > 1 ? (
            <button style={btnGhostStyle} onClick={() => setStep(s => s - 1)}>← Back</button>
          ) : <div />}
          {step < 3 ? (
            <button style={{ ...btnPrimaryStyle, opacity: canAdvance() ? 1 : 0.4, cursor: canAdvance() ? "pointer" : "not-allowed" }} disabled={!canAdvance()} onClick={() => setStep(s => s + 1)}>
              Continue →
            </button>
          ) : (
            <button
              style={{ ...btnPrimaryStyle, opacity: (canAdvance() && !loading) ? 1 : 0.4, cursor: (canAdvance() && !loading) ? "pointer" : "not-allowed", minWidth: 160 }}
              disabled={!canAdvance() || loading}
              onClick={submit}
            >
              {loading ? "Launching…" : "Find My Leads →"}
            </button>
          )}
        </div>
      </motion.div>

      <p style={{ color: "#1e293b", fontSize: 12, marginTop: 24 }}>No credit card required · Cancel anytime</p>
    </div>
  );
}

const labelStyle: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 600, color: "#94a3b8", marginBottom: 8 };
const inputStyle: React.CSSProperties = { width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 14px", fontSize: 14, color: "#e2e8f0", outline: "none", fontFamily: "inherit", lineHeight: 1.6, boxSizing: "border-box" };
const btnPrimaryStyle: React.CSSProperties = { padding: "12px 28px", borderRadius: 100, background: "#2563eb", color: "#fff", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", transition: "all 0.2s" };
const btnGhostStyle: React.CSSProperties = { padding: "12px 20px", borderRadius: 100, background: "transparent", color: "#64748b", fontWeight: 600, fontSize: 14, border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer" };
