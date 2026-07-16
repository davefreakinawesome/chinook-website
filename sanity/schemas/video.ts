import { defineField, defineType } from "sanity";

export const video = defineType({
  name: "video",
  title: "Video",
  type: "document",
  description:
    "Optional overrides/curation for YouTube videos. Live data is pulled from the YouTube API; entries here can feature, hide, order or annotate.",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "youtubeId", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({ name: "duration", type: "string" }),
    defineField({ name: "playlist", type: "string" }),
    defineField({ name: "episodeNumber", type: "number" }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "hidden", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "title", subtitle: "playlist" } },
});
