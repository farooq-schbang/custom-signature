import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SignatureRow } from "@/components/dashboard/SignatureRow";
import { LogoutButton } from "@/components/dashboard/LogoutButton";
import { DemoDashboard } from "@/components/dashboard/DemoDashboard";
import type { SignatureConfig } from "@/lib/signature-html";

export const metadata = { title: "Dashboard — CustomSig" };

export default async function DashboardPage() {
  if (process.env.NEXT_PUBLIC_DEMO_MODE === "1") {
    return <DemoDashboard />;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/dashboard");

  const { data: signatures } = await supabase
    .from("signatures")
    .select("id, config, is_paid, created_at")
    .order("created_at", { ascending: false });

  return (
    <div style={{ minHeight: "100vh", background: "#fafafa" }}>
      <header style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: "#0047FF", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 14 }}>C</div>
            <span style={{ fontWeight: 800, fontSize: 16, color: "#09090b" }}>Custom<span style={{ color: "#0047FF" }}>Sig</span></span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 13, color: "#71717a" }}>{user.email}</span>
            <LogoutButton />
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

        {signatures && signatures.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {signatures.map(s => (
              <SignatureRow key={s.id} id={s.id} config={s.config as SignatureConfig} isPaid={s.is_paid} createdAt={s.created_at} />
            ))}
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
