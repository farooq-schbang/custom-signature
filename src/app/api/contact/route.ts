import { NextRequest, NextResponse } from "next/server";

interface ContactRequest {
  name: string;
  email: string;
  company?: string;
  message: string;
  plan?: "starter" | "pro" | "enterprise";
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactRequest = await req.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: "name, email, and message are required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // In production: send to email service (SendGrid, Resend, etc.)
    // For now, log and return success
    console.log("Contact form submission:", {
      name: body.name,
      email: body.email,
      company: body.company,
      plan: body.plan,
      message: body.message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll get back to you within 24 hours.",
    });
  } catch {
    return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 });
  }
}
