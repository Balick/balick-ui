import type { NextConfig } from "next";

import { componentHref, componentDocs } from "./content/components";

const nextConfig: NextConfig = {
  // Components used to live under /docs/components/<slug>. They now have
  // their own gallery, /components/<category>, and their docs pages sit at
  // /components/<category>/<slug>.
  async redirects() {
    return [
      ...componentDocs.map((doc) => ({
        source: `/docs/components/${doc.slug}`,
        destination: componentHref(doc.slug),
        permanent: true,
      })),
      { source: "/docs/components/:path*", destination: "/components/:path*", permanent: true },
    ];
  },
  // `pnpm registry:verify` builds into its own folder, so it never disturbs `pnpm dev`.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
