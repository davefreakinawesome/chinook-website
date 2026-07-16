import Link from "next/link";
import type { BuildSystem } from "@/lib/types";
import { StatusBadge } from "@/components/ui/Badges";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";

export default function BuildSystemCard({ system, index = 0 }: { system: BuildSystem; index?: number }) {
  return (
    <Link
      href={`/build/${system.slug}`}
      className="group relative flex flex-col border border-line bg-graphite/30 transition-colors hover:border-accent/40"
    >
      <MediaPlaceholder
        image={system.heroImage}
        label={system.category}
        index={index}
        className="aspect-[16/10] w-full"
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-grey">
            {String(system.order).padStart(2, "0")} / {system.category}
          </span>
          <StatusBadge status={system.status} />
        </div>
        <h3 className="mt-3 font-display text-2xl leading-none text-bone transition-colors group-hover:text-accent">
          {system.title}
        </h3>
        <p className="editorial mt-2 line-clamp-2 text-sm">{system.summary}</p>
        {typeof system.progress === "number" && (
          <div className="mt-4 flex items-center gap-3">
            <div className="h-[2px] flex-1 bg-line">
              <div className="h-full bg-accent" style={{ width: `${system.progress}%` }} />
            </div>
            <span className="font-mono text-[0.65rem] text-accent">{system.progress}%</span>
          </div>
        )}
      </div>
    </Link>
  );
}
