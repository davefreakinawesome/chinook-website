/**
 * Content access layer. Reads from Sanity when configured (via GROQ), and
 * otherwise falls back to typed seed content so the site runs fully without any
 * external services. Videos always merge the live YouTube feed on top.
 */
import { buildSystems } from "./build-systems";
import { journalPosts } from "./journal";
import { partners } from "./partners";
import { products } from "./products";
import { milestones } from "./milestones";
import { shopProducts } from "./shop";
import { getYouTubeVideos } from "@/lib/youtube";
import { sanityFetch } from "@/sanity/lib/client";
import {
  buildSystemsQuery,
  buildSystemBySlugQuery,
  journalPostsQuery,
  journalPostBySlugQuery,
  partnersQuery,
  productsQuery,
  milestonesQuery,
} from "@/sanity/lib/queries";
import type {
  BuildSystem,
  JournalPost,
  Partner,
  Product,
  Video,
  BuildMilestone,
  ShopProduct,
} from "@/lib/types";

const byDateDesc = (a: { publishedAt: string }, b: { publishedAt: string }) =>
  b.publishedAt.localeCompare(a.publishedAt);

/** Use Sanity result when it's a non-empty array, else the seed fallback. */
async function fromSanityOrSeed<T>(query: string, seed: T[], params: Record<string, unknown> = {}): Promise<T[]> {
  const live = await sanityFetch<T[]>(query, params);
  return live && live.length > 0 ? live : seed;
}

// --- Build systems ---
export async function getBuildSystems(): Promise<BuildSystem[]> {
  const list = await fromSanityOrSeed(buildSystemsQuery, buildSystems);
  return [...list].sort((a, b) => a.order - b.order);
}
export async function getBuildSystem(slug: string): Promise<BuildSystem | undefined> {
  const live = await sanityFetch<BuildSystem>(buildSystemBySlugQuery, { slug });
  return live ?? buildSystems.find((b) => b.slug === slug);
}

// --- Journal ---
export async function getJournalPosts(): Promise<JournalPost[]> {
  const list = await fromSanityOrSeed(journalPostsQuery, journalPosts);
  return [...list].sort(byDateDesc);
}
export async function getJournalPost(slug: string): Promise<JournalPost | undefined> {
  const live = await sanityFetch<JournalPost>(journalPostBySlugQuery, { slug });
  return live ?? journalPosts.find((p) => p.slug === slug);
}
export async function getFeaturedPosts(limit = 6): Promise<JournalPost[]> {
  return (await getJournalPosts()).filter((p) => p.featured).slice(0, limit);
}

// --- Partners ---
export async function getPartners(): Promise<Partner[]> {
  const list = await fromSanityOrSeed(partnersQuery, partners);
  return [...list].sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99));
}
export async function getPartner(slug: string): Promise<Partner | undefined> {
  return (await getPartners()).find((p) => p.slug === slug);
}
export async function getFeaturedPartners(): Promise<Partner[]> {
  return (await getPartners()).filter((p) => p.featured);
}

// --- Products / gear ---
export async function getProducts(): Promise<Product[]> {
  return fromSanityOrSeed(productsQuery, products);
}
export async function getProduct(slug: string): Promise<Product | undefined> {
  return (await getProducts()).find((p) => p.slug === slug);
}
export async function getProductsByPartner(partnerSlug: string): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.brandSlug === partnerSlug);
}

// --- Videos (live YouTube when configured, else manual fallback) ---
export async function getVideos(): Promise<Video[]> {
  const all = await getYouTubeVideos();
  return [...all].sort(byDateDesc);
}
export async function getLatestVideo(): Promise<Video | undefined> {
  const all = await getVideos();
  return all.find((v) => v.featured) ?? all[0];
}

// --- Milestones ---
export async function getMilestones(): Promise<BuildMilestone[]> {
  const list = await fromSanityOrSeed(milestonesQuery, milestones);
  return [...list].sort((a, b) => a.order - b.order);
}

// --- Shop (seed only for launch; checkout stubbed) ---
export async function getShopProducts(): Promise<ShopProduct[]> {
  return shopProducts;
}
