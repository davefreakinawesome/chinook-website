export interface InstaPost {
  id: string;
  type: "image" | "reel" | "carousel";
  caption: string;
  permalink: string;
  image?: { src: string; alt: string };
}

/**
 * Instagram section content, in order of preference:
 *
 * 1. NEXT_PUBLIC_INSTAGRAM_WIDGET_ID  → live auto-updating widget (needs login).
 * 2. `instagramEmbeds` below           → official post embeds, NO login/API.
 *    Just paste the URL of each post you want featured, e.g.
 *      "https://www.instagram.com/p/ABC123/"  (or /reel/ABC123/).
 *    Instagram renders the real post via embed.js. Add/remove freely.
 * 3. `instagramPosts` curated fallback → guarantees the section always looks
 *    intentional before anything above is set.
 */
export const instagramEmbeds: string[] = [
  "https://www.instagram.com/reel/DLZAShpJ8hT/",
  "https://www.instagram.com/p/DPwxJalE-cb/",
  "https://www.instagram.com/p/DNl-1YlztIM/",
  "https://www.instagram.com/p/DaztRlDJ0tQ/",
  "https://www.instagram.com/p/DaufS0Jpu7N/",
  "https://www.instagram.com/p/DZ1K-X9CZIG/",
];

const IG_URL = "https://www.instagram.com/chinookoverlander/";

export const instagramPosts: InstaPost[] = [
  { id: "ig1", type: "reel", caption: "First mock-up of the V8 in the bay 🔩", permalink: IG_URL },
  { id: "ig2", type: "image", caption: "Chassis rails cut and sleeved.", permalink: IG_URL },
  { id: "ig3", type: "carousel", caption: "Barwork tacked up. Swipe for angles.", permalink: IG_URL },
  { id: "ig4", type: "reel", caption: "Dashboard UI running on the bench.", permalink: IG_URL },
  { id: "ig5", type: "image", caption: "Original Chinook body, cleaned up.", permalink: IG_URL },
  { id: "ig6", type: "image", caption: "Welding the extension. Slow and straight.", permalink: IG_URL },
];
