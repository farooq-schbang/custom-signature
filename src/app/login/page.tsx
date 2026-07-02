"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isDemo, demoLogin } from "@/lib/demo";
import { AuthCard, AuthInput, GoogleButton } from "@/components/auth/AuthCard";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (isDemo) {
      demoLogin(email);
      window.location.href = next;
      return;
    }
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push(next);
      router.refresh();
    }
  };

  const handleGoogle = async () => {
    if (isDemo) {
      demoLogin("demo.user@gmail.com");
      window.location.href = next;
      return;
    }
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}` },
    });
  };

  return (
    <AuthCard title="Welcome back" subtitle="Log in to access your signatures.">
      <GoogleButton onClick={handleGoogle} />
      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0 16px" }}>
        <div className="divider" style={{ flex: 1 }} />
        <span style={{ fontSize: 12, color: "#a1a1aa" }}>or</span>
        <div className="divider" style={{ flex: 1 }} />
      </div>
      <form onSubmit={handleSubmit}>
        <AuthInput label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
        <AuthInput label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
        {error && <p style={{ fontSize: 13, color: "#DC2626", marginBottom: 12 }}>{error}</p>}
        <button type="submit" disabled={loading} className="btn btn-primary btn-md" style={{ width: "100%", justifyContent: "center" }}>
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>
      <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", fontSize: 13 }}>
        <a href="/forgot-password" style={{ color: "#0047FF", textDecoration: "none", fontWeight: 600 }}>Forgot password?</a>
        <a href="/signup" style={{ color: "#0047FF", textDecoration: "none", fontWeight: 600 }}>Create account</a>
      </div>
    </AuthCard>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
