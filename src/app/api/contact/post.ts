import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { encode } from "html-entities";
import validator from "validator";

export async function POST(request: Request) {
  const body = await request.json();

  const { name, email, type, message } = body;

  const validation = [
    validator.isLength(name, { min: 2, max: 10 }),
    validator.isEmail(email),
    validator.isLength(type, { min: 2, max: 100 }),
    validator.isLength(message, { min: 25, max: 1500 }),
  ];

  if (!validation.every(Boolean)) {
    return NextResponse.json(
      { error: "There was an issue validating the form inputs" },
      { status: 400 }
    );
  }

  validator.isEmail("foo@bar.com");

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
      to: "contactform@swearwords.co.uk",
      from: "contactform@swearwords.co.uk",
      subject: `Swear Words: ${encode(type)}`,
      // text: "and easy to do anywhere, even with Node.js",
      html: `
        <div><strong>Name</strong>: ${encode(name)}</div>
        <div><strong>Email</strong>: ${encode(email)}</div>
        <div><strong>Type</strong>: ${encode(type)}</div>
        <div><strong>Message</strong>: ${encode(message)}</div>
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
