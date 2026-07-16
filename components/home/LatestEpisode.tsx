import type { Video } from "@/lib/types";
import { formatDate } from "@/lib/format";
import VideoCard from "@/components/cards/VideoCard";

export default function LatestEpisode({ video }: { video: Video }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
      <VideoCard video={video} index={0} />
      <div>
        <div className="flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-grey">
          {video.episodeNumber && <span className="text-accent">Episode {video.episodeNumber}</span>}
          <span>{formatDate(video.publishedAt)}</span>
          {video.duration && <span>{video.duration}</span>}
        </div>
        <h3 className="mt-3 font-display text-3xl leading-none text-bone md:text-4xl">{video.title}</h3>
        {video.description && <p className="editorial mt-4 text-base">{video.description}</p>}
        <a
          href="/watch"
          className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-bone/80 transition-colors hover:text-accent"
        >
          All episodes <span>&rarr;</span>
        </a>
      </div>
    </div>
  );
}
