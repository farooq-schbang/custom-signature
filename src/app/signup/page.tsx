"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isDemo, demoLogin } from "@/lib/demo";
import { AuthCard, AuthInput, GoogleButton } from "@/components/auth/AuthCard";

function SignupForm() {
  const params = useSearchParams();
  const next = params.get("next") || "/dashboard";
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
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
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setDone(true);
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

  if (done) {
    return (
      <AuthCard title="Check your email" subtitle={`We sent a confirmation link to ${email}. Click it to activate your account.`}>
        <a href="/login" className="btn btn-ghost btn-md" style={{ width: "100%", justifyContent: "center" }}>Back to log in</a>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Create your account" subtitle="Build free. Pay only when you export.">
      <GoogleButton onClick={handleGoogle} />
      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0 16px" }}>
        <div className="divider" style={{ flex: 1 }} />
        <span style={{ fontSize: 12, color: "#a1a1aa" }}>or</span>
        <div className="divider" style={{ flex: 1 }} />
      </div>
      <form onSubmit={handleSubmit}>
        <AuthInput label="Full name" type="text" value={fullName} onChange={e => setFullName(e.target.value)} required autoComplete="name" />
        <AuthInput label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
        <AuthInput label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} autoComplete="new-password" />
        {error && <p style={{ fontSize: 13, color: "#DC2626", marginBottom: 12 }}>{error}</p>}
        <button type="submit" disabled={loading} className="btn btn-primary btn-md" style={{ width: "100%", justifyContent: "center" }}>
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>
      <p style={{ marginTop: 16, fontSize: 13, textAlign: "center", color: "#71717a" }}>
        Already have an account? <a href="/login" style={{ color: "#0047FF", textDecoration: "none", fontWeight: 600 }}>Log in</a>
      </p>
    </AuthCard>
  );
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}
