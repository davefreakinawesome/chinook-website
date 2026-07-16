"use client";

import Script from "next/script";

/**
 * LightWidget embed. Instagram's personal-account API is deprecated, so live
 * posts are served through a free no-code widget: connect the account at
 * lightwidget.com, then set NEXT_PUBLIC_INSTAGRAM_WIDGET_ID to the widget's id.
 * The iframe auto-resizes once lightwidget.js loads.
 */
export default function InstagramWidget({ widgetId }: { widgetId: string }) {
  return (
    <>
      <iframe
        title="Instagram feed"
        src={`https://cdn.lightwidget.com/widgets/${widgetId}.html`}
        scrolling="no"
        allowTransparency
        className="lightwidget-widget"
        style={{ width: "100%", border: 0, overflow: "hidden" }}
      />
      <Script
        src="https://cdn.lightwidget.com/widgets/lightwidget.js"
        strategy="lazyOnload"
      />
    </>
  );
}
