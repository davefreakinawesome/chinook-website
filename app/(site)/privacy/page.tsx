import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Prose from "@/components/ui/Prose";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How we collect, use and protect your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <Section className="pt-0">
        <Prose>
          <p>
            This is a placeholder privacy policy for Chinook Overlander and should be reviewed by a
            qualified professional before launch to ensure it meets Australian Privacy Principles
            and any other applicable requirements.
          </p>
          <h2>Information we collect</h2>
          <p>
            When you subscribe to the newsletter or submit an enquiry, we collect the details you
            provide (such as your name and email). We may collect anonymous analytics data about how
            the site is used.
          </p>
          <h2>How we use it</h2>
          <p>
            We use your information to send updates you&apos;ve requested, respond to enquiries, and
            improve the website. We do not sell your personal information.
          </p>
          <h2>Third parties</h2>
          <p>
            We use third-party services for email delivery, analytics and embedded content (such as
            YouTube and Instagram). These services have their own privacy policies.
          </p>
          <h2>Your choices</h2>
          <p>You can unsubscribe from emails at any time and request access to or deletion of your data.</p>
        </Prose>
      </Section>
    </>
  );
}
