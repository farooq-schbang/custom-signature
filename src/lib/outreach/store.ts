// In-memory store — replace with Postgres/Supabase/Neon in production
import type { Campaign, Lead, UserUsage } from "./types";

const campaigns = new Map<string, Campaign>();
const leads = new Map<string, Lead[]>();
const users = new Map<string, UserUsage>();

export const FREE_LEAD_LIMIT = 50;
export const PRICE_PER_LEAD = 0.20;

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

// ── Campaigns ──────────────────────────────────────────────

export function createCampaign(data: Omit<Campaign, "id" | "leadsFound" | "leadsEmailed" | "createdAt" | "updatedAt">): Campaign {
  const id = uid();
  const now = new Date().toISOString();
  const campaign: Campaign = { ...data, id, leadsFound: 0, leadsEmailed: 0, createdAt: now, updatedAt: now };
  campaigns.set(id, campaign);
  leads.set(id, []);
  return campaign;
}

export function getCampaign(id: string): Campaign | undefined {
  return campaigns.get(id);
}

export function listCampaigns(userId: string): Campaign[] {
  return [...campaigns.values()].filter(c => c.userId === userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function updateCampaign(id: string, patch: Partial<Campaign>): Campaign | null {
  const c = campaigns.get(id);
  if (!c) return null;
  const updated = { ...c, ...patch, updatedAt: new Date().toISOString() };
  campaigns.set(id, updated);
  return updated;
}

// ── Leads ──────────────────────────────────────────────────

export function addLeads(campaignId: string, newLeads: Lead[]): void {
  const existing = leads.get(campaignId) ?? [];
  leads.set(campaignId, [...existing, ...newLeads]);
  const c = campaigns.get(campaignId);
  if (c) {
    campaigns.set(campaignId, {
      ...c,
      leadsFound: c.leadsFound + newLeads.length,
      updatedAt: new Date().toISOString(),
    });
  }
}

export function getLeads(campaignId: string): Lead[] {
  return leads.get(campaignId) ?? [];
}

export function markLeadEmailed(campaignId: string, leadId: string): void {
  const list = leads.get(campaignId);
  if (!list) return;
  const updated = list.map(l => l.id === leadId ? { ...l, status: "emailed" as const, emailedAt: new Date().toISOString() } : l);
  leads.set(campaignId, updated);
  const c = campaigns.get(campaignId);
  if (c) campaigns.set(campaignId, { ...c, leadsEmailed: c.leadsEmailed + 1, updatedAt: new Date().toISOString() });
}

// ── User usage ─────────────────────────────────────────────

export function getOrCreateUser(userId: string, email: string): UserUsage {
  if (!users.has(userId)) {
    users.set(userId, { userId, email, freeLeadsUsed: 0, freeLeadsLimit: FREE_LEAD_LIMIT, totalLeadsPurchased: 0, creditBalance: 0 });
  }
  return users.get(userId)!;
}

export function incrementLeadsUsed(userId: string, count: number): void {
  const u = users.get(userId);
  if (u) users.set(userId, { ...u, freeLeadsUsed: u.freeLeadsUsed + count });
}
