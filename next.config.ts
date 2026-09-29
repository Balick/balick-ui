import type { NextConfig } from "next";

import { componentHref, componentDocs } from "./content/components";

const nextConfig: NextConfig = {
  env: {
    // Shown as "Updated" in the footer; fixed at build time.
    BUILD_DATE: new Date().toISOString().slice(0, 10),
  },
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
};

export default nextConfig;
