import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  bleed?: boolean;
}

export default function Section({ children, className, id, bleed }: SectionProps & { bleed?: boolean }) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className ?? ""}`}>
      {bleed ? children : <div className="container-x">{children}</div>}
    </section>
  );
}
