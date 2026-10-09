import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // "standalone" keeps the Docker image small. Vercel ignores this setting.
  output: "standalone",
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
