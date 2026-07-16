"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { buildStatus } from "@/lib/site";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(el);

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(q("[data-hero-line] > span"), { yPercent: 120, duration: 1.1, stagger: 0.08 })
        .from(q("[data-hero-render]"), { opacity: 0, scale: 1.05, duration: 1.4 }, 0.15)
        .from(q("[data-hero-meta]"), { opacity: 0, y: 18, duration: 0.8, stagger: 0.08 }, 0.5);

      gsap.to(q("[data-hero-render]"), {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-6 pt-20 md:pt-24"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,124,85,0.16),transparent_62%)]" />
        <div className="absolute inset-x-0 top-[38%] -translate-y-1/2 text-center">
          <span className="select-none font-display text-[26vw] uppercase leading-none text-ink/[0.05]">
            Chinook
          </span>
        </div>
      </div>

      {/* Headline */}
      <div className="container-x relative z-10">
        <div className="flex items-center gap-3" data-hero-meta>
          <span className="h-1.5 w-1.5 bg-accent" />
          <span className="label-mono">One-of-One Extreme Build — Est. 2026</span>
        </div>
        <h1 className="mt-4 font-display text-[13vw] leading-[0.84] sm:text-7xl md:text-8xl lg:text-[7.5rem]">
          <span data-hero-line className="block overflow-hidden">
            <span className="inline-block">1978 Toyota</span>
          </span>
          <span data-hero-line className="block overflow-hidden">
            <span className="inline-block text-accent">Chinook</span>
            <span className="inline-block">, Rebuilt</span>
          </span>
        </h1>
      </div>

      {/* Render fills remaining space */}
      <div data-hero-render className="relative z-0 mx-auto -my-2 min-h-0 w-full max-w-5xl flex-1">
        <Image
          src="/vehicle/chinook-cartoon.png"
          alt="The extremely engineered 1978 Toyota Chinook vintage 4x4 camper"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-contain"
        />
      </div>

      {/* Copy + CTAs */}
      <div className="container-x relative z-10">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <p className="editorial max-w-md text-sm md:text-base" data-hero-meta>
            An extremely engineered vintage 4x4 camper: rare Toyota body, 80 Series LandCruiser
            chassis, 6.0-litre V8 — a unique build designed for serious Australian adventure.
          </p>
          <div className="flex flex-wrap gap-3" data-hero-meta>
            <Link href="/watch" className="btn btn-primary">Watch the Latest Episode</Link>
            <Link href="/build" className="btn btn-ghost">Explore the Build</Link>
          </div>
        </div>

        <div className="mt-6 border-t border-line pt-4" data-hero-meta>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-grey">
            <span>Current Phase: <span className="text-accent">{buildStatus.currentPhase}</span></span>
            <span>Progress: <span className="text-bone">{buildStatus.progress}%</span></span>
            <span className="hidden sm:inline">Chassis: 80 Series</span>
            <span className="hidden sm:inline">Engine: L98 6.0L V8</span>
            <span className="hidden md:inline">Trans: 6L80E</span>
          </div>
        </div>
      </div>
    </section>
  );
}
