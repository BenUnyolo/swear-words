import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // CLOUDFLARE CHECK
  try {
    const cloudflareRes = await fetch(process.env.CLOUDFLARE_VERIFY_ENDPOINT!, {
      method: "POST",
      body: `secret=${encodeURIComponent(
        process.env.CLOUDFLARE_SECRET_KEY!
      )}&response=${body.token}`,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });

    const cloudflareResJson = await cloudflareRes.json();

    if (!cloudflareResJson.success) {
      console.error("cloudflare check failed");
      return NextResponse.json(
        { error: "verification error" },
        { status: 403 }
      );
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "error validating request" },
      { status: 500 }
    );
  }

  try {
    const { data, error } = await supabase.rpc("handle_match", {
      choice_1_input: body.choice_1,
      choice_2_input: body.choice_2,
      winner_id_input: body.winner,
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "database issue" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "error choosing winner" },
      { status: 500 }
    );
  }
}
