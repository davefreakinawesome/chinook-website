import { defineField, defineType } from "sanity";

export const seoFields = defineType({
  name: "seoFields",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: "title", title: "SEO Title", type: "string" }),
    defineField({ name: "description", title: "Meta Description", type: "text", rows: 3 }),
    defineField({ name: "image", title: "Social Image", type: "image" }),
  ],
});

export const specification = defineType({
  name: "specification",
  title: "Specification",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "value", type: "string", validation: (r) => r.required() }),
    defineField({ name: "unit", type: "string" }),
  ],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
});

export const download = defineType({
  name: "download",
  title: "Download",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "fileType", type: "string" }),
    defineField({ name: "file", type: "file" }),
  ],
});
