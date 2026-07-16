"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav, site, social } from "@/lib/site";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-charcoal/85 backdrop-blur-md border-b border-line"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between md:h-20">
          <Link href="/" className="group flex items-center" aria-label={site.name}>
            <span className="font-display text-lg uppercase leading-none tracking-tight">
              Chinook<span className="text-accent"> Overlander</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {primaryNav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-baseline gap-1.5 text-sm"
                >
                  <span className="font-mono text-[0.6rem] text-grey">{item.number}</span>
                  <span
                    className={`font-display uppercase tracking-tight transition-colors ${
                      active ? "text-accent" : "text-bone/80 group-hover:text-bone"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden font-mono text-[0.7rem] uppercase tracking-[0.16em] text-bone/70 transition-colors hover:text-accent md:inline"
            >
              Subscribe
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span
                className={`h-[1.5px] w-6 bg-bone transition-transform ${open ? "translate-y-[6.5px] rotate-45" : ""}`}
              />
              <span className={`h-[1.5px] w-6 bg-bone transition-opacity ${open ? "opacity-0" : ""}`} />
              <span
                className={`h-[1.5px] w-6 bg-bone transition-transform ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-40 bg-charcoal transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="container-x flex h-full flex-col justify-center gap-1 pt-16">
          {primaryNav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-baseline gap-4 border-b border-line py-4"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span className="font-mono text-xs text-accent">{item.number}</span>
              <span className="font-display text-4xl uppercase leading-none tracking-tight text-bone transition-colors group-hover:text-accent">
                {item.label}
              </span>
            </Link>
          ))}
          <div className="mt-8 flex gap-6 font-mono text-xs uppercase tracking-[0.16em] text-grey">
            <a href={social.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href={social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
    </>
  );
}
