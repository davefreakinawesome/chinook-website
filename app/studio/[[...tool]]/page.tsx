import type { Metadata, Viewport } from "next";
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { sanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Studio — Chinook Overlander",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function StudioPage() {
  if (!sanityConfigured) {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, fontFamily: "system-ui", color: "#f3ede1", background: "#17140f", textAlign: "center" }}>
        <div style={{ maxWidth: 520 }}>
          <h1 style={{ fontSize: 28, marginBottom: 12 }}>Sanity Studio not configured</h1>
          <p style={{ opacity: 0.7, lineHeight: 1.6 }}>
            Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> (and optionally
            {" "}<code>NEXT_PUBLIC_SANITY_DATASET</code>) in your environment, then reload this page
            to open the embedded content Studio.
          </p>
        </div>
      </div>
    );
  }
  return <NextStudio config={config} />;
}
