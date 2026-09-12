/** Single source of truth for site-wide constants: contact details, nav
 *  structure, outbound links and the canonical URL. */

export const site = {
  name: "CCC",
  tagline:
    "We build AI applications and live dashboards, ship apps to production, and publish peer-reviewed research.",
  description:
    "CCC is a small engineering team. We build AI applications and live dashboards, ship apps to production, and publish peer-reviewed research.",
  url: "https://ccc.example.com",
  email: "vineethsh177@gmail.com",
  phone: "6377337348",
  phoneHref: "tel:6377337348",
  /** Quoted in three places, so it lives here rather than being retyped. */
  revenueLast6Months: "$14.5k",
  playStoreUrl:
    "https://play.google.com/store/apps/details?id=com.yvs.video_transcription_summerizer&pcampaignid=web_share",
  /** The trailer on the Play Store listing, embedded on the home page. */
  playStoreTrailerId: "4vF9o-Y0iec",
  ieeeUrl: "https://ieeexplore.ieee.org/document/10073818/",
} as const;

export const mailtoEnquiry = `mailto:${site.email}?subject=${encodeURIComponent(
  "Project enquiry for CCC",
)}`;

/**
 * Where the contact form posts. FormSubmit is the default because it needs no
 * account and no key: it accepts a JSON POST and forwards the message to the
 * address in the URL. The first message ever sent triggers a one-time
 * confirmation email that has to be clicked before delivery starts.
 *
 * To use a different provider (Web3Forms, Formspree, your own handler), set
 * NEXT_PUBLIC_CONTACT_ENDPOINT. Anything that accepts a JSON POST and answers
 * with 2xx on success will work; see README.
 */
export const contactEndpoint =
  process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ||
  `https://formsubmit.co/ajax/${site.email}`;

/** True for anything that leaves the site, so links can be given the right
 *  target and rel without every call site repeating the check. */
export function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

export type NavLink = {
  href: string;
  label: string;
};

/** Every nav item points at a section of the home page. The dedicated /work
 *  and /about pages are reached from inside those sections, so the top nav
 *  stays a single-page table of contents. */
export const navLinks: readonly NavLink[] = [
  { href: "/#work", label: "Work" },
  { href: "/#achievements", label: "Achievements" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const;

export const footerPages: readonly NavLink[] = [
  { href: "/work", label: "Our work" },
  { href: "/about", label: "About us" },
  { href: "/clients", label: "Clients" },
  { href: "/#achievements", label: "Achievements" },
] as const;
