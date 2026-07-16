import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center justify-center pt-16">
      <div className="container-x text-center">
        <p className="label-mono justify-center">Error 404</p>
        <h1 className="mt-4 font-display text-7xl leading-none md:text-9xl">Off the Map</h1>
        <p className="editorial mx-auto mt-4 max-w-md">
          This track doesn&apos;t lead anywhere. Let&apos;s get you back to the build.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">Back Home</Link>
          <Link href="/build" className="btn btn-ghost">Explore the Build</Link>
        </div>
      </div>
    </section>
  );
}
