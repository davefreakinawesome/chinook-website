import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import JournalIndex from "@/components/journal/JournalIndex";
import { getJournalPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Build Journal",
  description:
    "Build updates, technical guides, workshop stories and engineering explanations from this unique build — an extremely engineered vintage 4x4 camper.",
};

export default async function JournalPage() {
  const posts = await getJournalPosts();

  return (
    <>
      <PageHeader
        eyebrow="Build Journal"
        title="Notes from the Workshop"
        intro="The decisions, the mistakes, the fabrication and the extreme engineering — written up in full. The imperfect journey of this unique build is part of the story."
      />
      <Section className="pt-0">
        <JournalIndex posts={posts} />
      </Section>
    </>
  );
}
