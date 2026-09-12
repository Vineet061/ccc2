import type { NextConfig } from "next";

/**
 * Static export is opt-in via an env var rather than hard-coded, because the
 * two targets need different image settings and getting that pairing wrong is
 * the usual cause of a failed deploy.
 *
 *   npm run build            → server build (Vercel, Netlify, any Node host)
 *   npm run build:static     → ./out, for a plain static file host
 *
 * On Vercel you want the default: it runs the app as a normal Next.js build and
 * still serves every one of these pages as static HTML, while keeping the image
 * optimiser. `output: "export"` there only takes features away.
 */
const isStaticExport = process.env.NEXT_STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  ...(isStaticExport
    ? {
        output: "export" as const,
        // There is no server to optimise images on a static host, so next/image
        // has to emit the source file as-is.
        images: { unoptimized: true },
        // Emits /work/index.html rather than /work.html, which is what most
        // static hosts expect.
        trailingSlash: true,
      }
    : {
        images: { formats: ["image/avif", "image/webp"] as const },
      }),
};

export default nextConfig;
