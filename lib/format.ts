import type { BuildStatus, SponsorshipStatus, PartnerLevel } from "@/lib/types";

export function formatDate(iso: string): string {
  // Accept YYYY, YYYY-MM, or full ISO
  const parts = iso.split("-");
  const d = new Date(
    Number(parts[0]),
    parts[1] ? Number(parts[1]) - 1 : 0,
    parts[2] ? Number(parts[2]) : 1,
  );
  const opts: Intl.DateTimeFormatOptions =
    parts.length === 1
      ? { year: "numeric" }
      : parts.length === 2
        ? { month: "short", year: "numeric" }
        : { day: "numeric", month: "short", year: "numeric" };
  return new Intl.DateTimeFormat("en-AU", opts).format(d);
}

export const statusLabel: Record<BuildStatus, string> = {
  planned: "Planned",
  "in-progress": "In Progress",
  completed: "Completed",
  revised: "Revised",
  "on-hold": "On Hold",
};

export const sponsorshipLabel: Record<SponsorshipStatus, string> = {
  "personally-purchased": "Personally Purchased",
  supplied: "Supplied by Brand",
  "paid-partnership": "Paid Partnership",
  affiliate: "Affiliate Link",
  loaned: "Loaned for Review",
};

export const partnerLevelLabel: Record<PartnerLevel, string> = {
  principal: "Principal Partner",
  build: "Build Partner",
  product: "Product Partner",
  supporter: "Supporter",
  affiliate: "Affiliate Partner",
};
