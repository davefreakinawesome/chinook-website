import Link from "next/link";
import Hero from "@/components/home/Hero";
import BuildStatusHUD from "@/components/home/BuildStatusHUD";
import LatestEpisode from "@/components/home/LatestEpisode";
import VehicleHotspots from "@/components/vehicle/VehicleHotspots";
import InstagramFeed from "@/components/social/InstagramFeed";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/anim/Reveal";
import JournalCard from "@/components/cards/JournalCard";
import PartnerCard from "@/components/cards/PartnerCard";
import ProductCard from "@/components/cards/ProductCard";
import NewsletterForm from "@/components/forms/NewsletterForm";
import AnimatedHeading from "@/components/anim/AnimatedHeading";
import JsonLd from "@/components/seo/JsonLd";
import { social } from "@/lib/site";
import {
  getLatestVideo,
  getFeaturedPosts,
  getFeaturedPartners,
  getProducts,
  getShopProducts,
} from "@/lib/content";

export default async function HomePage() {
  const [latest, stories, partners, gear, shop] = await Promise.all([
    getLatestVideo(),
    getFeaturedPosts(3),
    getFeaturedPartners(),
    getProducts(),
    getShopProducts(),
  ]);

  return (
    <>
      <JsonLd />
      <Hero />

      {/* Build status */}
      <Section className="pt-4 md:pt-8">
        <Reveal>
          <BuildStatusHUD />
        </Reveal>
      </Section>

      {/* Latest episode */}
      {latest && (
        <Section className="border-t border-line">
          <SectionHeader
            eyebrow="Latest Episode"
            title="Watch the Build"
            link={{ label: "All episodes", href: "/watch" }}
          />
          <Reveal className="mt-12">
            <LatestEpisode video={latest} />
          </Reveal>
        </Section>
      )}

      {/* Project intro */}
      <Section className="border-t border-line">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className="label-mono">The Project</p>
            <AnimatedHeading
              text="A forgotten camper, reimagined."
              className="mt-4 font-display text-4xl leading-[0.9] sm:text-5xl md:text-6xl"
            />
          </div>
          <Reveal className="editorial space-y-4 text-base md:text-lg">
            <p>
              The Chinook is a rare 1978 Toyota camper, originally built on an early Hilux. This
              project rebuilds that character-rich body onto a modified 1997 LandCruiser 80 Series
              chassis, powered by a 6.0-litre V8 and a six-speed automatic.
            </p>
            <p>
              It is vintage on the outside and modern engineering underneath — fabrication, CAD,
              electronics and 3D printing combined into one capable machine, engineered and complied
              for remote Australian travel.
            </p>
            <Link
              href="/story"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-accent"
            >
              Read the full story <span>&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* Interactive build overview */}
      <Section className="border-t border-line">
        <SectionHeader
          eyebrow="Interactive Overview"
          title="Explore the Chinook"
          intro="Every major system, mapped onto the vehicle. Tap a point to dive into the engineering behind it."
        />
        <div className="mt-12">
          <VehicleHotspots />
        </div>
      </Section>

      {/* Featured stories */}
      <Section className="border-t border-line">
        <SectionHeader
          eyebrow="Build Stories"
          title="From the Journal"
          link={{ label: "All journal entries", href: "/journal" }}
        />
        <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-3">
          {stories.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.08}>
              <JournalCard post={post} index={i} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Instagram */}
      <Section className="border-t border-line">
        <SectionHeader
          eyebrow="Recent Instagram"
          title="From the Workshop"
          link={{ label: "Follow along", href: social.instagram }}
        />
        <div className="mt-12">
          <InstagramFeed />
        </div>
      </Section>

      {/* Partners */}
      <Section className="border-t border-line">
        <SectionHeader
          eyebrow="Partners"
          title="Who Backs the Build"
          intro="The brands whose products are genuinely integrated into the Chinook."
          link={{ label: "All partners", href: "/partners" }}
        />
        <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
          {partners.map((partner, i) => (
            <PartnerCard key={partner.id} partner={partner} featured={i === 0} />
          ))}
        </div>
      </Section>

      {/* Gear */}
      <Section className="border-t border-line">
        <SectionHeader
          eyebrow="Gear Used"
          title="What's on the Build"
          link={{ label: "Full gear directory", href: "/gear" }}
        />
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {gear.filter((g) => g.featured).slice(0, 4).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </Section>

      {/* Newsletter */}
      <Section className="border-t border-line">
        <div className="grid gap-10 border border-accent/20 bg-accent/[0.03] p-8 md:grid-cols-2 md:items-center md:p-14">
          <div>
            <p className="label-mono">Join the Journey</p>
            <AnimatedHeading
              text="Follow the build beyond the algorithm."
              className="mt-4 font-display text-4xl leading-[0.9] md:text-5xl"
            />
            <p className="editorial mt-4 max-w-md">
              New episodes, build breakdowns, technical lessons, sponsor offers and the first
              stories from the road.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </Section>

      {/* Shop preview */}
      <Section className="border-t border-line">
        <SectionHeader
          eyebrow="Shop"
          title="Merch & Downloads"
          intro="Support the build. Store opening soon — join the list to hear first."
          link={{ label: "Preview the shop", href: "/shop" }}
        />
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {shop.slice(0, 4).map((product, i) => (
            <div key={product.id} className="group relative border border-line bg-graphite/30">
              <div className="aspect-square w-full bg-gradient-to-br from-graphite to-charcoal" />
              <div className="p-4">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-grey">
                  {product.type}
                </span>
                <h3 className="mt-1 font-display text-lg uppercase leading-none text-bone">{product.name}</h3>
                <p className="mt-2 font-mono text-xs text-accent">
                  {product.comingSoon ? "Coming soon" : `$${product.price} ${product.currency}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="border-t border-line text-center" bleed>
        <div className="container-x">
          <p className="label-mono justify-center">The build is only the beginning</p>
          <AnimatedHeading
            text="Vintage Toyota. Modern Engineering. Australian Adventure."
            as="h2"
            className="mx-auto mt-6 max-w-4xl font-display text-5xl leading-[0.9] md:text-7xl"
          />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/story" className="btn btn-primary">Watch the Story</Link>
            <Link href="/build" className="btn btn-ghost">Explore the Build</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
