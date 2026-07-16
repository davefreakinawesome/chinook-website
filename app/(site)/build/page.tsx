import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Reveal from "@/components/anim/Reveal";
import BuildSystemCard from "@/components/cards/BuildSystemCard";
import { getBuildSystems } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Build",
  description:
    "The complete Chinook build, organised into systems — chassis, powertrain, electrical, fuel and more. A digital workshop manual.",
};

export default async function BuildPage() {
  const systems = await getBuildSystems();
  const categories = Array.from(new Set(systems.map((s) => s.category)));

  return (
    <>
      <PageHeader
        eyebrow="The Build"
        title="A Digital Workshop Manual"
        intro="Every system on the Chinook, documented — the engineering, the decisions, the challenges and the lessons. Explore by system below."
      />

      <Section className="pt-0">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-grey">
            {categories.map((c) => (
              <span key={c} className="border border-line px-3 py-1.5">{c}</span>
            ))}
          </div>
          <Link
            href="/build/timeline"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-accent"
          >
            View build timeline <span>&rarr;</span>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {systems.map((system, i) => (
            <Reveal key={system.id} delay={(i % 3) * 0.06}>
              <BuildSystemCard system={system} index={i} />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
