import { groq } from "next-sanity";

const imageProjection = `{ "src": asset->url, "alt": coalesce(alt, ""), "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height }`;

export const buildSystemsQuery = groq`
  *[_type == "buildSystem"] | order(order asc) {
    "id": _id, title, "slug": slug.current, category, summary, status, progress, order,
    "heroImage": heroImage${imageProjection}
  }
`;

export const buildSystemBySlugQuery = groq`
  *[_type == "buildSystem" && slug.current == $slug][0] {
    "id": _id, title, "slug": slug.current, category, summary, status, progress, order,
    "body": body[].children[].text,
    "heroImage": heroImage${imageProjection},
    specifications[]{ label, value, unit },
    challenges, decisions, lessons,
    "relatedPartnerSlugs": relatedPartners[]->slug.current
  }
`;

export const journalPostsQuery = groq`
  *[_type == "journalPost"] | order(publishedAt desc) {
    "id": _id, title, "slug": slug.current, excerpt, contentType,
    "publishedAt": publishedAt, featured, categories, tags,
    "featuredImage": featuredImage${imageProjection}
  }
`;

export const journalPostBySlugQuery = groq`
  *[_type == "journalPost" && slug.current == $slug][0] {
    "id": _id, title, "slug": slug.current, excerpt, contentType,
    "publishedAt": publishedAt, categories, tags,
    "body": body[].children[].text,
    "featuredImage": featuredImage${imageProjection},
    specifications[]{ label, value, unit },
    "buildSystemSlugs": buildSystems[]->slug.current
  }
`;

export const partnersQuery = groq`
  *[_type == "partner"] | order(sortOrder asc) {
    "id": _id, name, "slug": slug.current, level, category, summary, website,
    affiliateUrl, discountCode, disclosure, featured, sortOrder,
    "logo": logo${imageProjection}
  }
`;

export const productsQuery = groq`
  *[_type == "product"] {
    "id": _id, name, "slug": slug.current, category, summary, useCase, reasonSelected,
    purchaseUrl, affiliateUrl, discountCode, sponsorshipStatus, price, region, featured,
    specifications[]{ label, value, unit },
    "brandName": brand->name, "brandSlug": brand->slug.current,
    "image": image${imageProjection}
  }
`;

export const milestonesQuery = groq`
  *[_type == "buildMilestone"] | order(order asc) {
    "id": _id, title, "slug": slug.current, date, status, summary, order
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] { title, tagline, description, buildStatus, social, instagramWidgetId }
`;
