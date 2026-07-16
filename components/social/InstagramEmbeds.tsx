"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

/**
 * Official Instagram post embeds — no login, no API token, no third-party
 * service. Each permalink is rendered by Instagram's own embed.js into a full
 * post card. Works for any public post; just list the URLs you want featured.
 */
export default function InstagramEmbeds({ permalinks }: { permalinks: string[] }) {
  useEffect(() => {
    // Re-render embeds whenever the list changes and the script is present.
    window.instgrm?.Embeds.process();
  }, [permalinks]);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {permalinks.map((url) => (
          <blockquote
            key={url}
            className="instagram-media"
            data-instgrm-permalink={url}
            data-instgrm-version="14"
            style={{ margin: 0, width: "100%", minWidth: 0 }}
          />
        ))}
      </div>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => window.instgrm?.Embeds.process()}
      />
    </div>
  );
}
