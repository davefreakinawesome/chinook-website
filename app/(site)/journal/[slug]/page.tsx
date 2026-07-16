import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Section from "@/components/ui/Section";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import VideoCard from "@/components/cards/VideoCard";
import { formatDate } from "@/lib/format";
import {
  getJournalPosts,
  getJournalPost,
  getBuildSystem,
  getVideos,
} from "@/lib/content";

export async function generateStaticParams() {
  const posts = await getJournalPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getJournalPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getJournalPost(slug);
  if (!post) notFound();

  const relatedSystems = (
    await Promise.all((post.buildSystemSlugs ?? []).map((s) => getBuildSystem(s)))
  ).filter(Boolean);

  const relatedVideo = post.relatedVideoId
    ? (await getVideos()).find((v) => v.id === post.relatedVideoId)
    : undefined;

  return (
    <article>
      <header className="border-b border-line pt-28 md:pt-36">
        <div className="container-x pb-10">
          <div className="flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-grey">
            <Link href="/journal" className="hover:text-accent">Journal</Link>
            <span>/</span>
            <span className="text-accent">{post.contentType}</span>
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-4xl leading-[0.9] md:text-7xl">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-grey">
            <span>{formatDate(post.publishedAt)}</span>
            {post.readingMinutes && <span>{post.readingMinutes} min read</span>}
            <span>By Dave</span>
          </div>
        </div>
        <div className="container-x pb-10">
          <MediaPlaceholder
            image={post.featuredImage}
            label={post.contentType}
            className="aspect-[21/9] w-full"
            priority
          />
        </div>
      </header>

      <Section className="pt-14">
        <div className="grid gap-14 lg:grid-cols-[1fr_18rem]">
          <div className="max-w-2xl">
            <p className="editorial text-xl italic text-bone">{post.excerpt}</p>
            <div className="mt-8 editorial space-y-5 text-lg">
              {post.body.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            {post.specifications && post.specifications.length > 0 && (
              <div className="mt-10 border border-line">
                <div className="border-b border-line px-4 py-3">
                  <span className="label-mono">Specifications</span>
                </div>
                <dl className="grid grid-cols-2 divide-line">
                  {post.specifications.map((s) => (
                    <div key={s.label} className="border-b border-line px-4 py-3">
                      <dt className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-grey">{s.label}</dt>
                      <dd className="mt-1 font-mono text-sm text-bone">{s.value} {s.unit}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {post.tags && (
              <div className="mt-10 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span key={t} className="border border-line px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-grey">
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            {relatedSystems.length > 0 && (
              <div>
                <span className="label-mono">Related Systems</span>
                <ul className="mt-3 space-y-2">
                  {relatedSystems.map((s) => s && (
                    <li key={s.id}>
                      <Link href={`/build/${s.slug}`} className="group flex items-center justify-between border border-line px-4 py-3 transition-colors hover:border-accent/40">
                        <span className="font-display text-lg uppercase leading-none text-bone group-hover:text-accent">{s.title}</span>
                        <span className="text-grey">&rarr;</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Section>

      {relatedVideo && (
        <Section className="border-t border-line">
          <span className="label-mono">Watch the Companion Video</span>
          <div className="mt-8 max-w-3xl">
            <VideoCard video={relatedVideo} index={0} />
          </div>
        </Section>
      )}
    </article>
  );
}
