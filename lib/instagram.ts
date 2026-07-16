import type { InstaPost } from "@/lib/content/instagram";

/**
 * Live Instagram feed via the Instagram Graph API (Instagram API with Instagram
 * Login). Requires a Creator/Business account and a long-lived access token in
 * INSTAGRAM_ACCESS_TOKEN. Returns null when unconfigured or on error so the
 * caller can fall back to embeds / curated content.
 */
interface IGMedia {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp?: string;
}

const GRAPH = "https://graph.instagram.com";
const REVALIDATE = 3600; // 1 hour

function firstLine(caption?: string): string {
  if (!caption) return "";
  const line = caption.split("\n").find((l) => l.trim().length > 0) ?? "";
  return line.length > 140 ? `${line.slice(0, 137)}…` : line;
}

export async function getInstagramPosts(limit = 8): Promise<InstaPost[] | null> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return null;

  try {
    const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
    const res = await fetch(
      `${GRAPH}/me/media?fields=${fields}&limit=${limit}&access_token=${token}`,
      { next: { revalidate: REVALIDATE } },
    );
    if (!res.ok) return null;

    const data = (await res.json()) as { data?: IGMedia[] };
    const items = data.data;
    if (!items || items.length === 0) return null;

    return items.map((m) => {
      const type =
        m.media_type === "VIDEO"
          ? "reel"
          : m.media_type === "CAROUSEL_ALBUM"
            ? "carousel"
            : "image";
      const src = m.media_type === "VIDEO" ? m.thumbnail_url ?? m.media_url : m.media_url;
      const caption = firstLine(m.caption);
      return {
        id: m.id,
        type,
        caption,
        permalink: m.permalink,
        image: src ? { src, alt: caption || "Chinook Overlander on Instagram" } : undefined,
      };
    });
  } catch {
    return null;
  }
}
