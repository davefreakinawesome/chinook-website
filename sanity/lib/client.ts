import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, sanityConfigured } from "@/sanity/env";

export const client = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;

/** Safe query helper: returns null when Sanity isn't configured. */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  revalidate = 60,
): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate },
    });
  } catch (err) {
    console.error("[sanity] fetch failed:", err);
    return null;
  }
}
