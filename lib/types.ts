/**
 * Content model for Chinook Overlander.
 * Mirrors the Sanity schemas so the seed content and CMS stay in sync.
 */

export type BuildStatus =
  | "planned"
  | "in-progress"
  | "completed"
  | "revised"
  | "on-hold";

export type SponsorshipStatus =
  | "personally-purchased"
  | "supplied"
  | "paid-partnership"
  | "affiliate"
  | "loaned";

export type PartnerLevel =
  | "principal"
  | "build"
  | "product"
  | "supporter"
  | "affiliate";

export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Specification {
  label: string;
  value: string;
  unit?: string;
}

export interface Download {
  title: string;
  fileType: string;
  href: string;
}

export interface BuildSystem {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  body?: string[];
  status: BuildStatus;
  progress?: number;
  heroImage?: ImageAsset;
  gallery?: ImageAsset[];
  specifications?: Specification[];
  challenges?: string;
  decisions?: string;
  lessons?: string;
  relatedVideoIds?: string[];
  relatedPostSlugs?: string[];
  relatedProductSlugs?: string[];
  relatedPartnerSlugs?: string[];
  downloads?: Download[];
  order: number;
}

export interface JournalPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string[];
  contentType: string;
  publishedAt: string;
  updatedAt?: string;
  featuredImage?: ImageAsset;
  gallery?: ImageAsset[];
  categories?: string[];
  tags?: string[];
  buildSystemSlugs?: string[];
  relatedVideoId?: string;
  productSlugs?: string[];
  partnerSlugs?: string[];
  specifications?: Specification[];
  readingMinutes?: number;
  featured?: boolean;
}

export interface Partner {
  id: string;
  name: string;
  slug: string;
  logo?: ImageAsset;
  heroImage?: ImageAsset;
  website?: string;
  level: PartnerLevel;
  category?: string;
  summary: string;
  story?: string[];
  productSlugs?: string[];
  buildSystemSlugs?: string[];
  affiliateUrl?: string;
  discountCode?: string;
  disclosure?: string;
  featured?: boolean;
  sortOrder?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brandSlug?: string;
  brandName?: string;
  image?: ImageAsset;
  category: string;
  summary: string;
  useCase?: string;
  reasonSelected?: string;
  purchaseUrl?: string;
  affiliateUrl?: string;
  discountCode?: string;
  sponsorshipStatus: SponsorshipStatus;
  price?: string;
  region?: string;
  specifications?: Specification[];
  buildSystemSlugs?: string[];
  featured?: boolean;
}

export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  description?: string;
  thumbnail?: ImageAsset;
  publishedAt: string;
  duration?: string;
  playlist?: string;
  episodeNumber?: number;
  featured?: boolean;
  hidden?: boolean;
}

export interface BuildMilestone {
  id: string;
  title: string;
  slug: string;
  date?: string;
  status: BuildStatus;
  summary: string;
  order: number;
}

/** Shop products (physical + digital). Checkout stubbed for launch. */
export interface ShopProduct {
  id: string;
  name: string;
  slug: string;
  type: "physical" | "digital";
  price: number;
  currency: string;
  image?: ImageAsset;
  summary: string;
  comingSoon?: boolean;
}
