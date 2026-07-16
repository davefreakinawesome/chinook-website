import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
