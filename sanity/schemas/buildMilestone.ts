import { defineField, defineType } from "sanity";

export const buildMilestone = defineType({
  name: "buildMilestone",
  title: "Build Milestone",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "date", type: "string", description: "YYYY or YYYY-MM" }),
    defineField({ name: "order", type: "number", initialValue: 99 }),
    defineField({
      name: "status",
      type: "string",
      options: { list: ["planned", "in-progress", "completed", "revised", "on-hold"] },
      initialValue: "planned",
    }),
    defineField({ name: "summary", type: "text", rows: 2 }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "status" } },
});
