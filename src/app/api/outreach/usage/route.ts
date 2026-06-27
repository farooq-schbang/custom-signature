import { NextRequest, NextResponse } from "next/server";
import { getOrCreateUser } from "@/lib/outreach/store";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") ?? "demo-user";
  const email = req.nextUrl.searchParams.get("email") ?? "demo@example.com";
  return NextResponse.json(getOrCreateUser(userId, email));
}
