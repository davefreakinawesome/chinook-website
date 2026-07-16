import { defineArrayMember, defineField, defineType } from "sanity";

export const journalPost = defineType({
  name: "journalPost",
  title: "Journal Post",
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
      name: "contentType",
      type: "string",
      options: {
        list: [
          "Build Update",
          "Technical Guide",
          "Engineering Explanation",
          "Workshop Story",
          "Video Companion Article",
          "Project Reflection",
        ],
      },
    }),
    defineField({ name: "excerpt", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "publishedAt", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "featuredImage", type: "image", options: { hotspot: true } }),
    defineField({
      name: "body",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({ type: "image", options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: "gallery",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
    }),
    defineField({ name: "categories", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "tags", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({
      name: "buildSystems",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "buildSystem" }] })],
    }),
    defineField({
      name: "relatedVideo",
      type: "reference",
      to: [{ type: "video" }],
    }),
    defineField({
      name: "specifications",
      type: "array",
      of: [defineArrayMember({ type: "specification" })],
    }),
    defineField({ name: "seo", type: "seoFields" }),
  ],
  orderings: [
    { title: "Published, newest", name: "pubDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "contentType", media: "featuredImage" },
  },
});
