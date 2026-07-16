import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Reveal from "@/components/anim/Reveal";
import { StatusBadge } from "@/components/ui/Badges";
import { formatDate } from "@/lib/format";
import { getMilestones } from "@/lib/content";

export const metadata: Metadata = {
  title: "Build Timeline",
  description: "The Chinook project from finding a forgotten camper to its first Australian trip.",
};

export default async function TimelinePage() {
  const milestones = await getMilestones();

  return (
    <>
      <PageHeader
        eyebrow="Build Timeline"
        title="From Shed to Outback"
        intro="The Chinook project, milestone by milestone — from finding a rare camper to its first remote-area trip."
      />

      <Section className="pt-0">
        <ol className="relative border-l border-line pl-8 md:pl-12">
          {milestones.map((m, i) => (
            <Reveal as="li" key={m.id} delay={(i % 4) * 0.05} className="relative pb-12 last:pb-0">
              <span
                className={`absolute -left-[calc(2rem+7px)] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border md:-left-[calc(3rem+7px)] ${
                  m.status === "completed"
                    ? "border-olive bg-olive"
                    : m.status === "in-progress"
                      ? "border-accent bg-accent"
                      : "border-grey bg-charcoal"
                }`}
              />
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-grey">
                    <span className="text-accent">{String(m.order).padStart(2, "0")}</span>
                    {m.date && <span>{formatDate(m.date)}</span>}
                  </div>
                  <h2 className="mt-1.5 font-display text-3xl uppercase leading-none text-bone md:text-4xl">
                    {m.title}
                  </h2>
                  <p className="editorial mt-2 max-w-xl text-sm">{m.summary}</p>
                </div>
                <StatusBadge status={m.status} />
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>
    </>
  );
}
