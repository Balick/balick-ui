import type { NextConfig } from "next";

import { componentHref, componentDocs } from "./content/components";

const nextConfig: NextConfig = {
  env: {
    // Shown as "Updated" in the footer; fixed at build time.
    BUILD_DATE: new Date().toISOString().slice(0, 10),
  },
  // Component pages moved under their category:
  // /docs/components/marquee is now /docs/components/motion/marquee.
  async redirects() {
    return componentDocs.map((doc) => ({
      source: `/docs/components/${doc.slug}`,
      destination: componentHref(doc.slug),
      permanent: true,
    }));
  },
};

export default nextConfig;
