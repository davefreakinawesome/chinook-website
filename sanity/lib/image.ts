import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId, sanityConfigured } from "@/sanity/env";

const builder = sanityConfigured ? imageUrlBuilder({ projectId, dataset }) : null;

export function urlForImage(source: Image): string | undefined {
  if (!builder || !source) return undefined;
  return builder.image(source).auto("format").fit("max").url();
}
