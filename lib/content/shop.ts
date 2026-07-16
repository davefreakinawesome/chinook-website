import type { ShopProduct } from "@/lib/types";

/** Shop is preview-only for launch. Checkout is stubbed pending Shopify. */
export const shopProducts: ShopProduct[] = [
  { id: "sp-tee", name: "Chinook Overlander Tee", slug: "chinook-tee", type: "physical", price: 45, currency: "AUD", summary: "Heavyweight tee with the workshop-line Chinook mark.", comingSoon: true },
  { id: "sp-hoodie", name: "Workshop Hoodie", slug: "workshop-hoodie", type: "physical", price: 89, currency: "AUD", summary: "Heavy fleece hoodie for cold-shed mornings.", comingSoon: true },
  { id: "sp-cap", name: "Trucker Cap", slug: "trucker-cap", type: "physical", price: 39, currency: "AUD", summary: "Structured cap with embroidered Chinook badge.", comingSoon: true },
  { id: "sp-sticker", name: "Sticker Pack", slug: "sticker-pack", type: "physical", price: 12, currency: "AUD", summary: "Weatherproof decals for the toolbox and rig.", comingSoon: true },
  { id: "sp-print", name: "Chinook Illustration Print", slug: "illustration-print", type: "physical", price: 55, currency: "AUD", summary: "Archival print of the Chinook render.", comingSoon: true },
  { id: "sp-buildplan", name: "The Complete Build Plan (PDF)", slug: "build-plan-pdf", type: "digital", price: 19, currency: "AUD", summary: "The full system-by-system Chinook build plan.", comingSoon: true },
  { id: "sp-cad", name: "Engine Plate CAD Templates", slug: "engine-plate-cad", type: "digital", price: 29, currency: "AUD", summary: "Reference CAD files for the V8 mounting plates.", comingSoon: true },
  { id: "sp-checklist", name: "Overland Build Checklist", slug: "build-checklist", type: "digital", price: 0, currency: "AUD", summary: "Free workshop and build planning checklist.", comingSoon: true },
];
