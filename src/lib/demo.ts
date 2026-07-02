// Demo mode: lets the whole build → pay → unlock flow run without
// Supabase/Stripe/Resend. Enabled only when NEXT_PUBLIC_DEMO_MODE=1.
// Auth and "purchases" live in localStorage; signature HTML still comes
// from the server (/api/demo/export) to mirror the real gating flow.

export const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === "1";

export interface DemoSignature {
  id: string;
  config: unknown;
  isPaid: boolean;
  createdAt: string;
}

const USER_KEY = "demo_user";
const SIGS_KEY = "demo_signatures";

export function demoGetUser(): { email: string } | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function demoLogin(email: string) {
  localStorage.setItem(USER_KEY, JSON.stringify({ email }));
}

export function demoLogout() {
  localStorage.removeItem(USER_KEY);
}

export function demoListSignatures(): DemoSignature[] {
  try {
    const raw = localStorage.getItem(SIGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function demoSaveSignature(config: unknown): DemoSignature {
  const sigs = demoListSignatures();
  const sig: DemoSignature = {
    id: `demo-${Date.now()}`,
    config,
    isPaid: false,
    createdAt: new Date().toISOString(),
  };
  sigs.unshift(sig);
  localStorage.setItem(SIGS_KEY, JSON.stringify(sigs));
  return sig;
}

export function demoMarkPaid(id: string) {
  const sigs = demoListSignatures().map(s => (s.id === id ? { ...s, isPaid: true } : s));
  localStorage.setItem(SIGS_KEY, JSON.stringify(sigs));
}

export function demoGetSignature(id: string): DemoSignature | null {
  return demoListSignatures().find(s => s.id === id) ?? null;
}
