"use client";

import { useState } from "react";
import type { Video } from "@/lib/types";
import { formatDate } from "@/lib/format";

/** Lightweight thumbnail that swaps to the YouTube iframe only on click. */
export default function VideoCard({ video, index = 0 }: { video: Video; index?: number }) {
  const [playing, setPlaying] = useState(false);
  const thumb = video.thumbnail?.src ?? `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;

  return (
    <div className="group flex flex-col">
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerated-download; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 h-full w-full"
            aria-label={`Play ${video.title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumb}
              alt=""
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              loading={index < 2 ? "eager" : "lazy"}
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-black transition-transform group-hover:scale-110">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            {video.duration && (
              <span className="absolute bottom-3 right-3 bg-ink/85 px-2 py-1 font-mono text-[0.65rem] text-paper">
                {video.duration}
              </span>
            )}
          </button>
        )}
      </div>
      <div className="mt-3 flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-grey">
        {video.episodeNumber && <span className="text-accent">EP {String(video.episodeNumber).padStart(2, "0")}</span>}
        <span>{formatDate(video.publishedAt)}</span>
        {video.playlist && <span>{video.playlist}</span>}
      </div>
      <h3 className="mt-1.5 font-display text-xl leading-tight text-bone">{video.title}</h3>
    </div>
  );
}
