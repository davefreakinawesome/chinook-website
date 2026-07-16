import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Reveal from "@/components/anim/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "The builder behind this unique build. Where extreme engineering, vintage camper restoration, and Australian adventure meet.",
};

const disciplines = ["Fabrication", "Engineering", "CAD", "Electronics", "3D Printing", "Web Development", "Storytelling", "Adventure"];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Where Metal Meets Code"
        intro="This unique build is where extreme engineering, vintage camper craftsmanship, and digital storytelling meet — a project that demands the same precision in the workshop and on the screen."
      />

      <Section className="pt-0">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div className="editorial max-w-2xl space-y-5 text-lg">
            <p>
              I&apos;m Dave — a web developer by trade and a builder by obsession. This project is the
              intersection of both: an extremely engineered vintage 4x4 camper, documented through
              an extraordinary digital experience.
            </p>
            <p>
              The Chinook is a serious fabrication and engineering challenge — a rare 1978 vintage
              camper transformed into an extreme 4x4 on a modern LandCruiser platform with a V8
              heart. It&apos;s a unique build, and also a chance to build the kind of website I&apos;d
              want to visit: fast, cinematic, technical and genuinely useful.
            </p>
            <p>
              I&apos;ll share the wins and the mistakes — the failed ideas, the design revisions, the
              budget calls and the lessons. The imperfect journey is the interesting part.
            </p>
            <p>
              The long-term mission is simple: finish this extremely engineered vintage camper, tell
              the story properly, and eventually point it at the horizon and go travelling across
              Australia.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/story" className="btn btn-primary">Read the Project Story</Link>
              <Link href="/partners/enquire" className="btn btn-ghost">Work With Me</Link>
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-line">
              <Image
                src="/about/dave-camp.jpg"
                alt="Dave and the Chinook camped in the Australian bush, pop-top up beside a campfire"
                fill
                sizes="(max-width: 1024px) 100vw, 32rem"
                className="object-cover"
              />
            </div>
            <div className="border border-line">
              <div className="border-b border-line px-4 py-3">
                <span className="label-mono">Disciplines</span>
              </div>
              <div className="flex flex-wrap gap-2 p-4">
                {disciplines.map((d) => (
                  <span key={d} className="border border-line px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ash">
                    {d}
                  </span>
                ))}
              </div>
            </div>
            <Reveal className="border-l-2 border-accent pl-5">
              <p className="editorial text-xl italic text-bone">
                &ldquo;The same attention to detail that goes into the vehicle goes into the
                website. Both are the craft.&rdquo;
              </p>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
