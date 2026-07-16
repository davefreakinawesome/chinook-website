import Link from "next/link";
import AnimatedHeading from "@/components/anim/AnimatedHeading";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  intro?: string;
  link?: { label: string; href: string };
  className?: string;
}

export default function SectionHeader({ eyebrow, title, intro, link, className }: SectionHeaderProps) {
  return (
    <div className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${className ?? ""}`}>
      <div className="max-w-3xl">
        <p className="label-mono">{eyebrow}</p>
        <AnimatedHeading
          text={title}
          className="mt-4 font-display text-4xl leading-[0.9] sm:text-5xl md:text-6xl"
        />
        {intro && <p className="editorial mt-5 max-w-xl text-base md:text-lg">{intro}</p>}
      </div>
      {link && (
        <Link
          href={link.href}
          className="group inline-flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-bone/80 transition-colors hover:text-accent"
        >
          {link.label}
          <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
        </Link>
      )}
    </div>
  );
}
