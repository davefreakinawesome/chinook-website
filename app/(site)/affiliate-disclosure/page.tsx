import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Prose from "@/components/ui/Prose";

export const metadata: Metadata = {
  title: "Affiliate & Sponsorship Disclosure",
  description: "How affiliate links, sponsorships and supplied products are handled on this site.",
};

export default function AffiliateDisclosurePage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Affiliate Disclosure" />
      <Section className="pt-0">
        <Prose>
          <p>
            Chinook Overlander participates in affiliate programs and works with commercial
            partners. This means some links on this website are affiliate links, and some products
            featured were supplied, sponsored or loaned by brands.
          </p>
          <h2>What this means</h2>
          <p>
            If you click an affiliate link and make a purchase, we may earn a commission at no extra
            cost to you. Discount codes may also provide a commission. This helps fund the build and
            the content.
          </p>
          <h2>Our commitment</h2>
          <p>
            Commercial arrangements never change what goes on the vehicle. We only feature products
            genuinely used or relevant to the build, and every product in the gear directory is
            labelled with its status — <strong>personally purchased</strong>,{" "}
            <strong>supplied</strong>, <strong>paid partnership</strong>,{" "}
            <strong>affiliate</strong> or <strong>loaned for review</strong>.
          </p>
          <h2>Sponsorship</h2>
          <p>
            Sponsored content and partner features are identified as such. We aim to keep all
            partner content useful and authentic rather than shallow promotion.
          </p>
          <p>
            Questions? <a href="/partners/enquire">Get in touch</a>.
          </p>
        </Prose>
      </Section>
    </>
  );
}
