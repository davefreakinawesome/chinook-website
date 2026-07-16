import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Reveal from "@/components/anim/Reveal";
import VehicleHotspots from "@/components/vehicle/VehicleHotspots";

export const metadata: Metadata = {
  title: "The Story",
  description:
    "What the Chinook is, why it's rare, why it's being rebuilt, and where it will travel.",
};

const chapters = [
  {
    n: "01",
    title: "What the Chinook Is",
    body: "A rare 1978 Toyota Chinook — a fibreglass camper body originally built on an early Hilux. An oddball adventure vehicle decades ahead of the overlanding trend.",
  },
  {
    n: "02",
    title: "Why It's Rare",
    body: "Few were built, fewer survive, and almost none in a state worth transforming. The character of the body is irreplaceable — but the running gear underneath was never built for what's coming.",
  },
  {
    n: "03",
    title: "Why It's Being Rebuilt",
    body: "Rather than a faithful restoration, this is a complete reimagining: the vintage body onto a modified 1997 LandCruiser 80 Series chassis, with a 6.0-litre V8, a six-speed automatic and a fully custom electrical platform.",
  },
  {
    n: "04",
    title: "What It Will Become",
    body: "A highly capable, Australian-engineered overland vehicle — vintage on the outside, modern engineering underneath, complied for the road and prepared for remote travel.",
  },
  {
    n: "05",
    title: "Where It Will Travel",
    body: "Ultimately, trips throughout Australia — including remote and desert crossings. The build is only the beginning.",
  },
];

export default function StoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Project Story"
        title="A Rare Toyota, Reimagined"
        intro="From forgotten camper to outback explorer — the full story of Chinook Overlander."
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
