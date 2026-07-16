"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";

interface CounterProps {
  value: number;
  suffix?: string;
  className?: string;
  decimals?: number;
}

export default function Counter({ value, suffix = "", className, decimals = 0 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.textContent = value.toFixed(decimals) + suffix;
      return;
    }
    const obj = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        n: value,
        duration: 2,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 90%" },
        onUpdate: () => {
          el.textContent = obj.n.toFixed(decimals) + suffix;
        },
      });
    }, el);
    return () => ctx.revert();
  }, [value, suffix, decimals]);

  return <span ref={ref} className={className}>0{suffix}</span>;
}
