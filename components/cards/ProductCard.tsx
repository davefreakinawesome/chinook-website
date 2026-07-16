import type { Product } from "@/lib/types";
import { DisclosureBadge } from "@/components/ui/Badges";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import { affiliate, outbound } from "@/lib/affiliate";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const href = product.affiliateUrl
    ? affiliate(product.affiliateUrl, { source: "gear", id: product.slug })
    : product.purchaseUrl
      ? outbound(product.purchaseUrl, { source: "gear", id: product.slug })
      : undefined;

  const inner = (
    <>
      <MediaPlaceholder
        image={product.image}
        label={product.category}
        index={index}
        className="aspect-square w-full"
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-grey">
            {product.brandName ?? product.category}
          </span>
          {product.price && <span className="font-mono text-[0.65rem] text-ash">{product.price}</span>}
        </div>
        <h3 className="mt-2 font-display text-xl leading-none text-bone">{product.name}</h3>
        <p className="editorial mt-2 line-clamp-2 text-sm">{product.summary}</p>
        {product.specifications && product.specifications.length > 0 && (
          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-line pt-4 font-mono text-[0.65rem]">
            {product.specifications.slice(0, 4).map((spec) => (
              <div key={spec.label} className="flex flex-col gap-0.5">
                <dt className="uppercase tracking-[0.14em] text-grey">{spec.label}</dt>
                <dd className="text-bone">
                  {spec.value}
                  {spec.unit ? ` ${spec.unit}` : ""}
                </dd>
              </div>
            ))}
          </dl>
        )}
        <div className="mt-4 flex flex-1 items-end justify-between gap-2">
          <DisclosureBadge status={product.sponsorshipStatus} />
          {href && <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">View &rarr;</span>}
        </div>
      </div>
    </>
  );

  const className =
    "group flex flex-col border border-line bg-graphite/30 transition-colors hover:border-accent/40";

  return href ? (
    <a href={href} target="_blank" rel="nofollow sponsored noopener noreferrer" className={className}>
      {inner}
    </a>
  ) : (
    <div className={className}>{inner}</div>
  );
}
