import { sql } from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyTurnstile } from "@/lib/turnstile";

export async function POST(request: Request) {
  const body = await request.json();

  // CLOUDFLARE CHECK
  try {
    if (!(await verifyTurnstile(body.token, "match"))) {
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
