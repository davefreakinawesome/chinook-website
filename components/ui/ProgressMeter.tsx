"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";

export default function ProgressMeter({ value, label }: { value: number; label?: string }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const el = barRef.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.width = `${value}%`;
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { width: "0%" },
        {
          width: `${value}%`,
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 92%" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [value]);

  return (
    <div>
      {label && (
        <div className="mb-2 flex items-center justify-between">
          <span className="label-mono-muted">{label}</span>
          <span className="font-mono text-xs text-accent">{value}%</span>
        </div>
      )}
      <div className="h-[3px] w-full bg-line" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
        <div ref={barRef} className="h-full bg-accent" style={{ width: 0 }} />
      </div>
    </div>
  );
}
