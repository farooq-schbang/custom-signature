import { NextRequest, NextResponse } from "next/server";
import { getCampaign, getLeads, addLeads, getOrCreateUser, incrementLeadsUsed } from "@/lib/outreach/store";
import { generateLeads } from "@/lib/outreach/mockLeads";
import { FREE_LEAD_LIMIT } from "@/lib/outreach/store";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const campaign = getCampaign(id);
  if (!campaign) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(getLeads(id));
}

// POST triggers a lead discovery batch (10 leads per call in mock mode)
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const campaign = getCampaign(id);
  if (!campaign) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const count: number = Math.min(body.count ?? 10, 50);

  const user = getOrCreateUser(campaign.userId, campaign.deliveryEmail);
  const freeRemaining = Math.max(0, FREE_LEAD_LIMIT - user.freeLeadsUsed);
  const creditLeads = Math.max(0, count - freeRemaining);

  // Cost check: each lead above free tier costs $0.20
  const estimatedCost = creditLeads * 0.20;
  if (creditLeads > 0 && user.creditBalance < estimatedCost) {
    return NextResponse.json({
      error: "Insufficient credits",
      freeLeadsUsed: user.freeLeadsUsed,
      freeLeadsLimit: FREE_LEAD_LIMIT,
      creditBalance: user.creditBalance,
      estimatedCost,
    }, { status: 402 });
  }

  // Generate leads (swap generateLeads with real OpenOutreach API call)
  const newLeads = generateLeads(id, count);
  addLeads(id, newLeads);
  incrementLeadsUsed(campaign.userId, count);

  return NextResponse.json({
    leads: newLeads,
    leadsGenerated: newLeads.length,
    freeLeadsUsed: user.freeLeadsUsed + count,
    freeLeadsLimit: FREE_LEAD_LIMIT,
    charged: creditLeads * 0.20,
  }, { status: 201 });
}
