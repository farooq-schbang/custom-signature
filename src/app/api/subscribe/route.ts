import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // In production: add to email list (Mailchimp, ConvertKit, etc.)
    console.log("New subscriber:", email, new Date().toISOString());

    return NextResponse.json({
      success: true,
      message: "You're in! Check your inbox for your welcome guide.",
    });
  } catch {
    return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
  }
}
