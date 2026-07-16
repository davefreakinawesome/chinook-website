import Image from "next/image";
import type { ImageAsset } from "@/lib/types";

interface MediaPlaceholderProps {
  image?: ImageAsset;
  label?: string;
  className?: string;
  index?: number;
  priority?: boolean;
}

const tints = [
  "from-cream-2 to-cream",
  "from-cream-3 to-cream-2",
  "from-gold/30 to-cream-2",
  "from-cream-2 to-cream-3",
];

/**
 * Renders a real image when provided, otherwise a branded "technical" tile
 * so the layout looks intentional before photography is added.
 */
export default function MediaPlaceholder({
  image,
  label = "Image pending",
  className,
  index = 0,
  priority,
}: MediaPlaceholderProps) {
  if (image?.src) {
    return (
      <div className={`relative overflow-hidden ${className ?? ""}`}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${tints[index % tints.length]} ${className ?? ""}`}
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(46,52,73,0.08) 10px, rgba(46,52,73,0.08) 11px)",
        }}
      />
      <div className="absolute left-3 top-3 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 bg-accent" />
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink/45">{label}</span>
      </div>
      <svg className="absolute bottom-3 right-3 text-ink/20" width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M2 16h4l2-8h8l2 8h4" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="8" cy="18" r="2" stroke="currentColor" strokeWidth="1.1" />
        <circle cx="16" cy="18" r="2" stroke="currentColor" strokeWidth="1.1" />
      </svg>
    </div>
  );
}
