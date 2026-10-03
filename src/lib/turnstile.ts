// Each widget sets an action ("match", "contact") that Cloudflare echoes back, so a token
// only works on the route it was issued for. The action passed here must match the widget's.
export async function verifyTurnstile(token: unknown, action: string) {
  const res = await fetch(process.env.CLOUDFLARE_VERIFY_ENDPOINT!, {
    method: "POST",
    body: new URLSearchParams({
      secret: process.env.CLOUDFLARE_SECRET_KEY!,
      // Cloudflare rejects an empty response as missing-input-response, so non-string tokens fail verification.
      response: typeof token === "string" ? token : "",
    }),
  });
  const json = await res.json();

  // Cloudflare's test keys omit the action, so previews using them skip that check.
  const isTestKey = json.metadata?.result_with_testing_key === true;

  return json.success === true && (isTestKey || json.action === action);
}
