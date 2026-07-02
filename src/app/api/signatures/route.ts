import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Create (or update) a signature for the logged-in user.
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: { id?: string; config?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.config || typeof body.config !== "object") {
    return NextResponse.json({ error: "config is required" }, { status: 400 });
  }

  if (body.id) {
    const { data, error } = await supabase
      .from("signatures")
      .update({ config: body.config })
      .eq("id", body.id)
      .eq("owner_id", user.id)
      .select("id, is_paid")
      .single();
    if (error || !data) {
      return NextResponse.json({ error: "Signature not found" }, { status: 404 });
    }
    return NextResponse.json({ id: data.id, isPaid: data.is_paid });
  }

  const { data, error } = await supabase
    .from("signatures")
    .insert({ owner_id: user.id, config: body.config })
    .select("id")
    .single();
  if (error || !data) {
    return NextResponse.json({ error: "Could not save signature" }, { status: 500 });
  }
  return NextResponse.json({ id: data.id, isPaid: false }, { status: 201 });
}
