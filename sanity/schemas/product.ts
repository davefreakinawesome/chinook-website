import { defineArrayMember, defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product / Gear",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "brand", type: "reference", to: [{ type: "partner" }] }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "category", type: "string", validation: (r) => r.required() }),
    defineField({ name: "summary", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "useCase", type: "text", rows: 2 }),
    defineField({ name: "reasonSelected", title: "Why selected", type: "text", rows: 2 }),
    defineField({ name: "purchaseUrl", type: "url" }),
    defineField({ name: "affiliateUrl", type: "url" }),
    defineField({ name: "discountCode", type: "string" }),
    defineField({
      name: "sponsorshipStatus",
      type: "string",
      options: {
        list: ["personally-purchased", "supplied", "paid-partnership", "affiliate", "loaned"],
      },
      initialValue: "personally-purchased",
      validation: (r) => r.required(),
    }),
    defineField({ name: "price", type: "string" }),
    defineField({ name: "region", type: "string" }),
    defineField({
      name: "specifications",
      type: "array",
      of: [defineArrayMember({ type: "specification" })],
    }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({
      name: "buildSystems",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "buildSystem" }] })],
    }),
  ],
  preview: { select: { title: "name", subtitle: "category", media: "image" } },
});
