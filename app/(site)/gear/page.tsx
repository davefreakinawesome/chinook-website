import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import GearIndex from "@/components/gear/GearIndex";
import { getProducts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gear",
  description:
    "Every product used on this unique build — tools, electronics, automotive parts and software for an extremely engineered vintage 4x4 camper.",
};

export default async function GearPage() {
  const products = await getProducts();

  return (
    <>
      <PageHeader
        eyebrow="Gear Directory"
        title="What's on the Build"
        intro="A structured directory of the tools, parts and software used on this extreme camper build — with honest disclosures on what's bought, supplied, sponsored or affiliate."
      />
      <Section className="pt-0">
        <GearIndex products={products} />
        <p className="mt-12 max-w-2xl font-mono text-[0.65rem] leading-relaxed text-grey">
          Disclosure: some links are affiliate links and some products were supplied or sponsored,
          as labelled on each item. This never changes what goes on the build — only genuinely used
          gear is listed. See our <a href="/affiliate-disclosure" className="text-accent">affiliate disclosure</a>.
        </p>
      </Section>
    </>
  );
}
