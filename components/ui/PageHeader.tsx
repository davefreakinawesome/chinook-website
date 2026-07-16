import AnimatedHeading from "@/components/anim/AnimatedHeading";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  intro?: string;
}

export default function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-line pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,124,85,0.12),transparent_55%)]" />
      </div>
      <div className="container-x relative">
        <p className="label-mono">{eyebrow}</p>
        <AnimatedHeading
          text={title}
          as="h1"
          immediate
          className="mt-4 max-w-4xl font-display text-5xl leading-[0.88] sm:text-6xl md:text-8xl"
        />
        {intro && <p className="editorial mt-6 max-w-2xl text-base md:text-lg">{intro}</p>}
      </div>
    </header>
  );
}
