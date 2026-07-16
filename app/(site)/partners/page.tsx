import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Reveal from "@/components/anim/Reveal";
import PartnerCard from "@/components/cards/PartnerCard";
import { partnerLevelLabel } from "@/lib/format";
import { getPartners } from "@/lib/content";
import type { PartnerLevel } from "@/lib/types";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "The brands supporting the Chinook build — genuinely integrated products, not a logo graveyard.",
};

const levelOrder: PartnerLevel[] = ["principal", "build", "product", "supporter", "affiliate"];

export default async function PartnersPage() {
  const partners = await getPartners();
  const grouped = levelOrder
    .map((level) => ({ level, items: partners.filter((p) => p.level === level) }))
    .filter((g) => g.items.length > 0);

  return (
    <>
      <PageHeader
        eyebrow="Partners"
        title="Who Backs the Build"
        intro="Every partner here has a product genuinely integrated into the Chinook. The strongest partnerships show the gear actually working."
      />

      <Section className="pt-0">
        {grouped.map((group) => (
          <div key={group.level} className="mb-16 last:mb-0">
            <div className="mb-6 flex items-center gap-4">
              <h2 className="font-display text-2xl uppercase leading-none text-accent">
                {partnerLevelLabel[group.level]}
              </h2>
              <span className="h-px flex-1 bg-line" />
            </div>
            <div className="grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
              {group.items.map((partner, i) => (
                <Reveal key={partner.id} delay={(i % 3) * 0.05}>
                  <PartnerCard partner={partner} featured={group.level === "principal"} />
                </Reveal>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-8 flex flex-col items-start justify-between gap-6 border border-accent/20 bg-accent/[0.03] p-8 md:flex-row md:items-center">
          <div>
            <p className="label-mono">Work With Us</p>
            <h2 className="mt-3 font-display text-3xl uppercase leading-none md:text-4xl">
              Become a Chinook Partner
            </h2>
            <p className="editorial mt-3 max-w-lg">
              Reach an engaged automotive, overland and maker audience through authentic build
              integration, video features and long-term collaboration.
            </p>
          </div>
          <Link href="/partners/enquire" className="btn btn-primary">
            Partnership Enquiry
          </Link>
        </div>
      </Section>
    </>
  );
}
