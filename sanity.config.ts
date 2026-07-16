"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schema";

/**
 * Embedded Sanity Studio configuration, mounted at /studio.
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID to be set.
 */
export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Chinook Overlander")
          .items([
            S.listItem()
              .title("Site Settings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.divider(),
            S.documentTypeListItem("buildSystem").title("Build Systems"),
            S.documentTypeListItem("journalPost").title("Journal Posts"),
            S.documentTypeListItem("buildMilestone").title("Build Milestones"),
            S.documentTypeListItem("partner").title("Partners"),
            S.documentTypeListItem("product").title("Products / Gear"),
            S.documentTypeListItem("video").title("Videos"),
            S.documentTypeListItem("trip").title("Trips"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
