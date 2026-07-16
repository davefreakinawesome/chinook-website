/**
 * Provider-agnostic newsletter adapter.
 * Chosen provider (ConvertKit / Klaviyo / Resend / ...) is wired here later
 * via the EMAIL_PROVIDER env var. Until then, subscriptions are logged so the
 * flow works end-to-end in development without leaking credentials client-side.
 */

export interface Subscriber {
  email: string;
  firstName?: string;
}

type ProviderResult = { ok: true } | { ok: false; error: string };

async function devLogger(sub: Subscriber): Promise<ProviderResult> {
  console.info("[newsletter] (dev) new subscriber:", sub.email, sub.firstName ?? "");
  return { ok: true };
}

async function convertkit(sub: Subscriber): Promise<ProviderResult> {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  const formId = process.env.CONVERTKIT_FORM_ID;
  if (!apiKey || !formId) return { ok: false, error: "ConvertKit not configured" };

  const res = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ api_key: apiKey, email: sub.email, first_name: sub.firstName }),
  });
  return res.ok ? { ok: true } : { ok: false, error: "ConvertKit request failed" };
}

export async function subscribe(sub: Subscriber): Promise<ProviderResult> {
  const provider = (process.env.EMAIL_PROVIDER ?? "dev").toLowerCase();
  switch (provider) {
    case "convertkit":
      return convertkit(sub);
    // case "klaviyo": ...
    // case "resend": ...
    default:
      return devLogger(sub);
  }
}
