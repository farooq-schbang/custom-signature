"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { Campaign } from "@/lib/outreach/types";
import { FREE_LEAD_LIMIT } from "@/lib/outreach/store";

export default function Dashboard() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [usage, setUsage] = useState({ freeLeadsUsed: 0, freeLeadsLimit: FREE_LEAD_LIMIT });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/outreach/campaigns?userId=demo-user").then(r => r.json()),
      fetch("/api/outreach/usage?userId=demo-user").then(r => r.json()),
    ]).then(([c, u]) => {
      setCampaigns(c);
      setUsage(u);
      setLoading(false);
    });
  }, []);

  const totalLeads = campaigns.reduce((s, c) => s + c.leadsFound, 0);
  const totalEmailed = campaigns.reduce((s, c) => s + c.leadsEmailed, 0);
  const freePct = Math.min(100, (usage.freeLeadsUsed / FREE_LEAD_LIMIT) * 100);

  return (
    <div style={{ minHeight: "100vh", background: "#020208", color: "#e2e8f0" }}>
      {/* Nav */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg, #2563eb, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: "#fff" }}>O</div>
          <span style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>OpenOutreach</span>
        </div>
        <button
          onClick={() => router.push("/portal")}
          style={{ padding: "8px 18px", borderRadius: 100, background: "#2563eb", color: "#fff", fontWeight: 700, fontSize: 13, border: "none", cursor: "pointer" }}
        >
          + New Campaign
        </button>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 28px" }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", marginBottom: 4 }}>Dashboard</h1>
          <p style={{ color: "#475569", fontSize: 14, marginBottom: 32 }}>Manage your lead generation campaigns.</p>
        </motion.div>

        {/* Summary stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
          {[
            { label: "Total Campaigns", value: campaigns.length, color: "#60a5fa" },
            { label: "Leads Found", value: totalLeads, color: "#a78bfa" },
            { label: "Leads Emailed", value: totalEmailed, color: "#34d399" },
            { label: "Free Leads Left", value: Math.max(0, FREE_LEAD_LIMIT - usage.freeLeadsUsed), color: usage.freeLeadsUsed >= FREE_LEAD_LIMIT ? "#f87171" : "#fbbf24" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "18px 20px" }}>
              <div style={{ fontSize: 11, color: "#334155", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>{s.label}</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: s.color, letterSpacing: "-0.03em" }}>{s.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Free tier bar */}
        <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "16px 20px", marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>Free tier usage</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: freePct >= 100 ? "#f87171" : "#34d399" }}>{usage.freeLeadsUsed} / {FREE_LEAD_LIMIT} leads</span>
          </div>
          <div style={{ height: 6, borderRadius: 100, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${freePct}%` }} transition={{ duration: 0.8 }}
              style={{ height: "100%", borderRadius: 100, background: freePct >= 100 ? "#ef4444" : "linear-gradient(90deg, #2563eb, #7c3aed)" }} />
          </div>
          {freePct < 100 && (
            <p style={{ fontSize: 12, color: "#334155", marginTop: 6 }}>After 50 free leads, additional leads are $0.20 each.</p>
          )}
        </div>

        {/* Campaigns */}
        <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontWeight: 800, color: "#fff", fontSize: 18 }}>Your Campaigns</h2>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: 60, color: "#334155", fontSize: 14 }}>Loading…</div>
        ) : campaigns.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 24px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16 }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🚀</div>
            <h3 style={{ color: "#fff", fontWeight: 800, marginBottom: 8 }}>No campaigns yet</h3>
            <p style={{ color: "#475569", fontSize: 14, marginBottom: 24 }}>Create your first campaign to start finding qualified leads.</p>
            <button onClick={() => router.push("/portal")} style={{ padding: "12px 28px", borderRadius: 100, background: "#2563eb", color: "#fff", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}>
              Create First Campaign →
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {campaigns.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => router.push(`/portal/campaign/${c.id}`)}
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "20px 24px", cursor: "pointer", transition: "border-color 0.2s" }}
                onMouseOver={e => (e.currentTarget.style.borderColor = "rgba(37,99,235,0.4)")}
                onMouseOut={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <span style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>{c.name}</span>
                      <StatusPill status={c.status} />
                    </div>
                    <p style={{ color: "#475569", fontSize: 13, lineHeight: 1.5, maxWidth: 600 }}>{c.productDescription.slice(0, 100)}{c.productDescription.length > 100 ? "…" : ""}</p>
                    {c.keywords.length > 0 && (
                      <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                        {c.keywords.slice(0, 4).map(k => (
                          <span key={k} style={{ padding: "2px 8px", borderRadius: 100, background: "rgba(37,99,235,0.1)", color: "#60a5fa", fontSize: 11, fontWeight: 600 }}>{k}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 24, marginLeft: 24, flexShrink: 0 }}>
                    <Metric label="Found" value={c.leadsFound} />
                    <Metric label="Emailed" value={c.leadsEmailed} />
                    <div style={{ display: "flex", alignItems: "center", color: "#334155", fontSize: 18 }}>→</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 22, fontWeight: 900, color: "#e2e8f0", letterSpacing: "-0.02em" }}>{value}</div>
      <div style={{ fontSize: 11, color: "#334155", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    active: { bg: "rgba(16,185,129,0.12)", color: "#34d399" },
    paused: { bg: "rgba(251,191,36,0.12)", color: "#fbbf24" },
    draft: { bg: "rgba(100,116,139,0.12)", color: "#64748b" },
    completed: { bg: "rgba(124,58,237,0.12)", color: "#a78bfa" },
  };
  const s = map[status] ?? map.draft;
  return <span style={{ padding: "3px 10px", borderRadius: 100, background: s.bg, color: s.color, fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>{status}</span>;
}
