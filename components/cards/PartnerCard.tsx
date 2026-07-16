import Link from "next/link";
import Image from "next/image";
import type { Partner } from "@/lib/types";
import { PartnerLevelBadge } from "@/components/ui/Badges";

export default function PartnerCard({ partner, featured = false }: { partner: Partner; featured?: boolean }) {
  return (
    <Link
      href={`/partners/${partner.slug}`}
      className={`group relative flex flex-col justify-between border border-line bg-graphite/30 p-6 transition-colors hover:border-accent/40 ${
        featured ? "md:p-8" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <PartnerLevelBadge level={partner.level} />
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-grey">
          {partner.category}
        </span>
      </div>

      {partner.logo ? (
        <div className={`relative w-full ${featured ? "my-8 h-16" : "my-6 h-12"}`}>
          <Image
            src={partner.logo.src}
            alt={partner.logo.alt}
            fill
            sizes="(max-width: 768px) 80vw, 24rem"
            className="object-contain object-left"
          />
        </div>
      ) : (
        <div className={`flex items-center ${featured ? "my-8" : "my-6"}`}>
          <span
            className={`font-display uppercase leading-none text-bone transition-colors group-hover:text-accent ${
              featured ? "text-4xl md:text-5xl" : "text-3xl"
            }`}
          >
            {partner.name}
          </span>
        </div>
      )}

      <p className="editorial line-clamp-2 text-sm">{partner.summary}</p>

      {(partner.discountCode || partner.affiliateUrl) && (
        <div className="mt-4 flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.14em]">
          {partner.discountCode && (
            <span className="border border-accent/40 px-2 py-1 text-accent">
              Code {partner.discountCode}
            </span>
          )}
          {partner.affiliateUrl && <span className="text-grey">Affiliate</span>}
        </div>
      )}
    </Link>
  );
}
