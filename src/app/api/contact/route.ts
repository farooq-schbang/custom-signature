import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

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

    if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "CustomSig <onboarding@resend.dev>",
        to: process.env.CONTACT_TO_EMAIL,
        replyTo: body.email,
        subject: `Contact form: ${body.name}${body.plan ? ` (${body.plan})` : ""}`,
        text: `Name: ${body.name}\nEmail: ${body.email}\nCompany: ${body.company || "—"}\nPlan: ${body.plan || "—"}\n\n${body.message}`,
      });
    } else {
      console.log("Contact form submission (Resend not configured):", {
        name: body.name,
        email: body.email,
        company: body.company,
        plan: body.plan,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll get back to you within 24 hours.",
    });
  } catch {
    return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 });
  }
}
