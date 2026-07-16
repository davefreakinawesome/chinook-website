"use client";

import { useEffect, useRef, type ElementType } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";

interface AnimatedHeadingProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Play immediately (hero) instead of on scroll. */
  immediate?: boolean;
  delay?: number;
}

/**
 * Word-by-word masked rise. Lightweight alternative to SplitText,
 * keeps the words selectable and accessible.
 */
export default function AnimatedHeading({
  text,
  as: Tag = "h2",
  className,
  immediate = false,
  delay = 0,
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>("[data-word] > span");
    if (prefersReducedMotion()) {
      gsap.set(targets, { yPercent: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, { yPercent: 115 });
      gsap.to(targets, {
        yPercent: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.06,
        delay,
        scrollTrigger: immediate
          ? undefined
          : { trigger: el, start: "top 88%" },
      });
    }, el);

    return () => ctx.revert();
  }, [immediate, delay]);

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          data-word
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
        >
          <span style={{ display: "inline-block", willChange: "transform" }}>
            {word}
          </span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}
