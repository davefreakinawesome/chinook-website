import Link from "next/link";
import type { JournalPost } from "@/lib/types";
import { formatDate } from "@/lib/format";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";

export default function JournalCard({ post, index = 0 }: { post: JournalPost; index?: number }) {
  return (
    <Link href={`/journal/${post.slug}`} className="group flex flex-col">
      <MediaPlaceholder
        image={post.featuredImage}
        label={post.contentType}
        index={index}
        className="aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-[1.02]"
      />
      <div className="mt-4 flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-grey">
        <span className="text-accent">{post.contentType}</span>
        <span>{formatDate(post.publishedAt)}</span>
        {post.readingMinutes && <span>{post.readingMinutes} min</span>}
      </div>
      <h3 className="mt-2 font-display text-2xl leading-[0.98] text-bone transition-colors group-hover:text-accent">
        {post.title}
      </h3>
      <p className="editorial mt-2 line-clamp-2 text-sm">{post.excerpt}</p>
    </Link>
  );
}
