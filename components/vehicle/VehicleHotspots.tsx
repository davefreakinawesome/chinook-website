"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Hotspot {
  id: string;
  label: string;
  system: string;
  href: string;
  left: number;
  top: number;
}

/**
 * Interactive build overview. Hotspots are positioned as percentages over the
 * illustrated Chinook render and link into build-system pages. On touch/small
 * screens an accessible list is shown instead of tiny targets.
 */
const hotspots: Hotspot[] = [
  { id: "engine", label: "6.0L V8", system: "Powertrain", href: "/build/engine-l98-v8", left: 79, top: 42 },
  { id: "bar", label: "Barwork & Lighting", system: "Front", href: "/build/electrical-control-systems", left: 90, top: 60 },
  { id: "cab", label: "Digital Dashboard", system: "Cab", href: "/build/electrical-control-systems", left: 63, top: 30 },
  { id: "roof", label: "Solar & Comms", system: "Roof", href: "/build/electrical-control-systems", left: 30, top: 9 },
  { id: "body", label: "Camper Body", system: "Habitat", href: "/build", left: 17, top: 33 },
  { id: "chassis", label: "80 Series Chassis", system: "Driveline", href: "/build/80-series-chassis", left: 52, top: 76 },
  { id: "wheelbase", label: "Wheelbase", system: "Chassis", href: "/build/wheelbase-extension", left: 30, top: 74 },
];

export default function VehicleHotspots() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div>
      <div className="relative mx-auto w-full max-w-5xl">
        <div className="relative aspect-[1024/640] w-full">
          <Image
            src="/vehicle/chinook-cartoon.png"
            alt="Illustration of the rebuilt Toyota Chinook overland camper"
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-contain drop-shadow-2xl"
            priority
          />

          {/* Hotspots — hidden from pointer-only tiny targets on small screens */}
          <div className="pointer-events-none absolute inset-0 hidden sm:block">
            {hotspots.map((h) => (
              <div
                key={h.id}
                className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${h.left}%`, top: `${h.top}%` }}
                onMouseEnter={() => setActive(h.id)}
                onMouseLeave={() => setActive(null)}
              >
                <Link
                  href={h.href}
                  className="group relative flex items-center justify-center"
                  aria-label={`${h.label} — ${h.system}`}
                  onFocus={() => setActive(h.id)}
                  onBlur={() => setActive(null)}
                >
                  <span className="absolute h-8 w-8 animate-ping rounded-full bg-accent/30" />
                  <span className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full border border-accent bg-charcoal">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  <span
                    className={`pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap border border-accent/40 bg-charcoal px-3 py-1.5 transition-all duration-300 ${
                      active === h.id ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
                    }`}
                  >
                    <span className="block font-mono text-[0.55rem] uppercase tracking-[0.16em] text-grey">
                      {h.system}
                    </span>
                    <span className="block font-display text-sm uppercase leading-none text-bone">
                      {h.label}
                    </span>
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accessible / mobile list */}
      <ul className="mt-8 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
        {hotspots.map((h) => (
          <li key={h.id}>
            <Link
              href={h.href}
              className="flex h-full flex-col justify-between gap-2 bg-charcoal p-4 transition-colors hover:bg-graphite"
            >
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-accent">
                {h.system}
              </span>
              <span className="font-display text-lg uppercase leading-none text-bone">{h.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
