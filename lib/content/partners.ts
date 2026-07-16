import type { Partner } from "@/lib/types";

/** Current partners and sponsors backing the Chinook Overlander build. */
export const partners: Partner[] = [
  {
    id: "pt-freakin-awesome",
    name: "Freakin' Awesome",
    slug: "freakin-awesome",
    level: "principal",
    category: "Media & Production",
    summary:
      "The founder-run media agency behind the films, photography and this website.",
    website: "https://www.freakinawesome.com.au/",
    logo: {
      src: "/partners/freakin-awesome.png",
      alt: "Freakin' Awesome logo",
      width: 520,
      height: 274,
    },
    story: [
      "Freakin' Awesome is our own creative studio — the only people dedicated to helping adventure brands and creators. Every episode, photo set and line of code on this site comes out of that same workshop.",
      "A decade of Shopify builds, marketing strategy and go-get-it content creation for automotive and outdoor brands is what makes it possible to document a build of this size properly.",
    ],
    disclosure: "Founder-owned media company. Produces the content and this site.",
    featured: true,
    sortOrder: 1,
  },
  {
    id: "pt-kmc",
    name: "KMC Wheels",
    slug: "kmc-wheels",
    level: "build",
    category: "Wheels",
    summary:
      "KM552 IMS monoblock wheels — simulated beadlock looks, built to carry the loaded overland weight of the Chinook.",
    website: "https://www.wheelprosaustralia.com.au/wheels/kmc/",
    logo: {
      src: "/partners/kmc.png",
      alt: "KMC Wheels logo",
      width: 500,
      height: 190,
    },
    story: [
      "A camper this heavy needs a wheel that can take a hit and hold pressure when the tyres are aired down. KMC supplies the rolling stock that sits under every corner of the build — the KM552 IMS, a reimagined version of their famous Impact race wheel with monoblock construction and a simulated beadlock ring.",
      "Ours run 17×8.5 with a −10 offset on the 80 Series' 6×139.7 pattern, filling the arches while clearing the big brakes. Distributed in Australia by Wheel Pros, the IMS pairs with the Fuel rubber for a package that's equal parts capable and clean.",
    ],
    productSlugs: ["kmc-km552-ims"],
    buildSystemSlugs: ["80-series-chassis"],
    disclosure: "Wheels supplied for the build via Wheel Pros Australia.",
    featured: true,
    sortOrder: 2,
  },
  {
    id: "pt-fuel-offroad",
    name: "Fuel Off-Road",
    slug: "fuel-offroad",
    level: "build",
    category: "Tyres",
    summary:
      "Gripper M/T mud-terrains — 33-inch rubber load-rated for a fully-laden touring rig.",
    website: "https://www.fueloffroad.com/tires",
    logo: {
      src: "/partners/fuel.png",
      alt: "Fuel Off-Road logo",
      width: 900,
      height: 152,
    },
    story: [
      "The Fuel Gripper M/T is engineered to withstand the harshest off-road conditions while still driving quietly on the road between adventures — exactly what a long-haul camper needs. Ours run 33×12.50R17 in a Load Range E carcass for the weight we carry.",
      "Also distributed by Wheel Pros in Australia, Fuel's rubber wraps the KMC wheels for a matched, purpose-built package.",
    ],
    productSlugs: ["fuel-gripper-mt"],
    buildSystemSlugs: ["80-series-chassis"],
    disclosure: "Tyres supplied for the build via Wheel Pros Australia.",
    featured: true,
    sortOrder: 3,
  },
  {
    id: "pt-kc-hilites",
    name: "KC HiLiTES Australia",
    slug: "kc-hilites",
    level: "product",
    category: "Lighting",
    summary:
      "Fifty years of off-road lighting lighting up the tracks after dark.",
    website: "https://kchilites.com.au/",
    logo: {
      src: "/partners/kc-hilites.png",
      alt: "KC HiLiTES logo",
      width: 600,
      height: 601,
    },
    story: [
      "KC HiLiTES has been building off-road lights in the USA for 50 years. The FLEX ERA range throws the light we need for remote night driving and setting up camp after dark.",
      "FLEX ERA 4s run as ditch lights and across the front bar for long-range reach, while compact FLEX ERA 1s handle rear and side scene lighting around the habitat.",
    ],
    productSlugs: ["kc-flex-era-4", "kc-flex-era-1"],
    buildSystemSlugs: ["electrical-control-systems"],
    disclosure: "Part sponsor — lighting supplied for the build.",
    featured: true,
    sortOrder: 4,
  },
];
