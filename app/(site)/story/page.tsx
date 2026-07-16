import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Reveal from "@/components/anim/Reveal";
import VehicleHotspots from "@/components/vehicle/VehicleHotspots";

export const metadata: Metadata = {
  title: "The Story",
  description:
    "What the Chinook is, why it's rare, how it became an extremely engineered vintage 4x4 camper, and where this unique build will travel.",
};

const chapters = [
  {
    n: "01",
    title: "What the Chinook Is",
    body: "A rare 1978 Toyota Chinook — a fibreglass vintage camper body originally built on an early Hilux. An oddball adventure vehicle decades ahead of the overlanding trend, and the foundation for something extreme.",
  },
  {
    n: "02",
    title: "Why It's Rare",
    body: "Few were built, fewer survive, and almost none in a state worth transforming. The character of this vintage body is irreplaceable — but the running gear underneath was never built for what's coming.",
  },
  {
    n: "03",
    title: "Why It's Being Rebuilt",
    body: "Rather than a faithful restoration, this is an extreme rebuild: the vintage camper body onto a modified 1997 LandCruiser 80 Series chassis, with a 6.0-litre V8, a six-speed automatic and a fully custom electrical platform. A unique build from the ground up.",
  },
  {
    n: "04",
    title: "What It Will Become",
    body: "An extremely engineered vintage 4x4 camper — vintage on the outside, serious engineering underneath, complied for the road and built for the harshest terrain Australia can throw at it.",
  },
  {
    n: "05",
    title: "Where It Will Travel",
    body: "Throughout Australia — including remote and desert crossings that demand an extreme camper. This unique build is just the beginning.",
  },
];

export default function StoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Project Story"
        title="A Rare Toyota, Extremely Rebuilt"
        intro="From forgotten vintage camper to extreme 4x4 — the full story of Chinook Overlander."
      />

      <Section className="pt-0">
        <div className="mx-auto max-w-3xl">
          {chapters.map((c, i) => (
            <Reveal key={c.n} delay={(i % 3) * 0.05}>
              <div className="flex gap-6 border-t border-line py-10 first:border-t-0">
                <span className="font-mono text-sm text-accent">{c.n}</span>
                <div>
                  <h2 className="font-display text-3xl uppercase leading-none md:text-4xl">{c.title}</h2>
                  <p className="editorial mt-3 text-lg">{c.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="label-mono justify-center">Explore the Machine</p>
          <h2 className="mt-4 font-display text-4xl uppercase leading-none md:text-5xl">Every System, Mapped</h2>
        </div>
        <VehicleHotspots />
        <div className="mt-12 text-center">
          <Link href="/build" className="btn btn-primary">Explore the Full Build</Link>
        </div>
      </Section>
    </>
  );
}
