import type { MetadataRoute } from "next";


import { site } from "@/lib/site";

/* Same reasoning as robots.ts: written out at build time, so it works under
   `output: "export"` as well as on a server deployment. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: site.url, lastModified, priority: 1 },
    { url: `${site.url}/work`, lastModified, priority: 0.8 },
    { url: `${site.url}/about`, lastModified, priority: 0.6 },
    {
      url: `${site.url}/work/contract-engineering`,
      lastModified,
      priority: 0.6,
    },
    { url: `${site.url}/clients`, lastModified, priority: 0.5 },
  ];
}
