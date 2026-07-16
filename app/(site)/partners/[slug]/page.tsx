import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Section from "@/components/ui/Section";
import ProductCard from "@/components/cards/ProductCard";
import { PartnerLevelBadge } from "@/components/ui/Badges";
import { affiliate, outbound } from "@/lib/affiliate";
import {
  getPartners,
  getPartner,
  getProductsByPartner,
  getBuildSystem,
} from "@/lib/content";

export async function generateStaticParams() {
  const partners = await getPartners();
  return partners.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const partner = await getPartner(slug);
  if (!partner) return {};
  return { title: partner.name, description: partner.summary };
}

export default async function PartnerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const partner = await getPartner(slug);
  if (!partner) notFound();

  const products = await getProductsByPartner(slug);
  const systems = (
    await Promise.all((partner.buildSystemSlugs ?? []).map((s) => getBuildSystem(s)))
  ).filter(Boolean);

  const link = partner.affiliateUrl
    ? affiliate(partner.affiliateUrl, { source: "partner", id: partner.slug })
    : partner.website
      ? outbound(partner.website, { source: "partner", id: partner.slug })
      : undefined;

  return (
    <>
      <header className="border-b border-line pt-28 md:pt-36">
        <div className="container-x pb-12">
          <div className="flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-grey">
            <Link href="/partners" className="hover:text-accent">Partners</Link>
            <span>/</span>
            <span className="text-accent">{partner.category}</span>
          </div>
          <div className="mt-6">
            <PartnerLevelBadge level={partner.level} />
          </div>
          {partner.logo ? (
            <>
              <div className="relative mt-8 h-24 w-full max-w-sm md:h-28">
                <Image
                  src={partner.logo.src}
                  alt={`${partner.name} logo`}
                  fill
                  sizes="24rem"
                  className="object-contain object-left"
                />
              </div>
              <h1 className="sr-only">{partner.name}</h1>
            </>
          ) : (
            <h1 className="mt-6 font-display text-6xl leading-[0.85] md:text-8xl">{partner.name}</h1>
          )}
          <p className="editorial mt-6 max-w-2xl text-lg">{partner.summary}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {link && (
              <a
                href={link}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="btn btn-primary"
              >
                Visit {partner.name}
              </a>
            )}
            {partner.discountCode && (
              <span className="btn btn-ghost cursor-default">
                Code: {partner.discountCode}
              </span>
            )}
          </div>

          {partner.disclosure && (
            <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-grey">
              Disclosure — {partner.disclosure}
            </p>
          )}
        </div>
      </header>

      {partner.story && (
        <Section>
          <div className="editorial max-w-2xl space-y-5 text-lg">
            {partner.story.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </Section>
      )}

      {systems.length > 0 && (
        <Section className="border-t border-line">
          <span className="label-mono">Where They Appear on the Chinook</span>
          <div className="mt-6 flex flex-wrap gap-3">
            {systems.map((s) => s && (
              <Link
                key={s.id}
                href={`/build/${s.slug}`}
                className="group flex items-center gap-3 border border-line px-5 py-3 transition-colors hover:border-accent/40"
              >
                <span className="font-display text-xl uppercase leading-none text-bone group-hover:text-accent">
                  {s.title}
                </span>
                <span className="text-grey">&rarr;</span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {products.length > 0 && (
        <Section className="border-t border-line">
          <span className="label-mono">Products Used</span>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
