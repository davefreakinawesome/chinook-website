import type { Video } from "@/lib/types";
import { videos as fallbackVideos } from "@/lib/content/videos";
import { site } from "@/lib/site";

interface YTPlaylistItem {
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    resourceId: { videoId: string };
    thumbnails?: { high?: { url: string }; medium?: { url: string } };
  };
}

const API = "https://www.googleapis.com/youtube/v3";
const RSS = "https://www.youtube.com/feeds/videos.xml";
const REVALIDATE = 3600; // 1 hour

function channelId(): string {
  return process.env.YOUTUBE_CHANNEL_ID || site.youtubeChannelId || "";
}

/** Decode the handful of XML entities that appear in YouTube titles/descriptions. */
function decode(s: string): string {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

/**
 * Keyless path: the channel's public Atom feed (latest ~15 uploads). Requires
 * only a channel id, so live video works with no API key or secret.
 */
async function fetchRssUploads(): Promise<Video[] | null> {
  const id = channelId();
  if (!id) return null;

  try {
    const res = await fetch(`${RSS}?channel_id=${id}`, {
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;
    const xml = await res.text();

    const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g);
    if (!entries || entries.length === 0) return null;

    const videos: (Video & { isShort?: boolean })[] = entries.map((entry) => {
      const videoId = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1] ?? "";
      const title = decode(entry.match(/<media:title>([\s\S]*?)<\/media:title>/)?.[1] ?? "");
      const published = entry.match(/<published>(.*?)<\/published>/)?.[1] ?? "";
      const description = decode(
        entry.match(/<media:description>([\s\S]*?)<\/media:description>/)?.[1] ?? "",
      );
      const thumb = entry.match(/<media:thumbnail\s+url="(.*?)"/)?.[1];
      const altLink = entry.match(/<link[^>]*rel="alternate"[^>]*href="(.*?)"/)?.[1] ?? "";
      const isShort = altLink.includes("/shorts/");

      return {
        id: videoId,
        youtubeId: videoId,
        title,
        description,
        publishedAt: published.slice(0, 10),
        thumbnail: thumb
          ? { src: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`, alt: title }
          : undefined,
        isShort,
      };
    });

    // Feature the newest long-form video for the hero; fall back to newest of any.
    const featuredId = (videos.find((v) => !v.isShort) ?? videos[0])?.youtubeId;
    return videos.map(({ isShort: _isShort, ...v }) => ({
      ...v,
      featured: v.youtubeId === featuredId,
    }));
  } catch {
    return null;
  }
}

/**
 * Higher-fidelity path: YouTube Data API v3 (adds richer thumbnails and higher
 * result counts). Used only when an API key is configured. Cached for an hour.
 */
async function fetchApiUploads(max = 12): Promise<Video[] | null> {
  const key = process.env.YOUTUBE_API_KEY;
  const id = channelId();
  if (!key || !id) return null;

  try {
    const chRes = await fetch(
      `${API}/channels?part=contentDetails&id=${id}&key=${key}`,
      { next: { revalidate: REVALIDATE } },
    );
    if (!chRes.ok) return null;
    const chData = await chRes.json();
    const uploads: string | undefined =
      chData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (!uploads) return null;

    const plRes = await fetch(
      `${API}/playlistItems?part=snippet&maxResults=${max}&playlistId=${uploads}&key=${key}`,
      { next: { revalidate: REVALIDATE } },
    );
    if (!plRes.ok) return null;
    const plData = await plRes.json();

    return (plData.items as YTPlaylistItem[]).map((item, i) => ({
      id: item.snippet.resourceId.videoId,
      youtubeId: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt.slice(0, 10),
      thumbnail: item.snippet.thumbnails?.high
        ? { src: item.snippet.thumbnails.high.url, alt: item.snippet.title }
        : undefined,
      featured: i === 0,
    }));
  } catch {
    return null;
  }
}

/** Apply CMS/seed overrides (hidden, featured, episodeNumber, playlist) to live data. */
function applyOverrides(live: Video[]): Video[] {
  const overrides = new Map(fallbackVideos.map((v) => [v.youtubeId, v]));
  return live
    .map((v) => {
      const o = overrides.get(v.youtubeId);
      return o ? { ...v, ...o, thumbnail: v.thumbnail ?? o.thumbnail } : v;
    })
    .filter((v) => !v.hidden);
}

export async function getYouTubeVideos(): Promise<Video[]> {
  // Prefer the API when configured, otherwise use the keyless RSS feed.
  const live = (await fetchApiUploads()) ?? (await fetchRssUploads());
  if (live && live.length) return applyOverrides(live);
  return [...fallbackVideos].filter((v) => !v.hidden);
}
