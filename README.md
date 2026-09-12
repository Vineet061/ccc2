# CCC — website

Marketing site for CCC, built with Next.js (App Router) and TypeScript.
Every route is statically prerendered.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint     # eslint
npm run typecheck
```

## Structure

```
src/
  app/
    layout.tsx              root layout: fonts, metadata, header/footer, theme
    globals.css             design tokens + component classes (the design system)
    fonts.css               @font-face for the three self-hosted families
    page.tsx / home.module.css        home
    about/                  about us
    work/                   work index
    work/contract-engineering/   the one standalone service page
    clients/                clients index
    sitemap.ts, robots.ts, icon.svg
  components/               shared UI (header, footer, cards, motion helpers)
  hooks/                    small client-side behaviours
  data/projects.ts          project catalogue — the source for every project list
  lib/site.ts               contact details, nav structure, canonical URL
public/fonts/               woff2 files
```

## Design system

`src/app/globals.css` is the source of truth for the look. Colours, spacing,
radii and shadows are CSS custom properties; component classes (`.btn`,
`.card`, `.tag`, `.panel`) are built from them. Page-specific composition
lives in CSS Modules next to each page, so a change to a page can never leak
into another one.

### Themes

Two themes ship: **warm** (light, default) and **dark**. Each is a complete
token set scoped to `[data-theme="…"]` on `<html>`, so switching is one
attribute flip — no per-property JavaScript.

- The visitor's choice is stored in `localStorage` under `ccc-theme`.
- A small inline script in `<head>` (`themeScript` in
  `components/ThemeProvider.tsx`) applies it **before first paint**, so there
  is no flash of the wrong palette. With no stored choice it follows the OS
  `prefers-color-scheme`.
- To retune a theme, edit only the token block for it in `globals.css`.
  Nothing hard-codes a colour outside those blocks.

### Responsive behaviour

The layout is fluid rather than a set of fixed breakpoints: type and spacing
use `clamp()`, and content rows use `flex-wrap` with a sensible basis so a
wrapped row fills the width instead of stranding one item.

The page measure is fluid at the top end too — `--page-max` is
`clamp(1140px, 92vw, 1720px)`, so a desktop monitor gets a wider layout rather
than the same 1140px column with large empty margins. Above 1600px the gutters,
body size and section rhythm step up with it. The lower bound is the original
design width and wins on every viewport narrower than it, where the container's
`width: 100%` takes over.

Two real breakpoints exist:

- **900px** — the nav links collapse into a slide-in drawer with a hamburger
  trigger. The drawer traps focus, closes on Escape, backdrop click or a route
  change, and carries the theme toggle and contact details.
- **640px** — vertical rhythm tightens and the decorative background circles
  scale down so they do not crowd the copy.
- **1600px and up** — cards get more padding and their body copy, kickers, tags
  and buttons step up a size. Without this a card on a monitor is a few words of
  13px type stranded in a large empty box. Card and prose measures are capped
  separately from the page measure (`.card .body`, `.measure`), so a wide layout
  never produces a 110-character line of small text.

### Navigation model

The top nav is a table of contents for the home page: every item is an anchor
(`/#work`, `/#achievements`, `/#about`, `/#contact`). The standalone `/work`
and `/about` pages are reached from inside those sections ("See all six
projects", "Read the whole story") and from the footer. Every nav item shares one
resting colour with no active tint or underline; hover is the only state
change.

### Where a project card goes

There are no case-study pages. Every project in `src/data/projects.ts` carries a
`liveUrl` and the card goes straight there: the Play Store listing for
BrieflyTube, the deployed app for GeoFrame and DocuSense. Contract engineering
is a service with nothing to open, so it points at `/work/contract-engineering`,
the one standalone page that survives.

Each project also carries a `badges` array. The last badge is the kind of
engagement (Service or Product); anything before it is status. Rendering an
array rather than a single badge is what lets a card show both at once.

The card is an `<article>` with a stretched title link rather than one big
anchor, so the whole surface is clickable while the markup stays a heading
containing a link. Absolute `liveUrl`s get `target="_blank"` and
`rel="noopener noreferrer"` automatically via `isExternal()` in
`src/lib/site.ts`.

Five of the six figures in the statistics band link to the evidence behind them
(the Play Store listing, `/work/contract-engineering`, `/work#delivered`,
`/work#in-progress`, the IEEE paper, `/clients`). Each carries a `linkLabel`,
because "500+" on its own tells a screen-reader user nothing about the
destination.

### The contact form

`ContactForm` posts JSON with `fetch` and renders the result in place, so the
visitor never leaves the page. It validates before sending, carries an
off-screen honeypot that silently drops bot submissions, and if the provider
fails it falls back to offering the mailto address rather than losing the
message.

The endpoint is `contactEndpoint` in `src/lib/site.ts`. It defaults to
**FormSubmit**, which needs no account or key:

```
https://formsubmit.co/ajax/vineethsh177@gmail.com
```

**One-time activation:** the very first message sent through it triggers a
confirmation email to that address. Click the link in it and delivery starts.
Until then submissions are accepted but not forwarded, so send yourself a test
message after the first deploy.

To use a different provider, set `NEXT_PUBLIC_CONTACT_ENDPOINT` (in Vercel's
environment variables, or `.env.local` for development). Anything that takes a
JSON POST and answers 2xx works, for example Web3Forms
(`https://api.web3forms.com/submit`, add your `access_key` to the body) or
Formspree. FormSubmit also issues a hashed alias after activation, which is
worth swapping in so the raw address is not in the client bundle.

## Content

Project copy, tags, badges and destinations all live in
`src/data/projects.ts`. Adding a project means adding one entry there.

Contact details, nav items and the canonical URL live in `src/lib/site.ts`.
Set `site.url` to the real domain before deploying — it feeds the sitemap,
`robots.txt` and Open Graph tags.

### Images

Pictures the client still has to supply render as labelled placeholders via
`<MediaSlot>`. To fill one, drop the file into `public/` and pass `src`:

```tsx
<MediaSlot src="/brieflytube-hero.png" placeholder="…" ratio="16 / 9" />
```

Blocks of copy still to be written are marked with the `placeholder-note`
class — search for it to find every one.

### Video

The achievements section embeds the trailer from the Play Store listing
(`site.playStoreTrailerId`). `VideoEmbed` renders a poster and a play button and
only mounts the iframe once someone clicks, so no YouTube script, cookie or
player payload is loaded with the page; it uses `youtube-nocookie.com`. If the
thumbnail cannot be reached the facade falls back to a tinted panel and still
plays.

## Accessibility

- Skip link to the main content on every page.
- Landmarks throughout; each section is labelled.
- Focus is visible everywhere and trapped inside the open drawer.
- All motion (scroll reveals, the statistics band, the progress bar) is
  additive: with JavaScript off or `prefers-reduced-motion: reduce` set, the
  page renders exactly as authored, with final values shown.
- In the statistics band the spinning digit drums are `aria-hidden` and the
  settled figure is exposed to screen readers, so the value is never announced
  mid-animation.
- The contact form labels every field, marks invalid ones with `aria-invalid`,
  ties each message to its input with `aria-describedby`, moves focus to the
  first problem on a failed submit, and announces the result through an
  `aria-live` region without stealing focus.

### The statistics band

Each figure is rendered by `Odometer` as a row of digit drums. A drum is a real
CSS cylinder: ten faces placed at 36° intervals and pushed out along Z by the
radius of a regular 10-gon (`side / (2·tan 18°) ≈ 1.5388·side`). Showing a digit
means rotating the drum to bring that face square to the viewer; the entrance
starts two full turns away and eases in. The reel has `overflow: hidden` as its
housing — `backface-visibility` alone is not enough, because the faces 36° and
72° off the front are still turned towards the camera.

`StatTile` wraps that in a small 3D scene: the tile swings in on its X axis, its
badge, numeral and label sit on three different Z planes, and a pointer-tracked
tilt separates them as the cursor moves. Tilt is written straight to CSS custom
properties, so moving the mouse never triggers a React render.

## Deploying

### Vercel (and any Node host)

Deploy as-is. `npm run build` is the right command and needs no configuration:
every route in the table above is marked `○ (Static)`, so Vercel prerenders the
whole site to HTML and serves it from its CDN. There is no server runtime, no
API route and no database.

**Do not add `output: "export"` on Vercel.** It is not what makes the site
static — the pages already are — and it switches off the image optimiser and
route handlers for no gain. It is also what causes this build failure:

```
Error: export const dynamic = "force-static" ... not configured
on route "/robots.txt" with "output: export"
```

`robots.ts` and `sitemap.ts` are route handlers. Under `output: "export"` Next
cannot know they are safe to write to disk unless they say so, so both now
declare `export const dynamic = "force-static"`. That is correct on a server
deployment too — neither file varies between requests — so the fix is in the
code permanently rather than something to remember per target.

### A plain static host (GitHub Pages, S3, nginx)

```bash
npm run build:static   # writes ./out
```

That sets `NEXT_STATIC_EXPORT=true`, which turns on `output: "export"`,
`images.unoptimized` (no server to optimise on) and `trailingSlash` (so routes
land as `/work/index.html`). Upload `out/`. The pairing lives in
`next.config.ts` so the two targets cannot drift apart — switching is one
command, not a hand-edit.

Set `site.url` in `src/lib/site.ts` to the real domain before either — it feeds
the sitemap, `robots.txt` and the Open Graph tags.
