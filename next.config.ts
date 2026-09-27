import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // Shown as "Updated" in the footer; fixed at build time.
    BUILD_DATE: new Date().toISOString().slice(0, 10),
  },
};

export default nextConfig;
