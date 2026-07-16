import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { getFeaturedPartners } from "@/lib/content";

export const metadata: Metadata = {
  title: "Partnership Enquiry",
  description:
    "Partner with Chinook Overlander — build integration, video features, product testing, affiliate arrangements and long-term ambassadorships.",
};

const audience = [
  { label: "Automotive & 4WD", value: "Enthusiasts" },
  { label: "Overland & Travel", value: "Adventurers" },
  { label: "Makers & Fabricators", value: "Builders" },
  { label: "Web & Tech", value: "Creators" },
];

const opportunities = [
  "Build integration",
  "Video features",
  "Product testing",
  "Workshop content",
  "Travel content",
  "Giveaways",
  "Affiliate arrangements",
  "Long-term ambassadorships",
];

export default async function EnquirePage() {
  const partners = await getFeaturedPartners();

  return (
    <>
      <PageHeader
        eyebrow="Work With Us"
        title="Partner With the Chinook"
        intro="An ambitious, well-documented build with a growing, engaged audience across automotive, overland, maker and web communities — and a website built to showcase your product properly."
      />

      <Section className="pt-0">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="grid grid-cols-2 gap-px border border-line bg-line">
              {audience.map((a) => (
                <div key={a.label} className="bg-charcoal p-5">
                  <p className="label-mono-muted">{a.label}</p>
                  <p className="mt-2 font-display text-2xl uppercase leading-none text-bone">{a.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <span className="label-mono">Collaboration Opportunities</span>
              <div className="mt-4 flex flex-wrap gap-2">
                {opportunities.map((o) => (
                  <span key={o} className="border border-line px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ash">
                    {o}
                  </span>
                ))}
              </div>
            </div>

            {partners.length > 0 && (
              <div className="mt-10">
                <span className="label-mono">Existing Partners</span>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {partners.map((p) => (
                    <span key={p.id} className="font-display text-xl uppercase text-ash">{p.name}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border border-line bg-graphite/30 p-6 md:p-8">
            <h2 className="font-display text-2xl uppercase leading-none">Send an Enquiry</h2>
            <p className="editorial mt-2 text-sm">
              Tell us about your product and how you&apos;d like to be involved. We&apos;ll follow up
              with a media kit.
            </p>
            <div className="mt-6">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
