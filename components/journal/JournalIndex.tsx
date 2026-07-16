"use client";

import { useMemo, useState } from "react";
import type { JournalPost } from "@/lib/types";
import JournalCard from "@/components/cards/JournalCard";

export default function JournalIndex({ posts }: { posts: JournalPost[] }) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => (p.categories ?? []).forEach((c) => set.add(c)));
    return ["All", ...Array.from(set)];
  }, [posts]);

  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? posts : posts.filter((p) => p.categories?.includes(active));

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={`border px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] transition-colors ${
              active === c
                ? "border-accent bg-accent text-black"
                : "border-line text-grey hover:border-line-strong hover:text-bone"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post, i) => (
          <JournalCard key={post.id} post={post} index={i} />
        ))}
      </div>
    </div>
  );
}
