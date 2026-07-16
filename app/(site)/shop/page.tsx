import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Reveal from "@/components/anim/Reveal";
import NewsletterForm from "@/components/forms/NewsletterForm";
import { getShopProducts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Chinook Overlander merch and digital downloads — tees, stickers, prints, CAD templates and build guides. Opening soon.",
};

export default async function ShopPage() {
  // Shop is hidden for now — return 404 until ready to launch
  notFound();

  const products = await getShopProducts();
  const physical = products.filter((p) => p.type === "physical");
  const digital = products.filter((p) => p.type === "digital");

  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="Merch & Downloads"
        intro="Support the build and take a piece of the project with you. The store is opening soon — join the list to hear the moment it drops."
      />

      <Section className="pt-0">
        <ShopGroup title="Merchandise" products={physical} />
        <div className="mt-16">
          <ShopGroup title="Digital Products" products={digital} />
        </div>

        <div className="mt-16 grid gap-8 border border-accent/20 bg-accent/[0.03] p-8 md:grid-cols-2 md:items-center md:p-12">
          <div>
            <p className="label-mono">Be First</p>
            <h2 className="mt-3 font-display text-3xl uppercase leading-none md:text-4xl">
              Get notified when the shop opens
            </h2>
          </div>
          <NewsletterForm compact />
        </div>
      </Section>
    </>
  );
}

function ShopGroup({ title, products }: { title: string; products: Awaited<ReturnType<typeof getShopProducts>> }) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <h2 className="font-display text-2xl uppercase leading-none text-accent">{title}</h2>
        <span className="h-px flex-1 bg-line" />
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((product, i) => (
          <Reveal key={product.id} delay={(i % 4) * 0.05}>
            <div className="group relative flex h-full flex-col border border-line bg-graphite/30">
              <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-graphite to-charcoal">
                {product.comingSoon && (
                  <span className="absolute right-3 top-3 border border-accent/40 px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-accent">
                    Soon
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-grey">
                  {product.type}
                </span>
                <h3 className="mt-1 font-display text-lg uppercase leading-none text-bone">{product.name}</h3>
                <p className="editorial mt-2 line-clamp-2 flex-1 text-sm">{product.summary}</p>
                <p className="mt-3 font-mono text-xs text-accent">
                  {product.price === 0 ? "Free" : `$${product.price} ${product.currency}`}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
