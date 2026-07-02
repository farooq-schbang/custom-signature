"use client";
import { useEffect, useState } from "react";
import { demoGetUser, demoListSignatures, demoLogout, type DemoSignature } from "@/lib/demo";
import type { SignatureConfig } from "@/lib/signature-html";

export function DemoDashboard() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [sigs, setSigs] = useState<DemoSignature[]>([]);
  const [ready, setReady] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const u = demoGetUser();
    if (!u) {
      window.location.href = "/login?next=/dashboard";
      return;
    }
    setUser(u);
    setSigs(demoListSignatures());
    setReady(true);
  }, []);

  const handleCopy = async (sig: DemoSignature) => {
    const res = await fetch("/api/demo/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ config: sig.config }),
    });
    const { html } = await res.json();
    await navigator.clipboard.writeText(html);
    setCopiedId(sig.id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  if (!ready) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#fafafa" }}>
      <div style={{ background: "#FFFBEB", borderBottom: "1px solid #FDE68A", color: "#D97706", padding: "8px 24px", fontSize: 13, fontWeight: 600, textAlign: "center" }}>
        🧪 DEMO MODE — accounts & payments are simulated locally
      </div>
      <header style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: "#0047FF", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 14 }}>C</div>
            <span style={{ fontWeight: 800, fontSize: 16, color: "#09090b" }}>Custom<span style={{ color: "#0047FF" }}>Sig</span></span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 13, color: "#71717a" }}>{user?.email}</span>
            <button onClick={() => { demoLogout(); window.location.href = "/"; }} className="btn btn-ghost btn-sm">Log out</button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#09090b", letterSpacing: "-0.02em" }}>Your signatures</h1>
            <p className="t-small">Paid signatures can be re-exported anytime.</p>
          </div>
          <a href="/#builder" className="btn btn-primary btn-md">+ New signature</a>
        </div>

        {sigs.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {sigs.map(sig => {
              const cfg = sig.config as SignatureConfig;
              const f = cfg.fields || {};
              const color = cfg.color || "#0047FF";
              return (
                <div key={sig.id} className="card-light" style={{ padding: 20, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: color, color: "#fff", fontWeight: 800, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {(f.name || "A")[0].toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#09090b" }}>{f.name || "Untitled signature"}</div>
                    <div style={{ fontSize: 12, color: "#71717a" }}>{[f.title, f.company].filter(Boolean).join(" · ") || "—"}</div>
                    <div style={{ fontSize: 11, color: "#a1a1aa", marginTop: 2 }}>Created {new Date(sig.createdAt).toLocaleDateString()}</div>
                  </div>
                  {sig.isPaid ? <span className="tag tag-green">✓ Paid</span> : <span className="tag tag-amber">Unpaid</span>}
                  {sig.isPaid ? (
                    <button onClick={() => handleCopy(sig)} className="btn btn-primary btn-sm">
                      {copiedId === sig.id ? "✓ Copied!" : "Copy HTML"}
                    </button>
                  ) : (
                    <a href={`/checkout/demo?signature_id=${sig.id}`} className="btn btn-primary btn-sm">Unlock — $8</a>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card-light" style={{ padding: 48, textAlign: "center" }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: "#09090b", marginBottom: 6 }}>No signatures yet</p>
            <p className="t-small" style={{ marginBottom: 18 }}>Build your first signature in the free builder — pay only when you export.</p>
            <a href="/#builder" className="btn btn-primary btn-md">Open the builder</a>
          </div>
        )}
      </main>
    </div>
  );
}
