import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 *
 * This is a user site (nishit-shivdasani.github.io), so it is served from the
 * domain root — no basePath / assetPrefix required. If this ever moves to a
 * project repo, both would need to be set to "/<repo-name>".
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // No Image Optimization API exists in a static export.
    unoptimized: true,
  },
};

export default nextConfig;
