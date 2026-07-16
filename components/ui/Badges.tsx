import type { BuildStatus, SponsorshipStatus, PartnerLevel } from "@/lib/types";
import { statusLabel, sponsorshipLabel, partnerLevelLabel } from "@/lib/format";

const statusColor: Record<BuildStatus, string> = {
  planned: "text-grey border-grey/40",
  "in-progress": "text-accent border-accent/50",
  completed: "text-olive border-olive/50",
  revised: "text-clay border-clay/50",
  "on-hold": "text-rust border-rust/50",
};

export function StatusBadge({ status }: { status: BuildStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] ${statusColor[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {statusLabel[status]}
    </span>
  );
}

export function DisclosureBadge({ status }: { status: SponsorshipStatus }) {
  const isPaid = status === "paid-partnership" || status === "supplied";
  return (
    <span
      className={`inline-flex items-center border px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.14em] ${
        isPaid ? "border-accent/40 text-accent" : "border-line-strong text-grey"
      }`}
    >
      {sponsorshipLabel[status]}
    </span>
  );
}

export function PartnerLevelBadge({ level }: { level: PartnerLevel }) {
  return (
    <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-accent">
      {partnerLevelLabel[level]}
    </span>
  );
}
