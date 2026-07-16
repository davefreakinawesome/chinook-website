import type { ReactNode } from "react";

export default function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="editorial max-w-2xl space-y-5 text-base [&_a]:text-accent [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:uppercase [&_h2]:leading-none [&_h2]:text-bone [&_strong]:text-bone">
      {children}
    </div>
  );
}
