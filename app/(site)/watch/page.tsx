import type { Metadata } from "next";
import VideoCard from "@/components/cards/VideoCard";
import Section from "@/components/ui/Section";
import Reveal from "@/components/anim/Reveal";
import PageHeader from "@/components/ui/PageHeader";
import { getVideos } from "@/lib/content";

export const metadata: Metadata = {
  title: "Watch",
  description: "Every episode of the Chinook build series, plus shorts, workshop clips and travel films.",
};

export default async function WatchPage() {
  const videos = await getVideos();
  const [featured, ...rest] = videos;

  return (
    <>
      <PageHeader
        eyebrow="Watch"
        title="The Build Series"
        intro="Follow the Chinook rebuild episode by episode — fabrication, engineering and the decisions behind every system."
      />

      <Section className="pt-0">
        {featured && (
          <Reveal className="mb-16">
            <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-center">
              <VideoCard video={featured} index={0} />
              <div>
                <span className="label-mono">Latest Episode</span>
                <h2 className="mt-3 font-display text-3xl leading-none md:text-4xl">{featured.title}</h2>
                {featured.description && <p className="editorial mt-4">{featured.description}</p>}
              </div>
            </div>
          </Reveal>
        )}

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((video, i) => (
            <Reveal key={video.id} delay={(i % 3) * 0.06}>
              <VideoCard video={video} index={i + 1} />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
