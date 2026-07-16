import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Section from "@/components/ui/Section";
import Reveal from "@/components/anim/Reveal";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import ProgressMeter from "@/components/ui/ProgressMeter";
import { StatusBadge } from "@/components/ui/Badges";
import VideoCard from "@/components/cards/VideoCard";
import JournalCard from "@/components/cards/JournalCard";
import {
  getBuildSystems,
  getBuildSystem,
  getVideos,
  getJournalPost,
} from "@/lib/content";

export async function generateStaticParams() {
  const systems = await getBuildSystems();
  return systems.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const system = await getBuildSystem(slug);
  if (!system) return {};
  return { title: system.title, description: system.summary };
}

export default async function BuildSystemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const system = await getBuildSystem(slug);
  if (!system) notFound();

  const systems = await getBuildSystems();
  const idx = systems.findIndex((s) => s.slug === slug);
  const prev = systems[idx - 1];
  const next = systems[idx + 1];

  const allVideos = await getVideos();
  const relatedVideos = allVideos.filter((v) => system.relatedVideoIds?.includes(v.id));
  const relatedPosts = (
    await Promise.all((system.relatedPostSlugs ?? []).map((s) => getJournalPost(s)))
  ).filter(Boolean);

  return (
    <>
      {/* Hero */}
      <header className="relative border-b border-line pt-28 md:pt-36">
        <div className="container-x pb-10">
          <div className="flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-grey">
            <Link href="/build" className="hover:text-accent">The Build</Link>
            <span>/</span>
            <span className="text-accent">{system.category}</span>
          </div>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h1 className="max-w-3xl font-display text-5xl leading-[0.88] md:text-7xl">
              {system.title}
            </h1>
            <StatusBadge status={system.status} />
          </div>
          <p className="editorial mt-6 max-w-2xl text-lg">{system.summary}</p>
        </div>
        <div className="container-x pb-10">
          <MediaPlaceholder
            image={system.heroImage}
            label={system.category}
            className="aspect-[21/9] w-full"
            priority
          />
        </div>
      </header>

      <Section className="pt-14">
        <div className="grid gap-14 lg:grid-cols-[1fr_20rem]">
          {/* Body */}
          <div className="max-w-2xl">
            {typeof system.progress === "number" && (
              <div className="mb-10">
                <ProgressMeter value={system.progress} label="System progress" />
              </div>
            )}

            <div className="editorial space-y-5 text-lg">
              {system.body?.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            {(system.challenges || system.decisions || system.lessons) && (
              <div className="mt-12 space-y-8">
                {system.challenges && (
                  <DetailBlock label="Challenges" body={system.challenges} />
                )}
                {system.decisions && (
                  <DetailBlock label="Design Decisions" body={system.decisions} />
                )}
                {system.lessons && <DetailBlock label="Lessons Learned" body={system.lessons} />}
              </div>
            )}
          </div>

          {/* Spec sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            {system.specifications && system.specifications.length > 0 && (
              <div className="border border-line">
                <div className="border-b border-line px-4 py-3">
                  <span className="label-mono">Specifications</span>
                </div>
                <dl className="divide-y divide-line">
                  {system.specifications.map((spec) => (
                    <div key={spec.label} className="flex items-baseline justify-between gap-4 px-4 py-3">
                      <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-grey">
                        {spec.label}
                      </dt>
                      <dd className="text-right font-mono text-sm text-bone">
                        {spec.value}
                        {spec.unit && <span className="text-grey"> {spec.unit}</span>}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </aside>
        </div>
      </Section>

      {/* Related videos */}
      {relatedVideos.length > 0 && (
        <Section className="border-t border-line">
          <span className="label-mono">Related Episodes</span>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relatedVideos.map((v, i) => (
              <VideoCard key={v.id} video={v} index={i} />
            ))}
          </div>
        </Section>
      )}

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <Section className="border-t border-line">
          <span className="label-mono">Related Journal Entries</span>
          <div className="mt-8 grid gap-x-8 gap-y-12 md:grid-cols-3">
            {relatedPosts.map((p, i) => p && <JournalCard key={p.id} post={p} index={i} />)}
          </div>
        </Section>
      )}

      {/* Prev / next */}
      <Section className="border-t border-line">
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
          {prev ? (
            <Link href={`/build/${prev.slug}`} className="group bg-charcoal p-6 transition-colors hover:bg-graphite">
              <span className="label-mono-muted">&larr; Previous System</span>
              <p className="mt-2 font-display text-2xl uppercase leading-none text-bone group-hover:text-accent">
                {prev.title}
              </p>
            </Link>
          ) : (
            <div className="bg-charcoal p-6" />
          )}
          {next && (
            <Link href={`/build/${next.slug}`} className="group bg-charcoal p-6 text-right transition-colors hover:bg-graphite">
              <span className="label-mono-muted">Next System &rarr;</span>
              <p className="mt-2 font-display text-2xl uppercase leading-none text-bone group-hover:text-accent">
                {next.title}
              </p>
            </Link>
          )}
        </div>
      </Section>
    </>
  );
}

function DetailBlock({ label, body }: { label: string; body: string }) {
  return (
    <Reveal>
      <div className="border-l-2 border-accent pl-5">
        <span className="label-mono">{label}</span>
        <p className="editorial mt-2 text-base">{body}</p>
      </div>
    </Reveal>
  );
}
