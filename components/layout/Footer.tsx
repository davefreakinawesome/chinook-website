import Link from "next/link";
import { footerNav, site, social } from "@/lib/site";
import NewsletterForm from "@/components/forms/NewsletterForm";

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-line bg-cream-2">
      <div className="container-x py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="label-mono">Follow the build beyond the algorithm</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl leading-[0.95] md:text-6xl">
              New episodes, build breakdowns and the first stories from the road.
            </h2>
            <div className="mt-8 max-w-md">
              <NewsletterForm />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {footerNav.map((col) => (
              <div key={col.title}>
                <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-grey">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-bone/70 transition-colors hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display text-lg uppercase tracking-tight">
              Chinook<span className="text-accent"> Overlander</span>
            </span>
            <span className="label-mono-muted hidden sm:inline">Extremely Engineered Vintage 4x4</span>
          </div>
          <div className="flex gap-6 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-grey">
            <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-accent">YouTube</a>
            <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent">Instagram</a>
          </div>
          <p className="font-mono text-[0.7rem] text-grey">
            &copy; {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
