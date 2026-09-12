/** Project catalogue. The work index and the home page teasers both read from
 *  here, so ordering, copy and destinations stay in sync across pages. */

import { site } from "@/lib/site";

export type ProjectStatus = "delivered" | "in-progress";

export type Project = {
  slug: string;
  title: string;
  /** Short label above the title on cards. */
  kicker: string;
  /** Badges shown top-right on the card, in order. The last one is always
   *  the kind of engagement, so the row reads status first then type. */
  badges: readonly { label: string; tone: "accent" | "accent-2" | "neutral" }[];
  /** Card description. */
  summary: string;
  status: ProjectStatus;
  /**
   * Where the card goes. Absolute URLs are the live product and open in a new
   * tab; a site path points at the section of this site that covers the work.
   */
  liveUrl: string;
  /** Wording for the action cue on the card, e.g. "Open the app". */
  liveLabel: string;
};

export const projects: readonly Project[] = [
  {
    slug: "brieflytube",
    title: "BrieflyTube",
    kicker: "Android app · Live",
    badges: [
      { label: "500+ downloads", tone: "accent-2" },
      { label: "Product", tone: "neutral" },
    ],
    summary:
      "Turns a long video into a clean, readable summary in seconds. Clear, memorable, and it explains its own value the moment you open it.",
    status: "delivered",
    liveUrl: site.playStoreUrl,
    liveLabel: "Get it on Google Play",
  },
  {
    slug: "geoframe",
    title: "GeoFrame",
    kicker: "Travel · Reels to routes",
    badges: [
      { label: "High potential", tone: "accent" },
      { label: "Service", tone: "neutral" },
    ],
    summary:
      "A reel makes you want to go somewhere. GeoFrame names the place, works out how to reach it, and hands back an itinerary you can walk.",
    status: "delivered",
    liveUrl: "https://wayfinder17.onrender.com/",
    liveLabel: "Open GeoFrame",
  },
  {
    slug: "docusense",
    title: "DocuSense",
    kicker: "Semantic search",
    badges: [{ label: "Service", tone: "neutral" }],
    summary:
      "Deep semantic comprehension across specialised knowledge bases. Ask a corpus a real question and get a grounded, cited answer.",
    status: "delivered",
    liveUrl: "https://detailsextractor.onrender.com/",
    liveLabel: "Open DocuSense",
  },
  {
    slug: "contract-engineering",
    title: "Contract engineering",
    kicker: "Services · 6 months",
    badges: [
      { label: "Ongoing", tone: "accent-2" },
      { label: "Service", tone: "neutral" },
    ],
    summary:
      "Contractual engineering work for model teams. Over the last six months we have worked on Fabel5, Mythos and Gemini models.",
    status: "delivered",
    // A service rather than a product, so it opens the page describing how we
    // work with model teams instead of a deployed build.
    liveUrl: "/work/contract-engineering",
    liveLabel: "How we work with model teams",
  },
];

export const inProgress = [
  {
    title: "Libify",
    badges: [
      { label: "Nearing completion", tone: "accent-2" as const },
      { label: "Service", tone: "neutral" as const },
    ],
    description:
      "A dashboard that gives a library one screen for circulation, stock and members. Built around a real library workflow rather than a generic admin panel.",
    icon: "document" as const,
  },
  {
    title: "Smart Attendance",
    badges: [
      { label: "In build", tone: "accent" as const },
      { label: "Service", tone: "neutral" as const },
    ],
    description:
      "Attendance that takes itself: no roll call, no paperwork, no proxies. Designed for classrooms and small teams alike.",
    icon: "userCheck" as const,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
