import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // Assets are served from /public; no remote optimization needed.
    unoptimized: true,
  },
};

export default nextConfig;
