import { defineArrayMember, defineField, defineType } from "sanity";

export const trip = defineType({
  name: "trip",
  title: "Trip",
  type: "document",
  description: "Travel content — populated once the Chinook hits the road.",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "startDate", type: "date" }),
    defineField({ name: "endDate", type: "date" }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "body", type: "array", of: [defineArrayMember({ type: "block" })] }),
    defineField({
      name: "gallery",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
    }),
  ],
  preview: { select: { title: "title", subtitle: "location", media: "coverImage" } },
});
