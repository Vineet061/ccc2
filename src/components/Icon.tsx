import type { SVGProps } from "react";

/** Every icon used across the site, drawn on a 24×24 grid with a 2.75 stroke
 *  so they share one optical weight. Icons are decorative by default; pass a
 *  `title` when an icon is the only label for a control. */

export type IconName =
  | "arrowRight"
  | "arrowLeft"
  | "external"
  | "phoneCall"
  | "mail"
  | "sun"
  | "moon"
  | "menu"
  | "close"
  | "mobile"
  | "document"
  | "chartUp"
  | "trendUp"
  | "download"
  | "check"
  | "clock"
  | "flask"
  | "star"
  | "starOutline"
  | "documentLines"
  | "userCheck"
  | "users"
  | "sparkle"
  | "layers"
  | "code";

type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: IconName;
  size?: number;
  title?: string;
};

const paths: Record<IconName, React.ReactNode> = {
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  external: (
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  ),
  phoneCall: (
    <path d="M5 3h3l2 5-2.5 1.5a12 12 0 0 0 6 6L15 13l5 2v3a2 2 0 0 1-2.2 2A17 17 0 0 1 3 5.2 2 2 0 0 1 5 3z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4" />
    </>
  ),
  moon: <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  mobile: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="3" />
      <path d="M11 18h2" />
    </>
  ),
  document: (
    <>
      <path d="M4 19V5a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
      <path d="M9 12h6M9 16h4" />
    </>
  ),
  documentLines: (
    <>
      <path d="M4 19V5a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
      <path d="M8 8h5M8 12h8M8 16h8" />
    </>
  ),
  chartUp: (
    <>
      <path d="M4 17l5-5 4 3 7-8" />
      <path d="M4 21h16" />
    </>
  ),
  trendUp: (
    <>
      <path d="M4 17l5-5 4 3 7-8" />
      <path d="M15 7h5v5" />
    </>
  ),
  download: <path d="M12 3v12M7 10l5 5 5-5M5 20h14" />,
  check: <path d="M20 7L10 17l-5-5" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  flask: <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" />,
  star: <path d="M12 2l3 6.6 7 .9-5 4.8 1.2 7-6.2-3.4L5.8 21 7 14.3 2 9.5l7-.9z" />,
  starOutline: (
    <path d="M12 2l3 6.6 7 .9-5 4.8 1.2 7-6.2-3.4L5.8 21 7 14.3 2 9.5l7-.9z" />
  ),
  userCheck: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-8 0v2" />
      <circle cx="12" cy="8" r="4" />
      <path d="M20 13l2 2 3-4" />
    </>
  ),
  users: (
    <>
      <path d="M15 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="3.5" />
      <path d="M17 4.5a3.5 3.5 0 0 1 0 6.9M22 20v-2a4 4 0 0 0-3-3.8" />
    </>
  ),
  sparkle: (
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" />
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5z" />
      <path d="M3 13l9 5 9-5M3 17.5l9 5 9-5" />
    </>
  ),
  code: <path d="M9 18l-6-6 6-6M15 6l6 6-6 6" />,
};

/** Icons drawn as filled shapes rather than strokes. */
const filled = new Set<IconName>(["star"]);

export function Icon({ name, size = 16, title, ...rest }: IconProps) {
  const isFilled = filled.has(name);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isFilled ? "currentColor" : "none"}
      stroke={isFilled ? undefined : "currentColor"}
      strokeWidth={isFilled ? undefined : name === "starOutline" ? 2 : 2.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
