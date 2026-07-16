export const site = {
  name: "Chinook Overlander",
  shortName: "Chinook",
  tagline: "Vintage Toyota. Modern Engineering. Australian Adventure.",
  description:
    "A rare 1978 Toyota Chinook camper rebuilt on an 80 Series LandCruiser chassis, powered by a 6.0-litre V8 and engineered for remote Australian travel.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://chinookoverlander.com",
  locale: "en_AU",
  // Public channel id for @ChinookOverlander — enables the keyless RSS feed
  // out of the box. Override via env if it ever changes.
  youtubeChannelId: process.env.YOUTUBE_CHANNEL_ID ?? "UCN1_yGJq165XCwl7UmYbhqQ",
  instagramHandle: "chinookoverlander",
  email: "hello@chinookoverlander.com",
  sponsorEmail: "partners@chinookoverlander.com",
} as const;

export const social = {
  youtube: "https://www.youtube.com/@ChinookOverlander",
  instagram: "https://www.instagram.com/chinookoverlander/",
} as const;

export type NavItem = { label: string; href: string; number: string };

export const primaryNav: NavItem[] = [
  { label: "The Build", href: "/build", number: "01" },
  { label: "Journal", href: "/journal", number: "02" },
  { label: "Watch", href: "/watch", number: "03" },
  { label: "Partners", href: "/partners", number: "04" },
  { label: "Gear", href: "/gear", number: "05" },
  { label: "About", href: "/about", number: "06" },
];

export const footerNav: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "The Project",
    links: [
      { label: "The Build", href: "/build" },
      { label: "Build Timeline", href: "/build/timeline" },
      { label: "The Story", href: "/story" },
      { label: "About Dave", href: "/about" },
    ],
  },
  {
    title: "Content",
    links: [
      { label: "Build Journal", href: "/journal" },
      { label: "Watch", href: "/watch" },
      { label: "Gear Directory", href: "/gear" },
    ],
  },
  {
    title: "Partners",
    links: [
      { label: "Our Partners", href: "/partners" },
      { label: "Become a Partner", href: "/partners/enquire" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
    ],
  },
];

/** Editable in siteSettings later; drives the homepage HUD. */
export const buildStatus = {
  currentPhase: "Drivetrain Integration",
  nextMilestone: "Engine & Transmission Mounting",
  progress: 42,
  lastUpdate: "2026-07-14",
} as const;
