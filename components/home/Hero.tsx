"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { buildStatus } from "@/lib/site";

/** Total scroll distance (in vh) the hero stays pinned before releasing. */
const SCROLL_VH = 400;

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const el = root.current;
    const pinEl = pin.current;
    if (!el || !pinEl) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      const phrases = q("[data-phrase]");
      const render = q("[data-hero-render]");

      // Reduced motion: show the first phrase, no pinning, no scrubbing.
      if (prefersReducedMotion()) {
        gsap.set(phrases[0], { autoAlpha: 1 });
        return;
      }

      // Intro reveal on load.
      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      intro
        .from(q("[data-phrase='0'] [data-line-inner]"), {
          yPercent: 120,
          duration: 1.1,
          stagger: 0.08,
        })
        .from(render, { opacity: 0, scale: 1.05, duration: 1.4 }, 0.15)
        .from(q("[data-hero-meta]"), { opacity: 0, y: 18, duration: 0.8, stagger: 0.08 }, 0.5);

      // Stacked phrase starting states.
      gsap.set(phrases[0], { autoAlpha: 1, yPercent: 0 });
      gsap.set([phrases[1], phrases[2]], { autoAlpha: 0, yPercent: 60 });

      // Scrubbed, pinned morph timeline.
      const HOLD = 1.2;
      const XF = 1;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: `+=${SCROLL_VH}%`,
          scrub: 1,
          pin: pinEl,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      let t = HOLD;
      // Phrase 0 -> 1
      tl.to(phrases[0], { autoAlpha: 0, yPercent: -60, ease: "power2.in", duration: XF }, t)
        .fromTo(
          phrases[1],
          { autoAlpha: 0, yPercent: 60 },
          { autoAlpha: 1, yPercent: 0, ease: "power2.out", duration: XF },
          t
        );
      t += XF + HOLD;
      // Phrase 1 -> 2
      tl.to(phrases[1], { autoAlpha: 0, yPercent: -60, ease: "power2.in", duration: XF }, t)
        .fromTo(
          phrases[2],
          { autoAlpha: 0, yPercent: 60 },
          { autoAlpha: 1, yPercent: 0, ease: "power2.out", duration: XF },
          t
        );
      t += XF + HOLD;
      const total = t;

      // Image grows then eases back / drifts across the whole pinned scroll.
      tl.to(
        render,
        {
          keyframes: [
            { scale: 1.28, rotate: -1.4, yPercent: -4, duration: total / 2 },
            { scale: 1.06, rotate: 1.6, yPercent: 6, duration: total / 2 },
          ],
          ease: "none",
        },
        0
      );
    }, el);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section ref={root} className="relative">
      <div
        ref={pin}
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

        {/* Headline — three phrases stacked in one grid cell */}
        <div className="container-x relative z-10">
          <div className="flex items-center gap-3" data-hero-meta>
            <span className="h-1.5 w-1.5 bg-accent" />
            <span className="label-mono">One-of-One Extreme Build — Est. 2026</span>
          </div>

          <div className="mt-4 grid">
            <h1
              data-phrase
              className="col-start-1 row-start-1 font-display text-[13vw] leading-[0.84] sm:text-7xl md:text-8xl lg:text-[7.5rem]"
            >
              <span className="block overflow-hidden">
                <span data-line-inner className="inline-block">1978 Toyota</span>
              </span>
              <span className="block overflow-hidden">
                <span data-line-inner className="inline-block text-accent">Chinook</span>
                <span data-line-inner className="inline-block">, Rebuilt</span>
              </span>
            </h1>

            <h1
              data-phrase
              className="col-start-1 row-start-1 max-w-[12ch] font-display text-[11vw] leading-[0.9] opacity-0 sm:text-6xl md:text-7xl lg:text-[6rem]"
            >
              The most <span className="text-accent">unique</span> 4×4 camper in Australia
            </h1>

            <h1
              data-phrase
              className="col-start-1 row-start-1 max-w-[11ch] font-display text-[12vw] leading-[0.88] opacity-0 sm:text-7xl md:text-8xl lg:text-[6.5rem]"
            >
              Rare vintage <span className="text-accent">4×4</span> camper
            </h1>
          </div>
        </div>

        {/* Render sits above the headline and fills remaining space */}
        <div
          data-hero-render
          className="pointer-events-none relative z-20 mx-auto -mt-[16vh] -mb-2 min-h-0 w-full max-w-6xl flex-1 lg:ml-auto lg:mr-0 lg:translate-x-[3%] xl:translate-x-[6%]"
        >
          <Image
            src="/vehicle/chinook-cartoon.png"
            alt="The extremely engineered 1978 Toyota Chinook vintage 4x4 camper"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
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
      </div>
    </section>
  );
}
