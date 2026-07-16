import type { Video } from "@/lib/types";

/**
 * Manual/fallback video entries. When the YouTube API is configured these are
 * merged with live data (live wins, but `featured`/`hidden`/`episodeNumber`
 * overrides here still apply). youtubeId values are placeholders until the
 * channel is connected.
 */
export const videos: Video[] = [
  {
    id: "v-08",
    youtubeId: "dQw4w9WgXcQ",
    title: "Dropping a 6.0L V8 Into a 1978 Toyota Chinook",
    description:
      "Mounting the L98 6.0-litre V8 and 6L80E into the Chinook. Engine plates, crossmember and the first mock-up in the bay.",
    publishedAt: "2026-07-14",
    duration: "18:42",
    playlist: "The Build",
    episodeNumber: 8,
    featured: true,
  },
  {
    id: "v-07",
    youtubeId: "dQw4w9WgXcQ",
    title: "Extending the Wheelbase — Cutting the 80 Series Chassis",
    description:
      "The maths, the jig and the welds behind stretching the LandCruiser chassis to fit the Chinook body.",
    publishedAt: "2026-06-28",
    duration: "22:10",
    playlist: "The Build",
    episodeNumber: 7,
  },
  {
    id: "v-06",
    youtubeId: "dQw4w9WgXcQ",
    title: "Why the Original Hilux Chassis Had to Go",
    description: "Assessing the 1978 running gear and the case for a modern 80 Series platform.",
    publishedAt: "2026-06-12",
    duration: "14:05",
    playlist: "The Build",
    episodeNumber: 6,
  },
  {
    id: "v-05",
    youtubeId: "dQw4w9WgXcQ",
    title: "Designing the Digital Dashboard",
    description: "Building the hybrid Pi + ESP32 control system that will run the whole camper.",
    publishedAt: "2026-05-30",
    duration: "16:28",
    playlist: "Electrical",
    episodeNumber: 5,
  },
  {
    id: "v-04",
    youtubeId: "dQw4w9WgXcQ",
    title: "Barwork — Building a Custom Bull Bar",
    description: "Tube bending, notching and fitting the front barwork.",
    publishedAt: "2026-05-14",
    duration: "19:51",
    playlist: "The Build",
    episodeNumber: 4,
  },
  {
    id: "v-03",
    youtubeId: "dQw4w9WgXcQ",
    title: "Finding the Chinook — A Rare Toyota Camper",
    description: "The story of tracking down a 1978 Toyota Chinook and why it's worth saving.",
    publishedAt: "2026-04-28",
    duration: "12:33",
    playlist: "The Build",
    episodeNumber: 3,
  },
];
