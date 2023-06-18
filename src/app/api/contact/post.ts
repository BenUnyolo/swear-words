import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { encode } from "html-entities";

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
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

    const msg = {
      to: "benunyolo@gmail.com",
      from: "contact-form@bensbeer.club", // Use the email address or domain you verified above
      subject: `Swear Words: ${encode(body.type)}`,
      // text: "and easy to do anywhere, even with Node.js",
      html: `
      <div><strong>Name</strong>: ${encode(body.name)}</div>
      <div><strong>Email</strong>: ${encode(body.email)}</div>
      <div><strong>Type</strong>: ${encode(body.type)}</div>
      <div><strong>Message</strong>: ${encode(body.message)}</div>
      `,
    };

    await sgMail.send(msg);

    return NextResponse.json(true);
  } catch (e: any) {
    console.error(e);
    if (e.response) {
      return NextResponse.json({ error: e.response.body }, { status: 500 });
    }
    return NextResponse.json(
      { error: "error submitting form" },
      { status: 500 }
    );
  }
}
