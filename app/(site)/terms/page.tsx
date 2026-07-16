import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Prose from "@/components/ui/Prose";

export const metadata: Metadata = {
  title: "Terms & Disclaimers",
  description: "Terms of use and important technical and vehicle-modification disclaimers.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms & Disclaimers" />
      <Section className="pt-0">
        <Prose>
          <p>
            This is placeholder terms content and should be reviewed by a qualified professional
            before launch.
          </p>
          <h2>Technical & vehicle modification disclaimer</h2>
          <p>
            The content on this website documents one specific project. It is provided for general
            information and entertainment only. Vehicle modifications must comply with local laws,
            and engineering requirements vary by jurisdiction and application.
          </p>
          <p>
            Measurements, specifications and approaches described here may change during
            development, may contain errors, and may not be appropriate for your vehicle. Always
            consult qualified engineers, licensed electricians and relevant authorities before
            undertaking similar work. We accept no liability for how this information is used.
          </p>
          <h2>240V electrical</h2>
          <p>
            All 240V work referenced on this site must be carried out by a licensed electrician in
            accordance with AS/NZS 3001 and other applicable standards.
          </p>
          <h2>Content</h2>
          <p>
            All content is &copy; Chinook Overlander unless otherwise stated. Please don&apos;t
            reproduce it without permission.
          </p>
        </Prose>
      </Section>
    </>
  );
}
