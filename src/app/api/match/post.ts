import { sql } from "@/lib/db";
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
    await sql`SELECT handle_match(${body.choice_1}, ${body.choice_2}, ${body.winner})`;

    return new NextResponse(null, { status: 204 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "error choosing winner" },
      { status: 500 }
    );
  }
}
