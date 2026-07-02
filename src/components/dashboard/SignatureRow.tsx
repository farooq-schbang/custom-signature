"use client";
import { useState } from "react";
import type { SignatureConfig } from "@/lib/signature-html";

interface Props {
  id: string;
  config: SignatureConfig;
  isPaid: boolean;
  createdAt: string;
}

export function SignatureRow({ id, config, isPaid, createdAt }: Props) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const f = config.fields || {};
  const color = config.color || "#0047FF";

  const handleCopy = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/signatures/${id}/export`);
      if (!res.ok) throw new Error(res.status === 402 ? "This signature hasn't been paid for yet." : "Export failed.");
      const { html } = await res.json();
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Export failed.");
    } finally {
      setLoading(false);
    }
  };

  const handlePay = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signatureId: id }),
      });
      if (!res.ok) throw new Error("Could not start checkout.");
      const { url } = await res.json();
      window.location.href = url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not start checkout.");
      setLoading(false);
    }
  };

  return (
    <div className="card-light" style={{ padding: 20, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
      <div style={{ width: 40, height: 40, borderRadius: "50%", background: color, color: "#fff", fontWeight: 800, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {(f.name || "A")[0].toUpperCase()}
      </div>
      <div style={{ flex: 1, minWidth: 180 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#09090b" }}>{f.name || "Untitled signature"}</div>
        <div style={{ fontSize: 12, color: "#71717a" }}>{[f.title, f.company].filter(Boolean).join(" · ") || "—"}</div>
        <div style={{ fontSize: 11, color: "#a1a1aa", marginTop: 2 }}>Created {new Date(createdAt).toLocaleDateString()}</div>
      </div>
      {isPaid ? (
        <span className="tag tag-green">✓ Paid</span>
      ) : (
        <span className="tag tag-amber">Unpaid</span>
      )}
      {isPaid ? (
        <button onClick={handleCopy} disabled={loading} className="btn btn-primary btn-sm">
          {copied ? "✓ Copied!" : loading ? "…" : "Copy HTML"}
        </button>
      ) : (
        <button onClick={handlePay} disabled={loading} className="btn btn-primary btn-sm">
          {loading ? "…" : "Unlock — $8"}
        </button>
      )}
      {error && <p style={{ width: "100%", fontSize: 12, color: "#DC2626", margin: 0 }}>{error}</p>}
    </div>
  );
}
