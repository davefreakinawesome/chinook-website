/**
 * Centralised outbound link builder. Appends consistent UTM + attribution
 * params so every click through to a supplier/partner site is measurable.
 *
 * - `outbound()` is the general builder (default medium "referral").
 * - `affiliate()` is a thin wrapper defaulting the medium to "affiliate".
 *
 * All outbound supplier links should route through here and render with
 * rel="nofollow sponsored" where a commercial relationship exists.
 */
type Attribution = {
  source: string;
  id?: string;
  page?: string;
  medium?: string;
};

export function outbound(url: string, attribution: Attribution): string {
  try {
    const u = new URL(url);
    u.searchParams.set("utm_source", "chinookoverlander");
    u.searchParams.set("utm_medium", attribution.medium ?? "referral");
    u.searchParams.set("utm_campaign", attribution.source);
    if (attribution.id) u.searchParams.set("utm_content", attribution.id);
    if (attribution.page) u.searchParams.set("utm_term", attribution.page);
    return u.toString();
  } catch {
    return url;
  }
}

export function affiliate(
  url: string,
  attribution: Omit<Attribution, "medium">,
): string {
  return outbound(url, { ...attribution, medium: "affiliate" });
}
