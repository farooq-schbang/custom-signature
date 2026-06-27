import { NextRequest, NextResponse } from "next/server";
import { createCampaign, listCampaigns, getOrCreateUser } from "@/lib/outreach/store";
import type { CreateCampaignBody } from "@/lib/outreach/types";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") ?? "demo-user";
  return NextResponse.json(listCampaigns(userId));
}

export async function POST(req: NextRequest) {
  const body: CreateCampaignBody = await req.json();

  if (!body.productDescription || !body.targetMarket || !body.deliveryEmail) {
    return NextResponse.json({ error: "productDescription, targetMarket, and deliveryEmail are required" }, { status: 400 });
  }

  const userId = body.userId ?? "demo-user";
  getOrCreateUser(userId, body.deliveryEmail);

  const campaign = createCampaign({
    userId,
    name: body.name || `Campaign ${new Date().toLocaleDateString()}`,
    productDescription: body.productDescription,
    targetMarket: body.targetMarket,
    keywords: body.keywords ?? [],
    deliveryEmail: body.deliveryEmail,
    status: "active",
  });

  return NextResponse.json(campaign, { status: 201 });
}
