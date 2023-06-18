import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import bcrypt from "bcryptjs";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(4, "10 s"),
  analytics: true,
});

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/api")) {
    const ipHash = bcrypt.hashSync(
      request.ip ?? "127.0.0.1",
      process.env.BCRYPT_SALT!
    );

    const { success, pending, limit, reset, remaining } = await ratelimit.limit(
      ipHash
    );

    return success
      ? NextResponse.next()
      : NextResponse.json({ error: "Slow down there" }, { status: 429 });
  }
}
