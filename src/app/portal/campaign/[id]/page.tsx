"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { Campaign, Lead } from "@/lib/outreach/types";
import { FREE_LEAD_LIMIT } from "@/lib/outreach/store";

export default function CampaignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [freeUsed, setFreeUsed] = useState(0);

  useEffect(() => {
    Promise.all([
      fetch(`/api/outreach/campaigns/${id}`).then(r => r.json()),
      fetch(`/api/outreach/campaigns/${id}/leads`).then(r => r.json()),
      fetch(`/api/outreach/usage?userId=demo-user`).then(r => r.json()),
    ]).then(([c, l, u]) => {
      setCampaign(c);
      setLeads(l);
      setFreeUsed(u.freeLeadsUsed ?? 0);
      setLoading(false);
    });
  }, [id]);

  async function findMoreLeads() {
    setGenerating(true);
    const res = await fetch(`/api/outreach/campaigns/${id}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ count: 10 }),
    });
    const data = await res.json();
    if (res.ok) {
      setLeads(prev => [...prev, ...data.leads]);
      setFreeUsed(data.freeLeadsUsed);
      setCampaign(prev => prev ? { ...prev, leadsFound: prev.leadsFound + data.leadsGenerated } : prev);
    }
    setGenerating(false);
  }

  function exportCSV() {
    const headers = ["Name", "Title", "Company", "Email", "LinkedIn", "Status", "Discovered"];
    const rows = leads.map(l => [l.name, l.title, l.company, l.email ?? "", l.linkedinUrl, l.status, l.discoveredAt]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `leads-${id}.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) return <LoadingScreen />;
  if (!campaign) return <div style={{ color: "#fff", padding: 40 }}>Campaign not found.</div>;

  const freePct = Math.min(100, (freeUsed / FREE_LEAD_LIMIT) * 100);
  const isFreeExhausted = freeUsed >= FREE_LEAD_LIMIT;

  return (
    <div style={{ minHeight: "100vh", background: "#020208", color: "#e2e8f0" }}>
      {/* Top bar */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={() => router.push("/portal/dashboard")} style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
            ← Dashboard
          </button>
          <span style={{ color: "#1e293b" }}>|</span>
          <span style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>{campaign.name}</span>
          <span style={{ padding: "3px 10px", borderRadius: 100, background: campaign.status === "active" ? "rgba(16,185,129,0.15)" : "rgba(100,116,139,0.15)", color: campaign.status === "active" ? "#34d399" : "#64748b", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>{campaign.status}</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {leads.length > 0 && (
            <button onClick={exportCSV} style={btnGhostSm}>Export CSV</button>
          )}
          <button
            onClick={findMoreLeads}
            disabled={generating}
            style={{ ...btnPrimSm, opacity: generating ? 0.5 : 1 }}
          >
            {generating ? "Finding…" : isFreeExhausted ? "Find More — $0.20/lead" : "Find More Leads"}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 28px" }}>
        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
          {[
            { label: "Leads Found", value: campaign.leadsFound, color: "#60a5fa" },
            { label: "Emailed", value: campaign.leadsEmailed, color: "#34d399" },
            { label: "Free Remaining", value: Math.max(0, FREE_LEAD_LIMIT - freeUsed), color: "#a78bfa" },
            { label: "Email Delivery", value: campaign.deliveryEmail, color: "#94a3b8", small: true },
          ].map(stat => (
            <div key={stat.label} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "18px 20px" }}>
              <div style={{ fontSize: 12, color: "#475569", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{stat.label}</div>
              <div style={{ fontSize: stat.small ? 13 : 28, fontWeight: 800, color: stat.color, letterSpacing: "-0.02em", wordBreak: "break-all" }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Free usage bar */}
        <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "16px 20px", marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>Free leads used</span>
            <span style={{ fontSize: 13, color: isFreeExhausted ? "#f87171" : "#34d399", fontWeight: 700 }}>{freeUsed} / {FREE_LEAD_LIMIT}</span>
          </div>
          <div style={{ height: 6, borderRadius: 100, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${freePct}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ height: "100%", borderRadius: 100, background: isFreeExhausted ? "#ef4444" : "linear-gradient(90deg, #2563eb, #7c3aed)" }}
            />
          </div>
          {isFreeExhausted && (
            <p style={{ fontSize: 12, color: "#f87171", marginTop: 8 }}>Free tier exhausted — additional leads are $0.20 each.</p>
          )}
        </div>

        {/* Campaign brief */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
          <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "16px 20px" }}>
            <div style={{ fontSize: 11, color: "#334155", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Product Description</div>
            <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>{campaign.productDescription}</p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "16px 20px" }}>
            <div style={{ fontSize: 11, color: "#334155", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Target Market</div>
            <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>{campaign.targetMarket}</p>
            {campaign.keywords.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                {campaign.keywords.map(k => (
                  <span key={k} style={{ padding: "3px 10px", borderRadius: 100, background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.2)", color: "#60a5fa", fontSize: 11, fontWeight: 600 }}>{k}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Leads table */}
        {leads.length === 0 ? (
          <EmptyLeads onFind={findMoreLeads} generating={generating} />
        ) : (
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>Qualified Leads</span>
              <span style={{ color: "#475569", fontSize: 13 }}>{leads.length} leads</span>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    {["Name", "Title", "Company", "Email", "Status", ""].map(h => (
                      <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#334155", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, i) => (
                    <motion.tr
                      key={lead.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                    >
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: "50%", background: `hsl(${(lead.name.charCodeAt(0) * 13) % 360}, 60%, 25%)`, border: `1px solid hsl(${(lead.name.charCodeAt(0) * 13) % 360}, 60%, 35%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: `hsl(${(lead.name.charCodeAt(0) * 13) % 360}, 80%, 70%)`, flexShrink: 0 }}>
                            {lead.name[0]}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: "#e2e8f0", fontSize: 13 }}>{lead.name}</div>
                            <div style={{ fontSize: 11, color: "#475569", marginTop: 1 }}>{lead.summary.slice(0, 48)}…</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "#94a3b8", whiteSpace: "nowrap" }}>{lead.title}</td>
                      <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "#60a5fa", whiteSpace: "nowrap" }}>{lead.company}</td>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: lead.email ? "#94a3b8" : "#334155" }}>
                        {lead.email ?? <span style={{ color: "#1e293b" }}>Not found</span>}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <StatusBadge status={lead.status} />
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <a href={lead.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: "#2563eb", textDecoration: "none", fontWeight: 600, padding: "4px 10px", border: "1px solid rgba(37,99,235,0.3)", borderRadius: 6 }}>LinkedIn →</a>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    queued: { bg: "rgba(100,116,139,0.12)", color: "#64748b", label: "Queued" },
    qualified: { bg: "rgba(37,99,235,0.12)", color: "#60a5fa", label: "Qualified" },
    emailed: { bg: "rgba(16,185,129,0.12)", color: "#34d399", label: "Emailed" },
    failed: { bg: "rgba(239,68,68,0.12)", color: "#f87171", label: "Failed" },
  };
  const s = map[status] ?? map.queued;
  return <span style={{ padding: "3px 10px", borderRadius: 100, background: s.bg, color: s.color, fontSize: 11, fontWeight: 700 }}>{s.label}</span>;
}

function EmptyLeads({ onFind, generating }: { onFind: () => void; generating: boolean }) {
  return (
    <div style={{ textAlign: "center", padding: "80px 24px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16 }}>
      <div style={{ fontSize: 40, marginBottom: 16 }}>🎯</div>
      <h3 style={{ fontWeight: 800, color: "#fff", fontSize: 20, marginBottom: 8 }}>Ready to find leads</h3>
      <p style={{ color: "#475569", fontSize: 14, marginBottom: 24, maxWidth: 360, margin: "0 auto 24px" }}>Click below to start discovering qualified prospects matching your target market.</p>
      <button onClick={onFind} disabled={generating} style={{ padding: "13px 32px", borderRadius: 100, background: "#2563eb", color: "#fff", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", opacity: generating ? 0.5 : 1 }}>
        {generating ? "Searching…" : "Find First 10 Leads →"}
      </button>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div style={{ minHeight: "100vh", background: "#020208", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} style={{ width: 32, height: 32, border: "2px solid rgba(37,99,235,0.2)", borderTop: "2px solid #2563eb", borderRadius: "50%", margin: "0 auto 16px" }} />
        <p style={{ color: "#475569", fontSize: 14 }}>Loading campaign…</p>
      </div>
    </div>
  );
}

const btnGhostSm: React.CSSProperties = { padding: "8px 16px", borderRadius: 8, background: "transparent", color: "#64748b", fontWeight: 600, fontSize: 13, border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer" };
const btnPrimSm: React.CSSProperties = { padding: "8px 18px", borderRadius: 8, background: "#2563eb", color: "#fff", fontWeight: 700, fontSize: 13, border: "none", cursor: "pointer" };
