import { defineArrayMember, defineField, defineType } from "sanity";

export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "logo", type: "image" }),
    defineField({ name: "heroImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "website", type: "url" }),
    defineField({
      name: "level",
      type: "string",
      options: { list: ["principal", "build", "product", "supporter", "affiliate"] },
      initialValue: "product",
    }),
    defineField({ name: "category", type: "string" }),
    defineField({ name: "summary", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "story", type: "array", of: [defineArrayMember({ type: "block" })] }),
    defineField({
      name: "buildSystems",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "buildSystem" }] })],
    }),
    defineField({ name: "affiliateUrl", type: "url" }),
    defineField({ name: "discountCode", type: "string" }),
    defineField({ name: "disclosure", type: "string" }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "sortOrder", type: "number", initialValue: 99 }),
  ],
  preview: { select: { title: "name", subtitle: "level", media: "logo" } },
});
