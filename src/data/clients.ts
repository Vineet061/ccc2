/** The clients index. The statistics band on the home page counts this list
 *  rather than hard-coding a number, so the figure and the page can never
 *  disagree after an entry is added or removed. */

export type Client = {
  name: string;
  /** Two-letter monogram, since there are no logos to show. */
  mark: string;
  note: string;
  tag: { label: string; tone: "accent" | "accent-2" | "neutral" };
};

export const clients: readonly Client[] = [
  {
    name: "AyantrAI",
    mark: "Ay",
    note: "Products built end to end alongside machine learning work, delivered as an extension of their own team.",
    tag: { label: "Products & AI-ML services", tone: "accent" },
  },
  {
    name: "Alignerr",
    mark: "Al",
    note: "Applied AI work delivered under contract, scaled up and down as each engagement required.",
    tag: { label: "Applied AI", tone: "accent-2" },
  },
  {
    name: "Bandhan",
    mark: "Ba",
    note: "Product and dashboard work, built around how the business actually runs rather than a generic admin panel.",
    tag: { label: "Product & dashboards", tone: "accent" },
  },
];
