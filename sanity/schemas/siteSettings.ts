import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({
      name: "buildStatus",
      title: "Build Status (Homepage HUD)",
      type: "object",
      fields: [
        defineField({ name: "currentPhase", type: "string" }),
        defineField({ name: "nextMilestone", type: "string" }),
        defineField({ name: "progress", type: "number", validation: (r) => r.min(0).max(100) }),
        defineField({ name: "lastUpdate", type: "date" }),
      ],
    }),
    defineField({
      name: "social",
      type: "object",
      fields: [
        defineField({ name: "youtube", type: "url" }),
        defineField({ name: "instagram", type: "url" }),
      ],
    }),
    defineField({ name: "instagramWidgetId", type: "string" }),
    defineField({ name: "seo", type: "seoFields" }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
