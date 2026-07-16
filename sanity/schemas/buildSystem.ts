import { defineArrayMember, defineField, defineType } from "sanity";

export const buildSystem = defineType({
  name: "buildSystem",
  title: "Build System",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: ["Chassis & Driveline", "Powertrain", "Electrical", "Interior", "Exterior", "Compliance"],
      },
    }),
    defineField({ name: "order", type: "number", initialValue: 99 }),
    defineField({
      name: "status",
      type: "string",
      options: { list: ["planned", "in-progress", "completed", "revised", "on-hold"] },
      initialValue: "planned",
    }),
    defineField({ name: "progress", type: "number", validation: (r) => r.min(0).max(100) }),
    defineField({ name: "summary", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "body", type: "array", of: [defineArrayMember({ type: "block" })] }),
    defineField({ name: "heroImage", type: "image", options: { hotspot: true } }),
    defineField({
      name: "gallery",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
    }),
    defineField({
      name: "specifications",
      type: "array",
      of: [defineArrayMember({ type: "specification" })],
    }),
    defineField({ name: "challenges", type: "text", rows: 3 }),
    defineField({ name: "decisions", title: "Design Decisions", type: "text", rows: 3 }),
    defineField({ name: "lessons", title: "Lessons Learned", type: "text", rows: 3 }),
    defineField({
      name: "relatedVideos",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "video" }] })],
    }),
    defineField({
      name: "relatedPartners",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "partner" }] })],
    }),
    defineField({
      name: "downloads",
      type: "array",
      of: [defineArrayMember({ type: "download" })],
    }),
    defineField({ name: "seo", type: "seoFields" }),
  ],
  orderings: [
    { title: "Build order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "heroImage" },
  },
});
