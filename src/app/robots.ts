import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

/* Emitted as a file at build time rather than served by a handler. Required
   for `output: "export"`, and correct on a server deployment too — this file
   never changes between requests. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
