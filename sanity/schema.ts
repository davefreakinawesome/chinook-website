import type { SchemaTypeDefinition } from "sanity";
import { seoFields, specification, download } from "./schemas/objects";
import { buildSystem } from "./schemas/buildSystem";
import { journalPost } from "./schemas/journalPost";
import { partner } from "./schemas/partner";
import { product } from "./schemas/product";
import { video } from "./schemas/video";
import { buildMilestone } from "./schemas/buildMilestone";
import { trip } from "./schemas/trip";
import { siteSettings } from "./schemas/siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // objects
    seoFields,
    specification,
    download,
    // documents
    buildSystem,
    journalPost,
    partner,
    product,
    video,
    buildMilestone,
    trip,
    siteSettings,
  ],
};
